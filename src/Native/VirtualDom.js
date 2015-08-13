/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _LazyJs = __webpack_require__(1);

	var _LazyJs2 = _interopRequireDefault(_LazyJs);

	var IncrementalDOM = __webpack_require__(2),
	    elementOpen = IncrementalDOM.elementOpen,
	    elementClose = IncrementalDOM.elementClose,
	    elementVoid = IncrementalDOM.elementVoid,
	    _text = IncrementalDOM.text;
	var patch = __webpack_require__(2).patch;

	function ElmNativeModule(Elm, name, values) {
	  Elm.Native[name] = {};
	  Elm.Native[name].make = function (elm) {
	    elm.Native = elm.Native || {};
	    elm.Native[name] = elm.Native[name] || {};
	    if (elm.Native[name].values) return elm.Native[name].values;
	    return elm.Native[name].values = values;
	  };
	}
	function makeNode(name, propertyList, contents) {
	  var _this = this;

	  var List = Elm.Native.List.make(Elm);
	  var properties = [name, null, null];
	  List.toArray(propertyList).forEach(function (x) {
	    if (typeof x.value !== "boolean") {
	      properties.push(x.key);
	      properties.push(x.value);
	    } else {
	      if (x.value) {
	        properties.push(x.key);
	        properties.push(x.value);
	      }
	    }
	  });
	  return function () {
	    elementOpen.apply(_this, properties);
	    List.toArray(contents).forEach(function (x) {
	      if (x.type === "Thunk") {
	        x.render();
	      } else {
	        x();
	      }
	    });
	    elementClose(name);
	  };
	}
	function attribute(key, value) {
	  return {
	    key: key,
	    value: value
	  };
	}

	function property(key, value) {
	  // if( typeof value === "boolean"){
	  //   type =
	  // }
	  return {
	    key: key,
	    value: typeof value === "boolean" ? value : new Object(value)
	  };
	}

	function on(name, options, decoder, createMessage) {
	  var Json = Elm.Native.Json.make(Elm);
	  var List = Elm.Native.List.make(Elm);
	  var Signal = Elm.Native.Signal.make(Elm);
	  var Utils = Elm.Native.Utils.make(Elm);
	  function eventHandler(event) {
	    var value = A2(Json.runDecoderValue, decoder, event);
	    if (value.ctor === 'Ok') {
	      if (options.stopPropagation) {
	        event.stopPropagation();
	      }
	      if (options.preventDefault) {
	        event.preventDefault();
	      }
	      Signal.sendMessage(createMessage(value._0));
	    }
	  }
	  return property('on' + name, eventHandler);
	}

	function incrementalDOM(Elm) {
	  return {
	    node: function node(name, x, y) {
	      return F2(function (propertyList, contents) {
	        return makeNode(name, propertyList, contents);
	      });
	    },

	    text: function text(x) {
	      return function () {
	        _text(x);
	      };
	    },
	    render: function render(func) {
	      var Element = Elm.Native.Graphics.Element.make(Elm);
	      var element = Element.createNode('div');
	      patch(element, function () {
	        func();
	      });
	      return element;
	    },
	    updateAndReplace: function updateAndReplace(node, oldModel, newFunc) {
	      patch(node, function () {
	        newFunc();
	      });
	      return node;
	    },
	    attribute: F2(attribute),
	    property: F2(property),
	    lazy: F2(_LazyJs2['default'].lazyRef),
	    lazy2: F3(_LazyJs2['default'].lazyRef2),
	    lazy3: F4(_LazyJs2['default'].lazyRef3),
	    on: F4(on)

	  };
	}

	ElmNativeModule(Elm, 'VirtualDom', incrementalDOM(Elm));

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function lazyRef(fn, a) {
	  function thunk() {
	    return fn(a);
	  }
	  return new Thunk(fn, [a], thunk);
	}

	function lazyRef2(fn, a, b) {
	  function thunk() {
	    return A2(fn, a, b);
	  }
	  return new Thunk(fn, [a, b], thunk);
	}

	function lazyRef3(fn, a, b, c) {
	  function thunk() {
	    return A3(fn, a, b, c);
	  }
	  return new Thunk(fn, [a, b, c], thunk);
	}

	function Thunk(fn, args, thunk) {
	  this.fn = fn;
	  this.args = args;
	  this.vnode = null;
	  this.key = undefined;
	  this.thunk = thunk;
	}

	Thunk.prototype.type = "Thunk";
	Thunk.prototype.render = renderThunk;

	function renderThunk() {
	  return this.thunk()();
	}
	exports["default"] = {
	  lazyRef: lazyRef, lazyRef2: lazyRef2, lazyRef3: lazyRef3
	};
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var patch = __webpack_require__(3).patch;
	var elements = __webpack_require__(8);

	module.exports = {
	  patch: patch,
	  elementVoid: elements.elementVoid,
	  elementOpenStart: elements.elementOpenStart,
	  elementOpenEnd: elements.elementOpenEnd,
	  elementOpen: elements.elementOpen,
	  elementClose: elements.elementClose,
	  text: elements.text,
	  attr: elements.attr
	};



