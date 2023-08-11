package com.as.smfast.modules.sys.service;

import com.as.smfast.modules.sys.dao.SysUserDao;

import java.util.Map;


public interface SysLoginService {
    SysUserDao login(Map<String, String> userInfo);

    long register(Map<Object, Object> userInfo) throws Exception;

    Integer searchUserByUsername(String username);

    Integer check(String username);
}
