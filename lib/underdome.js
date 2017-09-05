/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = function $l(selector, callback){
  const queue = [];
  if (document.readyState !== "complete" && typeof(callback) === "function") {
    queue.push(callback);
  } else if (document.readyState === "complete" && typeof(callback) === "function"){
    queue.push(calback);
    queue.forEach((func) => {
      func();
    });
  }
  if(typeof selector === "string"){
    const res = document.querySelectorAll(selector);
    const resArr = Array.from(res);
    return new DOMNodeCollection(resArr);
  } else {

    return new DOMNodeCollection([selector]);
  }
};

$l.extend = (...args) => {
  const base = {};
  args.forEach((arg) => {
    for(let key in arg){
      base[key] = arg[key];
    }
  });
  return base;
};

$l.ajax = function (options) {
  const defaults = {
    success: () => console.log('success'),
    error: (err) => console.log(err),
    url: '/',
    method: 'get',
    data: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  const finalOptions = $l.extend(defaults, options);
  return fetch(finalOptions.url, { method: finalOptions.method })
    .then(response => response.json()).then(res => res).then(res => console.log(res))
    .catch(err => err);
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor(arr){
    this.elements = arr;
  }

  html(string = null) {
    if(string){
      this.elements.forEach( (el) => {
       el.innerHTML = string;
     });
    } else {
      return this.elements[0].innerHTML;
    }
  }

  empty(){
    this.html(" ");
  }

  append(cont){
    if(typeof cont === "string"){
      this.elements.forEach( (el) => {
       el.innerHTML += cont;
     });
   } else if (cont instanceof HTMLElement){
     this.elements.forEach( (el) => {
       el.innerHTML += cont.outerHTML;
     });
   } else {
     this.elements.forEach( (el) => {
       cont.elements.forEach( (child) => {
         el.appendChild(child);
       });
     });
    }
  }

  attr(name, value){
    if(!value){ // GET method
      return this.elements[0].getAttribute(name);
    } else { // SET method
      this.elements.forEach((el) => {
        el.setAttribute(name, value);
      });
    }
  }

  addClass(classname){
    this.elements.forEach( (el) => {
      el.className = classname;
    });
  }

  removeClass(classname){
    this.elements.forEach( (el) => {
      el.classList.remove(classname);
    });
  }

  children(){
    let childrenArr = [];
    this.elements.forEach( (el) => {
      childrenArr = childrenArr.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(childrenArr);
  }

  parent(){
    let parentArr = [];
    this.elements.forEach( (el) => {
      parentArr = parentArr.concat(Array.from(el.parent));
    });
    return new DOMNodeCollection(parentArr);
  }

  find(key){
    let found = [];
    this.elements.forEach( (el) => {
      found = found.concat(Array.from(el.querySelectorAll(key)));
    });
    return new DOMNodeCollection(found);
  }

  remove(){
    this.elements.forEach((el) => {
      el.remove();
    });
    this.elements = [];
  }

  css(style, val){
    return this.attr('style', `${style}: ${val}`);
  }

  on(type, listener){
    this.elements.forEach((el) => {
      el.addEventListener(type, listener);
      if (typeof el[type] !== listener){
        el[type] = [];
      }
      el[type].push(listener);
    });
  }

  off(type){
    this.elements.forEach((el) => {
      if(el[type]){
        el[type].forEach((listener) => {
          el.removeEventListener(type, listener);
        });
      }
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);