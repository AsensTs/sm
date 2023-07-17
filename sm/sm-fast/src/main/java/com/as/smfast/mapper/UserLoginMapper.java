package com.as.smfast.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserLoginMapper {

    // 登录
    Long loginByUser(Map<String, String> userInfo);
}
