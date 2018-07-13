package com.recovery.core.dao;

import java.lang.reflect.Type;
import java.sql.Connection;
import java.lang.reflect.ParameterizedType;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.ibatis.builder.SqlSourceBuilder;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ResultMap;
import org.apache.ibatis.mapping.ResultMapping;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.DefaultReflectorFactory;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;
import org.apache.ibatis.reflection.factory.ObjectFactory;
import org.apache.ibatis.reflection.wrapper.DefaultObjectWrapperFactory;
import org.apache.ibatis.reflection.wrapper.ObjectWrapperFactory;
import org.apache.ibatis.scripting.xmltags.DynamicContext;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;

import com.river.core.helper.ReflectUtil;

/**
 * 数据处理拦截
 * 
 * @author Yinovo
 *
 */
@Intercepts({
		@Signature(type = Executor.class, method = "query", args = { MappedStatement.class, Object.class,
				RowBounds.class, ResultHandler.class }),
		@Signature(type = Executor.class, method = "update", args = { MappedStatement.class, Object.class })
		 })
public class MapInterceptor implements Interceptor {
	/**
	 * 
	 */
	private final static String _SQL_REGEX = "river.*";
	private final static String _PARAM_REGEX="#\\{\\w*}";
	private static final ObjectFactory DEFAULT_OBJECT_FACTORY = new DefaultObjectFactory();
	private static final ObjectWrapperFactory DEFAULT_OBJECT_WRAPPER_FACTORY = new DefaultObjectWrapperFactory();
	private static final DefaultReflectorFactory DEFAULT_OBJECT_REFLECTOR_FACTORY = new DefaultReflectorFactory();
	private Map<String, String> last_sqls = new HashMap<String, String>();
	
	/**
	 * 对参数进行拦截
	 * @param mappedStatement
	 * @param parameter
	 * @param bool true 代表执行SQL前的操作  false 代表执行SQL后的操作
	 */
	private void processStatement(MappedStatement mappedStatement, Object parameter,boolean bool) {
		if (bool) {
			recursionChangeSql(mappedStatement, parameter,true);
		} else {
			recursionReturnSql(mappedStatement, parameter);
		}
	}

	
	/**
	 * 递归将所有的mappedStatement的sql进行修改
	 * @param mappedStatement
	 * @param parameter
	 * @param bool true 代表处理时将参数一同处理  false 代表不处理参数
	 */
	private void recursionChangeSql(MappedStatement mappedStatement,Object parameter,boolean bool) {
		List<ResultMap> resultMaps = mappedStatement.getResultMaps();
		if (resultMaps != null && resultMaps.size() >0) {
			for (ResultMap resultMap : resultMaps) {
				List<ResultMapping> resultMappings = resultMap.getPropertyResultMappings();
				if (resultMappings != null && resultMappings.size() > 0) {
					for (ResultMapping resultMapping : resultMappings) {
						String nestedQueryId = resultMapping.getNestedQueryId();
						if (nestedQueryId != null) {
							Configuration configuration = mappedStatement.getConfiguration();
							MappedStatement nestedQueryMappedStatement = configuration
									.getMappedStatement(nestedQueryId);
							recursionChangeSql(nestedQueryMappedStatement,resultMapping.getColumn(),false);
						}
					} 
				}
			}
		}
		changSQL(mappedStatement, parameter,bool);
	}
	
	/**
	 * 递归将所有的mappedStatement的sql修改成默认值
	 * @param mappedStatement
	 * @param parameter
	 */
	private void recursionReturnSql(MappedStatement mappedStatement,Object parameter) {
		List<ResultMap> resultMaps = mappedStatement.getResultMaps();
		if (resultMaps != null && resultMaps.size() >0) {
			for (ResultMap resultMap : resultMaps) {
				List<ResultMapping> resultMappings = resultMap.getPropertyResultMappings();
				if (resultMappings != null && resultMappings.size() > 0) {
					for (ResultMapping resultMapping : resultMappings) {
						String nestedQueryId = resultMapping.getNestedQueryId();
						if (nestedQueryId != null) {
							Configuration configuration = mappedStatement.getConfiguration();
							MappedStatement nestedQueryMappedStatement = configuration
									.getMappedStatement(nestedQueryId);
							recursionReturnSql(nestedQueryMappedStatement,null);
						}
					} 
				}
			}
		}
		returnSQL(mappedStatement, parameter);
	}
	
