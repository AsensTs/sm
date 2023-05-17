package com.as.sm.order.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.common.utils.PageUtils;
import com.as.sm.order.entity.OrderItemEntity;

import java.util.Map;

/**
 * 订单项信息
 *
 * @author asens
 * @email sunlightcs@gmail.com
 * @date 2023-05-17 17:50:37
 */
public interface OrderItemService extends IService<OrderItemEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

