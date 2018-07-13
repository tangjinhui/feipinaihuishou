package com.recovery.core.entity;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import com.river.core.annotation.RiverColumn;

import java.io.Serializable;

/**
 * <p>
 * 快捷方式定义
 * </p>
 *
 * @author zyb
 * @since 2017-12-08
 */
public class PageShortcut implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long entityId;
	/**
	 * 编码
	 */
	private String entityCode;
	/**
	 * 显示名称
	 */
	private String entityTitle;
	/**
	 * 菜单编码
	 */
	private String menuCode;
	/**
	 * 菜单ID
	 */
	private Long menuId;
	/**
	 * 显示图标
	 */
	private String displayIcon;
	/**
	 * 用户ITCODE
	 */
	private String itcode;
	/**
	 * 用户ID
	 */
	private Long useId;
	/**
	 * 建立时间
	 */
	private Date createTime;

	/**
	 * 路径
	 */
	@RiverColumn
	@Length(min = 0, max = 20, message = "menuPath长度不能超过20")
	public String menuPath;

	public PageShortcut() {
		super();
	}

	public PageShortcut(Long entityId, String entityCode, String entityTitle, String menuCode, Long menuId,
			String displayIcon, String itcode, Long useId, Date createTime, String menuPath) {
		super();
		this.entityId = entityId;
		this.entityCode = entityCode;
		this.entityTitle = entityTitle;
		this.menuCode = menuCode;
		this.menuId = menuId;
		this.displayIcon = displayIcon;
		this.itcode = itcode;
		this.useId = useId;
		this.createTime = createTime;
		this.menuPath = menuPath;
	}

	public PageShortcut(String entityCode, String entityTitle, String menuCode, Long menuId, String displayIcon,
			String itcode, Long useId, String menuPath) {
		super();
		this.entityCode = entityCode;
		this.entityTitle = entityTitle;
		this.menuCode = menuCode;
		this.menuId = menuId;
		this.displayIcon = displayIcon;
		this.itcode = itcode;
		this.useId = useId;
		this.createTime = new Date();
		this.menuPath = menuPath;
	}

	public Long getEntityId() {
		return entityId;
	}

	public void setEntityId(Long entityId) {
		this.entityId = entityId;
	}

	public String getEntityCode() {
		return entityCode;
	}

	public void setEntityCode(String entityCode) {
		this.entityCode = entityCode;
	}

	public String getEntityTitle() {
		return entityTitle;
	}

	public void setEntityTitle(String entityTitle) {
		this.entityTitle = entityTitle;
	}

	public String getMenuCode() {
		return menuCode;
	}

	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}

	public Long getMenuId() {
		return menuId;
	}

	public void setMenuId(Long menuId) {
		this.menuId = menuId;
	}

	public String getDisplayIcon() {
		return displayIcon;
	}

	public void setDisplayIcon(String displayIcon) {
		this.displayIcon = displayIcon;
	}

	public String getItcode() {
		return itcode;
	}

	public void setItcode(String itcode) {
		this.itcode = itcode;
	}

	public Long getUseId() {
		return useId;
	}

	public void setUseId(Long useId) {
		this.useId = useId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getMenuPath() {
		return menuPath;
	}

	public void setMenuPath(String menuPath) {
		this.menuPath = menuPath;
	}

	@Override
	public String toString() {
		return "PageShortcut [entityId=" + entityId + ", entityCode=" + entityCode + ", entityTitle=" + entityTitle
				+ ", menuCode=" + menuCode + ", menuId=" + menuId + ", displayIcon=" + displayIcon + ", itcode="
				+ itcode + ", useId=" + useId + ", createTime=" + createTime + ", menuPath=" + menuPath + "]";
	}
}
