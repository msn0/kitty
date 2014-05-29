describe("model", function () {

  beforeEach(function () {
    this.model = new Kitty.Model("Foo", {});
  });

  afterEach(function () {
    delete Kitty.Model.Foo;
  });

  it("Kitty.Model.Foo should be defined", function () {
    expect(Kitty.Model.Foo).toBeDefined();
  });

});
