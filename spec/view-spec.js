describe("view", function () {

  beforeEach(function () {
    var container = document.createElement("div");
    container.id = "foo-container";
    document.body.appendChild(container);
    this.Foo = new Kitty.Model("Foo", {
      bar: "bar",
      baz: "baz"
    });
    this.FooView = new Kitty.View("FooView", {
      template: jasmine.createSpyObj("template", ["render"]),
      container: document.getElementById('foo-container'),
      tag: "div"
    });
    this.foo = new this.Foo();
  });

  afterEach(function () {
    var container = document.getElementById("foo-container");
    container.parentNode.removeChild(container);
  });

  it("should be appended to Foo.views", function () {
    this.fooView = new this.FooView(this.foo);
    var key = Object.keys(Kitty.Model.Foo.views)[0];
    expect(Kitty.Model.Foo.views[key][0]).toEqual(this.fooView);
  });

  it("should call events and render if present", function () {
    this.FooView = new Kitty.View("FooView", {
      template: jasmine.createSpyObj("template", ["render"]),
      container: document.getElementById('foo-container'),
      tag: "div",
      events: jasmine.createSpy("events"),
      render: jasmine.createSpy("render")
    });
    this.foo = new this.Foo();
    this.fooView = new this.FooView(this.foo);
    expect(this.fooView.events).toHaveBeenCalled();
    expect(this.fooView.render).toHaveBeenCalled();
  });

});
