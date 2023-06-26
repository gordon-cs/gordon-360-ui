import {
  __assign
} from "./chunk-5JOWXMF6.js";
import {
  _inheritsLoose
} from "./chunk-ORMIY5SP.js";
import {
  _assertThisInitialized
} from "./chunk-LQHJAPLN.js";
import {
  _objectWithoutPropertiesLoose,
  init_objectWithoutPropertiesLoose
} from "./chunk-AFJ2BAUY.js";
import {
  require_prop_types
} from "./chunk-OGQOAQW5.js";
import {
  _extends,
  init_extends
} from "./chunk-BP2LF4M5.js";
import {
  require_react
} from "./chunk-LFTCFPAG.js";
import "./chunk-2W4G54A4.js";
import {
  __commonJS,
  __toESM
} from "./chunk-LFBQMW2U.js";

// node_modules/downshift/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/downshift/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef2(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef2;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/downshift/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/downshift/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/downshift/dist/downshift.esm.js
init_objectWithoutPropertiesLoose();
init_extends();
var import_prop_types = __toESM(require_prop_types());
var import_react = __toESM(require_react());
var import_react_is = __toESM(require_react_is());

// node_modules/compute-scroll-into-view/dist/index.js
var e = (e2) => "object" == typeof e2 && null != e2 && 1 === e2.nodeType;
var t = (e2, t2) => (!t2 || "hidden" !== e2) && ("visible" !== e2 && "clip" !== e2);
var n = (e2, n2) => {
  if (e2.clientHeight < e2.scrollHeight || e2.clientWidth < e2.scrollWidth) {
    let l2 = getComputedStyle(e2, null);
    return t(l2.overflowY, n2) || t(l2.overflowX, n2) || ((e3) => {
      let t2 = ((e4) => {
        if (!e4.ownerDocument || !e4.ownerDocument.defaultView)
          return null;
        try {
          return e4.ownerDocument.defaultView.frameElement;
        } catch (e5) {
          return null;
        }
      })(e3);
      return !!t2 && (t2.clientHeight < e3.scrollHeight || t2.clientWidth < e3.scrollWidth);
    })(e2);
  }
  return false;
};
var l = (e2, t2, n2, l2, i2, o2, r, d) => o2 < e2 && r > t2 || o2 > e2 && r < t2 ? 0 : o2 <= e2 && d <= n2 || r >= t2 && d >= n2 ? o2 - e2 - l2 : r > t2 && d < n2 || o2 < e2 && d > n2 ? r - t2 + i2 : 0;
var i = (e2) => {
  let t2 = e2.parentElement;
  return null == t2 ? e2.getRootNode().host || null : t2;
};
var o = (t2, o2) => {
  var r, d, h, f, u, s;
  if ("undefined" == typeof document)
    return [];
  let { scrollMode: a, block: c, inline: g, boundary: m, skipOverflowHiddenElements: p } = o2, w = "function" == typeof m ? m : (e2) => e2 !== m;
  if (!e(t2))
    throw new TypeError("Invalid target");
  let W = document.scrollingElement || document.documentElement, H = [], b = t2;
  for (; e(b) && w(b); ) {
    if (b = i(b), b === W) {
      H.push(b);
      break;
    }
    null != b && b === document.body && n(b) && !n(document.documentElement) || null != b && n(b, p) && H.push(b);
  }
  let v = null != (d = null == (r = window.visualViewport) ? void 0 : r.width) ? d : innerWidth, y = null != (f = null == (h = window.visualViewport) ? void 0 : h.height) ? f : innerHeight, E = null != (u = window.scrollX) ? u : pageXOffset, M = null != (s = window.scrollY) ? s : pageYOffset, { height: x, width: I, top: C, right: R, bottom: T, left: V } = t2.getBoundingClientRect(), k = "start" === c || "nearest" === c ? C : "end" === c ? T : C + x / 2, B = "center" === g ? V + I / 2 : "end" === g ? R : V, D = [];
  for (let e2 = 0; e2 < H.length; e2++) {
    let t3 = H[e2], { height: n2, width: i2, top: o3, right: r2, bottom: d2, left: h2 } = t3.getBoundingClientRect();
    if ("if-needed" === a && C >= 0 && V >= 0 && T <= y && R <= v && C >= o3 && T <= d2 && V >= h2 && R <= r2)
      return D;
    let f2 = getComputedStyle(t3), u2 = parseInt(f2.borderLeftWidth, 10), s2 = parseInt(f2.borderTopWidth, 10), m2 = parseInt(f2.borderRightWidth, 10), p2 = parseInt(f2.borderBottomWidth, 10), w2 = 0, b2 = 0, O = "offsetWidth" in t3 ? t3.offsetWidth - t3.clientWidth - u2 - m2 : 0, X = "offsetHeight" in t3 ? t3.offsetHeight - t3.clientHeight - s2 - p2 : 0, Y = "offsetWidth" in t3 ? 0 === t3.offsetWidth ? 0 : i2 / t3.offsetWidth : 0, L = "offsetHeight" in t3 ? 0 === t3.offsetHeight ? 0 : n2 / t3.offsetHeight : 0;
    if (W === t3)
      w2 = "start" === c ? k : "end" === c ? k - y : "nearest" === c ? l(M, M + y, y, s2, p2, M + k, M + k + x, x) : k - y / 2, b2 = "start" === g ? B : "center" === g ? B - v / 2 : "end" === g ? B - v : l(E, E + v, v, u2, m2, E + B, E + B + I, I), w2 = Math.max(0, w2 + M), b2 = Math.max(0, b2 + E);
    else {
      w2 = "start" === c ? k - o3 - s2 : "end" === c ? k - d2 + p2 + X : "nearest" === c ? l(o3, d2, n2, s2, p2 + X, k, k + x, x) : k - (o3 + n2 / 2) + X / 2, b2 = "start" === g ? B - h2 - u2 : "center" === g ? B - (h2 + i2 / 2) + O / 2 : "end" === g ? B - r2 + m2 + O : l(h2, r2, i2, u2, m2 + O, B, B + I, I);
      let { scrollLeft: e3, scrollTop: f3 } = t3;
      w2 = Math.max(0, Math.min(f3 + w2 / L, t3.scrollHeight - n2 / L + X)), b2 = Math.max(0, Math.min(e3 + b2 / Y, t3.scrollWidth - i2 / Y + O)), k += f3 - w2, B += e3 - b2;
    }
    D.push({ el: t3, top: w2, left: b2 });
  }
  return D;
};

