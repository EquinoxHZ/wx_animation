// 配置文件
import {
  globalConf
} from "./conf.js";

// 创建动画函数
/**
 * 
 * @domClass dom元素class
 * @params {name 动画名字,duration 动画时间,timingFunction 动画方式 ,position 组件位置（默认bottom）top,popup}
 * @that
 * 
 * exp:
    import {
      customerAnimation
    } from "../../../utils/wx_animation.js"
    
    customerAnimation(
    '.filter-mask', {
      name: 'filterMask'
    },this)

    popup模式下设置hidden：{{name+'Hide'}} style='opacity:0'
    <view class='pop' hidden="{{popMaskHide}}" style='opacity:0' bindtap='popHide' animation="{{popMask}}"></view>

    top模式下设置style="top:{{name+'Hide'}}"
    exp: <view class='filter sort-filter' style="top:{{sortFilterHide}}" animation="{{sortFilter}}"></view>

    right模式下设置style="right:{{name+'Hide'}}"
    exp: <view class='filter sort-filter' style="right:{{sortFilterHide}}" animation="{{sortFilter}}"></view>

    bottom模式下设置style="bottom:{{name+'Hide'}}" 
    exp: <view class='filter sort-filter' style="bottom:{{sortFilterHide}}" animation="{{sortFilter}}"></view>

    left模式下设置style="left:{{name+'Hide'}}"
    exp: <view class='filter sort-filter' style="left:{{sortFilterHide}}" animation="{{sortFilter}}"></view>
 */
export function customerAnimation(domClass, params = {
  // name: '',
  // duration: 500,
  // timingFunction: 'linear',
  // position: 'bottom'
}, that) {

  // 初始化params
  params = {
    duration: 500,
    timingFunction: 'linear',
    position: 'bottom',
    ...params
  }

  // 如果为弹出效果，优先设置隐藏
  if (params.position == 'popup') {
    hidePop(false, params, that)
  }

  // 如果为滑动效果，优先设置隐藏(上下)
  if (params.position == 'top' || params.position == 'bottom') {
    hideTopBottom(params, that)
  }

  // 如果为滑动效果，优先设置隐藏(左右))
  if (params.position == 'left' || params.position == 'right') {
    hideLeftRight(params, that)
  }

  // 获取dom元素高度
  let query = wx.createSelectorQuery();
  query.select(domClass).boundingClientRect(rect => {
    let width = rect.width;
    let height = rect.height;
    params.height = height;
    params.width = width;
    creator(params, that);

    // 设置隐藏的位置数值
    switch (params.position) {
      case 'top':
        hideTopBottom(params, that);
        break
      case 'right':
        hideLeftRight(params, that);
        break
      case 'bottom':
        hideTopBottom(params, that);
        break
      case 'left':
        hideLeftRight(params, that);
        break
    }

    // 设置高度，残留代码，向下兼容===================
    let heightData = {};
    heightData[params.name + 'Height'] = height;
    that.setData(heightData)
    // ===================================
  }).exec();

}

// 创建
function creator(params, that) {
  // 初始化动画
  that[params.name] = wx.createAnimation({
    duration: params.duration,
    timingFunction: params.timingFunction
  })

  // 设置函数名字
  const fucName = 'control' + params.name.slice(0, 1).toUpperCase() + params.name.slice(1)
  // 设置动画控制函数
  that[fucName] = function(IO) {

    let tranX = 0;
    let tranY = 0;
    let tranO = 0;
    // 判断组件位置
    switch (params.position) {
      case 'bottom':
        tranY = -params.height
        break;
      case 'top':
        tranY = params.height
        break;
      case 'left':
        tranX = params.width
        break;
      case 'right':
        tranX = -params.width
        break;
      case 'popup':
        tranO = 1
        break;
    }

    if (!IO) {
      tranX = -tranX
      tranY = -tranY
      tranO = 0
    }

    // ===========================================================================================>弹出效果
    if (params.position == 'popup') {
      // 如果打开
      if (IO) {
        hidePop(IO, params, that)
        setTimeout(() => {
          that[params.name].opacity(tranO).step();
          setAni(IO, params, that)
        }, 100)
      } else {
        that[params.name].opacity(tranO).step();
        setAni(IO, params, that)
        setTimeout(() => {
          hidePop(IO, params, that)
        }, params.duration)
      }
      // ===========================================================================================>滑动效果(上下)
    } else if (params.position == 'top' || params.position == 'bottom') {
      that[params.name].translateY(tranY).step();
      setAni(IO, params, that)
      // ===========================================================================================>滑动效果(左右)
    } else if (params.position == 'left' || params.position == 'right') {
      that[params.name].translateX(tranX).step();
      setAni(IO, params, that)
    }
  }

  if (globalConf.debug) {
    console.log('Animation fuction [', fucName, '] created', params);
  }
}

// 设置popup隐藏
function hidePop(IO, params, that) {
  const hideParams = {};
  hideParams[params.name + 'Hide'] = IO ? false : true;
  that.setData(hideParams);
}

// 设置顶部和底部隐藏
function hideTopBottom(params, that) {
  const hideParams = {};
  hideParams[params.name + 'Hide'] = params.height ? -params.height + 'px' : '-100vh';
  that.setData(hideParams)
}

// 设置左右隐藏
function hideLeftRight(params, that) {
  const hideParams = {};
  hideParams[params.name + 'Hide'] = params.width ? -params.width + 'px' : '-100vw';
  that.setData(hideParams)
}

// 设置动画效果
function setAni(IO, params, that) {
  const animationData = {};
  animationData[params.name] = that[params.name].export();
  that.setData(animationData)
}