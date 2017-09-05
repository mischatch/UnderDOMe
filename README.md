# UnderDOMe

UnderDOMe is a DOM manipulation library inspired by jQuery and writen using JavaScript. It supports some of the most important jQuery features, like:
* DOM Manipulation and Traversal
* Event Handling
* Ajax requests


# Usage

To use UnderDOMe, download the UnderDOMe library, place it into the root directory of your project, and include the script tag in the head of your html file:

```html
  <script type="text/javascript" src="./UnderDOMe/lib/underdome.js"></script>
```

# Manipulating the DOM

* `html(string)` - Either sets all selected element's `innerHTML` to provided string, or returns the `innerHTML` of the first found element.

* `empty()` - Clears `innerHTML` of selected element.

* `append(element)` - Appends argument to each selected element. Argument can be `HTMLElement`, `DOMNodeCollection` or a string.

* `addClass(name)` - Adds a class to selected elements.

* `removeClass(name)` - Removes a class from selected elements.

# Traversing the DOM

* `children()` - Returns a `DOMNodeCollection` of all children of the selected element.

* `parent()` - Returns a `DOMNodeCollection` with a parent of a selected element.

* `find(key)` - Returns a `DOMNodeCollection` of elements containing element with the key.

* `remove()` - Removes all selected elements from the DOM.

# Making AJAX Requests

Performs an HTTP request with the return value of an object. To make a request must be provided with an object containing following keys:
* `method` - HTTP method, by default set to `GET`.
* `url` - Url path to which request is sent.
* `data` - Optional data, which will be sent to server.
* `contentType` - Content Type of HTTP request.
* `success` and `error` - Callbacks, which are called if request succeeds or fails.
