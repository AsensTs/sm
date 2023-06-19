package com.as.sm.ware.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.ware.entity.WareOrderTaskEntity;

import java.util.Map;

/**
 * 库存工作单
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 17:01:08
 */
public interface WareOrderTaskService extends IService<WareOrderTaskEntity> {

    PageUtils queryPage(Map<String, Object> params);
}
