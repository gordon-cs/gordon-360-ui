import {
  require_react_dom
} from "./chunk-KPNI7CHY.js";
import {
  require_react
} from "./chunk-LFTCFPAG.js";
import "./chunk-2W4G54A4.js";
import {
  __commonJS
} from "./chunk-LFBQMW2U.js";

// node_modules/react-to-print/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-to-print/lib/index.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t(require_react(), require_react_dom()) : "function" == typeof define && define.amd ? define("lib", ["react", "react-dom"], t) : "object" == typeof exports ? exports.lib = t(require_react(), require_react_dom()) : e.lib = t(e.react, e["react-dom"]);
    }("undefined" != typeof self ? self : exports, function(e, t) {
      return function() {
        "use strict";
        var n = { 156: function(t2) {
          t2.exports = e;
        }, 111: function(e2) {
          e2.exports = t;
        }, 582: function(e2, t2, n2) {
          n2.r(t2), n2.d(t2, { __assign: function() {
            return i2;
          }, __asyncDelegator: function() {
            return S;
          }, __asyncGenerator: function() {
            return x;
          }, __asyncValues: function() {
            return E;
          }, __await: function() {
            return O;
          }, __awaiter: function() {
            return h;
          }, __classPrivateFieldGet: function() {
            return k;
          }, __classPrivateFieldIn: function() {
            return R;
          }, __classPrivateFieldSet: function() {
            return M;
          }, __createBinding: function() {
            return g;
          }, __decorate: function() {
            return c;
          }, __esDecorate: function() {
            return u;
          }, __exportStar: function() {
            return v;
          }, __extends: function() {
            return o2;
          }, __generator: function() {
            return y;
          }, __importDefault: function() {
            return C;
          }, __importStar: function() {
            return A;
          }, __makeTemplateObject: function() {
            return j;
          }, __metadata: function() {
            return p;
          }, __param: function() {
            return l;
          }, __propKey: function() {
            return f;
          }, __read: function() {
            return m;
          }, __rest: function() {
            return a;
          }, __runInitializers: function() {
            return s;
          }, __setFunctionName: function() {
            return d;
          }, __spread: function() {
            return _;
          }, __spreadArray: function() {
            return P;
          }, __spreadArrays: function() {
            return w;
          }, __values: function() {
            return b;
          } });
          var r2 = function(e3, t3) {
            return r2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4)
                Object.prototype.hasOwnProperty.call(t4, n3) && (e4[n3] = t4[n3]);
            }, r2(e3, t3);
          };
          function o2(e3, t3) {
            if ("function" != typeof t3 && null !== t3)
              throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
            function n3() {
              this.constructor = e3;
            }
            r2(e3, t3), e3.prototype = null === t3 ? Object.create(t3) : (n3.prototype = t3.prototype, new n3());
          }
          var i2 = function() {
            return i2 = Object.assign || function(e3) {
              for (var t3, n3 = 1, r3 = arguments.length; n3 < r3; n3++)
                for (var o3 in t3 = arguments[n3])
                  Object.prototype.hasOwnProperty.call(t3, o3) && (e3[o3] = t3[o3]);
              return e3;
            }, i2.apply(this, arguments);
          };
          function a(e3, t3) {
            var n3 = {};
            for (var r3 in e3)
              Object.prototype.hasOwnProperty.call(e3, r3) && t3.indexOf(r3) < 0 && (n3[r3] = e3[r3]);
            if (null != e3 && "function" == typeof Object.getOwnPropertySymbols) {
              var o3 = 0;
              for (r3 = Object.getOwnPropertySymbols(e3); o3 < r3.length; o3++)
                t3.indexOf(r3[o3]) < 0 && Object.prototype.propertyIsEnumerable.call(e3, r3[o3]) && (n3[r3[o3]] = e3[r3[o3]]);
            }
            return n3;
          }
          function c(e3, t3, n3, r3) {
            var o3, i3 = arguments.length, a2 = i3 < 3 ? t3 : null === r3 ? r3 = Object.getOwnPropertyDescriptor(t3, n3) : r3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              a2 = Reflect.decorate(e3, t3, n3, r3);
            else
              for (var c2 = e3.length - 1; c2 >= 0; c2--)
                (o3 = e3[c2]) && (a2 = (i3 < 3 ? o3(a2) : i3 > 3 ? o3(t3, n3, a2) : o3(t3, n3)) || a2);
            return i3 > 3 && a2 && Object.defineProperty(t3, n3, a2), a2;
          }
          function l(e3, t3) {
            return function(n3, r3) {
              t3(n3, r3, e3);
            };
          }
          function u(e3, t3, n3, r3, o3, i3) {
            function a2(e4) {
              if (void 0 !== e4 && "function" != typeof e4)
                throw new TypeError("Function expected");
              return e4;
            }
            for (var c2, l2 = r3.kind, u2 = "getter" === l2 ? "get" : "setter" === l2 ? "set" : "value", s2 = !t3 && e3 ? r3.static ? e3 : e3.prototype : null, f2 = t3 || (s2 ? Object.getOwnPropertyDescriptor(s2, r3.name) : {}), d2 = false, p2 = n3.length - 1; p2 >= 0; p2--) {
              var h2 = {};
              for (var y2 in r3)
                h2[y2] = "access" === y2 ? {} : r3[y2];
              for (var y2 in r3.access)
                h2.access[y2] = r3.access[y2];
              h2.addInitializer = function(e4) {
                if (d2)
                  throw new TypeError("Cannot add initializers after decoration has completed");
                i3.push(a2(e4 || null));
              };
              var g2 = (0, n3[p2])("accessor" === l2 ? { get: f2.get, set: f2.set } : f2[u2], h2);
              if ("accessor" === l2) {
                if (void 0 === g2)
                  continue;
                if (null === g2 || "object" != typeof g2)
                  throw new TypeError("Object expected");
                (c2 = a2(g2.get)) && (f2.get = c2), (c2 = a2(g2.set)) && (f2.set = c2), (c2 = a2(g2.init)) && o3.unshift(c2);
              } else
                (c2 = a2(g2)) && ("field" === l2 ? o3.unshift(c2) : f2[u2] = c2);
            }
            s2 && Object.defineProperty(s2, r3.name, f2), d2 = true;
          }
          function s(e3, t3, n3) {
            for (var r3 = arguments.length > 2, o3 = 0; o3 < t3.length; o3++)
              n3 = r3 ? t3[o3].call(e3, n3) : t3[o3].call(e3);
            return r3 ? n3 : void 0;
          }
          function f(e3) {
            return "symbol" == typeof e3 ? e3 : "".concat(e3);
          }
          function d(e3, t3, n3) {
            return "symbol" == typeof t3 && (t3 = t3.description ? "[".concat(t3.description, "]") : ""), Object.defineProperty(e3, "name", { configurable: true, value: n3 ? "".concat(n3, " ", t3) : t3 });
          }
          function p(e3, t3) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
              return Reflect.metadata(e3, t3);
          }
          function h(e3, t3, n3, r3) {
            return new (n3 || (n3 = Promise))(function(o3, i3) {
              function a2(e4) {
                try {
                  l2(r3.next(e4));
                } catch (e5) {
                  i3(e5);
                }
              }
              function c2(e4) {
                try {
                  l2(r3.throw(e4));
                } catch (e5) {
                  i3(e5);
                }
              }
              function l2(e4) {
                var t4;
                e4.done ? o3(e4.value) : (t4 = e4.value, t4 instanceof n3 ? t4 : new n3(function(e5) {
                  e5(t4);
                })).then(a2, c2);
              }
              l2((r3 = r3.apply(e3, t3 || [])).next());
            });
          }
          function y(e3, t3) {
            var n3, r3, o3, i3, a2 = { label: 0, sent: function() {
              if (1 & o3[0])
                throw o3[1];
              return o3[1];
            }, trys: [], ops: [] };
            return i3 = { next: c2(0), throw: c2(1), return: c2(2) }, "function" == typeof Symbol && (i3[Symbol.iterator] = function() {
              return this;
            }), i3;
            function c2(c3) {
              return function(l2) {
                return function(c4) {
                  if (n3)
                    throw new TypeError("Generator is already executing.");
                  for (; i3 && (i3 = 0, c4[0] && (a2 = 0)), a2; )
                    try {
                      if (n3 = 1, r3 && (o3 = 2 & c4[0] ? r3.return : c4[0] ? r3.throw || ((o3 = r3.return) && o3.call(r3), 0) : r3.next) && !(o3 = o3.call(r3, c4[1])).done)
                        return o3;
                      switch (r3 = 0, o3 && (c4 = [2 & c4[0], o3.value]), c4[0]) {
                        case 0:
                        case 1:
                          o3 = c4;
                          break;
                        case 4:
                          return a2.label++, { value: c4[1], done: false };
                        case 5:
                          a2.label++, r3 = c4[1], c4 = [0];
                          continue;
                        case 7:
                          c4 = a2.ops.pop(), a2.trys.pop();
                          continue;
                        default:
                          if (!((o3 = (o3 = a2.trys).length > 0 && o3[o3.length - 1]) || 6 !== c4[0] && 2 !== c4[0])) {
                            a2 = 0;
                            continue;
                          }
                          if (3 === c4[0] && (!o3 || c4[1] > o3[0] && c4[1] < o3[3])) {
                            a2.label = c4[1];
                            break;
                          }
                          if (6 === c4[0] && a2.label < o3[1]) {
                            a2.label = o3[1], o3 = c4;
                            break;
                          }
                          if (o3 && a2.label < o3[2]) {
                            a2.label = o3[2], a2.ops.push(c4);
                            break;
                          }
                          o3[2] && a2.ops.pop(), a2.trys.pop();
                          continue;
                      }
                      c4 = t3.call(e3, a2);
                    } catch (e4) {
                      c4 = [6, e4], r3 = 0;
                    } finally {
                      n3 = o3 = 0;
                    }
                  if (5 & c4[0])
                    throw c4[1];
                  return { value: c4[0] ? c4[1] : void 0, done: true };
                }([c3, l2]);
              };
            }
          }
          var g = Object.create ? function(e3, t3, n3, r3) {
            void 0 === r3 && (r3 = n3);
            var o3 = Object.getOwnPropertyDescriptor(t3, n3);
            o3 && !("get" in o3 ? !t3.__esModule : o3.writable || o3.configurable) || (o3 = { enumerable: true, get: function() {
              return t3[n3];
            } }), Object.defineProperty(e3, r3, o3);
          } : function(e3, t3, n3, r3) {
            void 0 === r3 && (r3 = n3), e3[r3] = t3[n3];
          };
          function v(e3, t3) {
            for (var n3 in e3)
              "default" === n3 || Object.prototype.hasOwnProperty.call(t3, n3) || g(t3, e3, n3);
          }
          function b(e3) {
            var t3 = "function" == typeof Symbol && Symbol.iterator, n3 = t3 && e3[t3], r3 = 0;
            if (n3)
              return n3.call(e3);
            if (e3 && "number" == typeof e3.length)
              return { next: function() {
                return e3 && r3 >= e3.length && (e3 = void 0), { value: e3 && e3[r3++], done: !e3 };
              } };
            throw new TypeError(t3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
          }
          function m(e3, t3) {
            var n3 = "function" == typeof Symbol && e3[Symbol.iterator];
            if (!n3)
              return e3;
            var r3, o3, i3 = n3.call(e3), a2 = [];
            try {
              for (; (void 0 === t3 || t3-- > 0) && !(r3 = i3.next()).done; )
                a2.push(r3.value);
            } catch (e4) {
              o3 = { error: e4 };
            } finally {
              try {
                r3 && !r3.done && (n3 = i3.return) && n3.call(i3);
              } finally {
                if (o3)
                  throw o3.error;
              }
            }
            return a2;
          }
          function _() {
            for (var e3 = [], t3 = 0; t3 < arguments.length; t3++)
              e3 = e3.concat(m(arguments[t3]));
            return e3;
          }
          function w() {
            for (var e3 = 0, t3 = 0, n3 = arguments.length; t3 < n3; t3++)
              e3 += arguments[t3].length;
            var r3 = Array(e3), o3 = 0;
            for (t3 = 0; t3 < n3; t3++)
              for (var i3 = arguments[t3], a2 = 0, c2 = i3.length; a2 < c2; a2++, o3++)
                r3[o3] = i3[a2];
            return r3;
          }
          function P(e3, t3, n3) {
            if (n3 || 2 === arguments.length)
              for (var r3, o3 = 0, i3 = t3.length; o3 < i3; o3++)
                !r3 && o3 in t3 || (r3 || (r3 = Array.prototype.slice.call(t3, 0, o3)), r3[o3] = t3[o3]);
            return e3.concat(r3 || Array.prototype.slice.call(t3));
          }
          function O(e3) {
            return this instanceof O ? (this.v = e3, this) : new O(e3);
          }
          function x(e3, t3, n3) {
            if (!Symbol.asyncIterator)
              throw new TypeError("Symbol.asyncIterator is not defined.");
            var r3, o3 = n3.apply(e3, t3 || []), i3 = [];
            return r3 = {}, a2("next"), a2("throw"), a2("return"), r3[Symbol.asyncIterator] = function() {
              return this;
            }, r3;
            function a2(e4) {
              o3[e4] && (r3[e4] = function(t4) {
                return new Promise(function(n4, r4) {
                  i3.push([e4, t4, n4, r4]) > 1 || c2(e4, t4);
                });
              });
            }
            function c2(e4, t4) {
              try {
                (n4 = o3[e4](t4)).value instanceof O ? Promise.resolve(n4.value.v).then(l2, u2) : s2(i3[0][2], n4);
              } catch (e5) {
                s2(i3[0][3], e5);
              }
              var n4;
            }
            function l2(e4) {
              c2("next", e4);
            }
            function u2(e4) {
              c2("throw", e4);
            }
            function s2(e4, t4) {
              e4(t4), i3.shift(), i3.length && c2(i3[0][0], i3[0][1]);
            }
          }
          function S(e3) {
            var t3, n3;
            return t3 = {}, r3("next"), r3("throw", function(e4) {
              throw e4;
            }), r3("return"), t3[Symbol.iterator] = function() {
              return this;
            }, t3;
            function r3(r4, o3) {
              t3[r4] = e3[r4] ? function(t4) {
                return (n3 = !n3) ? { value: O(e3[r4](t4)), done: false } : o3 ? o3(t4) : t4;
              } : o3;
            }
          }
          function E(e3) {
            if (!Symbol.asyncIterator)
              throw new TypeError("Symbol.asyncIterator is not defined.");
            var t3, n3 = e3[Symbol.asyncIterator];
            return n3 ? n3.call(e3) : (e3 = b(e3), t3 = {}, r3("next"), r3("throw"), r3("return"), t3[Symbol.asyncIterator] = function() {
              return this;
            }, t3);
            function r3(n4) {
              t3[n4] = e3[n4] && function(t4) {
                return new Promise(function(r4, o3) {
                  !function(e4, t5, n5, r5) {
                    Promise.resolve(r5).then(function(t6) {
                      e4({ value: t6, done: n5 });
                    }, t5);
                  }(r4, o3, (t4 = e3[n4](t4)).done, t4.value);
                });
              };
            }
          }
          function j(e3, t3) {
            return Object.defineProperty ? Object.defineProperty(e3, "raw", { value: t3 }) : e3.raw = t3, e3;
          }
          var T = Object.create ? function(e3, t3) {
            Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
          } : function(e3, t3) {
            e3.default = t3;
          };
          function A(e3) {
            if (e3 && e3.__esModule)
              return e3;
            var t3 = {};
            if (null != e3)
              for (var n3 in e3)
                "default" !== n3 && Object.prototype.hasOwnProperty.call(e3, n3) && g(t3, e3, n3);
            return T(t3, e3), t3;
          }
          function C(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          }
          function k(e3, t3, n3, r3) {
            if ("a" === n3 && !r3)
              throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof t3 ? e3 !== t3 || !r3 : !t3.has(e3))
              throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === n3 ? r3 : "a" === n3 ? r3.call(e3) : r3 ? r3.value : t3.get(e3);
          }
          function M(e3, t3, n3, r3, o3) {
            if ("m" === r3)
              throw new TypeError("Private method is not writable");
            if ("a" === r3 && !o3)
              throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof t3 ? e3 !== t3 || !o3 : !t3.has(e3))
              throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === r3 ? o3.call(e3, n3) : o3 ? o3.value = n3 : t3.set(e3, n3), n3;
          }
          function R(e3, t3) {
            if (null === t3 || "object" != typeof t3 && "function" != typeof t3)
              throw new TypeError("Cannot use 'in' operator on non-object");
            return "function" == typeof e3 ? t3 === e3 : e3.has(t3);
          }
          t2.default = { __extends: o2, __assign: i2, __rest: a, __decorate: c, __param: l, __metadata: p, __awaiter: h, __generator: y, __createBinding: g, __exportStar: v, __values: b, __read: m, __spread: _, __spreadArrays: w, __spreadArray: P, __await: O, __asyncGenerator: x, __asyncDelegator: S, __asyncValues: E, __makeTemplateObject: j, __importStar: A, __importDefault: C, __classPrivateFieldGet: k, __classPrivateFieldSet: M, __classPrivateFieldIn: R };
        } }, r = {};
        function o(e2) {
          var t2 = r[e2];
          if (void 0 !== t2)
            return t2.exports;
          var i2 = r[e2] = { exports: {} };
          return n[e2](i2, i2.exports, o), i2.exports;
        }
        o.d = function(e2, t2) {
          for (var n2 in t2)
            o.o(t2, n2) && !o.o(e2, n2) && Object.defineProperty(e2, n2, { enumerable: true, get: t2[n2] });
        }, o.o = function(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }, o.r = function(e2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        };
        var i = {};
        return function() {
          var e2 = i;
          Object.defineProperty(e2, "__esModule", { value: true }), e2.useReactToPrint = e2.PrintContextConsumer = void 0;
          var t2 = o(582), n2 = o(156), r2 = o(111), a = Object.prototype.hasOwnProperty.call(n2, "createContext"), c = Object.prototype.hasOwnProperty.call(n2, "useMemo") && Object.prototype.hasOwnProperty.call(n2, "useCallback"), l = a ? n2.createContext({}) : null;
          e2.PrintContextConsumer = l ? l.Consumer : function() {
            return null;
          };
          var u = { copyStyles: true, pageStyle: "\n        @page {\n            /* Remove browser default header (title) and footer (url) */\n            margin: 0;\n        }\n        @media print {\n            body {\n                /* Tell browsers to print background colors */\n                -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */\n                color-adjust: exact; /* Firefox */\n            }\n        }\n    ", removeAfterPrint: false, suppressErrors: false }, s = function(e3) {
            function o2() {
              var n3 = null !== e3 && e3.apply(this, arguments) || this;
              return n3.startPrint = function(e4) {
                var t3 = n3.props, r3 = t3.onAfterPrint, o3 = t3.onPrintError, i2 = t3.print, a2 = t3.documentTitle;
                setTimeout(function() {
                  var t4, c2;
                  if (e4.contentWindow)
                    if (e4.contentWindow.focus(), i2)
                      i2(e4).then(function() {
                        return null == r3 ? void 0 : r3();
                      }).then(function() {
                        return n3.handleRemoveIframe();
                      }).catch(function(e5) {
                        o3 ? o3("print", e5) : n3.logMessages(["An error was thrown by the specified `print` function"]);
                      });
                    else {
                      if (e4.contentWindow.print) {
                        var l2 = null !== (c2 = null === (t4 = e4.contentDocument) || void 0 === t4 ? void 0 : t4.title) && void 0 !== c2 ? c2 : "", u2 = e4.ownerDocument.title;
                        a2 && (e4.ownerDocument.title = a2, e4.contentDocument && (e4.contentDocument.title = a2)), e4.contentWindow.print(), a2 && (e4.ownerDocument.title = u2, e4.contentDocument && (e4.contentDocument.title = l2));
                      } else
                        n3.logMessages(["Printing for this browser is not currently possible: the browser does not have a `print` method available for iframes."]);
                      null == r3 || r3(), n3.handleRemoveIframe();
                    }
                  else
                    n3.logMessages(["Printing failed because the `contentWindow` of the print iframe did not load. This is possibly an error with `react-to-print`. Please file an issue: https://github.com/gregnb/react-to-print/issues/"]);
                }, 500);
              }, n3.triggerPrint = function(e4) {
                var t3 = n3.props, r3 = t3.onBeforePrint, o3 = t3.onPrintError;
                if (r3) {
                  var i2 = r3();
                  i2 && "function" == typeof i2.then ? i2.then(function() {
                    n3.startPrint(e4);
                  }).catch(function(e5) {
                    o3 && o3("onBeforePrint", e5);
                  }) : n3.startPrint(e4);
                } else
                  n3.startPrint(e4);
              }, n3.handleClick = function() {
                var e4 = n3.props, t3 = e4.onBeforeGetContent, r3 = e4.onPrintError;
                if (t3) {
                  var o3 = t3();
                  o3 && "function" == typeof o3.then ? o3.then(n3.handlePrint).catch(function(e5) {
                    r3 && r3("onBeforeGetContent", e5);
                  }) : n3.handlePrint();
                } else
                  n3.handlePrint();
              }, n3.handlePrint = function() {
                var e4 = n3.props, o3 = e4.bodyClass, i2 = e4.content, a2 = e4.copyStyles, c2 = e4.fonts, l2 = e4.pageStyle, u2 = e4.nonce, s2 = i2();
                if (void 0 !== s2)
                  if (null !== s2) {
                    var f = document.createElement("iframe");
                    f.width = "".concat(document.documentElement.clientWidth, "px"), f.height = "".concat(document.documentElement.clientHeight, "px"), f.style.position = "absolute", f.style.top = "-".concat(document.documentElement.clientHeight + 100, "px"), f.style.left = "-".concat(document.documentElement.clientWidth + 100, "px"), f.id = "printWindow", f.srcdoc = "<!DOCTYPE html>";
                    var d = (0, r2.findDOMNode)(s2);
                    if (d) {
                      var p = d.cloneNode(true), h = p instanceof Text, y = document.querySelectorAll("link[rel='stylesheet']"), g = h ? [] : p.querySelectorAll("img"), v = h ? [] : p.querySelectorAll("video"), b = c2 ? c2.length : 0;
                      n3.numResourcesToLoad = y.length + g.length + v.length + b, n3.resourcesLoaded = [], n3.resourcesErrored = [];
                      var m = function(e5, r3) {
                        n3.resourcesLoaded.includes(e5) ? n3.logMessages(["Tried to mark a resource that has already been handled", e5], "debug") : (r3 ? (n3.logMessages(t2.__spreadArray(['"react-to-print" was unable to load a resource but will continue attempting to print the page'], t2.__read(r3), false)), n3.resourcesErrored.push(e5)) : n3.resourcesLoaded.push(e5), n3.resourcesLoaded.length + n3.resourcesErrored.length === n3.numResourcesToLoad && n3.triggerPrint(f));
                      };
                      f.onload = function() {
                        var e5, r3, i3, s3;
                        f.onload = null;
                        var y2 = f.contentDocument || (null === (r3 = f.contentWindow) || void 0 === r3 ? void 0 : r3.document);
                        if (y2) {
                          y2.body.appendChild(p), c2 && ((null === (i3 = f.contentDocument) || void 0 === i3 ? void 0 : i3.fonts) && (null === (s3 = f.contentWindow) || void 0 === s3 ? void 0 : s3.FontFace) ? c2.forEach(function(e6) {
                            var t3 = new FontFace(e6.family, e6.source, { weight: e6.weight, style: e6.style });
                            f.contentDocument.fonts.add(t3), t3.loaded.then(function() {
                              m(t3);
                            }).catch(function(e7) {
                              m(t3, ["Failed loading the font:", t3, "Load error:", e7]);
                            });
                          }) : (c2.forEach(function(e6) {
                            return m(e6);
                          }), n3.logMessages(['"react-to-print" is not able to load custom fonts because the browser does not support the FontFace API but will continue attempting to print the page'])));
                          var b2 = "function" == typeof l2 ? l2() : l2;
                          if ("string" != typeof b2)
                            n3.logMessages(['"react-to-print" expected a "string" from `pageStyle` but received "'.concat(typeof b2, '". Styles from `pageStyle` will not be applied.')]);
                          else {
                            var _ = y2.createElement("style");
                            u2 && (_.setAttribute("nonce", u2), y2.head.setAttribute("nonce", u2)), _.appendChild(y2.createTextNode(b2)), y2.head.appendChild(_);
                          }
                          if (o3 && (e5 = y2.body.classList).add.apply(e5, t2.__spreadArray([], t2.__read(o3.split(" ")), false)), !h) {
                            for (var w = h ? [] : d.querySelectorAll("canvas"), P = y2.querySelectorAll("canvas"), O = 0; O < w.length; ++O) {
                              var x = w[O], S = P[O].getContext("2d");
                              S && S.drawImage(x, 0, 0);
                            }
                            var E = function(e6) {
                              var t3 = g[e6], n4 = t3.getAttribute("src");
                              if (n4) {
                                var r4 = new Image();
                                r4.onload = function() {
                                  return m(t3);
                                }, r4.onerror = function(e7, n5, r5, o4, i4) {
                                  return m(t3, ["Error loading <img>", t3, "Error", i4]);
                                }, r4.src = n4;
                              } else
                                m(t3, ['Found an <img> tag with an empty "src" attribute. This prevents pre-loading it. The <img> is:', t3]);
                            };
                            for (O = 0; O < g.length; O++)
                              E(O);
                            var j = function(e6) {
                              var t3 = v[e6];
                              t3.preload = "auto";
                              var n4 = t3.getAttribute("poster");
                              if (n4) {
                                var r4 = new Image();
                                r4.onload = function() {
                                  return m(t3);
                                }, r4.onerror = function(e7, r5, o4, i4, a3) {
                                  return m(t3, ["Error loading video poster", n4, "for video", t3, "Error:", a3]);
                                }, r4.src = n4;
                              } else
                                t3.readyState >= 2 ? m(t3) : (t3.onloadeddata = function() {
                                  return m(t3);
                                }, t3.onerror = function(e7, n5, r5, o4, i4) {
                                  return m(t3, ["Error loading video", t3, "Error", i4]);
                                }, t3.onstalled = function() {
                                  return m(t3, ["Loading video stalled, skipping", t3]);
                                });
                            };
                            for (O = 0; O < v.length; O++)
                              j(O);
                            var T = "input", A = d.querySelectorAll(T), C = y2.querySelectorAll(T);
                            for (O = 0; O < A.length; O++)
                              C[O].value = A[O].value;
                            var k = "input[type=checkbox],input[type=radio]", M = d.querySelectorAll(k), R = y2.querySelectorAll(k);
                            for (O = 0; O < M.length; O++)
                              R[O].checked = M[O].checked;
                            var D = "select", I = d.querySelectorAll(D), q = y2.querySelectorAll(D);
                            for (O = 0; O < I.length; O++)
                              q[O].value = I[O].value;
                          }
                          if (a2)
                            for (var F = document.querySelectorAll("style, link[rel='stylesheet']"), L = function(e6, t3) {
                              var r4 = F[e6];
                              if ("style" === r4.tagName.toLowerCase()) {
                                var o4 = y2.createElement(r4.tagName), i4 = r4.sheet;
                                if (i4) {
                                  var a3 = "";
                                  try {
                                    for (var c3 = i4.cssRules.length, l3 = 0; l3 < c3; ++l3)
                                      "string" == typeof i4.cssRules[l3].cssText && (a3 += "".concat(i4.cssRules[l3].cssText, "\r\n"));
                                  } catch (e7) {
                                    n3.logMessages(["A stylesheet could not be accessed. This is likely due to the stylesheet having cross-origin imports, and many browsers block script access to cross-origin stylesheets. See https://github.com/gregnb/react-to-print/issues/429 for details. You may be able to load the sheet by both marking the stylesheet with the cross `crossorigin` attribute, and setting the `Access-Control-Allow-Origin` header on the server serving the stylesheet. Alternatively, host the stylesheet on your domain to avoid this issue entirely.", r4], "warning");
                                  }
                                  o4.setAttribute("id", "react-to-print-".concat(e6)), u2 && o4.setAttribute("nonce", u2), o4.appendChild(y2.createTextNode(a3)), y2.head.appendChild(o4);
                                }
                              } else if (r4.getAttribute("href"))
                                if (r4.hasAttribute("disabled"))
                                  n3.logMessages(["`react-to-print` encountered a <link> tag with a `disabled` attribute and will ignore it. Note that the `disabled` attribute is deprecated, and some browsers ignore it. You should stop using it. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-disabled. The <link> is:", r4], "warning"), m(r4);
                                else {
                                  for (var s4 = y2.createElement(r4.tagName), f2 = (l3 = 0, r4.attributes.length); l3 < f2; ++l3) {
                                    var d2 = r4.attributes[l3];
                                    d2 && s4.setAttribute(d2.nodeName, d2.nodeValue || "");
                                  }
                                  s4.onload = function() {
                                    return m(s4);
                                  }, s4.onerror = function(e7, t4, n4, r5, o5) {
                                    return m(s4, ["Failed to load", s4, "Error:", o5]);
                                  }, u2 && s4.setAttribute("nonce", u2), y2.head.appendChild(s4);
                                }
                              else
                                n3.logMessages(["`react-to-print` encountered a <link> tag with an empty `href` attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:", r4], "warning"), m(r4);
                            }, W = (O = 0, F.length); O < W; ++O)
                              L(O);
                        }
                        0 !== n3.numResourcesToLoad && a2 || n3.triggerPrint(f);
                      }, n3.handleRemoveIframe(true), document.body.appendChild(f);
                    } else
                      n3.logMessages(['"react-to-print" could not locate the DOM node corresponding with the `content` prop']);
                  } else
                    n3.logMessages(['There is nothing to print because the "content" prop returned "null". Please ensure "content" is renderable before allowing "react-to-print" to be called.']);
                else
                  n3.logMessages(["To print a functional component ensure it is wrapped with `React.forwardRef`, and ensure the forwarded ref is used. See the README for an example: https://github.com/gregnb/react-to-print#examples"]);
              }, n3.handleRemoveIframe = function(e4) {
                var t3 = n3.props.removeAfterPrint;
                if (e4 || t3) {
                  var r3 = document.getElementById("printWindow");
                  r3 && document.body.removeChild(r3);
                }
              }, n3.logMessages = function(e4, t3) {
                void 0 === t3 && (t3 = "error"), n3.props.suppressErrors || ("error" === t3 ? console.error(e4) : "warning" === t3 ? console.warn(e4) : "debug" === t3 && console.debug(e4));
              }, n3;
            }
            return t2.__extends(o2, e3), o2.prototype.render = function() {
              var e4 = this.props, t3 = e4.children, r3 = e4.trigger;
              if (r3)
                return n2.cloneElement(r3(), { onClick: this.handleClick });
              if (!l)
                return this.logMessages(['"react-to-print" requires React ^16.3.0 to be able to use "PrintContext"']), null;
              var o3 = { handlePrint: this.handleClick };
              return n2.createElement(l.Provider, { value: o3 }, t3);
            }, o2.defaultProps = u, o2;
          }(n2.Component);
          e2.default = s, e2.useReactToPrint = function(e3) {
            if (!c)
              return e3.suppressErrors || console.error('"react-to-print" requires React ^16.8.0 to be able to use "useReactToPrint"'), function() {
                throw new Error('"react-to-print" requires React ^16.8.0 to be able to use "useReactToPrint"');
              };
            var r3 = n2.useMemo(function() {
              return new s(t2.__assign(t2.__assign({}, u), e3));
            }, [e3]);
            return n2.useCallback(function() {
              return r3.handleClick();
            }, [r3]);
          };
        }(), i;
      }();
    });
  }
});
export default require_lib();
//# sourceMappingURL=react-to-print.js.map
