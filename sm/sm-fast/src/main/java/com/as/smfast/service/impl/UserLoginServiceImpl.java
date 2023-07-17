package com.as.smfast.service.impl;

import com.as.smfast.mapper.UserLoginMapper;
import com.as.smfast.service.UserLoginService;

import java.util.Map;

public class UserLoginServiceImpl implements UserLoginService {

    UserLoginMapper userLoginMapper;

    @Override
    public long login(Map<String, String> userInfo) {
        userLoginMapper.loginByUser(userInfo);
        return 0;
    }
}
