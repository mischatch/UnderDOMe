const DOMNodeCollection = require("./dom_node_collection");

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
