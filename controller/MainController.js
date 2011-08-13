(function(){
    
    /**
     * Application Controller
     */
    var Controller = {
        init: function(){
            //document.getElementById('TodoNameInput').focus();
            document.getElementById('button').addEventListener('click', Controller.createNewTodo, false);
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
            var span = todo.el.getElementsByClassName('todoText')[0];
            span.innerHTML = "<input class='editInput' type='text' value='"+todoValue+"'/>";
            
            var input = span.getElementsByTagName('input')[0];				
            input.addEventListener('keyup', function(e){
                if(e.keyCode === 13){
                    todo.model.set("todo", e.srcElement.value);
                }
            }, false);
            input.focus();
        }
    };

    window.Controller = Controller;

})();