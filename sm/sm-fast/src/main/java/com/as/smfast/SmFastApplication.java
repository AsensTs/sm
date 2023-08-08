package com.as.smfast;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class SmFastApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmFastApplication.class, args);
    }

}
