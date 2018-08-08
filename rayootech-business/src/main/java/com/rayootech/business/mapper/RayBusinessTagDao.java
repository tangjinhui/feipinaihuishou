package com.rayootech.business.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.rayootech.business.entity.RayBusinessTag;
import com.rayootech.business.param.TagParam;

/**
 * <p>
 * 业务标签表 Mapper 接口
 * </p>
 *
 * @author tjh
 * @since 2018-08-07
 */
@Mapper
public interface RayBusinessTagDao extends BaseMapper<RayBusinessTag> {

	long insertTag(TagParam tagParam);

	List<RayBusinessTag> queryTag(TagParam tagParam);

	boolean updateTag(TagParam tagParam);

}
