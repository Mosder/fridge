/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Magnet.ts":
/*!***********************!*\
  !*** ./src/Magnet.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Magnet\": () => (/* binding */ Magnet),\n/* harmony export */   \"magnets\": () => (/* binding */ magnets)\n/* harmony export */ });\nvar Magnet = /** @class */ (function () {\r\n    function Magnet(id) {\r\n        this.id = id;\r\n        this.div = this.createDiv();\r\n        this.resize(Magnet.startSize, Magnet.startSize);\r\n        this.move(Magnet.startOffset, Magnet.startOffset);\r\n    }\r\n    Magnet.prototype.createDiv = function () {\r\n        var _this = this;\r\n        var div = document.createElement(\"div\");\r\n        div.className = \"magnet\";\r\n        div.id = this.id.toString();\r\n        div.onmousedown = function (e) { _this.divFocus(e); };\r\n        var del = document.createElement(\"button\");\r\n        del.className = \"del\";\r\n        del.onclick = function () { _this.yeet(); };\r\n        div.appendChild(del);\r\n        var resizer = document.createElement(\"div\");\r\n        resizer.className = \"resizer\";\r\n        resizer.onmousedown = function (e) { _this.resizerFocus(e); };\r\n        div.appendChild(resizer);\r\n        this.contentDiv = document.createElement(\"div\");\r\n        this.contentDiv.className = \"content\";\r\n        this.contentDiv.innerText = Magnet.startContent;\r\n        div.append(this.contentDiv);\r\n        document.body.appendChild(div);\r\n        return div;\r\n    };\r\n    Magnet.prototype.resize = function (width, height) {\r\n        this.width = width;\r\n        this.height = height;\r\n        this.div.style.width = width + \"px\";\r\n        this.div.style.height = height + \"px\";\r\n    };\r\n    Magnet.prototype.move = function (x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.div.style.left = x + \"px\";\r\n        this.div.style.top = y + \"px\";\r\n    };\r\n    Magnet.prototype.color = function (color) {\r\n        this.div.style.backgroundColor = color;\r\n    };\r\n    Object.defineProperty(Magnet.prototype, \"getZ\", {\r\n        get: function () {\r\n            return parseInt(this.div.style.zIndex);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Magnet.prototype.getOnTop = function () {\r\n        var z = 0;\r\n        for (var _i = 0, magnets_1 = magnets; _i < magnets_1.length; _i++) {\r\n            var magnet = magnets_1[_i];\r\n            if (z <= magnet.getZ)\r\n                z = magnet.getZ + 1;\r\n        }\r\n        this.div.style.zIndex = z.toString();\r\n    };\r\n    Magnet.prototype.divFocus = function (e) {\r\n        var _this = this;\r\n        if (this.div == e.target || this.contentDiv == e.target) {\r\n            e.preventDefault();\r\n            this.color(\"#feefed\");\r\n            this.getOnTop();\r\n            document.onmouseup = function () {\r\n                document.onmouseup = null;\r\n                document.onmousemove = null;\r\n                _this.color(\"#fff\");\r\n            };\r\n            var offsetX_1 = e.clientX - this.x;\r\n            var offsetY_1 = e.clientY - this.y;\r\n            document.onmousemove = function (e) { _this.divDrag(e, offsetX_1, offsetY_1); };\r\n        }\r\n    };\r\n    Magnet.prototype.divDrag = function (e, offX, offY) {\r\n        e.preventDefault();\r\n        this.move(e.clientX - offX, e.clientY - offY);\r\n    };\r\n    Magnet.prototype.resizerFocus = function (e) {\r\n        var _this = this;\r\n        e.preventDefault();\r\n        this.color(\"#feefed\");\r\n        this.getOnTop();\r\n        document.onmouseup = function () {\r\n            document.onmouseup = null;\r\n            document.onmousemove = null;\r\n            _this.color(\"#fff\");\r\n        };\r\n        document.onmousemove = function (e) { _this.resizerResize(e); };\r\n    };\r\n    Magnet.prototype.resizerResize = function (e) {\r\n        e.preventDefault();\r\n        var x = e.clientX - this.x;\r\n        x = x > 100 ? x : 100;\r\n        var y = e.clientY - this.y;\r\n        y = y > 100 ? y : 100;\r\n        this.resize(x, y);\r\n    };\r\n    Magnet.prototype.yeet = function () {\r\n        this.div.parentNode.removeChild(this.div);\r\n        yeetMagnet(this.id);\r\n    };\r\n    Magnet.startSize = 100;\r\n    Magnet.startOffset = 40;\r\n    Magnet.startContent = \"NEW JOB!!!\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\nssssssssssssssssssssss\";\r\n    return Magnet;\r\n}());\r\nvar magnets = [];\r\nfunction yeetMagnet(id) {\r\n    magnets = magnets.filter(function (val) { return val.id != id; });\r\n    document.getElementById(\"on\").innerText = \"On: \" + magnets.length.toString();\r\n}\r\n\r\n\n\n//# sourceURL=webpack://fridge/./src/Magnet.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Magnet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Magnet */ \"./src/Magnet.ts\");\n\r\nvar totalAmount = 0;\r\ndocument.getElementById(\"add\").onclick = addMagnet;\r\nfunction addMagnet() {\r\n    _Magnet__WEBPACK_IMPORTED_MODULE_0__.magnets.push(new _Magnet__WEBPACK_IMPORTED_MODULE_0__.Magnet(totalAmount++));\r\n    document.getElementById(\"total\").innerText = \"Total: \" + totalAmount.toString();\r\n    document.getElementById(\"on\").innerText = \"On: \" + _Magnet__WEBPACK_IMPORTED_MODULE_0__.magnets.length.toString();\r\n}\r\n\n\n//# sourceURL=webpack://fridge/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;