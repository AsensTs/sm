package com.as.sm.product.modules.cp.service;

import com.as.sm.product.modules.cp.entity.BrandEntity;
import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;

import java.util.Map;

/**
 * 品牌
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:58:56
 */
public interface BrandService extends IService<BrandEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

