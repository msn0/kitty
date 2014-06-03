var Model = function (modelName, options) {
  var that = this;
  this.modelName = modelName;

  var nextId = function () {
    return Math.round(Math.random() * 100000000);
  };

  var model = Kitty.Model[modelName] = function (options) {
    options = options || {};
    model.prototype.modelProtoReference = that;
    this.objid = nextId();

    model.prototype.init = function () {
      for (var key in model.defaults) {
        this[key] = options.hasOwnProperty(key) ? options[key] : model.defaults[key];
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
      var views = model.views[this.objid];
      for (var key in views) {
        if (views.hasOwnProperty(key)) {
          views[key].remove();
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
        model.views[this.objid][key]._render();
      }
    };

    this.init();
  };

  model.collection = [];
  model.views = {};
  model.defaults = options;

  return model;
};

Kitty.Model = Model;