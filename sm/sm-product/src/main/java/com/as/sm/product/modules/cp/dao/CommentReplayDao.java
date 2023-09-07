package com.as.sm.product.modules.cp.dao;

import com.as.sm.product.modules.cp.entity.CommentReplayEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 商品评价回复关系
 * 
 * @author asens
 * @email asensts@163.com
 * @date 2023-05-18 16:58:56
 */
@Mapper
public interface CommentReplayDao extends BaseMapper<CommentReplayEntity> {
	
}
