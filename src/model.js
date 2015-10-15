var Model = function (modelName, options) {
  var that = this;
  this.modelName = modelName;

  // generate uuid (rfc4122 version 4) - Broofa's solution
  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523
  var uuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  var model = Kitty.Model[modelName] = function (options) {
    options = options || {};
    model.prototype.modelProtoReference = that;
    this.objid = uuid();

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
      for (var i = 0; i < model.collection.length; i++) {
        if (model.collection[i].objid === this.objid) {
          model.collection.splice(i, 1);
          break;
        }
      }
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