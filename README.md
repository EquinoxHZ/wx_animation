# wx_animation
微信小程序动画

> 引入
```
    import {
      customerAnimation
    } from "../../../utils/wx_animation.js"
```

> 初始化
```.js
    //params {name 动画名字,duration 动画时间,timingFunction 动画方式 ,position 组件位置（默认bottom）top,popup}
    customerAnimation(
    '.filter-mask', {
      name: 'filterMask',
      duration:500
    },this)
```

```.js
   // popup模式下设置hidden：{{name+'Hide'}} style='opacity:0'
     <view class='pop' hidden="{{popMaskHide}}" style='opacity:0' bindtap='popHide' animation="{{popMask}}"></view>

   // top模式下设置style="top:{{name+'Hide'}}"
     <view class='filter sort-filter' style="top:{{sortFilterHide}}" animation="{{sortFilter}}"></view>

   // right模式下设置style="right:{{name+'Hide'}}"
     <view class='filter sort-filter' style="right:{{sortFilterHide}}" animation="{{sortFilter}}"></view>

   // bottom模式下设置style="bottom:{{name+'Hide'}}" 
     <view class='filter sort-filter' style="bottom:{{sortFilterHide}}" animation="{{sortFilter}}"></view>

   // left模式下设置style="left:{{name+'Hide'}}"
     <view class='filter sort-filter' style="left:{{sortFilterHide}}" animation="{{sortFilter}}"></view>
```
