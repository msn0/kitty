(function(){
    
    /**
     * Application Controller
     */
    var Controller = {
        init: function(){
            MJ.addEvent(document.getElementById('button'), 'click', Controller.createNewTodo);
	    MJ.addEvent(document.getElementById('TodoNameInput'), 'keyup', function(e){
                if(e.keyCode === 13){
			Controller.createNewTodo();			
                }
            });
        },
        createNewTodo: function(){
            var todoValue = document.getElementById('TodoNameInput').value;
            if(todoValue === ""){
                return false;
            }
            else {
                var data = Kitty.Model.Todo.createNewTodo(todoValue);
                var t = new Kitty.View.TodoView(data);
                document.getElementById('TodoNameInput').value = "";
            }
        },
        removeTodo: function(todo){
            todo.model.remove();
        },
        toggleDone: function(todo){
            var done = todo.model.get("done");
            todo.model.set("done", !done);	
        },
        editTodo: function(todo){
            var todoValue = todo.model.todo;
            var span = MJ.getElementsByClassName(todo.el, 'todoText')[0];
            span.innerHTML = "<input class='editInput' type='text' value='"+todoValue+"'/>";
            
            var input = span.getElementsByTagName('input')[0];				
            MJ.addEvent(input, 'keyup', function(e){
                if(e.keyCode === 13){
		    var target = e.target || e.srcElement;
                    todo.model.set("todo", target.value);
                }
            });
	    MJ.addEvent(input, 'blur', function(e){
		var target = e.target || e.srcElement;
                todo.model.set("todo", target.value);
            });
            input.focus();
        }
    };

    window.Controller = Controller;

})();
