package com.as.sm.product.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.common.utils.Query;

import com.as.sm.product.dao.CategoryDao;
import com.as.sm.product.entity.CategoryEntity;
import com.as.sm.product.service.CategoryService;


@Service("categoryService")
public class CategoryServiceImpl extends ServiceImpl<CategoryDao, CategoryEntity> implements CategoryService {

    @Autowired
    CategoryDao categoryDao;

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<CategoryEntity> page = this.page(
                new Query<CategoryEntity>().getPage(params),
                new QueryWrapper<CategoryEntity>()
        );

        return new PageUtils(page);
    }

    @Override
    public List<CategoryEntity> getAllCategory() {
        List<CategoryEntity> categoryEntities = baseMapper.selectList(null);
        List<CategoryEntity> firstMenus = categoryEntities.stream()
                .filter(item -> item.getParentCid() == 0)
                .peek(menu -> menu.setChildren(getChildren(menu, categoryEntities)))
                .collect(Collectors.toList());
        return firstMenus;
    }

    private List<CategoryEntity> getChildren(CategoryEntity menu, List<CategoryEntity> categoryEntities) {
        List<CategoryEntity> children = categoryEntities.stream().filter(item -> menu.getCatId() == item.getParentCid()).collect(Collectors.toList());
        return children;
    }
}