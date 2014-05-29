[![Stories in Ready](https://badge.waffle.io/msn0/kitty.png?label=ready&title=Ready)](https://waffle.io/msn0/kitty)
[![Build Status](https://secure.travis-ci.org/msn0/kitty.png?branch=master)](http://travis-ci.org/msn0/kitty)
Kitty
=====

Kitty is a lightweight (minified 1.7KB / 1KB gzipped), very simple mvc written in pure javascript.

Basic usage
-----------

*Model*

```js
var Todo = new Kitty.Model("Todo", {
  todo: "",
  done: false
});
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
