package com.as.sm.order.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.common.utils.PageUtils;
import com.as.sm.order.entity.OrderReturnApplyEntity;

import java.util.Map;

/**
 * 订单退货申请
 *
 * @author asens
 * @email sunlightcs@gmail.com
 * @date 2023-05-17 17:50:37
 */
public interface OrderReturnApplyService extends IService<OrderReturnApplyEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

