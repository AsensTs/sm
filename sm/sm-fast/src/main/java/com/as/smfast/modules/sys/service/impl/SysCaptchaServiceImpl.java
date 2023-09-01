package com.as.smfast.modules.sys.service.impl;

import com.as.sm.common.exception.RRException;
import com.as.smfast.modules.sys.entity.SysCaptchaEntity;
import com.as.smfast.modules.sys.mapper.SysCaptchaMapper;
import com.as.smfast.modules.sys.service.SysCaptchaService;
import com.google.code.kaptcha.Producer;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.awt.image.BufferedImage;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

@Service
public class SysCaptchaServiceImpl implements SysCaptchaService {
    @Autowired
    private Producer producer;

    @Resource
    private SysCaptchaMapper sysCaptchaMapper;

    @Override
    public BufferedImage getCaptcha(String uuid) {
        if (StringUtils.isBlank(uuid)) {
            throw new RRException("uuid不能为空");
        }

        String code = producer.createText();
        SysCaptchaEntity sysCaptchaEntity = new SysCaptchaEntity();
        sysCaptchaEntity.setUuid(uuid);
        sysCaptchaEntity.setCode(code);
        sysCaptchaEntity.setExpireTime(DateUtils.addMinutes(new Date(), 5));

        long r = sysCaptchaMapper.saveCaptcha(sysCaptchaEntity);

        // 1分钟后删除验证码
        Timer timer = new Timer();
        TimerTask timerTask = new TimerTask() {
            @Override
            public void run() {
                sysCaptchaMapper.delByUuid(uuid);
            }
        };
        timer.schedule(timerTask, 5 * 60 * 1000);


        return producer.createImage(code);
    }

    @Override
    public boolean validate(String uuid, String code) {

        SysCaptchaEntity sysCaptchaEntity = sysCaptchaMapper.searchByUuid(uuid);

        if (sysCaptchaEntity.getCode().equals(code)) {
            sysCaptchaMapper.delByUuid(uuid);
            return true;
        }
        return false;
    }
}
