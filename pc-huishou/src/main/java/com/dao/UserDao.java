package com.dao;

import com.common.mybatis.MyMapper;
import com.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * @author  guolw
 */
@Mapper
public interface UserDao extends MyMapper<User> {
	
    /**
     * 测试数据库连接
     * @return
     */
    @Select("SELECT count(*) FROM User ")
    Integer countUser();


    /**
     * 使用xml统计用户数
     * @return
     */
    int countUser2();
    

}
