[![Stories in Ready](https://badge.waffle.io/msn0/kitty.png?label=ready&title=Ready)](https://waffle.io/msn0/kitty)
[![Build Status](https://secure.travis-ci.org/msn0/kitty.png?branch=master)](http://travis-ci.org/msn0/kitty)
Kitty
=====

Kitty is a lightweight (minified 1.6KB / 1KB gzipped), very simple mvc written in pure javascript.

Installation
------------

```bower install kitty --save```

Basic usage
-----------

```js

// define your model
var Todo = new Kitty.Model("Todo", {
  todo: "",
  done: false
});

// define your view
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

// create a model instance
var todo = new Todo({
  todo: "I need to do sth"
});

// create a view for your model
var todoView = new TodoView(todo);

// that's all
```

Example
-------
[Todo Example](http://michal.jezile.net/kitty)
