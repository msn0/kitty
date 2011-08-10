(function(){
	
	window.Kitty = {};

	var Model = function(modelName, options){
		var that = this;
		this.modelName = modelName;

		Kitty.Model[modelName] = function(options){
			this.modelProtoReference = that;
			this.objid = Math.round(Math.random()*100000000);
			this.init = function(){
												
				for(var key in Kitty.Model[modelName].defaults){
					this[key] = options.hasOwnProperty(key) ? options[key] : Kitty.Model[modelName].defaults[key];
				}
				
				Kitty.Model[that.modelName].views[this.objid] = [];
			};
			this.set = function(property, value){
				this[property] = value;
				this.notify();
			};
			this.get = function(property){
				return this[property];
			};
			this.remove = function(){
				for(var key in Kitty.Model[that.modelName].views[this.objid]){
					Kitty.Model[that.modelName].views[this.objid][key].remove();
				}				
				delete Kitty.Model[that.modelName].views[this.objid];
			};
			this.notify = function(){
				for(var key in Kitty.Model[that.modelName].views[this.objid]){
					Kitty.Model[that.modelName].views[this.objid][key].render();
				}
			};
			this.init();
		};
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
			this.render = function(){
				this.el.innerHTML = this.template.render(this.model);
				options.events.call(that);
				return this;
			};
			this.remove = function(){
				this.el.parentNode.removeChild(this.el);
			};
			this.init().render();
		};
		return Kitty.View[viewName];
	};

	// expose objects
	Kitty.Model = Model;
	Kitty.View = View;
})();
