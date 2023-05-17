package com.as.sm.product.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.common.utils.PageUtils;
import com.as.sm.product.entity.CategoryEntity;

import java.util.Map;

/**
 * 商品三级分类
 *
 * @author asens
 * @email sunlightcs@gmail.com
 * @date 2023-05-17 17:53:18
 */
public interface CategoryService extends IService<CategoryEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

