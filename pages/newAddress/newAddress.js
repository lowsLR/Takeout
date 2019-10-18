// pages/newAddress/newAddress.js
const citys = require("../../data/city.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["广东省", "广州市", "天河区"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(citys.data.cities, "cities")
    var that = this;
    // var region = []
    // var cityData = citys.data.cities;
    // for (var i = 0; i < cityData.length; i++) {
    //   var citiesData = cityData[i].province;
    //   // console.log(citiesData)
    //   region.push(citiesData)
    // }
    // that.setData({
    //   region: region
    // })
  },
  //提交数据
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var formSubmit = e.detail.value;
    wx.setStorageSync("formSubmit", formSubmit)
    wx.navigateTo({
      url: '../address/address',
    })
  },
  //重置数据
  formReset: function() {
    console.log('form发生了reset事件')
  },
  //所在城市
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  //收货地址
  valueChange: function(e) {
    console.log(e.detail.value, "eee")
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})