	/**
	 * 改变SQL的值
	 * @param mappedStatement
	 * @param parameter
	 * @param bool true 代表将处理参数  false 代表将不处理参数
	 */
	private void changSQL(MappedStatement mappedStatement, Object parameter,boolean bool) {
		String mapperSQL = mappedStatement.getBoundSql(parameter).getSql();//获取到处理过的SQL语句
		boolean interceptor = mapperSQL.matches(_SQL_REGEX);//_SQL_REGEX = "river.*";
		if (!interceptor) {
			System.out.println("SQL未处理："+mapperSQL);
			return;// 不处理
		}
		try {
			this.putLast_sqls(mappedStatement.getId(), mapperSQL);
			System.out.println("SQL需要特殊处理");
			System.out.println("SQL处理之前："+mapperSQL);
			System.out.println("参数为："+parameter);
			Class<?> entityClass = getClass(mappedStatement);
			if (entityClass == null)
				return;
			String new_sql = MapperSqlHelper.getExecuSQL(entityClass, mapperSQL, parameter);
			System.out.println("SQL处理后："+new_sql);
			Configuration configuration = mappedStatement.getConfiguration();
			if (!bool) {
				parameter = null;
			}
			DynamicContext context = new DynamicContext(configuration, parameter);
			SqlSourceBuilder sqlSourceParser = new SqlSourceBuilder(configuration);
			Class<?> parameterType = (parameter == null ? Object.class : parameter.getClass());
			SqlSource sqlSource = sqlSourceParser.parse(new_sql, parameterType, context.getBindings());

			BoundSql boundSql = sqlSource.getBoundSql(parameter);
			for (Map.Entry<String, Object> entry : context.getBindings().entrySet()) {
				boundSql.setAdditionalParameter(entry.getKey(), entry.getValue());
			}
			MetaObject metaStatementHandler = MetaObject.forObject(mappedStatement, DEFAULT_OBJECT_FACTORY,
					DEFAULT_OBJECT_WRAPPER_FACTORY, DEFAULT_OBJECT_REFLECTOR_FACTORY);
			metaStatementHandler.setValue("sqlSource", sqlSource);
			// metaStatementHandler.setValue("useCache", false);
		} catch (Exception ex) {
			ex.printStackTrace();
		} 
	}
	
