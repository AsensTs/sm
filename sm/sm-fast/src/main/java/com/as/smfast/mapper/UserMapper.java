package com.as.smfast.mapper;

import com.as.smfast.dao.UserDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserMapper {

    // 登录
    UserDao loginByUser(Map<String, String> userInfo);

    // 注册
    Long registerUser(Map<Object, Object> userInfo);

    Integer searchUserByUsername(String username);
}
