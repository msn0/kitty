describe("model", function () {

  beforeEach(function () {
    this.Foo = new Kitty.Model("Foo", {
      bar: "bar",
      baz: "baz"
    });
  });

  it("model has default attributes", function () {
    var foo = new this.Foo();

    expect(foo.bar).toEqual("bar");
    expect(foo.baz).toEqual("baz");
  });

  it("overriding attributes", function () {
    var foo = new this.Foo({
      bar: "new-bar"
    });

    expect(foo.bar).toEqual("new-bar");
  });

  it("setting non-model attributes is not allowed", function () {
    var foo = new this.Foo({
      qax: "qax"
    });

    expect(foo.qax).not.toBeDefined();
  });

  it("two models have different ids", function () {
    var foo1 = new this.Foo();
    var foo2 = new this.Foo();

    expect(foo1.objid).not.toEqual(foo2.objid);
  });

  it("getting property", function () {
    var foo = new this.Foo();

    expect(foo.get("bar")).toEqual("bar");
  });

  it("setting property", function () {
    var foo = new this.Foo();
    foo.set({
      "lorem": "ipsum",
      "dolor": "sit"
    });

    expect(foo.get("lorem")).toEqual("ipsum");
    expect(foo.get("dolor")).toEqual("sit");
  });

  it("model.remove() should remove model from collection", function () {
    var foo = new this.Foo();

    foo.remove();
    expect(Kitty.Model.Foo.collection.indexOf(foo)).toEqual(-1);
  });

  it("model.remove() should remove views", function () {
    var foo = new this.Foo();
    var id = foo.objid;
    Kitty.Model.Foo.views[id] = [];

    foo.remove();
    expect(Kitty.Model.Foo.views[id]).not.toBeDefined();
  });

  it("model.remove() should call view.remove()", function () {
    var foo = new this.Foo();
    var id = foo.objid;
    var view = {
      remove: function () {}
    };
    spyOn(view, "remove");
    Kitty.Model.Foo.views[id] = [view];

    foo.remove();
    expect(view.remove).toHaveBeenCalled();
  });

  it("model.notify() should call view._render()", function () {
    var foo = new this.Foo();
    var id = foo.objid;
    var view = {
      _render: function () {}
    };
    spyOn(view, "_render");
    Kitty.Model.Foo.views[id] = [view];

    foo.notify();
    expect(view._render).toHaveBeenCalled();
  });

  it("setting property should call view._render()", function () {
    var foo = new this.Foo();
    spyOn(foo, "notify");

    foo.set({
      "lorem": "ipsum"
    });
    expect(foo.notify).toHaveBeenCalled();
  });

  it("setting multiple properties should call view._render() once", function () {
    var foo = new this.Foo();
    spyOn(foo, "notify");

    foo.set({
      "lorem": "ipsum",
      "dolor": "sit"
    });
    expect(foo.notify.callCount).toBe(1);
  });

});