/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var traversal = __webpack_require__(4),
	    firstChild = traversal.firstChild,
	    parentNode = traversal.parentNode;
	var TreeWalker = __webpack_require__(7);
	var walker = __webpack_require__(5),
	    getWalker = walker.getWalker,
	    setWalker = walker.setWalker;


	/**
	 * Patches the document starting at el with the provided function. This function
	 * may be called during an existing patch operation.
	 * @param {!Element} el the element to patch
	 * @param {!function} fn A function containing elementOpen/elementClose/etc.
	 *     calls that describe the DOM.
	 */
	var patch = function(el, fn) {
	  var prevWalker = getWalker();
	  setWalker(new TreeWalker(el));

	  firstChild();
	  fn();
	  parentNode();

	  setWalker(prevWalker);
	};


	/** */
	module.exports = {
	  patch: patch
	};



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var getWalker = __webpack_require__(5).getWalker;
	var getData = __webpack_require__(6).getData;


	/**
	 * Enters a Element, clearing out the last visited child field.
	 * @param {!Element} node
	 */
	var enterNode = function(node) {
	  var data = getData(node);
	  data.lastVisitedChild = null;
	};


	/**
	 * Clears out any unvisited Nodes, as the corresponding virtual element
	 * functions were never called for them.
	 * @param {!Element} node
	 */
	var exitNode = function(node) {
	  var data = getData(node);
	  var lastVisitedChild = data.lastVisitedChild;

	  if (node.lastChild === lastVisitedChild) {
	    return;
	  }

	  while (node.lastChild !== lastVisitedChild) {
	    node.removeChild(node.lastChild);
	  }

	  // Invalidate the key map since we removed children. It will get recreated
	  // next time we need it.
	  data.keyMap = null;
	};


	/**
	 * Marks a parent as having visited a child.
	 * @param {!Element} parent
	 * @param {!Node} child
	 */
	var markVisited = function(parent, child) {
	  var data = getData(parent);
	  data.lastVisitedChild = child;
	};


	/**
	 * Changes to the first child of the current node.
	 */
	var firstChild = function() {
	  var walker = getWalker();
	  enterNode(walker.currentNode);
	  walker.firstChild();
	};


	/**
	 * Changes to the next sibling of the current node.
	 */
	var nextSibling = function() {
	  var walker = getWalker();
	  walker.nextSibling();
	};


	/**
	 * Changes to the parent of the current node, removing any unvisited children.
	 */
	var parentNode = function() {
	  var walker = getWalker();
	  walker.parentNode();
	  exitNode(walker.currentNode);
	};


	/** */
	module.exports = {
	  firstChild: firstChild,
	  nextSibling: nextSibling,
	  parentNode: parentNode,
	  markVisited: markVisited
	};



/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * @type {TreeWalker}
	 */
	var walker_;


	/**
	 * @return {TreeWalker} the current TreeWalker
	 */
	var getWalker = function() {
	  return walker_;
	};


	/**
	 * Sets the current TreeWalker
	 * @param {TreeWalker} walker
	 */
	var setWalker = function(walker) {
	  walker_ = walker;
	};


	/** */
	module.exports = {
	  getWalker: getWalker,
	  setWalker: setWalker
	};



