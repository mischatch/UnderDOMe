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
