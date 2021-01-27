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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rigged__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rigged */ \"./src/rigged.js\");\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', ()=>{\r\n  let element = new _rigged__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n    container: document.body,\r\n    template: `\r\n    div .nstool\r\n      h1 (NSTOOL.aoizh#oa[paizjdpoazjd]izhd.apidzd)\r\n      div .search #bjr (dis a search)\r\n        input #search [autofocus=\"true\"] [placeholder=\"yoursite.com\"]\r\n        div #suggests\r\n      input @mail #mail [type=\"mail\"] [placeholder=\"mail\"]\r\n      div #dnsResults\r\n      div #certResults\r\n    `\r\n  })\r\n\r\n  element.mail.setStyle({\r\n    color: 'red',\r\n    padding: '1rem'\r\n  })\r\n})\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Parser; });\nclass Parser{\r\n\r\n  static parse(template) {\r\n      let parsed = template.trim().split('\\n')\r\n      let tree = []\r\n      let lastIndent = 0\r\n      let lastEl = null\r\n\r\n      if (!parsed.length) return null\r\n\r\n      parsed = parsed.map((str, i) => {\r\n\r\n          let tag = str.trim().match(/^[^ ]*/)[0]\r\n\r\n          let el = document.createElement(tag)\r\n\r\n          let id = Parser.parseId(str)\r\n          if (id) el.id = id\r\n\r\n          let connector = Parser.parseConnector(str)\r\n          if(connector) el._connector = connector\r\n\r\n          let classes = Parser.parseClasses(str)\r\n          if (classes) classes.map(cls => el.classList.add(cls))\r\n\r\n          let attributes = Parser.parseAttributes(str)\r\n          if(attributes) attributes.map(attr => {\r\n            el.setAttribute(attr.key, attr.value)\r\n          })\r\n\r\n          let content = Parser.parseContent(str)\r\n          if(content) el.innerHTML = content\r\n\r\n          let indent = str.match(/^\\ */)[0].length\r\n\r\n\r\n          if (!tree.length) {\r\n              tree.push(el)\r\n          } else {\r\n\r\n              // remove one from tree then append inside parent\r\n              if (indent < lastIndent) {\r\n                  tree.splice(tree.length-1, 1)\r\n                  tree[tree.length - 1].appendChild(el)\r\n              }\r\n              else if(indent > lastIndent) {\r\n                  if(!tree.includes(lastEl)) tree.push(lastEl)\r\n                  lastEl.appendChild(el)\r\n              }\r\n              else {\r\n                  tree[tree.length - 1].appendChild(el)\r\n              }\r\n          }\r\n\r\n          lastIndent = indent\r\n          lastEl = el\r\n          return el\r\n      })\r\n\r\n      return parsed\r\n  }\r\n\r\n  static removeAttributes(str){\r\n    return str.replace(/\\[[^\\[\\]]*?\\]/gs, '')\r\n  }\r\n\r\n  static removeContent(str){\r\n    return str.replace(/\\([^\\(\\)]*?\\)/gs, '')\r\n  }\r\n\r\n  static parseClasses(str) {\r\n      str = Parser.removeAttributes(str)\r\n      str = Parser.removeContent(str)\r\n\r\n      str = str.match(/\\.[^\\.\\ ]*/gms)\r\n\r\n      if(!str) return null\r\n      return str.map(cls => cls.replace(/\\./, ''))\r\n  }\r\n\r\n  static parseId(str) {\r\n      str = Parser.removeContent(str)\r\n      str = str.match(/\\#[^\\#\\. ]*/)\r\n      if(str) return str[0].replace(/#/, '')\r\n      return null\r\n  }\r\n\r\n  static parseConnector(str){\r\n    str = Parser.removeContent(str)\r\n    let connector = str.match(/\\@[^\\@\\. ]*/)\r\n    if(connector) return connector[0].replace(/@/, '')\r\n    return null\r\n  }\r\n\r\n  static parseAttributes(str) {\r\n      str = Parser.removeContent(str)\r\n      str = str.match(/\\[[^\\]]*\\]/gm)\r\n      if(!str) return null\r\n      return str.map(attr => {\r\n        let key = attr.replace('[', '').replace(/\\=.*?$/, '')\r\n        let value = attr.match(/\\\".*?\\\"/)[0].replaceAll('\"', '')\r\n        return {key, value}\r\n      })\r\n  }\r\n\r\n  static parseContent(str){\r\n      str = str.match(/\\([^\\)]*\\)/)\r\n      if(!str) return \"\"\r\n      str = str[0].replace(/[\\(|\\)]/gs, '')\r\n      return str\r\n  }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./src/parser.js?");

/***/ }),

/***/ "./src/rigged.js":
/*!***********************!*\
  !*** ./src/rigged.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Rigged; });\n/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser */ \"./src/parser.js\");\n\r\nclass Rigged {\r\n\r\n    constructor(options) {\r\n        this.init(options)\r\n        this.build()\r\n    }\r\n\r\n    init(options) {\r\n        options = Object.assign({\r\n            container: null,\r\n            template: `div`\r\n        }, options)\r\n        for (let key in options) this[key] = options[key]\r\n    }\r\n\r\n    build() {\r\n        this.elements = _parser__WEBPACK_IMPORTED_MODULE_0__[\"default\"].parse(this.template)\r\n        this.elements.map(element => {\r\n            if (element._connector)\r\n                this[element._connector] = element\r\n                this.addMethods(element)\r\n        })\r\n        this.element = this.elements[0]\r\n        this.addMethods(this.element)\r\n        if(this.container) this.container.appendChild(this.element)\r\n    }\r\n\r\n    /**\r\n    * Magic methods\r\n    */\r\n    addMethods(el){\r\n      el.setStyle = (styles)=>{\r\n        return this.setStyle(styles, el)\r\n      }\r\n      el.remove = ()=>{\r\n        this.remove(el)\r\n      }\r\n      el.selectOne = (selector)=>{\r\n        return this.selectOne(selector, el)\r\n      }\r\n      el.selectAll = (selector)=>{\r\n        return this.selectAll(selector, el)\r\n      }\r\n    }\r\n\r\n    setStyle(styles, el){\r\n      for(let key in styles) el.style[key] = styles[key]\r\n      return el\r\n    }\r\n\r\n    selectOne(selector, el){\r\n        return el.querySelector(selector)\r\n    }\r\n\r\n    selectAll(selector, el){\r\n        return [...el.querySelectorAll(selector)]\r\n    }\r\n\r\n    remove(el){\r\n      el.parentElement.removeChild(el)\r\n    }\r\n\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./src/rigged.js?");

/***/ })

/******/ });