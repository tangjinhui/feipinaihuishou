package com.rayootech.business.service;

import com.rayootech.business.entity.RayBusinessTag;
import com.rayootech.business.param.TagParam;

import java.util.List;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 业务标签表 服务类
 * </p>
 *
 * @author tjh
 * @since 2018-08-07
 */
public interface RayBusinessTagService extends IService<RayBusinessTag> {
	
	long insertTag(TagParam tagParam);

	List<RayBusinessTag> queryTag(TagParam tagParam);

	boolean updateTag(TagParam tagParam);
}
