package com.recovery.core.dao;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.binding.MapperMethod.ParamMap;

import com.recovery.core.annotation.AnnotationHelper;
import com.recovery.core.annotation.RiverColumn;
import com.recovery.core.annotation.RiverTable;
import com.recovery.core.entity.TreeEntityBase;
import com.recovery.core.exception.RiverException;

public class MapperSqlHelper {
	// query
	private final static String GET_BYID = "river.getById";
	private final static String GET_BYCODE = "river.getByCode";
	private final static String GET_BYGUID = "river.getByGUID";
	private final static String GET_LASTINSERTID = "river.getLastInsertId";

	private final static String GET_ONEFIELD_BYID = "river.getOneFieldById";
	private final static String GET_ONEFIELD_BYCODE = "river.getOneFieldByCode";
	private final static String ISEXIST_CODE = "river.isExistCode";
	private final static String ISEXIST_TITLE = "river.isExistTitle";
	private final static String COUNT = "river.count";
	private final static String COUNTBY = "river.countBy";
	private final static String QUERYBY = "river.queryBy";
	private final static String QUERYALL = "river.queryAll";
	private final static String REMOVE = "river.remove";
	private final static String REMOVEBY = "river.removeBy";
	private final static String DISABLE = "river.disable";
	private final static String BATCH_REMOVE = "river.batchRemove";

	// update,insert
	private final static String UPDATE_ONEFIELD_BYID = "river.updateOneFieldById";
	private final static String UPDATE_ONEFIELD_BYCODE = "river.updateOneFieldByCode";
	private final static String INSERT = "river.insert";
	private final static String UPDATE = "river.update";
	// tree
	private final static String GET_CHILDREN = "river.getChildren";
	private final static String GET_CHILD = "river.getChild";
	private final static String GET_PARENT = "river.getParent";

	/**
	 * 根据ID获取实体对象
	 * 
	 * @param mapperclazz
	 * @return
	 */
	private static String getById(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();

		sql.append("SELECT * FROM " + getTableName(entityClass) + " WHERE entityId= #{entityId}");
		return sql.toString();
	}

	/**
	 * 根据编码获取实体对象
	 * 
	 * @param entityClass
	 * @return
	 */
	private static String getByCode(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();

		sql.append("SELECT * FROM " + getTableName(entityClass) + " WHERE entityCode= #{entityCode} LIMIT 0,1");

		return sql.toString();
	}

	/**
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	private static String getByGUID(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();

		sql.append("SELECT * FROM " + getTableName(entityClass) + " WHERE entityGUID= #{entityGUID}");
		return sql.toString();
	}

	/**
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	private static String getLastInsertId(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();

		sql.append("SELECT LAST_INSERT_ID()");
		return sql.toString();
	}

	/**
	 * 根据ID获取某个字段的取值
	 * 
	 * @param entityClass
	 * @return
	 */
	@SuppressWarnings("unchecked") //
	private static String getOneFieldById(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		if (args instanceof ParamMap) {
			ParamMap<Object> map = (ParamMap<Object>) args;
			if (!map.containsKey("fieldName")) {
				System.out.println("fieldName不允许为空");
			}
			if (!map.containsKey("entityId")) {
				System.out.println("entityId不允许为空");
			}

			sql.append("SELECT $fieldName$ FROM " + getTableName(entityClass) + " WHERE entityId= ${entityId}");
		}
		return sql.toString();
	}

	/**
	 * 根据业务编码获取某个字段的取值
	 * 
	 * @param entityClass
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	private static String getOneFieldByCode(Class<?> entityClass, Object args) {
		if (args == null)
			return null;
		StringBuilder sql = new StringBuilder();
		// String fieldName = null;
		if (args instanceof ParamMap) {
			ParamMap<Object> map = (ParamMap<Object>) args;
			if (!map.containsKey("fieldName")) {
				System.out.println("缺少参数fieldName");
			}
			if (!map.containsKey("entityCode")) {
				System.out.println("缺少参数entityCode");
			}
			// fieldName = (String) map.get("fieldName");
		}

		sql.append("SELECT $fieldName$ FROM " + getTableName(entityClass) + " WHERE entityCode= #{entityCode}");
		return sql.toString();
	}

	/**
	 * 获取记录总数
	 * 
	 * @param entityClass
	 * @return
	 */
	private static String count(Class<?> entityClass) {
		return countBy(entityClass, null);
	}

