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

/***/ "./src/basic.js":
/*!**********************!*\
  !*** ./src/basic.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Element; });\nclass Element {\r\n\r\n    constructor(options) {\r\n        this.init(options)\r\n        this.build()\r\n    }\r\n\r\n    init(options) {\r\n        options = Object.assign({\r\n            container: document.body,\r\n            template: `div`\r\n        }, options)\r\n        for (let key in options) this[key] = options[key]\r\n    }\r\n\r\n    build() {\r\n        this.elements = this.parse(this.template)\r\n        this.elements.map(element => {\r\n            if (element.id)\r\n                this[element.id.replace(/\\#/, '')] = element\r\n        })\r\n    }\r\n\r\n    parse() {\r\n        let parsed = this.template.trim().split('\\n')\r\n        let tree = []\r\n        let lastIndent = 0\r\n\r\n        if (!parsed.length) return null\r\n\r\n        parsed = parsed.map((str, i) => {\r\n\r\n            let tag = str.trim().match(/^[^ ]*/)[0]\r\n\r\n            let el = document.createElement(tag)\r\n\r\n            let id = this.parseId(str)\r\n            if (id) el.id = id[0]\r\n\r\n            let classes = this.parseClasses(str)\r\n            if (classes) classes.map(cls => el.classList.add(cls))\r\n\r\n            let attributes = this.parseAttributes(str)\r\n            if(attributes) attributes.map(attr => {\r\n              el.setAttribute(attr.key, attr.value)\r\n            })\r\n\r\n            let indent = str.match(/^\\ */)[0].length\r\n\r\n            if (!tree.length) {\r\n                this.container.appendChild(el)\r\n                tree.push(el)\r\n            } else {\r\n                // remove one from tree then append inside parent\r\n                if (indent < lastIndent) {\r\n                    tree = tree.splice(tree.length - 1, 1)\r\n                    tree[tree.length - 1].appendChild(el)\r\n                } else {\r\n                    tree[tree.length - 1].appendChild(el)\r\n                }\r\n            }\r\n\r\n            lastIndent = indent\r\n            return el\r\n        })\r\n\r\n\r\n        return parsed\r\n    }\r\n\r\n    parseClasses(str) {\r\n        str = str.match(/\\.[^\\.]*/gms)\r\n        if(!str) return null\r\n        return str.map(cls => cls.replace(/\\./, ''))\r\n    }\r\n\r\n    parseId(str) {\r\n        return str.match(/\\#[^\\#\\. ]*/)\r\n    }\r\n\r\n    parseAttributes(str) {\r\n        str = str.match(/\\[[^\\]]*\\]/gm)\r\n        if(!str) return null\r\n        return str.map(attr => {\r\n          let key = attr.replace('[', '').replace(/\\=.*?$/, '')\r\n          let value = attr.match(/\\\".*?\\\"/)[0].replaceAll('\"', '')\r\n          return {key, value}\r\n        })\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./src/basic.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _basic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basic */ \"./src/basic.js\");\n\r\ndocument.addEventListener('DOMContentLoaded', ()=>{\r\n  let element = new _basic__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n    template: `\r\n    div .controls\r\n      i #buttonLeft .button.button-left\r\n      i .button-right\r\n      span .btn\r\n      input [type=\"text\"] [autofocus=\"true\"]\r\n    `\r\n  })\r\n\r\n})\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });