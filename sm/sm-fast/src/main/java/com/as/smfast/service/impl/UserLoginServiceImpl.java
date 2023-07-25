package com.as.smfast.service.impl;

import com.as.smfast.mapper.UserLoginMapper;
import com.as.smfast.service.UserLoginService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

@Service
public class UserLoginServiceImpl implements UserLoginService {

    @Resource
    private UserLoginMapper userLoginMapper;

    @Override
    public long login(Map<String, String> userInfo) {
        userLoginMapper.loginByUser(userInfo);
        return 0;
    }
}
