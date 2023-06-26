import {
  require_react
} from "./chunk-LFTCFPAG.js";
import "./chunk-2W4G54A4.js";
import {
  __commonJS
} from "./chunk-LFBQMW2U.js";

// node_modules/react-image-gallery/build/image-gallery.js
var require_image_gallery = __commonJS({
  "node_modules/react-image-gallery/build/image-gallery.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t(require_react()) : "function" == typeof define && define.amd ? define(["react"], t) : "object" == typeof exports ? exports.ImageGallery = t(require_react()) : e.ImageGallery = t(e.React);
    }(exports, function(e) {
      return (() => {
        var t = { 703: (e2, t2, n2) => {
          "use strict";
          var i2 = n2(414);
          function r2() {
          }
          function a() {
          }
          a.resetWarningCache = r2, e2.exports = function() {
            function e3(e4, t4, n4, r3, a2, s) {
              if (s !== i2) {
                var o = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                throw o.name = "Invariant Violation", o;
              }
            }
            function t3() {
              return e3;
            }
            e3.isRequired = e3;
            var n3 = { array: e3, bool: e3, func: e3, number: e3, object: e3, string: e3, symbol: e3, any: e3, arrayOf: t3, element: e3, elementType: e3, instanceOf: t3, node: e3, objectOf: t3, oneOf: t3, oneOfType: t3, shape: t3, exact: t3, checkPropTypes: a, resetWarningCache: r2 };
            return n3.PropTypes = n3, n3;
          };
        }, 697: (e2, t2, n2) => {
          e2.exports = n2(703)();
        }, 414: (e2) => {
          "use strict";
          e2.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
        }, 590: (e2) => {
          var t2 = "undefined" != typeof Element, n2 = "function" == typeof Map, i2 = "function" == typeof Set, r2 = "function" == typeof ArrayBuffer && !!ArrayBuffer.isView;
          function a(e3, s) {
            if (e3 === s)
              return true;
            if (e3 && s && "object" == typeof e3 && "object" == typeof s) {
              if (e3.constructor !== s.constructor)
                return false;
              var o, l, u, c;
              if (Array.isArray(e3)) {
                if ((o = e3.length) != s.length)
                  return false;
                for (l = o; 0 != l--; )
                  if (!a(e3[l], s[l]))
                    return false;
                return true;
              }
              if (n2 && e3 instanceof Map && s instanceof Map) {
                if (e3.size !== s.size)
                  return false;
                for (c = e3.entries(); !(l = c.next()).done; )
                  if (!s.has(l.value[0]))
                    return false;
                for (c = e3.entries(); !(l = c.next()).done; )
                  if (!a(l.value[1], s.get(l.value[0])))
                    return false;
                return true;
              }
              if (i2 && e3 instanceof Set && s instanceof Set) {
                if (e3.size !== s.size)
                  return false;
                for (c = e3.entries(); !(l = c.next()).done; )
                  if (!s.has(l.value[0]))
                    return false;
                return true;
              }
              if (r2 && ArrayBuffer.isView(e3) && ArrayBuffer.isView(s)) {
                if ((o = e3.length) != s.length)
                  return false;
                for (l = o; 0 != l--; )
                  if (e3[l] !== s[l])
                    return false;
                return true;
              }
              if (e3.constructor === RegExp)
                return e3.source === s.source && e3.flags === s.flags;
              if (e3.valueOf !== Object.prototype.valueOf)
                return e3.valueOf() === s.valueOf();
              if (e3.toString !== Object.prototype.toString)
                return e3.toString() === s.toString();
              if ((o = (u = Object.keys(e3)).length) !== Object.keys(s).length)
                return false;
              for (l = o; 0 != l--; )
                if (!Object.prototype.hasOwnProperty.call(s, u[l]))
                  return false;
              if (t2 && e3 instanceof Element)
                return false;
              for (l = o; 0 != l--; )
                if (("_owner" !== u[l] && "__v" !== u[l] && "__o" !== u[l] || !e3.$$typeof) && !a(e3[u[l]], s[u[l]]))
                  return false;
              return true;
            }
            return e3 != e3 && s != s;
          }
          e2.exports = function(e3, t3) {
            try {
              return a(e3, t3);
            } catch (e4) {
              if ((e4.message || "").match(/stack|recursion/i))
                return console.warn("react-fast-compare cannot handle circular refs"), false;
              throw e4;
            }
          };
        }, 37: function(e2, t2, n2) {
          !function(e3, t3) {
            function n3() {
              return n3 = Object.assign || function(e4) {
                for (var t4 = 1; t4 < arguments.length; t4++) {
                  var n4 = arguments[t4];
                  for (var i3 in n4)
                    Object.prototype.hasOwnProperty.call(n4, i3) && (e4[i3] = n4[i3]);
                }
                return e4;
              }, n3.apply(this, arguments);
            }
            var i2 = "Left", r2 = "Right", a = "Down", s = { delta: 10, preventDefaultTouchmoveEvent: false, rotationAngle: 0, trackMouse: false, trackTouch: true }, o = { first: true, initial: [0, 0], start: 0, swiping: false, xy: [0, 0] }, l = "mousemove", u = "mouseup";
            function c(e4, t4) {
              if (0 === t4)
                return e4;
              var n4 = Math.PI / 180 * t4;
              return [e4[0] * Math.cos(n4) + e4[1] * Math.sin(n4), e4[1] * Math.cos(n4) - e4[0] * Math.sin(n4)];
            }
            function h(e4, t4) {
              var s2 = function(t5) {
                t5 && "touches" in t5 && t5.touches.length > 1 || e4(function(e5, i3) {
                  i3.trackMouse && (document.addEventListener(l, h2), document.addEventListener(u, f));
                  var r3 = "touches" in t5 ? t5.touches[0] : t5, a2 = c([r3.clientX, r3.clientY], i3.rotationAngle);
                  return n3({}, e5, o, { initial: [].concat(a2), xy: a2, start: t5.timeStamp || 0 });
                });
              }, h2 = function(t5) {
                e4(function(e5, s3) {
                  if ("touches" in t5 && t5.touches.length > 1)
                    return e5;
                  var o2 = "touches" in t5 ? t5.touches[0] : t5, l2 = c([o2.clientX, o2.clientY], s3.rotationAngle), u2 = l2[0], h3 = l2[1], d2 = u2 - e5.xy[0], f2 = h3 - e5.xy[1], p2 = Math.abs(d2), m2 = Math.abs(f2), g = (t5.timeStamp || 0) - e5.start, v = Math.sqrt(p2 * p2 + m2 * m2) / (g || 1), b = [d2 / (g || 1), f2 / (g || 1)];
                  if (p2 < s3.delta && m2 < s3.delta && !e5.swiping)
                    return e5;
                  var y = function(e6, t6, n4, s4) {
                    return e6 > t6 ? n4 > 0 ? r2 : i2 : s4 > 0 ? a : "Up";
                  }(p2, m2, d2, f2), w = { absX: p2, absY: m2, deltaX: d2, deltaY: f2, dir: y, event: t5, first: e5.first, initial: e5.initial, velocity: v, vxvy: b };
                  s3.onSwiping && s3.onSwiping(w);
                  var T = false;
                  return (s3.onSwiping || s3.onSwiped || "onSwiped" + y in s3) && (T = true), T && s3.preventDefaultTouchmoveEvent && s3.trackTouch && t5.cancelable && t5.preventDefault(), n3({}, e5, { first: false, eventData: w, swiping: true });
                });
              }, d = function(t5) {
                e4(function(e5, i3) {
                  var r3;
                  if (e5.swiping && e5.eventData) {
                    r3 = n3({}, e5.eventData, { event: t5 }), i3.onSwiped && i3.onSwiped(r3);
                    var a2 = "onSwiped" + r3.dir;
                    a2 in i3 && i3[a2](r3);
                  } else
                    i3.onTap && i3.onTap({ event: t5 });
                  return n3({}, e5, o, { eventData: r3 });
                });
              }, f = function(e5) {
                document.removeEventListener(l, h2), document.removeEventListener(u, f), d(e5);
              }, p = function(e5, t5) {
                var n4 = function() {
                };
                if (e5 && e5.addEventListener) {
                  var i3 = [["touchstart", s2], ["touchmove", h2], ["touchend", d]];
                  i3.forEach(function(n5) {
                    var i4 = n5[0], r3 = n5[1];
                    return e5.addEventListener(i4, r3, { passive: t5 });
                  }), n4 = function() {
                    return i3.forEach(function(t6) {
                      var n5 = t6[0], i4 = t6[1];
                      return e5.removeEventListener(n5, i4);
                    });
                  };
                }
                return n4;
              }, m = { ref: function(t5) {
                null !== t5 && e4(function(e5, i3) {
                  if (e5.el === t5)
                    return e5;
                  var r3 = {};
                  return e5.el && e5.el !== t5 && e5.cleanUpTouch && (e5.cleanUpTouch(), r3.cleanUpTouch = void 0), i3.trackTouch && t5 && (r3.cleanUpTouch = p(t5, !i3.preventDefaultTouchmoveEvent)), n3({}, e5, { el: t5 }, r3);
                });
              } };
              return t4.trackMouse && (m.onMouseDown = s2), [m, p];
            }
            e3.DOWN = a, e3.LEFT = i2, e3.RIGHT = r2, e3.UP = "Up", e3.useSwipeable = function(e4) {
              var i3 = e4.trackMouse, r3 = t3.useRef(n3({}, o)), a2 = t3.useRef(n3({}, s));
              a2.current = n3({}, s, e4);
              var l2 = t3.useMemo(function() {
                return h(function(e5) {
                  return r3.current = e5(r3.current, a2.current);
                }, { trackMouse: i3 });
              }, [i3]), u2 = l2[0], c2 = l2[1];
              return r3.current = function(e5, t4, i4) {
                var r4 = {};
                return !t4.trackTouch && e5.cleanUpTouch ? (e5.cleanUpTouch(), r4.cleanUpTouch = void 0) : t4.trackTouch && !e5.cleanUpTouch && e5.el && (r4.cleanUpTouch = i4(e5.el, !t4.preventDefaultTouchmoveEvent)), n3({}, e5, r4);
              }(r3.current, a2.current, c2), u2;
            };
          }(t2, n2(888));
        }, 888: (t2) => {
          "use strict";
          t2.exports = e;
        } }, n = {};
        function i(e2) {
          var r2 = n[e2];
          if (void 0 !== r2)
            return r2.exports;
          var a = n[e2] = { exports: {} };
          return t[e2].call(a.exports, a, a.exports, i), a.exports;
        }
        i.n = (e2) => {
          var t2 = e2 && e2.__esModule ? () => e2.default : () => e2;
          return i.d(t2, { a: t2 }), t2;
        }, i.d = (e2, t2) => {
          for (var n2 in t2)
            i.o(t2, n2) && !i.o(e2, n2) && Object.defineProperty(e2, n2, { enumerable: true, get: t2[n2] });
        }, i.g = function() {
          if ("object" == typeof globalThis)
            return globalThis;
          try {
            return this || new Function("return this")();
          } catch (e2) {
            if ("object" == typeof window)
              return window;
          }
        }(), i.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), i.r = (e2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        };
        var r = {};
        return (() => {
          "use strict";
          function e2(t3) {
            var n3, i2, r2 = "";
            if ("string" == typeof t3 || "number" == typeof t3)
              r2 += t3;
            else if ("object" == typeof t3)
              if (Array.isArray(t3))
                for (n3 = 0; n3 < t3.length; n3++)
                  t3[n3] && (i2 = e2(t3[n3])) && (r2 && (r2 += " "), r2 += i2);
              else
                for (n3 in t3)
                  t3[n3] && (r2 && (r2 += " "), r2 += n3);
            return r2;
          }
          function t2() {
            for (var t3, n3, i2 = 0, r2 = ""; i2 < arguments.length; )
              (t3 = arguments[i2++]) && (n3 = e2(t3)) && (r2 && (r2 += " "), r2 += n3);
            return r2;
          }
          i.r(r), i.d(r, { default: () => Pe });
          var n2 = i(888), a = i.n(n2);
          const s = function(e3) {
            var t3 = typeof e3;
            return null != e3 && ("object" == t3 || "function" == t3);
          }, o = "object" == typeof global && global && global.Object === Object && global;
          var l = "object" == typeof self && self && self.Object === Object && self;
          const u = o || l || Function("return this")(), c = function() {
            return u.Date.now();
          };
          var h = /\s/;
          var d = /^\s+/;
          const f = function(e3) {
            return e3 ? e3.slice(0, function(e4) {
              for (var t3 = e4.length; t3-- && h.test(e4.charAt(t3)); )
                ;
              return t3;
            }(e3) + 1).replace(d, "") : e3;
          }, p = u.Symbol;
          var m = Object.prototype, g = m.hasOwnProperty, v = m.toString, b = p ? p.toStringTag : void 0;
          var y = Object.prototype.toString;
          var w = p ? p.toStringTag : void 0;
          const T = function(e3) {
            return null == e3 ? void 0 === e3 ? "[object Undefined]" : "[object Null]" : w && w in Object(e3) ? function(e4) {
              var t3 = g.call(e4, b), n3 = e4[b];
              try {
                e4[b] = void 0;
                var i2 = true;
              } catch (e5) {
              }
              var r2 = v.call(e4);
              return i2 && (t3 ? e4[b] = n3 : delete e4[b]), r2;
            }(e3) : function(e4) {
              return y.call(e4);
            }(e3);
          };
          var S = /^[-+]0x[0-9a-f]+$/i, O = /^0b[01]+$/i, E = /^0o[0-7]+$/i, k = parseInt;
          const I = function(e3) {
            if ("number" == typeof e3)
              return e3;
            if (function(e4) {
              return "symbol" == typeof e4 || function(e5) {
                return null != e5 && "object" == typeof e5;
              }(e4) && "[object Symbol]" == T(e4);
            }(e3))
              return NaN;
            if (s(e3)) {
              var t3 = "function" == typeof e3.valueOf ? e3.valueOf() : e3;
              e3 = s(t3) ? t3 + "" : t3;
            }
            if ("string" != typeof e3)
              return 0 === e3 ? e3 : +e3;
            e3 = f(e3);
            var n3 = O.test(e3);
            return n3 || E.test(e3) ? k(e3.slice(2), n3 ? 2 : 8) : S.test(e3) ? NaN : +e3;
          };
          var x = Math.max, _ = Math.min;
          const R = function(e3, t3, n3) {
            var i2, r2, a2, o2, l2, u2, h2 = 0, d2 = false, f2 = false, p2 = true;
            if ("function" != typeof e3)
              throw new TypeError("Expected a function");
            function m2(t4) {
              var n4 = i2, a3 = r2;
              return i2 = r2 = void 0, h2 = t4, o2 = e3.apply(a3, n4);
            }
            function g2(e4) {
              return h2 = e4, l2 = setTimeout(b2, t3), d2 ? m2(e4) : o2;
            }
            function v2(e4) {
              var n4 = e4 - u2;
              return void 0 === u2 || n4 >= t3 || n4 < 0 || f2 && e4 - h2 >= a2;
            }
            function b2() {
              var e4 = c();
              if (v2(e4))
                return y2(e4);
              l2 = setTimeout(b2, function(e5) {
                var n4 = t3 - (e5 - u2);
                return f2 ? _(n4, a2 - (e5 - h2)) : n4;
              }(e4));
            }
            function y2(e4) {
              return l2 = void 0, p2 && i2 ? m2(e4) : (i2 = r2 = void 0, o2);
            }
            function w2() {
              var e4 = c(), n4 = v2(e4);
              if (i2 = arguments, r2 = this, u2 = e4, n4) {
                if (void 0 === l2)
                  return g2(u2);
                if (f2)
                  return clearTimeout(l2), l2 = setTimeout(b2, t3), m2(u2);
              }
              return void 0 === l2 && (l2 = setTimeout(b2, t3)), o2;
            }
            return t3 = I(t3) || 0, s(n3) && (d2 = !!n3.leading, a2 = (f2 = "maxWait" in n3) ? x(I(n3.maxWait) || 0, t3) : a2, p2 = "trailing" in n3 ? !!n3.trailing : p2), w2.cancel = function() {
              void 0 !== l2 && clearTimeout(l2), h2 = 0, i2 = u2 = r2 = l2 = void 0;
            }, w2.flush = function() {
              return void 0 === l2 ? o2 : y2(c());
            }, w2;
          }, L = function(e3, t3, n3) {
            var i2 = true, r2 = true;
            if ("function" != typeof e3)
              throw new TypeError("Expected a function");
            return s(n3) && (i2 = "leading" in n3 ? !!n3.leading : i2, r2 = "trailing" in n3 ? !!n3.trailing : r2), R(e3, t3, { leading: i2, maxWait: t3, trailing: r2 });
          };
          var P = i(590), M = i.n(P), W = function() {
            if ("undefined" != typeof Map)
              return Map;
            function e3(e4, t3) {
              var n3 = -1;
              return e4.some(function(e5, i2) {
                return e5[0] === t3 && (n3 = i2, true);
              }), n3;
            }
            return function() {
              function t3() {
                this.__entries__ = [];
              }
              return Object.defineProperty(t3.prototype, "size", { get: function() {
                return this.__entries__.length;
              }, enumerable: true, configurable: true }), t3.prototype.get = function(t4) {
                var n3 = e3(this.__entries__, t4), i2 = this.__entries__[n3];
                return i2 && i2[1];
              }, t3.prototype.set = function(t4, n3) {
                var i2 = e3(this.__entries__, t4);
                ~i2 ? this.__entries__[i2][1] = n3 : this.__entries__.push([t4, n3]);
              }, t3.prototype.delete = function(t4) {
                var n3 = this.__entries__, i2 = e3(n3, t4);
                ~i2 && n3.splice(i2, 1);
              }, t3.prototype.has = function(t4) {
                return !!~e3(this.__entries__, t4);
              }, t3.prototype.clear = function() {
                this.__entries__.splice(0);
              }, t3.prototype.forEach = function(e4, t4) {
                void 0 === t4 && (t4 = null);
                for (var n3 = 0, i2 = this.__entries__; n3 < i2.length; n3++) {
                  var r2 = i2[n3];
                  e4.call(t4, r2[1], r2[0]);
                }
              }, t3;
            }();
          }(), D = "undefined" != typeof window && "undefined" != typeof document && window.document === document, F = void 0 !== i.g && i.g.Math === Math ? i.g : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(), C = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(F) : function(e3) {
            return setTimeout(function() {
              return e3(Date.now());
            }, 1e3 / 60);
          }, N = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], z = "undefined" != typeof MutationObserver, j = function() {
            function e3() {
              this.connected_ = false, this.mutationEventsAdded_ = false, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = function(e4, t3) {
                var n3 = false, i2 = false, r2 = 0;
                function a2() {
                  n3 && (n3 = false, e4()), i2 && o2();
                }
                function s2() {
                  C(a2);
                }
                function o2() {
                  var e5 = Date.now();
                  if (n3) {
                    if (e5 - r2 < 2)
                      return;
                    i2 = true;
                  } else
                    n3 = true, i2 = false, setTimeout(s2, 20);
                  r2 = e5;
                }
                return o2;
              }(this.refresh.bind(this));
            }
            return e3.prototype.addObserver = function(e4) {
              ~this.observers_.indexOf(e4) || this.observers_.push(e4), this.connected_ || this.connect_();
            }, e3.prototype.removeObserver = function(e4) {
              var t3 = this.observers_, n3 = t3.indexOf(e4);
              ~n3 && t3.splice(n3, 1), !t3.length && this.connected_ && this.disconnect_();
            }, e3.prototype.refresh = function() {
              this.updateObservers_() && this.refresh();
            }, e3.prototype.updateObservers_ = function() {
              var e4 = this.observers_.filter(function(e5) {
                return e5.gatherActive(), e5.hasActive();
              });
              return e4.forEach(function(e5) {
                return e5.broadcastActive();
              }), e4.length > 0;
            }, e3.prototype.connect_ = function() {
              D && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), z ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, { attributes: true, childList: true, characterData: true, subtree: true })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = true), this.connected_ = true);
            }, e3.prototype.disconnect_ = function() {
              D && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = false, this.connected_ = false);
            }, e3.prototype.onTransitionEnd_ = function(e4) {
              var t3 = e4.propertyName, n3 = void 0 === t3 ? "" : t3;
              N.some(function(e5) {
                return !!~n3.indexOf(e5);
              }) && this.refresh();
            }, e3.getInstance = function() {
              return this.instance_ || (this.instance_ = new e3()), this.instance_;
            }, e3.instance_ = null, e3;
          }(), B = function(e3, t3) {
            for (var n3 = 0, i2 = Object.keys(t3); n3 < i2.length; n3++) {
              var r2 = i2[n3];
              Object.defineProperty(e3, r2, { value: t3[r2], enumerable: false, writable: false, configurable: true });
            }
            return e3;
          }, A = function(e3) {
            return e3 && e3.ownerDocument && e3.ownerDocument.defaultView || F;
          }, G = V(0, 0, 0, 0);
          function U(e3) {
            return parseFloat(e3) || 0;
          }
          function H(e3) {
            for (var t3 = [], n3 = 1; n3 < arguments.length; n3++)
              t3[n3 - 1] = arguments[n3];
            return t3.reduce(function(t4, n4) {
              return t4 + U(e3["border-" + n4 + "-width"]);
            }, 0);
          }
          var q = "undefined" != typeof SVGGraphicsElement ? function(e3) {
            return e3 instanceof A(e3).SVGGraphicsElement;
          } : function(e3) {
            return e3 instanceof A(e3).SVGElement && "function" == typeof e3.getBBox;
          };
          function K(e3) {
            return D ? q(e3) ? function(e4) {
              var t3 = e4.getBBox();
              return V(0, 0, t3.width, t3.height);
            }(e3) : function(e4) {
              var t3 = e4.clientWidth, n3 = e4.clientHeight;
              if (!t3 && !n3)
                return G;
              var i2 = A(e4).getComputedStyle(e4), r2 = function(e5) {
                for (var t4 = {}, n4 = 0, i3 = ["top", "right", "bottom", "left"]; n4 < i3.length; n4++) {
                  var r3 = i3[n4], a3 = e5["padding-" + r3];
                  t4[r3] = U(a3);
                }
                return t4;
              }(i2), a2 = r2.left + r2.right, s2 = r2.top + r2.bottom, o2 = U(i2.width), l2 = U(i2.height);
              if ("border-box" === i2.boxSizing && (Math.round(o2 + a2) !== t3 && (o2 -= H(i2, "left", "right") + a2), Math.round(l2 + s2) !== n3 && (l2 -= H(i2, "top", "bottom") + s2)), !function(e5) {
                return e5 === A(e5).document.documentElement;
              }(e4)) {
                var u2 = Math.round(o2 + a2) - t3, c2 = Math.round(l2 + s2) - n3;
                1 !== Math.abs(u2) && (o2 -= u2), 1 !== Math.abs(c2) && (l2 -= c2);
              }
              return V(r2.left, r2.top, o2, l2);
            }(e3) : G;
          }
          function V(e3, t3, n3, i2) {
            return { x: e3, y: t3, width: n3, height: i2 };
          }
          var X = function() {
            function e3(e4) {
              this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = V(0, 0, 0, 0), this.target = e4;
            }
            return e3.prototype.isActive = function() {
              var e4 = K(this.target);
              return this.contentRect_ = e4, e4.width !== this.broadcastWidth || e4.height !== this.broadcastHeight;
            }, e3.prototype.broadcastRect = function() {
              var e4 = this.contentRect_;
              return this.broadcastWidth = e4.width, this.broadcastHeight = e4.height, e4;
            }, e3;
          }(), Y = function(e3, t3) {
            var n3, i2, r2, a2, s2, o2, l2, u2 = (i2 = (n3 = t3).x, r2 = n3.y, a2 = n3.width, s2 = n3.height, o2 = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, l2 = Object.create(o2.prototype), B(l2, { x: i2, y: r2, width: a2, height: s2, top: r2, right: i2 + a2, bottom: s2 + r2, left: i2 }), l2);
            B(this, { target: e3, contentRect: u2 });
          }, $ = function() {
            function e3(e4, t3, n3) {
              if (this.activeObservations_ = [], this.observations_ = new W(), "function" != typeof e4)
                throw new TypeError("The callback provided as parameter 1 is not a function.");
              this.callback_ = e4, this.controller_ = t3, this.callbackCtx_ = n3;
            }
            return e3.prototype.observe = function(e4) {
              if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
              if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e4 instanceof A(e4).Element))
                  throw new TypeError('parameter 1 is not of type "Element".');
                var t3 = this.observations_;
                t3.has(e4) || (t3.set(e4, new X(e4)), this.controller_.addObserver(this), this.controller_.refresh());
              }
            }, e3.prototype.unobserve = function(e4) {
              if (!arguments.length)
                throw new TypeError("1 argument required, but only 0 present.");
              if ("undefined" != typeof Element && Element instanceof Object) {
                if (!(e4 instanceof A(e4).Element))
                  throw new TypeError('parameter 1 is not of type "Element".');
                var t3 = this.observations_;
                t3.has(e4) && (t3.delete(e4), t3.size || this.controller_.removeObserver(this));
              }
            }, e3.prototype.disconnect = function() {
              this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
            }, e3.prototype.gatherActive = function() {
              var e4 = this;
              this.clearActive(), this.observations_.forEach(function(t3) {
                t3.isActive() && e4.activeObservations_.push(t3);
              });
            }, e3.prototype.broadcastActive = function() {
              if (this.hasActive()) {
                var e4 = this.callbackCtx_, t3 = this.activeObservations_.map(function(e5) {
                  return new Y(e5.target, e5.broadcastRect());
                });
                this.callback_.call(e4, t3, e4), this.clearActive();
              }
            }, e3.prototype.clearActive = function() {
              this.activeObservations_.splice(0);
            }, e3.prototype.hasActive = function() {
              return this.activeObservations_.length > 0;
            }, e3;
          }(), J = "undefined" != typeof WeakMap ? /* @__PURE__ */ new WeakMap() : new W(), Q = function e3(t3) {
            if (!(this instanceof e3))
              throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length)
              throw new TypeError("1 argument required, but only 0 present.");
            var n3 = j.getInstance(), i2 = new $(t3, n3, this);
            J.set(this, i2);
          };
          ["observe", "unobserve", "disconnect"].forEach(function(e3) {
            Q.prototype[e3] = function() {
              var t3;
              return (t3 = J.get(this))[e3].apply(t3, arguments);
            };
          });
          const Z = void 0 !== F.ResizeObserver ? F.ResizeObserver : Q;
          var ee = i(37), te = i(697), ne = a().memo(function(e3) {
            var t3 = e3.description, n3 = e3.fullscreen, i2 = e3.handleImageLoaded, r2 = e3.isFullscreen, s2 = e3.onImageError, o2 = e3.original, l2 = e3.originalAlt, u2 = e3.originalHeight, c2 = e3.originalWidth, h2 = e3.originalTitle, d2 = e3.sizes, f2 = e3.srcSet, p2 = e3.loading, m2 = r2 && n3 || o2;
            return a().createElement(a().Fragment, null, a().createElement("img", { className: "image-gallery-image", src: m2, alt: l2, srcSet: f2, height: u2, width: c2, sizes: d2, title: h2, onLoad: function(e4) {
              return i2(e4, o2);
            }, onError: s2, loading: p2 }), t3 && a().createElement("span", { className: "image-gallery-description" }, t3));
          });
          ne.displayName = "Item", ne.propTypes = { description: te.string, fullscreen: te.string, handleImageLoaded: te.func.isRequired, isFullscreen: te.bool, onImageError: te.func.isRequired, original: te.string.isRequired, originalAlt: te.string, originalHeight: te.string, originalWidth: te.string, originalTitle: te.string, sizes: te.string, srcSet: te.string, loading: te.string }, ne.defaultProps = { description: "", fullscreen: "", isFullscreen: false, originalAlt: "", originalHeight: "", originalWidth: "", originalTitle: "", sizes: "", srcSet: "", loading: "eager" };
          const ie = ne;
          var re = { left: a().createElement("polyline", { points: "15 18 9 12 15 6" }), right: a().createElement("polyline", { points: "9 18 15 12 9 6" }), maximize: a().createElement("path", { d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" }), minimize: a().createElement("path", { d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" }), play: a().createElement("polygon", { points: "5 3 19 12 5 21 5 3" }), pause: a().createElement(a().Fragment, null, a().createElement("rect", { x: "6", y: "4", width: "4", height: "16" }), a().createElement("rect", { x: "14", y: "4", width: "4", height: "16" })) }, ae = function(e3) {
            var t3 = e3.strokeWidth, n3 = e3.viewBox, i2 = e3.icon;
            return a().createElement("svg", { className: "image-gallery-svg", xmlns: "http://www.w3.org/2000/svg", viewBox: n3, fill: "none", stroke: "currentColor", strokeWidth: t3, strokeLinecap: "round", strokeLinejoin: "round" }, re[i2]);
          };
          ae.propTypes = { strokeWidth: te.number, viewBox: te.string, icon: (0, te.oneOf)(["left", "right", "maximize", "minimize", "play", "pause"]).isRequired }, ae.defaultProps = { strokeWidth: 1, viewBox: "0 0 24 24" };
          const se = ae;
          var oe = a().memo(function(e3) {
            var t3 = e3.isFullscreen, n3 = e3.onClick;
            return a().createElement("button", { type: "button", className: "image-gallery-icon image-gallery-fullscreen-button", onClick: n3, "aria-label": "Open Fullscreen" }, a().createElement(se, { strokeWidth: 2, icon: t3 ? "minimize" : "maximize" }));
          });
          oe.displayName = "Fullscreen", oe.propTypes = { isFullscreen: te.bool.isRequired, onClick: te.func.isRequired };
          const le = oe;
          var ue = a().memo(function(e3) {
            var t3 = e3.disabled, n3 = e3.onClick;
            return a().createElement("button", { type: "button", className: "image-gallery-icon image-gallery-left-nav", disabled: t3, onClick: n3, "aria-label": "Previous Slide" }, a().createElement(se, { icon: "left", viewBox: "6 0 12 24" }));
          });
          ue.displayName = "LeftNav", ue.propTypes = { disabled: te.bool.isRequired, onClick: te.func.isRequired };
          const ce = ue;
          var he = a().memo(function(e3) {
            var t3 = e3.disabled, n3 = e3.onClick;
            return a().createElement("button", { type: "button", className: "image-gallery-icon image-gallery-right-nav", disabled: t3, onClick: n3, "aria-label": "Next Slide" }, a().createElement(se, { icon: "right", viewBox: "6 0 12 24" }));
          });
          he.displayName = "RightNav", he.propTypes = { disabled: te.bool.isRequired, onClick: te.func.isRequired };
          const de = he;
          var fe = a().memo(function(e3) {
            var t3 = e3.isPlaying, n3 = e3.onClick;
            return a().createElement("button", { type: "button", className: "image-gallery-icon image-gallery-play-button", onClick: n3, "aria-label": "Play or Pause Slideshow" }, a().createElement(se, { strokeWidth: 2, icon: t3 ? "pause" : "play" }));
          });
          fe.displayName = "PlayPause", fe.propTypes = { isPlaying: te.bool.isRequired, onClick: te.func.isRequired };
          const pe = fe;
          function me() {
            return me = Object.assign || function(e3) {
              for (var t3 = 1; t3 < arguments.length; t3++) {
                var n3 = arguments[t3];
                for (var i2 in n3)
                  Object.prototype.hasOwnProperty.call(n3, i2) && (e3[i2] = n3[i2]);
              }
              return e3;
            }, me.apply(this, arguments);
          }
          var ge = function(e3) {
            var t3 = e3.children, n3 = e3.className, i2 = e3.delta, r2 = e3.onSwiping, s2 = e3.onSwiped, o2 = (0, ee.useSwipeable)({ delta: i2, onSwiping: r2, onSwiped: s2 });
            return a().createElement("div", me({}, o2, { className: n3 }), t3);
          };
          ge.propTypes = { children: te.node.isRequired, className: te.string, delta: te.number, onSwiped: te.func, onSwiping: te.func }, ge.defaultProps = { className: "", delta: 0, onSwiping: function() {
          }, onSwiped: function() {
          } };
          const ve = ge;
          function be(e3) {
            return be = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
              return typeof e4;
            } : function(e4) {
              return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
            }, be(e3);
          }
          function ye(e3, t3) {
            var n3 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var i2 = Object.getOwnPropertySymbols(e3);
              t3 && (i2 = i2.filter(function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              })), n3.push.apply(n3, i2);
            }
            return n3;
          }
          function we(e3) {
            for (var t3 = 1; t3 < arguments.length; t3++) {
              var n3 = null != arguments[t3] ? arguments[t3] : {};
              t3 % 2 ? ye(Object(n3), true).forEach(function(t4) {
                Te(e3, t4, n3[t4]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n3)) : ye(Object(n3)).forEach(function(t4) {
                Object.defineProperty(e3, t4, Object.getOwnPropertyDescriptor(n3, t4));
              });
            }
            return e3;
          }
          function Te(e3, t3, n3) {
            return t3 in e3 ? Object.defineProperty(e3, t3, { value: n3, enumerable: true, configurable: true, writable: true }) : e3[t3] = n3, e3;
          }
          function Se(e3, t3) {
            for (var n3 = 0; n3 < t3.length; n3++) {
              var i2 = t3[n3];
              i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, i2.key, i2);
            }
          }
          function Oe(e3, t3) {
            return Oe = Object.setPrototypeOf || function(e4, t4) {
              return e4.__proto__ = t4, e4;
            }, Oe(e3, t3);
          }
          function Ee(e3, t3) {
            return !t3 || "object" !== be(t3) && "function" != typeof t3 ? ke(e3) : t3;
          }
          function ke(e3) {
            if (void 0 === e3)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e3;
          }
          function Ie(e3) {
            return Ie = Object.setPrototypeOf ? Object.getPrototypeOf : function(e4) {
              return e4.__proto__ || Object.getPrototypeOf(e4);
            }, Ie(e3);
          }
          var xe = ["fullscreenchange", "MSFullscreenChange", "mozfullscreenchange", "webkitfullscreenchange"], _e = (0, te.arrayOf)((0, te.shape)({ srcSet: te.string, media: te.string }));
          function Re(e3) {
            var t3 = parseInt(e3.keyCode || e3.which || 0, 10);
            return 66 === t3 || 62 === t3;
          }
          var Le = function(e3) {
            !function(e4, t3) {
              if ("function" != typeof t3 && null !== t3)
                throw new TypeError("Super expression must either be null or a function");
              e4.prototype = Object.create(t3 && t3.prototype, { constructor: { value: e4, writable: true, configurable: true } }), t3 && Oe(e4, t3);
            }(l2, e3);
            var n3, i2, r2, s2, o2 = (r2 = l2, s2 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (e4) {
                return false;
              }
            }(), function() {
              var e4, t3 = Ie(r2);
              if (s2) {
                var n4 = Ie(this).constructor;
                e4 = Reflect.construct(t3, arguments, n4);
              } else
                e4 = t3.apply(this, arguments);
              return Ee(this, e4);
            });
            function l2(e4) {
              var t3;
              return function(e5, t4) {
                if (!(e5 instanceof t4))
                  throw new TypeError("Cannot call a class as a function");
              }(this, l2), (t3 = o2.call(this, e4)).state = { currentIndex: e4.startIndex, thumbsTranslate: 0, thumbsSwipedTranslate: 0, currentSlideOffset: 0, galleryWidth: 0, thumbnailsWrapperWidth: 0, thumbnailsWrapperHeight: 0, thumbsStyle: { transition: "all ".concat(e4.slideDuration, "ms ease-out") }, isFullscreen: false, isSwipingThumbnail: false, isPlaying: false }, t3.loadedImages = {}, t3.imageGallery = a().createRef(), t3.thumbnailsWrapper = a().createRef(), t3.thumbnails = a().createRef(), t3.imageGallerySlideWrapper = a().createRef(), t3.handleImageLoaded = t3.handleImageLoaded.bind(ke(t3)), t3.handleKeyDown = t3.handleKeyDown.bind(ke(t3)), t3.handleMouseDown = t3.handleMouseDown.bind(ke(t3)), t3.handleResize = t3.handleResize.bind(ke(t3)), t3.handleTouchMove = t3.handleTouchMove.bind(ke(t3)), t3.handleOnSwiped = t3.handleOnSwiped.bind(ke(t3)), t3.handleScreenChange = t3.handleScreenChange.bind(ke(t3)), t3.handleSwiping = t3.handleSwiping.bind(ke(t3)), t3.handleThumbnailSwiping = t3.handleThumbnailSwiping.bind(ke(t3)), t3.handleOnThumbnailSwiped = t3.handleOnThumbnailSwiped.bind(ke(t3)), t3.onThumbnailMouseLeave = t3.onThumbnailMouseLeave.bind(ke(t3)), t3.handleImageError = t3.handleImageError.bind(ke(t3)), t3.pauseOrPlay = t3.pauseOrPlay.bind(ke(t3)), t3.renderThumbInner = t3.renderThumbInner.bind(ke(t3)), t3.renderItem = t3.renderItem.bind(ke(t3)), t3.slideLeft = t3.slideLeft.bind(ke(t3)), t3.slideRight = t3.slideRight.bind(ke(t3)), t3.toggleFullScreen = t3.toggleFullScreen.bind(ke(t3)), t3.togglePlay = t3.togglePlay.bind(ke(t3)), t3.unthrottledSlideToIndex = t3.slideToIndex, t3.slideToIndex = L(t3.unthrottledSlideToIndex, e4.slideDuration, { trailing: false }), e4.lazyLoad && (t3.lazyLoaded = []), t3;
            }
            return n3 = l2, i2 = [{ key: "componentDidMount", value: function() {
              var e4 = this.props, t3 = e4.autoPlay, n4 = e4.useWindowKeyDown;
              t3 && this.play(), n4 ? window.addEventListener("keydown", this.handleKeyDown) : this.imageGallery.current.addEventListener("keydown", this.handleKeyDown), window.addEventListener("mousedown", this.handleMouseDown), window.addEventListener("touchmove", this.handleTouchMove, { passive: false }), this.initSlideWrapperResizeObserver(this.imageGallerySlideWrapper), this.initThumbnailWrapperResizeObserver(this.thumbnailsWrapper), this.addScreenChangeEvent();
            } }, { key: "componentDidUpdate", value: function(e4, t3) {
              var n4 = this.props, i3 = n4.items, r3 = n4.lazyLoad, a2 = n4.slideDuration, s3 = n4.slideInterval, o3 = n4.startIndex, l3 = n4.thumbnailPosition, u2 = n4.showThumbnails, c2 = n4.useWindowKeyDown, h2 = this.state, d2 = h2.currentIndex, f2 = h2.isPlaying, p2 = e4.items.length !== i3.length, m2 = !M()(e4.items, i3), g2 = e4.startIndex !== o3, v2 = e4.thumbnailPosition !== l3, b2 = e4.showThumbnails !== u2;
              s3 === e4.slideInterval && a2 === e4.slideDuration || f2 && (this.pause(), this.play()), v2 && (this.removeResizeObserver(), this.initSlideWrapperResizeObserver(this.imageGallerySlideWrapper), this.initThumbnailWrapperResizeObserver(this.thumbnailsWrapper)), b2 && u2 && this.initThumbnailWrapperResizeObserver(this.thumbnailsWrapper), b2 && !u2 && this.removeThumbnailsResizeObserver(), (p2 || b2) && this.handleResize(), t3.currentIndex !== d2 && this.slideThumbnailBar(), e4.slideDuration !== a2 && (this.slideToIndex = L(this.unthrottledSlideToIndex, a2, { trailing: false })), !r3 || e4.lazyLoad && !m2 || (this.lazyLoaded = []), c2 !== e4.useWindowKeyDown && (c2 ? (this.imageGallery.current.removeEventListener("keydown", this.handleKeyDown), window.addEventListener("keydown", this.handleKeyDown)) : (window.removeEventListener("keydown", this.handleKeyDown), this.imageGallery.current.addEventListener("keydown", this.handleKeyDown))), (g2 || m2) && this.setState({ currentIndex: o3, slideStyle: { transition: "none" } });
            } }, { key: "componentWillUnmount", value: function() {
              var e4 = this.props.useWindowKeyDown;
              window.removeEventListener("mousedown", this.handleMouseDown), window.removeEventListener("touchmove", this.handleTouchMove), this.removeScreenChangeEvent(), this.removeResizeObserver(), this.playPauseIntervalId && (window.clearInterval(this.playPauseIntervalId), this.playPauseIntervalId = null), this.transitionTimer && window.clearTimeout(this.transitionTimer), e4 ? window.removeEventListener("keydown", this.handleKeyDown) : this.imageGallery.current.removeEventListener("keydown", this.handleKeyDown);
            } }, { key: "onSliding", value: function() {
              var e4 = this, t3 = this.state, n4 = t3.currentIndex, i3 = t3.isTransitioning, r3 = this.props, a2 = r3.onSlide, s3 = r3.slideDuration;
              this.transitionTimer = window.setTimeout(function() {
                i3 && (e4.setState({ isTransitioning: !i3, isSwipingThumbnail: false }), a2 && a2(n4));
              }, s3 + 50);
            } }, { key: "onThumbnailClick", value: function(e4, t3) {
              var n4 = this.props.onThumbnailClick;
              e4.target.parentNode.parentNode.blur(), this.slideToIndex(t3, e4), n4 && n4(e4, t3);
            } }, { key: "onThumbnailMouseOver", value: function(e4, t3) {
              var n4 = this;
              this.thumbnailMouseOverTimer && (window.clearTimeout(this.thumbnailMouseOverTimer), this.thumbnailMouseOverTimer = null), this.thumbnailMouseOverTimer = window.setTimeout(function() {
                n4.slideToIndex(t3), n4.pause();
              }, 300);
            } }, { key: "onThumbnailMouseLeave", value: function() {
              if (this.thumbnailMouseOverTimer) {
                var e4 = this.props.autoPlay;
                window.clearTimeout(this.thumbnailMouseOverTimer), this.thumbnailMouseOverTimer = null, e4 && this.play();
              }
            } }, { key: "setThumbsTranslate", value: function(e4) {
              this.setState({ thumbsTranslate: e4 });
            } }, { key: "setModalFullscreen", value: function(e4) {
              var t3 = this.props.onScreenChange;
              this.setState({ modalFullscreen: e4 }), t3 && t3(e4);
            } }, { key: "getThumbsTranslate", value: function(e4) {
              var t3, n4 = this.props, i3 = n4.disableThumbnailScroll, r3 = n4.items, a2 = this.state, s3 = a2.thumbnailsWrapperWidth, o3 = a2.thumbnailsWrapperHeight, l3 = this.thumbnails && this.thumbnails.current;
              if (i3)
                return 0;
              if (l3) {
                if (this.isThumbnailVertical()) {
                  if (l3.scrollHeight <= o3)
                    return 0;
                  t3 = l3.scrollHeight - o3;
                } else {
                  if (l3.scrollWidth <= s3 || s3 <= 0)
                    return 0;
                  t3 = l3.scrollWidth - s3;
                }
                return e4 * (t3 / (r3.length - 1));
              }
              return 0;
            } }, { key: "getThumbnailPositionClassName", value: function(e4) {
              switch (e4) {
                case "left":
                  e4 = " ".concat("image-gallery-thumbnails-left");
                  break;
                case "right":
                  e4 = " ".concat("image-gallery-thumbnails-right");
                  break;
                case "bottom":
                  e4 = " ".concat("image-gallery-thumbnails-bottom");
                  break;
                case "top":
                  e4 = " ".concat("image-gallery-thumbnails-top");
              }
              return e4;
            } }, { key: "getAlignmentClassName", value: function(e4) {
              var t3 = this.state.currentIndex, n4 = this.props, i3 = n4.infinite, r3 = n4.items, a2 = "", s3 = "image-gallery-left", o3 = "image-gallery-right";
              switch (e4) {
                case t3 - 1:
                  a2 = " ".concat(s3);
                  break;
                case t3:
                  a2 = " ".concat("image-gallery-center");
                  break;
                case t3 + 1:
                  a2 = " ".concat(o3);
              }
              return r3.length >= 3 && i3 && (0 === e4 && t3 === r3.length - 1 ? a2 = " ".concat(o3) : e4 === r3.length - 1 && 0 === t3 && (a2 = " ".concat(s3))), a2;
            } }, { key: "getTranslateXForTwoSlide", value: function(e4) {
              var t3 = this.state, n4 = t3.currentIndex, i3 = t3.currentSlideOffset, r3 = t3.previousIndex, a2 = n4 !== r3, s3 = 0 === e4 && 0 === r3, o3 = 1 === e4 && 1 === r3, l3 = 0 === e4 && 1 === n4, u2 = 1 === e4 && 0 === n4, c2 = 0 === i3, h2 = -100 * n4 + 100 * e4 + i3;
              return i3 > 0 ? this.direction = "left" : i3 < 0 && (this.direction = "right"), u2 && i3 > 0 && (h2 = -100 + i3), l3 && i3 < 0 && (h2 = 100 + i3), a2 ? s3 && c2 && "left" === this.direction ? h2 = 100 : o3 && c2 && "right" === this.direction && (h2 = -100) : (u2 && c2 && "left" === this.direction && (h2 = -100), l3 && c2 && "right" === this.direction && (h2 = 100)), h2;
            } }, { key: "getThumbnailBarHeight", value: function() {
              return this.isThumbnailVertical() ? { height: this.state.gallerySlideWrapperHeight } : {};
            } }, { key: "getSlideStyle", value: function(e4) {
              var t3 = this.state, n4 = t3.currentIndex, i3 = t3.currentSlideOffset, r3 = t3.slideStyle, a2 = this.props, s3 = a2.infinite, o3 = a2.items, l3 = a2.useTranslate3D, u2 = a2.isRTL, c2 = -100 * n4, h2 = o3.length - 1, d2 = (c2 + 100 * e4) * (u2 ? -1 : 1) + i3;
              s3 && o3.length > 2 && (0 === n4 && e4 === h2 ? d2 = -100 * (u2 ? -1 : 1) + i3 : n4 === h2 && 0 === e4 && (d2 = 100 * (u2 ? -1 : 1) + i3)), s3 && 2 === o3.length && (d2 = this.getTranslateXForTwoSlide(e4));
              var f2 = "translate(".concat(d2, "%, 0)");
              return l3 && (f2 = "translate3d(".concat(d2, "%, 0, 0)")), we({ display: this.isSlideVisible(e4) ? "inherit" : "none", WebkitTransform: f2, MozTransform: f2, msTransform: f2, OTransform: f2, transform: f2 }, r3);
            } }, { key: "getCurrentIndex", value: function() {
              return this.state.currentIndex;
            } }, { key: "getThumbnailStyle", value: function() {
              var e4, t3 = this.props, n4 = t3.useTranslate3D, i3 = t3.isRTL, r3 = this.state, a2 = r3.thumbsTranslate, s3 = r3.thumbsStyle, o3 = i3 ? -1 * a2 : a2;
              return this.isThumbnailVertical() ? (e4 = "translate(0, ".concat(a2, "px)"), n4 && (e4 = "translate3d(0, ".concat(a2, "px, 0)"))) : (e4 = "translate(".concat(o3, "px, 0)"), n4 && (e4 = "translate3d(".concat(o3, "px, 0, 0)"))), we({ WebkitTransform: e4, MozTransform: e4, msTransform: e4, OTransform: e4, transform: e4 }, s3);
            } }, { key: "getSlideItems", value: function() {
              var e4 = this, n4 = this.state.currentIndex, i3 = this.props, r3 = i3.items, s3 = i3.slideOnThumbnailOver, o3 = i3.onClick, l3 = i3.lazyLoad, u2 = i3.onTouchMove, c2 = i3.onTouchEnd, h2 = i3.onTouchStart, d2 = i3.onMouseOver, f2 = i3.onMouseLeave, p2 = i3.renderItem, m2 = i3.renderThumbInner, g2 = i3.showThumbnails, v2 = i3.showBullets, b2 = [], y2 = [], w2 = [];
              return r3.forEach(function(i4, r4) {
                var T2 = e4.getAlignmentClassName(r4), S2 = i4.originalClass ? " ".concat(i4.originalClass) : "", O2 = i4.thumbnailClass ? " ".concat(i4.thumbnailClass) : "", E2 = i4.renderItem || p2 || e4.renderItem, k2 = i4.renderThumbInner || m2 || e4.renderThumbInner, I2 = !l3 || T2 || e4.lazyLoaded[r4];
                I2 && l3 && !e4.lazyLoaded[r4] && (e4.lazyLoaded[r4] = true);
                var x2 = e4.getSlideStyle(r4), _2 = a().createElement("div", { "aria-label": "Go to Slide ".concat(r4 + 1), key: "slide-".concat(r4), tabIndex: "-1", className: "image-gallery-slide ".concat(T2, " ").concat(S2), style: x2, onClick: o3, onKeyUp: e4.handleSlideKeyUp, onTouchMove: u2, onTouchEnd: c2, onTouchStart: h2, onMouseOver: d2, onFocus: d2, onMouseLeave: f2, role: "button" }, I2 ? E2(i4) : a().createElement("div", { style: { height: "100%" } }));
                if (b2.push(_2), g2 && i4.thumbnail) {
                  var R2 = t2("image-gallery-thumbnail", O2, { active: n4 === r4 });
                  y2.push(a().createElement("button", { key: "thumbnail-".concat(r4), type: "button", tabIndex: "0", "aria-pressed": n4 === r4 ? "true" : "false", "aria-label": "Go to Slide ".concat(r4 + 1), className: R2, onMouseLeave: s3 ? e4.onThumbnailMouseLeave : null, onMouseOver: function(t3) {
                    return e4.handleThumbnailMouseOver(t3, r4);
                  }, onFocus: function(t3) {
                    return e4.handleThumbnailMouseOver(t3, r4);
                  }, onKeyUp: function(t3) {
                    return e4.handleThumbnailKeyUp(t3, r4);
                  }, onClick: function(t3) {
                    return e4.onThumbnailClick(t3, r4);
                  } }, k2(i4)));
                }
                if (v2) {
                  var L2 = t2("image-gallery-bullet", i4.bulletClass, { active: n4 === r4 });
                  w2.push(a().createElement("button", { type: "button", key: "bullet-".concat(r4), className: L2, onClick: function(t3) {
                    return i4.bulletOnClick && i4.bulletOnClick({ item: i4, itemIndex: r4, currentIndex: n4 }), t3.target.blur(), e4.slideToIndex.call(e4, r4, t3);
                  }, "aria-pressed": n4 === r4 ? "true" : "false", "aria-label": "Go to Slide ".concat(r4 + 1) }));
                }
              }), { slides: b2, thumbnails: y2, bullets: w2 };
            } }, { key: "ignoreIsTransitioning", value: function() {
              var e4 = this.props.items, t3 = this.state, n4 = t3.previousIndex, i3 = t3.currentIndex, r3 = e4.length - 1;
              return Math.abs(n4 - i3) > 1 && !(0 === n4 && i3 === r3) && !(n4 === r3 && 0 === i3);
            } }, { key: "isFirstOrLastSlide", value: function(e4) {
              return e4 === this.props.items.length - 1 || 0 === e4;
            } }, { key: "slideIsTransitioning", value: function(e4) {
              var t3 = this.state, n4 = t3.isTransitioning, i3 = t3.previousIndex, r3 = t3.currentIndex;
              return n4 && !(e4 === i3 || e4 === r3);
            } }, { key: "isSlideVisible", value: function(e4) {
              return !this.slideIsTransitioning(e4) || this.ignoreIsTransitioning() && !this.isFirstOrLastSlide(e4);
            } }, { key: "slideThumbnailBar", value: function() {
              var e4 = this.state, t3 = e4.currentIndex, n4 = e4.isSwipingThumbnail, i3 = -this.getThumbsTranslate(t3);
              n4 || (0 === t3 ? this.setState({ thumbsTranslate: 0, thumbsSwipedTranslate: 0 }) : this.setState({ thumbsTranslate: i3, thumbsSwipedTranslate: i3 }));
            } }, { key: "canSlide", value: function() {
              return this.props.items.length >= 2;
            } }, { key: "canSlideLeft", value: function() {
              var e4 = this.props, t3 = e4.infinite, n4 = e4.isRTL;
              return t3 || (n4 ? this.canSlideNext() : this.canSlidePrevious());
            } }, { key: "canSlideRight", value: function() {
              var e4 = this.props, t3 = e4.infinite, n4 = e4.isRTL;
              return t3 || (n4 ? this.canSlidePrevious() : this.canSlideNext());
            } }, { key: "canSlidePrevious", value: function() {
              return this.state.currentIndex > 0;
            } }, { key: "canSlideNext", value: function() {
              return this.state.currentIndex < this.props.items.length - 1;
            } }, { key: "handleSwiping", value: function(e4) {
              var t3 = e4.event, n4 = e4.absX, i3 = e4.dir, r3 = this.props, a2 = r3.disableSwipe, s3 = r3.stopPropagation, o3 = this.state, l3 = o3.galleryWidth, u2 = o3.isTransitioning, c2 = o3.swipingUpDown, h2 = o3.swipingLeftRight;
              if (i3 !== ee.UP && i3 !== ee.DOWN && !c2 || h2) {
                if (i3 !== ee.LEFT && i3 !== ee.RIGHT || h2 || this.setState({ swipingLeftRight: true }), !a2) {
                  var d2 = this.props.swipingTransitionDuration;
                  if (s3 && t3.preventDefault(), u2)
                    this.setState({ currentSlideOffset: 0 });
                  else {
                    var f2 = i3 === ee.RIGHT ? 1 : -1, p2 = n4 / l3 * 100;
                    Math.abs(p2) >= 100 && (p2 = 100);
                    var m2 = { transition: "transform ".concat(d2, "ms ease-out") };
                    this.setState({ currentSlideOffset: f2 * p2, slideStyle: m2 });
                  }
                }
              } else
                c2 || this.setState({ swipingUpDown: true });
            } }, { key: "handleThumbnailSwiping", value: function(e4) {
              var t3 = e4.event, n4 = e4.absX, i3 = e4.absY, r3 = e4.dir, a2 = this.props, s3 = a2.stopPropagation, o3 = a2.swipingThumbnailTransitionDuration, l3 = this.state, u2 = l3.thumbsSwipedTranslate, c2 = l3.thumbnailsWrapperHeight, h2 = l3.thumbnailsWrapperWidth, d2 = l3.swipingUpDown, f2 = l3.swipingLeftRight;
              if (this.isThumbnailVertical()) {
                if ((r3 === ee.LEFT || r3 === ee.RIGHT || f2) && !d2)
                  return void (f2 || this.setState({ swipingLeftRight: true }));
                r3 !== ee.UP && r3 !== ee.DOWN || d2 || this.setState({ swipingUpDown: true });
              } else {
                if ((r3 === ee.UP || r3 === ee.DOWN || d2) && !f2)
                  return void (d2 || this.setState({ swipingUpDown: true }));
                r3 !== ee.LEFT && r3 !== ee.RIGHT || f2 || this.setState({ swipingLeftRight: true });
              }
              var p2, m2, g2, v2, b2, y2 = this.thumbnails && this.thumbnails.current;
              if (this.isThumbnailVertical() ? (p2 = u2 + (r3 === ee.DOWN ? i3 : -i3), m2 = y2.scrollHeight - c2 + 20, g2 = Math.abs(p2) > m2, v2 = p2 > 20, b2 = y2.scrollHeight <= c2) : (p2 = u2 + (r3 === ee.RIGHT ? n4 : -n4), m2 = y2.scrollWidth - h2 + 20, g2 = Math.abs(p2) > m2, v2 = p2 > 20, b2 = y2.scrollWidth <= h2), !b2 && (r3 !== ee.LEFT && r3 !== ee.UP || !g2) && (r3 !== ee.RIGHT && r3 !== ee.DOWN || !v2)) {
                s3 && t3.stopPropagation();
                var w2 = { transition: "transform ".concat(o3, "ms ease-out") };
                this.setState({ thumbsTranslate: p2, thumbsStyle: w2 });
              }
            } }, { key: "handleOnThumbnailSwiped", value: function() {
              var e4 = this.state.thumbsTranslate, t3 = this.props.slideDuration;
              this.resetSwipingDirection(), this.setState({ isSwipingThumbnail: true, thumbsSwipedTranslate: e4, thumbsStyle: { transition: "all ".concat(t3, "ms ease-out") } });
            } }, { key: "sufficientSwipe", value: function() {
              var e4 = this.state.currentSlideOffset, t3 = this.props.swipeThreshold;
              return Math.abs(e4) > t3;
            } }, { key: "resetSwipingDirection", value: function() {
              var e4 = this.state, t3 = e4.swipingUpDown, n4 = e4.swipingLeftRight;
              t3 && this.setState({ swipingUpDown: false }), n4 && this.setState({ swipingLeftRight: false });
            } }, { key: "handleOnSwiped", value: function(e4) {
              var t3 = e4.event, n4 = e4.dir, i3 = e4.velocity, r3 = this.props, a2 = r3.disableSwipe, s3 = r3.stopPropagation, o3 = r3.flickThreshold;
              if (!a2) {
                var l3 = this.props.isRTL;
                s3 && t3.stopPropagation(), this.resetSwipingDirection();
                var u2 = (n4 === ee.LEFT ? 1 : -1) * (l3 ? -1 : 1), c2 = n4 === ee.UP || n4 === ee.DOWN, h2 = i3 > o3 && !c2;
                this.handleOnSwipedTo(u2, h2);
              }
            } }, { key: "handleOnSwipedTo", value: function(e4, t3) {
              var n4 = this.state, i3 = n4.currentIndex, r3 = n4.isTransitioning, a2 = i3;
              !this.sufficientSwipe() && !t3 || r3 || (a2 += e4), (-1 === e4 && !this.canSlideLeft() || 1 === e4 && !this.canSlideRight()) && (a2 = i3), this.unthrottledSlideToIndex(a2);
            } }, { key: "handleTouchMove", value: function(e4) {
              this.state.swipingLeftRight && e4.preventDefault();
            } }, { key: "handleMouseDown", value: function() {
              this.imageGallery.current.classList.add("image-gallery-using-mouse");
            } }, { key: "handleKeyDown", value: function(e4) {
              var t3 = this.props, n4 = t3.disableKeyDown, i3 = t3.useBrowserFullscreen, r3 = this.state.isFullscreen;
              if (this.imageGallery.current.classList.remove("image-gallery-using-mouse"), !n4)
                switch (parseInt(e4.keyCode || e4.which || 0, 10)) {
                  case 37:
                    this.canSlideLeft() && !this.playPauseIntervalId && this.slideLeft(e4);
                    break;
                  case 39:
                    this.canSlideRight() && !this.playPauseIntervalId && this.slideRight(e4);
                    break;
                  case 27:
                    r3 && !i3 && this.exitFullScreen();
                }
            } }, { key: "handleImageError", value: function(e4) {
              var t3 = this.props.onErrorImageURL;
              t3 && -1 === e4.target.src.indexOf(t3) && (e4.target.src = t3);
            } }, { key: "removeThumbnailsResizeObserver", value: function() {
              this.resizeThumbnailWrapperObserver && this.thumbnailsWrapper && this.thumbnailsWrapper.current && (this.resizeThumbnailWrapperObserver.unobserve(this.thumbnailsWrapper.current), this.resizeThumbnailWrapperObserver = null);
            } }, { key: "removeResizeObserver", value: function() {
              this.resizeSlideWrapperObserver && this.imageGallerySlideWrapper && this.imageGallerySlideWrapper.current && (this.resizeSlideWrapperObserver.unobserve(this.imageGallerySlideWrapper.current), this.resizeSlideWrapperObserver = null), this.removeThumbnailsResizeObserver();
            } }, { key: "handleResize", value: function() {
              var e4 = this.state.currentIndex;
              this.imageGallery && (this.imageGallery && this.imageGallery.current && this.setState({ galleryWidth: this.imageGallery.current.offsetWidth }), this.imageGallerySlideWrapper && this.imageGallerySlideWrapper.current && this.setState({ gallerySlideWrapperHeight: this.imageGallerySlideWrapper.current.offsetHeight }), this.setThumbsTranslate(-this.getThumbsTranslate(e4)));
            } }, { key: "initSlideWrapperResizeObserver", value: function(e4) {
              var t3 = this;
              e4 && !e4.current || (this.resizeSlideWrapperObserver = new Z(R(function(e5) {
                e5 && e5.forEach(function(e6) {
                  t3.setState({ thumbnailsWrapperWidth: e6.contentRect.width }, t3.handleResize);
                });
              }, 50)), this.resizeSlideWrapperObserver.observe(e4.current));
            } }, { key: "initThumbnailWrapperResizeObserver", value: function(e4) {
              var t3 = this;
              e4 && !e4.current || (this.resizeThumbnailWrapperObserver = new Z(R(function(e5) {
                e5 && e5.forEach(function(e6) {
                  t3.setState({ thumbnailsWrapperHeight: e6.contentRect.height }, t3.handleResize);
                });
              }, 50)), this.resizeThumbnailWrapperObserver.observe(e4.current));
            } }, { key: "toggleFullScreen", value: function() {
              this.state.isFullscreen ? this.exitFullScreen() : this.fullScreen();
            } }, { key: "togglePlay", value: function() {
              this.playPauseIntervalId ? this.pause() : this.play();
            } }, { key: "handleScreenChange", value: function() {
              var e4 = this.props, t3 = e4.onScreenChange, n4 = e4.useBrowserFullscreen, i3 = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement, r3 = this.imageGallery.current === i3;
              t3 && t3(r3), n4 && this.setState({ isFullscreen: r3 });
            } }, { key: "slideToIndex", value: function(e4, t3) {
              var n4 = this.state, i3 = n4.currentIndex, r3 = n4.isTransitioning, a2 = this.props, s3 = a2.items, o3 = a2.slideDuration, l3 = a2.onBeforeSlide;
              if (!r3) {
                t3 && this.playPauseIntervalId && (this.pause(false), this.play(false));
                var u2 = s3.length - 1, c2 = e4;
                e4 < 0 ? c2 = u2 : e4 > u2 && (c2 = 0), l3 && c2 !== i3 && l3(c2), this.setState({ previousIndex: i3, currentIndex: c2, isTransitioning: c2 !== i3, currentSlideOffset: 0, slideStyle: { transition: "all ".concat(o3, "ms ease-out") } }, this.onSliding);
              }
            } }, { key: "slideLeft", value: function(e4) {
              var t3 = this.props.isRTL;
              this.slideTo(e4, t3 ? "right" : "left");
            } }, { key: "slideRight", value: function(e4) {
              var t3 = this.props.isRTL;
              this.slideTo(e4, t3 ? "left" : "right");
            } }, { key: "slideTo", value: function(e4, t3) {
              var n4 = this, i3 = this.state, r3 = i3.currentIndex, a2 = i3.currentSlideOffset, s3 = i3.isTransitioning, o3 = this.props.items, l3 = r3 + ("left" === t3 ? -1 : 1);
              s3 || (2 === o3.length ? this.setState({ currentSlideOffset: a2 + ("left" === t3 ? 1e-3 : -1e-3), slideStyle: { transition: "none" } }, function() {
                window.setTimeout(function() {
                  return n4.slideToIndex(l3, e4);
                }, 25);
              }) : this.slideToIndex(l3, e4));
            } }, { key: "handleThumbnailMouseOver", value: function(e4, t3) {
              this.props.slideOnThumbnailOver && this.onThumbnailMouseOver(e4, t3);
            } }, { key: "handleThumbnailKeyUp", value: function(e4, t3) {
              Re(e4) && this.onThumbnailClick(e4, t3);
            } }, { key: "handleSlideKeyUp", value: function(e4) {
              Re(e4) && (0, this.props.onClick)(e4);
            } }, { key: "isThumbnailVertical", value: function() {
              var e4 = this.props.thumbnailPosition;
              return "left" === e4 || "right" === e4;
            } }, { key: "addScreenChangeEvent", value: function() {
              var e4 = this;
              xe.forEach(function(t3) {
                document.addEventListener(t3, e4.handleScreenChange);
              });
            } }, { key: "removeScreenChangeEvent", value: function() {
              var e4 = this;
              xe.forEach(function(t3) {
                document.removeEventListener(t3, e4.handleScreenChange);
              });
            } }, { key: "fullScreen", value: function() {
              var e4 = this.props.useBrowserFullscreen, t3 = this.imageGallery.current;
              e4 ? t3.requestFullscreen ? t3.requestFullscreen() : t3.msRequestFullscreen ? t3.msRequestFullscreen() : t3.mozRequestFullScreen ? t3.mozRequestFullScreen() : t3.webkitRequestFullscreen ? t3.webkitRequestFullscreen() : this.setModalFullscreen(true) : this.setModalFullscreen(true), this.setState({ isFullscreen: true });
            } }, { key: "exitFullScreen", value: function() {
              var e4 = this.state.isFullscreen, t3 = this.props.useBrowserFullscreen;
              e4 && (t3 ? document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : this.setModalFullscreen(false) : this.setModalFullscreen(false), this.setState({ isFullscreen: false }));
            } }, { key: "pauseOrPlay", value: function() {
              var e4 = this.props.infinite, t3 = this.state.currentIndex;
              e4 || this.canSlideRight() ? this.slideToIndex(t3 + 1) : this.pause();
            } }, { key: "play", value: function() {
              var e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t3 = this.props, n4 = t3.onPlay, i3 = t3.slideInterval, r3 = t3.slideDuration, a2 = this.state.currentIndex;
              this.playPauseIntervalId || (this.setState({ isPlaying: true }), this.playPauseIntervalId = window.setInterval(this.pauseOrPlay, Math.max(i3, r3)), n4 && e4 && n4(a2));
            } }, { key: "pause", value: function() {
              var e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t3 = this.props.onPause, n4 = this.state.currentIndex;
              this.playPauseIntervalId && (window.clearInterval(this.playPauseIntervalId), this.playPauseIntervalId = null, this.setState({ isPlaying: false }), t3 && e4 && t3(n4));
            } }, { key: "isImageLoaded", value: function(e4) {
              return !!this.loadedImages[e4.original] || (this.loadedImages[e4.original] = true, false);
            } }, { key: "handleImageLoaded", value: function(e4, t3) {
              var n4 = this.props.onImageLoad;
              !this.loadedImages[t3] && n4 && (this.loadedImages[t3] = true, n4(e4));
            } }, { key: "renderItem", value: function(e4) {
              var t3 = this.state.isFullscreen, n4 = this.props.onImageError || this.handleImageError;
              return a().createElement(ie, { description: e4.description, fullscreen: e4.fullscreen, handleImageLoaded: this.handleImageLoaded, isFullscreen: t3, onImageError: n4, original: e4.original, originalAlt: e4.originalAlt, originalHeight: e4.originalHeight, originalWidth: e4.originalWidth, originalTitle: e4.originalTitle, sizes: e4.sizes, loading: e4.loading, srcSet: e4.srcSet });
            } }, { key: "renderThumbInner", value: function(e4) {
              var t3 = this.props.onThumbnailError || this.handleImageError;
              return a().createElement("span", { className: "image-gallery-thumbnail-inner" }, a().createElement("img", { className: "image-gallery-thumbnail-image", src: e4.thumbnail, height: e4.thumbnailHeight, width: e4.thumbnailWidth, alt: e4.thumbnailAlt, title: e4.thumbnailTitle, loading: e4.thumbnailLoading, onError: t3 }), e4.thumbnailLabel && a().createElement("div", { className: "image-gallery-thumbnail-label" }, e4.thumbnailLabel));
            } }, { key: "render", value: function() {
              var e4 = this.state, n4 = e4.currentIndex, i3 = e4.isFullscreen, r3 = e4.modalFullscreen, s3 = e4.isPlaying, o3 = this.props, l3 = o3.additionalClass, u2 = o3.disableThumbnailSwipe, c2 = o3.indexSeparator, h2 = o3.isRTL, d2 = o3.items, f2 = o3.thumbnailPosition, p2 = o3.renderFullscreenButton, m2 = o3.renderCustomControls, g2 = o3.renderLeftNav, v2 = o3.renderRightNav, b2 = o3.showBullets, y2 = o3.showFullscreenButton, w2 = o3.showIndex, T2 = o3.showThumbnails, S2 = o3.showNav, O2 = o3.showPlayButton, E2 = o3.renderPlayPauseButton, k2 = this.getThumbnailStyle(), I2 = this.getSlideItems(), x2 = I2.slides, _2 = I2.thumbnails, R2 = I2.bullets, L2 = t2("image-gallery-slide-wrapper", this.getThumbnailPositionClassName(f2), { "image-gallery-rtl": h2 }), P2 = a().createElement("div", { ref: this.imageGallerySlideWrapper, className: L2 }, m2 && m2(), this.canSlide() ? a().createElement(a().Fragment, null, S2 && a().createElement(a().Fragment, null, g2(this.slideLeft, !this.canSlideLeft()), v2(this.slideRight, !this.canSlideRight())), a().createElement(ve, { className: "image-gallery-swipe", delta: 0, onSwiping: this.handleSwiping, onSwiped: this.handleOnSwiped }, a().createElement("div", { className: "image-gallery-slides" }, x2))) : a().createElement("div", { className: "image-gallery-slides" }, x2), O2 && E2(this.togglePlay, s3), b2 && a().createElement("div", { className: "image-gallery-bullets" }, a().createElement("div", { className: "image-gallery-bullets-container", role: "navigation", "aria-label": "Bullet Navigation" }, R2)), y2 && p2(this.toggleFullScreen, i3), w2 && a().createElement("div", { className: "image-gallery-index" }, a().createElement("span", { className: "image-gallery-index-current" }, n4 + 1), a().createElement("span", { className: "image-gallery-index-separator" }, c2), a().createElement("span", { className: "image-gallery-index-total" }, d2.length))), M2 = t2("image-gallery", l3, { "fullscreen-modal": r3 }), W2 = t2("image-gallery-content", this.getThumbnailPositionClassName(f2), { fullscreen: i3 }), D2 = t2("image-gallery-thumbnails-wrapper", this.getThumbnailPositionClassName(f2), { "thumbnails-wrapper-rtl": !this.isThumbnailVertical() && h2 }, { "thumbnails-swipe-horizontal": !this.isThumbnailVertical() && !u2 }, { "thumbnails-swipe-vertical": this.isThumbnailVertical() && !u2 });
              return a().createElement("div", { ref: this.imageGallery, className: M2, "aria-live": "polite" }, a().createElement("div", { className: W2 }, ("bottom" === f2 || "right" === f2) && P2, T2 && _2.length > 0 ? a().createElement(ve, { className: D2, delta: 0, onSwiping: !u2 && this.handleThumbnailSwiping, onSwiped: !u2 && this.handleOnThumbnailSwiped }, a().createElement("div", { className: "image-gallery-thumbnails", ref: this.thumbnailsWrapper, style: this.getThumbnailBarHeight() }, a().createElement("nav", { ref: this.thumbnails, className: "image-gallery-thumbnails-container", style: k2, "aria-label": "Thumbnail Navigation" }, _2))) : null, ("top" === f2 || "left" === f2) && P2));
            } }], i2 && Se(n3.prototype, i2), l2;
          }(a().Component);
          Le.propTypes = { flickThreshold: te.number, items: (0, te.arrayOf)((0, te.shape)({ bulletClass: te.string, bulletOnClick: te.func, description: te.string, original: te.string, originalHeight: te.number, originalWidth: te.number, loading: te.string, thumbnailHeight: te.number, thumbnailWidth: te.number, thumbnailLoading: te.string, fullscreen: te.string, originalAlt: te.string, originalTitle: te.string, thumbnail: te.string, thumbnailAlt: te.string, thumbnailLabel: te.string, thumbnailTitle: te.string, originalClass: te.string, thumbnailClass: te.string, renderItem: te.func, renderThumbInner: te.func, imageSet: _e, srcSet: te.string, sizes: te.string })).isRequired, showNav: te.bool, autoPlay: te.bool, lazyLoad: te.bool, infinite: te.bool, showIndex: te.bool, showBullets: te.bool, showThumbnails: te.bool, showPlayButton: te.bool, showFullscreenButton: te.bool, disableThumbnailScroll: te.bool, disableKeyDown: te.bool, disableSwipe: te.bool, disableThumbnailSwipe: te.bool, useBrowserFullscreen: te.bool, onErrorImageURL: te.string, indexSeparator: te.string, thumbnailPosition: (0, te.oneOf)(["top", "bottom", "left", "right"]), startIndex: te.number, slideDuration: te.number, slideInterval: te.number, slideOnThumbnailOver: te.bool, swipeThreshold: te.number, swipingTransitionDuration: te.number, swipingThumbnailTransitionDuration: te.number, onSlide: te.func, onBeforeSlide: te.func, onScreenChange: te.func, onPause: te.func, onPlay: te.func, onClick: te.func, onImageLoad: te.func, onImageError: te.func, onTouchMove: te.func, onTouchEnd: te.func, onTouchStart: te.func, onMouseOver: te.func, onMouseLeave: te.func, onThumbnailError: te.func, onThumbnailClick: te.func, renderCustomControls: te.func, renderLeftNav: te.func, renderRightNav: te.func, renderPlayPauseButton: te.func, renderFullscreenButton: te.func, renderItem: te.func, renderThumbInner: te.func, stopPropagation: te.bool, additionalClass: te.string, useTranslate3D: te.bool, isRTL: te.bool, useWindowKeyDown: te.bool }, Le.defaultProps = { onErrorImageURL: "", additionalClass: "", showNav: true, autoPlay: false, lazyLoad: false, infinite: true, showIndex: false, showBullets: false, showThumbnails: true, showPlayButton: true, showFullscreenButton: true, disableThumbnailScroll: false, disableKeyDown: false, disableSwipe: false, disableThumbnailSwipe: false, useTranslate3D: true, isRTL: false, useBrowserFullscreen: true, flickThreshold: 0.4, stopPropagation: false, indexSeparator: " / ", thumbnailPosition: "bottom", startIndex: 0, slideDuration: 450, swipingTransitionDuration: 0, swipingThumbnailTransitionDuration: 0, onSlide: null, onBeforeSlide: null, onScreenChange: null, onPause: null, onPlay: null, onClick: null, onImageLoad: null, onImageError: null, onTouchMove: null, onTouchEnd: null, onTouchStart: null, onMouseOver: null, onMouseLeave: null, onThumbnailError: null, onThumbnailClick: null, renderCustomControls: null, renderThumbInner: null, renderItem: null, slideInterval: 3e3, slideOnThumbnailOver: false, swipeThreshold: 30, renderLeftNav: function(e3, t3) {
            return a().createElement(ce, { onClick: e3, disabled: t3 });
          }, renderRightNav: function(e3, t3) {
            return a().createElement(de, { onClick: e3, disabled: t3 });
          }, renderPlayPauseButton: function(e3, t3) {
            return a().createElement(pe, { onClick: e3, isPlaying: t3 });
          }, renderFullscreenButton: function(e3, t3) {
            return a().createElement(le, { onClick: e3, isFullscreen: t3 });
          }, useWindowKeyDown: true };
          const Pe = Le;
        })(), r;
      })();
    });
  }
});
export default require_image_gallery();
//# sourceMappingURL=react-image-gallery.js.map
