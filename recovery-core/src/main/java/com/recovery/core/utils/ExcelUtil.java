package com.recovery.core.utils;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.formula.functions.T;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.river.core.helper.NumberHelper;

/**
 * 
 * @author zyy
 *
 */
public class ExcelUtil<T> {
	public final static String excel2003L = ".xls"; // 2003- 版本的excel
	public final static String excel2007U = ".xlsx"; // 2007+ 版本的excel

	/**
	 * excel版本号
	 */
	public String excelVersion = ExcelUtil.excel2003L;

	/**
	 * 根据excel版本创建相应的工作薄
	 * 
	 * @return
	 * @throws Exception
	 */
	public Workbook getWorkbook() throws Exception {
		Workbook wb = null;
		if (excel2003L.equals(this.getExcelVersion())) {
			wb = new HSSFWorkbook();
		} else if (excel2007U.equals(this.getExcelVersion())) {
			wb = new XSSFWorkbook();
		} else {
			throw new Exception("excel版本有误！");
		}
		return wb;
	}

	// 导出多个sheet
	public Workbook getResultSheetList(Workbook wb, String sheetName, List<List<T>> entityList, Class<T> entityClass)
			throws Exception {
		CellStyle style = wb.createCellStyle();
		style.setLocked(true);
		Sheet sheet = null;
		Row row = null;
		Cell cell = null;
		int rowNum = 0;
		int cloNum = 0;
		if (wb == null) {
			wb = this.getWorkbook();
		}
		sheet = wb.createSheet(sheetName);
		// 处理数据，将数据装到excel中
		for (List<T> entity : entityList) {
			row = sheet.createRow(rowNum++);
			cloNum =0;
			for(T en:entity) {
				if (en != null && !en.equals("") && !en.equals("null")) {
					cell = row.createCell(cloNum++);
					if (NumberHelper.isNumeric(en.toString())) {
						cell.setCellValue(Double.parseDouble(en.toString()));
					} else {
						cell.setCellValue(en.toString());
					}
					cell.setCellStyle(style);
				}
			}
			
		}
		return wb;
	}
	
	public void writeExcelAll(Map<String, Map<Class, List<List<T>>>> dataList, HttpServletResponse response, String fileName) {
		OutputStream out = null;
		Workbook wb = null;
		if (fileName == null && fileName.equals("")) {
			fileName = "可研预测数据模版";
		}
		try {
			try {
				response.reset();
				response.setContentType("application/vnd.ms-excel");
				response.setHeader("Connection", "close");
				response.setHeader("Content-disposition",
						"attachment; filename=" + new String((fileName).getBytes("gb2312"), "iso8859-1") + ".xls");
				
			} catch (Exception ue) {
				ue.printStackTrace();
			}
			out = response.getOutputStream();
			wb = this.getWorkbook();
			 for (String key : dataList.keySet()) {
				 for (Class key1 :  dataList.get(key).keySet()) {
					 this.getResultSheetList(wb,key,dataList.get(key).get(key1), key1);
				 }
			 }
			wb.write(out);
			out.flush();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				try {
					out.close();
				} catch (Exception ex) {
				}
			}
			if(wb!=null) {
				try {
					wb.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public String getExcelVersion() {
		return excelVersion;
	}

	public void setExcelVersion(String excelVersion) {
		this.excelVersion = excelVersion;
	}

}
