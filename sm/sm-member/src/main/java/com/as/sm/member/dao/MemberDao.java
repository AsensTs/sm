package com.as.sm.member.dao;

import com.as.sm.member.entity.MemberEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 会员
 * 
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:50:09
 */
@Mapper
public interface MemberDao extends BaseMapper<MemberEntity> {
	
}