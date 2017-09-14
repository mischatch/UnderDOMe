const DOMNodeCollection = require("./dom_node_collection");

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
