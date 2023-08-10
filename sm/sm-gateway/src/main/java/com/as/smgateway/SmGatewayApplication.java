package com.as.smgateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class SmGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmGatewayApplication.class, args);
    }

}
