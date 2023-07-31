package com.as.smfast.mapper;

import com.as.smfast.dao.UserDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserLoginMapper {

    // 登录
    UserDao loginByUser(Map<String, String> userInfo);
}
