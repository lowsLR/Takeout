// pages/supermarket/supermarket.js
const goodData = require("../../data/data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    currentTab: 0,
    vertical: true,
    goods: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // console.log(goodData.data.goods)
    that.setData({
      goods: goodData.data.goods
    })
  },
  //点击侧边栏跳转到相对应的菜单列表
  switchNav(e) {
    // console.log(e)
    var page = this;
    var id = e.target.id;
    // console.log(id,"supermarketId")
    if (this.data.currentTab === id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      })
    }
    page.setData({
      flag: id
    })
  },

  //添加到购物车
  addGoods: function(e) {
    var that = this;
    var goods = wx.getStorageSync("goods");
    var name = e.currentTarget.dataset.id;
    // console.log(name, "addGoodsId")
    var good = {};
    //判断数据里是否存在
    for (var k in goods) {
      var foods = goods[k].foods;
      for (var i = 0; i < foods.length; i++) {
        var oldGood = foods[i];
        if (oldGood.name == name) {
          good = oldGood;
          break;
        }
      }
    }
    // console.log(good, "good");
    var orders = wx.getStorageSync("orders"); //拉一下购物车的数据
    var addOrders = new Array();
    var add = true;
    //若存在相同的物品就添加数量
    for (var j = 0; j < orders.length; j++) {
      var order = orders[j];
      if (order.name == good.name) {
        var count = order.count;
        order.count = count + 1;
        add = false;
      }
      addOrders[j] = order;
    }
    //若不存在相同的物品就添加进去
    var len = orders.length;
    if (add) {
      good.count = 1;
      addOrders[len] = good
    }
    // console.log(addOrders, "supermarketaddOrders")
    wx.setStorageSync("orders", addOrders);
    // console.log(wx.getStorageSync("orders"), "supermarketaddOrders")
    //弹窗提示
    wx.showToast({
      title: '添加成功',
      icon: "success",
      duration: 1000
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