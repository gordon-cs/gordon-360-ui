import {
  require_browser
} from "./chunk-UCHQXV4D.js";
import {
  _defineProperty
} from "./chunk-OUNQININ.js";
import "./chunk-7JSK233G.js";
import {
  _inheritsLoose
} from "./chunk-ORMIY5SP.js";
import {
  _assertThisInitialized
} from "./chunk-LQHJAPLN.js";
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

// node_modules/string-convert/camel2hyphen.js
var require_camel2hyphen = __commonJS({
  "node_modules/string-convert/camel2hyphen.js"(exports, module) {
    var camel2hyphen = function(str) {
      return str.replace(/[A-Z]/g, function(match) {
        return "-" + match.toLowerCase();
      }).toLowerCase();
    };
    module.exports = camel2hyphen;
  }
});

// node_modules/json2mq/index.js
var require_json2mq = __commonJS({
  "node_modules/json2mq/index.js"(exports, module) {
    var camel2hyphen = require_camel2hyphen();
    var isDimension = function(feature) {
      var re = /[height|width]$/;
      return re.test(feature);
    };
    var obj2mq = function(obj) {
      var mq = "";
      var features = Object.keys(obj);
      features.forEach(function(feature, index) {
        var value = obj[feature];
        feature = camel2hyphen(feature);
        if (isDimension(feature) && typeof value === "number") {
          value = value + "px";
        }
        if (value === true) {
          mq += feature;
        } else if (value === false) {
          mq += "not " + feature;
        } else {
          mq += "(" + feature + ": " + value + ")";
        }
        if (index < features.length - 1) {
          mq += " and ";
        }
      });
      return mq;
    };
    var json2mq2 = function(query) {
      var mq = "";
      if (typeof query === "string") {
        return query;
      }
      if (query instanceof Array) {
        query.forEach(function(q, index) {
          mq += obj2mq(q);
          if (index < query.length - 1) {
            mq += ", ";
          }
        });
        return mq;
      }
      return obj2mq(query);
    };
    module.exports = json2mq2;
  }
});

