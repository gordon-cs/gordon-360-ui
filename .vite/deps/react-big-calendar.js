import {
  require_browser
} from "./chunk-UCHQXV4D.js";
import {
  _iterableToArray,
  _toConsumableArray
} from "./chunk-T4XRSJVY.js";
import {
  _classCallCheck,
  _createSuper,
  _inherits
} from "./chunk-GZHN7YFF.js";
import {
  _defineProperty
} from "./chunk-OUNQININ.js";
import {
  _createClass,
  _unsupportedIterableToArray
} from "./chunk-CLTD24QJ.js";
import {
  _typeof
} from "./chunk-7JSK233G.js";
import {
  addClass,
  removeClass
} from "./chunk-JSYQ4L5I.js";
import {
  _inheritsLoose
} from "./chunk-ORMIY5SP.js";
import {
  _assertThisInitialized
} from "./chunk-LQHJAPLN.js";
import {
  arrow_default,
  computeStyles_default,
  eventListeners_default,
  flip_default,
  hide_default,
  init_arrow,
  init_computeStyles,
  init_createPopper,
  init_enums,
  init_eventListeners,
  init_flip,
  init_hide,
  init_offset,
  init_popperOffsets,
  init_preventOverflow,
  offset_default,
  placements,
  popperGenerator,
  popperOffsets_default,
  preventOverflow_default
} from "./chunk-GDO532OI.js";
import {
  require_react_dom
} from "./chunk-KPNI7CHY.js";
import {
  clsx_m_default,
  init_clsx_m
} from "./chunk-XWRMNTVH.js";
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

// node_modules/warning/warning.js
var require_warning = __commonJS({
  "node_modules/warning/warning.js"(exports2, module2) {
    "use strict";
    var __DEV__ = true;
    var warning2 = function() {
    };
    if (__DEV__) {
      printWarning = function printWarning2(format, args) {
        var len = arguments.length;
        args = new Array(len > 1 ? len - 1 : 0);
        for (var key = 1; key < len; key++) {
          args[key - 1] = arguments[key];
        }
        var argIndex = 0;
        var message = "Warning: " + format.replace(/%s/g, function() {
          return args[argIndex++];
        });
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
      warning2 = function(condition, format, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for (var key = 2; key < len; key++) {
          args[key - 2] = arguments[key];
        }
        if (format === void 0) {
          throw new Error(
            "`warning(condition, format, ...args)` requires a warning message argument"
          );
        }
        if (!condition) {
          printWarning.apply(null, [format].concat(args));
        }
      };
    }
    var printWarning;
    module2.exports = warning2;
  }
});

// node_modules/dayjs/plugin/isBetween.js
var require_isBetween = __commonJS({
  "node_modules/dayjs/plugin/isBetween.js"(exports2, module2) {
    !function(e, i) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = i() : "function" == typeof define && define.amd ? define(i) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isBetween = i();
    }(exports2, function() {
      "use strict";
      return function(e, i, t) {
        i.prototype.isBetween = function(e2, i2, s, f) {
          var n = t(e2), o = t(i2), r = "(" === (f = f || "()")[0], u = ")" === f[1];
          return (r ? this.isAfter(n, s) : !this.isBefore(n, s)) && (u ? this.isBefore(o, s) : !this.isAfter(o, s)) || (r ? this.isBefore(n, s) : !this.isAfter(n, s)) && (u ? this.isAfter(o, s) : !this.isBefore(o, s));
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/isSameOrAfter.js
var require_isSameOrAfter = __commonJS({
  "node_modules/dayjs/plugin/isSameOrAfter.js"(exports2, module2) {
    !function(e, t) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isSameOrAfter = t();
    }(exports2, function() {
      "use strict";
      return function(e, t) {
        t.prototype.isSameOrAfter = function(e2, t2) {
          return this.isSame(e2, t2) || this.isAfter(e2, t2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/isSameOrBefore.js
var require_isSameOrBefore = __commonJS({
  "node_modules/dayjs/plugin/isSameOrBefore.js"(exports2, module2) {
    !function(e, i) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = i() : "function" == typeof define && define.amd ? define(i) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isSameOrBefore = i();
    }(exports2, function() {
      "use strict";
      return function(e, i) {
        i.prototype.isSameOrBefore = function(e2, i2) {
          return this.isSame(e2, i2) || this.isBefore(e2, i2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/localeData.js
var require_localeData = __commonJS({
  "node_modules/dayjs/plugin/localeData.js"(exports2, module2) {
    !function(n, e) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = e() : "function" == typeof define && define.amd ? define(e) : (n = "undefined" != typeof globalThis ? globalThis : n || self).dayjs_plugin_localeData = e();
    }(exports2, function() {
      "use strict";
      return function(n, e, t) {
        var r = e.prototype, o = function(n2) {
          return n2 && (n2.indexOf ? n2 : n2.s);
        }, u = function(n2, e2, t2, r2, u2) {
          var i2 = n2.name ? n2 : n2.$locale(), a2 = o(i2[e2]), s2 = o(i2[t2]), f = a2 || s2.map(function(n3) {
            return n3.slice(0, r2);
          });
          if (!u2)
            return f;
          var d = i2.weekStart;
          return f.map(function(n3, e3) {
            return f[(e3 + (d || 0)) % 7];
          });
        }, i = function() {
          return t.Ls[t.locale()];
        }, a = function(n2, e2) {
          return n2.formats[e2] || function(n3) {
            return n3.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(n4, e3, t2) {
              return e3 || t2.slice(1);
            });
          }(n2.formats[e2.toUpperCase()]);
        }, s = function() {
          var n2 = this;
          return { months: function(e2) {
            return e2 ? e2.format("MMMM") : u(n2, "months");
          }, monthsShort: function(e2) {
            return e2 ? e2.format("MMM") : u(n2, "monthsShort", "months", 3);
          }, firstDayOfWeek: function() {
            return n2.$locale().weekStart || 0;
          }, weekdays: function(e2) {
            return e2 ? e2.format("dddd") : u(n2, "weekdays");
          }, weekdaysMin: function(e2) {
            return e2 ? e2.format("dd") : u(n2, "weekdaysMin", "weekdays", 2);
          }, weekdaysShort: function(e2) {
            return e2 ? e2.format("ddd") : u(n2, "weekdaysShort", "weekdays", 3);
          }, longDateFormat: function(e2) {
            return a(n2.$locale(), e2);
          }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
        };
        r.localeData = function() {
          return s.bind(this)();
        }, t.localeData = function() {
          var n2 = i();
          return { firstDayOfWeek: function() {
            return n2.weekStart || 0;
          }, weekdays: function() {
            return t.weekdays();
          }, weekdaysShort: function() {
            return t.weekdaysShort();
          }, weekdaysMin: function() {
            return t.weekdaysMin();
          }, months: function() {
            return t.months();
          }, monthsShort: function() {
            return t.monthsShort();
          }, longDateFormat: function(e2) {
            return a(n2, e2);
          }, meridiem: n2.meridiem, ordinal: n2.ordinal };
        }, t.months = function() {
          return u(i(), "months");
        }, t.monthsShort = function() {
          return u(i(), "monthsShort", "months", 3);
        }, t.weekdays = function(n2) {
          return u(i(), "weekdays", null, null, n2);
        }, t.weekdaysShort = function(n2) {
          return u(i(), "weekdaysShort", "weekdays", 3, n2);
        }, t.weekdaysMin = function(n2) {
          return u(i(), "weekdaysMin", "weekdays", 2, n2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/localizedFormat.js
var require_localizedFormat = __commonJS({
  "node_modules/dayjs/plugin/localizedFormat.js"(exports2, module2) {
    !function(e, t) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_localizedFormat = t();
    }(exports2, function() {
      "use strict";
      var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
      return function(t, o, n) {
        var r = o.prototype, i = r.format;
        n.en.formats = e, r.format = function(t2) {
          void 0 === t2 && (t2 = "YYYY-MM-DDTHH:mm:ssZ");
          var o2 = this.$locale().formats, n2 = function(t3, o3) {
            return t3.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t4, n3, r2) {
              var i2 = r2 && r2.toUpperCase();
              return n3 || o3[r2] || e[r2] || o3[i2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e2, t5, o4) {
                return t5 || o4.slice(1);
              });
            });
          }(t2, void 0 === o2 ? {} : o2);
          return i.call(this, n2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/minMax.js
var require_minMax = __commonJS({
  "node_modules/dayjs/plugin/minMax.js"(exports2, module2) {
    !function(e, n) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = n() : "function" == typeof define && define.amd ? define(n) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_minMax = n();
    }(exports2, function() {
      "use strict";
      return function(e, n, t) {
        var i = function(e2, n2) {
          if (!n2 || !n2.length || !n2[0] || 1 === n2.length && !n2[0].length)
            return null;
          var t2;
          1 === n2.length && n2[0].length > 0 && (n2 = n2[0]);
          t2 = n2[0];
          for (var i2 = 1; i2 < n2.length; i2 += 1)
            n2[i2].isValid() && !n2[i2][e2](t2) || (t2 = n2[i2]);
          return t2;
        };
        t.max = function() {
          var e2 = [].slice.call(arguments, 0);
          return i("isAfter", e2);
        }, t.min = function() {
          var e2 = [].slice.call(arguments, 0);
          return i("isBefore", e2);
        };
      };
    });
  }
});

// node_modules/dayjs/plugin/utc.js
var require_utc = __commonJS({
  "node_modules/dayjs/plugin/utc.js"(exports2, module2) {
    !function(t, i) {
      "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_utc = i();
    }(exports2, function() {
      "use strict";
      var t = "minute", i = /[+-]\d\d(?::?\d\d)?/g, e = /([+-]|\d\d)/g;
      return function(s, f, n) {
        var u = f.prototype;
        n.utc = function(t2) {
          var i2 = { date: t2, utc: true, args: arguments };
          return new f(i2);
        }, u.utc = function(i2) {
          var e2 = n(this.toDate(), { locale: this.$L, utc: true });
          return i2 ? e2.add(this.utcOffset(), t) : e2;
        }, u.local = function() {
          return n(this.toDate(), { locale: this.$L, utc: false });
        };
        var o = u.parse;
        u.parse = function(t2) {
          t2.utc && (this.$u = true), this.$utils().u(t2.$offset) || (this.$offset = t2.$offset), o.call(this, t2);
        };
        var r = u.init;
        u.init = function() {
          if (this.$u) {
            var t2 = this.$d;
            this.$y = t2.getUTCFullYear(), this.$M = t2.getUTCMonth(), this.$D = t2.getUTCDate(), this.$W = t2.getUTCDay(), this.$H = t2.getUTCHours(), this.$m = t2.getUTCMinutes(), this.$s = t2.getUTCSeconds(), this.$ms = t2.getUTCMilliseconds();
          } else
            r.call(this);
        };
        var a = u.utcOffset;
        u.utcOffset = function(s2, f2) {
          var n2 = this.$utils().u;
          if (n2(s2))
            return this.$u ? 0 : n2(this.$offset) ? a.call(this) : this.$offset;
          if ("string" == typeof s2 && (s2 = function(t2) {
            void 0 === t2 && (t2 = "");
            var s3 = t2.match(i);
            if (!s3)
              return null;
            var f3 = ("" + s3[0]).match(e) || ["-", 0, 0], n3 = f3[0], u3 = 60 * +f3[1] + +f3[2];
            return 0 === u3 ? 0 : "+" === n3 ? u3 : -u3;
          }(s2), null === s2))
            return this;
          var u2 = Math.abs(s2) <= 16 ? 60 * s2 : s2, o2 = this;
          if (f2)
            return o2.$offset = u2, o2.$u = 0 === s2, o2;
          if (0 !== s2) {
            var r2 = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (o2 = this.local().add(u2 + r2, t)).$offset = u2, o2.$x.$localOffset = r2;
          } else
            o2 = this.utc();
          return o2;
        };
        var h = u.format;
        u.format = function(t2) {
          var i2 = t2 || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return h.call(this, i2);
        }, u.valueOf = function() {
          var t2 = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * t2;
        }, u.isUTC = function() {
          return !!this.$u;
        }, u.toISOString = function() {
          return this.toDate().toISOString();
        }, u.toString = function() {
          return this.toDate().toUTCString();
        };
        var l = u.toDate;
        u.toDate = function(t2) {
          return "s" === t2 && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
        };
        var c = u.diff;
        u.diff = function(t2, i2, e2) {
          if (t2 && this.$u === t2.$u)
            return c.call(this, t2, i2, e2);
          var s2 = this.local(), f2 = n(t2).local();
          return c.call(s2, f2, i2, e2);
        };
      };
    });
  }
});

// node_modules/@babel/runtime/helpers/esm/objectSpread2.js
function ownKeys(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

// node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
init_objectWithoutPropertiesLoose();
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}

// node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}

// node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}

// node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

// node_modules/react-big-calendar/dist/react-big-calendar.esm.js
var import_react25 = __toESM(require_react());

// node_modules/uncontrollable/lib/esm/hook.js
init_extends();
init_objectWithoutPropertiesLoose();
var import_react = __toESM(require_react());

// node_modules/uncontrollable/lib/esm/utils.js
var import_invariant = __toESM(require_browser());
var noop = function noop2() {
};
function readOnlyPropType(handler, name) {
  return function(props, propName) {
    if (props[propName] !== void 0) {
      if (!props[handler]) {
        return new Error("You have provided a `" + propName + "` prop to `" + name + "` " + ("without an `" + handler + "` handler prop. This will render a read-only field. ") + ("If the field should be mutable use `" + defaultKey(propName) + "`. ") + ("Otherwise, set `" + handler + "`."));
      }
    }
  };
}
function uncontrolledPropTypes(controlledValues, displayName) {
  var propTypes6 = {};
  Object.keys(controlledValues).forEach(function(prop) {
    propTypes6[defaultKey(prop)] = noop;
    if (true) {
      var handler = controlledValues[prop];
      !(typeof handler === "string" && handler.trim().length) ? true ? (0, import_invariant.default)(false, "Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable", displayName, prop) : (0, import_invariant.default)(false) : void 0;
      propTypes6[prop] = readOnlyPropType(handler, displayName);
    }
  });
  return propTypes6;
}
function isProp(props, prop) {
  return props[prop] !== void 0;
}
function defaultKey(key) {
  return "default" + key.charAt(0).toUpperCase() + key.substr(1);
}
function canAcceptRef(component) {
  return !!component && (typeof component !== "function" || component.prototype && component.prototype.isReactComponent);
}

// node_modules/uncontrollable/lib/esm/hook.js
function useUncontrolledProp(propValue, defaultValue, handler) {
  var wasPropRef = (0, import_react.useRef)(propValue !== void 0);
  var _useState = (0, import_react.useState)(defaultValue), stateValue = _useState[0], setState = _useState[1];
  var isProp2 = propValue !== void 0;
  var wasProp = wasPropRef.current;
  wasPropRef.current = isProp2;
  if (!isProp2 && wasProp && stateValue !== defaultValue) {
    setState(defaultValue);
  }
  return [isProp2 ? propValue : stateValue, (0, import_react.useCallback)(function(value) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (handler)
      handler.apply(void 0, [value].concat(args));
    setState(value);
  }, [handler])];
}

// node_modules/uncontrollable/lib/esm/uncontrollable.js
init_objectWithoutPropertiesLoose();
init_extends();
var import_react2 = __toESM(require_react());

// node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js
function componentWillMount() {
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== void 0) {
    this.setState(state);
  }
}
function componentWillReceiveProps(nextProps) {
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== void 0 ? state : null;
  }
  this.setState(updater.bind(this));
}
function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;
function polyfill(Component2) {
  var prototype = Component2.prototype;
  if (!prototype || !prototype.isReactComponent) {
    throw new Error("Can only polyfill class components");
  }
  if (typeof Component2.getDerivedStateFromProps !== "function" && typeof prototype.getSnapshotBeforeUpdate !== "function") {
    return Component2;
  }
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === "function") {
    foundWillMountName = "componentWillMount";
  } else if (typeof prototype.UNSAFE_componentWillMount === "function") {
    foundWillMountName = "UNSAFE_componentWillMount";
  }
  if (typeof prototype.componentWillReceiveProps === "function") {
    foundWillReceivePropsName = "componentWillReceiveProps";
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === "function") {
    foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
  }
  if (typeof prototype.componentWillUpdate === "function") {
    foundWillUpdateName = "componentWillUpdate";
  } else if (typeof prototype.UNSAFE_componentWillUpdate === "function") {
    foundWillUpdateName = "UNSAFE_componentWillUpdate";
  }
  if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
    var componentName = Component2.displayName || Component2.name;
    var newApiName = typeof Component2.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
    throw Error(
      "Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n" + componentName + " uses " + newApiName + " but also contains the following legacy lifecycles:" + (foundWillMountName !== null ? "\n  " + foundWillMountName : "") + (foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "") + (foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "") + "\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks"
    );
  }
  if (typeof Component2.getDerivedStateFromProps === "function") {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }
  if (typeof prototype.getSnapshotBeforeUpdate === "function") {
    if (typeof prototype.componentDidUpdate !== "function") {
      throw new Error(
        "Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype"
      );
    }
    prototype.componentWillUpdate = componentWillUpdate;
    var componentDidUpdate = prototype.componentDidUpdate;
    prototype.componentDidUpdate = function componentDidUpdatePolyfill(prevProps, prevState, maybeSnapshot) {
      var snapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : maybeSnapshot;
      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }
  return Component2;
}

// node_modules/uncontrollable/lib/esm/uncontrollable.js
var import_invariant2 = __toESM(require_browser());
var _jsxFileName = "/Users/jquense/src/uncontrollable/src/uncontrollable.js";
function uncontrollable(Component2, controlledValues, methods) {
  if (methods === void 0) {
    methods = [];
  }
  var displayName = Component2.displayName || Component2.name || "Component";
  var canAcceptRef2 = canAcceptRef(Component2);
  var controlledProps = Object.keys(controlledValues);
  var PROPS_TO_OMIT = controlledProps.map(defaultKey);
  !(canAcceptRef2 || !methods.length) ? true ? (0, import_invariant2.default)(false, "[uncontrollable] stateless function components cannot pass through methods because they have no associated instances. Check component: " + displayName + ", attempting to pass through methods: " + methods.join(", ")) : (0, import_invariant2.default)(false) : void 0;
  var UncontrolledComponent = function(_React$Component) {
    _inheritsLoose(UncontrolledComponent2, _React$Component);
    function UncontrolledComponent2() {
      var _this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.handlers = /* @__PURE__ */ Object.create(null);
      controlledProps.forEach(function(propName) {
        var handlerName = controlledValues[propName];
        var handleChange = function handleChange2(value) {
          if (_this.props[handlerName]) {
            var _this$props;
            _this._notifying = true;
            for (var _len2 = arguments.length, args2 = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args2[_key2 - 1] = arguments[_key2];
            }
            (_this$props = _this.props)[handlerName].apply(_this$props, [value].concat(args2));
            _this._notifying = false;
          }
          if (!_this.unmounted)
            _this.setState(function(_ref) {
              var _extends2;
              var values2 = _ref.values;
              return {
                values: _extends(/* @__PURE__ */ Object.create(null), values2, (_extends2 = {}, _extends2[propName] = value, _extends2))
              };
            });
        };
        _this.handlers[handlerName] = handleChange;
      });
      if (methods.length)
        _this.attachRef = function(ref) {
          _this.inner = ref;
        };
      var values = /* @__PURE__ */ Object.create(null);
      controlledProps.forEach(function(key) {
        values[key] = _this.props[defaultKey(key)];
      });
      _this.state = {
        values,
        prevProps: {}
      };
      return _this;
    }
    var _proto = UncontrolledComponent2.prototype;
    _proto.shouldComponentUpdate = function shouldComponentUpdate() {
      return !this._notifying;
    };
    UncontrolledComponent2.getDerivedStateFromProps = function getDerivedStateFromProps(props, _ref2) {
      var values = _ref2.values, prevProps = _ref2.prevProps;
      var nextState = {
        values: _extends(/* @__PURE__ */ Object.create(null), values),
        prevProps: {}
      };
      controlledProps.forEach(function(key) {
        nextState.prevProps[key] = props[key];
        if (!isProp(props, key) && isProp(prevProps, key)) {
          nextState.values[key] = props[defaultKey(key)];
        }
      });
      return nextState;
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unmounted = true;
    };
    _proto.render = function render() {
      var _this2 = this;
      var _this$props2 = this.props, innerRef = _this$props2.innerRef, props = _objectWithoutPropertiesLoose(_this$props2, ["innerRef"]);
      PROPS_TO_OMIT.forEach(function(prop) {
        delete props[prop];
      });
      var newProps = {};
      controlledProps.forEach(function(propName) {
        var propValue = _this2.props[propName];
        newProps[propName] = propValue !== void 0 ? propValue : _this2.state.values[propName];
      });
      return import_react2.default.createElement(Component2, _extends({}, props, newProps, this.handlers, {
        ref: innerRef || this.attachRef
      }));
    };
    return UncontrolledComponent2;
  }(import_react2.default.Component);
  polyfill(UncontrolledComponent);
  UncontrolledComponent.displayName = "Uncontrolled(" + displayName + ")";
  UncontrolledComponent.propTypes = _extends({
    innerRef: function innerRef() {
    }
  }, uncontrolledPropTypes(controlledValues, displayName));
  methods.forEach(function(method) {
    UncontrolledComponent.prototype[method] = function $proxiedMethod() {
      var _this$inner;
      return (_this$inner = this.inner)[method].apply(_this$inner, arguments);
    };
  });
  var WrappedComponent = UncontrolledComponent;
  if (import_react2.default.forwardRef) {
    WrappedComponent = import_react2.default.forwardRef(function(props, ref) {
      return import_react2.default.createElement(UncontrolledComponent, _extends({}, props, {
        innerRef: ref,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }));
    });
    WrappedComponent.propTypes = UncontrolledComponent.propTypes;
  }
  WrappedComponent.ControlledComponent = Component2;
  WrappedComponent.deferControlTo = function(newComponent, additions, nextMethods) {
    if (additions === void 0) {
      additions = {};
    }
    return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
  };
  return WrappedComponent;
}

// node_modules/react-big-calendar/dist/react-big-calendar.esm.js
init_clsx_m();
var import_prop_types7 = __toESM(require_prop_types());
var import_invariant3 = __toESM(require_browser());

// node_modules/date-arithmetic/index.js
var MILI = "milliseconds";
var SECONDS = "seconds";
var MINUTES = "minutes";
var HOURS = "hours";
var DAY = "day";
var WEEK = "week";
var MONTH = "month";
var YEAR = "year";
var DECADE = "decade";
var CENTURY = "century";
var multiplierMilli = {
  "milliseconds": 1,
  "seconds": 1e3,
  "minutes": 60 * 1e3,
  "hours": 60 * 60 * 1e3,
  "day": 24 * 60 * 60 * 1e3,
  "week": 7 * 24 * 60 * 60 * 1e3
};
var multiplierMonth = {
  "month": 1,
  "year": 12,
  "decade": 10 * 12,
  "century": 100 * 12
};
function daysOf(year2) {
  return [31, daysInFeb(year2), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}
function daysInFeb(year2) {
  return year2 % 4 === 0 && year2 % 100 !== 0 || year2 % 400 === 0 ? 29 : 28;
}
function add(d, num, unit) {
  d = new Date(d);
  switch (unit) {
    case MILI:
    case SECONDS:
    case MINUTES:
    case HOURS:
    case DAY:
    case WEEK:
      return addMillis(d, num * multiplierMilli[unit]);
    case MONTH:
    case YEAR:
    case DECADE:
    case CENTURY:
      return addMonths(d, num * multiplierMonth[unit]);
  }
  throw new TypeError('Invalid units: "' + unit + '"');
}
function addMillis(d, num) {
  var nextDate = new Date(+d + num);
  return solveDST(d, nextDate);
}
function addMonths(d, num) {
  var year2 = d.getFullYear(), month2 = d.getMonth(), day2 = d.getDate(), totalMonths = year2 * 12 + month2 + num, nextYear = Math.trunc(totalMonths / 12), nextMonth = totalMonths % 12, nextDay = Math.min(day2, daysOf(nextYear)[nextMonth]);
  var nextDate = new Date(d);
  nextDate.setFullYear(nextYear);
  nextDate.setDate(1);
  nextDate.setMonth(nextMonth);
  nextDate.setDate(nextDay);
  return nextDate;
}
function solveDST(currentDate, nextDate) {
  var currentOffset = currentDate.getTimezoneOffset(), nextOffset = nextDate.getTimezoneOffset();
  var diffMinutes = nextOffset - currentOffset;
  return new Date(+nextDate + diffMinutes * multiplierMilli["minutes"]);
}
function subtract(d, num, unit) {
  return add(d, -num, unit);
}
function startOf(d, unit, firstOfWeek) {
  d = new Date(d);
  switch (unit) {
    case CENTURY:
    case DECADE:
    case YEAR:
      d = month(d, 0);
    case MONTH:
      d = date(d, 1);
    case WEEK:
    case DAY:
      d = hours(d, 0);
    case HOURS:
      d = minutes(d, 0);
    case MINUTES:
      d = seconds(d, 0);
    case SECONDS:
      d = milliseconds(d, 0);
  }
  if (unit === DECADE)
    d = subtract(d, year(d) % 10, "year");
  if (unit === CENTURY)
    d = subtract(d, year(d) % 100, "year");
  if (unit === WEEK)
    d = weekday(d, 0, firstOfWeek);
  return d;
}
function endOf(d, unit, firstOfWeek) {
  d = new Date(d);
  d = startOf(d, unit, firstOfWeek);
  switch (unit) {
    case CENTURY:
    case DECADE:
    case YEAR:
    case MONTH:
    case WEEK:
      d = add(d, 1, unit);
      d = subtract(d, 1, DAY);
      d.setHours(23, 59, 59, 999);
      break;
    case DAY:
      d.setHours(23, 59, 59, 999);
      break;
    case HOURS:
    case MINUTES:
    case SECONDS:
      d = add(d, 1, unit);
      d = subtract(d, 1, MILI);
  }
  return d;
}
var eq = createComparer(function(a, b) {
  return a === b;
});
var neq = createComparer(function(a, b) {
  return a !== b;
});
var gt = createComparer(function(a, b) {
  return a > b;
});
var gte = createComparer(function(a, b) {
  return a >= b;
});
var lt = createComparer(function(a, b) {
  return a < b;
});
var lte = createComparer(function(a, b) {
  return a <= b;
});
function min() {
  return new Date(Math.min.apply(Math, arguments));
}
function max() {
  return new Date(Math.max.apply(Math, arguments));
}
function inRange(day2, min2, max2, unit) {
  unit = unit || "day";
  return (!min2 || gte(day2, min2, unit)) && (!max2 || lte(day2, max2, unit));
}
var milliseconds = createAccessor("Milliseconds");
var seconds = createAccessor("Seconds");
var minutes = createAccessor("Minutes");
var hours = createAccessor("Hours");
var day = createAccessor("Day");
var date = createAccessor("Date");
var month = createAccessor("Month");
var year = createAccessor("FullYear");
function weekday(d, val, firstDay) {
  var w = (day(d) + 7 - (firstDay || 0)) % 7;
  return val === void 0 ? w : add(d, val - w, DAY);
}
function createAccessor(method) {
  var hourLength = function(method2) {
    switch (method2) {
      case "Milliseconds":
        return 36e5;
      case "Seconds":
        return 3600;
      case "Minutes":
        return 60;
      case "Hours":
        return 1;
      default:
        return null;
    }
  }(method);
  return function(d, val) {
    if (val === void 0)
      return d["get" + method]();
    var dateOut = new Date(d);
    dateOut["set" + method](val);
    if (hourLength && dateOut["get" + method]() != val && (method === "Hours" || val >= hourLength && dateOut.getHours() - d.getHours() < Math.floor(val / hourLength))) {
      dateOut["set" + method](val + hourLength);
    }
    return dateOut;
  };
}
function createComparer(operator) {
  return function(a, b, unit) {
    return operator(+startOf(a, unit), +startOf(b, unit));
  };
}

// node_modules/lodash-es/_baseSlice.js
function baseSlice(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
var baseSlice_default = baseSlice;

// node_modules/lodash-es/eq.js
function eq2(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq2;

// node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal_default = freeGlobal;

// node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal_default || freeSelf || Function("return this")();
var root_default = root;

// node_modules/lodash-es/_Symbol.js
var Symbol2 = root_default.Symbol;
var Symbol_default = Symbol2;

// node_modules/lodash-es/_getRawTag.js
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var getRawTag_default = getRawTag;

// node_modules/lodash-es/_objectToString.js
var objectProto2 = Object.prototype;
var nativeObjectToString2 = objectProto2.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;

// node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction;

// node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_default = isLength;

// node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER2 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var isIndex_default = isIndex;

// node_modules/lodash-es/_isIterateeCall.js
function isIterateeCall(value, index, object) {
  if (!isObject_default(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike_default(object) && isIndex_default(index, object.length) : type == "string" && index in object) {
    return eq_default(object[index], value);
  }
  return false;
}
var isIterateeCall_default = isIterateeCall;

// node_modules/lodash-es/_trimmedEndIndex.js
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var trimmedEndIndex_default = trimmedEndIndex;

// node_modules/lodash-es/_baseTrim.js
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
var baseTrim_default = baseTrim;

// node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// node_modules/lodash-es/isSymbol.js
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
}
var isSymbol_default = isSymbol;

// node_modules/lodash-es/toNumber.js
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN;
  }
  if (isObject_default(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject_default(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim_default(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_default = toNumber;

// node_modules/lodash-es/toFinite.js
var INFINITY = 1 / 0;
var MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_default(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
var toFinite_default = toFinite;

// node_modules/lodash-es/toInteger.js
function toInteger(value) {
  var result = toFinite_default(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
var toInteger_default = toInteger;

// node_modules/lodash-es/chunk.js
var nativeCeil = Math.ceil;
var nativeMax = Math.max;
function chunk(array, size2, guard) {
  if (guard ? isIterateeCall_default(array, size2, guard) : size2 === void 0) {
    size2 = 1;
  } else {
    size2 = nativeMax(toInteger_default(size2), 0);
  }
  var length = array == null ? 0 : array.length;
  if (!length || size2 < 1) {
    return [];
  }
  var index = 0, resIndex = 0, result = Array(nativeCeil(length / size2));
  while (index < length) {
    result[resIndex++] = baseSlice_default(array, index, index += size2);
  }
  return result;
}
var chunk_default = chunk;

// node_modules/dom-helpers/esm/position.js
init_extends();

// node_modules/dom-helpers/esm/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

// node_modules/dom-helpers/esm/ownerWindow.js
function ownerWindow(node) {
  var doc = ownerDocument(node);
  return doc && doc.defaultView || window;
}

// node_modules/dom-helpers/esm/getComputedStyle.js
function getComputedStyle(node, psuedoElement) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement);
}

// node_modules/dom-helpers/esm/hyphenate.js
var rUpper = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(rUpper, "-$1").toLowerCase();
}

// node_modules/dom-helpers/esm/hyphenateStyle.js
var msPattern = /^ms-/;
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, "-ms-");
}

// node_modules/dom-helpers/esm/isTransform.js
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
  return !!(value && supportedTransforms.test(value));
}

// node_modules/dom-helpers/esm/css.js
function style(node, property2) {
  var css = "";
  var transforms = "";
  if (typeof property2 === "string") {
    return node.style.getPropertyValue(hyphenateStyleName(property2)) || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property2));
  }
  Object.keys(property2).forEach(function(key) {
    var value = property2[key];
    if (!value && value !== 0) {
      node.style.removeProperty(hyphenateStyleName(key));
    } else if (isTransform(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += hyphenateStyleName(key) + ": " + value + ";";
    }
  });
  if (transforms) {
    css += "transform: " + transforms + ";";
  }
  node.style.cssText += ";" + css;
}
var css_default = style;

// node_modules/dom-helpers/esm/contains.js
function contains(context, node) {
  if (context.contains)
    return context.contains(node);
  if (context.compareDocumentPosition)
    return context === node || !!(context.compareDocumentPosition(node) & 16);
}

// node_modules/dom-helpers/esm/isDocument.js
function isDocument(element) {
  return "nodeType" in element && element.nodeType === document.DOCUMENT_NODE;
}

// node_modules/dom-helpers/esm/isWindow.js
function isWindow(node) {
  if ("window" in node && node.window === node)
    return node;
  if (isDocument(node))
    return node.defaultView || false;
  return false;
}

// node_modules/dom-helpers/esm/getScrollAccessor.js
function getscrollAccessor(offset2) {
  var prop = offset2 === "pageXOffset" ? "scrollLeft" : "scrollTop";
  function scrollAccessor(node, val) {
    var win = isWindow(node);
    if (val === void 0) {
      return win ? win[offset2] : node[prop];
    }
    if (win) {
      win.scrollTo(win[offset2], val);
    } else {
      node[prop] = val;
    }
  }
  return scrollAccessor;
}

// node_modules/dom-helpers/esm/scrollLeft.js
var scrollLeft_default = getscrollAccessor("pageXOffset");

// node_modules/dom-helpers/esm/scrollTop.js
var scrollTop_default = getscrollAccessor("pageYOffset");

// node_modules/dom-helpers/esm/offset.js
function offset(node) {
  var doc = ownerDocument(node);
  var box = {
    top: 0,
    left: 0,
    height: 0,
    width: 0
  };
  var docElem = doc && doc.documentElement;
  if (!docElem || !contains(docElem, node))
    return box;
  if (node.getBoundingClientRect !== void 0)
    box = node.getBoundingClientRect();
  box = {
    top: box.top + scrollTop_default(docElem) - (docElem.clientTop || 0),
    left: box.left + scrollLeft_default(docElem) - (docElem.clientLeft || 0),
    width: box.width,
    height: box.height
  };
  return box;
}

// node_modules/dom-helpers/esm/offsetParent.js
var isHTMLElement = function isHTMLElement2(e) {
  return !!e && "offsetParent" in e;
};
function offsetParent(node) {
  var doc = ownerDocument(node);
  var parent2 = node && node.offsetParent;
  while (isHTMLElement(parent2) && parent2.nodeName !== "HTML" && css_default(parent2, "position") === "static") {
    parent2 = parent2.offsetParent;
  }
  return parent2 || doc.documentElement;
}

// node_modules/dom-helpers/esm/position.js
var nodeName = function nodeName2(node) {
  return node.nodeName && node.nodeName.toLowerCase();
};
function position(node, offsetParent2) {
  var parentOffset = {
    top: 0,
    left: 0
  };
  var offset2;
  if (css_default(node, "position") === "fixed") {
    offset2 = node.getBoundingClientRect();
  } else {
    var parent2 = offsetParent2 || offsetParent(node);
    offset2 = offset(node);
    if (nodeName(parent2) !== "html")
      parentOffset = offset(parent2);
    var borderTop = String(css_default(parent2, "borderTopWidth") || 0);
    parentOffset.top += parseInt(borderTop, 10) - scrollTop_default(parent2) || 0;
    var borderLeft = String(css_default(parent2, "borderLeftWidth") || 0);
    parentOffset.left += parseInt(borderLeft, 10) - scrollLeft_default(parent2) || 0;
  }
  var marginTop = String(css_default(node, "marginTop") || 0);
  var marginLeft = String(css_default(node, "marginLeft") || 0);
  return _extends({}, offset2, {
    top: offset2.top - parentOffset.top - (parseInt(marginTop, 10) || 0),
    left: offset2.left - parentOffset.left - (parseInt(marginLeft, 10) || 0)
  });
}

// node_modules/dom-helpers/esm/canUseDOM.js
var canUseDOM_default = !!(typeof window !== "undefined" && window.document && window.document.createElement);

// node_modules/dom-helpers/esm/animationFrame.js
var prev = (/* @__PURE__ */ new Date()).getTime();
function fallback(fn2) {
  var curr = (/* @__PURE__ */ new Date()).getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var handle = setTimeout(fn2, ms);
  prev = curr;
  return handle;
}
var vendors = ["", "webkit", "moz", "o", "ms"];
var cancelMethod = "clearTimeout";
var rafImpl = fallback;
var getKey = function getKey2(vendor, k) {
  return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + "AnimationFrame";
};
if (canUseDOM_default) {
  vendors.some(function(vendor) {
    var rafMethod = getKey(vendor, "request");
    if (rafMethod in window) {
      cancelMethod = getKey(vendor, "cancel");
      rafImpl = function rafImpl2(cb) {
        return window[rafMethod](cb);
      };
    }
    return !!rafImpl;
  });
}
var cancel = function cancel2(id) {
  if (typeof window[cancelMethod] === "function")
    window[cancelMethod](id);
};
var request = rafImpl;

// node_modules/dom-helpers/esm/matches.js
var matchesImpl;
function matches(node, selector) {
  if (!matchesImpl) {
    var body = document.body;
    var nativeMatch = body.matches || body.matchesSelector || body.webkitMatchesSelector || body.mozMatchesSelector || body.msMatchesSelector;
    matchesImpl = function matchesImpl2(n, s) {
      return nativeMatch.call(n, s);
    };
  }
  return matchesImpl(node, selector);
}

// node_modules/dom-helpers/esm/querySelectorAll.js
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}

// node_modules/dom-helpers/esm/addEventListener.js
var optionsSupported = false;
var onceSupported = false;
try {
  options = {
    get passive() {
      return optionsSupported = true;
    },
    get once() {
      return onceSupported = optionsSupported = true;
    }
  };
  if (canUseDOM_default) {
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, true);
  }
} catch (e) {
}
var options;
function addEventListener(node, eventName, handler, options) {
  if (options && typeof options !== "boolean" && !onceSupported) {
    var once = options.once, capture = options.capture;
    var wrappedHandler = handler;
    if (!onceSupported && once) {
      wrappedHandler = handler.__once || function onceHandler(event) {
        this.removeEventListener(eventName, onceHandler, capture);
        handler.call(this, event);
      };
      handler.__once = wrappedHandler;
    }
    node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
  }
  node.addEventListener(eventName, handler, options);
}
var addEventListener_default = addEventListener;

// node_modules/react-overlays/esm/Dropdown.js
var import_react17 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());

// node_modules/@restart/hooks/esm/usePrevious.js
var import_react3 = __toESM(require_react());
function usePrevious(value) {
  var ref = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(function() {
    ref.current = value;
  });
  return ref.current;
}

// node_modules/@restart/hooks/esm/useForceUpdate.js
var import_react4 = __toESM(require_react());
function useForceUpdate() {
  var _useReducer = (0, import_react4.useReducer)(function(state) {
    return !state;
  }, false), dispatch = _useReducer[1];
  return dispatch;
}

// node_modules/@restart/hooks/esm/useEventListener.js
var import_react7 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useEventCallback.js
var import_react6 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useCommittedRef.js
var import_react5 = __toESM(require_react());
function useCommittedRef(value) {
  var ref = (0, import_react5.useRef)(value);
  (0, import_react5.useEffect)(function() {
    ref.current = value;
  }, [value]);
  return ref;
}
var useCommittedRef_default = useCommittedRef;

// node_modules/@restart/hooks/esm/useEventCallback.js
function useEventCallback(fn2) {
  var ref = useCommittedRef_default(fn2);
  return (0, import_react6.useCallback)(function() {
    return ref.current && ref.current.apply(ref, arguments);
  }, [ref]);
}

// node_modules/@restart/hooks/esm/useEventListener.js
function useEventListener(eventTarget, event, listener, capture) {
  if (capture === void 0) {
    capture = false;
  }
  var handler = useEventCallback(listener);
  (0, import_react7.useEffect)(function() {
    var target = typeof eventTarget === "function" ? eventTarget() : eventTarget;
    target.addEventListener(event, handler, capture);
    return function() {
      return target.removeEventListener(event, handler, capture);
    };
  }, [eventTarget]);
}

// node_modules/@restart/hooks/esm/useGlobalListener.js
var import_react8 = __toESM(require_react());
function useGlobalListener(event, handler, capture) {
  if (capture === void 0) {
    capture = false;
  }
  var documentTarget = (0, import_react8.useCallback)(function() {
    return document;
  }, []);
  return useEventListener(documentTarget, event, handler, capture);
}

// node_modules/react-overlays/esm/DropdownContext.js
var import_react9 = __toESM(require_react());
var DropdownContext = import_react9.default.createContext(null);
var DropdownContext_default = DropdownContext;

// node_modules/react-overlays/esm/DropdownMenu.js
init_objectWithoutPropertiesLoose();
init_extends();
var import_prop_types = __toESM(require_prop_types());
var import_react15 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useCallbackRef.js
var import_react10 = __toESM(require_react());
function useCallbackRef() {
  return (0, import_react10.useState)(null);
}

// node_modules/react-overlays/esm/usePopper.js
init_extends();
init_objectWithoutPropertiesLoose();
var import_react13 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useSafeState.js
var import_react12 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useMounted.js
var import_react11 = __toESM(require_react());
function useMounted() {
  var mounted = (0, import_react11.useRef)(true);
  var isMounted = (0, import_react11.useRef)(function() {
    return mounted.current;
  });
  (0, import_react11.useEffect)(function() {
    mounted.current = true;
    return function() {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

// node_modules/@restart/hooks/esm/useSafeState.js
function useSafeState(state) {
  var isMounted = useMounted();
  return [state[0], (0, import_react12.useCallback)(function(nextState) {
    if (!isMounted())
      return;
    return state[1](nextState);
  }, [isMounted, state[1]])];
}
var useSafeState_default = useSafeState;

// node_modules/react-overlays/esm/popper.js
init_arrow();
init_computeStyles();
init_eventListeners();
init_flip();
init_hide();
init_offset();
init_popperOffsets();
init_preventOverflow();
init_enums();

// node_modules/@popperjs/core/lib/popper-base.js
init_createPopper();

// node_modules/react-overlays/esm/popper.js
var createPopper2 = popperGenerator({
  defaultModifiers: [hide_default, popperOffsets_default, computeStyles_default, eventListeners_default, offset_default, flip_default, preventOverflow_default, arrow_default]
});

// node_modules/react-overlays/esm/usePopper.js
var initialPopperStyles = function initialPopperStyles2(position2) {
  return {
    position: position2,
    top: "0",
    left: "0",
    opacity: "0",
    pointerEvents: "none"
  };
};
var disabledApplyStylesModifier = {
  name: "applyStyles",
  enabled: false
};
var ariaDescribedByModifier = {
  name: "ariaDescribedBy",
  enabled: true,
  phase: "afterWrite",
  effect: function effect(_ref) {
    var state = _ref.state;
    return function() {
      var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper;
      if ("removeAttribute" in reference) {
        var ids = (reference.getAttribute("aria-describedby") || "").split(",").filter(function(id) {
          return id.trim() !== popper.id;
        });
        if (!ids.length)
          reference.removeAttribute("aria-describedby");
        else
          reference.setAttribute("aria-describedby", ids.join(","));
      }
    };
  },
  fn: function fn(_ref2) {
    var _popper$getAttribute;
    var state = _ref2.state;
    var _state$elements2 = state.elements, popper = _state$elements2.popper, reference = _state$elements2.reference;
    var role = (_popper$getAttribute = popper.getAttribute("role")) == null ? void 0 : _popper$getAttribute.toLowerCase();
    if (popper.id && role === "tooltip" && "setAttribute" in reference) {
      var ids = reference.getAttribute("aria-describedby");
      if (ids && ids.split(",").indexOf(popper.id) !== -1) {
        return;
      }
      reference.setAttribute("aria-describedby", ids ? ids + "," + popper.id : popper.id);
    }
  }
};
var EMPTY_MODIFIERS = [];
function usePopper(referenceElement, popperElement, _temp) {
  var _ref3 = _temp === void 0 ? {} : _temp, _ref3$enabled = _ref3.enabled, enabled = _ref3$enabled === void 0 ? true : _ref3$enabled, _ref3$placement = _ref3.placement, placement = _ref3$placement === void 0 ? "bottom" : _ref3$placement, _ref3$strategy = _ref3.strategy, strategy = _ref3$strategy === void 0 ? "absolute" : _ref3$strategy, _ref3$modifiers = _ref3.modifiers, modifiers = _ref3$modifiers === void 0 ? EMPTY_MODIFIERS : _ref3$modifiers, config = _objectWithoutPropertiesLoose(_ref3, ["enabled", "placement", "strategy", "modifiers"]);
  var popperInstanceRef = (0, import_react13.useRef)();
  var update = (0, import_react13.useCallback)(function() {
    var _popperInstanceRef$cu;
    (_popperInstanceRef$cu = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu.update();
  }, []);
  var forceUpdate = (0, import_react13.useCallback)(function() {
    var _popperInstanceRef$cu2;
    (_popperInstanceRef$cu2 = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu2.forceUpdate();
  }, []);
  var _useSafeState = useSafeState_default((0, import_react13.useState)({
    placement,
    update,
    forceUpdate,
    attributes: {},
    styles: {
      popper: initialPopperStyles(strategy),
      arrow: {}
    }
  })), popperState = _useSafeState[0], setState = _useSafeState[1];
  var updateModifier = (0, import_react13.useMemo)(function() {
    return {
      name: "updateStateModifier",
      enabled: true,
      phase: "write",
      requires: ["computeStyles"],
      fn: function fn2(_ref4) {
        var state = _ref4.state;
        var styles = {};
        var attributes = {};
        Object.keys(state.elements).forEach(function(element) {
          styles[element] = state.styles[element];
          attributes[element] = state.attributes[element];
        });
        setState({
          state,
          styles,
          attributes,
          update,
          forceUpdate,
          placement: state.placement
        });
      }
    };
  }, [update, forceUpdate, setState]);
  (0, import_react13.useEffect)(function() {
    if (!popperInstanceRef.current || !enabled)
      return;
    popperInstanceRef.current.setOptions({
      placement,
      strategy,
      modifiers: [].concat(modifiers, [updateModifier, disabledApplyStylesModifier])
    });
  }, [strategy, placement, updateModifier, enabled]);
  (0, import_react13.useEffect)(function() {
    if (!enabled || referenceElement == null || popperElement == null) {
      return void 0;
    }
    popperInstanceRef.current = createPopper2(referenceElement, popperElement, _extends({}, config, {
      placement,
      strategy,
      modifiers: [].concat(modifiers, [ariaDescribedByModifier, updateModifier])
    }));
    return function() {
      if (popperInstanceRef.current != null) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = void 0;
        setState(function(s) {
          return _extends({}, s, {
            attributes: {},
            styles: {
              popper: initialPopperStyles(strategy)
            }
          });
        });
      }
    };
  }, [enabled, referenceElement, popperElement]);
  return popperState;
}
var usePopper_default = usePopper;

// node_modules/dom-helpers/esm/removeEventListener.js
function removeEventListener(node, eventName, handler, options) {
  var capture = options && typeof options !== "boolean" ? options.capture : options;
  node.removeEventListener(eventName, handler, capture);
  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture);
  }
}
var removeEventListener_default = removeEventListener;

// node_modules/dom-helpers/esm/listen.js
function listen(node, eventName, handler, options) {
  addEventListener_default(node, eventName, handler, options);
  return function() {
    removeEventListener_default(node, eventName, handler, options);
  };
}
var listen_default = listen;

// node_modules/react-overlays/esm/useRootClose.js
var import_react14 = __toESM(require_react());
var import_warning = __toESM(require_warning());

// node_modules/react-overlays/esm/safeFindDOMNode.js
var import_react_dom = __toESM(require_react_dom());
function safeFindDOMNode(componentOrElement) {
  if (componentOrElement && "setState" in componentOrElement) {
    return import_react_dom.default.findDOMNode(componentOrElement);
  }
  return componentOrElement != null ? componentOrElement : null;
}

// node_modules/react-overlays/esm/ownerDocument.js
var ownerDocument_default = function(componentOrElement) {
  return ownerDocument(safeFindDOMNode(componentOrElement));
};

// node_modules/react-overlays/esm/useRootClose.js
var escapeKeyCode = 27;
var noop3 = function noop4() {
};
function isLeftClickEvent(event) {
  return event.button === 0;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var getRefTarget = function getRefTarget2(ref) {
  return ref && ("current" in ref ? ref.current : ref);
};
function useRootClose(ref, onRootClose, _temp) {
  var _ref = _temp === void 0 ? {} : _temp, disabled = _ref.disabled, _ref$clickTrigger = _ref.clickTrigger, clickTrigger = _ref$clickTrigger === void 0 ? "click" : _ref$clickTrigger;
  var preventMouseRootCloseRef = (0, import_react14.useRef)(false);
  var onClose = onRootClose || noop3;
  var handleMouseCapture = (0, import_react14.useCallback)(function(e) {
    var _e$composedPath$;
    var currentTarget = getRefTarget(ref);
    (0, import_warning.default)(!!currentTarget, "RootClose captured a close event but does not have a ref to compare it to. useRootClose(), should be passed a ref that resolves to a DOM node");
    preventMouseRootCloseRef.current = !currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || !!contains(currentTarget, (_e$composedPath$ = e.composedPath == null ? void 0 : e.composedPath()[0]) != null ? _e$composedPath$ : e.target);
  }, [ref]);
  var handleMouse = useEventCallback(function(e) {
    if (!preventMouseRootCloseRef.current) {
      onClose(e);
    }
  });
  var handleKeyUp = useEventCallback(function(e) {
    if (e.keyCode === escapeKeyCode) {
      onClose(e);
    }
  });
  (0, import_react14.useEffect)(function() {
    if (disabled || ref == null)
      return void 0;
    var currentEvent = window.event;
    var doc = ownerDocument_default(getRefTarget(ref));
    var removeMouseCaptureListener = listen_default(doc, clickTrigger, handleMouseCapture, true);
    var removeMouseListener = listen_default(doc, clickTrigger, function(e) {
      if (e === currentEvent) {
        currentEvent = void 0;
        return;
      }
      handleMouse(e);
    });
    var removeKeyupListener = listen_default(doc, "keyup", function(e) {
      if (e === currentEvent) {
        currentEvent = void 0;
        return;
      }
      handleKeyUp(e);
    });
    var mobileSafariHackListeners = [];
    if ("ontouchstart" in doc.documentElement) {
      mobileSafariHackListeners = [].slice.call(doc.body.children).map(function(el) {
        return listen_default(el, "mousemove", noop3);
      });
    }
    return function() {
      removeMouseCaptureListener();
      removeMouseListener();
      removeKeyupListener();
      mobileSafariHackListeners.forEach(function(remove) {
        return remove();
      });
    };
  }, [ref, disabled, clickTrigger, handleMouseCapture, handleMouse, handleKeyUp]);
}
var useRootClose_default = useRootClose;

// node_modules/react-overlays/esm/mergeOptionsWithPopperConfig.js
init_extends();
function toModifierMap(modifiers) {
  var result = {};
  if (!Array.isArray(modifiers)) {
    return modifiers || result;
  }
  modifiers == null ? void 0 : modifiers.forEach(function(m) {
    result[m.name] = m;
  });
  return result;
}
function toModifierArray(map) {
  if (map === void 0) {
    map = {};
  }
  if (Array.isArray(map))
    return map;
  return Object.keys(map).map(function(k) {
    map[k].name = k;
    return map[k];
  });
}
function mergeOptionsWithPopperConfig(_ref) {
  var _modifiers$preventOve, _modifiers$preventOve2, _modifiers$offset, _modifiers$arrow;
  var enabled = _ref.enabled, enableEvents = _ref.enableEvents, placement = _ref.placement, flip = _ref.flip, offset2 = _ref.offset, fixed = _ref.fixed, containerPadding = _ref.containerPadding, arrowElement = _ref.arrowElement, _ref$popperConfig = _ref.popperConfig, popperConfig = _ref$popperConfig === void 0 ? {} : _ref$popperConfig;
  var modifiers = toModifierMap(popperConfig.modifiers);
  return _extends({}, popperConfig, {
    placement,
    enabled,
    strategy: fixed ? "fixed" : popperConfig.strategy,
    modifiers: toModifierArray(_extends({}, modifiers, {
      eventListeners: {
        enabled: enableEvents
      },
      preventOverflow: _extends({}, modifiers.preventOverflow, {
        options: containerPadding ? _extends({
          padding: containerPadding
        }, (_modifiers$preventOve = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve.options) : (_modifiers$preventOve2 = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve2.options
      }),
      offset: {
        options: _extends({
          offset: offset2
        }, (_modifiers$offset = modifiers.offset) == null ? void 0 : _modifiers$offset.options)
      },
      arrow: _extends({}, modifiers.arrow, {
        enabled: !!arrowElement,
        options: _extends({}, (_modifiers$arrow = modifiers.arrow) == null ? void 0 : _modifiers$arrow.options, {
          element: arrowElement
        })
      }),
      flip: _extends({
        enabled: !!flip
      }, modifiers.flip)
    }))
  });
}

// node_modules/react-overlays/esm/DropdownMenu.js
var noop5 = function noop6() {
};
function useDropdownMenu(options) {
  if (options === void 0) {
    options = {};
  }
  var context = (0, import_react15.useContext)(DropdownContext_default);
  var _useCallbackRef = useCallbackRef(), arrowElement = _useCallbackRef[0], attachArrowRef = _useCallbackRef[1];
  var hasShownRef = (0, import_react15.useRef)(false);
  var _options = options, flip = _options.flip, offset2 = _options.offset, rootCloseEvent = _options.rootCloseEvent, _options$fixed = _options.fixed, fixed = _options$fixed === void 0 ? false : _options$fixed, _options$popperConfig = _options.popperConfig, popperConfig = _options$popperConfig === void 0 ? {} : _options$popperConfig, _options$usePopper = _options.usePopper, shouldUsePopper = _options$usePopper === void 0 ? !!context : _options$usePopper;
  var show = (context == null ? void 0 : context.show) == null ? !!options.show : context.show;
  var alignEnd = (context == null ? void 0 : context.alignEnd) == null ? options.alignEnd : context.alignEnd;
  if (show && !hasShownRef.current) {
    hasShownRef.current = true;
  }
  var handleClose = function handleClose2(e) {
    context == null ? void 0 : context.toggle(false, e);
  };
  var _ref = context || {}, drop = _ref.drop, setMenu = _ref.setMenu, menuElement = _ref.menuElement, toggleElement = _ref.toggleElement;
  var placement = alignEnd ? "bottom-end" : "bottom-start";
  if (drop === "up")
    placement = alignEnd ? "top-end" : "top-start";
  else if (drop === "right")
    placement = alignEnd ? "right-end" : "right-start";
  else if (drop === "left")
    placement = alignEnd ? "left-end" : "left-start";
  var popper = usePopper_default(toggleElement, menuElement, mergeOptionsWithPopperConfig({
    placement,
    enabled: !!(shouldUsePopper && show),
    enableEvents: show,
    offset: offset2,
    flip,
    fixed,
    arrowElement,
    popperConfig
  }));
  var menuProps = _extends({
    ref: setMenu || noop5,
    "aria-labelledby": toggleElement == null ? void 0 : toggleElement.id
  }, popper.attributes.popper, {
    style: popper.styles.popper
  });
  var metadata = {
    show,
    alignEnd,
    hasShown: hasShownRef.current,
    toggle: context == null ? void 0 : context.toggle,
    popper: shouldUsePopper ? popper : null,
    arrowProps: shouldUsePopper ? _extends({
      ref: attachArrowRef
    }, popper.attributes.arrow, {
      style: popper.styles.arrow
    }) : {}
  };
  useRootClose_default(menuElement, handleClose, {
    clickTrigger: rootCloseEvent,
    disabled: !show
  });
  return [menuProps, metadata];
}
var propTypes = {
  /**
   * A render prop that returns a Menu element. The `props`
   * argument should spread through to **a component that can accept a ref**.
   *
   * @type {Function ({
   *   show: boolean,
   *   alignEnd: boolean,
   *   close: (?SyntheticEvent) => void,
   *   placement: Placement,
   *   update: () => void,
   *   forceUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *   },
   * }) => React.Element}
   */
  children: import_prop_types.default.func.isRequired,
  /**
   * Controls the visible state of the menu, generally this is
   * provided by the parent `Dropdown` component,
   * but may also be specified as a prop directly.
   */
  show: import_prop_types.default.bool,
  /**
   * Aligns the dropdown menu to the 'end' of it's placement position.
   * Generally this is provided by the parent `Dropdown` component,
   * but may also be specified as a prop directly.
   */
  alignEnd: import_prop_types.default.bool,
  /**
   * Enables the Popper.js `flip` modifier, allowing the Dropdown to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: import_prop_types.default.bool,
  usePopper: import_prop_types.default.oneOf([true, false]),
  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: import_prop_types.default.object,
  /**
   * Override the default event used by RootCloseWrapper.
   */
  rootCloseEvent: import_prop_types.default.string
};
var defaultProps = {
  usePopper: true
};
function DropdownMenu(_ref2) {
  var children = _ref2.children, options = _objectWithoutPropertiesLoose(_ref2, ["children"]);
  var _useDropdownMenu = useDropdownMenu(options), props = _useDropdownMenu[0], meta = _useDropdownMenu[1];
  return import_react15.default.createElement(import_react15.default.Fragment, null, meta.hasShown ? children(props, meta) : null);
}
DropdownMenu.displayName = "ReactOverlaysDropdownMenu";
DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;
var DropdownMenu_default = DropdownMenu;

// node_modules/react-overlays/esm/DropdownToggle.js
var import_prop_types2 = __toESM(require_prop_types());
var import_react16 = __toESM(require_react());
var noop7 = function noop8() {
};
function useDropdownToggle() {
  var _ref = (0, import_react16.useContext)(DropdownContext_default) || {}, _ref$show = _ref.show, show = _ref$show === void 0 ? false : _ref$show, _ref$toggle = _ref.toggle, toggle = _ref$toggle === void 0 ? noop7 : _ref$toggle, setToggle = _ref.setToggle;
  var handleClick = (0, import_react16.useCallback)(function(e) {
    toggle(!show, e);
  }, [show, toggle]);
  return [{
    ref: setToggle || noop7,
    onClick: handleClick,
    "aria-haspopup": true,
    "aria-expanded": !!show
  }, {
    show,
    toggle
  }];
}
var propTypes2 = {
  /**
   * A render prop that returns a Toggle element. The `props`
   * argument should spread through to **a component that can accept a ref**. Use
   * the `onToggle` argument to toggle the menu open or closed
   *
   * @type {Function ({
   *   show: boolean,
   *   toggle: (show: boolean) => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     aria-haspopup: true
   *     aria-expanded: boolean
   *   },
   * }) => React.Element}
   */
  children: import_prop_types2.default.func.isRequired
};
function DropdownToggle(_ref2) {
  var children = _ref2.children;
  var _useDropdownToggle = useDropdownToggle(), props = _useDropdownToggle[0], meta = _useDropdownToggle[1];
  return import_react16.default.createElement(import_react16.default.Fragment, null, children(props, meta));
}
DropdownToggle.displayName = "ReactOverlaysDropdownToggle";
DropdownToggle.propTypes = propTypes2;
var DropdownToggle_default = DropdownToggle;

// node_modules/react-overlays/esm/Dropdown.js
var propTypes3 = {
  /**
   * A render prop that returns the root dropdown element. The `props`
   * argument should spread through to an element containing _both_ the
   * menu and toggle in order to handle keyboard events for focus management.
   *
   * @type {Function ({
   *   props: {
   *     onKeyDown: (SyntheticEvent) => void,
   *   },
   * }) => React.Element}
   */
  children: import_prop_types3.default.node,
  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: import_prop_types3.default.oneOf(["up", "left", "right", "down"]),
  /**
   * Controls the focus behavior for when the Dropdown is opened. Set to
   * `true` to always focus the first menu item, `keyboard` to focus only when
   * navigating via the keyboard, or `false` to disable completely
   *
   * The Default behavior is `false` **unless** the Menu has a `role="menu"`
   * where it will default to `keyboard` to match the recommended [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).
   */
  focusFirstItemOnShow: import_prop_types3.default.oneOf([false, true, "keyboard"]),
  /**
   * A css slector string that will return __focusable__ menu items.
   * Selectors should be relative to the menu component:
   * e.g. ` > li:not('.disabled')`
   */
  itemSelector: import_prop_types3.default.string,
  /**
   * Align the menu to the 'end' side of the placement side of the Dropdown toggle. The default placement is `top-start` or `bottom-start`.
   */
  alignEnd: import_prop_types3.default.bool,
  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show: import_prop_types3.default.bool,
  /**
   * Sets the initial show position of the Dropdown.
   */
  defaultShow: import_prop_types3.default.bool,
  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```ts static
   * function(
   *   isOpen: boolean,
   *   event: SyntheticEvent,
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle: import_prop_types3.default.func
};
function useRefWithUpdate() {
  var forceUpdate = useForceUpdate();
  var ref = (0, import_react17.useRef)(null);
  var attachRef = (0, import_react17.useCallback)(function(element) {
    ref.current = element;
    forceUpdate();
  }, [forceUpdate]);
  return [ref, attachRef];
}
function Dropdown(_ref) {
  var drop = _ref.drop, alignEnd = _ref.alignEnd, defaultShow = _ref.defaultShow, rawShow = _ref.show, rawOnToggle = _ref.onToggle, _ref$itemSelector = _ref.itemSelector, itemSelector = _ref$itemSelector === void 0 ? "* > *" : _ref$itemSelector, focusFirstItemOnShow = _ref.focusFirstItemOnShow, children = _ref.children;
  var _useUncontrolledProp = useUncontrolledProp(rawShow, defaultShow, rawOnToggle), show = _useUncontrolledProp[0], onToggle = _useUncontrolledProp[1];
  var _useRefWithUpdate = useRefWithUpdate(), menuRef = _useRefWithUpdate[0], setMenu = _useRefWithUpdate[1];
  var menuElement = menuRef.current;
  var _useRefWithUpdate2 = useRefWithUpdate(), toggleRef = _useRefWithUpdate2[0], setToggle = _useRefWithUpdate2[1];
  var toggleElement = toggleRef.current;
  var lastShow = usePrevious(show);
  var lastSourceEvent = (0, import_react17.useRef)(null);
  var focusInDropdown = (0, import_react17.useRef)(false);
  var toggle = (0, import_react17.useCallback)(function(nextShow, event) {
    onToggle(nextShow, event);
  }, [onToggle]);
  var context = (0, import_react17.useMemo)(function() {
    return {
      toggle,
      drop,
      show,
      alignEnd,
      menuElement,
      toggleElement,
      setMenu,
      setToggle
    };
  }, [toggle, drop, show, alignEnd, menuElement, toggleElement, setMenu, setToggle]);
  if (menuElement && lastShow && !show) {
    focusInDropdown.current = menuElement.contains(document.activeElement);
  }
  var focusToggle = useEventCallback(function() {
    if (toggleElement && toggleElement.focus) {
      toggleElement.focus();
    }
  });
  var maybeFocusFirst = useEventCallback(function() {
    var type = lastSourceEvent.current;
    var focusType = focusFirstItemOnShow;
    if (focusType == null) {
      focusType = menuRef.current && matches(menuRef.current, "[role=menu]") ? "keyboard" : false;
    }
    if (focusType === false || focusType === "keyboard" && !/^key.+$/.test(type)) {
      return;
    }
    var first = qsa(menuRef.current, itemSelector)[0];
    if (first && first.focus)
      first.focus();
  });
  (0, import_react17.useEffect)(function() {
    if (show)
      maybeFocusFirst();
    else if (focusInDropdown.current) {
      focusInDropdown.current = false;
      focusToggle();
    }
  }, [show, focusInDropdown, focusToggle, maybeFocusFirst]);
  (0, import_react17.useEffect)(function() {
    lastSourceEvent.current = null;
  });
  var getNextFocusedChild = function getNextFocusedChild2(current, offset2) {
    if (!menuRef.current)
      return null;
    var items = qsa(menuRef.current, itemSelector);
    var index = items.indexOf(current) + offset2;
    index = Math.max(0, Math.min(index, items.length));
    return items[index];
  };
  useGlobalListener("keydown", function(event) {
    var _menuRef$current, _toggleRef$current;
    var key = event.key;
    var target = event.target;
    var fromMenu = (_menuRef$current = menuRef.current) == null ? void 0 : _menuRef$current.contains(target);
    var fromToggle = (_toggleRef$current = toggleRef.current) == null ? void 0 : _toggleRef$current.contains(target);
    var isInput = /input|textarea/i.test(target.tagName);
    if (isInput && (key === " " || key !== "Escape" && fromMenu)) {
      return;
    }
    if (!fromMenu && !fromToggle) {
      return;
    }
    if (!menuRef.current && key === "Tab") {
      return;
    }
    lastSourceEvent.current = event.type;
    switch (key) {
      case "ArrowUp": {
        var next = getNextFocusedChild(target, -1);
        if (next && next.focus)
          next.focus();
        event.preventDefault();
        return;
      }
      case "ArrowDown":
        event.preventDefault();
        if (!show) {
          onToggle(true, event);
        } else {
          var _next = getNextFocusedChild(target, 1);
          if (_next && _next.focus)
            _next.focus();
        }
        return;
      case "Tab":
        addEventListener_default(document, "keyup", function(e) {
          var _menuRef$current2;
          if (e.key === "Tab" && !e.target || !((_menuRef$current2 = menuRef.current) != null && _menuRef$current2.contains(e.target))) {
            onToggle(false, event);
          }
        }, {
          once: true
        });
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        onToggle(false, event);
        break;
      default:
    }
  });
  return import_react17.default.createElement(DropdownContext_default.Provider, {
    value: context
  }, children);
}
Dropdown.displayName = "ReactOverlaysDropdown";
Dropdown.propTypes = propTypes3;
Dropdown.Menu = DropdownMenu_default;
Dropdown.Toggle = DropdownToggle_default;

// node_modules/react-overlays/esm/Modal.js
init_extends();
init_objectWithoutPropertiesLoose();

// node_modules/dom-helpers/esm/activeElement.js
function activeElement(doc) {
  if (doc === void 0) {
    doc = ownerDocument();
  }
  try {
    var active = doc.activeElement;
    if (!active || !active.nodeName)
      return null;
    return active;
  } catch (e) {
    return doc.body;
  }
}

// node_modules/react-overlays/esm/Modal.js
var import_prop_types4 = __toESM(require_prop_types());
var import_react21 = __toESM(require_react());
var import_react_dom2 = __toESM(require_react_dom());

// node_modules/@restart/hooks/esm/useUpdatedRef.js
var import_react18 = __toESM(require_react());
function useUpdatedRef(value) {
  var valueRef = (0, import_react18.useRef)(value);
  valueRef.current = value;
  return valueRef;
}

// node_modules/@restart/hooks/esm/useWillUnmount.js
var import_react19 = __toESM(require_react());
function useWillUnmount(fn2) {
  var onUnmount = useUpdatedRef(fn2);
  (0, import_react19.useEffect)(function() {
    return function() {
      return onUnmount.current();
    };
  }, []);
}

// node_modules/dom-helpers/esm/scrollbarSize.js
var size;
function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (canUseDOM_default) {
      var scrollDiv = document.createElement("div");
      scrollDiv.style.position = "absolute";
      scrollDiv.style.top = "-9999px";
      scrollDiv.style.width = "50px";
      scrollDiv.style.height = "50px";
      scrollDiv.style.overflow = "scroll";
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }
  return size;
}

// node_modules/react-overlays/esm/isOverflowing.js
function isBody(node) {
  return node && node.tagName.toLowerCase() === "body";
}
function bodyIsOverflowing(node) {
  var doc = isWindow(node) ? ownerDocument() : ownerDocument(node);
  var win = isWindow(node) || doc.defaultView;
  return doc.body.clientWidth < win.innerWidth;
}
function isOverflowing(container) {
  var win = isWindow(container);
  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
}

// node_modules/react-overlays/esm/manageAriaHidden.js
var BLACKLIST = ["template", "script", "style"];
var isHidable = function isHidable2(_ref) {
  var nodeType = _ref.nodeType, tagName = _ref.tagName;
  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
};
var siblings = function siblings2(container, exclude, cb) {
  [].forEach.call(container.children, function(node) {
    if (exclude.indexOf(node) === -1 && isHidable(node)) {
      cb(node);
    }
  });
};
function ariaHidden(hide, node) {
  if (!node)
    return;
  if (hide) {
    node.setAttribute("aria-hidden", "true");
  } else {
    node.removeAttribute("aria-hidden");
  }
}
function hideSiblings(container, _ref2) {
  var dialog = _ref2.dialog, backdrop = _ref2.backdrop;
  siblings(container, [dialog, backdrop], function(node) {
    return ariaHidden(true, node);
  });
}
function showSiblings(container, _ref3) {
  var dialog = _ref3.dialog, backdrop = _ref3.backdrop;
  siblings(container, [dialog, backdrop], function(node) {
    return ariaHidden(false, node);
  });
}

// node_modules/react-overlays/esm/ModalManager.js
function findIndexOf(arr, cb) {
  var idx = -1;
  arr.some(function(d, i) {
    if (cb(d, i)) {
      idx = i;
      return true;
    }
    return false;
  });
  return idx;
}
var ModalManager = function() {
  function ModalManager2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, _ref$hideSiblingNodes = _ref.hideSiblingNodes, hideSiblingNodes = _ref$hideSiblingNodes === void 0 ? true : _ref$hideSiblingNodes, _ref$handleContainerO = _ref.handleContainerOverflow, handleContainerOverflow = _ref$handleContainerO === void 0 ? true : _ref$handleContainerO;
    this.hideSiblingNodes = void 0;
    this.handleContainerOverflow = void 0;
    this.modals = void 0;
    this.containers = void 0;
    this.data = void 0;
    this.scrollbarSize = void 0;
    this.hideSiblingNodes = hideSiblingNodes;
    this.handleContainerOverflow = handleContainerOverflow;
    this.modals = [];
    this.containers = [];
    this.data = [];
    this.scrollbarSize = scrollbarSize();
  }
  var _proto = ModalManager2.prototype;
  _proto.isContainerOverflowing = function isContainerOverflowing(modal) {
    var data = this.data[this.containerIndexFromModal(modal)];
    return data && data.overflowing;
  };
  _proto.containerIndexFromModal = function containerIndexFromModal(modal) {
    return findIndexOf(this.data, function(d) {
      return d.modals.indexOf(modal) !== -1;
    });
  };
  _proto.setContainerStyle = function setContainerStyle(containerState, container) {
    var style2 = {
      overflow: "hidden"
    };
    containerState.style = {
      overflow: container.style.overflow,
      paddingRight: container.style.paddingRight
    };
    if (containerState.overflowing) {
      style2.paddingRight = parseInt(css_default(container, "paddingRight") || "0", 10) + this.scrollbarSize + "px";
    }
    css_default(container, style2);
  };
  _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
    Object.assign(container.style, containerState.style);
  };
  _proto.add = function add2(modal, container, className) {
    var modalIdx = this.modals.indexOf(modal);
    var containerIdx = this.containers.indexOf(container);
    if (modalIdx !== -1) {
      return modalIdx;
    }
    modalIdx = this.modals.length;
    this.modals.push(modal);
    if (this.hideSiblingNodes) {
      hideSiblings(container, modal);
    }
    if (containerIdx !== -1) {
      this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }
    var data = {
      modals: [modal],
      // right now only the first modal of a container will have its classes applied
      classes: className ? className.split(/\s+/) : [],
      overflowing: isOverflowing(container)
    };
    if (this.handleContainerOverflow) {
      this.setContainerStyle(data, container);
    }
    data.classes.forEach(addClass.bind(null, container));
    this.containers.push(container);
    this.data.push(data);
    return modalIdx;
  };
  _proto.remove = function remove(modal) {
    var modalIdx = this.modals.indexOf(modal);
    if (modalIdx === -1) {
      return;
    }
    var containerIdx = this.containerIndexFromModal(modal);
    var data = this.data[containerIdx];
    var container = this.containers[containerIdx];
    data.modals.splice(data.modals.indexOf(modal), 1);
    this.modals.splice(modalIdx, 1);
    if (data.modals.length === 0) {
      data.classes.forEach(removeClass.bind(null, container));
      if (this.handleContainerOverflow) {
        this.removeContainerStyle(data, container);
      }
      if (this.hideSiblingNodes) {
        showSiblings(container, modal);
      }
      this.containers.splice(containerIdx, 1);
      this.data.splice(containerIdx, 1);
    } else if (this.hideSiblingNodes) {
      var _data$modals = data.modals[data.modals.length - 1], backdrop = _data$modals.backdrop, dialog = _data$modals.dialog;
      ariaHidden(false, dialog);
      ariaHidden(false, backdrop);
    }
  };
  _proto.isTopModal = function isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  };
  return ModalManager2;
}();
var ModalManager_default = ModalManager;

// node_modules/react-overlays/esm/useWaitForDOMRef.js
var import_react20 = __toESM(require_react());
var resolveContainerRef = function resolveContainerRef2(ref) {
  var _ref;
  if (typeof document === "undefined")
    return null;
  if (ref == null)
    return ownerDocument().body;
  if (typeof ref === "function")
    ref = ref();
  if (ref && "current" in ref)
    ref = ref.current;
  if ((_ref = ref) != null && _ref.nodeType)
    return ref || null;
  return null;
};
function useWaitForDOMRef(ref, onResolved) {
  var _useState = (0, import_react20.useState)(function() {
    return resolveContainerRef(ref);
  }), resolvedRef = _useState[0], setRef = _useState[1];
  if (!resolvedRef) {
    var earlyRef = resolveContainerRef(ref);
    if (earlyRef)
      setRef(earlyRef);
  }
  (0, import_react20.useEffect)(function() {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);
  (0, import_react20.useEffect)(function() {
    var nextRef = resolveContainerRef(ref);
    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);
  return resolvedRef;
}

// node_modules/react-overlays/esm/Modal.js
var manager;
function getManager() {
  if (!manager)
    manager = new ModalManager_default();
  return manager;
}
function useModalManager(provided) {
  var modalManager = provided || getManager();
  var modal = (0, import_react21.useRef)({
    dialog: null,
    backdrop: null
  });
  return Object.assign(modal.current, {
    add: function add2(container, className) {
      return modalManager.add(modal.current, container, className);
    },
    remove: function remove() {
      return modalManager.remove(modal.current);
    },
    isTopModal: function isTopModal() {
      return modalManager.isTopModal(modal.current);
    },
    setDialogRef: (0, import_react21.useCallback)(function(ref) {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: (0, import_react21.useCallback)(function(ref) {
      modal.current.backdrop = ref;
    }, [])
  });
}
var Modal = (0, import_react21.forwardRef)(function(_ref, ref) {
  var _ref$show = _ref.show, show = _ref$show === void 0 ? false : _ref$show, _ref$role = _ref.role, role = _ref$role === void 0 ? "dialog" : _ref$role, className = _ref.className, style2 = _ref.style, children = _ref.children, _ref$backdrop = _ref.backdrop, backdrop = _ref$backdrop === void 0 ? true : _ref$backdrop, _ref$keyboard = _ref.keyboard, keyboard = _ref$keyboard === void 0 ? true : _ref$keyboard, onBackdropClick = _ref.onBackdropClick, onEscapeKeyDown = _ref.onEscapeKeyDown, transition = _ref.transition, backdropTransition = _ref.backdropTransition, _ref$autoFocus = _ref.autoFocus, autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus, _ref$enforceFocus = _ref.enforceFocus, enforceFocus = _ref$enforceFocus === void 0 ? true : _ref$enforceFocus, _ref$restoreFocus = _ref.restoreFocus, restoreFocus = _ref$restoreFocus === void 0 ? true : _ref$restoreFocus, restoreFocusOptions = _ref.restoreFocusOptions, renderDialog = _ref.renderDialog, _ref$renderBackdrop = _ref.renderBackdrop, renderBackdrop = _ref$renderBackdrop === void 0 ? function(props) {
    return import_react21.default.createElement("div", props);
  } : _ref$renderBackdrop, providedManager = _ref.manager, containerRef = _ref.container, containerClassName = _ref.containerClassName, onShow = _ref.onShow, _ref$onHide = _ref.onHide, onHide2 = _ref$onHide === void 0 ? function() {
  } : _ref$onHide, onExit = _ref.onExit, onExited = _ref.onExited, onExiting = _ref.onExiting, onEnter = _ref.onEnter, onEntering = _ref.onEntering, onEntered = _ref.onEntered, rest = _objectWithoutPropertiesLoose(_ref, ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "backdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "containerClassName", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"]);
  var container = useWaitForDOMRef(containerRef);
  var modal = useModalManager(providedManager);
  var isMounted = useMounted();
  var prevShow = usePrevious(show);
  var _useState = (0, import_react21.useState)(!show), exited = _useState[0], setExited = _useState[1];
  var lastFocusRef = (0, import_react21.useRef)(null);
  (0, import_react21.useImperativeHandle)(ref, function() {
    return modal;
  }, [modal]);
  if (canUseDOM_default && !prevShow && show) {
    lastFocusRef.current = activeElement();
  }
  if (!transition && !show && !exited) {
    setExited(true);
  } else if (show && exited) {
    setExited(false);
  }
  var handleShow = useEventCallback(function() {
    modal.add(container, containerClassName);
    removeKeydownListenerRef.current = listen_default(document, "keydown", handleDocumentKeyDown);
    removeFocusListenerRef.current = listen_default(
      document,
      "focus",
      // the timeout is necessary b/c this will run before the new modal is mounted
      // and so steals focus from it
      function() {
        return setTimeout(handleEnforceFocus);
      },
      true
    );
    if (onShow) {
      onShow();
    }
    if (autoFocus) {
      var currentActiveElement = activeElement(document);
      if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) {
        lastFocusRef.current = currentActiveElement;
        modal.dialog.focus();
      }
    }
  });
  var handleHide = useEventCallback(function() {
    modal.remove();
    removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
    removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();
    if (restoreFocus) {
      var _lastFocusRef$current;
      (_lastFocusRef$current = lastFocusRef.current) == null ? void 0 : _lastFocusRef$current.focus == null ? void 0 : _lastFocusRef$current.focus(restoreFocusOptions);
      lastFocusRef.current = null;
    }
  });
  (0, import_react21.useEffect)(function() {
    if (!show || !container)
      return;
    handleShow();
  }, [
    show,
    container,
    /* should never change: */
    handleShow
  ]);
  (0, import_react21.useEffect)(function() {
    if (!exited)
      return;
    handleHide();
  }, [exited, handleHide]);
  useWillUnmount(function() {
    handleHide();
  });
  var handleEnforceFocus = useEventCallback(function() {
    if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
      return;
    }
    var currentActiveElement = activeElement();
    if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) {
      modal.dialog.focus();
    }
  });
  var handleBackdropClick = useEventCallback(function(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    onBackdropClick == null ? void 0 : onBackdropClick(e);
    if (backdrop === true) {
      onHide2();
    }
  });
  var handleDocumentKeyDown = useEventCallback(function(e) {
    if (keyboard && e.keyCode === 27 && modal.isTopModal()) {
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
      if (!e.defaultPrevented) {
        onHide2();
      }
    }
  });
  var removeFocusListenerRef = (0, import_react21.useRef)();
  var removeKeydownListenerRef = (0, import_react21.useRef)();
  var handleHidden = function handleHidden2() {
    setExited(true);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    onExited == null ? void 0 : onExited.apply(void 0, args);
  };
  var Transition = transition;
  if (!container || !(show || Transition && !exited)) {
    return null;
  }
  var dialogProps = _extends({
    role,
    ref: modal.setDialogRef,
    // apparently only works on the dialog role element
    "aria-modal": role === "dialog" ? true : void 0
  }, rest, {
    style: style2,
    className,
    tabIndex: -1
  });
  var dialog = renderDialog ? renderDialog(dialogProps) : import_react21.default.createElement("div", dialogProps, import_react21.default.cloneElement(children, {
    role: "document"
  }));
  if (Transition) {
    dialog = import_react21.default.createElement(Transition, {
      appear: true,
      unmountOnExit: true,
      "in": !!show,
      onExit,
      onExiting,
      onExited: handleHidden,
      onEnter,
      onEntering,
      onEntered
    }, dialog);
  }
  var backdropElement = null;
  if (backdrop) {
    var BackdropTransition = backdropTransition;
    backdropElement = renderBackdrop({
      ref: modal.setBackdropRef,
      onClick: handleBackdropClick
    });
    if (BackdropTransition) {
      backdropElement = import_react21.default.createElement(BackdropTransition, {
        appear: true,
        "in": !!show
      }, backdropElement);
    }
  }
  return import_react21.default.createElement(import_react21.default.Fragment, null, import_react_dom2.default.createPortal(import_react21.default.createElement(import_react21.default.Fragment, null, backdropElement, dialog), container));
});
var propTypes4 = {
  /**
   * Set the visibility of the Modal
   */
  show: import_prop_types4.default.bool,
  /**
   * A DOM element, a `ref` to an element, or function that returns either. The Modal is appended to it's `container` element.
   *
   * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
   * page content can be placed behind a virtual backdrop as well as a visual one.
   */
  container: import_prop_types4.default.any,
  /**
   * A callback fired when the Modal is opening.
   */
  onShow: import_prop_types4.default.func,
  /**
   * A callback fired when either the backdrop is clicked, or the escape key is pressed.
   *
   * The `onHide` callback only signals intent from the Modal,
   * you must actually set the `show` prop to `false` for the Modal to close.
   */
  onHide: import_prop_types4.default.func,
  /**
   * Include a backdrop component.
   */
  backdrop: import_prop_types4.default.oneOfType([import_prop_types4.default.bool, import_prop_types4.default.oneOf(["static"])]),
  /**
   * A function that returns the dialog component. Useful for custom
   * rendering. **Note:** the component should make sure to apply the provided ref.
   *
   * ```js static
   * renderDialog={props => <MyDialog {...props} />}
   * ```
   */
  renderDialog: import_prop_types4.default.func,
  /**
   * A function that returns a backdrop component. Useful for custom
   * backdrop rendering.
   *
   * ```js
   *  renderBackdrop={props => <MyBackdrop {...props} />}
   * ```
   */
  renderBackdrop: import_prop_types4.default.func,
  /**
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   *
   * If preventDefault() is called on the keyboard event, closing the modal will be cancelled.
   */
  onEscapeKeyDown: import_prop_types4.default.func,
  /**
   * A callback fired when the backdrop, if specified, is clicked.
   */
  onBackdropClick: import_prop_types4.default.func,
  /**
   * A css class or set of classes applied to the modal container when the modal is open,
   * and removed when it is closed.
   */
  containerClassName: import_prop_types4.default.string,
  /**
   * Close the modal when escape key is pressed
   */
  keyboard: import_prop_types4.default.bool,
  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the dialog component.
   */
  transition: import_prop_types4.default.elementType,
  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the backdrop components.
   */
  backdropTransition: import_prop_types4.default.elementType,
  /**
   * When `true` The modal will automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes. This also
   * works correctly with any Modal children that have the `autoFocus` prop.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  autoFocus: import_prop_types4.default.bool,
  /**
   * When `true` The modal will prevent focus from leaving the Modal while open.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  enforceFocus: import_prop_types4.default.bool,
  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: import_prop_types4.default.bool,
  /**
   * Options passed to focus function when `restoreFocus` is set to `true`
   *
   * @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
   */
  restoreFocusOptions: import_prop_types4.default.shape({
    preventScroll: import_prop_types4.default.bool
  }),
  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: import_prop_types4.default.func,
  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: import_prop_types4.default.func,
  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: import_prop_types4.default.func,
  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: import_prop_types4.default.func,
  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: import_prop_types4.default.func,
  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: import_prop_types4.default.func,
  /**
   * A ModalManager instance used to track and manage the state of open
   * Modals. Useful when customizing how modals interact within a container
   */
  manager: import_prop_types4.default.instanceOf(ModalManager_default)
};
Modal.displayName = "Modal";
Modal.propTypes = propTypes4;
var Modal_default = Object.assign(Modal, {
  Manager: ModalManager_default
});

// node_modules/react-overlays/esm/Overlay.js
init_extends();
init_objectWithoutPropertiesLoose();
var import_prop_types5 = __toESM(require_prop_types());
var import_react23 = __toESM(require_react());
var import_react_dom3 = __toESM(require_react_dom());

// node_modules/@restart/hooks/esm/useMergedRefs.js
var import_react22 = __toESM(require_react());
var toFnRef = function toFnRef2(ref) {
  return !ref || typeof ref === "function" ? ref : function(value) {
    ref.current = value;
  };
};
function mergeRefs(refA, refB) {
  var a = toFnRef(refA);
  var b = toFnRef(refB);
  return function(value) {
    if (a)
      a(value);
    if (b)
      b(value);
  };
}
function useMergedRefs(refA, refB) {
  return (0, import_react22.useMemo)(function() {
    return mergeRefs(refA, refB);
  }, [refA, refB]);
}
var useMergedRefs_default = useMergedRefs;

// node_modules/react-overlays/esm/Overlay.js
var Overlay = import_react23.default.forwardRef(function(props, outerRef) {
  var flip = props.flip, offset2 = props.offset, placement = props.placement, _props$containerPaddi = props.containerPadding, containerPadding = _props$containerPaddi === void 0 ? 5 : _props$containerPaddi, _props$popperConfig = props.popperConfig, popperConfig = _props$popperConfig === void 0 ? {} : _props$popperConfig, Transition = props.transition;
  var _useCallbackRef = useCallbackRef(), rootElement = _useCallbackRef[0], attachRef = _useCallbackRef[1];
  var _useCallbackRef2 = useCallbackRef(), arrowElement = _useCallbackRef2[0], attachArrowRef = _useCallbackRef2[1];
  var mergedRef = useMergedRefs_default(attachRef, outerRef);
  var container = useWaitForDOMRef(props.container);
  var target = useWaitForDOMRef(props.target);
  var _useState = (0, import_react23.useState)(!props.show), exited = _useState[0], setExited = _useState[1];
  var _usePopper = usePopper_default(target, rootElement, mergeOptionsWithPopperConfig({
    placement,
    enableEvents: !!props.show,
    containerPadding: containerPadding || 5,
    flip,
    offset: offset2,
    arrowElement,
    popperConfig
  })), styles = _usePopper.styles, attributes = _usePopper.attributes, popper = _objectWithoutPropertiesLoose(_usePopper, ["styles", "attributes"]);
  if (props.show) {
    if (exited)
      setExited(false);
  } else if (!props.transition && !exited) {
    setExited(true);
  }
  var handleHidden = function handleHidden2() {
    setExited(true);
    if (props.onExited) {
      props.onExited.apply(props, arguments);
    }
  };
  var mountOverlay = props.show || Transition && !exited;
  useRootClose_default(rootElement, props.onHide, {
    disabled: !props.rootClose || props.rootCloseDisabled,
    clickTrigger: props.rootCloseEvent
  });
  if (!mountOverlay) {
    return null;
  }
  var child = props.children(_extends({}, popper, {
    show: !!props.show,
    props: _extends({}, attributes.popper, {
      style: styles.popper,
      ref: mergedRef
    }),
    arrowProps: _extends({}, attributes.arrow, {
      style: styles.arrow,
      ref: attachArrowRef
    })
  }));
  if (Transition) {
    var onExit = props.onExit, onExiting = props.onExiting, onEnter = props.onEnter, onEntering = props.onEntering, onEntered = props.onEntered;
    child = import_react23.default.createElement(Transition, {
      "in": props.show,
      appear: true,
      onExit,
      onExiting,
      onExited: handleHidden,
      onEnter,
      onEntering,
      onEntered
    }, child);
  }
  return container ? import_react_dom3.default.createPortal(child, container) : null;
});
Overlay.displayName = "Overlay";
Overlay.propTypes = {
  /**
   * Set the visibility of the Overlay
   */
  show: import_prop_types5.default.bool,
  /** Specify where the overlay element is positioned in relation to the target element */
  placement: import_prop_types5.default.oneOf(placements),
  /**
   * A DOM Element, Ref to an element, or function that returns either. The `target` element is where
   * the overlay is positioned relative to.
   */
  target: import_prop_types5.default.any,
  /**
   * A DOM Element, Ref to an element, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container: import_prop_types5.default.any,
  /**
   * Enables the Popper.js `flip` modifier, allowing the Overlay to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: import_prop_types5.default.bool,
  /**
   * A render prop that returns an element to overlay and position. See
   * the [react-popper documentation](https://github.com/FezVrasta/react-popper#children) for more info.
   *
   * @type {Function ({
   *   show: boolean,
   *   placement: Placement,
   *   update: () => void,
   *   forceUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *     [string]: string | number,
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     [string]: string | number,
   *   },
   * }) => React.Element}
   */
  children: import_prop_types5.default.func.isRequired,
  /**
   * Control how much space there is between the edge of the boundary element and overlay.
   * A convenience shortcut to setting `popperConfig.modfiers.preventOverflow.padding`
   */
  containerPadding: import_prop_types5.default.number,
  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: import_prop_types5.default.object,
  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose: import_prop_types5.default.bool,
  /**
   * Specify event for toggling overlay
   */
  rootCloseEvent: import_prop_types5.default.oneOf(["click", "mousedown"]),
  /**
   * Specify disabled for disable RootCloseWrapper
   */
  rootCloseDisabled: import_prop_types5.default.bool,
  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   *
   * __required__ when `rootClose` is `true`.
   *
   * @type func
   */
  onHide: function onHide(props) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (props.rootClose) {
      var _PropTypes$func;
      return (_PropTypes$func = import_prop_types5.default.func).isRequired.apply(_PropTypes$func, [props].concat(args));
    }
    return import_prop_types5.default.func.apply(import_prop_types5.default, [props].concat(args));
  },
  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component
   * used to animate the overlay as it changes visibility.
   */
  // @ts-ignore
  transition: import_prop_types5.default.elementType,
  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: import_prop_types5.default.func,
  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: import_prop_types5.default.func,
  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: import_prop_types5.default.func,
  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: import_prop_types5.default.func,
  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: import_prop_types5.default.func,
  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: import_prop_types5.default.func
};
var Overlay_default = Overlay;

// node_modules/react-overlays/esm/Portal.js
var import_prop_types6 = __toESM(require_prop_types());
var import_react_dom4 = __toESM(require_react_dom());
var import_react24 = __toESM(require_react());
var propTypes5 = {
  /**
   * A DOM element, Ref to an element, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container: import_prop_types6.default.any,
  onRendered: import_prop_types6.default.func
};
var Portal = function Portal2(_ref) {
  var container = _ref.container, children = _ref.children, onRendered = _ref.onRendered;
  var resolvedContainer = useWaitForDOMRef(container, onRendered);
  return resolvedContainer ? import_react24.default.createElement(import_react24.default.Fragment, null, import_react_dom4.default.createPortal(children, resolvedContainer)) : null;
};
Portal.displayName = "Portal";
Portal.propTypes = propTypes5;

// node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default = listCacheClear;

// node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var listCacheDelete_default = listCacheDelete;

// node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var listCacheGet_default = listCacheGet;

// node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var listCacheSet_default = listCacheSet;

// node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype["delete"] = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default = stackClear;

// node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var stackDelete_default = stackDelete;

// node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"];
var coreJsData_default = coreJsData;

// node_modules/lodash-es/_isMasked.js
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var toSource_default = toSource;

// node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto2 = Function.prototype;
var objectProto3 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty2 = objectProto3.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// node_modules/lodash-es/_Map.js
var Map2 = getNative_default(root_default, "Map");
var Map_default = Map2;

// node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create");
var nativeCreate_default = nativeCreate;

// node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default = hashClear;

// node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var hashDelete_default = hashDelete;

// node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto4 = Object.prototype;
var hasOwnProperty3 = objectProto4.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty3.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// node_modules/lodash-es/_hashHas.js
var objectProto5 = Object.prototype;
var hasOwnProperty4 = objectProto5.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty4.call(data, key);
}
var hashHas_default = hashHas;

// node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var hashSet_default = hashSet;

// node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype["delete"] = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// node_modules/lodash-es/_getMapData.js
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result = getMapData_default(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var mapCacheDelete_default = mapCacheDelete;

// node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size2 = data.size;
  data.set(key, value);
  this.size += data.size == size2 ? 0 : 1;
  return this;
}
var mapCacheSet_default = mapCacheSet;

// node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype["delete"] = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var stackSet_default = stackSet;

// node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype["delete"] = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// node_modules/lodash-es/_setCacheAdd.js
var HASH_UNDEFINED3 = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED3);
  return this;
}
var setCacheAdd_default = setCacheAdd;

// node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
var setCacheHas_default = setCacheHas;

// node_modules/lodash-es/_SetCache.js
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache_default();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
SetCache.prototype.has = setCacheHas_default;
var SetCache_default = SetCache;

// node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var arraySome_default = arraySome;

// node_modules/lodash-es/_cacheHas.js
function cacheHas(cache, key) {
  return cache.has(key);
}
var cacheHas_default = cacheHas;

// node_modules/lodash-es/_equalArrays.js
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function(othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var equalArrays_default = equalArrays;

// node_modules/lodash-es/_Uint8Array.js
var Uint8Array = root_default.Uint8Array;
var Uint8Array_default = Uint8Array;

// node_modules/lodash-es/_mapToArray.js
function mapToArray(map) {
  var index = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var mapToArray_default = mapToArray;

// node_modules/lodash-es/_setToArray.js
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var setToArray_default = setToArray;

// node_modules/lodash-es/_equalByTag.js
var COMPARE_PARTIAL_FLAG2 = 1;
var COMPARE_UNORDERED_FLAG2 = 2;
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var symbolTag2 = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq_default(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag:
      var convert = mapToArray_default;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag2:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var equalByTag_default = equalByTag;

// node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values) {
  var index = -1, length = values.length, offset2 = array.length;
  while (++index < length) {
    array[offset2 + index] = values[index];
  }
  return array;
}
var arrayPush_default = arrayPush;

// node_modules/lodash-es/isArray.js
var isArray = Array.isArray;
var isArray_default = isArray;

// node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var arrayFilter_default = arrayFilter;

// node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// node_modules/lodash-es/_getSymbols.js
var objectProto6 = Object.prototype;
var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// node_modules/lodash-es/_baseTimes.js
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var baseTimes_default = baseTimes;

// node_modules/lodash-es/_baseIsArguments.js
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var baseIsArguments_default = baseIsArguments;

// node_modules/lodash-es/isArguments.js
var objectProto7 = Object.prototype;
var hasOwnProperty5 = objectProto7.hasOwnProperty;
var propertyIsEnumerable2 = objectProto7.propertyIsEnumerable;
var isArguments = baseIsArguments_default(function() {
  return arguments;
}()) ? baseIsArguments_default : function(value) {
  return isObjectLike_default(value) && hasOwnProperty5.call(value, "callee") && !propertyIsEnumerable2.call(value, "callee");
};
var isArguments_default = isArguments;

// node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default = stubFalse;

// node_modules/lodash-es/isBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root_default.Buffer : void 0;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse_default;
var isBuffer_default = isBuffer;

// node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var errorTag2 = "[object Error]";
var funcTag2 = "[object Function]";
var mapTag2 = "[object Map]";
var numberTag2 = "[object Number]";
var objectTag = "[object Object]";
var regexpTag2 = "[object RegExp]";
var setTag2 = "[object Set]";
var stringTag2 = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag2 = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag2] = typedArrayTags[boolTag2] = typedArrayTags[dataViewTag2] = typedArrayTags[dateTag2] = typedArrayTags[errorTag2] = typedArrayTags[funcTag2] = typedArrayTags[mapTag2] = typedArrayTags[numberTag2] = typedArrayTags[objectTag] = typedArrayTags[regexpTag2] = typedArrayTags[setTag2] = typedArrayTags[stringTag2] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// node_modules/lodash-es/_nodeUtil.js
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
var freeProcess = moduleExports2 && freeGlobal_default.process;
var nodeUtil = function() {
  try {
    var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeUtil_default = nodeUtil;

// node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
var isTypedArray_default = isTypedArray;

// node_modules/lodash-es/_arrayLikeKeys.js
var objectProto8 = Object.prototype;
var hasOwnProperty6 = objectProto8.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty6.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex_default(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var arrayLikeKeys_default = arrayLikeKeys;

// node_modules/lodash-es/_isPrototype.js
var objectProto9 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto9;
  return value === proto;
}
var isPrototype_default = isPrototype;

// node_modules/lodash-es/_overArg.js
function overArg(func, transform2) {
  return function(arg) {
    return func(transform2(arg));
  };
}
var overArg_default = overArg;

// node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object);
var nativeKeys_default = nativeKeys;

// node_modules/lodash-es/_baseKeys.js
var objectProto10 = Object.prototype;
var hasOwnProperty7 = objectProto10.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty7.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var baseKeys_default = baseKeys;

// node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// node_modules/lodash-es/_equalObjects.js
var COMPARE_PARTIAL_FLAG3 = 1;
var objectProto11 = Object.prototype;
var hasOwnProperty8 = objectProto11.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty8.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var equalObjects_default = equalObjects;

// node_modules/lodash-es/_DataView.js
var DataView = getNative_default(root_default, "DataView");
var DataView_default = DataView;

// node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise");
var Promise_default = Promise2;

// node_modules/lodash-es/_Set.js
var Set = getNative_default(root_default, "Set");
var Set_default = Set;

// node_modules/lodash-es/_WeakMap.js
var WeakMap = getNative_default(root_default, "WeakMap");
var WeakMap_default = WeakMap;

// node_modules/lodash-es/_getTag.js
var mapTag3 = "[object Map]";
var objectTag2 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag3 = "[object Set]";
var weakMapTag2 = "[object WeakMap]";
var dataViewTag3 = "[object DataView]";
var dataViewCtorString = toSource_default(DataView_default);
var mapCtorString = toSource_default(Map_default);
var promiseCtorString = toSource_default(Promise_default);
var setCtorString = toSource_default(Set_default);
var weakMapCtorString = toSource_default(WeakMap_default);
var getTag = baseGetTag_default;
if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag3 || Map_default && getTag(new Map_default()) != mapTag3 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag3 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
  getTag = function(value) {
    var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag3;
        case mapCtorString:
          return mapTag3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag3;
        case weakMapCtorString:
          return weakMapTag2;
      }
    }
    return result;
  };
}
var getTag_default = getTag;

// node_modules/lodash-es/_baseIsEqualDeep.js
var COMPARE_PARTIAL_FLAG4 = 1;
var argsTag3 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var objectTag3 = "[object Object]";
var objectProto12 = Object.prototype;
var hasOwnProperty9 = objectProto12.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag2 : getTag_default(object), othTag = othIsArr ? arrayTag2 : getTag_default(other);
  objTag = objTag == argsTag3 ? objectTag3 : objTag;
  othTag = othTag == argsTag3 ? objectTag3 : othTag;
  var objIsObj = objTag == objectTag3, othIsObj = othTag == objectTag3, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty9.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty9.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var baseIsEqualDeep_default = baseIsEqualDeep;

// node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var baseIsEqual_default = baseIsEqual;

// node_modules/lodash-es/isEqual.js
function isEqual(value, other) {
  return baseIsEqual_default(value, other);
}
var isEqual_default = isEqual;

// node_modules/dom-helpers/esm/height.js
function height(node, client) {
  var win = isWindow(node);
  return win ? win.innerHeight : client ? node.clientHeight : offset(node).height;
}

// node_modules/dom-helpers/esm/closest.js
function closest(node, selector, stopAt) {
  if (node.closest && !stopAt)
    node.closest(selector);
  var nextNode = node;
  do {
    if (matches(nextNode, selector))
      return nextNode;
    nextNode = nextNode.parentElement;
  } while (nextNode && nextNode !== stopAt && nextNode.nodeType === document.ELEMENT_NODE);
  return null;
}

// node_modules/lodash-es/_baseFindIndex.js
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
var baseFindIndex_default = baseFindIndex;

// node_modules/lodash-es/_baseIsMatch.js
var COMPARE_PARTIAL_FLAG5 = 1;
var COMPARE_UNORDERED_FLAG3 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack_default();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG5 | COMPARE_UNORDERED_FLAG3, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var baseIsMatch_default = baseIsMatch;

// node_modules/lodash-es/_isStrictComparable.js
function isStrictComparable(value) {
  return value === value && !isObject_default(value);
}
var isStrictComparable_default = isStrictComparable;

// node_modules/lodash-es/_getMatchData.js
function getMatchData(object) {
  var result = keys_default(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable_default(value)];
  }
  return result;
}
var getMatchData_default = getMatchData;

// node_modules/lodash-es/_matchesStrictComparable.js
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var matchesStrictComparable_default = matchesStrictComparable;

// node_modules/lodash-es/_baseMatches.js
function baseMatches(source) {
  var matchData = getMatchData_default(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch_default(object, source, matchData);
  };
}
var baseMatches_default = baseMatches;

// node_modules/lodash-es/_isKey.js
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray_default(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var isKey_default = isKey;

// node_modules/lodash-es/memoize.js
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache_default)();
  return memoized;
}
memoize.Cache = MapCache_default;
var memoize_default = memoize;

// node_modules/lodash-es/_memoizeCapped.js
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize_default(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var memoizeCapped_default = memoizeCapped;

// node_modules/lodash-es/_stringToPath.js
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped_default(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
var stringToPath_default = stringToPath;

// node_modules/lodash-es/_arrayMap.js
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var arrayMap_default = arrayMap;

// node_modules/lodash-es/_baseToString.js
var INFINITY2 = 1 / 0;
var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolToString = symbolProto2 ? symbolProto2.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_default(value)) {
    return arrayMap_default(value, baseToString) + "";
  }
  if (isSymbol_default(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY2 ? "-0" : result;
}
var baseToString_default = baseToString;

// node_modules/lodash-es/toString.js
function toString(value) {
  return value == null ? "" : baseToString_default(value);
}
var toString_default = toString;

// node_modules/lodash-es/_castPath.js
function castPath(value, object) {
  if (isArray_default(value)) {
    return value;
  }
  return isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
}
var castPath_default = castPath;

// node_modules/lodash-es/_toKey.js
var INFINITY3 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol_default(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY3 ? "-0" : result;
}
var toKey_default = toKey;

// node_modules/lodash-es/_baseGet.js
function baseGet(object, path) {
  path = castPath_default(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey_default(path[index++])];
  }
  return index && index == length ? object : void 0;
}
var baseGet_default = baseGet;

// node_modules/lodash-es/get.js
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet_default(object, path);
  return result === void 0 ? defaultValue : result;
}
var get_default = get;

// node_modules/lodash-es/_baseHasIn.js
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
var baseHasIn_default = baseHasIn;

// node_modules/lodash-es/_hasPath.js
function hasPath(object, path, hasFunc) {
  path = castPath_default(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey_default(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_default(length) && isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
}
var hasPath_default = hasPath;

// node_modules/lodash-es/hasIn.js
function hasIn(object, path) {
  return object != null && hasPath_default(object, path, baseHasIn_default);
}
var hasIn_default = hasIn;

// node_modules/lodash-es/_baseMatchesProperty.js
var COMPARE_PARTIAL_FLAG6 = 1;
var COMPARE_UNORDERED_FLAG4 = 2;
function baseMatchesProperty(path, srcValue) {
  if (isKey_default(path) && isStrictComparable_default(srcValue)) {
    return matchesStrictComparable_default(toKey_default(path), srcValue);
  }
  return function(object) {
    var objValue = get_default(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path) : baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG6 | COMPARE_UNORDERED_FLAG4);
  };
}
var baseMatchesProperty_default = baseMatchesProperty;

// node_modules/lodash-es/identity.js
function identity(value) {
  return value;
}
var identity_default = identity;

// node_modules/lodash-es/_baseProperty.js
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
var baseProperty_default = baseProperty;

// node_modules/lodash-es/_basePropertyDeep.js
function basePropertyDeep(path) {
  return function(object) {
    return baseGet_default(object, path);
  };
}
var basePropertyDeep_default = basePropertyDeep;

// node_modules/lodash-es/property.js
function property(path) {
  return isKey_default(path) ? baseProperty_default(toKey_default(path)) : basePropertyDeep_default(path);
}
var property_default = property;

// node_modules/lodash-es/_baseIteratee.js
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_default;
  }
  if (typeof value == "object") {
    return isArray_default(value) ? baseMatchesProperty_default(value[0], value[1]) : baseMatches_default(value);
  }
  return property_default(value);
}
var baseIteratee_default = baseIteratee;

// node_modules/lodash-es/findIndex.js
var nativeMax2 = Math.max;
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_default(fromIndex);
  if (index < 0) {
    index = nativeMax2(length + index, 0);
  }
  return baseFindIndex_default(array, baseIteratee_default(predicate, 3), index);
}
var findIndex_default = findIndex;

// node_modules/lodash-es/_baseRange.js
var nativeCeil2 = Math.ceil;
var nativeMax3 = Math.max;
function baseRange(start, end, step, fromRight) {
  var index = -1, length = nativeMax3(nativeCeil2((end - start) / (step || 1)), 0), result = Array(length);
  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}
var baseRange_default = baseRange;

// node_modules/lodash-es/_createRange.js
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != "number" && isIterateeCall_default(start, end, step)) {
      end = step = void 0;
    }
    start = toFinite_default(start);
    if (end === void 0) {
      end = start;
      start = 0;
    } else {
      end = toFinite_default(end);
    }
    step = step === void 0 ? start < end ? 1 : -1 : toFinite_default(step);
    return baseRange_default(start, end, step, fromRight);
  };
}
var createRange_default = createRange;

// node_modules/lodash-es/range.js
var range = createRange_default();
var range_default = range;

// node_modules/memoize-one/dist/memoize-one.esm.js
var safeIsNaN = Number.isNaN || function ponyfill(value) {
  return typeof value === "number" && value !== value;
};
function isEqual2(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i = 0; i < newInputs.length; i++) {
    if (!isEqual2(newInputs[i], lastInputs[i])) {
      return false;
    }
  }
  return true;
}
function memoizeOne(resultFn, isEqual5) {
  if (isEqual5 === void 0) {
    isEqual5 = areInputsEqual;
  }
  var cache = null;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }
    if (cache && cache.lastThis === this && isEqual5(newArgs, cache.lastArgs)) {
      return cache.lastResult;
    }
    var lastResult = resultFn.apply(this, newArgs);
    cache = {
      lastResult,
      lastArgs: newArgs,
      lastThis: this
    };
    return lastResult;
  }
  memoized.clear = function clear() {
    cache = null;
  };
  return memoized;
}

// node_modules/lodash-es/_isFlattenable.js
var spreadableSymbol = Symbol_default ? Symbol_default.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return isArray_default(value) || isArguments_default(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var isFlattenable_default = isFlattenable;

// node_modules/lodash-es/_baseFlatten.js
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1, length = array.length;
  predicate || (predicate = isFlattenable_default);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush_default(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
var baseFlatten_default = baseFlatten;

// node_modules/lodash-es/_createBaseFor.js
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var createBaseFor_default = createBaseFor;

// node_modules/lodash-es/_baseFor.js
var baseFor = createBaseFor_default();
var baseFor_default = baseFor;

// node_modules/lodash-es/_baseForOwn.js
function baseForOwn(object, iteratee) {
  return object && baseFor_default(object, iteratee, keys_default);
}
var baseForOwn_default = baseForOwn;

// node_modules/lodash-es/_createBaseEach.js
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_default(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var createBaseEach_default = createBaseEach;

// node_modules/lodash-es/_baseEach.js
var baseEach = createBaseEach_default(baseForOwn_default);
var baseEach_default = baseEach;

// node_modules/lodash-es/_baseMap.js
function baseMap(collection, iteratee) {
  var index = -1, result = isArrayLike_default(collection) ? Array(collection.length) : [];
  baseEach_default(collection, function(value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
var baseMap_default = baseMap;

// node_modules/lodash-es/_baseSortBy.js
function baseSortBy(array, comparer) {
  var length = array.length;
  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}
var baseSortBy_default = baseSortBy;

// node_modules/lodash-es/_compareAscending.js
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol_default(value);
    var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol_default(other);
    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }
    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}
var compareAscending_default = compareAscending;

// node_modules/lodash-es/_compareMultiple.js
function compareMultiple(object, other, orders) {
  var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
  while (++index < length) {
    var result = compareAscending_default(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == "desc" ? -1 : 1);
    }
  }
  return object.index - other.index;
}
var compareMultiple_default = compareMultiple;

// node_modules/lodash-es/_baseOrderBy.js
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap_default(iteratees, function(iteratee) {
      if (isArray_default(iteratee)) {
        return function(value) {
          return baseGet_default(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        };
      }
      return iteratee;
    });
  } else {
    iteratees = [identity_default];
  }
  var index = -1;
  iteratees = arrayMap_default(iteratees, baseUnary_default(baseIteratee_default));
  var result = baseMap_default(collection, function(value, key, collection2) {
    var criteria = arrayMap_default(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { "criteria": criteria, "index": ++index, "value": value };
  });
  return baseSortBy_default(result, function(object, other) {
    return compareMultiple_default(object, other, orders);
  });
}
var baseOrderBy_default = baseOrderBy;

// node_modules/lodash-es/_apply.js
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var apply_default = apply;

// node_modules/lodash-es/_overRest.js
var nativeMax4 = Math.max;
function overRest(func, start, transform2) {
  start = nativeMax4(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax4(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform2(array);
    return apply_default(func, this, otherArgs);
  };
}
var overRest_default = overRest;

// node_modules/lodash-es/constant.js
function constant(value) {
  return function() {
    return value;
  };
}
var constant_default = constant;

// node_modules/lodash-es/_defineProperty.js
var defineProperty = function() {
  try {
    var func = getNative_default(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var defineProperty_default = defineProperty;

// node_modules/lodash-es/_baseSetToString.js
var baseSetToString = !defineProperty_default ? identity_default : function(func, string) {
  return defineProperty_default(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant_default(string),
    "writable": true
  });
};
var baseSetToString_default = baseSetToString;

// node_modules/lodash-es/_shortOut.js
var HOT_COUNT = 800;
var HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var shortOut_default = shortOut;

// node_modules/lodash-es/_setToString.js
var setToString = shortOut_default(baseSetToString_default);
var setToString_default = setToString;

// node_modules/lodash-es/_baseRest.js
function baseRest(func, start) {
  return setToString_default(overRest_default(func, start, identity_default), func + "");
}
var baseRest_default = baseRest;

// node_modules/lodash-es/sortBy.js
var sortBy = baseRest_default(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall_default(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall_default(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy_default(collection, baseFlatten_default(iteratees, 1), []);
});
var sortBy_default = sortBy;

// node_modules/dom-helpers/esm/width.js
function getWidth(node, client) {
  var win = isWindow(node);
  return win ? win.innerWidth : client ? node.clientWidth : offset(node).width;
}

// node_modules/@babel/runtime/helpers/esm/toArray.js
function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}

// node_modules/lodash-es/_arrayEach.js
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var arrayEach_default = arrayEach;

// node_modules/lodash-es/_baseAssignValue.js
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty_default) {
    defineProperty_default(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var baseAssignValue_default = baseAssignValue;

// node_modules/lodash-es/_assignValue.js
var objectProto13 = Object.prototype;
var hasOwnProperty10 = objectProto13.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty10.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var assignValue_default = assignValue;

// node_modules/lodash-es/_copyObject.js
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue_default(object, key, newValue);
    } else {
      assignValue_default(object, key, newValue);
    }
  }
  return object;
}
var copyObject_default = copyObject;

// node_modules/lodash-es/_baseAssign.js
function baseAssign(object, source) {
  return object && copyObject_default(source, keys_default(source), object);
}
var baseAssign_default = baseAssign;

// node_modules/lodash-es/_nativeKeysIn.js
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var nativeKeysIn_default = nativeKeysIn;

// node_modules/lodash-es/_baseKeysIn.js
var objectProto14 = Object.prototype;
var hasOwnProperty11 = objectProto14.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject_default(object)) {
    return nativeKeysIn_default(object);
  }
  var isProto = isPrototype_default(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty11.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var baseKeysIn_default = baseKeysIn;

// node_modules/lodash-es/keysIn.js
function keysIn(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
}
var keysIn_default = keysIn;

// node_modules/lodash-es/_baseAssignIn.js
function baseAssignIn(object, source) {
  return object && copyObject_default(source, keysIn_default(source), object);
}
var baseAssignIn_default = baseAssignIn;

// node_modules/lodash-es/_cloneBuffer.js
var freeExports3 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule3 = freeExports3 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
var Buffer2 = moduleExports3 ? root_default.Buffer : void 0;
var allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
var cloneBuffer_default = cloneBuffer;

// node_modules/lodash-es/_copyArray.js
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var copyArray_default = copyArray;

// node_modules/lodash-es/_copySymbols.js
function copySymbols(source, object) {
  return copyObject_default(source, getSymbols_default(source), object);
}
var copySymbols_default = copySymbols;

// node_modules/lodash-es/_getPrototype.js
var getPrototype = overArg_default(Object.getPrototypeOf, Object);
var getPrototype_default = getPrototype;

// node_modules/lodash-es/_getSymbolsIn.js
var nativeGetSymbols2 = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function(object) {
  var result = [];
  while (object) {
    arrayPush_default(result, getSymbols_default(object));
    object = getPrototype_default(object);
  }
  return result;
};
var getSymbolsIn_default = getSymbolsIn;

// node_modules/lodash-es/_copySymbolsIn.js
function copySymbolsIn(source, object) {
  return copyObject_default(source, getSymbolsIn_default(source), object);
}
var copySymbolsIn_default = copySymbolsIn;

// node_modules/lodash-es/_getAllKeysIn.js
function getAllKeysIn(object) {
  return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
}
var getAllKeysIn_default = getAllKeysIn;

// node_modules/lodash-es/_initCloneArray.js
var objectProto15 = Object.prototype;
var hasOwnProperty12 = objectProto15.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty12.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var initCloneArray_default = initCloneArray;

// node_modules/lodash-es/_cloneArrayBuffer.js
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
  return result;
}
var cloneArrayBuffer_default = cloneArrayBuffer;

// node_modules/lodash-es/_cloneDataView.js
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var cloneDataView_default = cloneDataView;

// node_modules/lodash-es/_cloneRegExp.js
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var cloneRegExp_default = cloneRegExp;

// node_modules/lodash-es/_cloneSymbol.js
var symbolProto3 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf2 = symbolProto3 ? symbolProto3.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf2 ? Object(symbolValueOf2.call(symbol)) : {};
}
var cloneSymbol_default = cloneSymbol;

// node_modules/lodash-es/_cloneTypedArray.js
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var cloneTypedArray_default = cloneTypedArray;

// node_modules/lodash-es/_initCloneByTag.js
var boolTag3 = "[object Boolean]";
var dateTag3 = "[object Date]";
var mapTag4 = "[object Map]";
var numberTag3 = "[object Number]";
var regexpTag3 = "[object RegExp]";
var setTag4 = "[object Set]";
var stringTag3 = "[object String]";
var symbolTag3 = "[object Symbol]";
var arrayBufferTag3 = "[object ArrayBuffer]";
var dataViewTag4 = "[object DataView]";
var float32Tag2 = "[object Float32Array]";
var float64Tag2 = "[object Float64Array]";
var int8Tag2 = "[object Int8Array]";
var int16Tag2 = "[object Int16Array]";
var int32Tag2 = "[object Int32Array]";
var uint8Tag2 = "[object Uint8Array]";
var uint8ClampedTag2 = "[object Uint8ClampedArray]";
var uint16Tag2 = "[object Uint16Array]";
var uint32Tag2 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag3:
      return cloneArrayBuffer_default(object);
    case boolTag3:
    case dateTag3:
      return new Ctor(+object);
    case dataViewTag4:
      return cloneDataView_default(object, isDeep);
    case float32Tag2:
    case float64Tag2:
    case int8Tag2:
    case int16Tag2:
    case int32Tag2:
    case uint8Tag2:
    case uint8ClampedTag2:
    case uint16Tag2:
    case uint32Tag2:
      return cloneTypedArray_default(object, isDeep);
    case mapTag4:
      return new Ctor();
    case numberTag3:
    case stringTag3:
      return new Ctor(object);
    case regexpTag3:
      return cloneRegExp_default(object);
    case setTag4:
      return new Ctor();
    case symbolTag3:
      return cloneSymbol_default(object);
  }
}
var initCloneByTag_default = initCloneByTag;

// node_modules/lodash-es/_baseCreate.js
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject_default(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var baseCreate_default = baseCreate;

// node_modules/lodash-es/_initCloneObject.js
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
}
var initCloneObject_default = initCloneObject;

// node_modules/lodash-es/_baseIsMap.js
var mapTag5 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike_default(value) && getTag_default(value) == mapTag5;
}
var baseIsMap_default = baseIsMap;

// node_modules/lodash-es/isMap.js
var nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
var isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
var isMap_default = isMap;

// node_modules/lodash-es/_baseIsSet.js
var setTag5 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike_default(value) && getTag_default(value) == setTag5;
}
var baseIsSet_default = baseIsSet;

// node_modules/lodash-es/isSet.js
var nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
var isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
var isSet_default = isSet;

// node_modules/lodash-es/_baseClone.js
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG = 4;
var argsTag4 = "[object Arguments]";
var arrayTag3 = "[object Array]";
var boolTag4 = "[object Boolean]";
var dateTag4 = "[object Date]";
var errorTag3 = "[object Error]";
var funcTag3 = "[object Function]";
var genTag2 = "[object GeneratorFunction]";
var mapTag6 = "[object Map]";
var numberTag4 = "[object Number]";
var objectTag4 = "[object Object]";
var regexpTag4 = "[object RegExp]";
var setTag6 = "[object Set]";
var stringTag4 = "[object String]";
var symbolTag4 = "[object Symbol]";
var weakMapTag3 = "[object WeakMap]";
var arrayBufferTag4 = "[object ArrayBuffer]";
var dataViewTag5 = "[object DataView]";
var float32Tag3 = "[object Float32Array]";
var float64Tag3 = "[object Float64Array]";
var int8Tag3 = "[object Int8Array]";
var int16Tag3 = "[object Int16Array]";
var int32Tag3 = "[object Int32Array]";
var uint8Tag3 = "[object Uint8Array]";
var uint8ClampedTag3 = "[object Uint8ClampedArray]";
var uint16Tag3 = "[object Uint16Array]";
var uint32Tag3 = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag4] = cloneableTags[arrayTag3] = cloneableTags[arrayBufferTag4] = cloneableTags[dataViewTag5] = cloneableTags[boolTag4] = cloneableTags[dateTag4] = cloneableTags[float32Tag3] = cloneableTags[float64Tag3] = cloneableTags[int8Tag3] = cloneableTags[int16Tag3] = cloneableTags[int32Tag3] = cloneableTags[mapTag6] = cloneableTags[numberTag4] = cloneableTags[objectTag4] = cloneableTags[regexpTag4] = cloneableTags[setTag6] = cloneableTags[stringTag4] = cloneableTags[symbolTag4] = cloneableTags[uint8Tag3] = cloneableTags[uint8ClampedTag3] = cloneableTags[uint16Tag3] = cloneableTags[uint32Tag3] = true;
cloneableTags[errorTag3] = cloneableTags[funcTag3] = cloneableTags[weakMapTag3] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject_default(value)) {
    return value;
  }
  var isArr = isArray_default(value);
  if (isArr) {
    result = initCloneArray_default(value);
    if (!isDeep) {
      return copyArray_default(value, result);
    }
  } else {
    var tag = getTag_default(value), isFunc = tag == funcTag3 || tag == genTag2;
    if (isBuffer_default(value)) {
      return cloneBuffer_default(value, isDeep);
    }
    if (tag == objectTag4 || tag == argsTag4 || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject_default(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result, value)) : copySymbols_default(value, baseAssign_default(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag_default(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack_default());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet_default(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_default(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach_default(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue_default(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var baseClone_default = baseClone;

// node_modules/lodash-es/last.js
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
var last_default = last;

// node_modules/lodash-es/_parent.js
function parent(object, path) {
  return path.length < 2 ? object : baseGet_default(object, baseSlice_default(path, 0, -1));
}
var parent_default = parent;

// node_modules/lodash-es/_baseUnset.js
function baseUnset(object, path) {
  path = castPath_default(path, object);
  object = parent_default(object, path);
  return object == null || delete object[toKey_default(last_default(path))];
}
var baseUnset_default = baseUnset;

// node_modules/lodash-es/isPlainObject.js
var objectTag5 = "[object Object]";
var funcProto3 = Function.prototype;
var objectProto16 = Object.prototype;
var funcToString3 = funcProto3.toString;
var hasOwnProperty13 = objectProto16.hasOwnProperty;
var objectCtorString = funcToString3.call(Object);
function isPlainObject(value) {
  if (!isObjectLike_default(value) || baseGetTag_default(value) != objectTag5) {
    return false;
  }
  var proto = getPrototype_default(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty13.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString3.call(Ctor) == objectCtorString;
}
var isPlainObject_default = isPlainObject;

// node_modules/lodash-es/_customOmitClone.js
function customOmitClone(value) {
  return isPlainObject_default(value) ? void 0 : value;
}
var customOmitClone_default = customOmitClone;

// node_modules/lodash-es/flatten.js
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten_default(array, 1) : [];
}
var flatten_default = flatten;

// node_modules/lodash-es/_flatRest.js
function flatRest(func) {
  return setToString_default(overRest_default(func, void 0, flatten_default), func + "");
}
var flatRest_default = flatRest;

// node_modules/lodash-es/omit.js
var CLONE_DEEP_FLAG2 = 1;
var CLONE_FLAT_FLAG2 = 2;
var CLONE_SYMBOLS_FLAG2 = 4;
var omit = flatRest_default(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap_default(paths, function(path) {
    path = castPath_default(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject_default(object, getAllKeysIn_default(object), result);
  if (isDeep) {
    result = baseClone_default(result, CLONE_DEEP_FLAG2 | CLONE_FLAT_FLAG2 | CLONE_SYMBOLS_FLAG2, customOmitClone_default);
  }
  var length = paths.length;
  while (length--) {
    baseUnset_default(result, paths[length]);
  }
  return result;
});
var omit_default = omit;

// node_modules/lodash-es/defaults.js
var objectProto17 = Object.prototype;
var hasOwnProperty14 = objectProto17.hasOwnProperty;
var defaults = baseRest_default(function(object, sources) {
  object = Object(object);
  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : void 0;
  if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
    length = 1;
  }
  while (++index < length) {
    var source = sources[index];
    var props = keysIn_default(source);
    var propsIndex = -1;
    var propsLength = props.length;
    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];
      if (value === void 0 || eq_default(value, objectProto17[key]) && !hasOwnProperty14.call(object, key)) {
        object[key] = source[key];
      }
    }
  }
  return object;
});
var defaults_default = defaults;

// node_modules/lodash-es/transform.js
function transform(object, iteratee, accumulator) {
  var isArr = isArray_default(object), isArrLike = isArr || isBuffer_default(object) || isTypedArray_default(object);
  iteratee = baseIteratee_default(iteratee, 4);
  if (accumulator == null) {
    var Ctor = object && object.constructor;
    if (isArrLike) {
      accumulator = isArr ? new Ctor() : [];
    } else if (isObject_default(object)) {
      accumulator = isFunction_default(Ctor) ? baseCreate_default(getPrototype_default(object)) : {};
    } else {
      accumulator = {};
    }
  }
  (isArrLike ? arrayEach_default : baseForOwn_default)(object, function(value, index, object2) {
    return iteratee(accumulator, value, index, object2);
  });
  return accumulator;
}
var transform_default = transform;

// node_modules/lodash-es/mapValues.js
function mapValues(object, iteratee) {
  var result = {};
  iteratee = baseIteratee_default(iteratee, 3);
  baseForOwn_default(object, function(value, key, object2) {
    baseAssignValue_default(result, key, iteratee(value, key, object2));
  });
  return result;
}
var mapValues_default = mapValues;

// node_modules/react-big-calendar/dist/react-big-calendar.esm.js
var import_isBetween = __toESM(require_isBetween());
var import_isSameOrAfter = __toESM(require_isSameOrAfter());
var import_isSameOrBefore = __toESM(require_isSameOrBefore());
var import_localeData = __toESM(require_localeData());
var import_localizedFormat = __toESM(require_localizedFormat());
var import_minMax = __toESM(require_minMax());
var import_utc = __toESM(require_utc());
function NoopWrapper(props) {
  return props.children;
}
var navigate = {
  PREVIOUS: "PREV",
  NEXT: "NEXT",
  TODAY: "TODAY",
  DATE: "DATE"
};
var views = {
  MONTH: "month",
  WEEK: "week",
  WORK_WEEK: "work_week",
  DAY: "day",
  AGENDA: "agenda"
};
var viewNames$1 = Object.keys(views).map(function(k) {
  return views[k];
});
import_prop_types7.default.oneOfType([import_prop_types7.default.string, import_prop_types7.default.func]);
import_prop_types7.default.any;
import_prop_types7.default.func;
import_prop_types7.default.oneOfType([import_prop_types7.default.arrayOf(import_prop_types7.default.oneOf(viewNames$1)), import_prop_types7.default.objectOf(function(prop, key) {
  var isBuiltinView = viewNames$1.indexOf(key) !== -1 && typeof prop[key] === "boolean";
  if (isBuiltinView) {
    return null;
  } else {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return import_prop_types7.default.elementType.apply(import_prop_types7.default, [prop, key].concat(args));
  }
})]);
import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["overlap", "no-overlap"]), import_prop_types7.default.func]);
function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}
var MILLI = {
  seconds: 1e3,
  minutes: 1e3 * 60,
  hours: 1e3 * 60 * 60,
  day: 1e3 * 60 * 60 * 24
};
function firstVisibleDay(date2, localizer) {
  var firstOfMonth = startOf(date2, "month");
  return startOf(firstOfMonth, "week", localizer.startOfWeek());
}
function lastVisibleDay(date2, localizer) {
  var endOfMonth = endOf(date2, "month");
  return endOf(endOfMonth, "week", localizer.startOfWeek());
}
function visibleDays(date2, localizer) {
  var current = firstVisibleDay(date2, localizer), last2 = lastVisibleDay(date2, localizer), days = [];
  while (lte(current, last2, "day")) {
    days.push(current);
    current = add(current, 1, "day");
  }
  return days;
}
function ceil(date2, unit) {
  var floor = startOf(date2, unit);
  return eq(floor, date2) ? floor : add(floor, 1, unit);
}
function range2(start, end) {
  var unit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "day";
  var current = start, days = [];
  while (lte(current, end, unit)) {
    days.push(current);
    current = add(current, 1, unit);
  }
  return days;
}
function merge(date2, time) {
  if (time == null && date2 == null)
    return null;
  if (time == null)
    time = /* @__PURE__ */ new Date();
  if (date2 == null)
    date2 = /* @__PURE__ */ new Date();
  date2 = startOf(date2, "day");
  date2 = hours(date2, hours(time));
  date2 = minutes(date2, minutes(time));
  date2 = seconds(date2, seconds(time));
  return milliseconds(date2, milliseconds(time));
}
function isJustDate(date2) {
  return hours(date2) === 0 && minutes(date2) === 0 && seconds(date2) === 0 && milliseconds(date2) === 0;
}
function diff(dateA, dateB, unit) {
  if (!unit || unit === "milliseconds")
    return Math.abs(+dateA - +dateB);
  return Math.round(Math.abs(+startOf(dateA, unit) / MILLI[unit] - +startOf(dateB, unit) / MILLI[unit]));
}
var localePropType = import_prop_types7.default.oneOfType([import_prop_types7.default.string, import_prop_types7.default.func]);
function _format(localizer, formatter, value, format, culture) {
  var result = typeof format === "function" ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);
  (0, import_invariant3.default)(result == null || typeof result === "string", "`localizer format(..)` must return a string, null, or undefined");
  return result;
}
function getSlotDate(dt, minutesFromMidnight, offset2) {
  return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, minutesFromMidnight + offset2, 0, 0);
}
function getDstOffset(start, end) {
  return start.getTimezoneOffset() - end.getTimezoneOffset();
}
function getTotalMin(start, end) {
  return diff(start, end, "minutes") + getDstOffset(start, end);
}
function getMinutesFromMidnight(start) {
  var daystart = startOf(start, "day");
  return diff(daystart, start, "minutes") + getDstOffset(daystart, start);
}
function continuesPrior(start, first) {
  return lt(start, first, "day");
}
function continuesAfter(start, end, last2) {
  var singleDayDuration = eq(start, end, "minutes");
  return singleDayDuration ? gte(end, last2, "minutes") : gt(end, last2, "minutes");
}
function sortEvents$1(_ref) {
  var _ref$evtA = _ref.evtA, aStart = _ref$evtA.start, aEnd = _ref$evtA.end, aAllDay = _ref$evtA.allDay, _ref$evtB = _ref.evtB, bStart = _ref$evtB.start, bEnd = _ref$evtB.end, bAllDay = _ref$evtB.allDay;
  var startSort = +startOf(aStart, "day") - +startOf(bStart, "day");
  var durA = diff(aStart, ceil(aEnd, "day"), "day");
  var durB = diff(bStart, ceil(bEnd, "day"), "day");
  return startSort || // sort by start Day first
  Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
  !!bAllDay - !!aAllDay || // then allDay single day events
  +aStart - +bStart || // then sort by start time
  +aEnd - +bEnd;
}
function inEventRange(_ref2) {
  var _ref2$event = _ref2.event, start = _ref2$event.start, end = _ref2$event.end, _ref2$range = _ref2.range, rangeStart = _ref2$range.start, rangeEnd = _ref2$range.end;
  var eStart = startOf(start, "day");
  var startsBeforeEnd = lte(eStart, rangeEnd, "day");
  var sameMin = neq(eStart, end, "minutes");
  var endsAfterStart = sameMin ? gt(end, rangeStart, "minutes") : gte(end, rangeStart, "minutes");
  return startsBeforeEnd && endsAfterStart;
}
function isSameDate(date1, date2) {
  return eq(date1, date2, "day");
}
function startAndEndAreDateOnly(start, end) {
  return isJustDate(start) && isJustDate(end);
}
var DateLocalizer = _createClass(function DateLocalizer2(spec) {
  var _this = this;
  _classCallCheck(this, DateLocalizer2);
  (0, import_invariant3.default)(typeof spec.format === "function", "date localizer `format(..)` must be a function");
  (0, import_invariant3.default)(typeof spec.firstOfWeek === "function", "date localizer `firstOfWeek(..)` must be a function");
  this.propType = spec.propType || localePropType;
  this.formats = spec.formats;
  this.format = function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _format.apply(void 0, [_this, spec.format].concat(args));
  };
  this.startOfWeek = spec.firstOfWeek;
  this.merge = spec.merge || merge;
  this.inRange = spec.inRange || inRange;
  this.lt = spec.lt || lt;
  this.lte = spec.lte || lte;
  this.gt = spec.gt || gt;
  this.gte = spec.gte || gte;
  this.eq = spec.eq || eq;
  this.neq = spec.neq || neq;
  this.startOf = spec.startOf || startOf;
  this.endOf = spec.endOf || endOf;
  this.add = spec.add || add;
  this.range = spec.range || range2;
  this.diff = spec.diff || diff;
  this.ceil = spec.ceil || ceil;
  this.min = spec.min || min;
  this.max = spec.max || max;
  this.minutes = spec.minutes || minutes;
  this.firstVisibleDay = spec.firstVisibleDay || firstVisibleDay;
  this.lastVisibleDay = spec.lastVisibleDay || lastVisibleDay;
  this.visibleDays = spec.visibleDays || visibleDays;
  this.getSlotDate = spec.getSlotDate || getSlotDate;
  this.getTimezoneOffset = spec.getTimezoneOffset || function(value) {
    return value.getTimezoneOffset();
  };
  this.getDstOffset = spec.getDstOffset || getDstOffset;
  this.getTotalMin = spec.getTotalMin || getTotalMin;
  this.getMinutesFromMidnight = spec.getMinutesFromMidnight || getMinutesFromMidnight;
  this.continuesPrior = spec.continuesPrior || continuesPrior;
  this.continuesAfter = spec.continuesAfter || continuesAfter;
  this.sortEvents = spec.sortEvents || sortEvents$1;
  this.inEventRange = spec.inEventRange || inEventRange;
  this.isSameDate = spec.isSameDate || isSameDate;
  this.startAndEndAreDateOnly = spec.startAndEndAreDateOnly || startAndEndAreDateOnly;
  this.segmentOffset = spec.browserTZOffset ? spec.browserTZOffset() : 0;
});
function mergeWithDefaults(localizer, culture, formatOverrides, messages2) {
  var formats2 = _objectSpread2(_objectSpread2({}, localizer.formats), formatOverrides);
  return _objectSpread2(_objectSpread2({}, localizer), {}, {
    messages: messages2,
    startOfWeek: function startOfWeek() {
      return localizer.startOfWeek(culture);
    },
    format: function format(value, _format2) {
      return localizer.format(value, formats2[_format2] || _format2, culture);
    }
  });
}
var defaultMessages = {
  date: "Date",
  time: "Time",
  event: "Event",
  allDay: "All Day",
  week: "Week",
  work_week: "Work Week",
  day: "Day",
  month: "Month",
  previous: "Back",
  next: "Next",
  yesterday: "Yesterday",
  tomorrow: "Tomorrow",
  today: "Today",
  agenda: "Agenda",
  noEventsInRange: "There are no events in this range.",
  showMore: function showMore(total) {
    return "+".concat(total, " more");
  }
};
function messages(msgs) {
  return _objectSpread2(_objectSpread2({}, defaultMessages), msgs);
}
function useClickOutside(_ref) {
  var ref = _ref.ref, callback = _ref.callback;
  (0, import_react25.useEffect)(function() {
    var handleClickOutside = function handleClickOutside2(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return function() {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
var _excluded$7 = ["style", "className", "event", "selected", "isAllDay", "onSelect", "onDoubleClick", "onKeyPress", "localizer", "continuesPrior", "continuesAfter", "accessors", "getters", "children", "components", "slotStart", "slotEnd"];
var EventCell = function(_React$Component) {
  _inherits(EventCell2, _React$Component);
  var _super = _createSuper(EventCell2);
  function EventCell2() {
    _classCallCheck(this, EventCell2);
    return _super.apply(this, arguments);
  }
  _createClass(EventCell2, [{
    key: "render",
    value: function render() {
      var _this$props = this.props, style2 = _this$props.style, className = _this$props.className, event = _this$props.event, selected = _this$props.selected, isAllDay = _this$props.isAllDay, onSelect = _this$props.onSelect, _onDoubleClick = _this$props.onDoubleClick, _onKeyPress = _this$props.onKeyPress, localizer = _this$props.localizer, continuesPrior2 = _this$props.continuesPrior, continuesAfter2 = _this$props.continuesAfter, accessors = _this$props.accessors, getters = _this$props.getters, children = _this$props.children, _this$props$component = _this$props.components, Event2 = _this$props$component.event, EventWrapper = _this$props$component.eventWrapper, slotStart = _this$props.slotStart, slotEnd = _this$props.slotEnd, props = _objectWithoutProperties(_this$props, _excluded$7);
      delete props.resizable;
      var title = accessors.title(event);
      var tooltip = accessors.tooltip(event);
      var end = accessors.end(event);
      var start = accessors.start(event);
      var allDay = accessors.allDay(event);
      var showAsAllDay = isAllDay || allDay || localizer.diff(start, localizer.ceil(end, "day"), "day") > 1;
      var userProps = getters.eventProp(event, start, end, selected);
      var content = import_react25.default.createElement("div", {
        className: "rbc-event-content",
        title: tooltip || void 0
      }, Event2 ? import_react25.default.createElement(Event2, {
        event,
        continuesPrior: continuesPrior2,
        continuesAfter: continuesAfter2,
        title,
        isAllDay: allDay,
        localizer,
        slotStart,
        slotEnd
      }) : title);
      return import_react25.default.createElement(EventWrapper, Object.assign({}, this.props, {
        type: "date"
      }), import_react25.default.createElement("div", Object.assign({}, props, {
        tabIndex: 0,
        style: _objectSpread2(_objectSpread2({}, userProps.style), style2),
        className: clsx_m_default("rbc-event", className, userProps.className, {
          "rbc-selected": selected,
          "rbc-event-allday": showAsAllDay,
          "rbc-event-continues-prior": continuesPrior2,
          "rbc-event-continues-after": continuesAfter2
        }),
        onClick: function onClick(e) {
          return onSelect && onSelect(event, e);
        },
        onDoubleClick: function onDoubleClick(e) {
          return _onDoubleClick && _onDoubleClick(event, e);
        },
        onKeyPress: function onKeyPress(e) {
          return _onKeyPress && _onKeyPress(event, e);
        }
      }), typeof children === "function" ? children(content) : content));
    }
  }]);
  return EventCell2;
}(import_react25.default.Component);
function isSelected(event, selected) {
  if (!event || selected == null)
    return false;
  return isEqual_default(event, selected);
}
function slotWidth(rowBox, slots) {
  var rowWidth = rowBox.right - rowBox.left;
  var cellWidth = rowWidth / slots;
  return cellWidth;
}
function getSlotAtX(rowBox, x, rtl, slots) {
  var cellWidth = slotWidth(rowBox, slots);
  return rtl ? slots - 1 - Math.floor((x - rowBox.left) / cellWidth) : Math.floor((x - rowBox.left) / cellWidth);
}
function pointInBox(box, _ref) {
  var x = _ref.x, y = _ref.y;
  return y >= box.top && y <= box.bottom && x >= box.left && x <= box.right;
}
function dateCellSelection(start, rowBox, box, slots, rtl) {
  var startIdx = -1;
  var endIdx = -1;
  var lastSlotIdx = slots - 1;
  var cellWidth = slotWidth(rowBox, slots);
  var currentSlot = getSlotAtX(rowBox, box.x, rtl, slots);
  var isCurrentRow = rowBox.top < box.y && rowBox.bottom > box.y;
  var isStartRow = rowBox.top < start.y && rowBox.bottom > start.y;
  var isAboveStart = start.y > rowBox.bottom;
  var isBelowStart = rowBox.top > start.y;
  var isBetween2 = box.top < rowBox.top && box.bottom > rowBox.bottom;
  if (isBetween2) {
    startIdx = 0;
    endIdx = lastSlotIdx;
  }
  if (isCurrentRow) {
    if (isBelowStart) {
      startIdx = 0;
      endIdx = currentSlot;
    } else if (isAboveStart) {
      startIdx = currentSlot;
      endIdx = lastSlotIdx;
    }
  }
  if (isStartRow) {
    startIdx = endIdx = rtl ? lastSlotIdx - Math.floor((start.x - rowBox.left) / cellWidth) : Math.floor((start.x - rowBox.left) / cellWidth);
    if (isCurrentRow) {
      if (currentSlot < startIdx)
        startIdx = currentSlot;
      else
        endIdx = currentSlot;
    } else if (start.y < box.y) {
      endIdx = lastSlotIdx;
    } else {
      startIdx = 0;
    }
  }
  return {
    startIdx,
    endIdx
  };
}
function getPosition(_ref) {
  var target = _ref.target, offset2 = _ref.offset, container = _ref.container, box = _ref.box;
  var _getOffset = offset(target), top = _getOffset.top, left = _getOffset.left, width = _getOffset.width, height2 = _getOffset.height;
  var _getOffset2 = offset(container), cTop = _getOffset2.top, cLeft = _getOffset2.left, cWidth = _getOffset2.width, cHeight = _getOffset2.height;
  var _getOffset3 = offset(box), bWidth = _getOffset3.width, bHeight = _getOffset3.height;
  var viewBottom = cTop + cHeight;
  var viewRight = cLeft + cWidth;
  var bottom = top + bHeight;
  var right = left + bWidth;
  var x = offset2.x, y = offset2.y;
  var topOffset = bottom > viewBottom ? top - bHeight - y : top + y + height2;
  var leftOffset = right > viewRight ? left + x - bWidth + width : left + x;
  return {
    topOffset,
    leftOffset
  };
}
function Pop(_ref2) {
  var containerRef = _ref2.containerRef, accessors = _ref2.accessors, getters = _ref2.getters, selected = _ref2.selected, components2 = _ref2.components, localizer = _ref2.localizer, position2 = _ref2.position, show = _ref2.show, events = _ref2.events, slotStart = _ref2.slotStart, slotEnd = _ref2.slotEnd, onSelect = _ref2.onSelect, onDoubleClick = _ref2.onDoubleClick, onKeyPress = _ref2.onKeyPress, handleDragStart = _ref2.handleDragStart, popperRef = _ref2.popperRef, target = _ref2.target, offset2 = _ref2.offset;
  useClickOutside({
    ref: popperRef,
    callback: show
  });
  (0, import_react25.useLayoutEffect)(function() {
    var _getPosition = getPosition({
      target,
      offset: offset2,
      container: containerRef.current,
      box: popperRef.current
    }), topOffset = _getPosition.topOffset, leftOffset = _getPosition.leftOffset;
    popperRef.current.style.top = "".concat(topOffset, "px");
    popperRef.current.style.left = "".concat(leftOffset, "px");
  }, [offset2.x, offset2.y, target]);
  var width = position2.width;
  var style2 = {
    minWidth: width + width / 2
  };
  return import_react25.default.createElement("div", {
    style: style2,
    className: "rbc-overlay",
    ref: popperRef
  }, import_react25.default.createElement("div", {
    className: "rbc-overlay-header"
  }, localizer.format(slotStart, "dayHeaderFormat")), events.map(function(event, idx) {
    return import_react25.default.createElement(EventCell, {
      key: idx,
      type: "popup",
      localizer,
      event,
      getters,
      onSelect,
      accessors,
      components: components2,
      onDoubleClick,
      onKeyPress,
      continuesPrior: localizer.lt(accessors.end(event), slotStart, "day"),
      continuesAfter: localizer.gte(accessors.start(event), slotEnd, "day"),
      slotStart,
      slotEnd,
      selected: isSelected(event, selected),
      draggable: true,
      onDragStart: function onDragStart() {
        return handleDragStart(event);
      },
      onDragEnd: function onDragEnd() {
        return show();
      }
    });
  }));
}
var Popup = import_react25.default.forwardRef(function(props, ref) {
  return import_react25.default.createElement(Pop, Object.assign({}, props, {
    popperRef: ref
  }));
});
Popup.propTypes = {
  accessors: import_prop_types7.default.object.isRequired,
  getters: import_prop_types7.default.object.isRequired,
  selected: import_prop_types7.default.object,
  components: import_prop_types7.default.object.isRequired,
  localizer: import_prop_types7.default.object.isRequired,
  position: import_prop_types7.default.object.isRequired,
  show: import_prop_types7.default.func.isRequired,
  events: import_prop_types7.default.array.isRequired,
  slotStart: import_prop_types7.default.instanceOf(Date).isRequired,
  slotEnd: import_prop_types7.default.instanceOf(Date),
  onSelect: import_prop_types7.default.func,
  onDoubleClick: import_prop_types7.default.func,
  onKeyPress: import_prop_types7.default.func,
  handleDragStart: import_prop_types7.default.func,
  style: import_prop_types7.default.object,
  offset: import_prop_types7.default.shape({
    x: import_prop_types7.default.number,
    y: import_prop_types7.default.number
  })
};
function CalOverlay(_ref) {
  var containerRef = _ref.containerRef, _ref$popupOffset = _ref.popupOffset, popupOffset = _ref$popupOffset === void 0 ? 5 : _ref$popupOffset, overlay = _ref.overlay, accessors = _ref.accessors, localizer = _ref.localizer, components2 = _ref.components, getters = _ref.getters, selected = _ref.selected, handleSelectEvent = _ref.handleSelectEvent, handleDoubleClickEvent = _ref.handleDoubleClickEvent, handleKeyPressEvent = _ref.handleKeyPressEvent, handleDragStart = _ref.handleDragStart, onHide2 = _ref.onHide, overlayDisplay = _ref.overlayDisplay;
  var popperRef = (0, import_react25.useRef)(null);
  if (!overlay.position)
    return null;
  var offset2 = popupOffset;
  if (!isNaN(popupOffset)) {
    offset2 = {
      x: popupOffset,
      y: popupOffset
    };
  }
  var position2 = overlay.position, events = overlay.events, date2 = overlay.date, end = overlay.end;
  return import_react25.default.createElement(Overlay_default, {
    rootClose: true,
    flip: true,
    show: true,
    placement: "bottom",
    onHide: onHide2,
    target: overlay.target
  }, function(_ref2) {
    var props = _ref2.props;
    return import_react25.default.createElement(Popup, Object.assign({}, props, {
      containerRef,
      ref: popperRef,
      target: overlay.target,
      offset: offset2,
      accessors,
      getters,
      selected,
      components: components2,
      localizer,
      position: position2,
      show: overlayDisplay,
      events,
      slotStart: date2,
      slotEnd: end,
      onSelect: handleSelectEvent,
      onDoubleClick: handleDoubleClickEvent,
      onKeyPress: handleKeyPressEvent,
      handleDragStart
    }));
  });
}
var PopOverlay = import_react25.default.forwardRef(function(props, ref) {
  return import_react25.default.createElement(CalOverlay, Object.assign({}, props, {
    containerRef: ref
  }));
});
PopOverlay.propTypes = {
  popupOffset: import_prop_types7.default.oneOfType([import_prop_types7.default.number, import_prop_types7.default.shape({
    x: import_prop_types7.default.number,
    y: import_prop_types7.default.number
  })]),
  overlay: import_prop_types7.default.shape({
    position: import_prop_types7.default.object,
    events: import_prop_types7.default.array,
    date: import_prop_types7.default.instanceOf(Date),
    end: import_prop_types7.default.instanceOf(Date)
  }),
  accessors: import_prop_types7.default.object.isRequired,
  localizer: import_prop_types7.default.object.isRequired,
  components: import_prop_types7.default.object.isRequired,
  getters: import_prop_types7.default.object.isRequired,
  selected: import_prop_types7.default.object,
  handleSelectEvent: import_prop_types7.default.func,
  handleDoubleClickEvent: import_prop_types7.default.func,
  handleKeyPressEvent: import_prop_types7.default.func,
  handleDragStart: import_prop_types7.default.func,
  onHide: import_prop_types7.default.func,
  overlayDisplay: import_prop_types7.default.func
};
function addEventListener2(type, handler) {
  var target = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : document;
  return listen_default(target, type, handler, {
    passive: false
  });
}
function isOverContainer(container, x, y) {
  return !container || contains(container, document.elementFromPoint(x, y));
}
function getEventNodeFromPoint(node, _ref) {
  var clientX = _ref.clientX, clientY = _ref.clientY;
  var target = document.elementFromPoint(clientX, clientY);
  return closest(target, ".rbc-event", node);
}
function getShowMoreNodeFromPoint(node, _ref2) {
  var clientX = _ref2.clientX, clientY = _ref2.clientY;
  var target = document.elementFromPoint(clientX, clientY);
  return closest(target, ".rbc-show-more", node);
}
function isEvent(node, bounds) {
  return !!getEventNodeFromPoint(node, bounds);
}
function isShowMore(node, bounds) {
  return !!getShowMoreNodeFromPoint(node, bounds);
}
function getEventCoordinates(e) {
  var target = e;
  if (e.touches && e.touches.length) {
    target = e.touches[0];
  }
  return {
    clientX: target.clientX,
    clientY: target.clientY,
    pageX: target.pageX,
    pageY: target.pageY
  };
}
var clickTolerance = 5;
var clickInterval = 250;
var Selection = function() {
  function Selection2(node) {
    var _ref3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref3$global = _ref3.global, global2 = _ref3$global === void 0 ? false : _ref3$global, _ref3$longPressThresh = _ref3.longPressThreshold, longPressThreshold = _ref3$longPressThresh === void 0 ? 250 : _ref3$longPressThresh, _ref3$validContainers = _ref3.validContainers, validContainers = _ref3$validContainers === void 0 ? [] : _ref3$validContainers;
    _classCallCheck(this, Selection2);
    this.isDetached = false;
    this.container = node;
    this.globalMouse = !node || global2;
    this.longPressThreshold = longPressThreshold;
    this.validContainers = validContainers;
    this._listeners = /* @__PURE__ */ Object.create(null);
    this._handleInitialEvent = this._handleInitialEvent.bind(this);
    this._handleMoveEvent = this._handleMoveEvent.bind(this);
    this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this);
    this._keyListener = this._keyListener.bind(this);
    this._dropFromOutsideListener = this._dropFromOutsideListener.bind(this);
    this._dragOverFromOutsideListener = this._dragOverFromOutsideListener.bind(this);
    this._removeTouchMoveWindowListener = addEventListener2("touchmove", function() {
    }, window);
    this._removeKeyDownListener = addEventListener2("keydown", this._keyListener);
    this._removeKeyUpListener = addEventListener2("keyup", this._keyListener);
    this._removeDropFromOutsideListener = addEventListener2("drop", this._dropFromOutsideListener);
    this._removeDragOverFromOutsideListener = addEventListener2("dragover", this._dragOverFromOutsideListener);
    this._addInitialEventListener();
  }
  _createClass(Selection2, [{
    key: "on",
    value: function on(type, handler) {
      var handlers = this._listeners[type] || (this._listeners[type] = []);
      handlers.push(handler);
      return {
        remove: function remove() {
          var idx = handlers.indexOf(handler);
          if (idx !== -1)
            handlers.splice(idx, 1);
        }
      };
    }
  }, {
    key: "emit",
    value: function emit(type) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var result;
      var handlers = this._listeners[type] || [];
      handlers.forEach(function(fn2) {
        if (result === void 0)
          result = fn2.apply(void 0, args);
      });
      return result;
    }
  }, {
    key: "teardown",
    value: function teardown() {
      this.isDetached = true;
      this._listeners = /* @__PURE__ */ Object.create(null);
      this._removeTouchMoveWindowListener && this._removeTouchMoveWindowListener();
      this._removeInitialEventListener && this._removeInitialEventListener();
      this._removeEndListener && this._removeEndListener();
      this._onEscListener && this._onEscListener();
      this._removeMoveListener && this._removeMoveListener();
      this._removeKeyUpListener && this._removeKeyUpListener();
      this._removeKeyDownListener && this._removeKeyDownListener();
      this._removeDropFromOutsideListener && this._removeDropFromOutsideListener();
      this._removeDragOverFromOutsideListener && this._removeDragOverFromOutsideListener();
    }
  }, {
    key: "isSelected",
    value: function isSelected2(node) {
      var box = this._selectRect;
      if (!box || !this.selecting)
        return false;
      return objectsCollide(box, getBoundsForNode(node));
    }
  }, {
    key: "filter",
    value: function filter(items) {
      var box = this._selectRect;
      if (!box || !this.selecting)
        return [];
      return items.filter(this.isSelected, this);
    }
    // Adds a listener that will call the handler only after the user has pressed on the screen
    // without moving their finger for 250ms.
  }, {
    key: "_addLongPressListener",
    value: function _addLongPressListener(handler, initialEvent) {
      var _this = this;
      var timer = null;
      var removeTouchMoveListener = null;
      var removeTouchEndListener = null;
      var handleTouchStart = function handleTouchStart2(initialEvent2) {
        timer = setTimeout(function() {
          cleanup();
          handler(initialEvent2);
        }, _this.longPressThreshold);
        removeTouchMoveListener = addEventListener2("touchmove", function() {
          return cleanup();
        });
        removeTouchEndListener = addEventListener2("touchend", function() {
          return cleanup();
        });
      };
      var removeTouchStartListener = addEventListener2("touchstart", handleTouchStart);
      var cleanup = function cleanup2() {
        if (timer) {
          clearTimeout(timer);
        }
        if (removeTouchMoveListener) {
          removeTouchMoveListener();
        }
        if (removeTouchEndListener) {
          removeTouchEndListener();
        }
        timer = null;
        removeTouchMoveListener = null;
        removeTouchEndListener = null;
      };
      if (initialEvent) {
        handleTouchStart(initialEvent);
      }
      return function() {
        cleanup();
        removeTouchStartListener();
      };
    }
    // Listen for mousedown and touchstart events. When one is received, disable the other and setup
    // future event handling based on the type of event.
  }, {
    key: "_addInitialEventListener",
    value: function _addInitialEventListener() {
      var _this2 = this;
      var removeMouseDownListener = addEventListener2("mousedown", function(e) {
        _this2._removeInitialEventListener();
        _this2._handleInitialEvent(e);
        _this2._removeInitialEventListener = addEventListener2("mousedown", _this2._handleInitialEvent);
      });
      var removeTouchStartListener = addEventListener2("touchstart", function(e) {
        _this2._removeInitialEventListener();
        _this2._removeInitialEventListener = _this2._addLongPressListener(_this2._handleInitialEvent, e);
      });
      this._removeInitialEventListener = function() {
        removeMouseDownListener();
        removeTouchStartListener();
      };
    }
  }, {
    key: "_dropFromOutsideListener",
    value: function _dropFromOutsideListener(e) {
      var _getEventCoordinates = getEventCoordinates(e), pageX = _getEventCoordinates.pageX, pageY = _getEventCoordinates.pageY, clientX = _getEventCoordinates.clientX, clientY = _getEventCoordinates.clientY;
      this.emit("dropFromOutside", {
        x: pageX,
        y: pageY,
        clientX,
        clientY
      });
      e.preventDefault();
    }
  }, {
    key: "_dragOverFromOutsideListener",
    value: function _dragOverFromOutsideListener(e) {
      var _getEventCoordinates2 = getEventCoordinates(e), pageX = _getEventCoordinates2.pageX, pageY = _getEventCoordinates2.pageY, clientX = _getEventCoordinates2.clientX, clientY = _getEventCoordinates2.clientY;
      this.emit("dragOverFromOutside", {
        x: pageX,
        y: pageY,
        clientX,
        clientY
      });
      e.preventDefault();
    }
  }, {
    key: "_handleInitialEvent",
    value: function _handleInitialEvent(e) {
      if (this.isDetached) {
        return;
      }
      var _getEventCoordinates3 = getEventCoordinates(e), clientX = _getEventCoordinates3.clientX, clientY = _getEventCoordinates3.clientY, pageX = _getEventCoordinates3.pageX, pageY = _getEventCoordinates3.pageY;
      var node = this.container(), collides, offsetData;
      if (e.which === 3 || e.button === 2 || !isOverContainer(node, clientX, clientY))
        return;
      if (!this.globalMouse && node && !contains(node, e.target)) {
        var _normalizeDistance = normalizeDistance(0), top = _normalizeDistance.top, left = _normalizeDistance.left, bottom = _normalizeDistance.bottom, right = _normalizeDistance.right;
        offsetData = getBoundsForNode(node);
        collides = objectsCollide({
          top: offsetData.top - top,
          left: offsetData.left - left,
          bottom: offsetData.bottom + bottom,
          right: offsetData.right + right
        }, {
          top: pageY,
          left: pageX
        });
        if (!collides)
          return;
      }
      var result = this.emit("beforeSelect", this._initialEventData = {
        isTouch: /^touch/.test(e.type),
        x: pageX,
        y: pageY,
        clientX,
        clientY
      });
      if (result === false)
        return;
      switch (e.type) {
        case "mousedown":
          this._removeEndListener = addEventListener2("mouseup", this._handleTerminatingEvent);
          this._onEscListener = addEventListener2("keydown", this._handleTerminatingEvent);
          this._removeMoveListener = addEventListener2("mousemove", this._handleMoveEvent);
          break;
        case "touchstart":
          this._handleMoveEvent(e);
          this._removeEndListener = addEventListener2("touchend", this._handleTerminatingEvent);
          this._removeMoveListener = addEventListener2("touchmove", this._handleMoveEvent);
          break;
      }
    }
    // Check whether provided event target element
    // - is contained within a valid container
  }, {
    key: "_isWithinValidContainer",
    value: function _isWithinValidContainer(e) {
      var eventTarget = e.target;
      var containers = this.validContainers;
      if (!containers || !containers.length || !eventTarget) {
        return true;
      }
      return containers.some(function(target) {
        return !!eventTarget.closest(target);
      });
    }
  }, {
    key: "_handleTerminatingEvent",
    value: function _handleTerminatingEvent(e) {
      var _getEventCoordinates4 = getEventCoordinates(e), pageX = _getEventCoordinates4.pageX, pageY = _getEventCoordinates4.pageY;
      this.selecting = false;
      this._removeEndListener && this._removeEndListener();
      this._removeMoveListener && this._removeMoveListener();
      if (!this._initialEventData)
        return;
      var inRoot = !this.container || contains(this.container(), e.target);
      var isWithinValidContainer = this._isWithinValidContainer(e);
      var bounds = this._selectRect;
      var click = this.isClick(pageX, pageY);
      this._initialEventData = null;
      if (e.key === "Escape" || !isWithinValidContainer) {
        return this.emit("reset");
      }
      if (click && inRoot) {
        return this._handleClickEvent(e);
      }
      if (!click)
        return this.emit("select", bounds);
      return this.emit("reset");
    }
  }, {
    key: "_handleClickEvent",
    value: function _handleClickEvent(e) {
      var _getEventCoordinates5 = getEventCoordinates(e), pageX = _getEventCoordinates5.pageX, pageY = _getEventCoordinates5.pageY, clientX = _getEventCoordinates5.clientX, clientY = _getEventCoordinates5.clientY;
      var now = (/* @__PURE__ */ new Date()).getTime();
      if (this._lastClickData && now - this._lastClickData.timestamp < clickInterval) {
        this._lastClickData = null;
        return this.emit("doubleClick", {
          x: pageX,
          y: pageY,
          clientX,
          clientY
        });
      }
      this._lastClickData = {
        timestamp: now
      };
      return this.emit("click", {
        x: pageX,
        y: pageY,
        clientX,
        clientY
      });
    }
  }, {
    key: "_handleMoveEvent",
    value: function _handleMoveEvent(e) {
      if (this._initialEventData === null || this.isDetached) {
        return;
      }
      var _this$_initialEventDa = this._initialEventData, x = _this$_initialEventDa.x, y = _this$_initialEventDa.y;
      var _getEventCoordinates6 = getEventCoordinates(e), pageX = _getEventCoordinates6.pageX, pageY = _getEventCoordinates6.pageY;
      var w = Math.abs(x - pageX);
      var h = Math.abs(y - pageY);
      var left = Math.min(pageX, x), top = Math.min(pageY, y), old = this.selecting;
      if (this.isClick(pageX, pageY) && !old && !(w || h)) {
        return;
      }
      this.selecting = true;
      this._selectRect = {
        top,
        left,
        x: pageX,
        y: pageY,
        right: left + w,
        bottom: top + h
      };
      if (!old) {
        this.emit("selectStart", this._initialEventData);
      }
      if (!this.isClick(pageX, pageY))
        this.emit("selecting", this._selectRect);
      e.preventDefault();
    }
  }, {
    key: "_keyListener",
    value: function _keyListener(e) {
      this.ctrl = e.metaKey || e.ctrlKey;
    }
  }, {
    key: "isClick",
    value: function isClick(pageX, pageY) {
      var _this$_initialEventDa2 = this._initialEventData, x = _this$_initialEventDa2.x, y = _this$_initialEventDa2.y, isTouch = _this$_initialEventDa2.isTouch;
      return !isTouch && Math.abs(pageX - x) <= clickTolerance && Math.abs(pageY - y) <= clickTolerance;
    }
  }]);
  return Selection2;
}();
function normalizeDistance() {
  var distance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
  if (_typeof(distance) !== "object")
    distance = {
      top: distance,
      left: distance,
      right: distance,
      bottom: distance
    };
  return distance;
}
function objectsCollide(nodeA, nodeB) {
  var tolerance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  var _getBoundsForNode = getBoundsForNode(nodeA), aTop = _getBoundsForNode.top, aLeft = _getBoundsForNode.left, _getBoundsForNode$rig = _getBoundsForNode.right, aRight = _getBoundsForNode$rig === void 0 ? aLeft : _getBoundsForNode$rig, _getBoundsForNode$bot = _getBoundsForNode.bottom, aBottom = _getBoundsForNode$bot === void 0 ? aTop : _getBoundsForNode$bot;
  var _getBoundsForNode2 = getBoundsForNode(nodeB), bTop = _getBoundsForNode2.top, bLeft = _getBoundsForNode2.left, _getBoundsForNode2$ri = _getBoundsForNode2.right, bRight = _getBoundsForNode2$ri === void 0 ? bLeft : _getBoundsForNode2$ri, _getBoundsForNode2$bo = _getBoundsForNode2.bottom, bBottom = _getBoundsForNode2$bo === void 0 ? bTop : _getBoundsForNode2$bo;
  return !// 'a' bottom doesn't touch 'b' top
  (aBottom - tolerance < bTop || // 'a' top doesn't touch 'b' bottom
  aTop + tolerance > bBottom || // 'a' right doesn't touch 'b' left
  aRight - tolerance < bLeft || // 'a' left doesn't touch 'b' right
  aLeft + tolerance > bRight);
}
function getBoundsForNode(node) {
  if (!node.getBoundingClientRect)
    return node;
  var rect = node.getBoundingClientRect(), left = rect.left + pageOffset("left"), top = rect.top + pageOffset("top");
  return {
    top,
    left,
    right: (node.offsetWidth || 0) + left,
    bottom: (node.offsetHeight || 0) + top
  };
}
function pageOffset(dir) {
  if (dir === "left")
    return window.pageXOffset || document.body.scrollLeft || 0;
  if (dir === "top")
    return window.pageYOffset || document.body.scrollTop || 0;
}
var BackgroundCells = function(_React$Component) {
  _inherits(BackgroundCells2, _React$Component);
  var _super = _createSuper(BackgroundCells2);
  function BackgroundCells2(props, context) {
    var _this;
    _classCallCheck(this, BackgroundCells2);
    _this = _super.call(this, props, context);
    _this.state = {
      selecting: false
    };
    _this.containerRef = (0, import_react25.createRef)();
    return _this;
  }
  _createClass(BackgroundCells2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.selectable && this._selectable();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._teardownSelectable();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.selectable && this.props.selectable)
        this._selectable();
      if (prevProps.selectable && !this.props.selectable)
        this._teardownSelectable();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props, range3 = _this$props.range, getNow2 = _this$props.getNow, getters = _this$props.getters, currentDate = _this$props.date, Wrapper = _this$props.components.dateCellWrapper, localizer = _this$props.localizer;
      var _this$state = this.state, selecting = _this$state.selecting, startIdx = _this$state.startIdx, endIdx = _this$state.endIdx;
      var current = getNow2();
      return import_react25.default.createElement("div", {
        className: "rbc-row-bg",
        ref: this.containerRef
      }, range3.map(function(date2, index) {
        var selected = selecting && index >= startIdx && index <= endIdx;
        var _getters$dayProp = getters.dayProp(date2), className = _getters$dayProp.className, style2 = _getters$dayProp.style;
        return import_react25.default.createElement(Wrapper, {
          key: index,
          value: date2,
          range: range3
        }, import_react25.default.createElement("div", {
          style: style2,
          className: clsx_m_default("rbc-day-bg", className, selected && "rbc-selected-cell", localizer.isSameDate(date2, current) && "rbc-today", currentDate && localizer.neq(currentDate, date2, "month") && "rbc-off-range-bg")
        }));
      }));
    }
  }, {
    key: "_selectable",
    value: function _selectable() {
      var _this2 = this;
      var node = this.containerRef.current;
      var selector = this._selector = new Selection(this.props.container, {
        longPressThreshold: this.props.longPressThreshold
      });
      var selectorClicksHandler = function selectorClicksHandler2(point, actionType) {
        if (!isEvent(node, point) && !isShowMore(node, point)) {
          var rowBox = getBoundsForNode(node);
          var _this2$props = _this2.props, range3 = _this2$props.range, rtl = _this2$props.rtl;
          if (pointInBox(rowBox, point)) {
            var currentCell = getSlotAtX(rowBox, point.x, rtl, range3.length);
            _this2._selectSlot({
              startIdx: currentCell,
              endIdx: currentCell,
              action: actionType,
              box: point
            });
          }
        }
        _this2._initial = {};
        _this2.setState({
          selecting: false
        });
      };
      selector.on("selecting", function(box) {
        var _this2$props2 = _this2.props, range3 = _this2$props2.range, rtl = _this2$props2.rtl;
        var startIdx = -1;
        var endIdx = -1;
        if (!_this2.state.selecting) {
          notify(_this2.props.onSelectStart, [box]);
          _this2._initial = {
            x: box.x,
            y: box.y
          };
        }
        if (selector.isSelected(node)) {
          var nodeBox = getBoundsForNode(node);
          var _dateCellSelection = dateCellSelection(_this2._initial, nodeBox, box, range3.length, rtl);
          startIdx = _dateCellSelection.startIdx;
          endIdx = _dateCellSelection.endIdx;
        }
        _this2.setState({
          selecting: true,
          startIdx,
          endIdx
        });
      });
      selector.on("beforeSelect", function(box) {
        if (_this2.props.selectable !== "ignoreEvents")
          return;
        return !isEvent(_this2.containerRef.current, box);
      });
      selector.on("click", function(point) {
        return selectorClicksHandler(point, "click");
      });
      selector.on("doubleClick", function(point) {
        return selectorClicksHandler(point, "doubleClick");
      });
      selector.on("select", function(bounds) {
        _this2._selectSlot(_objectSpread2(_objectSpread2({}, _this2.state), {}, {
          action: "select",
          bounds
        }));
        _this2._initial = {};
        _this2.setState({
          selecting: false
        });
        notify(_this2.props.onSelectEnd, [_this2.state]);
      });
    }
  }, {
    key: "_teardownSelectable",
    value: function _teardownSelectable() {
      if (!this._selector)
        return;
      this._selector.teardown();
      this._selector = null;
    }
  }, {
    key: "_selectSlot",
    value: function _selectSlot(_ref) {
      var endIdx = _ref.endIdx, startIdx = _ref.startIdx, action = _ref.action, bounds = _ref.bounds, box = _ref.box;
      if (endIdx !== -1 && startIdx !== -1)
        this.props.onSelectSlot && this.props.onSelectSlot({
          start: startIdx,
          end: endIdx,
          action,
          bounds,
          box,
          resourceId: this.props.resourceId
        });
    }
  }]);
  return BackgroundCells2;
}(import_react25.default.Component);
var EventRowMixin = {
  propTypes: {
    slotMetrics: import_prop_types7.default.object.isRequired,
    selected: import_prop_types7.default.object,
    isAllDay: import_prop_types7.default.bool,
    accessors: import_prop_types7.default.object.isRequired,
    localizer: import_prop_types7.default.object.isRequired,
    components: import_prop_types7.default.object.isRequired,
    getters: import_prop_types7.default.object.isRequired,
    onSelect: import_prop_types7.default.func,
    onDoubleClick: import_prop_types7.default.func,
    onKeyPress: import_prop_types7.default.func
  },
  defaultProps: {
    segments: [],
    selected: {}
  },
  renderEvent: function renderEvent(props, event) {
    var selected = props.selected;
    props.isAllDay;
    var accessors = props.accessors, getters = props.getters, onSelect = props.onSelect, onDoubleClick = props.onDoubleClick, onKeyPress = props.onKeyPress, localizer = props.localizer, slotMetrics = props.slotMetrics, components2 = props.components, resizable = props.resizable;
    var continuesPrior2 = slotMetrics.continuesPrior(event);
    var continuesAfter2 = slotMetrics.continuesAfter(event);
    return import_react25.default.createElement(EventCell, {
      event,
      getters,
      localizer,
      accessors,
      components: components2,
      onSelect,
      onDoubleClick,
      onKeyPress,
      continuesPrior: continuesPrior2,
      continuesAfter: continuesAfter2,
      slotStart: slotMetrics.first,
      slotEnd: slotMetrics.last,
      selected: isSelected(event, selected),
      resizable
    });
  },
  renderSpan: function renderSpan(slots, len, key) {
    var content = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : " ";
    var per = Math.abs(len) / slots * 100 + "%";
    return import_react25.default.createElement("div", {
      key,
      className: "rbc-row-segment",
      style: {
        WebkitFlexBasis: per,
        flexBasis: per,
        maxWidth: per
      }
    }, content);
  }
};
var EventRow = function(_React$Component) {
  _inherits(EventRow2, _React$Component);
  var _super = _createSuper(EventRow2);
  function EventRow2() {
    _classCallCheck(this, EventRow2);
    return _super.apply(this, arguments);
  }
  _createClass(EventRow2, [{
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props, segments = _this$props.segments, slots = _this$props.slotMetrics.slots, className = _this$props.className;
      var lastEnd = 1;
      return import_react25.default.createElement("div", {
        className: clsx_m_default(className, "rbc-row")
      }, segments.reduce(function(row, _ref, li) {
        var event = _ref.event, left = _ref.left, right = _ref.right, span = _ref.span;
        var key = "_lvl_" + li;
        var gap = left - lastEnd;
        var content = EventRowMixin.renderEvent(_this.props, event);
        if (gap)
          row.push(EventRowMixin.renderSpan(slots, gap, "".concat(key, "_gap")));
        row.push(EventRowMixin.renderSpan(slots, span, key, content));
        lastEnd = right + 1;
        return row;
      }, []));
    }
  }]);
  return EventRow2;
}(import_react25.default.Component);
EventRow.defaultProps = _objectSpread2({}, EventRowMixin.defaultProps);
function endOfRange(_ref) {
  var dateRange = _ref.dateRange, _ref$unit = _ref.unit, unit = _ref$unit === void 0 ? "day" : _ref$unit, localizer = _ref.localizer;
  return {
    first: dateRange[0],
    last: localizer.add(dateRange[dateRange.length - 1], 1, unit)
  };
}
function eventSegments(event, range3, accessors, localizer) {
  var _endOfRange = endOfRange({
    dateRange: range3,
    localizer
  }), first = _endOfRange.first, last2 = _endOfRange.last;
  var slots = localizer.diff(first, last2, "day");
  var start = localizer.max(localizer.startOf(accessors.start(event), "day"), first);
  var end = localizer.min(localizer.ceil(accessors.end(event), "day"), last2);
  var padding = findIndex_default(range3, function(x) {
    return localizer.isSameDate(x, start);
  });
  var span = localizer.diff(start, end, "day");
  span = Math.min(span, slots);
  span = Math.max(span - localizer.segmentOffset, 1);
  return {
    event,
    span,
    left: padding + 1,
    right: Math.max(padding + span, 1)
  };
}
function eventLevels(rowSegments) {
  var limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Infinity;
  var i, j, seg, levels = [], extra = [];
  for (i = 0; i < rowSegments.length; i++) {
    seg = rowSegments[i];
    for (j = 0; j < levels.length; j++)
      if (!segsOverlap(seg, levels[j]))
        break;
    if (j >= limit) {
      extra.push(seg);
    } else {
      (levels[j] || (levels[j] = [])).push(seg);
    }
  }
  for (i = 0; i < levels.length; i++) {
    levels[i].sort(function(a, b) {
      return a.left - b.left;
    });
  }
  return {
    levels,
    extra
  };
}
function inRange2(e, start, end, accessors, localizer) {
  var event = {
    start: accessors.start(e),
    end: accessors.end(e)
  };
  var range3 = {
    start,
    end
  };
  return localizer.inEventRange({
    event,
    range: range3
  });
}
function segsOverlap(seg, otherSegs) {
  return otherSegs.some(function(otherSeg) {
    return otherSeg.left <= seg.right && otherSeg.right >= seg.left;
  });
}
function sortEvents(eventA, eventB, accessors, localizer) {
  var evtA = {
    start: accessors.start(eventA),
    end: accessors.end(eventA),
    allDay: accessors.allDay(eventA)
  };
  var evtB = {
    start: accessors.start(eventB),
    end: accessors.end(eventB),
    allDay: accessors.allDay(eventB)
  };
  return localizer.sortEvents({
    evtA,
    evtB
  });
}
var isSegmentInSlot$1 = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot;
};
var eventsInSlot = function eventsInSlot2(segments, slot) {
  return segments.filter(function(seg) {
    return isSegmentInSlot$1(seg, slot);
  }).length;
};
var EventEndingRow = function(_React$Component) {
  _inherits(EventEndingRow2, _React$Component);
  var _super = _createSuper(EventEndingRow2);
  function EventEndingRow2() {
    _classCallCheck(this, EventEndingRow2);
    return _super.apply(this, arguments);
  }
  _createClass(EventEndingRow2, [{
    key: "render",
    value: function render() {
      var _this$props = this.props, segments = _this$props.segments, slots = _this$props.slotMetrics.slots;
      var rowSegments = eventLevels(segments).levels[0];
      var current = 1, lastEnd = 1, row = [];
      while (current <= slots) {
        var key = "_lvl_" + current;
        var _ref = rowSegments.filter(function(seg) {
          return isSegmentInSlot$1(seg, current);
        })[0] || {}, event = _ref.event, left = _ref.left, right = _ref.right, span = _ref.span;
        if (!event) {
          current++;
          continue;
        }
        var gap = Math.max(0, left - lastEnd);
        if (this.canRenderSlotEvent(left, span)) {
          var content = EventRowMixin.renderEvent(this.props, event);
          if (gap) {
            row.push(EventRowMixin.renderSpan(slots, gap, key + "_gap"));
          }
          row.push(EventRowMixin.renderSpan(slots, span, key, content));
          lastEnd = current = right + 1;
        } else {
          if (gap) {
            row.push(EventRowMixin.renderSpan(slots, gap, key + "_gap"));
          }
          row.push(EventRowMixin.renderSpan(slots, 1, key, this.renderShowMore(segments, current)));
          lastEnd = current = current + 1;
        }
      }
      return import_react25.default.createElement("div", {
        className: "rbc-row"
      }, row);
    }
  }, {
    key: "canRenderSlotEvent",
    value: function canRenderSlotEvent(slot, span) {
      var segments = this.props.segments;
      return range_default(slot, slot + span).every(function(s) {
        var count = eventsInSlot(segments, s);
        return count === 1;
      });
    }
  }, {
    key: "renderShowMore",
    value: function renderShowMore(segments, slot) {
      var _this = this;
      var localizer = this.props.localizer;
      var count = eventsInSlot(segments, slot);
      return count ? import_react25.default.createElement("button", {
        type: "button",
        key: "sm_" + slot,
        className: clsx_m_default("rbc-button-link", "rbc-show-more"),
        onClick: function onClick(e) {
          return _this.showMore(slot, e);
        }
      }, localizer.messages.showMore(count)) : false;
    }
  }, {
    key: "showMore",
    value: function showMore2(slot, e) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onShowMore(slot, e.target);
    }
  }]);
  return EventEndingRow2;
}(import_react25.default.Component);
EventEndingRow.defaultProps = _objectSpread2({}, EventRowMixin.defaultProps);
var ScrollableWeekWrapper = function ScrollableWeekWrapper2(_ref) {
  var children = _ref.children;
  return import_react25.default.createElement("div", {
    className: "rbc-row-content-scroll-container"
  }, children);
};
var isSegmentInSlot2 = function isSegmentInSlot3(seg, slot) {
  return seg.left <= slot && seg.right >= slot;
};
var isEqual3 = function isEqual4(a, b) {
  return a[0].range === b[0].range && a[0].events === b[0].events;
};
function getSlotMetrics$1() {
  return memoizeOne(function(options) {
    var range3 = options.range, events = options.events, maxRows = options.maxRows, minRows = options.minRows, accessors = options.accessors, localizer = options.localizer;
    var _endOfRange = endOfRange({
      dateRange: range3,
      localizer
    }), first = _endOfRange.first, last2 = _endOfRange.last;
    var segments = events.map(function(evt) {
      return eventSegments(evt, range3, accessors, localizer);
    });
    var _eventLevels = eventLevels(segments, Math.max(maxRows - 1, 1)), levels = _eventLevels.levels, extra = _eventLevels.extra;
    var minEventRows = extra.length > 0 ? minRows - 1 : minRows;
    while (levels.length < minEventRows)
      levels.push([]);
    return {
      first,
      last: last2,
      levels,
      extra,
      range: range3,
      slots: range3.length,
      clone: function clone(args) {
        var metrics = getSlotMetrics$1();
        return metrics(_objectSpread2(_objectSpread2({}, options), args));
      },
      getDateForSlot: function getDateForSlot(slotNumber) {
        return range3[slotNumber];
      },
      getSlotForDate: function getSlotForDate(date2) {
        return range3.find(function(r) {
          return localizer.isSameDate(r, date2);
        });
      },
      getEventsForSlot: function getEventsForSlot(slot) {
        return segments.filter(function(seg) {
          return isSegmentInSlot2(seg, slot);
        }).map(function(seg) {
          return seg.event;
        });
      },
      continuesPrior: function continuesPrior2(event) {
        return localizer.continuesPrior(accessors.start(event), first);
      },
      continuesAfter: function continuesAfter2(event) {
        var start = accessors.start(event);
        var end = accessors.end(event);
        return localizer.continuesAfter(start, end, last2);
      }
    };
  }, isEqual3);
}
var DateContentRow = function(_React$Component) {
  _inherits(DateContentRow2, _React$Component);
  var _super = _createSuper(DateContentRow2);
  function DateContentRow2() {
    var _this;
    _classCallCheck(this, DateContentRow2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleSelectSlot = function(slot) {
      var _this$props = _this.props, range3 = _this$props.range, onSelectSlot = _this$props.onSelectSlot;
      onSelectSlot(range3.slice(slot.start, slot.end + 1), slot);
    };
    _this.handleShowMore = function(slot, target) {
      var _this$props2 = _this.props, range3 = _this$props2.range, onShowMore = _this$props2.onShowMore;
      var metrics = _this.slotMetrics(_this.props);
      var row = qsa(_this.containerRef.current, ".rbc-row-bg")[0];
      var cell;
      if (row)
        cell = row.children[slot - 1];
      var events = metrics.getEventsForSlot(slot);
      onShowMore(events, range3[slot - 1], cell, slot, target);
    };
    _this.getContainer = function() {
      var container = _this.props.container;
      return container ? container() : _this.containerRef.current;
    };
    _this.renderHeadingCell = function(date2, index) {
      var _this$props3 = _this.props, renderHeader = _this$props3.renderHeader, getNow2 = _this$props3.getNow, localizer = _this$props3.localizer;
      return renderHeader({
        date: date2,
        key: "header_".concat(index),
        className: clsx_m_default("rbc-date-cell", localizer.isSameDate(date2, getNow2()) && "rbc-now")
      });
    };
    _this.renderDummy = function() {
      var _this$props4 = _this.props, className = _this$props4.className, range3 = _this$props4.range, renderHeader = _this$props4.renderHeader, showAllEvents = _this$props4.showAllEvents;
      return import_react25.default.createElement("div", {
        className,
        ref: _this.containerRef
      }, import_react25.default.createElement("div", {
        className: clsx_m_default("rbc-row-content", showAllEvents && "rbc-row-content-scrollable")
      }, renderHeader && import_react25.default.createElement("div", {
        className: "rbc-row",
        ref: _this.headingRowRef
      }, range3.map(_this.renderHeadingCell)), import_react25.default.createElement("div", {
        className: "rbc-row",
        ref: _this.eventRowRef
      }, import_react25.default.createElement("div", {
        className: "rbc-row-segment"
      }, import_react25.default.createElement("div", {
        className: "rbc-event"
      }, import_react25.default.createElement("div", {
        className: "rbc-event-content"
      }, " "))))));
    };
    _this.containerRef = (0, import_react25.createRef)();
    _this.headingRowRef = (0, import_react25.createRef)();
    _this.eventRowRef = (0, import_react25.createRef)();
    _this.slotMetrics = getSlotMetrics$1();
    return _this;
  }
  _createClass(DateContentRow2, [{
    key: "getRowLimit",
    value: function getRowLimit() {
      var _this$headingRowRef;
      var eventHeight = height(this.eventRowRef.current);
      var headingHeight = (_this$headingRowRef = this.headingRowRef) !== null && _this$headingRowRef !== void 0 && _this$headingRowRef.current ? height(this.headingRowRef.current) : 0;
      var eventSpace = height(this.containerRef.current) - headingHeight;
      return Math.max(Math.floor(eventSpace / eventHeight), 1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props, date2 = _this$props5.date, rtl = _this$props5.rtl, range3 = _this$props5.range, className = _this$props5.className, selected = _this$props5.selected, selectable = _this$props5.selectable, renderForMeasure = _this$props5.renderForMeasure, accessors = _this$props5.accessors, getters = _this$props5.getters, components2 = _this$props5.components, getNow2 = _this$props5.getNow, renderHeader = _this$props5.renderHeader, onSelect = _this$props5.onSelect, localizer = _this$props5.localizer, onSelectStart = _this$props5.onSelectStart, onSelectEnd = _this$props5.onSelectEnd, onDoubleClick = _this$props5.onDoubleClick, onKeyPress = _this$props5.onKeyPress, resourceId = _this$props5.resourceId, longPressThreshold = _this$props5.longPressThreshold, isAllDay = _this$props5.isAllDay, resizable = _this$props5.resizable, showAllEvents = _this$props5.showAllEvents;
      if (renderForMeasure)
        return this.renderDummy();
      var metrics = this.slotMetrics(this.props);
      var levels = metrics.levels, extra = metrics.extra;
      var ScrollableWeekComponent = showAllEvents ? ScrollableWeekWrapper : NoopWrapper;
      var WeekWrapper = components2.weekWrapper;
      var eventRowProps = {
        selected,
        accessors,
        getters,
        localizer,
        components: components2,
        onSelect,
        onDoubleClick,
        onKeyPress,
        resourceId,
        slotMetrics: metrics,
        resizable
      };
      return import_react25.default.createElement("div", {
        className,
        role: "rowgroup",
        ref: this.containerRef
      }, import_react25.default.createElement(BackgroundCells, {
        localizer,
        date: date2,
        getNow: getNow2,
        rtl,
        range: range3,
        selectable,
        container: this.getContainer,
        getters,
        onSelectStart,
        onSelectEnd,
        onSelectSlot: this.handleSelectSlot,
        components: components2,
        longPressThreshold,
        resourceId
      }), import_react25.default.createElement("div", {
        className: clsx_m_default("rbc-row-content", showAllEvents && "rbc-row-content-scrollable"),
        role: "row"
      }, renderHeader && import_react25.default.createElement("div", {
        className: "rbc-row ",
        ref: this.headingRowRef
      }, range3.map(this.renderHeadingCell)), import_react25.default.createElement(ScrollableWeekComponent, null, import_react25.default.createElement(WeekWrapper, Object.assign({
        isAllDay
      }, eventRowProps), levels.map(function(segs, idx) {
        return import_react25.default.createElement(EventRow, Object.assign({
          key: idx,
          segments: segs
        }, eventRowProps));
      }), !!extra.length && import_react25.default.createElement(EventEndingRow, Object.assign({
        segments: extra,
        onShowMore: this.handleShowMore
      }, eventRowProps))))));
    }
  }]);
  return DateContentRow2;
}(import_react25.default.Component);
DateContentRow.defaultProps = {
  minRows: 0,
  maxRows: Infinity
};
var Header = function Header2(_ref) {
  var label = _ref.label;
  return import_react25.default.createElement("span", {
    role: "columnheader",
    "aria-sort": "none"
  }, label);
};
var DateHeader = function DateHeader2(_ref) {
  var label = _ref.label, drilldownView = _ref.drilldownView, onDrillDown = _ref.onDrillDown;
  if (!drilldownView) {
    return import_react25.default.createElement("span", null, label);
  }
  return import_react25.default.createElement("button", {
    type: "button",
    className: "rbc-button-link",
    onClick: onDrillDown,
    role: "cell"
  }, label);
};
var _excluded$6 = ["date", "className"];
var eventsForWeek = function eventsForWeek2(evts, start, end, accessors, localizer) {
  return evts.filter(function(e) {
    return inRange2(e, start, end, accessors, localizer);
  });
};
var MonthView = function(_React$Component) {
  _inherits(MonthView2, _React$Component);
  var _super = _createSuper(MonthView2);
  function MonthView2() {
    var _this;
    _classCallCheck(this, MonthView2);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(_args));
    _this.getContainer = function() {
      return _this.containerRef.current;
    };
    _this.renderWeek = function(week, weekIdx) {
      var _this$props = _this.props, events = _this$props.events, components2 = _this$props.components, selectable = _this$props.selectable, getNow2 = _this$props.getNow, selected = _this$props.selected, date2 = _this$props.date, localizer = _this$props.localizer, longPressThreshold = _this$props.longPressThreshold, accessors = _this$props.accessors, getters = _this$props.getters, showAllEvents = _this$props.showAllEvents;
      var _this$state = _this.state, needLimitMeasure = _this$state.needLimitMeasure, rowLimit = _this$state.rowLimit;
      var weeksEvents = eventsForWeek(_toConsumableArray(events), week[0], week[week.length - 1], accessors, localizer);
      weeksEvents.sort(function(a, b) {
        return sortEvents(a, b, accessors, localizer);
      });
      return import_react25.default.createElement(DateContentRow, {
        key: weekIdx,
        ref: weekIdx === 0 ? _this.slotRowRef : void 0,
        container: _this.getContainer,
        className: "rbc-month-row",
        getNow: getNow2,
        date: date2,
        range: week,
        events: weeksEvents,
        maxRows: showAllEvents ? Infinity : rowLimit,
        selected,
        selectable,
        components: components2,
        accessors,
        getters,
        localizer,
        renderHeader: _this.readerDateHeading,
        renderForMeasure: needLimitMeasure,
        onShowMore: _this.handleShowMore,
        onSelect: _this.handleSelectEvent,
        onDoubleClick: _this.handleDoubleClickEvent,
        onKeyPress: _this.handleKeyPressEvent,
        onSelectSlot: _this.handleSelectSlot,
        longPressThreshold,
        rtl: _this.props.rtl,
        resizable: _this.props.resizable,
        showAllEvents
      });
    };
    _this.readerDateHeading = function(_ref) {
      var date2 = _ref.date, className = _ref.className, props = _objectWithoutProperties(_ref, _excluded$6);
      var _this$props2 = _this.props, currentDate = _this$props2.date, getDrilldownView = _this$props2.getDrilldownView, localizer = _this$props2.localizer;
      var isOffRange = localizer.neq(date2, currentDate, "month");
      var isCurrent = localizer.isSameDate(date2, currentDate);
      var drilldownView = getDrilldownView(date2);
      var label = localizer.format(date2, "dateFormat");
      var DateHeaderComponent = _this.props.components.dateHeader || DateHeader;
      return import_react25.default.createElement("div", Object.assign({}, props, {
        className: clsx_m_default(className, isOffRange && "rbc-off-range", isCurrent && "rbc-current"),
        role: "cell"
      }), import_react25.default.createElement(DateHeaderComponent, {
        label,
        date: date2,
        drilldownView,
        isOffRange,
        onDrillDown: function onDrillDown(e) {
          return _this.handleHeadingClick(date2, drilldownView, e);
        }
      }));
    };
    _this.handleSelectSlot = function(range3, slotInfo) {
      _this._pendingSelection = _this._pendingSelection.concat(range3);
      clearTimeout(_this._selectTimer);
      _this._selectTimer = setTimeout(function() {
        return _this.selectDates(slotInfo);
      });
    };
    _this.handleHeadingClick = function(date2, view, e) {
      e.preventDefault();
      _this.clearSelection();
      notify(_this.props.onDrillDown, [date2, view]);
    };
    _this.handleSelectEvent = function() {
      _this.clearSelection();
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      notify(_this.props.onSelectEvent, args);
    };
    _this.handleDoubleClickEvent = function() {
      _this.clearSelection();
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      notify(_this.props.onDoubleClickEvent, args);
    };
    _this.handleKeyPressEvent = function() {
      _this.clearSelection();
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      notify(_this.props.onKeyPressEvent, args);
    };
    _this.handleShowMore = function(events, date2, cell, slot, target) {
      var _this$props3 = _this.props, popup = _this$props3.popup, onDrillDown = _this$props3.onDrillDown, onShowMore = _this$props3.onShowMore, getDrilldownView = _this$props3.getDrilldownView, doShowMoreDrillDown = _this$props3.doShowMoreDrillDown;
      _this.clearSelection();
      if (popup) {
        var position2 = position(cell, _this.containerRef.current);
        _this.setState({
          overlay: {
            date: date2,
            events,
            position: position2,
            target
          }
        });
      } else if (doShowMoreDrillDown) {
        notify(onDrillDown, [date2, getDrilldownView(date2) || views.DAY]);
      }
      notify(onShowMore, [events, date2, slot]);
    };
    _this.overlayDisplay = function() {
      _this.setState({
        overlay: null
      });
    };
    _this.state = {
      rowLimit: 5,
      needLimitMeasure: true,
      date: null
    };
    _this.containerRef = (0, import_react25.createRef)();
    _this.slotRowRef = (0, import_react25.createRef)();
    _this._bgRows = [];
    _this._pendingSelection = [];
    return _this;
  }
  _createClass(MonthView2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var running;
      if (this.state.needLimitMeasure)
        this.measureRowLimit(this.props);
      window.addEventListener("resize", this._resizeListener = function() {
        if (!running) {
          request(function() {
            running = false;
            _this2.setState({
              needLimitMeasure: true
            });
          });
        }
      }, false);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.needLimitMeasure)
        this.measureRowLimit(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this._resizeListener, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props, date2 = _this$props4.date, localizer = _this$props4.localizer, className = _this$props4.className, month2 = localizer.visibleDays(date2, localizer), weeks = chunk_default(month2, 7);
      this._weekCount = weeks.length;
      return import_react25.default.createElement("div", {
        className: clsx_m_default("rbc-month-view", className),
        role: "table",
        "aria-label": "Month View",
        ref: this.containerRef
      }, import_react25.default.createElement("div", {
        className: "rbc-row rbc-month-header",
        role: "row"
      }, this.renderHeaders(weeks[0])), weeks.map(this.renderWeek), this.props.popup && this.renderOverlay());
    }
  }, {
    key: "renderHeaders",
    value: function renderHeaders(row) {
      var _this$props5 = this.props, localizer = _this$props5.localizer, components2 = _this$props5.components;
      var first = row[0];
      var last2 = row[row.length - 1];
      var HeaderComponent = components2.header || Header;
      return localizer.range(first, last2, "day").map(function(day2, idx) {
        return import_react25.default.createElement("div", {
          key: "header_" + idx,
          className: "rbc-header"
        }, import_react25.default.createElement(HeaderComponent, {
          date: day2,
          localizer,
          label: localizer.format(day2, "weekdayFormat")
        }));
      });
    }
  }, {
    key: "renderOverlay",
    value: function renderOverlay() {
      var _this$state$overlay, _this$state2, _this3 = this;
      var overlay = (_this$state$overlay = (_this$state2 = this.state) === null || _this$state2 === void 0 ? void 0 : _this$state2.overlay) !== null && _this$state$overlay !== void 0 ? _this$state$overlay : {};
      var _this$props6 = this.props, accessors = _this$props6.accessors, localizer = _this$props6.localizer, components2 = _this$props6.components, getters = _this$props6.getters, selected = _this$props6.selected, popupOffset = _this$props6.popupOffset, handleDragStart = _this$props6.handleDragStart;
      var onHide2 = function onHide3() {
        return _this3.setState({
          overlay: null
        });
      };
      return import_react25.default.createElement(PopOverlay, {
        overlay,
        accessors,
        localizer,
        components: components2,
        getters,
        selected,
        popupOffset,
        ref: this.containerRef,
        handleKeyPressEvent: this.handleKeyPressEvent,
        handleSelectEvent: this.handleSelectEvent,
        handleDoubleClickEvent: this.handleDoubleClickEvent,
        handleDragStart,
        show: !!overlay.position,
        overlayDisplay: this.overlayDisplay,
        onHide: onHide2
      });
    }
  }, {
    key: "measureRowLimit",
    value: function measureRowLimit() {
      this.setState({
        needLimitMeasure: false,
        rowLimit: this.slotRowRef.current.getRowLimit()
      });
    }
  }, {
    key: "selectDates",
    value: function selectDates(slotInfo) {
      var slots = this._pendingSelection.slice();
      this._pendingSelection = [];
      slots.sort(function(a, b) {
        return +a - +b;
      });
      var start = new Date(slots[0]);
      var end = new Date(slots[slots.length - 1]);
      end.setDate(slots[slots.length - 1].getDate() + 1);
      notify(this.props.onSelectSlot, {
        slots,
        start,
        end,
        action: slotInfo.action,
        bounds: slotInfo.bounds,
        box: slotInfo.box
      });
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      clearTimeout(this._selectTimer);
      this._pendingSelection = [];
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref2, state) {
      var date2 = _ref2.date, localizer = _ref2.localizer;
      return {
        date: date2,
        needLimitMeasure: localizer.neq(date2, state.date, "month")
      };
    }
  }]);
  return MonthView2;
}(import_react25.default.Component);
MonthView.range = function(date2, _ref3) {
  var localizer = _ref3.localizer;
  var start = localizer.firstVisibleDay(date2, localizer);
  var end = localizer.lastVisibleDay(date2, localizer);
  return {
    start,
    end
  };
};
MonthView.navigate = function(date2, action, _ref4) {
  var localizer = _ref4.localizer;
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date2, -1, "month");
    case navigate.NEXT:
      return localizer.add(date2, 1, "month");
    default:
      return date2;
  }
};
MonthView.title = function(date2, _ref5) {
  var localizer = _ref5.localizer;
  return localizer.format(date2, "monthHeaderFormat");
};
var getKey3 = function getKey4(_ref) {
  var min2 = _ref.min, max2 = _ref.max, step = _ref.step, slots = _ref.slots, localizer = _ref.localizer;
  return "".concat(+localizer.startOf(min2, "minutes")) + "".concat(+localizer.startOf(max2, "minutes")) + "".concat(step, "-").concat(slots);
};
function getSlotMetrics(_ref2) {
  var start = _ref2.min, end = _ref2.max, step = _ref2.step, timeslots = _ref2.timeslots, localizer = _ref2.localizer;
  var key = getKey3({
    start,
    end,
    step,
    timeslots,
    localizer
  });
  var totalMin = 1 + localizer.getTotalMin(start, end);
  var minutesFromMidnight = localizer.getMinutesFromMidnight(start);
  var numGroups = Math.ceil((totalMin - 1) / (step * timeslots));
  var numSlots = numGroups * timeslots;
  var groups = new Array(numGroups);
  var slots = new Array(numSlots);
  for (var grp = 0; grp < numGroups; grp++) {
    groups[grp] = new Array(timeslots);
    for (var slot = 0; slot < timeslots; slot++) {
      var slotIdx = grp * timeslots + slot;
      var minFromStart = slotIdx * step;
      slots[slotIdx] = groups[grp][slot] = localizer.getSlotDate(start, minutesFromMidnight, minFromStart);
    }
  }
  var lastSlotMinFromStart = slots.length * step;
  slots.push(localizer.getSlotDate(start, minutesFromMidnight, lastSlotMinFromStart));
  function positionFromDate(date2) {
    var diff2 = localizer.diff(start, date2, "minutes") + localizer.getDstOffset(start, date2);
    return Math.min(diff2, totalMin);
  }
  return {
    groups,
    update: function update(args) {
      if (getKey3(args) !== key)
        return getSlotMetrics(args);
      return this;
    },
    dateIsInGroup: function dateIsInGroup(date2, groupIndex) {
      var nextGroup = groups[groupIndex + 1];
      return localizer.inRange(date2, groups[groupIndex][0], nextGroup ? nextGroup[0] : end, "minutes");
    },
    nextSlot: function nextSlot(slot2) {
      var next = slots[Math.min(slots.indexOf(slot2) + 1, slots.length - 1)];
      if (next === slot2)
        next = localizer.add(slot2, step, "minutes");
      return next;
    },
    closestSlotToPosition: function closestSlotToPosition(percent) {
      var slot2 = Math.min(slots.length - 1, Math.max(0, Math.floor(percent * numSlots)));
      return slots[slot2];
    },
    closestSlotFromPoint: function closestSlotFromPoint(point, boundaryRect) {
      var range3 = Math.abs(boundaryRect.top - boundaryRect.bottom);
      return this.closestSlotToPosition((point.y - boundaryRect.top) / range3);
    },
    closestSlotFromDate: function closestSlotFromDate(date2) {
      var offset2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (localizer.lt(date2, start, "minutes"))
        return slots[0];
      if (localizer.gt(date2, end, "minutes"))
        return slots[slots.length - 1];
      var diffMins = localizer.diff(start, date2, "minutes");
      return slots[(diffMins - diffMins % step) / step + offset2];
    },
    startsBeforeDay: function startsBeforeDay(date2) {
      return localizer.lt(date2, start, "day");
    },
    startsAfterDay: function startsAfterDay(date2) {
      return localizer.gt(date2, end, "day");
    },
    startsBefore: function startsBefore(date2) {
      return localizer.lt(localizer.merge(start, date2), start, "minutes");
    },
    startsAfter: function startsAfter(date2) {
      return localizer.gt(localizer.merge(end, date2), end, "minutes");
    },
    getRange: function getRange(rangeStart, rangeEnd, ignoreMin, ignoreMax) {
      if (!ignoreMin)
        rangeStart = localizer.min(end, localizer.max(start, rangeStart));
      if (!ignoreMax)
        rangeEnd = localizer.min(end, localizer.max(start, rangeEnd));
      var rangeStartMin = positionFromDate(rangeStart);
      var rangeEndMin = positionFromDate(rangeEnd);
      var top = rangeEndMin > step * numSlots && !localizer.eq(end, rangeEnd) ? (rangeStartMin - step) / (step * numSlots) * 100 : rangeStartMin / (step * numSlots) * 100;
      return {
        top,
        height: rangeEndMin / (step * numSlots) * 100 - top,
        start: positionFromDate(rangeStart),
        startDate: rangeStart,
        end: positionFromDate(rangeEnd),
        endDate: rangeEnd
      };
    },
    getCurrentTimePosition: function getCurrentTimePosition(rangeStart) {
      var rangeStartMin = positionFromDate(rangeStart);
      var top = rangeStartMin / (step * numSlots) * 100;
      return top;
    }
  };
}
var Event = function() {
  function Event2(data, _ref) {
    var accessors = _ref.accessors, slotMetrics = _ref.slotMetrics;
    _classCallCheck(this, Event2);
    var _slotMetrics$getRange = slotMetrics.getRange(accessors.start(data), accessors.end(data)), start = _slotMetrics$getRange.start, startDate = _slotMetrics$getRange.startDate, end = _slotMetrics$getRange.end, endDate = _slotMetrics$getRange.endDate, top = _slotMetrics$getRange.top, height2 = _slotMetrics$getRange.height;
    this.start = start;
    this.end = end;
    this.startMs = +startDate;
    this.endMs = +endDate;
    this.top = top;
    this.height = height2;
    this.data = data;
  }
  _createClass(Event2, [{
    key: "_width",
    get: function get2() {
      if (this.rows) {
        var columns = this.rows.reduce(
          function(max2, row) {
            return Math.max(max2, row.leaves.length + 1);
          },
          // add itself
          0
        ) + 1;
        return 100 / columns;
      }
      if (this.leaves) {
        var availableWidth = 100 - this.container._width;
        return availableWidth / (this.leaves.length + 1);
      }
      return this.row._width;
    }
    /**
     * The event's calculated width, possibly with extra width added for
     * overlapping effect.
     */
  }, {
    key: "width",
    get: function get2() {
      var noOverlap2 = this._width;
      var overlap = Math.min(100, this._width * 1.7);
      if (this.rows) {
        return overlap;
      }
      if (this.leaves) {
        return this.leaves.length > 0 ? overlap : noOverlap2;
      }
      var leaves = this.row.leaves;
      var index = leaves.indexOf(this);
      return index === leaves.length - 1 ? noOverlap2 : overlap;
    }
  }, {
    key: "xOffset",
    get: function get2() {
      if (this.rows)
        return 0;
      if (this.leaves)
        return this.container._width;
      var _this$row = this.row, leaves = _this$row.leaves, xOffset = _this$row.xOffset, _width = _this$row._width;
      var index = leaves.indexOf(this) + 1;
      return xOffset + index * _width;
    }
  }]);
  return Event2;
}();
function onSameRow(a, b, minimumStartDifference) {
  return (
    // Occupies the same start slot.
    Math.abs(b.start - a.start) < minimumStartDifference || // A's start slot overlaps with b's end slot.
    b.start > a.start && b.start < a.end
  );
}
function sortByRender(events) {
  var sortedByTime = sortBy_default(events, ["startMs", function(e) {
    return -e.endMs;
  }]);
  var sorted = [];
  while (sortedByTime.length > 0) {
    var event = sortedByTime.shift();
    sorted.push(event);
    for (var i = 0; i < sortedByTime.length; i++) {
      var test = sortedByTime[i];
      if (event.endMs > test.startMs)
        continue;
      if (i > 0) {
        var _event = sortedByTime.splice(i, 1)[0];
        sorted.push(_event);
      }
      break;
    }
  }
  return sorted;
}
function getStyledEvents$1(_ref2) {
  var events = _ref2.events, minimumStartDifference = _ref2.minimumStartDifference, slotMetrics = _ref2.slotMetrics, accessors = _ref2.accessors;
  var proxies = events.map(function(event) {
    return new Event(event, {
      slotMetrics,
      accessors
    });
  });
  var eventsInRenderOrder = sortByRender(proxies);
  var containerEvents = [];
  var _loop = function _loop2() {
    var event = eventsInRenderOrder[i];
    var container = containerEvents.find(function(c) {
      return c.end > event.start || Math.abs(event.start - c.start) < minimumStartDifference;
    });
    if (!container) {
      event.rows = [];
      containerEvents.push(event);
      return "continue";
    }
    event.container = container;
    var row = null;
    for (var j = container.rows.length - 1; !row && j >= 0; j--) {
      if (onSameRow(container.rows[j], event, minimumStartDifference)) {
        row = container.rows[j];
      }
    }
    if (row) {
      row.leaves.push(event);
      event.row = row;
    } else {
      event.leaves = [];
      container.rows.push(event);
    }
  };
  for (var i = 0; i < eventsInRenderOrder.length; i++) {
    var _ret = _loop();
    if (_ret === "continue")
      continue;
  }
  return eventsInRenderOrder.map(function(event) {
    return {
      event: event.data,
      style: {
        top: event.top,
        height: event.height,
        width: event.width,
        xOffset: Math.max(0, event.xOffset)
      }
    };
  });
}
function getMaxIdxDFS(node, maxIdx, visited) {
  for (var i = 0; i < node.friends.length; ++i) {
    if (visited.indexOf(node.friends[i]) > -1)
      continue;
    maxIdx = maxIdx > node.friends[i].idx ? maxIdx : node.friends[i].idx;
    visited.push(node.friends[i]);
    var newIdx = getMaxIdxDFS(node.friends[i], maxIdx, visited);
    maxIdx = maxIdx > newIdx ? maxIdx : newIdx;
  }
  return maxIdx;
}
function noOverlap(_ref) {
  var events = _ref.events, minimumStartDifference = _ref.minimumStartDifference, slotMetrics = _ref.slotMetrics, accessors = _ref.accessors;
  var styledEvents = getStyledEvents$1({
    events,
    minimumStartDifference,
    slotMetrics,
    accessors
  });
  styledEvents.sort(function(a, b) {
    a = a.style;
    b = b.style;
    if (a.top !== b.top)
      return a.top > b.top ? 1 : -1;
    else
      return a.top + a.height < b.top + b.height ? 1 : -1;
  });
  for (var i = 0; i < styledEvents.length; ++i) {
    styledEvents[i].friends = [];
    delete styledEvents[i].style.left;
    delete styledEvents[i].style.left;
    delete styledEvents[i].idx;
    delete styledEvents[i].size;
  }
  for (var _i2 = 0; _i2 < styledEvents.length - 1; ++_i2) {
    var se1 = styledEvents[_i2];
    var y1 = se1.style.top;
    var y2 = se1.style.top + se1.style.height;
    for (var j = _i2 + 1; j < styledEvents.length; ++j) {
      var se2 = styledEvents[j];
      var y3 = se2.style.top;
      var y4 = se2.style.top + se2.style.height;
      if (y3 >= y1 && y4 <= y2 || y4 > y1 && y4 <= y2 || y3 >= y1 && y3 < y2) {
        se1.friends.push(se2);
        se2.friends.push(se1);
      }
    }
  }
  for (var _i4 = 0; _i4 < styledEvents.length; ++_i4) {
    var se = styledEvents[_i4];
    var bitmap = [];
    for (var _j2 = 0; _j2 < 100; ++_j2)
      bitmap.push(1);
    for (var _j4 = 0; _j4 < se.friends.length; ++_j4)
      if (se.friends[_j4].idx !== void 0)
        bitmap[se.friends[_j4].idx] = 0;
    se.idx = bitmap.indexOf(1);
  }
  for (var _i6 = 0; _i6 < styledEvents.length; ++_i6) {
    var size2 = 0;
    if (styledEvents[_i6].size)
      continue;
    var allFriends = [];
    var maxIdx = getMaxIdxDFS(styledEvents[_i6], 0, allFriends);
    size2 = 100 / (maxIdx + 1);
    styledEvents[_i6].size = size2;
    for (var _j6 = 0; _j6 < allFriends.length; ++_j6)
      allFriends[_j6].size = size2;
  }
  for (var _i8 = 0; _i8 < styledEvents.length; ++_i8) {
    var e = styledEvents[_i8];
    e.style.left = e.idx * e.size;
    var _maxIdx = 0;
    for (var _j8 = 0; _j8 < e.friends.length; ++_j8) {
      var idx = e.friends[_j8].idx;
      _maxIdx = _maxIdx > idx ? _maxIdx : idx;
    }
    if (_maxIdx <= e.idx)
      e.size = 100 - e.idx * e.size;
    var padding = e.idx === 0 ? 0 : 3;
    e.style.width = "calc(".concat(e.size, "% - ").concat(padding, "px)");
    e.style.height = "calc(".concat(e.style.height, "% - 2px)");
    e.style.xOffset = "calc(".concat(e.style.left, "% + ").concat(padding, "px)");
  }
  return styledEvents;
}
var DefaultAlgorithms = {
  overlap: getStyledEvents$1,
  "no-overlap": noOverlap
};
function isFunction2(a) {
  return !!(a && a.constructor && a.call && a.apply);
}
function getStyledEvents(_ref) {
  _ref.events;
  _ref.minimumStartDifference;
  _ref.slotMetrics;
  _ref.accessors;
  var dayLayoutAlgorithm = _ref.dayLayoutAlgorithm;
  var algorithm = dayLayoutAlgorithm;
  if (dayLayoutAlgorithm in DefaultAlgorithms)
    algorithm = DefaultAlgorithms[dayLayoutAlgorithm];
  if (!isFunction2(algorithm)) {
    return [];
  }
  return algorithm.apply(this, arguments);
}
var TimeSlotGroup = function(_Component) {
  _inherits(TimeSlotGroup2, _Component);
  var _super = _createSuper(TimeSlotGroup2);
  function TimeSlotGroup2() {
    _classCallCheck(this, TimeSlotGroup2);
    return _super.apply(this, arguments);
  }
  _createClass(TimeSlotGroup2, [{
    key: "render",
    value: function render() {
      var _this$props = this.props, renderSlot = _this$props.renderSlot, resource = _this$props.resource, group = _this$props.group, getters = _this$props.getters, _this$props$component = _this$props.components, _this$props$component2 = _this$props$component === void 0 ? {} : _this$props$component, _this$props$component3 = _this$props$component2.timeSlotWrapper, Wrapper = _this$props$component3 === void 0 ? NoopWrapper : _this$props$component3;
      var groupProps = getters ? getters.slotGroupProp(group) : {};
      return import_react25.default.createElement("div", Object.assign({
        className: "rbc-timeslot-group"
      }, groupProps), group.map(function(value, idx) {
        var slotProps = getters ? getters.slotProp(value, resource) : {};
        return import_react25.default.createElement(Wrapper, {
          key: idx,
          value,
          resource
        }, import_react25.default.createElement("div", Object.assign({}, slotProps, {
          className: clsx_m_default("rbc-time-slot", slotProps.className)
        }), renderSlot && renderSlot(value, idx)));
      }));
    }
  }]);
  return TimeSlotGroup2;
}(import_react25.Component);
function stringifyPercent(v) {
  return typeof v === "string" ? v : v + "%";
}
function TimeGridEvent(props) {
  var style2 = props.style, className = props.className, event = props.event, accessors = props.accessors, rtl = props.rtl, selected = props.selected, label = props.label, continuesPrior2 = props.continuesPrior, continuesAfter2 = props.continuesAfter, getters = props.getters, onClick = props.onClick, onDoubleClick = props.onDoubleClick, isBackgroundEvent = props.isBackgroundEvent, onKeyPress = props.onKeyPress, _props$components = props.components, Event2 = _props$components.event, EventWrapper = _props$components.eventWrapper;
  var title = accessors.title(event);
  var tooltip = accessors.tooltip(event);
  var end = accessors.end(event);
  var start = accessors.start(event);
  var userProps = getters.eventProp(event, start, end, selected);
  var height2 = style2.height, top = style2.top, width = style2.width, xOffset = style2.xOffset;
  var inner = [import_react25.default.createElement("div", {
    key: "1",
    className: "rbc-event-label"
  }, label), import_react25.default.createElement("div", {
    key: "2",
    className: "rbc-event-content"
  }, Event2 ? import_react25.default.createElement(Event2, {
    event,
    title
  }) : title)];
  var eventStyle = isBackgroundEvent ? _objectSpread2(_objectSpread2({}, userProps.style), {}, _defineProperty({
    top: stringifyPercent(top),
    height: stringifyPercent(height2),
    // Adding 10px to take events container right margin into account
    width: "calc(".concat(width, " + 10px)")
  }, rtl ? "right" : "left", stringifyPercent(Math.max(0, xOffset)))) : _objectSpread2(_objectSpread2({}, userProps.style), {}, _defineProperty({
    top: stringifyPercent(top),
    width: stringifyPercent(width),
    height: stringifyPercent(height2)
  }, rtl ? "right" : "left", stringifyPercent(xOffset)));
  return import_react25.default.createElement(EventWrapper, Object.assign({
    type: "time"
  }, props), import_react25.default.createElement("div", {
    onClick,
    onDoubleClick,
    style: eventStyle,
    onKeyPress,
    title: tooltip ? (typeof label === "string" ? label + ": " : "") + tooltip : void 0,
    className: clsx_m_default(isBackgroundEvent ? "rbc-background-event" : "rbc-event", className, userProps.className, {
      "rbc-selected": selected,
      "rbc-event-continues-earlier": continuesPrior2,
      "rbc-event-continues-later": continuesAfter2
    })
  }, inner));
}
var DayColumnWrapper = function DayColumnWrapper2(_ref) {
  var children = _ref.children, className = _ref.className, style2 = _ref.style, innerRef = _ref.innerRef;
  return import_react25.default.createElement("div", {
    className,
    style: style2,
    ref: innerRef
  }, children);
};
var DayColumnWrapper$1 = import_react25.default.forwardRef(function(props, ref) {
  return import_react25.default.createElement(DayColumnWrapper, Object.assign({}, props, {
    innerRef: ref
  }));
});
var _excluded$5 = ["dayProp"];
var _excluded2$1 = ["eventContainerWrapper"];
var DayColumn = function(_React$Component) {
  _inherits(DayColumn2, _React$Component);
  var _super = _createSuper(DayColumn2);
  function DayColumn2() {
    var _this;
    _classCallCheck(this, DayColumn2);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(_args));
    _this.state = {
      selecting: false,
      timeIndicatorPosition: null
    };
    _this.intervalTriggered = false;
    _this.renderEvents = function(_ref) {
      var events = _ref.events, isBackgroundEvent = _ref.isBackgroundEvent;
      var _this$props = _this.props, rtl = _this$props.rtl, selected = _this$props.selected, accessors = _this$props.accessors, localizer = _this$props.localizer, getters = _this$props.getters, components2 = _this$props.components, step = _this$props.step, timeslots = _this$props.timeslots, dayLayoutAlgorithm = _this$props.dayLayoutAlgorithm, resizable = _this$props.resizable;
      var _assertThisInitialize = _assertThisInitialized(_this), slotMetrics = _assertThisInitialize.slotMetrics;
      var messages2 = localizer.messages;
      var styledEvents = getStyledEvents({
        events,
        accessors,
        slotMetrics,
        minimumStartDifference: Math.ceil(step * timeslots / 2),
        dayLayoutAlgorithm
      });
      return styledEvents.map(function(_ref2, idx) {
        var event = _ref2.event, style2 = _ref2.style;
        var end = accessors.end(event);
        var start = accessors.start(event);
        var format = "eventTimeRangeFormat";
        var label;
        var startsBeforeDay = slotMetrics.startsBeforeDay(start);
        var startsAfterDay = slotMetrics.startsAfterDay(end);
        if (startsBeforeDay)
          format = "eventTimeRangeEndFormat";
        else if (startsAfterDay)
          format = "eventTimeRangeStartFormat";
        if (startsBeforeDay && startsAfterDay)
          label = messages2.allDay;
        else
          label = localizer.format({
            start,
            end
          }, format);
        var continuesPrior2 = startsBeforeDay || slotMetrics.startsBefore(start);
        var continuesAfter2 = startsAfterDay || slotMetrics.startsAfter(end);
        return import_react25.default.createElement(TimeGridEvent, {
          style: style2,
          event,
          label,
          key: "evt_" + idx,
          getters,
          rtl,
          components: components2,
          continuesPrior: continuesPrior2,
          continuesAfter: continuesAfter2,
          accessors,
          resource: _this.props.resource,
          selected: isSelected(event, selected),
          onClick: function onClick(e) {
            return _this._select(_objectSpread2(_objectSpread2({}, event), {}, {
              sourceResource: _this.props.resource
            }), e);
          },
          onDoubleClick: function onDoubleClick(e) {
            return _this._doubleClick(event, e);
          },
          isBackgroundEvent,
          onKeyPress: function onKeyPress(e) {
            return _this._keyPress(event, e);
          },
          resizable
        });
      });
    };
    _this._selectable = function() {
      var node = _this.containerRef.current;
      var _this$props2 = _this.props, longPressThreshold = _this$props2.longPressThreshold, localizer = _this$props2.localizer;
      var selector = _this._selector = new Selection(function() {
        return node;
      }, {
        longPressThreshold
      });
      var maybeSelect = function maybeSelect2(box) {
        var onSelecting = _this.props.onSelecting;
        var current = _this.state || {};
        var state = selectionState(box);
        var start = state.startDate, end = state.endDate;
        if (onSelecting) {
          if (localizer.eq(current.startDate, start, "minutes") && localizer.eq(current.endDate, end, "minutes") || onSelecting({
            start,
            end,
            resourceId: _this.props.resource
          }) === false)
            return;
        }
        if (_this.state.start !== state.start || _this.state.end !== state.end || _this.state.selecting !== state.selecting) {
          _this.setState(state);
        }
      };
      var selectionState = function selectionState2(point) {
        var currentSlot = _this.slotMetrics.closestSlotFromPoint(point, getBoundsForNode(node));
        if (!_this.state.selecting) {
          _this._initialSlot = currentSlot;
        }
        var initialSlot = _this._initialSlot;
        if (localizer.lte(initialSlot, currentSlot)) {
          currentSlot = _this.slotMetrics.nextSlot(currentSlot);
        } else if (localizer.gt(initialSlot, currentSlot)) {
          initialSlot = _this.slotMetrics.nextSlot(initialSlot);
        }
        var selectRange = _this.slotMetrics.getRange(localizer.min(initialSlot, currentSlot), localizer.max(initialSlot, currentSlot));
        return _objectSpread2(_objectSpread2({}, selectRange), {}, {
          selecting: true,
          top: "".concat(selectRange.top, "%"),
          height: "".concat(selectRange.height, "%")
        });
      };
      var selectorClicksHandler = function selectorClicksHandler2(box, actionType) {
        if (!isEvent(_this.containerRef.current, box)) {
          var _selectionState = selectionState(box), startDate = _selectionState.startDate, endDate = _selectionState.endDate;
          _this._selectSlot({
            startDate,
            endDate,
            action: actionType,
            box
          });
        }
        _this.setState({
          selecting: false
        });
      };
      selector.on("selecting", maybeSelect);
      selector.on("selectStart", maybeSelect);
      selector.on("beforeSelect", function(box) {
        if (_this.props.selectable !== "ignoreEvents")
          return;
        return !isEvent(_this.containerRef.current, box);
      });
      selector.on("click", function(box) {
        return selectorClicksHandler(box, "click");
      });
      selector.on("doubleClick", function(box) {
        return selectorClicksHandler(box, "doubleClick");
      });
      selector.on("select", function(bounds) {
        if (_this.state.selecting) {
          _this._selectSlot(_objectSpread2(_objectSpread2({}, _this.state), {}, {
            action: "select",
            bounds
          }));
          _this.setState({
            selecting: false
          });
        }
      });
      selector.on("reset", function() {
        if (_this.state.selecting) {
          _this.setState({
            selecting: false
          });
        }
      });
    };
    _this._teardownSelectable = function() {
      if (!_this._selector)
        return;
      _this._selector.teardown();
      _this._selector = null;
    };
    _this._selectSlot = function(_ref3) {
      var startDate = _ref3.startDate, endDate = _ref3.endDate, action = _ref3.action, bounds = _ref3.bounds, box = _ref3.box;
      var current = startDate, slots = [];
      while (_this.props.localizer.lte(current, endDate)) {
        slots.push(current);
        current = new Date(+current + _this.props.step * 60 * 1e3);
      }
      notify(_this.props.onSelectSlot, {
        slots,
        start: startDate,
        end: endDate,
        resourceId: _this.props.resource,
        action,
        bounds,
        box
      });
    };
    _this._select = function() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      notify(_this.props.onSelectEvent, args);
    };
    _this._doubleClick = function() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      notify(_this.props.onDoubleClickEvent, args);
    };
    _this._keyPress = function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      notify(_this.props.onKeyPressEvent, args);
    };
    _this.slotMetrics = getSlotMetrics(_this.props);
    _this.containerRef = (0, import_react25.createRef)();
    return _this;
  }
  _createClass(DayColumn2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.selectable && this._selectable();
      if (this.props.isNow) {
        this.setTimeIndicatorPositionUpdateInterval();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._teardownSelectable();
      this.clearTimeIndicatorInterval();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.selectable && !this.props.selectable)
        this._selectable();
      if (!nextProps.selectable && this.props.selectable)
        this._teardownSelectable();
      this.slotMetrics = this.slotMetrics.update(nextProps);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props3 = this.props, getNow2 = _this$props3.getNow, isNow = _this$props3.isNow, localizer = _this$props3.localizer, date2 = _this$props3.date, min2 = _this$props3.min, max2 = _this$props3.max;
      var getNowChanged = localizer.neq(prevProps.getNow(), getNow2(), "minutes");
      if (prevProps.isNow !== isNow || getNowChanged) {
        this.clearTimeIndicatorInterval();
        if (isNow) {
          var tail = !getNowChanged && localizer.eq(prevProps.date, date2, "minutes") && prevState.timeIndicatorPosition === this.state.timeIndicatorPosition;
          this.setTimeIndicatorPositionUpdateInterval(tail);
        }
      } else if (isNow && (localizer.neq(prevProps.min, min2, "minutes") || localizer.neq(prevProps.max, max2, "minutes"))) {
        this.positionTimeIndicator();
      }
    }
    /**
     * @param tail {Boolean} - whether `positionTimeIndicator` call should be
     *   deferred or called upon setting interval (`true` - if deferred);
     */
  }, {
    key: "setTimeIndicatorPositionUpdateInterval",
    value: function setTimeIndicatorPositionUpdateInterval() {
      var _this2 = this;
      var tail = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      if (!this.intervalTriggered && !tail) {
        this.positionTimeIndicator();
      }
      this._timeIndicatorTimeout = window.setTimeout(function() {
        _this2.intervalTriggered = true;
        _this2.positionTimeIndicator();
        _this2.setTimeIndicatorPositionUpdateInterval();
      }, 6e4);
    }
  }, {
    key: "clearTimeIndicatorInterval",
    value: function clearTimeIndicatorInterval() {
      this.intervalTriggered = false;
      window.clearTimeout(this._timeIndicatorTimeout);
    }
  }, {
    key: "positionTimeIndicator",
    value: function positionTimeIndicator() {
      var _this$props4 = this.props, min2 = _this$props4.min, max2 = _this$props4.max, getNow2 = _this$props4.getNow;
      var current = getNow2();
      if (current >= min2 && current <= max2) {
        var top = this.slotMetrics.getCurrentTimePosition(current);
        this.intervalTriggered = true;
        this.setState({
          timeIndicatorPosition: top
        });
      } else {
        this.clearTimeIndicatorInterval();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props, date2 = _this$props5.date, max2 = _this$props5.max, rtl = _this$props5.rtl, isNow = _this$props5.isNow, resource = _this$props5.resource, accessors = _this$props5.accessors, localizer = _this$props5.localizer, _this$props5$getters = _this$props5.getters, dayProp = _this$props5$getters.dayProp, getters = _objectWithoutProperties(_this$props5$getters, _excluded$5), _this$props5$componen = _this$props5.components, EventContainer = _this$props5$componen.eventContainerWrapper, components2 = _objectWithoutProperties(_this$props5$componen, _excluded2$1);
      var slotMetrics = this.slotMetrics;
      var _this$state = this.state, selecting = _this$state.selecting, top = _this$state.top, height2 = _this$state.height, startDate = _this$state.startDate, endDate = _this$state.endDate;
      var selectDates = {
        start: startDate,
        end: endDate
      };
      var _dayProp = dayProp(max2), className = _dayProp.className, style2 = _dayProp.style;
      var DayColumnWrapperComponent = components2.dayColumnWrapper || DayColumnWrapper$1;
      return import_react25.default.createElement(DayColumnWrapperComponent, {
        ref: this.containerRef,
        date: date2,
        style: style2,
        className: clsx_m_default(
          className,
          "rbc-day-slot",
          "rbc-time-column",
          isNow && "rbc-now",
          isNow && "rbc-today",
          // WHY
          selecting && "rbc-slot-selecting"
        ),
        slotMetrics
      }, slotMetrics.groups.map(function(grp, idx) {
        return import_react25.default.createElement(TimeSlotGroup, {
          key: idx,
          group: grp,
          resource,
          getters,
          components: components2
        });
      }), import_react25.default.createElement(EventContainer, {
        localizer,
        resource,
        accessors,
        getters,
        components: components2,
        slotMetrics
      }, import_react25.default.createElement("div", {
        className: clsx_m_default("rbc-events-container", rtl && "rtl")
      }, this.renderEvents({
        events: this.props.backgroundEvents,
        isBackgroundEvent: true
      }), this.renderEvents({
        events: this.props.events
      }))), selecting && import_react25.default.createElement("div", {
        className: "rbc-slot-selection",
        style: {
          top,
          height: height2
        }
      }, import_react25.default.createElement("span", null, localizer.format(selectDates, "selectRangeFormat"))), isNow && this.intervalTriggered && import_react25.default.createElement("div", {
        className: "rbc-current-time-indicator",
        style: {
          top: "".concat(this.state.timeIndicatorPosition, "%")
        }
      }));
    }
  }]);
  return DayColumn2;
}(import_react25.default.Component);
DayColumn.defaultProps = {
  dragThroughEvents: true,
  timeslots: 2
};
function adjustForDST(_ref) {
  var min2 = _ref.min, max2 = _ref.max, localizer = _ref.localizer;
  if (localizer.getTimezoneOffset(min2) !== localizer.getTimezoneOffset(max2)) {
    return {
      start: localizer.add(min2, -1, "day"),
      end: localizer.add(max2, -1, "day")
    };
  }
  return {
    start: min2,
    end: max2
  };
}
var TimeGutter = function TimeGutter2(_ref2) {
  var min2 = _ref2.min, max2 = _ref2.max, timeslots = _ref2.timeslots, step = _ref2.step, localizer = _ref2.localizer, getNow2 = _ref2.getNow, resource = _ref2.resource, components2 = _ref2.components, getters = _ref2.getters, gutterRef = _ref2.gutterRef;
  var TimeGutterWrapper = components2.timeGutterWrapper;
  var _useMemo = (0, import_react25.useMemo)(
    function() {
      return adjustForDST({
        min: min2,
        max: max2,
        localizer
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [min2 === null || min2 === void 0 ? void 0 : min2.toISOString(), max2 === null || max2 === void 0 ? void 0 : max2.toISOString(), localizer]
  ), start = _useMemo.start, end = _useMemo.end;
  var _useState = (0, import_react25.useState)(getSlotMetrics({
    min: start,
    max: end,
    timeslots,
    step,
    localizer
  })), _useState2 = _slicedToArray(_useState, 2), slotMetrics = _useState2[0], setSlotMetrics = _useState2[1];
  (0, import_react25.useEffect)(function() {
    if (slotMetrics) {
      setSlotMetrics(slotMetrics.update({
        min: start,
        max: end,
        timeslots,
        step,
        localizer
      }));
    }
  }, [start === null || start === void 0 ? void 0 : start.toISOString(), end === null || end === void 0 ? void 0 : end.toISOString(), timeslots, step]);
  var renderSlot = (0, import_react25.useCallback)(function(value, idx) {
    if (idx)
      return null;
    var isNow = slotMetrics.dateIsInGroup(getNow2(), idx);
    return import_react25.default.createElement("span", {
      className: clsx_m_default("rbc-label", isNow && "rbc-now")
    }, localizer.format(value, "timeGutterFormat"));
  }, [slotMetrics, localizer, getNow2]);
  return import_react25.default.createElement(TimeGutterWrapper, {
    slotMetrics
  }, import_react25.default.createElement("div", {
    className: "rbc-time-gutter rbc-time-column",
    ref: gutterRef
  }, slotMetrics.groups.map(function(grp, idx) {
    return import_react25.default.createElement(TimeSlotGroup, {
      key: idx,
      group: grp,
      resource,
      components: components2,
      renderSlot,
      getters
    });
  })));
};
var TimeGutter$1 = import_react25.default.forwardRef(function(props, ref) {
  return import_react25.default.createElement(TimeGutter, Object.assign({
    gutterRef: ref
  }, props));
});
var ResourceHeader = function ResourceHeader2(_ref) {
  var label = _ref.label;
  return import_react25.default.createElement(import_react25.default.Fragment, null, label);
};
var TimeGridHeader = function(_React$Component) {
  _inherits(TimeGridHeader2, _React$Component);
  var _super = _createSuper(TimeGridHeader2);
  function TimeGridHeader2() {
    var _this;
    _classCallCheck(this, TimeGridHeader2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.handleHeaderClick = function(date2, view, e) {
      e.preventDefault();
      notify(_this.props.onDrillDown, [date2, view]);
    };
    _this.renderRow = function(resource) {
      var _this$props = _this.props, events = _this$props.events, rtl = _this$props.rtl, selectable = _this$props.selectable, getNow2 = _this$props.getNow, range3 = _this$props.range, getters = _this$props.getters, localizer = _this$props.localizer, accessors = _this$props.accessors, components2 = _this$props.components, resizable = _this$props.resizable;
      var resourceId = accessors.resourceId(resource);
      var eventsToDisplay = resource ? events.filter(function(event) {
        return accessors.resource(event) === resourceId;
      }) : events;
      return import_react25.default.createElement(DateContentRow, {
        isAllDay: true,
        rtl,
        getNow: getNow2,
        minRows: 2,
        maxRows: _this.props.allDayMaxRows + 1,
        range: range3,
        events: eventsToDisplay,
        resourceId,
        className: "rbc-allday-cell",
        selectable,
        selected: _this.props.selected,
        components: components2,
        accessors,
        getters,
        localizer,
        onSelect: _this.props.onSelectEvent,
        onShowMore: _this.props.onShowMore,
        onDoubleClick: _this.props.onDoubleClickEvent,
        onKeyPress: _this.props.onKeyPressEvent,
        onSelectSlot: _this.props.onSelectSlot,
        longPressThreshold: _this.props.longPressThreshold,
        resizable
      });
    };
    return _this;
  }
  _createClass(TimeGridHeader2, [{
    key: "renderHeaderCells",
    value: function renderHeaderCells(range3) {
      var _this2 = this;
      var _this$props2 = this.props, localizer = _this$props2.localizer, getDrilldownView = _this$props2.getDrilldownView, getNow2 = _this$props2.getNow, dayProp = _this$props2.getters.dayProp, _this$props2$componen = _this$props2.components.header, HeaderComponent = _this$props2$componen === void 0 ? Header : _this$props2$componen;
      var today = getNow2();
      return range3.map(function(date2, i) {
        var drilldownView = getDrilldownView(date2);
        var label = localizer.format(date2, "dayFormat");
        var _dayProp = dayProp(date2), className = _dayProp.className, style2 = _dayProp.style;
        var header = import_react25.default.createElement(HeaderComponent, {
          date: date2,
          label,
          localizer
        });
        return import_react25.default.createElement("div", {
          key: i,
          style: style2,
          className: clsx_m_default("rbc-header", className, localizer.isSameDate(date2, today) && "rbc-today")
        }, drilldownView ? import_react25.default.createElement("button", {
          type: "button",
          className: "rbc-button-link",
          onClick: function onClick(e) {
            return _this2.handleHeaderClick(date2, drilldownView, e);
          }
        }, header) : import_react25.default.createElement("span", null, header));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props3 = this.props, width = _this$props3.width, rtl = _this$props3.rtl, resources = _this$props3.resources, range3 = _this$props3.range, events = _this$props3.events, getNow2 = _this$props3.getNow, accessors = _this$props3.accessors, selectable = _this$props3.selectable, components2 = _this$props3.components, getters = _this$props3.getters, scrollRef = _this$props3.scrollRef, localizer = _this$props3.localizer, isOverflowing2 = _this$props3.isOverflowing, _this$props3$componen = _this$props3.components, TimeGutterHeader = _this$props3$componen.timeGutterHeader, _this$props3$componen2 = _this$props3$componen.resourceHeader, ResourceHeaderComponent = _this$props3$componen2 === void 0 ? ResourceHeader : _this$props3$componen2, resizable = _this$props3.resizable;
      var style2 = {};
      if (isOverflowing2) {
        style2[rtl ? "marginLeft" : "marginRight"] = "".concat(scrollbarSize() - 1, "px");
      }
      var groupedEvents = resources.groupEvents(events);
      return import_react25.default.createElement("div", {
        style: style2,
        ref: scrollRef,
        className: clsx_m_default("rbc-time-header", isOverflowing2 && "rbc-overflowing")
      }, import_react25.default.createElement("div", {
        className: "rbc-label rbc-time-header-gutter",
        style: {
          width,
          minWidth: width,
          maxWidth: width
        }
      }, TimeGutterHeader && import_react25.default.createElement(TimeGutterHeader, null)), resources.map(function(_ref, idx) {
        var _ref2 = _slicedToArray(_ref, 2), id = _ref2[0], resource = _ref2[1];
        return import_react25.default.createElement("div", {
          className: "rbc-time-header-content",
          key: id || idx
        }, resource && import_react25.default.createElement("div", {
          className: "rbc-row rbc-row-resource",
          key: "resource_".concat(idx)
        }, import_react25.default.createElement("div", {
          className: "rbc-header"
        }, import_react25.default.createElement(ResourceHeaderComponent, {
          index: idx,
          label: accessors.resourceTitle(resource),
          resource
        }))), import_react25.default.createElement("div", {
          className: "rbc-row rbc-time-header-cell".concat(range3.length <= 1 ? " rbc-time-header-cell-single-day" : "")
        }, _this3.renderHeaderCells(range3)), import_react25.default.createElement(DateContentRow, {
          isAllDay: true,
          rtl,
          getNow: getNow2,
          minRows: 2,
          maxRows: _this3.props.allDayMaxRows + 1,
          range: range3,
          events: groupedEvents.get(id) || [],
          resourceId: resource && id,
          className: "rbc-allday-cell",
          selectable,
          selected: _this3.props.selected,
          components: components2,
          accessors,
          getters,
          localizer,
          onSelect: _this3.props.onSelectEvent,
          onShowMore: _this3.props.onShowMore,
          onDoubleClick: _this3.props.onDoubleClickEvent,
          onKeyPress: _this3.props.onKeyPressEvent,
          onSelectSlot: _this3.props.onSelectSlot,
          longPressThreshold: _this3.props.longPressThreshold,
          resizable
        }));
      }));
    }
  }]);
  return TimeGridHeader2;
}(import_react25.default.Component);
var NONE = {};
function Resources(resources, accessors) {
  return {
    map: function map(fn2) {
      if (!resources)
        return [fn2([NONE, null], 0)];
      return resources.map(function(resource, idx) {
        return fn2([accessors.resourceId(resource), resource], idx);
      });
    },
    groupEvents: function groupEvents(events) {
      var eventsByResource = /* @__PURE__ */ new Map();
      if (!resources) {
        eventsByResource.set(NONE, events);
        return eventsByResource;
      }
      events.forEach(function(event) {
        var id = accessors.resource(event) || NONE;
        if (Array.isArray(id)) {
          id.forEach(function(item) {
            var resourceEvents2 = eventsByResource.get(item) || [];
            resourceEvents2.push(event);
            eventsByResource.set(item, resourceEvents2);
          });
        } else {
          var resourceEvents = eventsByResource.get(id) || [];
          resourceEvents.push(event);
          eventsByResource.set(id, resourceEvents);
        }
      });
      return eventsByResource;
    }
  };
}
var TimeGrid = function(_Component) {
  _inherits(TimeGrid2, _Component);
  var _super = _createSuper(TimeGrid2);
  function TimeGrid2(props) {
    var _this;
    _classCallCheck(this, TimeGrid2);
    _this = _super.call(this, props);
    _this.handleScroll = function(e) {
      if (_this.scrollRef.current) {
        _this.scrollRef.current.scrollLeft = e.target.scrollLeft;
      }
    };
    _this.handleResize = function() {
      cancel(_this.rafHandle);
      _this.rafHandle = request(_this.checkOverflow);
    };
    _this.handleKeyPressEvent = function() {
      _this.clearSelection();
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      notify(_this.props.onKeyPressEvent, args);
    };
    _this.handleSelectEvent = function() {
      _this.clearSelection();
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      notify(_this.props.onSelectEvent, args);
    };
    _this.handleDoubleClickEvent = function() {
      _this.clearSelection();
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      notify(_this.props.onDoubleClickEvent, args);
    };
    _this.handleShowMore = function(events, date2, cell, slot, target) {
      var _this$props = _this.props, popup = _this$props.popup, onDrillDown = _this$props.onDrillDown, onShowMore = _this$props.onShowMore, getDrilldownView = _this$props.getDrilldownView, doShowMoreDrillDown = _this$props.doShowMoreDrillDown;
      _this.clearSelection();
      if (popup) {
        var position2 = position(cell, _this.containerRef.current);
        _this.setState({
          overlay: {
            date: date2,
            events,
            position: _objectSpread2(_objectSpread2({}, position2), {}, {
              width: "200px"
            }),
            target
          }
        });
      } else if (doShowMoreDrillDown) {
        notify(onDrillDown, [date2, getDrilldownView(date2) || views.DAY]);
      }
      notify(onShowMore, [events, date2, slot]);
    };
    _this.handleSelectAllDaySlot = function(slots, slotInfo) {
      var onSelectSlot = _this.props.onSelectSlot;
      var start = new Date(slots[0]);
      var end = new Date(slots[slots.length - 1]);
      end.setDate(slots[slots.length - 1].getDate() + 1);
      notify(onSelectSlot, {
        slots,
        start,
        end,
        action: slotInfo.action,
        resourceId: slotInfo.resourceId
      });
    };
    _this.overlayDisplay = function() {
      _this.setState({
        overlay: null
      });
    };
    _this.checkOverflow = function() {
      if (_this._updatingOverflow)
        return;
      var content = _this.contentRef.current;
      var isOverflowing2 = content.scrollHeight > content.clientHeight;
      if (_this.state.isOverflowing !== isOverflowing2) {
        _this._updatingOverflow = true;
        _this.setState({
          isOverflowing: isOverflowing2
        }, function() {
          _this._updatingOverflow = false;
        });
      }
    };
    _this.memoizedResources = memoizeOne(function(resources, accessors) {
      return Resources(resources, accessors);
    });
    _this.state = {
      gutterWidth: void 0,
      isOverflowing: null
    };
    _this.scrollRef = import_react25.default.createRef();
    _this.contentRef = import_react25.default.createRef();
    _this.containerRef = import_react25.default.createRef();
    _this._scrollRatio = null;
    _this.gutterRef = (0, import_react25.createRef)();
    return _this;
  }
  _createClass(TimeGrid2, [{
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate() {
      this.checkOverflow();
      return null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.width == null) {
        this.measureGutter();
      }
      this.calculateScroll();
      this.applyScroll();
      window.addEventListener("resize", this.handleResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
      cancel(this.rafHandle);
      if (this.measureGutterAnimationFrameRequest) {
        window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.applyScroll();
    }
  }, {
    key: "renderEvents",
    value: function renderEvents(range3, events, backgroundEvents, now) {
      var _this2 = this;
      var _this$props2 = this.props, min2 = _this$props2.min, max2 = _this$props2.max, components2 = _this$props2.components, accessors = _this$props2.accessors, localizer = _this$props2.localizer, dayLayoutAlgorithm = _this$props2.dayLayoutAlgorithm;
      var resources = this.memoizedResources(this.props.resources, accessors);
      var groupedEvents = resources.groupEvents(events);
      var groupedBackgroundEvents = resources.groupEvents(backgroundEvents);
      return resources.map(function(_ref, i) {
        var _ref2 = _slicedToArray(_ref, 2), id = _ref2[0], resource = _ref2[1];
        return range3.map(function(date2, jj) {
          var daysEvents = (groupedEvents.get(id) || []).filter(function(event) {
            return localizer.inRange(date2, accessors.start(event), accessors.end(event), "day");
          });
          var daysBackgroundEvents = (groupedBackgroundEvents.get(id) || []).filter(function(event) {
            return localizer.inRange(date2, accessors.start(event), accessors.end(event), "day");
          });
          return import_react25.default.createElement(DayColumn, Object.assign({}, _this2.props, {
            localizer,
            min: localizer.merge(date2, min2),
            max: localizer.merge(date2, max2),
            resource: resource && id,
            components: components2,
            isNow: localizer.isSameDate(date2, now),
            key: i + "-" + jj,
            date: date2,
            events: daysEvents,
            backgroundEvents: daysBackgroundEvents,
            dayLayoutAlgorithm
          }));
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$allDayMax;
      var _this$props3 = this.props, events = _this$props3.events, backgroundEvents = _this$props3.backgroundEvents, range3 = _this$props3.range, width = _this$props3.width, rtl = _this$props3.rtl, selected = _this$props3.selected, getNow2 = _this$props3.getNow, resources = _this$props3.resources, components2 = _this$props3.components, accessors = _this$props3.accessors, getters = _this$props3.getters, localizer = _this$props3.localizer, min2 = _this$props3.min, max2 = _this$props3.max, showMultiDayTimes = _this$props3.showMultiDayTimes, longPressThreshold = _this$props3.longPressThreshold, resizable = _this$props3.resizable;
      width = width || this.state.gutterWidth;
      var start = range3[0], end = range3[range3.length - 1];
      this.slots = range3.length;
      var allDayEvents = [], rangeEvents = [], rangeBackgroundEvents = [];
      events.forEach(function(event) {
        if (inRange2(event, start, end, accessors, localizer)) {
          var eStart = accessors.start(event), eEnd = accessors.end(event);
          if (accessors.allDay(event) || localizer.startAndEndAreDateOnly(eStart, eEnd) || !showMultiDayTimes && !localizer.isSameDate(eStart, eEnd)) {
            allDayEvents.push(event);
          } else {
            rangeEvents.push(event);
          }
        }
      });
      backgroundEvents.forEach(function(event) {
        if (inRange2(event, start, end, accessors, localizer)) {
          rangeBackgroundEvents.push(event);
        }
      });
      allDayEvents.sort(function(a, b) {
        return sortEvents(a, b, accessors, localizer);
      });
      return import_react25.default.createElement("div", {
        className: clsx_m_default("rbc-time-view", resources && "rbc-time-view-resources"),
        ref: this.containerRef
      }, import_react25.default.createElement(TimeGridHeader, {
        range: range3,
        events: allDayEvents,
        width,
        rtl,
        getNow: getNow2,
        localizer,
        selected,
        allDayMaxRows: this.props.showAllEvents ? Infinity : (_this$props$allDayMax = this.props.allDayMaxRows) !== null && _this$props$allDayMax !== void 0 ? _this$props$allDayMax : Infinity,
        resources: this.memoizedResources(resources, accessors),
        selectable: this.props.selectable,
        accessors,
        getters,
        components: components2,
        scrollRef: this.scrollRef,
        isOverflowing: this.state.isOverflowing,
        longPressThreshold,
        onSelectSlot: this.handleSelectAllDaySlot,
        onSelectEvent: this.handleSelectEvent,
        onShowMore: this.handleShowMore,
        onDoubleClickEvent: this.props.onDoubleClickEvent,
        onKeyPressEvent: this.props.onKeyPressEvent,
        onDrillDown: this.props.onDrillDown,
        getDrilldownView: this.props.getDrilldownView,
        resizable
      }), this.props.popup && this.renderOverlay(), import_react25.default.createElement("div", {
        ref: this.contentRef,
        className: "rbc-time-content",
        onScroll: this.handleScroll
      }, import_react25.default.createElement(TimeGutter$1, {
        date: start,
        ref: this.gutterRef,
        localizer,
        min: localizer.merge(start, min2),
        max: localizer.merge(start, max2),
        step: this.props.step,
        getNow: this.props.getNow,
        timeslots: this.props.timeslots,
        components: components2,
        className: "rbc-time-gutter",
        getters
      }), this.renderEvents(range3, rangeEvents, rangeBackgroundEvents, getNow2())));
    }
  }, {
    key: "renderOverlay",
    value: function renderOverlay() {
      var _this$state$overlay, _this$state, _this3 = this;
      var overlay = (_this$state$overlay = (_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.overlay) !== null && _this$state$overlay !== void 0 ? _this$state$overlay : {};
      var _this$props4 = this.props, accessors = _this$props4.accessors, localizer = _this$props4.localizer, components2 = _this$props4.components, getters = _this$props4.getters, selected = _this$props4.selected, popupOffset = _this$props4.popupOffset, handleDragStart = _this$props4.handleDragStart;
      var onHide2 = function onHide3() {
        return _this3.setState({
          overlay: null
        });
      };
      return import_react25.default.createElement(PopOverlay, {
        overlay,
        accessors,
        localizer,
        components: components2,
        getters,
        selected,
        popupOffset,
        ref: this.containerRef,
        handleKeyPressEvent: this.handleKeyPressEvent,
        handleSelectEvent: this.handleSelectEvent,
        handleDoubleClickEvent: this.handleDoubleClickEvent,
        handleDragStart,
        show: !!overlay.position,
        overlayDisplay: this.overlayDisplay,
        onHide: onHide2
      });
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      clearTimeout(this._selectTimer);
      this._pendingSelection = [];
    }
  }, {
    key: "measureGutter",
    value: function measureGutter() {
      var _this4 = this;
      if (this.measureGutterAnimationFrameRequest) {
        window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
      }
      this.measureGutterAnimationFrameRequest = window.requestAnimationFrame(function() {
        var _this4$gutterRef;
        var width = (_this4$gutterRef = _this4.gutterRef) !== null && _this4$gutterRef !== void 0 && _this4$gutterRef.current ? getWidth(_this4.gutterRef.current) : void 0;
        if (width && _this4.state.gutterWidth !== width) {
          _this4.setState({
            gutterWidth: width
          });
        }
      });
    }
  }, {
    key: "applyScroll",
    value: function applyScroll() {
      if (this._scrollRatio != null && this.props.enableAutoScroll === true) {
        var content = this.contentRef.current;
        content.scrollTop = content.scrollHeight * this._scrollRatio;
        this._scrollRatio = null;
      }
    }
  }, {
    key: "calculateScroll",
    value: function calculateScroll() {
      var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.props;
      var min2 = props.min, max2 = props.max, scrollToTime = props.scrollToTime, localizer = props.localizer;
      var diffMillis = localizer.diff(localizer.merge(scrollToTime, min2), scrollToTime, "milliseconds");
      var totalMillis = localizer.diff(min2, max2, "milliseconds");
      this._scrollRatio = diffMillis / totalMillis;
    }
  }]);
  return TimeGrid2;
}(import_react25.Component);
TimeGrid.defaultProps = {
  step: 30,
  timeslots: 2
};
var _excluded$4 = ["date", "localizer", "min", "max", "scrollToTime", "enableAutoScroll"];
var Day = function(_React$Component) {
  _inherits(Day2, _React$Component);
  var _super = _createSuper(Day2);
  function Day2() {
    _classCallCheck(this, Day2);
    return _super.apply(this, arguments);
  }
  _createClass(Day2, [{
    key: "render",
    value: function render() {
      var _this$props = this.props, date2 = _this$props.date, localizer = _this$props.localizer, _this$props$min = _this$props.min, min2 = _this$props$min === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$min, _this$props$max = _this$props.max, max2 = _this$props$max === void 0 ? localizer.endOf(/* @__PURE__ */ new Date(), "day") : _this$props$max, _this$props$scrollToT = _this$props.scrollToTime, scrollToTime = _this$props$scrollToT === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$scrollToT, _this$props$enableAut = _this$props.enableAutoScroll, enableAutoScroll = _this$props$enableAut === void 0 ? true : _this$props$enableAut, props = _objectWithoutProperties(_this$props, _excluded$4);
      var range3 = Day2.range(date2, {
        localizer
      });
      return import_react25.default.createElement(TimeGrid, Object.assign({}, props, {
        range: range3,
        eventOffset: 10,
        localizer,
        min: min2,
        max: max2,
        scrollToTime,
        enableAutoScroll
      }));
    }
  }]);
  return Day2;
}(import_react25.default.Component);
Day.range = function(date2, _ref) {
  var localizer = _ref.localizer;
  return [localizer.startOf(date2, "day")];
};
Day.navigate = function(date2, action, _ref2) {
  var localizer = _ref2.localizer;
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date2, -1, "day");
    case navigate.NEXT:
      return localizer.add(date2, 1, "day");
    default:
      return date2;
  }
};
Day.title = function(date2, _ref3) {
  var localizer = _ref3.localizer;
  return localizer.format(date2, "dayHeaderFormat");
};
var _excluded$3 = ["date", "localizer", "min", "max", "scrollToTime", "enableAutoScroll"];
var Week = function(_React$Component) {
  _inherits(Week2, _React$Component);
  var _super = _createSuper(Week2);
  function Week2() {
    _classCallCheck(this, Week2);
    return _super.apply(this, arguments);
  }
  _createClass(Week2, [{
    key: "render",
    value: function render() {
      var _this$props = this.props, date2 = _this$props.date, localizer = _this$props.localizer, _this$props$min = _this$props.min, min2 = _this$props$min === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$min, _this$props$max = _this$props.max, max2 = _this$props$max === void 0 ? localizer.endOf(/* @__PURE__ */ new Date(), "day") : _this$props$max, _this$props$scrollToT = _this$props.scrollToTime, scrollToTime = _this$props$scrollToT === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$scrollToT, _this$props$enableAut = _this$props.enableAutoScroll, enableAutoScroll = _this$props$enableAut === void 0 ? true : _this$props$enableAut, props = _objectWithoutProperties(_this$props, _excluded$3);
      var range3 = Week2.range(date2, this.props);
      return import_react25.default.createElement(TimeGrid, Object.assign({}, props, {
        range: range3,
        eventOffset: 15,
        localizer,
        min: min2,
        max: max2,
        scrollToTime,
        enableAutoScroll
      }));
    }
  }]);
  return Week2;
}(import_react25.default.Component);
Week.defaultProps = TimeGrid.defaultProps;
Week.navigate = function(date2, action, _ref) {
  var localizer = _ref.localizer;
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date2, -1, "week");
    case navigate.NEXT:
      return localizer.add(date2, 1, "week");
    default:
      return date2;
  }
};
Week.range = function(date2, _ref2) {
  var localizer = _ref2.localizer;
  var firstOfWeek = localizer.startOfWeek();
  var start = localizer.startOf(date2, "week", firstOfWeek);
  var end = localizer.endOf(date2, "week", firstOfWeek);
  return localizer.range(start, end);
};
Week.title = function(date2, _ref3) {
  var localizer = _ref3.localizer;
  var _Week$range = Week.range(date2, {
    localizer
  }), _Week$range2 = _toArray(_Week$range), start = _Week$range2[0], rest = _Week$range2.slice(1);
  return localizer.format({
    start,
    end: rest.pop()
  }, "dayRangeHeaderFormat");
};
var _excluded$2 = ["date", "localizer", "min", "max", "scrollToTime", "enableAutoScroll"];
function workWeekRange(date2, options) {
  return Week.range(date2, options).filter(function(d) {
    return [6, 0].indexOf(d.getDay()) === -1;
  });
}
var WorkWeek = function(_React$Component) {
  _inherits(WorkWeek2, _React$Component);
  var _super = _createSuper(WorkWeek2);
  function WorkWeek2() {
    _classCallCheck(this, WorkWeek2);
    return _super.apply(this, arguments);
  }
  _createClass(WorkWeek2, [{
    key: "render",
    value: function render() {
      var _this$props = this.props, date2 = _this$props.date, localizer = _this$props.localizer, _this$props$min = _this$props.min, min2 = _this$props$min === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$min, _this$props$max = _this$props.max, max2 = _this$props$max === void 0 ? localizer.endOf(/* @__PURE__ */ new Date(), "day") : _this$props$max, _this$props$scrollToT = _this$props.scrollToTime, scrollToTime = _this$props$scrollToT === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$scrollToT, _this$props$enableAut = _this$props.enableAutoScroll, enableAutoScroll = _this$props$enableAut === void 0 ? true : _this$props$enableAut, props = _objectWithoutProperties(_this$props, _excluded$2);
      var range3 = workWeekRange(date2, this.props);
      return import_react25.default.createElement(TimeGrid, Object.assign({}, props, {
        range: range3,
        eventOffset: 15,
        localizer,
        min: min2,
        max: max2,
        scrollToTime,
        enableAutoScroll
      }));
    }
  }]);
  return WorkWeek2;
}(import_react25.default.Component);
WorkWeek.defaultProps = TimeGrid.defaultProps;
WorkWeek.range = workWeekRange;
WorkWeek.navigate = Week.navigate;
WorkWeek.title = function(date2, _ref) {
  var localizer = _ref.localizer;
  var _workWeekRange = workWeekRange(date2, {
    localizer
  }), _workWeekRange2 = _toArray(_workWeekRange), start = _workWeekRange2[0], rest = _workWeekRange2.slice(1);
  return localizer.format({
    start,
    end: rest.pop()
  }, "dayRangeHeaderFormat");
};
function Agenda(_ref) {
  var accessors = _ref.accessors, components2 = _ref.components, date2 = _ref.date, events = _ref.events, getters = _ref.getters, length = _ref.length, localizer = _ref.localizer, onDoubleClickEvent = _ref.onDoubleClickEvent, onSelectEvent = _ref.onSelectEvent, selected = _ref.selected;
  var headerRef = (0, import_react25.useRef)(null);
  var dateColRef = (0, import_react25.useRef)(null);
  var timeColRef = (0, import_react25.useRef)(null);
  var contentRef = (0, import_react25.useRef)(null);
  var tbodyRef = (0, import_react25.useRef)(null);
  (0, import_react25.useEffect)(function() {
    _adjustHeader();
  });
  var renderDay = function renderDay2(day2, events2, dayKey) {
    var Event2 = components2.event, AgendaDate = components2.date;
    events2 = events2.filter(function(e) {
      return inRange2(e, localizer.startOf(day2, "day"), localizer.endOf(day2, "day"), accessors, localizer);
    });
    return events2.map(function(event, idx) {
      var title = accessors.title(event);
      var end2 = accessors.end(event);
      var start = accessors.start(event);
      var userProps = getters.eventProp(event, start, end2, isSelected(event, selected));
      var dateLabel = idx === 0 && localizer.format(day2, "agendaDateFormat");
      var first = idx === 0 ? import_react25.default.createElement("td", {
        rowSpan: events2.length,
        className: "rbc-agenda-date-cell"
      }, AgendaDate ? import_react25.default.createElement(AgendaDate, {
        day: day2,
        label: dateLabel
      }) : dateLabel) : false;
      return import_react25.default.createElement("tr", {
        key: dayKey + "_" + idx,
        className: userProps.className,
        style: userProps.style
      }, first, import_react25.default.createElement("td", {
        className: "rbc-agenda-time-cell"
      }, timeRangeLabel(day2, event)), import_react25.default.createElement("td", {
        className: "rbc-agenda-event-cell",
        onClick: function onClick(e) {
          return onSelectEvent && onSelectEvent(event, e);
        },
        onDoubleClick: function onDoubleClick(e) {
          return onDoubleClickEvent && onDoubleClickEvent(event, e);
        }
      }, Event2 ? import_react25.default.createElement(Event2, {
        event,
        title
      }) : title));
    }, []);
  };
  var timeRangeLabel = function timeRangeLabel2(day2, event) {
    var labelClass = "", TimeComponent = components2.time, label = localizer.messages.allDay;
    var end2 = accessors.end(event);
    var start = accessors.start(event);
    if (!accessors.allDay(event)) {
      if (localizer.eq(start, end2)) {
        label = localizer.format(start, "agendaTimeFormat");
      } else if (localizer.isSameDate(start, end2)) {
        label = localizer.format({
          start,
          end: end2
        }, "agendaTimeRangeFormat");
      } else if (localizer.isSameDate(day2, start)) {
        label = localizer.format(start, "agendaTimeFormat");
      } else if (localizer.isSameDate(day2, end2)) {
        label = localizer.format(end2, "agendaTimeFormat");
      }
    }
    if (localizer.gt(day2, start, "day"))
      labelClass = "rbc-continues-prior";
    if (localizer.lt(day2, end2, "day"))
      labelClass += " rbc-continues-after";
    return import_react25.default.createElement("span", {
      className: labelClass.trim()
    }, TimeComponent ? import_react25.default.createElement(TimeComponent, {
      event,
      day: day2,
      label
    }) : label);
  };
  var _adjustHeader = function _adjustHeader2() {
    if (!tbodyRef.current)
      return;
    var header = headerRef.current;
    var firstRow = tbodyRef.current.firstChild;
    if (!firstRow)
      return;
    var isOverflowing2 = contentRef.current.scrollHeight > contentRef.current.clientHeight;
    var _widths = [];
    var widths = _widths;
    _widths = [getWidth(firstRow.children[0]), getWidth(firstRow.children[1])];
    if (widths[0] !== _widths[0] || widths[1] !== _widths[1]) {
      dateColRef.current.style.width = _widths[0] + "px";
      timeColRef.current.style.width = _widths[1] + "px";
    }
    if (isOverflowing2) {
      addClass(header, "rbc-header-overflowing");
      header.style.marginRight = scrollbarSize() + "px";
    } else {
      removeClass(header, "rbc-header-overflowing");
    }
  };
  var messages2 = localizer.messages;
  var end = localizer.add(date2, length, "day");
  var range3 = localizer.range(date2, end, "day");
  events = events.filter(function(event) {
    return inRange2(event, localizer.startOf(date2, "day"), localizer.endOf(end, "day"), accessors, localizer);
  });
  events.sort(function(a, b) {
    return +accessors.start(a) - +accessors.start(b);
  });
  return import_react25.default.createElement("div", {
    className: "rbc-agenda-view"
  }, events.length !== 0 ? import_react25.default.createElement(import_react25.default.Fragment, null, import_react25.default.createElement("table", {
    ref: headerRef,
    className: "rbc-agenda-table"
  }, import_react25.default.createElement("thead", null, import_react25.default.createElement("tr", null, import_react25.default.createElement("th", {
    className: "rbc-header",
    ref: dateColRef
  }, messages2.date), import_react25.default.createElement("th", {
    className: "rbc-header",
    ref: timeColRef
  }, messages2.time), import_react25.default.createElement("th", {
    className: "rbc-header"
  }, messages2.event)))), import_react25.default.createElement("div", {
    className: "rbc-agenda-content",
    ref: contentRef
  }, import_react25.default.createElement("table", {
    className: "rbc-agenda-table"
  }, import_react25.default.createElement("tbody", {
    ref: tbodyRef
  }, range3.map(function(day2, idx) {
    return renderDay(day2, events, idx);
  }))))) : import_react25.default.createElement("span", {
    className: "rbc-agenda-empty"
  }, messages2.noEventsInRange));
}
Agenda.defaultProps = {
  length: 30
};
Agenda.range = function(start, _ref2) {
  var _ref2$length = _ref2.length, length = _ref2$length === void 0 ? Agenda.defaultProps.length : _ref2$length, localizer = _ref2.localizer;
  var end = localizer.add(start, length, "day");
  return {
    start,
    end
  };
};
Agenda.navigate = function(date2, action, _ref3) {
  var _ref3$length = _ref3.length, length = _ref3$length === void 0 ? Agenda.defaultProps.length : _ref3$length, localizer = _ref3.localizer;
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date2, -length, "day");
    case navigate.NEXT:
      return localizer.add(date2, length, "day");
    default:
      return date2;
  }
};
Agenda.title = function(start, _ref4) {
  var _ref4$length = _ref4.length, length = _ref4$length === void 0 ? Agenda.defaultProps.length : _ref4$length, localizer = _ref4.localizer;
  var end = localizer.add(start, length, "day");
  return localizer.format({
    start,
    end
  }, "agendaHeaderFormat");
};
var _VIEWS;
var VIEWS = (_VIEWS = {}, _defineProperty(_VIEWS, views.MONTH, MonthView), _defineProperty(_VIEWS, views.WEEK, Week), _defineProperty(_VIEWS, views.WORK_WEEK, WorkWeek), _defineProperty(_VIEWS, views.DAY, Day), _defineProperty(_VIEWS, views.AGENDA, Agenda), _VIEWS);
var _excluded$1 = ["action", "date", "today"];
function moveDate(View, _ref) {
  var action = _ref.action, date2 = _ref.date, today = _ref.today, props = _objectWithoutProperties(_ref, _excluded$1);
  View = typeof View === "string" ? VIEWS[View] : View;
  switch (action) {
    case navigate.TODAY:
      date2 = today || /* @__PURE__ */ new Date();
      break;
    case navigate.DATE:
      break;
    default:
      (0, import_invariant3.default)(View && typeof View.navigate === "function", "Calendar View components must implement a static `.navigate(date, action)` method.s");
      date2 = View.navigate(date2, action, props);
  }
  return date2;
}
var Toolbar = function(_React$Component) {
  _inherits(Toolbar2, _React$Component);
  var _super = _createSuper(Toolbar2);
  function Toolbar2() {
    var _this;
    _classCallCheck(this, Toolbar2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.navigate = function(action) {
      _this.props.onNavigate(action);
    };
    _this.view = function(view) {
      _this.props.onView(view);
    };
    return _this;
  }
  _createClass(Toolbar2, [{
    key: "render",
    value: function render() {
      var _this$props = this.props, messages2 = _this$props.localizer.messages, label = _this$props.label;
      return import_react25.default.createElement("div", {
        className: "rbc-toolbar"
      }, import_react25.default.createElement("span", {
        className: "rbc-btn-group"
      }, import_react25.default.createElement("button", {
        type: "button",
        onClick: this.navigate.bind(null, navigate.TODAY)
      }, messages2.today), import_react25.default.createElement("button", {
        type: "button",
        onClick: this.navigate.bind(null, navigate.PREVIOUS)
      }, messages2.previous), import_react25.default.createElement("button", {
        type: "button",
        onClick: this.navigate.bind(null, navigate.NEXT)
      }, messages2.next)), import_react25.default.createElement("span", {
        className: "rbc-toolbar-label"
      }, label), import_react25.default.createElement("span", {
        className: "rbc-btn-group"
      }, this.viewNamesGroup(messages2)));
    }
  }, {
    key: "viewNamesGroup",
    value: function viewNamesGroup(messages2) {
      var _this2 = this;
      var viewNames2 = this.props.views;
      var view = this.props.view;
      if (viewNames2.length > 1) {
        return viewNames2.map(function(name) {
          return import_react25.default.createElement("button", {
            type: "button",
            key: name,
            className: clsx_m_default({
              "rbc-active": view === name
            }),
            onClick: _this2.view.bind(null, name)
          }, messages2[name]);
        });
      }
    }
  }]);
  return Toolbar2;
}(import_react25.default.Component);
function accessor(data, field) {
  var value = null;
  if (typeof field === "function")
    value = field(data);
  else if (typeof field === "string" && _typeof(data) === "object" && data != null && field in data)
    value = data[field];
  return value;
}
var wrapAccessor = function wrapAccessor2(acc) {
  return function(data) {
    return accessor(data, acc);
  };
};
var _excluded = ["view", "date", "getNow", "onNavigate"];
var _excluded2 = ["view", "toolbar", "events", "backgroundEvents", "style", "className", "elementProps", "date", "getNow", "length", "showMultiDayTimes", "onShowMore", "doShowMoreDrillDown", "components", "formats", "messages", "culture"];
function viewNames(_views) {
  if (Array.isArray(_views)) {
    return _views;
  }
  var views2 = [];
  for (var _i = 0, _Object$entries = Object.entries(_views); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
    if (value) {
      views2.push(key);
    }
  }
  return views2;
}
function isValidView(view, _ref) {
  var _views = _ref.views;
  var names = viewNames(_views);
  return names.indexOf(view) !== -1;
}
var Calendar = function(_React$Component) {
  _inherits(Calendar2, _React$Component);
  var _super = _createSuper(Calendar2);
  function Calendar2() {
    var _this;
    _classCallCheck(this, Calendar2);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(_args));
    _this.getViews = function() {
      var views2 = _this.props.views;
      if (Array.isArray(views2)) {
        return transform_default(views2, function(obj, name) {
          return obj[name] = VIEWS[name];
        }, {});
      }
      if (_typeof(views2) === "object") {
        return mapValues_default(views2, function(value, key) {
          if (value === true) {
            return VIEWS[key];
          }
          return value;
        });
      }
      return VIEWS;
    };
    _this.getView = function() {
      var views2 = _this.getViews();
      return views2[_this.props.view];
    };
    _this.getDrilldownView = function(date2) {
      var _this$props = _this.props, view = _this$props.view, drilldownView = _this$props.drilldownView, getDrilldownView = _this$props.getDrilldownView;
      if (!getDrilldownView)
        return drilldownView;
      return getDrilldownView(date2, view, Object.keys(_this.getViews()));
    };
    _this.handleRangeChange = function(date2, viewComponent, view) {
      var _this$props2 = _this.props, onRangeChange = _this$props2.onRangeChange, localizer = _this$props2.localizer;
      if (onRangeChange) {
        if (viewComponent.range) {
          onRangeChange(viewComponent.range(date2, {
            localizer
          }), view);
        } else {
          if (true) {
            console.error("onRangeChange prop not supported for this view");
          }
        }
      }
    };
    _this.handleNavigate = function(action, newDate) {
      var _this$props3 = _this.props, view = _this$props3.view, date2 = _this$props3.date, getNow2 = _this$props3.getNow, onNavigate = _this$props3.onNavigate, props = _objectWithoutProperties(_this$props3, _excluded);
      var ViewComponent = _this.getView();
      var today = getNow2();
      date2 = moveDate(ViewComponent, _objectSpread2(_objectSpread2({}, props), {}, {
        action,
        date: newDate || date2 || today,
        today
      }));
      onNavigate(date2, view, action);
      _this.handleRangeChange(date2, ViewComponent);
    };
    _this.handleViewChange = function(view) {
      if (view !== _this.props.view && isValidView(view, _this.props)) {
        _this.props.onView(view);
      }
      var views2 = _this.getViews();
      _this.handleRangeChange(_this.props.date || _this.props.getNow(), views2[view], view);
    };
    _this.handleSelectEvent = function() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      notify(_this.props.onSelectEvent, args);
    };
    _this.handleDoubleClickEvent = function() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      notify(_this.props.onDoubleClickEvent, args);
    };
    _this.handleKeyPressEvent = function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      notify(_this.props.onKeyPressEvent, args);
    };
    _this.handleSelectSlot = function(slotInfo) {
      notify(_this.props.onSelectSlot, slotInfo);
    };
    _this.handleDrillDown = function(date2, view) {
      var onDrillDown = _this.props.onDrillDown;
      if (onDrillDown) {
        onDrillDown(date2, view, _this.drilldownView);
        return;
      }
      if (view)
        _this.handleViewChange(view);
      _this.handleNavigate(navigate.DATE, date2);
    };
    _this.state = {
      context: Calendar2.getContext(_this.props)
    };
    return _this;
  }
  _createClass(Calendar2, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props, view = _this$props4.view, toolbar = _this$props4.toolbar, events = _this$props4.events, backgroundEvents = _this$props4.backgroundEvents, style2 = _this$props4.style, className = _this$props4.className, elementProps = _this$props4.elementProps, current = _this$props4.date, getNow2 = _this$props4.getNow, length = _this$props4.length, showMultiDayTimes = _this$props4.showMultiDayTimes, onShowMore = _this$props4.onShowMore, doShowMoreDrillDown = _this$props4.doShowMoreDrillDown;
      _this$props4.components;
      _this$props4.formats;
      _this$props4.messages;
      _this$props4.culture;
      var props = _objectWithoutProperties(_this$props4, _excluded2);
      current = current || getNow2();
      var View = this.getView();
      var _this$state$context = this.state.context, accessors = _this$state$context.accessors, components2 = _this$state$context.components, getters = _this$state$context.getters, localizer = _this$state$context.localizer, viewNames2 = _this$state$context.viewNames;
      var CalToolbar = components2.toolbar || Toolbar;
      var label = View.title(current, {
        localizer,
        length
      });
      return import_react25.default.createElement("div", Object.assign({}, elementProps, {
        className: clsx_m_default(className, "rbc-calendar", props.rtl && "rbc-rtl"),
        style: style2
      }), toolbar && import_react25.default.createElement(CalToolbar, {
        date: current,
        view,
        views: viewNames2,
        label,
        onView: this.handleViewChange,
        onNavigate: this.handleNavigate,
        localizer
      }), import_react25.default.createElement(View, Object.assign({}, props, {
        events,
        backgroundEvents,
        date: current,
        getNow: getNow2,
        length,
        localizer,
        getters,
        components: components2,
        accessors,
        showMultiDayTimes,
        getDrilldownView: this.getDrilldownView,
        onNavigate: this.handleNavigate,
        onDrillDown: this.handleDrillDown,
        onSelectEvent: this.handleSelectEvent,
        onDoubleClickEvent: this.handleDoubleClickEvent,
        onKeyPressEvent: this.handleKeyPressEvent,
        onSelectSlot: this.handleSelectSlot,
        onShowMore,
        doShowMoreDrillDown
      })));
    }
    /**
     *
     * @param date
     * @param viewComponent
     * @param {'month'|'week'|'work_week'|'day'|'agenda'} [view] - optional
     * parameter. It appears when range change on view changing. It could be handy
     * when you need to have both: range and view type at once, i.e. for manage rbc
     * state via url
     */
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      return {
        context: Calendar2.getContext(nextProps)
      };
    }
  }, {
    key: "getContext",
    value: function getContext(_ref2) {
      var startAccessor = _ref2.startAccessor, endAccessor = _ref2.endAccessor, allDayAccessor = _ref2.allDayAccessor, tooltipAccessor = _ref2.tooltipAccessor, titleAccessor = _ref2.titleAccessor, resourceAccessor = _ref2.resourceAccessor, resourceIdAccessor = _ref2.resourceIdAccessor, resourceTitleAccessor = _ref2.resourceTitleAccessor, eventPropGetter = _ref2.eventPropGetter, backgroundEventPropGetter = _ref2.backgroundEventPropGetter, slotPropGetter = _ref2.slotPropGetter, slotGroupPropGetter = _ref2.slotGroupPropGetter, dayPropGetter = _ref2.dayPropGetter, view = _ref2.view, views2 = _ref2.views, localizer = _ref2.localizer, culture = _ref2.culture, _ref2$messages = _ref2.messages, messages$1 = _ref2$messages === void 0 ? {} : _ref2$messages, _ref2$components = _ref2.components, components2 = _ref2$components === void 0 ? {} : _ref2$components, _ref2$formats = _ref2.formats, formats2 = _ref2$formats === void 0 ? {} : _ref2$formats;
      var names = viewNames(views2);
      var msgs = messages(messages$1);
      return {
        viewNames: names,
        localizer: mergeWithDefaults(localizer, culture, formats2, msgs),
        getters: {
          eventProp: function eventProp() {
            return eventPropGetter && eventPropGetter.apply(void 0, arguments) || {};
          },
          backgroundEventProp: function backgroundEventProp() {
            return backgroundEventPropGetter && backgroundEventPropGetter.apply(void 0, arguments) || {};
          },
          slotProp: function slotProp() {
            return slotPropGetter && slotPropGetter.apply(void 0, arguments) || {};
          },
          slotGroupProp: function slotGroupProp() {
            return slotGroupPropGetter && slotGroupPropGetter.apply(void 0, arguments) || {};
          },
          dayProp: function dayProp() {
            return dayPropGetter && dayPropGetter.apply(void 0, arguments) || {};
          }
        },
        components: defaults_default(components2[view] || {}, omit_default(components2, names), {
          eventWrapper: NoopWrapper,
          backgroundEventWrapper: NoopWrapper,
          eventContainerWrapper: NoopWrapper,
          dateCellWrapper: NoopWrapper,
          weekWrapper: NoopWrapper,
          timeSlotWrapper: NoopWrapper,
          timeGutterWrapper: NoopWrapper
        }),
        accessors: {
          start: wrapAccessor(startAccessor),
          end: wrapAccessor(endAccessor),
          allDay: wrapAccessor(allDayAccessor),
          tooltip: wrapAccessor(tooltipAccessor),
          title: wrapAccessor(titleAccessor),
          resource: wrapAccessor(resourceAccessor),
          resourceId: wrapAccessor(resourceIdAccessor),
          resourceTitle: wrapAccessor(resourceTitleAccessor)
        }
      };
    }
  }]);
  return Calendar2;
}(import_react25.default.Component);
Calendar.defaultProps = {
  events: [],
  backgroundEvents: [],
  elementProps: {},
  popup: false,
  toolbar: true,
  view: views.MONTH,
  views: [views.MONTH, views.WEEK, views.DAY, views.AGENDA],
  step: 30,
  length: 30,
  allDayMaxRows: Infinity,
  doShowMoreDrillDown: true,
  drilldownView: views.DAY,
  titleAccessor: "title",
  tooltipAccessor: "title",
  allDayAccessor: "allDay",
  startAccessor: "start",
  endAccessor: "end",
  resourceAccessor: "resourceId",
  resourceIdAccessor: "id",
  resourceTitleAccessor: "title",
  longPressThreshold: 250,
  getNow: function getNow() {
    return /* @__PURE__ */ new Date();
  },
  dayLayoutAlgorithm: "overlap"
};
var Calendar$1 = uncontrollable(Calendar, {
  view: "onView",
  date: "onNavigate",
  selected: "onSelectEvent"
});
var weekRangeFormat$5 = function weekRangeFormat(_ref, culture, local) {
  var start = _ref.start, end = _ref.end;
  return local.format(start, "MMMM DD", culture) + " – " + // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, "month") ? "DD" : "MMMM DD", culture);
};
var dateRangeFormat$5 = function dateRangeFormat(_ref2, culture, local) {
  var start = _ref2.start, end = _ref2.end;
  return local.format(start, "L", culture) + " – " + local.format(end, "L", culture);
};
var timeRangeFormat$5 = function timeRangeFormat(_ref3, culture, local) {
  var start = _ref3.start, end = _ref3.end;
  return local.format(start, "LT", culture) + " – " + local.format(end, "LT", culture);
};
var timeRangeStartFormat$5 = function timeRangeStartFormat(_ref4, culture, local) {
  var start = _ref4.start;
  return local.format(start, "LT", culture) + " – ";
};
var timeRangeEndFormat$5 = function timeRangeEndFormat(_ref5, culture, local) {
  var end = _ref5.end;
  return " – " + local.format(end, "LT", culture);
};
var formats$5 = {
  dateFormat: "DD",
  dayFormat: "DD ddd",
  weekdayFormat: "ddd",
  selectRangeFormat: timeRangeFormat$5,
  eventTimeRangeFormat: timeRangeFormat$5,
  eventTimeRangeStartFormat: timeRangeStartFormat$5,
  eventTimeRangeEndFormat: timeRangeEndFormat$5,
  timeGutterFormat: "LT",
  monthHeaderFormat: "MMMM YYYY",
  dayHeaderFormat: "dddd MMM DD",
  dayRangeHeaderFormat: weekRangeFormat$5,
  agendaHeaderFormat: dateRangeFormat$5,
  agendaDateFormat: "ddd MMM DD",
  agendaTimeFormat: "LT",
  agendaTimeRangeFormat: timeRangeFormat$5
};
function fixUnit$2(unit) {
  var datePart = unit ? unit.toLowerCase() : unit;
  if (datePart === "FullYear") {
    datePart = "year";
  } else if (!datePart) {
    datePart = void 0;
  }
  return datePart;
}
function moment(moment2) {
  var locale = function locale2(m, c) {
    return c ? m.locale(c) : m;
  };
  function getTimezoneOffset(date2) {
    return moment2(date2).toDate().getTimezoneOffset();
  }
  function getDstOffset2(start, end) {
    var _st$_z$name, _st$_z;
    var st = moment2(start).local();
    var ed = moment2(end).local();
    if (!moment2.tz) {
      return st.toDate().getTimezoneOffset() - ed.toDate().getTimezoneOffset();
    }
    var tzName = (_st$_z$name = st === null || st === void 0 ? void 0 : (_st$_z = st._z) === null || _st$_z === void 0 ? void 0 : _st$_z.name) !== null && _st$_z$name !== void 0 ? _st$_z$name : moment2.tz.guess();
    var startOffset = moment2.tz.zone(tzName).utcOffset(+st);
    var endOffset = moment2.tz.zone(tzName).utcOffset(+ed);
    return startOffset - endOffset;
  }
  function getDayStartDstOffset(start) {
    var dayStart = moment2(start).startOf("day");
    return getDstOffset2(dayStart, start);
  }
  function defineComparators(a, b, unit) {
    var datePart = fixUnit$2(unit);
    var dtA = datePart ? moment2(a).startOf(datePart) : moment2(a);
    var dtB = datePart ? moment2(b).startOf(datePart) : moment2(b);
    return [dtA, dtB, datePart];
  }
  function startOf2() {
    var date2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    var unit = arguments.length > 1 ? arguments[1] : void 0;
    var datePart = fixUnit$2(unit);
    if (datePart) {
      return moment2(date2).startOf(datePart).toDate();
    }
    return moment2(date2).toDate();
  }
  function endOf2() {
    var date2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    var unit = arguments.length > 1 ? arguments[1] : void 0;
    var datePart = fixUnit$2(unit);
    if (datePart) {
      return moment2(date2).endOf(datePart).toDate();
    }
    return moment2(date2).toDate();
  }
  function eq3(a, b, unit) {
    var _defineComparators = defineComparators(a, b, unit), _defineComparators2 = _slicedToArray(_defineComparators, 3), dtA = _defineComparators2[0], dtB = _defineComparators2[1], datePart = _defineComparators2[2];
    return dtA.isSame(dtB, datePart);
  }
  function neq2(a, b, unit) {
    return !eq3(a, b, unit);
  }
  function gt2(a, b, unit) {
    var _defineComparators3 = defineComparators(a, b, unit), _defineComparators4 = _slicedToArray(_defineComparators3, 3), dtA = _defineComparators4[0], dtB = _defineComparators4[1], datePart = _defineComparators4[2];
    return dtA.isAfter(dtB, datePart);
  }
  function lt2(a, b, unit) {
    var _defineComparators5 = defineComparators(a, b, unit), _defineComparators6 = _slicedToArray(_defineComparators5, 3), dtA = _defineComparators6[0], dtB = _defineComparators6[1], datePart = _defineComparators6[2];
    return dtA.isBefore(dtB, datePart);
  }
  function gte2(a, b, unit) {
    var _defineComparators7 = defineComparators(a, b, unit), _defineComparators8 = _slicedToArray(_defineComparators7, 3), dtA = _defineComparators8[0], dtB = _defineComparators8[1], datePart = _defineComparators8[2];
    return dtA.isSameOrBefore(dtB, datePart);
  }
  function lte2(a, b, unit) {
    var _defineComparators9 = defineComparators(a, b, unit), _defineComparators10 = _slicedToArray(_defineComparators9, 3), dtA = _defineComparators10[0], dtB = _defineComparators10[1], datePart = _defineComparators10[2];
    return dtA.isSameOrBefore(dtB, datePart);
  }
  function inRange3(day2, min3, max3) {
    var unit = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "day";
    var datePart = fixUnit$2(unit);
    var mDay = moment2(day2);
    var mMin = moment2(min3);
    var mMax = moment2(max3);
    return mDay.isBetween(mMin, mMax, datePart, "[]");
  }
  function min2(dateA, dateB) {
    var dtA = moment2(dateA);
    var dtB = moment2(dateB);
    var minDt = moment2.min(dtA, dtB);
    return minDt.toDate();
  }
  function max2(dateA, dateB) {
    var dtA = moment2(dateA);
    var dtB = moment2(dateB);
    var maxDt = moment2.max(dtA, dtB);
    return maxDt.toDate();
  }
  function merge2(date2, time) {
    if (!date2 && !time)
      return null;
    var tm = moment2(time).format("HH:mm:ss");
    var dt = moment2(date2).startOf("day").format("MM/DD/YYYY");
    return moment2("".concat(dt, " ").concat(tm), "MM/DD/YYYY HH:mm:ss").toDate();
  }
  function add2(date2, adder, unit) {
    var datePart = fixUnit$2(unit);
    return moment2(date2).add(adder, datePart).toDate();
  }
  function range3(start, end) {
    var unit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "day";
    var datePart = fixUnit$2(unit);
    var current = moment2(start).toDate();
    var days = [];
    while (lte2(current, end)) {
      days.push(current);
      current = add2(current, 1, datePart);
    }
    return days;
  }
  function ceil2(date2, unit) {
    var datePart = fixUnit$2(unit);
    var floor = startOf2(date2, datePart);
    return eq3(floor, date2) ? floor : add2(floor, 1, datePart);
  }
  function diff2(a, b) {
    var unit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "day";
    var datePart = fixUnit$2(unit);
    var dtA = moment2(a);
    var dtB = moment2(b);
    return dtB.diff(dtA, datePart);
  }
  function minutes2(date2) {
    var dt = moment2(date2);
    return dt.minutes();
  }
  function firstOfWeek(culture) {
    var data = culture ? moment2.localeData(culture) : moment2.localeData();
    return data ? data.firstDayOfWeek() : 0;
  }
  function firstVisibleDay2(date2) {
    return moment2(date2).startOf("month").startOf("week").toDate();
  }
  function lastVisibleDay2(date2) {
    return moment2(date2).endOf("month").endOf("week").toDate();
  }
  function visibleDays2(date2) {
    var current = firstVisibleDay2(date2);
    var last2 = lastVisibleDay2(date2);
    var days = [];
    while (lte2(current, last2)) {
      days.push(current);
      current = add2(current, 1, "d");
    }
    return days;
  }
  function getSlotDate2(dt, minutesFromMidnight, offset2) {
    return moment2(dt).startOf("day").minute(minutesFromMidnight + offset2).toDate();
  }
  function getTotalMin2(start, end) {
    return diff2(start, end, "minutes");
  }
  function getMinutesFromMidnight2(start) {
    var dayStart = moment2(start).startOf("day");
    var day2 = moment2(start);
    return day2.diff(dayStart, "minutes") + getDayStartDstOffset(start);
  }
  function continuesPrior2(start, first) {
    var mStart = moment2(start);
    var mFirst = moment2(first);
    return mStart.isBefore(mFirst, "day");
  }
  function continuesAfter2(start, end, last2) {
    var mEnd = moment2(end);
    var mLast = moment2(last2);
    return mEnd.isSameOrAfter(mLast, "minutes");
  }
  function sortEvents2(_ref6) {
    var _ref6$evtA = _ref6.evtA, aStart = _ref6$evtA.start, aEnd = _ref6$evtA.end, aAllDay = _ref6$evtA.allDay, _ref6$evtB = _ref6.evtB, bStart = _ref6$evtB.start, bEnd = _ref6$evtB.end, bAllDay = _ref6$evtB.allDay;
    var startSort = +startOf2(aStart, "day") - +startOf2(bStart, "day");
    var durA = diff2(aStart, ceil2(aEnd, "day"), "day");
    var durB = diff2(bStart, ceil2(bEnd, "day"), "day");
    return startSort || // sort by start Day first
    Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
    !!bAllDay - !!aAllDay || // then allDay single day events
    +aStart - +bStart || // then sort by start time *don't need moment conversion here
    +aEnd - +bEnd;
  }
  function inEventRange2(_ref7) {
    var _ref7$event = _ref7.event, start = _ref7$event.start, end = _ref7$event.end, _ref7$range = _ref7.range, rangeStart = _ref7$range.start, rangeEnd = _ref7$range.end;
    var startOfDay = moment2(start).startOf("day");
    var eEnd = moment2(end);
    var rStart = moment2(rangeStart);
    var rEnd = moment2(rangeEnd);
    var startsBeforeEnd = startOfDay.isSameOrBefore(rEnd, "day");
    var sameMin = !startOfDay.isSame(eEnd, "minutes");
    var endsAfterStart = sameMin ? eEnd.isAfter(rStart, "minutes") : eEnd.isSameOrAfter(rStart, "minutes");
    return startsBeforeEnd && endsAfterStart;
  }
  function isSameDate2(date1, date2) {
    var dt = moment2(date1);
    var dt2 = moment2(date2);
    return dt.isSame(dt2, "day");
  }
  function browserTZOffset() {
    var dt = /* @__PURE__ */ new Date();
    var neg = /-/.test(dt.toString()) ? "-" : "";
    var dtOffset = dt.getTimezoneOffset();
    var comparator = Number("".concat(neg).concat(Math.abs(dtOffset)));
    var mtOffset = moment2().utcOffset();
    return mtOffset > comparator ? 1 : 0;
  }
  return new DateLocalizer({
    formats: formats$5,
    firstOfWeek,
    firstVisibleDay: firstVisibleDay2,
    lastVisibleDay: lastVisibleDay2,
    visibleDays: visibleDays2,
    format: function format(value, _format2, culture) {
      return locale(moment2(value), culture).format(_format2);
    },
    lt: lt2,
    lte: lte2,
    gt: gt2,
    gte: gte2,
    eq: eq3,
    neq: neq2,
    merge: merge2,
    inRange: inRange3,
    startOf: startOf2,
    endOf: endOf2,
    range: range3,
    add: add2,
    diff: diff2,
    ceil: ceil2,
    min: min2,
    max: max2,
    minutes: minutes2,
    getSlotDate: getSlotDate2,
    getTimezoneOffset,
    getDstOffset: getDstOffset2,
    getTotalMin: getTotalMin2,
    getMinutesFromMidnight: getMinutesFromMidnight2,
    continuesPrior: continuesPrior2,
    continuesAfter: continuesAfter2,
    sortEvents: sortEvents2,
    inEventRange: inEventRange2,
    isSameDate: isSameDate2,
    browserTZOffset
  });
}
function pluralizeUnit(unit) {
  return /s$/.test(unit) ? unit : unit + "s";
}
var weekRangeFormat$4 = function weekRangeFormat2(_ref, culture, local) {
  var start = _ref.start, end = _ref.end;
  return local.format(start, "MMMM dd", culture) + " – " + // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, "month") ? "dd" : "MMMM dd", culture);
};
var dateRangeFormat$4 = function dateRangeFormat2(_ref2, culture, local) {
  var start = _ref2.start, end = _ref2.end;
  return local.format(start, "D", culture) + " – " + local.format(end, "D", culture);
};
var timeRangeFormat$4 = function timeRangeFormat2(_ref3, culture, local) {
  var start = _ref3.start, end = _ref3.end;
  return local.format(start, "t", culture) + " – " + local.format(end, "t", culture);
};
var timeRangeStartFormat$4 = function timeRangeStartFormat2(_ref4, culture, local) {
  var start = _ref4.start;
  return local.format(start, "t", culture) + " – ";
};
var timeRangeEndFormat$4 = function timeRangeEndFormat2(_ref5, culture, local) {
  var end = _ref5.end;
  return " – " + local.format(end, "t", culture);
};
var formats$4 = {
  dateFormat: "dd",
  dayFormat: "dd EEE",
  weekdayFormat: "EEE",
  selectRangeFormat: timeRangeFormat$4,
  eventTimeRangeFormat: timeRangeFormat$4,
  eventTimeRangeStartFormat: timeRangeStartFormat$4,
  eventTimeRangeEndFormat: timeRangeEndFormat$4,
  timeGutterFormat: "t",
  monthHeaderFormat: "MMMM yyyy",
  dayHeaderFormat: "EEEE MMM dd",
  dayRangeHeaderFormat: weekRangeFormat$4,
  agendaHeaderFormat: dateRangeFormat$4,
  agendaDateFormat: "EEE MMM dd",
  agendaTimeFormat: "t",
  agendaTimeRangeFormat: timeRangeFormat$4
};
function fixUnit$1(unit) {
  var datePart = unit ? pluralizeUnit(unit.toLowerCase()) : unit;
  if (datePart === "FullYear") {
    datePart = "year";
  } else if (!datePart) {
    datePart = void 0;
  }
  return datePart;
}
function luxon(DateTime) {
  var _ref6 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref6$firstDayOfWeek = _ref6.firstDayOfWeek, firstDayOfWeek = _ref6$firstDayOfWeek === void 0 ? 7 : _ref6$firstDayOfWeek;
  function formatDate(value, format) {
    return DateTime.fromJSDate(value).toFormat(format);
  }
  function formatDateWithCulture(value, culture, format) {
    return DateTime.fromJSDate(value).setLocale(culture).toFormat(format);
  }
  function defineComparators(a, b, unit) {
    var datePart = fixUnit$1(unit);
    var dtA = datePart ? DateTime.fromJSDate(a).startOf(datePart) : DateTime.fromJSDate(a);
    var dtB = datePart ? DateTime.fromJSDate(b).startOf(datePart) : DateTime.fromJSDate(b);
    return [dtA, dtB, datePart];
  }
  function startOfDTWeek(dtObj) {
    var weekday2 = dtObj.weekday;
    if (weekday2 === firstDayOfWeek) {
      return dtObj.startOf("day");
    } else if (firstDayOfWeek === 1) {
      return dtObj.startOf("week");
    }
    var diff3 = firstDayOfWeek === 7 ? weekday2 : weekday2 + (7 - firstDayOfWeek);
    return dtObj.minus({
      day: diff3
    }).startOf("day");
  }
  function endOfDTWeek(dtObj) {
    var weekday2 = dtObj.weekday;
    var eow = firstDayOfWeek === 1 ? 7 : firstDayOfWeek - 1;
    if (weekday2 === eow) {
      return dtObj.endOf("day");
    } else if (firstDayOfWeek === 1) {
      return dtObj.endOf("week");
    }
    var fromDate = firstDayOfWeek > eow ? dtObj.plus({
      day: firstDayOfWeek - eow
    }) : dtObj;
    return fromDate.set({
      weekday: eow
    }).endOf("day");
  }
  function startOfDT() {
    var date2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Date();
    var unit = arguments.length > 1 ? arguments[1] : void 0;
    var datePart = fixUnit$1(unit);
    if (datePart) {
      var dt = DateTime.fromJSDate(date2);
      return datePart.includes("week") ? startOfDTWeek(dt) : dt.startOf(datePart);
    }
    return DateTime.fromJSDate(date2);
  }
  function firstOfWeek() {
    return firstDayOfWeek;
  }
  function startOf2() {
    var date2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Date();
    var unit = arguments.length > 1 ? arguments[1] : void 0;
    return startOfDT(date2, unit).toJSDate();
  }
  function endOfDT() {
    var date2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Date();
    var unit = arguments.length > 1 ? arguments[1] : void 0;
    var datePart = fixUnit$1(unit);
    if (datePart) {
      var dt = DateTime.fromJSDate(date2);
      return datePart.includes("week") ? endOfDTWeek(dt) : dt.endOf(datePart);
    }
    return DateTime.fromJSDate(date2);
  }
  function endOf2() {
    var date2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Date();
    var unit = arguments.length > 1 ? arguments[1] : void 0;
    return endOfDT(date2, unit).toJSDate();
  }
  function eq3(a, b, unit) {
    var _defineComparators = defineComparators(a, b, unit), _defineComparators2 = _slicedToArray(_defineComparators, 2), dtA = _defineComparators2[0], dtB = _defineComparators2[1];
    return +dtA == +dtB;
  }
  function neq2(a, b, unit) {
    return !eq3(a, b, unit);
  }
  function gt2(a, b, unit) {
    var _defineComparators3 = defineComparators(a, b, unit), _defineComparators4 = _slicedToArray(_defineComparators3, 2), dtA = _defineComparators4[0], dtB = _defineComparators4[1];
    return +dtA > +dtB;
  }
  function lt2(a, b, unit) {
    var _defineComparators5 = defineComparators(a, b, unit), _defineComparators6 = _slicedToArray(_defineComparators5, 2), dtA = _defineComparators6[0], dtB = _defineComparators6[1];
    return +dtA < +dtB;
  }
  function gte2(a, b, unit) {
    var _defineComparators7 = defineComparators(a, b, unit), _defineComparators8 = _slicedToArray(_defineComparators7, 2), dtA = _defineComparators8[0], dtB = _defineComparators8[1];
    return +dtA >= +dtB;
  }
  function lte2(a, b, unit) {
    var _defineComparators9 = defineComparators(a, b, unit), _defineComparators10 = _slicedToArray(_defineComparators9, 2), dtA = _defineComparators10[0], dtB = _defineComparators10[1];
    return +dtA <= +dtB;
  }
  function inRange3(day2, min3, max3) {
    var unit = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "day";
    var datePart = fixUnit$1(unit);
    var mDay = startOfDT(day2, datePart);
    var mMin = startOfDT(min3, datePart);
    var mMax = startOfDT(max3, datePart);
    return +mDay >= +mMin && +mDay <= +mMax;
  }
  function min2(dateA, dateB) {
    var dtA = DateTime.fromJSDate(dateA);
    var dtB = DateTime.fromJSDate(dateB);
    var minDt = DateTime.min(dtA, dtB);
    return minDt.toJSDate();
  }
  function max2(dateA, dateB) {
    var dtA = DateTime.fromJSDate(dateA);
    var dtB = DateTime.fromJSDate(dateB);
    var maxDt = DateTime.max(dtA, dtB);
    return maxDt.toJSDate();
  }
  function merge2(date2, time) {
    if (!date2 && !time)
      return null;
    var tm = DateTime.fromJSDate(time);
    var dt = startOfDT(date2, "day");
    return dt.set({
      hour: tm.hour,
      minute: tm.minute,
      second: tm.second,
      millisecond: tm.millisecond
    }).toJSDate();
  }
  function add2(date2, adder, unit) {
    var datePart = fixUnit$1(unit);
    return DateTime.fromJSDate(date2).plus(_defineProperty({}, datePart, adder)).toJSDate();
  }
  function range3(start, end) {
    var unit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "day";
    var datePart = fixUnit$1(unit);
    var current = DateTime.fromJSDate(start).toJSDate();
    var days = [];
    while (lte2(current, end)) {
      days.push(current);
      current = add2(current, 1, datePart);
    }
    return days;
  }
  function ceil2(date2, unit) {
    var datePart = fixUnit$1(unit);
    var floor = startOf2(date2, datePart);
    return eq3(floor, date2) ? floor : add2(floor, 1, datePart);
  }
  function diff2(a, b) {
    var unit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "day";
    var datePart = fixUnit$1(unit);
    var dtA = DateTime.fromJSDate(a);
    var dtB = DateTime.fromJSDate(b);
    return Math.floor(dtB.diff(dtA, datePart, {
      conversionAccuracy: "longterm"
    }).toObject()[datePart]);
  }
  function firstVisibleDay2(date2) {
    var startOfMonth = startOfDT(date2, "month");
    return startOfDTWeek(startOfMonth).toJSDate();
  }
  function lastVisibleDay2(date2) {
    var endOfMonth = endOfDT(date2, "month");
    return endOfDTWeek(endOfMonth).toJSDate();
  }
  function visibleDays2(date2) {
    var current = firstVisibleDay2(date2);
    var last2 = lastVisibleDay2(date2);
    var days = [];
    while (lte2(current, last2)) {
      days.push(current);
      current = add2(current, 1, "day");
    }
    return days;
  }
  function getSlotDate2(dt, minutesFromMidnight, offset2) {
    return startOfDT(dt, "day").set({
      minutes: minutesFromMidnight + offset2
    }).toJSDate();
  }
  function getTotalMin2(start, end) {
    return diff2(start, end, "minutes");
  }
  function getMinutesFromMidnight2(start) {
    var dayStart = startOfDT(start, "day");
    var day2 = DateTime.fromJSDate(start);
    return Math.round(day2.diff(dayStart, "minutes", {
      conversionAccuracy: "longterm"
    }).toObject().minutes);
  }
  function continuesPrior2(start, first) {
    return lt2(start, first);
  }
  function continuesAfter2(start, end, last2) {
    return gte2(end, last2);
  }
  function sortEvents2(_ref7) {
    var _ref7$evtA = _ref7.evtA, aStart = _ref7$evtA.start, aEnd = _ref7$evtA.end, aAllDay = _ref7$evtA.allDay, _ref7$evtB = _ref7.evtB, bStart = _ref7$evtB.start, bEnd = _ref7$evtB.end, bAllDay = _ref7$evtB.allDay;
    var startSort = +startOf2(aStart, "day") - +startOf2(bStart, "day");
    var durA = diff2(aStart, ceil2(aEnd, "day"), "day");
    var durB = diff2(bStart, ceil2(bEnd, "day"), "day");
    return startSort || // sort by start Day first
    Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
    !!bAllDay - !!aAllDay || // then allDay single day events
    +aStart - +bStart || // then sort by start time *don't need moment conversion here
    +aEnd - +bEnd;
  }
  function inEventRange2(_ref8) {
    var _ref8$event = _ref8.event, start = _ref8$event.start, end = _ref8$event.end, _ref8$range = _ref8.range, rangeStart = _ref8$range.start, rangeEnd = _ref8$range.end;
    var eStart = startOf2(start, "day");
    var startsBeforeEnd = lte2(eStart, rangeEnd, "day");
    var sameMin = neq2(eStart, end, "minutes");
    var endsAfterStart = sameMin ? gt2(end, rangeStart, "minutes") : gte2(end, rangeStart, "minutes");
    return startsBeforeEnd && endsAfterStart;
  }
  function isSameDate2(date1, date2) {
    var dt = DateTime.fromJSDate(date1);
    var dt2 = DateTime.fromJSDate(date2);
    return dt.hasSame(dt2, "day");
  }
  function browserTZOffset() {
    var dt = /* @__PURE__ */ new Date();
    var neg = /-/.test(dt.toString()) ? "-" : "";
    var dtOffset = dt.getTimezoneOffset();
    var comparator = Number("".concat(neg).concat(Math.abs(dtOffset)));
    var mtOffset = DateTime.local().offset;
    return mtOffset > comparator ? 1 : 0;
  }
  return new DateLocalizer({
    format: function format(value, _format2, culture) {
      if (culture) {
        return formatDateWithCulture(value, culture, _format2);
      }
      return formatDate(value, _format2);
    },
    formats: formats$4,
    firstOfWeek,
    firstVisibleDay: firstVisibleDay2,
    lastVisibleDay: lastVisibleDay2,
    visibleDays: visibleDays2,
    lt: lt2,
    lte: lte2,
    gt: gt2,
    gte: gte2,
    eq: eq3,
    neq: neq2,
    merge: merge2,
    inRange: inRange3,
    startOf: startOf2,
    endOf: endOf2,
    range: range3,
    add: add2,
    diff: diff2,
    ceil: ceil2,
    min: min2,
    max: max2,
    getSlotDate: getSlotDate2,
    getTotalMin: getTotalMin2,
    getMinutesFromMidnight: getMinutesFromMidnight2,
    continuesPrior: continuesPrior2,
    continuesAfter: continuesAfter2,
    sortEvents: sortEvents2,
    inEventRange: inEventRange2,
    isSameDate: isSameDate2,
    browserTZOffset
  });
}
var dateRangeFormat$3 = function dateRangeFormat3(_ref, culture, local) {
  var start = _ref.start, end = _ref.end;
  return local.format(start, "d", culture) + " – " + local.format(end, "d", culture);
};
var timeRangeFormat$3 = function timeRangeFormat3(_ref2, culture, local) {
  var start = _ref2.start, end = _ref2.end;
  return local.format(start, "t", culture) + " – " + local.format(end, "t", culture);
};
var timeRangeStartFormat$3 = function timeRangeStartFormat3(_ref3, culture, local) {
  var start = _ref3.start;
  return local.format(start, "t", culture) + " – ";
};
var timeRangeEndFormat$3 = function timeRangeEndFormat3(_ref4, culture, local) {
  var end = _ref4.end;
  return " – " + local.format(end, "t", culture);
};
var weekRangeFormat$3 = function weekRangeFormat3(_ref5, culture, local) {
  var start = _ref5.start, end = _ref5.end;
  return local.format(start, "MMM dd", culture) + " – " + local.format(end, eq(start, end, "month") ? "dd" : "MMM dd", culture);
};
var formats$3 = {
  dateFormat: "dd",
  dayFormat: "ddd dd/MM",
  weekdayFormat: "ddd",
  selectRangeFormat: timeRangeFormat$3,
  eventTimeRangeFormat: timeRangeFormat$3,
  eventTimeRangeStartFormat: timeRangeStartFormat$3,
  eventTimeRangeEndFormat: timeRangeEndFormat$3,
  timeGutterFormat: "t",
  monthHeaderFormat: "Y",
  dayHeaderFormat: "dddd MMM dd",
  dayRangeHeaderFormat: weekRangeFormat$3,
  agendaHeaderFormat: dateRangeFormat$3,
  agendaDateFormat: "ddd MMM dd",
  agendaTimeFormat: "t",
  agendaTimeRangeFormat: timeRangeFormat$3
};
function oldGlobalize(globalize2) {
  function getCulture(culture) {
    return culture ? globalize2.findClosestCulture(culture) : globalize2.culture();
  }
  function firstOfWeek(culture) {
    culture = getCulture(culture);
    return culture && culture.calendar.firstDay || 0;
  }
  return new DateLocalizer({
    firstOfWeek,
    formats: formats$3,
    format: function format(value, _format2, culture) {
      return globalize2.format(value, _format2, culture);
    }
  });
}
var dateRangeFormat$2 = function dateRangeFormat4(_ref, culture, local) {
  var start = _ref.start, end = _ref.end;
  return local.format(start, {
    date: "short"
  }, culture) + " – " + local.format(end, {
    date: "short"
  }, culture);
};
var timeRangeFormat$2 = function timeRangeFormat4(_ref2, culture, local) {
  var start = _ref2.start, end = _ref2.end;
  return local.format(start, {
    time: "short"
  }, culture) + " – " + local.format(end, {
    time: "short"
  }, culture);
};
var timeRangeStartFormat$2 = function timeRangeStartFormat4(_ref3, culture, local) {
  var start = _ref3.start;
  return local.format(start, {
    time: "short"
  }, culture) + " – ";
};
var timeRangeEndFormat$2 = function timeRangeEndFormat4(_ref4, culture, local) {
  var end = _ref4.end;
  return " – " + local.format(end, {
    time: "short"
  }, culture);
};
var weekRangeFormat$2 = function weekRangeFormat4(_ref5, culture, local) {
  var start = _ref5.start, end = _ref5.end;
  return local.format(start, "MMM dd", culture) + " – " + local.format(end, eq(start, end, "month") ? "dd" : "MMM dd", culture);
};
var formats$2 = {
  dateFormat: "dd",
  dayFormat: "eee dd/MM",
  weekdayFormat: "eee",
  selectRangeFormat: timeRangeFormat$2,
  eventTimeRangeFormat: timeRangeFormat$2,
  eventTimeRangeStartFormat: timeRangeStartFormat$2,
  eventTimeRangeEndFormat: timeRangeEndFormat$2,
  timeGutterFormat: {
    time: "short"
  },
  monthHeaderFormat: "MMMM yyyy",
  dayHeaderFormat: "eeee MMM dd",
  dayRangeHeaderFormat: weekRangeFormat$2,
  agendaHeaderFormat: dateRangeFormat$2,
  agendaDateFormat: "eee MMM dd",
  agendaTimeFormat: {
    time: "short"
  },
  agendaTimeRangeFormat: timeRangeFormat$2
};
function globalize(globalize2) {
  var locale = function locale2(culture) {
    return culture ? globalize2(culture) : globalize2;
  };
  function firstOfWeek(culture) {
    try {
      var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      var cldr = locale(culture).cldr;
      var territory = cldr.attributes.territory;
      var weekData = cldr.get("supplemental").weekData;
      var firstDay = weekData.firstDay[territory || "001"];
      return days.indexOf(firstDay);
    } catch (e) {
      if (true) {
        console.error("Failed to accurately determine first day of the week. Is supplemental data loaded into CLDR?");
      }
      var date2 = /* @__PURE__ */ new Date();
      var localeDay = Math.max(parseInt(locale(culture).formatDate(date2, {
        raw: "e"
      }), 10) - 1, 0);
      return Math.abs(date2.getDay() - localeDay);
    }
  }
  if (!globalize2.load)
    return oldGlobalize(globalize2);
  return new DateLocalizer({
    firstOfWeek,
    formats: formats$2,
    format: function format(value, _format2, culture) {
      _format2 = typeof _format2 === "string" ? {
        raw: _format2
      } : _format2;
      return locale(culture).formatDate(value, _format2);
    }
  });
}
var dateRangeFormat$1 = function dateRangeFormat5(_ref, culture, local) {
  var start = _ref.start, end = _ref.end;
  return "".concat(local.format(start, "P", culture), " – ").concat(local.format(end, "P", culture));
};
var timeRangeFormat$1 = function timeRangeFormat5(_ref2, culture, local) {
  var start = _ref2.start, end = _ref2.end;
  return "".concat(local.format(start, "p", culture), " – ").concat(local.format(end, "p", culture));
};
var timeRangeStartFormat$1 = function timeRangeStartFormat5(_ref3, culture, local) {
  var start = _ref3.start;
  return "".concat(local.format(start, "h:mma", culture), " – ");
};
var timeRangeEndFormat$1 = function timeRangeEndFormat5(_ref4, culture, local) {
  var end = _ref4.end;
  return " – ".concat(local.format(end, "h:mma", culture));
};
var weekRangeFormat$1 = function weekRangeFormat5(_ref5, culture, local) {
  var start = _ref5.start, end = _ref5.end;
  return "".concat(local.format(start, "MMMM dd", culture), " – ").concat(local.format(end, eq(start, end, "month") ? "dd" : "MMMM dd", culture));
};
var formats$1 = {
  dateFormat: "dd",
  dayFormat: "dd eee",
  weekdayFormat: "cccc",
  selectRangeFormat: timeRangeFormat$1,
  eventTimeRangeFormat: timeRangeFormat$1,
  eventTimeRangeStartFormat: timeRangeStartFormat$1,
  eventTimeRangeEndFormat: timeRangeEndFormat$1,
  timeGutterFormat: "p",
  monthHeaderFormat: "MMMM yyyy",
  dayHeaderFormat: "cccc MMM dd",
  dayRangeHeaderFormat: weekRangeFormat$1,
  agendaHeaderFormat: dateRangeFormat$1,
  agendaDateFormat: "ccc MMM dd",
  agendaTimeFormat: "p",
  agendaTimeRangeFormat: timeRangeFormat$1
};
var dateFnsLocalizer = function dateFnsLocalizer2(_ref6) {
  var startOfWeek = _ref6.startOfWeek, getDay = _ref6.getDay, _format2 = _ref6.format, locales = _ref6.locales;
  return new DateLocalizer({
    formats: formats$1,
    firstOfWeek: function firstOfWeek(culture) {
      return getDay(startOfWeek(/* @__PURE__ */ new Date(), {
        locale: locales[culture]
      }));
    },
    format: function format(value, formatString, culture) {
      return _format2(new Date(value), formatString, {
        locale: locales[culture]
      });
    }
  });
};
var weekRangeFormat6 = function weekRangeFormat7(_ref, culture, local) {
  var start = _ref.start, end = _ref.end;
  return local.format(start, "MMMM DD", culture) + " – " + // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, "month") ? "DD" : "MMMM DD", culture);
};
var dateRangeFormat6 = function dateRangeFormat7(_ref2, culture, local) {
  var start = _ref2.start, end = _ref2.end;
  return local.format(start, "L", culture) + " – " + local.format(end, "L", culture);
};
var timeRangeFormat6 = function timeRangeFormat7(_ref3, culture, local) {
  var start = _ref3.start, end = _ref3.end;
  return local.format(start, "LT", culture) + " – " + local.format(end, "LT", culture);
};
var timeRangeStartFormat6 = function timeRangeStartFormat7(_ref4, culture, local) {
  var start = _ref4.start;
  return local.format(start, "LT", culture) + " – ";
};
var timeRangeEndFormat6 = function timeRangeEndFormat7(_ref5, culture, local) {
  var end = _ref5.end;
  return " – " + local.format(end, "LT", culture);
};
var formats = {
  dateFormat: "DD",
  dayFormat: "DD ddd",
  weekdayFormat: "ddd",
  selectRangeFormat: timeRangeFormat6,
  eventTimeRangeFormat: timeRangeFormat6,
  eventTimeRangeStartFormat: timeRangeStartFormat6,
  eventTimeRangeEndFormat: timeRangeEndFormat6,
  timeGutterFormat: "LT",
  monthHeaderFormat: "MMMM YYYY",
  dayHeaderFormat: "dddd MMM DD",
  dayRangeHeaderFormat: weekRangeFormat6,
  agendaHeaderFormat: dateRangeFormat6,
  agendaDateFormat: "ddd MMM DD",
  agendaTimeFormat: "LT",
  agendaTimeRangeFormat: timeRangeFormat6
};
function fixUnit(unit) {
  var datePart = unit ? unit.toLowerCase() : unit;
  if (datePart === "FullYear") {
    datePart = "year";
  } else if (!datePart) {
    datePart = void 0;
  }
  return datePart;
}
function dayjs(dayjsLib) {
  dayjsLib.extend(import_isBetween.default);
  dayjsLib.extend(import_isSameOrAfter.default);
  dayjsLib.extend(import_isSameOrBefore.default);
  dayjsLib.extend(import_localeData.default);
  dayjsLib.extend(import_localizedFormat.default);
  dayjsLib.extend(import_minMax.default);
  dayjsLib.extend(import_utc.default);
  var locale = function locale2(dj, c) {
    return c ? dj.locale(c) : dj;
  };
  var dayjs2 = dayjsLib.tz ? dayjsLib.tz : dayjsLib;
  function getTimezoneOffset(date2) {
    return dayjs2(date2).toDate().getTimezoneOffset();
  }
  function getDstOffset2(start, end) {
    var _st$tz$$x$$timezone;
    var st = dayjs2(start);
    var ed = dayjs2(end);
    if (!dayjs2.tz) {
      return st.toDate().getTimezoneOffset() - ed.toDate().getTimezoneOffset();
    }
    var tzName = (_st$tz$$x$$timezone = st.tz().$x.$timezone) !== null && _st$tz$$x$$timezone !== void 0 ? _st$tz$$x$$timezone : dayjsLib.tz.guess();
    var startOffset = -dayjs2.tz(+st, tzName).utcOffset();
    var endOffset = -dayjs2.tz(+ed, tzName).utcOffset();
    return startOffset - endOffset;
  }
  function getDayStartDstOffset(start) {
    var dayStart = dayjs2(start).startOf("day");
    return getDstOffset2(dayStart, start);
  }
  function defineComparators(a, b, unit) {
    var datePart = fixUnit(unit);
    var dtA = datePart ? dayjs2(a).startOf(datePart) : dayjs2(a);
    var dtB = datePart ? dayjs2(b).startOf(datePart) : dayjs2(b);
    return [dtA, dtB, datePart];
  }
  function startOf2() {
    var date2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    var unit = arguments.length > 1 ? arguments[1] : void 0;
    var datePart = fixUnit(unit);
    if (datePart) {
      return dayjs2(date2).startOf(datePart).toDate();
    }
    return dayjs2(date2).toDate();
  }
  function endOf2() {
    var date2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    var unit = arguments.length > 1 ? arguments[1] : void 0;
    var datePart = fixUnit(unit);
    if (datePart) {
      return dayjs2(date2).endOf(datePart).toDate();
    }
    return dayjs2(date2).toDate();
  }
  function eq3(a, b, unit) {
    var _defineComparators = defineComparators(a, b, unit), _defineComparators2 = _slicedToArray(_defineComparators, 3), dtA = _defineComparators2[0], dtB = _defineComparators2[1], datePart = _defineComparators2[2];
    return dtA.isSame(dtB, datePart);
  }
  function neq2(a, b, unit) {
    return !eq3(a, b, unit);
  }
  function gt2(a, b, unit) {
    var _defineComparators3 = defineComparators(a, b, unit), _defineComparators4 = _slicedToArray(_defineComparators3, 3), dtA = _defineComparators4[0], dtB = _defineComparators4[1], datePart = _defineComparators4[2];
    return dtA.isAfter(dtB, datePart);
  }
  function lt2(a, b, unit) {
    var _defineComparators5 = defineComparators(a, b, unit), _defineComparators6 = _slicedToArray(_defineComparators5, 3), dtA = _defineComparators6[0], dtB = _defineComparators6[1], datePart = _defineComparators6[2];
    return dtA.isBefore(dtB, datePart);
  }
  function gte2(a, b, unit) {
    var _defineComparators7 = defineComparators(a, b, unit), _defineComparators8 = _slicedToArray(_defineComparators7, 3), dtA = _defineComparators8[0], dtB = _defineComparators8[1], datePart = _defineComparators8[2];
    return dtA.isSameOrBefore(dtB, datePart);
  }
  function lte2(a, b, unit) {
    var _defineComparators9 = defineComparators(a, b, unit), _defineComparators10 = _slicedToArray(_defineComparators9, 3), dtA = _defineComparators10[0], dtB = _defineComparators10[1], datePart = _defineComparators10[2];
    return dtA.isSameOrBefore(dtB, datePart);
  }
  function inRange3(day2, min3, max3) {
    var unit = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "day";
    var datePart = fixUnit(unit);
    var djDay = dayjs2(day2);
    var djMin = dayjs2(min3);
    var djMax = dayjs2(max3);
    return djDay.isBetween(djMin, djMax, datePart, "[]");
  }
  function min2(dateA, dateB) {
    var dtA = dayjs2(dateA);
    var dtB = dayjs2(dateB);
    var minDt = dayjsLib.min(dtA, dtB);
    return minDt.toDate();
  }
  function max2(dateA, dateB) {
    var dtA = dayjs2(dateA);
    var dtB = dayjs2(dateB);
    var maxDt = dayjsLib.max(dtA, dtB);
    return maxDt.toDate();
  }
  function merge2(date2, time) {
    if (!date2 && !time)
      return null;
    var tm = dayjs2(time).format("HH:mm:ss");
    var dt = dayjs2(date2).startOf("day").format("MM/DD/YYYY");
    return dayjsLib("".concat(dt, " ").concat(tm), "MM/DD/YYYY HH:mm:ss").toDate();
  }
  function add2(date2, adder, unit) {
    var datePart = fixUnit(unit);
    return dayjs2(date2).add(adder, datePart).toDate();
  }
  function range3(start, end) {
    var unit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "day";
    var datePart = fixUnit(unit);
    var current = dayjs2(start).toDate();
    var days = [];
    while (lte2(current, end)) {
      days.push(current);
      current = add2(current, 1, datePart);
    }
    return days;
  }
  function ceil2(date2, unit) {
    var datePart = fixUnit(unit);
    var floor = startOf2(date2, datePart);
    return eq3(floor, date2) ? floor : add2(floor, 1, datePart);
  }
  function diff2(a, b) {
    var unit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "day";
    var datePart = fixUnit(unit);
    var dtA = dayjs2(a);
    var dtB = dayjs2(b);
    return dtB.diff(dtA, datePart);
  }
  function minutes2(date2) {
    var dt = dayjs2(date2);
    return dt.minutes();
  }
  function firstOfWeek(culture) {
    var data = culture ? dayjsLib.localeData(culture) : dayjsLib.localeData();
    return data ? data.firstDayOfWeek() : 0;
  }
  function firstVisibleDay2(date2) {
    return dayjs2(date2).startOf("month").startOf("week").toDate();
  }
  function lastVisibleDay2(date2) {
    return dayjs2(date2).endOf("month").endOf("week").toDate();
  }
  function visibleDays2(date2) {
    var current = firstVisibleDay2(date2);
    var last2 = lastVisibleDay2(date2);
    var days = [];
    while (lte2(current, last2)) {
      days.push(current);
      current = add2(current, 1, "d");
    }
    return days;
  }
  function getSlotDate2(dt, minutesFromMidnight, offset2) {
    return dayjs2(dt).startOf("day").minute(minutesFromMidnight + offset2).toDate();
  }
  function getTotalMin2(start, end) {
    return diff2(start, end, "minutes");
  }
  function getMinutesFromMidnight2(start) {
    var dayStart = dayjs2(start).startOf("day");
    var day2 = dayjs2(start);
    return day2.diff(dayStart, "minutes") + getDayStartDstOffset(start);
  }
  function continuesPrior2(start, first) {
    var djStart = dayjs2(start);
    var djFirst = dayjs2(first);
    return djStart.isBefore(djFirst, "day");
  }
  function continuesAfter2(start, end, last2) {
    var djEnd = dayjs2(end);
    var djLast = dayjs2(last2);
    return djEnd.isSameOrAfter(djLast, "minutes");
  }
  function sortEvents2(_ref6) {
    var _ref6$evtA = _ref6.evtA, aStart = _ref6$evtA.start, aEnd = _ref6$evtA.end, aAllDay = _ref6$evtA.allDay, _ref6$evtB = _ref6.evtB, bStart = _ref6$evtB.start, bEnd = _ref6$evtB.end, bAllDay = _ref6$evtB.allDay;
    var startSort = +startOf2(aStart, "day") - +startOf2(bStart, "day");
    var durA = diff2(aStart, ceil2(aEnd, "day"), "day");
    var durB = diff2(bStart, ceil2(bEnd, "day"), "day");
    return startSort || // sort by start Day first
    Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
    !!bAllDay - !!aAllDay || // then allDay single day events
    +aStart - +bStart || // then sort by start time *don't need dayjs conversion here
    +aEnd - +bEnd;
  }
  function inEventRange2(_ref7) {
    var _ref7$event = _ref7.event, start = _ref7$event.start, end = _ref7$event.end, _ref7$range = _ref7.range, rangeStart = _ref7$range.start, rangeEnd = _ref7$range.end;
    var startOfDay = dayjs2(start).startOf("day");
    var eEnd = dayjs2(end);
    var rStart = dayjs2(rangeStart);
    var rEnd = dayjs2(rangeEnd);
    var startsBeforeEnd = startOfDay.isSameOrBefore(rEnd, "day");
    var sameMin = !startOfDay.isSame(eEnd, "minutes");
    var endsAfterStart = sameMin ? eEnd.isAfter(rStart, "minutes") : eEnd.isSameOrAfter(rStart, "minutes");
    return startsBeforeEnd && endsAfterStart;
  }
  function isSameDate2(date1, date2) {
    var dt = dayjs2(date1);
    var dt2 = dayjs2(date2);
    return dt.isSame(dt2, "day");
  }
  function browserTZOffset() {
    var dt = /* @__PURE__ */ new Date();
    var neg = /-/.test(dt.toString()) ? "-" : "";
    var dtOffset = dt.getTimezoneOffset();
    var comparator = Number("".concat(neg).concat(Math.abs(dtOffset)));
    var mtOffset = dayjs2().utcOffset();
    return mtOffset > comparator ? 1 : 0;
  }
  return new DateLocalizer({
    formats,
    firstOfWeek,
    firstVisibleDay: firstVisibleDay2,
    lastVisibleDay: lastVisibleDay2,
    visibleDays: visibleDays2,
    format: function format(value, _format2, culture) {
      return locale(dayjs2(value), culture).format(_format2);
    },
    lt: lt2,
    lte: lte2,
    gt: gt2,
    gte: gte2,
    eq: eq3,
    neq: neq2,
    merge: merge2,
    inRange: inRange3,
    startOf: startOf2,
    endOf: endOf2,
    range: range3,
    add: add2,
    diff: diff2,
    ceil: ceil2,
    min: min2,
    max: max2,
    minutes: minutes2,
    getSlotDate: getSlotDate2,
    getTimezoneOffset,
    getDstOffset: getDstOffset2,
    getTotalMin: getTotalMin2,
    getMinutesFromMidnight: getMinutesFromMidnight2,
    continuesPrior: continuesPrior2,
    continuesAfter: continuesAfter2,
    sortEvents: sortEvents2,
    inEventRange: inEventRange2,
    isSameDate: isSameDate2,
    browserTZOffset
  });
}
var components = {
  eventWrapper: NoopWrapper,
  timeSlotWrapper: NoopWrapper,
  dateCellWrapper: NoopWrapper
};
export {
  Calendar$1 as Calendar,
  DateLocalizer,
  navigate as Navigate,
  views as Views,
  components,
  dateFnsLocalizer,
  dayjs as dayjsLocalizer,
  globalize as globalizeLocalizer,
  luxon as luxonLocalizer,
  moment as momentLocalizer,
  moveDate as move
};
//# sourceMappingURL=react-big-calendar.js.map
