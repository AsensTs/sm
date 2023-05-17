package com.as.sm.coupon.dao;

import com.as.sm.coupon.entity.CouponEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 优惠券信息
 * 
 * @author asens
 * @email sunlightcs@gmail.com
 * @date 2023-05-17 17:29:14
 */
@Mapper
public interface CouponDao extends BaseMapper<CouponEntity> {
	
}
