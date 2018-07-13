package com.recovery.core.business;

public enum EnumFlowType {
	/**
	 * 立项
	 */
	SETUP(1),
	/**
	 * 可研
	 */
	FEASIBILITY(2),
	/**
	 * 投决
	 */
	DECISION(3),
	/**
	 * 投资价值评估
	 */
	AFTER(4), 
	/**
	 * 变更
	 */
	MODIFICATION(5),
	COMPLETE(6),//竣工结项
	EXIT(9);//退出
	private Integer flowType;

	private EnumFlowType(Integer flowType) {
		this.flowType = flowType;
	}

	public Integer getFlowType() {
		return flowType;
	}

}