	/**
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	private static String countBy(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		StringBuilder whereSQL = new StringBuilder(" WHERE 1=1 ");

		sql.append("SELECT count(*) FROM " + getTableName(entityClass));
		// topicId=topicId,optionId=entityId
		/*
		 * if (args != null && args instanceof Map) { Map<String, Object> map =
		 * (Map<String, Object>) args; sql.append(whereSQL).append(buildWhere(map)); }
		 */
		sql.append(whereSQL).append(buildWhere(args));
		return sql.toString();

	}

	/**
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	private static String isExistCode(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT count(*) FROM " + getTableName(entityClass));
		sql.append(" WHERE entityCode=#{entityCode} AND entityId!=#{entityId}");
		return sql.toString();

	}

	/**
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	private static String isExistTitle(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT count(*) FROM " + getTableName(entityClass));

		sql.append(" WHERE entityTitle=#{entityTitle} AND entityId!=#{entityId}");
		return sql.toString();

	}

	/**
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	private static String queryBy(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		StringBuilder whereSQL = new StringBuilder();
		sql.append("SELECT * FROM " + getTableName(entityClass) + " WHERE isDelete=0 ");
		/*
		 * if (args != null && args instanceof Map) { Map<String, Object> map =
		 * (Map<String, Object>) args; sql.append(whereSQL).append(buildWhere(map)); }
		 */
		sql.append(whereSQL).append(buildWhere(args));
		return sql.toString();
	}

	@SuppressWarnings("unchecked")
	private static String disable(Class<?> entityClass, Object args) {
		if (args == null)
			return null;
		StringBuilder sql = new StringBuilder();
		if (args instanceof ParamMap) {
			ParamMap<Object> map = (ParamMap<Object>) args;
			if (!map.containsKey("status")) {
				System.out.println("缺少参数status");
			}
			if (!map.containsKey("entityId")) {
				System.out.println("缺少参数entityId");
			}
		}
		RiverTable table = AnnotationHelper.getTable(entityClass);
		if (table != null) {
			sql.append("UPDATE " + (table.Name() == "" ? entityClass.getName() : table.Name())
					+ " SET isDisable=#{status},disableTime=now() WHERE entityId= #{entityId}");
		}
		return sql.toString();
	}

	@SuppressWarnings("unchecked")
	private static String remove(Class<?> entityClass, Object args) {
		if (args == null)
			return null;
		StringBuilder sql = new StringBuilder();
		if (args instanceof ParamMap) {
			ParamMap<Object> map = (ParamMap<Object>) args;
			if (!map.containsKey("entityId")) {
				System.out.println("缺少参数entityId");
			}
		}

		sql.append(
				"UPDATE " + getTableName(entityClass) + " SET isDelete=1,deleteTime=now() WHERE entityId= #{entityId}");

		return sql.toString();
	}

	private static String removeBy(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		StringBuilder whereSQL = new StringBuilder(" where 1=1 ");

		sql.append("UPDATE " + getTableName(entityClass) + " SET isDelete=1,deleteTime=now()");
		/*
		 * if (args != null && args instanceof Map) { Map<String, Object> map =
		 * (Map<String, Object>) args; sql.append(whereSQL).append(buildWhere(map)); }
		 */
		sql.append(whereSQL).append(buildWhere(args));
		return sql.toString();
	}

	/**
	 * 根据传入的参数构造where条件
	 * 
	 * @param map
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private static CharSequence buildWhere(Object args) {

		String builder = new String();
		Map<String, Object> map = null;
		if (args != null) {
			if (args instanceof Map) {
				// 参数如果为map
				map = (Map<String, Object>) args;
			} else if (args instanceof String) {
				// 参数如果为String 从其他方法调用公用方法时传入的参数为String
				map = mapTransFormString((String) args);
			}
			if (map == null)
				return null;
			builder = parameterDispose(map);
			/*for (String key : map.keySet()) {
				builder.append(" and " + key + " = #{" + key + "} ");
			}*/
			return builder;
		}
		return builder;
	}

	/**
	 * 将子查询中的String类型参数转换为Map，进行where条件的装配
	 * 
	 * @param args
	 * @return
	 */
	private static Map<String, Object> mapTransFormString(String args) {
		Map<String, Object> result = new HashMap<>();
		String str = new String(args);
		str = str.replace("{", "");
		str = str.replace("}", "");
		String[] split = str.split(",");
		for (int i = 0; i < split.length; i++) {
			String[] split2 = split[i].split("=");
			if (split2 != null && split2.length == 2) {
				result.put(split2[0].trim(), split2[1].trim());
			}
		}
		return result;
	}

	/**
	 * 处理参数
	 * @param map
	 * @return
	 */
	private static String parameterDispose(Map<String,Object> map) {
		StringBuffer whereStr = new StringBuffer();
		for (String key : map.keySet()) {
			Object value = map.get(key);
			if (value instanceof Object) {
				whereStr.append(" and " + key + " = #{" + key + "} ");
			}
		}
		return whereStr.toString();
	}

	/**
	 * 获取表的名字
	 * 
	 * @param entityClass
	 * @return
	 */
	private static String getTableName(Class<?> entityClass) {
		RiverTable table = AnnotationHelper.getTable(entityClass);
		if (table != null) {
			return table.Name() == "" ? entityClass.getName() : table.Name();
		}
		return entityClass.getName();
	}

	/**
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	private static String insert(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		StringBuilder intosql = new StringBuilder();
		StringBuilder valuessql = new StringBuilder();
		sql.append("INSERT INTO " + getTableName(entityClass));
		Field[] fields = entityClass.getFields();
		intosql.append("(");
		for (Field field : fields) {
			field.setAccessible(true);
			if (field.isAnnotationPresent(RiverColumn.class)) {
				RiverColumn column = (RiverColumn) field.getAnnotation(RiverColumn.class);
				if (column.isAutoKey())
					continue;
				if (column.isParentId() && !(TreeEntityBase.class.isAssignableFrom(entityClass)))
					continue;
				if (column.Name().equals("")) {
					intosql.append(field.getName() + ",");
				} else {
					intosql.append(column.Name() + ",");
				}

			}
		}
		valuessql.append(" VALUES (");
		for (Field field : fields) {
			field.setAccessible(true);
			if (field.isAnnotationPresent(RiverColumn.class)) {
				RiverColumn column = (RiverColumn) field.getAnnotation(RiverColumn.class);
				if (column.isAutoKey())
					continue;
				if (column.isParentId()) {
					if (!(TreeEntityBase.class.isAssignableFrom(entityClass))) {
						continue;
					}
				}
				if (column.isCreateTime()) {
					valuessql.append("now(),");
				} else if (column.Name().equals("")) {
					valuessql.append("#{" + field.getName() + "},");
				} else {
					valuessql.append("#{" + column.Name() + "},");
				}
			}
		}
		return sql.append(intosql.substring(0, intosql.length() - 1)).append(") ")
				.append(valuessql.substring(0, valuessql.length() - 1)).append(")").toString();
	}

	/**
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	@SuppressWarnings("unlikely-arg-type")
	private static String update(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		StringBuilder setsql = new StringBuilder();
		StringBuilder wheresql = new StringBuilder();
		sql.append("UPDATE  " + getTableName(entityClass));

		Field[] fields = entityClass.getFields();
		setsql.append(" SET ");
		wheresql.append(" WHERE 1=1 ");
		for (Field field : fields) {
			field.setAccessible(true);
			if (field.isAnnotationPresent(RiverColumn.class)) {
				RiverColumn column = (RiverColumn) field.getAnnotation(RiverColumn.class);
				if (column.isParentId() && !(TreeEntityBase.class.isAssignableFrom(entityClass)))
					continue;
				if (!column.isAutoKey()) {// 判断字段不为主键
					if (column.Name().equals("")) {
						if (column.isUpdateTime()) {
							setsql.append(field.getName() + " = now(),");
						} else
							setsql.append(field.getName() + " = #{" + field.getName() + "} ,");
					} else {
						if (column.isUpdateTime()) {
							setsql.append(column.Name() + " = now(),");
						} else
							setsql.append(column.Name() + " = #{" + column.Name() + "} ,");
					}
				} else {
					if (column.Name().equals("")) {
						wheresql.append(" and " + field.getName() + " = #{" + field.getName() + "},");
					} else {
						wheresql.append(" and " + column.Name() + " = #{" + column.Name() + "},");
					}
				}
			}
		}
		if (wheresql.equals(" WHERE 1=1 ")) {
			throw new RiverException("实体变量没有设置自增字段值");
		}
		sql.append(setsql.substring(0, setsql.length() - 1)).append(wheresql.substring(0, wheresql.length() - 1));
		return sql.toString();
	}

	/**
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private static String updateOneFieldById(Class<?> entityClass, Object args) {
		if (args == null)
			return null;
		StringBuilder sql = new StringBuilder();
		if (args instanceof ParamMap) {
			ParamMap<Object> map = (ParamMap<Object>) args;
			if (!map.containsKey("fieldName")) {
				System.out.println("缺少参数fieldName");
			}
			if (!map.containsKey("entityId")) {
				System.out.println("缺少参数entityId");
			}
		}
		RiverTable table = AnnotationHelper.getTable(entityClass);
		if (table != null) {
			sql.append("UPDATE " + (table.Name() == "" ? entityClass.getName() : table.Name())
					+ " SET ${fieldName}=#{fieldValue},updateTime=now() WHERE entityId= #{entityId}");
		}
		return sql.toString();
	}

	@SuppressWarnings("unchecked")
	private static String updateOneFieldByCode(Class<?> entityClass, Object args) {
		if (args == null)
			return null;
		StringBuilder sql = new StringBuilder();
		if (args instanceof ParamMap) {
			ParamMap<Object> map = (ParamMap<Object>) args;
			if (!map.containsKey("fieldName")) {
				System.out.println("缺少参数fieldName");
			}
			if (!map.containsKey("entityCode")) {
				System.out.println("缺少参数entityCode");
			}
		}
		RiverTable table = AnnotationHelper.getTable(entityClass);
		if (table != null) {
			sql.append("UPDATE " + (table.Name() == "" ? entityClass.getName() : table.Name())
					+ " SET ${fieldName}=#{fieldValue},updateTime=now() WHERE entityCode= #{entityCode}");
		}
		return sql.toString();
	}

	/**
	 * 
	 * @param entityClass
	 * @return
	 */
	public static String queryAll(Class<?> entityClass, Object args) {
		return queryBy(entityClass, args);
	}

	/**
	 * 功能暂时未实现
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	private static String getChildren(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		StringBuilder whereSQL = new StringBuilder(" WHERE isDelete=0 ");
		sql.append("SELECT * FROM " + getTableName(entityClass));
		/*
		 * if (args != null && args instanceof Map) { Map<String, Object> map =
		 * (Map<String, Object>) args; sql.append(whereSQL).append(buildWhere(map)); }
		 */
		sql.append(whereSQL).append(buildWhere(args));
		return sql.toString();
	}

	/**
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private static String getChild(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT * FROM " + getTableName(entityClass) + " WHERE isDelete=0 ");

		if (args instanceof ParamMap) {
			ParamMap<Object> map = (ParamMap<Object>) args;
			if (!map.containsKey("parentId")) {
				System.out.println("缺少参数parentId");
			}
		}
		sql.append(" AND parentId=#{parentId}");
		return sql.toString();
	}

	/**
	 * 批量移除
	 * 
	 * @param entityClass
	 * @param param
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private static String batchRemove(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		StringBuilder whereSQL = new StringBuilder(" where 1=1 ");
		StringBuilder inSQL = new StringBuilder();

		sql.append("UPDATE " + getTableName(entityClass) + " SET isDelete=1,deleteTime=now()");
		if (args != null && args instanceof ParamMap) {
			ParamMap<Object> map = (ParamMap<Object>) args;
			if (!map.containsKey("listEntityId")) {
				System.out.println("缺少参数listEntityId");
				throw new RiverException("缺少参数listEntityId");
			}
			Object entityIds = map.get("listEntityId");
			if (entityIds != null && entityIds instanceof List) {
				List<Long> list = (List<Long>) entityIds;
				if (list.size() > 0) {
					for (Long l : list) {
						inSQL.append(l + ",");
					}
				} else {
					throw new RiverException("缺少参数listEntityId");
				}
			} else {
				throw new RiverException("缺少参数listEntityId");
			}
		} else {
			throw new RiverException("缺少参数listEntityId");
		}
		sql.append(whereSQL).append("and entityId in (").append(inSQL.substring(0, inSQL.length() - 1)).append(")");
		return sql.toString();
	}

	/**
	 * 
	 * @param entityClass
	 * @param args
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private static String getParent(Class<?> entityClass, Object args) {
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT * FROM " + getTableName(entityClass));

		if (args instanceof ParamMap) {
			ParamMap<Object> map = (ParamMap<Object>) args;
			if (!map.containsKey("parentId")) {
				System.out.println("缺少参数parentId");
			}
		}
		sql.append(" WHERE entityId=#{parentId}");
		return sql.toString();
	}

	/**
	 * 
	 * @param entityClass
	 * @param mappersql
	 * @param param
	 * @return
	 */
	public static String getExecuSQL(Class<?> entityClass, String mappersql, Object param) {
		if (mappersql.equals(GET_BYID)) {
			return getById(entityClass, param);
		} else if (mappersql.equals(GET_BYCODE)) {
			return getByCode(entityClass, param);
		} else if (mappersql.equals(GET_BYGUID)) {
			return getByGUID(entityClass, param);
		} else if (mappersql.equals(GET_LASTINSERTID)) {
			return getLastInsertId(entityClass, param);
		} else if (mappersql.equals(ISEXIST_CODE)) {
			return isExistCode(entityClass, param);
		} else if (mappersql.equals(ISEXIST_TITLE)) {
			return isExistTitle(entityClass, param);
		} else if (mappersql.equals(GET_ONEFIELD_BYCODE)) {
			return getOneFieldByCode(entityClass, param);
		} else if (mappersql.equals(GET_ONEFIELD_BYID)) {
			return getOneFieldById(entityClass, param);
		} else if (mappersql.equals(COUNT)) {
			return count(entityClass);
		} else if (mappersql.equals(COUNTBY)) {
			return countBy(entityClass, param);
		} else if (mappersql.equals(QUERYBY)) {
			return queryBy(entityClass, param);
		} else if (mappersql.equals(QUERYALL)) {
			return queryAll(entityClass, param);
		} else if (mappersql.equals(DISABLE)) {
			return disable(entityClass, param);
		} else if (mappersql.equals(REMOVE)) {
			return remove(entityClass, param);
		} else if (mappersql.equals(REMOVEBY)) {
			return removeBy(entityClass, param);
		} else if (mappersql.equals(INSERT)) {
			return insert(entityClass, param);
		} else if (mappersql.equals(UPDATE)) {
			return update(entityClass, param);
		} else if (mappersql.equals(UPDATE_ONEFIELD_BYID)) {
			return updateOneFieldById(entityClass, param);
		} else if (mappersql.equals(UPDATE_ONEFIELD_BYCODE)) {
			return updateOneFieldByCode(entityClass, param);
		} else if (mappersql.equals(GET_PARENT)) {
			return getParent(entityClass, param);
		} else if (mappersql.equals(GET_CHILD)) {
			return getChild(entityClass, param);
		} else if (mappersql.equals(GET_CHILDREN)) {
			return getChildren(entityClass, param);
		} else if (mappersql.equals(BATCH_REMOVE)) {
			return batchRemove(entityClass, param);
		}
		return null;
	}
}