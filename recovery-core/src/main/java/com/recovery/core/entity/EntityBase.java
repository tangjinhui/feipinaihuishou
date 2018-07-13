package com.recovery.core.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.recovery.core.annotation.DataInput;
import com.recovery.core.annotation.DataOutputColumn;
import com.recovery.core.annotation.RiverColumn;
import com.recovery.core.validator.Regex;

public class EntityBase implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 自增ID 唯一
	 */
	@RiverColumn(isAutoKey = true)
	public Long entityId;

	/**
	 * 业务编码 唯一
	 */
	@DataOutputColumn(columnName = "编码")
	@DataInput(columnName = "编码")
	@RiverColumn
	@org.hibernate.validator.constraints.Length(min = 0, max = 20)
	@Pattern(regexp = Regex.CODE, message = "编码格式错误")
	public String entityCode;

	/**
	 * 业务标题
	 */
	@DataOutputColumn(columnName = "标题")
	@DataInput(columnName = "标题")
	@RiverColumn
	@Length(min = 0, max = 50)
	public String entityTitle;

	/**
	 * GUID 唯一
	 */
	@RiverColumn(isGUID = true)
	@Length(min = 0, max = 64)
	public String entityGUID;

	/**
	 * 业务描述
	 */
	@DataOutputColumn(columnName = "描述")
	@DataInput(columnName = "描述")
	@RiverColumn
	@Length(min = 0, max = 200)
	public String entityDesc;

	/**
	 * 删除状态标记0-未删除（默认）1-已删除
	 */
	@DataOutputColumn(columnName = "是否删除", isDictionary = true)
	@RiverColumn
	public int isDelete;

	/**
	 * 删除时间
	 */
	@DataOutputColumn(columnName = "删除时间")
	@RiverColumn(isDeleteTime = true)
	public Timestamp deleteTime;

	/**
	 * 更新时间
	 */
	@DataOutputColumn(columnName = "更新时间")
	@RiverColumn(isUpdateTime = true)
	public Timestamp updateTime;

	/**
	 * 创建时间
	 */
	@DataOutputColumn(columnName = "创建时间", isDate = true, fomat = "MM/dd/yyyy")
	@RiverColumn(isCreateTime = true)
	public Timestamp createTime;

	/**
	 * 是否禁用 0-启用 （默认）1-禁用
	 */
	@DataOutputColumn(columnName = "是否禁用", isDictionary = true)
	@RiverColumn
	public int isDisable;

	/**
	 * 是否是树形结构中的父级ID字段
	 */
	@RiverColumn(isParentId = true)
	public long parentId;

	/**
	 * 禁用时间
	 */
	@DataOutputColumn(columnName = "禁用时间")
	@RiverColumn(isDisableTime = true)
	public Timestamp disableTime;

	/**
	 * @return the parentId
	 */
	public long getParentId() {
		return parentId;
	}

	/**
	 * @param string
	 *            the parentId to set
	 */
	public void setParentId(long parentId) {
		this.parentId = parentId;
	}

	/**
	 * @return the entityId
	 */
	public Long getEntityId() {
		return entityId;
	}

	/**
	 * @param entityId
	 *            the entityId to set
	 */
	public void setEntityId(Long entityId) {
		this.entityId = entityId;
	}

	/**
	 * @return the entityCode
	 */
	public String getEntityCode() {
		return entityCode;
	}

	/**
	 * @param entityCode
	 *            the entityCode to set
	 */
	public void setEntityCode(String entityCode) {
		this.entityCode = entityCode;
	}

	/**
	 * @return the entityTitle
	 */
	public String getEntityTitle() {
		return entityTitle;
	}

	/**
	 * @param entityTitle
	 *            the entityTitle to set
	 */
	public void setEntityTitle(String entityTitle) {
		this.entityTitle = entityTitle;
	}

	/**
	 * @return the entityGUID
	 */
	public String getEntityGUID() {
		return entityGUID;
	}

	/**
	 * @param entityGUID
	 *            the entityGUID to set
	 */
	public void setEntityGUID(String entityGUID) {
		this.entityGUID = entityGUID;
	}

	/**
	 * @return the entityDesc
	 */
	public String getEntityDesc() {
		return entityDesc;
	}

	/**
	 * @param entityDesc
	 *            the entityDesc to set
	 */
	public void setEntityDesc(String entityDesc) {
		this.entityDesc = entityDesc;
	}

	/**
	 * @return the deleteTime
	 */
	public Timestamp getDeleteTime() {
		return deleteTime;
	}

	/**
	 * @param deleteTime
	 *            the deleteTime to set
	 */
	public void setDeleteTime(Timestamp deleteTime) {
		this.deleteTime = deleteTime;
	}

	/**
	 * @return the updateTime
	 */
	public Timestamp getUpdateTime() {
		return updateTime;
	}

	/**
	 * @param updateTime
	 *            the updateTime to set
	 */
	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}

	/**
	 * @return the createTime
	 */
	public Timestamp getCreateTime() {
		return createTime;
	}

	/**
	 * @param createTime
	 *            the createTime to set
	 */
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	/**
	 * @return the isDisable
	 */
	public int getIsDisable() {
		return isDisable;
	}

	/**
	 * @param isDisable
	 *            the isDisable to set
	 */
	public void setIsDisable(int isDisable) {
		this.isDisable = isDisable;
	}

	/**
	 * @return the isDelete
	 */
	public int getIsDelete() {
		return isDelete;
	}

	/**
	 * @param isDelete
	 *            the isDelete to set
	 */
	public void setIsDelete(int isDelete) {
		this.isDelete = isDelete;
	}

	/**
	 * @return the disableTime
	 */
	public Timestamp getDisableTime() {
		return disableTime;
	}

	/**
	 * @param disableTime
	 *            the disableTime to set
	 */
	public void setDisableTime(Timestamp disableTime) {
		this.disableTime = disableTime;
	}

	/**
	 * 暂时不建议使用
	 * 
	 * @param entity
	 */
	public void CopyTo(EntityBase entity) {
		if (entity == null)
			return;
		entity.setCreateTime(createTime);
		entity.setDeleteTime(deleteTime);
		entity.setDisableTime(disableTime);
		entity.setEntityCode(entityCode);
		entity.setEntityDesc(entityDesc);
		entity.setEntityGUID(entityGUID);
		entity.setEntityId(entityId);
		entity.setEntityTitle(entityTitle);
		entity.setIsDelete(isDelete);
		entity.setIsDisable(isDisable);
		entity.setParentId(parentId);
		entity.setUpdateTime(updateTime);
	}
}
