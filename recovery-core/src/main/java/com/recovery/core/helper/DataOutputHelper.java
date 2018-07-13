package com.recovery.core.helper;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletContext;

import java.util.Set;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.recovery.core.annotation.DataOutputColumn;
import com.recovery.core.annotation.DataOutputEntity;
import com.recovery.core.entity.EntityBase;
import com.recovery.core.exception.RiverException;

public abstract class DataOutputHelper<T extends EntityBase> {

	public final static String excel2003L = ".xls"; // 2003- 版本的excel
	public final static String excel2007U = ".xlsx"; // 2007+ 版本的excel

	/**
	 * excel版本号
	 */
	public String excelVersion = DataOutputHelper.excel2003L;

	public abstract ServletContext getServletContext();

	@SuppressWarnings({ "unchecked" })
	public Workbook getResult(List<T> entityList, Class<T> entityClass) throws Exception {
		DataOutputEntity dataOutputAnnotation = entityClass.getAnnotation(DataOutputEntity.class);
		Workbook wb = null;
		Sheet sheet = null;
		Row row = null;
		Cell cell = null;
		Boolean bool = true;
		int index = -1;
		if (dataOutputAnnotation != null) {
			int rowNum = 0;
			int cellNum = 0;
			wb = this.getWorkbook();
			sheet = wb.createSheet();
			// 设置标题
			if (dataOutputAnnotation.titleName() != null && !dataOutputAnnotation.titleName().equals("")) {
				row = sheet.createRow(rowNum++);
				cell = row.createCell(cellNum);
				cell.setCellValue(dataOutputAnnotation.titleName());
			}
			if (dataOutputAnnotation.isNum()) {
				index = 1;
			}
			List<Field> titles = null;
			// 处理数据，将数据装到excel中
			for (T entity : entityList) {
				if (rowNum % 5000 == 0) {
					sheet = wb.createSheet();
					rowNum = 0;
				}
				if (bool) {
					// 处理标题
					bool = false;
					row = sheet.createRow(rowNum++);
					cellNum = 0;
					T newInstance = entityClass.newInstance();
					Map<Integer, String> map = null;
					Class<?>[] interfaces = entityClass.getInterfaces();
					for (Class<?> class1 : interfaces) {
						if (class1.equals(DataOutputColumnOrder.class)) {
							Method declaredMethod = entityClass.getDeclaredMethod("columnOrder");
							map = (Map<Integer, String>) declaredMethod.invoke(newInstance);
							break;
						}
					}
					Field[] fields = entityClass.getFields();
					titles = this.getTitlesWithMapAndFields(map, fields);
					if (index != -1) {
						cell = row.createCell(cellNum++);
						cell.setCellValue("序号");
					}
					for (Field field : titles) {
						cell = row.createCell(cellNum++);
						cell.setCellValue(field.getAnnotation(DataOutputColumn.class).columnName());
					}
				}
				row = sheet.createRow(rowNum++);
				cellNum = 0;
				if (index != -1) {
					cell = row.createCell(cellNum++);
					cell.setCellValue(index++);
				}
				for (Field field : titles) {
					cell = row.createCell(cellNum++);
					this.setCellValue(cell, field, entity);
				}
			}
		}
		return wb;
	}

	public void setCellValue(Cell cell, Field field, T entity) throws Exception {
		Object entityValue = field.get(entity);
		String value = new String();
		DataOutputColumn dataOutputColumnAnnotation = field.getAnnotation(DataOutputColumn.class);
		if (entityValue != null) {
			if (dataOutputColumnAnnotation.isConvertValue()) {
				String mapperName = dataOutputColumnAnnotation.mapperName();
				String mapperMethod = dataOutputColumnAnnotation.mapperMethod();
				String resultValue = dataOutputColumnAnnotation.resultValue();
				Object param = null;
				ApplicationContext ac = WebApplicationContextUtils
						.getRequiredWebApplicationContext(this.getServletContext());
				Object bean = ac.getBean(mapperName);
				Method method = null;
				Method[] methods = bean.getClass().getMethods();
				for (int i = 0; i < methods.length; i++) {
					if (methods[i].getName().contains(mapperMethod)) {
						method = methods[i];
						break;
					}
				}
				Class<?>[] parameterTypes = method.getParameterTypes();
				for (Class<?> clas : parameterTypes) {
					param = this.valueToType(entityValue, clas);
				}
				Object invoke;
				try {
					invoke = method.invoke(bean, param);
					Field field2 = invoke.getClass().getField(resultValue);
					entityValue = field2.get(invoke);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (dataOutputColumnAnnotation.isDate()) {
				String fomate = dataOutputColumnAnnotation.fomat();
				SimpleDateFormat f = new SimpleDateFormat(fomate);
				value = f.format(entityValue);
			} else {
				value = entityValue.toString();
			}
			cell.setCellValue(value);
		}
	}

	/**
	 * 将value的类型进行转换
	 * 
	 * @param value
	 * @param entity
	 * @return
	 */
	public Object valueToType(Object value, Class<?> entity) {
		Object result = null;
		String type = entity.getName();
		if (type.equals("java.lang.String")) {
			result = (String) value;
		} else if (type.equals("long")) {
			result = ConverterUtils.toLong(value);
		} else if (type.equals("Long")) {
			result = ConverterUtils.toLong(value);
		}
		return result;
	}

	/**
	 * 将标题行列出
	 * 
	 * @param map
	 * @param fields
	 * @return
	 */
	public List<Field> getTitlesWithMapAndFields(Map<Integer, String> map, Field[] fields) {
		List<Field> result = new ArrayList<>();
		if (map != null) {
			Set<Entry<Integer, String>> entrySet = map.entrySet();
			for (Entry<Integer, String> entry : entrySet) {
				String value = entry.getValue();
				for (int i = 0; i < fields.length; i++) {
					Field field = fields[i];
					if (field.getName().equals(value) && field.getAnnotation(DataOutputColumn.class) != null) {
						result.add(field);
					}
				}
			}
		} else {
			for (int i = 0; i < fields.length; i++) {
				Field field = fields[i];
				if (field.getAnnotation(DataOutputColumn.class) != null) {
					result.add(field);
				}
			}
		}
		return result;
	}

	/**
	 * 根据excel版本创建相应的工作薄
	 * 
	 * @return
	 * @throws Exception
	 */
	private Workbook getWorkbook() throws Exception {
		Workbook wb = null;
		if (excel2003L.equals(this.getExcelVersion())) {
			wb = new HSSFWorkbook();
		} else if (excel2007U.equals(this.getExcelVersion())) {
			wb = new XSSFWorkbook();
		} else {
			throw new RiverException("excel版本有误！");
		}
		return wb;
	}

	public String getExcelVersion() {
		return excelVersion;
	}

	public void setExcelVersion(String excelVersion) {
		this.excelVersion = excelVersion;
	}

}
