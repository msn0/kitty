(function(){

    /**
     * Todo View
     */
    var TodoDoneView = new Kitty.View("TodoDoneView", {
        template: new EJS({
            url: './view/TodoDone.ejs'
        }),
        container: document.getElementById('todoDoneContainer'),
        tag: "div"
    });
    
    window.TodoDoneView = TodoDoneView;

})();