	/**
	 * 将mappedStatement中的SQL改变成原来的值
	 * @param mappedStatement
	 * @param parameter
	 */
	private void returnSQL(MappedStatement mappedStatement, Object parameter) {
		String id = mappedStatement.getId();
		String last_sql = this.getLast_sqls(id);
		if (last_sql != null && !last_sql.equals("")) {
			try {
				String mapperSQL = mappedStatement.getBoundSql(parameter).getSql();
				System.out.println("SQL恢复原先值之前");
				System.out.println("SQL现在值："+mapperSQL);
				System.out.println("SQL恢复后的值："+last_sql);
				Configuration configuration = mappedStatement.getConfiguration();
				DynamicContext context = new DynamicContext(configuration, parameter);
				SqlSourceBuilder sqlSourceParser = new SqlSourceBuilder(configuration);
				Class<?> parameterType = (parameter == null ? Object.class : parameter.getClass());
				SqlSource sqlSource = sqlSourceParser.parse(last_sql, parameterType, context.getBindings());
				BoundSql boundSql = sqlSource.getBoundSql(parameter);
				for (Map.Entry<String, Object> entry : context.getBindings().entrySet()) {
					boundSql.setAdditionalParameter(entry.getKey(), entry.getValue());
				}
				MetaObject metaStatementHandler = MetaObject.forObject(mappedStatement, DEFAULT_OBJECT_FACTORY,
						DEFAULT_OBJECT_WRAPPER_FACTORY, DEFAULT_OBJECT_REFLECTOR_FACTORY);
				metaStatementHandler.setValue("sqlSource", sqlSource);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 执行拦截处理
	 */
	public Object intercept(Invocation invocation) throws Throwable {
		final Object[] queryArgs = invocation.getArgs();
		System.out.println("map====");
		if (queryArgs[0] instanceof MappedStatement) {
			System.out.println("MappedStatement");
			processStatement((MappedStatement) queryArgs[0], queryArgs[1],true);
			/*RowBounds rowBounds=(RowBounds) queryArgs[2];
			int limit=rowBounds.getLimit();
			int offset=rowBounds.getOffset();
			CacheKey cacheKey=new CacheKey();
			cacheKey.update(limit);*/
		} else if (queryArgs[0] instanceof Connection) {
			System.out.println("Connection");
			//RoutingStatementHandler handler = (RoutingStatementHandler) invocation.getTarget();
			//processConnection(handler);
		}
		Object result= invocation.proceed();
		System.out.println("结果集 result : "+result);
		if (queryArgs[0] instanceof MappedStatement) {
			//System.out.println("MappedStatement");
			processStatement((MappedStatement) queryArgs[0], queryArgs[1],false);
			/*RowBounds rowBounds=(RowBounds) queryArgs[2];
			int limit=rowBounds.getLimit();
			int offset=rowBounds.getOffset();
			CacheKey cacheKey=new CacheKey();
			cacheKey.update(limit);*/
		} else if (queryArgs[0] instanceof Connection) {
			System.out.println("Connection");
			//RoutingStatementHandler handler = (RoutingStatementHandler) invocation.getTarget();
			//processConnection(handler);
		}
		return result;
	}

	/**
	 * 
	 * @param invocation
	 */
	@SuppressWarnings("unused")
	private void processConnection(RoutingStatementHandler handler) {
		StatementHandler delegate = (StatementHandler)ReflectUtil.getFieldValue(handler, "delegate");
		BoundSql boundSql = delegate.getBoundSql();
		String mapperSQL = boundSql.getSql();
		System.out.println("m:"+mapperSQL);
		boolean interceptor = mapperSQL.matches(_SQL_REGEX);
		if (!interceptor)
			return;// 不处理
        MappedStatement mappedStatement = (MappedStatement)ReflectUtil.getFieldValue(delegate, "mappedStatement");
		Class<?> entityClass = getClass(mappedStatement);
		String new_sql = MapperSqlHelper.getExecuSQL(entityClass, mapperSQL, null);
		System.out.println("s:"+new_sql);
		 Pattern p = Pattern.compile(_PARAM_REGEX);
	        Matcher m = p.matcher(new_sql);
	        while(m.find()){
	        	new_sql=new_sql.replaceAll(m.group(0).replaceAll("\\{", "\\\\{"), "?");
	        }
	        System.out.println(new_sql);
		ReflectUtil.setFieldValue(boundSql, "sql", new_sql);
	}

	private Class<?> getClass(MappedStatement mappedStatement) {
		String resFile = mappedStatement.getResource();
		int index = resFile.lastIndexOf(".java");
		String javaFile = null;
		if (index > 0) {
			javaFile = resFile.substring(0, index).replace('/', '.');
		} else
			return null;
		try {
			Class<?> clazz = Class.forName(javaFile);
			Type[] types = clazz.getGenericInterfaces();//获取泛型接口的方法
			Type[] params = ((ParameterizedType) types[0]).getActualTypeArguments();
			Class<?> entityClass = (Class<?>) params[0];
			return entityClass;
		} catch (ClassNotFoundException ex) {
			System.out.println(ex.getMessage());
			return null;
		}
	}

	/**
	 * 
	 */
	public Object plugin(Object o) {
		return Plugin.wrap(o, this);
	}

	/**
	 * 
	 */
	public void setProperties(Properties arg0) {
	}

	private Map<String, String> getLast_sqls() {
		return last_sqls;
	}

	@SuppressWarnings("unused")
	private void setLast_sqls(Map<String, String> last_sqls) {
		this.last_sqls = last_sqls;
	}
	
	private void putLast_sqls(String key , String value) {
		this.getLast_sqls().put(key, value);
	}
	
	private String getLast_sqls(String key) {
		return this.getLast_sqls().get(key);
	}
}