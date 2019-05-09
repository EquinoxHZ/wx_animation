// 配置文件
import {
  globalConf
} from "../conf.js"
// 配置动画
const conf = {
  duration: 300,
  type: 'linear'
}

/**
 * 
 * 
  <import src='/utils/mask/mask.wxml' />
  <template is='mask' data='{{maskHidden,maskAnimateData}}' />

  @import "../../../utils/mask/mask.wxss";

  import {
    initMask
  } from "../../../utils/mask/mask.js";

  initMask(this)
  
  hideMask() {
    this.showMask(false)
  }
 */


// 初始化遮罩层
export function initMask(that) {
  that.maskAnimate = wx.createAnimation({
    duration: conf.duration,
    timingFunction: 'linear'
  });

  that.setData({
    maskHidden: true
  });

  that.showMask = function(IO) {
    let opacity = 0;
    if (IO) {
      opacity = 1;
    } else {
      opacity = 0;
    }
    startMaskAnimate(opacity, that)
  }

  if (globalConf.debug) {
    console.log('Mask function [ showMask ] created')
  }
}

// 开始mask动画
function startMaskAnimate(opacity, that) {
  that.maskAnimate.opacity(opacity).step();
  if (opacity == 1) {
    that.setData({
      maskHidden: false
    })
    setTimeout(() => {
      that.setData({
        maskAnimateData: that.maskAnimate.export()
      })
    }, 100)
  } else {
    that.setData({
      maskAnimateData: that.maskAnimate.export()
    })
    setTimeout(() => {
      that.setData({
        maskHidden: true
      })
    }, conf.duration)
  }
}