(function(){

    /**
     * TodoStats Model
     * model name, default values
     */
    var TodoDone = new Kitty.Model("TodoDone", {
        done: 0,
        total: 0
    });

    TodoDone.createTodoStats = function(){
        return new TodoDone({
            done: 0,
            total: 0
        });
    };

})();
