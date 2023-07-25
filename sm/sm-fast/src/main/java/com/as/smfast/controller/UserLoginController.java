package com.as.smfast.controller;

import com.as.smfast.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

@RestController
public class UserLoginController {

    @Resource
    private UserLoginService userLoginService;

    @PostMapping("api/v1/login")
    private long login(@RequestParam Map<String, String> userInfo) {

        long id = userLoginService.login(userInfo);
        return 0;
    }
}
