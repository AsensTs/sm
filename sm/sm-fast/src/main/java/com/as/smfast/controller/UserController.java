package com.as.smfast.controller;

import com.as.sm.common.exception.RRException;
import com.as.sm.common.utils.PasswordTools;
import com.as.sm.common.utils.R;
import com.as.smfast.dao.UserDao;
import com.as.smfast.service.UserService;

import feign.Param;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@RestController
public class UserController {

    @Resource
    private UserService userLoginService;

    @PostMapping("api/v1/login")
    private R login(@RequestBody Map<String, String> userInfo, HttpSession session) {
        UserDao userDao = userLoginService.login(userInfo);
        String password = userDao.getPassword();
        String salt = password.split("\\$")[0];
        if (PasswordTools.encrypt(userInfo.get("password"), salt).equals(userDao.getPassword())) {
            session.setAttribute("username", userInfo.get("username"));
            session.setMaxInactiveInterval(3);
            return R.ok("登录成功").put("data", true);
        }
        return R.ok("登录失败").put("data", false).put("code", 401);
    }

    @PostMapping("/api/v1/register")
    private R register(@RequestBody Map<Object, Object> userInfo) {
        // 查询用户是否存在
        Integer cr = userLoginService.searchUserByUsername((String) userInfo.get("username"));
        if (cr != null) {
            return R.ok("用户已存在").put("data", false);
        }

        Map<Object, Object> map = userInfo;

        // 获取当前时间并格式化
        Date date = new Date();
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        // 设置其他参数
        map.put("createUserId", null);
        map.put("createTime", formatter.format(date));

        // 密码加盐加密
        String password = PasswordTools.encrypt((String) map.get("password"));
        map.put("password", password);

        // 获取盐值
        String[] passwordArr = password.split("\\$");
        map.put("salt", passwordArr[0]);

        // 设置状态为启用
        map.put("status", 1);


        // 插入并返回结果
        long r = 0;
        try {
            r = userLoginService.register(map);
        } catch (Exception e) {
            throw new RRException(e.getMessage(), 500);
        }

        String msg = "注册失败";
        if (r == 1) {
            msg = "注册成功";
        } else {
            return R.error();
        }

        return R.ok(msg);
    }

    @PostMapping("/api/v1/check")
    private R check(@RequestBody Map<String, String> params) {
        Integer cr = userLoginService.check(params.get("username"));
        if (cr != null) {
            return R.ok("用户已存在").put("data", false).put("code", 200);
        }

        return R.ok().put("data", true).put("code", 200);
    }
}
