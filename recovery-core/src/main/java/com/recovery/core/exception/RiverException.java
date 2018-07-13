package com.recovery.core.exception;

/**
 * 
 * @author Yinovo
 *
 */
public class RiverException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 951787367997083531L;

	public RiverException() {
		super();
	}

	public RiverException(String message) {
		super(message);
	}

	public RiverException(String message, Throwable cause) {
		super(message, cause);
	}

	public RiverException(Throwable cause) {
		super(cause);
	}

	public RiverException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
}
