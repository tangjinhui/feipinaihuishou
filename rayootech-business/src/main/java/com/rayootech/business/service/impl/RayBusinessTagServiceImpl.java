package com.rayootech.business.service.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.rayootech.business.entity.RayBusinessTag;
import com.rayootech.business.mapper.RayBusinessTagDao;
import com.rayootech.business.param.TagParam;
import com.rayootech.business.service.RayBusinessTagService;
import com.rayootech.core.exception.ServiceException;


/**
 * <p>
 * 业务标签表 服务实现类
 * </p>
 *
 * @author tjh
 * @since 2018-08-07
 */
@Service
public class RayBusinessTagServiceImpl extends ServiceImpl<RayBusinessTagDao, RayBusinessTag> implements RayBusinessTagService {
	@Autowired
    private RayBusinessTagDao rayBusinessTagDao;
	
	@Override
	public long insertTag(TagParam tagParam) {
		long insertId= 0;
		try {
			insertId = rayBusinessTagDao.insertTag(tagParam);
		}catch(ServiceException e) {
			e.printStackTrace();
			throw new ServiceException("RayBusinessTagServiceImpl insert Exception",e);
		}
		
		return insertId;
	}

	@Override
	public List<RayBusinessTag> queryTag(TagParam tagParam) {
		List<RayBusinessTag> queryTagList = null;
		try {
			 queryTagList = rayBusinessTagDao.queryTag(tagParam);
		}catch(ServiceException e) {
			throw new ServiceException("RayBusinessTagServiceImpl query Exception",e);
		}
		
		return queryTagList;
	}

	@Override
	public boolean updateTag(TagParam tagParam) {
		boolean  flag = false;
		try {
			flag = rayBusinessTagDao.updateTag(tagParam);
		}catch(ServiceException e) {
			throw new ServiceException("RayBusinessTagServiceImpl updateTag Exception",e);
		}
		return flag;
	}

}
