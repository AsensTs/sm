package com.as.sm.order.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.order.entity.RefundInfoEntity;

import java.util.Map;

/**
 * 退款信息
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:55:17
 */
public interface RefundInfoService extends IService<RefundInfoEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

