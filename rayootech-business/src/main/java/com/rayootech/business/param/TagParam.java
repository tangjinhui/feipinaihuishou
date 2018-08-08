package com.rayootech.business.param;

import java.io.Serializable;
import java.util.Date;

import io.swagger.annotations.ApiParam;
import lombok.Data;
/**
 * 
* @ClassName: TagParam  
* @Description: TODO(这里用一句话描述这个类的作用)  
* @author tjh  
* @date 2018年8月7日 下午5:25:52  
*
 */
@Data
public class TagParam implements Serializable{
	
	/**  
	* @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么)  
	*/  
	private static final long serialVersionUID = -190785315410527561L;
	/**
	 * 业务标签id
	 */
	@ApiParam(value="标签id")
	private Long id;
	/**
	 * 标签名称
	 */
	@ApiParam(value="标签名称")
	private String tagName;
	/**
	 * 标签编码
	 */
	@ApiParam(value="标签编码")
	private String tagCode;
	/**
	 * 描述
	 */
	@ApiParam(value="标签描述")
	private String description;
	/**
	 * 启用状态:0:启用;1:禁用
	 */
	@ApiParam(value="启用状态")
	private Integer isUse;
	/**
	 * 是否删除:0:未删除;1:删除
	 */
	@ApiParam(value="是否删除")
	private Integer isDeleted;
	/**
	 * 创建时间
	 */
	@ApiParam(value="创建时间")
	private Date createTime;
	/**
	 * 修改时间
	 */
	@ApiParam(value="修改时间")
	private Date modifyTime;

}
