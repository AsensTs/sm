package com.as.sm.product.modules.cp.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.product.modules.cp.entity.SpuInfoEntity;

import java.util.Map;

/**
 * spu信息
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:58:56
 */
public interface SpuInfoService extends IService<SpuInfoEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

