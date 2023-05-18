package com.as.sm.order.dao;

import com.as.sm.order.entity.OrderEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 订单
 * 
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:55:16
 */
@Mapper
public interface OrderDao extends BaseMapper<OrderEntity> {
	
}
