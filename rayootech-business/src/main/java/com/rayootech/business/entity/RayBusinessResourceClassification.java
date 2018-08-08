package com.rayootech.business.entity;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author tjh
 * @since 2018-08-07
 */
@TableName("ray_business_resource_classification")
public class RayBusinessResourceClassification implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
	private Long id;
    /**
     * 资源名称
     */
	private String resName;
    /**
     * 分类编码
     */
	private String resCode;
    /**
     * 分类描述
     */
	private String resDecript;
    /**
     * 启用状态
     */
	private Integer isUse;
    /**
     * 上级分类
     */
	private Integer pid;
    /**
     * 创建时间
     */
	private Date createTime;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getResName() {
		return resName;
	}

	public void setResName(String resName) {
		this.resName = resName;
	}

	public String getResCode() {
		return resCode;
	}

	public void setResCode(String resCode) {
		this.resCode = resCode;
	}

	public String getResDecript() {
		return resDecript;
	}

	public void setResDecript(String resDecript) {
		this.resDecript = resDecript;
	}

	public Integer getIsUse() {
		return isUse;
	}

	public void setIsUse(Integer isUse) {
		this.isUse = isUse;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Override
	public String toString() {
		return "RayBusinessResourceClassification{" +
			", id=" + id +
			", resName=" + resName +
			", resCode=" + resCode +
			", resDecript=" + resDecript +
			", isUse=" + isUse +
			", pid=" + pid +
			", createTime=" + createTime +
			"}";
	}
}
