package com.recovery.core.helper;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.Part;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.recovery.core.annotation.DataInput;
import com.recovery.core.entity.EntityBase;

@SuppressWarnings("unused")
public abstract class DataInputHelper<T extends EntityBase> {

	private final static String excel2003L = ".xls"; // 2003- 版本的excel
	private final static String excel2007U = ".xlsx"; // 2007+ 版本的excel

	public abstract ServletContext getServletContext();

	// 表头的行数
	private Integer rowNum = 1;
	// 数据开始的列
	private Integer cloumNumStart = 1;

	public List<T> getResult(File file, Class<T> entityClass) {
		InputStream in = null;
		try {
			in = new FileInputStream(file);
			return this.getResult(in, entityClass, file.getName());
		} catch (Exception e) {
			System.out.println("file类型文件获取输入流失败...");
		} finally {
			if (null != in) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}

	public List<T> getResult(Part part, Class<T> entityClass) {
		try {
			InputStream inputStream;
			inputStream = part.getInputStream();
			return this.getResult(inputStream, entityClass, part.getName());
		} catch (IOException e) {
			System.out.println("part类型文件获取输入流失败...");
		}
		return null;
	}

	/**
	 * 获取结果集
	 * 
	 * @param in
	 * @param entityClass
	 * @param fileName
	 * @return
	 * @throws Exception
	 */
	public List<T> getResult(InputStream in, Class<T> entityClass, String fileName) {
		Workbook wb = null;
		Sheet sheet;
		Row row;

		// 结果集
		List<T> resultList = new ArrayList<>();
		Field[] declaredFields = entityClass.getFields();
		// 获取整个excel文件
		try {
			wb = getWorkbook(in, fileName);
		} catch (Exception e) {
			System.out.println("文件格式解析错误！");
		}
		if (wb != null) {
			for (int i = 0; i < wb.getNumberOfSheets(); i++) {
				// 分别处理excel中的每一页 sheet
				sheet = wb.getSheetAt(i);
				// 处理表头行
				row = sheet.getRow(this.getRowNum());
				List<Field> fieldList = this.getFieldList(declaredFields, row);
				// 处理数据，将数据分装到对象里面
				//System.out.println(sheet.getPhysicalNumberOfRows());
				for (int j = this.getRowNum() + 1; j <= sheet.getPhysicalNumberOfRows() + this.getRowNum(); j++) {
					row = sheet.getRow(j);
					if (row != null) {
						T entity = this.setValueFromRow(entityClass, row, fieldList);
						resultList.add(entity);
					}
				}
			}
		}
		return resultList;
	}

	/**
	 * 描述：根据文件后缀，自适应上传文件的版本
	 * 
	 * @param inStr,fileName
	 * @return
	 * @throws Exception
	 */
	public Workbook getWorkbook(InputStream inStr, String fileName) throws Exception {
		//Workbook wb = null;
		Workbook wb = WorkbookFactory.create(inStr);
		/*String fileType = fileName.substring(fileName.lastIndexOf("."));
		if (excel2003L.equals(fileType)) {
			wb = new HSSFWorkbook(inStr);
		} else if (excel2007U.equals(fileType)) {
			wb = new XSSFWorkbook(inStr);
		} else {
			throw new Exception("解析的文件格式有误！");
		}*/
		return wb;
	}

	/**
	 * 根据表头信息，获取Field的list集合
	 * 
	 * @param declaredFields
	 * @param row
	 * @return
	 */
	@SuppressWarnings({ "deprecation", "unlikely-arg-type" })
	public List<Field> getFieldList(Field[] declaredFields, Row row) {
		List<Field> result = new ArrayList<>();
		if (row != null) {
			//System.out.println(row.getPhysicalNumberOfCells());
			for (int i = this.getCloumNumStart(); i < this.getCloumNumStart() + row.getPhysicalNumberOfCells(); i++) {
				Cell cell = row.getCell(i);
				if (cell == null || cell.equals("") || cell.getCellType() == HSSFCell.CELL_TYPE_BLANK) {
					break;
				} else {
					String cellFormatValue = this.getCellFormatValue(cell);
					Field field = this.getField(declaredFields, cellFormatValue);
					result.add(field);
				}
			}
		}
		return result;
	}

	/**
	 * 获取当前cell对应的Field
	 * 
	 * @param declaredFields
	 * @param cellFormatValue
	 * @return
	 */
	public Field getField(Field[] declaredFields, String cellFormatValue) {
		Field result = null;
		for (Field field : declaredFields) {
			DataInput dataInput = field.getAnnotation(DataInput.class);
			if (dataInput == null) {
				continue;
			} else {
				if (dataInput.columnName().equals(cellFormatValue)) {
					result = field;
					return result;
				}
			}
		}
		return result;
	}

	/**
	 * 获取当前cell的值
	 * 
	 * @param cell
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public String getCellFormatValue(Cell cell) {
		String cellValue = "";
		switch (cell.getCellType()) {
		case HSSFCell.CELL_TYPE_STRING:// 字符串类型
			cellValue = cell.getStringCellValue();
			if (cellValue.trim().equals("") || cellValue.trim().length() <= 0)
				cellValue = " ";
			break;
		case HSSFCell.CELL_TYPE_NUMERIC: // 数值类型
			cellValue = String.valueOf(cell.getNumericCellValue());
			break;
		case HSSFCell.CELL_TYPE_FORMULA: // 公式
			cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
			cellValue = String.valueOf(cell.getNumericCellValue());
			break;
		case HSSFCell.CELL_TYPE_BLANK:
			cellValue = " ";
			break;
		case HSSFCell.CELL_TYPE_BOOLEAN:
			break;
		case HSSFCell.CELL_TYPE_ERROR:
			break;
		default:
			break;
		}
		return cellValue;
	}

	/**
	 * 将excel中每一行的数据，按照列的顺序，注入到实体类中
	 * 
	 * @param entity
	 *            实体类
	 * @param row
	 *            每一行的数据
	 * @param fieldList
	 *            列的顺序
	 */
	@SuppressWarnings({ "deprecation", "unlikely-arg-type" })
	public T setValueFromRow(Class<T> entityClass, Row row, List<Field> fieldList) {
		T entity = null;
		if (row != null) {
			for (int i = this.getCloumNumStart(), j = 0; i < this.getCloumNumStart()
					+ row.getPhysicalNumberOfCells(); i++, j++) {
				Cell cell = row.getCell(i);
				if (cell == null || cell.equals("") || cell.getCellType() == HSSFCell.CELL_TYPE_BLANK) {
					break;
				} else {
					if (entity == null) {
						try {
							entity = entityClass.newInstance();
						} catch (InstantiationException | IllegalAccessException e) {
							e.printStackTrace();
						}
					}
					String cellFormatValue = this.getCellFormatValue(cell);
					Field field = fieldList.get(j);
					Object value = this.getValueWithAnnotationAndCellValue(cellFormatValue, field);
					this.setValueToEntity(value, entity, field);
				}
			}
		}
		return entity;
	}

	public Object getValueWithAnnotationAndCellValue(String cellFormatValue, Field field) {
		DataInput dataInput = field.getAnnotation(DataInput.class);
		Object result = null;
		if (!dataInput.isConvertValue()) {
			result = cellFormatValue;
		} else {
			String mapperName = dataInput.mapperName();
			String mapperMethod = dataInput.mapperMethod();
			String resultValue = dataInput.resultValue();
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
				String parameterName = clas.getName();
				param = this.valueToType(cellFormatValue, clas);
			}
			Object invoke;
			try {
				invoke = method.invoke(bean, param);
				Field field2 = invoke.getClass().getField(resultValue);
				Object object = field2.get(invoke);
				return object;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 将数据分装到实体类对象的具体属性中
	 * 
	 * @param value
	 * @param entity
	 * @param field
	 */
	public void setValueToEntity(Object value, T entity, Field field) {
		Class<?> type = field.getType();
		Object valueToType = this.valueToType(value, type);
		try {
			field.set(entity, valueToType);
		} catch (IllegalArgumentException | IllegalAccessException e) {
			System.out.println("类型转换异常。。。");
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

	public Integer getRowNum() {
		return rowNum;
	}

	public void setRowNum(Integer rowNum) {
		this.rowNum = rowNum;
	}

	public Integer getCloumNumStart() {
		return cloumNumStart;
	}

	public void setCloumNumStart(Integer cloumNumStart) {
		this.cloumNumStart = cloumNumStart;
	}

}
