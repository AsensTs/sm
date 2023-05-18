package com.as.sm.ware.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.ware.entity.WareSkuEntity;

import java.util.Map;

/**
 * 商品库存
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 17:01:08
 */
public interface WareSkuService extends IService<WareSkuEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

