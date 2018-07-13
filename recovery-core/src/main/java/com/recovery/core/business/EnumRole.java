package com.recovery.core.business;

public enum EnumRole {
	/**
	 * 项目组成员
	 */
	Member("YEWURENYUAN"),//项目组成员
	/**
	 * 项目经理
	 */
	Teameader("XIANGMUJINGLI"),//项目经理
	/**
	 * 专家
	 */
	Expert("ZHUANJIA"),
	/**
	 * 风控
	 */
	RiskExpert("FENGKONG"),
	/**
	 * 赋能群
	 */
	Thinktank("FUNENGQUN"),//赋能群
	/**
	 * 一把手
	 */
	Groupleader("YIBASHOU"),//一把手
	/**
	 * CFO
	 */
	CFO("CFO"),//CFO
	/**
	 * CEO
	 */
	CEO("CEO"),//CEO
	/**
	 * 总裁
	 */
	President("ZONGCAI"),//总裁
	/**
	 * 主席
	 */
	Chairman("ZHUXI");//主席
	private String  roleType="";
	private EnumRole(String role)
	{
		roleType=role;
	}
	/**
	* @return 
	*/
	  public String getRole()
	  {
		  return roleType;
	  }  
}
