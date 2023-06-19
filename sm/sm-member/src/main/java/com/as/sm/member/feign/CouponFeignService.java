package com.as.sm.member.feign;

import com.as.sm.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient("SmCouponApplication")
public interface CouponFeignService {

    @RequestMapping("/coupon/coupon/list")
    R getCouponList();
}
