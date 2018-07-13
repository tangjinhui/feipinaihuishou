package com.recovery.core.helper;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SecurityHelper {
	/**
	 * 
	 * @param str
	 * @return
	 */
	public static String md5(String str){	
		
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");			
			byte[] output=md.digest(str.getBytes());
		      return byteArrayToHex(output);  
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
			return str;					
	}	
	/**
	 * 
	 * @param byteArray
	 * @return
	 */
	public static String byteArrayToHex(byte[] byteArray) {  		  
		   char[] hexDigits = {'0','1','2','3','4','5','6','7','8','9', 'A','B','C','D','E','F' };  		  
		   char[] resultCharArray =new char[byteArray.length * 2];  
		   int index = 0;  		  
		   for (byte b : byteArray) {  		  
		      resultCharArray[index++] = hexDigits[b>>> 4 & 0xf];  		  
		      resultCharArray[index++] = hexDigits[b& 0xf];  		  
		   }  
		   return new String(resultCharArray);  	
	}
}
