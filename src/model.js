var Model = function (modelName, options) {
  var that = this;
  this.modelName = modelName;

  var nextId = function () {
    return Math.round(Math.random() * 100000000);
  };

  Kitty.Model[modelName] = function (options) {
    var model = Kitty.Model[that.modelName];
    model.prototype.modelProtoReference = that;
    this.objid = nextId();
    model.prototype.init = function () {

      for (var key in model.defaults) {
        if (model.defaults.hasOwnProperty(key)) {
          this[key] = options.hasOwnProperty(key) ? options[key] : model.defaults[key];
        }
      }

      model.views[this.objid] = [];
      model.collection.push(this);

    };
    model.prototype.set = function (params) {
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          this[key] = params[key];
        }
      }
      this.notify();
    };
    model.prototype.get = function (property) {
      return this[property];
    };
    model.prototype.remove = function () {
      for (var key in model.views[this.objid]) {
        if (model.views[this.objid].hasOwnProperty(key)) {
          model.views[this.objid][key].remove();
        }
      }
      delete model.views[this.objid];
      var removeIndex;
      for (var i = 0; i < model.collection.length; i++) {
        if (model.collection[i].objid === this.objid) {
          removeIndex = i;
          break;
        }
      }
      model.collection.splice(removeIndex, 1);
    };
    model.prototype.notify = function () {
      for (var key in model.views[this.objid]) {
        if(model.views.hasOwnProperty(key)) {
          model.views[this.objid][key]._render();
        }
      }
    };
    this.init();
  };
  Kitty.Model[modelName].collection = [];
  Kitty.Model[modelName].views = {};
  Kitty.Model[modelName].defaults = (function () {
    var def = {};
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        def[key] = options[key];
      }
    }
    return def;
  })();
  return Kitty.Model[modelName];

};

Kitty.Model = Model;