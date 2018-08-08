package com.rayootech.business.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rayootech.business.entity.RayBusinessTag;
import com.rayootech.business.param.TagParam;
import com.rayootech.business.service.RayBusinessTagService;
import com.rayootech.core.result.JsonResult;
import com.rayootech.core.result.ResultCodeEnum;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

/**
 * <p>
 * 业务标签表 前端控制器
 * </p>
 *
 * @author tjh
 * @since 2018-08-07
 */
@Api(value="标签管理",description="标签管理")
@Slf4j
@RestController
@RequestMapping("/rayBusinessTag")
public class RayBusinessTagController {
	@Autowired
	private RayBusinessTagService rayBusinessTagService;
	/**
	 * 
	* @Title: insertTag  
	* @Description: TODO(这里用一句话描述这个方法的作用)  
	* @param @param param
	* @param @return    设定文件  
	* @return JsonResult    返回类型  
	* @throws
	 */
	@ApiOperation(value="插入标签")
	@RequestMapping(value="/insertTag")
	public JsonResult insertTag(TagParam param) {
		if (param == null) {
			return JsonResult.failure(ResultCodeEnum.INPUTPARAMNULL.getCode(),
					ResultCodeEnum.INPUTPARAMNULL.getMessage());
		}
		long insertId = 0L;
		try {
			insertId = rayBusinessTagService.insertTag(param);
		} catch (Exception e) {
			log.error("controller:RayBusinessTagControler - Method:insertTag Exception:{} ",e);
			return JsonResult.failure(ResultCodeEnum.FAILURE.getCode(), ResultCodeEnum.FAILURE.getMessage());
		}

		return JsonResult.success(insertId);
	}
	/**
	 * 
	* @Title: updateTag  
	* @Description: TODO(这里用一句话描述这个方法的作用)  
	* @param @param tagParam
	* @param @return    设定文件  
	* @return JsonResult    返回类型  
	* @throws
	 */
	@ApiOperation(value="更新标签",notes="根据标签id更新标签")
	@RequestMapping(value="/updateTag", method=RequestMethod.POST)
	public JsonResult updateTag(TagParam tagParam) {
		boolean updateTag = false;
		try {
			updateTag = rayBusinessTagService.updateTag(tagParam);
		}catch(Exception e) {
			log.error("controller:RayBusinessTagControler - Method:updateTag Exception:{}",e);
			return JsonResult.failure(ResultCodeEnum.FAILURE.getCode(), ResultCodeEnum.FAILURE.getMessage());
		}
		return JsonResult.success(updateTag);
	}
	/**
	 * 
	* @Title: queryTag  
	* @Description: TODO(这里用一句话描述这个方法的作用)  
	* @param @param tagParam
	* @param @return    设定文件  
	* @return JsonResult    返回类型  
	* @throws
	 */
	@ApiOperation(value="查询标签",notes="根据条件查询标签")
	@RequestMapping(value="queryTag",method=RequestMethod.GET)
	public JsonResult queryTag(TagParam tagParam) {
		
		List<RayBusinessTag> queryTag = null;
		try {
			 queryTag = rayBusinessTagService.queryTag(tagParam);
		}catch(Exception e) {
			log.error("controller:RayBusinessTagControler - Method:queryTag  inputParam:{}, Exception:{}",tagParam,e);
			return JsonResult.failure(ResultCodeEnum.FAILURE.getCode(), ResultCodeEnum.FAILURE.getMessage());
		}
		return JsonResult.success(queryTag);
	}
}
