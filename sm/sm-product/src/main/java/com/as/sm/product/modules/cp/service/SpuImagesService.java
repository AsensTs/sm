package com.as.sm.product.modules.cp.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.product.modules.cp.entity.SpuImagesEntity;

import java.util.Map;

/**
 * spu图片
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:58:56
 */
public interface SpuImagesService extends IService<SpuImagesEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

