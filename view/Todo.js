(function(){

	/**
	 * Todo View
	 */
	var TodoView = new Kitty.View("TodoView", {
		template: new EJS({url: './view/Todo.ejs'}),
		container: document.getElementById('container'),
		tag: "div",
		events: function(){
			this.el.getElementsByClassName('select')[0].addEventListener('click', (function(todo){
				return function(){
					Controller.toggleDone(todo);
				};
			})(this), false);
			this.el.getElementsByClassName('remove')[0].addEventListener('click', (function(todo){
				return function(){
					Controller.removeTodo(todo);
				};
			})(this), false);
			this.el.getElementsByClassName('edit')[0].addEventListener('click', (function(todo){
				return function(){
					Controller.editTodo(todo);
				};
			})(this), false);
		}
	});

})();
