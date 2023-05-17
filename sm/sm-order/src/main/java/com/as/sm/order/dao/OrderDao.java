package com.as.sm.order.dao;

import com.as.sm.order.entity.OrderEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 订单
 * 
 * @author asens
 * @email sunlightcs@gmail.com
 * @date 2023-05-17 17:50:37
 */
@Mapper
public interface OrderDao extends BaseMapper<OrderEntity> {
	
}
