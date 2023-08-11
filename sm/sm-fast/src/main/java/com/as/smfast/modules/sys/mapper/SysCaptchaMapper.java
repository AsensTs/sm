package com.as.smfast.modules.sys.mapper;

import com.as.smfast.modules.sys.entity.SysCaptchaEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SysCaptchaMapper {
    long saveCaptcha(SysCaptchaEntity captchaEntity);
}
