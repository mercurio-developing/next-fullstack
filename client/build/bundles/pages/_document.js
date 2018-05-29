
          window.__NEXT_REGISTER_PAGE('/_document', function() {
            var comp = module.exports =
webpackJsonp([2],[
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var ctx = __webpack_require__(8);
var hide = __webpack_require__(9);
var has = __webpack_require__(11);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(44)('wks');
var uid = __webpack_require__(27);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(61);
var toPrimitive = __webpack_require__(41);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(25);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(20);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(42);
var defined = __webpack_require__(39);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(85);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(39);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = __webpack_require__(127);
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(90)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(40)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(63);
var enumBugKeys = __webpack_require__(45);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var call = __webpack_require__(73);
var isArrayIter = __webpack_require__(74);
var anObject = __webpack_require__(7);
var toLength = __webpack_require__(30);
var getIterFn = __webpack_require__(54);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);
var dPs = __webpack_require__(92);
var enumBugKeys = __webpack_require__(45);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(50)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(72).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(96);
var global = __webpack_require__(3);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(13);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(38);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(55);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(120);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(124);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(55);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(37);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(19);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(62);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(13);
var $iterCreate = __webpack_require__(91);
var setToStringTag = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(64);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(44)('keys');
var uid = __webpack_require__(27);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(19) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 45 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 46 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(27)('meta');
var isObject = __webpack_require__(5);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(10)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(19);
var wksExt = __webpack_require__(47);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {



/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(31);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(111);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(113);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  var invariant = __webpack_require__(35);
  var warning = __webpack_require__(36);
  var ReactPropTypesSecret = __webpack_require__(69);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(128)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}


/***/ }),
/* 59 */,
/* 60 */,
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(50)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(93)(false);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(16);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(63);
var hiddenKeys = __webpack_require__(45).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(29);
var createDesc = __webpack_require__(20);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(41);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(61);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 70 */,
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(10);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 77 */,
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var dP = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(162), __esModule: true };

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(99);
exports.encode = exports.stringify = __webpack_require__(100);


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (true) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(38);
var defined = __webpack_require__(39);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(26);
var descriptor = __webpack_require__(20);
var setToStringTag = __webpack_require__(22);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(7);
var getKeys = __webpack_require__(21);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(30);
var toAbsoluteIndex = __webpack_require__(94);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(38);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 95 */,
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(97);
var step = __webpack_require__(65);
var Iterators = __webpack_require__(13);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(40)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 98 */,
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 101 */,
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(164);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(83);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(76);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(108) });


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(46);
var pIE = __webpack_require__(29);
var toObject = __webpack_require__(16);
var IObject = __webpack_require__(42);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(16);
var $getPrototypeOf = __webpack_require__(64);

__webpack_require__(75)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(28);
module.exports = __webpack_require__(47).f('iterator');


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115);
__webpack_require__(51);
__webpack_require__(118);
__webpack_require__(119);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(62);
var META = __webpack_require__(48).KEY;
var $fails = __webpack_require__(10);
var shared = __webpack_require__(44);
var setToStringTag = __webpack_require__(22);
var uid = __webpack_require__(27);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(47);
var wksDefine = __webpack_require__(49);
var enumKeys = __webpack_require__(116);
var isArray = __webpack_require__(66);
var anObject = __webpack_require__(7);
var isObject = __webpack_require__(5);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(41);
var createDesc = __webpack_require__(20);
var _create = __webpack_require__(26);
var gOPNExt = __webpack_require__(117);
var $GOPD = __webpack_require__(68);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(21);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(67).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(29).f = $propertyIsEnumerable;
  __webpack_require__(46).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(19)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(46);
var pIE = __webpack_require__(29);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(67).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49)('asyncIterator');


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49)('observable');


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(123).set });


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(5);
var anObject = __webpack_require__(7);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(8)(Function.call, __webpack_require__(68).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(26) });


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.4.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var _assign = __webpack_require__(56);
var invariant = __webpack_require__(35);
var emptyObject = __webpack_require__(86);
var warning = __webpack_require__(36);
var emptyFunction = __webpack_require__(37);
var checkPropTypes = __webpack_require__(57);

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.4.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for('react.timeout') : 0xead1;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

// Relying on the `invariant()` implementation lets us
// have preserve the format and params in the www builds.

// Exports ReactDOM.createRoot


// Experimental error-boundary API that can recover from errors within a single
// render phase

// Suspense
var enableSuspense = false;
// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:


// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.


// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


// Warn about legacy context API


// Gather advanced timing metrics for Profiler subtrees.


// Fires getDerivedStateFromProps for state *or* props changes


// Only used in www builds.

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warning(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };
  {
    Object.seal(refObject);
  }
  return refObject;
}

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown = void 0;
var specialPropRefWarningShown = void 0;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName = void 0;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;

  var propName = void 0;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps = void 0;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child = void 0;
  var nextName = void 0;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          !didWarnAboutMaps ? warning(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum()) : void 0;
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step = void 0;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warning(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _defaultValue: defaultValue,
    _currentValue: defaultValue,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue2: defaultValue,
    _changedBits: 0,
    _changedBits2: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  context.Consumer = context;

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

function forwardRef(render) {
  {
    !(typeof render === 'function') ? warning(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render) : void 0;

    if (render != null) {
      !(render.defaultProps == null && render.propTypes == null) ? warning(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
    }
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_TIMEOUT_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  if (typeof type === 'string') {
    return type;
  }
  switch (type) {
    case REACT_ASYNC_MODE_TYPE:
      return 'AsyncMode';
    case REACT_CONTEXT_TYPE:
      return 'Context.Consumer';
    case REACT_FRAGMENT_TYPE:
      return 'ReactFragment';
    case REACT_PORTAL_TYPE:
      return 'ReactPortal';
    case REACT_PROFILER_TYPE:
      return 'Profiler(' + fiber.pendingProps.id + ')';
    case REACT_PROVIDER_TYPE:
      return 'Context.Provider';
    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';
    case REACT_TIMEOUT_TYPE:
      return 'Timeout';
  }
  if (typeof type === 'object' && type !== null) {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        var functionName = type.render.displayName || type.render.name || '';
        return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
    }
  }
  return null;
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

var currentlyValidatingElement = void 0;
var propTypesMisspellWarningShown = void 0;

var getDisplayName = function () {};
var getStackAddendum = function () {};

{
  currentlyValidatingElement = null;

  propTypesMisspellWarningShown = false;

  getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (element.type === REACT_FRAGMENT_TYPE) {
      return 'React.Fragment';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  getStackAddendum = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
    return stack;
  };
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step = void 0;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;
  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
    currentlyValidatingElement = null;
  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    !componentClass.getDefaultProps.isReactClassApproved ? warning(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  currentlyValidatingElement = fragment;

  var keys = Object.keys(fragment.props);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key !== 'children' && key !== 'key') {
      warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
      break;
    }
  }

  if (fragment.ref !== null) {
    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
  }

  currentlyValidatingElement = null;
}

function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type);

  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    info += getStackAddendum() || '';

    var typeString = void 0;
    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else {
      typeString = typeof type;
    }

    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;
  // Legacy hook: remove it
  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  createRef: createRef,
  Component: Component,
  PureComponent: PureComponent,

  createContext: createContext,
  forwardRef: forwardRef,

  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
  unstable_Profiler: REACT_PROFILER_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

if (enableSuspense) {
  React.Timeout = REACT_TIMEOUT_TYPE;
}

{
  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3.default ? React$3.default : React$3;

module.exports = react;
  })();
}


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(37);
var invariant = __webpack_require__(35);
var warning = __webpack_require__(36);
var assign = __webpack_require__(56);

var ReactPropTypesSecret = __webpack_require__(69);
var checkPropTypes = __webpack_require__(57);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 129 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(4).f;
var create = __webpack_require__(26);
var redefineAll = __webpack_require__(53);
var ctx = __webpack_require__(8);
var anInstance = __webpack_require__(52);
var forOf = __webpack_require__(23);
var $iterDefine = __webpack_require__(40);
var step = __webpack_require__(65);
var setSpecies = __webpack_require__(79);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(48).fastKey;
var validate = __webpack_require__(71);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var $export = __webpack_require__(1);
var meta = __webpack_require__(48);
var fails = __webpack_require__(10);
var hide = __webpack_require__(9);
var redefineAll = __webpack_require__(53);
var forOf = __webpack_require__(23);
var anInstance = __webpack_require__(52);
var isObject = __webpack_require__(5);
var setToStringTag = __webpack_require__(22);
var dP = __webpack_require__(4).f;
var each = __webpack_require__(136)(0);
var DESCRIPTORS = __webpack_require__(6);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(8);
var IObject = __webpack_require__(42);
var toObject = __webpack_require__(16);
var toLength = __webpack_require__(30);
var asc = __webpack_require__(137);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(138);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var isArray = __webpack_require__(66);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(31);
var from = __webpack_require__(140);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(23);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(25);
var ctx = __webpack_require__(8);
var forOf = __webpack_require__(23);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(161);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(16);
var $keys = __webpack_require__(21);

__webpack_require__(75)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);
__webpack_require__(18);
module.exports = __webpack_require__(163);


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var get = __webpack_require__(54);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(165), __esModule: true };

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);
__webpack_require__(18);
module.exports = __webpack_require__(166);


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(31);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(371);


/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(32);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(33);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _document = __webpack_require__(372);

var _document2 = _interopRequireDefault(_document);

__webpack_require__(386);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/home/tushita/mercuriodev/next-redux/client/pages/_document.js?entry";


var MyDocument = function (_Document) {
  (0, _inherits3.default)(MyDocument, _Document);

  function MyDocument() {
    (0, _classCallCheck3.default)(this, MyDocument);

    return (0, _possibleConstructorReturn3.default)(this, (MyDocument.__proto__ || (0, _getPrototypeOf2.default)(MyDocument)).apply(this, arguments));
  }

  (0, _createClass3.default)(MyDocument, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("html", { style: { background: "#EEE", color: "#444" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      }, _react2.default.createElement(_document.Head, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }, _react2.default.createElement("meta", {
        name: "viewport",
        content: "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      }), _react2.default.createElement("meta", { name: "theme-color", content: "#673ab7", __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }), _react2.default.createElement("link", { rel: "manifest", href: "static/manifest.json", __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }), _react2.default.createElement("link", { rel: "icon", href: "static/img/favicon.ico", __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }), _react2.default.createElement("title", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, "next-stack")), _react2.default.createElement("body", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, _react2.default.createElement(_document.Main, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }), _react2.default.createElement(_document.NextScript, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      })));
    }
  }]);

  return MyDocument;
}(_document2.default);

exports.default = MyDocument;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9wYWdlcy9fZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJEb2N1bWVudCIsIkhlYWQiLCJNYWluIiwiTmV4dFNjcmlwdCIsIk15RG9jdW1lbnQiLCJiYWNrZ3JvdW5kIiwiY29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU8sQUFBWSxBQUFNLEFBQU07Ozs7QUFDL0IsQUFBTzs7Ozs7OztJLEFBQ2M7Ozs7Ozs7Ozs7OzZCQUNWLEFBQ1A7NkJBQ0UsY0FBQSxVQUFNLE9BQU8sRUFBRSxZQUFGLEFBQWMsUUFBUSxPQUFuQyxBQUFhLEFBQTZCO29CQUExQztzQkFBQSxBQUNFO0FBREY7T0FBQSxrQkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUNFO0FBREY7QUFBQTtjQUNFLEFBQ08sQUFDTDtpQkFGRixBQUVVOztvQkFGVjtzQkFERixBQUNFLEFBSUE7QUFKQTtBQUNFLGtEQUdJLE1BQU4sQUFBVyxlQUFjLFNBQXpCLEFBQWlDO29CQUFqQztzQkFMRixBQUtFLEFBQ0E7QUFEQTtrREFDTSxLQUFOLEFBQVUsWUFBVyxNQUFyQixBQUEwQjtvQkFBMUI7c0JBTkYsQUFNRSxBQUNBO0FBREE7a0RBQ00sS0FBTixBQUFVLFFBQU8sTUFBakIsQUFBc0I7b0JBQXRCO3NCQVBGLEFBT0UsQUFFQTtBQUZBOzBCQUVBLGNBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQVZKLEFBQ0UsQUFTRSxBQUVGLGdDQUFBLGNBQUE7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUM7O29CQUFEO3NCQURGLEFBQ0UsQUFDQTtBQURBO0FBQUEsMEJBQ0EsQUFBQzs7b0JBQUQ7c0JBZk4sQUFDRSxBQVlFLEFBRUUsQUFJUDtBQUpPO0FBQUE7Ozs7O0FBakI4QixBOztrQkFBbkIsQSIsImZpbGUiOiJfZG9jdW1lbnQuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL2hvbWUvdHVzaGl0YS9tZXJjdXJpb2Rldi9uZXh0LXJlZHV4In0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/home/tushita/mercuriodev/next-redux/client/pages/_document.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/tushita/mercuriodev/next-redux/client/pages/_document.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(84)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/_document")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextScript = exports.Main = exports.Head = undefined;

var _extends2 = __webpack_require__(105);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(32);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(33);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(58);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _htmlescape = __webpack_require__(373);

var _htmlescape2 = _interopRequireDefault(_htmlescape);

var _server = __webpack_require__(374);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Document = function (_Component) {
  (0, _inherits3.default)(Document, _Component);

  function Document() {
    (0, _classCallCheck3.default)(this, Document);
    return (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).apply(this, arguments));
  }

  (0, _createClass3.default)(Document, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { _documentProps: this.props };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'html',
        null,
        _react2.default.createElement(Head, null),
        _react2.default.createElement(
          'body',
          null,
          _react2.default.createElement(Main, null),
          _react2.default.createElement(NextScript, null)
        )
      );
    }
  }], [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref) {
      var renderPage = _ref.renderPage;

      var _renderPage = renderPage(),
          html = _renderPage.html,
          head = _renderPage.head,
          errorHtml = _renderPage.errorHtml,
          chunks = _renderPage.chunks;

      var styles = (0, _server2.default)();
      return { html: html, head: head, errorHtml: errorHtml, chunks: chunks, styles: styles };
    }
  }]);
  return Document;
}(_react.Component);

Document.childContextTypes = {
  _documentProps: _propTypes2.default.any
};
exports.default = Document;

var Head = exports.Head = function (_Component2) {
  (0, _inherits3.default)(Head, _Component2);

  function Head() {
    (0, _classCallCheck3.default)(this, Head);
    return (0, _possibleConstructorReturn3.default)(this, (Head.__proto__ || (0, _getPrototypeOf2.default)(Head)).apply(this, arguments));
  }

  (0, _createClass3.default)(Head, [{
    key: 'getChunkPreloadLink',
    value: function getChunkPreloadLink(filename) {
      var __NEXT_DATA__ = this.context._documentProps.__NEXT_DATA__;
      var buildStats = __NEXT_DATA__.buildStats,
          assetPrefix = __NEXT_DATA__.assetPrefix,
          buildId = __NEXT_DATA__.buildId;

      var hash = buildStats ? buildStats[filename].hash : buildId;

      return _react2.default.createElement('link', {
        key: filename,
        rel: 'preload',
        href: assetPrefix + '/_next/' + hash + '/' + filename,
        as: 'script'
      });
    }
  }, {
    key: 'getPreloadMainLinks',
    value: function getPreloadMainLinks() {
      var dev = this.context._documentProps.dev;

      if (dev) {
        return [this.getChunkPreloadLink('manifest.js'), this.getChunkPreloadLink('commons.js'), this.getChunkPreloadLink('main.js')];
      }

      // In the production mode, we have a single asset with all the JS content.
      return [this.getChunkPreloadLink('app.js')];
    }
  }, {
    key: 'getPreloadDynamicChunks',
    value: function getPreloadDynamicChunks() {
      var _context$_documentPro = this.context._documentProps,
          chunks = _context$_documentPro.chunks,
          __NEXT_DATA__ = _context$_documentPro.__NEXT_DATA__;
      var assetPrefix = __NEXT_DATA__.assetPrefix,
          buildId = __NEXT_DATA__.buildId;

      return chunks.map(function (chunk) {
        return _react2.default.createElement('link', {
          key: chunk,
          rel: 'preload',
          href: assetPrefix + '/_next/' + buildId + '/webpack/chunks/' + chunk,
          as: 'script'
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$_documentPro2 = this.context._documentProps,
          head = _context$_documentPro2.head,
          styles = _context$_documentPro2.styles,
          __NEXT_DATA__ = _context$_documentPro2.__NEXT_DATA__;
      var pathname = __NEXT_DATA__.pathname,
          buildId = __NEXT_DATA__.buildId,
          assetPrefix = __NEXT_DATA__.assetPrefix;

      var pagePathname = getPagePathname(pathname);

      return _react2.default.createElement(
        'head',
        this.props,
        (head || []).map(function (h, i) {
          return _react2.default.cloneElement(h, { key: i });
        }),
        _react2.default.createElement('link', { rel: 'preload', href: assetPrefix + '/_next/' + buildId + '/page' + pagePathname, as: 'script' }),
        _react2.default.createElement('link', { rel: 'preload', href: assetPrefix + '/_next/' + buildId + '/page/_error.js', as: 'script' }),
        this.getPreloadDynamicChunks(),
        this.getPreloadMainLinks(),
        styles || null,
        this.props.children
      );
    }
  }]);
  return Head;
}(_react.Component);

Head.contextTypes = {
  _documentProps: _propTypes2.default.any
};

var Main = exports.Main = function (_Component3) {
  (0, _inherits3.default)(Main, _Component3);

  function Main() {
    (0, _classCallCheck3.default)(this, Main);
    return (0, _possibleConstructorReturn3.default)(this, (Main.__proto__ || (0, _getPrototypeOf2.default)(Main)).apply(this, arguments));
  }

  (0, _createClass3.default)(Main, [{
    key: 'render',
    value: function render() {
      var _context$_documentPro3 = this.context._documentProps,
          html = _context$_documentPro3.html,
          errorHtml = _context$_documentPro3.errorHtml;
      var className = this.props.className;

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement('div', { id: '__next', dangerouslySetInnerHTML: { __html: html } }),
        _react2.default.createElement('div', { id: '__next-error', dangerouslySetInnerHTML: { __html: errorHtml } })
      );
    }
  }]);
  return Main;
}(_react.Component);

Main.propTypes = {
  className: _propTypes2.default.string
};
Main.contextTypes = {
  _documentProps: _propTypes2.default.any
};

var NextScript = exports.NextScript = function (_Component4) {
  (0, _inherits3.default)(NextScript, _Component4);

  function NextScript() {
    (0, _classCallCheck3.default)(this, NextScript);
    return (0, _possibleConstructorReturn3.default)(this, (NextScript.__proto__ || (0, _getPrototypeOf2.default)(NextScript)).apply(this, arguments));
  }

  (0, _createClass3.default)(NextScript, [{
    key: 'getChunkScript',
    value: function getChunkScript(filename) {
      var additionalProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var __NEXT_DATA__ = this.context._documentProps.__NEXT_DATA__;
      var buildStats = __NEXT_DATA__.buildStats,
          assetPrefix = __NEXT_DATA__.assetPrefix,
          buildId = __NEXT_DATA__.buildId;

      var hash = buildStats ? buildStats[filename].hash : buildId;

      return _react2.default.createElement('script', (0, _extends3.default)({
        key: filename,
        type: 'text/javascript',
        src: assetPrefix + '/_next/' + hash + '/' + filename
      }, additionalProps));
    }
  }, {
    key: 'getScripts',
    value: function getScripts() {
      var dev = this.context._documentProps.dev;

      if (dev) {
        return [this.getChunkScript('manifest.js'), this.getChunkScript('commons.js'), this.getChunkScript('main.js')];
      }

      // In the production mode, we have a single asset with all the JS content.
      // So, we can load the script with async
      return [this.getChunkScript('app.js', { async: true })];
    }
  }, {
    key: 'getDynamicChunks',
    value: function getDynamicChunks() {
      var _context$_documentPro4 = this.context._documentProps,
          chunks = _context$_documentPro4.chunks,
          __NEXT_DATA__ = _context$_documentPro4.__NEXT_DATA__;
      var assetPrefix = __NEXT_DATA__.assetPrefix,
          buildId = __NEXT_DATA__.buildId;

      return _react2.default.createElement(
        'div',
        null,
        chunks.map(function (chunk) {
          return _react2.default.createElement('script', {
            async: true,
            key: chunk,
            type: 'text/javascript',
            src: assetPrefix + '/_next/' + buildId + '/webpack/chunks/' + chunk
          });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$_documentPro5 = this.context._documentProps,
          staticMarkup = _context$_documentPro5.staticMarkup,
          __NEXT_DATA__ = _context$_documentPro5.__NEXT_DATA__,
          chunks = _context$_documentPro5.chunks;
      var pathname = __NEXT_DATA__.pathname,
          buildId = __NEXT_DATA__.buildId,
          assetPrefix = __NEXT_DATA__.assetPrefix;

      var pagePathname = getPagePathname(pathname);

      __NEXT_DATA__.chunks = chunks;

      return _react2.default.createElement(
        'div',
        null,
        staticMarkup ? null : _react2.default.createElement('script', { nonce: this.props.nonce, dangerouslySetInnerHTML: {
            __html: '\n          __NEXT_DATA__ = ' + (0, _htmlescape2.default)(__NEXT_DATA__) + '\n          module={}\n          __NEXT_LOADED_PAGES__ = []\n          __NEXT_LOADED_CHUNKS__ = []\n\n          __NEXT_REGISTER_PAGE = function (route, fn) {\n            __NEXT_LOADED_PAGES__.push({ route: route, fn: fn })\n          }\n\n          __NEXT_REGISTER_CHUNK = function (chunkName, fn) {\n            __NEXT_LOADED_CHUNKS__.push({ chunkName: chunkName, fn: fn })\n          }\n        '
          } }),
        _react2.default.createElement('script', { async: true, id: '__NEXT_PAGE__' + pathname, type: 'text/javascript', src: assetPrefix + '/_next/' + buildId + '/page' + pagePathname }),
        _react2.default.createElement('script', { async: true, id: '__NEXT_PAGE__/_error', type: 'text/javascript', src: assetPrefix + '/_next/' + buildId + '/page/_error.js' }),
        staticMarkup ? null : this.getDynamicChunks(),
        staticMarkup ? null : this.getScripts()
      );
    }
  }]);
  return NextScript;
}(_react.Component);

NextScript.propTypes = {
  nonce: _propTypes2.default.string
};
NextScript.contextTypes = {
  _documentProps: _propTypes2.default.any
};


function getPagePathname(pathname) {
  if (pathname === '/') {
    return '/index.js';
  }

  return pathname + '.js';
}

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Properly escape JSON for usage as an object literal inside of a `<script>` tag.
 * JS implementation of http://golang.org/pkg/encoding/json/#HTMLEscape
 * More info: http://timelessrepo.com/json-isnt-a-javascript-subset
 */



var ESCAPE_LOOKUP = {
  '&': '\\u0026',
  '>': '\\u003e',
  '<': '\\u003c',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029'
};

var ESCAPE_REGEX = /[&><\u2028\u2029]/g;

function escaper(match) {
  return ESCAPE_LOOKUP[match];
}

module.exports = function(obj) {
  return JSON.stringify(obj).replace(ESCAPE_REGEX, escaper);
};

/***/

var TERMINATORS_LOOKUP = {
  '\u2028': '\\u2028',
  '\u2029': '\\u2029'
};

var TERMINATORS_REGEX = /[\u2028\u2029]/g;

function sanitizer(match) {
  return TERMINATORS_LOOKUP[match];
}

module.exports.sanitize = function(str) {
  return str.replace(TERMINATORS_REGEX, sanitizer);
};


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(375)


/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(102);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(83);

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = flushToReact;
exports.flushToHTML = flushToHTML;

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _style = __webpack_require__(376);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function flushToReact() {
  var mem = (0, _style.flush)();
  var arr = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(mem), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
          id = _step$value[0],
          css = _step$value[1];

      arr.push(_react2.default.createElement('style', {
        id: '__' + id,
        // Avoid warnings upon render with a key
        key: '__' + id,
        dangerouslySetInnerHTML: {
          __html: css
        }
      }));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return arr;
}

function flushToHTML() {
  var mem = (0, _style.flush)();
  var html = '';
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(mem), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
          id = _step2$value[0],
          css = _step2$value[1];

      html += '<style id="__' + id + '">' + css + '</style>';
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return html;
}

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(377);

var _map2 = _interopRequireDefault(_map);

var _slicedToArray2 = __webpack_require__(102);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = __webpack_require__(32);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(33);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.flush = flush;

var _react = __webpack_require__(17);

var _stylesheetRegistry = __webpack_require__(383);

var _stylesheetRegistry2 = _interopRequireDefault(_stylesheetRegistry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleSheetRegistry = new _stylesheetRegistry2.default();

var JSXStyle = function (_Component) {
  (0, _inherits3.default)(JSXStyle, _Component);

  function JSXStyle() {
    (0, _classCallCheck3.default)(this, JSXStyle);
    return (0, _possibleConstructorReturn3.default)(this, (JSXStyle.__proto__ || (0, _getPrototypeOf2.default)(JSXStyle)).apply(this, arguments));
  }

  (0, _createClass3.default)(JSXStyle, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      styleSheetRegistry.add(this.props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.css !== nextProps.css;
    }

    // To avoid FOUC, we process new changes
    // on `componentWillUpdate` rather than `componentDidUpdate`.

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      styleSheetRegistry.update(this.props, nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      styleSheetRegistry.remove(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'dynamic',
    value: function dynamic(info) {
      return info.map(function (tagInfo) {
        var _tagInfo = (0, _slicedToArray3.default)(tagInfo, 2),
            baseId = _tagInfo[0],
            props = _tagInfo[1];

        return styleSheetRegistry.computeId(baseId, props);
      }).join(' ');
    }
  }]);
  return JSXStyle;
}(_react.Component);

exports.default = JSXStyle;
function flush() {
  var cssRules = styleSheetRegistry.cssRules();
  styleSheetRegistry.flush();
  return new _map2.default(cssRules);
}

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(378), __esModule: true };

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(18);
__webpack_require__(28);
__webpack_require__(379);
__webpack_require__(380);
__webpack_require__(381);
__webpack_require__(382);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(134);
var validate = __webpack_require__(71);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(135)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(139)('Map') });


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(141)('Map');


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(142)('Map');


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(159);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _stringHash = __webpack_require__(384);

var _stringHash2 = _interopRequireDefault(_stringHash);

var _stylesheet = __webpack_require__(385);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyleSheetRegistry = function () {
  function StyleSheetRegistry() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$styleSheet = _ref.styleSheet,
        styleSheet = _ref$styleSheet === undefined ? null : _ref$styleSheet,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed = _ref$optimizeForSpeed === undefined ? false : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser = _ref$isBrowser === undefined ? typeof window !== 'undefined' : _ref$isBrowser;

    (0, _classCallCheck3.default)(this, StyleSheetRegistry);

    this._sheet = styleSheet || new _stylesheet2.default({
      name: 'styled-jsx',
      optimizeForSpeed: optimizeForSpeed
    });
    this._sheet.inject();
    this._isBrowser = isBrowser;

    this._fromServer = undefined;
    this._indices = {};
    this._instancesCounts = {};

    this.computeId = this.createComputeId();
    this.computeSelector = this.createComputeSelector();
  }

  (0, _createClass3.default)(StyleSheetRegistry, [{
    key: 'add',
    value: function add(props) {
      var _this = this;

      if (undefined === this._optimizeForSpeed) {
        this._optimizeForSpeed = Array.isArray(props.css);
        this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
        this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
      }

      if (this._isBrowser && !this._fromServer) {
        this._fromServer = this.selectFromServer();
        this._instancesCounts = (0, _keys2.default)(this._fromServer).reduce(function (acc, tagName) {
          acc[tagName] = 0;
          return acc;
        }, {});
      }

      var _getIdAndRules = this.getIdAndRules(props),
          styleId = _getIdAndRules.styleId,
          rules = _getIdAndRules.rules;

      // Deduping: just increase the instances count.


      if (styleId in this._instancesCounts) {
        this._instancesCounts[styleId] += 1;
        return;
      }

      var indices = rules.map(function (rule) {
        return _this._sheet.insertRule(rule);
      })
      // Filter out invalid rules
      .filter(function (index) {
        return index !== -1;
      });

      if (indices.length > 0) {
        this._indices[styleId] = indices;
        this._instancesCounts[styleId] = 1;
      }
    }
  }, {
    key: 'remove',
    value: function remove(props) {
      var _this2 = this;

      var _getIdAndRules2 = this.getIdAndRules(props),
          styleId = _getIdAndRules2.styleId;

      invariant(styleId in this._instancesCounts, 'styleId: `' + styleId + '` not found');
      this._instancesCounts[styleId] -= 1;

      if (this._instancesCounts[styleId] < 1) {
        var tagFromServer = this._fromServer && this._fromServer[styleId];
        if (tagFromServer) {
          tagFromServer.parentNode.removeChild(tagFromServer);
          delete this._fromServer[styleId];
        } else {
          this._indices[styleId].forEach(function (index) {
            return _this2._sheet.deleteRule(index);
          });
          delete this._indices[styleId];
        }
        delete this._instancesCounts[styleId];
      }
    }
  }, {
    key: 'update',
    value: function update(props, nextProps) {
      this.add(nextProps);
      this.remove(props);
    }
  }, {
    key: 'flush',
    value: function flush() {
      this._sheet.flush();
      this._sheet.inject();
      this._fromServer = undefined;
      this._indices = {};
      this._instancesCounts = {};

      this.computeId = this.createComputeId();
      this.computeSelector = this.createComputeSelector();
    }
  }, {
    key: 'cssRules',
    value: function cssRules() {
      var _this3 = this;

      var fromServer = this._fromServer ? (0, _keys2.default)(this._fromServer).map(function (styleId) {
        return [styleId, _this3._fromServer[styleId]];
      }) : [];
      var cssRules = this._sheet.cssRules();

      return fromServer.concat((0, _keys2.default)(this._indices).map(function (styleId) {
        return [styleId, _this3._indices[styleId].map(function (index) {
          return cssRules[index].cssText;
        }).join('\n')];
      }));
    }

    /**
     * createComputeId
     *
     * Creates a function to compute and memoize a jsx id from a basedId and optionally props.
     */

  }, {
    key: 'createComputeId',
    value: function createComputeId() {
      var cache = {};
      return function (baseId, props) {
        if (!props) {
          return 'jsx-' + baseId;
        }
        var propsToString = String(props);
        var key = baseId + propsToString;
        // return `jsx-${hashString(`${baseId}-${propsToString}`)}`
        if (!cache[key]) {
          cache[key] = 'jsx-' + (0, _stringHash2.default)(baseId + '-' + propsToString);
        }
        return cache[key];
      };
    }

    /**
     * createComputeSelector
     *
     * Creates a function to compute and memoize dynamic selectors.
     */

  }, {
    key: 'createComputeSelector',
    value: function createComputeSelector() {
      var selectoPlaceholderRegexp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /__jsx-style-dynamic-selector/g;

      var cache = {};
      return function (id, css) {
        var idcss = id + css;
        if (!cache[idcss]) {
          cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
        }
        return cache[idcss];
      };
    }
  }, {
    key: 'getIdAndRules',
    value: function getIdAndRules(props) {
      var _this4 = this;

      if (props.dynamic) {
        var styleId = this.computeId(props.styleId, props.dynamic);
        return {
          styleId: styleId,
          rules: Array.isArray(props.css) ? props.css.map(function (rule) {
            return _this4.computeSelector(styleId, rule);
          }) : [this.computeSelector(styleId, props.css)]
        };
      }

      return {
        styleId: this.computeId(props.styleId),
        rules: Array.isArray(props.css) ? props.css : [props.css]
      };
    }

    /**
     * selectFromServer
     *
     * Collects style tags from the document with id __jsx-XXX
     */

  }, {
    key: 'selectFromServer',
    value: function selectFromServer() {
      var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));

      return elements.reduce(function (acc, element) {
        var id = element.id.slice(2);
        acc[id] = element;
        return acc;
      }, {});
    }
  }]);
  return StyleSheetRegistry;
}();

exports.default = StyleSheetRegistry;


function invariant(condition, message) {
  if (!condition) {
    throw new Error('StyleSheetRegistry: ' + message + '.');
  }
}

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function hash(str) {
  var hash = 5381,
      i    = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

module.exports = hash;


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/

var isProd = process.env && "development" === 'production';
var isString = function isString(o) {
  return Object.prototype.toString.call(o) === '[object String]';
};

var StyleSheet = function () {
  function StyleSheet() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$name = _ref.name,
        name = _ref$name === undefined ? 'stylesheet' : _ref$name,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed = _ref$optimizeForSpeed === undefined ? isProd : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser = _ref$isBrowser === undefined ? typeof window !== 'undefined' : _ref$isBrowser;

    (0, _classCallCheck3.default)(this, StyleSheet);

    invariant(isString(name), '`name` must be a string');
    this._name = name;
    this._deletedRulePlaceholder = '#' + name + '-deleted-rule____{}';

    invariant(typeof optimizeForSpeed === 'boolean', '`optimizeForSpeed` must be a boolean');
    this._optimizeForSpeed = optimizeForSpeed;
    this._isBrowser = isBrowser;

    this._serverSheet = undefined;
    this._tags = [];
    this._injected = false;
    this._rulesCount = 0;
  }

  (0, _createClass3.default)(StyleSheet, [{
    key: 'setOptimizeForSpeed',
    value: function setOptimizeForSpeed(bool) {
      invariant(typeof bool === 'boolean', '`setOptimizeForSpeed` accepts a boolean');

      invariant(this._rulesCount === 0, 'optimizeForSpeed cannot be when rules have already been inserted');
      this.flush();
      this._optimizeForSpeed = bool;
      this.inject();
    }
  }, {
    key: 'isOptimizeForSpeed',
    value: function isOptimizeForSpeed() {
      return this._optimizeForSpeed;
    }
  }, {
    key: 'inject',
    value: function inject() {
      var _this = this;

      invariant(!this._injected, 'sheet already injected');
      this._injected = true;
      if (this._isBrowser && this._optimizeForSpeed) {
        this._tags[0] = this.makeStyleTag(this._name);
        this._optimizeForSpeed = 'insertRule' in this.getSheet();
        if (!this._optimizeForSpeed) {
          if (!isProd) {
            console.warn('StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.'); // eslint-disable-line no-console
          }
          this.flush();
          this._injected = true;
        }
        return;
      }

      this._serverSheet = {
        cssRules: [],
        insertRule: function insertRule(rule, index) {
          if (typeof index === 'number') {
            _this._serverSheet.cssRules[index] = { cssText: rule };
          } else {
            _this._serverSheet.cssRules.push({ cssText: rule });
          }
          return index;
        },
        deleteRule: function deleteRule(index) {
          _this._serverSheet.cssRules[index] = null;
        }
      };
    }
  }, {
    key: 'getSheetForTag',
    value: function getSheetForTag(tag) {
      if (tag.sheet) {
        return tag.sheet;
      }

      // this weirdness brought to you by firefox
      for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].ownerNode === tag) {
          return document.styleSheets[i];
        }
      }
    }
  }, {
    key: 'getSheet',
    value: function getSheet() {
      return this.getSheetForTag(this._tags[this._tags.length - 1]);
    }
  }, {
    key: 'insertRule',
    value: function insertRule(rule, index) {
      invariant(isString(rule), '`insertRule` accepts only strings');

      if (!this._isBrowser) {
        if (typeof index !== 'number') {
          index = this._serverSheet.cssRules.length;
        }
        this._serverSheet.insertRule(rule, index);
        return this._rulesCount++;
      }

      if (this._optimizeForSpeed) {
        var sheet = this.getSheet();
        if (typeof index !== 'number') {
          index = sheet.cssRules.length;
        }
        // this weirdness for perf, and chrome's weird bug
        // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
        try {
          sheet.insertRule(rule, index);
        } catch (err) {
          if (!isProd) {
            console.warn('StyleSheet: illegal rule: \n\n' + rule + '\n\nSee https://stackoverflow.com/q/20007992 for more info'); // eslint-disable-line no-console
          }
          return -1;
        }
      } else {
        var insertionPoint = this._tags[index];
        this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
      }

      return this._rulesCount++;
    }
  }, {
    key: 'replaceRule',
    value: function replaceRule(index, rule) {
      if (this._optimizeForSpeed || !this._isBrowser) {
        var sheet = this._isBrowser ? this.getSheet() : this._serverSheet;
        if (!rule.trim()) {
          rule = this._deletedRulePlaceholder;
        }

        if (!sheet.cssRules[index]) {
          // @TBD Should we throw an error?
          return index;
        }

        sheet.deleteRule(index);

        try {
          sheet.insertRule(rule, index);
        } catch (err) {
          if (!isProd) {
            console.warn('StyleSheet: illegal rule: \n\n' + rule + '\n\nSee https://stackoverflow.com/q/20007992 for more info'); // eslint-disable-line no-console
          }
          // In order to preserve the indices we insert a deleteRulePlaceholder
          sheet.insertRule(this._deletedRulePlaceholder, index);
        }
      } else {
        var tag = this._tags[index];
        invariant(tag, 'old rule at index `' + index + '` not found');
        tag.textContent = rule;
      }
      return index;
    }
  }, {
    key: 'deleteRule',
    value: function deleteRule(index) {
      if (!this._isBrowser) {
        this._serverSheet.deleteRule(index);
        return;
      }

      if (this._optimizeForSpeed) {
        this.replaceRule(index, '');
      } else {
        var tag = this._tags[index];
        invariant(tag, 'rule at index `' + index + '` not found');
        tag.parentNode.removeChild(tag);
        this._tags[index] = null;
      }
    }
  }, {
    key: 'flush',
    value: function flush() {
      this._injected = false;
      this._rulesCount = 0;
      if (this._isBrowser) {
        this._tags.forEach(function (tag) {
          return tag && tag.parentNode.removeChild(tag);
        });
        this._tags = [];
      } else {
        // simpler on server
        this._serverSheet.cssRules = [];
      }
    }
  }, {
    key: 'cssRules',
    value: function cssRules() {
      var _this2 = this;

      if (!this._isBrowser) {
        return this._serverSheet.cssRules;
      }
      return this._tags.reduce(function (rules, tag) {
        if (tag) {
          rules = rules.concat(_this2.getSheetForTag(tag).cssRules.map(function (rule) {
            return rule.cssText === _this2._deletedRulePlaceholder ? null : rule;
          }));
        } else {
          rules.push(null);
        }
        return rules;
      }, []);
    }
  }, {
    key: 'makeStyleTag',
    value: function makeStyleTag(name, cssString, relativeToTag) {
      if (cssString) {
        invariant(isString(cssString), 'makeStyleTag acceps only strings as second parameter');
      }
      var tag = document.createElement('style');
      tag.type = 'text/css';
      tag.setAttribute('data-' + name, '');
      if (cssString) {
        tag.appendChild(document.createTextNode(cssString));
      }
      var head = document.head || document.getElementsByTagName('head')[0];
      if (relativeToTag) {
        head.insertBefore(tag, relativeToTag);
      } else {
        head.appendChild(tag);
      }
      return tag;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._rulesCount;
    }
  }]);
  return StyleSheet;
}();

exports.default = StyleSheet;


function invariant(condition, message) {
  if (!condition) {
    throw new Error('StyleSheet: ' + message + '.');
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(129)))

/***/ }),
/* 386 */
/***/ (function(module, exports) {

module.exports = "/*!\n * Materialize v1.0.0-beta (http://materializecss.com)\n * Copyright 2014-2017 Materialize\n * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)\n */\n.materialize-red {\n  background-color: #e51c23 !important;\n}\n.materialize-red-text {\n  color: #e51c23 !important;\n}\n.materialize-red.lighten-5 {\n  background-color: #fdeaeb !important;\n}\n.materialize-red-text.text-lighten-5 {\n  color: #fdeaeb !important;\n}\n.materialize-red.lighten-4 {\n  background-color: #f8c1c3 !important;\n}\n.materialize-red-text.text-lighten-4 {\n  color: #f8c1c3 !important;\n}\n.materialize-red.lighten-3 {\n  background-color: #f3989b !important;\n}\n.materialize-red-text.text-lighten-3 {\n  color: #f3989b !important;\n}\n.materialize-red.lighten-2 {\n  background-color: #ee6e73 !important;\n}\n.materialize-red-text.text-lighten-2 {\n  color: #ee6e73 !important;\n}\n.materialize-red.lighten-1 {\n  background-color: #ea454b !important;\n}\n.materialize-red-text.text-lighten-1 {\n  color: #ea454b !important;\n}\n.materialize-red.darken-1 {\n  background-color: #d0181e !important;\n}\n.materialize-red-text.text-darken-1 {\n  color: #d0181e !important;\n}\n.materialize-red.darken-2 {\n  background-color: #b9151b !important;\n}\n.materialize-red-text.text-darken-2 {\n  color: #b9151b !important;\n}\n.materialize-red.darken-3 {\n  background-color: #a21318 !important;\n}\n.materialize-red-text.text-darken-3 {\n  color: #a21318 !important;\n}\n.materialize-red.darken-4 {\n  background-color: #8b1014 !important;\n}\n.materialize-red-text.text-darken-4 {\n  color: #8b1014 !important;\n}\n.red {\n  background-color: #F44336 !important;\n}\n.red-text {\n  color: #F44336 !important;\n}\n.red.lighten-5 {\n  background-color: #FFEBEE !important;\n}\n.red-text.text-lighten-5 {\n  color: #FFEBEE !important;\n}\n.red.lighten-4 {\n  background-color: #FFCDD2 !important;\n}\n.red-text.text-lighten-4 {\n  color: #FFCDD2 !important;\n}\n.red.lighten-3 {\n  background-color: #EF9A9A !important;\n}\n.red-text.text-lighten-3 {\n  color: #EF9A9A !important;\n}\n.red.lighten-2 {\n  background-color: #E57373 !important;\n}\n.red-text.text-lighten-2 {\n  color: #E57373 !important;\n}\n.red.lighten-1 {\n  background-color: #EF5350 !important;\n}\n.red-text.text-lighten-1 {\n  color: #EF5350 !important;\n}\n.red.darken-1 {\n  background-color: #E53935 !important;\n}\n.red-text.text-darken-1 {\n  color: #E53935 !important;\n}\n.red.darken-2 {\n  background-color: #D32F2F !important;\n}\n.red-text.text-darken-2 {\n  color: #D32F2F !important;\n}\n.red.darken-3 {\n  background-color: #C62828 !important;\n}\n.red-text.text-darken-3 {\n  color: #C62828 !important;\n}\n.red.darken-4 {\n  background-color: #B71C1C !important;\n}\n.red-text.text-darken-4 {\n  color: #B71C1C !important;\n}\n.red.accent-1 {\n  background-color: #FF8A80 !important;\n}\n.red-text.text-accent-1 {\n  color: #FF8A80 !important;\n}\n.red.accent-2 {\n  background-color: #FF5252 !important;\n}\n.red-text.text-accent-2 {\n  color: #FF5252 !important;\n}\n.red.accent-3 {\n  background-color: #FF1744 !important;\n}\n.red-text.text-accent-3 {\n  color: #FF1744 !important;\n}\n.red.accent-4 {\n  background-color: #D50000 !important;\n}\n.red-text.text-accent-4 {\n  color: #D50000 !important;\n}\n.pink {\n  background-color: #e91e63 !important;\n}\n.pink-text {\n  color: #e91e63 !important;\n}\n.pink.lighten-5 {\n  background-color: #fce4ec !important;\n}\n.pink-text.text-lighten-5 {\n  color: #fce4ec !important;\n}\n.pink.lighten-4 {\n  background-color: #f8bbd0 !important;\n}\n.pink-text.text-lighten-4 {\n  color: #f8bbd0 !important;\n}\n.pink.lighten-3 {\n  background-color: #f48fb1 !important;\n}\n.pink-text.text-lighten-3 {\n  color: #f48fb1 !important;\n}\n.pink.lighten-2 {\n  background-color: #f06292 !important;\n}\n.pink-text.text-lighten-2 {\n  color: #f06292 !important;\n}\n.pink.lighten-1 {\n  background-color: #ec407a !important;\n}\n.pink-text.text-lighten-1 {\n  color: #ec407a !important;\n}\n.pink.darken-1 {\n  background-color: #d81b60 !important;\n}\n.pink-text.text-darken-1 {\n  color: #d81b60 !important;\n}\n.pink.darken-2 {\n  background-color: #c2185b !important;\n}\n.pink-text.text-darken-2 {\n  color: #c2185b !important;\n}\n.pink.darken-3 {\n  background-color: #ad1457 !important;\n}\n.pink-text.text-darken-3 {\n  color: #ad1457 !important;\n}\n.pink.darken-4 {\n  background-color: #880e4f !important;\n}\n.pink-text.text-darken-4 {\n  color: #880e4f !important;\n}\n.pink.accent-1 {\n  background-color: #ff80ab !important;\n}\n.pink-text.text-accent-1 {\n  color: #ff80ab !important;\n}\n.pink.accent-2 {\n  background-color: #ff4081 !important;\n}\n.pink-text.text-accent-2 {\n  color: #ff4081 !important;\n}\n.pink.accent-3 {\n  background-color: #f50057 !important;\n}\n.pink-text.text-accent-3 {\n  color: #f50057 !important;\n}\n.pink.accent-4 {\n  background-color: #c51162 !important;\n}\n.pink-text.text-accent-4 {\n  color: #c51162 !important;\n}\n.purple {\n  background-color: #9c27b0 !important;\n}\n.purple-text {\n  color: #9c27b0 !important;\n}\n.purple.lighten-5 {\n  background-color: #f3e5f5 !important;\n}\n.purple-text.text-lighten-5 {\n  color: #f3e5f5 !important;\n}\n.purple.lighten-4 {\n  background-color: #e1bee7 !important;\n}\n.purple-text.text-lighten-4 {\n  color: #e1bee7 !important;\n}\n.purple.lighten-3 {\n  background-color: #ce93d8 !important;\n}\n.purple-text.text-lighten-3 {\n  color: #ce93d8 !important;\n}\n.purple.lighten-2 {\n  background-color: #ba68c8 !important;\n}\n.purple-text.text-lighten-2 {\n  color: #ba68c8 !important;\n}\n.purple.lighten-1 {\n  background-color: #ab47bc !important;\n}\n.purple-text.text-lighten-1 {\n  color: #ab47bc !important;\n}\n.purple.darken-1 {\n  background-color: #8e24aa !important;\n}\n.purple-text.text-darken-1 {\n  color: #8e24aa !important;\n}\n.purple.darken-2 {\n  background-color: #7b1fa2 !important;\n}\n.purple-text.text-darken-2 {\n  color: #7b1fa2 !important;\n}\n.purple.darken-3 {\n  background-color: #6a1b9a !important;\n}\n.purple-text.text-darken-3 {\n  color: #6a1b9a !important;\n}\n.purple.darken-4 {\n  background-color: #4a148c !important;\n}\n.purple-text.text-darken-4 {\n  color: #4a148c !important;\n}\n.purple.accent-1 {\n  background-color: #ea80fc !important;\n}\n.purple-text.text-accent-1 {\n  color: #ea80fc !important;\n}\n.purple.accent-2 {\n  background-color: #e040fb !important;\n}\n.purple-text.text-accent-2 {\n  color: #e040fb !important;\n}\n.purple.accent-3 {\n  background-color: #d500f9 !important;\n}\n.purple-text.text-accent-3 {\n  color: #d500f9 !important;\n}\n.purple.accent-4 {\n  background-color: #aa00ff !important;\n}\n.purple-text.text-accent-4 {\n  color: #aa00ff !important;\n}\n.deep-purple {\n  background-color: #673ab7 !important;\n}\n.deep-purple-text {\n  color: #673ab7 !important;\n}\n.deep-purple.lighten-5 {\n  background-color: #ede7f6 !important;\n}\n.deep-purple-text.text-lighten-5 {\n  color: #ede7f6 !important;\n}\n.deep-purple.lighten-4 {\n  background-color: #d1c4e9 !important;\n}\n.deep-purple-text.text-lighten-4 {\n  color: #d1c4e9 !important;\n}\n.deep-purple.lighten-3 {\n  background-color: #b39ddb !important;\n}\n.deep-purple-text.text-lighten-3 {\n  color: #b39ddb !important;\n}\n.deep-purple.lighten-2 {\n  background-color: #9575cd !important;\n}\n.deep-purple-text.text-lighten-2 {\n  color: #9575cd !important;\n}\n.deep-purple.lighten-1 {\n  background-color: #7e57c2 !important;\n}\n.deep-purple-text.text-lighten-1 {\n  color: #7e57c2 !important;\n}\n.deep-purple.darken-1 {\n  background-color: #5e35b1 !important;\n}\n.deep-purple-text.text-darken-1 {\n  color: #5e35b1 !important;\n}\n.deep-purple.darken-2 {\n  background-color: #512da8 !important;\n}\n.deep-purple-text.text-darken-2 {\n  color: #512da8 !important;\n}\n.deep-purple.darken-3 {\n  background-color: #4527a0 !important;\n}\n.deep-purple-text.text-darken-3 {\n  color: #4527a0 !important;\n}\n.deep-purple.darken-4 {\n  background-color: #311b92 !important;\n}\n.deep-purple-text.text-darken-4 {\n  color: #311b92 !important;\n}\n.deep-purple.accent-1 {\n  background-color: #b388ff !important;\n}\n.deep-purple-text.text-accent-1 {\n  color: #b388ff !important;\n}\n.deep-purple.accent-2 {\n  background-color: #7c4dff !important;\n}\n.deep-purple-text.text-accent-2 {\n  color: #7c4dff !important;\n}\n.deep-purple.accent-3 {\n  background-color: #651fff !important;\n}\n.deep-purple-text.text-accent-3 {\n  color: #651fff !important;\n}\n.deep-purple.accent-4 {\n  background-color: #6200ea !important;\n}\n.deep-purple-text.text-accent-4 {\n  color: #6200ea !important;\n}\n.indigo {\n  background-color: #3f51b5 !important;\n}\n.indigo-text {\n  color: #3f51b5 !important;\n}\n.indigo.lighten-5 {\n  background-color: #e8eaf6 !important;\n}\n.indigo-text.text-lighten-5 {\n  color: #e8eaf6 !important;\n}\n.indigo.lighten-4 {\n  background-color: #c5cae9 !important;\n}\n.indigo-text.text-lighten-4 {\n  color: #c5cae9 !important;\n}\n.indigo.lighten-3 {\n  background-color: #9fa8da !important;\n}\n.indigo-text.text-lighten-3 {\n  color: #9fa8da !important;\n}\n.indigo.lighten-2 {\n  background-color: #7986cb !important;\n}\n.indigo-text.text-lighten-2 {\n  color: #7986cb !important;\n}\n.indigo.lighten-1 {\n  background-color: #5c6bc0 !important;\n}\n.indigo-text.text-lighten-1 {\n  color: #5c6bc0 !important;\n}\n.indigo.darken-1 {\n  background-color: #3949ab !important;\n}\n.indigo-text.text-darken-1 {\n  color: #3949ab !important;\n}\n.indigo.darken-2 {\n  background-color: #303f9f !important;\n}\n.indigo-text.text-darken-2 {\n  color: #303f9f !important;\n}\n.indigo.darken-3 {\n  background-color: #283593 !important;\n}\n.indigo-text.text-darken-3 {\n  color: #283593 !important;\n}\n.indigo.darken-4 {\n  background-color: #1a237e !important;\n}\n.indigo-text.text-darken-4 {\n  color: #1a237e !important;\n}\n.indigo.accent-1 {\n  background-color: #8c9eff !important;\n}\n.indigo-text.text-accent-1 {\n  color: #8c9eff !important;\n}\n.indigo.accent-2 {\n  background-color: #536dfe !important;\n}\n.indigo-text.text-accent-2 {\n  color: #536dfe !important;\n}\n.indigo.accent-3 {\n  background-color: #3d5afe !important;\n}\n.indigo-text.text-accent-3 {\n  color: #3d5afe !important;\n}\n.indigo.accent-4 {\n  background-color: #304ffe !important;\n}\n.indigo-text.text-accent-4 {\n  color: #304ffe !important;\n}\n.blue {\n  background-color: #2196F3 !important;\n}\n.blue-text {\n  color: #2196F3 !important;\n}\n.blue.lighten-5 {\n  background-color: #E3F2FD !important;\n}\n.blue-text.text-lighten-5 {\n  color: #E3F2FD !important;\n}\n.blue.lighten-4 {\n  background-color: #BBDEFB !important;\n}\n.blue-text.text-lighten-4 {\n  color: #BBDEFB !important;\n}\n.blue.lighten-3 {\n  background-color: #90CAF9 !important;\n}\n.blue-text.text-lighten-3 {\n  color: #90CAF9 !important;\n}\n.blue.lighten-2 {\n  background-color: #64B5F6 !important;\n}\n.blue-text.text-lighten-2 {\n  color: #64B5F6 !important;\n}\n.blue.lighten-1 {\n  background-color: #42A5F5 !important;\n}\n.blue-text.text-lighten-1 {\n  color: #42A5F5 !important;\n}\n.blue.darken-1 {\n  background-color: #1E88E5 !important;\n}\n.blue-text.text-darken-1 {\n  color: #1E88E5 !important;\n}\n.blue.darken-2 {\n  background-color: #1976D2 !important;\n}\n.blue-text.text-darken-2 {\n  color: #1976D2 !important;\n}\n.blue.darken-3 {\n  background-color: #1565C0 !important;\n}\n.blue-text.text-darken-3 {\n  color: #1565C0 !important;\n}\n.blue.darken-4 {\n  background-color: #0D47A1 !important;\n}\n.blue-text.text-darken-4 {\n  color: #0D47A1 !important;\n}\n.blue.accent-1 {\n  background-color: #82B1FF !important;\n}\n.blue-text.text-accent-1 {\n  color: #82B1FF !important;\n}\n.blue.accent-2 {\n  background-color: #448AFF !important;\n}\n.blue-text.text-accent-2 {\n  color: #448AFF !important;\n}\n.blue.accent-3 {\n  background-color: #2979FF !important;\n}\n.blue-text.text-accent-3 {\n  color: #2979FF !important;\n}\n.blue.accent-4 {\n  background-color: #2962FF !important;\n}\n.blue-text.text-accent-4 {\n  color: #2962FF !important;\n}\n.light-blue {\n  background-color: #03a9f4 !important;\n}\n.light-blue-text {\n  color: #03a9f4 !important;\n}\n.light-blue.lighten-5 {\n  background-color: #e1f5fe !important;\n}\n.light-blue-text.text-lighten-5 {\n  color: #e1f5fe !important;\n}\n.light-blue.lighten-4 {\n  background-color: #b3e5fc !important;\n}\n.light-blue-text.text-lighten-4 {\n  color: #b3e5fc !important;\n}\n.light-blue.lighten-3 {\n  background-color: #81d4fa !important;\n}\n.light-blue-text.text-lighten-3 {\n  color: #81d4fa !important;\n}\n.light-blue.lighten-2 {\n  background-color: #4fc3f7 !important;\n}\n.light-blue-text.text-lighten-2 {\n  color: #4fc3f7 !important;\n}\n.light-blue.lighten-1 {\n  background-color: #29b6f6 !important;\n}\n.light-blue-text.text-lighten-1 {\n  color: #29b6f6 !important;\n}\n.light-blue.darken-1 {\n  background-color: #039be5 !important;\n}\n.light-blue-text.text-darken-1 {\n  color: #039be5 !important;\n}\n.light-blue.darken-2 {\n  background-color: #0288d1 !important;\n}\n.light-blue-text.text-darken-2 {\n  color: #0288d1 !important;\n}\n.light-blue.darken-3 {\n  background-color: #0277bd !important;\n}\n.light-blue-text.text-darken-3 {\n  color: #0277bd !important;\n}\n.light-blue.darken-4 {\n  background-color: #01579b !important;\n}\n.light-blue-text.text-darken-4 {\n  color: #01579b !important;\n}\n.light-blue.accent-1 {\n  background-color: #80d8ff !important;\n}\n.light-blue-text.text-accent-1 {\n  color: #80d8ff !important;\n}\n.light-blue.accent-2 {\n  background-color: #40c4ff !important;\n}\n.light-blue-text.text-accent-2 {\n  color: #40c4ff !important;\n}\n.light-blue.accent-3 {\n  background-color: #00b0ff !important;\n}\n.light-blue-text.text-accent-3 {\n  color: #00b0ff !important;\n}\n.light-blue.accent-4 {\n  background-color: #0091ea !important;\n}\n.light-blue-text.text-accent-4 {\n  color: #0091ea !important;\n}\n.cyan {\n  background-color: #00bcd4 !important;\n}\n.cyan-text {\n  color: #00bcd4 !important;\n}\n.cyan.lighten-5 {\n  background-color: #e0f7fa !important;\n}\n.cyan-text.text-lighten-5 {\n  color: #e0f7fa !important;\n}\n.cyan.lighten-4 {\n  background-color: #b2ebf2 !important;\n}\n.cyan-text.text-lighten-4 {\n  color: #b2ebf2 !important;\n}\n.cyan.lighten-3 {\n  background-color: #80deea !important;\n}\n.cyan-text.text-lighten-3 {\n  color: #80deea !important;\n}\n.cyan.lighten-2 {\n  background-color: #4dd0e1 !important;\n}\n.cyan-text.text-lighten-2 {\n  color: #4dd0e1 !important;\n}\n.cyan.lighten-1 {\n  background-color: #26c6da !important;\n}\n.cyan-text.text-lighten-1 {\n  color: #26c6da !important;\n}\n.cyan.darken-1 {\n  background-color: #00acc1 !important;\n}\n.cyan-text.text-darken-1 {\n  color: #00acc1 !important;\n}\n.cyan.darken-2 {\n  background-color: #0097a7 !important;\n}\n.cyan-text.text-darken-2 {\n  color: #0097a7 !important;\n}\n.cyan.darken-3 {\n  background-color: #00838f !important;\n}\n.cyan-text.text-darken-3 {\n  color: #00838f !important;\n}\n.cyan.darken-4 {\n  background-color: #006064 !important;\n}\n.cyan-text.text-darken-4 {\n  color: #006064 !important;\n}\n.cyan.accent-1 {\n  background-color: #84ffff !important;\n}\n.cyan-text.text-accent-1 {\n  color: #84ffff !important;\n}\n.cyan.accent-2 {\n  background-color: #18ffff !important;\n}\n.cyan-text.text-accent-2 {\n  color: #18ffff !important;\n}\n.cyan.accent-3 {\n  background-color: #00e5ff !important;\n}\n.cyan-text.text-accent-3 {\n  color: #00e5ff !important;\n}\n.cyan.accent-4 {\n  background-color: #00b8d4 !important;\n}\n.cyan-text.text-accent-4 {\n  color: #00b8d4 !important;\n}\n.teal {\n  background-color: #009688 !important;\n}\n.teal-text {\n  color: #009688 !important;\n}\n.teal.lighten-5 {\n  background-color: #e0f2f1 !important;\n}\n.teal-text.text-lighten-5 {\n  color: #e0f2f1 !important;\n}\n.teal.lighten-4 {\n  background-color: #b2dfdb !important;\n}\n.teal-text.text-lighten-4 {\n  color: #b2dfdb !important;\n}\n.teal.lighten-3 {\n  background-color: #80cbc4 !important;\n}\n.teal-text.text-lighten-3 {\n  color: #80cbc4 !important;\n}\n.teal.lighten-2 {\n  background-color: #4db6ac !important;\n}\n.teal-text.text-lighten-2 {\n  color: #4db6ac !important;\n}\n.teal.lighten-1 {\n  background-color: #26a69a !important;\n}\n.teal-text.text-lighten-1 {\n  color: #26a69a !important;\n}\n.teal.darken-1 {\n  background-color: #00897b !important;\n}\n.teal-text.text-darken-1 {\n  color: #00897b !important;\n}\n.teal.darken-2 {\n  background-color: #00796b !important;\n}\n.teal-text.text-darken-2 {\n  color: #00796b !important;\n}\n.teal.darken-3 {\n  background-color: #00695c !important;\n}\n.teal-text.text-darken-3 {\n  color: #00695c !important;\n}\n.teal.darken-4 {\n  background-color: #004d40 !important;\n}\n.teal-text.text-darken-4 {\n  color: #004d40 !important;\n}\n.teal.accent-1 {\n  background-color: #a7ffeb !important;\n}\n.teal-text.text-accent-1 {\n  color: #a7ffeb !important;\n}\n.teal.accent-2 {\n  background-color: #64ffda !important;\n}\n.teal-text.text-accent-2 {\n  color: #64ffda !important;\n}\n.teal.accent-3 {\n  background-color: #1de9b6 !important;\n}\n.teal-text.text-accent-3 {\n  color: #1de9b6 !important;\n}\n.teal.accent-4 {\n  background-color: #00bfa5 !important;\n}\n.teal-text.text-accent-4 {\n  color: #00bfa5 !important;\n}\n.green {\n  background-color: #4CAF50 !important;\n}\n.green-text {\n  color: #4CAF50 !important;\n}\n.green.lighten-5 {\n  background-color: #E8F5E9 !important;\n}\n.green-text.text-lighten-5 {\n  color: #E8F5E9 !important;\n}\n.green.lighten-4 {\n  background-color: #C8E6C9 !important;\n}\n.green-text.text-lighten-4 {\n  color: #C8E6C9 !important;\n}\n.green.lighten-3 {\n  background-color: #A5D6A7 !important;\n}\n.green-text.text-lighten-3 {\n  color: #A5D6A7 !important;\n}\n.green.lighten-2 {\n  background-color: #81C784 !important;\n}\n.green-text.text-lighten-2 {\n  color: #81C784 !important;\n}\n.green.lighten-1 {\n  background-color: #66BB6A !important;\n}\n.green-text.text-lighten-1 {\n  color: #66BB6A !important;\n}\n.green.darken-1 {\n  background-color: #43A047 !important;\n}\n.green-text.text-darken-1 {\n  color: #43A047 !important;\n}\n.green.darken-2 {\n  background-color: #388E3C !important;\n}\n.green-text.text-darken-2 {\n  color: #388E3C !important;\n}\n.green.darken-3 {\n  background-color: #2E7D32 !important;\n}\n.green-text.text-darken-3 {\n  color: #2E7D32 !important;\n}\n.green.darken-4 {\n  background-color: #1B5E20 !important;\n}\n.green-text.text-darken-4 {\n  color: #1B5E20 !important;\n}\n.green.accent-1 {\n  background-color: #B9F6CA !important;\n}\n.green-text.text-accent-1 {\n  color: #B9F6CA !important;\n}\n.green.accent-2 {\n  background-color: #69F0AE !important;\n}\n.green-text.text-accent-2 {\n  color: #69F0AE !important;\n}\n.green.accent-3 {\n  background-color: #00E676 !important;\n}\n.green-text.text-accent-3 {\n  color: #00E676 !important;\n}\n.green.accent-4 {\n  background-color: #00C853 !important;\n}\n.green-text.text-accent-4 {\n  color: #00C853 !important;\n}\n.light-green {\n  background-color: #8bc34a !important;\n}\n.light-green-text {\n  color: #8bc34a !important;\n}\n.light-green.lighten-5 {\n  background-color: #f1f8e9 !important;\n}\n.light-green-text.text-lighten-5 {\n  color: #f1f8e9 !important;\n}\n.light-green.lighten-4 {\n  background-color: #dcedc8 !important;\n}\n.light-green-text.text-lighten-4 {\n  color: #dcedc8 !important;\n}\n.light-green.lighten-3 {\n  background-color: #c5e1a5 !important;\n}\n.light-green-text.text-lighten-3 {\n  color: #c5e1a5 !important;\n}\n.light-green.lighten-2 {\n  background-color: #aed581 !important;\n}\n.light-green-text.text-lighten-2 {\n  color: #aed581 !important;\n}\n.light-green.lighten-1 {\n  background-color: #9ccc65 !important;\n}\n.light-green-text.text-lighten-1 {\n  color: #9ccc65 !important;\n}\n.light-green.darken-1 {\n  background-color: #7cb342 !important;\n}\n.light-green-text.text-darken-1 {\n  color: #7cb342 !important;\n}\n.light-green.darken-2 {\n  background-color: #689f38 !important;\n}\n.light-green-text.text-darken-2 {\n  color: #689f38 !important;\n}\n.light-green.darken-3 {\n  background-color: #558b2f !important;\n}\n.light-green-text.text-darken-3 {\n  color: #558b2f !important;\n}\n.light-green.darken-4 {\n  background-color: #33691e !important;\n}\n.light-green-text.text-darken-4 {\n  color: #33691e !important;\n}\n.light-green.accent-1 {\n  background-color: #ccff90 !important;\n}\n.light-green-text.text-accent-1 {\n  color: #ccff90 !important;\n}\n.light-green.accent-2 {\n  background-color: #b2ff59 !important;\n}\n.light-green-text.text-accent-2 {\n  color: #b2ff59 !important;\n}\n.light-green.accent-3 {\n  background-color: #76ff03 !important;\n}\n.light-green-text.text-accent-3 {\n  color: #76ff03 !important;\n}\n.light-green.accent-4 {\n  background-color: #64dd17 !important;\n}\n.light-green-text.text-accent-4 {\n  color: #64dd17 !important;\n}\n.lime {\n  background-color: #cddc39 !important;\n}\n.lime-text {\n  color: #cddc39 !important;\n}\n.lime.lighten-5 {\n  background-color: #f9fbe7 !important;\n}\n.lime-text.text-lighten-5 {\n  color: #f9fbe7 !important;\n}\n.lime.lighten-4 {\n  background-color: #f0f4c3 !important;\n}\n.lime-text.text-lighten-4 {\n  color: #f0f4c3 !important;\n}\n.lime.lighten-3 {\n  background-color: #e6ee9c !important;\n}\n.lime-text.text-lighten-3 {\n  color: #e6ee9c !important;\n}\n.lime.lighten-2 {\n  background-color: #dce775 !important;\n}\n.lime-text.text-lighten-2 {\n  color: #dce775 !important;\n}\n.lime.lighten-1 {\n  background-color: #d4e157 !important;\n}\n.lime-text.text-lighten-1 {\n  color: #d4e157 !important;\n}\n.lime.darken-1 {\n  background-color: #c0ca33 !important;\n}\n.lime-text.text-darken-1 {\n  color: #c0ca33 !important;\n}\n.lime.darken-2 {\n  background-color: #afb42b !important;\n}\n.lime-text.text-darken-2 {\n  color: #afb42b !important;\n}\n.lime.darken-3 {\n  background-color: #9e9d24 !important;\n}\n.lime-text.text-darken-3 {\n  color: #9e9d24 !important;\n}\n.lime.darken-4 {\n  background-color: #827717 !important;\n}\n.lime-text.text-darken-4 {\n  color: #827717 !important;\n}\n.lime.accent-1 {\n  background-color: #f4ff81 !important;\n}\n.lime-text.text-accent-1 {\n  color: #f4ff81 !important;\n}\n.lime.accent-2 {\n  background-color: #eeff41 !important;\n}\n.lime-text.text-accent-2 {\n  color: #eeff41 !important;\n}\n.lime.accent-3 {\n  background-color: #c6ff00 !important;\n}\n.lime-text.text-accent-3 {\n  color: #c6ff00 !important;\n}\n.lime.accent-4 {\n  background-color: #aeea00 !important;\n}\n.lime-text.text-accent-4 {\n  color: #aeea00 !important;\n}\n.yellow {\n  background-color: #ffeb3b !important;\n}\n.yellow-text {\n  color: #ffeb3b !important;\n}\n.yellow.lighten-5 {\n  background-color: #fffde7 !important;\n}\n.yellow-text.text-lighten-5 {\n  color: #fffde7 !important;\n}\n.yellow.lighten-4 {\n  background-color: #fff9c4 !important;\n}\n.yellow-text.text-lighten-4 {\n  color: #fff9c4 !important;\n}\n.yellow.lighten-3 {\n  background-color: #fff59d !important;\n}\n.yellow-text.text-lighten-3 {\n  color: #fff59d !important;\n}\n.yellow.lighten-2 {\n  background-color: #fff176 !important;\n}\n.yellow-text.text-lighten-2 {\n  color: #fff176 !important;\n}\n.yellow.lighten-1 {\n  background-color: #ffee58 !important;\n}\n.yellow-text.text-lighten-1 {\n  color: #ffee58 !important;\n}\n.yellow.darken-1 {\n  background-color: #fdd835 !important;\n}\n.yellow-text.text-darken-1 {\n  color: #fdd835 !important;\n}\n.yellow.darken-2 {\n  background-color: #fbc02d !important;\n}\n.yellow-text.text-darken-2 {\n  color: #fbc02d !important;\n}\n.yellow.darken-3 {\n  background-color: #f9a825 !important;\n}\n.yellow-text.text-darken-3 {\n  color: #f9a825 !important;\n}\n.yellow.darken-4 {\n  background-color: #f57f17 !important;\n}\n.yellow-text.text-darken-4 {\n  color: #f57f17 !important;\n}\n.yellow.accent-1 {\n  background-color: #ffff8d !important;\n}\n.yellow-text.text-accent-1 {\n  color: #ffff8d !important;\n}\n.yellow.accent-2 {\n  background-color: #ffff00 !important;\n}\n.yellow-text.text-accent-2 {\n  color: #ffff00 !important;\n}\n.yellow.accent-3 {\n  background-color: #ffea00 !important;\n}\n.yellow-text.text-accent-3 {\n  color: #ffea00 !important;\n}\n.yellow.accent-4 {\n  background-color: #ffd600 !important;\n}\n.yellow-text.text-accent-4 {\n  color: #ffd600 !important;\n}\n.amber {\n  background-color: #ffc107 !important;\n}\n.amber-text {\n  color: #ffc107 !important;\n}\n.amber.lighten-5 {\n  background-color: #fff8e1 !important;\n}\n.amber-text.text-lighten-5 {\n  color: #fff8e1 !important;\n}\n.amber.lighten-4 {\n  background-color: #ffecb3 !important;\n}\n.amber-text.text-lighten-4 {\n  color: #ffecb3 !important;\n}\n.amber.lighten-3 {\n  background-color: #ffe082 !important;\n}\n.amber-text.text-lighten-3 {\n  color: #ffe082 !important;\n}\n.amber.lighten-2 {\n  background-color: #ffd54f !important;\n}\n.amber-text.text-lighten-2 {\n  color: #ffd54f !important;\n}\n.amber.lighten-1 {\n  background-color: #ffca28 !important;\n}\n.amber-text.text-lighten-1 {\n  color: #ffca28 !important;\n}\n.amber.darken-1 {\n  background-color: #ffb300 !important;\n}\n.amber-text.text-darken-1 {\n  color: #ffb300 !important;\n}\n.amber.darken-2 {\n  background-color: #ffa000 !important;\n}\n.amber-text.text-darken-2 {\n  color: #ffa000 !important;\n}\n.amber.darken-3 {\n  background-color: #ff8f00 !important;\n}\n.amber-text.text-darken-3 {\n  color: #ff8f00 !important;\n}\n.amber.darken-4 {\n  background-color: #ff6f00 !important;\n}\n.amber-text.text-darken-4 {\n  color: #ff6f00 !important;\n}\n.amber.accent-1 {\n  background-color: #ffe57f !important;\n}\n.amber-text.text-accent-1 {\n  color: #ffe57f !important;\n}\n.amber.accent-2 {\n  background-color: #ffd740 !important;\n}\n.amber-text.text-accent-2 {\n  color: #ffd740 !important;\n}\n.amber.accent-3 {\n  background-color: #ffc400 !important;\n}\n.amber-text.text-accent-3 {\n  color: #ffc400 !important;\n}\n.amber.accent-4 {\n  background-color: #ffab00 !important;\n}\n.amber-text.text-accent-4 {\n  color: #ffab00 !important;\n}\n.orange {\n  background-color: #ff9800 !important;\n}\n.orange-text {\n  color: #ff9800 !important;\n}\n.orange.lighten-5 {\n  background-color: #fff3e0 !important;\n}\n.orange-text.text-lighten-5 {\n  color: #fff3e0 !important;\n}\n.orange.lighten-4 {\n  background-color: #ffe0b2 !important;\n}\n.orange-text.text-lighten-4 {\n  color: #ffe0b2 !important;\n}\n.orange.lighten-3 {\n  background-color: #ffcc80 !important;\n}\n.orange-text.text-lighten-3 {\n  color: #ffcc80 !important;\n}\n.orange.lighten-2 {\n  background-color: #ffb74d !important;\n}\n.orange-text.text-lighten-2 {\n  color: #ffb74d !important;\n}\n.orange.lighten-1 {\n  background-color: #ffa726 !important;\n}\n.orange-text.text-lighten-1 {\n  color: #ffa726 !important;\n}\n.orange.darken-1 {\n  background-color: #fb8c00 !important;\n}\n.orange-text.text-darken-1 {\n  color: #fb8c00 !important;\n}\n.orange.darken-2 {\n  background-color: #f57c00 !important;\n}\n.orange-text.text-darken-2 {\n  color: #f57c00 !important;\n}\n.orange.darken-3 {\n  background-color: #ef6c00 !important;\n}\n.orange-text.text-darken-3 {\n  color: #ef6c00 !important;\n}\n.orange.darken-4 {\n  background-color: #e65100 !important;\n}\n.orange-text.text-darken-4 {\n  color: #e65100 !important;\n}\n.orange.accent-1 {\n  background-color: #ffd180 !important;\n}\n.orange-text.text-accent-1 {\n  color: #ffd180 !important;\n}\n.orange.accent-2 {\n  background-color: #ffab40 !important;\n}\n.orange-text.text-accent-2 {\n  color: #ffab40 !important;\n}\n.orange.accent-3 {\n  background-color: #ff9100 !important;\n}\n.orange-text.text-accent-3 {\n  color: #ff9100 !important;\n}\n.orange.accent-4 {\n  background-color: #ff6d00 !important;\n}\n.orange-text.text-accent-4 {\n  color: #ff6d00 !important;\n}\n.deep-orange {\n  background-color: #ff5722 !important;\n}\n.deep-orange-text {\n  color: #ff5722 !important;\n}\n.deep-orange.lighten-5 {\n  background-color: #fbe9e7 !important;\n}\n.deep-orange-text.text-lighten-5 {\n  color: #fbe9e7 !important;\n}\n.deep-orange.lighten-4 {\n  background-color: #ffccbc !important;\n}\n.deep-orange-text.text-lighten-4 {\n  color: #ffccbc !important;\n}\n.deep-orange.lighten-3 {\n  background-color: #ffab91 !important;\n}\n.deep-orange-text.text-lighten-3 {\n  color: #ffab91 !important;\n}\n.deep-orange.lighten-2 {\n  background-color: #ff8a65 !important;\n}\n.deep-orange-text.text-lighten-2 {\n  color: #ff8a65 !important;\n}\n.deep-orange.lighten-1 {\n  background-color: #ff7043 !important;\n}\n.deep-orange-text.text-lighten-1 {\n  color: #ff7043 !important;\n}\n.deep-orange.darken-1 {\n  background-color: #f4511e !important;\n}\n.deep-orange-text.text-darken-1 {\n  color: #f4511e !important;\n}\n.deep-orange.darken-2 {\n  background-color: #e64a19 !important;\n}\n.deep-orange-text.text-darken-2 {\n  color: #e64a19 !important;\n}\n.deep-orange.darken-3 {\n  background-color: #d84315 !important;\n}\n.deep-orange-text.text-darken-3 {\n  color: #d84315 !important;\n}\n.deep-orange.darken-4 {\n  background-color: #bf360c !important;\n}\n.deep-orange-text.text-darken-4 {\n  color: #bf360c !important;\n}\n.deep-orange.accent-1 {\n  background-color: #ff9e80 !important;\n}\n.deep-orange-text.text-accent-1 {\n  color: #ff9e80 !important;\n}\n.deep-orange.accent-2 {\n  background-color: #ff6e40 !important;\n}\n.deep-orange-text.text-accent-2 {\n  color: #ff6e40 !important;\n}\n.deep-orange.accent-3 {\n  background-color: #ff3d00 !important;\n}\n.deep-orange-text.text-accent-3 {\n  color: #ff3d00 !important;\n}\n.deep-orange.accent-4 {\n  background-color: #dd2c00 !important;\n}\n.deep-orange-text.text-accent-4 {\n  color: #dd2c00 !important;\n}\n.brown {\n  background-color: #795548 !important;\n}\n.brown-text {\n  color: #795548 !important;\n}\n.brown.lighten-5 {\n  background-color: #efebe9 !important;\n}\n.brown-text.text-lighten-5 {\n  color: #efebe9 !important;\n}\n.brown.lighten-4 {\n  background-color: #d7ccc8 !important;\n}\n.brown-text.text-lighten-4 {\n  color: #d7ccc8 !important;\n}\n.brown.lighten-3 {\n  background-color: #bcaaa4 !important;\n}\n.brown-text.text-lighten-3 {\n  color: #bcaaa4 !important;\n}\n.brown.lighten-2 {\n  background-color: #a1887f !important;\n}\n.brown-text.text-lighten-2 {\n  color: #a1887f !important;\n}\n.brown.lighten-1 {\n  background-color: #8d6e63 !important;\n}\n.brown-text.text-lighten-1 {\n  color: #8d6e63 !important;\n}\n.brown.darken-1 {\n  background-color: #6d4c41 !important;\n}\n.brown-text.text-darken-1 {\n  color: #6d4c41 !important;\n}\n.brown.darken-2 {\n  background-color: #5d4037 !important;\n}\n.brown-text.text-darken-2 {\n  color: #5d4037 !important;\n}\n.brown.darken-3 {\n  background-color: #4e342e !important;\n}\n.brown-text.text-darken-3 {\n  color: #4e342e !important;\n}\n.brown.darken-4 {\n  background-color: #3e2723 !important;\n}\n.brown-text.text-darken-4 {\n  color: #3e2723 !important;\n}\n.blue-grey {\n  background-color: #607d8b !important;\n}\n.blue-grey-text {\n  color: #607d8b !important;\n}\n.blue-grey.lighten-5 {\n  background-color: #eceff1 !important;\n}\n.blue-grey-text.text-lighten-5 {\n  color: #eceff1 !important;\n}\n.blue-grey.lighten-4 {\n  background-color: #cfd8dc !important;\n}\n.blue-grey-text.text-lighten-4 {\n  color: #cfd8dc !important;\n}\n.blue-grey.lighten-3 {\n  background-color: #b0bec5 !important;\n}\n.blue-grey-text.text-lighten-3 {\n  color: #b0bec5 !important;\n}\n.blue-grey.lighten-2 {\n  background-color: #90a4ae !important;\n}\n.blue-grey-text.text-lighten-2 {\n  color: #90a4ae !important;\n}\n.blue-grey.lighten-1 {\n  background-color: #78909c !important;\n}\n.blue-grey-text.text-lighten-1 {\n  color: #78909c !important;\n}\n.blue-grey.darken-1 {\n  background-color: #546e7a !important;\n}\n.blue-grey-text.text-darken-1 {\n  color: #546e7a !important;\n}\n.blue-grey.darken-2 {\n  background-color: #455a64 !important;\n}\n.blue-grey-text.text-darken-2 {\n  color: #455a64 !important;\n}\n.blue-grey.darken-3 {\n  background-color: #37474f !important;\n}\n.blue-grey-text.text-darken-3 {\n  color: #37474f !important;\n}\n.blue-grey.darken-4 {\n  background-color: #263238 !important;\n}\n.blue-grey-text.text-darken-4 {\n  color: #263238 !important;\n}\n.grey {\n  background-color: #9e9e9e !important;\n}\n.grey-text {\n  color: #9e9e9e !important;\n}\n.grey.lighten-5 {\n  background-color: #fafafa !important;\n}\n.grey-text.text-lighten-5 {\n  color: #fafafa !important;\n}\n.grey.lighten-4 {\n  background-color: #f5f5f5 !important;\n}\n.grey-text.text-lighten-4 {\n  color: #f5f5f5 !important;\n}\n.grey.lighten-3 {\n  background-color: #eeeeee !important;\n}\n.grey-text.text-lighten-3 {\n  color: #eeeeee !important;\n}\n.grey.lighten-2 {\n  background-color: #e0e0e0 !important;\n}\n.grey-text.text-lighten-2 {\n  color: #e0e0e0 !important;\n}\n.grey.lighten-1 {\n  background-color: #bdbdbd !important;\n}\n.grey-text.text-lighten-1 {\n  color: #bdbdbd !important;\n}\n.grey.darken-1 {\n  background-color: #757575 !important;\n}\n.grey-text.text-darken-1 {\n  color: #757575 !important;\n}\n.grey.darken-2 {\n  background-color: #616161 !important;\n}\n.grey-text.text-darken-2 {\n  color: #616161 !important;\n}\n.grey.darken-3 {\n  background-color: #424242 !important;\n}\n.grey-text.text-darken-3 {\n  color: #424242 !important;\n}\n.grey.darken-4 {\n  background-color: #212121 !important;\n}\n.grey-text.text-darken-4 {\n  color: #212121 !important;\n}\n.black {\n  background-color: #000000 !important;\n}\n.black-text {\n  color: #000000 !important;\n}\n.white {\n  background-color: #FFFFFF !important;\n}\n.white-text {\n  color: #FFFFFF !important;\n}\n.transparent {\n  background-color: transparent !important;\n}\n.transparent-text {\n  color: transparent !important;\n}\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n*, *:before, *:after {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n}\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;\n}\nul:not(.browser-default) {\n  padding-left: 0;\n  list-style-type: none;\n}\nul:not(.browser-default) > li {\n  list-style-type: none;\n}\na {\n  color: #039be5;\n  text-decoration: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.valign-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.clearfix {\n  clear: both;\n}\n.z-depth-0 {\n  -webkit-box-shadow: none !important;\n          box-shadow: none !important;\n}\n/* 2dp elevation modified*/\n.z-depth-1, nav, .card-panel, .card, .toast, .btn, .btn-large, .btn-small, .btn-floating, .dropdown-content, .collapsible, .sidenav {\n  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);\n          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);\n}\n.z-depth-1-half, .btn:hover, .btn-large:hover, .btn-small:hover, .btn-floating:hover {\n  -webkit-box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);\n}\n/* 6dp elevation modified*/\n.z-depth-2 {\n  -webkit-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);\n          box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);\n}\n/* 12dp elevation modified*/\n.z-depth-3 {\n  -webkit-box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);\n}\n/* 16dp elevation */\n.z-depth-4 {\n  -webkit-box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2);\n}\n/* 24dp elevation */\n.z-depth-5, .modal {\n  -webkit-box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);\n}\n.hoverable {\n  -webkit-transition: -webkit-box-shadow .25s;\n  transition: -webkit-box-shadow .25s;\n  transition: box-shadow .25s;\n  transition: box-shadow .25s, -webkit-box-shadow .25s;\n}\n.hoverable:hover {\n  -webkit-box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n          box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n.divider {\n  height: 1px;\n  overflow: hidden;\n  background-color: #e0e0e0;\n}\nblockquote {\n  margin: 20px 0;\n  padding-left: 1.5rem;\n  border-left: 5px solid #ee6e73;\n}\ni {\n  line-height: inherit;\n}\ni.left {\n  float: left;\n  margin-right: 15px;\n}\ni.right {\n  float: right;\n  margin-left: 15px;\n}\ni.tiny {\n  font-size: 1rem;\n}\ni.small {\n  font-size: 2rem;\n}\ni.medium {\n  font-size: 4rem;\n}\ni.large {\n  font-size: 6rem;\n}\nimg.responsive-img,\nvideo.responsive-video {\n  max-width: 100%;\n  height: auto;\n}\n.pagination li {\n  display: inline-block;\n  border-radius: 2px;\n  text-align: center;\n  vertical-align: top;\n  height: 30px;\n}\n.pagination li a {\n  color: #444;\n  display: inline-block;\n  font-size: 1.2rem;\n  padding: 0 10px;\n  line-height: 30px;\n}\n.pagination li.active a {\n  color: #fff;\n}\n.pagination li.active {\n  background-color: #ee6e73;\n}\n.pagination li.disabled a {\n  cursor: default;\n  color: #999;\n}\n.pagination li i {\n  font-size: 2rem;\n}\n.pagination li.pages ul li {\n  display: inline-block;\n  float: none;\n}\n@media only screen and (max-width: 992px) {\n  .pagination {\n    width: 100%;\n  }\n  .pagination li.prev,\n  .pagination li.next {\n    width: 10%;\n  }\n  .pagination li.pages {\n    width: 80%;\n    overflow: hidden;\n    white-space: nowrap;\n  }\n}\n.breadcrumb {\n  font-size: 18px;\n  color: rgba(255, 255, 255, 0.7);\n}\n.breadcrumb i,\n.breadcrumb [class^=\"mdi-\"], .breadcrumb [class*=\"mdi-\"],\n.breadcrumb i.material-icons {\n  display: inline-block;\n  float: left;\n  font-size: 24px;\n}\n.breadcrumb:before {\n  content: '\\E5CC';\n  color: rgba(255, 255, 255, 0.7);\n  vertical-align: top;\n  display: inline-block;\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 25px;\n  margin: 0 10px 0 8px;\n  -webkit-font-smoothing: antialiased;\n}\n.breadcrumb:first-child:before {\n  display: none;\n}\n.breadcrumb:last-child {\n  color: #fff;\n}\n.parallax-container {\n  position: relative;\n  overflow: hidden;\n  height: 500px;\n}\n.parallax-container .parallax {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: -1;\n}\n.parallax-container .parallax img {\n  opacity: 0;\n  position: absolute;\n  left: 50%;\n  bottom: 0;\n  min-width: 100%;\n  min-height: 100%;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n.pin-top, .pin-bottom {\n  position: relative;\n}\n.pinned {\n  position: fixed !important;\n}\n/*********************\n  Transition Classes\n**********************/\nul.staggered-list li {\n  opacity: 0;\n}\n.fade-in {\n  opacity: 0;\n  -webkit-transform-origin: 0 50%;\n          transform-origin: 0 50%;\n}\n/*********************\n  Media Query Classes\n**********************/\n@media only screen and (max-width: 600px) {\n  .hide-on-small-only, .hide-on-small-and-down {\n    display: none !important;\n  }\n}\n@media only screen and (max-width: 992px) {\n  .hide-on-med-and-down {\n    display: none !important;\n  }\n}\n@media only screen and (min-width: 601px) {\n  .hide-on-med-and-up {\n    display: none !important;\n  }\n}\n@media only screen and (min-width: 600px) and (max-width: 992px) {\n  .hide-on-med-only {\n    display: none !important;\n  }\n}\n@media only screen and (min-width: 993px) {\n  .hide-on-large-only {\n    display: none !important;\n  }\n}\n@media only screen and (min-width: 1201px) {\n  .hide-on-extra-large-only {\n    display: none !important;\n  }\n}\n@media only screen and (min-width: 1201px) {\n  .show-on-extra-large {\n    display: block !important;\n  }\n}\n@media only screen and (min-width: 993px) {\n  .show-on-large {\n    display: block !important;\n  }\n}\n@media only screen and (min-width: 600px) and (max-width: 992px) {\n  .show-on-medium {\n    display: block !important;\n  }\n}\n@media only screen and (max-width: 600px) {\n  .show-on-small {\n    display: block !important;\n  }\n}\n@media only screen and (min-width: 601px) {\n  .show-on-medium-and-up {\n    display: block !important;\n  }\n}\n@media only screen and (max-width: 992px) {\n  .show-on-medium-and-down {\n    display: block !important;\n  }\n}\n@media only screen and (max-width: 600px) {\n  .center-on-small-only {\n    text-align: center;\n  }\n}\n.page-footer {\n  padding-top: 20px;\n  color: #fff;\n  background-color: #ee6e73;\n}\n.page-footer .footer-copyright {\n  overflow: hidden;\n  min-height: 50px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 10px 0px;\n  color: rgba(255, 255, 255, 0.8);\n  background-color: rgba(51, 51, 51, 0.08);\n}\ntable, th, td {\n  border: none;\n}\ntable {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ntable.striped tr {\n  border-bottom: none;\n}\ntable.striped > tbody > tr:nth-child(odd) {\n  background-color: rgba(242, 242, 242, 0.5);\n}\ntable.striped > tbody > tr > td {\n  border-radius: 0;\n}\ntable.highlight > tbody > tr {\n  -webkit-transition: background-color .25s ease;\n  transition: background-color .25s ease;\n}\ntable.highlight > tbody > tr:hover {\n  background-color: rgba(242, 242, 242, 0.5);\n}\ntable.centered thead tr th, table.centered tbody tr td {\n  text-align: center;\n}\ntr {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n}\ntd, th {\n  padding: 15px 5px;\n  display: table-cell;\n  text-align: left;\n  vertical-align: middle;\n  border-radius: 2px;\n}\n@media only screen and (max-width: 992px) {\n  table.responsive-table {\n    width: 100%;\n    border-collapse: collapse;\n    border-spacing: 0;\n    display: block;\n    position: relative;\n    /* sort out borders */\n  }\n  table.responsive-table td:empty:before {\n    content: '\\00a0';\n  }\n  table.responsive-table th,\n  table.responsive-table td {\n    margin: 0;\n    vertical-align: top;\n  }\n  table.responsive-table th {\n    text-align: left;\n  }\n  table.responsive-table thead {\n    display: block;\n    float: left;\n  }\n  table.responsive-table thead tr {\n    display: block;\n    padding: 0 10px 0 0;\n  }\n  table.responsive-table thead tr th::before {\n    content: \"\\00a0\";\n  }\n  table.responsive-table tbody {\n    display: block;\n    width: auto;\n    position: relative;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n  table.responsive-table tbody tr {\n    display: inline-block;\n    vertical-align: top;\n  }\n  table.responsive-table th {\n    display: block;\n    text-align: right;\n  }\n  table.responsive-table td {\n    display: block;\n    min-height: 1.25em;\n    text-align: left;\n  }\n  table.responsive-table tr {\n    border-bottom: none;\n    padding: 0 10px;\n  }\n  table.responsive-table thead {\n    border: 0;\n    border-right: 1px solid rgba(0, 0, 0, 0.12);\n  }\n}\n.collection {\n  margin: 0.5rem 0 1rem 0;\n  border: 1px solid #e0e0e0;\n  border-radius: 2px;\n  overflow: hidden;\n  position: relative;\n}\n.collection .collection-item {\n  background-color: #fff;\n  line-height: 1.5rem;\n  padding: 10px 20px;\n  margin: 0;\n  border-bottom: 1px solid #e0e0e0;\n}\n.collection .collection-item.avatar {\n  min-height: 84px;\n  padding-left: 72px;\n  position: relative;\n}\n.collection .collection-item.avatar:not(.circle-clipper) > .circle,\n.collection .collection-item.avatar :not(.circle-clipper) > .circle {\n  position: absolute;\n  width: 42px;\n  height: 42px;\n  overflow: hidden;\n  left: 15px;\n  display: inline-block;\n  vertical-align: middle;\n}\n.collection .collection-item.avatar i.circle {\n  font-size: 18px;\n  line-height: 42px;\n  color: #fff;\n  background-color: #999;\n  text-align: center;\n}\n.collection .collection-item.avatar .title {\n  font-size: 16px;\n}\n.collection .collection-item.avatar p {\n  margin: 0;\n}\n.collection .collection-item.avatar .secondary-content {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n}\n.collection .collection-item:last-child {\n  border-bottom: none;\n}\n.collection .collection-item.active {\n  background-color: #26a69a;\n  color: #eafaf9;\n}\n.collection .collection-item.active .secondary-content {\n  color: #fff;\n}\n.collection a.collection-item {\n  display: block;\n  -webkit-transition: .25s;\n  transition: .25s;\n  color: #26a69a;\n}\n.collection a.collection-item:not(.active):hover {\n  background-color: #ddd;\n}\n.collection.with-header .collection-header {\n  background-color: #fff;\n  border-bottom: 1px solid #e0e0e0;\n  padding: 10px 20px;\n}\n.collection.with-header .collection-item {\n  padding-left: 30px;\n}\n.collection.with-header .collection-item.avatar {\n  padding-left: 72px;\n}\n.secondary-content {\n  float: right;\n  color: #26a69a;\n}\n.collapsible .collection {\n  margin: 0;\n  border: none;\n}\n.video-container {\n  position: relative;\n  padding-bottom: 56.25%;\n  height: 0;\n  overflow: hidden;\n}\n.video-container iframe, .video-container object, .video-container embed {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.progress {\n  position: relative;\n  height: 4px;\n  display: block;\n  width: 100%;\n  background-color: #acece6;\n  border-radius: 2px;\n  margin: 0.5rem 0 1rem 0;\n  overflow: hidden;\n}\n.progress .determinate {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  background-color: #26a69a;\n  -webkit-transition: width .3s linear;\n  transition: width .3s linear;\n}\n.progress .indeterminate {\n  background-color: #26a69a;\n}\n.progress .indeterminate:before {\n  content: '';\n  position: absolute;\n  background-color: inherit;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  will-change: left, right;\n  -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n          animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n}\n.progress .indeterminate:after {\n  content: '';\n  position: absolute;\n  background-color: inherit;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  will-change: left, right;\n  -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n          animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n  -webkit-animation-delay: 1.15s;\n          animation-delay: 1.15s;\n}\n@-webkit-keyframes indeterminate {\n  0% {\n    left: -35%;\n    right: 100%;\n  }\n  60% {\n    left: 100%;\n    right: -90%;\n  }\n  100% {\n    left: 100%;\n    right: -90%;\n  }\n}\n@keyframes indeterminate {\n  0% {\n    left: -35%;\n    right: 100%;\n  }\n  60% {\n    left: 100%;\n    right: -90%;\n  }\n  100% {\n    left: 100%;\n    right: -90%;\n  }\n}\n@-webkit-keyframes indeterminate-short {\n  0% {\n    left: -200%;\n    right: 100%;\n  }\n  60% {\n    left: 107%;\n    right: -8%;\n  }\n  100% {\n    left: 107%;\n    right: -8%;\n  }\n}\n@keyframes indeterminate-short {\n  0% {\n    left: -200%;\n    right: 100%;\n  }\n  60% {\n    left: 107%;\n    right: -8%;\n  }\n  100% {\n    left: 107%;\n    right: -8%;\n  }\n}\n/*******************\n  Utility Classes\n*******************/\n.hide {\n  display: none !important;\n}\n.left-align {\n  text-align: left;\n}\n.right-align {\n  text-align: right;\n}\n.center, .center-align {\n  text-align: center;\n}\n.left {\n  float: left !important;\n}\n.right {\n  float: right !important;\n}\n.no-select, input[type=range],\ninput[type=range] + .thumb {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.circle {\n  border-radius: 50%;\n}\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.truncate {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.no-padding {\n  padding: 0 !important;\n}\nspan.badge {\n  min-width: 3rem;\n  padding: 0 6px;\n  margin-left: 14px;\n  text-align: center;\n  font-size: 1rem;\n  line-height: 22px;\n  height: 22px;\n  color: #757575;\n  float: right;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\nspan.badge.new {\n  font-weight: 300;\n  font-size: 0.8rem;\n  color: #fff;\n  background-color: #26a69a;\n  border-radius: 2px;\n}\nspan.badge.new:after {\n  content: \" new\";\n}\nspan.badge[data-badge-caption]::after {\n  content: \" \" attr(data-badge-caption);\n}\nnav ul a span.badge {\n  display: inline-block;\n  float: none;\n  margin-left: 4px;\n  line-height: 22px;\n  height: 22px;\n  -webkit-font-smoothing: auto;\n}\n.collection-item span.badge {\n  margin-top: calc(0.75rem - 11px);\n}\n.collapsible span.badge {\n  margin-left: auto;\n}\n.sidenav span.badge {\n  margin-top: calc(24px - 11px);\n}\ntable span.badge {\n  display: inline-block;\n  float: none;\n  margin-left: auto;\n}\n/* This is needed for some mobile phones to display the Google Icon font properly */\n.material-icons {\n  text-rendering: optimizeLegibility;\n  -webkit-font-feature-settings: 'liga';\n          font-feature-settings: 'liga';\n}\n.container {\n  margin: 0 auto;\n  max-width: 1280px;\n  width: 90%;\n}\n@media only screen and (min-width: 601px) {\n  .container {\n    width: 85%;\n  }\n}\n@media only screen and (min-width: 993px) {\n  .container {\n    width: 70%;\n  }\n}\n.col .row {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n}\n.section {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n.section.no-pad {\n  padding: 0;\n}\n.section.no-pad-bot {\n  padding-bottom: 0;\n}\n.section.no-pad-top {\n  padding-top: 0;\n}\n.row {\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 20px;\n}\n.row:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.row .col {\n  float: left;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0 0.75rem;\n  min-height: 1px;\n}\n.row .col[class*=\"push-\"], .row .col[class*=\"pull-\"] {\n  position: relative;\n}\n.row .col.s1 {\n  width: 8.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.s2 {\n  width: 16.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.s3 {\n  width: 25%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.s4 {\n  width: 33.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.s5 {\n  width: 41.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.s6 {\n  width: 50%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.s7 {\n  width: 58.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.s8 {\n  width: 66.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.s9 {\n  width: 75%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.s10 {\n  width: 83.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.s11 {\n  width: 91.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.s12 {\n  width: 100%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n.row .col.offset-s1 {\n  margin-left: 8.3333333333%;\n}\n.row .col.pull-s1 {\n  right: 8.3333333333%;\n}\n.row .col.push-s1 {\n  left: 8.3333333333%;\n}\n.row .col.offset-s2 {\n  margin-left: 16.6666666667%;\n}\n.row .col.pull-s2 {\n  right: 16.6666666667%;\n}\n.row .col.push-s2 {\n  left: 16.6666666667%;\n}\n.row .col.offset-s3 {\n  margin-left: 25%;\n}\n.row .col.pull-s3 {\n  right: 25%;\n}\n.row .col.push-s3 {\n  left: 25%;\n}\n.row .col.offset-s4 {\n  margin-left: 33.3333333333%;\n}\n.row .col.pull-s4 {\n  right: 33.3333333333%;\n}\n.row .col.push-s4 {\n  left: 33.3333333333%;\n}\n.row .col.offset-s5 {\n  margin-left: 41.6666666667%;\n}\n.row .col.pull-s5 {\n  right: 41.6666666667%;\n}\n.row .col.push-s5 {\n  left: 41.6666666667%;\n}\n.row .col.offset-s6 {\n  margin-left: 50%;\n}\n.row .col.pull-s6 {\n  right: 50%;\n}\n.row .col.push-s6 {\n  left: 50%;\n}\n.row .col.offset-s7 {\n  margin-left: 58.3333333333%;\n}\n.row .col.pull-s7 {\n  right: 58.3333333333%;\n}\n.row .col.push-s7 {\n  left: 58.3333333333%;\n}\n.row .col.offset-s8 {\n  margin-left: 66.6666666667%;\n}\n.row .col.pull-s8 {\n  right: 66.6666666667%;\n}\n.row .col.push-s8 {\n  left: 66.6666666667%;\n}\n.row .col.offset-s9 {\n  margin-left: 75%;\n}\n.row .col.pull-s9 {\n  right: 75%;\n}\n.row .col.push-s9 {\n  left: 75%;\n}\n.row .col.offset-s10 {\n  margin-left: 83.3333333333%;\n}\n.row .col.pull-s10 {\n  right: 83.3333333333%;\n}\n.row .col.push-s10 {\n  left: 83.3333333333%;\n}\n.row .col.offset-s11 {\n  margin-left: 91.6666666667%;\n}\n.row .col.pull-s11 {\n  right: 91.6666666667%;\n}\n.row .col.push-s11 {\n  left: 91.6666666667%;\n}\n.row .col.offset-s12 {\n  margin-left: 100%;\n}\n.row .col.pull-s12 {\n  right: 100%;\n}\n.row .col.push-s12 {\n  left: 100%;\n}\n@media only screen and (min-width: 601px) {\n  .row .col.m1 {\n    width: 8.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m2 {\n    width: 16.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m3 {\n    width: 25%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m4 {\n    width: 33.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m5 {\n    width: 41.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m6 {\n    width: 50%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m7 {\n    width: 58.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m8 {\n    width: 66.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m9 {\n    width: 75%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m10 {\n    width: 83.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m11 {\n    width: 91.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m12 {\n    width: 100%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.offset-m1 {\n    margin-left: 8.3333333333%;\n  }\n  .row .col.pull-m1 {\n    right: 8.3333333333%;\n  }\n  .row .col.push-m1 {\n    left: 8.3333333333%;\n  }\n  .row .col.offset-m2 {\n    margin-left: 16.6666666667%;\n  }\n  .row .col.pull-m2 {\n    right: 16.6666666667%;\n  }\n  .row .col.push-m2 {\n    left: 16.6666666667%;\n  }\n  .row .col.offset-m3 {\n    margin-left: 25%;\n  }\n  .row .col.pull-m3 {\n    right: 25%;\n  }\n  .row .col.push-m3 {\n    left: 25%;\n  }\n  .row .col.offset-m4 {\n    margin-left: 33.3333333333%;\n  }\n  .row .col.pull-m4 {\n    right: 33.3333333333%;\n  }\n  .row .col.push-m4 {\n    left: 33.3333333333%;\n  }\n  .row .col.offset-m5 {\n    margin-left: 41.6666666667%;\n  }\n  .row .col.pull-m5 {\n    right: 41.6666666667%;\n  }\n  .row .col.push-m5 {\n    left: 41.6666666667%;\n  }\n  .row .col.offset-m6 {\n    margin-left: 50%;\n  }\n  .row .col.pull-m6 {\n    right: 50%;\n  }\n  .row .col.push-m6 {\n    left: 50%;\n  }\n  .row .col.offset-m7 {\n    margin-left: 58.3333333333%;\n  }\n  .row .col.pull-m7 {\n    right: 58.3333333333%;\n  }\n  .row .col.push-m7 {\n    left: 58.3333333333%;\n  }\n  .row .col.offset-m8 {\n    margin-left: 66.6666666667%;\n  }\n  .row .col.pull-m8 {\n    right: 66.6666666667%;\n  }\n  .row .col.push-m8 {\n    left: 66.6666666667%;\n  }\n  .row .col.offset-m9 {\n    margin-left: 75%;\n  }\n  .row .col.pull-m9 {\n    right: 75%;\n  }\n  .row .col.push-m9 {\n    left: 75%;\n  }\n  .row .col.offset-m10 {\n    margin-left: 83.3333333333%;\n  }\n  .row .col.pull-m10 {\n    right: 83.3333333333%;\n  }\n  .row .col.push-m10 {\n    left: 83.3333333333%;\n  }\n  .row .col.offset-m11 {\n    margin-left: 91.6666666667%;\n  }\n  .row .col.pull-m11 {\n    right: 91.6666666667%;\n  }\n  .row .col.push-m11 {\n    left: 91.6666666667%;\n  }\n  .row .col.offset-m12 {\n    margin-left: 100%;\n  }\n  .row .col.pull-m12 {\n    right: 100%;\n  }\n  .row .col.push-m12 {\n    left: 100%;\n  }\n}\n@media only screen and (min-width: 993px) {\n  .row .col.l1 {\n    width: 8.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l2 {\n    width: 16.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l3 {\n    width: 25%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l4 {\n    width: 33.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l5 {\n    width: 41.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l6 {\n    width: 50%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l7 {\n    width: 58.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l8 {\n    width: 66.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l9 {\n    width: 75%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l10 {\n    width: 83.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l11 {\n    width: 91.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l12 {\n    width: 100%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.offset-l1 {\n    margin-left: 8.3333333333%;\n  }\n  .row .col.pull-l1 {\n    right: 8.3333333333%;\n  }\n  .row .col.push-l1 {\n    left: 8.3333333333%;\n  }\n  .row .col.offset-l2 {\n    margin-left: 16.6666666667%;\n  }\n  .row .col.pull-l2 {\n    right: 16.6666666667%;\n  }\n  .row .col.push-l2 {\n    left: 16.6666666667%;\n  }\n  .row .col.offset-l3 {\n    margin-left: 25%;\n  }\n  .row .col.pull-l3 {\n    right: 25%;\n  }\n  .row .col.push-l3 {\n    left: 25%;\n  }\n  .row .col.offset-l4 {\n    margin-left: 33.3333333333%;\n  }\n  .row .col.pull-l4 {\n    right: 33.3333333333%;\n  }\n  .row .col.push-l4 {\n    left: 33.3333333333%;\n  }\n  .row .col.offset-l5 {\n    margin-left: 41.6666666667%;\n  }\n  .row .col.pull-l5 {\n    right: 41.6666666667%;\n  }\n  .row .col.push-l5 {\n    left: 41.6666666667%;\n  }\n  .row .col.offset-l6 {\n    margin-left: 50%;\n  }\n  .row .col.pull-l6 {\n    right: 50%;\n  }\n  .row .col.push-l6 {\n    left: 50%;\n  }\n  .row .col.offset-l7 {\n    margin-left: 58.3333333333%;\n  }\n  .row .col.pull-l7 {\n    right: 58.3333333333%;\n  }\n  .row .col.push-l7 {\n    left: 58.3333333333%;\n  }\n  .row .col.offset-l8 {\n    margin-left: 66.6666666667%;\n  }\n  .row .col.pull-l8 {\n    right: 66.6666666667%;\n  }\n  .row .col.push-l8 {\n    left: 66.6666666667%;\n  }\n  .row .col.offset-l9 {\n    margin-left: 75%;\n  }\n  .row .col.pull-l9 {\n    right: 75%;\n  }\n  .row .col.push-l9 {\n    left: 75%;\n  }\n  .row .col.offset-l10 {\n    margin-left: 83.3333333333%;\n  }\n  .row .col.pull-l10 {\n    right: 83.3333333333%;\n  }\n  .row .col.push-l10 {\n    left: 83.3333333333%;\n  }\n  .row .col.offset-l11 {\n    margin-left: 91.6666666667%;\n  }\n  .row .col.pull-l11 {\n    right: 91.6666666667%;\n  }\n  .row .col.push-l11 {\n    left: 91.6666666667%;\n  }\n  .row .col.offset-l12 {\n    margin-left: 100%;\n  }\n  .row .col.pull-l12 {\n    right: 100%;\n  }\n  .row .col.push-l12 {\n    left: 100%;\n  }\n}\n@media only screen and (min-width: 1201px) {\n  .row .col.xl1 {\n    width: 8.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl2 {\n    width: 16.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl3 {\n    width: 25%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl4 {\n    width: 33.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl5 {\n    width: 41.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl6 {\n    width: 50%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl7 {\n    width: 58.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl8 {\n    width: 66.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl9 {\n    width: 75%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl10 {\n    width: 83.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl11 {\n    width: 91.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.xl12 {\n    width: 100%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.offset-xl1 {\n    margin-left: 8.3333333333%;\n  }\n  .row .col.pull-xl1 {\n    right: 8.3333333333%;\n  }\n  .row .col.push-xl1 {\n    left: 8.3333333333%;\n  }\n  .row .col.offset-xl2 {\n    margin-left: 16.6666666667%;\n  }\n  .row .col.pull-xl2 {\n    right: 16.6666666667%;\n  }\n  .row .col.push-xl2 {\n    left: 16.6666666667%;\n  }\n  .row .col.offset-xl3 {\n    margin-left: 25%;\n  }\n  .row .col.pull-xl3 {\n    right: 25%;\n  }\n  .row .col.push-xl3 {\n    left: 25%;\n  }\n  .row .col.offset-xl4 {\n    margin-left: 33.3333333333%;\n  }\n  .row .col.pull-xl4 {\n    right: 33.3333333333%;\n  }\n  .row .col.push-xl4 {\n    left: 33.3333333333%;\n  }\n  .row .col.offset-xl5 {\n    margin-left: 41.6666666667%;\n  }\n  .row .col.pull-xl5 {\n    right: 41.6666666667%;\n  }\n  .row .col.push-xl5 {\n    left: 41.6666666667%;\n  }\n  .row .col.offset-xl6 {\n    margin-left: 50%;\n  }\n  .row .col.pull-xl6 {\n    right: 50%;\n  }\n  .row .col.push-xl6 {\n    left: 50%;\n  }\n  .row .col.offset-xl7 {\n    margin-left: 58.3333333333%;\n  }\n  .row .col.pull-xl7 {\n    right: 58.3333333333%;\n  }\n  .row .col.push-xl7 {\n    left: 58.3333333333%;\n  }\n  .row .col.offset-xl8 {\n    margin-left: 66.6666666667%;\n  }\n  .row .col.pull-xl8 {\n    right: 66.6666666667%;\n  }\n  .row .col.push-xl8 {\n    left: 66.6666666667%;\n  }\n  .row .col.offset-xl9 {\n    margin-left: 75%;\n  }\n  .row .col.pull-xl9 {\n    right: 75%;\n  }\n  .row .col.push-xl9 {\n    left: 75%;\n  }\n  .row .col.offset-xl10 {\n    margin-left: 83.3333333333%;\n  }\n  .row .col.pull-xl10 {\n    right: 83.3333333333%;\n  }\n  .row .col.push-xl10 {\n    left: 83.3333333333%;\n  }\n  .row .col.offset-xl11 {\n    margin-left: 91.6666666667%;\n  }\n  .row .col.pull-xl11 {\n    right: 91.6666666667%;\n  }\n  .row .col.push-xl11 {\n    left: 91.6666666667%;\n  }\n  .row .col.offset-xl12 {\n    margin-left: 100%;\n  }\n  .row .col.pull-xl12 {\n    right: 100%;\n  }\n  .row .col.push-xl12 {\n    left: 100%;\n  }\n}\nnav {\n  color: #fff;\n  background-color: #ee6e73;\n  width: 100%;\n  height: 56px;\n  line-height: 56px;\n}\nnav.nav-extended {\n  height: auto;\n}\nnav.nav-extended .nav-wrapper {\n  min-height: 56px;\n  height: auto;\n}\nnav.nav-extended .nav-content {\n  position: relative;\n  line-height: normal;\n}\nnav a {\n  color: #fff;\n}\nnav i,\nnav [class^=\"mdi-\"], nav [class*=\"mdi-\"],\nnav i.material-icons {\n  display: block;\n  font-size: 24px;\n  height: 56px;\n  line-height: 56px;\n}\nnav .nav-wrapper {\n  position: relative;\n  height: 100%;\n}\n@media only screen and (min-width: 993px) {\n  nav a.sidenav-trigger {\n    display: none;\n  }\n}\nnav .sidenav-trigger {\n  float: left;\n  position: relative;\n  z-index: 1;\n  height: 56px;\n  margin: 0 18px;\n}\nnav .sidenav-trigger i {\n  height: 56px;\n  line-height: 56px;\n}\nnav .brand-logo {\n  position: absolute;\n  color: #fff;\n  display: inline-block;\n  font-size: 2.1rem;\n  padding: 0;\n}\nnav .brand-logo.center {\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n@media only screen and (max-width: 992px) {\n  nav .brand-logo {\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n  }\n  nav .brand-logo.left, nav .brand-logo.right {\n    padding: 0;\n    -webkit-transform: none;\n            transform: none;\n  }\n  nav .brand-logo.left {\n    left: 0.5rem;\n  }\n  nav .brand-logo.right {\n    right: 0.5rem;\n    left: auto;\n  }\n}\nnav .brand-logo.right {\n  right: 0.5rem;\n  padding: 0;\n}\nnav .brand-logo i,\nnav .brand-logo [class^=\"mdi-\"], nav .brand-logo [class*=\"mdi-\"],\nnav .brand-logo i.material-icons {\n  float: left;\n  margin-right: 15px;\n}\nnav .nav-title {\n  display: inline-block;\n  font-size: 32px;\n  padding: 28px 0;\n}\nnav ul {\n  margin: 0;\n}\nnav ul li {\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  float: left;\n  padding: 0;\n}\nnav ul li.active {\n  background-color: rgba(0, 0, 0, 0.1);\n}\nnav ul a {\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  font-size: 1rem;\n  color: #fff;\n  display: block;\n  padding: 0 15px;\n  cursor: pointer;\n}\nnav ul a.btn, nav ul a.btn-large, nav ul a.btn-small, nav ul a.btn-large, nav ul a.btn-flat, nav ul a.btn-floating {\n  margin-top: -2px;\n  margin-left: 15px;\n  margin-right: 15px;\n}\nnav ul a.btn > .material-icons, nav ul a.btn-large > .material-icons, nav ul a.btn-small > .material-icons, nav ul a.btn-large > .material-icons, nav ul a.btn-flat > .material-icons, nav ul a.btn-floating > .material-icons {\n  height: inherit;\n  line-height: inherit;\n}\nnav ul a:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\nnav ul.left {\n  float: left;\n}\nnav form {\n  height: 100%;\n}\nnav .input-field {\n  margin: 0;\n  height: 100%;\n}\nnav .input-field input {\n  height: 100%;\n  font-size: 1.2rem;\n  border: none;\n  padding-left: 2rem;\n}\nnav .input-field input:focus, nav .input-field input[type=text]:valid, nav .input-field input[type=password]:valid, nav .input-field input[type=email]:valid, nav .input-field input[type=url]:valid, nav .input-field input[type=date]:valid {\n  border: none;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\nnav .input-field label {\n  top: 0;\n  left: 0;\n}\nnav .input-field label i {\n  color: rgba(255, 255, 255, 0.7);\n  -webkit-transition: color .3s;\n  transition: color .3s;\n}\nnav .input-field label.active i {\n  color: #fff;\n}\n.navbar-fixed {\n  position: relative;\n  height: 56px;\n  z-index: 997;\n}\n.navbar-fixed nav {\n  position: fixed;\n}\n@media only screen and (min-width: 601px) {\n  nav.nav-extended .nav-wrapper {\n    min-height: 64px;\n  }\n  nav, nav .nav-wrapper i, nav a.sidenav-trigger, nav a.sidenav-trigger i {\n    height: 64px;\n    line-height: 64px;\n  }\n  .navbar-fixed {\n    height: 64px;\n  }\n}\na {\n  text-decoration: none;\n}\nhtml {\n  line-height: 1.5;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;\n  font-weight: normal;\n  color: rgba(0, 0, 0, 0.87);\n}\n@media only screen and (min-width: 0) {\n  html {\n    font-size: 14px;\n  }\n}\n@media only screen and (min-width: 992px) {\n  html {\n    font-size: 14.5px;\n  }\n}\n@media only screen and (min-width: 1200px) {\n  html {\n    font-size: 15px;\n  }\n}\nh1, h2, h3, h4, h5, h6 {\n  font-weight: 400;\n  line-height: 1.3;\n}\nh1 a, h2 a, h3 a, h4 a, h5 a, h6 a {\n  font-weight: inherit;\n}\nh1 {\n  font-size: 4.2rem;\n  line-height: 110%;\n  margin: 2.8rem 0 1.68rem 0;\n}\nh2 {\n  font-size: 3.56rem;\n  line-height: 110%;\n  margin: 2.3733333333rem 0 1.424rem 0;\n}\nh3 {\n  font-size: 2.92rem;\n  line-height: 110%;\n  margin: 1.9466666667rem 0 1.168rem 0;\n}\nh4 {\n  font-size: 2.28rem;\n  line-height: 110%;\n  margin: 1.52rem 0 0.912rem 0;\n}\nh5 {\n  font-size: 1.64rem;\n  line-height: 110%;\n  margin: 1.0933333333rem 0 0.656rem 0;\n}\nh6 {\n  font-size: 1.15rem;\n  line-height: 110%;\n  margin: 0.7666666667rem 0 0.46rem 0;\n}\nem {\n  font-style: italic;\n}\nstrong {\n  font-weight: 500;\n}\nsmall {\n  font-size: 75%;\n}\n.light {\n  font-weight: 300;\n}\n.thin {\n  font-weight: 200;\n}\n@media only screen and (min-width: 360px) {\n  .flow-text {\n    font-size: 1.2rem;\n  }\n}\n@media only screen and (min-width: 390px) {\n  .flow-text {\n    font-size: 1.224rem;\n  }\n}\n@media only screen and (min-width: 420px) {\n  .flow-text {\n    font-size: 1.248rem;\n  }\n}\n@media only screen and (min-width: 450px) {\n  .flow-text {\n    font-size: 1.272rem;\n  }\n}\n@media only screen and (min-width: 480px) {\n  .flow-text {\n    font-size: 1.296rem;\n  }\n}\n@media only screen and (min-width: 510px) {\n  .flow-text {\n    font-size: 1.32rem;\n  }\n}\n@media only screen and (min-width: 540px) {\n  .flow-text {\n    font-size: 1.344rem;\n  }\n}\n@media only screen and (min-width: 570px) {\n  .flow-text {\n    font-size: 1.368rem;\n  }\n}\n@media only screen and (min-width: 600px) {\n  .flow-text {\n    font-size: 1.392rem;\n  }\n}\n@media only screen and (min-width: 630px) {\n  .flow-text {\n    font-size: 1.416rem;\n  }\n}\n@media only screen and (min-width: 660px) {\n  .flow-text {\n    font-size: 1.44rem;\n  }\n}\n@media only screen and (min-width: 690px) {\n  .flow-text {\n    font-size: 1.464rem;\n  }\n}\n@media only screen and (min-width: 720px) {\n  .flow-text {\n    font-size: 1.488rem;\n  }\n}\n@media only screen and (min-width: 750px) {\n  .flow-text {\n    font-size: 1.512rem;\n  }\n}\n@media only screen and (min-width: 780px) {\n  .flow-text {\n    font-size: 1.536rem;\n  }\n}\n@media only screen and (min-width: 810px) {\n  .flow-text {\n    font-size: 1.56rem;\n  }\n}\n@media only screen and (min-width: 840px) {\n  .flow-text {\n    font-size: 1.584rem;\n  }\n}\n@media only screen and (min-width: 870px) {\n  .flow-text {\n    font-size: 1.608rem;\n  }\n}\n@media only screen and (min-width: 900px) {\n  .flow-text {\n    font-size: 1.632rem;\n  }\n}\n@media only screen and (min-width: 930px) {\n  .flow-text {\n    font-size: 1.656rem;\n  }\n}\n@media only screen and (min-width: 960px) {\n  .flow-text {\n    font-size: 1.68rem;\n  }\n}\n@media only screen and (max-width: 360px) {\n  .flow-text {\n    font-size: 1.2rem;\n  }\n}\n.scale-transition {\n  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important;\n  transition: -webkit-transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important;\n  transition: transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important;\n  transition: transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63), -webkit-transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important;\n}\n.scale-transition.scale-out {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: -webkit-transform .2s !important;\n  transition: -webkit-transform .2s !important;\n  transition: transform .2s !important;\n  transition: transform .2s, -webkit-transform .2s !important;\n}\n.scale-transition.scale-in {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.card-panel {\n  -webkit-transition: -webkit-box-shadow .25s;\n  transition: -webkit-box-shadow .25s;\n  transition: box-shadow .25s;\n  transition: box-shadow .25s, -webkit-box-shadow .25s;\n  padding: 24px;\n  margin: 0.5rem 0 1rem 0;\n  border-radius: 2px;\n  background-color: #fff;\n}\n.card {\n  position: relative;\n  margin: 0.5rem 0 1rem 0;\n  background-color: #fff;\n  -webkit-transition: -webkit-box-shadow .25s;\n  transition: -webkit-box-shadow .25s;\n  transition: box-shadow .25s;\n  transition: box-shadow .25s, -webkit-box-shadow .25s;\n  border-radius: 2px;\n}\n.card .card-title {\n  font-size: 24px;\n  font-weight: 300;\n}\n.card .card-title.activator {\n  cursor: pointer;\n}\n.card.small, .card.medium, .card.large {\n  position: relative;\n}\n.card.small .card-image, .card.medium .card-image, .card.large .card-image {\n  max-height: 60%;\n  overflow: hidden;\n}\n.card.small .card-image + .card-content, .card.medium .card-image + .card-content, .card.large .card-image + .card-content {\n  max-height: 40%;\n}\n.card.small .card-content, .card.medium .card-content, .card.large .card-content {\n  max-height: 100%;\n  overflow: hidden;\n}\n.card.small .card-action, .card.medium .card-action, .card.large .card-action {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.card.small {\n  height: 300px;\n}\n.card.medium {\n  height: 400px;\n}\n.card.large {\n  height: 500px;\n}\n.card.horizontal {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.card.horizontal.small .card-image, .card.horizontal.medium .card-image, .card.horizontal.large .card-image {\n  height: 100%;\n  max-height: none;\n  overflow: visible;\n}\n.card.horizontal.small .card-image img, .card.horizontal.medium .card-image img, .card.horizontal.large .card-image img {\n  height: 100%;\n}\n.card.horizontal .card-image {\n  max-width: 50%;\n}\n.card.horizontal .card-image img {\n  border-radius: 2px 0 0 2px;\n  max-width: 100%;\n  width: auto;\n}\n.card.horizontal .card-stacked {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  position: relative;\n}\n.card.horizontal .card-stacked .card-content {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n.card.sticky-action .card-action {\n  z-index: 2;\n}\n.card.sticky-action .card-reveal {\n  z-index: 1;\n  padding-bottom: 64px;\n}\n.card .card-image {\n  position: relative;\n}\n.card .card-image img {\n  display: block;\n  border-radius: 2px 2px 0 0;\n  position: relative;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n}\n.card .card-image .card-title {\n  color: #fff;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  max-width: 100%;\n  padding: 24px;\n}\n.card .card-content {\n  padding: 24px;\n  border-radius: 0 0 2px 2px;\n}\n.card .card-content p {\n  margin: 0;\n}\n.card .card-content .card-title {\n  display: block;\n  line-height: 32px;\n  margin-bottom: 8px;\n}\n.card .card-content .card-title i {\n  line-height: 32px;\n}\n.card .card-action {\n  background-color: inherit;\n  border-top: 1px solid rgba(160, 160, 160, 0.2);\n  position: relative;\n  padding: 16px 24px;\n}\n.card .card-action:last-child {\n  border-radius: 0 0 2px 2px;\n}\n.card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating) {\n  color: #ffab40;\n  margin-right: 24px;\n  -webkit-transition: color .3s ease;\n  transition: color .3s ease;\n  text-transform: uppercase;\n}\n.card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating):hover {\n  color: #ffd8a6;\n}\n.card .card-reveal {\n  padding: 24px;\n  position: absolute;\n  background-color: #fff;\n  width: 100%;\n  overflow-y: auto;\n  left: 0;\n  top: 100%;\n  height: 100%;\n  z-index: 3;\n  display: none;\n}\n.card .card-reveal .card-title {\n  cursor: pointer;\n  display: block;\n}\n#toast-container {\n  display: block;\n  position: fixed;\n  z-index: 10000;\n}\n@media only screen and (max-width: 600px) {\n  #toast-container {\n    min-width: 100%;\n    bottom: 0%;\n  }\n}\n@media only screen and (min-width: 601px) and (max-width: 992px) {\n  #toast-container {\n    left: 5%;\n    bottom: 7%;\n    max-width: 90%;\n  }\n}\n@media only screen and (min-width: 993px) {\n  #toast-container {\n    top: 10%;\n    right: 7%;\n    max-width: 86%;\n  }\n}\n.toast {\n  border-radius: 2px;\n  top: 35px;\n  width: auto;\n  margin-top: 10px;\n  position: relative;\n  max-width: 100%;\n  height: auto;\n  min-height: 48px;\n  line-height: 1.5em;\n  word-break: break-all;\n  background-color: #323232;\n  padding: 10px 25px;\n  font-size: 1.1rem;\n  font-weight: 300;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  cursor: default;\n}\n.toast .toast-action {\n  color: #eeff41;\n  font-weight: 500;\n  margin-right: -25px;\n  margin-left: 3rem;\n}\n.toast.rounded {\n  border-radius: 24px;\n}\n@media only screen and (max-width: 600px) {\n  .toast {\n    width: 100%;\n    border-radius: 0;\n  }\n}\n.tabs {\n  position: relative;\n  overflow-x: auto;\n  overflow-y: hidden;\n  height: 48px;\n  width: 100%;\n  background-color: #fff;\n  margin: 0 auto;\n  white-space: nowrap;\n}\n.tabs.tabs-transparent {\n  background-color: transparent;\n}\n.tabs.tabs-transparent .tab a,\n.tabs.tabs-transparent .tab.disabled a,\n.tabs.tabs-transparent .tab.disabled a:hover {\n  color: rgba(255, 255, 255, 0.7);\n}\n.tabs.tabs-transparent .tab a:hover,\n.tabs.tabs-transparent .tab a.active {\n  color: #fff;\n}\n.tabs.tabs-transparent .indicator {\n  background-color: #fff;\n}\n.tabs.tabs-fixed-width {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.tabs.tabs-fixed-width .tab {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n.tabs .tab {\n  display: inline-block;\n  text-align: center;\n  line-height: 48px;\n  height: 48px;\n  padding: 0;\n  margin: 0;\n  text-transform: uppercase;\n}\n.tabs .tab a {\n  color: rgba(238, 110, 115, 0.7);\n  display: block;\n  width: 100%;\n  height: 100%;\n  padding: 0 24px;\n  font-size: 14px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  -webkit-transition: color .28s ease, background-color .28s ease;\n  transition: color .28s ease, background-color .28s ease;\n}\n.tabs .tab a:focus, .tabs .tab a:focus.active {\n  background-color: rgba(246, 178, 181, 0.2);\n  outline: none;\n}\n.tabs .tab a:hover, .tabs .tab a.active {\n  background-color: transparent;\n  color: #ee6e73;\n}\n.tabs .tab.disabled a,\n.tabs .tab.disabled a:hover {\n  color: rgba(238, 110, 115, 0.4);\n  cursor: default;\n}\n.tabs .indicator {\n  position: absolute;\n  bottom: 0;\n  height: 2px;\n  background-color: #f6b2b5;\n  will-change: left, right;\n}\n@media only screen and (max-width: 992px) {\n  .tabs {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .tabs .tab {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n  }\n  .tabs .tab a {\n    padding: 0 12px;\n  }\n}\n.material-tooltip {\n  padding: 10px 8px;\n  font-size: 1rem;\n  z-index: 2000;\n  background-color: transparent;\n  border-radius: 2px;\n  color: #fff;\n  min-height: 36px;\n  line-height: 120%;\n  opacity: 0;\n  position: absolute;\n  text-align: center;\n  max-width: calc(100% - 4px);\n  overflow: hidden;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  visibility: hidden;\n  background-color: #323232;\n}\n.backdrop {\n  position: absolute;\n  opacity: 0;\n  height: 7px;\n  width: 14px;\n  border-radius: 0 0 50% 50%;\n  background-color: #323232;\n  z-index: -1;\n  -webkit-transform-origin: 50% 0%;\n          transform-origin: 50% 0%;\n  visibility: hidden;\n}\n.btn, .btn-large, .btn-small,\n.btn-flat {\n  border: none;\n  border-radius: 2px;\n  display: inline-block;\n  height: 36px;\n  line-height: 36px;\n  padding: 0 16px;\n  text-transform: uppercase;\n  vertical-align: middle;\n  -webkit-tap-highlight-color: transparent;\n}\n.btn.disabled, .disabled.btn-large, .disabled.btn-small,\n.btn-floating.disabled,\n.btn-large.disabled,\n.btn-small.disabled,\n.btn-flat.disabled,\n.btn:disabled,\n.btn-large:disabled,\n.btn-small:disabled,\n.btn-floating:disabled,\n.btn-large:disabled,\n.btn-small:disabled,\n.btn-flat:disabled,\n.btn[disabled],\n[disabled].btn-large,\n[disabled].btn-small,\n.btn-floating[disabled],\n.btn-large[disabled],\n.btn-small[disabled],\n.btn-flat[disabled] {\n  pointer-events: none;\n  background-color: #DFDFDF !important;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #9F9F9F !important;\n  cursor: default;\n}\n.btn.disabled:hover, .disabled.btn-large:hover, .disabled.btn-small:hover,\n.btn-floating.disabled:hover,\n.btn-large.disabled:hover,\n.btn-small.disabled:hover,\n.btn-flat.disabled:hover,\n.btn:disabled:hover,\n.btn-large:disabled:hover,\n.btn-small:disabled:hover,\n.btn-floating:disabled:hover,\n.btn-large:disabled:hover,\n.btn-small:disabled:hover,\n.btn-flat:disabled:hover,\n.btn[disabled]:hover,\n[disabled].btn-large:hover,\n[disabled].btn-small:hover,\n.btn-floating[disabled]:hover,\n.btn-large[disabled]:hover,\n.btn-small[disabled]:hover,\n.btn-flat[disabled]:hover {\n  background-color: #DFDFDF !important;\n  color: #9F9F9F !important;\n}\n.btn, .btn-large, .btn-small,\n.btn-floating,\n.btn-large,\n.btn-small,\n.btn-flat {\n  font-size: 14px;\n  outline: 0;\n}\n.btn i, .btn-large i, .btn-small i,\n.btn-floating i,\n.btn-large i,\n.btn-small i,\n.btn-flat i {\n  font-size: 1.3rem;\n  line-height: inherit;\n}\n.btn:focus, .btn-large:focus, .btn-small:focus,\n.btn-floating:focus {\n  background-color: #1d7d74;\n}\n.btn, .btn-large, .btn-small {\n  text-decoration: none;\n  color: #fff;\n  background-color: #26a69a;\n  text-align: center;\n  letter-spacing: .5px;\n  -webkit-transition: background-color .2s ease-out;\n  transition: background-color .2s ease-out;\n  cursor: pointer;\n}\n.btn:hover, .btn-large:hover, .btn-small:hover {\n  background-color: #2bbbad;\n}\n.btn-floating {\n  display: inline-block;\n  color: #fff;\n  position: relative;\n  overflow: hidden;\n  z-index: 1;\n  width: 40px;\n  height: 40px;\n  line-height: 40px;\n  padding: 0;\n  background-color: #26a69a;\n  border-radius: 50%;\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  cursor: pointer;\n  vertical-align: middle;\n}\n.btn-floating:hover {\n  background-color: #26a69a;\n}\n.btn-floating:before {\n  border-radius: 0;\n}\n.btn-floating.btn-large {\n  width: 56px;\n  height: 56px;\n  padding: 0;\n}\n.btn-floating.btn-large.halfway-fab {\n  bottom: -28px;\n}\n.btn-floating.btn-large i {\n  line-height: 56px;\n}\n.btn-floating.btn-small {\n  width: 32.4px;\n  height: 32.4px;\n}\n.btn-floating.btn-small.halfway-fab {\n  bottom: -16.2px;\n}\n.btn-floating.btn-small i {\n  line-height: 32.4px;\n}\n.btn-floating.halfway-fab {\n  position: absolute;\n  right: 24px;\n  bottom: -20px;\n}\n.btn-floating.halfway-fab.left {\n  right: auto;\n  left: 24px;\n}\n.btn-floating i {\n  width: inherit;\n  display: inline-block;\n  text-align: center;\n  color: #fff;\n  font-size: 1.6rem;\n  line-height: 40px;\n}\nbutton.btn-floating {\n  border: none;\n}\n.fixed-action-btn {\n  position: fixed;\n  right: 23px;\n  bottom: 23px;\n  padding-top: 15px;\n  margin-bottom: 0;\n  z-index: 997;\n}\n.fixed-action-btn.active ul {\n  visibility: visible;\n}\n.fixed-action-btn.direction-left, .fixed-action-btn.direction-right {\n  padding: 0 0 0 15px;\n}\n.fixed-action-btn.direction-left ul, .fixed-action-btn.direction-right ul {\n  text-align: right;\n  right: 64px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  height: 100%;\n  left: auto;\n  /*width 100% only goes to width of button container */\n  width: 500px;\n}\n.fixed-action-btn.direction-left ul li, .fixed-action-btn.direction-right ul li {\n  display: inline-block;\n  margin: 7.5px 15px 0 0;\n}\n.fixed-action-btn.direction-right {\n  padding: 0 15px 0 0;\n}\n.fixed-action-btn.direction-right ul {\n  text-align: left;\n  direction: rtl;\n  left: 64px;\n  right: auto;\n}\n.fixed-action-btn.direction-right ul li {\n  margin: 7.5px 0 0 15px;\n}\n.fixed-action-btn.direction-bottom {\n  padding: 0 0 15px 0;\n}\n.fixed-action-btn.direction-bottom ul {\n  top: 64px;\n  bottom: auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: reverse;\n      -ms-flex-direction: column-reverse;\n          flex-direction: column-reverse;\n}\n.fixed-action-btn.direction-bottom ul li {\n  margin: 15px 0 0 0;\n}\n.fixed-action-btn.toolbar {\n  padding: 0;\n  height: 56px;\n}\n.fixed-action-btn.toolbar.active > a i {\n  opacity: 0;\n}\n.fixed-action-btn.toolbar ul {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  top: 0;\n  bottom: 0;\n  z-index: 1;\n}\n.fixed-action-btn.toolbar ul li {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: inline-block;\n  margin: 0;\n  height: 100%;\n  -webkit-transition: none;\n  transition: none;\n}\n.fixed-action-btn.toolbar ul li a {\n  display: block;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #fff;\n  line-height: 56px;\n  z-index: 1;\n}\n.fixed-action-btn.toolbar ul li a i {\n  line-height: inherit;\n}\n.fixed-action-btn ul {\n  left: 0;\n  right: 0;\n  text-align: center;\n  position: absolute;\n  bottom: 64px;\n  margin: 0;\n  visibility: hidden;\n}\n.fixed-action-btn ul li {\n  margin-bottom: 15px;\n}\n.fixed-action-btn ul a.btn-floating {\n  opacity: 0;\n}\n.fixed-action-btn .fab-backdrop {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  width: 40px;\n  height: 40px;\n  background-color: #26a69a;\n  border-radius: 50%;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n.btn-flat {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  background-color: transparent;\n  color: #343434;\n  cursor: pointer;\n  -webkit-transition: background-color .2s;\n  transition: background-color .2s;\n}\n.btn-flat:focus, .btn-flat:hover {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.btn-flat:focus {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.btn-flat.disabled {\n  background-color: transparent !important;\n  color: #b3b2b2 !important;\n  cursor: default;\n}\n.btn-large {\n  height: 54px;\n  line-height: 54px;\n  font-size: 15px;\n  padding: 0 28px;\n}\n.btn-large i {\n  font-size: 1.6rem;\n}\n.btn-small {\n  height: 32.4px;\n  line-height: 32.4px;\n  font-size: 13px;\n}\n.btn-small i {\n  font-size: 1.2rem;\n}\n.btn-block {\n  display: block;\n}\n.dropdown-content {\n  background-color: #fff;\n  margin: 0;\n  display: none;\n  min-width: 100px;\n  overflow-y: auto;\n  opacity: 0;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 9999;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n.dropdown-content:focus {\n  outline: 0;\n}\n.dropdown-content li {\n  clear: both;\n  color: rgba(0, 0, 0, 0.87);\n  cursor: pointer;\n  min-height: 50px;\n  line-height: 1.5rem;\n  width: 100%;\n  text-align: left;\n}\n.dropdown-content li:hover, .dropdown-content li.active {\n  background-color: #eee;\n}\n.dropdown-content li:focus {\n  outline: none;\n  background-color: #dadada;\n}\n.dropdown-content li.divider {\n  min-height: 0;\n  height: 1px;\n}\n.dropdown-content li > a, .dropdown-content li > span {\n  font-size: 16px;\n  color: #26a69a;\n  display: block;\n  line-height: 22px;\n  padding: 14px 16px;\n}\n.dropdown-content li > span > label {\n  top: 1px;\n  left: 0;\n  height: 18px;\n}\n.dropdown-content li > a > i {\n  height: inherit;\n  line-height: inherit;\n  float: left;\n  margin: 0 24px 0 0;\n  width: 24px;\n}\n.input-field.col .dropdown-content [type=\"checkbox\"] + label {\n  top: 1px;\n  left: 0;\n  height: 18px;\n  -webkit-transform: none;\n          transform: none;\n}\n/*!\n * Waves v0.6.0\n * http://fian.my.id/Waves\n *\n * Copyright 2014 Alfiana E. Sibuea and other contributors\n * Released under the MIT license\n * https://github.com/fians/Waves/blob/master/LICENSE\n */\n.waves-effect {\n  position: relative;\n  cursor: pointer;\n  display: inline-block;\n  overflow: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  vertical-align: middle;\n  z-index: 1;\n  -webkit-transition: .3s ease-out;\n  transition: .3s ease-out;\n}\n.waves-effect .waves-ripple {\n  position: absolute;\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  margin-top: -10px;\n  margin-left: -10px;\n  opacity: 0;\n  background: rgba(0, 0, 0, 0.2);\n  -webkit-transition: all 0.7s ease-out;\n  transition: all 0.7s ease-out;\n  -webkit-transition-property: opacity, -webkit-transform;\n  transition-property: opacity, -webkit-transform;\n  transition-property: transform, opacity;\n  transition-property: transform, opacity, -webkit-transform;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  pointer-events: none;\n}\n.waves-effect.waves-light .waves-ripple {\n  background-color: rgba(255, 255, 255, 0.45);\n}\n.waves-effect.waves-red .waves-ripple {\n  background-color: rgba(244, 67, 54, 0.7);\n}\n.waves-effect.waves-yellow .waves-ripple {\n  background-color: rgba(255, 235, 59, 0.7);\n}\n.waves-effect.waves-orange .waves-ripple {\n  background-color: rgba(255, 152, 0, 0.7);\n}\n.waves-effect.waves-purple .waves-ripple {\n  background-color: rgba(156, 39, 176, 0.7);\n}\n.waves-effect.waves-green .waves-ripple {\n  background-color: rgba(76, 175, 80, 0.7);\n}\n.waves-effect.waves-teal .waves-ripple {\n  background-color: rgba(0, 150, 136, 0.7);\n}\n.waves-effect input[type=\"button\"], .waves-effect input[type=\"reset\"], .waves-effect input[type=\"submit\"] {\n  border: 0;\n  font-style: normal;\n  font-size: inherit;\n  text-transform: inherit;\n  background: none;\n}\n.waves-effect img {\n  position: relative;\n  z-index: -1;\n}\n.waves-notransition {\n  -webkit-transition: none !important;\n  transition: none !important;\n}\n.waves-circle {\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);\n}\n.waves-input-wrapper {\n  border-radius: 0.2em;\n  vertical-align: bottom;\n}\n.waves-input-wrapper .waves-button-input {\n  position: relative;\n  top: 0;\n  left: 0;\n  z-index: 1;\n}\n.waves-circle {\n  text-align: center;\n  width: 2.5em;\n  height: 2.5em;\n  line-height: 2.5em;\n  border-radius: 50%;\n  -webkit-mask-image: none;\n}\n.waves-block {\n  display: block;\n}\n/* Firefox Bug: link not triggered */\n.waves-effect .waves-ripple {\n  z-index: -1;\n}\n.modal {\n  display: none;\n  position: fixed;\n  left: 0;\n  right: 0;\n  background-color: #fafafa;\n  padding: 0;\n  max-height: 70%;\n  width: 55%;\n  margin: auto;\n  overflow-y: auto;\n  border-radius: 2px;\n  will-change: top, opacity;\n}\n@media only screen and (max-width: 992px) {\n  .modal {\n    width: 80%;\n  }\n}\n.modal h1, .modal h2, .modal h3, .modal h4 {\n  margin-top: 0;\n}\n.modal .modal-content {\n  padding: 24px;\n}\n.modal .modal-close {\n  cursor: pointer;\n}\n.modal .modal-footer {\n  border-radius: 0 0 2px 2px;\n  background-color: #fafafa;\n  padding: 4px 6px;\n  height: 56px;\n  width: 100%;\n  text-align: right;\n}\n.modal .modal-footer .btn, .modal .modal-footer .btn-large, .modal .modal-footer .btn-small, .modal .modal-footer .btn-flat {\n  margin: 6px 0;\n}\n.modal-overlay {\n  position: fixed;\n  z-index: 999;\n  top: -25%;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 125%;\n  width: 100%;\n  background: #000;\n  display: none;\n  will-change: opacity;\n}\n.modal.modal-fixed-footer {\n  padding: 0;\n  height: 70%;\n}\n.modal.modal-fixed-footer .modal-content {\n  position: absolute;\n  height: calc(100% - 56px);\n  max-height: 100%;\n  width: 100%;\n  overflow-y: auto;\n}\n.modal.modal-fixed-footer .modal-footer {\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  position: absolute;\n  bottom: 0;\n}\n.modal.bottom-sheet {\n  top: auto;\n  bottom: -100%;\n  margin: 0;\n  width: 100%;\n  max-height: 45%;\n  border-radius: 0;\n  will-change: bottom, opacity;\n}\n.collapsible {\n  border-top: 1px solid #ddd;\n  border-right: 1px solid #ddd;\n  border-left: 1px solid #ddd;\n  margin: 0.5rem 0 1rem 0;\n}\n.collapsible-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  line-height: 1.5;\n  padding: 1rem;\n  background-color: #fff;\n  border-bottom: 1px solid #ddd;\n}\n.collapsible-header i {\n  width: 2rem;\n  font-size: 1.6rem;\n  display: inline-block;\n  text-align: center;\n  margin-right: 1rem;\n}\n.collapsible-body {\n  display: none;\n  border-bottom: 1px solid #ddd;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 2rem;\n}\n.sidenav .collapsible,\n.sidenav.fixed .collapsible {\n  border: none;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.sidenav .collapsible li,\n.sidenav.fixed .collapsible li {\n  padding: 0;\n}\n.sidenav .collapsible-header,\n.sidenav.fixed .collapsible-header {\n  background-color: transparent;\n  border: none;\n  line-height: inherit;\n  height: inherit;\n  padding: 0 16px;\n}\n.sidenav .collapsible-header:hover,\n.sidenav.fixed .collapsible-header:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.sidenav .collapsible-header i,\n.sidenav.fixed .collapsible-header i {\n  line-height: inherit;\n}\n.sidenav .collapsible-body,\n.sidenav.fixed .collapsible-body {\n  border: 0;\n  background-color: #fff;\n}\n.sidenav .collapsible-body li a,\n.sidenav.fixed .collapsible-body li a {\n  padding: 0 23.5px 0 31px;\n}\n.collapsible.popout {\n  border: none;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.collapsible.popout > li {\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n  margin: 0 24px;\n  -webkit-transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n.collapsible.popout > li.active {\n  -webkit-box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n          box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n  margin: 16px 0;\n}\n.chip {\n  display: inline-block;\n  height: 32px;\n  font-size: 13px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.6);\n  line-height: 32px;\n  padding: 0 12px;\n  border-radius: 16px;\n  background-color: #e4e4e4;\n  margin-bottom: 5px;\n  margin-right: 5px;\n}\n.chip:focus {\n  outline: none;\n  background-color: #26a69a;\n  color: #fff;\n}\n.chip > img {\n  float: left;\n  margin: 0 8px 0 -12px;\n  height: 32px;\n  width: 32px;\n  border-radius: 50%;\n}\n.chip .close {\n  cursor: pointer;\n  float: right;\n  font-size: 16px;\n  line-height: 32px;\n  padding-left: 8px;\n}\n.chips {\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  margin: 0 0 8px 0;\n  min-height: 45px;\n  outline: none;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n}\n.chips.focus {\n  border-bottom: 1px solid #26a69a;\n  -webkit-box-shadow: 0 1px 0 0 #26a69a;\n          box-shadow: 0 1px 0 0 #26a69a;\n}\n.chips:hover {\n  cursor: text;\n}\n.chips .input {\n  background: none;\n  border: 0;\n  color: rgba(0, 0, 0, 0.6);\n  display: inline-block;\n  font-size: 16px;\n  height: 3rem;\n  line-height: 32px;\n  outline: 0;\n  margin: 0;\n  padding: 0 !important;\n  width: 120px !important;\n}\n.chips .input:focus {\n  border: 0 !important;\n  -webkit-box-shadow: none !important;\n          box-shadow: none !important;\n}\n.chips .autocomplete-content {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.prefix ~ .chips {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem);\n}\n.chips:empty ~ label {\n  font-size: 0.8rem;\n  -webkit-transform: translateY(-140%);\n          transform: translateY(-140%);\n}\n.materialboxed {\n  display: block;\n  cursor: -webkit-zoom-in;\n  cursor: zoom-in;\n  position: relative;\n  -webkit-transition: opacity .4s;\n  transition: opacity .4s;\n  -webkit-backface-visibility: hidden;\n}\n.materialboxed:hover:not(.active) {\n  opacity: .8;\n}\n.materialboxed.active {\n  cursor: -webkit-zoom-out;\n  cursor: zoom-out;\n}\n#materialbox-overlay {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: #292929;\n  z-index: 1000;\n  will-change: opacity;\n}\n.materialbox-caption {\n  position: fixed;\n  display: none;\n  color: #fff;\n  line-height: 50px;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  text-align: center;\n  padding: 0% 15%;\n  height: 50px;\n  z-index: 1000;\n  -webkit-font-smoothing: antialiased;\n}\nselect:focus {\n  outline: 1px solid #c9f3ef;\n}\nbutton:focus {\n  outline: none;\n  background-color: #2ab7a9;\n}\nlabel {\n  font-size: 0.8rem;\n  color: #9e9e9e;\n}\n/* Text Inputs + Textarea\n   ========================================================================== */\n/* Style Placeholders */\n::-webkit-input-placeholder {\n  color: #d1d1d1;\n}\n:-ms-input-placeholder {\n  color: #d1d1d1;\n}\n::-ms-input-placeholder {\n  color: #d1d1d1;\n}\n::placeholder {\n  color: #d1d1d1;\n}\n/* Text inputs */\ninput:not([type]),\ninput[type=text]:not(.browser-default),\ninput[type=password]:not(.browser-default),\ninput[type=email]:not(.browser-default),\ninput[type=url]:not(.browser-default),\ninput[type=time]:not(.browser-default),\ninput[type=date]:not(.browser-default),\ninput[type=datetime]:not(.browser-default),\ninput[type=datetime-local]:not(.browser-default),\ninput[type=tel]:not(.browser-default),\ninput[type=number]:not(.browser-default),\ninput[type=search]:not(.browser-default),\ntextarea.materialize-textarea {\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  border-radius: 0;\n  outline: none;\n  height: 3rem;\n  width: 100%;\n  font-size: 16px;\n  margin: 0 0 8px 0;\n  padding: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  -webkit-transition: border .3s, -webkit-box-shadow .3s;\n  transition: border .3s, -webkit-box-shadow .3s;\n  transition: box-shadow .3s, border .3s;\n  transition: box-shadow .3s, border .3s, -webkit-box-shadow .3s;\n}\ninput:not([type]):disabled, input:not([type])[readonly=\"readonly\"],\ninput[type=text]:not(.browser-default):disabled,\ninput[type=text]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=password]:not(.browser-default):disabled,\ninput[type=password]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=email]:not(.browser-default):disabled,\ninput[type=email]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=url]:not(.browser-default):disabled,\ninput[type=url]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=time]:not(.browser-default):disabled,\ninput[type=time]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=date]:not(.browser-default):disabled,\ninput[type=date]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=datetime]:not(.browser-default):disabled,\ninput[type=datetime]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=datetime-local]:not(.browser-default):disabled,\ninput[type=datetime-local]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=tel]:not(.browser-default):disabled,\ninput[type=tel]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=number]:not(.browser-default):disabled,\ninput[type=number]:not(.browser-default)[readonly=\"readonly\"],\ninput[type=search]:not(.browser-default):disabled,\ninput[type=search]:not(.browser-default)[readonly=\"readonly\"],\ntextarea.materialize-textarea:disabled,\ntextarea.materialize-textarea[readonly=\"readonly\"] {\n  color: rgba(0, 0, 0, 0.42);\n  border-bottom: 1px dotted rgba(0, 0, 0, 0.42);\n}\ninput:not([type]):disabled + label,\ninput:not([type])[readonly=\"readonly\"] + label,\ninput[type=text]:not(.browser-default):disabled + label,\ninput[type=text]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=password]:not(.browser-default):disabled + label,\ninput[type=password]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=email]:not(.browser-default):disabled + label,\ninput[type=email]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=url]:not(.browser-default):disabled + label,\ninput[type=url]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=time]:not(.browser-default):disabled + label,\ninput[type=time]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=date]:not(.browser-default):disabled + label,\ninput[type=date]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=datetime]:not(.browser-default):disabled + label,\ninput[type=datetime]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=datetime-local]:not(.browser-default):disabled + label,\ninput[type=datetime-local]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=tel]:not(.browser-default):disabled + label,\ninput[type=tel]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=number]:not(.browser-default):disabled + label,\ninput[type=number]:not(.browser-default)[readonly=\"readonly\"] + label,\ninput[type=search]:not(.browser-default):disabled + label,\ninput[type=search]:not(.browser-default)[readonly=\"readonly\"] + label,\ntextarea.materialize-textarea:disabled + label,\ntextarea.materialize-textarea[readonly=\"readonly\"] + label {\n  color: rgba(0, 0, 0, 0.42);\n}\ninput:not([type]):focus:not([readonly]),\ninput[type=text]:not(.browser-default):focus:not([readonly]),\ninput[type=password]:not(.browser-default):focus:not([readonly]),\ninput[type=email]:not(.browser-default):focus:not([readonly]),\ninput[type=url]:not(.browser-default):focus:not([readonly]),\ninput[type=time]:not(.browser-default):focus:not([readonly]),\ninput[type=date]:not(.browser-default):focus:not([readonly]),\ninput[type=datetime]:not(.browser-default):focus:not([readonly]),\ninput[type=datetime-local]:not(.browser-default):focus:not([readonly]),\ninput[type=tel]:not(.browser-default):focus:not([readonly]),\ninput[type=number]:not(.browser-default):focus:not([readonly]),\ninput[type=search]:not(.browser-default):focus:not([readonly]),\ntextarea.materialize-textarea:focus:not([readonly]) {\n  border-bottom: 1px solid #26a69a;\n  -webkit-box-shadow: 0 1px 0 0 #26a69a;\n          box-shadow: 0 1px 0 0 #26a69a;\n}\ninput:not([type]):focus:not([readonly]) + label,\ninput[type=text]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=password]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=email]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=url]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=time]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=date]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=datetime]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=datetime-local]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=tel]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=number]:not(.browser-default):focus:not([readonly]) + label,\ninput[type=search]:not(.browser-default):focus:not([readonly]) + label,\ntextarea.materialize-textarea:focus:not([readonly]) + label {\n  color: #26a69a;\n}\ninput:not([type]):focus.valid ~ label,\ninput[type=text]:not(.browser-default):focus.valid ~ label,\ninput[type=password]:not(.browser-default):focus.valid ~ label,\ninput[type=email]:not(.browser-default):focus.valid ~ label,\ninput[type=url]:not(.browser-default):focus.valid ~ label,\ninput[type=time]:not(.browser-default):focus.valid ~ label,\ninput[type=date]:not(.browser-default):focus.valid ~ label,\ninput[type=datetime]:not(.browser-default):focus.valid ~ label,\ninput[type=datetime-local]:not(.browser-default):focus.valid ~ label,\ninput[type=tel]:not(.browser-default):focus.valid ~ label,\ninput[type=number]:not(.browser-default):focus.valid ~ label,\ninput[type=search]:not(.browser-default):focus.valid ~ label,\ntextarea.materialize-textarea:focus.valid ~ label {\n  color: #4CAF50;\n}\ninput:not([type]):focus.invalid ~ label,\ninput[type=text]:not(.browser-default):focus.invalid ~ label,\ninput[type=password]:not(.browser-default):focus.invalid ~ label,\ninput[type=email]:not(.browser-default):focus.invalid ~ label,\ninput[type=url]:not(.browser-default):focus.invalid ~ label,\ninput[type=time]:not(.browser-default):focus.invalid ~ label,\ninput[type=date]:not(.browser-default):focus.invalid ~ label,\ninput[type=datetime]:not(.browser-default):focus.invalid ~ label,\ninput[type=datetime-local]:not(.browser-default):focus.invalid ~ label,\ninput[type=tel]:not(.browser-default):focus.invalid ~ label,\ninput[type=number]:not(.browser-default):focus.invalid ~ label,\ninput[type=search]:not(.browser-default):focus.invalid ~ label,\ntextarea.materialize-textarea:focus.invalid ~ label {\n  color: #F44336;\n}\ninput:not([type]).validate + label,\ninput[type=text]:not(.browser-default).validate + label,\ninput[type=password]:not(.browser-default).validate + label,\ninput[type=email]:not(.browser-default).validate + label,\ninput[type=url]:not(.browser-default).validate + label,\ninput[type=time]:not(.browser-default).validate + label,\ninput[type=date]:not(.browser-default).validate + label,\ninput[type=datetime]:not(.browser-default).validate + label,\ninput[type=datetime-local]:not(.browser-default).validate + label,\ninput[type=tel]:not(.browser-default).validate + label,\ninput[type=number]:not(.browser-default).validate + label,\ninput[type=search]:not(.browser-default).validate + label,\ntextarea.materialize-textarea.validate + label {\n  width: 100%;\n}\n/* Validation Sass Placeholders */\ninput.valid:not([type]), input.valid:not([type]):focus,\ninput[type=text].valid:not(.browser-default),\ninput[type=text].valid:not(.browser-default):focus,\ninput[type=password].valid:not(.browser-default),\ninput[type=password].valid:not(.browser-default):focus,\ninput[type=email].valid:not(.browser-default),\ninput[type=email].valid:not(.browser-default):focus,\ninput[type=url].valid:not(.browser-default),\ninput[type=url].valid:not(.browser-default):focus,\ninput[type=time].valid:not(.browser-default),\ninput[type=time].valid:not(.browser-default):focus,\ninput[type=date].valid:not(.browser-default),\ninput[type=date].valid:not(.browser-default):focus,\ninput[type=datetime].valid:not(.browser-default),\ninput[type=datetime].valid:not(.browser-default):focus,\ninput[type=datetime-local].valid:not(.browser-default),\ninput[type=datetime-local].valid:not(.browser-default):focus,\ninput[type=tel].valid:not(.browser-default),\ninput[type=tel].valid:not(.browser-default):focus,\ninput[type=number].valid:not(.browser-default),\ninput[type=number].valid:not(.browser-default):focus,\ninput[type=search].valid:not(.browser-default),\ninput[type=search].valid:not(.browser-default):focus,\ntextarea.materialize-textarea.valid,\ntextarea.materialize-textarea.valid:focus, .select-wrapper.valid > input.select-dropdown {\n  border-bottom: 1px solid #4CAF50;\n  -webkit-box-shadow: 0 1px 0 0 #4CAF50;\n          box-shadow: 0 1px 0 0 #4CAF50;\n}\ninput.invalid:not([type]), input.invalid:not([type]):focus,\ninput[type=text].invalid:not(.browser-default),\ninput[type=text].invalid:not(.browser-default):focus,\ninput[type=password].invalid:not(.browser-default),\ninput[type=password].invalid:not(.browser-default):focus,\ninput[type=email].invalid:not(.browser-default),\ninput[type=email].invalid:not(.browser-default):focus,\ninput[type=url].invalid:not(.browser-default),\ninput[type=url].invalid:not(.browser-default):focus,\ninput[type=time].invalid:not(.browser-default),\ninput[type=time].invalid:not(.browser-default):focus,\ninput[type=date].invalid:not(.browser-default),\ninput[type=date].invalid:not(.browser-default):focus,\ninput[type=datetime].invalid:not(.browser-default),\ninput[type=datetime].invalid:not(.browser-default):focus,\ninput[type=datetime-local].invalid:not(.browser-default),\ninput[type=datetime-local].invalid:not(.browser-default):focus,\ninput[type=tel].invalid:not(.browser-default),\ninput[type=tel].invalid:not(.browser-default):focus,\ninput[type=number].invalid:not(.browser-default),\ninput[type=number].invalid:not(.browser-default):focus,\ninput[type=search].invalid:not(.browser-default),\ninput[type=search].invalid:not(.browser-default):focus,\ntextarea.materialize-textarea.invalid,\ntextarea.materialize-textarea.invalid:focus, .select-wrapper.invalid > input.select-dropdown,\n.select-wrapper.invalid > input.select-dropdown:focus {\n  border-bottom: 1px solid #F44336;\n  -webkit-box-shadow: 0 1px 0 0 #F44336;\n          box-shadow: 0 1px 0 0 #F44336;\n}\ninput:not([type]).valid ~ .helper-text[data-success],\ninput:not([type]):focus.valid ~ .helper-text[data-success],\ninput:not([type]).invalid ~ .helper-text[data-error],\ninput:not([type]):focus.invalid ~ .helper-text[data-error],\ninput[type=text]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=text]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=text]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=text]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=password]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=password]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=password]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=password]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=email]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=email]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=email]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=email]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=url]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=url]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=url]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=url]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=time]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=time]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=time]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=time]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=date]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=date]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=date]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=date]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=datetime]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=datetime]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=datetime]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=datetime]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=datetime-local]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=datetime-local]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=datetime-local]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=datetime-local]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=tel]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=tel]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=tel]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=tel]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=number]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=number]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=number]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=number]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=search]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=search]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=search]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=search]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ntextarea.materialize-textarea.valid ~ .helper-text[data-success],\ntextarea.materialize-textarea:focus.valid ~ .helper-text[data-success],\ntextarea.materialize-textarea.invalid ~ .helper-text[data-error],\ntextarea.materialize-textarea:focus.invalid ~ .helper-text[data-error], .select-wrapper.valid .helper-text[data-success],\n.select-wrapper.invalid ~ .helper-text[data-error] {\n  color: transparent;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  pointer-events: none;\n}\ninput:not([type]).valid ~ .helper-text:after,\ninput:not([type]):focus.valid ~ .helper-text:after,\ninput[type=text]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=text]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=password]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=password]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=email]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=email]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=url]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=url]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=time]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=time]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=date]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=date]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=number]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=number]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=search]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=search]:not(.browser-default):focus.valid ~ .helper-text:after,\ntextarea.materialize-textarea.valid ~ .helper-text:after,\ntextarea.materialize-textarea:focus.valid ~ .helper-text:after, .select-wrapper.valid ~ .helper-text:after {\n  content: attr(data-success);\n  color: #4CAF50;\n}\ninput:not([type]).invalid ~ .helper-text:after,\ninput:not([type]):focus.invalid ~ .helper-text:after,\ninput[type=text]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=text]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=password]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=password]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=email]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=email]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=url]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=url]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=time]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=time]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=date]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=date]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=number]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=number]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=search]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=search]:not(.browser-default):focus.invalid ~ .helper-text:after,\ntextarea.materialize-textarea.invalid ~ .helper-text:after,\ntextarea.materialize-textarea:focus.invalid ~ .helper-text:after, .select-wrapper.invalid ~ .helper-text:after {\n  content: attr(data-error);\n  color: #F44336;\n}\ninput:not([type]) + label:after,\ninput[type=text]:not(.browser-default) + label:after,\ninput[type=password]:not(.browser-default) + label:after,\ninput[type=email]:not(.browser-default) + label:after,\ninput[type=url]:not(.browser-default) + label:after,\ninput[type=time]:not(.browser-default) + label:after,\ninput[type=date]:not(.browser-default) + label:after,\ninput[type=datetime]:not(.browser-default) + label:after,\ninput[type=datetime-local]:not(.browser-default) + label:after,\ninput[type=tel]:not(.browser-default) + label:after,\ninput[type=number]:not(.browser-default) + label:after,\ninput[type=search]:not(.browser-default) + label:after,\ntextarea.materialize-textarea + label:after, .select-wrapper + label:after {\n  display: block;\n  content: \"\";\n  position: absolute;\n  top: 100%;\n  left: 0;\n  opacity: 0;\n  -webkit-transition: .2s opacity ease-out, .2s color ease-out;\n  transition: .2s opacity ease-out, .2s color ease-out;\n}\n.input-field {\n  position: relative;\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n}\n.input-field.inline {\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 5px;\n}\n.input-field.inline input,\n.input-field.inline .select-dropdown {\n  margin-bottom: 1rem;\n}\n.input-field.col label {\n  left: 0.75rem;\n}\n.input-field.col .prefix ~ label,\n.input-field.col .prefix ~ .validate ~ label {\n  width: calc(100% - 3rem - 1.5rem);\n}\n.input-field > label {\n  color: #9e9e9e;\n  position: absolute;\n  top: 0;\n  left: 0;\n  font-size: 1rem;\n  cursor: text;\n  -webkit-transition: color .2s ease-out, -webkit-transform .2s ease-out;\n  transition: color .2s ease-out, -webkit-transform .2s ease-out;\n  transition: transform .2s ease-out, color .2s ease-out;\n  transition: transform .2s ease-out, color .2s ease-out, -webkit-transform .2s ease-out;\n  -webkit-transform-origin: 0% 100%;\n          transform-origin: 0% 100%;\n  text-align: initial;\n  -webkit-transform: translateY(12px);\n          transform: translateY(12px);\n}\n.input-field > label:not(.label-icon).active {\n  -webkit-transform: translateY(-14px) scale(0.8);\n          transform: translateY(-14px) scale(0.8);\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n.input-field > input[type=date]:not(.browser-default) + label,\n.input-field > input[type=time]:not(.browser-default) + label {\n  -webkit-transform: translateY(-14px) scale(0.8);\n          transform: translateY(-14px) scale(0.8);\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n}\n.input-field .helper-text {\n  position: relative;\n  min-height: 18px;\n  display: block;\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.54);\n}\n.input-field .helper-text::after {\n  opacity: 1;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.input-field .prefix {\n  position: absolute;\n  width: 3rem;\n  font-size: 2rem;\n  -webkit-transition: color .2s;\n  transition: color .2s;\n  top: 0.5rem;\n}\n.input-field .prefix.active {\n  color: #26a69a;\n}\n.input-field .prefix ~ input,\n.input-field .prefix ~ textarea,\n.input-field .prefix ~ label,\n.input-field .prefix ~ .validate ~ label,\n.input-field .prefix ~ .helper-text,\n.input-field .prefix ~ .autocomplete-content {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem);\n}\n.input-field .prefix ~ label {\n  margin-left: 3rem;\n}\n@media only screen and (max-width: 992px) {\n  .input-field .prefix ~ input {\n    width: 86%;\n    width: calc(100% - 3rem);\n  }\n}\n@media only screen and (max-width: 600px) {\n  .input-field .prefix ~ input {\n    width: 80%;\n    width: calc(100% - 3rem);\n  }\n}\n/* Search Field */\n.input-field input[type=search] {\n  display: block;\n  line-height: inherit;\n  -webkit-transition: .3s background-color;\n  transition: .3s background-color;\n}\n.nav-wrapper .input-field input[type=search] {\n  height: inherit;\n  padding-left: 4rem;\n  width: calc(100% - 4rem);\n  border: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.input-field input[type=search]:focus:not(.browser-default) {\n  background-color: #fff;\n  border: 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  color: #444;\n}\n.input-field input[type=search]:focus:not(.browser-default) + label i,\n.input-field input[type=search]:focus:not(.browser-default) ~ .mdi-navigation-close,\n.input-field input[type=search]:focus:not(.browser-default) ~ .material-icons {\n  color: #444;\n}\n.input-field input[type=search] + .label-icon {\n  -webkit-transform: none;\n          transform: none;\n  left: 1rem;\n}\n.input-field input[type=search] ~ .mdi-navigation-close,\n.input-field input[type=search] ~ .material-icons {\n  position: absolute;\n  top: 0;\n  right: 1rem;\n  color: transparent;\n  cursor: pointer;\n  font-size: 2rem;\n  -webkit-transition: .3s color;\n  transition: .3s color;\n}\n/* Textarea */\ntextarea {\n  width: 100%;\n  height: 3rem;\n  background-color: transparent;\n}\ntextarea.materialize-textarea {\n  line-height: normal;\n  overflow-y: hidden;\n  /* prevents scroll bar flash */\n  padding: .8rem 0 .8rem 0;\n  /* prevents text jump on Enter keypress */\n  resize: none;\n  min-height: 3rem;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.hiddendiv {\n  visibility: hidden;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  /* future version of deprecated 'word-wrap' */\n  padding-top: 1.2rem;\n  /* prevents text jump on Enter keypress */\n  position: absolute;\n  top: 0;\n  z-index: -1;\n}\n/* Autocomplete */\n.autocomplete-content li .highlight {\n  color: #444;\n}\n.autocomplete-content li img {\n  height: 40px;\n  width: 40px;\n  margin: 5px 15px;\n}\n/* Character Counter */\n.character-counter {\n  min-height: 18px;\n}\n/* Radio Buttons\n   ========================================================================== */\n[type=\"radio\"]:not(:checked),\n[type=\"radio\"]:checked {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n[type=\"radio\"]:not(:checked) + span,\n[type=\"radio\"]:checked + span {\n  position: relative;\n  padding-left: 35px;\n  cursor: pointer;\n  display: inline-block;\n  height: 25px;\n  line-height: 25px;\n  font-size: 1rem;\n  -webkit-transition: .28s ease;\n  transition: .28s ease;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n[type=\"radio\"] + span:before,\n[type=\"radio\"] + span:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  margin: 4px;\n  width: 16px;\n  height: 16px;\n  z-index: 0;\n  -webkit-transition: .28s ease;\n  transition: .28s ease;\n}\n/* Unchecked styles */\n[type=\"radio\"]:not(:checked) + span:before,\n[type=\"radio\"]:not(:checked) + span:after,\n[type=\"radio\"]:checked + span:before,\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:before,\n[type=\"radio\"].with-gap:checked + span:after {\n  border-radius: 50%;\n}\n[type=\"radio\"]:not(:checked) + span:before,\n[type=\"radio\"]:not(:checked) + span:after {\n  border: 2px solid #5a5a5a;\n}\n[type=\"radio\"]:not(:checked) + span:after {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n/* Checked styles */\n[type=\"radio\"]:checked + span:before {\n  border: 2px solid transparent;\n}\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:before,\n[type=\"radio\"].with-gap:checked + span:after {\n  border: 2px solid #26a69a;\n}\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:after {\n  background-color: #26a69a;\n}\n[type=\"radio\"]:checked + span:after {\n  -webkit-transform: scale(1.02);\n          transform: scale(1.02);\n}\n/* Radio With gap */\n[type=\"radio\"].with-gap:checked + span:after {\n  -webkit-transform: scale(0.5);\n          transform: scale(0.5);\n}\n/* Focused styles */\n[type=\"radio\"].tabbed:focus + span:before {\n  -webkit-box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n          box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n}\n/* Disabled Radio With gap */\n[type=\"radio\"].with-gap:disabled:checked + span:before {\n  border: 2px solid rgba(0, 0, 0, 0.42);\n}\n[type=\"radio\"].with-gap:disabled:checked + span:after {\n  border: none;\n  background-color: rgba(0, 0, 0, 0.42);\n}\n/* Disabled style */\n[type=\"radio\"]:disabled:not(:checked) + span:before,\n[type=\"radio\"]:disabled:checked + span:before {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.42);\n}\n[type=\"radio\"]:disabled + span {\n  color: rgba(0, 0, 0, 0.42);\n}\n[type=\"radio\"]:disabled:not(:checked) + span:before {\n  border-color: rgba(0, 0, 0, 0.42);\n}\n[type=\"radio\"]:disabled:checked + span:after {\n  background-color: rgba(0, 0, 0, 0.42);\n  border-color: #949494;\n}\n/* Checkboxes\n   ========================================================================== */\n/* Remove default checkbox */\n[type=\"checkbox\"]:not(:checked),\n[type=\"checkbox\"]:checked {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n[type=\"checkbox\"] {\n  /* checkbox aspect */\n}\n[type=\"checkbox\"] + span:not(.lever) {\n  position: relative;\n  padding-left: 35px;\n  cursor: pointer;\n  display: inline-block;\n  height: 25px;\n  line-height: 25px;\n  font-size: 1rem;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n[type=\"checkbox\"] + span:not(.lever):before,\n[type=\"checkbox\"]:not(.filled-in) + span:not(.lever):after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 18px;\n  height: 18px;\n  z-index: 0;\n  border: 2px solid #5a5a5a;\n  border-radius: 1px;\n  margin-top: 3px;\n  -webkit-transition: .2s;\n  transition: .2s;\n}\n[type=\"checkbox\"]:not(.filled-in) + span:not(.lever):after {\n  border: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n[type=\"checkbox\"]:not(:checked):disabled + span:not(.lever):before {\n  border: none;\n  background-color: rgba(0, 0, 0, 0.42);\n}\n[type=\"checkbox\"].tabbed:focus + span:not(.lever):after {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  border: 0;\n  border-radius: 50%;\n  -webkit-box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n          box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n  background-color: rgba(0, 0, 0, 0.1);\n}\n[type=\"checkbox\"]:checked + span:not(.lever):before {\n  top: -4px;\n  left: -5px;\n  width: 12px;\n  height: 22px;\n  border-top: 2px solid transparent;\n  border-left: 2px solid transparent;\n  border-right: 2px solid #26a69a;\n  border-bottom: 2px solid #26a69a;\n  -webkit-transform: rotate(40deg);\n          transform: rotate(40deg);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transform-origin: 100% 100%;\n          transform-origin: 100% 100%;\n}\n[type=\"checkbox\"]:checked:disabled + span:before {\n  border-right: 2px solid rgba(0, 0, 0, 0.42);\n  border-bottom: 2px solid rgba(0, 0, 0, 0.42);\n}\n/* Indeterminate checkbox */\n[type=\"checkbox\"]:indeterminate + span:not(.lever):before {\n  top: -11px;\n  left: -12px;\n  width: 10px;\n  height: 22px;\n  border-top: none;\n  border-left: none;\n  border-right: 2px solid #26a69a;\n  border-bottom: none;\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transform-origin: 100% 100%;\n          transform-origin: 100% 100%;\n}\n[type=\"checkbox\"]:indeterminate:disabled + span:not(.lever):before {\n  border-right: 2px solid rgba(0, 0, 0, 0.42);\n  background-color: transparent;\n}\n[type=\"checkbox\"].filled-in + span:not(.lever):after {\n  border-radius: 2px;\n}\n[type=\"checkbox\"].filled-in + span:not(.lever):before,\n[type=\"checkbox\"].filled-in + span:not(.lever):after {\n  content: '';\n  left: 0;\n  position: absolute;\n  /* .1s delay is for check animation */\n  -webkit-transition: border .25s, background-color .25s, width .20s .1s, height .20s .1s, top .20s .1s, left .20s .1s;\n  transition: border .25s, background-color .25s, width .20s .1s, height .20s .1s, top .20s .1s, left .20s .1s;\n  z-index: 1;\n}\n[type=\"checkbox\"].filled-in:not(:checked) + span:not(.lever):before {\n  width: 0;\n  height: 0;\n  border: 3px solid transparent;\n  left: 6px;\n  top: 10px;\n  -webkit-transform: rotateZ(37deg);\n          transform: rotateZ(37deg);\n  -webkit-transform-origin: 100% 100%;\n          transform-origin: 100% 100%;\n}\n[type=\"checkbox\"].filled-in:not(:checked) + span:not(.lever):after {\n  height: 20px;\n  width: 20px;\n  background-color: transparent;\n  border: 2px solid #5a5a5a;\n  top: 0px;\n  z-index: 0;\n}\n[type=\"checkbox\"].filled-in:checked + span:not(.lever):before {\n  top: 0;\n  left: 1px;\n  width: 8px;\n  height: 13px;\n  border-top: 2px solid transparent;\n  border-left: 2px solid transparent;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  -webkit-transform: rotateZ(37deg);\n          transform: rotateZ(37deg);\n  -webkit-transform-origin: 100% 100%;\n          transform-origin: 100% 100%;\n}\n[type=\"checkbox\"].filled-in:checked + span:not(.lever):after {\n  top: 0;\n  width: 20px;\n  height: 20px;\n  border: 2px solid #26a69a;\n  background-color: #26a69a;\n  z-index: 0;\n}\n[type=\"checkbox\"].filled-in.tabbed:focus + span:not(.lever):after {\n  border-radius: 2px;\n  border-color: #5a5a5a;\n  background-color: rgba(0, 0, 0, 0.1);\n}\n[type=\"checkbox\"].filled-in.tabbed:checked:focus + span:not(.lever):after {\n  border-radius: 2px;\n  background-color: #26a69a;\n  border-color: #26a69a;\n}\n[type=\"checkbox\"].filled-in:disabled:not(:checked) + span:not(.lever):before {\n  background-color: transparent;\n  border: 2px solid transparent;\n}\n[type=\"checkbox\"].filled-in:disabled:not(:checked) + span:not(.lever):after {\n  border-color: transparent;\n  background-color: #949494;\n}\n[type=\"checkbox\"].filled-in:disabled:checked + span:not(.lever):before {\n  background-color: transparent;\n}\n[type=\"checkbox\"].filled-in:disabled:checked + span:not(.lever):after {\n  background-color: #949494;\n  border-color: #949494;\n}\n/* Switch\n   ========================================================================== */\n.switch,\n.switch * {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.switch label {\n  cursor: pointer;\n}\n.switch label input[type=checkbox] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.switch label input[type=checkbox]:checked + .lever {\n  background-color: #84c7c1;\n}\n.switch label input[type=checkbox]:checked + .lever:before, .switch label input[type=checkbox]:checked + .lever:after {\n  left: 18px;\n}\n.switch label input[type=checkbox]:checked + .lever:after {\n  background-color: #26a69a;\n}\n.switch label .lever {\n  content: \"\";\n  display: inline-block;\n  position: relative;\n  width: 36px;\n  height: 14px;\n  background-color: rgba(0, 0, 0, 0.38);\n  border-radius: 15px;\n  margin-right: 10px;\n  -webkit-transition: background 0.3s ease;\n  transition: background 0.3s ease;\n  vertical-align: middle;\n  margin: 0 16px;\n}\n.switch label .lever:before, .switch label .lever:after {\n  content: \"\";\n  position: absolute;\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  left: 0;\n  top: -3px;\n  -webkit-transition: left 0.3s ease, background .3s ease, -webkit-box-shadow 0.1s ease, -webkit-transform .1s ease;\n  transition: left 0.3s ease, background .3s ease, -webkit-box-shadow 0.1s ease, -webkit-transform .1s ease;\n  transition: left 0.3s ease, background .3s ease, box-shadow 0.1s ease, transform .1s ease;\n  transition: left 0.3s ease, background .3s ease, box-shadow 0.1s ease, transform .1s ease, -webkit-box-shadow 0.1s ease, -webkit-transform .1s ease;\n}\n.switch label .lever:before {\n  background-color: rgba(38, 166, 154, 0.15);\n}\n.switch label .lever:after {\n  background-color: #F1F1F1;\n  -webkit-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n          box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\ninput[type=checkbox]:checked:not(:disabled) ~ .lever:active::before,\ninput[type=checkbox]:checked:not(:disabled).tabbed:focus ~ .lever::before {\n  -webkit-transform: scale(2.4);\n          transform: scale(2.4);\n  background-color: rgba(38, 166, 154, 0.15);\n}\ninput[type=checkbox]:not(:disabled) ~ .lever:active:before,\ninput[type=checkbox]:not(:disabled).tabbed:focus ~ .lever::before {\n  -webkit-transform: scale(2.4);\n          transform: scale(2.4);\n  background-color: rgba(0, 0, 0, 0.08);\n}\n.switch input[type=checkbox][disabled] + .lever {\n  cursor: default;\n  background-color: rgba(0, 0, 0, 0.12);\n}\n.switch label input[type=checkbox][disabled] + .lever:after,\n.switch label input[type=checkbox][disabled]:checked + .lever:after {\n  background-color: #949494;\n}\n/* Select Field\n   ========================================================================== */\nselect {\n  display: none;\n}\nselect.browser-default {\n  display: block;\n}\nselect {\n  background-color: rgba(255, 255, 255, 0.9);\n  width: 100%;\n  padding: 5px;\n  border: 1px solid #f2f2f2;\n  border-radius: 2px;\n  height: 3rem;\n}\n.select-label {\n  position: absolute;\n}\n.select-wrapper {\n  position: relative;\n}\n.select-wrapper.valid + label,\n.select-wrapper.invalid + label {\n  width: 100%;\n  pointer-events: none;\n}\n.select-wrapper input.select-dropdown {\n  position: relative;\n  cursor: pointer;\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  outline: none;\n  height: 3rem;\n  line-height: 3rem;\n  width: 100%;\n  font-size: 16px;\n  margin: 0 0 8px 0;\n  padding: 0;\n  display: block;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  z-index: 1;\n}\n.select-wrapper input.select-dropdown:focus {\n  border-bottom: 1px solid #26a69a;\n}\n.select-wrapper .caret {\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  margin: auto 0;\n  z-index: 0;\n  fill: rgba(0, 0, 0, 0.87);\n}\n.select-wrapper + label {\n  position: absolute;\n  top: -26px;\n  font-size: 0.8rem;\n}\nselect:disabled {\n  color: rgba(0, 0, 0, 0.42);\n}\n.select-wrapper.disabled + label {\n  color: rgba(0, 0, 0, 0.42);\n}\n.select-wrapper.disabled .caret {\n  fill: rgba(0, 0, 0, 0.42);\n}\n.select-wrapper input.select-dropdown:disabled {\n  color: rgba(0, 0, 0, 0.42);\n  cursor: default;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.select-wrapper i {\n  color: rgba(0, 0, 0, 0.3);\n}\n.select-dropdown li.disabled,\n.select-dropdown li.disabled > span,\n.select-dropdown li.optgroup {\n  color: rgba(0, 0, 0, 0.3);\n  background-color: transparent;\n}\n.select-dropdown.dropdown-content li:hover {\n  background-color: rgba(0, 0, 0, 0.08);\n}\n.select-dropdown.dropdown-content li.selected {\n  background-color: rgba(0, 0, 0, 0.03);\n}\n.select-dropdown.dropdown-content li:focus {\n  background-color: rgba(0, 0, 0, 0.08);\n}\n.prefix ~ .select-wrapper {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem);\n}\n.prefix ~ label {\n  margin-left: 3rem;\n}\n.select-dropdown li img {\n  height: 40px;\n  width: 40px;\n  margin: 5px 15px;\n  float: right;\n}\n.select-dropdown li.optgroup {\n  border-top: 1px solid #eee;\n}\n.select-dropdown li.optgroup.selected > span {\n  color: rgba(0, 0, 0, 0.7);\n}\n.select-dropdown li.optgroup > span {\n  color: rgba(0, 0, 0, 0.4);\n}\n.select-dropdown li.optgroup ~ li.optgroup-option {\n  padding-left: 1rem;\n}\n/* File Input\n   ========================================================================== */\n.file-field {\n  position: relative;\n}\n.file-field .file-path-wrapper {\n  overflow: hidden;\n  padding-left: 10px;\n}\n.file-field input.file-path {\n  width: 100%;\n}\n.file-field .btn, .file-field .btn-large, .file-field .btn-small {\n  float: left;\n  height: 3rem;\n  line-height: 3rem;\n}\n.file-field span {\n  cursor: pointer;\n}\n.file-field input[type=file] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  font-size: 20px;\n  cursor: pointer;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.file-field input[type=file]::-webkit-file-upload-button {\n  display: none;\n}\n/* Range\n   ========================================================================== */\n.range-field {\n  position: relative;\n}\ninput[type=range],\ninput[type=range] + .thumb {\n  cursor: pointer;\n}\ninput[type=range] {\n  position: relative;\n  background-color: transparent;\n  border: none;\n  outline: none;\n  width: 100%;\n  margin: 15px 0;\n  padding: 0;\n}\ninput[type=range]:focus {\n  outline: none;\n}\ninput[type=range] + .thumb {\n  position: absolute;\n  top: 10px;\n  left: 0;\n  border: none;\n  height: 0;\n  width: 0;\n  border-radius: 50%;\n  background-color: #26a69a;\n  margin-left: 7px;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n}\ninput[type=range] + .thumb .value {\n  display: block;\n  width: 30px;\n  text-align: center;\n  color: #26a69a;\n  font-size: 0;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\ninput[type=range] + .thumb.active {\n  border-radius: 50% 50% 50% 0;\n}\ninput[type=range] + .thumb.active .value {\n  color: #fff;\n  margin-left: -1px;\n  margin-top: 8px;\n  font-size: 10px;\n}\ninput[type=range] {\n  -webkit-appearance: none;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n  height: 3px;\n  background: #c2c0c2;\n  border: none;\n}\ninput[type=range]::-webkit-slider-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #26a69a;\n  -webkit-transition: -webkit-box-shadow .3s;\n  transition: -webkit-box-shadow .3s;\n  transition: box-shadow .3s;\n  transition: box-shadow .3s, -webkit-box-shadow .3s;\n  -webkit-appearance: none;\n  background-color: #26a69a;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n  margin: -5px 0 0 0;\n}\ninput[type=range].focused:focus:not(.active)::-webkit-slider-thumb {\n  -webkit-box-shadow: 0 0 0 10px rgba(38, 166, 154, 0.26);\n          box-shadow: 0 0 0 10px rgba(38, 166, 154, 0.26);\n}\ninput[type=range] {\n  /* fix for FF unable to apply focus style bug  */\n  border: 1px solid white;\n  /*required for proper track sizing in FF*/\n}\ninput[type=range]::-moz-range-track {\n  height: 3px;\n  background: #c2c0c2;\n  border: none;\n}\ninput[type=range]::-moz-focus-inner {\n  border: 0;\n}\ninput[type=range]::-moz-range-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #26a69a;\n  -webkit-transition: -webkit-box-shadow .3s;\n  transition: -webkit-box-shadow .3s;\n  transition: box-shadow .3s;\n  transition: box-shadow .3s, -webkit-box-shadow .3s;\n  margin-top: -5px;\n}\ninput[type=range]:-moz-focusring {\n  outline: 1px solid #fff;\n  outline-offset: -1px;\n}\ninput[type=range].focused:focus:not(.active)::-moz-range-thumb {\n  box-shadow: 0 0 0 10px rgba(38, 166, 154, 0.26);\n}\ninput[type=range]::-ms-track {\n  height: 3px;\n  background: transparent;\n  border-color: transparent;\n  border-width: 6px 0;\n  /*remove default tick marks*/\n  color: transparent;\n}\ninput[type=range]::-ms-fill-lower {\n  background: #777;\n}\ninput[type=range]::-ms-fill-upper {\n  background: #ddd;\n}\ninput[type=range]::-ms-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #26a69a;\n  -webkit-transition: -webkit-box-shadow .3s;\n  transition: -webkit-box-shadow .3s;\n  transition: box-shadow .3s;\n  transition: box-shadow .3s, -webkit-box-shadow .3s;\n}\ninput[type=range].focused:focus:not(.active)::-ms-thumb {\n  box-shadow: 0 0 0 10px rgba(38, 166, 154, 0.26);\n}\n/***************\n    Nav List\n***************/\n.table-of-contents.fixed {\n  position: fixed;\n}\n.table-of-contents li {\n  padding: 2px 0;\n}\n.table-of-contents a {\n  display: inline-block;\n  font-weight: 300;\n  color: #757575;\n  padding-left: 16px;\n  height: 1.5rem;\n  line-height: 1.5rem;\n  letter-spacing: .4;\n  display: inline-block;\n}\n.table-of-contents a:hover {\n  color: #a8a8a8;\n  padding-left: 15px;\n  border-left: 1px solid #ee6e73;\n}\n.table-of-contents a.active {\n  font-weight: 500;\n  padding-left: 14px;\n  border-left: 2px solid #ee6e73;\n}\n.sidenav {\n  position: fixed;\n  width: 300px;\n  left: 0;\n  top: 0;\n  margin: 0;\n  -webkit-transform: translateX(-100%);\n          transform: translateX(-100%);\n  height: 100%;\n  height: calc(100% + 60px);\n  height: -moz-calc(100%);\n  padding-bottom: 60px;\n  background-color: #fff;\n  z-index: 999;\n  overflow-y: auto;\n  will-change: transform;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transform: translateX(-105%);\n          transform: translateX(-105%);\n}\n.sidenav.right-aligned {\n  right: 0;\n  -webkit-transform: translateX(105%);\n          transform: translateX(105%);\n  left: auto;\n  -webkit-transform: translateX(100%);\n          transform: translateX(100%);\n}\n.sidenav .collapsible {\n  margin: 0;\n}\n.sidenav li {\n  float: none;\n  line-height: 48px;\n}\n.sidenav li.active {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.sidenav li > a {\n  color: rgba(0, 0, 0, 0.87);\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  height: 48px;\n  line-height: 48px;\n  padding: 0 32px;\n}\n.sidenav li > a:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.sidenav li > a.btn, .sidenav li > a.btn-large, .sidenav li > a.btn-small, .sidenav li > a.btn-large, .sidenav li > a.btn-flat, .sidenav li > a.btn-floating {\n  margin: 10px 15px;\n}\n.sidenav li > a.btn, .sidenav li > a.btn-large, .sidenav li > a.btn-small, .sidenav li > a.btn-large, .sidenav li > a.btn-floating {\n  color: #fff;\n}\n.sidenav li > a.btn-flat {\n  color: #343434;\n}\n.sidenav li > a.btn:hover, .sidenav li > a.btn-large:hover, .sidenav li > a.btn-small:hover, .sidenav li > a.btn-large:hover {\n  background-color: #2bbbad;\n}\n.sidenav li > a.btn-floating:hover {\n  background-color: #26a69a;\n}\n.sidenav li > a > i,\n.sidenav li > a > [class^=\"mdi-\"], .sidenav li > a li > a > [class*=\"mdi-\"],\n.sidenav li > a > i.material-icons {\n  float: left;\n  height: 48px;\n  line-height: 48px;\n  margin: 0 32px 0 0;\n  width: 24px;\n  color: rgba(0, 0, 0, 0.54);\n}\n.sidenav .divider {\n  margin: 8px 0 0 0;\n}\n.sidenav .subheader {\n  cursor: initial;\n  pointer-events: none;\n  color: rgba(0, 0, 0, 0.54);\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 48px;\n}\n.sidenav .subheader:hover {\n  background-color: transparent;\n}\n.sidenav .user-view {\n  position: relative;\n  padding: 32px 32px 0;\n  margin-bottom: 8px;\n}\n.sidenav .user-view > a {\n  height: auto;\n  padding: 0;\n}\n.sidenav .user-view > a:hover {\n  background-color: transparent;\n}\n.sidenav .user-view .background {\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: -1;\n}\n.sidenav .user-view .circle, .sidenav .user-view .name, .sidenav .user-view .email {\n  display: block;\n}\n.sidenav .user-view .circle {\n  height: 64px;\n  width: 64px;\n}\n.sidenav .user-view .name,\n.sidenav .user-view .email {\n  font-size: 14px;\n  line-height: 24px;\n}\n.sidenav .user-view .name {\n  margin-top: 16px;\n  font-weight: 500;\n}\n.sidenav .user-view .email {\n  padding-bottom: 16px;\n  font-weight: 400;\n}\n.drag-target {\n  height: 100%;\n  width: 10px;\n  position: fixed;\n  top: 0;\n  z-index: 998;\n}\n.drag-target.right-aligned {\n  right: 0;\n}\n.sidenav.sidenav-fixed {\n  left: 0;\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n  position: fixed;\n}\n.sidenav.sidenav-fixed.right-aligned {\n  right: 0;\n  left: auto;\n}\n@media only screen and (max-width: 992px) {\n  .sidenav.sidenav-fixed {\n    -webkit-transform: translateX(-105%);\n            transform: translateX(-105%);\n  }\n  .sidenav.sidenav-fixed.right-aligned {\n    -webkit-transform: translateX(105%);\n            transform: translateX(105%);\n  }\n  .sidenav > a {\n    padding: 0 16px;\n  }\n  .sidenav .user-view {\n    padding: 16px 16px 0;\n  }\n}\n.sidenav .collapsible-body > ul:not(.collapsible) > li.active,\n.sidenav.sidenav-fixed .collapsible-body > ul:not(.collapsible) > li.active {\n  background-color: #ee6e73;\n}\n.sidenav .collapsible-body > ul:not(.collapsible) > li.active a,\n.sidenav.sidenav-fixed .collapsible-body > ul:not(.collapsible) > li.active a {\n  color: #fff;\n}\n.sidenav .collapsible-body {\n  padding: 0;\n}\n.sidenav-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  opacity: 0;\n  height: 120vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 997;\n  display: none;\n}\n/*\n    @license\n    Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n    Code distributed by Google as part of the polymer project is also\n    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n/**************************/\n/* STYLES FOR THE SPINNER */\n/**************************/\n/*\n * Constants:\n *      STROKEWIDTH = 3px\n *      ARCSIZE     = 270 degrees (amount of circle the arc takes up)\n *      ARCTIME     = 1333ms (time it takes to expand and contract arc)\n *      ARCSTARTROT = 216 degrees (how much the start location of the arc\n *                                should rotate each time, 216 gives us a\n *                                5 pointed star shape (it's 360/5 * 3).\n *                                For a 7 pointed star, we might do\n *                                360/7 * 3 = 154.286)\n *      CONTAINERWIDTH = 28px\n *      SHRINK_TIME = 400ms\n */\n.preloader-wrapper {\n  display: inline-block;\n  position: relative;\n  width: 50px;\n  height: 50px;\n}\n.preloader-wrapper.small {\n  width: 36px;\n  height: 36px;\n}\n.preloader-wrapper.big {\n  width: 64px;\n  height: 64px;\n}\n.preloader-wrapper.active {\n  /* duration: 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */\n  -webkit-animation: container-rotate 1568ms linear infinite;\n  animation: container-rotate 1568ms linear infinite;\n}\n@-webkit-keyframes container-rotate {\n  to {\n    -webkit-transform: rotate(360deg);\n  }\n}\n@keyframes container-rotate {\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.spinner-layer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  border-color: #26a69a;\n}\n.spinner-blue,\n.spinner-blue-only {\n  border-color: #4285f4;\n}\n.spinner-red,\n.spinner-red-only {\n  border-color: #db4437;\n}\n.spinner-yellow,\n.spinner-yellow-only {\n  border-color: #f4b400;\n}\n.spinner-green,\n.spinner-green-only {\n  border-color: #0f9d58;\n}\n/**\n * IMPORTANT NOTE ABOUT CSS ANIMATION PROPERTIES (keanulee):\n *\n * iOS Safari (tested on iOS 8.1) does not handle animation-delay very well - it doesn't\n * guarantee that the animation will start _exactly_ after that value. So we avoid using\n * animation-delay and instead set custom keyframes for each color (as redundant as it\n * seems).\n *\n * We write out each animation in full (instead of separating animation-name,\n * animation-duration, etc.) because under the polyfill, Safari does not recognize those\n * specific properties properly, treats them as -webkit-animation, and overrides the\n * other animation rules. See https://github.com/Polymer/platform/issues/53.\n */\n.active .spinner-layer.spinner-blue {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n.active .spinner-layer.spinner-red {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n.active .spinner-layer.spinner-yellow {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n.active .spinner-layer.spinner-green {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n.active .spinner-layer,\n.active .spinner-layer.spinner-blue-only,\n.active .spinner-layer.spinner-red-only,\n.active .spinner-layer.spinner-yellow-only,\n.active .spinner-layer.spinner-green-only {\n  /* durations: 4 * ARCTIME */\n  opacity: 1;\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n@-webkit-keyframes fill-unfill-rotate {\n  12.5% {\n    -webkit-transform: rotate(135deg);\n  }\n  /* 0.5 * ARCSIZE */\n  25% {\n    -webkit-transform: rotate(270deg);\n  }\n  /* 1   * ARCSIZE */\n  37.5% {\n    -webkit-transform: rotate(405deg);\n  }\n  /* 1.5 * ARCSIZE */\n  50% {\n    -webkit-transform: rotate(540deg);\n  }\n  /* 2   * ARCSIZE */\n  62.5% {\n    -webkit-transform: rotate(675deg);\n  }\n  /* 2.5 * ARCSIZE */\n  75% {\n    -webkit-transform: rotate(810deg);\n  }\n  /* 3   * ARCSIZE */\n  87.5% {\n    -webkit-transform: rotate(945deg);\n  }\n  /* 3.5 * ARCSIZE */\n  to {\n    -webkit-transform: rotate(1080deg);\n  }\n  /* 4   * ARCSIZE */\n}\n@keyframes fill-unfill-rotate {\n  12.5% {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg);\n  }\n  /* 0.5 * ARCSIZE */\n  25% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg);\n  }\n  /* 1   * ARCSIZE */\n  37.5% {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg);\n  }\n  /* 1.5 * ARCSIZE */\n  50% {\n    -webkit-transform: rotate(540deg);\n            transform: rotate(540deg);\n  }\n  /* 2   * ARCSIZE */\n  62.5% {\n    -webkit-transform: rotate(675deg);\n            transform: rotate(675deg);\n  }\n  /* 2.5 * ARCSIZE */\n  75% {\n    -webkit-transform: rotate(810deg);\n            transform: rotate(810deg);\n  }\n  /* 3   * ARCSIZE */\n  87.5% {\n    -webkit-transform: rotate(945deg);\n            transform: rotate(945deg);\n  }\n  /* 3.5 * ARCSIZE */\n  to {\n    -webkit-transform: rotate(1080deg);\n            transform: rotate(1080deg);\n  }\n  /* 4   * ARCSIZE */\n}\n@-webkit-keyframes blue-fade-in-out {\n  from {\n    opacity: 1;\n  }\n  25% {\n    opacity: 1;\n  }\n  26% {\n    opacity: 0;\n  }\n  89% {\n    opacity: 0;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes blue-fade-in-out {\n  from {\n    opacity: 1;\n  }\n  25% {\n    opacity: 1;\n  }\n  26% {\n    opacity: 0;\n  }\n  89% {\n    opacity: 0;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes red-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  15% {\n    opacity: 0;\n  }\n  25% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 1;\n  }\n  51% {\n    opacity: 0;\n  }\n}\n@keyframes red-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  15% {\n    opacity: 0;\n  }\n  25% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 1;\n  }\n  51% {\n    opacity: 0;\n  }\n}\n@-webkit-keyframes yellow-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  40% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  75% {\n    opacity: 1;\n  }\n  76% {\n    opacity: 0;\n  }\n}\n@keyframes yellow-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  40% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  75% {\n    opacity: 1;\n  }\n  76% {\n    opacity: 0;\n  }\n}\n@-webkit-keyframes green-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  65% {\n    opacity: 0;\n  }\n  75% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes green-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  65% {\n    opacity: 0;\n  }\n  75% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n/**\n * Patch the gap that appear between the two adjacent div.circle-clipper while the\n * spinner is rotating (appears on Chrome 38, Safari 7.1, and IE 11).\n */\n.gap-patch {\n  position: absolute;\n  top: 0;\n  left: 45%;\n  width: 10%;\n  height: 100%;\n  overflow: hidden;\n  border-color: inherit;\n}\n.gap-patch .circle {\n  width: 1000%;\n  left: -450%;\n}\n.circle-clipper {\n  display: inline-block;\n  position: relative;\n  width: 50%;\n  height: 100%;\n  overflow: hidden;\n  border-color: inherit;\n}\n.circle-clipper .circle {\n  width: 200%;\n  height: 100%;\n  border-width: 3px;\n  /* STROKEWIDTH */\n  border-style: solid;\n  border-color: inherit;\n  border-bottom-color: transparent !important;\n  border-radius: 50%;\n  -webkit-animation: none;\n  animation: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.circle-clipper.left .circle {\n  left: 0;\n  border-right-color: transparent !important;\n  -webkit-transform: rotate(129deg);\n  transform: rotate(129deg);\n}\n.circle-clipper.right .circle {\n  left: -100%;\n  border-left-color: transparent !important;\n  -webkit-transform: rotate(-129deg);\n  transform: rotate(-129deg);\n}\n.active .circle-clipper.left .circle {\n  /* duration: ARCTIME */\n  -webkit-animation: left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n.active .circle-clipper.right .circle {\n  /* duration: ARCTIME */\n  -webkit-animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n@-webkit-keyframes left-spin {\n  from {\n    -webkit-transform: rotate(130deg);\n  }\n  50% {\n    -webkit-transform: rotate(-5deg);\n  }\n  to {\n    -webkit-transform: rotate(130deg);\n  }\n}\n@keyframes left-spin {\n  from {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg);\n  }\n  50% {\n    -webkit-transform: rotate(-5deg);\n            transform: rotate(-5deg);\n  }\n  to {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg);\n  }\n}\n@-webkit-keyframes right-spin {\n  from {\n    -webkit-transform: rotate(-130deg);\n  }\n  50% {\n    -webkit-transform: rotate(5deg);\n  }\n  to {\n    -webkit-transform: rotate(-130deg);\n  }\n}\n@keyframes right-spin {\n  from {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg);\n  }\n  50% {\n    -webkit-transform: rotate(5deg);\n            transform: rotate(5deg);\n  }\n  to {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg);\n  }\n}\n#spinnerContainer.cooldown {\n  /* duration: SHRINK_TIME */\n  -webkit-animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);\n  animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@-webkit-keyframes fade-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@keyframes fade-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n.slider {\n  position: relative;\n  height: 400px;\n  width: 100%;\n}\n.slider.fullscreen {\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.slider.fullscreen ul.slides {\n  height: 100%;\n}\n.slider.fullscreen ul.indicators {\n  z-index: 2;\n  bottom: 30px;\n}\n.slider .slides {\n  background-color: #9e9e9e;\n  margin: 0;\n  height: 400px;\n}\n.slider .slides li {\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  width: 100%;\n  height: inherit;\n  overflow: hidden;\n}\n.slider .slides li img {\n  height: 100%;\n  width: 100%;\n  background-size: cover;\n  background-position: center;\n}\n.slider .slides li .caption {\n  color: #fff;\n  position: absolute;\n  top: 15%;\n  left: 15%;\n  width: 70%;\n  opacity: 0;\n}\n.slider .slides li .caption p {\n  color: #e0e0e0;\n}\n.slider .slides li.active {\n  z-index: 2;\n}\n.slider .indicators {\n  position: absolute;\n  text-align: center;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n}\n.slider .indicators .indicator-item {\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n  height: 16px;\n  width: 16px;\n  margin: 0 12px;\n  background-color: #e0e0e0;\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  border-radius: 50%;\n}\n.slider .indicators .indicator-item.active {\n  background-color: #4CAF50;\n}\n.carousel {\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 400px;\n  -webkit-perspective: 500px;\n          perspective: 500px;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  -webkit-transform-origin: 0% 50%;\n          transform-origin: 0% 50%;\n}\n.carousel.carousel-slider {\n  top: 0;\n  left: 0;\n}\n.carousel.carousel-slider .carousel-fixed-item {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 20px;\n  z-index: 1;\n}\n.carousel.carousel-slider .carousel-fixed-item.with-indicators {\n  bottom: 68px;\n}\n.carousel.carousel-slider .carousel-item {\n  width: 100%;\n  height: 100%;\n  min-height: 400px;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.carousel.carousel-slider .carousel-item h2 {\n  font-size: 24px;\n  font-weight: 500;\n  line-height: 32px;\n}\n.carousel.carousel-slider .carousel-item p {\n  font-size: 15px;\n}\n.carousel .carousel-item {\n  visibility: hidden;\n  width: 200px;\n  height: 200px;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.carousel .carousel-item > img {\n  width: 100%;\n}\n.carousel .indicators {\n  position: absolute;\n  text-align: center;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n}\n.carousel .indicators .indicator-item {\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n  height: 8px;\n  width: 8px;\n  margin: 24px 4px;\n  background-color: rgba(255, 255, 255, 0.5);\n  -webkit-transition: background-color .3s;\n  transition: background-color .3s;\n  border-radius: 50%;\n}\n.carousel .indicators .indicator-item.active {\n  background-color: #fff;\n}\n.carousel.scrolling .carousel-item .materialboxed,\n.carousel .carousel-item:not(.active) .materialboxed {\n  pointer-events: none;\n}\n.tap-target-wrapper {\n  width: 800px;\n  height: 800px;\n  position: fixed;\n  z-index: 1000;\n  visibility: hidden;\n  -webkit-transition: visibility 0s .3s;\n  transition: visibility 0s .3s;\n}\n.tap-target-wrapper.open {\n  visibility: visible;\n  -webkit-transition: visibility 0s;\n  transition: visibility 0s;\n}\n.tap-target-wrapper.open .tap-target {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  opacity: .95;\n  -webkit-transition: opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1), opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1), opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n}\n.tap-target-wrapper.open .tap-target-wave::before {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.tap-target-wrapper.open .tap-target-wave::after {\n  visibility: visible;\n  -webkit-animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n          animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n  -webkit-transition: opacity .3s, visibility 0s 1s, -webkit-transform .3s;\n  transition: opacity .3s, visibility 0s 1s, -webkit-transform .3s;\n  transition: opacity .3s, transform .3s, visibility 0s 1s;\n  transition: opacity .3s, transform .3s, visibility 0s 1s, -webkit-transform .3s;\n}\n.tap-target {\n  position: absolute;\n  font-size: 1rem;\n  border-radius: 50%;\n  background-color: #ee6e73;\n  -webkit-box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.14), 0 10px 50px 0 rgba(0, 0, 0, 0.12), 0 30px 10px -20px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.14), 0 10px 50px 0 rgba(0, 0, 0, 0.12), 0 30px 10px -20px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1), opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n  transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1), opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1);\n}\n.tap-target-content {\n  position: relative;\n  display: table-cell;\n}\n.tap-target-wave {\n  position: absolute;\n  border-radius: 50%;\n  z-index: 10001;\n}\n.tap-target-wave::before, .tap-target-wave::after {\n  content: '';\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background-color: #ffffff;\n}\n.tap-target-wave::before {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transition: -webkit-transform .3s;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\n.tap-target-wave::after {\n  visibility: hidden;\n  -webkit-transition: opacity .3s, visibility 0s, -webkit-transform .3s;\n  transition: opacity .3s, visibility 0s, -webkit-transform .3s;\n  transition: opacity .3s, transform .3s, visibility 0s;\n  transition: opacity .3s, transform .3s, visibility 0s, -webkit-transform .3s;\n  z-index: -1;\n}\n.tap-target-origin {\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  z-index: 10002;\n  position: absolute !important;\n}\n.tap-target-origin:not(.btn):not(.btn-large):not(.btn-small), .tap-target-origin:not(.btn):not(.btn-large):not(.btn-small):hover {\n  background: none;\n}\n@media only screen and (max-width: 600px) {\n  .tap-target, .tap-target-wrapper {\n    width: 600px;\n    height: 600px;\n  }\n}\n.pulse {\n  overflow: visible;\n  position: relative;\n}\n.pulse::before {\n  content: '';\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background-color: inherit;\n  border-radius: inherit;\n  -webkit-transition: opacity .3s, -webkit-transform .3s;\n  transition: opacity .3s, -webkit-transform .3s;\n  transition: opacity .3s, transform .3s;\n  transition: opacity .3s, transform .3s, -webkit-transform .3s;\n  -webkit-animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n          animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n  z-index: -1;\n}\n@-webkit-keyframes pulse-animation {\n  0% {\n    opacity: 1;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n  }\n}\n@keyframes pulse-animation {\n  0% {\n    opacity: 1;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n  }\n}\n/* Modal */\n.datepicker-modal {\n  max-width: 325px;\n  min-width: 300px;\n  max-height: none;\n}\n.datepicker-container.modal-content {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 0;\n}\n.datepicker-controls {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  width: 280px;\n  margin: 0 auto;\n}\n.datepicker-controls .selects-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.datepicker-controls .select-wrapper input {\n  border-bottom: none;\n  text-align: center;\n  margin: 0;\n}\n.datepicker-controls .select-wrapper input:focus {\n  border-bottom: none;\n}\n.datepicker-controls .select-wrapper .caret {\n  display: none;\n}\n.datepicker-controls .select-year input {\n  width: 50px;\n}\n.datepicker-controls .select-month input {\n  width: 70px;\n}\n.month-prev, .month-next {\n  margin-top: 4px;\n  cursor: pointer;\n  background-color: transparent;\n  border: none;\n}\n/* Date Display */\n.datepicker-date-display {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 auto;\n          flex: 1 auto;\n  background-color: #26a69a;\n  color: #fff;\n  padding: 20px 22px;\n  font-weight: 500;\n}\n.datepicker-date-display .year-text {\n  display: block;\n  font-size: 1.5rem;\n  line-height: 25px;\n  color: rgba(255, 255, 255, 0.7);\n}\n.datepicker-date-display .date-text {\n  display: block;\n  font-size: 2.8rem;\n  line-height: 47px;\n  font-weight: 500;\n}\n/* Calendar */\n.datepicker-calendar-container {\n  -webkit-box-flex: 2.5;\n      -ms-flex: 2.5 auto;\n          flex: 2.5 auto;\n}\n.datepicker-table {\n  width: 280px;\n  font-size: 1rem;\n  margin: 0 auto;\n}\n.datepicker-table thead {\n  border-bottom: none;\n}\n.datepicker-table th {\n  padding: 10px 5px;\n  text-align: center;\n}\n.datepicker-table tr {\n  border: none;\n}\n.datepicker-table abbr {\n  text-decoration: none;\n  color: #999;\n}\n.datepicker-table td {\n  border-radius: 50%;\n  padding: 0;\n}\n.datepicker-table td.is-today {\n  color: #26a69a;\n}\n.datepicker-table td.is-selected {\n  background-color: #26a69a;\n  color: #fff;\n}\n.datepicker-table td.is-outside-current-month, .datepicker-table td.is-disabled {\n  color: rgba(0, 0, 0, 0.3);\n  pointer-events: none;\n}\n.datepicker-day-button {\n  background-color: transparent;\n  border: none;\n  line-height: 38px;\n  display: block;\n  width: 100%;\n  border-radius: 50%;\n  padding: 0 5px;\n  cursor: pointer;\n  color: inherit;\n}\n.datepicker-day-button:focus {\n  background-color: rgba(43, 161, 150, 0.25);\n}\n/* Footer */\n.datepicker-footer {\n  width: 280px;\n  margin: 0 auto;\n  padding-bottom: 5px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.datepicker-cancel,\n.datepicker-clear,\n.datepicker-today,\n.datepicker-done {\n  color: #26a69a;\n  padding: 0 1rem;\n}\n.datepicker-clear {\n  color: #F44336;\n}\n/* Media Queries */\n@media only screen and (min-width: 601px) {\n  .datepicker-modal {\n    max-width: 625px;\n  }\n  .datepicker-container.modal-content {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n  }\n  .datepicker-controls,\n  .datepicker-table,\n  .datepicker-footer {\n    width: 320px;\n  }\n  .datepicker-day-button {\n    line-height: 44px;\n  }\n}\n/* Timepicker Containers */\n.timepicker-modal {\n  max-width: 325px;\n  max-height: none;\n}\n.timepicker-container.modal-content {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 0;\n}\n.text-primary {\n  color: white;\n}\n/* Clock Digital Display */\n.timepicker-digital-display {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 auto;\n          flex: 1 auto;\n  background-color: #26a69a;\n  padding: 10px;\n  font-weight: 300;\n}\n.timepicker-text-container {\n  font-size: 4rem;\n  font-weight: bold;\n  text-align: center;\n  color: rgba(255, 255, 255, 0.6);\n  font-weight: 400;\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.timepicker-span-hours,\n.timepicker-span-minutes,\n.timepicker-span-am-pm div {\n  cursor: pointer;\n}\n.timepicker-span-hours {\n  margin-right: 3px;\n}\n.timepicker-span-minutes {\n  margin-left: 3px;\n}\n.timepicker-display-am-pm {\n  font-size: 1.3rem;\n  position: absolute;\n  right: 1rem;\n  bottom: 1rem;\n  font-weight: 400;\n}\n/* Analog Clock Display */\n.timepicker-analog-display {\n  -webkit-box-flex: 2.5;\n      -ms-flex: 2.5 auto;\n          flex: 2.5 auto;\n}\n.timepicker-plate {\n  background-color: #eee;\n  border-radius: 50%;\n  width: 270px;\n  height: 270px;\n  overflow: visible;\n  position: relative;\n  margin: auto;\n  margin-top: 25px;\n  margin-bottom: 5px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.timepicker-canvas,\n.timepicker-dial {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n.timepicker-minutes {\n  visibility: hidden;\n}\n.timepicker-tick {\n  border-radius: 50%;\n  color: rgba(0, 0, 0, 0.87);\n  line-height: 40px;\n  text-align: center;\n  width: 40px;\n  height: 40px;\n  position: absolute;\n  cursor: pointer;\n  font-size: 15px;\n}\n.timepicker-tick.active,\n.timepicker-tick:hover {\n  background-color: rgba(38, 166, 154, 0.25);\n}\n.timepicker-dial {\n  -webkit-transition: opacity 350ms, -webkit-transform 350ms;\n  transition: opacity 350ms, -webkit-transform 350ms;\n  transition: transform 350ms, opacity 350ms;\n  transition: transform 350ms, opacity 350ms, -webkit-transform 350ms;\n}\n.timepicker-dial-out {\n  opacity: 0;\n}\n.timepicker-dial-out.timepicker-hours {\n  -webkit-transform: scale(1.1, 1.1);\n          transform: scale(1.1, 1.1);\n}\n.timepicker-dial-out.timepicker-minutes {\n  -webkit-transform: scale(0.8, 0.8);\n          transform: scale(0.8, 0.8);\n}\n.timepicker-canvas {\n  -webkit-transition: opacity 175ms;\n  transition: opacity 175ms;\n}\n.timepicker-canvas line {\n  stroke: #26a69a;\n  stroke-width: 4;\n  stroke-linecap: round;\n}\n.timepicker-canvas-out {\n  opacity: 0.25;\n}\n.timepicker-canvas-bearing {\n  stroke: none;\n  fill: #26a69a;\n}\n.timepicker-canvas-bg {\n  stroke: none;\n  fill: #26a69a;\n}\n/* Footer */\n.timepicker-footer {\n  margin: 0 auto;\n  padding: 5px 1rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.timepicker-clear {\n  color: #F44336;\n}\n.timepicker-close {\n  color: #26a69a;\n}\n.timepicker-clear,\n.timepicker-close {\n  padding: 0 20px;\n}\n/* Media Queries */\n@media only screen and (min-width: 601px) {\n  .timepicker-modal {\n    max-width: 600px;\n  }\n  .timepicker-container.modal-content {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n  }\n  .timepicker-text-container {\n    top: 32%;\n  }\n  .timepicker-display-am-pm {\n    position: relative;\n    right: auto;\n    bottom: auto;\n    text-align: center;\n    margin-top: 1.2rem;\n  }\n}\n";

/***/ })
],[370]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9fZG9jdW1lbnQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2ludmFyaWFudC5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzPzc0MjNkODkiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcz83NDIzZDg5Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanM/NzQyM2Q4OSIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL192YWxpZGF0ZS1jb2xsZWN0aW9uLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvaW5kZXguanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eU9iamVjdC5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2RlY29kZS5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2VuY29kZS5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzPzRlNjJkODMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanM/NGU2MmQ4MyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlYWN0L2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcz80ZTYyZDgzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzP2MxY2M1OGMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi5qcz9jMWNjNThjIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanM/YzFjYzU4YyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcz9jMWNjNThjIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3IuanM/YzFjYzU4YyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXRvLWpzb24uanM/YzFjYzU4YyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1mcm9tLWl0ZXJhYmxlLmpzP2MxY2M1OGMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LWNvbGxlY3Rpb24tb2YuanM/YzFjYzU4YyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtY29sbGVjdGlvbi1mcm9tLmpzP2MxY2M1OGMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanM/YzFjYzU4YyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qcz9jMWNjNThjIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzP2MxY2M1OGMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzP2MxY2M1OGMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcz9jMWNjNThjIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzP2MxY2M1OGMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanM/YzFjYzU4YyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanM/YzFjYzU4YyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9fZG9jdW1lbnQuanM/MmUwNjg1NCIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9zZXJ2ZXIvZG9jdW1lbnQuanM/MmUwNjg1NCIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2h0bWxlc2NhcGUvaHRtbGVzY2FwZS5qcz8yZTA2ODU0Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvc3R5bGVkLWpzeC9zZXJ2ZXIuanM/MmUwNjg1NCIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3N0eWxlZC1qc3gvZGlzdC9zZXJ2ZXIuanM/MmUwNjg1NCIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3N0eWxlZC1qc3gvZGlzdC9zdHlsZS5qcz8yZTA2ODU0Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL21hcC5qcz8yZTA2ODU0Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL21hcC5qcz8yZTA2ODU0Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hcC5qcz8yZTA2ODU0Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm1hcC50by1qc29uLmpzPzJlMDY4NTQiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLm9mLmpzPzJlMDY4NTQiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLmZyb20uanM/MmUwNjg1NCIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3N0eWxlZC1qc3gvZGlzdC9zdHlsZXNoZWV0LXJlZ2lzdHJ5LmpzPzJlMDY4NTQiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zdHJpbmctaGFzaC9pbmRleC5qcz8yZTA2ODU0Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvc3R5bGVkLWpzeC9kaXN0L2xpYi9zdHlsZXNoZWV0LmpzPzJlMDY4NTQiLCJ3ZWJwYWNrOi8vL2NsaWVudC9zdHlsZXMvbWF0ZXJpYWxpemUuY3NzPzJlMDY4NTQiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS43JyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGhhcyhleHBvcnRzLCBrZXkpKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcycpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3JlYWN0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgQlJFQUsgPSB7fTtcbnZhciBSRVRVUk4gPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUikge1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSk7XG4gIHZhciBmID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmIChpc0FycmF5SXRlcihpdGVyRm4pKSBmb3IgKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOykge1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbnZhciBET01JdGVyYWJsZXMgPSAoJ0NTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsJyArXG4gICdET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LCcgK1xuICAnTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCwnICtcbiAgJ1NWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LCcgK1xuICAnVGV4dFRyYWNrTGlzdCxUb3VjaExpc3QnKS5zcGxpdCgnLCcpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IERPTUl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IERPTUl0ZXJhYmxlc1tpXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIik7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9jcmVhdGVcIik7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2ludmFyaWFudC5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2ZianMvbGliL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge307XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgdHlwZW9mIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246IGNvcmUudmVyc2lvbixcbiAgbW9kZTogcmVxdWlyZSgnLi9fbGlicmFyeScpID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTggRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZiAobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSkgZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwgeyB2YWx1ZTogd2tzRXh0LmYobmFtZSkgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBpZiAoc2FmZSAmJiB0YXJnZXRba2V5XSkgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuICB2YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpbnZhcmlhbnQodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ3RoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAlc2AuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0pO1xuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb25lLCB2YWx1ZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZSB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZykge1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanNcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRZUEUpIHtcbiAgaWYgKCFpc09iamVjdChpdCkgfHwgaXQuX3QgIT09IFRZUEUpIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3ZhbGlkYXRlLWNvbGxlY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSBhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIE9iamVjdC5mcmVlemUoZW1wdHlPYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5T2JqZWN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eU9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBwb3MpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbiAgICB2YXIgaSA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBsID0gcy5sZW5ndGg7XG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbCkgcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gOTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gOTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gOTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qc1xuLy8gbW9kdWxlIGlkID0gOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2RlY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gOTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gbWFwKG9ialtrXSwgZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuZnVuY3Rpb24gbWFwICh4cywgZikge1xuICBpZiAoeHMubWFwKSByZXR1cm4geHMubWFwKGYpO1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICByZXMucHVzaChmKHhzW2ldLCBpKSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDEwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiKTtcblxudmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX2Fzc2lnbjIuZGVmYXVsdCB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDEwN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDEwOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDEwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCkge1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gMTEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDExMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDExM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgTUVUQSA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVk7XG52YXIgJGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgd2tzID0gcmVxdWlyZSgnLi9fd2tzJyk7XG52YXIgd2tzRXh0ID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpO1xudmFyIHdrc0RlZmluZSA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKTtcbnZhciBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL19pcy1hcnJheScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIF9jcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZ09QTkV4dCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpO1xudmFyICRHT1BEID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKTtcbnZhciAkRFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QRCA9ICRHT1BELmY7XG52YXIgZFAgPSAkRFAuZjtcbnZhciBnT1BOID0gZ09QTkV4dC5mO1xudmFyICRTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyICRKU09OID0gZ2xvYmFsLkpTT047XG52YXIgX3N0cmluZ2lmeSA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBISURERU4gPSB3a3MoJ19oaWRkZW4nKTtcbnZhciBUT19QUklNSVRJVkUgPSB3a3MoJ3RvUHJpbWl0aXZlJyk7XG52YXIgaXNFbnVtID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpO1xudmFyIEFsbFN5bWJvbHMgPSBzaGFyZWQoJ3N5bWJvbHMnKTtcbnZhciBPUFN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdFtQUk9UT1RZUEVdO1xudmFyIFVTRV9OQVRJVkUgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xudmFyIFFPYmplY3QgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkUCh0aGlzLCAnYScsIHsgdmFsdWU6IDcgfSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbiAoaXQsIGtleSwgRCkge1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYgKHByb3RvRGVzYykgZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZiAocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bykgZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAodGFnKSB7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKSB7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG8pICRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSkge1xuICAgIGlmICghRC5lbnVtZXJhYmxlKSB7XG4gICAgICBpZiAoIWhhcyhpdCwgSElEREVOKSkgZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pIGl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwgeyBlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKSB9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKSB7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgbCA9IGtleXMubGVuZ3RoO1xuICB2YXIga2V5O1xuICB3aGlsZSAobCA+IGkpICRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApIHtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpIHtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIGl0ID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSkgcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmIChEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpIEQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgdmFyIG5hbWVzID0gZ09QTih0b0lPYmplY3QoaXQpKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSB7XG4gICAgaWYgKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSB7XG4gIHZhciBJU19PUCA9IGl0ID09PSBPYmplY3RQcm90bztcbiAgdmFyIG5hbWVzID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKSByZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmICghVVNFX05BVElWRSkge1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCkgdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzID09PSBPYmplY3RQcm90bykgJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYgKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpIHRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYgKERFU0NSSVBUT1JTICYmIHNldHRlcikgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0IH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKSB7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBTeW1ib2w6ICRTeW1ib2wgfSk7XG5cbmZvciAodmFyIGVzNlN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaiA9IDA7IGVzNlN5bWJvbHMubGVuZ3RoID4gajspd2tzKGVzNlN5bWJvbHNbaisrXSk7XG5cbmZvciAodmFyIHdlbGxLbm93blN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBrID0gMDsgd2VsbEtub3duU3ltYm9scy5sZW5ndGggPiBrOykgd2tzRGVmaW5lKHdlbGxLbm93blN5bWJvbHNbaysrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioc3ltKSB7XG4gICAgaWYgKCFpc1N5bWJvbChzeW0pKSB0aHJvdyBUeXBlRXJyb3Ioc3ltICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gICAgZm9yICh2YXIga2V5IGluIFN5bWJvbFJlZ2lzdHJ5KSBpZiAoU3ltYm9sUmVnaXN0cnlba2V5XSA9PT0gc3ltKSByZXR1cm4ga2V5O1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoeyBhOiBTIH0pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCkge1xuICAgIHZhciBhcmdzID0gW2l0XTtcbiAgICB2YXIgaSA9IDE7XG4gICAgdmFyIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgICRyZXBsYWNlciA9IHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZiAoIWlzT2JqZWN0KHJlcGxhY2VyKSAmJiBpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgaWYgKCFpc0FycmF5KHJlcGxhY2VyKSkgcmVwbGFjZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiAkcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykgdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDExNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gZ2V0S2V5cyhpdCk7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZiAoZ2V0U3ltYm9scykge1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdCk7XG4gICAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChzeW1ib2xzLmxlbmd0aCA+IGkpIGlmIChpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgZ09QTiA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZjtcbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDExN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdhc3luY0l0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ29ic2VydmFibGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDExOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gMTIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gMTIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0JywgeyBzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gMTIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoIChlKSB7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYgKGJ1Z2d5KSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qc1xuLy8gbW9kdWxlIGlkID0gMTIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlJyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKSB7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IGNyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuNC4wXG4gKiByZWFjdC5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcycpO1xuXG4vLyBUT0RPOiB0aGlzIGlzIHNwZWNpYWwgYmVjYXVzZSBpdCBnZXRzIGltcG9ydGVkIGR1cmluZyBidWlsZC5cblxudmFyIFJlYWN0VmVyc2lvbiA9ICcxNi40LjAnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykgOiAweGVhZDA7XG52YXIgUkVBQ1RfVElNRU9VVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QudGltZW91dCcpIDogMHhlYWQxO1xuXG52YXIgTUFZQkVfSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7XG5cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICBpZiAobWF5YmVJdGVyYWJsZSA9PT0gbnVsbCB8fCB0eXBlb2YgbWF5YmVJdGVyYWJsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgbWF5YmVJdGVyYXRvciA9IE1BWUJFX0lURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW01BWUJFX0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF07XG4gIGlmICh0eXBlb2YgbWF5YmVJdGVyYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBtYXliZUl0ZXJhdG9yO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBSZWx5aW5nIG9uIHRoZSBgaW52YXJpYW50KClgIGltcGxlbWVudGF0aW9uIGxldHMgdXNcbi8vIGhhdmUgcHJlc2VydmUgdGhlIGZvcm1hdCBhbmQgcGFyYW1zIGluIHRoZSB3d3cgYnVpbGRzLlxuXG4vLyBFeHBvcnRzIFJlYWN0RE9NLmNyZWF0ZVJvb3RcblxuXG4vLyBFeHBlcmltZW50YWwgZXJyb3ItYm91bmRhcnkgQVBJIHRoYXQgY2FuIHJlY292ZXIgZnJvbSBlcnJvcnMgd2l0aGluIGEgc2luZ2xlXG4vLyByZW5kZXIgcGhhc2VcblxuLy8gU3VzcGVuc2VcbnZhciBlbmFibGVTdXNwZW5zZSA9IGZhbHNlO1xuLy8gSGVscHMgaWRlbnRpZnkgc2lkZSBlZmZlY3RzIGluIGJlZ2luLXBoYXNlIGxpZmVjeWNsZSBob29rcyBhbmQgc2V0U3RhdGUgcmVkdWNlcnM6XG5cblxuLy8gSW4gc29tZSBjYXNlcywgU3RyaWN0TW9kZSBzaG91bGQgYWxzbyBkb3VibGUtcmVuZGVyIGxpZmVjeWNsZXMuXG4vLyBUaGlzIGNhbiBiZSBjb25mdXNpbmcgZm9yIHRlc3RzIHRob3VnaCxcbi8vIEFuZCBpdCBjYW4gYmUgYmFkIGZvciBwZXJmb3JtYW5jZSBpbiBwcm9kdWN0aW9uLlxuLy8gVGhpcyBmZWF0dXJlIGZsYWcgY2FuIGJlIHVzZWQgdG8gY29udHJvbCB0aGUgYmVoYXZpb3I6XG5cblxuLy8gVG8gcHJlc2VydmUgdGhlIFwiUGF1c2Ugb24gY2F1Z2h0IGV4Y2VwdGlvbnNcIiBiZWhhdmlvciBvZiB0aGUgZGVidWdnZXIsIHdlXG4vLyByZXBsYXkgdGhlIGJlZ2luIHBoYXNlIG9mIGEgZmFpbGVkIGNvbXBvbmVudCBpbnNpZGUgaW52b2tlR3VhcmRlZENhbGxiYWNrLlxuXG5cbi8vIFdhcm4gYWJvdXQgZGVwcmVjYXRlZCwgYXN5bmMtdW5zYWZlIGxpZmVjeWNsZXM7IHJlbGF0ZXMgdG8gUkZDICM2OlxuXG5cbi8vIFdhcm4gYWJvdXQgbGVnYWN5IGNvbnRleHQgQVBJXG5cblxuLy8gR2F0aGVyIGFkdmFuY2VkIHRpbWluZyBtZXRyaWNzIGZvciBQcm9maWxlciBzdWJ0cmVlcy5cblxuXG4vLyBGaXJlcyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgZm9yIHN0YXRlICpvciogcHJvcHMgY2hhbmdlc1xuXG5cbi8vIE9ubHkgdXNlZCBpbiB3d3cgYnVpbGRzLlxuXG4vKipcbiAqIEZvcmtlZCBmcm9tIGZianMvd2FybmluZzpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mYmpzL2Jsb2IvZTY2YmEyMGFkNWJlNDMzZWI1NDQyM2YyYjA5N2Q4MjkzMjRkOWRlNi9wYWNrYWdlcy9mYmpzL3NyYy9fX2ZvcmtzX18vd2FybmluZy5qc1xuICpcbiAqIE9ubHkgY2hhbmdlIGlzIHdlIHVzZSBjb25zb2xlLndhcm4gaW5zdGVhZCBvZiBjb25zb2xlLmVycm9yLFxuICogYW5kIGRvIG5vdGhpbmcgd2hlbiAnY29uc29sZScgaXMgbm90IHN1cHBvcnRlZC5cbiAqIFRoaXMgcmVhbGx5IHNpbXBsaWZpZXMgdGhlIGNvZGUuXG4gKiAtLS1cbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nID0gZnVuY3Rpb24gKCkge307XG5cbntcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgbG93UHJpb3JpdHlXYXJuaW5nID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyQxID0gbG93UHJpb3JpdHlXYXJuaW5nO1xuXG52YXIgZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50ID0ge307XG5cbmZ1bmN0aW9uIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCBjYWxsZXJOYW1lKSB7XG4gIHtcbiAgICB2YXIgX2NvbnN0cnVjdG9yID0gcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3I7XG4gICAgdmFyIGNvbXBvbmVudE5hbWUgPSBfY29uc3RydWN0b3IgJiYgKF9jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCBfY29uc3RydWN0b3IubmFtZSkgfHwgJ1JlYWN0Q2xhc3MnO1xuICAgIHZhciB3YXJuaW5nS2V5ID0gY29tcG9uZW50TmFtZSArICcuJyArIGNhbGxlck5hbWU7XG4gICAgaWYgKGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3YXJuaW5nKGZhbHNlLCBcIkNhbid0IGNhbGwgJXMgb24gYSBjb21wb25lbnQgdGhhdCBpcyBub3QgeWV0IG1vdW50ZWQuIFwiICsgJ1RoaXMgaXMgYSBuby1vcCwgYnV0IGl0IG1pZ2h0IGluZGljYXRlIGEgYnVnIGluIHlvdXIgYXBwbGljYXRpb24uICcgKyAnSW5zdGVhZCwgYXNzaWduIHRvIGB0aGlzLnN0YXRlYCBkaXJlY3RseSBvciBkZWZpbmUgYSBgc3RhdGUgPSB7fTtgICcgKyAnY2xhc3MgcHJvcGVydHkgd2l0aCB0aGUgZGVzaXJlZCBzdGF0ZSBpbiB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNvbXBvbmVudE5hbWUpO1xuICAgIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSA9IHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBhYnN0cmFjdCBBUEkgZm9yIGFuIHVwZGF0ZSBxdWV1ZS5cbiAqL1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0ge1xuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gY2FsbGVyTmFtZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIG9yIGBzZXRTdGF0ZWAgdG8gbXV0YXRlIHN0YXRlLlxuICAgKiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcGxldGVTdGF0ZSBOZXh0IHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IGNhbGxlck5hbWUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IE5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0ge307XG5cbi8qKlxuICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyB0byBtdXRhdGVcbiAqIHN0YXRlLiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5LFxuICogYXMgdGhleSBtYXkgZXZlbnR1YWxseSBiZSBiYXRjaGVkIHRvZ2V0aGVyLiAgWW91IGNhbiBwcm92aWRlIGFuIG9wdGlvbmFsXG4gKiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2FsbCB0byBzZXRTdGF0ZSBpcyBhY3R1YWxseVxuICogY29tcGxldGVkLlxuICpcbiAqIFdoZW4gYSBmdW5jdGlvbiBpcyBwcm92aWRlZCB0byBzZXRTdGF0ZSwgaXQgd2lsbCBiZSBjYWxsZWQgYXQgc29tZSBwb2ludCBpblxuICogdGhlIGZ1dHVyZSAobm90IHN5bmNocm9ub3VzbHkpLiBJdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB1cCB0byBkYXRlXG4gKiBjb21wb25lbnQgYXJndW1lbnRzIChzdGF0ZSwgcHJvcHMsIGNvbnRleHQpLiBUaGVzZSB2YWx1ZXMgY2FuIGJlIGRpZmZlcmVudFxuICogZnJvbSB0aGlzLiogYmVjYXVzZSB5b3VyIGZ1bmN0aW9uIG1heSBiZSBjYWxsZWQgYWZ0ZXIgcmVjZWl2ZVByb3BzIGJ1dCBiZWZvcmVcbiAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSwgYW5kIHRoaXMgbmV3IHN0YXRlLCBwcm9wcywgYW5kIGNvbnRleHQgd2lsbCBub3QgeWV0IGJlXG4gKiBhc3NpZ25lZCB0byB0aGlzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIG9yIGZ1bmN0aW9uIHRvXG4gKiAgICAgICAgcHJvZHVjZSBuZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggY3VycmVudCBzdGF0ZS5cbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IGludmFyaWFudChmYWxzZSwgJ3NldFN0YXRlKC4uLik6IHRha2VzIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMgdG8gdXBkYXRlIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLicpIDogdm9pZCAwO1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzLCBjYWxsYmFjaywgJ2ZvcmNlVXBkYXRlJyk7XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQgQVBJcy4gVGhlc2UgQVBJcyB1c2VkIHRvIGV4aXN0IG9uIGNsYXNzaWMgUmVhY3QgY2xhc3NlcyBidXQgc2luY2VcbiAqIHdlIHdvdWxkIGxpa2UgdG8gZGVwcmVjYXRlIHRoZW0sIHdlJ3JlIG5vdCBnb2luZyB0byBtb3ZlIHRoZW0gb3ZlciB0byB0aGlzXG4gKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAqL1xue1xuICB2YXIgZGVwcmVjYXRlZEFQSXMgPSB7XG4gICAgaXNNb3VudGVkOiBbJ2lzTW91bnRlZCcsICdJbnN0ZWFkLCBtYWtlIHN1cmUgdG8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgcGVuZGluZyByZXF1ZXN0cyBpbiAnICsgJ2NvbXBvbmVudFdpbGxVbm1vdW50IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLiddLFxuICAgIHJlcGxhY2VTdGF0ZTogWydyZXBsYWNlU3RhdGUnLCAnUmVmYWN0b3IgeW91ciBjb2RlIHRvIHVzZSBzZXRTdGF0ZSBpbnN0ZWFkIChzZWUgJyArICdodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzMyMzYpLiddXG4gIH07XG4gIHZhciBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgaW5mbykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBmb3IgKHZhciBmbk5hbWUgaW4gZGVwcmVjYXRlZEFQSXMpIHtcbiAgICBpZiAoZGVwcmVjYXRlZEFQSXMuaGFzT3duUHJvcGVydHkoZm5OYW1lKSkge1xuICAgICAgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nKGZuTmFtZSwgZGVwcmVjYXRlZEFQSXNbZm5OYW1lXSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cbkNvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG5cbi8qKlxuICogQ29udmVuaWVuY2UgY29tcG9uZW50IHdpdGggZGVmYXVsdCBzaGFsbG93IGVxdWFsaXR5IGNoZWNrIGZvciBzQ1UuXG4gKi9cbmZ1bmN0aW9uIFB1cmVDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxudmFyIHB1cmVDb21wb25lbnRQcm90b3R5cGUgPSBQdXJlQ29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBDb21wb25lbnREdW1teSgpO1xucHVyZUNvbXBvbmVudFByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFB1cmVDb21wb25lbnQ7XG4vLyBBdm9pZCBhbiBleHRyYSBwcm90b3R5cGUganVtcCBmb3IgdGhlc2UgbWV0aG9kcy5cbl9hc3NpZ24ocHVyZUNvbXBvbmVudFByb3RvdHlwZSwgQ29tcG9uZW50LnByb3RvdHlwZSk7XG5wdXJlQ29tcG9uZW50UHJvdG90eXBlLmlzUHVyZVJlYWN0Q29tcG9uZW50ID0gdHJ1ZTtcblxuLy8gYW4gaW1tdXRhYmxlIG9iamVjdCB3aXRoIGEgc2luZ2xlIG11dGFibGUgdmFsdWVcbmZ1bmN0aW9uIGNyZWF0ZVJlZigpIHtcbiAgdmFyIHJlZk9iamVjdCA9IHtcbiAgICBjdXJyZW50OiBudWxsXG4gIH07XG4gIHtcbiAgICBPYmplY3Quc2VhbChyZWZPYmplY3QpO1xuICB9XG4gIHJldHVybiByZWZPYmplY3Q7XG59XG5cbi8qKlxuICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgb3duZXIuXG4gKlxuICogVGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIGNvbXBvbmVudCB3aG8gc2hvdWxkIG93biBhbnkgY29tcG9uZW50cyB0aGF0IGFyZVxuICogY3VycmVudGx5IGJlaW5nIGNvbnN0cnVjdGVkLlxuICovXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSB7XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHR5cGUge1JlYWN0Q29tcG9uZW50fVxuICAgKi9cbiAgY3VycmVudDogbnVsbFxufTtcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIFJFU0VSVkVEX1BST1BTID0ge1xuICBrZXk6IHRydWUsXG4gIHJlZjogdHJ1ZSxcbiAgX19zZWxmOiB0cnVlLFxuICBfX3NvdXJjZTogdHJ1ZVxufTtcblxudmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gdm9pZCAwO1xudmFyIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBoYXNWYWxpZFJlZihjb25maWcpIHtcbiAge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ3JlZicpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcucmVmICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAna2V5JykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ2tleScpLmdldDtcbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgd2FybmluZyhmYWxzZSwgJyVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICB9XG4gIH07XG4gIHdhcm5BYm91dEFjY2Vzc2luZ0tleS5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ2tleScsIHtcbiAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ0tleSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2YXIgd2FybkFib3V0QWNjZXNzaW5nUmVmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24pIHtcbiAgICAgIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgIHdhcm5pbmcoZmFsc2UsICclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgbm8gaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAqIGlmIHNvbWV0aGluZyBpcyBhIFJlYWN0IEVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0geyp9IGtleVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7Kn0gc2VsZiBBICp0ZW1wb3JhcnkqIGhlbHBlciB0byBkZXRlY3QgcGxhY2VzIHdoZXJlIGB0aGlzYCBpc1xuICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICogY2FuIHdhcm4uIFdlIHdhbnQgdG8gZ2V0IHJpZCBvZiBvd25lciBhbmQgcmVwbGFjZSBzdHJpbmcgYHJlZmBzIHdpdGggYXJyb3dcbiAqIGZ1bmN0aW9ucywgYW5kIGFzIGxvbmcgYXMgYHRoaXNgIGFuZCBvd25lciBhcmUgdGhlIHNhbWUsIHRoZXJlIHdpbGwgYmUgbm9cbiAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Kn0gc291cmNlIEFuIGFubm90YXRpb24gb2JqZWN0IChhZGRlZCBieSBhIHRyYW5zcGlsZXIgb3Igb3RoZXJ3aXNlKVxuICogaW5kaWNhdGluZyBmaWxlbmFtZSwgbGluZSBudW1iZXIsIGFuZC9vciBvdGhlciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSB7Kn0gb3duZXJcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgZWxlbWVudCA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvd3MgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAge1xuICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAvLyBhbiBleHRlcm5hbCBiYWNraW5nIHN0b3JlIHNvIHRoYXQgd2UgY2FuIGZyZWV6ZSB0aGUgd2hvbGUgb2JqZWN0LlxuICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICBlbGVtZW50Ll9zdG9yZSA9IHt9O1xuXG4gICAgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfSk7XG4gICAgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogc2VsZlxuICAgIH0pO1xuICAgIC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHNvdXJjZVxuICAgIH0pO1xuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IG9mIHRoZSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWUgPSB2b2lkIDA7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIgcHJvcHMgPSB7fTtcblxuICB2YXIga2V5ID0gbnVsbDtcbiAgdmFyIHJlZiA9IG51bGw7XG4gIHZhciBzZWxmID0gbnVsbDtcbiAgdmFyIHNvdXJjZSA9IG51bGw7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgc2VsZiA9IGNvbmZpZy5fX3NlbGYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zZWxmO1xuICAgIHNvdXJjZSA9IGNvbmZpZy5fX3NvdXJjZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NvdXJjZTtcbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICB7XG4gICAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgICBPYmplY3QuZnJlZXplKGNoaWxkQXJyYXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICB2YXIgZGVmYXVsdFByb3BzID0gdHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB7XG4gICAgaWYgKGtleSB8fCByZWYpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvcHMuJCR0eXBlb2YgPT09ICd1bmRlZmluZWQnIHx8IHByb3BzLiQkdHlwZW9mICE9PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVmKSB7XG4gICAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIFJlYWN0RWxlbWVudHMgb2YgYSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVmYWN0b3J5XG4gKi9cblxuXG5mdW5jdGlvbiBjbG9uZUFuZFJlcGxhY2VLZXkob2xkRWxlbWVudCwgbmV3S2V5KSB7XG4gIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50KG9sZEVsZW1lbnQudHlwZSwgbmV3S2V5LCBvbGRFbGVtZW50LnJlZiwgb2xkRWxlbWVudC5fc2VsZiwgb2xkRWxlbWVudC5fc291cmNlLCBvbGRFbGVtZW50Ll9vd25lciwgb2xkRWxlbWVudC5wcm9wcyk7XG5cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogQ2xvbmUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgdXNpbmcgZWxlbWVudCBhcyB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2Nsb25lZWxlbWVudFxuICovXG5mdW5jdGlvbiBjbG9uZUVsZW1lbnQoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICAhIShlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCkgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdC5jbG9uZUVsZW1lbnQoLi4uKTogVGhlIGFyZ3VtZW50IG11c3QgYmUgYSBSZWFjdCBlbGVtZW50LCBidXQgeW91IHBhc3NlZCAlcy4nLCBlbGVtZW50KSA6IHZvaWQgMDtcblxuICB2YXIgcHJvcE5hbWUgPSB2b2lkIDA7XG5cbiAgLy8gT3JpZ2luYWwgcHJvcHMgYXJlIGNvcGllZFxuICB2YXIgcHJvcHMgPSBfYXNzaWduKHt9LCBlbGVtZW50LnByb3BzKTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBrZXkgPSBlbGVtZW50LmtleTtcbiAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICAvLyBTZWxmIGlzIHByZXNlcnZlZCBzaW5jZSB0aGUgb3duZXIgaXMgcHJlc2VydmVkLlxuICB2YXIgc2VsZiA9IGVsZW1lbnQuX3NlbGY7XG4gIC8vIFNvdXJjZSBpcyBwcmVzZXJ2ZWQgc2luY2UgY2xvbmVFbGVtZW50IGlzIHVubGlrZWx5IHRvIGJlIHRhcmdldGVkIGJ5IGFcbiAgLy8gdHJhbnNwaWxlciwgYW5kIHRoZSBvcmlnaW5hbCBzb3VyY2UgaXMgcHJvYmFibHkgYSBiZXR0ZXIgaW5kaWNhdG9yIG9mIHRoZVxuICAvLyB0cnVlIG93bmVyLlxuICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlO1xuXG4gIC8vIE93bmVyIHdpbGwgYmUgcHJlc2VydmVkLCB1bmxlc3MgcmVmIGlzIG92ZXJyaWRkZW5cbiAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIC8vIFNpbGVudGx5IHN0ZWFsIHRoZSByZWYgZnJvbSB0aGUgcGFyZW50LlxuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBvdmVycmlkZSBleGlzdGluZyBwcm9wc1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB2b2lkIDA7XG4gICAgaWYgKGVsZW1lbnQudHlwZSAmJiBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICBkZWZhdWx0UHJvcHMgPSBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzO1xuICAgIH1cbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBpZiAoY29uZmlnW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkICYmIGRlZmF1bHRQcm9wcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgcmV0dXJuIFJlYWN0RWxlbWVudChlbGVtZW50LnR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcyk7XG59XG5cbi8qKlxuICogVmVyaWZpZXMgdGhlIG9iamVjdCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjaXN2YWxpZGVsZW1lbnRcbiAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgdmFsaWQgY29tcG9uZW50LlxuICogQGZpbmFsXG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuXG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IHt9O1xuXG57XG4gIC8vIENvbXBvbmVudCB0aGF0IGlzIGJlaW5nIHdvcmtlZCBvblxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldEN1cnJlbnRTdGFjayA9IG51bGw7XG5cbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbXBsID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRDdXJyZW50U3RhY2s7XG4gICAgaWYgKGltcGwpIHtcbiAgICAgIHJldHVybiBpbXBsKCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xufVxuXG52YXIgU0VQQVJBVE9SID0gJy4nO1xudmFyIFNVQlNFUEFSQVRPUiA9ICc6JztcblxuLyoqXG4gKiBFc2NhcGUgYW5kIHdyYXAga2V5IHNvIGl0IGlzIHNhZmUgdG8gdXNlIGFzIGEgcmVhY3RpZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gYmUgZXNjYXBlZC5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGVzY2FwZWQga2V5LlxuICovXG5mdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gIHZhciBlc2NhcGVSZWdleCA9IC9bPTpdL2c7XG4gIHZhciBlc2NhcGVyTG9va3VwID0ge1xuICAgICc9JzogJz0wJyxcbiAgICAnOic6ICc9MidcbiAgfTtcbiAgdmFyIGVzY2FwZWRTdHJpbmcgPSAoJycgKyBrZXkpLnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG5cbiAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG59XG5cbi8qKlxuICogVE9ETzogVGVzdCB0aGF0IGEgc2luZ2xlIGNoaWxkIGFuZCBhbiBhcnJheSB3aXRoIG9uZSBpdGVtIGhhdmUgdGhlIHNhbWUga2V5XG4gKiBwYXR0ZXJuLlxuICovXG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG52YXIgUE9PTF9TSVpFID0gMTA7XG52YXIgdHJhdmVyc2VDb250ZXh0UG9vbCA9IFtdO1xuZnVuY3Rpb24gZ2V0UG9vbGVkVHJhdmVyc2VDb250ZXh0KG1hcFJlc3VsdCwga2V5UHJlZml4LCBtYXBGdW5jdGlvbiwgbWFwQ29udGV4dCkge1xuICBpZiAodHJhdmVyc2VDb250ZXh0UG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gdHJhdmVyc2VDb250ZXh0UG9vbC5wb3AoKTtcbiAgICB0cmF2ZXJzZUNvbnRleHQucmVzdWx0ID0gbWFwUmVzdWx0O1xuICAgIHRyYXZlcnNlQ29udGV4dC5rZXlQcmVmaXggPSBrZXlQcmVmaXg7XG4gICAgdHJhdmVyc2VDb250ZXh0LmZ1bmMgPSBtYXBGdW5jdGlvbjtcbiAgICB0cmF2ZXJzZUNvbnRleHQuY29udGV4dCA9IG1hcENvbnRleHQ7XG4gICAgdHJhdmVyc2VDb250ZXh0LmNvdW50ID0gMDtcbiAgICByZXR1cm4gdHJhdmVyc2VDb250ZXh0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICByZXN1bHQ6IG1hcFJlc3VsdCxcbiAgICAgIGtleVByZWZpeDoga2V5UHJlZml4LFxuICAgICAgZnVuYzogbWFwRnVuY3Rpb24sXG4gICAgICBjb250ZXh0OiBtYXBDb250ZXh0LFxuICAgICAgY291bnQ6IDBcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbGVhc2VUcmF2ZXJzZUNvbnRleHQodHJhdmVyc2VDb250ZXh0KSB7XG4gIHRyYXZlcnNlQ29udGV4dC5yZXN1bHQgPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQua2V5UHJlZml4ID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmZ1bmMgPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQuY29udGV4dCA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5jb3VudCA9IDA7XG4gIGlmICh0cmF2ZXJzZUNvbnRleHRQb29sLmxlbmd0aCA8IFBPT0xfU0laRSkge1xuICAgIHRyYXZlcnNlQ29udGV4dFBvb2wucHVzaCh0cmF2ZXJzZUNvbnRleHQpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5hbWVTb0ZhciBOYW1lIG9mIHRoZSBrZXkgcGF0aCBzbyBmYXIuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gaW52b2tlIHdpdGggZWFjaCBjaGlsZCBmb3VuZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBVc2VkIHRvIHBhc3MgaW5mb3JtYXRpb24gdGhyb3VnaG91dCB0aGUgdHJhdmVyc2FsXG4gKiBwcm9jZXNzLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCBuYW1lU29GYXIsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgY2hpbGRyZW47XG5cbiAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgIC8vIEFsbCBvZiB0aGUgYWJvdmUgYXJlIHBlcmNlaXZlZCBhcyBudWxsLlxuICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgfVxuXG4gIHZhciBpbnZva2VDYWxsYmFjayA9IGZhbHNlO1xuXG4gIGlmIChjaGlsZHJlbiA9PT0gbnVsbCkge1xuICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgc3dpdGNoIChjaGlsZHJlbi4kJHR5cGVvZikge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgICAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW52b2tlQ2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkcmVuLFxuICAgIC8vIElmIGl0J3MgdGhlIG9ubHkgY2hpbGQsIHRyZWF0IHRoZSBuYW1lIGFzIGlmIGl0IHdhcyB3cmFwcGVkIGluIGFuIGFycmF5XG4gICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93cy5cbiAgICBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkcmVuLCAwKSA6IG5hbWVTb0Zhcik7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICB2YXIgY2hpbGQgPSB2b2lkIDA7XG4gIHZhciBuZXh0TmFtZSA9IHZvaWQgMDtcbiAgdmFyIHN1YnRyZWVDb3VudCA9IDA7IC8vIENvdW50IG9mIGNoaWxkcmVuIGZvdW5kIGluIHRoZSBjdXJyZW50IHN1YnRyZWUuXG4gIHZhciBuZXh0TmFtZVByZWZpeCA9IG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgOiBuYW1lU29GYXIgKyBTVUJTRVBBUkFUT1I7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihjaGlsZHJlbik7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB7XG4gICAgICAgIC8vIFdhcm4gYWJvdXQgdXNpbmcgTWFwcyBhcyBjaGlsZHJlblxuICAgICAgICBpZiAoaXRlcmF0b3JGbiA9PT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICAgICFkaWRXYXJuQWJvdXRNYXBzID8gd2FybmluZyhmYWxzZSwgJ1VzaW5nIE1hcHMgYXMgY2hpbGRyZW4gaXMgdW5zdXBwb3J0ZWQgYW5kIHdpbGwgbGlrZWx5IHlpZWxkICcgKyAndW5leHBlY3RlZCByZXN1bHRzLiBDb252ZXJ0IGl0IHRvIGEgc2VxdWVuY2UvaXRlcmFibGUgb2Yga2V5ZWQgJyArICdSZWFjdEVsZW1lbnRzIGluc3RlYWQuJXMnLCBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKSkgOiB2b2lkIDA7XG4gICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKGNoaWxkcmVuKTtcbiAgICAgIHZhciBzdGVwID0gdm9pZCAwO1xuICAgICAgdmFyIGlpID0gMDtcbiAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpaSsrKTtcbiAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGFkZGVuZHVtID0gJyc7XG4gICAgICB7XG4gICAgICAgIGFkZGVuZHVtID0gJyBJZiB5b3UgbWVhbnQgdG8gcmVuZGVyIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiwgdXNlIGFuIGFycmF5ICcgKyAnaW5zdGVhZC4nICsgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW5TdHJpbmcgPSAnJyArIGNoaWxkcmVuO1xuICAgICAgaW52YXJpYW50KGZhbHNlLCAnT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiAlcykuJXMnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50ICE9PSBudWxsICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiBlc2NhcGUoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uZm9yZWFjaFxuICpcbiAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmb3JFYWNoRnVuY1xuICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IGdldFBvb2xlZFRyYXZlcnNlQ29udGV4dChudWxsLCBudWxsLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIHJlbGVhc2VUcmF2ZXJzZUNvbnRleHQodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dChib29rS2VlcGluZywgY2hpbGQsIGNoaWxkS2V5KSB7XG4gIHZhciByZXN1bHQgPSBib29rS2VlcGluZy5yZXN1bHQsXG4gICAgICBrZXlQcmVmaXggPSBib29rS2VlcGluZy5rZXlQcmVmaXgsXG4gICAgICBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG5cbiAgdmFyIG1hcHBlZENoaWxkID0gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWFwcGVkQ2hpbGQpKSB7XG4gICAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChtYXBwZWRDaGlsZCwgcmVzdWx0LCBjaGlsZEtleSwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgaWYgKGlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBjbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsXG4gICAgICAvLyBLZWVwIGJvdGggdGhlIChtYXBwZWQpIGFuZCBvbGQga2V5cyBpZiB0aGV5IGRpZmZlciwganVzdCBhc1xuICAgICAgLy8gdHJhdmVyc2VBbGxDaGlsZHJlbiB1c2VkIHRvIGRvIGZvciBvYmplY3RzIGFzIGNoaWxkcmVuXG4gICAgICBrZXlQcmVmaXggKyAobWFwcGVkQ2hpbGQua2V5ICYmICghY2hpbGQgfHwgY2hpbGQua2V5ICE9PSBtYXBwZWRDaGlsZC5rZXkpID8gZXNjYXBlVXNlclByb3ZpZGVkS2V5KG1hcHBlZENoaWxkLmtleSkgKyAnLycgOiAnJykgKyBjaGlsZEtleSk7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKG1hcHBlZENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCBhcnJheSwgcHJlZml4LCBmdW5jLCBjb250ZXh0KSB7XG4gIHZhciBlc2NhcGVkUHJlZml4ID0gJyc7XG4gIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgIGVzY2FwZWRQcmVmaXggPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkocHJlZml4KSArICcvJztcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gZ2V0UG9vbGVkVHJhdmVyc2VDb250ZXh0KGFycmF5LCBlc2NhcGVkUHJlZml4LCBmdW5jLCBjb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIE1hcHMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLmNvdW50XG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIGNvdW50Q2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsLCBudWxsKTtcbn1cblxuLyoqXG4gKiBGbGF0dGVuIGEgY2hpbGRyZW4gb2JqZWN0ICh0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmApIGFuZFxuICogcmV0dXJuIGFuIGFycmF5IHdpdGggYXBwcm9wcmlhdGVseSByZS1rZXllZCBjaGlsZHJlbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLnRvYXJyYXlcbiAqL1xuZnVuY3Rpb24gdG9BcnJheShjaGlsZHJlbikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ub25seVxuICpcbiAqIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIHRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGEgc2luZ2xlIGNoaWxkIGdldHNcbiAqIHBhc3NlZCB3aXRob3V0IGEgd3JhcHBlciwgYnV0IHRoZSBwdXJwb3NlIG9mIHRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHRvXG4gKiBhYnN0cmFjdCBhd2F5IHRoZSBwYXJ0aWN1bGFyIHN0cnVjdHVyZSBvZiBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IGNoaWxkcmVuIENoaWxkIGNvbGxlY3Rpb24gc3RydWN0dXJlLlxuICogQHJldHVybiB7UmVhY3RFbGVtZW50fSBUaGUgZmlyc3QgYW5kIG9ubHkgYFJlYWN0RWxlbWVudGAgY29udGFpbmVkIGluIHRoZVxuICogc3RydWN0dXJlLlxuICovXG5mdW5jdGlvbiBvbmx5Q2hpbGQoY2hpbGRyZW4pIHtcbiAgIWlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLicpIDogdm9pZCAwO1xuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoZGVmYXVsdFZhbHVlLCBjYWxjdWxhdGVDaGFuZ2VkQml0cykge1xuICBpZiAoY2FsY3VsYXRlQ2hhbmdlZEJpdHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGNhbGN1bGF0ZUNoYW5nZWRCaXRzID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICB7XG4gICAgICAhKGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSBudWxsIHx8IHR5cGVvZiBjYWxjdWxhdGVDaGFuZ2VkQml0cyA9PT0gJ2Z1bmN0aW9uJykgPyB3YXJuaW5nKGZhbHNlLCAnY3JlYXRlQ29udGV4dDogRXhwZWN0ZWQgdGhlIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCB0byBiZSBhICcgKyAnZnVuY3Rpb24uIEluc3RlYWQgcmVjZWl2ZWQ6ICVzJywgY2FsY3VsYXRlQ2hhbmdlZEJpdHMpIDogdm9pZCAwO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb250ZXh0ID0ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9DT05URVhUX1RZUEUsXG4gICAgX2NhbGN1bGF0ZUNoYW5nZWRCaXRzOiBjYWxjdWxhdGVDaGFuZ2VkQml0cyxcbiAgICBfZGVmYXVsdFZhbHVlOiBkZWZhdWx0VmFsdWUsXG4gICAgX2N1cnJlbnRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuICAgIC8vIEFzIGEgd29ya2Fyb3VuZCB0byBzdXBwb3J0IG11bHRpcGxlIGNvbmN1cnJlbnQgcmVuZGVyZXJzLCB3ZSBjYXRlZ29yaXplXG4gICAgLy8gc29tZSByZW5kZXJlcnMgYXMgcHJpbWFyeSBhbmQgb3RoZXJzIGFzIHNlY29uZGFyeS4gV2Ugb25seSBleHBlY3RcbiAgICAvLyB0aGVyZSB0byBiZSB0d28gY29uY3VycmVudCByZW5kZXJlcnMgYXQgbW9zdDogUmVhY3QgTmF0aXZlIChwcmltYXJ5KSBhbmRcbiAgICAvLyBGYWJyaWMgKHNlY29uZGFyeSk7IFJlYWN0IERPTSAocHJpbWFyeSkgYW5kIFJlYWN0IEFSVCAoc2Vjb25kYXJ5KS5cbiAgICAvLyBTZWNvbmRhcnkgcmVuZGVyZXJzIHN0b3JlIHRoZWlyIGNvbnRleHQgdmFsdWVzIG9uIHNlcGFyYXRlIGZpZWxkcy5cbiAgICBfY3VycmVudFZhbHVlMjogZGVmYXVsdFZhbHVlLFxuICAgIF9jaGFuZ2VkQml0czogMCxcbiAgICBfY2hhbmdlZEJpdHMyOiAwLFxuICAgIC8vIFRoZXNlIGFyZSBjaXJjdWxhclxuICAgIFByb3ZpZGVyOiBudWxsLFxuICAgIENvbnN1bWVyOiBudWxsXG4gIH07XG5cbiAgY29udGV4dC5Qcm92aWRlciA9IHtcbiAgICAkJHR5cGVvZjogUkVBQ1RfUFJPVklERVJfVFlQRSxcbiAgICBfY29udGV4dDogY29udGV4dFxuICB9O1xuICBjb250ZXh0LkNvbnN1bWVyID0gY29udGV4dDtcblxuICB7XG4gICAgY29udGV4dC5fY3VycmVudFJlbmRlcmVyID0gbnVsbDtcbiAgICBjb250ZXh0Ll9jdXJyZW50UmVuZGVyZXIyID0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBjb250ZXh0O1xufVxuXG5mdW5jdGlvbiBmb3J3YXJkUmVmKHJlbmRlcikge1xuICB7XG4gICAgISh0eXBlb2YgcmVuZGVyID09PSAnZnVuY3Rpb24nKSA/IHdhcm5pbmcoZmFsc2UsICdmb3J3YXJkUmVmIHJlcXVpcmVzIGEgcmVuZGVyIGZ1bmN0aW9uIGJ1dCB3YXMgZ2l2ZW4gJXMuJywgcmVuZGVyID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHJlbmRlcikgOiB2b2lkIDA7XG5cbiAgICBpZiAocmVuZGVyICE9IG51bGwpIHtcbiAgICAgICEocmVuZGVyLmRlZmF1bHRQcm9wcyA9PSBudWxsICYmIHJlbmRlci5wcm9wVHlwZXMgPT0gbnVsbCkgPyB3YXJuaW5nKGZhbHNlLCAnZm9yd2FyZFJlZiByZW5kZXIgZnVuY3Rpb25zIGRvIG5vdCBzdXBwb3J0IHByb3BUeXBlcyBvciBkZWZhdWx0UHJvcHMuICcgKyAnRGlkIHlvdSBhY2NpZGVudGFsbHkgcGFzcyBhIFJlYWN0IGNvbXBvbmVudD8nKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFLFxuICAgIHJlbmRlcjogcmVuZGVyXG4gIH07XG59XG5cbnZhciBkZXNjcmliZUNvbXBvbmVudEZyYW1lID0gZnVuY3Rpb24gKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKSB7XG4gIHJldHVybiAnXFxuICAgIGluICcgKyAobmFtZSB8fCAnVW5rbm93bicpICsgKHNvdXJjZSA/ICcgKGF0ICcgKyBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpICsgJzonICsgc291cmNlLmxpbmVOdW1iZXIgKyAnKScgOiBvd25lck5hbWUgPyAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKScgOiAnJyk7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8XG4gIC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9USU1FT1VUX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUpO1xufVxuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lKGZpYmVyKSB7XG4gIHZhciB0eXBlID0gZmliZXIudHlwZTtcblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWU7XG4gIH1cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgcmV0dXJuICdBc3luY01vZGUnO1xuICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgcmV0dXJuICdDb250ZXh0LkNvbnN1bWVyJztcbiAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICByZXR1cm4gJ1JlYWN0RnJhZ21lbnQnO1xuICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICByZXR1cm4gJ1JlYWN0UG9ydGFsJztcbiAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICByZXR1cm4gJ1Byb2ZpbGVyKCcgKyBmaWJlci5wZW5kaW5nUHJvcHMuaWQgKyAnKSc7XG4gICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgcmV0dXJuICdDb250ZXh0LlByb3ZpZGVyJztcbiAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N0cmljdE1vZGUnO1xuICAgIGNhc2UgUkVBQ1RfVElNRU9VVF9UWVBFOlxuICAgICAgcmV0dXJuICdUaW1lb3V0JztcbiAgfVxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwpIHtcbiAgICBzd2l0Y2ggKHR5cGUuJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgdmFyIGZ1bmN0aW9uTmFtZSA9IHR5cGUucmVuZGVyLmRpc3BsYXlOYW1lIHx8IHR5cGUucmVuZGVyLm5hbWUgfHwgJyc7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbk5hbWUgIT09ICcnID8gJ0ZvcndhcmRSZWYoJyArIGZ1bmN0aW9uTmFtZSArICcpJyA6ICdGb3J3YXJkUmVmJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogUmVhY3RFbGVtZW50VmFsaWRhdG9yIHByb3ZpZGVzIGEgd3JhcHBlciBhcm91bmQgYSBlbGVtZW50IGZhY3RvcnlcbiAqIHdoaWNoIHZhbGlkYXRlcyB0aGUgcHJvcHMgcGFzc2VkIHRvIHRoZSBlbGVtZW50LiBUaGlzIGlzIGludGVuZGVkIHRvIGJlXG4gKiB1c2VkIG9ubHkgaW4gREVWIGFuZCBjb3VsZCBiZSByZXBsYWNlZCBieSBhIHN0YXRpYyB0eXBlIGNoZWNrZXIgZm9yIGxhbmd1YWdlc1xuICogdGhhdCBzdXBwb3J0IGl0LlxuICovXG5cbnZhciBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IHZvaWQgMDtcbnZhciBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IHZvaWQgMDtcblxudmFyIGdldERpc3BsYXlOYW1lID0gZnVuY3Rpb24gKCkge307XG52YXIgZ2V0U3RhY2tBZGRlbmR1bSA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gbnVsbDtcblxuICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IGZhbHNlO1xuXG4gIGdldERpc3BsYXlOYW1lID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyNlbXB0eSc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJyN0ZXh0JztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC50eXBlO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC50eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSB7XG4gICAgICByZXR1cm4gJ1JlYWN0LkZyYWdtZW50JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVsZW1lbnQudHlwZS5kaXNwbGF5TmFtZSB8fCBlbGVtZW50LnR5cGUubmFtZSB8fCAnVW5rbm93bic7XG4gICAgfVxuICB9O1xuXG4gIGdldFN0YWNrQWRkZW5kdW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YWNrID0gJyc7XG4gICAgaWYgKGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KSB7XG4gICAgICB2YXIgbmFtZSA9IGdldERpc3BsYXlOYW1lKGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KTtcbiAgICAgIHZhciBvd25lciA9IGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50Ll9vd25lcjtcbiAgICAgIHN0YWNrICs9IGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQuX3NvdXJjZSwgb3duZXIgJiYgZ2V0Q29tcG9uZW50TmFtZShvd25lcikpO1xuICAgIH1cbiAgICBzdGFjayArPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKSB8fCAnJztcbiAgICByZXR1cm4gc3RhY2s7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bShlbGVtZW50UHJvcHMpIHtcbiAgaWYgKGVsZW1lbnRQcm9wcyAhPT0gbnVsbCAmJiBlbGVtZW50UHJvcHMgIT09IHVuZGVmaW5lZCAmJiBlbGVtZW50UHJvcHMuX19zb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBzb3VyY2UgPSBlbGVtZW50UHJvcHMuX19zb3VyY2U7XG4gICAgdmFyIGZpbGVOYW1lID0gc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICB2YXIgbGluZU51bWJlciA9IHNvdXJjZS5saW5lTnVtYmVyO1xuICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgeW91ciBjb2RlIGF0ICcgKyBmaWxlTmFtZSArICc6JyArIGxpbmVOdW1iZXIgKyAnLic7XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlcmUncyBubyBrZXkgZXhwbGljaXRseSBzZXQgb24gZHluYW1pYyBhcnJheXMgb2YgY2hpbGRyZW4gb3JcbiAqIG9iamVjdCBrZXlzIGFyZSBub3QgdmFsaWQuIFRoaXMgYWxsb3dzIHVzIHRvIGtlZXAgdHJhY2sgb2YgY2hpbGRyZW4gYmV0d2VlblxuICogdXBkYXRlcy5cbiAqL1xudmFyIG93bmVySGFzS2V5VXNlV2FybmluZyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpIHtcbiAgdmFyIGluZm8gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcblxuICBpZiAoIWluZm8pIHtcbiAgICB2YXIgcGFyZW50TmFtZSA9IHR5cGVvZiBwYXJlbnRUeXBlID09PSAnc3RyaW5nJyA/IHBhcmVudFR5cGUgOiBwYXJlbnRUeXBlLmRpc3BsYXlOYW1lIHx8IHBhcmVudFR5cGUubmFtZTtcbiAgICBpZiAocGFyZW50TmFtZSkge1xuICAgICAgaW5mbyA9ICdcXG5cXG5DaGVjayB0aGUgdG9wLWxldmVsIHJlbmRlciBjYWxsIHVzaW5nIDwnICsgcGFyZW50TmFtZSArICc+Lic7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmZvO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIGV4cGxpY2l0IGtleSBhc3NpZ25lZCB0byBpdC5cbiAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gKiBoYXZlIGEgXCJrZXlcIiBwcm9wZXJ0eSBhc3NpZ25lZCB0byBpdC4gRXJyb3Igc3RhdHVzZXMgYXJlIGNhY2hlZCBzbyBhIHdhcm5pbmdcbiAqIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUV4cGxpY2l0S2V5KGVsZW1lbnQsIHBhcmVudFR5cGUpIHtcbiAgaWYgKCFlbGVtZW50Ll9zdG9yZSB8fCBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgfHwgZWxlbWVudC5rZXkgIT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuXG4gIHZhciBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvID0gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKTtcbiAgaWYgKG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgIHJldHVybjtcbiAgfVxuICBvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10gPSB0cnVlO1xuXG4gIC8vIFVzdWFsbHkgdGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIG9mZmVuZGVyLCBidXQgaWYgaXQgYWNjZXB0cyBjaGlsZHJlbiBhcyBhXG4gIC8vIHByb3BlcnR5LCBpdCBtYXkgYmUgdGhlIGNyZWF0b3Igb2YgdGhlIGNoaWxkIHRoYXQncyByZXNwb25zaWJsZSBmb3JcbiAgLy8gYXNzaWduaW5nIGl0IGEga2V5LlxuICB2YXIgY2hpbGRPd25lciA9ICcnO1xuICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Ll9vd25lciAmJiBlbGVtZW50Ll9vd25lciAhPT0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIC8vIEdpdmUgdGhlIGNvbXBvbmVudCB0aGF0IG9yaWdpbmFsbHkgY3JlYXRlZCB0aGlzIGNoaWxkLlxuICAgIGNoaWxkT3duZXIgPSAnIEl0IHdhcyBwYXNzZWQgYSBjaGlsZCBmcm9tICcgKyBnZXRDb21wb25lbnROYW1lKGVsZW1lbnQuX293bmVyKSArICcuJztcbiAgfVxuXG4gIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gZWxlbWVudDtcbiAge1xuICAgIHdhcm5pbmcoZmFsc2UsICdFYWNoIGNoaWxkIGluIGFuIGFycmF5IG9yIGl0ZXJhdG9yIHNob3VsZCBoYXZlIGEgdW5pcXVlIFwia2V5XCIgcHJvcC4nICsgJyVzJXMgU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1rZXlzIGZvciBtb3JlIGluZm9ybWF0aW9uLiVzJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lciwgZ2V0U3RhY2tBZGRlbmR1bSgpKTtcbiAgfVxuICBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IG51bGw7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG4gICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChpc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gRW50cnkgaXRlcmF0b3JzIHVzZWQgdG8gcHJvdmlkZSBpbXBsaWNpdCBrZXlzLFxuICAgICAgLy8gYnV0IG5vdyB3ZSBwcmludCBhIHNlcGFyYXRlIHdhcm5pbmcgZm9yIHRoZW0gbGF0ZXIuXG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXAgPSB2b2lkIDA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgdmFyIGNvbXBvbmVudENsYXNzID0gZWxlbWVudC50eXBlO1xuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lID0gY29tcG9uZW50Q2xhc3MuZGlzcGxheU5hbWUgfHwgY29tcG9uZW50Q2xhc3MubmFtZTtcbiAgdmFyIHByb3BUeXBlcyA9IGNvbXBvbmVudENsYXNzLnByb3BUeXBlcztcbiAgaWYgKHByb3BUeXBlcykge1xuICAgIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gZWxlbWVudDtcbiAgICBjaGVja1Byb3BUeXBlcyhwcm9wVHlwZXMsIGVsZW1lbnQucHJvcHMsICdwcm9wJywgbmFtZSwgZ2V0U3RhY2tBZGRlbmR1bSk7XG4gICAgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBudWxsO1xuICB9IGVsc2UgaWYgKGNvbXBvbmVudENsYXNzLlByb3BUeXBlcyAhPT0gdW5kZWZpbmVkICYmICFwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93bikge1xuICAgIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICB3YXJuaW5nKGZhbHNlLCAnQ29tcG9uZW50ICVzIGRlY2xhcmVkIGBQcm9wVHlwZXNgIGluc3RlYWQgb2YgYHByb3BUeXBlc2AuIERpZCB5b3UgbWlzc3BlbGwgdGhlIHByb3BlcnR5IGFzc2lnbm1lbnQ/JywgbmFtZSB8fCAnVW5rbm93bicpO1xuICB9XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgIWNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA/IHdhcm5pbmcoZmFsc2UsICdnZXREZWZhdWx0UHJvcHMgaXMgb25seSB1c2VkIG9uIGNsYXNzaWMgUmVhY3QuY3JlYXRlQ2xhc3MgJyArICdkZWZpbml0aW9ucy4gVXNlIGEgc3RhdGljIHByb3BlcnR5IG5hbWVkIGBkZWZhdWx0UHJvcHNgIGluc3RlYWQuJykgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBHaXZlbiBhIGZyYWdtZW50LCB2YWxpZGF0ZSB0aGF0IGl0IGNhbiBvbmx5IGJlIHByb3ZpZGVkIHdpdGggZnJhZ21lbnQgcHJvcHNcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBmcmFnbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZnJhZ21lbnQpIHtcbiAgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBmcmFnbWVudDtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGZyYWdtZW50LnByb3BzKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKGtleSAhPT0gJ2NoaWxkcmVuJyAmJiBrZXkgIT09ICdrZXknKSB7XG4gICAgICB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBwcm9wIGAlc2Agc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4gJyArICdSZWFjdC5GcmFnbWVudCBjYW4gb25seSBoYXZlIGBrZXlgIGFuZCBgY2hpbGRyZW5gIHByb3BzLiVzJywga2V5LCBnZXRTdGFja0FkZGVuZHVtKCkpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGZyYWdtZW50LnJlZiAhPT0gbnVsbCkge1xuICAgIHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGF0dHJpYnV0ZSBgcmVmYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLiVzJywgZ2V0U3RhY2tBZGRlbmR1bSgpKTtcbiAgfVxuXG4gIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uKHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuICB2YXIgdmFsaWRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpO1xuXG4gIC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gIC8vIHN1Y2NlZWQgYW5kIHRoZXJlIHdpbGwgbGlrZWx5IGJlIGVycm9ycyBpbiByZW5kZXIuXG4gIGlmICghdmFsaWRUeXBlKSB7XG4gICAgdmFyIGluZm8gPSAnJztcbiAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHR5cGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaW5mbyArPSAnIFlvdSBsaWtlbHkgZm9yZ290IHRvIGV4cG9ydCB5b3VyIGNvbXBvbmVudCBmcm9tIHRoZSBmaWxlICcgKyBcIml0J3MgZGVmaW5lZCBpbiwgb3IgeW91IG1pZ2h0IGhhdmUgbWl4ZWQgdXAgZGVmYXVsdCBhbmQgbmFtZWQgaW1wb3J0cy5cIjtcbiAgICB9XG5cbiAgICB2YXIgc291cmNlSW5mbyA9IGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtKHByb3BzKTtcbiAgICBpZiAoc291cmNlSW5mbykge1xuICAgICAgaW5mbyArPSBzb3VyY2VJbmZvO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmZvICs9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuICAgIH1cblxuICAgIGluZm8gKz0gZ2V0U3RhY2tBZGRlbmR1bSgpIHx8ICcnO1xuXG4gICAgdmFyIHR5cGVTdHJpbmcgPSB2b2lkIDA7XG4gICAgaWYgKHR5cGUgPT09IG51bGwpIHtcbiAgICAgIHR5cGVTdHJpbmcgPSAnbnVsbCc7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICB0eXBlU3RyaW5nID0gJ2FycmF5JztcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZVN0cmluZyA9IHR5cGVvZiB0eXBlO1xuICAgIH1cblxuICAgIHdhcm5pbmcoZmFsc2UsICdSZWFjdC5jcmVhdGVFbGVtZW50OiB0eXBlIGlzIGludmFsaWQgLS0gZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciAnICsgJ2J1aWx0LWluIGNvbXBvbmVudHMpIG9yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgJyArICdjb21wb25lbnRzKSBidXQgZ290OiAlcy4lcycsIHR5cGVTdHJpbmcsIGluZm8pO1xuICB9XG5cbiAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvLyBTa2lwIGtleSB3YXJuaW5nIGlmIHRoZSB0eXBlIGlzbid0IHZhbGlkIHNpbmNlIG91ciBrZXkgdmFsaWRhdGlvbiBsb2dpY1xuICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgLy8gKFJlbmRlcmluZyB3aWxsIHRocm93IHdpdGggYSBoZWxwZnVsIG1lc3NhZ2UgYW5kIGFzIHNvb24gYXMgdGhlIHR5cGUgaXNcbiAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICBpZiAodmFsaWRUeXBlKSB7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgdHlwZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUpIHtcbiAgICB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZWxlbWVudCk7XG4gIH0gZWxzZSB7XG4gICAgdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRmFjdG9yeVdpdGhWYWxpZGF0aW9uKHR5cGUpIHtcbiAgdmFyIHZhbGlkYXRlZEZhY3RvcnkgPSBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24uYmluZChudWxsLCB0eXBlKTtcbiAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcbiAgLy8gTGVnYWN5IGhvb2s6IHJlbW92ZSBpdFxuICB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbGlkYXRlZEZhY3RvcnksICd0eXBlJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICdGYWN0b3J5LnR5cGUgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHRoZSBjbGFzcyBkaXJlY3RseSAnICsgJ2JlZm9yZSBwYXNzaW5nIGl0IHRvIGNyZWF0ZUZhY3RvcnkuJyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICB2YWx1ZTogdHlwZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbn1cblxuZnVuY3Rpb24gY2xvbmVFbGVtZW50V2l0aFZhbGlkYXRpb24oZWxlbWVudCwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIHZhciBuZXdFbGVtZW50ID0gY2xvbmVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCBuZXdFbGVtZW50LnR5cGUpO1xuICB9XG4gIHZhbGlkYXRlUHJvcFR5cGVzKG5ld0VsZW1lbnQpO1xuICByZXR1cm4gbmV3RWxlbWVudDtcbn1cblxudmFyIFJlYWN0ID0ge1xuICBDaGlsZHJlbjoge1xuICAgIG1hcDogbWFwQ2hpbGRyZW4sXG4gICAgZm9yRWFjaDogZm9yRWFjaENoaWxkcmVuLFxuICAgIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICAgIHRvQXJyYXk6IHRvQXJyYXksXG4gICAgb25seTogb25seUNoaWxkXG4gIH0sXG5cbiAgY3JlYXRlUmVmOiBjcmVhdGVSZWYsXG4gIENvbXBvbmVudDogQ29tcG9uZW50LFxuICBQdXJlQ29tcG9uZW50OiBQdXJlQ29tcG9uZW50LFxuXG4gIGNyZWF0ZUNvbnRleHQ6IGNyZWF0ZUNvbnRleHQsXG4gIGZvcndhcmRSZWY6IGZvcndhcmRSZWYsXG5cbiAgRnJhZ21lbnQ6IFJFQUNUX0ZSQUdNRU5UX1RZUEUsXG4gIFN0cmljdE1vZGU6IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUsXG4gIHVuc3RhYmxlX0FzeW5jTW9kZTogUkVBQ1RfQVNZTkNfTU9ERV9UWVBFLFxuICB1bnN0YWJsZV9Qcm9maWxlcjogUkVBQ1RfUFJPRklMRVJfVFlQRSxcblxuICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24sXG4gIGNsb25lRWxlbWVudDogY2xvbmVFbGVtZW50V2l0aFZhbGlkYXRpb24sXG4gIGNyZWF0ZUZhY3Rvcnk6IGNyZWF0ZUZhY3RvcnlXaXRoVmFsaWRhdGlvbixcbiAgaXNWYWxpZEVsZW1lbnQ6IGlzVmFsaWRFbGVtZW50LFxuXG4gIHZlcnNpb246IFJlYWN0VmVyc2lvbixcblxuICBfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDoge1xuICAgIFJlYWN0Q3VycmVudE93bmVyOiBSZWFjdEN1cnJlbnRPd25lcixcbiAgICAvLyBVc2VkIGJ5IHJlbmRlcmVycyB0byBhdm9pZCBidW5kbGluZyBvYmplY3QtYXNzaWduIHR3aWNlIGluIFVNRCBidW5kbGVzOlxuICAgIGFzc2lnbjogX2Fzc2lnblxuICB9XG59O1xuXG5pZiAoZW5hYmxlU3VzcGVuc2UpIHtcbiAgUmVhY3QuVGltZW91dCA9IFJFQUNUX1RJTUVPVVRfVFlQRTtcbn1cblxue1xuICBfYXNzaWduKFJlYWN0Ll9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVELCB7XG4gICAgLy8gVGhlc2Ugc2hvdWxkIG5vdCBiZSBpbmNsdWRlZCBpbiBwcm9kdWN0aW9uLlxuICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWU6IFJlYWN0RGVidWdDdXJyZW50RnJhbWUsXG4gICAgLy8gU2hpbSBmb3IgUmVhY3QgRE9NIDE2LjAuMCB3aGljaCBzdGlsbCBkZXN0cnVjdHVyZWQgKGJ1dCBub3QgdXNlZCkgdGhpcy5cbiAgICAvLyBUT0RPOiByZW1vdmUgaW4gUmVhY3QgMTcuMC5cbiAgICBSZWFjdENvbXBvbmVudFRyZWVIb29rOiB7fVxuICB9KTtcbn1cblxuXG5cbnZhciBSZWFjdCQyID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGRlZmF1bHQ6IFJlYWN0XG59KTtcblxudmFyIFJlYWN0JDMgPSAoIFJlYWN0JDIgJiYgUmVhY3QgKSB8fCBSZWFjdCQyO1xuXG4vLyBUT0RPOiBkZWNpZGUgb24gdGhlIHRvcC1sZXZlbCBleHBvcnQgZm9ybS5cbi8vIFRoaXMgaXMgaGFja3kgYnV0IG1ha2VzIGl0IHdvcmsgd2l0aCBib3RoIFJvbGx1cCBhbmQgSmVzdC5cbnZhciByZWFjdCA9IFJlYWN0JDMuZGVmYXVsdCA/IFJlYWN0JDMuZGVmYXVsdCA6IFJlYWN0JDM7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVhY3Q7XG4gIH0pKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcmVhY3QvY2pzL3JlYWN0LmRldmVsb3BtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLFxuICAgICAgICAgICAgICBwcm9wRnVsbE5hbWUsXG4gICAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAlcyBhdCBpbmRleCAlcy4nLFxuICAgICAgICAgIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSxcbiAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciByZWRlZmluZUFsbCA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgJGl0ZXJEZWZpbmUgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBzZXRTcGVjaWVzID0gcmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFzdEtleSA9IHJlcXVpcmUoJy4vX21ldGEnKS5mYXN0S2V5O1xudmFyIHZhbGlkYXRlID0gcmVxdWlyZSgnLi9fdmFsaWRhdGUtY29sbGVjdGlvbicpO1xudmFyIFNJWkUgPSBERVNDUklQVE9SUyA/ICdfcycgOiAnc2l6ZSc7XG5cbnZhciBnZXRFbnRyeSA9IGZ1bmN0aW9uICh0aGF0LCBrZXkpIHtcbiAgLy8gZmFzdCBjYXNlXG4gIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KTtcbiAgdmFyIGVudHJ5O1xuICBpZiAoaW5kZXggIT09ICdGJykgcmV0dXJuIHRoYXQuX2lbaW5kZXhdO1xuICAvLyBmcm96ZW4gb2JqZWN0IGNhc2VcbiAgZm9yIChlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pIHtcbiAgICBpZiAoZW50cnkuayA9PSBrZXkpIHJldHVybiBlbnRyeTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbiAod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUikge1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbiAodGhhdCwgaXRlcmFibGUpIHtcbiAgICAgIGFuSW5zdGFuY2UodGhhdCwgQywgTkFNRSwgJ19pJyk7XG4gICAgICB0aGF0Ll90ID0gTkFNRTsgICAgICAgICAvLyBjb2xsZWN0aW9uIHR5cGVcbiAgICAgIHRoYXQuX2kgPSBjcmVhdGUobnVsbCk7IC8vIGluZGV4XG4gICAgICB0aGF0Ll9mID0gdW5kZWZpbmVkOyAgICAvLyBmaXJzdCBlbnRyeVxuICAgICAgdGhhdC5fbCA9IHVuZGVmaW5lZDsgICAgLy8gbGFzdCBlbnRyeVxuICAgICAgdGhhdFtTSVpFXSA9IDA7ICAgICAgICAgLy8gc2l6ZVxuICAgICAgaWYgKGl0ZXJhYmxlICE9IHVuZGVmaW5lZCkgZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICBmb3IgKHZhciB0aGF0ID0gdmFsaWRhdGUodGhpcywgTkFNRSksIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pIHtcbiAgICAgICAgICBlbnRyeS5yID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoZW50cnkucCkgZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgdGhhdCA9IHZhbGlkYXRlKHRoaXMsIE5BTUUpO1xuICAgICAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICB2YXIgbmV4dCA9IGVudHJ5Lm47XG4gICAgICAgICAgdmFyIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmIChwcmV2KSBwcmV2Lm4gPSBuZXh0O1xuICAgICAgICAgIGlmIChuZXh0KSBuZXh0LnAgPSBwcmV2O1xuICAgICAgICAgIGlmICh0aGF0Ll9mID09IGVudHJ5KSB0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZiAodGhhdC5fbCA9PSBlbnRyeSkgdGhhdC5fbCA9IHByZXY7XG4gICAgICAgICAgdGhhdFtTSVpFXS0tO1xuICAgICAgICB9IHJldHVybiAhIWVudHJ5O1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjIuMy42IFNldC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgLy8gMjMuMS4zLjUgTWFwLnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGF0ID0gdW5kZWZpbmVkICovKSB7XG4gICAgICAgIHZhbGlkYXRlKHRoaXMsIE5BTUUpO1xuICAgICAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMyk7XG4gICAgICAgIHZhciBlbnRyeTtcbiAgICAgICAgd2hpbGUgKGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhpcy5fZikge1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUgKGVudHJ5ICYmIGVudHJ5LnIpIGVudHJ5ID0gZW50cnkucDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy43IE1hcC5wcm90b3R5cGUuaGFzKGtleSlcbiAgICAgIC8vIDIzLjIuMy43IFNldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHZhbGlkYXRlKHRoaXMsIE5BTUUpLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChERVNDUklQVE9SUykgZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZSh0aGlzLCBOQU1FKVtTSVpFXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbiAodGhhdCwga2V5LCB2YWx1ZSkge1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgdmFyIHByZXYsIGluZGV4O1xuICAgIC8vIGNoYW5nZSBleGlzdGluZyBlbnRyeVxuICAgIGlmIChlbnRyeSkge1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5fbCA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXQuX2wsICAgICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYgKCF0aGF0Ll9mKSB0aGF0Ll9mID0gZW50cnk7XG4gICAgICBpZiAocHJldikgcHJldi5uID0gZW50cnk7XG4gICAgICB0aGF0W1NJWkVdKys7XG4gICAgICAvLyBhZGQgdG8gaW5kZXhcbiAgICAgIGlmIChpbmRleCAhPT0gJ0YnKSB0aGF0Ll9pW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgc2V0U3Ryb25nOiBmdW5jdGlvbiAoQywgTkFNRSwgSVNfTUFQKSB7XG4gICAgLy8gYWRkIC5rZXlzLCAudmFsdWVzLCAuZW50cmllcywgW0BAaXRlcmF0b3JdXG4gICAgLy8gMjMuMS4zLjQsIDIzLjEuMy44LCAyMy4xLjMuMTEsIDIzLjEuMy4xMiwgMjMuMi4zLjUsIDIzLjIuMy44LCAyMy4yLjMuMTAsIDIzLjIuMy4xMVxuICAgICRpdGVyRGVmaW5lKEMsIE5BTUUsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICAgICAgdGhpcy5fdCA9IHZhbGlkYXRlKGl0ZXJhdGVkLCBOQU1FKTsgLy8gdGFyZ2V0XG4gICAgICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gICAgICB0aGlzLl9sID0gdW5kZWZpbmVkOyAgICAgICAgICAgICAgICAvLyBwcmV2aW91c1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBraW5kID0gdGhhdC5faztcbiAgICAgIHZhciBlbnRyeSA9IHRoYXQuX2w7XG4gICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgIHdoaWxlIChlbnRyeSAmJiBlbnRyeS5yKSBlbnRyeSA9IGVudHJ5LnA7XG4gICAgICAvLyBnZXQgbmV4dCBlbnRyeVxuICAgICAgaWYgKCF0aGF0Ll90IHx8ICEodGhhdC5fbCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhhdC5fdC5fZikpIHtcbiAgICAgICAgLy8gb3IgZmluaXNoIHRoZSBpdGVyYXRpb25cbiAgICAgICAgdGhhdC5fdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHN0ZXAoMSk7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiBzdGVwKDAsIGVudHJ5LmspO1xuICAgICAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiBzdGVwKDAsIGVudHJ5LnYpO1xuICAgICAgcmV0dXJuIHN0ZXAoMCwgW2VudHJ5LmssIGVudHJ5LnZdKTtcbiAgICB9LCBJU19NQVAgPyAnZW50cmllcycgOiAndmFsdWVzJywgIUlTX01BUCwgdHJ1ZSk7XG5cbiAgICAvLyBhZGQgW0BAc3BlY2llc10sIDIzLjEuMi4yLCAyMy4yLjIuMlxuICAgIHNldFNwZWNpZXMoTkFNRSk7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJy4vX21ldGEnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciByZWRlZmluZUFsbCA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGVhY2ggPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMCk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChOQU1FLCB3cmFwcGVyLCBtZXRob2RzLCBjb21tb24sIElTX01BUCwgSVNfV0VBSykge1xuICB2YXIgQmFzZSA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIEMgPSBCYXNlO1xuICB2YXIgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnO1xuICB2YXIgcHJvdG8gPSBDICYmIEMucHJvdG90eXBlO1xuICB2YXIgTyA9IHt9O1xuICBpZiAoIURFU0NSSVBUT1JTIHx8IHR5cGVvZiBDICE9ICdmdW5jdGlvbicgfHwgIShJU19XRUFLIHx8IHByb3RvLmZvckVhY2ggJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICBuZXcgQygpLmVudHJpZXMoKS5uZXh0KCk7XG4gIH0pKSkge1xuICAgIC8vIGNyZWF0ZSBjb2xsZWN0aW9uIGNvbnN0cnVjdG9yXG4gICAgQyA9IGNvbW1vbi5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwgbWV0aG9kcyk7XG4gICAgbWV0YS5ORUVEID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBDID0gd3JhcHBlcihmdW5jdGlvbiAodGFyZ2V0LCBpdGVyYWJsZSkge1xuICAgICAgYW5JbnN0YW5jZSh0YXJnZXQsIEMsIE5BTUUsICdfYycpO1xuICAgICAgdGFyZ2V0Ll9jID0gbmV3IEJhc2UoKTtcbiAgICAgIGlmIChpdGVyYWJsZSAhPSB1bmRlZmluZWQpIGZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRhcmdldFtBRERFUl0sIHRhcmdldCk7XG4gICAgfSk7XG4gICAgZWFjaCgnYWRkLGNsZWFyLGRlbGV0ZSxmb3JFYWNoLGdldCxoYXMsc2V0LGtleXMsdmFsdWVzLGVudHJpZXMsdG9KU09OJy5zcGxpdCgnLCcpLCBmdW5jdGlvbiAoS0VZKSB7XG4gICAgICB2YXIgSVNfQURERVIgPSBLRVkgPT0gJ2FkZCcgfHwgS0VZID09ICdzZXQnO1xuICAgICAgaWYgKEtFWSBpbiBwcm90byAmJiAhKElTX1dFQUsgJiYgS0VZID09ICdjbGVhcicpKSBoaWRlKEMucHJvdG90eXBlLCBLRVksIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGFuSW5zdGFuY2UodGhpcywgQywgS0VZKTtcbiAgICAgICAgaWYgKCFJU19BRERFUiAmJiBJU19XRUFLICYmICFpc09iamVjdChhKSkgcmV0dXJuIEtFWSA9PSAnZ2V0JyA/IHVuZGVmaW5lZCA6IGZhbHNlO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fY1tLRVldKGEgPT09IDAgPyAwIDogYSwgYik7XG4gICAgICAgIHJldHVybiBJU19BRERFUiA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBJU19XRUFLIHx8IGRQKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYy5zaXplO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9TdHJpbmdUYWcoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GLCBPKTtcblxuICBpZiAoIUlTX1dFQUspIGNvbW1vbi5zZXRTdHJvbmcoQywgTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gMCAtPiBBcnJheSNmb3JFYWNoXG4vLyAxIC0+IEFycmF5I21hcFxuLy8gMiAtPiBBcnJheSNmaWx0ZXJcbi8vIDMgLT4gQXJyYXkjc29tZVxuLy8gNCAtPiBBcnJheSNldmVyeVxuLy8gNSAtPiBBcnJheSNmaW5kXG4vLyA2IC0+IEFycmF5I2ZpbmRJbmRleFxudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGFzYyA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUWVBFLCAkY3JlYXRlKSB7XG4gIHZhciBJU19NQVAgPSBUWVBFID09IDE7XG4gIHZhciBJU19GSUxURVIgPSBUWVBFID09IDI7XG4gIHZhciBJU19TT01FID0gVFlQRSA9PSAzO1xuICB2YXIgSVNfRVZFUlkgPSBUWVBFID09IDQ7XG4gIHZhciBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2O1xuICB2YXIgTk9fSE9MRVMgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWDtcbiAgdmFyIGNyZWF0ZSA9ICRjcmVhdGUgfHwgYXNjO1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCgkdGhpcyk7XG4gICAgdmFyIHNlbGYgPSBJT2JqZWN0KE8pO1xuICAgIHZhciBmID0gY3R4KGNhbGxiYWNrZm4sIHRoYXQsIDMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChzZWxmLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgdmFsLCByZXM7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKSB7XG4gICAgICB2YWwgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlcyA9IGYodmFsLCBpbmRleCwgTyk7XG4gICAgICBpZiAoVFlQRSkge1xuICAgICAgICBpZiAoSVNfTUFQKSByZXN1bHRbaW5kZXhdID0gcmVzOyAgIC8vIG1hcFxuICAgICAgICBlbHNlIGlmIChyZXMpIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWw7ICAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiByZXN1bHQucHVzaCh2YWwpOyAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZiAoSVNfRVZFUlkpIHJldHVybiBmYWxzZTsgLy8gZXZlcnlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHJlc3VsdDtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanNcbi8vIG1vZHVsZSBpZCA9IDEzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gOS40LjIuMyBBcnJheVNwZWNpZXNDcmVhdGUob3JpZ2luYWxBcnJheSwgbGVuZ3RoKVxudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWwsIGxlbmd0aCkge1xuICByZXR1cm4gbmV3IChzcGVjaWVzQ29uc3RydWN0b3Iob3JpZ2luYWwpKShsZW5ndGgpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbCkpIHtcbiAgICBDID0gb3JpZ2luYWwuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZiAodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKSBDID0gdW5kZWZpbmVkO1xuICAgIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgZnJvbSA9IHJlcXVpcmUoJy4vX2FycmF5LWZyb20taXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE5BTUUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICBpZiAoY2xhc3NvZih0aGlzKSAhPSBOQU1FKSB0aHJvdyBUeXBlRXJyb3IoTkFNRSArIFwiI3RvSlNPTiBpc24ndCBnZW5lcmljXCIpO1xuICAgIHJldHVybiBmcm9tKHRoaXMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi10by1qc29uLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyLCBJVEVSQVRPUikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvck9mKGl0ZXIsIGZhbHNlLCByZXN1bHQucHVzaCwgcmVzdWx0LCBJVEVSQVRPUik7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1mcm9tLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS9cbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTExFQ1RJT04pIHtcbiAgJGV4cG9ydCgkZXhwb3J0LlMsIENPTExFQ1RJT04sIHsgb2Y6IGZ1bmN0aW9uIG9mKCkge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBBID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSBBW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICByZXR1cm4gbmV3IHRoaXMoQSk7XG4gIH0gfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtY29sbGVjdGlvbi1vZi5qc1xuLy8gbW9kdWxlIGlkID0gMTQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL3Byb3Bvc2FsLXNldG1hcC1vZmZyb20vXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDT0xMRUNUSU9OKSB7XG4gICRleHBvcnQoJGV4cG9ydC5TLCBDT0xMRUNUSU9OLCB7IGZyb206IGZ1bmN0aW9uIGZyb20oc291cmNlIC8qICwgbWFwRm4sIHRoaXNBcmcgKi8pIHtcbiAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIG1hcHBpbmcsIEEsIG4sIGNiO1xuICAgIGFGdW5jdGlvbih0aGlzKTtcbiAgICBtYXBwaW5nID0gbWFwRm4gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAobWFwcGluZykgYUZ1bmN0aW9uKG1hcEZuKTtcbiAgICBpZiAoc291cmNlID09IHVuZGVmaW5lZCkgcmV0dXJuIG5ldyB0aGlzKCk7XG4gICAgQSA9IFtdO1xuICAgIGlmIChtYXBwaW5nKSB7XG4gICAgICBuID0gMDtcbiAgICAgIGNiID0gY3R4KG1hcEZuLCBhcmd1bWVudHNbMl0sIDIpO1xuICAgICAgZm9yT2Yoc291cmNlLCBmYWxzZSwgZnVuY3Rpb24gKG5leHRJdGVtKSB7XG4gICAgICAgIEEucHVzaChjYihuZXh0SXRlbSwgbisrKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yT2Yoc291cmNlLCBmYWxzZSwgQS5wdXNoLCBBKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyB0aGlzKEEpO1xuICB9IH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LWNvbGxlY3Rpb24tZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCkge1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0ID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpdGVyRm4gPSBnZXQoaXQpO1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDE2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDE2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBEb2N1bWVudCwgeyBIZWFkLCBNYWluLCBOZXh0U2NyaXB0IH0gZnJvbSBcIm5leHQvZG9jdW1lbnRcIjtcbmltcG9ydCBcIi4uL3N0eWxlcy9tYXRlcmlhbGl6ZS5jc3NcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15RG9jdW1lbnQgZXh0ZW5kcyBEb2N1bWVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGh0bWwgc3R5bGU9e3sgYmFja2dyb3VuZDogXCIjRUVFXCIsIGNvbG9yOiBcIiM0NDRcIiB9fT5cbiAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgPG1ldGFcbiAgICAgICAgICAgIG5hbWU9XCJ2aWV3cG9ydFwiXG4gICAgICAgICAgICBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLGluaXRpYWwtc2NhbGU9MSxtYXhpbXVtLXNjYWxlPTEsdXNlci1zY2FsYWJsZT1ubyxtaW5pbWFsLXVpXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCIjNjczYWI3XCIgLz5cbiAgICAgICAgICA8bGluayByZWw9XCJtYW5pZmVzdFwiIGhyZWY9XCJzdGF0aWMvbWFuaWZlc3QuanNvblwiIC8+XG4gICAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCJzdGF0aWMvaW1nL2Zhdmljb24uaWNvXCIgLz5cblxuICAgICAgICAgIDx0aXRsZT5uZXh0LXN0YWNrPC90aXRsZT5cbiAgICAgICAgPC9IZWFkPlxuICAgICAgICA8Ym9keT5cbiAgICAgICAgICA8TWFpbiAvPlxuICAgICAgICAgIDxOZXh0U2NyaXB0IC8+XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvaHRtbD5cbiAgICApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcy9fZG9jdW1lbnQuanM/ZW50cnkiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLk5leHRTY3JpcHQgPSBleHBvcnRzLk1haW4gPSBleHBvcnRzLkhlYWQgPSB1bmRlZmluZWQ7XG5cbnZhciBfZXh0ZW5kczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcycpO1xuXG52YXIgX2V4dGVuZHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0ZW5kczIpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mJyk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuJyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzJyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxudmFyIF9odG1sZXNjYXBlID0gcmVxdWlyZSgnaHRtbGVzY2FwZScpO1xuXG52YXIgX2h0bWxlc2NhcGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaHRtbGVzY2FwZSk7XG5cbnZhciBfc2VydmVyID0gcmVxdWlyZSgnc3R5bGVkLWpzeC9zZXJ2ZXInKTtcblxudmFyIF9zZXJ2ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2VydmVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIERvY3VtZW50ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoRG9jdW1lbnQsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIERvY3VtZW50KCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIERvY3VtZW50KTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoRG9jdW1lbnQuX19wcm90b19fIHx8ICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKERvY3VtZW50KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShEb2N1bWVudCwgW3tcbiAgICBrZXk6ICdnZXRDaGlsZENvbnRleHQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICByZXR1cm4geyBfZG9jdW1lbnRQcm9wczogdGhpcy5wcm9wcyB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2h0bWwnLFxuICAgICAgICBudWxsLFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChIZWFkLCBudWxsKSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2JvZHknLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTWFpbiwgbnVsbCksXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTmV4dFNjcmlwdCwgbnVsbClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogJ2dldEluaXRpYWxQcm9wcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEluaXRpYWxQcm9wcyhfcmVmKSB7XG4gICAgICB2YXIgcmVuZGVyUGFnZSA9IF9yZWYucmVuZGVyUGFnZTtcblxuICAgICAgdmFyIF9yZW5kZXJQYWdlID0gcmVuZGVyUGFnZSgpLFxuICAgICAgICAgIGh0bWwgPSBfcmVuZGVyUGFnZS5odG1sLFxuICAgICAgICAgIGhlYWQgPSBfcmVuZGVyUGFnZS5oZWFkLFxuICAgICAgICAgIGVycm9ySHRtbCA9IF9yZW5kZXJQYWdlLmVycm9ySHRtbCxcbiAgICAgICAgICBjaHVua3MgPSBfcmVuZGVyUGFnZS5jaHVua3M7XG5cbiAgICAgIHZhciBzdHlsZXMgPSAoMCwgX3NlcnZlcjIuZGVmYXVsdCkoKTtcbiAgICAgIHJldHVybiB7IGh0bWw6IGh0bWwsIGhlYWQ6IGhlYWQsIGVycm9ySHRtbDogZXJyb3JIdG1sLCBjaHVua3M6IGNodW5rcywgc3R5bGVzOiBzdHlsZXMgfTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIERvY3VtZW50O1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuRG9jdW1lbnQuY2hpbGRDb250ZXh0VHlwZXMgPSB7XG4gIF9kb2N1bWVudFByb3BzOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmFueVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IERvY3VtZW50O1xuXG52YXIgSGVhZCA9IGV4cG9ydHMuSGVhZCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50Mikge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShIZWFkLCBfQ29tcG9uZW50Mik7XG5cbiAgZnVuY3Rpb24gSGVhZCgpIHtcbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBIZWFkKTtcbiAgICByZXR1cm4gKDAsIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMy5kZWZhdWx0KSh0aGlzLCAoSGVhZC5fX3Byb3RvX18gfHwgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoSGVhZCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoSGVhZCwgW3tcbiAgICBrZXk6ICdnZXRDaHVua1ByZWxvYWRMaW5rJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2h1bmtQcmVsb2FkTGluayhmaWxlbmFtZSkge1xuICAgICAgdmFyIF9fTkVYVF9EQVRBX18gPSB0aGlzLmNvbnRleHQuX2RvY3VtZW50UHJvcHMuX19ORVhUX0RBVEFfXztcbiAgICAgIHZhciBidWlsZFN0YXRzID0gX19ORVhUX0RBVEFfXy5idWlsZFN0YXRzLFxuICAgICAgICAgIGFzc2V0UHJlZml4ID0gX19ORVhUX0RBVEFfXy5hc3NldFByZWZpeCxcbiAgICAgICAgICBidWlsZElkID0gX19ORVhUX0RBVEFfXy5idWlsZElkO1xuXG4gICAgICB2YXIgaGFzaCA9IGJ1aWxkU3RhdHMgPyBidWlsZFN0YXRzW2ZpbGVuYW1lXS5oYXNoIDogYnVpbGRJZDtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdsaW5rJywge1xuICAgICAgICBrZXk6IGZpbGVuYW1lLFxuICAgICAgICByZWw6ICdwcmVsb2FkJyxcbiAgICAgICAgaHJlZjogYXNzZXRQcmVmaXggKyAnL19uZXh0LycgKyBoYXNoICsgJy8nICsgZmlsZW5hbWUsXG4gICAgICAgIGFzOiAnc2NyaXB0J1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0UHJlbG9hZE1haW5MaW5rcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFByZWxvYWRNYWluTGlua3MoKSB7XG4gICAgICB2YXIgZGV2ID0gdGhpcy5jb250ZXh0Ll9kb2N1bWVudFByb3BzLmRldjtcblxuICAgICAgaWYgKGRldikge1xuICAgICAgICByZXR1cm4gW3RoaXMuZ2V0Q2h1bmtQcmVsb2FkTGluaygnbWFuaWZlc3QuanMnKSwgdGhpcy5nZXRDaHVua1ByZWxvYWRMaW5rKCdjb21tb25zLmpzJyksIHRoaXMuZ2V0Q2h1bmtQcmVsb2FkTGluaygnbWFpbi5qcycpXTtcbiAgICAgIH1cblxuICAgICAgLy8gSW4gdGhlIHByb2R1Y3Rpb24gbW9kZSwgd2UgaGF2ZSBhIHNpbmdsZSBhc3NldCB3aXRoIGFsbCB0aGUgSlMgY29udGVudC5cbiAgICAgIHJldHVybiBbdGhpcy5nZXRDaHVua1ByZWxvYWRMaW5rKCdhcHAuanMnKV07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0UHJlbG9hZER5bmFtaWNDaHVua3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRQcmVsb2FkRHluYW1pY0NodW5rcygpIHtcbiAgICAgIHZhciBfY29udGV4dCRfZG9jdW1lbnRQcm8gPSB0aGlzLmNvbnRleHQuX2RvY3VtZW50UHJvcHMsXG4gICAgICAgICAgY2h1bmtzID0gX2NvbnRleHQkX2RvY3VtZW50UHJvLmNodW5rcyxcbiAgICAgICAgICBfX05FWFRfREFUQV9fID0gX2NvbnRleHQkX2RvY3VtZW50UHJvLl9fTkVYVF9EQVRBX187XG4gICAgICB2YXIgYXNzZXRQcmVmaXggPSBfX05FWFRfREFUQV9fLmFzc2V0UHJlZml4LFxuICAgICAgICAgIGJ1aWxkSWQgPSBfX05FWFRfREFUQV9fLmJ1aWxkSWQ7XG5cbiAgICAgIHJldHVybiBjaHVua3MubWFwKGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnLCB7XG4gICAgICAgICAga2V5OiBjaHVuayxcbiAgICAgICAgICByZWw6ICdwcmVsb2FkJyxcbiAgICAgICAgICBocmVmOiBhc3NldFByZWZpeCArICcvX25leHQvJyArIGJ1aWxkSWQgKyAnL3dlYnBhY2svY2h1bmtzLycgKyBjaHVuayxcbiAgICAgICAgICBhczogJ3NjcmlwdCdcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX2NvbnRleHQkX2RvY3VtZW50UHJvMiA9IHRoaXMuY29udGV4dC5fZG9jdW1lbnRQcm9wcyxcbiAgICAgICAgICBoZWFkID0gX2NvbnRleHQkX2RvY3VtZW50UHJvMi5oZWFkLFxuICAgICAgICAgIHN0eWxlcyA9IF9jb250ZXh0JF9kb2N1bWVudFBybzIuc3R5bGVzLFxuICAgICAgICAgIF9fTkVYVF9EQVRBX18gPSBfY29udGV4dCRfZG9jdW1lbnRQcm8yLl9fTkVYVF9EQVRBX187XG4gICAgICB2YXIgcGF0aG5hbWUgPSBfX05FWFRfREFUQV9fLnBhdGhuYW1lLFxuICAgICAgICAgIGJ1aWxkSWQgPSBfX05FWFRfREFUQV9fLmJ1aWxkSWQsXG4gICAgICAgICAgYXNzZXRQcmVmaXggPSBfX05FWFRfREFUQV9fLmFzc2V0UHJlZml4O1xuXG4gICAgICB2YXIgcGFnZVBhdGhuYW1lID0gZ2V0UGFnZVBhdGhuYW1lKHBhdGhuYW1lKTtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnaGVhZCcsXG4gICAgICAgIHRoaXMucHJvcHMsXG4gICAgICAgIChoZWFkIHx8IFtdKS5tYXAoZnVuY3Rpb24gKGgsIGkpIHtcbiAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNsb25lRWxlbWVudChoLCB7IGtleTogaSB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdsaW5rJywgeyByZWw6ICdwcmVsb2FkJywgaHJlZjogYXNzZXRQcmVmaXggKyAnL19uZXh0LycgKyBidWlsZElkICsgJy9wYWdlJyArIHBhZ2VQYXRobmFtZSwgYXM6ICdzY3JpcHQnIH0pLFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnbGluaycsIHsgcmVsOiAncHJlbG9hZCcsIGhyZWY6IGFzc2V0UHJlZml4ICsgJy9fbmV4dC8nICsgYnVpbGRJZCArICcvcGFnZS9fZXJyb3IuanMnLCBhczogJ3NjcmlwdCcgfSksXG4gICAgICAgIHRoaXMuZ2V0UHJlbG9hZER5bmFtaWNDaHVua3MoKSxcbiAgICAgICAgdGhpcy5nZXRQcmVsb2FkTWFpbkxpbmtzKCksXG4gICAgICAgIHN0eWxlcyB8fCBudWxsLFxuICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gSGVhZDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkhlYWQuY29udGV4dFR5cGVzID0ge1xuICBfZG9jdW1lbnRQcm9wczogX3Byb3BUeXBlczIuZGVmYXVsdC5hbnlcbn07XG5cbnZhciBNYWluID0gZXhwb3J0cy5NYWluID0gZnVuY3Rpb24gKF9Db21wb25lbnQzKSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKE1haW4sIF9Db21wb25lbnQzKTtcblxuICBmdW5jdGlvbiBNYWluKCkge1xuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2szLmRlZmF1bHQpKHRoaXMsIE1haW4pO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChNYWluLl9fcHJvdG9fXyB8fCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShNYWluKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMy5kZWZhdWx0KShNYWluLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfY29udGV4dCRfZG9jdW1lbnRQcm8zID0gdGhpcy5jb250ZXh0Ll9kb2N1bWVudFByb3BzLFxuICAgICAgICAgIGh0bWwgPSBfY29udGV4dCRfZG9jdW1lbnRQcm8zLmh0bWwsXG4gICAgICAgICAgZXJyb3JIdG1sID0gX2NvbnRleHQkX2RvY3VtZW50UHJvMy5lcnJvckh0bWw7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWU7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUgfSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgaWQ6ICdfX25leHQnLCBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6IGh0bWwgfSB9KSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgaWQ6ICdfX25leHQtZXJyb3InLCBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6IGVycm9ySHRtbCB9IH0pXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTWFpbjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbk1haW4ucHJvcFR5cGVzID0ge1xuICBjbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nXG59O1xuTWFpbi5jb250ZXh0VHlwZXMgPSB7XG4gIF9kb2N1bWVudFByb3BzOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmFueVxufTtcblxudmFyIE5leHRTY3JpcHQgPSBleHBvcnRzLk5leHRTY3JpcHQgPSBmdW5jdGlvbiAoX0NvbXBvbmVudDQpIHtcbiAgKDAsIF9pbmhlcml0czMuZGVmYXVsdCkoTmV4dFNjcmlwdCwgX0NvbXBvbmVudDQpO1xuXG4gIGZ1bmN0aW9uIE5leHRTY3JpcHQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgTmV4dFNjcmlwdCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKE5leHRTY3JpcHQuX19wcm90b19fIHx8ICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKE5leHRTY3JpcHQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKE5leHRTY3JpcHQsIFt7XG4gICAga2V5OiAnZ2V0Q2h1bmtTY3JpcHQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDaHVua1NjcmlwdChmaWxlbmFtZSkge1xuICAgICAgdmFyIGFkZGl0aW9uYWxQcm9wcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICB2YXIgX19ORVhUX0RBVEFfXyA9IHRoaXMuY29udGV4dC5fZG9jdW1lbnRQcm9wcy5fX05FWFRfREFUQV9fO1xuICAgICAgdmFyIGJ1aWxkU3RhdHMgPSBfX05FWFRfREFUQV9fLmJ1aWxkU3RhdHMsXG4gICAgICAgICAgYXNzZXRQcmVmaXggPSBfX05FWFRfREFUQV9fLmFzc2V0UHJlZml4LFxuICAgICAgICAgIGJ1aWxkSWQgPSBfX05FWFRfREFUQV9fLmJ1aWxkSWQ7XG5cbiAgICAgIHZhciBoYXNoID0gYnVpbGRTdGF0cyA/IGJ1aWxkU3RhdHNbZmlsZW5hbWVdLmhhc2ggOiBidWlsZElkO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcsICgwLCBfZXh0ZW5kczMuZGVmYXVsdCkoe1xuICAgICAgICBrZXk6IGZpbGVuYW1lLFxuICAgICAgICB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAgICAgc3JjOiBhc3NldFByZWZpeCArICcvX25leHQvJyArIGhhc2ggKyAnLycgKyBmaWxlbmFtZVxuICAgICAgfSwgYWRkaXRpb25hbFByb3BzKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0U2NyaXB0cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNjcmlwdHMoKSB7XG4gICAgICB2YXIgZGV2ID0gdGhpcy5jb250ZXh0Ll9kb2N1bWVudFByb3BzLmRldjtcblxuICAgICAgaWYgKGRldikge1xuICAgICAgICByZXR1cm4gW3RoaXMuZ2V0Q2h1bmtTY3JpcHQoJ21hbmlmZXN0LmpzJyksIHRoaXMuZ2V0Q2h1bmtTY3JpcHQoJ2NvbW1vbnMuanMnKSwgdGhpcy5nZXRDaHVua1NjcmlwdCgnbWFpbi5qcycpXTtcbiAgICAgIH1cblxuICAgICAgLy8gSW4gdGhlIHByb2R1Y3Rpb24gbW9kZSwgd2UgaGF2ZSBhIHNpbmdsZSBhc3NldCB3aXRoIGFsbCB0aGUgSlMgY29udGVudC5cbiAgICAgIC8vIFNvLCB3ZSBjYW4gbG9hZCB0aGUgc2NyaXB0IHdpdGggYXN5bmNcbiAgICAgIHJldHVybiBbdGhpcy5nZXRDaHVua1NjcmlwdCgnYXBwLmpzJywgeyBhc3luYzogdHJ1ZSB9KV07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0RHluYW1pY0NodW5rcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldER5bmFtaWNDaHVua3MoKSB7XG4gICAgICB2YXIgX2NvbnRleHQkX2RvY3VtZW50UHJvNCA9IHRoaXMuY29udGV4dC5fZG9jdW1lbnRQcm9wcyxcbiAgICAgICAgICBjaHVua3MgPSBfY29udGV4dCRfZG9jdW1lbnRQcm80LmNodW5rcyxcbiAgICAgICAgICBfX05FWFRfREFUQV9fID0gX2NvbnRleHQkX2RvY3VtZW50UHJvNC5fX05FWFRfREFUQV9fO1xuICAgICAgdmFyIGFzc2V0UHJlZml4ID0gX19ORVhUX0RBVEFfXy5hc3NldFByZWZpeCxcbiAgICAgICAgICBidWlsZElkID0gX19ORVhUX0RBVEFfXy5idWlsZElkO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICBudWxsLFxuICAgICAgICBjaHVua3MubWFwKGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jywge1xuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBrZXk6IGNodW5rLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgICAgICAgICBzcmM6IGFzc2V0UHJlZml4ICsgJy9fbmV4dC8nICsgYnVpbGRJZCArICcvd2VicGFjay9jaHVua3MvJyArIGNodW5rXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfY29udGV4dCRfZG9jdW1lbnRQcm81ID0gdGhpcy5jb250ZXh0Ll9kb2N1bWVudFByb3BzLFxuICAgICAgICAgIHN0YXRpY01hcmt1cCA9IF9jb250ZXh0JF9kb2N1bWVudFBybzUuc3RhdGljTWFya3VwLFxuICAgICAgICAgIF9fTkVYVF9EQVRBX18gPSBfY29udGV4dCRfZG9jdW1lbnRQcm81Ll9fTkVYVF9EQVRBX18sXG4gICAgICAgICAgY2h1bmtzID0gX2NvbnRleHQkX2RvY3VtZW50UHJvNS5jaHVua3M7XG4gICAgICB2YXIgcGF0aG5hbWUgPSBfX05FWFRfREFUQV9fLnBhdGhuYW1lLFxuICAgICAgICAgIGJ1aWxkSWQgPSBfX05FWFRfREFUQV9fLmJ1aWxkSWQsXG4gICAgICAgICAgYXNzZXRQcmVmaXggPSBfX05FWFRfREFUQV9fLmFzc2V0UHJlZml4O1xuXG4gICAgICB2YXIgcGFnZVBhdGhuYW1lID0gZ2V0UGFnZVBhdGhuYW1lKHBhdGhuYW1lKTtcblxuICAgICAgX19ORVhUX0RBVEFfXy5jaHVua3MgPSBjaHVua3M7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHN0YXRpY01hcmt1cCA/IG51bGwgOiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JywgeyBub25jZTogdGhpcy5wcm9wcy5ub25jZSwgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHtcbiAgICAgICAgICAgIF9faHRtbDogJ1xcbiAgICAgICAgICBfX05FWFRfREFUQV9fID0gJyArICgwLCBfaHRtbGVzY2FwZTIuZGVmYXVsdCkoX19ORVhUX0RBVEFfXykgKyAnXFxuICAgICAgICAgIG1vZHVsZT17fVxcbiAgICAgICAgICBfX05FWFRfTE9BREVEX1BBR0VTX18gPSBbXVxcbiAgICAgICAgICBfX05FWFRfTE9BREVEX0NIVU5LU19fID0gW11cXG5cXG4gICAgICAgICAgX19ORVhUX1JFR0lTVEVSX1BBR0UgPSBmdW5jdGlvbiAocm91dGUsIGZuKSB7XFxuICAgICAgICAgICAgX19ORVhUX0xPQURFRF9QQUdFU19fLnB1c2goeyByb3V0ZTogcm91dGUsIGZuOiBmbiB9KVxcbiAgICAgICAgICB9XFxuXFxuICAgICAgICAgIF9fTkVYVF9SRUdJU1RFUl9DSFVOSyA9IGZ1bmN0aW9uIChjaHVua05hbWUsIGZuKSB7XFxuICAgICAgICAgICAgX19ORVhUX0xPQURFRF9DSFVOS1NfXy5wdXNoKHsgY2h1bmtOYW1lOiBjaHVua05hbWUsIGZuOiBmbiB9KVxcbiAgICAgICAgICB9XFxuICAgICAgICAnXG4gICAgICAgICAgfSB9KSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcsIHsgYXN5bmM6IHRydWUsIGlkOiAnX19ORVhUX1BBR0VfXycgKyBwYXRobmFtZSwgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcsIHNyYzogYXNzZXRQcmVmaXggKyAnL19uZXh0LycgKyBidWlsZElkICsgJy9wYWdlJyArIHBhZ2VQYXRobmFtZSB9KSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcsIHsgYXN5bmM6IHRydWUsIGlkOiAnX19ORVhUX1BBR0VfXy9fZXJyb3InLCB0eXBlOiAndGV4dC9qYXZhc2NyaXB0Jywgc3JjOiBhc3NldFByZWZpeCArICcvX25leHQvJyArIGJ1aWxkSWQgKyAnL3BhZ2UvX2Vycm9yLmpzJyB9KSxcbiAgICAgICAgc3RhdGljTWFya3VwID8gbnVsbCA6IHRoaXMuZ2V0RHluYW1pY0NodW5rcygpLFxuICAgICAgICBzdGF0aWNNYXJrdXAgPyBudWxsIDogdGhpcy5nZXRTY3JpcHRzKClcbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBOZXh0U2NyaXB0O1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuTmV4dFNjcmlwdC5wcm9wVHlwZXMgPSB7XG4gIG5vbmNlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZ1xufTtcbk5leHRTY3JpcHQuY29udGV4dFR5cGVzID0ge1xuICBfZG9jdW1lbnRQcm9wczogX3Byb3BUeXBlczIuZGVmYXVsdC5hbnlcbn07XG5cblxuZnVuY3Rpb24gZ2V0UGFnZVBhdGhuYW1lKHBhdGhuYW1lKSB7XG4gIGlmIChwYXRobmFtZSA9PT0gJy8nKSB7XG4gICAgcmV0dXJuICcvaW5kZXguanMnO1xuICB9XG5cbiAgcmV0dXJuIHBhdGhuYW1lICsgJy5qcyc7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9zZXJ2ZXIvZG9jdW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDM3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvKipcbiAqIFByb3Blcmx5IGVzY2FwZSBKU09OIGZvciB1c2FnZSBhcyBhbiBvYmplY3QgbGl0ZXJhbCBpbnNpZGUgb2YgYSBgPHNjcmlwdD5gIHRhZy5cbiAqIEpTIGltcGxlbWVudGF0aW9uIG9mIGh0dHA6Ly9nb2xhbmcub3JnL3BrZy9lbmNvZGluZy9qc29uLyNIVE1MRXNjYXBlXG4gKiBNb3JlIGluZm86IGh0dHA6Ly90aW1lbGVzc3JlcG8uY29tL2pzb24taXNudC1hLWphdmFzY3JpcHQtc3Vic2V0XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRVNDQVBFX0xPT0tVUCA9IHtcbiAgJyYnOiAnXFxcXHUwMDI2JyxcbiAgJz4nOiAnXFxcXHUwMDNlJyxcbiAgJzwnOiAnXFxcXHUwMDNjJyxcbiAgJ1xcdTIwMjgnOiAnXFxcXHUyMDI4JyxcbiAgJ1xcdTIwMjknOiAnXFxcXHUyMDI5J1xufTtcblxudmFyIEVTQ0FQRV9SRUdFWCA9IC9bJj48XFx1MjAyOFxcdTIwMjldL2c7XG5cbmZ1bmN0aW9uIGVzY2FwZXIobWF0Y2gpIHtcbiAgcmV0dXJuIEVTQ0FQRV9MT09LVVBbbWF0Y2hdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKS5yZXBsYWNlKEVTQ0FQRV9SRUdFWCwgZXNjYXBlcik7XG59O1xuXG4vKioqL1xuXG52YXIgVEVSTUlOQVRPUlNfTE9PS1VQID0ge1xuICAnXFx1MjAyOCc6ICdcXFxcdTIwMjgnLFxuICAnXFx1MjAyOSc6ICdcXFxcdTIwMjknXG59O1xuXG52YXIgVEVSTUlOQVRPUlNfUkVHRVggPSAvW1xcdTIwMjhcXHUyMDI5XS9nO1xuXG5mdW5jdGlvbiBzYW5pdGl6ZXIobWF0Y2gpIHtcbiAgcmV0dXJuIFRFUk1JTkFUT1JTX0xPT0tVUFttYXRjaF07XG59XG5cbm1vZHVsZS5leHBvcnRzLnNhbml0aXplID0gZnVuY3Rpb24oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShURVJNSU5BVE9SU19SRUdFWCwgc2FuaXRpemVyKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaHRtbGVzY2FwZS9odG1sZXNjYXBlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3Qvc2VydmVyJylcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9zdHlsZWQtanN4L3NlcnZlci5qc1xuLy8gbW9kdWxlIGlkID0gMzc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5MiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5Jyk7XG5cbnZhciBfc2xpY2VkVG9BcnJheTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zbGljZWRUb0FycmF5Mik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvcicpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZsdXNoVG9SZWFjdDtcbmV4cG9ydHMuZmx1c2hUb0hUTUwgPSBmbHVzaFRvSFRNTDtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3N0eWxlID0gcmVxdWlyZSgnLi9zdHlsZScpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBmbHVzaFRvUmVhY3QoKSB7XG4gIHZhciBtZW0gPSAoMCwgX3N0eWxlLmZsdXNoKSgpO1xuICB2YXIgYXJyID0gW107XG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9ICgwLCBfZ2V0SXRlcmF0b3IzLmRlZmF1bHQpKG1lbSksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgIHZhciBfc3RlcCR2YWx1ZSA9ICgwLCBfc2xpY2VkVG9BcnJheTMuZGVmYXVsdCkoX3N0ZXAudmFsdWUsIDIpLFxuICAgICAgICAgIGlkID0gX3N0ZXAkdmFsdWVbMF0sXG4gICAgICAgICAgY3NzID0gX3N0ZXAkdmFsdWVbMV07XG5cbiAgICAgIGFyci5wdXNoKF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdzdHlsZScsIHtcbiAgICAgICAgaWQ6ICdfXycgKyBpZCxcbiAgICAgICAgLy8gQXZvaWQgd2FybmluZ3MgdXBvbiByZW5kZXIgd2l0aCBhIGtleVxuICAgICAgICBrZXk6ICdfXycgKyBpZCxcbiAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHtcbiAgICAgICAgICBfX2h0bWw6IGNzc1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIGZsdXNoVG9IVE1MKCkge1xuICB2YXIgbWVtID0gKDAsIF9zdHlsZS5mbHVzaCkoKTtcbiAgdmFyIGh0bWwgPSAnJztcbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9ICgwLCBfZ2V0SXRlcmF0b3IzLmRlZmF1bHQpKG1lbSksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgdmFyIF9zdGVwMiR2YWx1ZSA9ICgwLCBfc2xpY2VkVG9BcnJheTMuZGVmYXVsdCkoX3N0ZXAyLnZhbHVlLCAyKSxcbiAgICAgICAgICBpZCA9IF9zdGVwMiR2YWx1ZVswXSxcbiAgICAgICAgICBjc3MgPSBfc3RlcDIkdmFsdWVbMV07XG5cbiAgICAgIGh0bWwgKz0gJzxzdHlsZSBpZD1cIl9fJyArIGlkICsgJ1wiPicgKyBjc3MgKyAnPC9zdHlsZT4nO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGh0bWw7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3N0eWxlZC1qc3gvZGlzdC9zZXJ2ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDM3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfbWFwID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9jb3JlLWpzL21hcCcpO1xuXG52YXIgX21hcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYXApO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXknKTtcblxudmFyIF9zbGljZWRUb0FycmF5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NsaWNlZFRvQXJyYXkyKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZicpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldFByb3RvdHlwZU9mKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcycpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybicpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIpO1xuXG52YXIgX2luaGVyaXRzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cycpO1xuXG52YXIgX2luaGVyaXRzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2luaGVyaXRzMik7XG5cbmV4cG9ydHMuZmx1c2ggPSBmbHVzaDtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfc3R5bGVzaGVldFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi9zdHlsZXNoZWV0LXJlZ2lzdHJ5Jyk7XG5cbnZhciBfc3R5bGVzaGVldFJlZ2lzdHJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlc2hlZXRSZWdpc3RyeSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBzdHlsZVNoZWV0UmVnaXN0cnkgPSBuZXcgX3N0eWxlc2hlZXRSZWdpc3RyeTIuZGVmYXVsdCgpO1xuXG52YXIgSlNYU3R5bGUgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShKU1hTdHlsZSwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gSlNYU3R5bGUoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgSlNYU3R5bGUpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChKU1hTdHlsZS5fX3Byb3RvX18gfHwgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoSlNYU3R5bGUpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEpTWFN0eWxlLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHN0eWxlU2hlZXRSZWdpc3RyeS5hZGQodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY3NzICE9PSBuZXh0UHJvcHMuY3NzO1xuICAgIH1cblxuICAgIC8vIFRvIGF2b2lkIEZPVUMsIHdlIHByb2Nlc3MgbmV3IGNoYW5nZXNcbiAgICAvLyBvbiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgcmF0aGVyIHRoYW4gYGNvbXBvbmVudERpZFVwZGF0ZWAuXG5cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcykge1xuICAgICAgc3R5bGVTaGVldFJlZ2lzdHJ5LnVwZGF0ZSh0aGlzLnByb3BzLCBuZXh0UHJvcHMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBzdHlsZVNoZWV0UmVnaXN0cnkucmVtb3ZlKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiAnZHluYW1pYycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGR5bmFtaWMoaW5mbykge1xuICAgICAgcmV0dXJuIGluZm8ubWFwKGZ1bmN0aW9uICh0YWdJbmZvKSB7XG4gICAgICAgIHZhciBfdGFnSW5mbyA9ICgwLCBfc2xpY2VkVG9BcnJheTMuZGVmYXVsdCkodGFnSW5mbywgMiksXG4gICAgICAgICAgICBiYXNlSWQgPSBfdGFnSW5mb1swXSxcbiAgICAgICAgICAgIHByb3BzID0gX3RhZ0luZm9bMV07XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlU2hlZXRSZWdpc3RyeS5jb21wdXRlSWQoYmFzZUlkLCBwcm9wcyk7XG4gICAgICB9KS5qb2luKCcgJyk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBKU1hTdHlsZTtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEpTWFN0eWxlO1xuZnVuY3Rpb24gZmx1c2goKSB7XG4gIHZhciBjc3NSdWxlcyA9IHN0eWxlU2hlZXRSZWdpc3RyeS5jc3NSdWxlcygpO1xuICBzdHlsZVNoZWV0UmVnaXN0cnkuZmx1c2goKTtcbiAgcmV0dXJuIG5ldyBfbWFwMi5kZWZhdWx0KGNzc1J1bGVzKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvc3R5bGVkLWpzeC9kaXN0L3N0eWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL21hcFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAzNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm1hcCcpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcubWFwLnRvLWpzb24nKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3Lm1hcC5vZicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcubWFwLmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLk1hcDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAzNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tc3Ryb25nJyk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL192YWxpZGF0ZS1jb2xsZWN0aW9uJyk7XG52YXIgTUFQID0gJ01hcCc7XG5cbi8vIDIzLjEgTWFwIE9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKE1BUCwgZnVuY3Rpb24gKGdldCkge1xuICByZXR1cm4gZnVuY3Rpb24gTWFwKCkgeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuMS4zLjYgTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICB2YXIgZW50cnkgPSBzdHJvbmcuZ2V0RW50cnkodmFsaWRhdGUodGhpcywgTUFQKSwga2V5KTtcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnkudjtcbiAgfSxcbiAgLy8gMjMuMS4zLjkgTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcbiAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHZhbGlkYXRlKHRoaXMsIE1BUCksIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nLCB0cnVlKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAzNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdNYXAnLCB7IHRvSlNPTjogcmVxdWlyZSgnLi9fY29sbGVjdGlvbi10by1qc29uJykoJ01hcCcpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5tYXAudG8tanNvbi5qc1xuLy8gbW9kdWxlIGlkID0gMzgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS8jc2VjLW1hcC5vZlxucmVxdWlyZSgnLi9fc2V0LWNvbGxlY3Rpb24tb2YnKSgnTWFwJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm1hcC5vZi5qc1xuLy8gbW9kdWxlIGlkID0gMzgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS8jc2VjLW1hcC5mcm9tXG5yZXF1aXJlKCcuL19zZXQtY29sbGVjdGlvbi1mcm9tJykoJ01hcCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5tYXAuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMzgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9rZXlzID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzJyk7XG5cbnZhciBfa2V5czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9rZXlzKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2snKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc0NhbGxDaGVjazIpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcycpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNsYXNzMik7XG5cbnZhciBfc3RyaW5nSGFzaCA9IHJlcXVpcmUoJ3N0cmluZy1oYXNoJyk7XG5cbnZhciBfc3RyaW5nSGFzaDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHJpbmdIYXNoKTtcblxudmFyIF9zdHlsZXNoZWV0ID0gcmVxdWlyZSgnLi9saWIvc3R5bGVzaGVldCcpO1xuXG52YXIgX3N0eWxlc2hlZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVzaGVldCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTdHlsZVNoZWV0UmVnaXN0cnkgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0eWxlU2hlZXRSZWdpc3RyeSgpIHtcbiAgICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICAgIF9yZWYkc3R5bGVTaGVldCA9IF9yZWYuc3R5bGVTaGVldCxcbiAgICAgICAgc3R5bGVTaGVldCA9IF9yZWYkc3R5bGVTaGVldCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IF9yZWYkc3R5bGVTaGVldCxcbiAgICAgICAgX3JlZiRvcHRpbWl6ZUZvclNwZWVkID0gX3JlZi5vcHRpbWl6ZUZvclNwZWVkLFxuICAgICAgICBvcHRpbWl6ZUZvclNwZWVkID0gX3JlZiRvcHRpbWl6ZUZvclNwZWVkID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkb3B0aW1pemVGb3JTcGVlZCxcbiAgICAgICAgX3JlZiRpc0Jyb3dzZXIgPSBfcmVmLmlzQnJvd3NlcixcbiAgICAgICAgaXNCcm93c2VyID0gX3JlZiRpc0Jyb3dzZXIgPT09IHVuZGVmaW5lZCA/IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnIDogX3JlZiRpc0Jyb3dzZXI7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTdHlsZVNoZWV0UmVnaXN0cnkpO1xuXG4gICAgdGhpcy5fc2hlZXQgPSBzdHlsZVNoZWV0IHx8IG5ldyBfc3R5bGVzaGVldDIuZGVmYXVsdCh7XG4gICAgICBuYW1lOiAnc3R5bGVkLWpzeCcsXG4gICAgICBvcHRpbWl6ZUZvclNwZWVkOiBvcHRpbWl6ZUZvclNwZWVkXG4gICAgfSk7XG4gICAgdGhpcy5fc2hlZXQuaW5qZWN0KCk7XG4gICAgdGhpcy5faXNCcm93c2VyID0gaXNCcm93c2VyO1xuXG4gICAgdGhpcy5fZnJvbVNlcnZlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9pbmRpY2VzID0ge307XG4gICAgdGhpcy5faW5zdGFuY2VzQ291bnRzID0ge307XG5cbiAgICB0aGlzLmNvbXB1dGVJZCA9IHRoaXMuY3JlYXRlQ29tcHV0ZUlkKCk7XG4gICAgdGhpcy5jb21wdXRlU2VsZWN0b3IgPSB0aGlzLmNyZWF0ZUNvbXB1dGVTZWxlY3RvcigpO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU3R5bGVTaGVldFJlZ2lzdHJ5LCBbe1xuICAgIGtleTogJ2FkZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChwcm9wcykge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gdGhpcy5fb3B0aW1pemVGb3JTcGVlZCkge1xuICAgICAgICB0aGlzLl9vcHRpbWl6ZUZvclNwZWVkID0gQXJyYXkuaXNBcnJheShwcm9wcy5jc3MpO1xuICAgICAgICB0aGlzLl9zaGVldC5zZXRPcHRpbWl6ZUZvclNwZWVkKHRoaXMuX29wdGltaXplRm9yU3BlZWQpO1xuICAgICAgICB0aGlzLl9vcHRpbWl6ZUZvclNwZWVkID0gdGhpcy5fc2hlZXQuaXNPcHRpbWl6ZUZvclNwZWVkKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9pc0Jyb3dzZXIgJiYgIXRoaXMuX2Zyb21TZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5fZnJvbVNlcnZlciA9IHRoaXMuc2VsZWN0RnJvbVNlcnZlcigpO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXNDb3VudHMgPSAoMCwgX2tleXMyLmRlZmF1bHQpKHRoaXMuX2Zyb21TZXJ2ZXIpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCB0YWdOYW1lKSB7XG4gICAgICAgICAgYWNjW3RhZ05hbWVdID0gMDtcbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBfZ2V0SWRBbmRSdWxlcyA9IHRoaXMuZ2V0SWRBbmRSdWxlcyhwcm9wcyksXG4gICAgICAgICAgc3R5bGVJZCA9IF9nZXRJZEFuZFJ1bGVzLnN0eWxlSWQsXG4gICAgICAgICAgcnVsZXMgPSBfZ2V0SWRBbmRSdWxlcy5ydWxlcztcblxuICAgICAgLy8gRGVkdXBpbmc6IGp1c3QgaW5jcmVhc2UgdGhlIGluc3RhbmNlcyBjb3VudC5cblxuXG4gICAgICBpZiAoc3R5bGVJZCBpbiB0aGlzLl9pbnN0YW5jZXNDb3VudHMpIHtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzQ291bnRzW3N0eWxlSWRdICs9IDE7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGluZGljZXMgPSBydWxlcy5tYXAoZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLl9zaGVldC5pbnNlcnRSdWxlKHJ1bGUpO1xuICAgICAgfSlcbiAgICAgIC8vIEZpbHRlciBvdXQgaW52YWxpZCBydWxlc1xuICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4ICE9PSAtMTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaW5kaWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX2luZGljZXNbc3R5bGVJZF0gPSBpbmRpY2VzO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZXNDb3VudHNbc3R5bGVJZF0gPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShwcm9wcykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBfZ2V0SWRBbmRSdWxlczIgPSB0aGlzLmdldElkQW5kUnVsZXMocHJvcHMpLFxuICAgICAgICAgIHN0eWxlSWQgPSBfZ2V0SWRBbmRSdWxlczIuc3R5bGVJZDtcblxuICAgICAgaW52YXJpYW50KHN0eWxlSWQgaW4gdGhpcy5faW5zdGFuY2VzQ291bnRzLCAnc3R5bGVJZDogYCcgKyBzdHlsZUlkICsgJ2Agbm90IGZvdW5kJyk7XG4gICAgICB0aGlzLl9pbnN0YW5jZXNDb3VudHNbc3R5bGVJZF0gLT0gMTtcblxuICAgICAgaWYgKHRoaXMuX2luc3RhbmNlc0NvdW50c1tzdHlsZUlkXSA8IDEpIHtcbiAgICAgICAgdmFyIHRhZ0Zyb21TZXJ2ZXIgPSB0aGlzLl9mcm9tU2VydmVyICYmIHRoaXMuX2Zyb21TZXJ2ZXJbc3R5bGVJZF07XG4gICAgICAgIGlmICh0YWdGcm9tU2VydmVyKSB7XG4gICAgICAgICAgdGFnRnJvbVNlcnZlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZ0Zyb21TZXJ2ZXIpO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9mcm9tU2VydmVyW3N0eWxlSWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2luZGljZXNbc3R5bGVJZF0uZm9yRWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpczIuX3NoZWV0LmRlbGV0ZVJ1bGUoaW5kZXgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9pbmRpY2VzW3N0eWxlSWRdO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pbnN0YW5jZXNDb3VudHNbc3R5bGVJZF07XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKHByb3BzLCBuZXh0UHJvcHMpIHtcbiAgICAgIHRoaXMuYWRkKG5leHRQcm9wcyk7XG4gICAgICB0aGlzLnJlbW92ZShwcm9wcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZmx1c2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICAgIHRoaXMuX3NoZWV0LmZsdXNoKCk7XG4gICAgICB0aGlzLl9zaGVldC5pbmplY3QoKTtcbiAgICAgIHRoaXMuX2Zyb21TZXJ2ZXIgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9pbmRpY2VzID0ge307XG4gICAgICB0aGlzLl9pbnN0YW5jZXNDb3VudHMgPSB7fTtcblxuICAgICAgdGhpcy5jb21wdXRlSWQgPSB0aGlzLmNyZWF0ZUNvbXB1dGVJZCgpO1xuICAgICAgdGhpcy5jb21wdXRlU2VsZWN0b3IgPSB0aGlzLmNyZWF0ZUNvbXB1dGVTZWxlY3RvcigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Nzc1J1bGVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3NzUnVsZXMoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIGZyb21TZXJ2ZXIgPSB0aGlzLl9mcm9tU2VydmVyID8gKDAsIF9rZXlzMi5kZWZhdWx0KSh0aGlzLl9mcm9tU2VydmVyKS5tYXAoZnVuY3Rpb24gKHN0eWxlSWQpIHtcbiAgICAgICAgcmV0dXJuIFtzdHlsZUlkLCBfdGhpczMuX2Zyb21TZXJ2ZXJbc3R5bGVJZF1dO1xuICAgICAgfSkgOiBbXTtcbiAgICAgIHZhciBjc3NSdWxlcyA9IHRoaXMuX3NoZWV0LmNzc1J1bGVzKCk7XG5cbiAgICAgIHJldHVybiBmcm9tU2VydmVyLmNvbmNhdCgoMCwgX2tleXMyLmRlZmF1bHQpKHRoaXMuX2luZGljZXMpLm1hcChmdW5jdGlvbiAoc3R5bGVJZCkge1xuICAgICAgICByZXR1cm4gW3N0eWxlSWQsIF90aGlzMy5faW5kaWNlc1tzdHlsZUlkXS5tYXAoZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIGNzc1J1bGVzW2luZGV4XS5jc3NUZXh0O1xuICAgICAgICB9KS5qb2luKCdcXG4nKV07XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY3JlYXRlQ29tcHV0ZUlkXG4gICAgICpcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdG8gY29tcHV0ZSBhbmQgbWVtb2l6ZSBhIGpzeCBpZCBmcm9tIGEgYmFzZWRJZCBhbmQgb3B0aW9uYWxseSBwcm9wcy5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlQ29tcHV0ZUlkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZUlkKCkge1xuICAgICAgdmFyIGNhY2hlID0ge307XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGJhc2VJZCwgcHJvcHMpIHtcbiAgICAgICAgaWYgKCFwcm9wcykge1xuICAgICAgICAgIHJldHVybiAnanN4LScgKyBiYXNlSWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb3BzVG9TdHJpbmcgPSBTdHJpbmcocHJvcHMpO1xuICAgICAgICB2YXIga2V5ID0gYmFzZUlkICsgcHJvcHNUb1N0cmluZztcbiAgICAgICAgLy8gcmV0dXJuIGBqc3gtJHtoYXNoU3RyaW5nKGAke2Jhc2VJZH0tJHtwcm9wc1RvU3RyaW5nfWApfWBcbiAgICAgICAgaWYgKCFjYWNoZVtrZXldKSB7XG4gICAgICAgICAgY2FjaGVba2V5XSA9ICdqc3gtJyArICgwLCBfc3RyaW5nSGFzaDIuZGVmYXVsdCkoYmFzZUlkICsgJy0nICsgcHJvcHNUb1N0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhY2hlW2tleV07XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNyZWF0ZUNvbXB1dGVTZWxlY3RvclxuICAgICAqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRvIGNvbXB1dGUgYW5kIG1lbW9pemUgZHluYW1pYyBzZWxlY3RvcnMuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NyZWF0ZUNvbXB1dGVTZWxlY3RvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUNvbXB1dGVTZWxlY3RvcigpIHtcbiAgICAgIHZhciBzZWxlY3RvUGxhY2Vob2xkZXJSZWdleHAgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IC9fX2pzeC1zdHlsZS1keW5hbWljLXNlbGVjdG9yL2c7XG5cbiAgICAgIHZhciBjYWNoZSA9IHt9O1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpZCwgY3NzKSB7XG4gICAgICAgIHZhciBpZGNzcyA9IGlkICsgY3NzO1xuICAgICAgICBpZiAoIWNhY2hlW2lkY3NzXSkge1xuICAgICAgICAgIGNhY2hlW2lkY3NzXSA9IGNzcy5yZXBsYWNlKHNlbGVjdG9QbGFjZWhvbGRlclJlZ2V4cCwgaWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWNoZVtpZGNzc107XG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldElkQW5kUnVsZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRJZEFuZFJ1bGVzKHByb3BzKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgaWYgKHByb3BzLmR5bmFtaWMpIHtcbiAgICAgICAgdmFyIHN0eWxlSWQgPSB0aGlzLmNvbXB1dGVJZChwcm9wcy5zdHlsZUlkLCBwcm9wcy5keW5hbWljKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdHlsZUlkOiBzdHlsZUlkLFxuICAgICAgICAgIHJ1bGVzOiBBcnJheS5pc0FycmF5KHByb3BzLmNzcykgPyBwcm9wcy5jc3MubWFwKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM0LmNvbXB1dGVTZWxlY3RvcihzdHlsZUlkLCBydWxlKTtcbiAgICAgICAgICB9KSA6IFt0aGlzLmNvbXB1dGVTZWxlY3RvcihzdHlsZUlkLCBwcm9wcy5jc3MpXVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdHlsZUlkOiB0aGlzLmNvbXB1dGVJZChwcm9wcy5zdHlsZUlkKSxcbiAgICAgICAgcnVsZXM6IEFycmF5LmlzQXJyYXkocHJvcHMuY3NzKSA/IHByb3BzLmNzcyA6IFtwcm9wcy5jc3NdXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNlbGVjdEZyb21TZXJ2ZXJcbiAgICAgKlxuICAgICAqIENvbGxlY3RzIHN0eWxlIHRhZ3MgZnJvbSB0aGUgZG9jdW1lbnQgd2l0aCBpZCBfX2pzeC1YWFhcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2VsZWN0RnJvbVNlcnZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdEZyb21TZXJ2ZXIoKSB7XG4gICAgICB2YXIgZWxlbWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePVwiX19qc3gtXCJdJykpO1xuXG4gICAgICByZXR1cm4gZWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGlkID0gZWxlbWVudC5pZC5zbGljZSgyKTtcbiAgICAgICAgYWNjW2lkXSA9IGVsZW1lbnQ7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTdHlsZVNoZWV0UmVnaXN0cnk7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN0eWxlU2hlZXRSZWdpc3RyeTtcblxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdHlsZVNoZWV0UmVnaXN0cnk6ICcgKyBtZXNzYWdlICsgJy4nKTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9zdHlsZWQtanN4L2Rpc3Qvc3R5bGVzaGVldC1yZWdpc3RyeS5qc1xuLy8gbW9kdWxlIGlkID0gMzgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBoYXNoKHN0cikge1xuICB2YXIgaGFzaCA9IDUzODEsXG4gICAgICBpICAgID0gc3RyLmxlbmd0aDtcblxuICB3aGlsZShpKSB7XG4gICAgaGFzaCA9IChoYXNoICogMzMpIF4gc3RyLmNoYXJDb2RlQXQoLS1pKTtcbiAgfVxuXG4gIC8qIEphdmFTY3JpcHQgZG9lcyBiaXR3aXNlIG9wZXJhdGlvbnMgKGxpa2UgWE9SLCBhYm92ZSkgb24gMzItYml0IHNpZ25lZFxuICAgKiBpbnRlZ2Vycy4gU2luY2Ugd2Ugd2FudCB0aGUgcmVzdWx0cyB0byBiZSBhbHdheXMgcG9zaXRpdmUsIGNvbnZlcnQgdGhlXG4gICAqIHNpZ25lZCBpbnQgdG8gYW4gdW5zaWduZWQgYnkgZG9pbmcgYW4gdW5zaWduZWQgYml0c2hpZnQuICovXG4gIHJldHVybiBoYXNoID4+PiAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2g7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvc3RyaW5nLWhhc2gvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKlxuQmFzZWQgb24gR2xhbW9yJ3Mgc2hlZXRcbmh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZXBvaW50b25lL2dsYW1vci9ibG9iLzY2N2I0ODBkMzFiMzcyMWE5MDUwMjFiMjZlMTI5MGNlOTJjYTI4Nzkvc3JjL3NoZWV0LmpzXG4qL1xuXG52YXIgaXNQcm9kID0gcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbnZhciBpc1N0cmluZyA9IGZ1bmN0aW9uIGlzU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59O1xuXG52YXIgU3R5bGVTaGVldCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3R5bGVTaGVldCgpIHtcbiAgICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICAgIF9yZWYkbmFtZSA9IF9yZWYubmFtZSxcbiAgICAgICAgbmFtZSA9IF9yZWYkbmFtZSA9PT0gdW5kZWZpbmVkID8gJ3N0eWxlc2hlZXQnIDogX3JlZiRuYW1lLFxuICAgICAgICBfcmVmJG9wdGltaXplRm9yU3BlZWQgPSBfcmVmLm9wdGltaXplRm9yU3BlZWQsXG4gICAgICAgIG9wdGltaXplRm9yU3BlZWQgPSBfcmVmJG9wdGltaXplRm9yU3BlZWQgPT09IHVuZGVmaW5lZCA/IGlzUHJvZCA6IF9yZWYkb3B0aW1pemVGb3JTcGVlZCxcbiAgICAgICAgX3JlZiRpc0Jyb3dzZXIgPSBfcmVmLmlzQnJvd3NlcixcbiAgICAgICAgaXNCcm93c2VyID0gX3JlZiRpc0Jyb3dzZXIgPT09IHVuZGVmaW5lZCA/IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnIDogX3JlZiRpc0Jyb3dzZXI7XG5cbiAgICAoMCwgX2NsYXNzQ2FsbENoZWNrMy5kZWZhdWx0KSh0aGlzLCBTdHlsZVNoZWV0KTtcblxuICAgIGludmFyaWFudChpc1N0cmluZyhuYW1lKSwgJ2BuYW1lYCBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5fZGVsZXRlZFJ1bGVQbGFjZWhvbGRlciA9ICcjJyArIG5hbWUgKyAnLWRlbGV0ZWQtcnVsZV9fX197fSc7XG5cbiAgICBpbnZhcmlhbnQodHlwZW9mIG9wdGltaXplRm9yU3BlZWQgPT09ICdib29sZWFuJywgJ2BvcHRpbWl6ZUZvclNwZWVkYCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuICAgIHRoaXMuX29wdGltaXplRm9yU3BlZWQgPSBvcHRpbWl6ZUZvclNwZWVkO1xuICAgIHRoaXMuX2lzQnJvd3NlciA9IGlzQnJvd3NlcjtcblxuICAgIHRoaXMuX3NlcnZlclNoZWV0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3RhZ3MgPSBbXTtcbiAgICB0aGlzLl9pbmplY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3J1bGVzQ291bnQgPSAwO1xuICB9XG5cbiAgKDAsIF9jcmVhdGVDbGFzczMuZGVmYXVsdCkoU3R5bGVTaGVldCwgW3tcbiAgICBrZXk6ICdzZXRPcHRpbWl6ZUZvclNwZWVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0T3B0aW1pemVGb3JTcGVlZChib29sKSB7XG4gICAgICBpbnZhcmlhbnQodHlwZW9mIGJvb2wgPT09ICdib29sZWFuJywgJ2BzZXRPcHRpbWl6ZUZvclNwZWVkYCBhY2NlcHRzIGEgYm9vbGVhbicpO1xuXG4gICAgICBpbnZhcmlhbnQodGhpcy5fcnVsZXNDb3VudCA9PT0gMCwgJ29wdGltaXplRm9yU3BlZWQgY2Fubm90IGJlIHdoZW4gcnVsZXMgaGF2ZSBhbHJlYWR5IGJlZW4gaW5zZXJ0ZWQnKTtcbiAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgIHRoaXMuX29wdGltaXplRm9yU3BlZWQgPSBib29sO1xuICAgICAgdGhpcy5pbmplY3QoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpc09wdGltaXplRm9yU3BlZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc09wdGltaXplRm9yU3BlZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb3B0aW1pemVGb3JTcGVlZDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpbmplY3QnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmplY3QoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpbnZhcmlhbnQoIXRoaXMuX2luamVjdGVkLCAnc2hlZXQgYWxyZWFkeSBpbmplY3RlZCcpO1xuICAgICAgdGhpcy5faW5qZWN0ZWQgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuX2lzQnJvd3NlciAmJiB0aGlzLl9vcHRpbWl6ZUZvclNwZWVkKSB7XG4gICAgICAgIHRoaXMuX3RhZ3NbMF0gPSB0aGlzLm1ha2VTdHlsZVRhZyh0aGlzLl9uYW1lKTtcbiAgICAgICAgdGhpcy5fb3B0aW1pemVGb3JTcGVlZCA9ICdpbnNlcnRSdWxlJyBpbiB0aGlzLmdldFNoZWV0KCk7XG4gICAgICAgIGlmICghdGhpcy5fb3B0aW1pemVGb3JTcGVlZCkge1xuICAgICAgICAgIGlmICghaXNQcm9kKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1N0eWxlU2hlZXQ6IG9wdGltaXplRm9yU3BlZWQgbW9kZSBub3Qgc3VwcG9ydGVkIGZhbGxpbmcgYmFjayB0byBzdGFuZGFyZCBtb2RlLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgIHRoaXMuX2luamVjdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NlcnZlclNoZWV0ID0ge1xuICAgICAgICBjc3NSdWxlczogW10sXG4gICAgICAgIGluc2VydFJ1bGU6IGZ1bmN0aW9uIGluc2VydFJ1bGUocnVsZSwgaW5kZXgpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgX3RoaXMuX3NlcnZlclNoZWV0LmNzc1J1bGVzW2luZGV4XSA9IHsgY3NzVGV4dDogcnVsZSB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5fc2VydmVyU2hlZXQuY3NzUnVsZXMucHVzaCh7IGNzc1RleHQ6IHJ1bGUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlUnVsZTogZnVuY3Rpb24gZGVsZXRlUnVsZShpbmRleCkge1xuICAgICAgICAgIF90aGlzLl9zZXJ2ZXJTaGVldC5jc3NSdWxlc1tpbmRleF0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFNoZWV0Rm9yVGFnJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2hlZXRGb3JUYWcodGFnKSB7XG4gICAgICBpZiAodGFnLnNoZWV0KSB7XG4gICAgICAgIHJldHVybiB0YWcuc2hlZXQ7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgd2VpcmRuZXNzIGJyb3VnaHQgdG8geW91IGJ5IGZpcmVmb3hcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnN0eWxlU2hlZXRzW2ldLm93bmVyTm9kZSA9PT0gdGFnKSB7XG4gICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnN0eWxlU2hlZXRzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0U2hlZXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTaGVldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFNoZWV0Rm9yVGFnKHRoaXMuX3RhZ3NbdGhpcy5fdGFncy5sZW5ndGggLSAxXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaW5zZXJ0UnVsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluc2VydFJ1bGUocnVsZSwgaW5kZXgpIHtcbiAgICAgIGludmFyaWFudChpc1N0cmluZyhydWxlKSwgJ2BpbnNlcnRSdWxlYCBhY2NlcHRzIG9ubHkgc3RyaW5ncycpO1xuXG4gICAgICBpZiAoIXRoaXMuX2lzQnJvd3Nlcikge1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgIGluZGV4ID0gdGhpcy5fc2VydmVyU2hlZXQuY3NzUnVsZXMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlcnZlclNoZWV0Lmluc2VydFJ1bGUocnVsZSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fcnVsZXNDb3VudCsrO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fb3B0aW1pemVGb3JTcGVlZCkge1xuICAgICAgICB2YXIgc2hlZXQgPSB0aGlzLmdldFNoZWV0KCk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgaW5kZXggPSBzaGVldC5jc3NSdWxlcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcyB3ZWlyZG5lc3MgZm9yIHBlcmYsIGFuZCBjaHJvbWUncyB3ZWlyZCBidWdcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjAwMDc5OTIvY2hyb21lLXN1ZGRlbmx5LXN0b3BwZWQtYWNjZXB0aW5nLWluc2VydHJ1bGVcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzaGVldC5pbnNlcnRSdWxlKHJ1bGUsIGluZGV4KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgaWYgKCFpc1Byb2QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignU3R5bGVTaGVldDogaWxsZWdhbCBydWxlOiBcXG5cXG4nICsgcnVsZSArICdcXG5cXG5TZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xLzIwMDA3OTkyIGZvciBtb3JlIGluZm8nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGluc2VydGlvblBvaW50ID0gdGhpcy5fdGFnc1tpbmRleF07XG4gICAgICAgIHRoaXMuX3RhZ3MucHVzaCh0aGlzLm1ha2VTdHlsZVRhZyh0aGlzLl9uYW1lLCBydWxlLCBpbnNlcnRpb25Qb2ludCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fcnVsZXNDb3VudCsrO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlcGxhY2VSdWxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVwbGFjZVJ1bGUoaW5kZXgsIHJ1bGUpIHtcbiAgICAgIGlmICh0aGlzLl9vcHRpbWl6ZUZvclNwZWVkIHx8ICF0aGlzLl9pc0Jyb3dzZXIpIHtcbiAgICAgICAgdmFyIHNoZWV0ID0gdGhpcy5faXNCcm93c2VyID8gdGhpcy5nZXRTaGVldCgpIDogdGhpcy5fc2VydmVyU2hlZXQ7XG4gICAgICAgIGlmICghcnVsZS50cmltKCkpIHtcbiAgICAgICAgICBydWxlID0gdGhpcy5fZGVsZXRlZFJ1bGVQbGFjZWhvbGRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2hlZXQuY3NzUnVsZXNbaW5kZXhdKSB7XG4gICAgICAgICAgLy8gQFRCRCBTaG91bGQgd2UgdGhyb3cgYW4gZXJyb3I/XG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgc2hlZXQuZGVsZXRlUnVsZShpbmRleCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzaGVldC5pbnNlcnRSdWxlKHJ1bGUsIGluZGV4KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgaWYgKCFpc1Byb2QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignU3R5bGVTaGVldDogaWxsZWdhbCBydWxlOiBcXG5cXG4nICsgcnVsZSArICdcXG5cXG5TZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xLzIwMDA3OTkyIGZvciBtb3JlIGluZm8nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEluIG9yZGVyIHRvIHByZXNlcnZlIHRoZSBpbmRpY2VzIHdlIGluc2VydCBhIGRlbGV0ZVJ1bGVQbGFjZWhvbGRlclxuICAgICAgICAgIHNoZWV0Lmluc2VydFJ1bGUodGhpcy5fZGVsZXRlZFJ1bGVQbGFjZWhvbGRlciwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdGFnID0gdGhpcy5fdGFnc1tpbmRleF07XG4gICAgICAgIGludmFyaWFudCh0YWcsICdvbGQgcnVsZSBhdCBpbmRleCBgJyArIGluZGV4ICsgJ2Agbm90IGZvdW5kJyk7XG4gICAgICAgIHRhZy50ZXh0Q29udGVudCA9IHJ1bGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGVsZXRlUnVsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZVJ1bGUoaW5kZXgpIHtcbiAgICAgIGlmICghdGhpcy5faXNCcm93c2VyKSB7XG4gICAgICAgIHRoaXMuX3NlcnZlclNoZWV0LmRlbGV0ZVJ1bGUoaW5kZXgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9vcHRpbWl6ZUZvclNwZWVkKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZVJ1bGUoaW5kZXgsICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB0YWcgPSB0aGlzLl90YWdzW2luZGV4XTtcbiAgICAgICAgaW52YXJpYW50KHRhZywgJ3J1bGUgYXQgaW5kZXggYCcgKyBpbmRleCArICdgIG5vdCBmb3VuZCcpO1xuICAgICAgICB0YWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YWcpO1xuICAgICAgICB0aGlzLl90YWdzW2luZGV4XSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZmx1c2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICAgIHRoaXMuX2luamVjdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9ydWxlc0NvdW50ID0gMDtcbiAgICAgIGlmICh0aGlzLl9pc0Jyb3dzZXIpIHtcbiAgICAgICAgdGhpcy5fdGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgICByZXR1cm4gdGFnICYmIHRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl90YWdzID0gW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzaW1wbGVyIG9uIHNlcnZlclxuICAgICAgICB0aGlzLl9zZXJ2ZXJTaGVldC5jc3NSdWxlcyA9IFtdO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Nzc1J1bGVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3NzUnVsZXMoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgaWYgKCF0aGlzLl9pc0Jyb3dzZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZlclNoZWV0LmNzc1J1bGVzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX3RhZ3MucmVkdWNlKGZ1bmN0aW9uIChydWxlcywgdGFnKSB7XG4gICAgICAgIGlmICh0YWcpIHtcbiAgICAgICAgICBydWxlcyA9IHJ1bGVzLmNvbmNhdChfdGhpczIuZ2V0U2hlZXRGb3JUYWcodGFnKS5jc3NSdWxlcy5tYXAoZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBydWxlLmNzc1RleHQgPT09IF90aGlzMi5fZGVsZXRlZFJ1bGVQbGFjZWhvbGRlciA/IG51bGwgOiBydWxlO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBydWxlcy5wdXNoKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydWxlcztcbiAgICAgIH0sIFtdKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdtYWtlU3R5bGVUYWcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYWtlU3R5bGVUYWcobmFtZSwgY3NzU3RyaW5nLCByZWxhdGl2ZVRvVGFnKSB7XG4gICAgICBpZiAoY3NzU3RyaW5nKSB7XG4gICAgICAgIGludmFyaWFudChpc1N0cmluZyhjc3NTdHJpbmcpLCAnbWFrZVN0eWxlVGFnIGFjY2VwcyBvbmx5IHN0cmluZ3MgYXMgc2Vjb25kIHBhcmFtZXRlcicpO1xuICAgICAgfVxuICAgICAgdmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICB0YWcudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICB0YWcuc2V0QXR0cmlidXRlKCdkYXRhLScgKyBuYW1lLCAnJyk7XG4gICAgICBpZiAoY3NzU3RyaW5nKSB7XG4gICAgICAgIHRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NTdHJpbmcpKTtcbiAgICAgIH1cbiAgICAgIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgICAgaWYgKHJlbGF0aXZlVG9UYWcpIHtcbiAgICAgICAgaGVhZC5pbnNlcnRCZWZvcmUodGFnLCByZWxhdGl2ZVRvVGFnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQodGFnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0YWc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbGVuZ3RoJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydWxlc0NvdW50O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3R5bGVTaGVldDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3R5bGVTaGVldDtcblxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdHlsZVNoZWV0OiAnICsgbWVzc2FnZSArICcuJyk7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvc3R5bGVkLWpzeC9kaXN0L2xpYi9zdHlsZXNoZWV0LmpzXG4vLyBtb2R1bGUgaWQgPSAzODVcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSBcIi8qIVxcbiAqIE1hdGVyaWFsaXplIHYxLjAuMC1iZXRhIChodHRwOi8vbWF0ZXJpYWxpemVjc3MuY29tKVxcbiAqIENvcHlyaWdodCAyMDE0LTIwMTcgTWF0ZXJpYWxpemVcXG4gKiBNSVQgTGljZW5zZSAoaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0RvZ2ZhbG8vbWF0ZXJpYWxpemUvbWFzdGVyL0xJQ0VOU0UpXFxuICovXFxuLm1hdGVyaWFsaXplLXJlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTUxYzIzICFpbXBvcnRhbnQ7XFxufVxcbi5tYXRlcmlhbGl6ZS1yZWQtdGV4dCB7XFxuICBjb2xvcjogI2U1MWMyMyAhaW1wb3J0YW50O1xcbn1cXG4ubWF0ZXJpYWxpemUtcmVkLmxpZ2h0ZW4tNSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRlYWViICFpbXBvcnRhbnQ7XFxufVxcbi5tYXRlcmlhbGl6ZS1yZWQtdGV4dC50ZXh0LWxpZ2h0ZW4tNSB7XFxuICBjb2xvcjogI2ZkZWFlYiAhaW1wb3J0YW50O1xcbn1cXG4ubWF0ZXJpYWxpemUtcmVkLmxpZ2h0ZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhjMWMzICFpbXBvcnRhbnQ7XFxufVxcbi5tYXRlcmlhbGl6ZS1yZWQtdGV4dC50ZXh0LWxpZ2h0ZW4tNCB7XFxuICBjb2xvcjogI2Y4YzFjMyAhaW1wb3J0YW50O1xcbn1cXG4ubWF0ZXJpYWxpemUtcmVkLmxpZ2h0ZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjM5ODliICFpbXBvcnRhbnQ7XFxufVxcbi5tYXRlcmlhbGl6ZS1yZWQtdGV4dC50ZXh0LWxpZ2h0ZW4tMyB7XFxuICBjb2xvcjogI2YzOTg5YiAhaW1wb3J0YW50O1xcbn1cXG4ubWF0ZXJpYWxpemUtcmVkLmxpZ2h0ZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWU2ZTczICFpbXBvcnRhbnQ7XFxufVxcbi5tYXRlcmlhbGl6ZS1yZWQtdGV4dC50ZXh0LWxpZ2h0ZW4tMiB7XFxuICBjb2xvcjogI2VlNmU3MyAhaW1wb3J0YW50O1xcbn1cXG4ubWF0ZXJpYWxpemUtcmVkLmxpZ2h0ZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWE0NTRiICFpbXBvcnRhbnQ7XFxufVxcbi5tYXRlcmlhbGl6ZS1yZWQtdGV4dC50ZXh0LWxpZ2h0ZW4tMSB7XFxuICBjb2xvcjogI2VhNDU0YiAhaW1wb3J0YW50O1xcbn1cXG4ubWF0ZXJpYWxpemUtcmVkLmRhcmtlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkMDE4MWUgIWltcG9ydGFudDtcXG59XFxuLm1hdGVyaWFsaXplLXJlZC10ZXh0LnRleHQtZGFya2VuLTEge1xcbiAgY29sb3I6ICNkMDE4MWUgIWltcG9ydGFudDtcXG59XFxuLm1hdGVyaWFsaXplLXJlZC5kYXJrZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjkxNTFiICFpbXBvcnRhbnQ7XFxufVxcbi5tYXRlcmlhbGl6ZS1yZWQtdGV4dC50ZXh0LWRhcmtlbi0yIHtcXG4gIGNvbG9yOiAjYjkxNTFiICFpbXBvcnRhbnQ7XFxufVxcbi5tYXRlcmlhbGl6ZS1yZWQuZGFya2VuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2EyMTMxOCAhaW1wb3J0YW50O1xcbn1cXG4ubWF0ZXJpYWxpemUtcmVkLXRleHQudGV4dC1kYXJrZW4tMyB7XFxuICBjb2xvcjogI2EyMTMxOCAhaW1wb3J0YW50O1xcbn1cXG4ubWF0ZXJpYWxpemUtcmVkLmRhcmtlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YjEwMTQgIWltcG9ydGFudDtcXG59XFxuLm1hdGVyaWFsaXplLXJlZC10ZXh0LnRleHQtZGFya2VuLTQge1xcbiAgY29sb3I6ICM4YjEwMTQgIWltcG9ydGFudDtcXG59XFxuLnJlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjQ0MzM2ICFpbXBvcnRhbnQ7XFxufVxcbi5yZWQtdGV4dCB7XFxuICBjb2xvcjogI0Y0NDMzNiAhaW1wb3J0YW50O1xcbn1cXG4ucmVkLmxpZ2h0ZW4tNSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZFQkVFICFpbXBvcnRhbnQ7XFxufVxcbi5yZWQtdGV4dC50ZXh0LWxpZ2h0ZW4tNSB7XFxuICBjb2xvcjogI0ZGRUJFRSAhaW1wb3J0YW50O1xcbn1cXG4ucmVkLmxpZ2h0ZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZDREQyICFpbXBvcnRhbnQ7XFxufVxcbi5yZWQtdGV4dC50ZXh0LWxpZ2h0ZW4tNCB7XFxuICBjb2xvcjogI0ZGQ0REMiAhaW1wb3J0YW50O1xcbn1cXG4ucmVkLmxpZ2h0ZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUY5QTlBICFpbXBvcnRhbnQ7XFxufVxcbi5yZWQtdGV4dC50ZXh0LWxpZ2h0ZW4tMyB7XFxuICBjb2xvcjogI0VGOUE5QSAhaW1wb3J0YW50O1xcbn1cXG4ucmVkLmxpZ2h0ZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTU3MzczICFpbXBvcnRhbnQ7XFxufVxcbi5yZWQtdGV4dC50ZXh0LWxpZ2h0ZW4tMiB7XFxuICBjb2xvcjogI0U1NzM3MyAhaW1wb3J0YW50O1xcbn1cXG4ucmVkLmxpZ2h0ZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUY1MzUwICFpbXBvcnRhbnQ7XFxufVxcbi5yZWQtdGV4dC50ZXh0LWxpZ2h0ZW4tMSB7XFxuICBjb2xvcjogI0VGNTM1MCAhaW1wb3J0YW50O1xcbn1cXG4ucmVkLmRhcmtlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNFNTM5MzUgIWltcG9ydGFudDtcXG59XFxuLnJlZC10ZXh0LnRleHQtZGFya2VuLTEge1xcbiAgY29sb3I6ICNFNTM5MzUgIWltcG9ydGFudDtcXG59XFxuLnJlZC5kYXJrZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDMyRjJGICFpbXBvcnRhbnQ7XFxufVxcbi5yZWQtdGV4dC50ZXh0LWRhcmtlbi0yIHtcXG4gIGNvbG9yOiAjRDMyRjJGICFpbXBvcnRhbnQ7XFxufVxcbi5yZWQuZGFya2VuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0M2MjgyOCAhaW1wb3J0YW50O1xcbn1cXG4ucmVkLXRleHQudGV4dC1kYXJrZW4tMyB7XFxuICBjb2xvcjogI0M2MjgyOCAhaW1wb3J0YW50O1xcbn1cXG4ucmVkLmRhcmtlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNCNzFDMUMgIWltcG9ydGFudDtcXG59XFxuLnJlZC10ZXh0LnRleHQtZGFya2VuLTQge1xcbiAgY29sb3I6ICNCNzFDMUMgIWltcG9ydGFudDtcXG59XFxuLnJlZC5hY2NlbnQtMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkY4QTgwICFpbXBvcnRhbnQ7XFxufVxcbi5yZWQtdGV4dC50ZXh0LWFjY2VudC0xIHtcXG4gIGNvbG9yOiAjRkY4QTgwICFpbXBvcnRhbnQ7XFxufVxcbi5yZWQuYWNjZW50LTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGNTI1MiAhaW1wb3J0YW50O1xcbn1cXG4ucmVkLXRleHQudGV4dC1hY2NlbnQtMiB7XFxuICBjb2xvcjogI0ZGNTI1MiAhaW1wb3J0YW50O1xcbn1cXG4ucmVkLmFjY2VudC0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGRjE3NDQgIWltcG9ydGFudDtcXG59XFxuLnJlZC10ZXh0LnRleHQtYWNjZW50LTMge1xcbiAgY29sb3I6ICNGRjE3NDQgIWltcG9ydGFudDtcXG59XFxuLnJlZC5hY2NlbnQtNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDUwMDAwICFpbXBvcnRhbnQ7XFxufVxcbi5yZWQtdGV4dC50ZXh0LWFjY2VudC00IHtcXG4gIGNvbG9yOiAjRDUwMDAwICFpbXBvcnRhbnQ7XFxufVxcbi5waW5rIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlOTFlNjMgIWltcG9ydGFudDtcXG59XFxuLnBpbmstdGV4dCB7XFxuICBjb2xvcjogI2U5MWU2MyAhaW1wb3J0YW50O1xcbn1cXG4ucGluay5saWdodGVuLTUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZTRlYyAhaW1wb3J0YW50O1xcbn1cXG4ucGluay10ZXh0LnRleHQtbGlnaHRlbi01IHtcXG4gIGNvbG9yOiAjZmNlNGVjICFpbXBvcnRhbnQ7XFxufVxcbi5waW5rLmxpZ2h0ZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhiYmQwICFpbXBvcnRhbnQ7XFxufVxcbi5waW5rLXRleHQudGV4dC1saWdodGVuLTQge1xcbiAgY29sb3I6ICNmOGJiZDAgIWltcG9ydGFudDtcXG59XFxuLnBpbmsubGlnaHRlbi0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNDhmYjEgIWltcG9ydGFudDtcXG59XFxuLnBpbmstdGV4dC50ZXh0LWxpZ2h0ZW4tMyB7XFxuICBjb2xvcjogI2Y0OGZiMSAhaW1wb3J0YW50O1xcbn1cXG4ucGluay5saWdodGVuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwNjI5MiAhaW1wb3J0YW50O1xcbn1cXG4ucGluay10ZXh0LnRleHQtbGlnaHRlbi0yIHtcXG4gIGNvbG9yOiAjZjA2MjkyICFpbXBvcnRhbnQ7XFxufVxcbi5waW5rLmxpZ2h0ZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWM0MDdhICFpbXBvcnRhbnQ7XFxufVxcbi5waW5rLXRleHQudGV4dC1saWdodGVuLTEge1xcbiAgY29sb3I6ICNlYzQwN2EgIWltcG9ydGFudDtcXG59XFxuLnBpbmsuZGFya2VuLTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q4MWI2MCAhaW1wb3J0YW50O1xcbn1cXG4ucGluay10ZXh0LnRleHQtZGFya2VuLTEge1xcbiAgY29sb3I6ICNkODFiNjAgIWltcG9ydGFudDtcXG59XFxuLnBpbmsuZGFya2VuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2MyMTg1YiAhaW1wb3J0YW50O1xcbn1cXG4ucGluay10ZXh0LnRleHQtZGFya2VuLTIge1xcbiAgY29sb3I6ICNjMjE4NWIgIWltcG9ydGFudDtcXG59XFxuLnBpbmsuZGFya2VuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FkMTQ1NyAhaW1wb3J0YW50O1xcbn1cXG4ucGluay10ZXh0LnRleHQtZGFya2VuLTMge1xcbiAgY29sb3I6ICNhZDE0NTcgIWltcG9ydGFudDtcXG59XFxuLnBpbmsuZGFya2VuLTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg4MGU0ZiAhaW1wb3J0YW50O1xcbn1cXG4ucGluay10ZXh0LnRleHQtZGFya2VuLTQge1xcbiAgY29sb3I6ICM4ODBlNGYgIWltcG9ydGFudDtcXG59XFxuLnBpbmsuYWNjZW50LTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmODBhYiAhaW1wb3J0YW50O1xcbn1cXG4ucGluay10ZXh0LnRleHQtYWNjZW50LTEge1xcbiAgY29sb3I6ICNmZjgwYWIgIWltcG9ydGFudDtcXG59XFxuLnBpbmsuYWNjZW50LTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNDA4MSAhaW1wb3J0YW50O1xcbn1cXG4ucGluay10ZXh0LnRleHQtYWNjZW50LTIge1xcbiAgY29sb3I6ICNmZjQwODEgIWltcG9ydGFudDtcXG59XFxuLnBpbmsuYWNjZW50LTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1MDA1NyAhaW1wb3J0YW50O1xcbn1cXG4ucGluay10ZXh0LnRleHQtYWNjZW50LTMge1xcbiAgY29sb3I6ICNmNTAwNTcgIWltcG9ydGFudDtcXG59XFxuLnBpbmsuYWNjZW50LTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M1MTE2MiAhaW1wb3J0YW50O1xcbn1cXG4ucGluay10ZXh0LnRleHQtYWNjZW50LTQge1xcbiAgY29sb3I6ICNjNTExNjIgIWltcG9ydGFudDtcXG59XFxuLnB1cnBsZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWMyN2IwICFpbXBvcnRhbnQ7XFxufVxcbi5wdXJwbGUtdGV4dCB7XFxuICBjb2xvcjogIzljMjdiMCAhaW1wb3J0YW50O1xcbn1cXG4ucHVycGxlLmxpZ2h0ZW4tNSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNlNWY1ICFpbXBvcnRhbnQ7XFxufVxcbi5wdXJwbGUtdGV4dC50ZXh0LWxpZ2h0ZW4tNSB7XFxuICBjb2xvcjogI2YzZTVmNSAhaW1wb3J0YW50O1xcbn1cXG4ucHVycGxlLmxpZ2h0ZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTFiZWU3ICFpbXBvcnRhbnQ7XFxufVxcbi5wdXJwbGUtdGV4dC50ZXh0LWxpZ2h0ZW4tNCB7XFxuICBjb2xvcjogI2UxYmVlNyAhaW1wb3J0YW50O1xcbn1cXG4ucHVycGxlLmxpZ2h0ZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2U5M2Q4ICFpbXBvcnRhbnQ7XFxufVxcbi5wdXJwbGUtdGV4dC50ZXh0LWxpZ2h0ZW4tMyB7XFxuICBjb2xvcjogI2NlOTNkOCAhaW1wb3J0YW50O1xcbn1cXG4ucHVycGxlLmxpZ2h0ZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmE2OGM4ICFpbXBvcnRhbnQ7XFxufVxcbi5wdXJwbGUtdGV4dC50ZXh0LWxpZ2h0ZW4tMiB7XFxuICBjb2xvcjogI2JhNjhjOCAhaW1wb3J0YW50O1xcbn1cXG4ucHVycGxlLmxpZ2h0ZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWI0N2JjICFpbXBvcnRhbnQ7XFxufVxcbi5wdXJwbGUtdGV4dC50ZXh0LWxpZ2h0ZW4tMSB7XFxuICBjb2xvcjogI2FiNDdiYyAhaW1wb3J0YW50O1xcbn1cXG4ucHVycGxlLmRhcmtlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4ZTI0YWEgIWltcG9ydGFudDtcXG59XFxuLnB1cnBsZS10ZXh0LnRleHQtZGFya2VuLTEge1xcbiAgY29sb3I6ICM4ZTI0YWEgIWltcG9ydGFudDtcXG59XFxuLnB1cnBsZS5kYXJrZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2IxZmEyICFpbXBvcnRhbnQ7XFxufVxcbi5wdXJwbGUtdGV4dC50ZXh0LWRhcmtlbi0yIHtcXG4gIGNvbG9yOiAjN2IxZmEyICFpbXBvcnRhbnQ7XFxufVxcbi5wdXJwbGUuZGFya2VuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzZhMWI5YSAhaW1wb3J0YW50O1xcbn1cXG4ucHVycGxlLXRleHQudGV4dC1kYXJrZW4tMyB7XFxuICBjb2xvcjogIzZhMWI5YSAhaW1wb3J0YW50O1xcbn1cXG4ucHVycGxlLmRhcmtlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0YTE0OGMgIWltcG9ydGFudDtcXG59XFxuLnB1cnBsZS10ZXh0LnRleHQtZGFya2VuLTQge1xcbiAgY29sb3I6ICM0YTE0OGMgIWltcG9ydGFudDtcXG59XFxuLnB1cnBsZS5hY2NlbnQtMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWE4MGZjICFpbXBvcnRhbnQ7XFxufVxcbi5wdXJwbGUtdGV4dC50ZXh0LWFjY2VudC0xIHtcXG4gIGNvbG9yOiAjZWE4MGZjICFpbXBvcnRhbnQ7XFxufVxcbi5wdXJwbGUuYWNjZW50LTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwNDBmYiAhaW1wb3J0YW50O1xcbn1cXG4ucHVycGxlLXRleHQudGV4dC1hY2NlbnQtMiB7XFxuICBjb2xvcjogI2UwNDBmYiAhaW1wb3J0YW50O1xcbn1cXG4ucHVycGxlLmFjY2VudC0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkNTAwZjkgIWltcG9ydGFudDtcXG59XFxuLnB1cnBsZS10ZXh0LnRleHQtYWNjZW50LTMge1xcbiAgY29sb3I6ICNkNTAwZjkgIWltcG9ydGFudDtcXG59XFxuLnB1cnBsZS5hY2NlbnQtNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWEwMGZmICFpbXBvcnRhbnQ7XFxufVxcbi5wdXJwbGUtdGV4dC50ZXh0LWFjY2VudC00IHtcXG4gIGNvbG9yOiAjYWEwMGZmICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLXB1cnBsZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjczYWI3ICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLXB1cnBsZS10ZXh0IHtcXG4gIGNvbG9yOiAjNjczYWI3ICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLXB1cnBsZS5saWdodGVuLTUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VkZTdmNiAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1wdXJwbGUtdGV4dC50ZXh0LWxpZ2h0ZW4tNSB7XFxuICBjb2xvcjogI2VkZTdmNiAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1wdXJwbGUubGlnaHRlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkMWM0ZTkgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtcHVycGxlLXRleHQudGV4dC1saWdodGVuLTQge1xcbiAgY29sb3I6ICNkMWM0ZTkgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtcHVycGxlLmxpZ2h0ZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjM5ZGRiICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLXB1cnBsZS10ZXh0LnRleHQtbGlnaHRlbi0zIHtcXG4gIGNvbG9yOiAjYjM5ZGRiICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLXB1cnBsZS5saWdodGVuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk1NzVjZCAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1wdXJwbGUtdGV4dC50ZXh0LWxpZ2h0ZW4tMiB7XFxuICBjb2xvcjogIzk1NzVjZCAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1wdXJwbGUubGlnaHRlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM3ZTU3YzIgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtcHVycGxlLXRleHQudGV4dC1saWdodGVuLTEge1xcbiAgY29sb3I6ICM3ZTU3YzIgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtcHVycGxlLmRhcmtlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZTM1YjEgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtcHVycGxlLXRleHQudGV4dC1kYXJrZW4tMSB7XFxuICBjb2xvcjogIzVlMzViMSAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1wdXJwbGUuZGFya2VuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzUxMmRhOCAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1wdXJwbGUtdGV4dC50ZXh0LWRhcmtlbi0yIHtcXG4gIGNvbG9yOiAjNTEyZGE4ICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLXB1cnBsZS5kYXJrZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDUyN2EwICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLXB1cnBsZS10ZXh0LnRleHQtZGFya2VuLTMge1xcbiAgY29sb3I6ICM0NTI3YTAgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtcHVycGxlLmRhcmtlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMTFiOTIgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtcHVycGxlLXRleHQudGV4dC1kYXJrZW4tNCB7XFxuICBjb2xvcjogIzMxMWI5MiAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1wdXJwbGUuYWNjZW50LTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2IzODhmZiAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1wdXJwbGUtdGV4dC50ZXh0LWFjY2VudC0xIHtcXG4gIGNvbG9yOiAjYjM4OGZmICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLXB1cnBsZS5hY2NlbnQtMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2M0ZGZmICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLXB1cnBsZS10ZXh0LnRleHQtYWNjZW50LTIge1xcbiAgY29sb3I6ICM3YzRkZmYgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtcHVycGxlLmFjY2VudC0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM2NTFmZmYgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtcHVycGxlLXRleHQudGV4dC1hY2NlbnQtMyB7XFxuICBjb2xvcjogIzY1MWZmZiAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1wdXJwbGUuYWNjZW50LTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzYyMDBlYSAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1wdXJwbGUtdGV4dC50ZXh0LWFjY2VudC00IHtcXG4gIGNvbG9yOiAjNjIwMGVhICFpbXBvcnRhbnQ7XFxufVxcbi5pbmRpZ28ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNmNTFiNSAhaW1wb3J0YW50O1xcbn1cXG4uaW5kaWdvLXRleHQge1xcbiAgY29sb3I6ICMzZjUxYjUgIWltcG9ydGFudDtcXG59XFxuLmluZGlnby5saWdodGVuLTUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZWFmNiAhaW1wb3J0YW50O1xcbn1cXG4uaW5kaWdvLXRleHQudGV4dC1saWdodGVuLTUge1xcbiAgY29sb3I6ICNlOGVhZjYgIWltcG9ydGFudDtcXG59XFxuLmluZGlnby5saWdodGVuLTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M1Y2FlOSAhaW1wb3J0YW50O1xcbn1cXG4uaW5kaWdvLXRleHQudGV4dC1saWdodGVuLTQge1xcbiAgY29sb3I6ICNjNWNhZTkgIWltcG9ydGFudDtcXG59XFxuLmluZGlnby5saWdodGVuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzlmYThkYSAhaW1wb3J0YW50O1xcbn1cXG4uaW5kaWdvLXRleHQudGV4dC1saWdodGVuLTMge1xcbiAgY29sb3I6ICM5ZmE4ZGEgIWltcG9ydGFudDtcXG59XFxuLmluZGlnby5saWdodGVuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc5ODZjYiAhaW1wb3J0YW50O1xcbn1cXG4uaW5kaWdvLXRleHQudGV4dC1saWdodGVuLTIge1xcbiAgY29sb3I6ICM3OTg2Y2IgIWltcG9ydGFudDtcXG59XFxuLmluZGlnby5saWdodGVuLTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVjNmJjMCAhaW1wb3J0YW50O1xcbn1cXG4uaW5kaWdvLXRleHQudGV4dC1saWdodGVuLTEge1xcbiAgY29sb3I6ICM1YzZiYzAgIWltcG9ydGFudDtcXG59XFxuLmluZGlnby5kYXJrZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzk0OWFiICFpbXBvcnRhbnQ7XFxufVxcbi5pbmRpZ28tdGV4dC50ZXh0LWRhcmtlbi0xIHtcXG4gIGNvbG9yOiAjMzk0OWFiICFpbXBvcnRhbnQ7XFxufVxcbi5pbmRpZ28uZGFya2VuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMwM2Y5ZiAhaW1wb3J0YW50O1xcbn1cXG4uaW5kaWdvLXRleHQudGV4dC1kYXJrZW4tMiB7XFxuICBjb2xvcjogIzMwM2Y5ZiAhaW1wb3J0YW50O1xcbn1cXG4uaW5kaWdvLmRhcmtlbi0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyODM1OTMgIWltcG9ydGFudDtcXG59XFxuLmluZGlnby10ZXh0LnRleHQtZGFya2VuLTMge1xcbiAgY29sb3I6ICMyODM1OTMgIWltcG9ydGFudDtcXG59XFxuLmluZGlnby5kYXJrZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWEyMzdlICFpbXBvcnRhbnQ7XFxufVxcbi5pbmRpZ28tdGV4dC50ZXh0LWRhcmtlbi00IHtcXG4gIGNvbG9yOiAjMWEyMzdlICFpbXBvcnRhbnQ7XFxufVxcbi5pbmRpZ28uYWNjZW50LTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzhjOWVmZiAhaW1wb3J0YW50O1xcbn1cXG4uaW5kaWdvLXRleHQudGV4dC1hY2NlbnQtMSB7XFxuICBjb2xvcjogIzhjOWVmZiAhaW1wb3J0YW50O1xcbn1cXG4uaW5kaWdvLmFjY2VudC0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1MzZkZmUgIWltcG9ydGFudDtcXG59XFxuLmluZGlnby10ZXh0LnRleHQtYWNjZW50LTIge1xcbiAgY29sb3I6ICM1MzZkZmUgIWltcG9ydGFudDtcXG59XFxuLmluZGlnby5hY2NlbnQtMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q1YWZlICFpbXBvcnRhbnQ7XFxufVxcbi5pbmRpZ28tdGV4dC50ZXh0LWFjY2VudC0zIHtcXG4gIGNvbG9yOiAjM2Q1YWZlICFpbXBvcnRhbnQ7XFxufVxcbi5pbmRpZ28uYWNjZW50LTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMwNGZmZSAhaW1wb3J0YW50O1xcbn1cXG4uaW5kaWdvLXRleHQudGV4dC1hY2NlbnQtNCB7XFxuICBjb2xvcjogIzMwNGZmZSAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NkYzICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLXRleHQge1xcbiAgY29sb3I6ICMyMTk2RjMgIWltcG9ydGFudDtcXG59XFxuLmJsdWUubGlnaHRlbi01IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNFM0YyRkQgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtdGV4dC50ZXh0LWxpZ2h0ZW4tNSB7XFxuICBjb2xvcjogI0UzRjJGRCAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS5saWdodGVuLTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0JCREVGQiAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS10ZXh0LnRleHQtbGlnaHRlbi00IHtcXG4gIGNvbG9yOiAjQkJERUZCICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLmxpZ2h0ZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTBDQUY5ICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLXRleHQudGV4dC1saWdodGVuLTMge1xcbiAgY29sb3I6ICM5MENBRjkgIWltcG9ydGFudDtcXG59XFxuLmJsdWUubGlnaHRlbi0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM2NEI1RjYgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtdGV4dC50ZXh0LWxpZ2h0ZW4tMiB7XFxuICBjb2xvcjogIzY0QjVGNiAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS5saWdodGVuLTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyQTVGNSAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS10ZXh0LnRleHQtbGlnaHRlbi0xIHtcXG4gIGNvbG9yOiAjNDJBNUY1ICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLmRhcmtlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxRTg4RTUgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtdGV4dC50ZXh0LWRhcmtlbi0xIHtcXG4gIGNvbG9yOiAjMUU4OEU1ICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLmRhcmtlbi0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxOTc2RDIgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtdGV4dC50ZXh0LWRhcmtlbi0yIHtcXG4gIGNvbG9yOiAjMTk3NkQyICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLmRhcmtlbi0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxNTY1QzAgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtdGV4dC50ZXh0LWRhcmtlbi0zIHtcXG4gIGNvbG9yOiAjMTU2NUMwICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLmRhcmtlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwRDQ3QTEgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtdGV4dC50ZXh0LWRhcmtlbi00IHtcXG4gIGNvbG9yOiAjMEQ0N0ExICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLmFjY2VudC0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4MkIxRkYgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtdGV4dC50ZXh0LWFjY2VudC0xIHtcXG4gIGNvbG9yOiAjODJCMUZGICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLmFjY2VudC0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0NDhBRkYgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtdGV4dC50ZXh0LWFjY2VudC0yIHtcXG4gIGNvbG9yOiAjNDQ4QUZGICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLmFjY2VudC0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOTc5RkYgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtdGV4dC50ZXh0LWFjY2VudC0zIHtcXG4gIGNvbG9yOiAjMjk3OUZGICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLmFjY2VudC00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOTYyRkYgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtdGV4dC50ZXh0LWFjY2VudC00IHtcXG4gIGNvbG9yOiAjMjk2MkZGICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ibHVlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwM2E5ZjQgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWJsdWUtdGV4dCB7XFxuICBjb2xvcjogIzAzYTlmNCAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS5saWdodGVuLTUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UxZjVmZSAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS10ZXh0LnRleHQtbGlnaHRlbi01IHtcXG4gIGNvbG9yOiAjZTFmNWZlICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ibHVlLmxpZ2h0ZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjNlNWZjICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ibHVlLXRleHQudGV4dC1saWdodGVuLTQge1xcbiAgY29sb3I6ICNiM2U1ZmMgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWJsdWUubGlnaHRlbi0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4MWQ0ZmEgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWJsdWUtdGV4dC50ZXh0LWxpZ2h0ZW4tMyB7XFxuICBjb2xvcjogIzgxZDRmYSAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS5saWdodGVuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRmYzNmNyAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS10ZXh0LnRleHQtbGlnaHRlbi0yIHtcXG4gIGNvbG9yOiAjNGZjM2Y3ICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ibHVlLmxpZ2h0ZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjliNmY2ICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ibHVlLXRleHQudGV4dC1saWdodGVuLTEge1xcbiAgY29sb3I6ICMyOWI2ZjYgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWJsdWUuZGFya2VuLTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAzOWJlNSAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS10ZXh0LnRleHQtZGFya2VuLTEge1xcbiAgY29sb3I6ICMwMzliZTUgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWJsdWUuZGFya2VuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAyODhkMSAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS10ZXh0LnRleHQtZGFya2VuLTIge1xcbiAgY29sb3I6ICMwMjg4ZDEgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWJsdWUuZGFya2VuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAyNzdiZCAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS10ZXh0LnRleHQtZGFya2VuLTMge1xcbiAgY29sb3I6ICMwMjc3YmQgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWJsdWUuZGFya2VuLTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAxNTc5YiAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS10ZXh0LnRleHQtZGFya2VuLTQge1xcbiAgY29sb3I6ICMwMTU3OWIgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWJsdWUuYWNjZW50LTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzgwZDhmZiAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS10ZXh0LnRleHQtYWNjZW50LTEge1xcbiAgY29sb3I6ICM4MGQ4ZmYgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWJsdWUuYWNjZW50LTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQwYzRmZiAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS10ZXh0LnRleHQtYWNjZW50LTIge1xcbiAgY29sb3I6ICM0MGM0ZmYgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWJsdWUuYWNjZW50LTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYjBmZiAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS10ZXh0LnRleHQtYWNjZW50LTMge1xcbiAgY29sb3I6ICMwMGIwZmYgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWJsdWUuYWNjZW50LTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwOTFlYSAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtYmx1ZS10ZXh0LnRleHQtYWNjZW50LTQge1xcbiAgY29sb3I6ICMwMDkxZWEgIWltcG9ydGFudDtcXG59XFxuLmN5YW4ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYmNkNCAhaW1wb3J0YW50O1xcbn1cXG4uY3lhbi10ZXh0IHtcXG4gIGNvbG9yOiAjMDBiY2Q0ICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLmxpZ2h0ZW4tNSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBmN2ZhICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLXRleHQudGV4dC1saWdodGVuLTUge1xcbiAgY29sb3I6ICNlMGY3ZmEgIWltcG9ydGFudDtcXG59XFxuLmN5YW4ubGlnaHRlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiMmViZjIgIWltcG9ydGFudDtcXG59XFxuLmN5YW4tdGV4dC50ZXh0LWxpZ2h0ZW4tNCB7XFxuICBjb2xvcjogI2IyZWJmMiAhaW1wb3J0YW50O1xcbn1cXG4uY3lhbi5saWdodGVuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzgwZGVlYSAhaW1wb3J0YW50O1xcbn1cXG4uY3lhbi10ZXh0LnRleHQtbGlnaHRlbi0zIHtcXG4gIGNvbG9yOiAjODBkZWVhICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLmxpZ2h0ZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGRkMGUxICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLXRleHQudGV4dC1saWdodGVuLTIge1xcbiAgY29sb3I6ICM0ZGQwZTEgIWltcG9ydGFudDtcXG59XFxuLmN5YW4ubGlnaHRlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNmM2ZGEgIWltcG9ydGFudDtcXG59XFxuLmN5YW4tdGV4dC50ZXh0LWxpZ2h0ZW4tMSB7XFxuICBjb2xvcjogIzI2YzZkYSAhaW1wb3J0YW50O1xcbn1cXG4uY3lhbi5kYXJrZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhY2MxICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLXRleHQudGV4dC1kYXJrZW4tMSB7XFxuICBjb2xvcjogIzAwYWNjMSAhaW1wb3J0YW50O1xcbn1cXG4uY3lhbi5kYXJrZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5N2E3ICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLXRleHQudGV4dC1kYXJrZW4tMiB7XFxuICBjb2xvcjogIzAwOTdhNyAhaW1wb3J0YW50O1xcbn1cXG4uY3lhbi5kYXJrZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4MzhmICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLXRleHQudGV4dC1kYXJrZW4tMyB7XFxuICBjb2xvcjogIzAwODM4ZiAhaW1wb3J0YW50O1xcbn1cXG4uY3lhbi5kYXJrZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA2MDY0ICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLXRleHQudGV4dC1kYXJrZW4tNCB7XFxuICBjb2xvcjogIzAwNjA2NCAhaW1wb3J0YW50O1xcbn1cXG4uY3lhbi5hY2NlbnQtMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjODRmZmZmICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLXRleHQudGV4dC1hY2NlbnQtMSB7XFxuICBjb2xvcjogIzg0ZmZmZiAhaW1wb3J0YW50O1xcbn1cXG4uY3lhbi5hY2NlbnQtMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMThmZmZmICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLXRleHQudGV4dC1hY2NlbnQtMiB7XFxuICBjb2xvcjogIzE4ZmZmZiAhaW1wb3J0YW50O1xcbn1cXG4uY3lhbi5hY2NlbnQtMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBlNWZmICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLXRleHQudGV4dC1hY2NlbnQtMyB7XFxuICBjb2xvcjogIzAwZTVmZiAhaW1wb3J0YW50O1xcbn1cXG4uY3lhbi5hY2NlbnQtNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiOGQ0ICFpbXBvcnRhbnQ7XFxufVxcbi5jeWFuLXRleHQudGV4dC1hY2NlbnQtNCB7XFxuICBjb2xvcjogIzAwYjhkNCAhaW1wb3J0YW50O1xcbn1cXG4udGVhbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5Njg4ICFpbXBvcnRhbnQ7XFxufVxcbi50ZWFsLXRleHQge1xcbiAgY29sb3I6ICMwMDk2ODggIWltcG9ydGFudDtcXG59XFxuLnRlYWwubGlnaHRlbi01IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMGYyZjEgIWltcG9ydGFudDtcXG59XFxuLnRlYWwtdGV4dC50ZXh0LWxpZ2h0ZW4tNSB7XFxuICBjb2xvcjogI2UwZjJmMSAhaW1wb3J0YW50O1xcbn1cXG4udGVhbC5saWdodGVuLTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2IyZGZkYiAhaW1wb3J0YW50O1xcbn1cXG4udGVhbC10ZXh0LnRleHQtbGlnaHRlbi00IHtcXG4gIGNvbG9yOiAjYjJkZmRiICFpbXBvcnRhbnQ7XFxufVxcbi50ZWFsLmxpZ2h0ZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjODBjYmM0ICFpbXBvcnRhbnQ7XFxufVxcbi50ZWFsLXRleHQudGV4dC1saWdodGVuLTMge1xcbiAgY29sb3I6ICM4MGNiYzQgIWltcG9ydGFudDtcXG59XFxuLnRlYWwubGlnaHRlbi0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0ZGI2YWMgIWltcG9ydGFudDtcXG59XFxuLnRlYWwtdGV4dC50ZXh0LWxpZ2h0ZW4tMiB7XFxuICBjb2xvcjogIzRkYjZhYyAhaW1wb3J0YW50O1xcbn1cXG4udGVhbC5saWdodGVuLTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YSAhaW1wb3J0YW50O1xcbn1cXG4udGVhbC10ZXh0LnRleHQtbGlnaHRlbi0xIHtcXG4gIGNvbG9yOiAjMjZhNjlhICFpbXBvcnRhbnQ7XFxufVxcbi50ZWFsLmRhcmtlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDg5N2IgIWltcG9ydGFudDtcXG59XFxuLnRlYWwtdGV4dC50ZXh0LWRhcmtlbi0xIHtcXG4gIGNvbG9yOiAjMDA4OTdiICFpbXBvcnRhbnQ7XFxufVxcbi50ZWFsLmRhcmtlbi0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDc5NmIgIWltcG9ydGFudDtcXG59XFxuLnRlYWwtdGV4dC50ZXh0LWRhcmtlbi0yIHtcXG4gIGNvbG9yOiAjMDA3OTZiICFpbXBvcnRhbnQ7XFxufVxcbi50ZWFsLmRhcmtlbi0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDY5NWMgIWltcG9ydGFudDtcXG59XFxuLnRlYWwtdGV4dC50ZXh0LWRhcmtlbi0zIHtcXG4gIGNvbG9yOiAjMDA2OTVjICFpbXBvcnRhbnQ7XFxufVxcbi50ZWFsLmRhcmtlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDRkNDAgIWltcG9ydGFudDtcXG59XFxuLnRlYWwtdGV4dC50ZXh0LWRhcmtlbi00IHtcXG4gIGNvbG9yOiAjMDA0ZDQwICFpbXBvcnRhbnQ7XFxufVxcbi50ZWFsLmFjY2VudC0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhN2ZmZWIgIWltcG9ydGFudDtcXG59XFxuLnRlYWwtdGV4dC50ZXh0LWFjY2VudC0xIHtcXG4gIGNvbG9yOiAjYTdmZmViICFpbXBvcnRhbnQ7XFxufVxcbi50ZWFsLmFjY2VudC0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM2NGZmZGEgIWltcG9ydGFudDtcXG59XFxuLnRlYWwtdGV4dC50ZXh0LWFjY2VudC0yIHtcXG4gIGNvbG9yOiAjNjRmZmRhICFpbXBvcnRhbnQ7XFxufVxcbi50ZWFsLmFjY2VudC0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxZGU5YjYgIWltcG9ydGFudDtcXG59XFxuLnRlYWwtdGV4dC50ZXh0LWFjY2VudC0zIHtcXG4gIGNvbG9yOiAjMWRlOWI2ICFpbXBvcnRhbnQ7XFxufVxcbi50ZWFsLmFjY2VudC00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGJmYTUgIWltcG9ydGFudDtcXG59XFxuLnRlYWwtdGV4dC50ZXh0LWFjY2VudC00IHtcXG4gIGNvbG9yOiAjMDBiZmE1ICFpbXBvcnRhbnQ7XFxufVxcbi5ncmVlbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwICFpbXBvcnRhbnQ7XFxufVxcbi5ncmVlbi10ZXh0IHtcXG4gIGNvbG9yOiAjNENBRjUwICFpbXBvcnRhbnQ7XFxufVxcbi5ncmVlbi5saWdodGVuLTUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0U4RjVFOSAhaW1wb3J0YW50O1xcbn1cXG4uZ3JlZW4tdGV4dC50ZXh0LWxpZ2h0ZW4tNSB7XFxuICBjb2xvcjogI0U4RjVFOSAhaW1wb3J0YW50O1xcbn1cXG4uZ3JlZW4ubGlnaHRlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNDOEU2QzkgIWltcG9ydGFudDtcXG59XFxuLmdyZWVuLXRleHQudGV4dC1saWdodGVuLTQge1xcbiAgY29sb3I6ICNDOEU2QzkgIWltcG9ydGFudDtcXG59XFxuLmdyZWVuLmxpZ2h0ZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQTVENkE3ICFpbXBvcnRhbnQ7XFxufVxcbi5ncmVlbi10ZXh0LnRleHQtbGlnaHRlbi0zIHtcXG4gIGNvbG9yOiAjQTVENkE3ICFpbXBvcnRhbnQ7XFxufVxcbi5ncmVlbi5saWdodGVuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzgxQzc4NCAhaW1wb3J0YW50O1xcbn1cXG4uZ3JlZW4tdGV4dC50ZXh0LWxpZ2h0ZW4tMiB7XFxuICBjb2xvcjogIzgxQzc4NCAhaW1wb3J0YW50O1xcbn1cXG4uZ3JlZW4ubGlnaHRlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM2NkJCNkEgIWltcG9ydGFudDtcXG59XFxuLmdyZWVuLXRleHQudGV4dC1saWdodGVuLTEge1xcbiAgY29sb3I6ICM2NkJCNkEgIWltcG9ydGFudDtcXG59XFxuLmdyZWVuLmRhcmtlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0M0EwNDcgIWltcG9ydGFudDtcXG59XFxuLmdyZWVuLXRleHQudGV4dC1kYXJrZW4tMSB7XFxuICBjb2xvcjogIzQzQTA0NyAhaW1wb3J0YW50O1xcbn1cXG4uZ3JlZW4uZGFya2VuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4OEUzQyAhaW1wb3J0YW50O1xcbn1cXG4uZ3JlZW4tdGV4dC50ZXh0LWRhcmtlbi0yIHtcXG4gIGNvbG9yOiAjMzg4RTNDICFpbXBvcnRhbnQ7XFxufVxcbi5ncmVlbi5kYXJrZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMkU3RDMyICFpbXBvcnRhbnQ7XFxufVxcbi5ncmVlbi10ZXh0LnRleHQtZGFya2VuLTMge1xcbiAgY29sb3I6ICMyRTdEMzIgIWltcG9ydGFudDtcXG59XFxuLmdyZWVuLmRhcmtlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxQjVFMjAgIWltcG9ydGFudDtcXG59XFxuLmdyZWVuLXRleHQudGV4dC1kYXJrZW4tNCB7XFxuICBjb2xvcjogIzFCNUUyMCAhaW1wb3J0YW50O1xcbn1cXG4uZ3JlZW4uYWNjZW50LTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0I5RjZDQSAhaW1wb3J0YW50O1xcbn1cXG4uZ3JlZW4tdGV4dC50ZXh0LWFjY2VudC0xIHtcXG4gIGNvbG9yOiAjQjlGNkNBICFpbXBvcnRhbnQ7XFxufVxcbi5ncmVlbi5hY2NlbnQtMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjlGMEFFICFpbXBvcnRhbnQ7XFxufVxcbi5ncmVlbi10ZXh0LnRleHQtYWNjZW50LTIge1xcbiAgY29sb3I6ICM2OUYwQUUgIWltcG9ydGFudDtcXG59XFxuLmdyZWVuLmFjY2VudC0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMEU2NzYgIWltcG9ydGFudDtcXG59XFxuLmdyZWVuLXRleHQudGV4dC1hY2NlbnQtMyB7XFxuICBjb2xvcjogIzAwRTY3NiAhaW1wb3J0YW50O1xcbn1cXG4uZ3JlZW4uYWNjZW50LTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwQzg1MyAhaW1wb3J0YW50O1xcbn1cXG4uZ3JlZW4tdGV4dC50ZXh0LWFjY2VudC00IHtcXG4gIGNvbG9yOiAjMDBDODUzICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ncmVlbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGJjMzRhICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ncmVlbi10ZXh0IHtcXG4gIGNvbG9yOiAjOGJjMzRhICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ncmVlbi5saWdodGVuLTUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YxZjhlOSAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtZ3JlZW4tdGV4dC50ZXh0LWxpZ2h0ZW4tNSB7XFxuICBjb2xvcjogI2YxZjhlOSAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtZ3JlZW4ubGlnaHRlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkY2VkYzggIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWdyZWVuLXRleHQudGV4dC1saWdodGVuLTQge1xcbiAgY29sb3I6ICNkY2VkYzggIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWdyZWVuLmxpZ2h0ZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzVlMWE1ICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ncmVlbi10ZXh0LnRleHQtbGlnaHRlbi0zIHtcXG4gIGNvbG9yOiAjYzVlMWE1ICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ncmVlbi5saWdodGVuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FlZDU4MSAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtZ3JlZW4tdGV4dC50ZXh0LWxpZ2h0ZW4tMiB7XFxuICBjb2xvcjogI2FlZDU4MSAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtZ3JlZW4ubGlnaHRlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5Y2NjNjUgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWdyZWVuLXRleHQudGV4dC1saWdodGVuLTEge1xcbiAgY29sb3I6ICM5Y2NjNjUgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWdyZWVuLmRhcmtlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM3Y2IzNDIgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWdyZWVuLXRleHQudGV4dC1kYXJrZW4tMSB7XFxuICBjb2xvcjogIzdjYjM0MiAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtZ3JlZW4uZGFya2VuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY4OWYzOCAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtZ3JlZW4tdGV4dC50ZXh0LWRhcmtlbi0yIHtcXG4gIGNvbG9yOiAjNjg5ZjM4ICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ncmVlbi5kYXJrZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU4YjJmICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ncmVlbi10ZXh0LnRleHQtZGFya2VuLTMge1xcbiAgY29sb3I6ICM1NThiMmYgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWdyZWVuLmRhcmtlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzY5MWUgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWdyZWVuLXRleHQudGV4dC1kYXJrZW4tNCB7XFxuICBjb2xvcjogIzMzNjkxZSAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtZ3JlZW4uYWNjZW50LTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjZmY5MCAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtZ3JlZW4tdGV4dC50ZXh0LWFjY2VudC0xIHtcXG4gIGNvbG9yOiAjY2NmZjkwICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ncmVlbi5hY2NlbnQtMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjJmZjU5ICFpbXBvcnRhbnQ7XFxufVxcbi5saWdodC1ncmVlbi10ZXh0LnRleHQtYWNjZW50LTIge1xcbiAgY29sb3I6ICNiMmZmNTkgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWdyZWVuLmFjY2VudC0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM3NmZmMDMgIWltcG9ydGFudDtcXG59XFxuLmxpZ2h0LWdyZWVuLXRleHQudGV4dC1hY2NlbnQtMyB7XFxuICBjb2xvcjogIzc2ZmYwMyAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtZ3JlZW4uYWNjZW50LTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY0ZGQxNyAhaW1wb3J0YW50O1xcbn1cXG4ubGlnaHQtZ3JlZW4tdGV4dC50ZXh0LWFjY2VudC00IHtcXG4gIGNvbG9yOiAjNjRkZDE3ICFpbXBvcnRhbnQ7XFxufVxcbi5saW1lIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjZGRjMzkgIWltcG9ydGFudDtcXG59XFxuLmxpbWUtdGV4dCB7XFxuICBjb2xvcjogI2NkZGMzOSAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS5saWdodGVuLTUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZmJlNyAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS10ZXh0LnRleHQtbGlnaHRlbi01IHtcXG4gIGNvbG9yOiAjZjlmYmU3ICFpbXBvcnRhbnQ7XFxufVxcbi5saW1lLmxpZ2h0ZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmNGMzICFpbXBvcnRhbnQ7XFxufVxcbi5saW1lLXRleHQudGV4dC1saWdodGVuLTQge1xcbiAgY29sb3I6ICNmMGY0YzMgIWltcG9ydGFudDtcXG59XFxuLmxpbWUubGlnaHRlbi0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNmVlOWMgIWltcG9ydGFudDtcXG59XFxuLmxpbWUtdGV4dC50ZXh0LWxpZ2h0ZW4tMyB7XFxuICBjb2xvcjogI2U2ZWU5YyAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS5saWdodGVuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RjZTc3NSAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS10ZXh0LnRleHQtbGlnaHRlbi0yIHtcXG4gIGNvbG9yOiAjZGNlNzc1ICFpbXBvcnRhbnQ7XFxufVxcbi5saW1lLmxpZ2h0ZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDRlMTU3ICFpbXBvcnRhbnQ7XFxufVxcbi5saW1lLXRleHQudGV4dC1saWdodGVuLTEge1xcbiAgY29sb3I6ICNkNGUxNTcgIWltcG9ydGFudDtcXG59XFxuLmxpbWUuZGFya2VuLTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2MwY2EzMyAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS10ZXh0LnRleHQtZGFya2VuLTEge1xcbiAgY29sb3I6ICNjMGNhMzMgIWltcG9ydGFudDtcXG59XFxuLmxpbWUuZGFya2VuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FmYjQyYiAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS10ZXh0LnRleHQtZGFya2VuLTIge1xcbiAgY29sb3I6ICNhZmI0MmIgIWltcG9ydGFudDtcXG59XFxuLmxpbWUuZGFya2VuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzllOWQyNCAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS10ZXh0LnRleHQtZGFya2VuLTMge1xcbiAgY29sb3I6ICM5ZTlkMjQgIWltcG9ydGFudDtcXG59XFxuLmxpbWUuZGFya2VuLTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzgyNzcxNyAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS10ZXh0LnRleHQtZGFya2VuLTQge1xcbiAgY29sb3I6ICM4Mjc3MTcgIWltcG9ydGFudDtcXG59XFxuLmxpbWUuYWNjZW50LTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZmY4MSAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS10ZXh0LnRleHQtYWNjZW50LTEge1xcbiAgY29sb3I6ICNmNGZmODEgIWltcG9ydGFudDtcXG59XFxuLmxpbWUuYWNjZW50LTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZmY0MSAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS10ZXh0LnRleHQtYWNjZW50LTIge1xcbiAgY29sb3I6ICNlZWZmNDEgIWltcG9ydGFudDtcXG59XFxuLmxpbWUuYWNjZW50LTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M2ZmYwMCAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS10ZXh0LnRleHQtYWNjZW50LTMge1xcbiAgY29sb3I6ICNjNmZmMDAgIWltcG9ydGFudDtcXG59XFxuLmxpbWUuYWNjZW50LTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FlZWEwMCAhaW1wb3J0YW50O1xcbn1cXG4ubGltZS10ZXh0LnRleHQtYWNjZW50LTQge1xcbiAgY29sb3I6ICNhZWVhMDAgIWltcG9ydGFudDtcXG59XFxuLnllbGxvdyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlYjNiICFpbXBvcnRhbnQ7XFxufVxcbi55ZWxsb3ctdGV4dCB7XFxuICBjb2xvcjogI2ZmZWIzYiAhaW1wb3J0YW50O1xcbn1cXG4ueWVsbG93LmxpZ2h0ZW4tNSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZGU3ICFpbXBvcnRhbnQ7XFxufVxcbi55ZWxsb3ctdGV4dC50ZXh0LWxpZ2h0ZW4tNSB7XFxuICBjb2xvcjogI2ZmZmRlNyAhaW1wb3J0YW50O1xcbn1cXG4ueWVsbG93LmxpZ2h0ZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOWM0ICFpbXBvcnRhbnQ7XFxufVxcbi55ZWxsb3ctdGV4dC50ZXh0LWxpZ2h0ZW4tNCB7XFxuICBjb2xvcjogI2ZmZjljNCAhaW1wb3J0YW50O1xcbn1cXG4ueWVsbG93LmxpZ2h0ZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmNTlkICFpbXBvcnRhbnQ7XFxufVxcbi55ZWxsb3ctdGV4dC50ZXh0LWxpZ2h0ZW4tMyB7XFxuICBjb2xvcjogI2ZmZjU5ZCAhaW1wb3J0YW50O1xcbn1cXG4ueWVsbG93LmxpZ2h0ZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmMTc2ICFpbXBvcnRhbnQ7XFxufVxcbi55ZWxsb3ctdGV4dC50ZXh0LWxpZ2h0ZW4tMiB7XFxuICBjb2xvcjogI2ZmZjE3NiAhaW1wb3J0YW50O1xcbn1cXG4ueWVsbG93LmxpZ2h0ZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlZTU4ICFpbXBvcnRhbnQ7XFxufVxcbi55ZWxsb3ctdGV4dC50ZXh0LWxpZ2h0ZW4tMSB7XFxuICBjb2xvcjogI2ZmZWU1OCAhaW1wb3J0YW50O1xcbn1cXG4ueWVsbG93LmRhcmtlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZGQ4MzUgIWltcG9ydGFudDtcXG59XFxuLnllbGxvdy10ZXh0LnRleHQtZGFya2VuLTEge1xcbiAgY29sb3I6ICNmZGQ4MzUgIWltcG9ydGFudDtcXG59XFxuLnllbGxvdy5kYXJrZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmJjMDJkICFpbXBvcnRhbnQ7XFxufVxcbi55ZWxsb3ctdGV4dC50ZXh0LWRhcmtlbi0yIHtcXG4gIGNvbG9yOiAjZmJjMDJkICFpbXBvcnRhbnQ7XFxufVxcbi55ZWxsb3cuZGFya2VuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y5YTgyNSAhaW1wb3J0YW50O1xcbn1cXG4ueWVsbG93LXRleHQudGV4dC1kYXJrZW4tMyB7XFxuICBjb2xvcjogI2Y5YTgyNSAhaW1wb3J0YW50O1xcbn1cXG4ueWVsbG93LmRhcmtlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNTdmMTcgIWltcG9ydGFudDtcXG59XFxuLnllbGxvdy10ZXh0LnRleHQtZGFya2VuLTQge1xcbiAgY29sb3I6ICNmNTdmMTcgIWltcG9ydGFudDtcXG59XFxuLnllbGxvdy5hY2NlbnQtMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZjhkICFpbXBvcnRhbnQ7XFxufVxcbi55ZWxsb3ctdGV4dC50ZXh0LWFjY2VudC0xIHtcXG4gIGNvbG9yOiAjZmZmZjhkICFpbXBvcnRhbnQ7XFxufVxcbi55ZWxsb3cuYWNjZW50LTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmYwMCAhaW1wb3J0YW50O1xcbn1cXG4ueWVsbG93LXRleHQudGV4dC1hY2NlbnQtMiB7XFxuICBjb2xvcjogI2ZmZmYwMCAhaW1wb3J0YW50O1xcbn1cXG4ueWVsbG93LmFjY2VudC0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmVhMDAgIWltcG9ydGFudDtcXG59XFxuLnllbGxvdy10ZXh0LnRleHQtYWNjZW50LTMge1xcbiAgY29sb3I6ICNmZmVhMDAgIWltcG9ydGFudDtcXG59XFxuLnllbGxvdy5hY2NlbnQtNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkNjAwICFpbXBvcnRhbnQ7XFxufVxcbi55ZWxsb3ctdGV4dC50ZXh0LWFjY2VudC00IHtcXG4gIGNvbG9yOiAjZmZkNjAwICFpbXBvcnRhbnQ7XFxufVxcbi5hbWJlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjMTA3ICFpbXBvcnRhbnQ7XFxufVxcbi5hbWJlci10ZXh0IHtcXG4gIGNvbG9yOiAjZmZjMTA3ICFpbXBvcnRhbnQ7XFxufVxcbi5hbWJlci5saWdodGVuLTUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjhlMSAhaW1wb3J0YW50O1xcbn1cXG4uYW1iZXItdGV4dC50ZXh0LWxpZ2h0ZW4tNSB7XFxuICBjb2xvcjogI2ZmZjhlMSAhaW1wb3J0YW50O1xcbn1cXG4uYW1iZXIubGlnaHRlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmVjYjMgIWltcG9ydGFudDtcXG59XFxuLmFtYmVyLXRleHQudGV4dC1saWdodGVuLTQge1xcbiAgY29sb3I6ICNmZmVjYjMgIWltcG9ydGFudDtcXG59XFxuLmFtYmVyLmxpZ2h0ZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlMDgyICFpbXBvcnRhbnQ7XFxufVxcbi5hbWJlci10ZXh0LnRleHQtbGlnaHRlbi0zIHtcXG4gIGNvbG9yOiAjZmZlMDgyICFpbXBvcnRhbnQ7XFxufVxcbi5hbWJlci5saWdodGVuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDU0ZiAhaW1wb3J0YW50O1xcbn1cXG4uYW1iZXItdGV4dC50ZXh0LWxpZ2h0ZW4tMiB7XFxuICBjb2xvcjogI2ZmZDU0ZiAhaW1wb3J0YW50O1xcbn1cXG4uYW1iZXIubGlnaHRlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmNhMjggIWltcG9ydGFudDtcXG59XFxuLmFtYmVyLXRleHQudGV4dC1saWdodGVuLTEge1xcbiAgY29sb3I6ICNmZmNhMjggIWltcG9ydGFudDtcXG59XFxuLmFtYmVyLmRhcmtlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmIzMDAgIWltcG9ydGFudDtcXG59XFxuLmFtYmVyLXRleHQudGV4dC1kYXJrZW4tMSB7XFxuICBjb2xvcjogI2ZmYjMwMCAhaW1wb3J0YW50O1xcbn1cXG4uYW1iZXIuZGFya2VuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYTAwMCAhaW1wb3J0YW50O1xcbn1cXG4uYW1iZXItdGV4dC50ZXh0LWRhcmtlbi0yIHtcXG4gIGNvbG9yOiAjZmZhMDAwICFpbXBvcnRhbnQ7XFxufVxcbi5hbWJlci5kYXJrZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY4ZjAwICFpbXBvcnRhbnQ7XFxufVxcbi5hbWJlci10ZXh0LnRleHQtZGFya2VuLTMge1xcbiAgY29sb3I6ICNmZjhmMDAgIWltcG9ydGFudDtcXG59XFxuLmFtYmVyLmRhcmtlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjZmMDAgIWltcG9ydGFudDtcXG59XFxuLmFtYmVyLXRleHQudGV4dC1kYXJrZW4tNCB7XFxuICBjb2xvcjogI2ZmNmYwMCAhaW1wb3J0YW50O1xcbn1cXG4uYW1iZXIuYWNjZW50LTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZTU3ZiAhaW1wb3J0YW50O1xcbn1cXG4uYW1iZXItdGV4dC50ZXh0LWFjY2VudC0xIHtcXG4gIGNvbG9yOiAjZmZlNTdmICFpbXBvcnRhbnQ7XFxufVxcbi5hbWJlci5hY2NlbnQtMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkNzQwICFpbXBvcnRhbnQ7XFxufVxcbi5hbWJlci10ZXh0LnRleHQtYWNjZW50LTIge1xcbiAgY29sb3I6ICNmZmQ3NDAgIWltcG9ydGFudDtcXG59XFxuLmFtYmVyLmFjY2VudC0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmM0MDAgIWltcG9ydGFudDtcXG59XFxuLmFtYmVyLXRleHQudGV4dC1hY2NlbnQtMyB7XFxuICBjb2xvcjogI2ZmYzQwMCAhaW1wb3J0YW50O1xcbn1cXG4uYW1iZXIuYWNjZW50LTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYWIwMCAhaW1wb3J0YW50O1xcbn1cXG4uYW1iZXItdGV4dC50ZXh0LWFjY2VudC00IHtcXG4gIGNvbG9yOiAjZmZhYjAwICFpbXBvcnRhbnQ7XFxufVxcbi5vcmFuZ2Uge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTgwMCAhaW1wb3J0YW50O1xcbn1cXG4ub3JhbmdlLXRleHQge1xcbiAgY29sb3I6ICNmZjk4MDAgIWltcG9ydGFudDtcXG59XFxuLm9yYW5nZS5saWdodGVuLTUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjNlMCAhaW1wb3J0YW50O1xcbn1cXG4ub3JhbmdlLXRleHQudGV4dC1saWdodGVuLTUge1xcbiAgY29sb3I6ICNmZmYzZTAgIWltcG9ydGFudDtcXG59XFxuLm9yYW5nZS5saWdodGVuLTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZTBiMiAhaW1wb3J0YW50O1xcbn1cXG4ub3JhbmdlLXRleHQudGV4dC1saWdodGVuLTQge1xcbiAgY29sb3I6ICNmZmUwYjIgIWltcG9ydGFudDtcXG59XFxuLm9yYW5nZS5saWdodGVuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmY2M4MCAhaW1wb3J0YW50O1xcbn1cXG4ub3JhbmdlLXRleHQudGV4dC1saWdodGVuLTMge1xcbiAgY29sb3I6ICNmZmNjODAgIWltcG9ydGFudDtcXG59XFxuLm9yYW5nZS5saWdodGVuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYjc0ZCAhaW1wb3J0YW50O1xcbn1cXG4ub3JhbmdlLXRleHQudGV4dC1saWdodGVuLTIge1xcbiAgY29sb3I6ICNmZmI3NGQgIWltcG9ydGFudDtcXG59XFxuLm9yYW5nZS5saWdodGVuLTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYTcyNiAhaW1wb3J0YW50O1xcbn1cXG4ub3JhbmdlLXRleHQudGV4dC1saWdodGVuLTEge1xcbiAgY29sb3I6ICNmZmE3MjYgIWltcG9ydGFudDtcXG59XFxuLm9yYW5nZS5kYXJrZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmI4YzAwICFpbXBvcnRhbnQ7XFxufVxcbi5vcmFuZ2UtdGV4dC50ZXh0LWRhcmtlbi0xIHtcXG4gIGNvbG9yOiAjZmI4YzAwICFpbXBvcnRhbnQ7XFxufVxcbi5vcmFuZ2UuZGFya2VuLTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1N2MwMCAhaW1wb3J0YW50O1xcbn1cXG4ub3JhbmdlLXRleHQudGV4dC1kYXJrZW4tMiB7XFxuICBjb2xvcjogI2Y1N2MwMCAhaW1wb3J0YW50O1xcbn1cXG4ub3JhbmdlLmRhcmtlbi0zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZjZjMDAgIWltcG9ydGFudDtcXG59XFxuLm9yYW5nZS10ZXh0LnRleHQtZGFya2VuLTMge1xcbiAgY29sb3I6ICNlZjZjMDAgIWltcG9ydGFudDtcXG59XFxuLm9yYW5nZS5kYXJrZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTY1MTAwICFpbXBvcnRhbnQ7XFxufVxcbi5vcmFuZ2UtdGV4dC50ZXh0LWRhcmtlbi00IHtcXG4gIGNvbG9yOiAjZTY1MTAwICFpbXBvcnRhbnQ7XFxufVxcbi5vcmFuZ2UuYWNjZW50LTEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDE4MCAhaW1wb3J0YW50O1xcbn1cXG4ub3JhbmdlLXRleHQudGV4dC1hY2NlbnQtMSB7XFxuICBjb2xvcjogI2ZmZDE4MCAhaW1wb3J0YW50O1xcbn1cXG4ub3JhbmdlLmFjY2VudC0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmFiNDAgIWltcG9ydGFudDtcXG59XFxuLm9yYW5nZS10ZXh0LnRleHQtYWNjZW50LTIge1xcbiAgY29sb3I6ICNmZmFiNDAgIWltcG9ydGFudDtcXG59XFxuLm9yYW5nZS5hY2NlbnQtMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY5MTAwICFpbXBvcnRhbnQ7XFxufVxcbi5vcmFuZ2UtdGV4dC50ZXh0LWFjY2VudC0zIHtcXG4gIGNvbG9yOiAjZmY5MTAwICFpbXBvcnRhbnQ7XFxufVxcbi5vcmFuZ2UuYWNjZW50LTQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNmQwMCAhaW1wb3J0YW50O1xcbn1cXG4ub3JhbmdlLXRleHQudGV4dC1hY2NlbnQtNCB7XFxuICBjb2xvcjogI2ZmNmQwMCAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1vcmFuZ2Uge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNTcyMiAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1vcmFuZ2UtdGV4dCB7XFxuICBjb2xvcjogI2ZmNTcyMiAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1vcmFuZ2UubGlnaHRlbi01IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYmU5ZTcgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtb3JhbmdlLXRleHQudGV4dC1saWdodGVuLTUge1xcbiAgY29sb3I6ICNmYmU5ZTcgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtb3JhbmdlLmxpZ2h0ZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjY2JjICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLW9yYW5nZS10ZXh0LnRleHQtbGlnaHRlbi00IHtcXG4gIGNvbG9yOiAjZmZjY2JjICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLW9yYW5nZS5saWdodGVuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYWI5MSAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1vcmFuZ2UtdGV4dC50ZXh0LWxpZ2h0ZW4tMyB7XFxuICBjb2xvcjogI2ZmYWI5MSAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1vcmFuZ2UubGlnaHRlbi0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjhhNjUgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtb3JhbmdlLXRleHQudGV4dC1saWdodGVuLTIge1xcbiAgY29sb3I6ICNmZjhhNjUgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtb3JhbmdlLmxpZ2h0ZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY3MDQzICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLW9yYW5nZS10ZXh0LnRleHQtbGlnaHRlbi0xIHtcXG4gIGNvbG9yOiAjZmY3MDQzICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLW9yYW5nZS5kYXJrZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjQ1MTFlICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLW9yYW5nZS10ZXh0LnRleHQtZGFya2VuLTEge1xcbiAgY29sb3I6ICNmNDUxMWUgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtb3JhbmdlLmRhcmtlbi0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNjRhMTkgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtb3JhbmdlLXRleHQudGV4dC1kYXJrZW4tMiB7XFxuICBjb2xvcjogI2U2NGExOSAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1vcmFuZ2UuZGFya2VuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q4NDMxNSAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1vcmFuZ2UtdGV4dC50ZXh0LWRhcmtlbi0zIHtcXG4gIGNvbG9yOiAjZDg0MzE1ICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLW9yYW5nZS5kYXJrZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmYzNjBjICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLW9yYW5nZS10ZXh0LnRleHQtZGFya2VuLTQge1xcbiAgY29sb3I6ICNiZjM2MGMgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtb3JhbmdlLmFjY2VudC0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjllODAgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtb3JhbmdlLXRleHQudGV4dC1hY2NlbnQtMSB7XFxuICBjb2xvcjogI2ZmOWU4MCAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1vcmFuZ2UuYWNjZW50LTIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNmU0MCAhaW1wb3J0YW50O1xcbn1cXG4uZGVlcC1vcmFuZ2UtdGV4dC50ZXh0LWFjY2VudC0yIHtcXG4gIGNvbG9yOiAjZmY2ZTQwICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLW9yYW5nZS5hY2NlbnQtMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYzZDAwICFpbXBvcnRhbnQ7XFxufVxcbi5kZWVwLW9yYW5nZS10ZXh0LnRleHQtYWNjZW50LTMge1xcbiAgY29sb3I6ICNmZjNkMDAgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtb3JhbmdlLmFjY2VudC00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZDJjMDAgIWltcG9ydGFudDtcXG59XFxuLmRlZXAtb3JhbmdlLXRleHQudGV4dC1hY2NlbnQtNCB7XFxuICBjb2xvcjogI2RkMmMwMCAhaW1wb3J0YW50O1xcbn1cXG4uYnJvd24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc5NTU0OCAhaW1wb3J0YW50O1xcbn1cXG4uYnJvd24tdGV4dCB7XFxuICBjb2xvcjogIzc5NTU0OCAhaW1wb3J0YW50O1xcbn1cXG4uYnJvd24ubGlnaHRlbi01IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmViZTkgIWltcG9ydGFudDtcXG59XFxuLmJyb3duLXRleHQudGV4dC1saWdodGVuLTUge1xcbiAgY29sb3I6ICNlZmViZTkgIWltcG9ydGFudDtcXG59XFxuLmJyb3duLmxpZ2h0ZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdjY2M4ICFpbXBvcnRhbnQ7XFxufVxcbi5icm93bi10ZXh0LnRleHQtbGlnaHRlbi00IHtcXG4gIGNvbG9yOiAjZDdjY2M4ICFpbXBvcnRhbnQ7XFxufVxcbi5icm93bi5saWdodGVuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2JjYWFhNCAhaW1wb3J0YW50O1xcbn1cXG4uYnJvd24tdGV4dC50ZXh0LWxpZ2h0ZW4tMyB7XFxuICBjb2xvcjogI2JjYWFhNCAhaW1wb3J0YW50O1xcbn1cXG4uYnJvd24ubGlnaHRlbi0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhMTg4N2YgIWltcG9ydGFudDtcXG59XFxuLmJyb3duLXRleHQudGV4dC1saWdodGVuLTIge1xcbiAgY29sb3I6ICNhMTg4N2YgIWltcG9ydGFudDtcXG59XFxuLmJyb3duLmxpZ2h0ZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGQ2ZTYzICFpbXBvcnRhbnQ7XFxufVxcbi5icm93bi10ZXh0LnRleHQtbGlnaHRlbi0xIHtcXG4gIGNvbG9yOiAjOGQ2ZTYzICFpbXBvcnRhbnQ7XFxufVxcbi5icm93bi5kYXJrZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmQ0YzQxICFpbXBvcnRhbnQ7XFxufVxcbi5icm93bi10ZXh0LnRleHQtZGFya2VuLTEge1xcbiAgY29sb3I6ICM2ZDRjNDEgIWltcG9ydGFudDtcXG59XFxuLmJyb3duLmRhcmtlbi0yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZDQwMzcgIWltcG9ydGFudDtcXG59XFxuLmJyb3duLXRleHQudGV4dC1kYXJrZW4tMiB7XFxuICBjb2xvcjogIzVkNDAzNyAhaW1wb3J0YW50O1xcbn1cXG4uYnJvd24uZGFya2VuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRlMzQyZSAhaW1wb3J0YW50O1xcbn1cXG4uYnJvd24tdGV4dC50ZXh0LWRhcmtlbi0zIHtcXG4gIGNvbG9yOiAjNGUzNDJlICFpbXBvcnRhbnQ7XFxufVxcbi5icm93bi5kYXJrZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2UyNzIzICFpbXBvcnRhbnQ7XFxufVxcbi5icm93bi10ZXh0LnRleHQtZGFya2VuLTQge1xcbiAgY29sb3I6ICMzZTI3MjMgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtZ3JleSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjA3ZDhiICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLWdyZXktdGV4dCB7XFxuICBjb2xvcjogIzYwN2Q4YiAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS1ncmV5LmxpZ2h0ZW4tNSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlZmYxICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLWdyZXktdGV4dC50ZXh0LWxpZ2h0ZW4tNSB7XFxuICBjb2xvcjogI2VjZWZmMSAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS1ncmV5LmxpZ2h0ZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2ZkOGRjICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLWdyZXktdGV4dC50ZXh0LWxpZ2h0ZW4tNCB7XFxuICBjb2xvcjogI2NmZDhkYyAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS1ncmV5LmxpZ2h0ZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjBiZWM1ICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLWdyZXktdGV4dC50ZXh0LWxpZ2h0ZW4tMyB7XFxuICBjb2xvcjogI2IwYmVjNSAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS1ncmV5LmxpZ2h0ZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTBhNGFlICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLWdyZXktdGV4dC50ZXh0LWxpZ2h0ZW4tMiB7XFxuICBjb2xvcjogIzkwYTRhZSAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS1ncmV5LmxpZ2h0ZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzg5MDljICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLWdyZXktdGV4dC50ZXh0LWxpZ2h0ZW4tMSB7XFxuICBjb2xvcjogIzc4OTA5YyAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS1ncmV5LmRhcmtlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1NDZlN2EgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtZ3JleS10ZXh0LnRleHQtZGFya2VuLTEge1xcbiAgY29sb3I6ICM1NDZlN2EgIWltcG9ydGFudDtcXG59XFxuLmJsdWUtZ3JleS5kYXJrZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDU1YTY0ICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLWdyZXktdGV4dC50ZXh0LWRhcmtlbi0yIHtcXG4gIGNvbG9yOiAjNDU1YTY0ICFpbXBvcnRhbnQ7XFxufVxcbi5ibHVlLWdyZXkuZGFya2VuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM3NDc0ZiAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS1ncmV5LXRleHQudGV4dC1kYXJrZW4tMyB7XFxuICBjb2xvcjogIzM3NDc0ZiAhaW1wb3J0YW50O1xcbn1cXG4uYmx1ZS1ncmV5LmRhcmtlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNjMyMzggIWltcG9ydGFudDtcXG59XFxuLmJsdWUtZ3JleS10ZXh0LnRleHQtZGFya2VuLTQge1xcbiAgY29sb3I6ICMyNjMyMzggIWltcG9ydGFudDtcXG59XFxuLmdyZXkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzllOWU5ZSAhaW1wb3J0YW50O1xcbn1cXG4uZ3JleS10ZXh0IHtcXG4gIGNvbG9yOiAjOWU5ZTllICFpbXBvcnRhbnQ7XFxufVxcbi5ncmV5LmxpZ2h0ZW4tNSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhICFpbXBvcnRhbnQ7XFxufVxcbi5ncmV5LXRleHQudGV4dC1saWdodGVuLTUge1xcbiAgY29sb3I6ICNmYWZhZmEgIWltcG9ydGFudDtcXG59XFxuLmdyZXkubGlnaHRlbi00IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjUgIWltcG9ydGFudDtcXG59XFxuLmdyZXktdGV4dC50ZXh0LWxpZ2h0ZW4tNCB7XFxuICBjb2xvcjogI2Y1ZjVmNSAhaW1wb3J0YW50O1xcbn1cXG4uZ3JleS5saWdodGVuLTMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZSAhaW1wb3J0YW50O1xcbn1cXG4uZ3JleS10ZXh0LnRleHQtbGlnaHRlbi0zIHtcXG4gIGNvbG9yOiAjZWVlZWVlICFpbXBvcnRhbnQ7XFxufVxcbi5ncmV5LmxpZ2h0ZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGUwICFpbXBvcnRhbnQ7XFxufVxcbi5ncmV5LXRleHQudGV4dC1saWdodGVuLTIge1xcbiAgY29sb3I6ICNlMGUwZTAgIWltcG9ydGFudDtcXG59XFxuLmdyZXkubGlnaHRlbi0xIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiZGJkYmQgIWltcG9ydGFudDtcXG59XFxuLmdyZXktdGV4dC50ZXh0LWxpZ2h0ZW4tMSB7XFxuICBjb2xvcjogI2JkYmRiZCAhaW1wb3J0YW50O1xcbn1cXG4uZ3JleS5kYXJrZW4tMSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzU3NTc1ICFpbXBvcnRhbnQ7XFxufVxcbi5ncmV5LXRleHQudGV4dC1kYXJrZW4tMSB7XFxuICBjb2xvcjogIzc1NzU3NSAhaW1wb3J0YW50O1xcbn1cXG4uZ3JleS5kYXJrZW4tMiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjE2MTYxICFpbXBvcnRhbnQ7XFxufVxcbi5ncmV5LXRleHQudGV4dC1kYXJrZW4tMiB7XFxuICBjb2xvcjogIzYxNjE2MSAhaW1wb3J0YW50O1xcbn1cXG4uZ3JleS5kYXJrZW4tMyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDI0MjQyICFpbXBvcnRhbnQ7XFxufVxcbi5ncmV5LXRleHQudGV4dC1kYXJrZW4tMyB7XFxuICBjb2xvcjogIzQyNDI0MiAhaW1wb3J0YW50O1xcbn1cXG4uZ3JleS5kYXJrZW4tNCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyMTIxICFpbXBvcnRhbnQ7XFxufVxcbi5ncmV5LXRleHQudGV4dC1kYXJrZW4tNCB7XFxuICBjb2xvcjogIzIxMjEyMSAhaW1wb3J0YW50O1xcbn1cXG4uYmxhY2sge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMCAhaW1wb3J0YW50O1xcbn1cXG4uYmxhY2stdGV4dCB7XFxuICBjb2xvcjogIzAwMDAwMCAhaW1wb3J0YW50O1xcbn1cXG4ud2hpdGUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRiAhaW1wb3J0YW50O1xcbn1cXG4ud2hpdGUtdGV4dCB7XFxuICBjb2xvcjogI0ZGRkZGRiAhaW1wb3J0YW50O1xcbn1cXG4udHJhbnNwYXJlbnQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcXG59XFxuLnRyYW5zcGFyZW50LXRleHQge1xcbiAgY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XFxufVxcbi8qISBub3JtYWxpemUuY3NzIHY3LjAuMCB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW5cXG4gKiAgICBJRSBvbiBXaW5kb3dzIFBob25lIGFuZCBpbiBpT1MuXFxuICovXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTtcXG4gIC8qIDEgKi9cXG4gIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xcbiAgLyogMiAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xcbiAgLyogMiAqL1xcbn1cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzIChvcGluaW9uYXRlZCkuXFxuICovXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxcbiAqL1xcbmFydGljbGUsXFxuYXNpZGUsXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5uYXYsXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRS5cXG4gKi9cXG5maWdjYXB0aW9uLFxcbmZpZ3VyZSxcXG5tYWluIHtcXG4gIC8qIDEgKi9cXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgbWFyZ2luIGluIElFIDguXFxuICovXFxuZmlndXJlIHtcXG4gIG1hcmdpbjogMWVtIDQwcHg7XFxufVxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuaHIge1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XFxuICAvKiAxICovXFxuICBoZWlnaHQ6IDA7XFxuICAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gIC8qIDIgKi9cXG59XFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTtcXG4gIC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtO1xcbiAgLyogMiAqL1xcbn1cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSBnYXBzIGluIGxpbmtzIHVuZGVybGluZSBpbiBpT1MgOCsgYW5kIFNhZmFyaSA4Ky5cXG4gKi9cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb24tc2tpcDogb2JqZWN0cztcXG4gIC8qIDIgKi9cXG59XFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny0gYW5kIEZpcmVmb3ggMzktLlxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgLyogMiAqL1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7XFxuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDtcXG4gIC8qIDIgKi9cXG59XFxuLyoqXFxuICogUHJldmVudCB0aGUgZHVwbGljYXRlIGFwcGxpY2F0aW9uIG9mIGBib2xkZXJgIGJ5IHRoZSBuZXh0IHJ1bGUgaW4gU2FmYXJpIDYuXFxuICovXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGluaGVyaXQ7XFxufVxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7XFxuICAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTtcXG4gIC8qIDIgKi9cXG59XFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc3R5bGUgaW4gQW5kcm9pZCA0LjMtLlxcbiAqL1xcbmRmbiB7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBiYWNrZ3JvdW5kIGFuZCBjb2xvciBpbiBJRSA5LS5cXG4gKi9cXG5tYXJrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjA7XFxuICBjb2xvcjogIzAwMDtcXG59XFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07XFxufVxcbnN1cCB7XFxuICB0b3A6IC0wLjVlbTtcXG59XFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXFxuICovXFxuYXVkaW8sXFxudmlkZW8ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBpT1MgNC03LlxcbiAqL1xcbmF1ZGlvOm5vdChbY29udHJvbHNdKSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgaGVpZ2h0OiAwO1xcbn1cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLS5cXG4gKi9cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbn1cXG4vKipcXG4gKiBIaWRlIHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKi9cXG5zdmc6bm90KDpyb290KSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMgKG9waW5pb25hdGVkKS5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gIC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1O1xcbiAgLyogMSAqL1xcbiAgbWFyZ2luOiAwO1xcbiAgLyogMiAqL1xcbn1cXG4vKipcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcbiAqL1xcbmJ1dHRvbixcXG5pbnB1dCB7XFxuICAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcbmJ1dHRvbixcXG5zZWxlY3Qge1xcbiAgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcbi8qKlxcbiAqIDEuIFByZXZlbnQgYSBXZWJLaXQgYnVnIHdoZXJlICgyKSBkZXN0cm95cyBuYXRpdmUgYGF1ZGlvYCBhbmQgYHZpZGVvYFxcbiAqICAgIGNvbnRyb2xzIGluIEFuZHJvaWQgNC5cXG4gKiAyLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcbmJ1dHRvbixcXG5odG1sIFt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxuICAvKiAyICovXFxufVxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcbmxlZ2VuZCB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIC8qIDIgKi9cXG4gIGRpc3BsYXk6IHRhYmxlO1xcbiAgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgLyogMSAqL1xcbiAgcGFkZGluZzogMDtcXG4gIC8qIDMgKi9cXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XFxuICAvKiAxICovXFxufVxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxucHJvZ3Jlc3Mge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgLyogMSAqL1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgLyogMiAqL1xcbn1cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFLlxcbiAqL1xcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC0uXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLS5cXG4gKi9cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAvKiAxICovXFxuICBwYWRkaW5nOiAwO1xcbiAgLyogMiAqL1xcbn1cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxuICovXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcXG4gIC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xcbiAgLyogMiAqL1xcbn1cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgYW5kIGNhbmNlbCBidXR0b25zIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbixcXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcbiAgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIC8qIDIgKi9cXG59XFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUsIGFuZCBGaXJlZm94LlxcbiAqL1xcbmRldGFpbHMsXFxubWVudSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcbi8qIFNjcmlwdGluZ1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXFxuICovXFxuY2FudmFzIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUuXFxuICovXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLyogSGlkZGVuXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC0uXFxuICovXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuaHRtbCB7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbiosICo6YmVmb3JlLCAqOmFmdGVyIHtcXG4gIC13ZWJraXQtYm94LXNpemluZzogaW5oZXJpdDtcXG4gICAgICAgICAgYm94LXNpemluZzogaW5oZXJpdDtcXG59XFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcXFwiU2Vnb2UgVUlcXFwiLCBSb2JvdG8sIE94eWdlbi1TYW5zLCBVYnVudHUsIENhbnRhcmVsbCwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgc2Fucy1zZXJpZjtcXG59XFxudWw6bm90KC5icm93c2VyLWRlZmF1bHQpIHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG59XFxudWw6bm90KC5icm93c2VyLWRlZmF1bHQpID4gbGkge1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbn1cXG5hIHtcXG4gIGNvbG9yOiAjMDM5YmU1O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLnZhbGlnbi13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4uY2xlYXJmaXgge1xcbiAgY2xlYXI6IGJvdGg7XFxufVxcbi56LWRlcHRoLTAge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuLyogMmRwIGVsZXZhdGlvbiBtb2RpZmllZCovXFxuLnotZGVwdGgtMSwgbmF2LCAuY2FyZC1wYW5lbCwgLmNhcmQsIC50b2FzdCwgLmJ0biwgLmJ0bi1sYXJnZSwgLmJ0bi1zbWFsbCwgLmJ0bi1mbG9hdGluZywgLmRyb3Bkb3duLWNvbnRlbnQsIC5jb2xsYXBzaWJsZSwgLnNpZGVuYXYge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDNweCAxcHggLTJweCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDFweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgMXB4IDVweCAwIHJnYmEoMCwgMCwgMCwgMC4yKTtcXG59XFxuLnotZGVwdGgtMS1oYWxmLCAuYnRuOmhvdmVyLCAuYnRuLWxhcmdlOmhvdmVyLCAuYnRuLXNtYWxsOmhvdmVyLCAuYnRuLWZsb2F0aW5nOmhvdmVyIHtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAzcHggM3B4IDAgcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCAxcHggN3B4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAzcHggMXB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDNweCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDFweCA3cHggMCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDNweCAxcHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxufVxcbi8qIDZkcCBlbGV2YXRpb24gbW9kaWZpZWQqL1xcbi56LWRlcHRoLTIge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDRweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDFweCAxMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDRweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDFweCAxMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbn1cXG4vKiAxMmRwIGVsZXZhdGlvbiBtb2RpZmllZCovXFxuLnotZGVwdGgtMyB7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgOHB4IDE3cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgM3B4IDE0cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgNXB4IDVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogMCA4cHggMTdweCAycHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCAzcHggMTRweCAycHggcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbn1cXG4vKiAxNmRwIGVsZXZhdGlvbiAqL1xcbi56LWRlcHRoLTQge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDE2cHggMjRweCAycHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCA2cHggMzBweCA1cHggcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCA4cHggMTBweCAtN3B4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogMCAxNnB4IDI0cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgNnB4IDMwcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgOHB4IDEwcHggLTdweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxufVxcbi8qIDI0ZHAgZWxldmF0aW9uICovXFxuLnotZGVwdGgtNSwgLm1vZGFsIHtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMCAyNHB4IDM4cHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgOXB4IDQ2cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgMTFweCAxNXB4IC03cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDI0cHggMzhweCAzcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCA5cHggNDZweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAxMXB4IDE1cHggLTdweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxufVxcbi5ob3ZlcmFibGUge1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LWJveC1zaGFkb3cgLjI1cztcXG4gIHRyYW5zaXRpb246IC13ZWJraXQtYm94LXNoYWRvdyAuMjVzO1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAuMjVzO1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAuMjVzLCAtd2Via2l0LWJveC1zaGFkb3cgLjI1cztcXG59XFxuLmhvdmVyYWJsZTpob3ZlciB7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgOHB4IDE3cHggMCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgNnB4IDIwcHggMCByZ2JhKDAsIDAsIDAsIDAuMTkpO1xcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDhweCAxN3B4IDAgcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDZweCAyMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjE5KTtcXG59XFxuLmRpdmlkZXIge1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBlMDtcXG59XFxuYmxvY2txdW90ZSB7XFxuICBtYXJnaW46IDIwcHggMDtcXG4gIHBhZGRpbmctbGVmdDogMS41cmVtO1xcbiAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCAjZWU2ZTczO1xcbn1cXG5pIHtcXG4gIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcbn1cXG5pLmxlZnQge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxufVxcbmkucmlnaHQge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxufVxcbmkudGlueSB7XFxuICBmb250LXNpemU6IDFyZW07XFxufVxcbmkuc21hbGwge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5pLm1lZGl1bSB7XFxuICBmb250LXNpemU6IDRyZW07XFxufVxcbmkubGFyZ2Uge1xcbiAgZm9udC1zaXplOiA2cmVtO1xcbn1cXG5pbWcucmVzcG9uc2l2ZS1pbWcsXFxudmlkZW8ucmVzcG9uc2l2ZS12aWRlbyB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcbi5wYWdpbmF0aW9uIGxpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxuICBoZWlnaHQ6IDMwcHg7XFxufVxcbi5wYWdpbmF0aW9uIGxpIGEge1xcbiAgY29sb3I6ICM0NDQ7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIHBhZGRpbmc6IDAgMTBweDtcXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbn1cXG4ucGFnaW5hdGlvbiBsaS5hY3RpdmUgYSB7XFxuICBjb2xvcjogI2ZmZjtcXG59XFxuLnBhZ2luYXRpb24gbGkuYWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZTZlNzM7XFxufVxcbi5wYWdpbmF0aW9uIGxpLmRpc2FibGVkIGEge1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgY29sb3I6ICM5OTk7XFxufVxcbi5wYWdpbmF0aW9uIGxpIGkge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG4ucGFnaW5hdGlvbiBsaS5wYWdlcyB1bCBsaSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmbG9hdDogbm9uZTtcXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkge1xcbiAgLnBhZ2luYXRpb24ge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG4gIC5wYWdpbmF0aW9uIGxpLnByZXYsXFxuICAucGFnaW5hdGlvbiBsaS5uZXh0IHtcXG4gICAgd2lkdGg6IDEwJTtcXG4gIH1cXG4gIC5wYWdpbmF0aW9uIGxpLnBhZ2VzIHtcXG4gICAgd2lkdGg6IDgwJTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIH1cXG59XFxuLmJyZWFkY3J1bWIge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcXG59XFxuLmJyZWFkY3J1bWIgaSxcXG4uYnJlYWRjcnVtYiBbY2xhc3NePVxcXCJtZGktXFxcIl0sIC5icmVhZGNydW1iIFtjbGFzcyo9XFxcIm1kaS1cXFwiXSxcXG4uYnJlYWRjcnVtYiBpLm1hdGVyaWFsLWljb25zIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbn1cXG4uYnJlYWRjcnVtYjpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxFNUNDJztcXG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XFxuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1mYW1pbHk6ICdNYXRlcmlhbCBJY29ucyc7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAyNXB4O1xcbiAgbWFyZ2luOiAwIDEwcHggMCA4cHg7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG59XFxuLmJyZWFkY3J1bWI6Zmlyc3QtY2hpbGQ6YmVmb3JlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5icmVhZGNydW1iOmxhc3QtY2hpbGQge1xcbiAgY29sb3I6ICNmZmY7XFxufVxcbi5wYXJhbGxheC1jb250YWluZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGhlaWdodDogNTAwcHg7XFxufVxcbi5wYXJhbGxheC1jb250YWluZXIgLnBhcmFsbGF4IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHotaW5kZXg6IC0xO1xcbn1cXG4ucGFyYWxsYXgtY29udGFpbmVyIC5wYXJhbGxheCBpbWcge1xcbiAgb3BhY2l0eTogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDUwJTtcXG4gIGJvdHRvbTogMDtcXG4gIG1pbi13aWR0aDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbn1cXG4ucGluLXRvcCwgLnBpbi1ib3R0b20ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4ucGlubmVkIHtcXG4gIHBvc2l0aW9uOiBmaXhlZCAhaW1wb3J0YW50O1xcbn1cXG4vKioqKioqKioqKioqKioqKioqKioqXFxuICBUcmFuc2l0aW9uIENsYXNzZXNcXG4qKioqKioqKioqKioqKioqKioqKioqL1xcbnVsLnN0YWdnZXJlZC1saXN0IGxpIHtcXG4gIG9wYWNpdHk6IDA7XFxufVxcbi5mYWRlLWluIHtcXG4gIG9wYWNpdHk6IDA7XFxuICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDAgNTAlO1xcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDUwJTtcXG59XFxuLyoqKioqKioqKioqKioqKioqKioqKlxcbiAgTWVkaWEgUXVlcnkgQ2xhc3Nlc1xcbioqKioqKioqKioqKioqKioqKioqKiovXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgLmhpZGUtb24tc21hbGwtb25seSwgLmhpZGUtb24tc21hbGwtYW5kLWRvd24ge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTkycHgpIHtcXG4gIC5oaWRlLW9uLW1lZC1hbmQtZG93biB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDFweCkge1xcbiAgLmhpZGUtb24tbWVkLWFuZC11cCB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDBweCkgYW5kIChtYXgtd2lkdGg6IDk5MnB4KSB7XFxuICAuaGlkZS1vbi1tZWQtb25seSB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA5OTNweCkge1xcbiAgLmhpZGUtb24tbGFyZ2Utb25seSB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMjAxcHgpIHtcXG4gIC5oaWRlLW9uLWV4dHJhLWxhcmdlLW9ubHkge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTIwMXB4KSB7XFxuICAuc2hvdy1vbi1leHRyYS1sYXJnZSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogOTkzcHgpIHtcXG4gIC5zaG93LW9uLWxhcmdlIHtcXG4gICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDBweCkgYW5kIChtYXgtd2lkdGg6IDk5MnB4KSB7XFxuICAuc2hvdy1vbi1tZWRpdW0ge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAuc2hvdy1vbi1zbWFsbCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjAxcHgpIHtcXG4gIC5zaG93LW9uLW1lZGl1bS1hbmQtdXAge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSB7XFxuICAuc2hvdy1vbi1tZWRpdW0tYW5kLWRvd24ge1xcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAuY2VudGVyLW9uLXNtYWxsLW9ubHkge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxufVxcbi5wYWdlLWZvb3RlciB7XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlNmU3MztcXG59XFxuLnBhZ2UtZm9vdGVyIC5mb290ZXItY29weXJpZ2h0IHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtaW4taGVpZ2h0OiA1MHB4O1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHBhZGRpbmc6IDEwcHggMHB4O1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTEsIDUxLCA1MSwgMC4wOCk7XFxufVxcbnRhYmxlLCB0aCwgdGQge1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG50YWJsZSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG50YWJsZS5zdHJpcGVkIHRyIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxufVxcbnRhYmxlLnN0cmlwZWQgPiB0Ym9keSA+IHRyOm50aC1jaGlsZChvZGQpIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQyLCAyNDIsIDI0MiwgMC41KTtcXG59XFxudGFibGUuc3RyaXBlZCA+IHRib2R5ID4gdHIgPiB0ZCB7XFxuICBib3JkZXItcmFkaXVzOiAwO1xcbn1cXG50YWJsZS5oaWdobGlnaHQgPiB0Ym9keSA+IHRyIHtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuMjVzIGVhc2U7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4yNXMgZWFzZTtcXG59XFxudGFibGUuaGlnaGxpZ2h0ID4gdGJvZHkgPiB0cjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0MiwgMjQyLCAyNDIsIDAuNSk7XFxufVxcbnRhYmxlLmNlbnRlcmVkIHRoZWFkIHRyIHRoLCB0YWJsZS5jZW50ZXJlZCB0Ym9keSB0ciB0ZCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbnRyIHtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbn1cXG50ZCwgdGgge1xcbiAgcGFkZGluZzogMTVweCA1cHg7XFxuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTkycHgpIHtcXG4gIHRhYmxlLnJlc3BvbnNpdmUtdGFibGUge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIC8qIHNvcnQgb3V0IGJvcmRlcnMgKi9cXG4gIH1cXG4gIHRhYmxlLnJlc3BvbnNpdmUtdGFibGUgdGQ6ZW1wdHk6YmVmb3JlIHtcXG4gICAgY29udGVudDogJ1xcXFwwMGEwJztcXG4gIH1cXG4gIHRhYmxlLnJlc3BvbnNpdmUtdGFibGUgdGgsXFxuICB0YWJsZS5yZXNwb25zaXZlLXRhYmxlIHRkIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcbiAgfVxcbiAgdGFibGUucmVzcG9uc2l2ZS10YWJsZSB0aCB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICB9XFxuICB0YWJsZS5yZXNwb25zaXZlLXRhYmxlIHRoZWFkIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgfVxcbiAgdGFibGUucmVzcG9uc2l2ZS10YWJsZSB0aGVhZCB0ciB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwYWRkaW5nOiAwIDEwcHggMCAwO1xcbiAgfVxcbiAgdGFibGUucmVzcG9uc2l2ZS10YWJsZSB0aGVhZCB0ciB0aDo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXFwwMGEwXFxcIjtcXG4gIH1cXG4gIHRhYmxlLnJlc3BvbnNpdmUtdGFibGUgdGJvZHkge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgb3ZlcmZsb3cteDogYXV0bztcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIH1cXG4gIHRhYmxlLnJlc3BvbnNpdmUtdGFibGUgdGJvZHkgdHIge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxuICB9XFxuICB0YWJsZS5yZXNwb25zaXZlLXRhYmxlIHRoIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgfVxcbiAgdGFibGUucmVzcG9uc2l2ZS10YWJsZSB0ZCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBtaW4taGVpZ2h0OiAxLjI1ZW07XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICB9XFxuICB0YWJsZS5yZXNwb25zaXZlLXRhYmxlIHRyIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gICAgcGFkZGluZzogMCAxMHB4O1xcbiAgfVxcbiAgdGFibGUucmVzcG9uc2l2ZS10YWJsZSB0aGVhZCB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG4gIH1cXG59XFxuLmNvbGxlY3Rpb24ge1xcbiAgbWFyZ2luOiAwLjVyZW0gMCAxcmVtIDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZTBlMGUwO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmNvbGxlY3Rpb24gLmNvbGxlY3Rpb24taXRlbSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcXG4gIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gIG1hcmdpbjogMDtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xcbn1cXG4uY29sbGVjdGlvbiAuY29sbGVjdGlvbi1pdGVtLmF2YXRhciB7XFxuICBtaW4taGVpZ2h0OiA4NHB4O1xcbiAgcGFkZGluZy1sZWZ0OiA3MnB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uY29sbGVjdGlvbiAuY29sbGVjdGlvbi1pdGVtLmF2YXRhcjpub3QoLmNpcmNsZS1jbGlwcGVyKSA+IC5jaXJjbGUsXFxuLmNvbGxlY3Rpb24gLmNvbGxlY3Rpb24taXRlbS5hdmF0YXIgOm5vdCguY2lyY2xlLWNsaXBwZXIpID4gLmNpcmNsZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogNDJweDtcXG4gIGhlaWdodDogNDJweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBsZWZ0OiAxNXB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG59XFxuLmNvbGxlY3Rpb24gLmNvbGxlY3Rpb24taXRlbS5hdmF0YXIgaS5jaXJjbGUge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbGluZS1oZWlnaHQ6IDQycHg7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5OTk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5jb2xsZWN0aW9uIC5jb2xsZWN0aW9uLWl0ZW0uYXZhdGFyIC50aXRsZSB7XFxuICBmb250LXNpemU6IDE2cHg7XFxufVxcbi5jb2xsZWN0aW9uIC5jb2xsZWN0aW9uLWl0ZW0uYXZhdGFyIHAge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG4uY29sbGVjdGlvbiAuY29sbGVjdGlvbi1pdGVtLmF2YXRhciAuc2Vjb25kYXJ5LWNvbnRlbnQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxNnB4O1xcbiAgcmlnaHQ6IDE2cHg7XFxufVxcbi5jb2xsZWN0aW9uIC5jb2xsZWN0aW9uLWl0ZW06bGFzdC1jaGlsZCB7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbn1cXG4uY29sbGVjdGlvbiAuY29sbGVjdGlvbi1pdGVtLmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjZhNjlhO1xcbiAgY29sb3I6ICNlYWZhZjk7XFxufVxcbi5jb2xsZWN0aW9uIC5jb2xsZWN0aW9uLWl0ZW0uYWN0aXZlIC5zZWNvbmRhcnktY29udGVudCB7XFxuICBjb2xvcjogI2ZmZjtcXG59XFxuLmNvbGxlY3Rpb24gYS5jb2xsZWN0aW9uLWl0ZW0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC4yNXM7XFxuICB0cmFuc2l0aW9uOiAuMjVzO1xcbiAgY29sb3I6ICMyNmE2OWE7XFxufVxcbi5jb2xsZWN0aW9uIGEuY29sbGVjdGlvbi1pdGVtOm5vdCguYWN0aXZlKTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xcbn1cXG4uY29sbGVjdGlvbi53aXRoLWhlYWRlciAuY29sbGVjdGlvbi1oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xcbiAgcGFkZGluZzogMTBweCAyMHB4O1xcbn1cXG4uY29sbGVjdGlvbi53aXRoLWhlYWRlciAuY29sbGVjdGlvbi1pdGVtIHtcXG4gIHBhZGRpbmctbGVmdDogMzBweDtcXG59XFxuLmNvbGxlY3Rpb24ud2l0aC1oZWFkZXIgLmNvbGxlY3Rpb24taXRlbS5hdmF0YXIge1xcbiAgcGFkZGluZy1sZWZ0OiA3MnB4O1xcbn1cXG4uc2Vjb25kYXJ5LWNvbnRlbnQge1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgY29sb3I6ICMyNmE2OWE7XFxufVxcbi5jb2xsYXBzaWJsZSAuY29sbGVjdGlvbiB7XFxuICBtYXJnaW46IDA7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcbi52aWRlby1jb250YWluZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZy1ib3R0b206IDU2LjI1JTtcXG4gIGhlaWdodDogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi52aWRlby1jb250YWluZXIgaWZyYW1lLCAudmlkZW8tY29udGFpbmVyIG9iamVjdCwgLnZpZGVvLWNvbnRhaW5lciBlbWJlZCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcbi5wcm9ncmVzcyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBoZWlnaHQ6IDRweDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWNlY2U2O1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgbWFyZ2luOiAwLjVyZW0gMCAxcmVtIDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4ucHJvZ3Jlc3MgLmRldGVybWluYXRlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBib3R0b206IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjZhNjlhO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiB3aWR0aCAuM3MgbGluZWFyO1xcbiAgdHJhbnNpdGlvbjogd2lkdGggLjNzIGxpbmVhcjtcXG59XFxuLnByb2dyZXNzIC5pbmRldGVybWluYXRlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNmE2OWE7XFxufVxcbi5wcm9ncmVzcyAuaW5kZXRlcm1pbmF0ZTpiZWZvcmUge1xcbiAgY29udGVudDogJyc7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpbGwtY2hhbmdlOiBsZWZ0LCByaWdodDtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBpbmRldGVybWluYXRlIDIuMXMgY3ViaWMtYmV6aWVyKDAuNjUsIDAuODE1LCAwLjczNSwgMC4zOTUpIGluZmluaXRlO1xcbiAgICAgICAgICBhbmltYXRpb246IGluZGV0ZXJtaW5hdGUgMi4xcyBjdWJpYy1iZXppZXIoMC42NSwgMC44MTUsIDAuNzM1LCAwLjM5NSkgaW5maW5pdGU7XFxufVxcbi5wcm9ncmVzcyAuaW5kZXRlcm1pbmF0ZTphZnRlciB7XFxuICBjb250ZW50OiAnJztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGluaGVyaXQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lsbC1jaGFuZ2U6IGxlZnQsIHJpZ2h0O1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGluZGV0ZXJtaW5hdGUtc2hvcnQgMi4xcyBjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQsIDAuNDQsIDEpIGluZmluaXRlO1xcbiAgICAgICAgICBhbmltYXRpb246IGluZGV0ZXJtaW5hdGUtc2hvcnQgMi4xcyBjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQsIDAuNDQsIDEpIGluZmluaXRlO1xcbiAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDEuMTVzO1xcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDEuMTVzO1xcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgaW5kZXRlcm1pbmF0ZSB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IC0zNSU7XFxuICAgIHJpZ2h0OiAxMDAlO1xcbiAgfVxcbiAgNjAlIHtcXG4gICAgbGVmdDogMTAwJTtcXG4gICAgcmlnaHQ6IC05MCU7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgbGVmdDogMTAwJTtcXG4gICAgcmlnaHQ6IC05MCU7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgaW5kZXRlcm1pbmF0ZSB7XFxuICAwJSB7XFxuICAgIGxlZnQ6IC0zNSU7XFxuICAgIHJpZ2h0OiAxMDAlO1xcbiAgfVxcbiAgNjAlIHtcXG4gICAgbGVmdDogMTAwJTtcXG4gICAgcmlnaHQ6IC05MCU7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgbGVmdDogMTAwJTtcXG4gICAgcmlnaHQ6IC05MCU7XFxuICB9XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyBpbmRldGVybWluYXRlLXNob3J0IHtcXG4gIDAlIHtcXG4gICAgbGVmdDogLTIwMCU7XFxuICAgIHJpZ2h0OiAxMDAlO1xcbiAgfVxcbiAgNjAlIHtcXG4gICAgbGVmdDogMTA3JTtcXG4gICAgcmlnaHQ6IC04JTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBsZWZ0OiAxMDclO1xcbiAgICByaWdodDogLTglO1xcbiAgfVxcbn1cXG5Aa2V5ZnJhbWVzIGluZGV0ZXJtaW5hdGUtc2hvcnQge1xcbiAgMCUge1xcbiAgICBsZWZ0OiAtMjAwJTtcXG4gICAgcmlnaHQ6IDEwMCU7XFxuICB9XFxuICA2MCUge1xcbiAgICBsZWZ0OiAxMDclO1xcbiAgICByaWdodDogLTglO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIGxlZnQ6IDEwNyU7XFxuICAgIHJpZ2h0OiAtOCU7XFxuICB9XFxufVxcbi8qKioqKioqKioqKioqKioqKioqXFxuICBVdGlsaXR5IENsYXNzZXNcXG4qKioqKioqKioqKioqKioqKioqL1xcbi5oaWRlIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuLmxlZnQtYWxpZ24ge1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuLnJpZ2h0LWFsaWduIHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcbn1cXG4uY2VudGVyLCAuY2VudGVyLWFsaWduIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLmxlZnQge1xcbiAgZmxvYXQ6IGxlZnQgIWltcG9ydGFudDtcXG59XFxuLnJpZ2h0IHtcXG4gIGZsb2F0OiByaWdodCAhaW1wb3J0YW50O1xcbn1cXG4ubm8tc2VsZWN0LCBpbnB1dFt0eXBlPXJhbmdlXSxcXG5pbnB1dFt0eXBlPXJhbmdlXSArIC50aHVtYiB7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4uY2lyY2xlIHtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLmNlbnRlci1ibG9jayB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG4udHJ1bmNhdGUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbn1cXG4ubm8tcGFkZGluZyB7XFxuICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XFxufVxcbnNwYW4uYmFkZ2Uge1xcbiAgbWluLXdpZHRoOiAzcmVtO1xcbiAgcGFkZGluZzogMCA2cHg7XFxuICBtYXJnaW4tbGVmdDogMTRweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAyMnB4O1xcbiAgaGVpZ2h0OiAyMnB4O1xcbiAgY29sb3I6ICM3NTc1NzU7XFxuICBmbG9hdDogcmlnaHQ7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbnNwYW4uYmFkZ2UubmV3IHtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuc3Bhbi5iYWRnZS5uZXc6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIiBuZXdcXFwiO1xcbn1cXG5zcGFuLmJhZGdlW2RhdGEtYmFkZ2UtY2FwdGlvbl06OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIiBhdHRyKGRhdGEtYmFkZ2UtY2FwdGlvbik7XFxufVxcbm5hdiB1bCBhIHNwYW4uYmFkZ2Uge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZmxvYXQ6IG5vbmU7XFxuICBtYXJnaW4tbGVmdDogNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDIycHg7XFxuICBoZWlnaHQ6IDIycHg7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhdXRvO1xcbn1cXG4uY29sbGVjdGlvbi1pdGVtIHNwYW4uYmFkZ2Uge1xcbiAgbWFyZ2luLXRvcDogY2FsYygwLjc1cmVtIC0gMTFweCk7XFxufVxcbi5jb2xsYXBzaWJsZSBzcGFuLmJhZGdlIHtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cXG4uc2lkZW5hdiBzcGFuLmJhZGdlIHtcXG4gIG1hcmdpbi10b3A6IGNhbGMoMjRweCAtIDExcHgpO1xcbn1cXG50YWJsZSBzcGFuLmJhZGdlIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZsb2F0OiBub25lO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxufVxcbi8qIFRoaXMgaXMgbmVlZGVkIGZvciBzb21lIG1vYmlsZSBwaG9uZXMgdG8gZGlzcGxheSB0aGUgR29vZ2xlIEljb24gZm9udCBwcm9wZXJseSAqL1xcbi5tYXRlcmlhbC1pY29ucyB7XFxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3M6ICdsaWdhJztcXG4gICAgICAgICAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiAnbGlnYSc7XFxufVxcbi5jb250YWluZXIge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBtYXgtd2lkdGg6IDEyODBweDtcXG4gIHdpZHRoOiA5MCU7XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjAxcHgpIHtcXG4gIC5jb250YWluZXIge1xcbiAgICB3aWR0aDogODUlO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDk5M3B4KSB7XFxuICAuY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDcwJTtcXG4gIH1cXG59XFxuLmNvbCAucm93IHtcXG4gIG1hcmdpbi1sZWZ0OiAtMC43NXJlbTtcXG4gIG1hcmdpbi1yaWdodDogLTAuNzVyZW07XFxufVxcbi5zZWN0aW9uIHtcXG4gIHBhZGRpbmctdG9wOiAxcmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDFyZW07XFxufVxcbi5zZWN0aW9uLm5vLXBhZCB7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG4uc2VjdGlvbi5uby1wYWQtYm90IHtcXG4gIHBhZGRpbmctYm90dG9tOiAwO1xcbn1cXG4uc2VjdGlvbi5uby1wYWQtdG9wIHtcXG4gIHBhZGRpbmctdG9wOiAwO1xcbn1cXG4ucm93IHtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuLnJvdzphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbiAgY2xlYXI6IGJvdGg7XFxufVxcbi5yb3cgLmNvbCB7XFxuICBmbG9hdDogbGVmdDtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDAgMC43NXJlbTtcXG4gIG1pbi1oZWlnaHQ6IDFweDtcXG59XFxuLnJvdyAuY29sW2NsYXNzKj1cXFwicHVzaC1cXFwiXSwgLnJvdyAuY29sW2NsYXNzKj1cXFwicHVsbC1cXFwiXSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5yb3cgLmNvbC5zMSB7XFxuICB3aWR0aDogOC4zMzMzMzMzMzMzJTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbGVmdDogYXV0bztcXG4gIHJpZ2h0OiBhdXRvO1xcbn1cXG4ucm93IC5jb2wuczIge1xcbiAgd2lkdGg6IDE2LjY2NjY2NjY2NjclO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBsZWZ0OiBhdXRvO1xcbiAgcmlnaHQ6IGF1dG87XFxufVxcbi5yb3cgLmNvbC5zMyB7XFxuICB3aWR0aDogMjUlO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBsZWZ0OiBhdXRvO1xcbiAgcmlnaHQ6IGF1dG87XFxufVxcbi5yb3cgLmNvbC5zNCB7XFxuICB3aWR0aDogMzMuMzMzMzMzMzMzMyU7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIGxlZnQ6IGF1dG87XFxuICByaWdodDogYXV0bztcXG59XFxuLnJvdyAuY29sLnM1IHtcXG4gIHdpZHRoOiA0MS42NjY2NjY2NjY3JTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbGVmdDogYXV0bztcXG4gIHJpZ2h0OiBhdXRvO1xcbn1cXG4ucm93IC5jb2wuczYge1xcbiAgd2lkdGg6IDUwJTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbGVmdDogYXV0bztcXG4gIHJpZ2h0OiBhdXRvO1xcbn1cXG4ucm93IC5jb2wuczcge1xcbiAgd2lkdGg6IDU4LjMzMzMzMzMzMzMlO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBsZWZ0OiBhdXRvO1xcbiAgcmlnaHQ6IGF1dG87XFxufVxcbi5yb3cgLmNvbC5zOCB7XFxuICB3aWR0aDogNjYuNjY2NjY2NjY2NyU7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIGxlZnQ6IGF1dG87XFxuICByaWdodDogYXV0bztcXG59XFxuLnJvdyAuY29sLnM5IHtcXG4gIHdpZHRoOiA3NSU7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIGxlZnQ6IGF1dG87XFxuICByaWdodDogYXV0bztcXG59XFxuLnJvdyAuY29sLnMxMCB7XFxuICB3aWR0aDogODMuMzMzMzMzMzMzMyU7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIGxlZnQ6IGF1dG87XFxuICByaWdodDogYXV0bztcXG59XFxuLnJvdyAuY29sLnMxMSB7XFxuICB3aWR0aDogOTEuNjY2NjY2NjY2NyU7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIGxlZnQ6IGF1dG87XFxuICByaWdodDogYXV0bztcXG59XFxuLnJvdyAuY29sLnMxMiB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbGVmdDogYXV0bztcXG4gIHJpZ2h0OiBhdXRvO1xcbn1cXG4ucm93IC5jb2wub2Zmc2V0LXMxIHtcXG4gIG1hcmdpbi1sZWZ0OiA4LjMzMzMzMzMzMzMlO1xcbn1cXG4ucm93IC5jb2wucHVsbC1zMSB7XFxuICByaWdodDogOC4zMzMzMzMzMzMzJTtcXG59XFxuLnJvdyAuY29sLnB1c2gtczEge1xcbiAgbGVmdDogOC4zMzMzMzMzMzMzJTtcXG59XFxuLnJvdyAuY29sLm9mZnNldC1zMiB7XFxuICBtYXJnaW4tbGVmdDogMTYuNjY2NjY2NjY2NyU7XFxufVxcbi5yb3cgLmNvbC5wdWxsLXMyIHtcXG4gIHJpZ2h0OiAxNi42NjY2NjY2NjY3JTtcXG59XFxuLnJvdyAuY29sLnB1c2gtczIge1xcbiAgbGVmdDogMTYuNjY2NjY2NjY2NyU7XFxufVxcbi5yb3cgLmNvbC5vZmZzZXQtczMge1xcbiAgbWFyZ2luLWxlZnQ6IDI1JTtcXG59XFxuLnJvdyAuY29sLnB1bGwtczMge1xcbiAgcmlnaHQ6IDI1JTtcXG59XFxuLnJvdyAuY29sLnB1c2gtczMge1xcbiAgbGVmdDogMjUlO1xcbn1cXG4ucm93IC5jb2wub2Zmc2V0LXM0IHtcXG4gIG1hcmdpbi1sZWZ0OiAzMy4zMzMzMzMzMzMzJTtcXG59XFxuLnJvdyAuY29sLnB1bGwtczQge1xcbiAgcmlnaHQ6IDMzLjMzMzMzMzMzMzMlO1xcbn1cXG4ucm93IC5jb2wucHVzaC1zNCB7XFxuICBsZWZ0OiAzMy4zMzMzMzMzMzMzJTtcXG59XFxuLnJvdyAuY29sLm9mZnNldC1zNSB7XFxuICBtYXJnaW4tbGVmdDogNDEuNjY2NjY2NjY2NyU7XFxufVxcbi5yb3cgLmNvbC5wdWxsLXM1IHtcXG4gIHJpZ2h0OiA0MS42NjY2NjY2NjY3JTtcXG59XFxuLnJvdyAuY29sLnB1c2gtczUge1xcbiAgbGVmdDogNDEuNjY2NjY2NjY2NyU7XFxufVxcbi5yb3cgLmNvbC5vZmZzZXQtczYge1xcbiAgbWFyZ2luLWxlZnQ6IDUwJTtcXG59XFxuLnJvdyAuY29sLnB1bGwtczYge1xcbiAgcmlnaHQ6IDUwJTtcXG59XFxuLnJvdyAuY29sLnB1c2gtczYge1xcbiAgbGVmdDogNTAlO1xcbn1cXG4ucm93IC5jb2wub2Zmc2V0LXM3IHtcXG4gIG1hcmdpbi1sZWZ0OiA1OC4zMzMzMzMzMzMzJTtcXG59XFxuLnJvdyAuY29sLnB1bGwtczcge1xcbiAgcmlnaHQ6IDU4LjMzMzMzMzMzMzMlO1xcbn1cXG4ucm93IC5jb2wucHVzaC1zNyB7XFxuICBsZWZ0OiA1OC4zMzMzMzMzMzMzJTtcXG59XFxuLnJvdyAuY29sLm9mZnNldC1zOCB7XFxuICBtYXJnaW4tbGVmdDogNjYuNjY2NjY2NjY2NyU7XFxufVxcbi5yb3cgLmNvbC5wdWxsLXM4IHtcXG4gIHJpZ2h0OiA2Ni42NjY2NjY2NjY3JTtcXG59XFxuLnJvdyAuY29sLnB1c2gtczgge1xcbiAgbGVmdDogNjYuNjY2NjY2NjY2NyU7XFxufVxcbi5yb3cgLmNvbC5vZmZzZXQtczkge1xcbiAgbWFyZ2luLWxlZnQ6IDc1JTtcXG59XFxuLnJvdyAuY29sLnB1bGwtczkge1xcbiAgcmlnaHQ6IDc1JTtcXG59XFxuLnJvdyAuY29sLnB1c2gtczkge1xcbiAgbGVmdDogNzUlO1xcbn1cXG4ucm93IC5jb2wub2Zmc2V0LXMxMCB7XFxuICBtYXJnaW4tbGVmdDogODMuMzMzMzMzMzMzMyU7XFxufVxcbi5yb3cgLmNvbC5wdWxsLXMxMCB7XFxuICByaWdodDogODMuMzMzMzMzMzMzMyU7XFxufVxcbi5yb3cgLmNvbC5wdXNoLXMxMCB7XFxuICBsZWZ0OiA4My4zMzMzMzMzMzMzJTtcXG59XFxuLnJvdyAuY29sLm9mZnNldC1zMTEge1xcbiAgbWFyZ2luLWxlZnQ6IDkxLjY2NjY2NjY2NjclO1xcbn1cXG4ucm93IC5jb2wucHVsbC1zMTEge1xcbiAgcmlnaHQ6IDkxLjY2NjY2NjY2NjclO1xcbn1cXG4ucm93IC5jb2wucHVzaC1zMTEge1xcbiAgbGVmdDogOTEuNjY2NjY2NjY2NyU7XFxufVxcbi5yb3cgLmNvbC5vZmZzZXQtczEyIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMDAlO1xcbn1cXG4ucm93IC5jb2wucHVsbC1zMTIge1xcbiAgcmlnaHQ6IDEwMCU7XFxufVxcbi5yb3cgLmNvbC5wdXNoLXMxMiB7XFxuICBsZWZ0OiAxMDAlO1xcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMXB4KSB7XFxuICAucm93IC5jb2wubTEge1xcbiAgICB3aWR0aDogOC4zMzMzMzMzMzMzJTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLm0yIHtcXG4gICAgd2lkdGg6IDE2LjY2NjY2NjY2NjclO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbGVmdDogYXV0bztcXG4gICAgcmlnaHQ6IGF1dG87XFxuICB9XFxuICAucm93IC5jb2wubTMge1xcbiAgICB3aWR0aDogMjUlO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbGVmdDogYXV0bztcXG4gICAgcmlnaHQ6IGF1dG87XFxuICB9XFxuICAucm93IC5jb2wubTQge1xcbiAgICB3aWR0aDogMzMuMzMzMzMzMzMzMyU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC5tNSB7XFxuICAgIHdpZHRoOiA0MS42NjY2NjY2NjY3JTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLm02IHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLm03IHtcXG4gICAgd2lkdGg6IDU4LjMzMzMzMzMzMzMlO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbGVmdDogYXV0bztcXG4gICAgcmlnaHQ6IGF1dG87XFxuICB9XFxuICAucm93IC5jb2wubTgge1xcbiAgICB3aWR0aDogNjYuNjY2NjY2NjY2NyU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC5tOSB7XFxuICAgIHdpZHRoOiA3NSU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC5tMTAge1xcbiAgICB3aWR0aDogODMuMzMzMzMzMzMzMyU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC5tMTEge1xcbiAgICB3aWR0aDogOTEuNjY2NjY2NjY2NyU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC5tMTIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC1tMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA4LjMzMzMzMzMzMzMlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1bGwtbTEge1xcbiAgICByaWdodDogOC4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLW0xIHtcXG4gICAgbGVmdDogOC4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQtbTIge1xcbiAgICBtYXJnaW4tbGVmdDogMTYuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wucHVsbC1tMiB7XFxuICAgIHJpZ2h0OiAxNi42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLW0yIHtcXG4gICAgbGVmdDogMTYuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LW0zIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDI1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLW0zIHtcXG4gICAgcmlnaHQ6IDI1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLW0zIHtcXG4gICAgbGVmdDogMjUlO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC1tNCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAzMy4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLW00IHtcXG4gICAgcmlnaHQ6IDMzLjMzMzMzMzMzMzMlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1c2gtbTQge1xcbiAgICBsZWZ0OiAzMy4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQtbTUge1xcbiAgICBtYXJnaW4tbGVmdDogNDEuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wucHVsbC1tNSB7XFxuICAgIHJpZ2h0OiA0MS42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLW01IHtcXG4gICAgbGVmdDogNDEuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LW02IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDUwJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLW02IHtcXG4gICAgcmlnaHQ6IDUwJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLW02IHtcXG4gICAgbGVmdDogNTAlO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC1tNyB7XFxuICAgIG1hcmdpbi1sZWZ0OiA1OC4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLW03IHtcXG4gICAgcmlnaHQ6IDU4LjMzMzMzMzMzMzMlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1c2gtbTcge1xcbiAgICBsZWZ0OiA1OC4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQtbTgge1xcbiAgICBtYXJnaW4tbGVmdDogNjYuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wucHVsbC1tOCB7XFxuICAgIHJpZ2h0OiA2Ni42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLW04IHtcXG4gICAgbGVmdDogNjYuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LW05IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDc1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLW05IHtcXG4gICAgcmlnaHQ6IDc1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLW05IHtcXG4gICAgbGVmdDogNzUlO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC1tMTAge1xcbiAgICBtYXJnaW4tbGVmdDogODMuMzMzMzMzMzMzMyU7XFxuICB9XFxuICAucm93IC5jb2wucHVsbC1tMTAge1xcbiAgICByaWdodDogODMuMzMzMzMzMzMzMyU7XFxuICB9XFxuICAucm93IC5jb2wucHVzaC1tMTAge1xcbiAgICBsZWZ0OiA4My4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQtbTExIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDkxLjY2NjY2NjY2NjclO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1bGwtbTExIHtcXG4gICAgcmlnaHQ6IDkxLjY2NjY2NjY2NjclO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1c2gtbTExIHtcXG4gICAgbGVmdDogOTEuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LW0xMiB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxMDAlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1bGwtbTEyIHtcXG4gICAgcmlnaHQ6IDEwMCU7XFxuICB9XFxuICAucm93IC5jb2wucHVzaC1tMTIge1xcbiAgICBsZWZ0OiAxMDAlO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDk5M3B4KSB7XFxuICAucm93IC5jb2wubDEge1xcbiAgICB3aWR0aDogOC4zMzMzMzMzMzMzJTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLmwyIHtcXG4gICAgd2lkdGg6IDE2LjY2NjY2NjY2NjclO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbGVmdDogYXV0bztcXG4gICAgcmlnaHQ6IGF1dG87XFxuICB9XFxuICAucm93IC5jb2wubDMge1xcbiAgICB3aWR0aDogMjUlO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbGVmdDogYXV0bztcXG4gICAgcmlnaHQ6IGF1dG87XFxuICB9XFxuICAucm93IC5jb2wubDQge1xcbiAgICB3aWR0aDogMzMuMzMzMzMzMzMzMyU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC5sNSB7XFxuICAgIHdpZHRoOiA0MS42NjY2NjY2NjY3JTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLmw2IHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLmw3IHtcXG4gICAgd2lkdGg6IDU4LjMzMzMzMzMzMzMlO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbGVmdDogYXV0bztcXG4gICAgcmlnaHQ6IGF1dG87XFxuICB9XFxuICAucm93IC5jb2wubDgge1xcbiAgICB3aWR0aDogNjYuNjY2NjY2NjY2NyU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC5sOSB7XFxuICAgIHdpZHRoOiA3NSU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC5sMTAge1xcbiAgICB3aWR0aDogODMuMzMzMzMzMzMzMyU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC5sMTEge1xcbiAgICB3aWR0aDogOTEuNjY2NjY2NjY2NyU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC5sMTIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC1sMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA4LjMzMzMzMzMzMzMlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1bGwtbDEge1xcbiAgICByaWdodDogOC4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLWwxIHtcXG4gICAgbGVmdDogOC4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQtbDIge1xcbiAgICBtYXJnaW4tbGVmdDogMTYuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wucHVsbC1sMiB7XFxuICAgIHJpZ2h0OiAxNi42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLWwyIHtcXG4gICAgbGVmdDogMTYuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LWwzIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDI1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLWwzIHtcXG4gICAgcmlnaHQ6IDI1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLWwzIHtcXG4gICAgbGVmdDogMjUlO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC1sNCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAzMy4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLWw0IHtcXG4gICAgcmlnaHQ6IDMzLjMzMzMzMzMzMzMlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1c2gtbDQge1xcbiAgICBsZWZ0OiAzMy4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQtbDUge1xcbiAgICBtYXJnaW4tbGVmdDogNDEuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wucHVsbC1sNSB7XFxuICAgIHJpZ2h0OiA0MS42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLWw1IHtcXG4gICAgbGVmdDogNDEuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LWw2IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDUwJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLWw2IHtcXG4gICAgcmlnaHQ6IDUwJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLWw2IHtcXG4gICAgbGVmdDogNTAlO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC1sNyB7XFxuICAgIG1hcmdpbi1sZWZ0OiA1OC4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLWw3IHtcXG4gICAgcmlnaHQ6IDU4LjMzMzMzMzMzMzMlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1c2gtbDcge1xcbiAgICBsZWZ0OiA1OC4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQtbDgge1xcbiAgICBtYXJnaW4tbGVmdDogNjYuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wucHVsbC1sOCB7XFxuICAgIHJpZ2h0OiA2Ni42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLWw4IHtcXG4gICAgbGVmdDogNjYuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LWw5IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDc1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLWw5IHtcXG4gICAgcmlnaHQ6IDc1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLWw5IHtcXG4gICAgbGVmdDogNzUlO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC1sMTAge1xcbiAgICBtYXJnaW4tbGVmdDogODMuMzMzMzMzMzMzMyU7XFxuICB9XFxuICAucm93IC5jb2wucHVsbC1sMTAge1xcbiAgICByaWdodDogODMuMzMzMzMzMzMzMyU7XFxuICB9XFxuICAucm93IC5jb2wucHVzaC1sMTAge1xcbiAgICBsZWZ0OiA4My4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQtbDExIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDkxLjY2NjY2NjY2NjclO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1bGwtbDExIHtcXG4gICAgcmlnaHQ6IDkxLjY2NjY2NjY2NjclO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1c2gtbDExIHtcXG4gICAgbGVmdDogOTEuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LWwxMiB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxMDAlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1bGwtbDEyIHtcXG4gICAgcmlnaHQ6IDEwMCU7XFxuICB9XFxuICAucm93IC5jb2wucHVzaC1sMTIge1xcbiAgICBsZWZ0OiAxMDAlO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEyMDFweCkge1xcbiAgLnJvdyAuY29sLnhsMSB7XFxuICAgIHdpZHRoOiA4LjMzMzMzMzMzMzMlO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbGVmdDogYXV0bztcXG4gICAgcmlnaHQ6IGF1dG87XFxuICB9XFxuICAucm93IC5jb2wueGwyIHtcXG4gICAgd2lkdGg6IDE2LjY2NjY2NjY2NjclO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbGVmdDogYXV0bztcXG4gICAgcmlnaHQ6IGF1dG87XFxuICB9XFxuICAucm93IC5jb2wueGwzIHtcXG4gICAgd2lkdGg6IDI1JTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLnhsNCB7XFxuICAgIHdpZHRoOiAzMy4zMzMzMzMzMzMzJTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLnhsNSB7XFxuICAgIHdpZHRoOiA0MS42NjY2NjY2NjY3JTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLnhsNiB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC54bDcge1xcbiAgICB3aWR0aDogNTguMzMzMzMzMzMzMyU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC54bDgge1xcbiAgICB3aWR0aDogNjYuNjY2NjY2NjY2NyU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC54bDkge1xcbiAgICB3aWR0aDogNzUlO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbGVmdDogYXV0bztcXG4gICAgcmlnaHQ6IGF1dG87XFxuICB9XFxuICAucm93IC5jb2wueGwxMCB7XFxuICAgIHdpZHRoOiA4My4zMzMzMzMzMzMzJTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgLnJvdyAuY29sLnhsMTEge1xcbiAgICB3aWR0aDogOTEuNjY2NjY2NjY2NyU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC54bDEyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQteGwxIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDguMzMzMzMzMzMzMyU7XFxuICB9XFxuICAucm93IC5jb2wucHVsbC14bDEge1xcbiAgICByaWdodDogOC4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLXhsMSB7XFxuICAgIGxlZnQ6IDguMzMzMzMzMzMzMyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LXhsMiB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxNi42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLXhsMiB7XFxuICAgIHJpZ2h0OiAxNi42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLXhsMiB7XFxuICAgIGxlZnQ6IDE2LjY2NjY2NjY2NjclO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC14bDMge1xcbiAgICBtYXJnaW4tbGVmdDogMjUlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1bGwteGwzIHtcXG4gICAgcmlnaHQ6IDI1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLXhsMyB7XFxuICAgIGxlZnQ6IDI1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQteGw0IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDMzLjMzMzMzMzMzMzMlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1bGwteGw0IHtcXG4gICAgcmlnaHQ6IDMzLjMzMzMzMzMzMzMlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1c2gteGw0IHtcXG4gICAgbGVmdDogMzMuMzMzMzMzMzMzMyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LXhsNSB7XFxuICAgIG1hcmdpbi1sZWZ0OiA0MS42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLXhsNSB7XFxuICAgIHJpZ2h0OiA0MS42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLXhsNSB7XFxuICAgIGxlZnQ6IDQxLjY2NjY2NjY2NjclO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC14bDYge1xcbiAgICBtYXJnaW4tbGVmdDogNTAlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1bGwteGw2IHtcXG4gICAgcmlnaHQ6IDUwJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLXhsNiB7XFxuICAgIGxlZnQ6IDUwJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQteGw3IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDU4LjMzMzMzMzMzMzMlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1bGwteGw3IHtcXG4gICAgcmlnaHQ6IDU4LjMzMzMzMzMzMzMlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1c2gteGw3IHtcXG4gICAgbGVmdDogNTguMzMzMzMzMzMzMyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LXhsOCB7XFxuICAgIG1hcmdpbi1sZWZ0OiA2Ni42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLXhsOCB7XFxuICAgIHJpZ2h0OiA2Ni42NjY2NjY2NjY3JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLXhsOCB7XFxuICAgIGxlZnQ6IDY2LjY2NjY2NjY2NjclO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC14bDkge1xcbiAgICBtYXJnaW4tbGVmdDogNzUlO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1bGwteGw5IHtcXG4gICAgcmlnaHQ6IDc1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdXNoLXhsOSB7XFxuICAgIGxlZnQ6IDc1JTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5vZmZzZXQteGwxMCB7XFxuICAgIG1hcmdpbi1sZWZ0OiA4My4zMzMzMzMzMzMzJTtcXG4gIH1cXG4gIC5yb3cgLmNvbC5wdWxsLXhsMTAge1xcbiAgICByaWdodDogODMuMzMzMzMzMzMzMyU7XFxuICB9XFxuICAucm93IC5jb2wucHVzaC14bDEwIHtcXG4gICAgbGVmdDogODMuMzMzMzMzMzMzMyU7XFxuICB9XFxuICAucm93IC5jb2wub2Zmc2V0LXhsMTEge1xcbiAgICBtYXJnaW4tbGVmdDogOTEuNjY2NjY2NjY2NyU7XFxuICB9XFxuICAucm93IC5jb2wucHVsbC14bDExIHtcXG4gICAgcmlnaHQ6IDkxLjY2NjY2NjY2NjclO1xcbiAgfVxcbiAgLnJvdyAuY29sLnB1c2gteGwxMSB7XFxuICAgIGxlZnQ6IDkxLjY2NjY2NjY2NjclO1xcbiAgfVxcbiAgLnJvdyAuY29sLm9mZnNldC14bDEyIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDEwMCU7XFxuICB9XFxuICAucm93IC5jb2wucHVsbC14bDEyIHtcXG4gICAgcmlnaHQ6IDEwMCU7XFxuICB9XFxuICAucm93IC5jb2wucHVzaC14bDEyIHtcXG4gICAgbGVmdDogMTAwJTtcXG4gIH1cXG59XFxubmF2IHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlNmU3MztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA1NnB4O1xcbiAgbGluZS1oZWlnaHQ6IDU2cHg7XFxufVxcbm5hdi5uYXYtZXh0ZW5kZWQge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5uYXYubmF2LWV4dGVuZGVkIC5uYXYtd3JhcHBlciB7XFxuICBtaW4taGVpZ2h0OiA1NnB4O1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5uYXYubmF2LWV4dGVuZGVkIC5uYXYtY29udGVudCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbn1cXG5uYXYgYSB7XFxuICBjb2xvcjogI2ZmZjtcXG59XFxubmF2IGksXFxubmF2IFtjbGFzc149XFxcIm1kaS1cXFwiXSwgbmF2IFtjbGFzcyo9XFxcIm1kaS1cXFwiXSxcXG5uYXYgaS5tYXRlcmlhbC1pY29ucyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGhlaWdodDogNTZweDtcXG4gIGxpbmUtaGVpZ2h0OiA1NnB4O1xcbn1cXG5uYXYgLm5hdi13cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA5OTNweCkge1xcbiAgbmF2IGEuc2lkZW5hdi10cmlnZ2VyIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxubmF2IC5zaWRlbmF2LXRyaWdnZXIge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB6LWluZGV4OiAxO1xcbiAgaGVpZ2h0OiA1NnB4O1xcbiAgbWFyZ2luOiAwIDE4cHg7XFxufVxcbm5hdiAuc2lkZW5hdi10cmlnZ2VyIGkge1xcbiAgaGVpZ2h0OiA1NnB4O1xcbiAgbGluZS1oZWlnaHQ6IDU2cHg7XFxufVxcbm5hdiAuYnJhbmQtbG9nbyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogMi4xcmVtO1xcbiAgcGFkZGluZzogMDtcXG59XFxubmF2IC5icmFuZC1sb2dvLmNlbnRlciB7XFxuICBsZWZ0OiA1MCU7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSB7XFxuICBuYXYgLmJyYW5kLWxvZ28ge1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG4gIH1cXG4gIG5hdiAuYnJhbmQtbG9nby5sZWZ0LCBuYXYgLmJyYW5kLWxvZ28ucmlnaHQge1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogbm9uZTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XFxuICB9XFxuICBuYXYgLmJyYW5kLWxvZ28ubGVmdCB7XFxuICAgIGxlZnQ6IDAuNXJlbTtcXG4gIH1cXG4gIG5hdiAuYnJhbmQtbG9nby5yaWdodCB7XFxuICAgIHJpZ2h0OiAwLjVyZW07XFxuICAgIGxlZnQ6IGF1dG87XFxuICB9XFxufVxcbm5hdiAuYnJhbmQtbG9nby5yaWdodCB7XFxuICByaWdodDogMC41cmVtO1xcbiAgcGFkZGluZzogMDtcXG59XFxubmF2IC5icmFuZC1sb2dvIGksXFxubmF2IC5icmFuZC1sb2dvIFtjbGFzc149XFxcIm1kaS1cXFwiXSwgbmF2IC5icmFuZC1sb2dvIFtjbGFzcyo9XFxcIm1kaS1cXFwiXSxcXG5uYXYgLmJyYW5kLWxvZ28gaS5tYXRlcmlhbC1pY29ucyB7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbi1yaWdodDogMTVweDtcXG59XFxubmF2IC5uYXYtdGl0bGUge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1zaXplOiAzMnB4O1xcbiAgcGFkZGluZzogMjhweCAwO1xcbn1cXG5uYXYgdWwge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5uYXYgdWwgbGkge1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4zcztcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjNzO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5uYXYgdWwgbGkuYWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxubmF2IHVsIGEge1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4zcztcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjNzO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgY29sb3I6ICNmZmY7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IDAgMTVweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxubmF2IHVsIGEuYnRuLCBuYXYgdWwgYS5idG4tbGFyZ2UsIG5hdiB1bCBhLmJ0bi1zbWFsbCwgbmF2IHVsIGEuYnRuLWxhcmdlLCBuYXYgdWwgYS5idG4tZmxhdCwgbmF2IHVsIGEuYnRuLWZsb2F0aW5nIHtcXG4gIG1hcmdpbi10b3A6IC0ycHg7XFxuICBtYXJnaW4tbGVmdDogMTVweDtcXG4gIG1hcmdpbi1yaWdodDogMTVweDtcXG59XFxubmF2IHVsIGEuYnRuID4gLm1hdGVyaWFsLWljb25zLCBuYXYgdWwgYS5idG4tbGFyZ2UgPiAubWF0ZXJpYWwtaWNvbnMsIG5hdiB1bCBhLmJ0bi1zbWFsbCA+IC5tYXRlcmlhbC1pY29ucywgbmF2IHVsIGEuYnRuLWxhcmdlID4gLm1hdGVyaWFsLWljb25zLCBuYXYgdWwgYS5idG4tZmxhdCA+IC5tYXRlcmlhbC1pY29ucywgbmF2IHVsIGEuYnRuLWZsb2F0aW5nID4gLm1hdGVyaWFsLWljb25zIHtcXG4gIGhlaWdodDogaW5oZXJpdDtcXG4gIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcbn1cXG5uYXYgdWwgYTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XFxufVxcbm5hdiB1bC5sZWZ0IHtcXG4gIGZsb2F0OiBsZWZ0O1xcbn1cXG5uYXYgZm9ybSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcbm5hdiAuaW5wdXQtZmllbGQge1xcbiAgbWFyZ2luOiAwO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5uYXYgLmlucHV0LWZpZWxkIGlucHV0IHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZy1sZWZ0OiAycmVtO1xcbn1cXG5uYXYgLmlucHV0LWZpZWxkIGlucHV0OmZvY3VzLCBuYXYgLmlucHV0LWZpZWxkIGlucHV0W3R5cGU9dGV4dF06dmFsaWQsIG5hdiAuaW5wdXQtZmllbGQgaW5wdXRbdHlwZT1wYXNzd29yZF06dmFsaWQsIG5hdiAuaW5wdXQtZmllbGQgaW5wdXRbdHlwZT1lbWFpbF06dmFsaWQsIG5hdiAuaW5wdXQtZmllbGQgaW5wdXRbdHlwZT11cmxdOnZhbGlkLCBuYXYgLmlucHV0LWZpZWxkIGlucHV0W3R5cGU9ZGF0ZV06dmFsaWQge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xcbiAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xcbn1cXG5uYXYgLmlucHV0LWZpZWxkIGxhYmVsIHtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxufVxcbm5hdiAuaW5wdXQtZmllbGQgbGFiZWwgaSB7XFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBjb2xvciAuM3M7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAuM3M7XFxufVxcbm5hdiAuaW5wdXQtZmllbGQgbGFiZWwuYWN0aXZlIGkge1xcbiAgY29sb3I6ICNmZmY7XFxufVxcbi5uYXZiYXItZml4ZWQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiA1NnB4O1xcbiAgei1pbmRleDogOTk3O1xcbn1cXG4ubmF2YmFyLWZpeGVkIG5hdiB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjAxcHgpIHtcXG4gIG5hdi5uYXYtZXh0ZW5kZWQgLm5hdi13cmFwcGVyIHtcXG4gICAgbWluLWhlaWdodDogNjRweDtcXG4gIH1cXG4gIG5hdiwgbmF2IC5uYXYtd3JhcHBlciBpLCBuYXYgYS5zaWRlbmF2LXRyaWdnZXIsIG5hdiBhLnNpZGVuYXYtdHJpZ2dlciBpIHtcXG4gICAgaGVpZ2h0OiA2NHB4O1xcbiAgICBsaW5lLWhlaWdodDogNjRweDtcXG4gIH1cXG4gIC5uYXZiYXItZml4ZWQge1xcbiAgICBoZWlnaHQ6IDY0cHg7XFxuICB9XFxufVxcbmEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5odG1sIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcXFwiU2Vnb2UgVUlcXFwiLCBSb2JvdG8sIE94eWdlbi1TYW5zLCBVYnVudHUsIENhbnRhcmVsbCwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg3KTtcXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAwKSB7XFxuICBodG1sIHtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDk5MnB4KSB7XFxuICBodG1sIHtcXG4gICAgZm9udC1zaXplOiAxNC41cHg7XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTIwMHB4KSB7XFxuICBodG1sIHtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgfVxcbn1cXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2IHtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsaW5lLWhlaWdodDogMS4zO1xcbn1cXG5oMSBhLCBoMiBhLCBoMyBhLCBoNCBhLCBoNSBhLCBoNiBhIHtcXG4gIGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xcbn1cXG5oMSB7XFxuICBmb250LXNpemU6IDQuMnJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAxMTAlO1xcbiAgbWFyZ2luOiAyLjhyZW0gMCAxLjY4cmVtIDA7XFxufVxcbmgyIHtcXG4gIGZvbnQtc2l6ZTogMy41NnJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAxMTAlO1xcbiAgbWFyZ2luOiAyLjM3MzMzMzMzMzNyZW0gMCAxLjQyNHJlbSAwO1xcbn1cXG5oMyB7XFxuICBmb250LXNpemU6IDIuOTJyZW07XFxuICBsaW5lLWhlaWdodDogMTEwJTtcXG4gIG1hcmdpbjogMS45NDY2NjY2NjY3cmVtIDAgMS4xNjhyZW0gMDtcXG59XFxuaDQge1xcbiAgZm9udC1zaXplOiAyLjI4cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDExMCU7XFxuICBtYXJnaW46IDEuNTJyZW0gMCAwLjkxMnJlbSAwO1xcbn1cXG5oNSB7XFxuICBmb250LXNpemU6IDEuNjRyZW07XFxuICBsaW5lLWhlaWdodDogMTEwJTtcXG4gIG1hcmdpbjogMS4wOTMzMzMzMzMzcmVtIDAgMC42NTZyZW0gMDtcXG59XFxuaDYge1xcbiAgZm9udC1zaXplOiAxLjE1cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDExMCU7XFxuICBtYXJnaW46IDAuNzY2NjY2NjY2N3JlbSAwIDAuNDZyZW0gMDtcXG59XFxuZW0ge1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA3NSU7XFxufVxcbi5saWdodCB7XFxuICBmb250LXdlaWdodDogMzAwO1xcbn1cXG4udGhpbiB7XFxuICBmb250LXdlaWdodDogMjAwO1xcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDM2MHB4KSB7XFxuICAuZmxvdy10ZXh0IHtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzkwcHgpIHtcXG4gIC5mbG93LXRleHQge1xcbiAgICBmb250LXNpemU6IDEuMjI0cmVtO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQyMHB4KSB7XFxuICAuZmxvdy10ZXh0IHtcXG4gICAgZm9udC1zaXplOiAxLjI0OHJlbTtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0NTBweCkge1xcbiAgLmZsb3ctdGV4dCB7XFxuICAgIGZvbnQtc2l6ZTogMS4yNzJyZW07XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDgwcHgpIHtcXG4gIC5mbG93LXRleHQge1xcbiAgICBmb250LXNpemU6IDEuMjk2cmVtO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDUxMHB4KSB7XFxuICAuZmxvdy10ZXh0IHtcXG4gICAgZm9udC1zaXplOiAxLjMycmVtO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDU0MHB4KSB7XFxuICAuZmxvdy10ZXh0IHtcXG4gICAgZm9udC1zaXplOiAxLjM0NHJlbTtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA1NzBweCkge1xcbiAgLmZsb3ctdGV4dCB7XFxuICAgIGZvbnQtc2l6ZTogMS4zNjhyZW07XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjAwcHgpIHtcXG4gIC5mbG93LXRleHQge1xcbiAgICBmb250LXNpemU6IDEuMzkycmVtO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYzMHB4KSB7XFxuICAuZmxvdy10ZXh0IHtcXG4gICAgZm9udC1zaXplOiAxLjQxNnJlbTtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NjBweCkge1xcbiAgLmZsb3ctdGV4dCB7XFxuICAgIGZvbnQtc2l6ZTogMS40NHJlbTtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2OTBweCkge1xcbiAgLmZsb3ctdGV4dCB7XFxuICAgIGZvbnQtc2l6ZTogMS40NjRyZW07XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzIwcHgpIHtcXG4gIC5mbG93LXRleHQge1xcbiAgICBmb250LXNpemU6IDEuNDg4cmVtO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc1MHB4KSB7XFxuICAuZmxvdy10ZXh0IHtcXG4gICAgZm9udC1zaXplOiAxLjUxMnJlbTtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3ODBweCkge1xcbiAgLmZsb3ctdGV4dCB7XFxuICAgIGZvbnQtc2l6ZTogMS41MzZyZW07XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogODEwcHgpIHtcXG4gIC5mbG93LXRleHQge1xcbiAgICBmb250LXNpemU6IDEuNTZyZW07XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogODQwcHgpIHtcXG4gIC5mbG93LXRleHQge1xcbiAgICBmb250LXNpemU6IDEuNTg0cmVtO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDg3MHB4KSB7XFxuICAuZmxvdy10ZXh0IHtcXG4gICAgZm9udC1zaXplOiAxLjYwOHJlbTtcXG4gIH1cXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA5MDBweCkge1xcbiAgLmZsb3ctdGV4dCB7XFxuICAgIGZvbnQtc2l6ZTogMS42MzJyZW07XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogOTMwcHgpIHtcXG4gIC5mbG93LXRleHQge1xcbiAgICBmb250LXNpemU6IDEuNjU2cmVtO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDk2MHB4KSB7XFxuICAuZmxvdy10ZXh0IHtcXG4gICAgZm9udC1zaXplOiAxLjY4cmVtO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM2MHB4KSB7XFxuICAuZmxvdy10ZXh0IHtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICB9XFxufVxcbi5zY2FsZS10cmFuc2l0aW9uIHtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC41MywgMC4wMSwgMC4zNiwgMS42MykgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIDAuM3MgY3ViaWMtYmV6aWVyKDAuNTMsIDAuMDEsIDAuMzYsIDEuNjMpICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC41MywgMC4wMSwgMC4zNiwgMS42MykgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjUzLCAwLjAxLCAwLjM2LCAxLjYzKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC41MywgMC4wMSwgMC4zNiwgMS42MykgIWltcG9ydGFudDtcXG59XFxuLnNjYWxlLXRyYW5zaXRpb24uc2NhbGUtb3V0IHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gLjJzICFpbXBvcnRhbnQ7XFxuICB0cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAuMnMgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuMnMgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuMnMsIC13ZWJraXQtdHJhbnNmb3JtIC4ycyAhaW1wb3J0YW50O1xcbn1cXG4uc2NhbGUtdHJhbnNpdGlvbi5zY2FsZS1pbiB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxufVxcbi5jYXJkLXBhbmVsIHtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC1ib3gtc2hhZG93IC4yNXM7XFxuICB0cmFuc2l0aW9uOiAtd2Via2l0LWJveC1zaGFkb3cgLjI1cztcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjI1cztcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjI1cywgLXdlYmtpdC1ib3gtc2hhZG93IC4yNXM7XFxuICBwYWRkaW5nOiAyNHB4O1xcbiAgbWFyZ2luOiAwLjVyZW0gMCAxcmVtIDA7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4uY2FyZCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXJnaW46IDAuNXJlbSAwIDFyZW0gMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtYm94LXNoYWRvdyAuMjVzO1xcbiAgdHJhbnNpdGlvbjogLXdlYmtpdC1ib3gtc2hhZG93IC4yNXM7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IC4yNXM7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IC4yNXMsIC13ZWJraXQtYm94LXNoYWRvdyAuMjVzO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG4uY2FyZCAuY2FyZC10aXRsZSB7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBmb250LXdlaWdodDogMzAwO1xcbn1cXG4uY2FyZCAuY2FyZC10aXRsZS5hY3RpdmF0b3Ige1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uY2FyZC5zbWFsbCwgLmNhcmQubWVkaXVtLCAuY2FyZC5sYXJnZSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5jYXJkLnNtYWxsIC5jYXJkLWltYWdlLCAuY2FyZC5tZWRpdW0gLmNhcmQtaW1hZ2UsIC5jYXJkLmxhcmdlIC5jYXJkLWltYWdlIHtcXG4gIG1heC1oZWlnaHQ6IDYwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5jYXJkLnNtYWxsIC5jYXJkLWltYWdlICsgLmNhcmQtY29udGVudCwgLmNhcmQubWVkaXVtIC5jYXJkLWltYWdlICsgLmNhcmQtY29udGVudCwgLmNhcmQubGFyZ2UgLmNhcmQtaW1hZ2UgKyAuY2FyZC1jb250ZW50IHtcXG4gIG1heC1oZWlnaHQ6IDQwJTtcXG59XFxuLmNhcmQuc21hbGwgLmNhcmQtY29udGVudCwgLmNhcmQubWVkaXVtIC5jYXJkLWNvbnRlbnQsIC5jYXJkLmxhcmdlIC5jYXJkLWNvbnRlbnQge1xcbiAgbWF4LWhlaWdodDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5jYXJkLnNtYWxsIC5jYXJkLWFjdGlvbiwgLmNhcmQubWVkaXVtIC5jYXJkLWFjdGlvbiwgLmNhcmQubGFyZ2UgLmNhcmQtYWN0aW9uIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG59XFxuLmNhcmQuc21hbGwge1xcbiAgaGVpZ2h0OiAzMDBweDtcXG59XFxuLmNhcmQubWVkaXVtIHtcXG4gIGhlaWdodDogNDAwcHg7XFxufVxcbi5jYXJkLmxhcmdlIHtcXG4gIGhlaWdodDogNTAwcHg7XFxufVxcbi5jYXJkLmhvcml6b250YWwge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5jYXJkLmhvcml6b250YWwuc21hbGwgLmNhcmQtaW1hZ2UsIC5jYXJkLmhvcml6b250YWwubWVkaXVtIC5jYXJkLWltYWdlLCAuY2FyZC5ob3Jpem9udGFsLmxhcmdlIC5jYXJkLWltYWdlIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1heC1oZWlnaHQ6IG5vbmU7XFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuLmNhcmQuaG9yaXpvbnRhbC5zbWFsbCAuY2FyZC1pbWFnZSBpbWcsIC5jYXJkLmhvcml6b250YWwubWVkaXVtIC5jYXJkLWltYWdlIGltZywgLmNhcmQuaG9yaXpvbnRhbC5sYXJnZSAuY2FyZC1pbWFnZSBpbWcge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4uY2FyZC5ob3Jpem9udGFsIC5jYXJkLWltYWdlIHtcXG4gIG1heC13aWR0aDogNTAlO1xcbn1cXG4uY2FyZC5ob3Jpem9udGFsIC5jYXJkLWltYWdlIGltZyB7XFxuICBib3JkZXItcmFkaXVzOiAycHggMCAwIDJweDtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIHdpZHRoOiBhdXRvO1xcbn1cXG4uY2FyZC5ob3Jpem9udGFsIC5jYXJkLXN0YWNrZWQge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICBmbGV4OiAxO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uY2FyZC5ob3Jpem9udGFsIC5jYXJkLXN0YWNrZWQgLmNhcmQtY29udGVudCB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgICAgIC1tcy1mbGV4LXBvc2l0aXZlOiAxO1xcbiAgICAgICAgICBmbGV4LWdyb3c6IDE7XFxufVxcbi5jYXJkLnN0aWNreS1hY3Rpb24gLmNhcmQtYWN0aW9uIHtcXG4gIHotaW5kZXg6IDI7XFxufVxcbi5jYXJkLnN0aWNreS1hY3Rpb24gLmNhcmQtcmV2ZWFsIHtcXG4gIHotaW5kZXg6IDE7XFxuICBwYWRkaW5nLWJvdHRvbTogNjRweDtcXG59XFxuLmNhcmQgLmNhcmQtaW1hZ2Uge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uY2FyZCAuY2FyZC1pbWFnZSBpbWcge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBib3JkZXItcmFkaXVzOiAycHggMnB4IDAgMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4uY2FyZCAuY2FyZC1pbWFnZSAuY2FyZC10aXRsZSB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAyNHB4O1xcbn1cXG4uY2FyZCAuY2FyZC1jb250ZW50IHtcXG4gIHBhZGRpbmc6IDI0cHg7XFxuICBib3JkZXItcmFkaXVzOiAwIDAgMnB4IDJweDtcXG59XFxuLmNhcmQgLmNhcmQtY29udGVudCBwIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuLmNhcmQgLmNhcmQtY29udGVudCAuY2FyZC10aXRsZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGxpbmUtaGVpZ2h0OiAzMnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcbn1cXG4uY2FyZCAuY2FyZC1jb250ZW50IC5jYXJkLXRpdGxlIGkge1xcbiAgbGluZS1oZWlnaHQ6IDMycHg7XFxufVxcbi5jYXJkIC5jYXJkLWFjdGlvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMTYwLCAxNjAsIDE2MCwgMC4yKTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmc6IDE2cHggMjRweDtcXG59XFxuLmNhcmQgLmNhcmQtYWN0aW9uOmxhc3QtY2hpbGQge1xcbiAgYm9yZGVyLXJhZGl1czogMCAwIDJweCAycHg7XFxufVxcbi5jYXJkIC5jYXJkLWFjdGlvbiBhOm5vdCguYnRuKTpub3QoLmJ0bi1sYXJnZSk6bm90KC5idG4tc21hbGwpOm5vdCguYnRuLWxhcmdlKTpub3QoLmJ0bi1mbG9hdGluZykge1xcbiAgY29sb3I6ICNmZmFiNDA7XFxuICBtYXJnaW4tcmlnaHQ6IDI0cHg7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGNvbG9yIC4zcyBlYXNlO1xcbiAgdHJhbnNpdGlvbjogY29sb3IgLjNzIGVhc2U7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbn1cXG4uY2FyZCAuY2FyZC1hY3Rpb24gYTpub3QoLmJ0bik6bm90KC5idG4tbGFyZ2UpOm5vdCguYnRuLXNtYWxsKTpub3QoLmJ0bi1sYXJnZSk6bm90KC5idG4tZmxvYXRpbmcpOmhvdmVyIHtcXG4gIGNvbG9yOiAjZmZkOGE2O1xcbn1cXG4uY2FyZCAuY2FyZC1yZXZlYWwge1xcbiAgcGFkZGluZzogMjRweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB3aWR0aDogMTAwJTtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgei1pbmRleDogMztcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5jYXJkIC5jYXJkLXJldmVhbCAuY2FyZC10aXRsZSB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuI3RvYXN0LWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDEwMDAwO1xcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAjdG9hc3QtY29udGFpbmVyIHtcXG4gICAgbWluLXdpZHRoOiAxMDAlO1xcbiAgICBib3R0b206IDAlO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMXB4KSBhbmQgKG1heC13aWR0aDogOTkycHgpIHtcXG4gICN0b2FzdC1jb250YWluZXIge1xcbiAgICBsZWZ0OiA1JTtcXG4gICAgYm90dG9tOiA3JTtcXG4gICAgbWF4LXdpZHRoOiA5MCU7XFxuICB9XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogOTkzcHgpIHtcXG4gICN0b2FzdC1jb250YWluZXIge1xcbiAgICB0b3A6IDEwJTtcXG4gICAgcmlnaHQ6IDclO1xcbiAgICBtYXgtd2lkdGg6IDg2JTtcXG4gIH1cXG59XFxuLnRvYXN0IHtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIHRvcDogMzVweDtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIGhlaWdodDogYXV0bztcXG4gIG1pbi1oZWlnaHQ6IDQ4cHg7XFxuICBsaW5lLWhlaWdodDogMS41ZW07XFxuICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzIzMjMyO1xcbiAgcGFkZGluZzogMTBweCAyNXB4O1xcbiAgZm9udC1zaXplOiAxLjFyZW07XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgY29sb3I6ICNmZmY7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG4udG9hc3QgLnRvYXN0LWFjdGlvbiB7XFxuICBjb2xvcjogI2VlZmY0MTtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBtYXJnaW4tcmlnaHQ6IC0yNXB4O1xcbiAgbWFyZ2luLWxlZnQ6IDNyZW07XFxufVxcbi50b2FzdC5yb3VuZGVkIHtcXG4gIGJvcmRlci1yYWRpdXM6IDI0cHg7XFxufVxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC50b2FzdCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbiAgfVxcbn1cXG4udGFicyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBvdmVyZmxvdy14OiBhdXRvO1xcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xcbiAgaGVpZ2h0OiA0OHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG4udGFicy50YWJzLXRyYW5zcGFyZW50IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4udGFicy50YWJzLXRyYW5zcGFyZW50IC50YWIgYSxcXG4udGFicy50YWJzLXRyYW5zcGFyZW50IC50YWIuZGlzYWJsZWQgYSxcXG4udGFicy50YWJzLXRyYW5zcGFyZW50IC50YWIuZGlzYWJsZWQgYTpob3ZlciB7XFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbn1cXG4udGFicy50YWJzLXRyYW5zcGFyZW50IC50YWIgYTpob3ZlcixcXG4udGFicy50YWJzLXRyYW5zcGFyZW50IC50YWIgYS5hY3RpdmUge1xcbiAgY29sb3I6ICNmZmY7XFxufVxcbi50YWJzLnRhYnMtdHJhbnNwYXJlbnQgLmluZGljYXRvciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4udGFicy50YWJzLWZpeGVkLXdpZHRoIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG4udGFicy50YWJzLWZpeGVkLXdpZHRoIC50YWIge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAtbXMtZmxleC1wb3NpdGl2ZTogMTtcXG4gICAgICAgICAgZmxleC1ncm93OiAxO1xcbn1cXG4udGFicyAudGFiIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGxpbmUtaGVpZ2h0OiA0OHB4O1xcbiAgaGVpZ2h0OiA0OHB4O1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcbi50YWJzIC50YWIgYSB7XFxuICBjb2xvcjogcmdiYSgyMzgsIDExMCwgMTE1LCAwLjcpO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBhZGRpbmc6IDAgMjRweDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogY29sb3IgLjI4cyBlYXNlLCBiYWNrZ3JvdW5kLWNvbG9yIC4yOHMgZWFzZTtcXG4gIHRyYW5zaXRpb246IGNvbG9yIC4yOHMgZWFzZSwgYmFja2dyb3VuZC1jb2xvciAuMjhzIGVhc2U7XFxufVxcbi50YWJzIC50YWIgYTpmb2N1cywgLnRhYnMgLnRhYiBhOmZvY3VzLmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NiwgMTc4LCAxODEsIDAuMik7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG4udGFicyAudGFiIGE6aG92ZXIsIC50YWJzIC50YWIgYS5hY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogI2VlNmU3MztcXG59XFxuLnRhYnMgLnRhYi5kaXNhYmxlZCBhLFxcbi50YWJzIC50YWIuZGlzYWJsZWQgYTpob3ZlciB7XFxuICBjb2xvcjogcmdiYSgyMzgsIDExMCwgMTE1LCAwLjQpO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG4udGFicyAuaW5kaWNhdG9yIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogMDtcXG4gIGhlaWdodDogMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y2YjJiNTtcXG4gIHdpbGwtY2hhbmdlOiBsZWZ0LCByaWdodDtcXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkge1xcbiAgLnRhYnMge1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICB9XFxuICAudGFicyAudGFiIHtcXG4gICAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAgIC1tcy1mbGV4LXBvc2l0aXZlOiAxO1xcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcXG4gIH1cXG4gIC50YWJzIC50YWIgYSB7XFxuICAgIHBhZGRpbmc6IDAgMTJweDtcXG4gIH1cXG59XFxuLm1hdGVyaWFsLXRvb2x0aXAge1xcbiAgcGFkZGluZzogMTBweCA4cHg7XFxuICBmb250LXNpemU6IDFyZW07XFxuICB6LWluZGV4OiAyMDAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBjb2xvcjogI2ZmZjtcXG4gIG1pbi1oZWlnaHQ6IDM2cHg7XFxuICBsaW5lLWhlaWdodDogMTIwJTtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDRweCk7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMyMzIzMjtcXG59XFxuLmJhY2tkcm9wIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG9wYWNpdHk6IDA7XFxuICBoZWlnaHQ6IDdweDtcXG4gIHdpZHRoOiAxNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMCAwIDUwJSA1MCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzIzMjMyO1xcbiAgei1pbmRleDogLTE7XFxuICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSAwJTtcXG4gICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogNTAlIDAlO1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG4uYnRuLCAuYnRuLWxhcmdlLCAuYnRuLXNtYWxsLFxcbi5idG4tZmxhdCB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBoZWlnaHQ6IDM2cHg7XFxuICBsaW5lLWhlaWdodDogMzZweDtcXG4gIHBhZGRpbmc6IDAgMTZweDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLmJ0bi5kaXNhYmxlZCwgLmRpc2FibGVkLmJ0bi1sYXJnZSwgLmRpc2FibGVkLmJ0bi1zbWFsbCxcXG4uYnRuLWZsb2F0aW5nLmRpc2FibGVkLFxcbi5idG4tbGFyZ2UuZGlzYWJsZWQsXFxuLmJ0bi1zbWFsbC5kaXNhYmxlZCxcXG4uYnRuLWZsYXQuZGlzYWJsZWQsXFxuLmJ0bjpkaXNhYmxlZCxcXG4uYnRuLWxhcmdlOmRpc2FibGVkLFxcbi5idG4tc21hbGw6ZGlzYWJsZWQsXFxuLmJ0bi1mbG9hdGluZzpkaXNhYmxlZCxcXG4uYnRuLWxhcmdlOmRpc2FibGVkLFxcbi5idG4tc21hbGw6ZGlzYWJsZWQsXFxuLmJ0bi1mbGF0OmRpc2FibGVkLFxcbi5idG5bZGlzYWJsZWRdLFxcbltkaXNhYmxlZF0uYnRuLWxhcmdlLFxcbltkaXNhYmxlZF0uYnRuLXNtYWxsLFxcbi5idG4tZmxvYXRpbmdbZGlzYWJsZWRdLFxcbi5idG4tbGFyZ2VbZGlzYWJsZWRdLFxcbi5idG4tc21hbGxbZGlzYWJsZWRdLFxcbi5idG4tZmxhdFtkaXNhYmxlZF0ge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREZERkRGICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XFxuICBjb2xvcjogIzlGOUY5RiAhaW1wb3J0YW50O1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG4uYnRuLmRpc2FibGVkOmhvdmVyLCAuZGlzYWJsZWQuYnRuLWxhcmdlOmhvdmVyLCAuZGlzYWJsZWQuYnRuLXNtYWxsOmhvdmVyLFxcbi5idG4tZmxvYXRpbmcuZGlzYWJsZWQ6aG92ZXIsXFxuLmJ0bi1sYXJnZS5kaXNhYmxlZDpob3ZlcixcXG4uYnRuLXNtYWxsLmRpc2FibGVkOmhvdmVyLFxcbi5idG4tZmxhdC5kaXNhYmxlZDpob3ZlcixcXG4uYnRuOmRpc2FibGVkOmhvdmVyLFxcbi5idG4tbGFyZ2U6ZGlzYWJsZWQ6aG92ZXIsXFxuLmJ0bi1zbWFsbDpkaXNhYmxlZDpob3ZlcixcXG4uYnRuLWZsb2F0aW5nOmRpc2FibGVkOmhvdmVyLFxcbi5idG4tbGFyZ2U6ZGlzYWJsZWQ6aG92ZXIsXFxuLmJ0bi1zbWFsbDpkaXNhYmxlZDpob3ZlcixcXG4uYnRuLWZsYXQ6ZGlzYWJsZWQ6aG92ZXIsXFxuLmJ0bltkaXNhYmxlZF06aG92ZXIsXFxuW2Rpc2FibGVkXS5idG4tbGFyZ2U6aG92ZXIsXFxuW2Rpc2FibGVkXS5idG4tc21hbGw6aG92ZXIsXFxuLmJ0bi1mbG9hdGluZ1tkaXNhYmxlZF06aG92ZXIsXFxuLmJ0bi1sYXJnZVtkaXNhYmxlZF06aG92ZXIsXFxuLmJ0bi1zbWFsbFtkaXNhYmxlZF06aG92ZXIsXFxuLmJ0bi1mbGF0W2Rpc2FibGVkXTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREZERkRGICFpbXBvcnRhbnQ7XFxuICBjb2xvcjogIzlGOUY5RiAhaW1wb3J0YW50O1xcbn1cXG4uYnRuLCAuYnRuLWxhcmdlLCAuYnRuLXNtYWxsLFxcbi5idG4tZmxvYXRpbmcsXFxuLmJ0bi1sYXJnZSxcXG4uYnRuLXNtYWxsLFxcbi5idG4tZmxhdCB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBvdXRsaW5lOiAwO1xcbn1cXG4uYnRuIGksIC5idG4tbGFyZ2UgaSwgLmJ0bi1zbWFsbCBpLFxcbi5idG4tZmxvYXRpbmcgaSxcXG4uYnRuLWxhcmdlIGksXFxuLmJ0bi1zbWFsbCBpLFxcbi5idG4tZmxhdCBpIHtcXG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XFxufVxcbi5idG46Zm9jdXMsIC5idG4tbGFyZ2U6Zm9jdXMsIC5idG4tc21hbGw6Zm9jdXMsXFxuLmJ0bi1mbG9hdGluZzpmb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWQ3ZDc0O1xcbn1cXG4uYnRuLCAuYnRuLWxhcmdlLCAuYnRuLXNtYWxsIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGxldHRlci1zcGFjaW5nOiAuNXB4O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4ycyBlYXNlLW91dDtcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjJzIGVhc2Utb3V0O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uYnRuOmhvdmVyLCAuYnRuLWxhcmdlOmhvdmVyLCAuYnRuLXNtYWxsOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyYmJiYWQ7XFxufVxcbi5idG4tZmxvYXRpbmcge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgY29sb3I6ICNmZmY7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgei1pbmRleDogMTtcXG4gIHdpZHRoOiA0MHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgbGluZS1oZWlnaHQ6IDQwcHg7XFxuICBwYWRkaW5nOiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuM3M7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4zcztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcbi5idG4tZmxvYXRpbmc6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcXG59XFxuLmJ0bi1mbG9hdGluZzpiZWZvcmUge1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG59XFxuLmJ0bi1mbG9hdGluZy5idG4tbGFyZ2Uge1xcbiAgd2lkdGg6IDU2cHg7XFxuICBoZWlnaHQ6IDU2cHg7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG4uYnRuLWZsb2F0aW5nLmJ0bi1sYXJnZS5oYWxmd2F5LWZhYiB7XFxuICBib3R0b206IC0yOHB4O1xcbn1cXG4uYnRuLWZsb2F0aW5nLmJ0bi1sYXJnZSBpIHtcXG4gIGxpbmUtaGVpZ2h0OiA1NnB4O1xcbn1cXG4uYnRuLWZsb2F0aW5nLmJ0bi1zbWFsbCB7XFxuICB3aWR0aDogMzIuNHB4O1xcbiAgaGVpZ2h0OiAzMi40cHg7XFxufVxcbi5idG4tZmxvYXRpbmcuYnRuLXNtYWxsLmhhbGZ3YXktZmFiIHtcXG4gIGJvdHRvbTogLTE2LjJweDtcXG59XFxuLmJ0bi1mbG9hdGluZy5idG4tc21hbGwgaSB7XFxuICBsaW5lLWhlaWdodDogMzIuNHB4O1xcbn1cXG4uYnRuLWZsb2F0aW5nLmhhbGZ3YXktZmFiIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAyNHB4O1xcbiAgYm90dG9tOiAtMjBweDtcXG59XFxuLmJ0bi1mbG9hdGluZy5oYWxmd2F5LWZhYi5sZWZ0IHtcXG4gIHJpZ2h0OiBhdXRvO1xcbiAgbGVmdDogMjRweDtcXG59XFxuLmJ0bi1mbG9hdGluZyBpIHtcXG4gIHdpZHRoOiBpbmhlcml0O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICNmZmY7XFxuICBmb250LXNpemU6IDEuNnJlbTtcXG4gIGxpbmUtaGVpZ2h0OiA0MHB4O1xcbn1cXG5idXR0b24uYnRuLWZsb2F0aW5nIHtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgcmlnaHQ6IDIzcHg7XFxuICBib3R0b206IDIzcHg7XFxuICBwYWRkaW5nLXRvcDogMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IDA7XFxuICB6LWluZGV4OiA5OTc7XFxufVxcbi5maXhlZC1hY3Rpb24tYnRuLmFjdGl2ZSB1bCB7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG4uZml4ZWQtYWN0aW9uLWJ0bi5kaXJlY3Rpb24tbGVmdCwgLmZpeGVkLWFjdGlvbi1idG4uZGlyZWN0aW9uLXJpZ2h0IHtcXG4gIHBhZGRpbmc6IDAgMCAwIDE1cHg7XFxufVxcbi5maXhlZC1hY3Rpb24tYnRuLmRpcmVjdGlvbi1sZWZ0IHVsLCAuZml4ZWQtYWN0aW9uLWJ0bi5kaXJlY3Rpb24tcmlnaHQgdWwge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICByaWdodDogNjRweDtcXG4gIHRvcDogNTAlO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGxlZnQ6IGF1dG87XFxuICAvKndpZHRoIDEwMCUgb25seSBnb2VzIHRvIHdpZHRoIG9mIGJ1dHRvbiBjb250YWluZXIgKi9cXG4gIHdpZHRoOiA1MDBweDtcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4uZGlyZWN0aW9uLWxlZnQgdWwgbGksIC5maXhlZC1hY3Rpb24tYnRuLmRpcmVjdGlvbi1yaWdodCB1bCBsaSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW46IDcuNXB4IDE1cHggMCAwO1xcbn1cXG4uZml4ZWQtYWN0aW9uLWJ0bi5kaXJlY3Rpb24tcmlnaHQge1xcbiAgcGFkZGluZzogMCAxNXB4IDAgMDtcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4uZGlyZWN0aW9uLXJpZ2h0IHVsIHtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBkaXJlY3Rpb246IHJ0bDtcXG4gIGxlZnQ6IDY0cHg7XFxuICByaWdodDogYXV0bztcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4uZGlyZWN0aW9uLXJpZ2h0IHVsIGxpIHtcXG4gIG1hcmdpbjogNy41cHggMCAwIDE1cHg7XFxufVxcbi5maXhlZC1hY3Rpb24tYnRuLmRpcmVjdGlvbi1ib3R0b20ge1xcbiAgcGFkZGluZzogMCAwIDE1cHggMDtcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4uZGlyZWN0aW9uLWJvdHRvbSB1bCB7XFxuICB0b3A6IDY0cHg7XFxuICBib3R0b206IGF1dG87XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IHJldmVyc2U7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xcbn1cXG4uZml4ZWQtYWN0aW9uLWJ0bi5kaXJlY3Rpb24tYm90dG9tIHVsIGxpIHtcXG4gIG1hcmdpbjogMTVweCAwIDAgMDtcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4udG9vbGJhciB7XFxuICBwYWRkaW5nOiAwO1xcbiAgaGVpZ2h0OiA1NnB4O1xcbn1cXG4uZml4ZWQtYWN0aW9uLWJ0bi50b29sYmFyLmFjdGl2ZSA+IGEgaSB7XFxuICBvcGFjaXR5OiAwO1xcbn1cXG4uZml4ZWQtYWN0aW9uLWJ0bi50b29sYmFyIHVsIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgei1pbmRleDogMTtcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4udG9vbGJhciB1bCBsaSB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICBmbGV4OiAxO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luOiAwO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBub25lO1xcbiAgdHJhbnNpdGlvbjogbm9uZTtcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4udG9vbGJhciB1bCBsaSBhIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGxpbmUtaGVpZ2h0OiA1NnB4O1xcbiAgei1pbmRleDogMTtcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4udG9vbGJhciB1bCBsaSBhIGkge1xcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XFxufVxcbi5maXhlZC1hY3Rpb24tYnRuIHVsIHtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogNjRweDtcXG4gIG1hcmdpbjogMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4gdWwgbGkge1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4gdWwgYS5idG4tZmxvYXRpbmcge1xcbiAgb3BhY2l0eTogMDtcXG59XFxuLmZpeGVkLWFjdGlvbi1idG4gLmZhYi1iYWNrZHJvcCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogLTE7XFxuICB3aWR0aDogNDBweDtcXG4gIGhlaWdodDogNDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNmE2OWE7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxufVxcbi5idG4tZmxhdCB7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjMzQzNDM0O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4ycztcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjJzO1xcbn1cXG4uYnRuLWZsYXQ6Zm9jdXMsIC5idG4tZmxhdDpob3ZlciB7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcbi5idG4tZmxhdDpmb2N1cyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XFxufVxcbi5idG4tZmxhdC5kaXNhYmxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xcbiAgY29sb3I6ICNiM2IyYjIgIWltcG9ydGFudDtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuLmJ0bi1sYXJnZSB7XFxuICBoZWlnaHQ6IDU0cHg7XFxuICBsaW5lLWhlaWdodDogNTRweDtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIHBhZGRpbmc6IDAgMjhweDtcXG59XFxuLmJ0bi1sYXJnZSBpIHtcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcbn1cXG4uYnRuLXNtYWxsIHtcXG4gIGhlaWdodDogMzIuNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDMyLjRweDtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG59XFxuLmJ0bi1zbWFsbCBpIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbn1cXG4uYnRuLWJsb2NrIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uZHJvcGRvd24tY29udGVudCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgbWFyZ2luOiAwO1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIG1pbi13aWR0aDogMTAwcHg7XFxuICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgb3BhY2l0eTogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICB6LWluZGV4OiA5OTk5O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XFxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcXG59XFxuLmRyb3Bkb3duLWNvbnRlbnQ6Zm9jdXMge1xcbiAgb3V0bGluZTogMDtcXG59XFxuLmRyb3Bkb3duLWNvbnRlbnQgbGkge1xcbiAgY2xlYXI6IGJvdGg7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg3KTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IDUwcHg7XFxuICBsaW5lLWhlaWdodDogMS41cmVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG4uZHJvcGRvd24tY29udGVudCBsaTpob3ZlciwgLmRyb3Bkb3duLWNvbnRlbnQgbGkuYWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XFxufVxcbi5kcm9wZG93bi1jb250ZW50IGxpOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGFkYWRhO1xcbn1cXG4uZHJvcGRvd24tY29udGVudCBsaS5kaXZpZGVyIHtcXG4gIG1pbi1oZWlnaHQ6IDA7XFxuICBoZWlnaHQ6IDFweDtcXG59XFxuLmRyb3Bkb3duLWNvbnRlbnQgbGkgPiBhLCAuZHJvcGRvd24tY29udGVudCBsaSA+IHNwYW4ge1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgY29sb3I6ICMyNmE2OWE7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGxpbmUtaGVpZ2h0OiAyMnB4O1xcbiAgcGFkZGluZzogMTRweCAxNnB4O1xcbn1cXG4uZHJvcGRvd24tY29udGVudCBsaSA+IHNwYW4gPiBsYWJlbCB7XFxuICB0b3A6IDFweDtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IDE4cHg7XFxufVxcbi5kcm9wZG93bi1jb250ZW50IGxpID4gYSA+IGkge1xcbiAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbjogMCAyNHB4IDAgMDtcXG4gIHdpZHRoOiAyNHB4O1xcbn1cXG4uaW5wdXQtZmllbGQuY29sIC5kcm9wZG93bi1jb250ZW50IFt0eXBlPVxcXCJjaGVja2JveFxcXCJdICsgbGFiZWwge1xcbiAgdG9wOiAxcHg7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IG5vbmU7XFxuICAgICAgICAgIHRyYW5zZm9ybTogbm9uZTtcXG59XFxuLyohXFxuICogV2F2ZXMgdjAuNi4wXFxuICogaHR0cDovL2ZpYW4ubXkuaWQvV2F2ZXNcXG4gKlxcbiAqIENvcHlyaWdodCAyMDE0IEFsZmlhbmEgRS4gU2lidWVhIGFuZCBvdGhlciBjb250cmlidXRvcnNcXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmlhbnMvV2F2ZXMvYmxvYi9tYXN0ZXIvTElDRU5TRVxcbiAqL1xcbi53YXZlcy1lZmZlY3Qge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIHotaW5kZXg6IDE7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC4zcyBlYXNlLW91dDtcXG4gIHRyYW5zaXRpb246IC4zcyBlYXNlLW91dDtcXG59XFxuLndhdmVzLWVmZmVjdCAud2F2ZXMtcmlwcGxlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgbWFyZ2luLXRvcDogLTEwcHg7XFxuICBtYXJnaW4tbGVmdDogLTEwcHg7XFxuICBvcGFjaXR5OiAwO1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC43cyBlYXNlLW91dDtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjdzIGVhc2Utb3V0O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5OiBvcGFjaXR5LCAtd2Via2l0LXRyYW5zZm9ybTtcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IG9wYWNpdHksIC13ZWJraXQtdHJhbnNmb3JtO1xcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtLCBvcGFjaXR5O1xcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtLCBvcGFjaXR5LCAtd2Via2l0LXRyYW5zZm9ybTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG4ud2F2ZXMtZWZmZWN0LndhdmVzLWxpZ2h0IC53YXZlcy1yaXBwbGUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQ1KTtcXG59XFxuLndhdmVzLWVmZmVjdC53YXZlcy1yZWQgLndhdmVzLXJpcHBsZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NCwgNjcsIDU0LCAwLjcpO1xcbn1cXG4ud2F2ZXMtZWZmZWN0LndhdmVzLXllbGxvdyAud2F2ZXMtcmlwcGxlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyMzUsIDU5LCAwLjcpO1xcbn1cXG4ud2F2ZXMtZWZmZWN0LndhdmVzLW9yYW5nZSAud2F2ZXMtcmlwcGxlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAxNTIsIDAsIDAuNyk7XFxufVxcbi53YXZlcy1lZmZlY3Qud2F2ZXMtcHVycGxlIC53YXZlcy1yaXBwbGUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNTYsIDM5LCAxNzYsIDAuNyk7XFxufVxcbi53YXZlcy1lZmZlY3Qud2F2ZXMtZ3JlZW4gLndhdmVzLXJpcHBsZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDc2LCAxNzUsIDgwLCAwLjcpO1xcbn1cXG4ud2F2ZXMtZWZmZWN0LndhdmVzLXRlYWwgLndhdmVzLXJpcHBsZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDE1MCwgMTM2LCAwLjcpO1xcbn1cXG4ud2F2ZXMtZWZmZWN0IGlucHV0W3R5cGU9XFxcImJ1dHRvblxcXCJdLCAud2F2ZXMtZWZmZWN0IGlucHV0W3R5cGU9XFxcInJlc2V0XFxcIl0sIC53YXZlcy1lZmZlY3QgaW5wdXRbdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgYm9yZGVyOiAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiBpbmhlcml0O1xcbiAgdGV4dC10cmFuc2Zvcm06IGluaGVyaXQ7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbn1cXG4ud2F2ZXMtZWZmZWN0IGltZyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB6LWluZGV4OiAtMTtcXG59XFxuLndhdmVzLW5vdHJhbnNpdGlvbiB7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG5vbmUgIWltcG9ydGFudDtcXG4gIHRyYW5zaXRpb246IG5vbmUgIWltcG9ydGFudDtcXG59XFxuLndhdmVzLWNpcmNsZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLXdlYmtpdC1tYXNrLWltYWdlOiAtd2Via2l0LXJhZGlhbC1ncmFkaWVudChjaXJjbGUsIHdoaXRlIDEwMCUsIGJsYWNrIDEwMCUpO1xcbn1cXG4ud2F2ZXMtaW5wdXQtd3JhcHBlciB7XFxuICBib3JkZXItcmFkaXVzOiAwLjJlbTtcXG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207XFxufVxcbi53YXZlcy1pbnB1dC13cmFwcGVyIC53YXZlcy1idXR0b24taW5wdXQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi53YXZlcy1jaXJjbGUge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2lkdGg6IDIuNWVtO1xcbiAgaGVpZ2h0OiAyLjVlbTtcXG4gIGxpbmUtaGVpZ2h0OiAyLjVlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIC13ZWJraXQtbWFzay1pbWFnZTogbm9uZTtcXG59XFxuLndhdmVzLWJsb2NrIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4vKiBGaXJlZm94IEJ1ZzogbGluayBub3QgdHJpZ2dlcmVkICovXFxuLndhdmVzLWVmZmVjdCAud2F2ZXMtcmlwcGxlIHtcXG4gIHotaW5kZXg6IC0xO1xcbn1cXG4ubW9kYWwge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWF4LWhlaWdodDogNzAlO1xcbiAgd2lkdGg6IDU1JTtcXG4gIG1hcmdpbjogYXV0bztcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICB3aWxsLWNoYW5nZTogdG9wLCBvcGFjaXR5O1xcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSB7XFxuICAubW9kYWwge1xcbiAgICB3aWR0aDogODAlO1xcbiAgfVxcbn1cXG4ubW9kYWwgaDEsIC5tb2RhbCBoMiwgLm1vZGFsIGgzLCAubW9kYWwgaDQge1xcbiAgbWFyZ2luLXRvcDogMDtcXG59XFxuLm1vZGFsIC5tb2RhbC1jb250ZW50IHtcXG4gIHBhZGRpbmc6IDI0cHg7XFxufVxcbi5tb2RhbCAubW9kYWwtY2xvc2Uge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4ubW9kYWwgLm1vZGFsLWZvb3RlciB7XFxuICBib3JkZXItcmFkaXVzOiAwIDAgMnB4IDJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XFxuICBwYWRkaW5nOiA0cHggNnB4O1xcbiAgaGVpZ2h0OiA1NnB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuLm1vZGFsIC5tb2RhbC1mb290ZXIgLmJ0biwgLm1vZGFsIC5tb2RhbC1mb290ZXIgLmJ0bi1sYXJnZSwgLm1vZGFsIC5tb2RhbC1mb290ZXIgLmJ0bi1zbWFsbCwgLm1vZGFsIC5tb2RhbC1mb290ZXIgLmJ0bi1mbGF0IHtcXG4gIG1hcmdpbjogNnB4IDA7XFxufVxcbi5tb2RhbC1vdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDk5OTtcXG4gIHRvcDogLTI1JTtcXG4gIGxlZnQ6IDA7XFxuICBib3R0b206IDA7XFxuICByaWdodDogMDtcXG4gIGhlaWdodDogMTI1JTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZDogIzAwMDtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB3aWxsLWNoYW5nZTogb3BhY2l0eTtcXG59XFxuLm1vZGFsLm1vZGFsLWZpeGVkLWZvb3RlciB7XFxuICBwYWRkaW5nOiAwO1xcbiAgaGVpZ2h0OiA3MCU7XFxufVxcbi5tb2RhbC5tb2RhbC1maXhlZC1mb290ZXIgLm1vZGFsLWNvbnRlbnQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA1NnB4KTtcXG4gIG1heC1oZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxufVxcbi5tb2RhbC5tb2RhbC1maXhlZC1mb290ZXIgLm1vZGFsLWZvb3RlciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbn1cXG4ubW9kYWwuYm90dG9tLXNoZWV0IHtcXG4gIHRvcDogYXV0bztcXG4gIGJvdHRvbTogLTEwMCU7XFxuICBtYXJnaW46IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC1oZWlnaHQ6IDQ1JTtcXG4gIGJvcmRlci1yYWRpdXM6IDA7XFxuICB3aWxsLWNoYW5nZTogYm90dG9tLCBvcGFjaXR5O1xcbn1cXG4uY29sbGFwc2libGUge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XFxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZGRkO1xcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZGRkO1xcbiAgbWFyZ2luOiAwLjVyZW0gMCAxcmVtIDA7XFxufVxcbi5jb2xsYXBzaWJsZS1oZWFkZXIge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XFxufVxcbi5jb2xsYXBzaWJsZS1oZWFkZXIgaSB7XFxuICB3aWR0aDogMnJlbTtcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xcbn1cXG4uY29sbGFwc2libGUtYm9keSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAycmVtO1xcbn1cXG4uc2lkZW5hdiAuY29sbGFwc2libGUsXFxuLnNpZGVuYXYuZml4ZWQgLmNvbGxhcHNpYmxlIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcXG59XFxuLnNpZGVuYXYgLmNvbGxhcHNpYmxlIGxpLFxcbi5zaWRlbmF2LmZpeGVkIC5jb2xsYXBzaWJsZSBsaSB7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG4uc2lkZW5hdiAuY29sbGFwc2libGUtaGVhZGVyLFxcbi5zaWRlbmF2LmZpeGVkIC5jb2xsYXBzaWJsZS1oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXI6IG5vbmU7XFxuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG4gIGhlaWdodDogaW5oZXJpdDtcXG4gIHBhZGRpbmc6IDAgMTZweDtcXG59XFxuLnNpZGVuYXYgLmNvbGxhcHNpYmxlLWhlYWRlcjpob3ZlcixcXG4uc2lkZW5hdi5maXhlZCAuY29sbGFwc2libGUtaGVhZGVyOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wNSk7XFxufVxcbi5zaWRlbmF2IC5jb2xsYXBzaWJsZS1oZWFkZXIgaSxcXG4uc2lkZW5hdi5maXhlZCAuY29sbGFwc2libGUtaGVhZGVyIGkge1xcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XFxufVxcbi5zaWRlbmF2IC5jb2xsYXBzaWJsZS1ib2R5LFxcbi5zaWRlbmF2LmZpeGVkIC5jb2xsYXBzaWJsZS1ib2R5IHtcXG4gIGJvcmRlcjogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxufVxcbi5zaWRlbmF2IC5jb2xsYXBzaWJsZS1ib2R5IGxpIGEsXFxuLnNpZGVuYXYuZml4ZWQgLmNvbGxhcHNpYmxlLWJvZHkgbGkgYSB7XFxuICBwYWRkaW5nOiAwIDIzLjVweCAwIDMxcHg7XFxufVxcbi5jb2xsYXBzaWJsZS5wb3BvdXQge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xcbiAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xcbn1cXG4uY29sbGFwc2libGUucG9wb3V0ID4gbGkge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDJweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMTYpLCAwIDJweCAxMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogMCAycHggNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjE2KSwgMCAycHggMTBweCAwIHJnYmEoMCwgMCwgMCwgMC4xMik7XFxuICBtYXJnaW46IDAgMjRweDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogbWFyZ2luIDAuMzVzIGN1YmljLWJlemllcigwLjI1LCAwLjQ2LCAwLjQ1LCAwLjk0KTtcXG4gIHRyYW5zaXRpb246IG1hcmdpbiAwLjM1cyBjdWJpYy1iZXppZXIoMC4yNSwgMC40NiwgMC40NSwgMC45NCk7XFxufVxcbi5jb2xsYXBzaWJsZS5wb3BvdXQgPiBsaS5hY3RpdmUge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDVweCAxMXB4IDAgcmdiYSgwLCAwLCAwLCAwLjE4KSwgMCA0cHggMTVweCAwIHJnYmEoMCwgMCwgMCwgMC4xNSk7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgNXB4IDExcHggMCByZ2JhKDAsIDAsIDAsIDAuMTgpLCAwIDRweCAxNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjE1KTtcXG4gIG1hcmdpbjogMTZweCAwO1xcbn1cXG4uY2hpcCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBoZWlnaHQ6IDMycHg7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gIGxpbmUtaGVpZ2h0OiAzMnB4O1xcbiAgcGFkZGluZzogMCAxMnB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNGU0ZTQ7XFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDVweDtcXG59XFxuLmNoaXA6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNmE2OWE7XFxuICBjb2xvcjogI2ZmZjtcXG59XFxuLmNoaXAgPiBpbWcge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW46IDAgOHB4IDAgLTEycHg7XFxuICBoZWlnaHQ6IDMycHg7XFxuICB3aWR0aDogMzJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLmNoaXAgLmNsb3NlIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZsb2F0OiByaWdodDtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGxpbmUtaGVpZ2h0OiAzMnB4O1xcbiAgcGFkZGluZy1sZWZ0OiA4cHg7XFxufVxcbi5jaGlwcyB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzllOWU5ZTtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcXG4gIG1hcmdpbjogMCAwIDhweCAwO1xcbiAgbWluLWhlaWdodDogNDVweDtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAuM3M7XFxuICB0cmFuc2l0aW9uOiBhbGwgLjNzO1xcbn1cXG4uY2hpcHMuZm9jdXMge1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMyNmE2OWE7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMXB4IDAgMCAjMjZhNjlhO1xcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDFweCAwIDAgIzI2YTY5YTtcXG59XFxuLmNoaXBzOmhvdmVyIHtcXG4gIGN1cnNvcjogdGV4dDtcXG59XFxuLmNoaXBzIC5pbnB1dCB7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgYm9yZGVyOiAwO1xcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGhlaWdodDogM3JlbTtcXG4gIGxpbmUtaGVpZ2h0OiAzMnB4O1xcbiAgb3V0bGluZTogMDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcXG4gIHdpZHRoOiAxMjBweCAhaW1wb3J0YW50O1xcbn1cXG4uY2hpcHMgLmlucHV0OmZvY3VzIHtcXG4gIGJvcmRlcjogMCAhaW1wb3J0YW50O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuLmNoaXBzIC5hdXRvY29tcGxldGUtY29udGVudCB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMDtcXG59XFxuLnByZWZpeCB+IC5jaGlwcyB7XFxuICBtYXJnaW4tbGVmdDogM3JlbTtcXG4gIHdpZHRoOiA5MiU7XFxuICB3aWR0aDogY2FsYygxMDAlIC0gM3JlbSk7XFxufVxcbi5jaGlwczplbXB0eSB+IGxhYmVsIHtcXG4gIGZvbnQtc2l6ZTogMC44cmVtO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE0MCUpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE0MCUpO1xcbn1cXG4ubWF0ZXJpYWxib3hlZCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGN1cnNvcjogLXdlYmtpdC16b29tLWluO1xcbiAgY3Vyc29yOiB6b29tLWluO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IC40cztcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjRzO1xcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcbi5tYXRlcmlhbGJveGVkOmhvdmVyOm5vdCguYWN0aXZlKSB7XFxuICBvcGFjaXR5OiAuODtcXG59XFxuLm1hdGVyaWFsYm94ZWQuYWN0aXZlIHtcXG4gIGN1cnNvcjogLXdlYmtpdC16b29tLW91dDtcXG4gIGN1cnNvcjogem9vbS1vdXQ7XFxufVxcbiNtYXRlcmlhbGJveC1vdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOTI5Mjk7XFxuICB6LWluZGV4OiAxMDAwO1xcbiAgd2lsbC1jaGFuZ2U6IG9wYWNpdHk7XFxufVxcbi5tYXRlcmlhbGJveC1jYXB0aW9uIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGxpbmUtaGVpZ2h0OiA1MHB4O1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMCUgMTUlO1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgei1pbmRleDogMTAwMDtcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbn1cXG5zZWxlY3Q6Zm9jdXMge1xcbiAgb3V0bGluZTogMXB4IHNvbGlkICNjOWYzZWY7XFxufVxcbmJ1dHRvbjpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJhYjdhOTtcXG59XFxubGFiZWwge1xcbiAgZm9udC1zaXplOiAwLjhyZW07XFxuICBjb2xvcjogIzllOWU5ZTtcXG59XFxuLyogVGV4dCBJbnB1dHMgKyBUZXh0YXJlYVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLyogU3R5bGUgUGxhY2Vob2xkZXJzICovXFxuOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIGNvbG9yOiAjZDFkMWQxO1xcbn1cXG46LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIGNvbG9yOiAjZDFkMWQxO1xcbn1cXG46Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2QxZDFkMTtcXG59XFxuOjpwbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2QxZDFkMTtcXG59XFxuLyogVGV4dCBpbnB1dHMgKi9cXG5pbnB1dDpub3QoW3R5cGVdKSxcXG5pbnB1dFt0eXBlPXRleHRdOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPXBhc3N3b3JkXTpub3QoLmJyb3dzZXItZGVmYXVsdCksXFxuaW5wdXRbdHlwZT1lbWFpbF06bm90KC5icm93c2VyLWRlZmF1bHQpLFxcbmlucHV0W3R5cGU9dXJsXTpub3QoLmJyb3dzZXItZGVmYXVsdCksXFxuaW5wdXRbdHlwZT10aW1lXTpub3QoLmJyb3dzZXItZGVmYXVsdCksXFxuaW5wdXRbdHlwZT1kYXRlXTpub3QoLmJyb3dzZXItZGVmYXVsdCksXFxuaW5wdXRbdHlwZT1kYXRldGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWUtbG9jYWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPXRlbF06bm90KC5icm93c2VyLWRlZmF1bHQpLFxcbmlucHV0W3R5cGU9bnVtYmVyXTpub3QoLmJyb3dzZXItZGVmYXVsdCksXFxuaW5wdXRbdHlwZT1zZWFyY2hdOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG50ZXh0YXJlYS5tYXRlcmlhbGl6ZS10ZXh0YXJlYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjOWU5ZTllO1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBoZWlnaHQ6IDNyZW07XFxuICB3aWR0aDogMTAwJTtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIG1hcmdpbjogMCAwIDhweCAwO1xcbiAgcGFkZGluZzogMDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcXG4gIC13ZWJraXQtYm94LXNpemluZzogY29udGVudC1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBib3JkZXIgLjNzLCAtd2Via2l0LWJveC1zaGFkb3cgLjNzO1xcbiAgdHJhbnNpdGlvbjogYm9yZGVyIC4zcywgLXdlYmtpdC1ib3gtc2hhZG93IC4zcztcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjNzLCBib3JkZXIgLjNzO1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAuM3MsIGJvcmRlciAuM3MsIC13ZWJraXQtYm94LXNoYWRvdyAuM3M7XFxufVxcbmlucHV0Om5vdChbdHlwZV0pOmRpc2FibGVkLCBpbnB1dDpub3QoW3R5cGVdKVtyZWFkb25seT1cXFwicmVhZG9ubHlcXFwiXSxcXG5pbnB1dFt0eXBlPXRleHRdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpkaXNhYmxlZCxcXG5pbnB1dFt0eXBlPXRleHRdOm5vdCguYnJvd3Nlci1kZWZhdWx0KVtyZWFkb25seT1cXFwicmVhZG9ubHlcXFwiXSxcXG5pbnB1dFt0eXBlPXBhc3N3b3JkXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6ZGlzYWJsZWQsXFxuaW5wdXRbdHlwZT1wYXNzd29yZF06bm90KC5icm93c2VyLWRlZmF1bHQpW3JlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJdLFxcbmlucHV0W3R5cGU9ZW1haWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpkaXNhYmxlZCxcXG5pbnB1dFt0eXBlPWVtYWlsXTpub3QoLmJyb3dzZXItZGVmYXVsdClbcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIl0sXFxuaW5wdXRbdHlwZT11cmxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpkaXNhYmxlZCxcXG5pbnB1dFt0eXBlPXVybF06bm90KC5icm93c2VyLWRlZmF1bHQpW3JlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJdLFxcbmlucHV0W3R5cGU9dGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpOmRpc2FibGVkLFxcbmlucHV0W3R5cGU9dGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpW3JlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJdLFxcbmlucHV0W3R5cGU9ZGF0ZV06bm90KC5icm93c2VyLWRlZmF1bHQpOmRpc2FibGVkLFxcbmlucHV0W3R5cGU9ZGF0ZV06bm90KC5icm93c2VyLWRlZmF1bHQpW3JlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJdLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpkaXNhYmxlZCxcXG5pbnB1dFt0eXBlPWRhdGV0aW1lXTpub3QoLmJyb3dzZXItZGVmYXVsdClbcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIl0sXFxuaW5wdXRbdHlwZT1kYXRldGltZS1sb2NhbF06bm90KC5icm93c2VyLWRlZmF1bHQpOmRpc2FibGVkLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWUtbG9jYWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KVtyZWFkb25seT1cXFwicmVhZG9ubHlcXFwiXSxcXG5pbnB1dFt0eXBlPXRlbF06bm90KC5icm93c2VyLWRlZmF1bHQpOmRpc2FibGVkLFxcbmlucHV0W3R5cGU9dGVsXTpub3QoLmJyb3dzZXItZGVmYXVsdClbcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIl0sXFxuaW5wdXRbdHlwZT1udW1iZXJdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpkaXNhYmxlZCxcXG5pbnB1dFt0eXBlPW51bWJlcl06bm90KC5icm93c2VyLWRlZmF1bHQpW3JlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJdLFxcbmlucHV0W3R5cGU9c2VhcmNoXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6ZGlzYWJsZWQsXFxuaW5wdXRbdHlwZT1zZWFyY2hdOm5vdCguYnJvd3Nlci1kZWZhdWx0KVtyZWFkb25seT1cXFwicmVhZG9ubHlcXFwiXSxcXG50ZXh0YXJlYS5tYXRlcmlhbGl6ZS10ZXh0YXJlYTpkaXNhYmxlZCxcXG50ZXh0YXJlYS5tYXRlcmlhbGl6ZS10ZXh0YXJlYVtyZWFkb25seT1cXFwicmVhZG9ubHlcXFwiXSB7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQyKTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBkb3R0ZWQgcmdiYSgwLCAwLCAwLCAwLjQyKTtcXG59XFxuaW5wdXQ6bm90KFt0eXBlXSk6ZGlzYWJsZWQgKyBsYWJlbCxcXG5pbnB1dDpub3QoW3R5cGVdKVtyZWFkb25seT1cXFwicmVhZG9ubHlcXFwiXSArIGxhYmVsLFxcbmlucHV0W3R5cGU9dGV4dF06bm90KC5icm93c2VyLWRlZmF1bHQpOmRpc2FibGVkICsgbGFiZWwsXFxuaW5wdXRbdHlwZT10ZXh0XTpub3QoLmJyb3dzZXItZGVmYXVsdClbcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIl0gKyBsYWJlbCxcXG5pbnB1dFt0eXBlPXBhc3N3b3JkXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6ZGlzYWJsZWQgKyBsYWJlbCxcXG5pbnB1dFt0eXBlPXBhc3N3b3JkXTpub3QoLmJyb3dzZXItZGVmYXVsdClbcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIl0gKyBsYWJlbCxcXG5pbnB1dFt0eXBlPWVtYWlsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6ZGlzYWJsZWQgKyBsYWJlbCxcXG5pbnB1dFt0eXBlPWVtYWlsXTpub3QoLmJyb3dzZXItZGVmYXVsdClbcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIl0gKyBsYWJlbCxcXG5pbnB1dFt0eXBlPXVybF06bm90KC5icm93c2VyLWRlZmF1bHQpOmRpc2FibGVkICsgbGFiZWwsXFxuaW5wdXRbdHlwZT11cmxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KVtyZWFkb25seT1cXFwicmVhZG9ubHlcXFwiXSArIGxhYmVsLFxcbmlucHV0W3R5cGU9dGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpOmRpc2FibGVkICsgbGFiZWwsXFxuaW5wdXRbdHlwZT10aW1lXTpub3QoLmJyb3dzZXItZGVmYXVsdClbcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIl0gKyBsYWJlbCxcXG5pbnB1dFt0eXBlPWRhdGVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpkaXNhYmxlZCArIGxhYmVsLFxcbmlucHV0W3R5cGU9ZGF0ZV06bm90KC5icm93c2VyLWRlZmF1bHQpW3JlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJdICsgbGFiZWwsXFxuaW5wdXRbdHlwZT1kYXRldGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpOmRpc2FibGVkICsgbGFiZWwsXFxuaW5wdXRbdHlwZT1kYXRldGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpW3JlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJdICsgbGFiZWwsXFxuaW5wdXRbdHlwZT1kYXRldGltZS1sb2NhbF06bm90KC5icm93c2VyLWRlZmF1bHQpOmRpc2FibGVkICsgbGFiZWwsXFxuaW5wdXRbdHlwZT1kYXRldGltZS1sb2NhbF06bm90KC5icm93c2VyLWRlZmF1bHQpW3JlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJdICsgbGFiZWwsXFxuaW5wdXRbdHlwZT10ZWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpkaXNhYmxlZCArIGxhYmVsLFxcbmlucHV0W3R5cGU9dGVsXTpub3QoLmJyb3dzZXItZGVmYXVsdClbcmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcIl0gKyBsYWJlbCxcXG5pbnB1dFt0eXBlPW51bWJlcl06bm90KC5icm93c2VyLWRlZmF1bHQpOmRpc2FibGVkICsgbGFiZWwsXFxuaW5wdXRbdHlwZT1udW1iZXJdOm5vdCguYnJvd3Nlci1kZWZhdWx0KVtyZWFkb25seT1cXFwicmVhZG9ubHlcXFwiXSArIGxhYmVsLFxcbmlucHV0W3R5cGU9c2VhcmNoXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6ZGlzYWJsZWQgKyBsYWJlbCxcXG5pbnB1dFt0eXBlPXNlYXJjaF06bm90KC5icm93c2VyLWRlZmF1bHQpW3JlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJdICsgbGFiZWwsXFxudGV4dGFyZWEubWF0ZXJpYWxpemUtdGV4dGFyZWE6ZGlzYWJsZWQgKyBsYWJlbCxcXG50ZXh0YXJlYS5tYXRlcmlhbGl6ZS10ZXh0YXJlYVtyZWFkb25seT1cXFwicmVhZG9ubHlcXFwiXSArIGxhYmVsIHtcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNDIpO1xcbn1cXG5pbnB1dDpub3QoW3R5cGVdKTpmb2N1czpub3QoW3JlYWRvbmx5XSksXFxuaW5wdXRbdHlwZT10ZXh0XTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXM6bm90KFtyZWFkb25seV0pLFxcbmlucHV0W3R5cGU9cGFzc3dvcmRdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1czpub3QoW3JlYWRvbmx5XSksXFxuaW5wdXRbdHlwZT1lbWFpbF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzOm5vdChbcmVhZG9ubHldKSxcXG5pbnB1dFt0eXBlPXVybF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzOm5vdChbcmVhZG9ubHldKSxcXG5pbnB1dFt0eXBlPXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1czpub3QoW3JlYWRvbmx5XSksXFxuaW5wdXRbdHlwZT1kYXRlXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXM6bm90KFtyZWFkb25seV0pLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1czpub3QoW3JlYWRvbmx5XSksXFxuaW5wdXRbdHlwZT1kYXRldGltZS1sb2NhbF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzOm5vdChbcmVhZG9ubHldKSxcXG5pbnB1dFt0eXBlPXRlbF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzOm5vdChbcmVhZG9ubHldKSxcXG5pbnB1dFt0eXBlPW51bWJlcl06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzOm5vdChbcmVhZG9ubHldKSxcXG5pbnB1dFt0eXBlPXNlYXJjaF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzOm5vdChbcmVhZG9ubHldKSxcXG50ZXh0YXJlYS5tYXRlcmlhbGl6ZS10ZXh0YXJlYTpmb2N1czpub3QoW3JlYWRvbmx5XSkge1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMyNmE2OWE7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMXB4IDAgMCAjMjZhNjlhO1xcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDFweCAwIDAgIzI2YTY5YTtcXG59XFxuaW5wdXQ6bm90KFt0eXBlXSk6Zm9jdXM6bm90KFtyZWFkb25seV0pICsgbGFiZWwsXFxuaW5wdXRbdHlwZT10ZXh0XTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXM6bm90KFtyZWFkb25seV0pICsgbGFiZWwsXFxuaW5wdXRbdHlwZT1wYXNzd29yZF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzOm5vdChbcmVhZG9ubHldKSArIGxhYmVsLFxcbmlucHV0W3R5cGU9ZW1haWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1czpub3QoW3JlYWRvbmx5XSkgKyBsYWJlbCxcXG5pbnB1dFt0eXBlPXVybF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzOm5vdChbcmVhZG9ubHldKSArIGxhYmVsLFxcbmlucHV0W3R5cGU9dGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzOm5vdChbcmVhZG9ubHldKSArIGxhYmVsLFxcbmlucHV0W3R5cGU9ZGF0ZV06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzOm5vdChbcmVhZG9ubHldKSArIGxhYmVsLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1czpub3QoW3JlYWRvbmx5XSkgKyBsYWJlbCxcXG5pbnB1dFt0eXBlPWRhdGV0aW1lLWxvY2FsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXM6bm90KFtyZWFkb25seV0pICsgbGFiZWwsXFxuaW5wdXRbdHlwZT10ZWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1czpub3QoW3JlYWRvbmx5XSkgKyBsYWJlbCxcXG5pbnB1dFt0eXBlPW51bWJlcl06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzOm5vdChbcmVhZG9ubHldKSArIGxhYmVsLFxcbmlucHV0W3R5cGU9c2VhcmNoXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXM6bm90KFtyZWFkb25seV0pICsgbGFiZWwsXFxudGV4dGFyZWEubWF0ZXJpYWxpemUtdGV4dGFyZWE6Zm9jdXM6bm90KFtyZWFkb25seV0pICsgbGFiZWwge1xcbiAgY29sb3I6ICMyNmE2OWE7XFxufVxcbmlucHV0Om5vdChbdHlwZV0pOmZvY3VzLnZhbGlkIH4gbGFiZWwsXFxuaW5wdXRbdHlwZT10ZXh0XTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiBsYWJlbCxcXG5pbnB1dFt0eXBlPXBhc3N3b3JkXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiBsYWJlbCxcXG5pbnB1dFt0eXBlPWVtYWlsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiBsYWJlbCxcXG5pbnB1dFt0eXBlPXVybF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLnZhbGlkIH4gbGFiZWwsXFxuaW5wdXRbdHlwZT10aW1lXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiBsYWJlbCxcXG5pbnB1dFt0eXBlPWRhdGVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IGxhYmVsLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IGxhYmVsLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWUtbG9jYWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IGxhYmVsLFxcbmlucHV0W3R5cGU9dGVsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiBsYWJlbCxcXG5pbnB1dFt0eXBlPW51bWJlcl06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLnZhbGlkIH4gbGFiZWwsXFxuaW5wdXRbdHlwZT1zZWFyY2hdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IGxhYmVsLFxcbnRleHRhcmVhLm1hdGVyaWFsaXplLXRleHRhcmVhOmZvY3VzLnZhbGlkIH4gbGFiZWwge1xcbiAgY29sb3I6ICM0Q0FGNTA7XFxufVxcbmlucHV0Om5vdChbdHlwZV0pOmZvY3VzLmludmFsaWQgfiBsYWJlbCxcXG5pbnB1dFt0eXBlPXRleHRdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy5pbnZhbGlkIH4gbGFiZWwsXFxuaW5wdXRbdHlwZT1wYXNzd29yZF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLmludmFsaWQgfiBsYWJlbCxcXG5pbnB1dFt0eXBlPWVtYWlsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IGxhYmVsLFxcbmlucHV0W3R5cGU9dXJsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IGxhYmVsLFxcbmlucHV0W3R5cGU9dGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLmludmFsaWQgfiBsYWJlbCxcXG5pbnB1dFt0eXBlPWRhdGVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy5pbnZhbGlkIH4gbGFiZWwsXFxuaW5wdXRbdHlwZT1kYXRldGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLmludmFsaWQgfiBsYWJlbCxcXG5pbnB1dFt0eXBlPWRhdGV0aW1lLWxvY2FsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IGxhYmVsLFxcbmlucHV0W3R5cGU9dGVsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IGxhYmVsLFxcbmlucHV0W3R5cGU9bnVtYmVyXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IGxhYmVsLFxcbmlucHV0W3R5cGU9c2VhcmNoXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IGxhYmVsLFxcbnRleHRhcmVhLm1hdGVyaWFsaXplLXRleHRhcmVhOmZvY3VzLmludmFsaWQgfiBsYWJlbCB7XFxuICBjb2xvcjogI0Y0NDMzNjtcXG59XFxuaW5wdXQ6bm90KFt0eXBlXSkudmFsaWRhdGUgKyBsYWJlbCxcXG5pbnB1dFt0eXBlPXRleHRdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS52YWxpZGF0ZSArIGxhYmVsLFxcbmlucHV0W3R5cGU9cGFzc3dvcmRdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS52YWxpZGF0ZSArIGxhYmVsLFxcbmlucHV0W3R5cGU9ZW1haWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS52YWxpZGF0ZSArIGxhYmVsLFxcbmlucHV0W3R5cGU9dXJsXTpub3QoLmJyb3dzZXItZGVmYXVsdCkudmFsaWRhdGUgKyBsYWJlbCxcXG5pbnB1dFt0eXBlPXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS52YWxpZGF0ZSArIGxhYmVsLFxcbmlucHV0W3R5cGU9ZGF0ZV06bm90KC5icm93c2VyLWRlZmF1bHQpLnZhbGlkYXRlICsgbGFiZWwsXFxuaW5wdXRbdHlwZT1kYXRldGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpLnZhbGlkYXRlICsgbGFiZWwsXFxuaW5wdXRbdHlwZT1kYXRldGltZS1sb2NhbF06bm90KC5icm93c2VyLWRlZmF1bHQpLnZhbGlkYXRlICsgbGFiZWwsXFxuaW5wdXRbdHlwZT10ZWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS52YWxpZGF0ZSArIGxhYmVsLFxcbmlucHV0W3R5cGU9bnVtYmVyXTpub3QoLmJyb3dzZXItZGVmYXVsdCkudmFsaWRhdGUgKyBsYWJlbCxcXG5pbnB1dFt0eXBlPXNlYXJjaF06bm90KC5icm93c2VyLWRlZmF1bHQpLnZhbGlkYXRlICsgbGFiZWwsXFxudGV4dGFyZWEubWF0ZXJpYWxpemUtdGV4dGFyZWEudmFsaWRhdGUgKyBsYWJlbCB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLyogVmFsaWRhdGlvbiBTYXNzIFBsYWNlaG9sZGVycyAqL1xcbmlucHV0LnZhbGlkOm5vdChbdHlwZV0pLCBpbnB1dC52YWxpZDpub3QoW3R5cGVdKTpmb2N1cyxcXG5pbnB1dFt0eXBlPXRleHRdLnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPXRleHRdLnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cyxcXG5pbnB1dFt0eXBlPXBhc3N3b3JkXS52YWxpZDpub3QoLmJyb3dzZXItZGVmYXVsdCksXFxuaW5wdXRbdHlwZT1wYXNzd29yZF0udmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLFxcbmlucHV0W3R5cGU9ZW1haWxdLnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPWVtYWlsXS52YWxpZDpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMsXFxuaW5wdXRbdHlwZT11cmxdLnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPXVybF0udmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLFxcbmlucHV0W3R5cGU9dGltZV0udmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpLFxcbmlucHV0W3R5cGU9dGltZV0udmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLFxcbmlucHV0W3R5cGU9ZGF0ZV0udmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpLFxcbmlucHV0W3R5cGU9ZGF0ZV0udmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdLnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPWRhdGV0aW1lXS52YWxpZDpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMsXFxuaW5wdXRbdHlwZT1kYXRldGltZS1sb2NhbF0udmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWUtbG9jYWxdLnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cyxcXG5pbnB1dFt0eXBlPXRlbF0udmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpLFxcbmlucHV0W3R5cGU9dGVsXS52YWxpZDpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMsXFxuaW5wdXRbdHlwZT1udW1iZXJdLnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPW51bWJlcl0udmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLFxcbmlucHV0W3R5cGU9c2VhcmNoXS52YWxpZDpub3QoLmJyb3dzZXItZGVmYXVsdCksXFxuaW5wdXRbdHlwZT1zZWFyY2hdLnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cyxcXG50ZXh0YXJlYS5tYXRlcmlhbGl6ZS10ZXh0YXJlYS52YWxpZCxcXG50ZXh0YXJlYS5tYXRlcmlhbGl6ZS10ZXh0YXJlYS52YWxpZDpmb2N1cywgLnNlbGVjdC13cmFwcGVyLnZhbGlkID4gaW5wdXQuc2VsZWN0LWRyb3Bkb3duIHtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNENBRjUwO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDFweCAwIDAgIzRDQUY1MDtcXG4gICAgICAgICAgYm94LXNoYWRvdzogMCAxcHggMCAwICM0Q0FGNTA7XFxufVxcbmlucHV0LmludmFsaWQ6bm90KFt0eXBlXSksIGlucHV0LmludmFsaWQ6bm90KFt0eXBlXSk6Zm9jdXMsXFxuaW5wdXRbdHlwZT10ZXh0XS5pbnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPXRleHRdLmludmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLFxcbmlucHV0W3R5cGU9cGFzc3dvcmRdLmludmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpLFxcbmlucHV0W3R5cGU9cGFzc3dvcmRdLmludmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLFxcbmlucHV0W3R5cGU9ZW1haWxdLmludmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpLFxcbmlucHV0W3R5cGU9ZW1haWxdLmludmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLFxcbmlucHV0W3R5cGU9dXJsXS5pbnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPXVybF0uaW52YWxpZDpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMsXFxuaW5wdXRbdHlwZT10aW1lXS5pbnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPXRpbWVdLmludmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLFxcbmlucHV0W3R5cGU9ZGF0ZV0uaW52YWxpZDpub3QoLmJyb3dzZXItZGVmYXVsdCksXFxuaW5wdXRbdHlwZT1kYXRlXS5pbnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cyxcXG5pbnB1dFt0eXBlPWRhdGV0aW1lXS5pbnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPWRhdGV0aW1lXS5pbnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cyxcXG5pbnB1dFt0eXBlPWRhdGV0aW1lLWxvY2FsXS5pbnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPWRhdGV0aW1lLWxvY2FsXS5pbnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cyxcXG5pbnB1dFt0eXBlPXRlbF0uaW52YWxpZDpub3QoLmJyb3dzZXItZGVmYXVsdCksXFxuaW5wdXRbdHlwZT10ZWxdLmludmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLFxcbmlucHV0W3R5cGU9bnVtYmVyXS5pbnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KSxcXG5pbnB1dFt0eXBlPW51bWJlcl0uaW52YWxpZDpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMsXFxuaW5wdXRbdHlwZT1zZWFyY2hdLmludmFsaWQ6bm90KC5icm93c2VyLWRlZmF1bHQpLFxcbmlucHV0W3R5cGU9c2VhcmNoXS5pbnZhbGlkOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cyxcXG50ZXh0YXJlYS5tYXRlcmlhbGl6ZS10ZXh0YXJlYS5pbnZhbGlkLFxcbnRleHRhcmVhLm1hdGVyaWFsaXplLXRleHRhcmVhLmludmFsaWQ6Zm9jdXMsIC5zZWxlY3Qtd3JhcHBlci5pbnZhbGlkID4gaW5wdXQuc2VsZWN0LWRyb3Bkb3duLFxcbi5zZWxlY3Qtd3JhcHBlci5pbnZhbGlkID4gaW5wdXQuc2VsZWN0LWRyb3Bkb3duOmZvY3VzIHtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRjQ0MzM2O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDFweCAwIDAgI0Y0NDMzNjtcXG4gICAgICAgICAgYm94LXNoYWRvdzogMCAxcHggMCAwICNGNDQzMzY7XFxufVxcbmlucHV0Om5vdChbdHlwZV0pLnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtc3VjY2Vzc10sXFxuaW5wdXQ6bm90KFt0eXBlXSk6Zm9jdXMudmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1zdWNjZXNzXSxcXG5pbnB1dDpub3QoW3R5cGVdKS5pbnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtZXJyb3JdLFxcbmlucHV0Om5vdChbdHlwZV0pOmZvY3VzLmludmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1lcnJvcl0sXFxuaW5wdXRbdHlwZT10ZXh0XTpub3QoLmJyb3dzZXItZGVmYXVsdCkudmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1zdWNjZXNzXSxcXG5pbnB1dFt0eXBlPXRleHRdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLXN1Y2Nlc3NdLFxcbmlucHV0W3R5cGU9dGV4dF06bm90KC5icm93c2VyLWRlZmF1bHQpLmludmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1lcnJvcl0sXFxuaW5wdXRbdHlwZT10ZXh0XTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLWVycm9yXSxcXG5pbnB1dFt0eXBlPXBhc3N3b3JkXTpub3QoLmJyb3dzZXItZGVmYXVsdCkudmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1zdWNjZXNzXSxcXG5pbnB1dFt0eXBlPXBhc3N3b3JkXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1zdWNjZXNzXSxcXG5pbnB1dFt0eXBlPXBhc3N3b3JkXTpub3QoLmJyb3dzZXItZGVmYXVsdCkuaW52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLWVycm9yXSxcXG5pbnB1dFt0eXBlPXBhc3N3b3JkXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLWVycm9yXSxcXG5pbnB1dFt0eXBlPWVtYWlsXTpub3QoLmJyb3dzZXItZGVmYXVsdCkudmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1zdWNjZXNzXSxcXG5pbnB1dFt0eXBlPWVtYWlsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1zdWNjZXNzXSxcXG5pbnB1dFt0eXBlPWVtYWlsXTpub3QoLmJyb3dzZXItZGVmYXVsdCkuaW52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLWVycm9yXSxcXG5pbnB1dFt0eXBlPWVtYWlsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLWVycm9yXSxcXG5pbnB1dFt0eXBlPXVybF06bm90KC5icm93c2VyLWRlZmF1bHQpLnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtc3VjY2Vzc10sXFxuaW5wdXRbdHlwZT11cmxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLXN1Y2Nlc3NdLFxcbmlucHV0W3R5cGU9dXJsXTpub3QoLmJyb3dzZXItZGVmYXVsdCkuaW52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLWVycm9yXSxcXG5pbnB1dFt0eXBlPXVybF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLmludmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1lcnJvcl0sXFxuaW5wdXRbdHlwZT10aW1lXTpub3QoLmJyb3dzZXItZGVmYXVsdCkudmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1zdWNjZXNzXSxcXG5pbnB1dFt0eXBlPXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLXN1Y2Nlc3NdLFxcbmlucHV0W3R5cGU9dGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpLmludmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1lcnJvcl0sXFxuaW5wdXRbdHlwZT10aW1lXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLWVycm9yXSxcXG5pbnB1dFt0eXBlPWRhdGVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLXN1Y2Nlc3NdLFxcbmlucHV0W3R5cGU9ZGF0ZV06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtc3VjY2Vzc10sXFxuaW5wdXRbdHlwZT1kYXRlXTpub3QoLmJyb3dzZXItZGVmYXVsdCkuaW52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLWVycm9yXSxcXG5pbnB1dFt0eXBlPWRhdGVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy5pbnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtZXJyb3JdLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLXN1Y2Nlc3NdLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLXN1Y2Nlc3NdLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS5pbnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtZXJyb3JdLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy5pbnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtZXJyb3JdLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWUtbG9jYWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLXN1Y2Nlc3NdLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWUtbG9jYWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLXN1Y2Nlc3NdLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWUtbG9jYWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS5pbnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtZXJyb3JdLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWUtbG9jYWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy5pbnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtZXJyb3JdLFxcbmlucHV0W3R5cGU9dGVsXTpub3QoLmJyb3dzZXItZGVmYXVsdCkudmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1zdWNjZXNzXSxcXG5pbnB1dFt0eXBlPXRlbF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtc3VjY2Vzc10sXFxuaW5wdXRbdHlwZT10ZWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS5pbnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtZXJyb3JdLFxcbmlucHV0W3R5cGU9dGVsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLWVycm9yXSxcXG5pbnB1dFt0eXBlPW51bWJlcl06bm90KC5icm93c2VyLWRlZmF1bHQpLnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtc3VjY2Vzc10sXFxuaW5wdXRbdHlwZT1udW1iZXJdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLXN1Y2Nlc3NdLFxcbmlucHV0W3R5cGU9bnVtYmVyXTpub3QoLmJyb3dzZXItZGVmYXVsdCkuaW52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLWVycm9yXSxcXG5pbnB1dFt0eXBlPW51bWJlcl06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLmludmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1lcnJvcl0sXFxuaW5wdXRbdHlwZT1zZWFyY2hdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLXN1Y2Nlc3NdLFxcbmlucHV0W3R5cGU9c2VhcmNoXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1zdWNjZXNzXSxcXG5pbnB1dFt0eXBlPXNlYXJjaF06bm90KC5icm93c2VyLWRlZmF1bHQpLmludmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1lcnJvcl0sXFxuaW5wdXRbdHlwZT1zZWFyY2hdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy5pbnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtZXJyb3JdLFxcbnRleHRhcmVhLm1hdGVyaWFsaXplLXRleHRhcmVhLnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtc3VjY2Vzc10sXFxudGV4dGFyZWEubWF0ZXJpYWxpemUtdGV4dGFyZWE6Zm9jdXMudmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1zdWNjZXNzXSxcXG50ZXh0YXJlYS5tYXRlcmlhbGl6ZS10ZXh0YXJlYS5pbnZhbGlkIH4gLmhlbHBlci10ZXh0W2RhdGEtZXJyb3JdLFxcbnRleHRhcmVhLm1hdGVyaWFsaXplLXRleHRhcmVhOmZvY3VzLmludmFsaWQgfiAuaGVscGVyLXRleHRbZGF0YS1lcnJvcl0sIC5zZWxlY3Qtd3JhcHBlci52YWxpZCAuaGVscGVyLXRleHRbZGF0YS1zdWNjZXNzXSxcXG4uc2VsZWN0LXdyYXBwZXIuaW52YWxpZCB+IC5oZWxwZXItdGV4dFtkYXRhLWVycm9yXSB7XFxuICBjb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbmlucHV0Om5vdChbdHlwZV0pLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0Om5vdChbdHlwZV0pOmZvY3VzLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9dGV4dF06bm90KC5icm93c2VyLWRlZmF1bHQpLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9dGV4dF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9cGFzc3dvcmRdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS52YWxpZCB+IC5oZWxwZXItdGV4dDphZnRlcixcXG5pbnB1dFt0eXBlPXBhc3N3b3JkXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1lbWFpbF06bm90KC5icm93c2VyLWRlZmF1bHQpLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9ZW1haWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IC5oZWxwZXItdGV4dDphZnRlcixcXG5pbnB1dFt0eXBlPXVybF06bm90KC5icm93c2VyLWRlZmF1bHQpLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9dXJsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT10aW1lXTpub3QoLmJyb3dzZXItZGVmYXVsdCkudmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT10aW1lXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1kYXRlXTpub3QoLmJyb3dzZXItZGVmYXVsdCkudmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1kYXRlXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1kYXRldGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IC5oZWxwZXItdGV4dDphZnRlcixcXG5pbnB1dFt0eXBlPWRhdGV0aW1lLWxvY2FsXTpub3QoLmJyb3dzZXItZGVmYXVsdCkudmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1kYXRldGltZS1sb2NhbF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9dGVsXTpub3QoLmJyb3dzZXItZGVmYXVsdCkudmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT10ZWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy52YWxpZCB+IC5oZWxwZXItdGV4dDphZnRlcixcXG5pbnB1dFt0eXBlPW51bWJlcl06bm90KC5icm93c2VyLWRlZmF1bHQpLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9bnVtYmVyXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMudmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1zZWFyY2hdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS52YWxpZCB+IC5oZWxwZXItdGV4dDphZnRlcixcXG5pbnB1dFt0eXBlPXNlYXJjaF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbnRleHRhcmVhLm1hdGVyaWFsaXplLXRleHRhcmVhLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbnRleHRhcmVhLm1hdGVyaWFsaXplLXRleHRhcmVhOmZvY3VzLnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLCAuc2VsZWN0LXdyYXBwZXIudmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIge1xcbiAgY29udGVudDogYXR0cihkYXRhLXN1Y2Nlc3MpO1xcbiAgY29sb3I6ICM0Q0FGNTA7XFxufVxcbmlucHV0Om5vdChbdHlwZV0pLmludmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXQ6bm90KFt0eXBlXSk6Zm9jdXMuaW52YWxpZCB+IC5oZWxwZXItdGV4dDphZnRlcixcXG5pbnB1dFt0eXBlPXRleHRdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS5pbnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9dGV4dF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLmludmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1wYXNzd29yZF06bm90KC5icm93c2VyLWRlZmF1bHQpLmludmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1wYXNzd29yZF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLmludmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1lbWFpbF06bm90KC5icm93c2VyLWRlZmF1bHQpLmludmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1lbWFpbF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLmludmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT11cmxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS5pbnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9dXJsXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IC5oZWxwZXItdGV4dDphZnRlcixcXG5pbnB1dFt0eXBlPXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS5pbnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9dGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLmludmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1kYXRlXTpub3QoLmJyb3dzZXItZGVmYXVsdCkuaW52YWxpZCB+IC5oZWxwZXItdGV4dDphZnRlcixcXG5pbnB1dFt0eXBlPWRhdGVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy5pbnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS5pbnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy5pbnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWUtbG9jYWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS5pbnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9ZGF0ZXRpbWUtbG9jYWxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy5pbnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9dGVsXTpub3QoLmJyb3dzZXItZGVmYXVsdCkuaW52YWxpZCB+IC5oZWxwZXItdGV4dDphZnRlcixcXG5pbnB1dFt0eXBlPXRlbF06bm90KC5icm93c2VyLWRlZmF1bHQpOmZvY3VzLmludmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1udW1iZXJdOm5vdCguYnJvd3Nlci1kZWZhdWx0KS5pbnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbmlucHV0W3R5cGU9bnVtYmVyXTpub3QoLmJyb3dzZXItZGVmYXVsdCk6Zm9jdXMuaW52YWxpZCB+IC5oZWxwZXItdGV4dDphZnRlcixcXG5pbnB1dFt0eXBlPXNlYXJjaF06bm90KC5icm93c2VyLWRlZmF1bHQpLmludmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1zZWFyY2hdOm5vdCguYnJvd3Nlci1kZWZhdWx0KTpmb2N1cy5pbnZhbGlkIH4gLmhlbHBlci10ZXh0OmFmdGVyLFxcbnRleHRhcmVhLm1hdGVyaWFsaXplLXRleHRhcmVhLmludmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIsXFxudGV4dGFyZWEubWF0ZXJpYWxpemUtdGV4dGFyZWE6Zm9jdXMuaW52YWxpZCB+IC5oZWxwZXItdGV4dDphZnRlciwgLnNlbGVjdC13cmFwcGVyLmludmFsaWQgfiAuaGVscGVyLXRleHQ6YWZ0ZXIge1xcbiAgY29udGVudDogYXR0cihkYXRhLWVycm9yKTtcXG4gIGNvbG9yOiAjRjQ0MzM2O1xcbn1cXG5pbnB1dDpub3QoW3R5cGVdKSArIGxhYmVsOmFmdGVyLFxcbmlucHV0W3R5cGU9dGV4dF06bm90KC5icm93c2VyLWRlZmF1bHQpICsgbGFiZWw6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1wYXNzd29yZF06bm90KC5icm93c2VyLWRlZmF1bHQpICsgbGFiZWw6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1lbWFpbF06bm90KC5icm93c2VyLWRlZmF1bHQpICsgbGFiZWw6YWZ0ZXIsXFxuaW5wdXRbdHlwZT11cmxdOm5vdCguYnJvd3Nlci1kZWZhdWx0KSArIGxhYmVsOmFmdGVyLFxcbmlucHV0W3R5cGU9dGltZV06bm90KC5icm93c2VyLWRlZmF1bHQpICsgbGFiZWw6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1kYXRlXTpub3QoLmJyb3dzZXItZGVmYXVsdCkgKyBsYWJlbDphZnRlcixcXG5pbnB1dFt0eXBlPWRhdGV0aW1lXTpub3QoLmJyb3dzZXItZGVmYXVsdCkgKyBsYWJlbDphZnRlcixcXG5pbnB1dFt0eXBlPWRhdGV0aW1lLWxvY2FsXTpub3QoLmJyb3dzZXItZGVmYXVsdCkgKyBsYWJlbDphZnRlcixcXG5pbnB1dFt0eXBlPXRlbF06bm90KC5icm93c2VyLWRlZmF1bHQpICsgbGFiZWw6YWZ0ZXIsXFxuaW5wdXRbdHlwZT1udW1iZXJdOm5vdCguYnJvd3Nlci1kZWZhdWx0KSArIGxhYmVsOmFmdGVyLFxcbmlucHV0W3R5cGU9c2VhcmNoXTpub3QoLmJyb3dzZXItZGVmYXVsdCkgKyBsYWJlbDphZnRlcixcXG50ZXh0YXJlYS5tYXRlcmlhbGl6ZS10ZXh0YXJlYSArIGxhYmVsOmFmdGVyLCAuc2VsZWN0LXdyYXBwZXIgKyBsYWJlbDphZnRlciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMDAlO1xcbiAgbGVmdDogMDtcXG4gIG9wYWNpdHk6IDA7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC4ycyBvcGFjaXR5IGVhc2Utb3V0LCAuMnMgY29sb3IgZWFzZS1vdXQ7XFxuICB0cmFuc2l0aW9uOiAuMnMgb3BhY2l0eSBlYXNlLW91dCwgLjJzIGNvbG9yIGVhc2Utb3V0O1xcbn1cXG4uaW5wdXQtZmllbGQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5pbnB1dC1maWVsZC5pbmxpbmUge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XFxufVxcbi5pbnB1dC1maWVsZC5pbmxpbmUgaW5wdXQsXFxuLmlucHV0LWZpZWxkLmlubGluZSAuc2VsZWN0LWRyb3Bkb3duIHtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5pbnB1dC1maWVsZC5jb2wgbGFiZWwge1xcbiAgbGVmdDogMC43NXJlbTtcXG59XFxuLmlucHV0LWZpZWxkLmNvbCAucHJlZml4IH4gbGFiZWwsXFxuLmlucHV0LWZpZWxkLmNvbCAucHJlZml4IH4gLnZhbGlkYXRlIH4gbGFiZWwge1xcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDNyZW0gLSAxLjVyZW0pO1xcbn1cXG4uaW5wdXQtZmllbGQgPiBsYWJlbCB7XFxuICBjb2xvcjogIzllOWU5ZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBjdXJzb3I6IHRleHQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGNvbG9yIC4ycyBlYXNlLW91dCwgLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O1xcbiAgdHJhbnNpdGlvbjogY29sb3IgLjJzIGVhc2Utb3V0LCAtd2Via2l0LXRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjJzIGVhc2Utb3V0LCBjb2xvciAuMnMgZWFzZS1vdXQ7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjJzIGVhc2Utb3V0LCBjb2xvciAuMnMgZWFzZS1vdXQsIC13ZWJraXQtdHJhbnNmb3JtIC4ycyBlYXNlLW91dDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMCUgMTAwJTtcXG4gICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMCUgMTAwJTtcXG4gIHRleHQtYWxpZ246IGluaXRpYWw7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMnB4KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEycHgpO1xcbn1cXG4uaW5wdXQtZmllbGQgPiBsYWJlbDpub3QoLmxhYmVsLWljb24pLmFjdGl2ZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTRweCkgc2NhbGUoMC44KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNHB4KSBzY2FsZSgwLjgpO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XFxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcXG59XFxuLmlucHV0LWZpZWxkID4gaW5wdXRbdHlwZT1kYXRlXTpub3QoLmJyb3dzZXItZGVmYXVsdCkgKyBsYWJlbCxcXG4uaW5wdXQtZmllbGQgPiBpbnB1dFt0eXBlPXRpbWVdOm5vdCguYnJvd3Nlci1kZWZhdWx0KSArIGxhYmVsIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNHB4KSBzY2FsZSgwLjgpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE0cHgpIHNjYWxlKDAuOCk7XFxuICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDAgMDtcXG4gICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xcbn1cXG4uaW5wdXQtZmllbGQgLmhlbHBlci10ZXh0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1pbi1oZWlnaHQ6IDE4cHg7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNTQpO1xcbn1cXG4uaW5wdXQtZmllbGQgLmhlbHBlci10ZXh0OjphZnRlciB7XFxuICBvcGFjaXR5OiAxO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuLmlucHV0LWZpZWxkIC5wcmVmaXgge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDNyZW07XFxuICBmb250LXNpemU6IDJyZW07XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGNvbG9yIC4ycztcXG4gIHRyYW5zaXRpb246IGNvbG9yIC4ycztcXG4gIHRvcDogMC41cmVtO1xcbn1cXG4uaW5wdXQtZmllbGQgLnByZWZpeC5hY3RpdmUge1xcbiAgY29sb3I6ICMyNmE2OWE7XFxufVxcbi5pbnB1dC1maWVsZCAucHJlZml4IH4gaW5wdXQsXFxuLmlucHV0LWZpZWxkIC5wcmVmaXggfiB0ZXh0YXJlYSxcXG4uaW5wdXQtZmllbGQgLnByZWZpeCB+IGxhYmVsLFxcbi5pbnB1dC1maWVsZCAucHJlZml4IH4gLnZhbGlkYXRlIH4gbGFiZWwsXFxuLmlucHV0LWZpZWxkIC5wcmVmaXggfiAuaGVscGVyLXRleHQsXFxuLmlucHV0LWZpZWxkIC5wcmVmaXggfiAuYXV0b2NvbXBsZXRlLWNvbnRlbnQge1xcbiAgbWFyZ2luLWxlZnQ6IDNyZW07XFxuICB3aWR0aDogOTIlO1xcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDNyZW0pO1xcbn1cXG4uaW5wdXQtZmllbGQgLnByZWZpeCB+IGxhYmVsIHtcXG4gIG1hcmdpbi1sZWZ0OiAzcmVtO1xcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSB7XFxuICAuaW5wdXQtZmllbGQgLnByZWZpeCB+IGlucHV0IHtcXG4gICAgd2lkdGg6IDg2JTtcXG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDNyZW0pO1xcbiAgfVxcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAuaW5wdXQtZmllbGQgLnByZWZpeCB+IGlucHV0IHtcXG4gICAgd2lkdGg6IDgwJTtcXG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDNyZW0pO1xcbiAgfVxcbn1cXG4vKiBTZWFyY2ggRmllbGQgKi9cXG4uaW5wdXQtZmllbGQgaW5wdXRbdHlwZT1zZWFyY2hdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC4zcyBiYWNrZ3JvdW5kLWNvbG9yO1xcbiAgdHJhbnNpdGlvbjogLjNzIGJhY2tncm91bmQtY29sb3I7XFxufVxcbi5uYXYtd3JhcHBlciAuaW5wdXQtZmllbGQgaW5wdXRbdHlwZT1zZWFyY2hdIHtcXG4gIGhlaWdodDogaW5oZXJpdDtcXG4gIHBhZGRpbmctbGVmdDogNHJlbTtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0cmVtKTtcXG4gIGJvcmRlcjogMDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcXG59XFxuLmlucHV0LWZpZWxkIGlucHV0W3R5cGU9c2VhcmNoXTpmb2N1czpub3QoLmJyb3dzZXItZGVmYXVsdCkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogMDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcXG4gIGNvbG9yOiAjNDQ0O1xcbn1cXG4uaW5wdXQtZmllbGQgaW5wdXRbdHlwZT1zZWFyY2hdOmZvY3VzOm5vdCguYnJvd3Nlci1kZWZhdWx0KSArIGxhYmVsIGksXFxuLmlucHV0LWZpZWxkIGlucHV0W3R5cGU9c2VhcmNoXTpmb2N1czpub3QoLmJyb3dzZXItZGVmYXVsdCkgfiAubWRpLW5hdmlnYXRpb24tY2xvc2UsXFxuLmlucHV0LWZpZWxkIGlucHV0W3R5cGU9c2VhcmNoXTpmb2N1czpub3QoLmJyb3dzZXItZGVmYXVsdCkgfiAubWF0ZXJpYWwtaWNvbnMge1xcbiAgY29sb3I6ICM0NDQ7XFxufVxcbi5pbnB1dC1maWVsZCBpbnB1dFt0eXBlPXNlYXJjaF0gKyAubGFiZWwtaWNvbiB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogbm9uZTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBub25lO1xcbiAgbGVmdDogMXJlbTtcXG59XFxuLmlucHV0LWZpZWxkIGlucHV0W3R5cGU9c2VhcmNoXSB+IC5tZGktbmF2aWdhdGlvbi1jbG9zZSxcXG4uaW5wdXQtZmllbGQgaW5wdXRbdHlwZT1zZWFyY2hdIH4gLm1hdGVyaWFsLWljb25zIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAxcmVtO1xcbiAgY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAuM3MgY29sb3I7XFxuICB0cmFuc2l0aW9uOiAuM3MgY29sb3I7XFxufVxcbi8qIFRleHRhcmVhICovXFxudGV4dGFyZWEge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDNyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxudGV4dGFyZWEubWF0ZXJpYWxpemUtdGV4dGFyZWEge1xcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gIC8qIHByZXZlbnRzIHNjcm9sbCBiYXIgZmxhc2ggKi9cXG4gIHBhZGRpbmc6IC44cmVtIDAgLjhyZW0gMDtcXG4gIC8qIHByZXZlbnRzIHRleHQganVtcCBvbiBFbnRlciBrZXlwcmVzcyAqL1xcbiAgcmVzaXplOiBub25lO1xcbiAgbWluLWhlaWdodDogM3JlbTtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmhpZGRlbmRpdiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XFxuICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xcbiAgLyogZnV0dXJlIHZlcnNpb24gb2YgZGVwcmVjYXRlZCAnd29yZC13cmFwJyAqL1xcbiAgcGFkZGluZy10b3A6IDEuMnJlbTtcXG4gIC8qIHByZXZlbnRzIHRleHQganVtcCBvbiBFbnRlciBrZXlwcmVzcyAqL1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgei1pbmRleDogLTE7XFxufVxcbi8qIEF1dG9jb21wbGV0ZSAqL1xcbi5hdXRvY29tcGxldGUtY29udGVudCBsaSAuaGlnaGxpZ2h0IHtcXG4gIGNvbG9yOiAjNDQ0O1xcbn1cXG4uYXV0b2NvbXBsZXRlLWNvbnRlbnQgbGkgaW1nIHtcXG4gIGhlaWdodDogNDBweDtcXG4gIHdpZHRoOiA0MHB4O1xcbiAgbWFyZ2luOiA1cHggMTVweDtcXG59XFxuLyogQ2hhcmFjdGVyIENvdW50ZXIgKi9cXG4uY2hhcmFjdGVyLWNvdW50ZXIge1xcbiAgbWluLWhlaWdodDogMThweDtcXG59XFxuLyogUmFkaW8gQnV0dG9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuW3R5cGU9XFxcInJhZGlvXFxcIl06bm90KDpjaGVja2VkKSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuW3R5cGU9XFxcInJhZGlvXFxcIl06bm90KDpjaGVja2VkKSArIHNwYW4sXFxuW3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZCArIHNwYW4ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZy1sZWZ0OiAzNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgaGVpZ2h0OiAyNXB4O1xcbiAgbGluZS1oZWlnaHQ6IDI1cHg7XFxuICBmb250LXNpemU6IDFyZW07XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC4yOHMgZWFzZTtcXG4gIHRyYW5zaXRpb246IC4yOHMgZWFzZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblt0eXBlPVxcXCJyYWRpb1xcXCJdICsgc3BhbjpiZWZvcmUsXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0gKyBzcGFuOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIG1hcmdpbjogNHB4O1xcbiAgd2lkdGg6IDE2cHg7XFxuICBoZWlnaHQ6IDE2cHg7XFxuICB6LWluZGV4OiAwO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAuMjhzIGVhc2U7XFxuICB0cmFuc2l0aW9uOiAuMjhzIGVhc2U7XFxufVxcbi8qIFVuY2hlY2tlZCBzdHlsZXMgKi9cXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpub3QoOmNoZWNrZWQpICsgc3BhbjpiZWZvcmUsXFxuW3R5cGU9XFxcInJhZGlvXFxcIl06bm90KDpjaGVja2VkKSArIHNwYW46YWZ0ZXIsXFxuW3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZCArIHNwYW46YmVmb3JlLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdOmNoZWNrZWQgKyBzcGFuOmFmdGVyLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdLndpdGgtZ2FwOmNoZWNrZWQgKyBzcGFuOmJlZm9yZSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXS53aXRoLWdhcDpjaGVja2VkICsgc3BhbjphZnRlciB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblt0eXBlPVxcXCJyYWRpb1xcXCJdOm5vdCg6Y2hlY2tlZCkgKyBzcGFuOmJlZm9yZSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpub3QoOmNoZWNrZWQpICsgc3BhbjphZnRlciB7XFxuICBib3JkZXI6IDJweCBzb2xpZCAjNWE1YTVhO1xcbn1cXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpub3QoOmNoZWNrZWQpICsgc3BhbjphZnRlciB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxufVxcbi8qIENoZWNrZWQgc3R5bGVzICovXFxuW3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZCArIHNwYW46YmVmb3JlIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbn1cXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkICsgc3BhbjphZnRlcixcXG5bdHlwZT1cXFwicmFkaW9cXFwiXS53aXRoLWdhcDpjaGVja2VkICsgc3BhbjpiZWZvcmUsXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ud2l0aC1nYXA6Y2hlY2tlZCArIHNwYW46YWZ0ZXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgIzI2YTY5YTtcXG59XFxuW3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZCArIHNwYW46YWZ0ZXIsXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ud2l0aC1nYXA6Y2hlY2tlZCArIHNwYW46YWZ0ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcXG59XFxuW3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZCArIHNwYW46YWZ0ZXIge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMDIpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDIpO1xcbn1cXG4vKiBSYWRpbyBXaXRoIGdhcCAqL1xcblt0eXBlPVxcXCJyYWRpb1xcXCJdLndpdGgtZ2FwOmNoZWNrZWQgKyBzcGFuOmFmdGVyIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxufVxcbi8qIEZvY3VzZWQgc3R5bGVzICovXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0udGFiYmVkOmZvY3VzICsgc3BhbjpiZWZvcmUge1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxufVxcbi8qIERpc2FibGVkIFJhZGlvIFdpdGggZ2FwICovXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ud2l0aC1nYXA6ZGlzYWJsZWQ6Y2hlY2tlZCArIHNwYW46YmVmb3JlIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC40Mik7XFxufVxcblt0eXBlPVxcXCJyYWRpb1xcXCJdLndpdGgtZ2FwOmRpc2FibGVkOmNoZWNrZWQgKyBzcGFuOmFmdGVyIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40Mik7XFxufVxcbi8qIERpc2FibGVkIHN0eWxlICovXFxuW3R5cGU9XFxcInJhZGlvXFxcIl06ZGlzYWJsZWQ6bm90KDpjaGVja2VkKSArIHNwYW46YmVmb3JlLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdOmRpc2FibGVkOmNoZWNrZWQgKyBzcGFuOmJlZm9yZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQyKTtcXG59XFxuW3R5cGU9XFxcInJhZGlvXFxcIl06ZGlzYWJsZWQgKyBzcGFuIHtcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNDIpO1xcbn1cXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpkaXNhYmxlZDpub3QoOmNoZWNrZWQpICsgc3BhbjpiZWZvcmUge1xcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNDIpO1xcbn1cXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpkaXNhYmxlZDpjaGVja2VkICsgc3BhbjphZnRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNDIpO1xcbiAgYm9yZGVyLWNvbG9yOiAjOTQ5NDk0O1xcbn1cXG4vKiBDaGVja2JveGVzXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4vKiBSZW1vdmUgZGVmYXVsdCBjaGVja2JveCAqL1xcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdOm5vdCg6Y2hlY2tlZCksXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl06Y2hlY2tlZCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBvcGFjaXR5OiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gIC8qIGNoZWNrYm94IGFzcGVjdCAqL1xcbn1cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSArIHNwYW46bm90KC5sZXZlcikge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZy1sZWZ0OiAzNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgaGVpZ2h0OiAyNXB4O1xcbiAgbGluZS1oZWlnaHQ6IDI1cHg7XFxuICBmb250LXNpemU6IDFyZW07XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSArIHNwYW46bm90KC5sZXZlcik6YmVmb3JlLFxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdOm5vdCguZmlsbGVkLWluKSArIHNwYW46bm90KC5sZXZlcik6YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDE4cHg7XFxuICBoZWlnaHQ6IDE4cHg7XFxuICB6LWluZGV4OiAwO1xcbiAgYm9yZGVyOiAycHggc29saWQgIzVhNWE1YTtcXG4gIGJvcmRlci1yYWRpdXM6IDFweDtcXG4gIG1hcmdpbi10b3A6IDNweDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogLjJzO1xcbiAgdHJhbnNpdGlvbjogLjJzO1xcbn1cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpub3QoLmZpbGxlZC1pbikgKyBzcGFuOm5vdCgubGV2ZXIpOmFmdGVyIHtcXG4gIGJvcmRlcjogMDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG59XFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl06bm90KDpjaGVja2VkKTpkaXNhYmxlZCArIHNwYW46bm90KC5sZXZlcik6YmVmb3JlIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40Mik7XFxufVxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLnRhYmJlZDpmb2N1cyArIHNwYW46bm90KC5sZXZlcik6YWZ0ZXIge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgYm9yZGVyOiAwO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XFxufVxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmNoZWNrZWQgKyBzcGFuOm5vdCgubGV2ZXIpOmJlZm9yZSB7XFxuICB0b3A6IC00cHg7XFxuICBsZWZ0OiAtNXB4O1xcbiAgd2lkdGg6IDEycHg7XFxuICBoZWlnaHQ6IDIycHg7XFxuICBib3JkZXItdG9wOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItbGVmdDogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgIzI2YTY5YTtcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMjZhNjlhO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0MGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQwZGVnKTtcXG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxuICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDEwMCUgMTAwJTtcXG4gICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMTAwJSAxMDAlO1xcbn1cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXTpjaGVja2VkOmRpc2FibGVkICsgc3BhbjpiZWZvcmUge1xcbiAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjQyKTtcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuNDIpO1xcbn1cXG4vKiBJbmRldGVybWluYXRlIGNoZWNrYm94ICovXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl06aW5kZXRlcm1pbmF0ZSArIHNwYW46bm90KC5sZXZlcik6YmVmb3JlIHtcXG4gIHRvcDogLTExcHg7XFxuICBsZWZ0OiAtMTJweDtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgaGVpZ2h0OiAyMnB4O1xcbiAgYm9yZGVyLXRvcDogbm9uZTtcXG4gIGJvcmRlci1sZWZ0OiBub25lO1xcbiAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgIzI2YTY5YTtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMTAwJSAxMDAlO1xcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAxMDAlIDEwMCU7XFxufVxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdOmluZGV0ZXJtaW5hdGU6ZGlzYWJsZWQgKyBzcGFuOm5vdCgubGV2ZXIpOmJlZm9yZSB7XFxuICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuNDIpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLmZpbGxlZC1pbiArIHNwYW46bm90KC5sZXZlcik6YWZ0ZXIge1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXS5maWxsZWQtaW4gKyBzcGFuOm5vdCgubGV2ZXIpOmJlZm9yZSxcXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXS5maWxsZWQtaW4gKyBzcGFuOm5vdCgubGV2ZXIpOmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgbGVmdDogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIC8qIC4xcyBkZWxheSBpcyBmb3IgY2hlY2sgYW5pbWF0aW9uICovXFxuICAtd2Via2l0LXRyYW5zaXRpb246IGJvcmRlciAuMjVzLCBiYWNrZ3JvdW5kLWNvbG9yIC4yNXMsIHdpZHRoIC4yMHMgLjFzLCBoZWlnaHQgLjIwcyAuMXMsIHRvcCAuMjBzIC4xcywgbGVmdCAuMjBzIC4xcztcXG4gIHRyYW5zaXRpb246IGJvcmRlciAuMjVzLCBiYWNrZ3JvdW5kLWNvbG9yIC4yNXMsIHdpZHRoIC4yMHMgLjFzLCBoZWlnaHQgLjIwcyAuMXMsIHRvcCAuMjBzIC4xcywgbGVmdCAuMjBzIC4xcztcXG4gIHotaW5kZXg6IDE7XFxufVxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLmZpbGxlZC1pbjpub3QoOmNoZWNrZWQpICsgc3Bhbjpub3QoLmxldmVyKTpiZWZvcmUge1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxuICBib3JkZXI6IDNweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGxlZnQ6IDZweDtcXG4gIHRvcDogMTBweDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVaKDM3ZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDM3ZGVnKTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMTAwJSAxMDAlO1xcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAxMDAlIDEwMCU7XFxufVxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLmZpbGxlZC1pbjpub3QoOmNoZWNrZWQpICsgc3Bhbjpub3QoLmxldmVyKTphZnRlciB7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICB3aWR0aDogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyOiAycHggc29saWQgIzVhNWE1YTtcXG4gIHRvcDogMHB4O1xcbiAgei1pbmRleDogMDtcXG59XFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0uZmlsbGVkLWluOmNoZWNrZWQgKyBzcGFuOm5vdCgubGV2ZXIpOmJlZm9yZSB7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAxcHg7XFxuICB3aWR0aDogOHB4O1xcbiAgaGVpZ2h0OiAxM3B4O1xcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1yaWdodDogMnB4IHNvbGlkICNmZmY7XFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2ZmZjtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVaKDM3ZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDM3ZGVnKTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMTAwJSAxMDAlO1xcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAxMDAlIDEwMCU7XFxufVxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLmZpbGxlZC1pbjpjaGVja2VkICsgc3Bhbjpub3QoLmxldmVyKTphZnRlciB7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMjBweDtcXG4gIGhlaWdodDogMjBweDtcXG4gIGJvcmRlcjogMnB4IHNvbGlkICMyNmE2OWE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjZhNjlhO1xcbiAgei1pbmRleDogMDtcXG59XFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0uZmlsbGVkLWluLnRhYmJlZDpmb2N1cyArIHNwYW46bm90KC5sZXZlcik6YWZ0ZXIge1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgYm9yZGVyLWNvbG9yOiAjNWE1YTVhO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xcbn1cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXS5maWxsZWQtaW4udGFiYmVkOmNoZWNrZWQ6Zm9jdXMgKyBzcGFuOm5vdCgubGV2ZXIpOmFmdGVyIHtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNmE2OWE7XFxuICBib3JkZXItY29sb3I6ICMyNmE2OWE7XFxufVxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLmZpbGxlZC1pbjpkaXNhYmxlZDpub3QoOmNoZWNrZWQpICsgc3Bhbjpub3QoLmxldmVyKTpiZWZvcmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcXG59XFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0uZmlsbGVkLWluOmRpc2FibGVkOm5vdCg6Y2hlY2tlZCkgKyBzcGFuOm5vdCgubGV2ZXIpOmFmdGVyIHtcXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTQ5NDk0O1xcbn1cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXS5maWxsZWQtaW46ZGlzYWJsZWQ6Y2hlY2tlZCArIHNwYW46bm90KC5sZXZlcik6YmVmb3JlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXS5maWxsZWQtaW46ZGlzYWJsZWQ6Y2hlY2tlZCArIHNwYW46bm90KC5sZXZlcik6YWZ0ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk0OTQ5NDtcXG4gIGJvcmRlci1jb2xvcjogIzk0OTQ5NDtcXG59XFxuLyogU3dpdGNoXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG4uc3dpdGNoLFxcbi5zd2l0Y2ggKiB7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLnN3aXRjaCBsYWJlbCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5zd2l0Y2ggbGFiZWwgaW5wdXRbdHlwZT1jaGVja2JveF0ge1xcbiAgb3BhY2l0eTogMDtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbn1cXG4uc3dpdGNoIGxhYmVsIGlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQgKyAubGV2ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg0YzdjMTtcXG59XFxuLnN3aXRjaCBsYWJlbCBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkICsgLmxldmVyOmJlZm9yZSwgLnN3aXRjaCBsYWJlbCBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkICsgLmxldmVyOmFmdGVyIHtcXG4gIGxlZnQ6IDE4cHg7XFxufVxcbi5zd2l0Y2ggbGFiZWwgaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCArIC5sZXZlcjphZnRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjZhNjlhO1xcbn1cXG4uc3dpdGNoIGxhYmVsIC5sZXZlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAzNnB4O1xcbiAgaGVpZ2h0OiAxNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjM4KTtcXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGJhY2tncm91bmQgMC4zcyBlYXNlO1xcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjNzIGVhc2U7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgbWFyZ2luOiAwIDE2cHg7XFxufVxcbi5zd2l0Y2ggbGFiZWwgLmxldmVyOmJlZm9yZSwgLnN3aXRjaCBsYWJlbCAubGV2ZXI6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMjBweDtcXG4gIGhlaWdodDogMjBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IC0zcHg7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGxlZnQgMC4zcyBlYXNlLCBiYWNrZ3JvdW5kIC4zcyBlYXNlLCAtd2Via2l0LWJveC1zaGFkb3cgMC4xcyBlYXNlLCAtd2Via2l0LXRyYW5zZm9ybSAuMXMgZWFzZTtcXG4gIHRyYW5zaXRpb246IGxlZnQgMC4zcyBlYXNlLCBiYWNrZ3JvdW5kIC4zcyBlYXNlLCAtd2Via2l0LWJveC1zaGFkb3cgMC4xcyBlYXNlLCAtd2Via2l0LXRyYW5zZm9ybSAuMXMgZWFzZTtcXG4gIHRyYW5zaXRpb246IGxlZnQgMC4zcyBlYXNlLCBiYWNrZ3JvdW5kIC4zcyBlYXNlLCBib3gtc2hhZG93IDAuMXMgZWFzZSwgdHJhbnNmb3JtIC4xcyBlYXNlO1xcbiAgdHJhbnNpdGlvbjogbGVmdCAwLjNzIGVhc2UsIGJhY2tncm91bmQgLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4xcyBlYXNlLCB0cmFuc2Zvcm0gLjFzIGVhc2UsIC13ZWJraXQtYm94LXNoYWRvdyAwLjFzIGVhc2UsIC13ZWJraXQtdHJhbnNmb3JtIC4xcyBlYXNlO1xcbn1cXG4uc3dpdGNoIGxhYmVsIC5sZXZlcjpiZWZvcmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzOCwgMTY2LCAxNTQsIDAuMTUpO1xcbn1cXG4uc3dpdGNoIGxhYmVsIC5sZXZlcjphZnRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjFGMUYxO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDJweCAycHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAxcHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgICAgICAgICBib3gtc2hhZG93OiAwcHggM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDJweCAycHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAxcHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbn1cXG5pbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkOm5vdCg6ZGlzYWJsZWQpIH4gLmxldmVyOmFjdGl2ZTo6YmVmb3JlLFxcbmlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQ6bm90KDpkaXNhYmxlZCkudGFiYmVkOmZvY3VzIH4gLmxldmVyOjpiZWZvcmUge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDIuNCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMi40KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzgsIDE2NiwgMTU0LCAwLjE1KTtcXG59XFxuaW5wdXRbdHlwZT1jaGVja2JveF06bm90KDpkaXNhYmxlZCkgfiAubGV2ZXI6YWN0aXZlOmJlZm9yZSxcXG5pbnB1dFt0eXBlPWNoZWNrYm94XTpub3QoOmRpc2FibGVkKS50YWJiZWQ6Zm9jdXMgfiAubGV2ZXI6OmJlZm9yZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMi40KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgyLjQpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjA4KTtcXG59XFxuLnN3aXRjaCBpbnB1dFt0eXBlPWNoZWNrYm94XVtkaXNhYmxlZF0gKyAubGV2ZXIge1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG59XFxuLnN3aXRjaCBsYWJlbCBpbnB1dFt0eXBlPWNoZWNrYm94XVtkaXNhYmxlZF0gKyAubGV2ZXI6YWZ0ZXIsXFxuLnN3aXRjaCBsYWJlbCBpbnB1dFt0eXBlPWNoZWNrYm94XVtkaXNhYmxlZF06Y2hlY2tlZCArIC5sZXZlcjphZnRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTQ5NDk0O1xcbn1cXG4vKiBTZWxlY3QgRmllbGRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcbnNlbGVjdCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5zZWxlY3QuYnJvd3Nlci1kZWZhdWx0IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5zZWxlY3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZjJmMmYyO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgaGVpZ2h0OiAzcmVtO1xcbn1cXG4uc2VsZWN0LWxhYmVsIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG59XFxuLnNlbGVjdC13cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLnNlbGVjdC13cmFwcGVyLnZhbGlkICsgbGFiZWwsXFxuLnNlbGVjdC13cmFwcGVyLmludmFsaWQgKyBsYWJlbCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG4uc2VsZWN0LXdyYXBwZXIgaW5wdXQuc2VsZWN0LWRyb3Bkb3duIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM5ZTllOWU7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgaGVpZ2h0OiAzcmVtO1xcbiAgbGluZS1oZWlnaHQ6IDNyZW07XFxuICB3aWR0aDogMTAwJTtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIG1hcmdpbjogMCAwIDhweCAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5zZWxlY3Qtd3JhcHBlciBpbnB1dC5zZWxlY3QtZHJvcGRvd246Zm9jdXMge1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMyNmE2OWE7XFxufVxcbi5zZWxlY3Qtd3JhcHBlciAuY2FyZXQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBtYXJnaW46IGF1dG8gMDtcXG4gIHotaW5kZXg6IDA7XFxuICBmaWxsOiByZ2JhKDAsIDAsIDAsIDAuODcpO1xcbn1cXG4uc2VsZWN0LXdyYXBwZXIgKyBsYWJlbCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IC0yNnB4O1xcbiAgZm9udC1zaXplOiAwLjhyZW07XFxufVxcbnNlbGVjdDpkaXNhYmxlZCB7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQyKTtcXG59XFxuLnNlbGVjdC13cmFwcGVyLmRpc2FibGVkICsgbGFiZWwge1xcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40Mik7XFxufVxcbi5zZWxlY3Qtd3JhcHBlci5kaXNhYmxlZCAuY2FyZXQge1xcbiAgZmlsbDogcmdiYSgwLCAwLCAwLCAwLjQyKTtcXG59XFxuLnNlbGVjdC13cmFwcGVyIGlucHV0LnNlbGVjdC1kcm9wZG93bjpkaXNhYmxlZCB7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQyKTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi5zZWxlY3Qtd3JhcHBlciBpIHtcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxufVxcbi5zZWxlY3QtZHJvcGRvd24gbGkuZGlzYWJsZWQsXFxuLnNlbGVjdC1kcm9wZG93biBsaS5kaXNhYmxlZCA+IHNwYW4sXFxuLnNlbGVjdC1kcm9wZG93biBsaS5vcHRncm91cCB7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5zZWxlY3QtZHJvcGRvd24uZHJvcGRvd24tY29udGVudCBsaTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDgpO1xcbn1cXG4uc2VsZWN0LWRyb3Bkb3duLmRyb3Bkb3duLWNvbnRlbnQgbGkuc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjAzKTtcXG59XFxuLnNlbGVjdC1kcm9wZG93bi5kcm9wZG93bi1jb250ZW50IGxpOmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wOCk7XFxufVxcbi5wcmVmaXggfiAuc2VsZWN0LXdyYXBwZXIge1xcbiAgbWFyZ2luLWxlZnQ6IDNyZW07XFxuICB3aWR0aDogOTIlO1xcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDNyZW0pO1xcbn1cXG4ucHJlZml4IH4gbGFiZWwge1xcbiAgbWFyZ2luLWxlZnQ6IDNyZW07XFxufVxcbi5zZWxlY3QtZHJvcGRvd24gbGkgaW1nIHtcXG4gIGhlaWdodDogNDBweDtcXG4gIHdpZHRoOiA0MHB4O1xcbiAgbWFyZ2luOiA1cHggMTVweDtcXG4gIGZsb2F0OiByaWdodDtcXG59XFxuLnNlbGVjdC1kcm9wZG93biBsaS5vcHRncm91cCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2VlZTtcXG59XFxuLnNlbGVjdC1kcm9wZG93biBsaS5vcHRncm91cC5zZWxlY3RlZCA+IHNwYW4ge1xcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43KTtcXG59XFxuLnNlbGVjdC1kcm9wZG93biBsaS5vcHRncm91cCA+IHNwYW4ge1xcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXG59XFxuLnNlbGVjdC1kcm9wZG93biBsaS5vcHRncm91cCB+IGxpLm9wdGdyb3VwLW9wdGlvbiB7XFxuICBwYWRkaW5nLWxlZnQ6IDFyZW07XFxufVxcbi8qIEZpbGUgSW5wdXRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcbi5maWxlLWZpZWxkIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmZpbGUtZmllbGQgLmZpbGUtcGF0aC13cmFwcGVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxufVxcbi5maWxlLWZpZWxkIGlucHV0LmZpbGUtcGF0aCB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmZpbGUtZmllbGQgLmJ0biwgLmZpbGUtZmllbGQgLmJ0bi1sYXJnZSwgLmZpbGUtZmllbGQgLmJ0bi1zbWFsbCB7XFxuICBmbG9hdDogbGVmdDtcXG4gIGhlaWdodDogM3JlbTtcXG4gIGxpbmUtaGVpZ2h0OiAzcmVtO1xcbn1cXG4uZmlsZS1maWVsZCBzcGFuIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmZpbGUtZmllbGQgaW5wdXRbdHlwZT1maWxlXSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGxlZnQ6IDA7XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBvcGFjaXR5OiAwO1xcbiAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTApO1xcbn1cXG4uZmlsZS1maWVsZCBpbnB1dFt0eXBlPWZpbGVdOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4vKiBSYW5nZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuLnJhbmdlLWZpZWxkIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuaW5wdXRbdHlwZT1yYW5nZV0sXFxuaW5wdXRbdHlwZT1yYW5nZV0gKyAudGh1bWIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5pbnB1dFt0eXBlPXJhbmdlXSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbjogMTVweCAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuaW5wdXRbdHlwZT1yYW5nZV06Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuaW5wdXRbdHlwZT1yYW5nZV0gKyAudGh1bWIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMHB4O1xcbiAgbGVmdDogMDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGhlaWdodDogMDtcXG4gIHdpZHRoOiAwO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcXG4gIG1hcmdpbi1sZWZ0OiA3cHg7XFxuICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7XFxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxufVxcbmlucHV0W3R5cGU9cmFuZ2VdICsgLnRodW1iIC52YWx1ZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAzMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICMyNmE2OWE7XFxuICBmb250LXNpemU6IDA7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcbn1cXG5pbnB1dFt0eXBlPXJhbmdlXSArIC50aHVtYi5hY3RpdmUge1xcbiAgYm9yZGVyLXJhZGl1czogNTAlIDUwJSA1MCUgMDtcXG59XFxuaW5wdXRbdHlwZT1yYW5nZV0gKyAudGh1bWIuYWN0aXZlIC52YWx1ZSB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIG1hcmdpbi1sZWZ0OiAtMXB4O1xcbiAgbWFyZ2luLXRvcDogOHB4O1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbn1cXG5pbnB1dFt0eXBlPXJhbmdlXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxufVxcbmlucHV0W3R5cGU9cmFuZ2VdOjotd2Via2l0LXNsaWRlci1ydW5uYWJsZS10cmFjayB7XFxuICBoZWlnaHQ6IDNweDtcXG4gIGJhY2tncm91bmQ6ICNjMmMwYzI7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcbmlucHV0W3R5cGU9cmFuZ2VdOjotd2Via2l0LXNsaWRlci10aHVtYiB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBoZWlnaHQ6IDE0cHg7XFxuICB3aWR0aDogMTRweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJhY2tncm91bmQ6ICMyNmE2OWE7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtYm94LXNoYWRvdyAuM3M7XFxuICB0cmFuc2l0aW9uOiAtd2Via2l0LWJveC1zaGFkb3cgLjNzO1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAuM3M7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IC4zcywgLXdlYmtpdC1ib3gtc2hhZG93IC4zcztcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNmE2OWE7XFxuICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7XFxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7XFxuICBtYXJnaW46IC01cHggMCAwIDA7XFxufVxcbmlucHV0W3R5cGU9cmFuZ2VdLmZvY3VzZWQ6Zm9jdXM6bm90KC5hY3RpdmUpOjotd2Via2l0LXNsaWRlci10aHVtYiB7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgzOCwgMTY2LCAxNTQsIDAuMjYpO1xcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAxMHB4IHJnYmEoMzgsIDE2NiwgMTU0LCAwLjI2KTtcXG59XFxuaW5wdXRbdHlwZT1yYW5nZV0ge1xcbiAgLyogZml4IGZvciBGRiB1bmFibGUgdG8gYXBwbHkgZm9jdXMgc3R5bGUgYnVnICAqL1xcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxuICAvKnJlcXVpcmVkIGZvciBwcm9wZXIgdHJhY2sgc2l6aW5nIGluIEZGKi9cXG59XFxuaW5wdXRbdHlwZT1yYW5nZV06Oi1tb3otcmFuZ2UtdHJhY2sge1xcbiAgaGVpZ2h0OiAzcHg7XFxuICBiYWNrZ3JvdW5kOiAjYzJjMGMyO1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG5pbnB1dFt0eXBlPXJhbmdlXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXI6IDA7XFxufVxcbmlucHV0W3R5cGU9cmFuZ2VdOjotbW96LXJhbmdlLXRodW1iIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGhlaWdodDogMTRweDtcXG4gIHdpZHRoOiAxNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogIzI2YTY5YTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC1ib3gtc2hhZG93IC4zcztcXG4gIHRyYW5zaXRpb246IC13ZWJraXQtYm94LXNoYWRvdyAuM3M7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IC4zcztcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjNzLCAtd2Via2l0LWJveC1zaGFkb3cgLjNzO1xcbiAgbWFyZ2luLXRvcDogLTVweDtcXG59XFxuaW5wdXRbdHlwZT1yYW5nZV06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IHNvbGlkICNmZmY7XFxuICBvdXRsaW5lLW9mZnNldDogLTFweDtcXG59XFxuaW5wdXRbdHlwZT1yYW5nZV0uZm9jdXNlZDpmb2N1czpub3QoLmFjdGl2ZSk6Oi1tb3otcmFuZ2UtdGh1bWIge1xcbiAgYm94LXNoYWRvdzogMCAwIDAgMTBweCByZ2JhKDM4LCAxNjYsIDE1NCwgMC4yNik7XFxufVxcbmlucHV0W3R5cGU9cmFuZ2VdOjotbXMtdHJhY2sge1xcbiAgaGVpZ2h0OiAzcHg7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItd2lkdGg6IDZweCAwO1xcbiAgLypyZW1vdmUgZGVmYXVsdCB0aWNrIG1hcmtzKi9cXG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuaW5wdXRbdHlwZT1yYW5nZV06Oi1tcy1maWxsLWxvd2VyIHtcXG4gIGJhY2tncm91bmQ6ICM3Nzc7XFxufVxcbmlucHV0W3R5cGU9cmFuZ2VdOjotbXMtZmlsbC11cHBlciB7XFxuICBiYWNrZ3JvdW5kOiAjZGRkO1xcbn1cXG5pbnB1dFt0eXBlPXJhbmdlXTo6LW1zLXRodW1iIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGhlaWdodDogMTRweDtcXG4gIHdpZHRoOiAxNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogIzI2YTY5YTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC1ib3gtc2hhZG93IC4zcztcXG4gIHRyYW5zaXRpb246IC13ZWJraXQtYm94LXNoYWRvdyAuM3M7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IC4zcztcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjNzLCAtd2Via2l0LWJveC1zaGFkb3cgLjNzO1xcbn1cXG5pbnB1dFt0eXBlPXJhbmdlXS5mb2N1c2VkOmZvY3VzOm5vdCguYWN0aXZlKTo6LW1zLXRodW1iIHtcXG4gIGJveC1zaGFkb3c6IDAgMCAwIDEwcHggcmdiYSgzOCwgMTY2LCAxNTQsIDAuMjYpO1xcbn1cXG4vKioqKioqKioqKioqKioqXFxuICAgIE5hdiBMaXN0XFxuKioqKioqKioqKioqKioqL1xcbi50YWJsZS1vZi1jb250ZW50cy5maXhlZCB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxufVxcbi50YWJsZS1vZi1jb250ZW50cyBsaSB7XFxuICBwYWRkaW5nOiAycHggMDtcXG59XFxuLnRhYmxlLW9mLWNvbnRlbnRzIGEge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGNvbG9yOiAjNzU3NTc1O1xcbiAgcGFkZGluZy1sZWZ0OiAxNnB4O1xcbiAgaGVpZ2h0OiAxLjVyZW07XFxuICBsaW5lLWhlaWdodDogMS41cmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IC40O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG4udGFibGUtb2YtY29udGVudHMgYTpob3ZlciB7XFxuICBjb2xvcjogI2E4YThhODtcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2VlNmU3MztcXG59XFxuLnRhYmxlLW9mLWNvbnRlbnRzIGEuYWN0aXZlIHtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBwYWRkaW5nLWxlZnQ6IDE0cHg7XFxuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICNlZTZlNzM7XFxufVxcbi5zaWRlbmF2IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBtYXJnaW46IDA7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBoZWlnaHQ6IGNhbGMoMTAwJSArIDYwcHgpO1xcbiAgaGVpZ2h0OiAtbW96LWNhbGMoMTAwJSk7XFxuICBwYWRkaW5nLWJvdHRvbTogNjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB6LWluZGV4OiA5OTk7XFxuICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcXG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTA1JSk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTA1JSk7XFxufVxcbi5zaWRlbmF2LnJpZ2h0LWFsaWduZWQge1xcbiAgcmlnaHQ6IDA7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDUlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwNSUpO1xcbiAgbGVmdDogYXV0bztcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XFxufVxcbi5zaWRlbmF2IC5jb2xsYXBzaWJsZSB7XFxuICBtYXJnaW46IDA7XFxufVxcbi5zaWRlbmF2IGxpIHtcXG4gIGZsb2F0OiBub25lO1xcbiAgbGluZS1oZWlnaHQ6IDQ4cHg7XFxufVxcbi5zaWRlbmF2IGxpLmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDUpO1xcbn1cXG4uc2lkZW5hdiBsaSA+IGEge1xcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44Nyk7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBoZWlnaHQ6IDQ4cHg7XFxuICBsaW5lLWhlaWdodDogNDhweDtcXG4gIHBhZGRpbmc6IDAgMzJweDtcXG59XFxuLnNpZGVuYXYgbGkgPiBhOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wNSk7XFxufVxcbi5zaWRlbmF2IGxpID4gYS5idG4sIC5zaWRlbmF2IGxpID4gYS5idG4tbGFyZ2UsIC5zaWRlbmF2IGxpID4gYS5idG4tc21hbGwsIC5zaWRlbmF2IGxpID4gYS5idG4tbGFyZ2UsIC5zaWRlbmF2IGxpID4gYS5idG4tZmxhdCwgLnNpZGVuYXYgbGkgPiBhLmJ0bi1mbG9hdGluZyB7XFxuICBtYXJnaW46IDEwcHggMTVweDtcXG59XFxuLnNpZGVuYXYgbGkgPiBhLmJ0biwgLnNpZGVuYXYgbGkgPiBhLmJ0bi1sYXJnZSwgLnNpZGVuYXYgbGkgPiBhLmJ0bi1zbWFsbCwgLnNpZGVuYXYgbGkgPiBhLmJ0bi1sYXJnZSwgLnNpZGVuYXYgbGkgPiBhLmJ0bi1mbG9hdGluZyB7XFxuICBjb2xvcjogI2ZmZjtcXG59XFxuLnNpZGVuYXYgbGkgPiBhLmJ0bi1mbGF0IHtcXG4gIGNvbG9yOiAjMzQzNDM0O1xcbn1cXG4uc2lkZW5hdiBsaSA+IGEuYnRuOmhvdmVyLCAuc2lkZW5hdiBsaSA+IGEuYnRuLWxhcmdlOmhvdmVyLCAuc2lkZW5hdiBsaSA+IGEuYnRuLXNtYWxsOmhvdmVyLCAuc2lkZW5hdiBsaSA+IGEuYnRuLWxhcmdlOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyYmJiYWQ7XFxufVxcbi5zaWRlbmF2IGxpID4gYS5idG4tZmxvYXRpbmc6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcXG59XFxuLnNpZGVuYXYgbGkgPiBhID4gaSxcXG4uc2lkZW5hdiBsaSA+IGEgPiBbY2xhc3NePVxcXCJtZGktXFxcIl0sIC5zaWRlbmF2IGxpID4gYSBsaSA+IGEgPiBbY2xhc3MqPVxcXCJtZGktXFxcIl0sXFxuLnNpZGVuYXYgbGkgPiBhID4gaS5tYXRlcmlhbC1pY29ucyB7XFxuICBmbG9hdDogbGVmdDtcXG4gIGhlaWdodDogNDhweDtcXG4gIGxpbmUtaGVpZ2h0OiA0OHB4O1xcbiAgbWFyZ2luOiAwIDMycHggMCAwO1xcbiAgd2lkdGg6IDI0cHg7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjU0KTtcXG59XFxuLnNpZGVuYXYgLmRpdmlkZXIge1xcbiAgbWFyZ2luOiA4cHggMCAwIDA7XFxufVxcbi5zaWRlbmF2IC5zdWJoZWFkZXIge1xcbiAgY3Vyc29yOiBpbml0aWFsO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjU0KTtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogNDhweDtcXG59XFxuLnNpZGVuYXYgLnN1YmhlYWRlcjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLnNpZGVuYXYgLnVzZXItdmlldyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nOiAzMnB4IDMycHggMDtcXG4gIG1hcmdpbi1ib3R0b206IDhweDtcXG59XFxuLnNpZGVuYXYgLnVzZXItdmlldyA+IGEge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgcGFkZGluZzogMDtcXG59XFxuLnNpZGVuYXYgLnVzZXItdmlldyA+IGE6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcbi5zaWRlbmF2IC51c2VyLXZpZXcgLmJhY2tncm91bmQge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IC0xO1xcbn1cXG4uc2lkZW5hdiAudXNlci12aWV3IC5jaXJjbGUsIC5zaWRlbmF2IC51c2VyLXZpZXcgLm5hbWUsIC5zaWRlbmF2IC51c2VyLXZpZXcgLmVtYWlsIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uc2lkZW5hdiAudXNlci12aWV3IC5jaXJjbGUge1xcbiAgaGVpZ2h0OiA2NHB4O1xcbiAgd2lkdGg6IDY0cHg7XFxufVxcbi5zaWRlbmF2IC51c2VyLXZpZXcgLm5hbWUsXFxuLnNpZGVuYXYgLnVzZXItdmlldyAuZW1haWwge1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxufVxcbi5zaWRlbmF2IC51c2VyLXZpZXcgLm5hbWUge1xcbiAgbWFyZ2luLXRvcDogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxufVxcbi5zaWRlbmF2IC51c2VyLXZpZXcgLmVtYWlsIHtcXG4gIHBhZGRpbmctYm90dG9tOiAxNnB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG59XFxuLmRyYWctdGFyZ2V0IHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgei1pbmRleDogOTk4O1xcbn1cXG4uZHJhZy10YXJnZXQucmlnaHQtYWxpZ25lZCB7XFxuICByaWdodDogMDtcXG59XFxuLnNpZGVuYXYuc2lkZW5hdi1maXhlZCB7XFxuICBsZWZ0OiAwO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG59XFxuLnNpZGVuYXYuc2lkZW5hdi1maXhlZC5yaWdodC1hbGlnbmVkIHtcXG4gIHJpZ2h0OiAwO1xcbiAgbGVmdDogYXV0bztcXG59XFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkge1xcbiAgLnNpZGVuYXYuc2lkZW5hdi1maXhlZCB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDUlKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwNSUpO1xcbiAgfVxcbiAgLnNpZGVuYXYuc2lkZW5hdi1maXhlZC5yaWdodC1hbGlnbmVkIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTA1JSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwNSUpO1xcbiAgfVxcbiAgLnNpZGVuYXYgPiBhIHtcXG4gICAgcGFkZGluZzogMCAxNnB4O1xcbiAgfVxcbiAgLnNpZGVuYXYgLnVzZXItdmlldyB7XFxuICAgIHBhZGRpbmc6IDE2cHggMTZweCAwO1xcbiAgfVxcbn1cXG4uc2lkZW5hdiAuY29sbGFwc2libGUtYm9keSA+IHVsOm5vdCguY29sbGFwc2libGUpID4gbGkuYWN0aXZlLFxcbi5zaWRlbmF2LnNpZGVuYXYtZml4ZWQgLmNvbGxhcHNpYmxlLWJvZHkgPiB1bDpub3QoLmNvbGxhcHNpYmxlKSA+IGxpLmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWU2ZTczO1xcbn1cXG4uc2lkZW5hdiAuY29sbGFwc2libGUtYm9keSA+IHVsOm5vdCguY29sbGFwc2libGUpID4gbGkuYWN0aXZlIGEsXFxuLnNpZGVuYXYuc2lkZW5hdi1maXhlZCAuY29sbGFwc2libGUtYm9keSA+IHVsOm5vdCguY29sbGFwc2libGUpID4gbGkuYWN0aXZlIGEge1xcbiAgY29sb3I6ICNmZmY7XFxufVxcbi5zaWRlbmF2IC5jb2xsYXBzaWJsZS1ib2R5IHtcXG4gIHBhZGRpbmc6IDA7XFxufVxcbi5zaWRlbmF2LW92ZXJsYXkge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgb3BhY2l0eTogMDtcXG4gIGhlaWdodDogMTIwdmg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICB6LWluZGV4OiA5OTc7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4vKlxcbiAgICBAbGljZW5zZVxcbiAgICBDb3B5cmlnaHQgKGMpIDIwMTQgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAgICBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XFxuICAgIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XFxuICAgIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxcbiAgICBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xcbiAgICBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxcbiAqL1xcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4vKiBTVFlMRVMgRk9SIFRIRSBTUElOTkVSICovXFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbi8qXFxuICogQ29uc3RhbnRzOlxcbiAqICAgICAgU1RST0tFV0lEVEggPSAzcHhcXG4gKiAgICAgIEFSQ1NJWkUgICAgID0gMjcwIGRlZ3JlZXMgKGFtb3VudCBvZiBjaXJjbGUgdGhlIGFyYyB0YWtlcyB1cClcXG4gKiAgICAgIEFSQ1RJTUUgICAgID0gMTMzM21zICh0aW1lIGl0IHRha2VzIHRvIGV4cGFuZCBhbmQgY29udHJhY3QgYXJjKVxcbiAqICAgICAgQVJDU1RBUlRST1QgPSAyMTYgZGVncmVlcyAoaG93IG11Y2ggdGhlIHN0YXJ0IGxvY2F0aW9uIG9mIHRoZSBhcmNcXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkIHJvdGF0ZSBlYWNoIHRpbWUsIDIxNiBnaXZlcyB1cyBhXFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUgcG9pbnRlZCBzdGFyIHNoYXBlIChpdCdzIDM2MC81ICogMykuXFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvciBhIDcgcG9pbnRlZCBzdGFyLCB3ZSBtaWdodCBkb1xcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzNjAvNyAqIDMgPSAxNTQuMjg2KVxcbiAqICAgICAgQ09OVEFJTkVSV0lEVEggPSAyOHB4XFxuICogICAgICBTSFJJTktfVElNRSA9IDQwMG1zXFxuICovXFxuLnByZWxvYWRlci13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiA1MHB4O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG4ucHJlbG9hZGVyLXdyYXBwZXIuc21hbGwge1xcbiAgd2lkdGg6IDM2cHg7XFxuICBoZWlnaHQ6IDM2cHg7XFxufVxcbi5wcmVsb2FkZXItd3JhcHBlci5iaWcge1xcbiAgd2lkdGg6IDY0cHg7XFxuICBoZWlnaHQ6IDY0cHg7XFxufVxcbi5wcmVsb2FkZXItd3JhcHBlci5hY3RpdmUge1xcbiAgLyogZHVyYXRpb246IDM2MCAqIEFSQ1RJTUUgLyAoQVJDU1RBUlRST1QgKyAoMzYwLUFSQ1NJWkUpKSAqL1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGNvbnRhaW5lci1yb3RhdGUgMTU2OG1zIGxpbmVhciBpbmZpbml0ZTtcXG4gIGFuaW1hdGlvbjogY29udGFpbmVyLXJvdGF0ZSAxNTY4bXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgY29udGFpbmVyLXJvdGF0ZSB7XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gIH1cXG59XFxuQGtleWZyYW1lcyBjb250YWluZXItcm90YXRlIHtcXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICB9XFxufVxcbi5zcGlubmVyLWxheWVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3BhY2l0eTogMDtcXG4gIGJvcmRlci1jb2xvcjogIzI2YTY5YTtcXG59XFxuLnNwaW5uZXItYmx1ZSxcXG4uc3Bpbm5lci1ibHVlLW9ubHkge1xcbiAgYm9yZGVyLWNvbG9yOiAjNDI4NWY0O1xcbn1cXG4uc3Bpbm5lci1yZWQsXFxuLnNwaW5uZXItcmVkLW9ubHkge1xcbiAgYm9yZGVyLWNvbG9yOiAjZGI0NDM3O1xcbn1cXG4uc3Bpbm5lci15ZWxsb3csXFxuLnNwaW5uZXIteWVsbG93LW9ubHkge1xcbiAgYm9yZGVyLWNvbG9yOiAjZjRiNDAwO1xcbn1cXG4uc3Bpbm5lci1ncmVlbixcXG4uc3Bpbm5lci1ncmVlbi1vbmx5IHtcXG4gIGJvcmRlci1jb2xvcjogIzBmOWQ1ODtcXG59XFxuLyoqXFxuICogSU1QT1JUQU5UIE5PVEUgQUJPVVQgQ1NTIEFOSU1BVElPTiBQUk9QRVJUSUVTIChrZWFudWxlZSk6XFxuICpcXG4gKiBpT1MgU2FmYXJpICh0ZXN0ZWQgb24gaU9TIDguMSkgZG9lcyBub3QgaGFuZGxlIGFuaW1hdGlvbi1kZWxheSB2ZXJ5IHdlbGwgLSBpdCBkb2Vzbid0XFxuICogZ3VhcmFudGVlIHRoYXQgdGhlIGFuaW1hdGlvbiB3aWxsIHN0YXJ0IF9leGFjdGx5XyBhZnRlciB0aGF0IHZhbHVlLiBTbyB3ZSBhdm9pZCB1c2luZ1xcbiAqIGFuaW1hdGlvbi1kZWxheSBhbmQgaW5zdGVhZCBzZXQgY3VzdG9tIGtleWZyYW1lcyBmb3IgZWFjaCBjb2xvciAoYXMgcmVkdW5kYW50IGFzIGl0XFxuICogc2VlbXMpLlxcbiAqXFxuICogV2Ugd3JpdGUgb3V0IGVhY2ggYW5pbWF0aW9uIGluIGZ1bGwgKGluc3RlYWQgb2Ygc2VwYXJhdGluZyBhbmltYXRpb24tbmFtZSxcXG4gKiBhbmltYXRpb24tZHVyYXRpb24sIGV0Yy4pIGJlY2F1c2UgdW5kZXIgdGhlIHBvbHlmaWxsLCBTYWZhcmkgZG9lcyBub3QgcmVjb2duaXplIHRob3NlXFxuICogc3BlY2lmaWMgcHJvcGVydGllcyBwcm9wZXJseSwgdHJlYXRzIHRoZW0gYXMgLXdlYmtpdC1hbmltYXRpb24sIGFuZCBvdmVycmlkZXMgdGhlXFxuICogb3RoZXIgYW5pbWF0aW9uIHJ1bGVzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1BvbHltZXIvcGxhdGZvcm0vaXNzdWVzLzUzLlxcbiAqL1xcbi5hY3RpdmUgLnNwaW5uZXItbGF5ZXIuc3Bpbm5lci1ibHVlIHtcXG4gIC8qIGR1cmF0aW9uczogNCAqIEFSQ1RJTUUgKi9cXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBmaWxsLXVuZmlsbC1yb3RhdGUgNTMzMm1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSkgaW5maW5pdGUgYm90aCwgYmx1ZS1mYWRlLWluLW91dCA1MzMybXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSBpbmZpbml0ZSBib3RoO1xcbiAgYW5pbWF0aW9uOiBmaWxsLXVuZmlsbC1yb3RhdGUgNTMzMm1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSkgaW5maW5pdGUgYm90aCwgYmx1ZS1mYWRlLWluLW91dCA1MzMybXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSBpbmZpbml0ZSBib3RoO1xcbn1cXG4uYWN0aXZlIC5zcGlubmVyLWxheWVyLnNwaW5uZXItcmVkIHtcXG4gIC8qIGR1cmF0aW9uczogNCAqIEFSQ1RJTUUgKi9cXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBmaWxsLXVuZmlsbC1yb3RhdGUgNTMzMm1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSkgaW5maW5pdGUgYm90aCwgcmVkLWZhZGUtaW4tb3V0IDUzMzJtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpIGluZmluaXRlIGJvdGg7XFxuICBhbmltYXRpb246IGZpbGwtdW5maWxsLXJvdGF0ZSA1MzMybXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSBpbmZpbml0ZSBib3RoLCByZWQtZmFkZS1pbi1vdXQgNTMzMm1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSkgaW5maW5pdGUgYm90aDtcXG59XFxuLmFjdGl2ZSAuc3Bpbm5lci1sYXllci5zcGlubmVyLXllbGxvdyB7XFxuICAvKiBkdXJhdGlvbnM6IDQgKiBBUkNUSU1FICovXFxuICAtd2Via2l0LWFuaW1hdGlvbjogZmlsbC11bmZpbGwtcm90YXRlIDUzMzJtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpIGluZmluaXRlIGJvdGgsIHllbGxvdy1mYWRlLWluLW91dCA1MzMybXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSBpbmZpbml0ZSBib3RoO1xcbiAgYW5pbWF0aW9uOiBmaWxsLXVuZmlsbC1yb3RhdGUgNTMzMm1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSkgaW5maW5pdGUgYm90aCwgeWVsbG93LWZhZGUtaW4tb3V0IDUzMzJtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpIGluZmluaXRlIGJvdGg7XFxufVxcbi5hY3RpdmUgLnNwaW5uZXItbGF5ZXIuc3Bpbm5lci1ncmVlbiB7XFxuICAvKiBkdXJhdGlvbnM6IDQgKiBBUkNUSU1FICovXFxuICAtd2Via2l0LWFuaW1hdGlvbjogZmlsbC11bmZpbGwtcm90YXRlIDUzMzJtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpIGluZmluaXRlIGJvdGgsIGdyZWVuLWZhZGUtaW4tb3V0IDUzMzJtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpIGluZmluaXRlIGJvdGg7XFxuICBhbmltYXRpb246IGZpbGwtdW5maWxsLXJvdGF0ZSA1MzMybXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSBpbmZpbml0ZSBib3RoLCBncmVlbi1mYWRlLWluLW91dCA1MzMybXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSBpbmZpbml0ZSBib3RoO1xcbn1cXG4uYWN0aXZlIC5zcGlubmVyLWxheWVyLFxcbi5hY3RpdmUgLnNwaW5uZXItbGF5ZXIuc3Bpbm5lci1ibHVlLW9ubHksXFxuLmFjdGl2ZSAuc3Bpbm5lci1sYXllci5zcGlubmVyLXJlZC1vbmx5LFxcbi5hY3RpdmUgLnNwaW5uZXItbGF5ZXIuc3Bpbm5lci15ZWxsb3ctb25seSxcXG4uYWN0aXZlIC5zcGlubmVyLWxheWVyLnNwaW5uZXItZ3JlZW4tb25seSB7XFxuICAvKiBkdXJhdGlvbnM6IDQgKiBBUkNUSU1FICovXFxuICBvcGFjaXR5OiAxO1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGZpbGwtdW5maWxsLXJvdGF0ZSA1MzMybXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSBpbmZpbml0ZSBib3RoO1xcbiAgYW5pbWF0aW9uOiBmaWxsLXVuZmlsbC1yb3RhdGUgNTMzMm1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSkgaW5maW5pdGUgYm90aDtcXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIGZpbGwtdW5maWxsLXJvdGF0ZSB7XFxuICAxMi41JSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTtcXG4gIH1cXG4gIC8qIDAuNSAqIEFSQ1NJWkUgKi9cXG4gIDI1JSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG4gIH1cXG4gIC8qIDEgICAqIEFSQ1NJWkUgKi9cXG4gIDM3LjUlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0MDVkZWcpO1xcbiAgfVxcbiAgLyogMS41ICogQVJDU0laRSAqL1xcbiAgNTAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg1NDBkZWcpO1xcbiAgfVxcbiAgLyogMiAgICogQVJDU0laRSAqL1xcbiAgNjIuNSUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDY3NWRlZyk7XFxuICB9XFxuICAvKiAyLjUgKiBBUkNTSVpFICovXFxuICA3NSUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDgxMGRlZyk7XFxuICB9XFxuICAvKiAzICAgKiBBUkNTSVpFICovXFxuICA4Ny41JSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoOTQ1ZGVnKTtcXG4gIH1cXG4gIC8qIDMuNSAqIEFSQ1NJWkUgKi9cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMDgwZGVnKTtcXG4gIH1cXG4gIC8qIDQgICAqIEFSQ1NJWkUgKi9cXG59XFxuQGtleWZyYW1lcyBmaWxsLXVuZmlsbC1yb3RhdGUge1xcbiAgMTIuNSUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTM1ZGVnKTtcXG4gIH1cXG4gIC8qIDAuNSAqIEFSQ1NJWkUgKi9cXG4gIDI1JSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgfVxcbiAgLyogMSAgICogQVJDU0laRSAqL1xcbiAgMzcuNSUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQwNWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDA1ZGVnKTtcXG4gIH1cXG4gIC8qIDEuNSAqIEFSQ1NJWkUgKi9cXG4gIDUwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNTQwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg1NDBkZWcpO1xcbiAgfVxcbiAgLyogMiAgICogQVJDU0laRSAqL1xcbiAgNjIuNSUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDY3NWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNjc1ZGVnKTtcXG4gIH1cXG4gIC8qIDIuNSAqIEFSQ1NJWkUgKi9cXG4gIDc1JSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoODEwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg4MTBkZWcpO1xcbiAgfVxcbiAgLyogMyAgICogQVJDU0laRSAqL1xcbiAgODcuNSUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDk0NWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTQ1ZGVnKTtcXG4gIH1cXG4gIC8qIDMuNSAqIEFSQ1NJWkUgKi9cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMDgwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxMDgwZGVnKTtcXG4gIH1cXG4gIC8qIDQgICAqIEFSQ1NJWkUgKi9cXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIGJsdWUtZmFkZS1pbi1vdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAyNSUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMjYlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIDg5JSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxuICA5MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgYmx1ZS1mYWRlLWluLW91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDI1JSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAyNiUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgfVxcbiAgODklIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIDkwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIHJlZC1mYWRlLWluLW91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIDE1JSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxuICAyNSUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgNTAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDUxJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgcmVkLWZhZGUtaW4tb3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgfVxcbiAgMTUlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIDI1JSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICA1MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgNTElIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIHllbGxvdy1mYWRlLWluLW91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIDQwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxuICA1MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgNzUlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDc2JSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgeWVsbG93LWZhZGUtaW4tb3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgfVxcbiAgNDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICA3NSUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgNzYlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIGdyZWVuLWZhZGUtaW4tb3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgfVxcbiAgNjUlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIDc1JSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICA5MCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgZ3JlZW4tZmFkZS1pbi1vdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxuICA2NSUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgfVxcbiAgNzUlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDkwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG59XFxuLyoqXFxuICogUGF0Y2ggdGhlIGdhcCB0aGF0IGFwcGVhciBiZXR3ZWVuIHRoZSB0d28gYWRqYWNlbnQgZGl2LmNpcmNsZS1jbGlwcGVyIHdoaWxlIHRoZVxcbiAqIHNwaW5uZXIgaXMgcm90YXRpbmcgKGFwcGVhcnMgb24gQ2hyb21lIDM4LCBTYWZhcmkgNy4xLCBhbmQgSUUgMTEpLlxcbiAqL1xcbi5nYXAtcGF0Y2gge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogNDUlO1xcbiAgd2lkdGg6IDEwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBib3JkZXItY29sb3I6IGluaGVyaXQ7XFxufVxcbi5nYXAtcGF0Y2ggLmNpcmNsZSB7XFxuICB3aWR0aDogMTAwMCU7XFxuICBsZWZ0OiAtNDUwJTtcXG59XFxuLmNpcmNsZS1jbGlwcGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiA1MCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xcbn1cXG4uY2lyY2xlLWNsaXBwZXIgLmNpcmNsZSB7XFxuICB3aWR0aDogMjAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJvcmRlci13aWR0aDogM3B4O1xcbiAgLyogU1RST0tFV0lEVEggKi9cXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItY29sb3I6IGluaGVyaXQ7XFxuICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgLXdlYmtpdC1hbmltYXRpb246IG5vbmU7XFxuICBhbmltYXRpb246IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG59XFxuLmNpcmNsZS1jbGlwcGVyLmxlZnQgLmNpcmNsZSB7XFxuICBsZWZ0OiAwO1xcbiAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMjlkZWcpO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTI5ZGVnKTtcXG59XFxuLmNpcmNsZS1jbGlwcGVyLnJpZ2h0IC5jaXJjbGUge1xcbiAgbGVmdDogLTEwMCU7XFxuICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTEyOWRlZyk7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTI5ZGVnKTtcXG59XFxuLmFjdGl2ZSAuY2lyY2xlLWNsaXBwZXIubGVmdCAuY2lyY2xlIHtcXG4gIC8qIGR1cmF0aW9uOiBBUkNUSU1FICovXFxuICAtd2Via2l0LWFuaW1hdGlvbjogbGVmdC1zcGluIDEzMzNtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpIGluZmluaXRlIGJvdGg7XFxuICBhbmltYXRpb246IGxlZnQtc3BpbiAxMzMzbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSBpbmZpbml0ZSBib3RoO1xcbn1cXG4uYWN0aXZlIC5jaXJjbGUtY2xpcHBlci5yaWdodCAuY2lyY2xlIHtcXG4gIC8qIGR1cmF0aW9uOiBBUkNUSU1FICovXFxuICAtd2Via2l0LWFuaW1hdGlvbjogcmlnaHQtc3BpbiAxMzMzbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSBpbmZpbml0ZSBib3RoO1xcbiAgYW5pbWF0aW9uOiByaWdodC1zcGluIDEzMzNtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpIGluZmluaXRlIGJvdGg7XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyBsZWZ0LXNwaW4ge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTMwZGVnKTtcXG4gIH1cXG4gIDUwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTVkZWcpO1xcbiAgfVxcbiAgdG8ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDEzMGRlZyk7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgbGVmdC1zcGluIHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDEzMGRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTMwZGVnKTtcXG4gIH1cXG4gIDUwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTVkZWcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC01ZGVnKTtcXG4gIH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMzBkZWcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEzMGRlZyk7XFxuICB9XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyByaWdodC1zcGluIHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0xMzBkZWcpO1xcbiAgfVxcbiAgNTAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg1ZGVnKTtcXG4gIH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMTMwZGVnKTtcXG4gIH1cXG59XFxuQGtleWZyYW1lcyByaWdodC1zcGluIHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0xMzBkZWcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0xMzBkZWcpO1xcbiAgfVxcbiAgNTAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg1ZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg1ZGVnKTtcXG4gIH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMTMwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTMwZGVnKTtcXG4gIH1cXG59XFxuI3NwaW5uZXJDb250YWluZXIuY29vbGRvd24ge1xcbiAgLyogZHVyYXRpb246IFNIUklOS19USU1FICovXFxuICAtd2Via2l0LWFuaW1hdGlvbjogY29udGFpbmVyLXJvdGF0ZSAxNTY4bXMgbGluZWFyIGluZmluaXRlLCBmYWRlLW91dCA0MDBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgYW5pbWF0aW9uOiBjb250YWluZXItcm90YXRlIDE1NjhtcyBsaW5lYXIgaW5maW5pdGUsIGZhZGUtb3V0IDQwMG1zIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyBmYWRlLW91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG59XFxuQGtleWZyYW1lcyBmYWRlLW91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG59XFxuLnNsaWRlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5zbGlkZXIuZnVsbHNjcmVlbiB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG59XFxuLnNsaWRlci5mdWxsc2NyZWVuIHVsLnNsaWRlcyB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcbi5zbGlkZXIuZnVsbHNjcmVlbiB1bC5pbmRpY2F0b3JzIHtcXG4gIHotaW5kZXg6IDI7XFxuICBib3R0b206IDMwcHg7XFxufVxcbi5zbGlkZXIgLnNsaWRlcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWU5ZTllO1xcbiAgbWFyZ2luOiAwO1xcbiAgaGVpZ2h0OiA0MDBweDtcXG59XFxuLnNsaWRlciAuc2xpZGVzIGxpIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogMTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLnNsaWRlciAuc2xpZGVzIGxpIGltZyB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcbi5zbGlkZXIgLnNsaWRlcyBsaSAuY2FwdGlvbiB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMTUlO1xcbiAgbGVmdDogMTUlO1xcbiAgd2lkdGg6IDcwJTtcXG4gIG9wYWNpdHk6IDA7XFxufVxcbi5zbGlkZXIgLnNsaWRlcyBsaSAuY2FwdGlvbiBwIHtcXG4gIGNvbG9yOiAjZTBlMGUwO1xcbn1cXG4uc2xpZGVyIC5zbGlkZXMgbGkuYWN0aXZlIHtcXG4gIHotaW5kZXg6IDI7XFxufVxcbi5zbGlkZXIgLmluZGljYXRvcnMge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG4uc2xpZGVyIC5pbmRpY2F0b3JzIC5pbmRpY2F0b3ItaXRlbSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBoZWlnaHQ6IDE2cHg7XFxuICB3aWR0aDogMTZweDtcXG4gIG1hcmdpbjogMCAxMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBlMDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuM3M7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4zcztcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLnNsaWRlciAuaW5kaWNhdG9ycyAuaW5kaWNhdG9yLWl0ZW0uYWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XFxufVxcbi5jYXJvdXNlbCB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgLXdlYmtpdC1wZXJzcGVjdGl2ZTogNTAwcHg7XFxuICAgICAgICAgIHBlcnNwZWN0aXZlOiA1MDBweDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgICAgICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMCUgNTAlO1xcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwJSA1MCU7XFxufVxcbi5jYXJvdXNlbC5jYXJvdXNlbC1zbGlkZXIge1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuLmNhcm91c2VsLmNhcm91c2VsLXNsaWRlciAuY2Fyb3VzZWwtZml4ZWQtaXRlbSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDIwcHg7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4uY2Fyb3VzZWwuY2Fyb3VzZWwtc2xpZGVyIC5jYXJvdXNlbC1maXhlZC1pdGVtLndpdGgtaW5kaWNhdG9ycyB7XFxuICBib3R0b206IDY4cHg7XFxufVxcbi5jYXJvdXNlbC5jYXJvdXNlbC1zbGlkZXIgLmNhcm91c2VsLWl0ZW0ge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtaW4taGVpZ2h0OiA0MDBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxufVxcbi5jYXJvdXNlbC5jYXJvdXNlbC1zbGlkZXIgLmNhcm91c2VsLWl0ZW0gaDIge1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxpbmUtaGVpZ2h0OiAzMnB4O1xcbn1cXG4uY2Fyb3VzZWwuY2Fyb3VzZWwtc2xpZGVyIC5jYXJvdXNlbC1pdGVtIHAge1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbn1cXG4uY2Fyb3VzZWwgLmNhcm91c2VsLWl0ZW0ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgaGVpZ2h0OiAyMDBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxufVxcbi5jYXJvdXNlbCAuY2Fyb3VzZWwtaXRlbSA+IGltZyB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmNhcm91c2VsIC5pbmRpY2F0b3JzIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIG1hcmdpbjogMDtcXG59XFxuLmNhcm91c2VsIC5pbmRpY2F0b3JzIC5pbmRpY2F0b3ItaXRlbSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBoZWlnaHQ6IDhweDtcXG4gIHdpZHRoOiA4cHg7XFxuICBtYXJnaW46IDI0cHggNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4zcztcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjNzO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG4uY2Fyb3VzZWwgLmluZGljYXRvcnMgLmluZGljYXRvci1pdGVtLmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4uY2Fyb3VzZWwuc2Nyb2xsaW5nIC5jYXJvdXNlbC1pdGVtIC5tYXRlcmlhbGJveGVkLFxcbi5jYXJvdXNlbCAuY2Fyb3VzZWwtaXRlbTpub3QoLmFjdGl2ZSkgLm1hdGVyaWFsYm94ZWQge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi50YXAtdGFyZ2V0LXdyYXBwZXIge1xcbiAgd2lkdGg6IDgwMHB4O1xcbiAgaGVpZ2h0OiA4MDBweDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDEwMDA7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAtd2Via2l0LXRyYW5zaXRpb246IHZpc2liaWxpdHkgMHMgLjNzO1xcbiAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAwcyAuM3M7XFxufVxcbi50YXAtdGFyZ2V0LXdyYXBwZXIub3BlbiB7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiB2aXNpYmlsaXR5IDBzO1xcbiAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAwcztcXG59XFxuLnRhcC10YXJnZXQtd3JhcHBlci5vcGVuIC50YXAtdGFyZ2V0IHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gIG9wYWNpdHk6IC45NTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGN1YmljLWJlemllcigwLjQyLCAwLCAwLjU4LCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40MiwgMCwgMC41OCwgMSk7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNDIsIDAsIDAuNTgsIDEpLCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjQyLCAwLCAwLjU4LCAxKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjQyLCAwLCAwLjU4LCAxKSwgb3BhY2l0eSAwLjNzIGN1YmljLWJlemllcigwLjQyLCAwLCAwLjU4LCAxKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjQyLCAwLCAwLjU4LCAxKSwgb3BhY2l0eSAwLjNzIGN1YmljLWJlemllcigwLjQyLCAwLCAwLjU4LCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC40MiwgMCwgMC41OCwgMSk7XFxufVxcbi50YXAtdGFyZ2V0LXdyYXBwZXIub3BlbiAudGFwLXRhcmdldC13YXZlOjpiZWZvcmUge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbn1cXG4udGFwLXRhcmdldC13cmFwcGVyLm9wZW4gLnRhcC10YXJnZXQtd2F2ZTo6YWZ0ZXIge1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBwdWxzZS1hbmltYXRpb24gMXMgY3ViaWMtYmV6aWVyKDAuMjQsIDAsIDAuMzgsIDEpIGluZmluaXRlO1xcbiAgICAgICAgICBhbmltYXRpb246IHB1bHNlLWFuaW1hdGlvbiAxcyBjdWJpYy1iZXppZXIoMC4yNCwgMCwgMC4zOCwgMSkgaW5maW5pdGU7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgLjNzLCB2aXNpYmlsaXR5IDBzIDFzLCAtd2Via2l0LXRyYW5zZm9ybSAuM3M7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4zcywgdmlzaWJpbGl0eSAwcyAxcywgLXdlYmtpdC10cmFuc2Zvcm0gLjNzO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuM3MsIHRyYW5zZm9ybSAuM3MsIHZpc2liaWxpdHkgMHMgMXM7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4zcywgdHJhbnNmb3JtIC4zcywgdmlzaWJpbGl0eSAwcyAxcywgLXdlYmtpdC10cmFuc2Zvcm0gLjNzO1xcbn1cXG4udGFwLXRhcmdldCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWU2ZTczO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDIwcHggMjBweCAwIHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgMTBweCA1MHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAzMHB4IDEwcHggLTIwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDIwcHggMjBweCAwIHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgMTBweCA1MHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAzMHB4IDEwcHggLTIwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBvcGFjaXR5OiAwO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNDIsIDAsIDAuNTgsIDEpLCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjQyLCAwLCAwLjU4LCAxKTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBjdWJpYy1iZXppZXIoMC40MiwgMCwgMC41OCwgMSksIC13ZWJraXQtdHJhbnNmb3JtIDAuM3MgY3ViaWMtYmV6aWVyKDAuNDIsIDAsIDAuNTgsIDEpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgY3ViaWMtYmV6aWVyKDAuNDIsIDAsIDAuNTgsIDEpLCBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNDIsIDAsIDAuNTgsIDEpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgY3ViaWMtYmV6aWVyKDAuNDIsIDAsIDAuNTgsIDEpLCBvcGFjaXR5IDAuM3MgY3ViaWMtYmV6aWVyKDAuNDIsIDAsIDAuNTgsIDEpLCAtd2Via2l0LXRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjQyLCAwLCAwLjU4LCAxKTtcXG59XFxuLnRhcC10YXJnZXQtY29udGVudCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbn1cXG4udGFwLXRhcmdldC13YXZlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHotaW5kZXg6IDEwMDAxO1xcbn1cXG4udGFwLXRhcmdldC13YXZlOjpiZWZvcmUsIC50YXAtdGFyZ2V0LXdhdmU6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxufVxcbi50YXAtdGFyZ2V0LXdhdmU6OmJlZm9yZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIC4zcztcXG4gIHRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIC4zcztcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuM3M7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjNzLCAtd2Via2l0LXRyYW5zZm9ybSAuM3M7XFxufVxcbi50YXAtdGFyZ2V0LXdhdmU6OmFmdGVyIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAuM3MsIHZpc2liaWxpdHkgMHMsIC13ZWJraXQtdHJhbnNmb3JtIC4zcztcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjNzLCB2aXNpYmlsaXR5IDBzLCAtd2Via2l0LXRyYW5zZm9ybSAuM3M7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4zcywgdHJhbnNmb3JtIC4zcywgdmlzaWJpbGl0eSAwcztcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjNzLCB0cmFuc2Zvcm0gLjNzLCB2aXNpYmlsaXR5IDBzLCAtd2Via2l0LXRyYW5zZm9ybSAuM3M7XFxuICB6LWluZGV4OiAtMTtcXG59XFxuLnRhcC10YXJnZXQtb3JpZ2luIHtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICB6LWluZGV4OiAxMDAwMjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xcbn1cXG4udGFwLXRhcmdldC1vcmlnaW46bm90KC5idG4pOm5vdCguYnRuLWxhcmdlKTpub3QoLmJ0bi1zbWFsbCksIC50YXAtdGFyZ2V0LW9yaWdpbjpub3QoLmJ0bik6bm90KC5idG4tbGFyZ2UpOm5vdCguYnRuLXNtYWxsKTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbn1cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAudGFwLXRhcmdldCwgLnRhcC10YXJnZXQtd3JhcHBlciB7XFxuICAgIHdpZHRoOiA2MDBweDtcXG4gICAgaGVpZ2h0OiA2MDBweDtcXG4gIH1cXG59XFxuLnB1bHNlIHtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4ucHVsc2U6OmJlZm9yZSB7XFxuICBjb250ZW50OiAnJztcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcXG4gIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgLjNzLCAtd2Via2l0LXRyYW5zZm9ybSAuM3M7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4zcywgLXdlYmtpdC10cmFuc2Zvcm0gLjNzO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuM3MsIHRyYW5zZm9ybSAuM3M7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4zcywgdHJhbnNmb3JtIC4zcywgLXdlYmtpdC10cmFuc2Zvcm0gLjNzO1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHB1bHNlLWFuaW1hdGlvbiAxcyBjdWJpYy1iZXppZXIoMC4yNCwgMCwgMC4zOCwgMSkgaW5maW5pdGU7XFxuICAgICAgICAgIGFuaW1hdGlvbjogcHVsc2UtYW5pbWF0aW9uIDFzIGN1YmljLWJlemllcigwLjI0LCAwLCAwLjM4LCAxKSBpbmZpbml0ZTtcXG4gIHotaW5kZXg6IC0xO1xcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgcHVsc2UtYW5pbWF0aW9uIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICB9XFxuICA1MCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbiAgfVxcbn1cXG5Aa2V5ZnJhbWVzIHB1bHNlLWFuaW1hdGlvbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgfVxcbiAgNTAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG4gIH1cXG59XFxuLyogTW9kYWwgKi9cXG4uZGF0ZXBpY2tlci1tb2RhbCB7XFxuICBtYXgtd2lkdGg6IDMyNXB4O1xcbiAgbWluLXdpZHRoOiAzMDBweDtcXG4gIG1heC1oZWlnaHQ6IG5vbmU7XFxufVxcbi5kYXRlcGlja2VyLWNvbnRhaW5lci5tb2RhbC1jb250ZW50IHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcGFkZGluZzogMDtcXG59XFxuLmRhdGVwaWNrZXItY29udHJvbHMge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHdpZHRoOiAyODBweDtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbn1cXG4uZGF0ZXBpY2tlci1jb250cm9scyAuc2VsZWN0cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5kYXRlcGlja2VyLWNvbnRyb2xzIC5zZWxlY3Qtd3JhcHBlciBpbnB1dCB7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG4uZGF0ZXBpY2tlci1jb250cm9scyAuc2VsZWN0LXdyYXBwZXIgaW5wdXQ6Zm9jdXMge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG59XFxuLmRhdGVwaWNrZXItY29udHJvbHMgLnNlbGVjdC13cmFwcGVyIC5jYXJldCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4uZGF0ZXBpY2tlci1jb250cm9scyAuc2VsZWN0LXllYXIgaW5wdXQge1xcbiAgd2lkdGg6IDUwcHg7XFxufVxcbi5kYXRlcGlja2VyLWNvbnRyb2xzIC5zZWxlY3QtbW9udGggaW5wdXQge1xcbiAgd2lkdGg6IDcwcHg7XFxufVxcbi5tb250aC1wcmV2LCAubW9udGgtbmV4dCB7XFxuICBtYXJnaW4tdG9wOiA0cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuLyogRGF0ZSBEaXNwbGF5ICovXFxuLmRhdGVwaWNrZXItZGF0ZS1kaXNwbGF5IHtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgICAgLW1zLWZsZXg6IDEgYXV0bztcXG4gICAgICAgICAgZmxleDogMSBhdXRvO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogMjBweCAyMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuLmRhdGVwaWNrZXItZGF0ZS1kaXNwbGF5IC55ZWFyLXRleHQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAyNXB4O1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcXG59XFxuLmRhdGVwaWNrZXItZGF0ZS1kaXNwbGF5IC5kYXRlLXRleHQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXNpemU6IDIuOHJlbTtcXG4gIGxpbmUtaGVpZ2h0OiA0N3B4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuLyogQ2FsZW5kYXIgKi9cXG4uZGF0ZXBpY2tlci1jYWxlbmRhci1jb250YWluZXIge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMi41O1xcbiAgICAgIC1tcy1mbGV4OiAyLjUgYXV0bztcXG4gICAgICAgICAgZmxleDogMi41IGF1dG87XFxufVxcbi5kYXRlcGlja2VyLXRhYmxlIHtcXG4gIHdpZHRoOiAyODBweDtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbn1cXG4uZGF0ZXBpY2tlci10YWJsZSB0aGVhZCB7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbn1cXG4uZGF0ZXBpY2tlci10YWJsZSB0aCB7XFxuICBwYWRkaW5nOiAxMHB4IDVweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLmRhdGVwaWNrZXItdGFibGUgdHIge1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG4uZGF0ZXBpY2tlci10YWJsZSBhYmJyIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiAjOTk5O1xcbn1cXG4uZGF0ZXBpY2tlci10YWJsZSB0ZCB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG4uZGF0ZXBpY2tlci10YWJsZSB0ZC5pcy10b2RheSB7XFxuICBjb2xvcjogIzI2YTY5YTtcXG59XFxuLmRhdGVwaWNrZXItdGFibGUgdGQuaXMtc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcXG4gIGNvbG9yOiAjZmZmO1xcbn1cXG4uZGF0ZXBpY2tlci10YWJsZSB0ZC5pcy1vdXRzaWRlLWN1cnJlbnQtbW9udGgsIC5kYXRlcGlja2VyLXRhYmxlIHRkLmlzLWRpc2FibGVkIHtcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuLmRhdGVwaWNrZXItZGF5LWJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGxpbmUtaGVpZ2h0OiAzOHB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHBhZGRpbmc6IDAgNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcbi5kYXRlcGlja2VyLWRheS1idXR0b246Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MywgMTYxLCAxNTAsIDAuMjUpO1xcbn1cXG4vKiBGb290ZXIgKi9cXG4uZGF0ZXBpY2tlci1mb290ZXIge1xcbiAgd2lkdGg6IDI4MHB4O1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuLmRhdGVwaWNrZXItY2FuY2VsLFxcbi5kYXRlcGlja2VyLWNsZWFyLFxcbi5kYXRlcGlja2VyLXRvZGF5LFxcbi5kYXRlcGlja2VyLWRvbmUge1xcbiAgY29sb3I6ICMyNmE2OWE7XFxuICBwYWRkaW5nOiAwIDFyZW07XFxufVxcbi5kYXRlcGlja2VyLWNsZWFyIHtcXG4gIGNvbG9yOiAjRjQ0MzM2O1xcbn1cXG4vKiBNZWRpYSBRdWVyaWVzICovXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDFweCkge1xcbiAgLmRhdGVwaWNrZXItbW9kYWwge1xcbiAgICBtYXgtd2lkdGg6IDYyNXB4O1xcbiAgfVxcbiAgLmRhdGVwaWNrZXItY29udGFpbmVyLm1vZGFsLWNvbnRlbnQge1xcbiAgICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XFxuICAgIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIH1cXG4gIC5kYXRlcGlja2VyLWNvbnRyb2xzLFxcbiAgLmRhdGVwaWNrZXItdGFibGUsXFxuICAuZGF0ZXBpY2tlci1mb290ZXIge1xcbiAgICB3aWR0aDogMzIwcHg7XFxuICB9XFxuICAuZGF0ZXBpY2tlci1kYXktYnV0dG9uIHtcXG4gICAgbGluZS1oZWlnaHQ6IDQ0cHg7XFxuICB9XFxufVxcbi8qIFRpbWVwaWNrZXIgQ29udGFpbmVycyAqL1xcbi50aW1lcGlja2VyLW1vZGFsIHtcXG4gIG1heC13aWR0aDogMzI1cHg7XFxuICBtYXgtaGVpZ2h0OiBub25lO1xcbn1cXG4udGltZXBpY2tlci1jb250YWluZXIubW9kYWwtY29udGVudCB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBhZGRpbmc6IDA7XFxufVxcbi50ZXh0LXByaW1hcnkge1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4vKiBDbG9jayBEaWdpdGFsIERpc3BsYXkgKi9cXG4udGltZXBpY2tlci1kaWdpdGFsLWRpc3BsYXkge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAtbXMtZmxleDogMSBhdXRvO1xcbiAgICAgICAgICBmbGV4OiAxIGF1dG87XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjZhNjlhO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcbi50aW1lcGlja2VyLXRleHQtY29udGFpbmVyIHtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4udGltZXBpY2tlci1zcGFuLWhvdXJzLFxcbi50aW1lcGlja2VyLXNwYW4tbWludXRlcyxcXG4udGltZXBpY2tlci1zcGFuLWFtLXBtIGRpdiB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi50aW1lcGlja2VyLXNwYW4taG91cnMge1xcbiAgbWFyZ2luLXJpZ2h0OiAzcHg7XFxufVxcbi50aW1lcGlja2VyLXNwYW4tbWludXRlcyB7XFxuICBtYXJnaW4tbGVmdDogM3B4O1xcbn1cXG4udGltZXBpY2tlci1kaXNwbGF5LWFtLXBtIHtcXG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDFyZW07XFxuICBib3R0b206IDFyZW07XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG4vKiBBbmFsb2cgQ2xvY2sgRGlzcGxheSAqL1xcbi50aW1lcGlja2VyLWFuYWxvZy1kaXNwbGF5IHtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDIuNTtcXG4gICAgICAtbXMtZmxleDogMi41IGF1dG87XFxuICAgICAgICAgIGZsZXg6IDIuNSBhdXRvO1xcbn1cXG4udGltZXBpY2tlci1wbGF0ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgd2lkdGg6IDI3MHB4O1xcbiAgaGVpZ2h0OiAyNzBweDtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMjVweDtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi50aW1lcGlja2VyLWNhbnZhcyxcXG4udGltZXBpY2tlci1kaWFsIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG59XFxuLnRpbWVwaWNrZXItbWludXRlcyB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcbi50aW1lcGlja2VyLXRpY2sge1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44Nyk7XFxuICBsaW5lLWhlaWdodDogNDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdpZHRoOiA0MHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbn1cXG4udGltZXBpY2tlci10aWNrLmFjdGl2ZSxcXG4udGltZXBpY2tlci10aWNrOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzgsIDE2NiwgMTU0LCAwLjI1KTtcXG59XFxuLnRpbWVwaWNrZXItZGlhbCB7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMzUwbXMsIC13ZWJraXQtdHJhbnNmb3JtIDM1MG1zO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAzNTBtcywgLXdlYmtpdC10cmFuc2Zvcm0gMzUwbXM7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMzUwbXMsIG9wYWNpdHkgMzUwbXM7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMzUwbXMsIG9wYWNpdHkgMzUwbXMsIC13ZWJraXQtdHJhbnNmb3JtIDM1MG1zO1xcbn1cXG4udGltZXBpY2tlci1kaWFsLW91dCB7XFxuICBvcGFjaXR5OiAwO1xcbn1cXG4udGltZXBpY2tlci1kaWFsLW91dC50aW1lcGlja2VyLWhvdXJzIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEsIDEuMSk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xLCAxLjEpO1xcbn1cXG4udGltZXBpY2tlci1kaWFsLW91dC50aW1lcGlja2VyLW1pbnV0ZXMge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuOCwgMC44KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjgsIDAuOCk7XFxufVxcbi50aW1lcGlja2VyLWNhbnZhcyB7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMTc1bXM7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDE3NW1zO1xcbn1cXG4udGltZXBpY2tlci1jYW52YXMgbGluZSB7XFxuICBzdHJva2U6ICMyNmE2OWE7XFxuICBzdHJva2Utd2lkdGg6IDQ7XFxuICBzdHJva2UtbGluZWNhcDogcm91bmQ7XFxufVxcbi50aW1lcGlja2VyLWNhbnZhcy1vdXQge1xcbiAgb3BhY2l0eTogMC4yNTtcXG59XFxuLnRpbWVwaWNrZXItY2FudmFzLWJlYXJpbmcge1xcbiAgc3Ryb2tlOiBub25lO1xcbiAgZmlsbDogIzI2YTY5YTtcXG59XFxuLnRpbWVwaWNrZXItY2FudmFzLWJnIHtcXG4gIHN0cm9rZTogbm9uZTtcXG4gIGZpbGw6ICMyNmE2OWE7XFxufVxcbi8qIEZvb3RlciAqL1xcbi50aW1lcGlja2VyLWZvb3RlciB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDVweCAxcmVtO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuLnRpbWVwaWNrZXItY2xlYXIge1xcbiAgY29sb3I6ICNGNDQzMzY7XFxufVxcbi50aW1lcGlja2VyLWNsb3NlIHtcXG4gIGNvbG9yOiAjMjZhNjlhO1xcbn1cXG4udGltZXBpY2tlci1jbGVhcixcXG4udGltZXBpY2tlci1jbG9zZSB7XFxuICBwYWRkaW5nOiAwIDIwcHg7XFxufVxcbi8qIE1lZGlhIFF1ZXJpZXMgKi9cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMXB4KSB7XFxuICAudGltZXBpY2tlci1tb2RhbCB7XFxuICAgIG1heC13aWR0aDogNjAwcHg7XFxuICB9XFxuICAudGltZXBpY2tlci1jb250YWluZXIubW9kYWwtY29udGVudCB7XFxuICAgIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gICAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgfVxcbiAgLnRpbWVwaWNrZXItdGV4dC1jb250YWluZXIge1xcbiAgICB0b3A6IDMyJTtcXG4gIH1cXG4gIC50aW1lcGlja2VyLWRpc3BsYXktYW0tcG0ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgICBib3R0b206IGF1dG87XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMS4ycmVtO1xcbiAgfVxcbn1cXG5cIlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjbGllbnQvc3R5bGVzL21hdGVyaWFsaXplLmNzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSEE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQTs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2JBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNIQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqQ0E7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBOzs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RCQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqQ0E7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQkE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7QUNBQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBOzs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4QkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDajhDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTs7Ozs7O0FDQUE7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFHQTtBQUFBOztBQUZBO0FBSUE7QUFKQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBRUE7QUFGQTtBQUVBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBSUE7QUFKQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekNBOzs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3ZHQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBOzs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25SQTs7O0EiLCJzb3VyY2VSb290IjoiIn0=
            return { page: comp.default }
          })
        