package com.as.sm.order.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.common.utils.PageUtils;
import com.as.sm.order.entity.RefundInfoEntity;

import java.util.Map;

/**
 * 退款信息
 *
 * @author asens
 * @email sunlightcs@gmail.com
 * @date 2023-05-17 17:50:37
 */
public interface RefundInfoService extends IService<RefundInfoEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

