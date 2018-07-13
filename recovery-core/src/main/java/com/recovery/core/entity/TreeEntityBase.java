package com.recovery.core.entity;

import java.io.Serializable;
import java.util.List;

/**
 * 树形结构基类
 * @author Yinovo
 *
 */
public class TreeEntityBase extends EntityBase implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 
	 */
	private TreeEntityBase parent;
	/**
	 * 所有子级
	 */
	private List<TreeEntityBase> children;

	/**
	 * @return the children
	 */
	public List<TreeEntityBase> getChildren() {
		return children;
	}
	/**
	 * @param children the children to set
	 */
	public void setChildren(List<TreeEntityBase> children) {
		this.children = children;
	}
	/**
	 * @return the parent
	 */
	public TreeEntityBase getParent() {
		return parent;
	}
	/**
	 * @param parent the parent to set
	 */
	public void setParent(TreeEntityBase parent) {
		this.parent = parent;
	}
}
