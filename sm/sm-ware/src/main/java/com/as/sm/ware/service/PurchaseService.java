package com.as.sm.ware.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.ware.entity.PurchaseEntity;

import java.util.Map;

/**
 * 采购信息
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 17:01:08
 */
public interface PurchaseService extends IService<PurchaseEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

