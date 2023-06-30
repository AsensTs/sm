package com.as.sm.coupon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class SmCouponApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmCouponApplication.class, args);
    }

}
