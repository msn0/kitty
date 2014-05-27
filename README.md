Kitty
=====

Kitty is a lightweight (less than 2KB), very simple mvc written in pure javascript. It's still under construction and thus might be instable.

Basic usage
-----------

*Model*

```js
var Todo = new Kitty.Model("Todo", {
  todo: "",
  done: false
});
Todo.createNewTodo = function (todo) {
  return new Todo({
    todo: todo
  });
};
```

*View*

```js
var TodoView = new Kitty.View("TodoView", {
  template: new EJS({
    url: './view/Todo.ejs'
  }),
  container: document.getElementById('todo-container'),
  tag: "div",
  events: function (){
    // do whatever you want, e.g. element.addEventListener(...)
  },
  render: function (){
    // update your view
  }
});
```
