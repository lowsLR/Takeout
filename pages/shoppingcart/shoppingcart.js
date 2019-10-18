// pages/shoppingcart/shoppingcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    selected: true,
    selectedAll: true,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadOrders()
  },
  //下定地址
  selectAddress: function() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  //加载购物车订单信息
  loadOrders: function() {
    var that = this;
    var orders = wx.getStorageSync("orders")
    // console.log(orders, "orders")
    if (orders) {
      that.setData({
        orders: orders
      })
      var totalPrice = 0;
      for (var i = 0; i < orders.length; i++) {
        var order = orders[i]
        totalPrice += order.count * order.price;
      }
      //总价格
      that.setData({
        totalPrice: totalPrice
      })
    } else {
      console.log("没有缓存数据")
    }
  },
  //商品行内复选框
  checkboxChange: function(e) {
    var that = this;
    // console.log(e, "checkboxChange")
    var ids = e.detail.value;
    console.log(ids, "ids")
    if (ids.length === 0) {
      that.setData({
        selectedAll: false
      })
    } else {
      that.setData({
        selectedAll: true
      })
    }
    var orders = wx.getStorageSync("orders")
    var totalPrice = 0;
    for (var i = 0; i < orders.length; i++) {
      var order = orders[i]
      for (var j = 0; j < ids.length; j++) {
        if (order.name == ids[j]) {
          totalPrice += order.count * order.price
        }
      }
    }
    that.setData({
      totalPrice: totalPrice
    })
  },
  //商品全部选框
  checkAll: function(e) {
    // console.log(e)
    var that = this;
    var selected = that.data.selected;
    var result = selected == true ? false : true;
    that.setData({
      selected: result
    })
    //判断 是否全部 ，再次确定selectedAll 的 布尔值，防止多次重复点击后选框混乱
    if (result == false) {
      that.setData({
        totalPrice: 0,
        selectedAll: false
      })
    } else {
      that.loadOrders()
      that.setData({
        selectedAll: true
      })
    }
  },
  //添加商品
  addGoods: function(e) {
    // console.log(e)
    var goods = wx.getStorageSync("goods")
    // console.log(goods, "goods")
    var id = e.currentTarget.id;
    var good = {};
    //判断数据是否存在
    for (var i = 0; i < goods.length; i++) {
      var oldGood = goods[i].foods;
      // console.log(oldGood, "oldGood")
      for (var j = 0; j < oldGood.length; j++) {
        var oldName = oldGood[j]
        // console.log(oldName, "oldName")
        if (id == oldName.name) {
          good = oldName
          break;
        }
      }
    }
    // console.log(good, "good")
    var orders = wx.getStorageSync("orders"); // 拿最新的订单列表
    // console.log(orders,"orders")
    var addOrders = new Array();
    var add = true;
    //若存在相同的物品就添加数量
    for (var w = 0; w < orders.length; w++) {
      var order = orders[w];
      // console.log(order,"aaaa")
      if (order.name == good.name) {
        var count = order.count;
        order.count = count + 1;
        add = false;
      }
      addOrders[w] = order
    }
    // console.log(addOrders, "addOrders")
    var len = orders.length;
    //若不存在相同的物品就添加进去
    if (add) {
      good.count = 1;
      ``
      addOrders[len] = good;
    }
    wx.setStorageSync("orders", addOrders) //更新订单列表
    this.loadOrders() //加载购物车订单信息,更新购物车物品和总价格
  },
  //减少商品
  minusGoods: function(e) {
    var goods = wx.getStorageSync("goods")
    // console.log(goods, "goods")
    var id = e.currentTarget.id;
    var good = {};
    //判断数据是否存在
    for (var i = 0; i < goods.length; i++) {
      var oldGood = goods[i].foods;
      // console.log(oldGood, "oldGood")
      for (var j = 0; j < oldGood.length; j++) {
        var oldName = oldGood[j]
        // console.log(oldName, "oldName")
        if (id == oldName.name) {
          good = oldName
          break;
        }
      }
    }
    // console.log(good, "good")
    var orders = wx.getStorageSync("orders"); // 拿最新的订单列表
    // console.log(orders,"orders")
    var addOrders = new Array();
    var add = true;
    //若存在相同的物品就减少数量
    for (var w = 0; w < orders.length; w++) {
      var order = orders[w];
      if (order.name == good.name) {
        // console.log(order.name, "order.name")
        var count = order.count;
        //商品数量不能少于2
        if (count >= 2) {
          order.count = count - 1;
        }
        // else if (count == 1) {
        //   order.count = count - 1;
        //   if (order.count <= 0) {
        //     console.log("count<=0", order)
        //     //有问题
        //     // console.log(this.removeClick(orders, order), "aaa")
        //   }
        // }
      }
      addOrders[w] = order
    }
    wx.setStorageSync("orders", addOrders) //更新订单列表
    this.loadOrders() //加载购物车订单信息,更新购物车物品和总价格
  },
  //删除订单
  removeClick: function(arr, name) {
    Array.prototype.indexOf = function(val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
      }
      return -1;
    };

    Array.prototype.remove = function(val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    arr.remove(name)
    console.log(arr, "arr");
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadOrders();
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