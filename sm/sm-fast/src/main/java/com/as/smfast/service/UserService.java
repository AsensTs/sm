package com.as.smfast.service;

import com.as.smfast.dao.UserDao;

import java.util.Map;


public interface UserService {
    UserDao login(Map<String, String> userInfo);

    long register(Map<Object, Object> userInfo) throws Exception;

    Integer searchUserByUsername(String username);

    Integer check(String username);
}
