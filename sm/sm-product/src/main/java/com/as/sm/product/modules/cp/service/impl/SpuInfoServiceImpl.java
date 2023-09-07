package com.as.sm.product.modules.cp.service.impl;

import com.as.sm.product.modules.cp.service.SpuInfoService;
import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.common.utils.Query;

import com.as.sm.product.modules.cp.dao.SpuInfoDao;
import com.as.sm.product.modules.cp.entity.SpuInfoEntity;


@Service("spuInfoService")
public class SpuInfoServiceImpl extends ServiceImpl<SpuInfoDao, SpuInfoEntity> implements SpuInfoService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<SpuInfoEntity> page = this.page(
                new Query<SpuInfoEntity>().getPage(params),
                new QueryWrapper<SpuInfoEntity>()
        );

        return new PageUtils(page);
    }

}