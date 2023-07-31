package com.as.smfast.service.impl;

import com.as.smfast.dao.UserDao;
import com.as.smfast.mapper.UserMapper;
import com.as.smfast.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userLoginMapper;

    @Override
    public UserDao login(Map<String, String> userInfo) {
        UserDao userDao = userLoginMapper.loginByUser(userInfo);
        return userDao;
    }

    @Override
    public long register(Map<Object, Object> userInfo) throws SQLException {
       long r = userLoginMapper.registerUser(userInfo);
       return r;
    }

    @Override
    public Integer searchUserByUsername(String username) {
        Integer r = userLoginMapper.searchUserByUsername(username);
        return r;
    }

    @Override
    public Integer check(String username) {
        Integer r = userLoginMapper.searchUserByUsername(username);
        return r;
    }
}
