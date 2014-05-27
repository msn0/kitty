var View = function (viewName, options) {

  Kitty.View[viewName] = function (data) {
    var that = this;
    this.model = data;
    this.init = function () {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          this[key] = options[key];
        }
      }
      var modRef = this.model.modelProtoReference;
      Kitty.Model[modRef.modelName].views[this.model.objid].push(this);
      this.el = document.createElement(options.tag);
      this.container.appendChild(this.el);
      return this;

    };
    this._render = function () {
      this.el.innerHTML = this.template.render(this.model);
      if(options.hasOwnProperty('events')) {
        options.events.call(that);
      }
      if(options.hasOwnProperty('render')) {
        options.render.call(that);
      }
      return this;
    };
    this.remove = function () {
      this.el.parentNode.removeChild(this.el);
    };
    this.init()._render();
  };
  return Kitty.View[viewName];
};

Kitty.View = View;