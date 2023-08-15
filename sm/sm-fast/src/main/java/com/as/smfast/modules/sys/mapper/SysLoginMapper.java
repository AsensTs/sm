package com.as.smfast.modules.sys.mapper;

import com.as.smfast.modules.sys.dao.SysUserDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface SysLoginMapper {

    // 登录
    SysUserDao loginByUser(Map<String, String> userInfo);

    // 注册
    Long registerUser(Map<Object, Object> userInfo);

    Integer searchUserByUsername(String username);
}
