(function(){

    /**
     * Todo View
     */
    var TodoView = new Kitty.View("TodoView", {
        template: new EJS({
            url: './view/Todo.ejs'
        }),
        container: document.getElementById('todoContainer'),
        tag: "div",
        events: function(){
	    MJ.addEvent(MJ.getElementsByClassName(this.el, 'select')[0], 'click', (function(todo){
                return function(){
                    Controller.toggleDone(todo);
                };
            })(this));

	    MJ.addEvent(MJ.getElementsByClassName(this.el, 'remove')[0], 'click', (function(todo){
                return function(){
                    Controller.removeTodo(todo);
                };
            })(this));

	    MJ.addEvent(MJ.getElementsByClassName(this.el, 'edit')[0], 'click', (function(todo){
                return function(){
                    Controller.editTodo(todo);
                };
            })(this));

	    MJ.addEvent(MJ.getElementsByClassName(this.el, 'todoText')[0], 'dblclick', (function(todo){
                return function(){
                    Controller.editTodo(todo);
                };
            })(this));
        },
        render: function(){
            Controller.updateStats();
        }
    });
    
    window.TodoView = TodoView;

})();
