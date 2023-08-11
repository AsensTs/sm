package com.as.smfast.modules.sys.service.impl;

import com.as.smfast.modules.sys.dao.SysUserDao;
import com.as.smfast.modules.sys.mapper.SysLoginMapper;
import com.as.smfast.modules.sys.service.SysLoginService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.Map;

@Service
public class SysLoginServiceImpl implements SysLoginService {

    @Resource
    private SysLoginMapper userLoginMapper;

    @Override
    public SysUserDao login(Map<String, String> userInfo) {
        SysUserDao userDao = userLoginMapper.loginByUser(userInfo);
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
