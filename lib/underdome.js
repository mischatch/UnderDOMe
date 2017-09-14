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

let DOMLoaded = false;
const queue = [];

document.addEventListener("DOMContentLoaded", () => {
  DOMLoaded = true;
  queue.forEach(callback => callback() );
});

window.$l = arg => {
  if (typeof(arg) === "function") {
    DOMLoaded ? arg() : queue.push(arg);
  } else {
    let res;

    if (arg instanceof HTMLElement){
      res = [arg];
    } else {
      const resList = document.querySelectorAll(arg);
      res = Array.from(resList);
    }
    return new DOMNodeCollection(res);
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

$l.ajax = options => {
  return new Promise(
    (resolve, reject) => {

      const defaults = {
        method: 'GET',
        url: '/',
        data: {},
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      };

      const ajaxOpts = $l.extend(defaults, options);
      ajaxOpts.method = ajaxOpts.method.toUpperCase();

      if (ajaxOpts.method === 'GET' && Object.keys(ajaxOpts.data).length > 0) {
        ajaxOpts.url += queryStringify(ajaxOpts.data);
      }

      const xhr = new XMLHttpRequest();
      xhr.open(ajaxOpts.method, ajaxOpts.url, true);
      xhr.onload = e => {
        if (xhr.status === 200){
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.send(JSON.stringify(ajaxOpts.data));

    }
  );
};

// helper method
const queryStringify = obj => {
  let queryString = '?';

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      queryString += `${key}=${obj[key]}&`;
    }
  }

  return queryString.slice(0, -1);
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
         el.innerHTML += child.outerHTML;
       });
     });
    }
    return this;
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

  parent() {
  let parentArray = [];
  this.elements.forEach ( el => {
    const parentNode = el.parentNode;
    if (!parentArray.includes(parentNode)) parentArray.push(parentNode);
  } );

  return new DOMNodeCollection(parentArray);
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
      if (typeof el[type] !== "undefined"){
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