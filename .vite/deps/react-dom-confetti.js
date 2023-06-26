import {
  require_react
} from "./chunk-LFTCFPAG.js";
import "./chunk-2W4G54A4.js";
import {
  __commonJS
} from "./chunk-LFBQMW2U.js";

// node_modules/dom-confetti/lib/main.js
var require_main = __commonJS({
  "node_modules/dom-confetti/lib/main.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.confetti = confetti;
    var defaultColors = ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"];
    function createElements(root, elementCount, colors, width, height) {
      return Array.from({ length: elementCount }).map(function(_, index) {
        var element = document.createElement("div");
        var color = colors[index % colors.length];
        element.style["background-color"] = color;
        element.style.width = width;
        element.style.height = height;
        element.style.position = "absolute";
        element.style.willChange = "transform, opacity";
        element.style.visibility = "hidden";
        root.appendChild(element);
        return element;
      });
    }
    function randomPhysics(angle, spread, startVelocity, random) {
      var radAngle = angle * (Math.PI / 180);
      var radSpread = spread * (Math.PI / 180);
      return {
        x: 0,
        y: 0,
        z: 0,
        wobble: random() * 10,
        wobbleSpeed: 0.1 + random() * 0.1,
        velocity: startVelocity * 0.5 + random() * startVelocity,
        angle2D: -radAngle + (0.5 * radSpread - random() * radSpread),
        angle3D: -(Math.PI / 4) + random() * (Math.PI / 2),
        tiltAngle: random() * Math.PI,
        tiltAngleSpeed: 0.1 + random() * 0.3
      };
    }
    function updateFetti(fetti, progress, dragFriction, decay) {
      fetti.physics.x += Math.cos(fetti.physics.angle2D) * fetti.physics.velocity;
      fetti.physics.y += Math.sin(fetti.physics.angle2D) * fetti.physics.velocity;
      fetti.physics.z += Math.sin(fetti.physics.angle3D) * fetti.physics.velocity;
      fetti.physics.wobble += fetti.physics.wobbleSpeed;
      if (decay) {
        fetti.physics.velocity *= decay;
      } else {
        fetti.physics.velocity -= fetti.physics.velocity * dragFriction;
      }
      fetti.physics.y += 3;
      fetti.physics.tiltAngle += fetti.physics.tiltAngleSpeed;
      var _fetti$physics = fetti.physics, x = _fetti$physics.x, y = _fetti$physics.y, z = _fetti$physics.z, tiltAngle = _fetti$physics.tiltAngle, wobble = _fetti$physics.wobble;
      var wobbleX = x + 10 * Math.cos(wobble);
      var wobbleY = y + 10 * Math.sin(wobble);
      var transform = "translate3d(" + wobbleX + "px, " + wobbleY + "px, " + z + "px) rotate3d(1, 1, 1, " + tiltAngle + "rad)";
      fetti.element.style.visibility = "visible";
      fetti.element.style.transform = transform;
      fetti.element.style.opacity = 1 - progress;
    }
    function animate(root, fettis, dragFriction, decay, duration, stagger) {
      var startTime = void 0;
      return new Promise(function(resolve) {
        function update(time) {
          if (!startTime)
            startTime = time;
          var elapsed = time - startTime;
          var progress = startTime === time ? 0 : (time - startTime) / duration;
          fettis.slice(0, Math.ceil(elapsed / stagger)).forEach(function(fetti) {
            updateFetti(fetti, progress, dragFriction, decay);
          });
          if (time - startTime < duration) {
            requestAnimationFrame(update);
          } else {
            fettis.forEach(function(fetti) {
              if (fetti.element.parentNode === root) {
                return root.removeChild(fetti.element);
              }
            });
            resolve();
          }
        }
        requestAnimationFrame(update);
      });
    }
    var defaults = {
      angle: 90,
      spread: 45,
      startVelocity: 45,
      elementCount: 50,
      width: "10px",
      height: "10px",
      perspective: "",
      colors: defaultColors,
      duration: 3e3,
      stagger: 0,
      dragFriction: 0.1,
      random: Math.random
    };
    function backwardPatch(config) {
      if (!config.stagger && config.delay) {
        config.stagger = config.delay;
      }
      return config;
    }
    function confetti(root) {
      var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var _Object$assign = Object.assign({}, defaults, backwardPatch(config)), elementCount = _Object$assign.elementCount, colors = _Object$assign.colors, width = _Object$assign.width, height = _Object$assign.height, perspective = _Object$assign.perspective, angle = _Object$assign.angle, spread = _Object$assign.spread, startVelocity = _Object$assign.startVelocity, decay = _Object$assign.decay, dragFriction = _Object$assign.dragFriction, duration = _Object$assign.duration, stagger = _Object$assign.stagger, random = _Object$assign.random;
      root.style.perspective = perspective;
      var elements = createElements(root, elementCount, colors, width, height);
      var fettis = elements.map(function(element) {
        return {
          element,
          physics: randomPhysics(angle, spread, startVelocity, random)
        };
      });
      return animate(root, fettis, dragFriction, decay, duration, stagger);
    }
  }
});

// node_modules/react-dom-confetti/lib/confetti.js
var require_confetti = __commonJS({
  "node_modules/react-dom-confetti/lib/confetti.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _domConfetti = require_main();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var style = {
      position: "relative"
    };
    var Confetti = function(_Component) {
      _inherits(Confetti2, _Component);
      function Confetti2(props) {
        _classCallCheck(this, Confetti2);
        var _this = _possibleConstructorReturn(this, (Confetti2.__proto__ || Object.getPrototypeOf(Confetti2)).call(this, props));
        _this.setRef = _this.setRef.bind(_this);
        return _this;
      }
      _createClass(Confetti2, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          if (!prevProps.active && this.props.active) {
            (0, _domConfetti.confetti)(this.container, this.props.config);
          }
        }
      }, {
        key: "setRef",
        value: function setRef(ref) {
          this.container = ref;
        }
      }, {
        key: "render",
        value: function render() {
          return _react2.default.createElement("div", { className: this.props.className, style, ref: this.setRef });
        }
      }]);
      return Confetti2;
    }(_react.Component);
    exports.default = Confetti;
  }
});
export default require_confetti();
//# sourceMappingURL=react-dom-confetti.js.map
