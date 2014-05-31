describe("model", function () {

  beforeEach(function () {
    this.Foo = new Kitty.Model("Foo", {
      bar: "bar",
      baz: "baz"
    });
  });

  afterEach(function () {
    delete Kitty.Model.Foo;
  });

  it("Kitty.Model.Foo should be defined", function () {
    expect(Kitty.Model.Foo).toBeDefined();
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

  it("two models have different ids", function () {
    var foo1 = new this.Foo();
    var foo2 = new this.Foo();

    expect(foo1.objid).not.toEqual(foo2.objid);
  });

});
