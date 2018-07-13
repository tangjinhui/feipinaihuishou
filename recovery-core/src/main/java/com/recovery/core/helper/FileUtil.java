package com.recovery.core.helper;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

public class FileUtil {

	private static final int BUFFER_SIZE = 1024;
	
	public static void copyFile(File sourceFile, File destFile) {
		try {
			destFile.createNewFile();
			
			InputStream in = null;
			OutputStream out = null;
			try {
				in = new BufferedInputStream(new FileInputStream(sourceFile), BUFFER_SIZE);
				out = new BufferedOutputStream(new FileOutputStream(destFile), BUFFER_SIZE);
				byte[] buffer = new byte[BUFFER_SIZE];
				 int len = 0;
	            while ((len = in.read(buffer)) > 0) {
	                out.write(buffer, 0, len);
					buffer = new byte[BUFFER_SIZE];
				}
			} finally {
				if (null != in) {
					in.close();
				}
				if (null != out) {
					out.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void copyFile(InputStream in, File destFile) {
		try {
			destFile.createNewFile();
			OutputStream out = null;
			try {
				out = new FileOutputStream(destFile);
				byte[] buffer = new byte[BUFFER_SIZE];
				 int len = 0;
		        while ((len = in.read(buffer)) > 0) {
		                out.write(buffer, 0, len);
					buffer = new byte[BUFFER_SIZE];
				}
			} finally {
				if (null != in) {
					in.close();
				}
				if (null != out) {
					out.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void copyFile(InputStream in, OutputStream out) {
		try {
			try {
				byte[] buffer = new byte[BUFFER_SIZE];
				 int len = 0;
		        while ((len = in.read(buffer)) > 0) {
		                out.write(buffer, 0, len);
					buffer = new byte[BUFFER_SIZE];
				}
			} finally {
				if (null != in) {
					in.close();
				}
				if (null != out) {
					out.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 获得唯一的文件名称
	 * 
	 * @return
	 */
	public static String getUniqueFileName(String fileName) {
		String generateGUID = StringHelper.generateGUID();
		int i = fileName.lastIndexOf('.');
		String lastname = fileName.substring(i + 1);

		StringBuffer path = new StringBuffer();
		path.append(generateGUID);
		path.append(".");
		path.append(lastname);

		return path.toString();
	}
	
	/**
	 * 获取文件后缀
	 * @param fileName
	 * @return
	 */
	public static String getFileLastName(String fileName) {
		int i = fileName.lastIndexOf('.');
		String lastname = fileName.substring(i + 1);
		return lastname;
	}
	
}
