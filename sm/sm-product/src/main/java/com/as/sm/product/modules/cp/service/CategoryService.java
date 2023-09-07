package com.as.sm.product.modules.cp.service;

import com.as.sm.product.modules.cp.entity.CategoryEntity;
import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;

import java.util.List;
import java.util.Map;

/**
 * 商品三级分类
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:58:56
 */
public interface CategoryService extends IService<CategoryEntity> {

    PageUtils queryPage(Map<String, Object> params);

    List<CategoryEntity> getAllCategory();
}

