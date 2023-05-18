package com.as.sm.order.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.order.entity.OrderItemEntity;

import java.util.Map;

/**
 * 订单项信息
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:55:16
 */
public interface OrderItemService extends IService<OrderItemEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

