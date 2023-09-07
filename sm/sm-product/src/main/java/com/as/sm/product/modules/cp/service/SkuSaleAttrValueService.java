package com.as.sm.product.modules.cp.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.product.modules.cp.entity.SkuSaleAttrValueEntity;

import java.util.Map;

/**
 * sku销售属性&值
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:58:56
 */
public interface SkuSaleAttrValueService extends IService<SkuSaleAttrValueEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

