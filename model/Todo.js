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
	 * Retrieve data from server or localStorage,
	 * here create todo from text input.
	 *
	 * @static
	 */
	Todo.createNewTodo = function(){
		var todoValue = document.getElementById('TodoNameInput').value;
		if(todoValue === ""){
			return false;
		}
		else {
			return new Todo({
				todo: document.getElementById('TodoNameInput').value
			});
		}
	};
	
})();
