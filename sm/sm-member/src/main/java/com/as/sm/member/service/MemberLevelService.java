package com.as.sm.member.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.member.entity.MemberLevelEntity;

import java.util.Map;

/**
 * 会员等级
 *
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:50:09
 */
public interface MemberLevelService extends IService<MemberLevelEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

