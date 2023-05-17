package com.as.sm.product.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.common.utils.PageUtils;
import com.as.sm.product.entity.AttrAttrgroupRelationEntity;

import java.util.Map;

/**
 * 属性&属性分组关联
 *
 * @author asens
 * @email sunlightcs@gmail.com
 * @date 2023-05-17 17:53:18
 */
public interface AttrAttrgroupRelationService extends IService<AttrAttrgroupRelationEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