/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */


	/**
	 * Keeps track of information needed to perform diffs for a given DOM node.
	 * @param {?string} nodeName
	 * @param {?string} key
	 * @constructor
	 */
	function NodeData(nodeName, key) {
	  /**
	   * The attributes and their values.
	   * @const
	   */
	  this.attrs = {};

	  /**
	   * An array of attribute name/value pairs, used for quickly diffing the
	   * incomming attributes to see if the DOM node's attributes need to be
	   * updated.
	   * @const {Array<*>}
	   */
	  this.attrsArr = [];

	  /**
	   * The incoming attributes for this Node, before they are updated.
	   * @const {!Object<string, *>}
	   */
	  this.newAttrs = {};

	  /**
	   * The key used to identify this node, used to preserve DOM nodes when they
	   * move within their parent.
	   * @const
	   */
	  this.key = key;

	  /**
	   * Keeps track of children within this node by their key.
	   * {?Object<string, Node>}
	   */
	  this.keyMap = null;

	  /**
	   * The last child to have been visited within the current pass.
	   * {?Node}
	   */
	  this.lastVisitedChild = null;

	  /**
	   * The node name for this node.
	   * @const
	   */
	  this.nodeName = nodeName;

	  /**
	   * @const {string}
	   */
	  this.text = null;
	}


	/**
	 * Initializes a NodeData object for a Node.
	 *
	 * @param {!Node} node The node to initialze data for.
	 * @param {string} nodeName The node name of node.
	 * @param {?string} key The key that identifies the node.
	 * @return {!NodeData} The newly initialized data object
	 */
	var initData = function(node, nodeName, key) {
	  var data = new NodeData(nodeName, key);
	  node['__incrementalDOMData'] = data;
	  return data;
	};


	/**
	 * Retrieves the NodeData object for a Node, creating it if necessary.
	 *
	 * @param {!Node} node The node to retrieve the data for.
	 * @return {NodeData} The NodeData for this Node.
	 */
	var getData = function(node) {
	  var data = node['__incrementalDOMData'];

	  if (!data) {
	    var nodeName = node.nodeName.toLowerCase();
	    var key = null;

	    if (node instanceof Element) {
	      key = node.getAttribute('key');
	    }

	    data = initData(node, nodeName, key);
	  }

	  return data;
	};


	/** */
	module.exports = {
	  getData: getData,
	  initData: initData
	};



