/**
 * Kitty MVC
 * version: 0.2, alpha
 * Michal Jezierski
 * a m b i n a n i t e l o [ a t ] g m a i l [ d o t ] c o m
 */
(function(){
	
  window.Kitty = {};

  var Model = function(modelName, options){
    var that = this;
    this.modelName = modelName;

    Kitty.Model[modelName] = function(options){
      Kitty.Model[modelName].prototype.modelProtoReference = that;
      this.objid = Math.round(Math.random()*100000000);
      Kitty.Model[modelName].prototype.init = function(){
												
        for(var key in Kitty.Model[modelName].defaults){
          this[key] = options.hasOwnProperty(key) ? options[key] : Kitty.Model[modelName].defaults[key];
        }
				
        Kitty.Model[that.modelName].views[this.objid] = [];
        Kitty.Model[that.modelName].collection.push(this);

      };
      Kitty.Model[modelName].prototype.set = function(params){
        for(var key in params){
          this[key] = params[key];
        }
        this.notify();
      };
      Kitty.Model[modelName].prototype.get = function(property){
        return this[property];
      };
      Kitty.Model[modelName].prototype.remove = function(){
        for(var key in Kitty.Model[that.modelName].views[this.objid]){
          Kitty.Model[that.modelName].views[this.objid][key].remove();
        }
        delete Kitty.Model[that.modelName].views[this.objid];
        var removeIndex;
        for(var i=0;i<Kitty.Model[that.modelName].collection.length;i++){
          if(Kitty.Model[that.modelName].collection[i].objid === this.objid){
            removeIndex = i;
            break;
          }				
        }
        Kitty.Model[that.modelName].collection.splice(removeIndex, 1);
      };
      Kitty.Model[modelName].prototype.notify = function(){
        for(var key in Kitty.Model[that.modelName].views[this.objid]){
          Kitty.Model[that.modelName].views[this.objid][key]._render();
        }
      };
      this.init();
    };
    Kitty.Model[modelName].collection = [];
    Kitty.Model[modelName].views = {};
    Kitty.Model[modelName].defaults = (function(){
      var def = {};
      for(var key in options){
        def[key] = options[key];
      }
      return def;
    })();
    return Kitty.Model[modelName];
				
  };

  var View = function(viewName, options){

    Kitty.View[viewName] = function(data){
      var that = this;	
      this.model = data;
      this.init = function(){
        for(var key in options){
          this[key] = options[key];
        }
        var modRef = this.model.modelProtoReference;
        Kitty.Model[modRef.modelName].views[this.model.objid].push(this);
        this.el = document.createElement(options.tag);
        this.container.appendChild(this.el);
        return this;

      };
      this._render = function(){
        this.el.innerHTML = this.template.render(this.model);
        options.hasOwnProperty('events') && options.events.call(that);
        options.hasOwnProperty('render') && options.render.call(that);
        return this;
      };
      this.remove = function(){
        this.el.parentNode.removeChild(this.el);
      };
      this.init()._render();
    };
    return Kitty.View[viewName];
  };

  //  window.Kitty.Model.prototype.get = function(property){
  //    return this[property];
  //  };

  // expose objects
  Kitty.Model = Model;
  Kitty.View = View;
})();
