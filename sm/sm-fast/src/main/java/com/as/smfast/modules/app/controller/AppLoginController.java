package com.as.smfast.modules.app.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AppLoginController {

    @PostMapping("/login")
    public Boolean Login(@RequestParam Map<String, String> params) {
        return true;
    }
}
