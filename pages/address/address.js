// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    formSubmit: []
  },

  //选中
  switchNav: function(e) {
    // console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    this.setData({
      flag: id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var formSubmit = wx.getStorageSync('formSubmit')
    console.log(formSubmit, 'formSubmitaaa')
    var addressData = [];
    addressData.push(formSubmit)
    this.setData({
      formSubmit: formSubmit,
      addressData: addressData
    })
  },

  //新增地址
  newAddress: function() {
    wx.navigateTo({
      url: '../newAddress/newAddress',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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