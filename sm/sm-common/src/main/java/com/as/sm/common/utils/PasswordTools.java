package com.as.sm.common.utils;


import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;

import java.util.UUID;

public class PasswordTools {
    /**
     * 加盐加密
     *
     * @param password 明文密码
     * @return 加盐加密的密码
     */
    public static String encrypt(String password) {
        // 生成盐值
        String salt = UUID.randomUUID().toString().replace("-", "");
        // 使用(盐值 + 密码)进行md5加密，得到加密后的密码
        String finalPassword = DigestUtils.md5DigestAsHex((salt + password).getBytes());
        // 合并盐值和加密密码，一起返回
        String dbPassword = salt + "$" + finalPassword;

        return dbPassword;
    }

    /**
     * 加盐加密
     *
     * @param password 明文密码
     * @return 加盐加密的密码
     */
    public static String encrypt(String password, String salt) {
        // 使用(盐值 + 密码)进行md5加密，得到加密后的密码
        String finalPassword = DigestUtils.md5DigestAsHex((salt + password).getBytes());
        // 合并盐值和加密密码，一起返回
        String dbPassword = salt + "$" + finalPassword;

        return dbPassword;
    }

    /**
     * 验证（加盐加密）密码
     *
     * @param password   明文密码
     * @param dbPassword 数据库存储的密码（包含：salt+$+加盐加密密码）
     * @return true 密码正确
     */
    public static boolean decrypt(String password, String dbPassword) {
        Boolean result = false;
        if (StringUtils.hasLength(password) && StringUtils.hasLength(dbPassword) && dbPassword.length() == 65 && dbPassword.contains("$")) {
            // 获取盐值
            String[] passwordArr = dbPassword.split("\\$");
            String salt = passwordArr[0];

            // 盐值+密码 生成新的加盐加密密码
            String finalPassword = encrypt(password, salt);

            // 对比，相等密码正确
            if (finalPassword.equals(dbPassword)) {
                result = true;
            }
        }

        return result;
    }
}