// node_modules/react-media/esm/react-media.js
init_extends();
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_invariant = __toESM(require_browser());
var import_json2mq = __toESM(require_json2mq());
var MediaQueryListener = function() {
  function MediaQueryListener2(targetWindow, query, listener) {
    var _this = this;
    this.nativeMediaQueryList = targetWindow.matchMedia(query);
    this.active = true;
    this.cancellableListener = function() {
      _this.matches = _this.nativeMediaQueryList.matches;
      if (_this.active) {
        listener.apply(void 0, arguments);
      }
    };
    this.nativeMediaQueryList.addListener(this.cancellableListener);
    this.matches = this.nativeMediaQueryList.matches;
  }
  var _proto = MediaQueryListener2.prototype;
  _proto.cancel = function cancel() {
    this.active = false;
    this.nativeMediaQueryList.removeListener(this.cancellableListener);
  };
  return MediaQueryListener2;
}();
var queryType = import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.object, import_prop_types.default.arrayOf(import_prop_types.default.object.isRequired)]);
var Media = function(_React$Component) {
  _inheritsLoose(Media2, _React$Component);
  function Media2(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "queries", []);
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMatches", function() {
      var result = _this.queries.reduce(function(acc, _ref) {
        var _extends2;
        var name = _ref.name, mqListener = _ref.mqListener;
        return _extends({}, acc, (_extends2 = {}, _extends2[name] = mqListener.matches, _extends2));
      }, {});
      return unwrapSingleQuery(result);
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateMatches", function() {
      var newMatches = _this.getMatches();
      _this.setState(function() {
        return {
          matches: newMatches
        };
      }, _this.onChange);
    });
    !(!(!props.query && !props.queries) || props.query && props.queries) ? true ? (0, import_invariant.default)(false, '<Media> must be supplied with either "query" or "queries"') : (0, import_invariant.default)(false) : void 0;
    !(props.defaultMatches === void 0 || !props.query || typeof props.defaultMatches === "boolean") ? true ? (0, import_invariant.default)(false, "<Media> when query is set, defaultMatches must be a boolean, received " + typeof props.defaultMatches) : (0, import_invariant.default)(false) : void 0;
    !(props.defaultMatches === void 0 || !props.queries || typeof props.defaultMatches === "object") ? true ? (0, import_invariant.default)(false, "<Media> when queries is set, defaultMatches must be a object of booleans, received " + typeof props.defaultMatches) : (0, import_invariant.default)(false) : void 0;
    if (typeof window !== "object") {
      var matches;
      if (props.defaultMatches !== void 0) {
        matches = props.defaultMatches;
      } else if (props.query) {
        matches = true;
      } else {
        matches = Object.keys(_this.props.queries).reduce(function(acc, key) {
          var _extends3;
          return _extends({}, acc, (_extends3 = {}, _extends3[key] = true, _extends3));
        }, {});
      }
      _this.state = {
        matches
      };
      return _assertThisInitialized(_this);
    }
    _this.initialize();
    _this.state = {
      matches: _this.props.defaultMatches !== void 0 ? _this.props.defaultMatches : _this.getMatches()
    };
    _this.onChange();
    return _this;
  }
  var _proto = Media2.prototype;
  _proto.initialize = function initialize() {
    var _this2 = this;
    var targetWindow = this.props.targetWindow || window;
    !(typeof targetWindow.matchMedia === "function") ? true ? (0, import_invariant.default)(false, "<Media targetWindow> does not support `matchMedia`.") : (0, import_invariant.default)(false) : void 0;
    var queries = this.props.queries || wrapInQueryObject(this.props.query);
    this.queries = Object.keys(queries).map(function(name) {
      var query = queries[name];
      var qs = typeof query !== "string" ? (0, import_json2mq.default)(query) : query;
      var mqListener = new MediaQueryListener(targetWindow, qs, _this2.updateMatches);
      return {
        name,
        mqListener
      };
    });
  };
  _proto.componentDidMount = function componentDidMount() {
    this.initialize();
    if (this.props.defaultMatches !== void 0) {
      this.updateMatches();
    }
  };
  _proto.onChange = function onChange() {
    var onChange2 = this.props.onChange;
    if (onChange2) {
      onChange2(this.state.matches);
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.queries.forEach(function(_ref2) {
      var mqListener = _ref2.mqListener;
      return mqListener.cancel();
    });
  };
  _proto.render = function render() {
    var _this$props = this.props, children = _this$props.children, render2 = _this$props.render;
    var matches = this.state.matches;
    var isAnyMatches = typeof matches === "object" ? Object.keys(matches).some(function(key) {
      return matches[key];
    }) : matches;
    return render2 ? isAnyMatches ? render2(matches) : null : children ? typeof children === "function" ? children(matches) : !Array.isArray(children) || children.length ? isAnyMatches ? (
      // We have to check whether child is a composite component or not to decide should we
      // provide `matches` as a prop or not
      import_react.default.Children.only(children) && typeof import_react.default.Children.only(children).type === "string" ? import_react.default.Children.only(children) : import_react.default.cloneElement(import_react.default.Children.only(children), {
        matches
      })
    ) : null : null : null;
  };
  return Media2;
}(import_react.default.Component);
_defineProperty(Media, "propTypes", {
  defaultMatches: import_prop_types.default.oneOfType([import_prop_types.default.bool, import_prop_types.default.objectOf(import_prop_types.default.bool)]),
  query: queryType,
  queries: import_prop_types.default.objectOf(queryType),
  render: import_prop_types.default.func,
  children: import_prop_types.default.oneOfType([import_prop_types.default.node, import_prop_types.default.func]),
  targetWindow: import_prop_types.default.object,
  onChange: import_prop_types.default.func
});
function wrapInQueryObject(query) {
  return {
    __DEFAULT__: query
  };
}
function unwrapSingleQuery(queryObject) {
  var queryNames = Object.keys(queryObject);
  if (queryNames.length === 1 && queryNames[0] === "__DEFAULT__") {
    return queryObject.__DEFAULT__;
  }
  return queryObject;
}
var react_media_default = Media;
export {
  react_media_default as default
};
//# sourceMappingURL=react-media.js.map
