package com.recovery.core.helper;

import java.util.Random;

/**
 * 随机字符生成
 * 
 * @author Yinovo
 *
 */
public class RandomString {

	private static final char[] symbols = new char[62];
	private static final char[] number = new char[10];

	static {
		for (int idx = 0; idx < 10; ++idx) {
			number[idx] = (char) ('0' + idx);
			symbols[idx] = (char) ('0' + idx);
		}
		for (int idx = 10; idx < 36; ++idx)
			symbols[idx] = (char) ('a' + idx - 10);
		for (int idx = 36; idx < 62; ++idx)
			symbols[idx] = (char) ('A' + idx - 36);
	}

	private final Random random = new Random();

	private final char[] buf;

	public RandomString(int length) {
		if (length < 1)
			throw new IllegalArgumentException("length < 1: " + length);
		buf = new char[length];
	}

	/**
	 * 生成随机字符串
	 * @return
	 */
	public String nextString() {
		for (int idx = 0; idx < buf.length; ++idx)
			buf[idx] = symbols[random.nextInt(symbols.length)];
		return new String(buf);
	}
	/**
	 * 返回固定位数的随机整数
	 * @return
	 */
	public Integer nextInt() {
		for (int idx = 0; idx < buf.length; ++idx) {
			int rd = random.nextInt(number.length);
			while (idx == 0 && rd == 0) {
				rd = random.nextInt(number.length);
			}
			buf[idx] = number[rd];
		}
		return Integer.parseInt(new String(buf));
	}
}