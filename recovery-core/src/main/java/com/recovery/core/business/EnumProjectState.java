package com.recovery.core.business;

public enum EnumProjectState {
		//投前
		CheckIn(1),//登记，待立项
		Setup(2),//项目立项(提交立项资料后）
		FeasibilityApply(10),//立项结束，待进入可研
		Feasibility(11),
		DecisionApply(15),//可研结束，进入投决
		Decision(16),
		//投中
		Building(20),//投决结束，进入项目建设中（包含变更）
		Modification(25),//变更中
		Completing(30),// 竣工申请中
		Complete(40),//已竣工/结项
		//投后
		Evaluate(41),//投后价值评估流程
		Knoting(90),//退出申请中
		Knot(99);//已退出
		private int  mState=0;
		private EnumProjectState(int value)
		{
			mState=value;
		}
		/**
		* @return 枚举变量实际返回值
		*/
		  public int getState()
		  {
			  return mState;
		  }  
}
