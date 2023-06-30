package com.as.sm.member;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * 想要远程调用别的服务：
 * 1. 引入open-feign
 * 2. 开启 @EnableDiscoveryClient 远程调用功能
 * 3. 编写一个接口，告诉springCloud这个接口需要调用的远程服务
 * */
@EnableFeignClients(basePackages = "com.as.sm.member.feign")
@EnableDiscoveryClient
@SpringBootApplication
public class SmMemberApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmMemberApplication.class, args);
    }

}
