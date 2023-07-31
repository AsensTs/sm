package com.as.smfast.dao;

import lombok.Data;

import java.util.Date;

@Data
public class UserDao {
    private Long userId;
    /**
     * 用户名
     */
    private String username;
    /**
     * 密码
     */
    private String password;
    /**
     * 手机号
     */
    private String mobile;
    /**
     * 创建时间
     */
    private Date createTime;
}
