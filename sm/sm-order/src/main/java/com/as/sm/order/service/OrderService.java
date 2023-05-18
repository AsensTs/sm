package com.as.sm.order.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.order.entity.OrderEntity;

import java.util.Map;

/**
 * 订单
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:55:16
 */
public interface OrderService extends IService<OrderEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