/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * Similar to the built-in Treewalker class, but simplified and allows direct
	 * access to modify the currentNode property.
	 * @param {!Node} node The root Node of the subtree the walker should start
	 *     traversing.
	 * @constructor
	 */
	function TreeWalker(node) {
	  /**
	   * Keeps track of the current parent node. This is necessary as the traversal
	   * methods may traverse past the last child and we still need a way to get
	   * back to the parent.
	   * @const @private {!Array<!Node>}
	   */
	  this.stack_ = [];

	  /** {?Node} */
	  this.currentNode = node;

	  /** {!Document} */
	  this.doc = node.ownerDocument;
	}


	/**
	 * @return {!Node} The current parent of the current location in the subtree.
	 */
	TreeWalker.prototype.getCurrentParent = function() {
	  return this.stack_[this.stack_.length - 1];
	};


	/**
	 * Changes the current location the firstChild of the current location.
	 */
	TreeWalker.prototype.firstChild = function() {
	  this.stack_.push(this.currentNode);
	  this.currentNode = this.currentNode.firstChild;
	};


	/**
	 * Changes the current location the nextSibling of the current location.
	 */
	TreeWalker.prototype.nextSibling = function() {
	  this.currentNode = this.currentNode.nextSibling;
	};


	/**
	 * Changes the current location the parentNode of the current location.
	 */
	TreeWalker.prototype.parentNode = function() {
	  this.currentNode = this.stack_.pop();
	};


	/** */
	module.exports = TreeWalker;



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var alignWithDOM = __webpack_require__(10).alignWithDOM;
	var updateAttribute = __webpack_require__(12).updateAttribute;
	var getData = __webpack_require__(6).getData;
	var getWalker = __webpack_require__(5).getWalker;
	var traversal = __webpack_require__(4),
	    firstChild = traversal.firstChild,
	    nextSibling = traversal.nextSibling,
	    parentNode = traversal.parentNode;


	/**
	 * The offset in the virtual element declaration where the attributes are
	 * specified.
	 * @const
	 */
	var ATTRIBUTES_OFFSET = 3;


	/**
	 * Builds an array of arguments for use with elementOpenStart, attr and
	 * elementOpenEnd.
	 * @type {Array<*>}
	 * @const
	 */
	var argsBuilder = [];


	if (process.env.NODE_ENV !== 'production') {
	  /**
	   * Keeps track whether or not we are in an attributes declaration (after
	   * elementOpenStart, but before elementOpenEnd).
	   * @type {boolean}
	   */
	  var inAttributes = false;


	  /** Makes sure that the caller is not where attributes are expected. */
	  var assertNotInAttributes = function() {
	    if (inAttributes) {
	      throw new Error('Was not expecting a call to attr or elementOpenEnd, ' +
	          'they must follow a call to elementOpenStart.');
	    }
	  };


	  /** Makes sure that the caller is where attributes are expected. */
	  var assertInAttributes = function() {
	    if (!inAttributes) {
	      throw new Error('Was expecting a call to attr or elementOpenEnd. ' +
	          'elementOpenStart must be followed by zero or more calls to attr, ' +
	          'then one call to elementOpenEnd.');
	    }
	  };


	  /** Updates the state to being in an attribute declaration. */
	  var setInAttributes = function() {
	    inAttributes = true;
	  };


	  /** Updates the state to not being in an attribute declaration. */
	  var setNotInAttributes = function() {
	    inAttributes = false;
	  };
	}


	/**
	 * Checks to see if one or more attributes have changed for a given
	 * Element. When no attributes have changed, this function is much faster than
	 * checking each individual argument. When attributes have changed, the overhead
	 * of this function is minimal.
	 *
	 * This function is called in the context of the Element and the arguments from
	 * elementOpen-like function so that the arguments are not de-optimized.
	 *
	 * @this {Element} The Element to check for changed attributes.
	 * @param {*} unused1
	 * @param {*} unused2
	 * @param {*} unused3
	 * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
	 *     for the Element.
	 * @return {boolean} True if the Element has one or more changed attributes,
	 *     false otherwise.
	 */
	var hasChangedAttrs = function(unused1, unused2, unused3, var_args) {
	  var data = getData(this);
	  var attrsArr = data.attrsArr;
	  var attrsChanged = false;
	  var i;

	  for (i = ATTRIBUTES_OFFSET; i < arguments.length; i += 2) {
	    // Translate the from the arguments index (for values) to the attribute's
	    // ordinal. The attribute values are at arguments index 3, 5, 7, etc. To get
	    // the ordinal, need to subtract the offset and divide by 2
	    if (attrsArr[(i - ATTRIBUTES_OFFSET) >> 1] !== arguments[i + 1]) {
	      attrsChanged = true;
	      break;
	    }
	  }

	  if (attrsChanged) {
	    for (i = ATTRIBUTES_OFFSET; i < arguments.length; i += 2) {
	      attrsArr[(i - ATTRIBUTES_OFFSET) >> 1] = arguments[i + 1];
	    }
	  }

	  return attrsChanged;
	};


	/**
	 * Updates the newAttrs object for an Element.
	 *
	 * This function is called in the context of the Element and the arguments from
	 * elementOpen-like function so that the arguments are not de-optimized.
	 *
	 * @this {Element} The Element to update newAttrs for.
	 * @param {*} unused1
	 * @param {*} unused2
	 * @param {*} unused3
	 * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
	 *     for the Element.
	 * @return {!Object<string, *>} The updated newAttrs object.
	 */
	var updateNewAttrs = function(unused1, unused2, unused3, var_args) {
	  var node = this;
	  var data = getData(node);
	  var newAttrs = data.newAttrs;

	  for (var attr in newAttrs) {
	    newAttrs[attr] = undefined;
	  }

	  for (var i = ATTRIBUTES_OFFSET; i < arguments.length; i += 2) {
	    newAttrs[arguments[i]] = arguments[i + 1];
	  }

	  return newAttrs;
	};


	/**
	 * Updates the attributes for a given Element.
	 * @param {!Element} node
	 * @param {!Object<string,*>} newAttrs The new attributes for node
	 */
	var updateAttributes = function(node, newAttrs) {
	  for (var attr in newAttrs) {
	    updateAttribute(node, attr, newAttrs[attr]);
	  }
	};


	/**
	 * Declares a virtual Element at the current location in the document. This
	 * corresponds to an opening tag and a elementClose tag is required.
	 * @param {string} tag The element's tag.
	 * @param {?string} key The key used to identify this element. This can be an
	 *     empty string, but performance may be better if a unique value is used
	 *     when iterating over an array of items.
	 * @param {?Array<*>} statics An array of attribute name/value pairs of the
	 *     static attributes for the Element. These will only be set once when the
	 *     Element is created.
	 * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
	 *     for the Element.
	 */
	var elementOpen = function(tag, key, statics, var_args) {
	  if (process.env.NODE_ENV !== 'production') {
	    assertNotInAttributes();
	  }

	  var node = alignWithDOM(tag, key, statics);

	  if (hasChangedAttrs.apply(node, arguments)) {
	    var newAttrs = updateNewAttrs.apply(node, arguments);
	    updateAttributes(node, newAttrs);
	  }

	  firstChild();
	};


	/**
	 * Declares a virtual Element at the current location in the document. This
	 * corresponds to an opening tag and a elementClose tag is required. This is
	 * like elementOpen, but the attributes are defined using the attr function
	 * rather than being passed as arguments. Must be folllowed by 0 or more calls
	 * to attr, then a call to elementOpenEnd.
	 * @param {string} tag The element's tag.
	 * @param {?string} key The key used to identify this element. This can be an
	 *     empty string, but performance may be better if a unique value is used
	 *     when iterating over an array of items.
	 * @param {?Array<*>} statics An array of attribute name/value pairs of the
	 *     static attributes for the Element. These will only be set once when the
	 *     Element is created.
	 */
	var elementOpenStart = function(tag, key, statics) {
	  if (process.env.NODE_ENV !== 'production') {
	    assertNotInAttributes();
	    setInAttributes();
	  }

	  argsBuilder[0] = tag;
	  argsBuilder[1] = key;
	  argsBuilder[2] = statics;
	  argsBuilder.length = ATTRIBUTES_OFFSET;
	};


	/***
	 * Defines a virtual attribute at this point of the DOM. This is only valid
	 * when called between elementOpenStart and elementOpenEnd.
	 *
	 * @param {string} name
	 * @param {*} value
	 */
	var attr = function(name, value) {
	  if (process.env.NODE_ENV !== 'production') {
	    assertInAttributes();
	  }

	  argsBuilder.push(name, value);
	};


	/**
	 * Closes an open tag started with elementOpenStart.
	 */
	var elementOpenEnd = function() {
	  if (process.env.NODE_ENV !== 'production') {
	    assertInAttributes();
	    setNotInAttributes();
	  }

	  elementOpen.apply(null, argsBuilder);
	};


	/**
	 * Closes an open virtual Element.
	 *
	 * @param {string} tag The element's tag.
	 */
	var elementClose = function(tag) {
	  if (process.env.NODE_ENV !== 'production') {
	    assertNotInAttributes();
	  }

	  parentNode();
	  nextSibling();
	};


	/**
	 * Declares a virtual Element at the current location in the document that has
	 * no children.
	 * @param {string} tag The element's tag.
	 * @param {?string} key The key used to identify this element. This can be an
	 *     empty string, but performance may be better if a unique value is used
	 *     when iterating over an array of items.
	 * @param {?Array<*>} statics An array of attribute name/value pairs of the
	 *     static attributes for the Element. These will only be set once when the
	 *     Element is created.
	 * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
	 *     for the Element.
	 */
	var elementVoid = function(tag, key, statics, var_args) {
	  if (process.env.NODE_ENV !== 'production') {
	    assertNotInAttributes();
	  }

	  elementOpen.apply(null, arguments);
	  elementClose.apply(null, arguments);
	};


	/**
	 * Declares a virtual Text at this point in the document.
	 *
	 * @param {string} value The text of the Text.
	 */
	var text = function(value) {
	  if (process.env.NODE_ENV !== 'production') {
	    assertNotInAttributes();
	  }

	  var node = alignWithDOM('#text', null, value);
	  var data = getData(node);

	  if (data.text !== value) {
	    node.data = value;
	    data.text = value;
	  }

	  nextSibling();
	};


	/** */
	module.exports = {
	  elementOpenStart: elementOpenStart,
	  elementOpenEnd: elementOpenEnd,
	  elementOpen: elementOpen,
	  elementVoid: elementVoid,
	  elementClose: elementClose,
	  text: text,
	  attr: attr
	};


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var nodes = __webpack_require__(11),
	    createNode = nodes.createNode,
	    getKey = nodes.getKey,
	    getNodeName = nodes.getNodeName,
	    getChild = nodes.getChild,
	    registerChild = nodes.registerChild;
	var markVisited = __webpack_require__(4).markVisited;
	var getWalker = __webpack_require__(5).getWalker;


	/**
	 * Checks whether or not a given node matches the specified nodeName and key.
	 *
	 * @param {?Node} node An HTML node, typically an HTMLElement or Text.
	 * @param {?string} nodeName The nodeName for this node.
	 * @param {?string} key An optional key that identifies a node.
	 * @return {boolean} True if the node matches, false otherwise.
	 */
	var matches = function(node, nodeName, key) {
	  return node &&
	         key === getKey(node) &&
	         nodeName === getNodeName(node);
	};


	/**
	 * Aligns the virtual Element definition with the actual DOM, moving the
	 * corresponding DOM node to the correct location or creating it if necessary.
	 * @param {?string} nodeName For an Element, this should be a valid tag string.
	 *     For a Text, this should be #text.
	 * @param {?string} key The key used to identify this element.
	 * @param {?Array<*>|string} statics For an Element, this should be an array of
	 *     name-value pairs. For a Text, this should be the text content of the
	 *     node.
	 * @return {!Node} The matching node.
	 */
	var alignWithDOM = function(nodeName, key, statics) {
	  var walker = getWalker();
	  var currentNode = walker.currentNode;
	  var parent = walker.getCurrentParent();
	  var matchingNode;

	  // Check to see if we have a node to reuse
	  if (matches(currentNode, nodeName, key)) {
	    matchingNode = currentNode;
	  } else {
	    var existingNode = key && getChild(parent, key);

	    // Check to see if the node has moved within the parent or if a new one
	    // should be created
	    if (existingNode) {
	      matchingNode = existingNode;
	    } else {
	      matchingNode = createNode(walker.doc, nodeName, key, statics);
	      registerChild(parent, key, matchingNode);
	    }

	    parent.insertBefore(matchingNode, currentNode);
	    walker.currentNode = matchingNode;
	  }

	  markVisited(parent, matchingNode);

	  return matchingNode;
	};


	/** */
	module.exports = {
	  alignWithDOM: alignWithDOM
	};



