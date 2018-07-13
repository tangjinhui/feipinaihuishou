package com.recovery.core.listener;

import java.util.ArrayList;

//import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
//@WebListener
public class RiverSessionListener implements HttpSessionListener {
	  private ArrayList<String> list; //创建一个在线用户的列表
		
		public void sessionCreated(HttpSessionEvent event) {
			// TODO Auto-generated method stub
			String sessionId = event.getSession().getId();
			if(list==null) list=new ArrayList<String>();
	        if(!list.contains(sessionId)){
	        	list.add(sessionId);
	        }
		}
		
		public void sessionDestroyed(HttpSessionEvent event) {
			// TODO Auto-generated method stub
			String sessionId = event.getSession().getId();
	        if(list.contains(sessionId)){
	        	list.remove(sessionId);
	        }
		}
}