// node_modules/downshift/dist/downshift.esm.js
var idCounter = 0;
function cbToCb(cb) {
  return typeof cb === "function" ? cb : noop;
}
function noop() {
}
function scrollIntoView(node, menuNode) {
  if (!node) {
    return;
  }
  var actions = o(node, {
    boundary: menuNode,
    block: "nearest",
    scrollMode: "if-needed"
  });
  actions.forEach(function(_ref) {
    var el = _ref.el, top = _ref.top, left = _ref.left;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}
function isOrContainsNode(parent, child, environment) {
  var result = parent === child || child instanceof environment.Node && parent.contains && parent.contains(child);
  return result;
}
function debounce(fn, time) {
  var timeoutId;
  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
  function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    cancel();
    timeoutId = setTimeout(function() {
      timeoutId = null;
      fn.apply(void 0, args);
    }, time);
  }
  wrapper.cancel = cancel;
  return wrapper;
}
function callAllEventHandlers() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }
  return function(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return fns.some(function(fn) {
      if (fn) {
        fn.apply(void 0, [event].concat(args));
      }
      return event.preventDownshiftDefault || event.hasOwnProperty("nativeEvent") && event.nativeEvent.preventDownshiftDefault;
    });
  };
}
function handleRefs() {
  for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    refs[_key4] = arguments[_key4];
  }
  return function(node) {
    refs.forEach(function(ref) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}
function generateId() {
  return String(idCounter++);
}
function resetIdCounter() {
  idCounter = 0;
}
function getA11yStatusMessage$1(_ref2) {
  var isOpen = _ref2.isOpen, resultCount = _ref2.resultCount, previousResultCount = _ref2.previousResultCount;
  if (!isOpen) {
    return "";
  }
  if (!resultCount) {
    return "No results are available.";
  }
  if (resultCount !== previousResultCount) {
    return resultCount + " result" + (resultCount === 1 ? " is" : "s are") + " available, use up and down arrow keys to navigate. Press Enter key to select.";
  }
  return "";
}
function unwrapArray(arg, defaultValue) {
  arg = Array.isArray(arg) ? (
    /* istanbul ignore next (preact) */
    arg[0]
  ) : arg;
  if (!arg && defaultValue) {
    return defaultValue;
  } else {
    return arg;
  }
}
function isDOMElement(element) {
  return typeof element.type === "string";
}
function getElementProps(element) {
  return element.props;
}
function requiredProp(fnName, propName) {
  console.error('The property "' + propName + '" is required in "' + fnName + '"');
}
var stateKeys = ["highlightedIndex", "inputValue", "isOpen", "selectedItem", "type"];
function pickState(state) {
  if (state === void 0) {
    state = {};
  }
  var result = {};
  stateKeys.forEach(function(k) {
    if (state.hasOwnProperty(k)) {
      result[k] = state[k];
    }
  });
  return result;
}
function getState(state, props) {
  return Object.keys(state).reduce(function(prevState, key) {
    prevState[key] = isControlledProp(props, key) ? props[key] : state[key];
    return prevState;
  }, {});
}
function isControlledProp(props, key) {
  return props[key] !== void 0;
}
function normalizeArrowKey(event) {
  var key = event.key, keyCode = event.keyCode;
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0) {
    return "Arrow" + key;
  }
  return key;
}
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function getNextWrappingIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
  if (circular === void 0) {
    circular = true;
  }
  if (itemCount === 0) {
    return -1;
  }
  var itemsLastIndex = itemCount - 1;
  if (typeof baseIndex !== "number" || baseIndex < 0 || baseIndex >= itemCount) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1;
  }
  var newIndex = baseIndex + moveAmount;
  if (newIndex < 0) {
    newIndex = circular ? itemsLastIndex : 0;
  } else if (newIndex > itemsLastIndex) {
    newIndex = circular ? 0 : itemsLastIndex;
  }
  var nonDisabledNewIndex = getNextNonDisabledIndex(moveAmount, newIndex, itemCount, getItemNodeFromIndex, circular);
  if (nonDisabledNewIndex === -1) {
    return baseIndex >= itemCount ? -1 : baseIndex;
  }
  return nonDisabledNewIndex;
}
function getNextNonDisabledIndex(moveAmount, baseIndex, itemCount, getItemNodeFromIndex, circular) {
  var currentElementNode = getItemNodeFromIndex(baseIndex);
  if (!currentElementNode || !currentElementNode.hasAttribute("disabled")) {
    return baseIndex;
  }
  if (moveAmount > 0) {
    for (var index = baseIndex + 1; index < itemCount; index++) {
      if (!getItemNodeFromIndex(index).hasAttribute("disabled")) {
        return index;
      }
    }
  } else {
    for (var _index = baseIndex - 1; _index >= 0; _index--) {
      if (!getItemNodeFromIndex(_index).hasAttribute("disabled")) {
        return _index;
      }
    }
  }
  if (circular) {
    return moveAmount > 0 ? getNextNonDisabledIndex(1, 0, itemCount, getItemNodeFromIndex, false) : getNextNonDisabledIndex(-1, itemCount - 1, itemCount, getItemNodeFromIndex, false);
  }
  return -1;
}
function targetWithinDownshift(target, downshiftElements, environment, checkActiveElement) {
  if (checkActiveElement === void 0) {
    checkActiveElement = true;
  }
  return downshiftElements.some(function(contextNode) {
    return contextNode && (isOrContainsNode(contextNode, target, environment) || checkActiveElement && isOrContainsNode(contextNode, environment.document.activeElement, environment));
  });
}
var validateControlledUnchanged = noop;
if (true) {
  validateControlledUnchanged = function validateControlledUnchanged2(state, prevProps, nextProps) {
    var warningDescription = "This prop should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled Downshift element for the lifetime of the component. More info: https://github.com/downshift-js/downshift#control-props";
    Object.keys(state).forEach(function(propKey) {
      if (prevProps[propKey] !== void 0 && nextProps[propKey] === void 0) {
        console.error('downshift: A component has changed the controlled prop "' + propKey + '" to be uncontrolled. ' + warningDescription);
      } else if (prevProps[propKey] === void 0 && nextProps[propKey] !== void 0) {
        console.error('downshift: A component has changed the uncontrolled prop "' + propKey + '" to be controlled. ' + warningDescription);
      }
    });
  };
}
var cleanupStatus = debounce(function(documentProp) {
  getStatusDiv(documentProp).textContent = "";
}, 500);
function setStatus(status, documentProp) {
  var div = getStatusDiv(documentProp);
  if (!status) {
    return;
  }
  div.textContent = status;
  cleanupStatus(documentProp);
}
function getStatusDiv(documentProp) {
  if (documentProp === void 0) {
    documentProp = document;
  }
  var statusDiv = documentProp.getElementById("a11y-status-message");
  if (statusDiv) {
    return statusDiv;
  }
  statusDiv = documentProp.createElement("div");
  statusDiv.setAttribute("id", "a11y-status-message");
  statusDiv.setAttribute("role", "status");
  statusDiv.setAttribute("aria-live", "polite");
  statusDiv.setAttribute("aria-relevant", "additions text");
  Object.assign(statusDiv.style, {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px"
  });
  documentProp.body.appendChild(statusDiv);
  return statusDiv;
}
var unknown = true ? "__autocomplete_unknown__" : 0;
var mouseUp = true ? "__autocomplete_mouseup__" : 1;
var itemMouseEnter = true ? "__autocomplete_item_mouseenter__" : 2;
var keyDownArrowUp = true ? "__autocomplete_keydown_arrow_up__" : 3;
var keyDownArrowDown = true ? "__autocomplete_keydown_arrow_down__" : 4;
var keyDownEscape = true ? "__autocomplete_keydown_escape__" : 5;
var keyDownEnter = true ? "__autocomplete_keydown_enter__" : 6;
var keyDownHome = true ? "__autocomplete_keydown_home__" : 7;
var keyDownEnd = true ? "__autocomplete_keydown_end__" : 8;
var clickItem = true ? "__autocomplete_click_item__" : 9;
var blurInput = true ? "__autocomplete_blur_input__" : 10;
var changeInput = true ? "__autocomplete_change_input__" : 11;
var keyDownSpaceButton = true ? "__autocomplete_keydown_space_button__" : 12;
var clickButton = true ? "__autocomplete_click_button__" : 13;
var blurButton = true ? "__autocomplete_blur_button__" : 14;
var controlledPropUpdatedSelectedItem = true ? "__autocomplete_controlled_prop_updated_selected_item__" : 15;
var touchEnd = true ? "__autocomplete_touchend__" : 16;
var stateChangeTypes$3 = Object.freeze({
  __proto__: null,
  unknown,
  mouseUp,
  itemMouseEnter,
  keyDownArrowUp,
  keyDownArrowDown,
  keyDownEscape,
  keyDownEnter,
  keyDownHome,
  keyDownEnd,
  clickItem,
  blurInput,
  changeInput,
  keyDownSpaceButton,
  clickButton,
  blurButton,
  controlledPropUpdatedSelectedItem,
  touchEnd
});
var _excluded$4 = ["refKey", "ref"];
var _excluded2$3 = ["onClick", "onPress", "onKeyDown", "onKeyUp", "onBlur"];
var _excluded3$2 = ["onKeyDown", "onBlur", "onChange", "onInput", "onChangeText"];
var _excluded4$1 = ["refKey", "ref"];
var _excluded5 = ["onMouseMove", "onMouseDown", "onClick", "onPress", "index", "item"];
var Downshift = function() {
  var Downshift2 = function(_Component) {
    _inheritsLoose(Downshift3, _Component);
    function Downshift3(_props) {
      var _this;
      _this = _Component.call(this, _props) || this;
      _this.id = _this.props.id || "downshift-" + generateId();
      _this.menuId = _this.props.menuId || _this.id + "-menu";
      _this.labelId = _this.props.labelId || _this.id + "-label";
      _this.inputId = _this.props.inputId || _this.id + "-input";
      _this.getItemId = _this.props.getItemId || function(index) {
        return _this.id + "-item-" + index;
      };
      _this.input = null;
      _this.items = [];
      _this.itemCount = null;
      _this.previousResultCount = 0;
      _this.timeoutIds = [];
      _this.internalSetTimeout = function(fn, time) {
        var id = setTimeout(function() {
          _this.timeoutIds = _this.timeoutIds.filter(function(i2) {
            return i2 !== id;
          });
          fn();
        }, time);
        _this.timeoutIds.push(id);
      };
      _this.setItemCount = function(count) {
        _this.itemCount = count;
      };
      _this.unsetItemCount = function() {
        _this.itemCount = null;
      };
      _this.setHighlightedIndex = function(highlightedIndex, otherStateToSet) {
        if (highlightedIndex === void 0) {
          highlightedIndex = _this.props.defaultHighlightedIndex;
        }
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(_extends({
          highlightedIndex
        }, otherStateToSet));
      };
      _this.clearSelection = function(cb) {
        _this.internalSetState({
          selectedItem: null,
          inputValue: "",
          highlightedIndex: _this.props.defaultHighlightedIndex,
          isOpen: _this.props.defaultIsOpen
        }, cb);
      };
      _this.selectItem = function(item, otherStateToSet, cb) {
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(_extends({
          isOpen: _this.props.defaultIsOpen,
          highlightedIndex: _this.props.defaultHighlightedIndex,
          selectedItem: item,
          inputValue: _this.props.itemToString(item)
        }, otherStateToSet), cb);
      };
      _this.selectItemAtIndex = function(itemIndex, otherStateToSet, cb) {
        var item = _this.items[itemIndex];
        if (item == null) {
          return;
        }
        _this.selectItem(item, otherStateToSet, cb);
      };
      _this.selectHighlightedItem = function(otherStateToSet, cb) {
        return _this.selectItemAtIndex(_this.getState().highlightedIndex, otherStateToSet, cb);
      };
      _this.internalSetState = function(stateToSet, cb) {
        var isItemSelected, onChangeArg;
        var onStateChangeArg = {};
        var isStateToSetFunction = typeof stateToSet === "function";
        if (!isStateToSetFunction && stateToSet.hasOwnProperty("inputValue")) {
          _this.props.onInputValueChange(stateToSet.inputValue, _extends({}, _this.getStateAndHelpers(), stateToSet));
        }
        return _this.setState(function(state) {
          state = _this.getState(state);
          var newStateToSet = isStateToSetFunction ? stateToSet(state) : stateToSet;
          newStateToSet = _this.props.stateReducer(state, newStateToSet);
          isItemSelected = newStateToSet.hasOwnProperty("selectedItem");
          var nextState = {};
          if (isItemSelected && newStateToSet.selectedItem !== state.selectedItem) {
            onChangeArg = newStateToSet.selectedItem;
          }
          newStateToSet.type = newStateToSet.type || unknown;
          Object.keys(newStateToSet).forEach(function(key) {
            if (state[key] !== newStateToSet[key]) {
              onStateChangeArg[key] = newStateToSet[key];
            }
            if (key === "type") {
              return;
            }
            newStateToSet[key];
            if (!isControlledProp(_this.props, key)) {
              nextState[key] = newStateToSet[key];
            }
          });
          if (isStateToSetFunction && newStateToSet.hasOwnProperty("inputValue")) {
            _this.props.onInputValueChange(newStateToSet.inputValue, _extends({}, _this.getStateAndHelpers(), newStateToSet));
          }
          return nextState;
        }, function() {
          cbToCb(cb)();
          var hasMoreStateThanType = Object.keys(onStateChangeArg).length > 1;
          if (hasMoreStateThanType) {
            _this.props.onStateChange(onStateChangeArg, _this.getStateAndHelpers());
          }
          if (isItemSelected) {
            _this.props.onSelect(stateToSet.selectedItem, _this.getStateAndHelpers());
          }
          if (onChangeArg !== void 0) {
            _this.props.onChange(onChangeArg, _this.getStateAndHelpers());
          }
          _this.props.onUserAction(onStateChangeArg, _this.getStateAndHelpers());
        });
      };
      _this.rootRef = function(node) {
        return _this._rootNode = node;
      };
      _this.getRootProps = function(_temp, _temp2) {
        var _extends2;
        var _ref = _temp === void 0 ? {} : _temp, _ref$refKey = _ref.refKey, refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey, ref = _ref.ref, rest = _objectWithoutPropertiesLoose(_ref, _excluded$4);
        var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$suppressRefErro = _ref2.suppressRefError, suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
        _this.getRootProps.called = true;
        _this.getRootProps.refKey = refKey;
        _this.getRootProps.suppressRefError = suppressRefError;
        var _this$getState = _this.getState(), isOpen = _this$getState.isOpen;
        return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, _this.rootRef), _extends2.role = "combobox", _extends2["aria-expanded"] = isOpen, _extends2["aria-haspopup"] = "listbox", _extends2["aria-owns"] = isOpen ? _this.menuId : null, _extends2["aria-labelledby"] = _this.labelId, _extends2), rest);
      };
      _this.keyDownHandlers = {
        ArrowDown: function ArrowDown(event) {
          var _this2 = this;
          event.preventDefault();
          if (this.getState().isOpen) {
            var amount = event.shiftKey ? 5 : 1;
            this.moveHighlightedIndex(amount, {
              type: keyDownArrowDown
            });
          } else {
            this.internalSetState({
              isOpen: true,
              type: keyDownArrowDown
            }, function() {
              var itemCount = _this2.getItemCount();
              if (itemCount > 0) {
                var _this2$getState = _this2.getState(), highlightedIndex = _this2$getState.highlightedIndex;
                var nextHighlightedIndex = getNextWrappingIndex(1, highlightedIndex, itemCount, function(index) {
                  return _this2.getItemNodeFromIndex(index);
                });
                _this2.setHighlightedIndex(nextHighlightedIndex, {
                  type: keyDownArrowDown
                });
              }
            });
          }
        },
        ArrowUp: function ArrowUp(event) {
          var _this3 = this;
          event.preventDefault();
          if (this.getState().isOpen) {
            var amount = event.shiftKey ? -5 : -1;
            this.moveHighlightedIndex(amount, {
              type: keyDownArrowUp
            });
          } else {
            this.internalSetState({
              isOpen: true,
              type: keyDownArrowUp
            }, function() {
              var itemCount = _this3.getItemCount();
              if (itemCount > 0) {
                var _this3$getState = _this3.getState(), highlightedIndex = _this3$getState.highlightedIndex;
                var nextHighlightedIndex = getNextWrappingIndex(-1, highlightedIndex, itemCount, function(index) {
                  return _this3.getItemNodeFromIndex(index);
                });
                _this3.setHighlightedIndex(nextHighlightedIndex, {
                  type: keyDownArrowUp
                });
              }
            });
          }
        },
        Enter: function Enter(event) {
          if (event.which === 229) {
            return;
          }
          var _this$getState2 = this.getState(), isOpen = _this$getState2.isOpen, highlightedIndex = _this$getState2.highlightedIndex;
          if (isOpen && highlightedIndex != null) {
            event.preventDefault();
            var item = this.items[highlightedIndex];
            var itemNode = this.getItemNodeFromIndex(highlightedIndex);
            if (item == null || itemNode && itemNode.hasAttribute("disabled")) {
              return;
            }
            this.selectHighlightedItem({
              type: keyDownEnter
            });
          }
        },
        Escape: function Escape(event) {
          event.preventDefault();
          this.reset(_extends({
            type: keyDownEscape
          }, !this.state.isOpen && {
            selectedItem: null,
            inputValue: ""
          }));
        }
      };
      _this.buttonKeyDownHandlers = _extends({}, _this.keyDownHandlers, {
        " ": function _(event) {
          event.preventDefault();
          this.toggleMenu({
            type: keyDownSpaceButton
          });
        }
      });
      _this.inputKeyDownHandlers = _extends({}, _this.keyDownHandlers, {
        Home: function Home(event) {
          var _this4 = this;
          var _this$getState3 = this.getState(), isOpen = _this$getState3.isOpen;
          if (!isOpen) {
            return;
          }
          event.preventDefault();
          var itemCount = this.getItemCount();
          if (itemCount <= 0 || !isOpen) {
            return;
          }
          var newHighlightedIndex = getNextNonDisabledIndex(1, 0, itemCount, function(index) {
            return _this4.getItemNodeFromIndex(index);
          }, false);
          this.setHighlightedIndex(newHighlightedIndex, {
            type: keyDownHome
          });
        },
        End: function End(event) {
          var _this5 = this;
          var _this$getState4 = this.getState(), isOpen = _this$getState4.isOpen;
          if (!isOpen) {
            return;
          }
          event.preventDefault();
          var itemCount = this.getItemCount();
          if (itemCount <= 0 || !isOpen) {
            return;
          }
          var newHighlightedIndex = getNextNonDisabledIndex(-1, itemCount - 1, itemCount, function(index) {
            return _this5.getItemNodeFromIndex(index);
          }, false);
          this.setHighlightedIndex(newHighlightedIndex, {
            type: keyDownEnd
          });
        }
      });
      _this.getToggleButtonProps = function(_temp3) {
        var _ref3 = _temp3 === void 0 ? {} : _temp3, onClick = _ref3.onClick;
        _ref3.onPress;
        var onKeyDown = _ref3.onKeyDown, onKeyUp = _ref3.onKeyUp, onBlur = _ref3.onBlur, rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$3);
        var _this$getState5 = _this.getState(), isOpen = _this$getState5.isOpen;
        var enabledEventHandlers = {
          onClick: callAllEventHandlers(onClick, _this.buttonHandleClick),
          onKeyDown: callAllEventHandlers(onKeyDown, _this.buttonHandleKeyDown),
          onKeyUp: callAllEventHandlers(onKeyUp, _this.buttonHandleKeyUp),
          onBlur: callAllEventHandlers(onBlur, _this.buttonHandleBlur)
        };
        var eventHandlers = rest.disabled ? {} : enabledEventHandlers;
        return _extends({
          type: "button",
          role: "button",
          "aria-label": isOpen ? "close menu" : "open menu",
          "aria-haspopup": true,
          "data-toggle": true
        }, eventHandlers, rest);
      };
      _this.buttonHandleKeyUp = function(event) {
        event.preventDefault();
      };
      _this.buttonHandleKeyDown = function(event) {
        var key = normalizeArrowKey(event);
        if (_this.buttonKeyDownHandlers[key]) {
          _this.buttonKeyDownHandlers[key].call(_assertThisInitialized(_this), event);
        }
      };
      _this.buttonHandleClick = function(event) {
        event.preventDefault();
        if (_this.props.environment.document.activeElement === _this.props.environment.document.body) {
          event.target.focus();
        }
        if (false) {
          _this.toggleMenu({
            type: clickButton
          });
        } else {
          _this.internalSetTimeout(function() {
            return _this.toggleMenu({
              type: clickButton
            });
          });
        }
      };
      _this.buttonHandleBlur = function(event) {
        var blurTarget = event.target;
        _this.internalSetTimeout(function() {
          if (!_this.isMouseDown && (_this.props.environment.document.activeElement == null || _this.props.environment.document.activeElement.id !== _this.inputId) && _this.props.environment.document.activeElement !== blurTarget) {
            _this.reset({
              type: blurButton
            });
          }
        });
      };
      _this.getLabelProps = function(props) {
        return _extends({
          htmlFor: _this.inputId,
          id: _this.labelId
        }, props);
      };
      _this.getInputProps = function(_temp4) {
        var _ref4 = _temp4 === void 0 ? {} : _temp4, onKeyDown = _ref4.onKeyDown, onBlur = _ref4.onBlur, onChange = _ref4.onChange, onInput = _ref4.onInput;
        _ref4.onChangeText;
        var rest = _objectWithoutPropertiesLoose(_ref4, _excluded3$2);
        var onChangeKey;
        var eventHandlers = {};
        {
          onChangeKey = "onChange";
        }
        var _this$getState6 = _this.getState(), inputValue = _this$getState6.inputValue, isOpen = _this$getState6.isOpen, highlightedIndex = _this$getState6.highlightedIndex;
        if (!rest.disabled) {
          var _eventHandlers;
          eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = callAllEventHandlers(onChange, onInput, _this.inputHandleChange), _eventHandlers.onKeyDown = callAllEventHandlers(onKeyDown, _this.inputHandleKeyDown), _eventHandlers.onBlur = callAllEventHandlers(onBlur, _this.inputHandleBlur), _eventHandlers);
        }
        return _extends({
          "aria-autocomplete": "list",
          "aria-activedescendant": isOpen && typeof highlightedIndex === "number" && highlightedIndex >= 0 ? _this.getItemId(highlightedIndex) : null,
          "aria-controls": isOpen ? _this.menuId : null,
          "aria-labelledby": rest && rest["aria-label"] ? void 0 : _this.labelId,
          // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
          // revert back since autocomplete="nope" is ignored on latest Chrome and Opera
          autoComplete: "off",
          value: inputValue,
          id: _this.inputId
        }, eventHandlers, rest);
      };
      _this.inputHandleKeyDown = function(event) {
        var key = normalizeArrowKey(event);
        if (key && _this.inputKeyDownHandlers[key]) {
          _this.inputKeyDownHandlers[key].call(_assertThisInitialized(_this), event);
        }
      };
      _this.inputHandleChange = function(event) {
        _this.internalSetState({
          type: changeInput,
          isOpen: true,
          inputValue: event.target.value,
          highlightedIndex: _this.props.defaultHighlightedIndex
        });
      };
      _this.inputHandleBlur = function() {
        _this.internalSetTimeout(function() {
          var downshiftButtonIsActive = _this.props.environment.document && !!_this.props.environment.document.activeElement && !!_this.props.environment.document.activeElement.dataset && _this.props.environment.document.activeElement.dataset.toggle && _this._rootNode && _this._rootNode.contains(_this.props.environment.document.activeElement);
          if (!_this.isMouseDown && !downshiftButtonIsActive) {
            _this.reset({
              type: blurInput
            });
          }
        });
      };
      _this.menuRef = function(node) {
        _this._menuNode = node;
      };
      _this.getMenuProps = function(_temp5, _temp6) {
        var _extends3;
        var _ref5 = _temp5 === void 0 ? {} : _temp5, _ref5$refKey = _ref5.refKey, refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey, ref = _ref5.ref, props = _objectWithoutPropertiesLoose(_ref5, _excluded4$1);
        var _ref6 = _temp6 === void 0 ? {} : _temp6, _ref6$suppressRefErro = _ref6.suppressRefError, suppressRefError = _ref6$suppressRefErro === void 0 ? false : _ref6$suppressRefErro;
        _this.getMenuProps.called = true;
        _this.getMenuProps.refKey = refKey;
        _this.getMenuProps.suppressRefError = suppressRefError;
        return _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, _this.menuRef), _extends3.role = "listbox", _extends3["aria-labelledby"] = props && props["aria-label"] ? null : _this.labelId, _extends3.id = _this.menuId, _extends3), props);
      };
      _this.getItemProps = function(_temp7) {
        var _enabledEventHandlers;
        var _ref7 = _temp7 === void 0 ? {} : _temp7, onMouseMove = _ref7.onMouseMove, onMouseDown = _ref7.onMouseDown, onClick = _ref7.onClick;
        _ref7.onPress;
        var index = _ref7.index, _ref7$item = _ref7.item, item = _ref7$item === void 0 ? false ? (
          /* istanbul ignore next */
          void 0
        ) : requiredProp("getItemProps", "item") : _ref7$item, rest = _objectWithoutPropertiesLoose(_ref7, _excluded5);
        if (index === void 0) {
          _this.items.push(item);
          index = _this.items.indexOf(item);
        } else {
          _this.items[index] = item;
        }
        var onSelectKey = "onClick";
        var customClickHandler = onClick;
        var enabledEventHandlers = (_enabledEventHandlers = {
          // onMouseMove is used over onMouseEnter here. onMouseMove
          // is only triggered on actual mouse movement while onMouseEnter
          // can fire on DOM changes, interrupting keyboard navigation
          onMouseMove: callAllEventHandlers(onMouseMove, function() {
            if (index === _this.getState().highlightedIndex) {
              return;
            }
            _this.setHighlightedIndex(index, {
              type: itemMouseEnter
            });
            _this.avoidScrolling = true;
            _this.internalSetTimeout(function() {
              return _this.avoidScrolling = false;
            }, 250);
          }),
          onMouseDown: callAllEventHandlers(onMouseDown, function(event) {
            event.preventDefault();
          })
        }, _enabledEventHandlers[onSelectKey] = callAllEventHandlers(customClickHandler, function() {
          _this.selectItemAtIndex(index, {
            type: clickItem
          });
        }), _enabledEventHandlers);
        var eventHandlers = rest.disabled ? {
          onMouseDown: enabledEventHandlers.onMouseDown
        } : enabledEventHandlers;
        return _extends({
          id: _this.getItemId(index),
          role: "option",
          "aria-selected": _this.getState().highlightedIndex === index
        }, eventHandlers, rest);
      };
      _this.clearItems = function() {
        _this.items = [];
      };
      _this.reset = function(otherStateToSet, cb) {
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(function(_ref8) {
          var selectedItem = _ref8.selectedItem;
          return _extends({
            isOpen: _this.props.defaultIsOpen,
            highlightedIndex: _this.props.defaultHighlightedIndex,
            inputValue: _this.props.itemToString(selectedItem)
          }, otherStateToSet);
        }, cb);
      };
      _this.toggleMenu = function(otherStateToSet, cb) {
        if (otherStateToSet === void 0) {
          otherStateToSet = {};
        }
        otherStateToSet = pickState(otherStateToSet);
        _this.internalSetState(function(_ref9) {
          var isOpen = _ref9.isOpen;
          return _extends({
            isOpen: !isOpen
          }, isOpen && {
            highlightedIndex: _this.props.defaultHighlightedIndex
          }, otherStateToSet);
        }, function() {
          var _this$getState7 = _this.getState(), isOpen = _this$getState7.isOpen, highlightedIndex = _this$getState7.highlightedIndex;
          if (isOpen) {
            if (_this.getItemCount() > 0 && typeof highlightedIndex === "number") {
              _this.setHighlightedIndex(highlightedIndex, otherStateToSet);
            }
          }
          cbToCb(cb)();
        });
      };
      _this.openMenu = function(cb) {
        _this.internalSetState({
          isOpen: true
        }, cb);
      };
      _this.closeMenu = function(cb) {
        _this.internalSetState({
          isOpen: false
        }, cb);
      };
      _this.updateStatus = debounce(function() {
        var state = _this.getState();
        var item = _this.items[state.highlightedIndex];
        var resultCount = _this.getItemCount();
        var status = _this.props.getA11yStatusMessage(_extends({
          itemToString: _this.props.itemToString,
          previousResultCount: _this.previousResultCount,
          resultCount,
          highlightedItem: item
        }, state));
        _this.previousResultCount = resultCount;
        setStatus(status, _this.props.environment.document);
      }, 200);
      var _this$props = _this.props, defaultHighlightedIndex = _this$props.defaultHighlightedIndex, _this$props$initialHi = _this$props.initialHighlightedIndex, _highlightedIndex = _this$props$initialHi === void 0 ? defaultHighlightedIndex : _this$props$initialHi, defaultIsOpen = _this$props.defaultIsOpen, _this$props$initialIs = _this$props.initialIsOpen, _isOpen = _this$props$initialIs === void 0 ? defaultIsOpen : _this$props$initialIs, _this$props$initialIn = _this$props.initialInputValue, _inputValue = _this$props$initialIn === void 0 ? "" : _this$props$initialIn, _this$props$initialSe = _this$props.initialSelectedItem, _selectedItem = _this$props$initialSe === void 0 ? null : _this$props$initialSe;
      var _state = _this.getState({
        highlightedIndex: _highlightedIndex,
        isOpen: _isOpen,
        inputValue: _inputValue,
        selectedItem: _selectedItem
      });
      if (_state.selectedItem != null && _this.props.initialInputValue === void 0) {
        _state.inputValue = _this.props.itemToString(_state.selectedItem);
      }
      _this.state = _state;
      return _this;
    }
    var _proto = Downshift3.prototype;
    _proto.internalClearTimeouts = function internalClearTimeouts() {
      this.timeoutIds.forEach(function(id) {
        clearTimeout(id);
      });
      this.timeoutIds = [];
    };
    _proto.getState = function getState$1(stateToMerge) {
      if (stateToMerge === void 0) {
        stateToMerge = this.state;
      }
      return getState(stateToMerge, this.props);
    };
    _proto.getItemCount = function getItemCount() {
      var itemCount = this.items.length;
      if (this.itemCount != null) {
        itemCount = this.itemCount;
      } else if (this.props.itemCount !== void 0) {
        itemCount = this.props.itemCount;
      }
      return itemCount;
    };
    _proto.getItemNodeFromIndex = function getItemNodeFromIndex(index) {
      return this.props.environment.document.getElementById(this.getItemId(index));
    };
    _proto.scrollHighlightedItemIntoView = function scrollHighlightedItemIntoView() {
      {
        var node = this.getItemNodeFromIndex(this.getState().highlightedIndex);
        this.props.scrollIntoView(node, this._menuNode);
      }
    };
    _proto.moveHighlightedIndex = function moveHighlightedIndex(amount, otherStateToSet) {
      var _this6 = this;
      var itemCount = this.getItemCount();
      var _this$getState8 = this.getState(), highlightedIndex = _this$getState8.highlightedIndex;
      if (itemCount > 0) {
        var nextHighlightedIndex = getNextWrappingIndex(amount, highlightedIndex, itemCount, function(index) {
          return _this6.getItemNodeFromIndex(index);
        });
        this.setHighlightedIndex(nextHighlightedIndex, otherStateToSet);
      }
    };
    _proto.getStateAndHelpers = function getStateAndHelpers() {
      var _this$getState9 = this.getState(), highlightedIndex = _this$getState9.highlightedIndex, inputValue = _this$getState9.inputValue, selectedItem = _this$getState9.selectedItem, isOpen = _this$getState9.isOpen;
      var itemToString2 = this.props.itemToString;
      var id = this.id;
      var getRootProps = this.getRootProps, getToggleButtonProps = this.getToggleButtonProps, getLabelProps = this.getLabelProps, getMenuProps = this.getMenuProps, getInputProps = this.getInputProps, getItemProps = this.getItemProps, openMenu = this.openMenu, closeMenu = this.closeMenu, toggleMenu = this.toggleMenu, selectItem = this.selectItem, selectItemAtIndex = this.selectItemAtIndex, selectHighlightedItem = this.selectHighlightedItem, setHighlightedIndex = this.setHighlightedIndex, clearSelection = this.clearSelection, clearItems = this.clearItems, reset = this.reset, setItemCount = this.setItemCount, unsetItemCount = this.unsetItemCount, setState = this.internalSetState;
      return {
        // prop getters
        getRootProps,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        getItemProps,
        // actions
        reset,
        openMenu,
        closeMenu,
        toggleMenu,
        selectItem,
        selectItemAtIndex,
        selectHighlightedItem,
        setHighlightedIndex,
        clearSelection,
        clearItems,
        setItemCount,
        unsetItemCount,
        setState,
        // props
        itemToString: itemToString2,
        // derived
        id,
        // state
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem
      };
    };
    _proto.componentDidMount = function componentDidMount() {
      var _this7 = this;
      if (this.getMenuProps.called && !this.getMenuProps.suppressRefError) {
        validateGetMenuPropsCalledCorrectly(this._menuNode, this.getMenuProps);
      }
      {
        var onMouseDown = function onMouseDown2() {
          _this7.isMouseDown = true;
        };
        var onMouseUp = function onMouseUp2(event) {
          _this7.isMouseDown = false;
          var contextWithinDownshift = targetWithinDownshift(event.target, [_this7._rootNode, _this7._menuNode], _this7.props.environment);
          if (!contextWithinDownshift && _this7.getState().isOpen) {
            _this7.reset({
              type: mouseUp
            }, function() {
              return _this7.props.onOuterClick(_this7.getStateAndHelpers());
            });
          }
        };
        var onTouchStart = function onTouchStart2() {
          _this7.isTouchMove = false;
        };
        var onTouchMove = function onTouchMove2() {
          _this7.isTouchMove = true;
        };
        var onTouchEnd = function onTouchEnd2(event) {
          var contextWithinDownshift = targetWithinDownshift(event.target, [_this7._rootNode, _this7._menuNode], _this7.props.environment, false);
          if (!_this7.isTouchMove && !contextWithinDownshift && _this7.getState().isOpen) {
            _this7.reset({
              type: touchEnd
            }, function() {
              return _this7.props.onOuterClick(_this7.getStateAndHelpers());
            });
          }
        };
        var environment = this.props.environment;
        environment.addEventListener("mousedown", onMouseDown);
        environment.addEventListener("mouseup", onMouseUp);
        environment.addEventListener("touchstart", onTouchStart);
        environment.addEventListener("touchmove", onTouchMove);
        environment.addEventListener("touchend", onTouchEnd);
        this.cleanup = function() {
          _this7.internalClearTimeouts();
          _this7.updateStatus.cancel();
          environment.removeEventListener("mousedown", onMouseDown);
          environment.removeEventListener("mouseup", onMouseUp);
          environment.removeEventListener("touchstart", onTouchStart);
          environment.removeEventListener("touchmove", onTouchMove);
          environment.removeEventListener("touchend", onTouchEnd);
        };
      }
    };
    _proto.shouldScroll = function shouldScroll(prevState, prevProps) {
      var _ref10 = this.props.highlightedIndex === void 0 ? this.getState() : this.props, currentHighlightedIndex = _ref10.highlightedIndex;
      var _ref11 = prevProps.highlightedIndex === void 0 ? prevState : prevProps, prevHighlightedIndex = _ref11.highlightedIndex;
      var scrollWhenOpen = currentHighlightedIndex && this.getState().isOpen && !prevState.isOpen;
      var scrollWhenNavigating = currentHighlightedIndex !== prevHighlightedIndex;
      return scrollWhenOpen || scrollWhenNavigating;
    };
    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      if (true) {
        validateControlledUnchanged(this.state, prevProps, this.props);
        if (this.getMenuProps.called && !this.getMenuProps.suppressRefError) {
          validateGetMenuPropsCalledCorrectly(this._menuNode, this.getMenuProps);
        }
      }
      if (isControlledProp(this.props, "selectedItem") && this.props.selectedItemChanged(prevProps.selectedItem, this.props.selectedItem)) {
        this.internalSetState({
          type: controlledPropUpdatedSelectedItem,
          inputValue: this.props.itemToString(this.props.selectedItem)
        });
      }
      if (!this.avoidScrolling && this.shouldScroll(prevState, prevProps)) {
        this.scrollHighlightedItemIntoView();
      }
      {
        this.updateStatus();
      }
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.cleanup();
    };
    _proto.render = function render() {
      var children = unwrapArray(this.props.children, noop);
      this.clearItems();
      this.getRootProps.called = false;
      this.getRootProps.refKey = void 0;
      this.getRootProps.suppressRefError = void 0;
      this.getMenuProps.called = false;
      this.getMenuProps.refKey = void 0;
      this.getMenuProps.suppressRefError = void 0;
      this.getLabelProps.called = false;
      this.getInputProps.called = false;
      var element = unwrapArray(children(this.getStateAndHelpers()));
      if (!element) {
        return null;
      }
      if (this.getRootProps.called || this.props.suppressRefError) {
        if (!this.getRootProps.suppressRefError && !this.props.suppressRefError) {
          validateGetRootPropsCalledCorrectly(element, this.getRootProps);
        }
        return element;
      } else if (isDOMElement(element)) {
        return (0, import_react.cloneElement)(element, this.getRootProps(getElementProps(element)));
      }
      if (true) {
        throw new Error("downshift: If you return a non-DOM element, you must apply the getRootProps function");
      }
      return void 0;
    };
    return Downshift3;
  }(import_react.Component);
  Downshift2.defaultProps = {
    defaultHighlightedIndex: null,
    defaultIsOpen: false,
    getA11yStatusMessage: getA11yStatusMessage$1,
    itemToString: function itemToString2(i2) {
      if (i2 == null) {
        return "";
      }
      if (isPlainObject(i2) && !i2.hasOwnProperty("toString")) {
        console.warn("downshift: An object was passed to the default implementation of `itemToString`. You should probably provide your own `itemToString` implementation. Please refer to the `itemToString` API documentation.", "The object that was passed:", i2);
      }
      return String(i2);
    },
    onStateChange: noop,
    onInputValueChange: noop,
    onUserAction: noop,
    onChange: noop,
    onSelect: noop,
    onOuterClick: noop,
    selectedItemChanged: function selectedItemChanged2(prevItem, item) {
      return prevItem !== item;
    },
    environment: (
      /* istanbul ignore next (ssr) */
      typeof window === "undefined" ? {} : window
    ),
    stateReducer: function stateReducer2(state, stateToSet) {
      return stateToSet;
    },
    suppressRefError: false,
    scrollIntoView
  };
  Downshift2.stateChangeTypes = stateChangeTypes$3;
  return Downshift2;
}();
true ? Downshift.propTypes = {
  children: import_prop_types.default.func,
  defaultHighlightedIndex: import_prop_types.default.number,
  defaultIsOpen: import_prop_types.default.bool,
  initialHighlightedIndex: import_prop_types.default.number,
  initialSelectedItem: import_prop_types.default.any,
  initialInputValue: import_prop_types.default.string,
  initialIsOpen: import_prop_types.default.bool,
  getA11yStatusMessage: import_prop_types.default.func,
  itemToString: import_prop_types.default.func,
  onChange: import_prop_types.default.func,
  onSelect: import_prop_types.default.func,
  onStateChange: import_prop_types.default.func,
  onInputValueChange: import_prop_types.default.func,
  onUserAction: import_prop_types.default.func,
  onOuterClick: import_prop_types.default.func,
  selectedItemChanged: import_prop_types.default.func,
  stateReducer: import_prop_types.default.func,
  itemCount: import_prop_types.default.number,
  id: import_prop_types.default.string,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  }),
  suppressRefError: import_prop_types.default.bool,
  scrollIntoView: import_prop_types.default.func,
  // things we keep in state for uncontrolled components
  // but can accept as props for controlled components
  /* eslint-disable react/no-unused-prop-types */
  selectedItem: import_prop_types.default.any,
  isOpen: import_prop_types.default.bool,
  inputValue: import_prop_types.default.string,
  highlightedIndex: import_prop_types.default.number,
  labelId: import_prop_types.default.string,
  inputId: import_prop_types.default.string,
  menuId: import_prop_types.default.string,
  getItemId: import_prop_types.default.func
  /* eslint-enable react/no-unused-prop-types */
} : void 0;
var Downshift$1 = Downshift;
function validateGetMenuPropsCalledCorrectly(node, _ref12) {
  var refKey = _ref12.refKey;
  if (!node) {
    console.error('downshift: The ref prop "' + refKey + '" from getMenuProps was not applied correctly on your menu element.');
  }
}
function validateGetRootPropsCalledCorrectly(element, _ref13) {
  var refKey = _ref13.refKey;
  var refKeySpecified = refKey !== "ref";
  var isComposite = !isDOMElement(element);
  if (isComposite && !refKeySpecified && !(0, import_react_is.isForwardRef)(element)) {
    console.error("downshift: You returned a non-DOM element. You must specify a refKey in getRootProps");
  } else if (!isComposite && refKeySpecified) {
    console.error('downshift: You returned a DOM element. You should not specify a refKey in getRootProps. You specified "' + refKey + '"');
  }
  if (!(0, import_react_is.isForwardRef)(element) && !getElementProps(element)[refKey]) {
    console.error('downshift: You must apply the ref prop "' + refKey + '" from getRootProps onto your root element.');
  }
}
var _excluded$3 = ["isInitialMount", "highlightedIndex", "items", "environment"];
var dropdownDefaultStateValues = {
  highlightedIndex: -1,
  isOpen: false,
  selectedItem: null,
  inputValue: ""
};
function callOnChangeProps(action, state, newState) {
  var props = action.props, type = action.type;
  var changes = {};
  Object.keys(state).forEach(function(key) {
    invokeOnChangeHandler(key, action, state, newState);
    if (newState[key] !== state[key]) {
      changes[key] = newState[key];
    }
  });
  if (props.onStateChange && Object.keys(changes).length) {
    props.onStateChange(_extends({
      type
    }, changes));
  }
}
function invokeOnChangeHandler(key, action, state, newState) {
  var props = action.props, type = action.type;
  var handler = "on" + capitalizeString(key) + "Change";
  if (props[handler] && newState[key] !== void 0 && newState[key] !== state[key]) {
    props[handler](_extends({
      type
    }, newState));
  }
}
function stateReducer(s, a) {
  return a.changes;
}
function getA11ySelectionMessage(selectionParameters) {
  var selectedItem = selectionParameters.selectedItem, itemToStringLocal = selectionParameters.itemToString;
  return selectedItem ? itemToStringLocal(selectedItem) + " has been selected." : "";
}
var updateA11yStatus = debounce(function(getA11yMessage, document2) {
  setStatus(getA11yMessage(), document2);
}, 200);
var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function useElementIds(_ref) {
  var _ref$id = _ref.id, id = _ref$id === void 0 ? "downshift-" + generateId() : _ref$id, labelId = _ref.labelId, menuId = _ref.menuId, getItemId = _ref.getItemId, toggleButtonId = _ref.toggleButtonId, inputId = _ref.inputId;
  var elementIdsRef = (0, import_react.useRef)({
    labelId: labelId || id + "-label",
    menuId: menuId || id + "-menu",
    getItemId: getItemId || function(index) {
      return id + "-item-" + index;
    },
    toggleButtonId: toggleButtonId || id + "-toggle-button",
    inputId: inputId || id + "-input"
  });
  return elementIdsRef.current;
}
function getItemAndIndex(itemProp, indexProp, items, errorMessage) {
  var item, index;
  if (itemProp === void 0) {
    if (indexProp === void 0) {
      throw new Error(errorMessage);
    }
    item = items[indexProp];
    index = indexProp;
  } else {
    index = indexProp === void 0 ? items.indexOf(itemProp) : indexProp;
    item = itemProp;
  }
  return [item, index];
}
function itemToString(item) {
  return item ? String(item) : "";
}
function isAcceptedCharacterKey(key) {
  return /^\S{1}$/.test(key);
}
function capitalizeString(string) {
  return "" + string.slice(0, 1).toUpperCase() + string.slice(1);
}
function useLatestRef(val) {
  var ref = (0, import_react.useRef)(val);
  ref.current = val;
  return ref;
}
function useEnhancedReducer(reducer, initialState, props) {
  var prevStateRef = (0, import_react.useRef)();
  var actionRef = (0, import_react.useRef)();
  var enhancedReducer = (0, import_react.useCallback)(function(state2, action2) {
    actionRef.current = action2;
    state2 = getState(state2, action2.props);
    var changes = reducer(state2, action2);
    var newState = action2.props.stateReducer(state2, _extends({}, action2, {
      changes
    }));
    return newState;
  }, [reducer]);
  var _useReducer = (0, import_react.useReducer)(enhancedReducer, initialState), state = _useReducer[0], dispatch = _useReducer[1];
  var propsRef = useLatestRef(props);
  var dispatchWithProps = (0, import_react.useCallback)(function(action2) {
    return dispatch(_extends({
      props: propsRef.current
    }, action2));
  }, [propsRef]);
  var action = actionRef.current;
  (0, import_react.useEffect)(function() {
    if (action && prevStateRef.current && prevStateRef.current !== state) {
      callOnChangeProps(action, getState(prevStateRef.current, action.props), state);
    }
    prevStateRef.current = state;
  }, [state, props, action]);
  return [state, dispatchWithProps];
}
function useControlledReducer$1(reducer, initialState, props) {
  var _useEnhancedReducer = useEnhancedReducer(reducer, initialState, props), state = _useEnhancedReducer[0], dispatch = _useEnhancedReducer[1];
  return [getState(state, props), dispatch];
}
var defaultProps$3 = {
  itemToString,
  stateReducer,
  getA11ySelectionMessage,
  scrollIntoView,
  environment: (
    /* istanbul ignore next (ssr) */
    typeof window === "undefined" ? {} : window
  )
};
function getDefaultValue$1(props, propKey, defaultStateValues2) {
  if (defaultStateValues2 === void 0) {
    defaultStateValues2 = dropdownDefaultStateValues;
  }
  var defaultValue = props["default" + capitalizeString(propKey)];
  if (defaultValue !== void 0) {
    return defaultValue;
  }
  return defaultStateValues2[propKey];
}
function getInitialValue$1(props, propKey, defaultStateValues2) {
  if (defaultStateValues2 === void 0) {
    defaultStateValues2 = dropdownDefaultStateValues;
  }
  var value = props[propKey];
  if (value !== void 0) {
    return value;
  }
  var initialValue = props["initial" + capitalizeString(propKey)];
  if (initialValue !== void 0) {
    return initialValue;
  }
  return getDefaultValue$1(props, propKey, defaultStateValues2);
}
function getInitialState$2(props) {
  var selectedItem = getInitialValue$1(props, "selectedItem");
  var isOpen = getInitialValue$1(props, "isOpen");
  var highlightedIndex = getInitialValue$1(props, "highlightedIndex");
  var inputValue = getInitialValue$1(props, "inputValue");
  return {
    highlightedIndex: highlightedIndex < 0 && selectedItem && isOpen ? props.items.indexOf(selectedItem) : highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
function getHighlightedIndexOnOpen(props, state, offset) {
  var items = props.items, initialHighlightedIndex = props.initialHighlightedIndex, defaultHighlightedIndex = props.defaultHighlightedIndex;
  var selectedItem = state.selectedItem, highlightedIndex = state.highlightedIndex;
  if (items.length === 0) {
    return -1;
  }
  if (initialHighlightedIndex !== void 0 && highlightedIndex === initialHighlightedIndex) {
    return initialHighlightedIndex;
  }
  if (defaultHighlightedIndex !== void 0) {
    return defaultHighlightedIndex;
  }
  if (selectedItem) {
    return items.indexOf(selectedItem);
  }
  if (offset === 0) {
    return -1;
  }
  return offset < 0 ? items.length - 1 : 0;
}
function useMouseAndTouchTracker(isOpen, downshiftElementRefs, environment, handleBlur) {
  var mouseAndTouchTrackersRef = (0, import_react.useRef)({
    isMouseDown: false,
    isTouchMove: false
  });
  (0, import_react.useEffect)(function() {
    if ((environment == null ? void 0 : environment.addEventListener) == null) {
      return;
    }
    var onMouseDown = function onMouseDown2() {
      mouseAndTouchTrackersRef.current.isMouseDown = true;
    };
    var onMouseUp = function onMouseUp2(event) {
      mouseAndTouchTrackersRef.current.isMouseDown = false;
      if (isOpen && !targetWithinDownshift(event.target, downshiftElementRefs.map(function(ref) {
        return ref.current;
      }), environment)) {
        handleBlur();
      }
    };
    var onTouchStart = function onTouchStart2() {
      mouseAndTouchTrackersRef.current.isTouchMove = false;
    };
    var onTouchMove = function onTouchMove2() {
      mouseAndTouchTrackersRef.current.isTouchMove = true;
    };
    var onTouchEnd = function onTouchEnd2(event) {
      if (isOpen && !mouseAndTouchTrackersRef.current.isTouchMove && !targetWithinDownshift(event.target, downshiftElementRefs.map(function(ref) {
        return ref.current;
      }), environment, false)) {
        handleBlur();
      }
    };
    environment.addEventListener("mousedown", onMouseDown);
    environment.addEventListener("mouseup", onMouseUp);
    environment.addEventListener("touchstart", onTouchStart);
    environment.addEventListener("touchmove", onTouchMove);
    environment.addEventListener("touchend", onTouchEnd);
    return function cleanup() {
      environment.removeEventListener("mousedown", onMouseDown);
      environment.removeEventListener("mouseup", onMouseUp);
      environment.removeEventListener("touchstart", onTouchStart);
      environment.removeEventListener("touchmove", onTouchMove);
      environment.removeEventListener("touchend", onTouchEnd);
    };
  }, [isOpen, environment]);
  return mouseAndTouchTrackersRef;
}
var useGetterPropsCalledChecker = function useGetterPropsCalledChecker2() {
  return noop;
};
if (true) {
  useGetterPropsCalledChecker = function useGetterPropsCalledChecker3() {
    var isInitialMountRef = (0, import_react.useRef)(true);
    for (var _len = arguments.length, propKeys = new Array(_len), _key = 0; _key < _len; _key++) {
      propKeys[_key] = arguments[_key];
    }
    var getterPropsCalledRef = (0, import_react.useRef)(propKeys.reduce(function(acc, propKey) {
      acc[propKey] = {};
      return acc;
    }, {}));
    (0, import_react.useEffect)(function() {
      Object.keys(getterPropsCalledRef.current).forEach(function(propKey) {
        var propCallInfo = getterPropsCalledRef.current[propKey];
        if (isInitialMountRef.current) {
          if (!Object.keys(propCallInfo).length) {
            console.error("downshift: You forgot to call the " + propKey + " getter function on your component / element.");
            return;
          }
        }
        var suppressRefError = propCallInfo.suppressRefError, refKey = propCallInfo.refKey, elementRef = propCallInfo.elementRef;
        if ((!elementRef || !elementRef.current) && !suppressRefError) {
          console.error('downshift: The ref prop "' + refKey + '" from ' + propKey + " was not applied correctly on your element.");
        }
      });
      isInitialMountRef.current = false;
    });
    var setGetterPropCallInfo = (0, import_react.useCallback)(function(propKey, suppressRefError, refKey, elementRef) {
      getterPropsCalledRef.current[propKey] = {
        suppressRefError,
        refKey,
        elementRef
      };
    }, []);
    return setGetterPropCallInfo;
  };
}
function useA11yMessageSetter(getA11yMessage, dependencyArray, _ref2) {
  var isInitialMount = _ref2.isInitialMount, highlightedIndex = _ref2.highlightedIndex, items = _ref2.items, environment = _ref2.environment, rest = _objectWithoutPropertiesLoose(_ref2, _excluded$3);
  (0, import_react.useEffect)(function() {
    if (isInitialMount || false) {
      return;
    }
    updateA11yStatus(function() {
      return getA11yMessage(_extends({
        highlightedIndex,
        highlightedItem: items[highlightedIndex],
        resultCount: items.length
      }, rest));
    }, environment.document);
  }, dependencyArray);
}
function useScrollIntoView(_ref3) {
  var highlightedIndex = _ref3.highlightedIndex, isOpen = _ref3.isOpen, itemRefs = _ref3.itemRefs, getItemNodeFromIndex = _ref3.getItemNodeFromIndex, menuElement = _ref3.menuElement, scrollIntoViewProp = _ref3.scrollIntoView;
  var shouldScrollRef = (0, import_react.useRef)(true);
  useIsomorphicLayoutEffect(function() {
    if (highlightedIndex < 0 || !isOpen || !Object.keys(itemRefs.current).length) {
      return;
    }
    if (shouldScrollRef.current === false) {
      shouldScrollRef.current = true;
    } else {
      scrollIntoViewProp(getItemNodeFromIndex(highlightedIndex), menuElement);
    }
  }, [highlightedIndex]);
  return shouldScrollRef;
}
var useControlPropsValidator = noop;
if (true) {
  useControlPropsValidator = function useControlPropsValidator2(_ref4) {
    var isInitialMount = _ref4.isInitialMount, props = _ref4.props, state = _ref4.state;
    var prevPropsRef = (0, import_react.useRef)(props);
    (0, import_react.useEffect)(function() {
      if (isInitialMount) {
        return;
      }
      validateControlledUnchanged(state, prevPropsRef.current, props);
      prevPropsRef.current = props;
    }, [state, props, isInitialMount]);
  };
}
function getChangesOnSelection(props, highlightedIndex, inputValue) {
  var _props$items;
  if (inputValue === void 0) {
    inputValue = true;
  }
  var shouldSelect = ((_props$items = props.items) == null ? void 0 : _props$items.length) && highlightedIndex >= 0;
  return _extends({
    isOpen: false,
    highlightedIndex: -1
  }, shouldSelect && _extends({
    selectedItem: props.items[highlightedIndex],
    isOpen: getDefaultValue$1(props, "isOpen"),
    highlightedIndex: getDefaultValue$1(props, "highlightedIndex")
  }, inputValue && {
    inputValue: props.itemToString(props.items[highlightedIndex])
  }));
}
function downshiftCommonReducer(state, action, stateChangeTypes2) {
  var type = action.type, props = action.props;
  var changes;
  switch (type) {
    case stateChangeTypes2.ItemMouseMove:
      changes = {
        highlightedIndex: action.disabled ? -1 : action.index
      };
      break;
    case stateChangeTypes2.MenuMouseLeave:
      changes = {
        highlightedIndex: -1
      };
      break;
    case stateChangeTypes2.ToggleButtonClick:
    case stateChangeTypes2.FunctionToggleMenu:
      changes = {
        isOpen: !state.isOpen,
        highlightedIndex: state.isOpen ? -1 : getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case stateChangeTypes2.FunctionOpenMenu:
      changes = {
        isOpen: true,
        highlightedIndex: getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case stateChangeTypes2.FunctionCloseMenu:
      changes = {
        isOpen: false
      };
      break;
    case stateChangeTypes2.FunctionSetHighlightedIndex:
      changes = {
        highlightedIndex: action.highlightedIndex
      };
      break;
    case stateChangeTypes2.FunctionSetInputValue:
      changes = {
        inputValue: action.inputValue
      };
      break;
    case stateChangeTypes2.FunctionReset:
      changes = {
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        isOpen: getDefaultValue$1(props, "isOpen"),
        selectedItem: getDefaultValue$1(props, "selectedItem"),
        inputValue: getDefaultValue$1(props, "inputValue")
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return _extends({}, state, changes);
}
function getItemIndexByCharacterKey(_a) {
  var keysSoFar = _a.keysSoFar, highlightedIndex = _a.highlightedIndex, items = _a.items, itemToString2 = _a.itemToString, getItemNodeFromIndex = _a.getItemNodeFromIndex;
  var lowerCasedKeysSoFar = keysSoFar.toLowerCase();
  for (var index = 0; index < items.length; index++) {
    var offsetIndex = (index + highlightedIndex + (keysSoFar.length < 2 ? 1 : 0)) % items.length;
    var item = items[offsetIndex];
    if (item !== void 0 && itemToString2(item).toLowerCase().startsWith(lowerCasedKeysSoFar)) {
      var element = getItemNodeFromIndex(offsetIndex);
      if (!(element === null || element === void 0 ? void 0 : element.hasAttribute("disabled"))) {
        return offsetIndex;
      }
    }
  }
  return highlightedIndex;
}
var propTypes$2 = {
  items: import_prop_types.default.array.isRequired,
  itemToString: import_prop_types.default.func,
  getA11yStatusMessage: import_prop_types.default.func,
  getA11ySelectionMessage: import_prop_types.default.func,
  highlightedIndex: import_prop_types.default.number,
  defaultHighlightedIndex: import_prop_types.default.number,
  initialHighlightedIndex: import_prop_types.default.number,
  isOpen: import_prop_types.default.bool,
  defaultIsOpen: import_prop_types.default.bool,
  initialIsOpen: import_prop_types.default.bool,
  selectedItem: import_prop_types.default.any,
  initialSelectedItem: import_prop_types.default.any,
  defaultSelectedItem: import_prop_types.default.any,
  id: import_prop_types.default.string,
  labelId: import_prop_types.default.string,
  menuId: import_prop_types.default.string,
  getItemId: import_prop_types.default.func,
  toggleButtonId: import_prop_types.default.string,
  stateReducer: import_prop_types.default.func,
  onSelectedItemChange: import_prop_types.default.func,
  onHighlightedIndexChange: import_prop_types.default.func,
  onStateChange: import_prop_types.default.func,
  onIsOpenChange: import_prop_types.default.func,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  })
};
function getA11yStatusMessage(_a) {
  var isOpen = _a.isOpen, resultCount = _a.resultCount, previousResultCount = _a.previousResultCount;
  if (!isOpen) {
    return "";
  }
  if (!resultCount) {
    return "No results are available.";
  }
  if (resultCount !== previousResultCount) {
    return "".concat(resultCount, " result").concat(resultCount === 1 ? " is" : "s are", " available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select.");
  }
  return "";
}
var defaultProps$2 = __assign(__assign({}, defaultProps$3), { getA11yStatusMessage });
var validatePropTypes$2 = noop;
if (true) {
  validatePropTypes$2 = function(options, caller) {
    import_prop_types.default.checkPropTypes(propTypes$2, options, "prop", caller.name);
  };
}
var ToggleButtonClick$1 = true ? "__togglebutton_click__" : 0;
var ToggleButtonKeyDownArrowDown = true ? "__togglebutton_keydown_arrow_down__" : 1;
var ToggleButtonKeyDownArrowUp = true ? "__togglebutton_keydown_arrow_up__" : 2;
var ToggleButtonKeyDownCharacter = true ? "__togglebutton_keydown_character__" : 3;
var ToggleButtonKeyDownEscape = true ? "__togglebutton_keydown_escape__" : 4;
var ToggleButtonKeyDownHome = true ? "__togglebutton_keydown_home__" : 5;
var ToggleButtonKeyDownEnd = true ? "__togglebutton_keydown_end__" : 6;
var ToggleButtonKeyDownEnter = true ? "__togglebutton_keydown_enter__" : 7;
var ToggleButtonKeyDownSpaceButton = true ? "__togglebutton_keydown_space_button__" : 8;
var ToggleButtonKeyDownPageUp = true ? "__togglebutton_keydown_page_up__" : 9;
var ToggleButtonKeyDownPageDown = true ? "__togglebutton_keydown_page_down__" : 10;
var ToggleButtonBlur = true ? "__togglebutton_blur__" : 11;
var MenuMouseLeave$1 = true ? "__menu_mouse_leave__" : 12;
var ItemMouseMove$1 = true ? "__item_mouse_move__" : 13;
var ItemClick$1 = true ? "__item_click__" : 14;
var FunctionToggleMenu$1 = true ? "__function_toggle_menu__" : 15;
var FunctionOpenMenu$1 = true ? "__function_open_menu__" : 16;
var FunctionCloseMenu$1 = true ? "__function_close_menu__" : 17;
var FunctionSetHighlightedIndex$1 = true ? "__function_set_highlighted_index__" : 18;
var FunctionSelectItem$1 = true ? "__function_select_item__" : 19;
var FunctionSetInputValue$1 = true ? "__function_set_input_value__" : 20;
var FunctionReset$2 = true ? "__function_reset__" : 21;
var stateChangeTypes$2 = Object.freeze({
  __proto__: null,
  ToggleButtonClick: ToggleButtonClick$1,
  ToggleButtonKeyDownArrowDown,
  ToggleButtonKeyDownArrowUp,
  ToggleButtonKeyDownCharacter,
  ToggleButtonKeyDownEscape,
  ToggleButtonKeyDownHome,
  ToggleButtonKeyDownEnd,
  ToggleButtonKeyDownEnter,
  ToggleButtonKeyDownSpaceButton,
  ToggleButtonKeyDownPageUp,
  ToggleButtonKeyDownPageDown,
  ToggleButtonBlur,
  MenuMouseLeave: MenuMouseLeave$1,
  ItemMouseMove: ItemMouseMove$1,
  ItemClick: ItemClick$1,
  FunctionToggleMenu: FunctionToggleMenu$1,
  FunctionOpenMenu: FunctionOpenMenu$1,
  FunctionCloseMenu: FunctionCloseMenu$1,
  FunctionSetHighlightedIndex: FunctionSetHighlightedIndex$1,
  FunctionSelectItem: FunctionSelectItem$1,
  FunctionSetInputValue: FunctionSetInputValue$1,
  FunctionReset: FunctionReset$2
});
function downshiftSelectReducer(state, action) {
  var _props$items;
  var type = action.type, props = action.props, altKey = action.altKey;
  var changes;
  switch (type) {
    case ItemClick$1:
      changes = {
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        selectedItem: props.items[action.index]
      };
      break;
    case ToggleButtonKeyDownCharacter:
      {
        var lowercasedKey = action.key;
        var inputValue = "" + state.inputValue + lowercasedKey;
        var prevHighlightedIndex = !state.isOpen && state.selectedItem ? props.items.indexOf(state.selectedItem) : state.highlightedIndex;
        var highlightedIndex = getItemIndexByCharacterKey({
          keysSoFar: inputValue,
          highlightedIndex: prevHighlightedIndex,
          items: props.items,
          itemToString: props.itemToString,
          getItemNodeFromIndex: action.getItemNodeFromIndex
        });
        changes = {
          inputValue,
          highlightedIndex,
          isOpen: true
        };
      }
      break;
    case ToggleButtonKeyDownArrowDown:
      {
        var _highlightedIndex = state.isOpen ? getNextWrappingIndex(1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, false) : altKey && state.selectedItem == null ? -1 : getHighlightedIndexOnOpen(props, state, 1);
        changes = {
          highlightedIndex: _highlightedIndex,
          isOpen: true
        };
      }
      break;
    case ToggleButtonKeyDownArrowUp:
      if (state.isOpen && altKey) {
        changes = getChangesOnSelection(props, state.highlightedIndex, false);
      } else {
        var _highlightedIndex2 = state.isOpen ? getNextWrappingIndex(-1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, false) : getHighlightedIndexOnOpen(props, state, -1);
        changes = {
          highlightedIndex: _highlightedIndex2,
          isOpen: true
        };
      }
      break;
    case ToggleButtonKeyDownEnter:
    case ToggleButtonKeyDownSpaceButton:
      changes = getChangesOnSelection(props, state.highlightedIndex, false);
      break;
    case ToggleButtonKeyDownHome:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(1, 0, props.items.length, action.getItemNodeFromIndex, false),
        isOpen: true
      };
      break;
    case ToggleButtonKeyDownEnd:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(-1, props.items.length - 1, props.items.length, action.getItemNodeFromIndex, false),
        isOpen: true
      };
      break;
    case ToggleButtonKeyDownPageUp:
      changes = {
        highlightedIndex: getNextWrappingIndex(-10, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case ToggleButtonKeyDownPageDown:
      changes = {
        highlightedIndex: getNextWrappingIndex(10, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case ToggleButtonKeyDownEscape:
      changes = {
        isOpen: false,
        highlightedIndex: -1
      };
      break;
    case ToggleButtonBlur:
      changes = _extends({
        isOpen: false,
        highlightedIndex: -1
      }, state.highlightedIndex >= 0 && ((_props$items = props.items) == null ? void 0 : _props$items.length) && {
        selectedItem: props.items[state.highlightedIndex]
      });
      break;
    case FunctionSelectItem$1:
      changes = {
        selectedItem: action.selectedItem
      };
      break;
    default:
      return downshiftCommonReducer(state, action, stateChangeTypes$2);
  }
  return _extends({}, state, changes);
}
var _excluded$2 = ["onMouseLeave", "refKey", "onKeyDown", "onBlur", "ref"];
var _excluded2$2 = ["onBlur", "onClick", "onPress", "onKeyDown", "refKey", "ref"];
var _excluded3$1 = ["item", "index", "onMouseMove", "onClick", "onPress", "refKey", "ref", "disabled"];
useSelect.stateChangeTypes = stateChangeTypes$2;
function useSelect(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes$2(userProps, useSelect);
  var props = _extends({}, defaultProps$2, userProps);
  var items = props.items, scrollIntoView2 = props.scrollIntoView, environment = props.environment, itemToString2 = props.itemToString, getA11ySelectionMessage2 = props.getA11ySelectionMessage, getA11yStatusMessage2 = props.getA11yStatusMessage;
  var initialState = getInitialState$2(props);
  var _useControlledReducer = useControlledReducer$1(downshiftSelectReducer, initialState, props), state = _useControlledReducer[0], dispatch = _useControlledReducer[1];
  var isOpen = state.isOpen, highlightedIndex = state.highlightedIndex, selectedItem = state.selectedItem, inputValue = state.inputValue;
  var toggleButtonRef = (0, import_react.useRef)(null);
  var menuRef = (0, import_react.useRef)(null);
  var itemRefs = (0, import_react.useRef)({});
  var clearTimeoutRef = (0, import_react.useRef)(null);
  var elementIds = useElementIds(props);
  var previousResultCountRef = (0, import_react.useRef)();
  var isInitialMountRef = (0, import_react.useRef)(true);
  var latest = useLatestRef({
    state,
    props
  });
  var getItemNodeFromIndex = (0, import_react.useCallback)(function(index) {
    return itemRefs.current[elementIds.getItemId(index)];
  }, [elementIds]);
  useA11yMessageSetter(getA11yStatusMessage2, [isOpen, highlightedIndex, inputValue, items], _extends({
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2
  }, state));
  useA11yMessageSetter(getA11ySelectionMessage2, [selectedItem], _extends({
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2
  }, state));
  var shouldScrollRef = useScrollIntoView({
    menuElement: menuRef.current,
    highlightedIndex,
    isOpen,
    itemRefs,
    scrollIntoView: scrollIntoView2,
    getItemNodeFromIndex
  });
  (0, import_react.useEffect)(function() {
    clearTimeoutRef.current = debounce(function(outerDispatch) {
      outerDispatch({
        type: FunctionSetInputValue$1,
        inputValue: ""
      });
    }, 500);
    return function() {
      clearTimeoutRef.current.cancel();
    };
  }, []);
  (0, import_react.useEffect)(function() {
    if (!inputValue) {
      return;
    }
    clearTimeoutRef.current(dispatch);
  }, [dispatch, inputValue]);
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state
  });
  (0, import_react.useEffect)(function() {
    if (isInitialMountRef.current) {
      return;
    }
    previousResultCountRef.current = items.length;
  });
  var mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [menuRef, toggleButtonRef], environment, function() {
    dispatch({
      type: ToggleButtonBlur
    });
  });
  var setGetterPropCallInfo = useGetterPropsCalledChecker("getMenuProps", "getToggleButtonProps");
  (0, import_react.useEffect)(function() {
    isInitialMountRef.current = false;
    return function() {
      isInitialMountRef.current = true;
    };
  }, []);
  (0, import_react.useEffect)(function() {
    if (!isOpen) {
      itemRefs.current = {};
    }
  }, [isOpen]);
  var toggleButtonKeyDownHandlers = (0, import_react.useMemo)(function() {
    return {
      ArrowDown: function ArrowDown(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownArrowDown,
          getItemNodeFromIndex,
          altKey: event.altKey
        });
      },
      ArrowUp: function ArrowUp(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownArrowUp,
          getItemNodeFromIndex,
          altKey: event.altKey
        });
      },
      Home: function Home(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownHome,
          getItemNodeFromIndex
        });
      },
      End: function End(event) {
        event.preventDefault();
        dispatch({
          type: ToggleButtonKeyDownEnd,
          getItemNodeFromIndex
        });
      },
      Escape: function Escape() {
        if (latest.current.state.isOpen) {
          dispatch({
            type: ToggleButtonKeyDownEscape
          });
        }
      },
      Enter: function Enter(event) {
        event.preventDefault();
        dispatch({
          type: latest.current.state.isOpen ? ToggleButtonKeyDownEnter : ToggleButtonClick$1
        });
      },
      PageUp: function PageUp(event) {
        if (latest.current.state.isOpen) {
          event.preventDefault();
          dispatch({
            type: ToggleButtonKeyDownPageUp,
            getItemNodeFromIndex
          });
        }
      },
      PageDown: function PageDown(event) {
        if (latest.current.state.isOpen) {
          event.preventDefault();
          dispatch({
            type: ToggleButtonKeyDownPageDown,
            getItemNodeFromIndex
          });
        }
      },
      " ": function _(event) {
        event.preventDefault();
        var currentState = latest.current.state;
        if (!currentState.isOpen) {
          dispatch({
            type: ToggleButtonClick$1
          });
          return;
        }
        if (currentState.inputValue) {
          dispatch({
            type: ToggleButtonKeyDownCharacter,
            key: " ",
            getItemNodeFromIndex
          });
        } else {
          dispatch({
            type: ToggleButtonKeyDownSpaceButton
          });
        }
      }
    };
  }, [dispatch, getItemNodeFromIndex, latest]);
  var toggleMenu = (0, import_react.useCallback)(function() {
    dispatch({
      type: FunctionToggleMenu$1
    });
  }, [dispatch]);
  var closeMenu = (0, import_react.useCallback)(function() {
    dispatch({
      type: FunctionCloseMenu$1
    });
  }, [dispatch]);
  var openMenu = (0, import_react.useCallback)(function() {
    dispatch({
      type: FunctionOpenMenu$1
    });
  }, [dispatch]);
  var setHighlightedIndex = (0, import_react.useCallback)(function(newHighlightedIndex) {
    dispatch({
      type: FunctionSetHighlightedIndex$1,
      highlightedIndex: newHighlightedIndex
    });
  }, [dispatch]);
  var selectItem = (0, import_react.useCallback)(function(newSelectedItem) {
    dispatch({
      type: FunctionSelectItem$1,
      selectedItem: newSelectedItem
    });
  }, [dispatch]);
  var reset = (0, import_react.useCallback)(function() {
    dispatch({
      type: FunctionReset$2
    });
  }, [dispatch]);
  var setInputValue = (0, import_react.useCallback)(function(newInputValue) {
    dispatch({
      type: FunctionSetInputValue$1,
      inputValue: newInputValue
    });
  }, [dispatch]);
  var getLabelProps = (0, import_react.useCallback)(function(labelProps) {
    return _extends({
      id: elementIds.labelId,
      htmlFor: elementIds.toggleButtonId
    }, labelProps);
  }, [elementIds]);
  var getMenuProps = (0, import_react.useCallback)(function(_temp, _temp2) {
    var _extends2;
    var _ref = _temp === void 0 ? {} : _temp, onMouseLeave = _ref.onMouseLeave, _ref$refKey = _ref.refKey, refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey;
    _ref.onKeyDown;
    _ref.onBlur;
    var ref = _ref.ref, rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);
    var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$suppressRefErro = _ref2.suppressRefError, suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
    var menuHandleMouseLeave = function menuHandleMouseLeave2() {
      dispatch({
        type: MenuMouseLeave$1
      });
    };
    setGetterPropCallInfo("getMenuProps", suppressRefError, refKey, menuRef);
    return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function(menuNode) {
      menuRef.current = menuNode;
    }), _extends2.id = elementIds.menuId, _extends2.role = "listbox", _extends2["aria-labelledby"] = rest && rest["aria-label"] ? void 0 : "" + elementIds.labelId, _extends2.onMouseLeave = callAllEventHandlers(onMouseLeave, menuHandleMouseLeave), _extends2), rest);
  }, [dispatch, setGetterPropCallInfo, elementIds]);
  var getToggleButtonProps = (0, import_react.useCallback)(function(_temp3, _temp4) {
    var _extends3;
    var _ref3 = _temp3 === void 0 ? {} : _temp3, onBlur = _ref3.onBlur, onClick = _ref3.onClick;
    _ref3.onPress;
    var onKeyDown = _ref3.onKeyDown, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, ref = _ref3.ref, rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$2);
    var _ref4 = _temp4 === void 0 ? {} : _temp4, _ref4$suppressRefErro = _ref4.suppressRefError, suppressRefError = _ref4$suppressRefErro === void 0 ? false : _ref4$suppressRefErro;
    var latestState = latest.current.state;
    var toggleButtonHandleClick = function toggleButtonHandleClick2() {
      dispatch({
        type: ToggleButtonClick$1
      });
    };
    var toggleButtonHandleBlur = function toggleButtonHandleBlur2() {
      if (latestState.isOpen && !mouseAndTouchTrackersRef.current.isMouseDown) {
        dispatch({
          type: ToggleButtonBlur
        });
      }
    };
    var toggleButtonHandleKeyDown = function toggleButtonHandleKeyDown2(event) {
      var key = normalizeArrowKey(event);
      if (key && toggleButtonKeyDownHandlers[key]) {
        toggleButtonKeyDownHandlers[key](event);
      } else if (isAcceptedCharacterKey(key)) {
        dispatch({
          type: ToggleButtonKeyDownCharacter,
          key,
          getItemNodeFromIndex
        });
      }
    };
    var toggleProps = _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function(toggleButtonNode) {
      toggleButtonRef.current = toggleButtonNode;
    }), _extends3["aria-activedescendant"] = latestState.isOpen && latestState.highlightedIndex > -1 ? elementIds.getItemId(latestState.highlightedIndex) : "", _extends3["aria-controls"] = elementIds.menuId, _extends3["aria-expanded"] = latest.current.state.isOpen, _extends3["aria-haspopup"] = "listbox", _extends3["aria-labelledby"] = rest && rest["aria-label"] ? void 0 : "" + elementIds.labelId, _extends3.id = elementIds.toggleButtonId, _extends3.role = "combobox", _extends3.tabIndex = 0, _extends3.onBlur = callAllEventHandlers(onBlur, toggleButtonHandleBlur), _extends3), rest);
    if (!rest.disabled) {
      {
        toggleProps.onClick = callAllEventHandlers(onClick, toggleButtonHandleClick);
        toggleProps.onKeyDown = callAllEventHandlers(onKeyDown, toggleButtonHandleKeyDown);
      }
    }
    setGetterPropCallInfo("getToggleButtonProps", suppressRefError, refKey, toggleButtonRef);
    return toggleProps;
  }, [latest, elementIds, setGetterPropCallInfo, dispatch, mouseAndTouchTrackersRef, toggleButtonKeyDownHandlers, getItemNodeFromIndex]);
  var getItemProps = (0, import_react.useCallback)(function(_temp5) {
    var _extends4;
    var _ref5 = _temp5 === void 0 ? {} : _temp5, itemProp = _ref5.item, indexProp = _ref5.index, onMouseMove = _ref5.onMouseMove, onClick = _ref5.onClick;
    _ref5.onPress;
    var _ref5$refKey = _ref5.refKey, refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey, ref = _ref5.ref, disabled = _ref5.disabled, rest = _objectWithoutPropertiesLoose(_ref5, _excluded3$1);
    var _latest$current = latest.current, latestState = _latest$current.state, latestProps = _latest$current.props;
    var _getItemAndIndex = getItemAndIndex(itemProp, indexProp, latestProps.items, "Pass either item or index to getItemProps!"), item = _getItemAndIndex[0], index = _getItemAndIndex[1];
    var itemHandleMouseMove = function itemHandleMouseMove2() {
      if (index === latestState.highlightedIndex) {
        return;
      }
      shouldScrollRef.current = false;
      dispatch({
        type: ItemMouseMove$1,
        index,
        disabled
      });
    };
    var itemHandleClick = function itemHandleClick2() {
      dispatch({
        type: ItemClick$1,
        index
      });
    };
    var itemProps = _extends((_extends4 = {
      disabled,
      role: "option",
      "aria-selected": "" + (item === selectedItem),
      id: elementIds.getItemId(index)
    }, _extends4[refKey] = handleRefs(ref, function(itemNode) {
      if (itemNode) {
        itemRefs.current[elementIds.getItemId(index)] = itemNode;
      }
    }), _extends4), rest);
    if (!disabled) {
      {
        itemProps.onClick = callAllEventHandlers(onClick, itemHandleClick);
      }
    }
    itemProps.onMouseMove = callAllEventHandlers(onMouseMove, itemHandleMouseMove);
    return itemProps;
  }, [latest, selectedItem, elementIds, shouldScrollRef, dispatch]);
  return {
    // prop getters.
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    // actions.
    toggleMenu,
    openMenu,
    closeMenu,
    setHighlightedIndex,
    selectItem,
    reset,
    setInputValue,
    // state.
    highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
var InputKeyDownArrowDown = true ? "__input_keydown_arrow_down__" : 0;
var InputKeyDownArrowUp = true ? "__input_keydown_arrow_up__" : 1;
var InputKeyDownEscape = true ? "__input_keydown_escape__" : 2;
var InputKeyDownHome = true ? "__input_keydown_home__" : 3;
var InputKeyDownEnd = true ? "__input_keydown_end__" : 4;
var InputKeyDownPageUp = true ? "__input_keydown_page_up__" : 5;
var InputKeyDownPageDown = true ? "__input_keydown_page_down__" : 6;
var InputKeyDownEnter = true ? "__input_keydown_enter__" : 7;
var InputChange = true ? "__input_change__" : 8;
var InputBlur = true ? "__input_blur__" : 9;
var InputFocus = true ? "__input_focus__" : 10;
var MenuMouseLeave = true ? "__menu_mouse_leave__" : 11;
var ItemMouseMove = true ? "__item_mouse_move__" : 12;
var ItemClick = true ? "__item_click__" : 13;
var ToggleButtonClick = true ? "__togglebutton_click__" : 14;
var FunctionToggleMenu = true ? "__function_toggle_menu__" : 15;
var FunctionOpenMenu = true ? "__function_open_menu__" : 16;
var FunctionCloseMenu = true ? "__function_close_menu__" : 17;
var FunctionSetHighlightedIndex = true ? "__function_set_highlighted_index__" : 18;
var FunctionSelectItem = true ? "__function_select_item__" : 19;
var FunctionSetInputValue = true ? "__function_set_input_value__" : 20;
var FunctionReset$1 = true ? "__function_reset__" : 21;
var ControlledPropUpdatedSelectedItem = true ? "__controlled_prop_updated_selected_item__" : 22;
var stateChangeTypes$1 = Object.freeze({
  __proto__: null,
  InputKeyDownArrowDown,
  InputKeyDownArrowUp,
  InputKeyDownEscape,
  InputKeyDownHome,
  InputKeyDownEnd,
  InputKeyDownPageUp,
  InputKeyDownPageDown,
  InputKeyDownEnter,
  InputChange,
  InputBlur,
  InputFocus,
  MenuMouseLeave,
  ItemMouseMove,
  ItemClick,
  ToggleButtonClick,
  FunctionToggleMenu,
  FunctionOpenMenu,
  FunctionCloseMenu,
  FunctionSetHighlightedIndex,
  FunctionSelectItem,
  FunctionSetInputValue,
  FunctionReset: FunctionReset$1,
  ControlledPropUpdatedSelectedItem
});
function getInitialState$1(props) {
  var initialState = getInitialState$2(props);
  var selectedItem = initialState.selectedItem;
  var inputValue = initialState.inputValue;
  if (inputValue === "" && selectedItem && props.defaultInputValue === void 0 && props.initialInputValue === void 0 && props.inputValue === void 0) {
    inputValue = props.itemToString(selectedItem);
  }
  return _extends({}, initialState, {
    inputValue
  });
}
var propTypes$1 = {
  items: import_prop_types.default.array.isRequired,
  itemToString: import_prop_types.default.func,
  selectedItemChanged: import_prop_types.default.func,
  getA11yStatusMessage: import_prop_types.default.func,
  getA11ySelectionMessage: import_prop_types.default.func,
  highlightedIndex: import_prop_types.default.number,
  defaultHighlightedIndex: import_prop_types.default.number,
  initialHighlightedIndex: import_prop_types.default.number,
  isOpen: import_prop_types.default.bool,
  defaultIsOpen: import_prop_types.default.bool,
  initialIsOpen: import_prop_types.default.bool,
  selectedItem: import_prop_types.default.any,
  initialSelectedItem: import_prop_types.default.any,
  defaultSelectedItem: import_prop_types.default.any,
  inputValue: import_prop_types.default.string,
  defaultInputValue: import_prop_types.default.string,
  initialInputValue: import_prop_types.default.string,
  id: import_prop_types.default.string,
  labelId: import_prop_types.default.string,
  menuId: import_prop_types.default.string,
  getItemId: import_prop_types.default.func,
  inputId: import_prop_types.default.string,
  toggleButtonId: import_prop_types.default.string,
  stateReducer: import_prop_types.default.func,
  onSelectedItemChange: import_prop_types.default.func,
  onHighlightedIndexChange: import_prop_types.default.func,
  onStateChange: import_prop_types.default.func,
  onIsOpenChange: import_prop_types.default.func,
  onInputValueChange: import_prop_types.default.func,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  })
};
function useControlledReducer(reducer, initialState, props) {
  var previousSelectedItemRef = (0, import_react.useRef)();
  var _useEnhancedReducer = useEnhancedReducer(reducer, initialState, props), state = _useEnhancedReducer[0], dispatch = _useEnhancedReducer[1];
  (0, import_react.useEffect)(function() {
    if (!isControlledProp(props, "selectedItem")) {
      return;
    }
    if (props.selectedItemChanged(previousSelectedItemRef.current, props.selectedItem)) {
      dispatch({
        type: ControlledPropUpdatedSelectedItem,
        inputValue: props.itemToString(props.selectedItem)
      });
    }
    previousSelectedItemRef.current = state.selectedItem === previousSelectedItemRef.current ? props.selectedItem : state.selectedItem;
  }, [state.selectedItem, props.selectedItem]);
  return [getState(state, props), dispatch];
}
var validatePropTypes$1 = noop;
if (true) {
  validatePropTypes$1 = function validatePropTypes2(options, caller) {
    import_prop_types.default.checkPropTypes(propTypes$1, options, "prop", caller.name);
  };
}
var defaultProps$1 = _extends({}, defaultProps$3, {
  selectedItemChanged: function selectedItemChanged(prevItem, item) {
    return prevItem !== item;
  },
  getA11yStatusMessage: getA11yStatusMessage$1
});
function downshiftUseComboboxReducer(state, action) {
  var _props$items;
  var type = action.type, props = action.props, altKey = action.altKey;
  var changes;
  switch (type) {
    case ItemClick:
      changes = {
        isOpen: getDefaultValue$1(props, "isOpen"),
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        selectedItem: props.items[action.index],
        inputValue: props.itemToString(props.items[action.index])
      };
      break;
    case InputKeyDownArrowDown:
      if (state.isOpen) {
        changes = {
          highlightedIndex: getNextWrappingIndex(1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, true)
        };
      } else {
        changes = {
          highlightedIndex: altKey && state.selectedItem == null ? -1 : getHighlightedIndexOnOpen(props, state, 1, action.getItemNodeFromIndex),
          isOpen: props.items.length >= 0
        };
      }
      break;
    case InputKeyDownArrowUp:
      if (state.isOpen) {
        if (altKey) {
          changes = getChangesOnSelection(props, state.highlightedIndex);
        } else {
          changes = {
            highlightedIndex: getNextWrappingIndex(-1, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, true)
          };
        }
      } else {
        changes = {
          highlightedIndex: getHighlightedIndexOnOpen(props, state, -1, action.getItemNodeFromIndex),
          isOpen: props.items.length >= 0
        };
      }
      break;
    case InputKeyDownEnter:
      changes = getChangesOnSelection(props, state.highlightedIndex);
      break;
    case InputKeyDownEscape:
      changes = _extends({
        isOpen: false,
        highlightedIndex: -1
      }, !state.isOpen && {
        selectedItem: null,
        inputValue: ""
      });
      break;
    case InputKeyDownPageUp:
      changes = {
        highlightedIndex: getNextWrappingIndex(-10, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case InputKeyDownPageDown:
      changes = {
        highlightedIndex: getNextWrappingIndex(10, state.highlightedIndex, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case InputKeyDownHome:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(1, 0, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case InputKeyDownEnd:
      changes = {
        highlightedIndex: getNextNonDisabledIndex(-1, props.items.length - 1, props.items.length, action.getItemNodeFromIndex, false)
      };
      break;
    case InputBlur:
      changes = _extends({
        isOpen: false,
        highlightedIndex: -1
      }, state.highlightedIndex >= 0 && ((_props$items = props.items) == null ? void 0 : _props$items.length) && action.selectItem && {
        selectedItem: props.items[state.highlightedIndex],
        inputValue: props.itemToString(props.items[state.highlightedIndex])
      });
      break;
    case InputChange:
      changes = {
        isOpen: true,
        highlightedIndex: getDefaultValue$1(props, "highlightedIndex"),
        inputValue: action.inputValue
      };
      break;
    case InputFocus:
      changes = {
        isOpen: true,
        highlightedIndex: getHighlightedIndexOnOpen(props, state, 0)
      };
      break;
    case FunctionSelectItem:
      changes = {
        selectedItem: action.selectedItem,
        inputValue: props.itemToString(action.selectedItem)
      };
      break;
    case ControlledPropUpdatedSelectedItem:
      changes = {
        inputValue: action.inputValue
      };
      break;
    default:
      return downshiftCommonReducer(state, action, stateChangeTypes$1);
  }
  return _extends({}, state, changes);
}
var _excluded$1 = ["onMouseLeave", "refKey", "ref"];
var _excluded2$1 = ["item", "index", "refKey", "ref", "onMouseMove", "onMouseDown", "onClick", "onPress", "disabled"];
var _excluded3 = ["onClick", "onPress", "refKey", "ref"];
var _excluded4 = ["onKeyDown", "onChange", "onInput", "onFocus", "onBlur", "onChangeText", "refKey", "ref"];
useCombobox.stateChangeTypes = stateChangeTypes$1;
function useCombobox(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes$1(userProps, useCombobox);
  var props = _extends({}, defaultProps$1, userProps);
  var initialIsOpen = props.initialIsOpen, defaultIsOpen = props.defaultIsOpen, items = props.items, scrollIntoView2 = props.scrollIntoView, environment = props.environment, getA11yStatusMessage2 = props.getA11yStatusMessage, getA11ySelectionMessage2 = props.getA11ySelectionMessage, itemToString2 = props.itemToString;
  var initialState = getInitialState$1(props);
  var _useControlledReducer = useControlledReducer(downshiftUseComboboxReducer, initialState, props), state = _useControlledReducer[0], dispatch = _useControlledReducer[1];
  var isOpen = state.isOpen, highlightedIndex = state.highlightedIndex, selectedItem = state.selectedItem, inputValue = state.inputValue;
  var menuRef = (0, import_react.useRef)(null);
  var itemRefs = (0, import_react.useRef)({});
  var inputRef = (0, import_react.useRef)(null);
  var toggleButtonRef = (0, import_react.useRef)(null);
  var isInitialMountRef = (0, import_react.useRef)(true);
  var elementIds = useElementIds(props);
  var previousResultCountRef = (0, import_react.useRef)();
  var latest = useLatestRef({
    state,
    props
  });
  var getItemNodeFromIndex = (0, import_react.useCallback)(function(index) {
    return itemRefs.current[elementIds.getItemId(index)];
  }, [elementIds]);
  useA11yMessageSetter(getA11yStatusMessage2, [isOpen, highlightedIndex, inputValue, items], _extends({
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2
  }, state));
  useA11yMessageSetter(getA11ySelectionMessage2, [selectedItem], _extends({
    isInitialMount: isInitialMountRef.current,
    previousResultCount: previousResultCountRef.current,
    items,
    environment,
    itemToString: itemToString2
  }, state));
  var shouldScrollRef = useScrollIntoView({
    menuElement: menuRef.current,
    highlightedIndex,
    isOpen,
    itemRefs,
    scrollIntoView: scrollIntoView2,
    getItemNodeFromIndex
  });
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state
  });
  (0, import_react.useEffect)(function() {
    var focusOnOpen = initialIsOpen || defaultIsOpen || isOpen;
    if (focusOnOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  (0, import_react.useEffect)(function() {
    if (isInitialMountRef.current) {
      return;
    }
    previousResultCountRef.current = items.length;
  });
  var mouseAndTouchTrackersRef = useMouseAndTouchTracker(isOpen, [inputRef, menuRef, toggleButtonRef], environment, function() {
    dispatch({
      type: InputBlur,
      selectItem: false
    });
  });
  var setGetterPropCallInfo = useGetterPropsCalledChecker("getInputProps", "getMenuProps");
  (0, import_react.useEffect)(function() {
    isInitialMountRef.current = false;
    return function() {
      isInitialMountRef.current = true;
    };
  }, []);
  (0, import_react.useEffect)(function() {
    var _environment$document;
    if (!isOpen) {
      itemRefs.current = {};
    } else if (((_environment$document = environment.document) == null ? void 0 : _environment$document.activeElement) !== inputRef.current) {
      var _inputRef$current;
      inputRef == null ? void 0 : (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.focus();
    }
  }, [isOpen, environment]);
  var inputKeyDownHandlers = (0, import_react.useMemo)(function() {
    return {
      ArrowDown: function ArrowDown(event) {
        event.preventDefault();
        dispatch({
          type: InputKeyDownArrowDown,
          altKey: event.altKey,
          getItemNodeFromIndex
        });
      },
      ArrowUp: function ArrowUp(event) {
        event.preventDefault();
        dispatch({
          type: InputKeyDownArrowUp,
          altKey: event.altKey,
          getItemNodeFromIndex
        });
      },
      Home: function Home(event) {
        if (!latest.current.state.isOpen) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownHome,
          getItemNodeFromIndex
        });
      },
      End: function End(event) {
        if (!latest.current.state.isOpen) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownEnd,
          getItemNodeFromIndex
        });
      },
      Escape: function Escape(event) {
        var latestState = latest.current.state;
        if (latestState.isOpen || latestState.inputValue || latestState.selectedItem || latestState.highlightedIndex > -1) {
          event.preventDefault();
          dispatch({
            type: InputKeyDownEscape
          });
        }
      },
      Enter: function Enter(event) {
        var latestState = latest.current.state;
        if (!latestState.isOpen || event.which === 229) {
          return;
        }
        event.preventDefault();
        dispatch({
          type: InputKeyDownEnter,
          getItemNodeFromIndex
        });
      },
      PageUp: function PageUp(event) {
        if (latest.current.state.isOpen) {
          event.preventDefault();
          dispatch({
            type: InputKeyDownPageUp,
            getItemNodeFromIndex
          });
        }
      },
      PageDown: function PageDown(event) {
        if (latest.current.state.isOpen) {
          event.preventDefault();
          dispatch({
            type: InputKeyDownPageDown,
            getItemNodeFromIndex
          });
        }
      }
    };
  }, [dispatch, latest, getItemNodeFromIndex]);
  var getLabelProps = (0, import_react.useCallback)(function(labelProps) {
    return _extends({
      id: elementIds.labelId,
      htmlFor: elementIds.inputId
    }, labelProps);
  }, [elementIds]);
  var getMenuProps = (0, import_react.useCallback)(function(_temp, _temp2) {
    var _extends2;
    var _ref = _temp === void 0 ? {} : _temp, onMouseLeave = _ref.onMouseLeave, _ref$refKey = _ref.refKey, refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey, ref = _ref.ref, rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);
    var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$suppressRefErro = _ref2.suppressRefError, suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
    setGetterPropCallInfo("getMenuProps", suppressRefError, refKey, menuRef);
    return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function(menuNode) {
      menuRef.current = menuNode;
    }), _extends2.id = elementIds.menuId, _extends2.role = "listbox", _extends2["aria-labelledby"] = rest && rest["aria-label"] ? void 0 : "" + elementIds.labelId, _extends2.onMouseLeave = callAllEventHandlers(onMouseLeave, function() {
      dispatch({
        type: MenuMouseLeave
      });
    }), _extends2), rest);
  }, [dispatch, setGetterPropCallInfo, elementIds]);
  var getItemProps = (0, import_react.useCallback)(function(_temp3) {
    var _extends3, _ref4;
    var _ref3 = _temp3 === void 0 ? {} : _temp3, itemProp = _ref3.item, indexProp = _ref3.index, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, ref = _ref3.ref, onMouseMove = _ref3.onMouseMove, onMouseDown = _ref3.onMouseDown, onClick = _ref3.onClick;
    _ref3.onPress;
    var disabled = _ref3.disabled, rest = _objectWithoutPropertiesLoose(_ref3, _excluded2$1);
    var _latest$current = latest.current, latestProps = _latest$current.props, latestState = _latest$current.state;
    var _getItemAndIndex = getItemAndIndex(itemProp, indexProp, latestProps.items, "Pass either item or index to getItemProps!"), index = _getItemAndIndex[1];
    var onSelectKey = "onClick";
    var customClickHandler = onClick;
    var itemHandleMouseMove = function itemHandleMouseMove2() {
      if (index === latestState.highlightedIndex) {
        return;
      }
      shouldScrollRef.current = false;
      dispatch({
        type: ItemMouseMove,
        index,
        disabled
      });
    };
    var itemHandleClick = function itemHandleClick2() {
      dispatch({
        type: ItemClick,
        index
      });
    };
    var itemHandleMouseDown = function itemHandleMouseDown2(e2) {
      return e2.preventDefault();
    };
    return _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function(itemNode) {
      if (itemNode) {
        itemRefs.current[elementIds.getItemId(index)] = itemNode;
      }
    }), _extends3.disabled = disabled, _extends3.role = "option", _extends3["aria-selected"] = "" + (index === latestState.highlightedIndex), _extends3.id = elementIds.getItemId(index), _extends3), !disabled && (_ref4 = {}, _ref4[onSelectKey] = callAllEventHandlers(customClickHandler, itemHandleClick), _ref4), {
      onMouseMove: callAllEventHandlers(onMouseMove, itemHandleMouseMove),
      onMouseDown: callAllEventHandlers(onMouseDown, itemHandleMouseDown)
    }, rest);
  }, [dispatch, latest, shouldScrollRef, elementIds]);
  var getToggleButtonProps = (0, import_react.useCallback)(function(_temp4) {
    var _extends4;
    var _ref5 = _temp4 === void 0 ? {} : _temp4, onClick = _ref5.onClick;
    _ref5.onPress;
    var _ref5$refKey = _ref5.refKey, refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey, ref = _ref5.ref, rest = _objectWithoutPropertiesLoose(_ref5, _excluded3);
    var latestState = latest.current.state;
    var toggleButtonHandleClick = function toggleButtonHandleClick2() {
      dispatch({
        type: ToggleButtonClick
      });
    };
    return _extends((_extends4 = {}, _extends4[refKey] = handleRefs(ref, function(toggleButtonNode) {
      toggleButtonRef.current = toggleButtonNode;
    }), _extends4["aria-controls"] = elementIds.menuId, _extends4["aria-expanded"] = latestState.isOpen, _extends4.id = elementIds.toggleButtonId, _extends4.tabIndex = -1, _extends4), !rest.disabled && _extends({}, {
      onClick: callAllEventHandlers(onClick, toggleButtonHandleClick)
    }), rest);
  }, [dispatch, latest, elementIds]);
  var getInputProps = (0, import_react.useCallback)(function(_temp5, _temp6) {
    var _extends5;
    var _ref6 = _temp5 === void 0 ? {} : _temp5, onKeyDown = _ref6.onKeyDown, onChange = _ref6.onChange, onInput = _ref6.onInput, onFocus = _ref6.onFocus, onBlur = _ref6.onBlur;
    _ref6.onChangeText;
    var _ref6$refKey = _ref6.refKey, refKey = _ref6$refKey === void 0 ? "ref" : _ref6$refKey, ref = _ref6.ref, rest = _objectWithoutPropertiesLoose(_ref6, _excluded4);
    var _ref7 = _temp6 === void 0 ? {} : _temp6, _ref7$suppressRefErro = _ref7.suppressRefError, suppressRefError = _ref7$suppressRefErro === void 0 ? false : _ref7$suppressRefErro;
    setGetterPropCallInfo("getInputProps", suppressRefError, refKey, inputRef);
    var latestState = latest.current.state;
    var inputHandleKeyDown = function inputHandleKeyDown2(event) {
      var key = normalizeArrowKey(event);
      if (key && inputKeyDownHandlers[key]) {
        inputKeyDownHandlers[key](event);
      }
    };
    var inputHandleChange = function inputHandleChange2(event) {
      dispatch({
        type: InputChange,
        inputValue: event.target.value
      });
    };
    var inputHandleBlur = function inputHandleBlur2(event) {
      if (latestState.isOpen && !mouseAndTouchTrackersRef.current.isMouseDown) {
        dispatch({
          type: InputBlur,
          selectItem: event.relatedTarget !== null
        });
      }
    };
    var inputHandleFocus = function inputHandleFocus2() {
      if (!latestState.isOpen) {
        dispatch({
          type: InputFocus
        });
      }
    };
    var onChangeKey = "onChange";
    var eventHandlers = {};
    if (!rest.disabled) {
      var _eventHandlers;
      eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = callAllEventHandlers(onChange, onInput, inputHandleChange), _eventHandlers.onKeyDown = callAllEventHandlers(onKeyDown, inputHandleKeyDown), _eventHandlers.onBlur = callAllEventHandlers(onBlur, inputHandleBlur), _eventHandlers.onFocus = callAllEventHandlers(onFocus, inputHandleFocus), _eventHandlers);
    }
    return _extends((_extends5 = {}, _extends5[refKey] = handleRefs(ref, function(inputNode) {
      inputRef.current = inputNode;
    }), _extends5["aria-activedescendant"] = latestState.isOpen && latestState.highlightedIndex > -1 ? elementIds.getItemId(latestState.highlightedIndex) : "", _extends5["aria-autocomplete"] = "list", _extends5["aria-controls"] = elementIds.menuId, _extends5["aria-expanded"] = latestState.isOpen, _extends5["aria-labelledby"] = rest && rest["aria-label"] ? void 0 : "" + elementIds.labelId, _extends5.autoComplete = "off", _extends5.id = elementIds.inputId, _extends5.role = "combobox", _extends5.value = latestState.inputValue, _extends5), eventHandlers, rest);
  }, [dispatch, inputKeyDownHandlers, latest, mouseAndTouchTrackersRef, setGetterPropCallInfo, elementIds]);
  var toggleMenu = (0, import_react.useCallback)(function() {
    dispatch({
      type: FunctionToggleMenu
    });
  }, [dispatch]);
  var closeMenu = (0, import_react.useCallback)(function() {
    dispatch({
      type: FunctionCloseMenu
    });
  }, [dispatch]);
  var openMenu = (0, import_react.useCallback)(function() {
    dispatch({
      type: FunctionOpenMenu
    });
  }, [dispatch]);
  var setHighlightedIndex = (0, import_react.useCallback)(function(newHighlightedIndex) {
    dispatch({
      type: FunctionSetHighlightedIndex,
      highlightedIndex: newHighlightedIndex
    });
  }, [dispatch]);
  var selectItem = (0, import_react.useCallback)(function(newSelectedItem) {
    dispatch({
      type: FunctionSelectItem,
      selectedItem: newSelectedItem
    });
  }, [dispatch]);
  var setInputValue = (0, import_react.useCallback)(function(newInputValue) {
    dispatch({
      type: FunctionSetInputValue,
      inputValue: newInputValue
    });
  }, [dispatch]);
  var reset = (0, import_react.useCallback)(function() {
    dispatch({
      type: FunctionReset$1
    });
  }, [dispatch]);
  return {
    // prop getters.
    getItemProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getToggleButtonProps,
    // actions.
    toggleMenu,
    openMenu,
    closeMenu,
    setHighlightedIndex,
    setInputValue,
    selectItem,
    reset,
    // state.
    highlightedIndex,
    isOpen,
    selectedItem,
    inputValue
  };
}
var defaultStateValues = {
  activeIndex: -1,
  selectedItems: []
};
function getInitialValue(props, propKey) {
  return getInitialValue$1(props, propKey, defaultStateValues);
}
function getDefaultValue(props, propKey) {
  return getDefaultValue$1(props, propKey, defaultStateValues);
}
function getInitialState(props) {
  var activeIndex = getInitialValue(props, "activeIndex");
  var selectedItems = getInitialValue(props, "selectedItems");
  return {
    activeIndex,
    selectedItems
  };
}
function isKeyDownOperationPermitted(event) {
  if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
    return false;
  }
  var element = event.target;
  if (element instanceof HTMLInputElement && // if element is a text input
  element.value !== "" && // and we have text in it
  // and cursor is either not at the start or is currently highlighting text.
  (element.selectionStart !== 0 || element.selectionEnd !== 0)) {
    return false;
  }
  return true;
}
function getA11yRemovalMessage(selectionParameters) {
  var removedSelectedItem = selectionParameters.removedSelectedItem, itemToStringLocal = selectionParameters.itemToString;
  return itemToStringLocal(removedSelectedItem) + " has been removed.";
}
var propTypes = {
  selectedItems: import_prop_types.default.array,
  initialSelectedItems: import_prop_types.default.array,
  defaultSelectedItems: import_prop_types.default.array,
  itemToString: import_prop_types.default.func,
  getA11yRemovalMessage: import_prop_types.default.func,
  stateReducer: import_prop_types.default.func,
  activeIndex: import_prop_types.default.number,
  initialActiveIndex: import_prop_types.default.number,
  defaultActiveIndex: import_prop_types.default.number,
  onActiveIndexChange: import_prop_types.default.func,
  onSelectedItemsChange: import_prop_types.default.func,
  keyNavigationNext: import_prop_types.default.string,
  keyNavigationPrevious: import_prop_types.default.string,
  environment: import_prop_types.default.shape({
    addEventListener: import_prop_types.default.func,
    removeEventListener: import_prop_types.default.func,
    document: import_prop_types.default.shape({
      getElementById: import_prop_types.default.func,
      activeElement: import_prop_types.default.any,
      body: import_prop_types.default.any
    })
  })
};
var defaultProps = {
  itemToString: defaultProps$3.itemToString,
  stateReducer: defaultProps$3.stateReducer,
  environment: defaultProps$3.environment,
  getA11yRemovalMessage,
  keyNavigationNext: "ArrowRight",
  keyNavigationPrevious: "ArrowLeft"
};
var validatePropTypes = noop;
if (true) {
  validatePropTypes = function validatePropTypes2(options, caller) {
    import_prop_types.default.checkPropTypes(propTypes, options, "prop", caller.name);
  };
}
var SelectedItemClick = true ? "__selected_item_click__" : 0;
var SelectedItemKeyDownDelete = true ? "__selected_item_keydown_delete__" : 1;
var SelectedItemKeyDownBackspace = true ? "__selected_item_keydown_backspace__" : 2;
var SelectedItemKeyDownNavigationNext = true ? "__selected_item_keydown_navigation_next__" : 3;
var SelectedItemKeyDownNavigationPrevious = true ? "__selected_item_keydown_navigation_previous__" : 4;
var DropdownKeyDownNavigationPrevious = true ? "__dropdown_keydown_navigation_previous__" : 5;
var DropdownKeyDownBackspace = true ? "__dropdown_keydown_backspace__" : 6;
var DropdownClick = true ? "__dropdown_click__" : 7;
var FunctionAddSelectedItem = true ? "__function_add_selected_item__" : 8;
var FunctionRemoveSelectedItem = true ? "__function_remove_selected_item__" : 9;
var FunctionSetSelectedItems = true ? "__function_set_selected_items__" : 10;
var FunctionSetActiveIndex = true ? "__function_set_active_index__" : 11;
var FunctionReset = true ? "__function_reset__" : 12;
var stateChangeTypes = Object.freeze({
  __proto__: null,
  SelectedItemClick,
  SelectedItemKeyDownDelete,
  SelectedItemKeyDownBackspace,
  SelectedItemKeyDownNavigationNext,
  SelectedItemKeyDownNavigationPrevious,
  DropdownKeyDownNavigationPrevious,
  DropdownKeyDownBackspace,
  DropdownClick,
  FunctionAddSelectedItem,
  FunctionRemoveSelectedItem,
  FunctionSetSelectedItems,
  FunctionSetActiveIndex,
  FunctionReset
});
function downshiftMultipleSelectionReducer(state, action) {
  var type = action.type, index = action.index, props = action.props, selectedItem = action.selectedItem;
  var activeIndex = state.activeIndex, selectedItems = state.selectedItems;
  var changes;
  switch (type) {
    case SelectedItemClick:
      changes = {
        activeIndex: index
      };
      break;
    case SelectedItemKeyDownNavigationPrevious:
      changes = {
        activeIndex: activeIndex - 1 < 0 ? 0 : activeIndex - 1
      };
      break;
    case SelectedItemKeyDownNavigationNext:
      changes = {
        activeIndex: activeIndex + 1 >= selectedItems.length ? -1 : activeIndex + 1
      };
      break;
    case SelectedItemKeyDownBackspace:
    case SelectedItemKeyDownDelete: {
      if (activeIndex < 0) {
        break;
      }
      var newActiveIndex = activeIndex;
      if (selectedItems.length === 1) {
        newActiveIndex = -1;
      } else if (activeIndex === selectedItems.length - 1) {
        newActiveIndex = selectedItems.length - 2;
      }
      changes = _extends({
        selectedItems: [].concat(selectedItems.slice(0, activeIndex), selectedItems.slice(activeIndex + 1))
      }, {
        activeIndex: newActiveIndex
      });
      break;
    }
    case DropdownKeyDownNavigationPrevious:
      changes = {
        activeIndex: selectedItems.length - 1
      };
      break;
    case DropdownKeyDownBackspace:
      changes = {
        selectedItems: selectedItems.slice(0, selectedItems.length - 1)
      };
      break;
    case FunctionAddSelectedItem:
      changes = {
        selectedItems: [].concat(selectedItems, [selectedItem])
      };
      break;
    case DropdownClick:
      changes = {
        activeIndex: -1
      };
      break;
    case FunctionRemoveSelectedItem: {
      var _newActiveIndex = activeIndex;
      var selectedItemIndex = selectedItems.indexOf(selectedItem);
      if (selectedItemIndex < 0) {
        break;
      }
      if (selectedItems.length === 1) {
        _newActiveIndex = -1;
      } else if (selectedItemIndex === selectedItems.length - 1) {
        _newActiveIndex = selectedItems.length - 2;
      }
      changes = {
        selectedItems: [].concat(selectedItems.slice(0, selectedItemIndex), selectedItems.slice(selectedItemIndex + 1)),
        activeIndex: _newActiveIndex
      };
      break;
    }
    case FunctionSetSelectedItems: {
      var newSelectedItems = action.selectedItems;
      changes = {
        selectedItems: newSelectedItems
      };
      break;
    }
    case FunctionSetActiveIndex: {
      var _newActiveIndex2 = action.activeIndex;
      changes = {
        activeIndex: _newActiveIndex2
      };
      break;
    }
    case FunctionReset:
      changes = {
        activeIndex: getDefaultValue(props, "activeIndex"),
        selectedItems: getDefaultValue(props, "selectedItems")
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return _extends({}, state, changes);
}
var _excluded = ["refKey", "ref", "onClick", "onKeyDown", "selectedItem", "index"];
var _excluded2 = ["refKey", "ref", "onKeyDown", "onClick", "preventKeyAction"];
useMultipleSelection.stateChangeTypes = stateChangeTypes;
function useMultipleSelection(userProps) {
  if (userProps === void 0) {
    userProps = {};
  }
  validatePropTypes(userProps, useMultipleSelection);
  var props = _extends({}, defaultProps, userProps);
  var getA11yRemovalMessage2 = props.getA11yRemovalMessage, itemToString2 = props.itemToString, environment = props.environment, keyNavigationNext = props.keyNavigationNext, keyNavigationPrevious = props.keyNavigationPrevious;
  var _useControlledReducer = useControlledReducer$1(downshiftMultipleSelectionReducer, getInitialState(props), props), state = _useControlledReducer[0], dispatch = _useControlledReducer[1];
  var activeIndex = state.activeIndex, selectedItems = state.selectedItems;
  var isInitialMountRef = (0, import_react.useRef)(true);
  var dropdownRef = (0, import_react.useRef)(null);
  var previousSelectedItemsRef = (0, import_react.useRef)(selectedItems);
  var selectedItemRefs = (0, import_react.useRef)();
  selectedItemRefs.current = [];
  var latest = useLatestRef({
    state,
    props
  });
  (0, import_react.useEffect)(function() {
    if (isInitialMountRef.current || false) {
      return;
    }
    if (selectedItems.length < previousSelectedItemsRef.current.length) {
      var removedSelectedItem = previousSelectedItemsRef.current.find(function(item) {
        return selectedItems.indexOf(item) < 0;
      });
      setStatus(getA11yRemovalMessage2({
        itemToString: itemToString2,
        resultCount: selectedItems.length,
        removedSelectedItem,
        activeIndex,
        activeSelectedItem: selectedItems[activeIndex]
      }), environment.document);
    }
    previousSelectedItemsRef.current = selectedItems;
  }, [selectedItems.length]);
  (0, import_react.useEffect)(function() {
    if (isInitialMountRef.current) {
      return;
    }
    if (activeIndex === -1 && dropdownRef.current) {
      dropdownRef.current.focus();
    } else if (selectedItemRefs.current[activeIndex]) {
      selectedItemRefs.current[activeIndex].focus();
    }
  }, [activeIndex]);
  useControlPropsValidator({
    isInitialMount: isInitialMountRef.current,
    props,
    state
  });
  var setGetterPropCallInfo = useGetterPropsCalledChecker("getDropdownProps");
  (0, import_react.useEffect)(function() {
    isInitialMountRef.current = false;
    return function() {
      isInitialMountRef.current = true;
    };
  }, []);
  var selectedItemKeyDownHandlers = (0, import_react.useMemo)(function() {
    var _ref;
    return _ref = {}, _ref[keyNavigationPrevious] = function() {
      dispatch({
        type: SelectedItemKeyDownNavigationPrevious
      });
    }, _ref[keyNavigationNext] = function() {
      dispatch({
        type: SelectedItemKeyDownNavigationNext
      });
    }, _ref.Delete = function Delete() {
      dispatch({
        type: SelectedItemKeyDownDelete
      });
    }, _ref.Backspace = function Backspace() {
      dispatch({
        type: SelectedItemKeyDownBackspace
      });
    }, _ref;
  }, [dispatch, keyNavigationNext, keyNavigationPrevious]);
  var dropdownKeyDownHandlers = (0, import_react.useMemo)(function() {
    var _ref2;
    return _ref2 = {}, _ref2[keyNavigationPrevious] = function(event) {
      if (isKeyDownOperationPermitted(event)) {
        dispatch({
          type: DropdownKeyDownNavigationPrevious
        });
      }
    }, _ref2.Backspace = function Backspace(event) {
      if (isKeyDownOperationPermitted(event)) {
        dispatch({
          type: DropdownKeyDownBackspace
        });
      }
    }, _ref2;
  }, [dispatch, keyNavigationPrevious]);
  var getSelectedItemProps = (0, import_react.useCallback)(function(_temp) {
    var _extends2;
    var _ref3 = _temp === void 0 ? {} : _temp, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, ref = _ref3.ref, onClick = _ref3.onClick, onKeyDown = _ref3.onKeyDown, selectedItemProp = _ref3.selectedItem, indexProp = _ref3.index, rest = _objectWithoutPropertiesLoose(_ref3, _excluded);
    var latestState = latest.current.state;
    var _getItemAndIndex = getItemAndIndex(selectedItemProp, indexProp, latestState.selectedItems, "Pass either item or index to getSelectedItemProps!"), index = _getItemAndIndex[1];
    var isFocusable = index > -1 && index === latestState.activeIndex;
    var selectedItemHandleClick = function selectedItemHandleClick2() {
      dispatch({
        type: SelectedItemClick,
        index
      });
    };
    var selectedItemHandleKeyDown = function selectedItemHandleKeyDown2(event) {
      var key = normalizeArrowKey(event);
      if (key && selectedItemKeyDownHandlers[key]) {
        selectedItemKeyDownHandlers[key](event);
      }
    };
    return _extends((_extends2 = {}, _extends2[refKey] = handleRefs(ref, function(selectedItemNode) {
      if (selectedItemNode) {
        selectedItemRefs.current.push(selectedItemNode);
      }
    }), _extends2.tabIndex = isFocusable ? 0 : -1, _extends2.onClick = callAllEventHandlers(onClick, selectedItemHandleClick), _extends2.onKeyDown = callAllEventHandlers(onKeyDown, selectedItemHandleKeyDown), _extends2), rest);
  }, [dispatch, latest, selectedItemKeyDownHandlers]);
  var getDropdownProps = (0, import_react.useCallback)(function(_temp2, _temp3) {
    var _extends3;
    var _ref4 = _temp2 === void 0 ? {} : _temp2, _ref4$refKey = _ref4.refKey, refKey = _ref4$refKey === void 0 ? "ref" : _ref4$refKey, ref = _ref4.ref, onKeyDown = _ref4.onKeyDown, onClick = _ref4.onClick, _ref4$preventKeyActio = _ref4.preventKeyAction, preventKeyAction = _ref4$preventKeyActio === void 0 ? false : _ref4$preventKeyActio, rest = _objectWithoutPropertiesLoose(_ref4, _excluded2);
    var _ref5 = _temp3 === void 0 ? {} : _temp3, _ref5$suppressRefErro = _ref5.suppressRefError, suppressRefError = _ref5$suppressRefErro === void 0 ? false : _ref5$suppressRefErro;
    setGetterPropCallInfo("getDropdownProps", suppressRefError, refKey, dropdownRef);
    var dropdownHandleKeyDown = function dropdownHandleKeyDown2(event) {
      var key = normalizeArrowKey(event);
      if (key && dropdownKeyDownHandlers[key]) {
        dropdownKeyDownHandlers[key](event);
      }
    };
    var dropdownHandleClick = function dropdownHandleClick2() {
      dispatch({
        type: DropdownClick
      });
    };
    return _extends((_extends3 = {}, _extends3[refKey] = handleRefs(ref, function(dropdownNode) {
      if (dropdownNode) {
        dropdownRef.current = dropdownNode;
      }
    }), _extends3), !preventKeyAction && {
      onKeyDown: callAllEventHandlers(onKeyDown, dropdownHandleKeyDown),
      onClick: callAllEventHandlers(onClick, dropdownHandleClick)
    }, rest);
  }, [dispatch, dropdownKeyDownHandlers, setGetterPropCallInfo]);
  var addSelectedItem = (0, import_react.useCallback)(function(selectedItem) {
    dispatch({
      type: FunctionAddSelectedItem,
      selectedItem
    });
  }, [dispatch]);
  var removeSelectedItem = (0, import_react.useCallback)(function(selectedItem) {
    dispatch({
      type: FunctionRemoveSelectedItem,
      selectedItem
    });
  }, [dispatch]);
  var setSelectedItems = (0, import_react.useCallback)(function(newSelectedItems) {
    dispatch({
      type: FunctionSetSelectedItems,
      selectedItems: newSelectedItems
    });
  }, [dispatch]);
  var setActiveIndex = (0, import_react.useCallback)(function(newActiveIndex) {
    dispatch({
      type: FunctionSetActiveIndex,
      activeIndex: newActiveIndex
    });
  }, [dispatch]);
  var reset = (0, import_react.useCallback)(function() {
    dispatch({
      type: FunctionReset
    });
  }, [dispatch]);
  return {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    setSelectedItems,
    setActiveIndex,
    reset,
    selectedItems,
    activeIndex
  };
}
export {
  Downshift$1 as default,
  resetIdCounter,
  useCombobox,
  useMultipleSelection,
  useSelect
};
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v17.0.2
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=downshift.js.map