/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var updateAttribute = __webpack_require__(12).updateAttribute;
	var nodeData = __webpack_require__(6),
	    getData = nodeData.getData,
	    initData = nodeData.initData;


	/**
	 * Creates an Element.
	 * @param {!Document} doc The document with which to create the Element.
	 * @param {string} tag The tag for the Element.
	 * @param {?string} key A key to identify the Element.
	 * @param {?Array<*>} statics An array of attribute name/value pairs of
	 *     the static attributes for the Element.
	 * @return {!Element}
	 */
	var createElement = function(doc, tag, key, statics) {
	  var el = doc.createElement(tag);
	  initData(el, tag, key);

	  if (statics) {
	    for (var i = 0; i < statics.length; i += 2) {
	      updateAttribute(el, statics[i], statics[i + 1]);
	    }
	  }

	  return el;
	};

	/**
	 * Creates a Text.
	 * @param {!Document} doc The document with which to create the Text.
	 * @param {string} text The intial content of the Text.
	 * @return {!Text}
	 */
	var createTextNode = function(doc, text) {
	  var node = doc.createTextNode(text);
	  getData(node).text = text;

	  return node;
	};


	/**
	 * Creates a Node, either a Text or an Element depending on the node name
	 * provided.
	 * @param {!Document} doc The document with which to create the Node.
	 * @param {string} nodeName The tag if creating an element or #text to create
	 *     a Text.
	 * @param {?string} key A key to identify the Element.
	 * @param {?Array<*>|string} statics The static data to initialize the Node
	 *     with. For an Element, an array of attribute name/value pairs of
	 *     the static attributes for the Element. For a Text, a string with the
	 *     intial content of the Text.
	 * @return {!Node}
	 */
	var createNode = function(doc, nodeName, key, statics) {
	  if (nodeName === '#text') {
	    return createTextNode(doc, statics);
	  }

	  return createElement(doc, nodeName, key, statics);
	};


	/**
	 * Creates a mapping that can be used to look up children using a key.
	 * @param {!Element} el
	 * @return {!Object<string, !Node>} A mapping of keys to the children of the
	 *     Element.
	 */
	var createKeyMap = function(el) {
	  var map = {};
	  var children = el.children;
	  var count = children.length;

	  for (var i = 0; i < count; i += 1) {
	    var child = children[i];
	    var key = getKey(child);

	    if (key) {
	      map[key] = child;
	    }
	  }

	  return map;
	};


	/**
	 * @param {?Node} node A node to get the key for.
	 * @return {?string} The key for the Node, if applicable.
	 */
	var getKey = function(node) {
	  return getData(node).key;
	};


	/**
	 * @param {?Node} node A node to get the node name for.
	 * @return {?string} The node name for the Node, if applicable.
	 */
	var getNodeName = function(node) {
	  return getData(node).nodeName;
	};


	/**
	 * Retrieves the mapping of key to child node for a given Element, creating it
	 * if necessary.
	 * @param {!Element} el
	 * @return {!Object<string,!Node>} A mapping of keys to child Nodes
	 */
	var getKeyMap = function(el) {
	  var data = getData(el);

	  if (!data.keyMap) {
	    data.keyMap = createKeyMap(el);
	  }

	  return data.keyMap;
	};


	/**
	 * Retrieves a child from the parent with the given key.
	 * @param {!Element} parent
	 * @param {?string} key
	 * @return {?Node} The child corresponding to the key.
	 */
	var getChild = function(parent, key) {
	  return getKeyMap(parent)[key];
	};


	/**
	 * Registers a node as being a child. If a key is provided, the parent will
	 * keep track of the child using the key. The child can be retrieved using the
	 * same key using getKeyMap. The provided key should be unique within the
	 * parent Element.
	 * @param {!Element} parent The parent of child.
	 * @param {?string} key A key to identify the child with.
	 * @param {!Node} child The child to register.
	 */
	var registerChild = function(parent, key, child) {
	  if (key) {
	    getKeyMap(parent)[key] = child;
	  }
	};


	/** */
	module.exports = {
	  createNode: createNode,
	  getKey: getKey,
	  getNodeName: getNodeName,
	  getChild: getChild,
	  registerChild: registerChild
	};



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS-IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	var getData = __webpack_require__(6).getData;


	/**
	 * Applies an attribute or property to a given Element. If the value is a object
	 * or a function (which includes null), it is set as a property on the Element.
	 * Otherwise, the value is set as an attribute.
	 * @param {!Element} el
	 * @param {string} name The attribute's name.
	 * @param {*} value The attribute's value. If the value is a string, it is set
	 *     as an HTML attribute, otherwise, it is set on node.
	 */
	var applyAttr = function(el, name, value) {
	  var data = getData(el);
	  var attrs = data.attrs;

	  if (attrs[name] === value) {
	    return;
	  }

	  var type = typeof value;

	  if (value === undefined) {
	    el.removeAttribute(name);
	  } else if (type === 'object' || type === 'function') {
	    el[name] = value;
	  } else {
	    el.setAttribute(name, value);
	  }

	  attrs[name] = value;
	};


	/**
	 * Applies a style to an Element. No vendor prefix expansion is done for
	 * property names/values.
	 * @param {!Element} el
	 * @param {string|Object<string,string>} style The style to set. Either a string
	 *     of css or an object containing property-value pairs.
	 */
	var applyStyle = function(el, style) {
	  if (typeof style === 'string' || style instanceof String) {
	    el.style.cssText = style;
	  } else {
	    el.style.cssText = '';

	    for (var prop in style) {
	      el.style[prop] = style[prop];
	    }
	  }
	};


	/**
	 * Updates a single attribute on an Element. For some types (e.g. id or class),
	 * the value is applied directly to the Element using the corresponding accessor
	 * function.
	 * @param {!Element} el
	 * @param {string} name The attribute's name.
	 * @param {*} value The attribute's value. If the value is a string, it is set
	 *     as an HTML attribute, otherwise, it is set on node.
	 */
	var updateAttribute = function(el, name, value) {
	  switch (name) {
	    case 'id':
	      el.id = value;
	      break;
	    case 'class':
	      el.className = value;
	      break;
	    case 'tabindex':
	      el.tabIndex = value;
	      break;
	    case 'style':
	      applyStyle(el, value);
	      break;
	    default:
	      applyAttr(el, name, value);
	      break;
	  }
	};


	/** */
	module.exports = {
	  updateAttribute: updateAttribute
	};



/***/ }
/******/ ]);