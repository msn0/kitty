(function(){

    /**
     * TodoStats View
     */
    var TodoStatsView = new Kitty.View("TodoStatsView", {
        template: new EJS({
            url: './view/TodoStats.ejs'
        }),
        container: document.getElementById('todoDoneContainer'),
        tag: "div"
    });
    
    window.TodoStatsView = TodoStatsView;

})();
