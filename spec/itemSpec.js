// Generated by CoffeeScript 1.7.1
(function() {
  define(['src/basket', 'src/item'], function(Basket, Item) {
    return describe('Item', function() {
      var item;
      item = void 0;
      beforeEach(function() {
        return item = new Item(1, 'Mouse', 10);
      });
      describe('updating an item', function() {
        return it('should update properties passed in', function() {
          item.update({
            title: "Super Mouse",
            price: 10
          });
          expect(item.title).toEqual("Super Mouse");
          expect(item.price).toEqual(10);
          return expect(item.id).toEqual(1);
        });
      });
      describe('protected fields', function() {
        it('should have the id as a protected field', function() {
          expect(item.protectedFields).toContain("id");
          return expect(item.protectedFields.length).toEqual(1);
        });
        it('should let us add a protected field', function() {
          item.addProtectedField("title");
          expect(item.protectedFields).toContain("title");
          return expect(item.protectedFields.length).toEqual(2);
        });
        return it('should not allow protected fields to be updated', function() {
          item.addProtectedField("title");
          item.update({
            id: 2,
            title: "New Title",
            price: 15
          });
          expect(item.id).toEqual(1);
          expect(item.title).toEqual("Mouse");
          return expect(item.price).toEqual(15);
        });
      });
      describe('field is protected', function() {
        it('should return true if field is protected', function() {
          return expect(item.fieldIsProtected("id")).toBeTruthy();
        });
        return it('should return false if field is not protected', function() {
          return expect(item.fieldIsProtected("price")).toBeFalsy();
        });
      });
      return describe('getting ratings from a 3rd party API', function() {
        beforeEach(function() {
          return spyOn(item, 'getRatings').andCallFake(function() {
            return JSON.parse('{"ratings":[{"rating":4,"review":"This is a really great product","source":"Amazon"},{"rating":1,"review":"I didnt really like it that much it wasnt very good","source":"PC World"},{"rating":3,"review":"Its pretty average.","source":"Ebay"}]}');
          });
        });
        it('should return the three latest ratings', function() {
          return expect(item.getRatings().ratings.length).toEqual(3);
        });
        return it('parsing an individual score', function() {
          return expect(item.getRatings().ratings[0].rating).toEqual(4);
        });
      });
    });
  });

}).call(this);
