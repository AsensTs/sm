package com.as.smfast.modules.sys.controller;

import com.as.sm.common.exception.RRException;
import com.as.sm.common.utils.PasswordTools;
import com.as.sm.common.utils.R;
import com.as.smfast.modules.sys.dao.SysUserDao;
import com.as.smfast.modules.sys.service.SysCaptchaService;
import com.as.smfast.modules.sys.service.SysLoginService;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@RestController
@RefreshScope(proxyMode = ScopedProxyMode.DEFAULT)
public class SysLoginController {

    @Resource
    private SysLoginService sysLoginService;
    
    @Resource
    private SysCaptchaService sysCaptchaService;

    @Value("${config.msg}")
    private String msg;
    @GetMapping("/test")
    private R test() {
        System.out.println(msg);
        return R.ok().put("msg", msg);
    }

    /**
     * 获取验证码
     * */
    @GetMapping("api/captcha.jpg")
    private void captcha(HttpServletResponse response, String uuid) throws IOException {
        response.setHeader("Cache-Control", "no-store, no-cache");
        response.setContentType("image/jpeg");

        // 获取图片验证码
        BufferedImage image = sysCaptchaService.getCaptcha(uuid);

        ServletOutputStream out = response.getOutputStream();
        ImageIO.write(image, "jpg", out);
        IOUtils.closeQuietly(out);
    }

    /**
     * 登录
     * @param userInfo 用户登录信息
     * */
    @PostMapping("api/login")
    private R login(@RequestBody Map<String, String> userInfo, HttpSession session) {
        // 判断验证码是否正确
        boolean validate = sysCaptchaService.validate(userInfo.get("uuid"), userInfo.get("code"));
        if (!validate) {
            return R.error("验证码不正确");
        }

        // 删除验证码

        SysUserDao userDao = sysLoginService.login(userInfo);
        String password = userDao.getPassword();
        String salt = password.split("\\$")[0];
        if (PasswordTools.encrypt(userInfo.get("password"), salt).equals(userDao.getPassword())) {
            session.setAttribute("username", userInfo.get("username"));
            session.setMaxInactiveInterval(3);
            return R.ok("登录成功").put("data", true);
        }
        return R.ok("登录失败").put("data", false).put("code", 401);
    }

    /**
     *  注册
     *  @param userInfo 用户注册信息
     * */
    @PostMapping("/api/register")
    private R register(@RequestBody Map<Object, Object> userInfo) {
        // 查询用户是否存在
        Integer cr = sysLoginService.searchUserByUsername((String) userInfo.get("username"));
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
            r = sysLoginService.register(map);
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
        Integer cr = sysLoginService.check(params.get("username"));
        if (cr != null) {
            return R.ok("用户已存在").put("data", false).put("code", 200);
        }

        return R.ok().put("data", true).put("code", 200);
    }
}
