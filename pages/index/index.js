import {
  customerAnimation
} from "../../utils/wx_animation.js";

import {
  initMask
} from "../../utils/mask/mask.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    speed: 300
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    initMask(this);
    if (options.type) {
      this.setData({
        type: options.type,
        speed: options.speed
      })
    }
    this.init();
  },

  init() {
    let type = parseInt(this.data.type);
    switch (type) {
      case 0:
        type = 'linear';
        break
      case 1:
        type = 'ease';
        break
      case 2:
        type = 'ease-in';
        break
      case 3:
        type = 'ease-in-out';
        break
      case 4:
        type = 'ease-out';
        break
      case 5:
        type = 'step-start';
        break
      case 6:
        type = 'step-end';
        break
    }

    let speed = this.data.speed;

    customerAnimation(
      '.top-mask', {
        name: 'topMask',
        position: 'top',
        duration: speed,
        timingFunction: type
      }, this)

    customerAnimation(
      '.right-mask', {
        name: 'rightMask',
        position: 'right',
        duration: speed,
        timingFunction: type
      }, this)

    customerAnimation(
      '.bottom-mask', {
        name: 'bottomMask',
        position: 'bottom',
        duration: speed,
        timingFunction: type
      }, this)

    customerAnimation(
      '.left-mask', {
        name: 'leftMask',
        position: 'left',
        duration: speed,
        timingFunction: type
      }, this)

    customerAnimation(
      '.pop-mask', {
        name: 'popMask',
        position: 'popup',
        duration: speed,
        timingFunction: type
      }, this)
  },

  showTop() {
    this.showMask(true);
    this.controlTopMask(true);
  },

  showRight() {
    this.showMask(true);
    this.controlRightMask(true);
  },

  showBottom() {
    this.showMask(true);
    this.controlBottomMask(true);
  },

  showLeft() {
    this.showMask(true);
    this.controlLeftMask(true);
  },

  showPop() {
    this.showMask(true);
    this.controlPopMask(true);
  },

  hideMask() {
    this.showMask(false);
    this.controlTopMask(false);
    this.controlBottomMask(false);
    this.controlRightMask(false);
    this.controlLeftMask(false);
    this.controlPopMask(false);
  },

  // 变更动画速度
  changeSpeed(e) {
    this.data.speed = e.detail.value;
  },

  // 变更动画效果
  changeType(e) {
    this.data.type = e.detail.value;
    console.log(this);
    this.setData({
      bottomMask: {}
    })
  },

  // 确定
  confirm() {
    const type = this.data.type;
    const speed = this.data.speed;
    wx.reLaunch({
      url: '/pages/index/index?type=' + type + '&speed=' + speed,
    })
  }
})