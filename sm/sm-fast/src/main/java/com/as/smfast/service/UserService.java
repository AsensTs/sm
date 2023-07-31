package com.as.smfast.service;

import java.util.Map;


public interface UserLoginService {
    long login(Map<String, String> userInfo);
}
