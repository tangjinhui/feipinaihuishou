package com.rayootech.business.entity;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 业务标签表
 * </p>
 *
 * @author tjh
 * @since 2018-08-07
 */
@TableName("ray_business_tag")
public class RayBusinessTag implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
	private Long id;
    /**
     * 标签名称
     */
	@TableField("tag_name")
	private String tagName;
    /**
     * 标签编码
     */
	@TableField("tag_code")
	private String tagCode;
    /**
     * 描述
     */
	private String description;
    /**
     * 启用状态:0:启用;1:禁用
     */
	@TableField("is_use")
	private Integer isUse;
    /**
     * 是否删除:0:未删除;1:删除
     */
	@TableField("is_deleted")
	private Integer isDeleted;
    /**
     * 创建时间
     */
	@TableField("create_time")
	private Date createTime;
    /**
     * 修改时间
     */
	@TableField("modify_time")
	private Date modifyTime;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public String getTagCode() {
		return tagCode;
	}

	public void setTagCode(String tagCode) {
		this.tagCode = tagCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getIsUse() {
		return isUse;
	}

	public void setIsUse(Integer isUse) {
		this.isUse = isUse;
	}

	public Integer getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Integer isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	@Override
	public String toString() {
		return "RayBusinessTag{" +
			", id=" + id +
			", tagName=" + tagName +
			", tagCode=" + tagCode +
			", description=" + description +
			", isUse=" + isUse +
			", isDeleted=" + isDeleted +
			", createTime=" + createTime +
			", modifyTime=" + modifyTime +
			"}";
	}
}
