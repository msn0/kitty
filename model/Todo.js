(function(){

    /**
     * Todo Model
     * model name, default values
     */
    var Todo = new Kitty.Model("Todo", {
        todo: "",
        done: false
    });

    /**
     * Create new todo
     *
     * @static
     */
    Todo.createNewTodo = function(todo){
        return new Todo({
            todo: todo
        });
    };
	
})();
