// Generated by CoffeeScript 1.7.1
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define([], function() {
    var Basket;
    return Basket = (function() {
      function Basket() {
        this.items = [];
        this.distinctCount = 0;
        this.totalCount = 0;
        this.discountAmount = 0;
        this.coupons = ['A10', 'A25', 'A50'];
      }

      Basket.prototype.add = function(item, quantity) {
        var currentItem;
        if (quantity == null) {
          quantity = 1;
        }
        if (this.itemExistsInBasket(item)) {
          currentItem = this.getItemFromBasket(item);
          currentItem.quantity += quantity;
        } else {
          this.items.push({
            item: item,
            quantity: quantity
          });
        }
        return this.updateCounts();
      };

      Basket.prototype.remove = function(item, qty) {
        var basketItem, itemloc;
        if (qty == null) {
          qty = 1;
        }
        if (!this.itemExistsInBasket(item)) {
          return;
        }
        basketItem = this.getItemFromBasket(item);
        basketItem.quantity -= qty;
        if (basketItem.quantity < 1) {
          itemloc = this.getItemIndex(item);
          this.items.splice(itemloc, 1);
        }
        return this.updateCounts();
      };

      Basket.prototype.totalPrice = function() {
        var item, price, _i, _len, _ref;
        price = 0;
        _ref = this.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          price += item.quantity * item.item.price;
        }
        return price * (1 - (this.discountAmount / 100));
      };

      Basket.prototype.setDiscount = function(amount) {
        return this.discountAmount = Math.abs(amount);
      };

      Basket.prototype.getDiscountInMonetryValue = function() {
        var item, price, _i, _len, _ref;
        price = 0;
        _ref = this.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          price += item.quantity * item.item.price;
        }
        return (price / 100) * this.discountAmount;
      };

      Basket.prototype.addCoupon = function(code) {
        if (__indexOf.call(this.coupons, code) >= 0) {
          this.setDiscount(parseInt(code.substring(1)));
          return true;
        } else {
          return false;
        }
      };

      Basket.prototype.updateCounts = function() {
        var item, total, _i, _len, _ref;
        total = 0;
        _ref = this.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          total += item.quantity;
        }
        this.distinctCount = this.items.length;
        return this.totalCount = total;
      };

      Basket.prototype.empty = function() {
        this.items = [];
        this.distinctCount = 0;
        return this.totalCount = 0;
      };

      Basket.prototype.itemExistsInBasket = function(item) {
        var basketItem, _i, _len, _ref;
        _ref = this.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          basketItem = _ref[_i];
          if (basketItem.item.id === item.id) {
            return true;
          }
        }
        return false;
      };

      Basket.prototype.getItemFromBasket = function(item) {
        var basketItem, currentItem, _i, _len, _ref;
        currentItem = void 0;
        _ref = this.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          basketItem = _ref[_i];
          if (basketItem.item.id === item.id) {
            return basketItem;
          }
        }
        return false;
      };

      Basket.prototype.getQuantity = function(item) {
        if (this.itemExistsInBasket(item)) {
          return this.getItemFromBasket(item).quantity;
        } else {
          return 0;
        }
      };

      Basket.prototype.getItemIndex = function(item) {
        var basketItem, count, _i, _len, _ref;
        count = 0;
        _ref = this.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          basketItem = _ref[_i];
          if (basketItem.item.id === item.id) {
            return count;
          }
          count++;
        }
        return -1;
      };

      return Basket;

    })();
  });

}).call(this);
