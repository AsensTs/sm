package com.as.sm.coupon.controller;

import java.util.Arrays;
import java.util.Map;

import com.as.sm.coupon.entity.SeckillSessionEntity;
import com.as.sm.coupon.service.SeckillSessionService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.as.sm.coupon.entity.HomeSubjectEntity;
import com.as.sm.coupon.service.HomeSubjectService;
import com.as.sm.common.utils.PageUtils;
import com.as.sm.common.utils.R;



/**
 * 首页专题表【jd首页下面很多专题，每个专题链接新的页面，展示专题商品信息】
 *
 * @author asens
 * @email sunlightcs@gmail.com
 * @date 2023-05-17 17:29:14
 */
@RestController
@RequestMapping("coupon/homesubject")
public class HomeSubjectController {
    @Autowired
    private HomeSubjectService homeSubjectService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("coupon:homesubject:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = homeSubjectService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("coupon:homesubject:info")
    public R info(@PathVariable("id") Long id){
		HomeSubjectEntity homeSubject = homeSubjectService.getById(id);

        return R.ok().put("homeSubject", homeSubject);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("coupon:homesubject:save")
    public R save(@RequestBody HomeSubjectEntity homeSubject){
		homeSubjectService.save(homeSubject);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("coupon:homesubject:update")
    public R update(@RequestBody HomeSubjectEntity homeSubject){
		homeSubjectService.updateById(homeSubject);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("coupon:homesubject:delete")
    public R delete(@RequestBody Long[] ids){
		homeSubjectService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

    /**
     * 秒杀活动场次
     *
     * @author asens
     * @email sunlightcs@gmail.com
     * @date 2023-05-17 17:29:14
     */
    @RestController
    @RequestMapping("coupon/seckillsession")
    public static class SeckillSessionController {
        @Autowired
        private SeckillSessionService seckillSessionService;

        /**
         * 列表
         */
        @RequestMapping("/list")
        @RequiresPermissions("coupon:seckillsession:list")
        public R list(@RequestParam Map<String, Object> params){
            PageUtils page = seckillSessionService.queryPage(params);

            return R.ok().put("page", page);
        }


        /**
         * 信息
         */
        @RequestMapping("/info/{id}")
        @RequiresPermissions("coupon:seckillsession:info")
        public R info(@PathVariable("id") Long id){
            SeckillSessionEntity seckillSession = seckillSessionService.getById(id);

            return R.ok().put("seckillSession", seckillSession);
        }

        /**
         * 保存
         */
        @RequestMapping("/save")
        @RequiresPermissions("coupon:seckillsession:save")
        public R save(@RequestBody SeckillSessionEntity seckillSession){
            seckillSessionService.save(seckillSession);

            return R.ok();
        }

        /**
         * 修改
         */
        @RequestMapping("/update")
        @RequiresPermissions("coupon:seckillsession:update")
        public R update(@RequestBody SeckillSessionEntity seckillSession){
            seckillSessionService.updateById(seckillSession);

            return R.ok();
        }

        /**
         * 删除
         */
        @RequestMapping("/delete")
        @RequiresPermissions("coupon:seckillsession:delete")
        public R delete(@RequestBody Long[] ids){
            seckillSessionService.removeByIds(Arrays.asList(ids));

            return R.ok();
        }

    }
}
