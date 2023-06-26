import {
  init_moment,
  moment_exports
} from "./chunk-7IFF7Y6I.js";
import {
  require_prop_types
} from "./chunk-OGQOAQW5.js";
import {
  require_react
} from "./chunk-LFTCFPAG.js";
import "./chunk-2W4G54A4.js";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-LFBQMW2U.js";

// node_modules/chart.js/dist/Chart.js
var require_Chart = __commonJS({
  "node_modules/chart.js/dist/Chart.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(function() {
        try {
          return init_moment(), __toCommonJS(moment_exports);
        } catch (e) {
        }
      }()) : typeof define === "function" && define.amd ? define(["require"], function(require2) {
        return factory(function() {
          try {
            return require2("moment");
          } catch (e) {
          }
        }());
      }) : (global2 = global2 || self, global2.Chart = factory(global2.moment));
    })(exports, function(moment) {
      "use strict";
      moment = moment && moment.hasOwnProperty("default") ? moment["default"] : moment;
      function createCommonjsModule(fn, module2) {
        return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
      }
      function getCjsExportFromNamespace(n) {
        return n && n["default"] || n;
      }
      var colorName = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
      var conversions = createCommonjsModule(function(module2) {
        var reverseKeywords = {};
        for (var key in colorName) {
          if (colorName.hasOwnProperty(key)) {
            reverseKeywords[colorName[key]] = key;
          }
        }
        var convert2 = module2.exports = {
          rgb: { channels: 3, labels: "rgb" },
          hsl: { channels: 3, labels: "hsl" },
          hsv: { channels: 3, labels: "hsv" },
          hwb: { channels: 3, labels: "hwb" },
          cmyk: { channels: 4, labels: "cmyk" },
          xyz: { channels: 3, labels: "xyz" },
          lab: { channels: 3, labels: "lab" },
          lch: { channels: 3, labels: "lch" },
          hex: { channels: 1, labels: ["hex"] },
          keyword: { channels: 1, labels: ["keyword"] },
          ansi16: { channels: 1, labels: ["ansi16"] },
          ansi256: { channels: 1, labels: ["ansi256"] },
          hcg: { channels: 3, labels: ["h", "c", "g"] },
          apple: { channels: 3, labels: ["r16", "g16", "b16"] },
          gray: { channels: 1, labels: ["gray"] }
        };
        for (var model in convert2) {
          if (convert2.hasOwnProperty(model)) {
            if (!("channels" in convert2[model])) {
              throw new Error("missing channels property: " + model);
            }
            if (!("labels" in convert2[model])) {
              throw new Error("missing channel labels property: " + model);
            }
            if (convert2[model].labels.length !== convert2[model].channels) {
              throw new Error("channel and label counts mismatch: " + model);
            }
            var channels = convert2[model].channels;
            var labels = convert2[model].labels;
            delete convert2[model].channels;
            delete convert2[model].labels;
            Object.defineProperty(convert2[model], "channels", { value: channels });
            Object.defineProperty(convert2[model], "labels", { value: labels });
          }
        }
        convert2.rgb.hsl = function(rgb) {
          var r = rgb[0] / 255;
          var g = rgb[1] / 255;
          var b = rgb[2] / 255;
          var min = Math.min(r, g, b);
          var max = Math.max(r, g, b);
          var delta = max - min;
          var h;
          var s;
          var l;
          if (max === min) {
            h = 0;
          } else if (r === max) {
            h = (g - b) / delta;
          } else if (g === max) {
            h = 2 + (b - r) / delta;
          } else if (b === max) {
            h = 4 + (r - g) / delta;
          }
          h = Math.min(h * 60, 360);
          if (h < 0) {
            h += 360;
          }
          l = (min + max) / 2;
          if (max === min) {
            s = 0;
          } else if (l <= 0.5) {
            s = delta / (max + min);
          } else {
            s = delta / (2 - max - min);
          }
          return [h, s * 100, l * 100];
        };
        convert2.rgb.hsv = function(rgb) {
          var rdif;
          var gdif;
          var bdif;
          var h;
          var s;
          var r = rgb[0] / 255;
          var g = rgb[1] / 255;
          var b = rgb[2] / 255;
          var v = Math.max(r, g, b);
          var diff = v - Math.min(r, g, b);
          var diffc = function(c) {
            return (v - c) / 6 / diff + 1 / 2;
          };
          if (diff === 0) {
            h = s = 0;
          } else {
            s = diff / v;
            rdif = diffc(r);
            gdif = diffc(g);
            bdif = diffc(b);
            if (r === v) {
              h = bdif - gdif;
            } else if (g === v) {
              h = 1 / 3 + rdif - bdif;
            } else if (b === v) {
              h = 2 / 3 + gdif - rdif;
            }
            if (h < 0) {
              h += 1;
            } else if (h > 1) {
              h -= 1;
            }
          }
          return [
            h * 360,
            s * 100,
            v * 100
          ];
        };
        convert2.rgb.hwb = function(rgb) {
          var r = rgb[0];
          var g = rgb[1];
          var b = rgb[2];
          var h = convert2.rgb.hsl(rgb)[0];
          var w = 1 / 255 * Math.min(r, Math.min(g, b));
          b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
          return [h, w * 100, b * 100];
        };
        convert2.rgb.cmyk = function(rgb) {
          var r = rgb[0] / 255;
          var g = rgb[1] / 255;
          var b = rgb[2] / 255;
          var c;
          var m;
          var y;
          var k2;
          k2 = Math.min(1 - r, 1 - g, 1 - b);
          c = (1 - r - k2) / (1 - k2) || 0;
          m = (1 - g - k2) / (1 - k2) || 0;
          y = (1 - b - k2) / (1 - k2) || 0;
          return [c * 100, m * 100, y * 100, k2 * 100];
        };
        function comparativeDistance(x, y) {
          return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
        }
        convert2.rgb.keyword = function(rgb) {
          var reversed = reverseKeywords[rgb];
          if (reversed) {
            return reversed;
          }
          var currentClosestDistance = Infinity;
          var currentClosestKeyword;
          for (var keyword2 in colorName) {
            if (colorName.hasOwnProperty(keyword2)) {
              var value = colorName[keyword2];
              var distance = comparativeDistance(rgb, value);
              if (distance < currentClosestDistance) {
                currentClosestDistance = distance;
                currentClosestKeyword = keyword2;
              }
            }
          }
          return currentClosestKeyword;
        };
        convert2.keyword.rgb = function(keyword2) {
          return colorName[keyword2];
        };
        convert2.rgb.xyz = function(rgb) {
          var r = rgb[0] / 255;
          var g = rgb[1] / 255;
          var b = rgb[2] / 255;
          r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
          g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
          b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
          var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
          var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
          var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
          return [x * 100, y * 100, z * 100];
        };
        convert2.rgb.lab = function(rgb) {
          var xyz = convert2.rgb.xyz(rgb);
          var x = xyz[0];
          var y = xyz[1];
          var z = xyz[2];
          var l;
          var a;
          var b;
          x /= 95.047;
          y /= 100;
          z /= 108.883;
          x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
          y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
          z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
          l = 116 * y - 16;
          a = 500 * (x - y);
          b = 200 * (y - z);
          return [l, a, b];
        };
        convert2.hsl.rgb = function(hsl) {
          var h = hsl[0] / 360;
          var s = hsl[1] / 100;
          var l = hsl[2] / 100;
          var t1;
          var t2;
          var t3;
          var rgb;
          var val;
          if (s === 0) {
            val = l * 255;
            return [val, val, val];
          }
          if (l < 0.5) {
            t2 = l * (1 + s);
          } else {
            t2 = l + s - l * s;
          }
          t1 = 2 * l - t2;
          rgb = [0, 0, 0];
          for (var i = 0; i < 3; i++) {
            t3 = h + 1 / 3 * -(i - 1);
            if (t3 < 0) {
              t3++;
            }
            if (t3 > 1) {
              t3--;
            }
            if (6 * t3 < 1) {
              val = t1 + (t2 - t1) * 6 * t3;
            } else if (2 * t3 < 1) {
              val = t2;
            } else if (3 * t3 < 2) {
              val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
            } else {
              val = t1;
            }
            rgb[i] = val * 255;
          }
          return rgb;
        };
        convert2.hsl.hsv = function(hsl) {
          var h = hsl[0];
          var s = hsl[1] / 100;
          var l = hsl[2] / 100;
          var smin = s;
          var lmin = Math.max(l, 0.01);
          var sv;
          var v;
          l *= 2;
          s *= l <= 1 ? l : 2 - l;
          smin *= lmin <= 1 ? lmin : 2 - lmin;
          v = (l + s) / 2;
          sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
          return [h, sv * 100, v * 100];
        };
        convert2.hsv.rgb = function(hsv) {
          var h = hsv[0] / 60;
          var s = hsv[1] / 100;
          var v = hsv[2] / 100;
          var hi = Math.floor(h) % 6;
          var f = h - Math.floor(h);
          var p = 255 * v * (1 - s);
          var q = 255 * v * (1 - s * f);
          var t = 255 * v * (1 - s * (1 - f));
          v *= 255;
          switch (hi) {
            case 0:
              return [v, t, p];
            case 1:
              return [q, v, p];
            case 2:
              return [p, v, t];
            case 3:
              return [p, q, v];
            case 4:
              return [t, p, v];
            case 5:
              return [v, p, q];
          }
        };
        convert2.hsv.hsl = function(hsv) {
          var h = hsv[0];
          var s = hsv[1] / 100;
          var v = hsv[2] / 100;
          var vmin = Math.max(v, 0.01);
          var lmin;
          var sl;
          var l;
          l = (2 - s) * v;
          lmin = (2 - s) * vmin;
          sl = s * vmin;
          sl /= lmin <= 1 ? lmin : 2 - lmin;
          sl = sl || 0;
          l /= 2;
          return [h, sl * 100, l * 100];
        };
        convert2.hwb.rgb = function(hwb) {
          var h = hwb[0] / 360;
          var wh = hwb[1] / 100;
          var bl = hwb[2] / 100;
          var ratio = wh + bl;
          var i;
          var v;
          var f;
          var n;
          if (ratio > 1) {
            wh /= ratio;
            bl /= ratio;
          }
          i = Math.floor(6 * h);
          v = 1 - bl;
          f = 6 * h - i;
          if ((i & 1) !== 0) {
            f = 1 - f;
          }
          n = wh + f * (v - wh);
          var r;
          var g;
          var b;
          switch (i) {
            default:
            case 6:
            case 0:
              r = v;
              g = n;
              b = wh;
              break;
            case 1:
              r = n;
              g = v;
              b = wh;
              break;
            case 2:
              r = wh;
              g = v;
              b = n;
              break;
            case 3:
              r = wh;
              g = n;
              b = v;
              break;
            case 4:
              r = n;
              g = wh;
              b = v;
              break;
            case 5:
              r = v;
              g = wh;
              b = n;
              break;
          }
          return [r * 255, g * 255, b * 255];
        };
        convert2.cmyk.rgb = function(cmyk) {
          var c = cmyk[0] / 100;
          var m = cmyk[1] / 100;
          var y = cmyk[2] / 100;
          var k2 = cmyk[3] / 100;
          var r;
          var g;
          var b;
          r = 1 - Math.min(1, c * (1 - k2) + k2);
          g = 1 - Math.min(1, m * (1 - k2) + k2);
          b = 1 - Math.min(1, y * (1 - k2) + k2);
          return [r * 255, g * 255, b * 255];
        };
        convert2.xyz.rgb = function(xyz) {
          var x = xyz[0] / 100;
          var y = xyz[1] / 100;
          var z = xyz[2] / 100;
          var r;
          var g;
          var b;
          r = x * 3.2406 + y * -1.5372 + z * -0.4986;
          g = x * -0.9689 + y * 1.8758 + z * 0.0415;
          b = x * 0.0557 + y * -0.204 + z * 1.057;
          r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
          g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
          b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
          r = Math.min(Math.max(0, r), 1);
          g = Math.min(Math.max(0, g), 1);
          b = Math.min(Math.max(0, b), 1);
          return [r * 255, g * 255, b * 255];
        };
        convert2.xyz.lab = function(xyz) {
          var x = xyz[0];
          var y = xyz[1];
          var z = xyz[2];
          var l;
          var a;
          var b;
          x /= 95.047;
          y /= 100;
          z /= 108.883;
          x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
          y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
          z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
          l = 116 * y - 16;
          a = 500 * (x - y);
          b = 200 * (y - z);
          return [l, a, b];
        };
        convert2.lab.xyz = function(lab) {
          var l = lab[0];
          var a = lab[1];
          var b = lab[2];
          var x;
          var y;
          var z;
          y = (l + 16) / 116;
          x = a / 500 + y;
          z = y - b / 200;
          var y2 = Math.pow(y, 3);
          var x2 = Math.pow(x, 3);
          var z2 = Math.pow(z, 3);
          y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
          x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
          z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
          x *= 95.047;
          y *= 100;
          z *= 108.883;
          return [x, y, z];
        };
        convert2.lab.lch = function(lab) {
          var l = lab[0];
          var a = lab[1];
          var b = lab[2];
          var hr;
          var h;
          var c;
          hr = Math.atan2(b, a);
          h = hr * 360 / 2 / Math.PI;
          if (h < 0) {
            h += 360;
          }
          c = Math.sqrt(a * a + b * b);
          return [l, c, h];
        };
        convert2.lch.lab = function(lch) {
          var l = lch[0];
          var c = lch[1];
          var h = lch[2];
          var a;
          var b;
          var hr;
          hr = h / 360 * 2 * Math.PI;
          a = c * Math.cos(hr);
          b = c * Math.sin(hr);
          return [l, a, b];
        };
        convert2.rgb.ansi16 = function(args) {
          var r = args[0];
          var g = args[1];
          var b = args[2];
          var value = 1 in arguments ? arguments[1] : convert2.rgb.hsv(args)[2];
          value = Math.round(value / 50);
          if (value === 0) {
            return 30;
          }
          var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
          if (value === 2) {
            ansi += 60;
          }
          return ansi;
        };
        convert2.hsv.ansi16 = function(args) {
          return convert2.rgb.ansi16(convert2.hsv.rgb(args), args[2]);
        };
        convert2.rgb.ansi256 = function(args) {
          var r = args[0];
          var g = args[1];
          var b = args[2];
          if (r === g && g === b) {
            if (r < 8) {
              return 16;
            }
            if (r > 248) {
              return 231;
            }
            return Math.round((r - 8) / 247 * 24) + 232;
          }
          var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
          return ansi;
        };
        convert2.ansi16.rgb = function(args) {
          var color = args % 10;
          if (color === 0 || color === 7) {
            if (args > 50) {
              color += 3.5;
            }
            color = color / 10.5 * 255;
            return [color, color, color];
          }
          var mult = (~~(args > 50) + 1) * 0.5;
          var r = (color & 1) * mult * 255;
          var g = (color >> 1 & 1) * mult * 255;
          var b = (color >> 2 & 1) * mult * 255;
          return [r, g, b];
        };
        convert2.ansi256.rgb = function(args) {
          if (args >= 232) {
            var c = (args - 232) * 10 + 8;
            return [c, c, c];
          }
          args -= 16;
          var rem;
          var r = Math.floor(args / 36) / 5 * 255;
          var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
          var b = rem % 6 / 5 * 255;
          return [r, g, b];
        };
        convert2.rgb.hex = function(args) {
          var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
          var string = integer.toString(16).toUpperCase();
          return "000000".substring(string.length) + string;
        };
        convert2.hex.rgb = function(args) {
          var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
          if (!match) {
            return [0, 0, 0];
          }
          var colorString2 = match[0];
          if (match[0].length === 3) {
            colorString2 = colorString2.split("").map(function(char) {
              return char + char;
            }).join("");
          }
          var integer = parseInt(colorString2, 16);
          var r = integer >> 16 & 255;
          var g = integer >> 8 & 255;
          var b = integer & 255;
          return [r, g, b];
        };
        convert2.rgb.hcg = function(rgb) {
          var r = rgb[0] / 255;
          var g = rgb[1] / 255;
          var b = rgb[2] / 255;
          var max = Math.max(Math.max(r, g), b);
          var min = Math.min(Math.min(r, g), b);
          var chroma = max - min;
          var grayscale;
          var hue;
          if (chroma < 1) {
            grayscale = min / (1 - chroma);
          } else {
            grayscale = 0;
          }
          if (chroma <= 0) {
            hue = 0;
          } else if (max === r) {
            hue = (g - b) / chroma % 6;
          } else if (max === g) {
            hue = 2 + (b - r) / chroma;
          } else {
            hue = 4 + (r - g) / chroma + 4;
          }
          hue /= 6;
          hue %= 1;
          return [hue * 360, chroma * 100, grayscale * 100];
        };
        convert2.hsl.hcg = function(hsl) {
          var s = hsl[1] / 100;
          var l = hsl[2] / 100;
          var c = 1;
          var f = 0;
          if (l < 0.5) {
            c = 2 * s * l;
          } else {
            c = 2 * s * (1 - l);
          }
          if (c < 1) {
            f = (l - 0.5 * c) / (1 - c);
          }
          return [hsl[0], c * 100, f * 100];
        };
        convert2.hsv.hcg = function(hsv) {
          var s = hsv[1] / 100;
          var v = hsv[2] / 100;
          var c = s * v;
          var f = 0;
          if (c < 1) {
            f = (v - c) / (1 - c);
          }
          return [hsv[0], c * 100, f * 100];
        };
        convert2.hcg.rgb = function(hcg) {
          var h = hcg[0] / 360;
          var c = hcg[1] / 100;
          var g = hcg[2] / 100;
          if (c === 0) {
            return [g * 255, g * 255, g * 255];
          }
          var pure = [0, 0, 0];
          var hi = h % 1 * 6;
          var v = hi % 1;
          var w = 1 - v;
          var mg = 0;
          switch (Math.floor(hi)) {
            case 0:
              pure[0] = 1;
              pure[1] = v;
              pure[2] = 0;
              break;
            case 1:
              pure[0] = w;
              pure[1] = 1;
              pure[2] = 0;
              break;
            case 2:
              pure[0] = 0;
              pure[1] = 1;
              pure[2] = v;
              break;
            case 3:
              pure[0] = 0;
              pure[1] = w;
              pure[2] = 1;
              break;
            case 4:
              pure[0] = v;
              pure[1] = 0;
              pure[2] = 1;
              break;
            default:
              pure[0] = 1;
              pure[1] = 0;
              pure[2] = w;
          }
          mg = (1 - c) * g;
          return [
            (c * pure[0] + mg) * 255,
            (c * pure[1] + mg) * 255,
            (c * pure[2] + mg) * 255
          ];
        };
        convert2.hcg.hsv = function(hcg) {
          var c = hcg[1] / 100;
          var g = hcg[2] / 100;
          var v = c + g * (1 - c);
          var f = 0;
          if (v > 0) {
            f = c / v;
          }
          return [hcg[0], f * 100, v * 100];
        };
        convert2.hcg.hsl = function(hcg) {
          var c = hcg[1] / 100;
          var g = hcg[2] / 100;
          var l = g * (1 - c) + 0.5 * c;
          var s = 0;
          if (l > 0 && l < 0.5) {
            s = c / (2 * l);
          } else if (l >= 0.5 && l < 1) {
            s = c / (2 * (1 - l));
          }
          return [hcg[0], s * 100, l * 100];
        };
        convert2.hcg.hwb = function(hcg) {
          var c = hcg[1] / 100;
          var g = hcg[2] / 100;
          var v = c + g * (1 - c);
          return [hcg[0], (v - c) * 100, (1 - v) * 100];
        };
        convert2.hwb.hcg = function(hwb) {
          var w = hwb[1] / 100;
          var b = hwb[2] / 100;
          var v = 1 - b;
          var c = v - w;
          var g = 0;
          if (c < 1) {
            g = (v - c) / (1 - c);
          }
          return [hwb[0], c * 100, g * 100];
        };
        convert2.apple.rgb = function(apple) {
          return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
        };
        convert2.rgb.apple = function(rgb) {
          return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
        };
        convert2.gray.rgb = function(args) {
          return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
        };
        convert2.gray.hsl = convert2.gray.hsv = function(args) {
          return [0, 0, args[0]];
        };
        convert2.gray.hwb = function(gray) {
          return [0, 100, gray[0]];
        };
        convert2.gray.cmyk = function(gray) {
          return [0, 0, 0, gray[0]];
        };
        convert2.gray.lab = function(gray) {
          return [gray[0], 0, 0];
        };
        convert2.gray.hex = function(gray) {
          var val = Math.round(gray[0] / 100 * 255) & 255;
          var integer = (val << 16) + (val << 8) + val;
          var string = integer.toString(16).toUpperCase();
          return "000000".substring(string.length) + string;
        };
        convert2.rgb.gray = function(rgb) {
          var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
          return [val / 255 * 100];
        };
      });
      var conversions_1 = conversions.rgb;
      var conversions_2 = conversions.hsl;
      var conversions_3 = conversions.hsv;
      var conversions_4 = conversions.hwb;
      var conversions_5 = conversions.cmyk;
      var conversions_6 = conversions.xyz;
      var conversions_7 = conversions.lab;
      var conversions_8 = conversions.lch;
      var conversions_9 = conversions.hex;
      var conversions_10 = conversions.keyword;
      var conversions_11 = conversions.ansi16;
      var conversions_12 = conversions.ansi256;
      var conversions_13 = conversions.hcg;
      var conversions_14 = conversions.apple;
      var conversions_15 = conversions.gray;
      function buildGraph() {
        var graph = {};
        var models2 = Object.keys(conversions);
        for (var len = models2.length, i = 0; i < len; i++) {
          graph[models2[i]] = {
            // http://jsperf.com/1-vs-infinity
            // micro-opt, but this is simple.
            distance: -1,
            parent: null
          };
        }
        return graph;
      }
      function deriveBFS(fromModel) {
        var graph = buildGraph();
        var queue = [fromModel];
        graph[fromModel].distance = 0;
        while (queue.length) {
          var current = queue.pop();
          var adjacents = Object.keys(conversions[current]);
          for (var len = adjacents.length, i = 0; i < len; i++) {
            var adjacent = adjacents[i];
            var node = graph[adjacent];
            if (node.distance === -1) {
              node.distance = graph[current].distance + 1;
              node.parent = current;
              queue.unshift(adjacent);
            }
          }
        }
        return graph;
      }
      function link(from, to) {
        return function(args) {
          return to(from(args));
        };
      }
      function wrapConversion(toModel, graph) {
        var path = [graph[toModel].parent, toModel];
        var fn = conversions[graph[toModel].parent][toModel];
        var cur = graph[toModel].parent;
        while (graph[cur].parent) {
          path.unshift(graph[cur].parent);
          fn = link(conversions[graph[cur].parent][cur], fn);
          cur = graph[cur].parent;
        }
        fn.conversion = path;
        return fn;
      }
      var route = function(fromModel) {
        var graph = deriveBFS(fromModel);
        var conversion = {};
        var models2 = Object.keys(graph);
        for (var len = models2.length, i = 0; i < len; i++) {
          var toModel = models2[i];
          var node = graph[toModel];
          if (node.parent === null) {
            continue;
          }
          conversion[toModel] = wrapConversion(toModel, graph);
        }
        return conversion;
      };
      var convert = {};
      var models = Object.keys(conversions);
      function wrapRaw(fn) {
        var wrappedFn = function(args) {
          if (args === void 0 || args === null) {
            return args;
          }
          if (arguments.length > 1) {
            args = Array.prototype.slice.call(arguments);
          }
          return fn(args);
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      function wrapRounded(fn) {
        var wrappedFn = function(args) {
          if (args === void 0 || args === null) {
            return args;
          }
          if (arguments.length > 1) {
            args = Array.prototype.slice.call(arguments);
          }
          var result = fn(args);
          if (typeof result === "object") {
            for (var len = result.length, i = 0; i < len; i++) {
              result[i] = Math.round(result[i]);
            }
          }
          return result;
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      models.forEach(function(fromModel) {
        convert[fromModel] = {};
        Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
        Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
        var routes = route(fromModel);
        var routeModels = Object.keys(routes);
        routeModels.forEach(function(toModel) {
          var fn = routes[toModel];
          convert[fromModel][toModel] = wrapRounded(fn);
          convert[fromModel][toModel].raw = wrapRaw(fn);
        });
      });
      var colorConvert = convert;
      var colorName$1 = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
      var colorString = {
        getRgba,
        getHsla,
        getRgb,
        getHsl,
        getHwb,
        getAlpha,
        hexString,
        rgbString,
        rgbaString,
        percentString,
        percentaString,
        hslString,
        hslaString,
        hwbString,
        keyword
      };
      function getRgba(string) {
        if (!string) {
          return;
        }
        var abbr = /^#([a-fA-F0-9]{3,4})$/i, hex = /^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i, rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i, per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i, keyword2 = /(\w+)/;
        var rgb = [0, 0, 0], a = 1, match = string.match(abbr), hexAlpha = "";
        if (match) {
          match = match[1];
          hexAlpha = match[3];
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match[i] + match[i], 16);
          }
          if (hexAlpha) {
            a = Math.round(parseInt(hexAlpha + hexAlpha, 16) / 255 * 100) / 100;
          }
        } else if (match = string.match(hex)) {
          hexAlpha = match[2];
          match = match[1];
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
          }
          if (hexAlpha) {
            a = Math.round(parseInt(hexAlpha, 16) / 255 * 100) / 100;
          }
        } else if (match = string.match(rgba)) {
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match[i + 1]);
          }
          a = parseFloat(match[4]);
        } else if (match = string.match(per)) {
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
          }
          a = parseFloat(match[4]);
        } else if (match = string.match(keyword2)) {
          if (match[1] == "transparent") {
            return [0, 0, 0, 0];
          }
          rgb = colorName$1[match[1]];
          if (!rgb) {
            return;
          }
        }
        for (var i = 0; i < rgb.length; i++) {
          rgb[i] = scale(rgb[i], 0, 255);
        }
        if (!a && a != 0) {
          a = 1;
        } else {
          a = scale(a, 0, 1);
        }
        rgb[3] = a;
        return rgb;
      }
      function getHsla(string) {
        if (!string) {
          return;
        }
        var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
        var match = string.match(hsl);
        if (match) {
          var alpha = parseFloat(match[4]);
          var h = scale(parseInt(match[1]), 0, 360), s = scale(parseFloat(match[2]), 0, 100), l = scale(parseFloat(match[3]), 0, 100), a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h, s, l, a];
        }
      }
      function getHwb(string) {
        if (!string) {
          return;
        }
        var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
        var match = string.match(hwb);
        if (match) {
          var alpha = parseFloat(match[4]);
          var h = scale(parseInt(match[1]), 0, 360), w = scale(parseFloat(match[2]), 0, 100), b = scale(parseFloat(match[3]), 0, 100), a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h, w, b, a];
        }
      }
      function getRgb(string) {
        var rgba = getRgba(string);
        return rgba && rgba.slice(0, 3);
      }
      function getHsl(string) {
        var hsla = getHsla(string);
        return hsla && hsla.slice(0, 3);
      }
      function getAlpha(string) {
        var vals = getRgba(string);
        if (vals) {
          return vals[3];
        } else if (vals = getHsla(string)) {
          return vals[3];
        } else if (vals = getHwb(string)) {
          return vals[3];
        }
      }
      function hexString(rgba, a) {
        var a = a !== void 0 && rgba.length === 3 ? a : rgba[3];
        return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (a >= 0 && a < 1 ? hexDouble(Math.round(a * 255)) : "");
      }
      function rgbString(rgba, alpha) {
        if (alpha < 1 || rgba[3] && rgba[3] < 1) {
          return rgbaString(rgba, alpha);
        }
        return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
      }
      function rgbaString(rgba, alpha) {
        if (alpha === void 0) {
          alpha = rgba[3] !== void 0 ? rgba[3] : 1;
        }
        return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + alpha + ")";
      }
      function percentString(rgba, alpha) {
        if (alpha < 1 || rgba[3] && rgba[3] < 1) {
          return percentaString(rgba, alpha);
        }
        var r = Math.round(rgba[0] / 255 * 100), g = Math.round(rgba[1] / 255 * 100), b = Math.round(rgba[2] / 255 * 100);
        return "rgb(" + r + "%, " + g + "%, " + b + "%)";
      }
      function percentaString(rgba, alpha) {
        var r = Math.round(rgba[0] / 255 * 100), g = Math.round(rgba[1] / 255 * 100), b = Math.round(rgba[2] / 255 * 100);
        return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
      }
      function hslString(hsla, alpha) {
        if (alpha < 1 || hsla[3] && hsla[3] < 1) {
          return hslaString(hsla, alpha);
        }
        return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
      }
      function hslaString(hsla, alpha) {
        if (alpha === void 0) {
          alpha = hsla[3] !== void 0 ? hsla[3] : 1;
        }
        return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + alpha + ")";
      }
      function hwbString(hwb, alpha) {
        if (alpha === void 0) {
          alpha = hwb[3] !== void 0 ? hwb[3] : 1;
        }
        return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%" + (alpha !== void 0 && alpha !== 1 ? ", " + alpha : "") + ")";
      }
      function keyword(rgb) {
        return reverseNames[rgb.slice(0, 3)];
      }
      function scale(num, min, max) {
        return Math.min(Math.max(min, num), max);
      }
      function hexDouble(num) {
        var str = num.toString(16).toUpperCase();
        return str.length < 2 ? "0" + str : str;
      }
      var reverseNames = {};
      for (var name in colorName$1) {
        reverseNames[colorName$1[name]] = name;
      }
      var Color = function(obj) {
        if (obj instanceof Color) {
          return obj;
        }
        if (!(this instanceof Color)) {
          return new Color(obj);
        }
        this.valid = false;
        this.values = {
          rgb: [0, 0, 0],
          hsl: [0, 0, 0],
          hsv: [0, 0, 0],
          hwb: [0, 0, 0],
          cmyk: [0, 0, 0, 0],
          alpha: 1
        };
        var vals;
        if (typeof obj === "string") {
          vals = colorString.getRgba(obj);
          if (vals) {
            this.setValues("rgb", vals);
          } else if (vals = colorString.getHsla(obj)) {
            this.setValues("hsl", vals);
          } else if (vals = colorString.getHwb(obj)) {
            this.setValues("hwb", vals);
          }
        } else if (typeof obj === "object") {
          vals = obj;
          if (vals.r !== void 0 || vals.red !== void 0) {
            this.setValues("rgb", vals);
          } else if (vals.l !== void 0 || vals.lightness !== void 0) {
            this.setValues("hsl", vals);
          } else if (vals.v !== void 0 || vals.value !== void 0) {
            this.setValues("hsv", vals);
          } else if (vals.w !== void 0 || vals.whiteness !== void 0) {
            this.setValues("hwb", vals);
          } else if (vals.c !== void 0 || vals.cyan !== void 0) {
            this.setValues("cmyk", vals);
          }
        }
      };
      Color.prototype = {
        isValid: function() {
          return this.valid;
        },
        rgb: function() {
          return this.setSpace("rgb", arguments);
        },
        hsl: function() {
          return this.setSpace("hsl", arguments);
        },
        hsv: function() {
          return this.setSpace("hsv", arguments);
        },
        hwb: function() {
          return this.setSpace("hwb", arguments);
        },
        cmyk: function() {
          return this.setSpace("cmyk", arguments);
        },
        rgbArray: function() {
          return this.values.rgb;
        },
        hslArray: function() {
          return this.values.hsl;
        },
        hsvArray: function() {
          return this.values.hsv;
        },
        hwbArray: function() {
          var values = this.values;
          if (values.alpha !== 1) {
            return values.hwb.concat([values.alpha]);
          }
          return values.hwb;
        },
        cmykArray: function() {
          return this.values.cmyk;
        },
        rgbaArray: function() {
          var values = this.values;
          return values.rgb.concat([values.alpha]);
        },
        hslaArray: function() {
          var values = this.values;
          return values.hsl.concat([values.alpha]);
        },
        alpha: function(val) {
          if (val === void 0) {
            return this.values.alpha;
          }
          this.setValues("alpha", val);
          return this;
        },
        red: function(val) {
          return this.setChannel("rgb", 0, val);
        },
        green: function(val) {
          return this.setChannel("rgb", 1, val);
        },
        blue: function(val) {
          return this.setChannel("rgb", 2, val);
        },
        hue: function(val) {
          if (val) {
            val %= 360;
            val = val < 0 ? 360 + val : val;
          }
          return this.setChannel("hsl", 0, val);
        },
        saturation: function(val) {
          return this.setChannel("hsl", 1, val);
        },
        lightness: function(val) {
          return this.setChannel("hsl", 2, val);
        },
        saturationv: function(val) {
          return this.setChannel("hsv", 1, val);
        },
        whiteness: function(val) {
          return this.setChannel("hwb", 1, val);
        },
        blackness: function(val) {
          return this.setChannel("hwb", 2, val);
        },
        value: function(val) {
          return this.setChannel("hsv", 2, val);
        },
        cyan: function(val) {
          return this.setChannel("cmyk", 0, val);
        },
        magenta: function(val) {
          return this.setChannel("cmyk", 1, val);
        },
        yellow: function(val) {
          return this.setChannel("cmyk", 2, val);
        },
        black: function(val) {
          return this.setChannel("cmyk", 3, val);
        },
        hexString: function() {
          return colorString.hexString(this.values.rgb);
        },
        rgbString: function() {
          return colorString.rgbString(this.values.rgb, this.values.alpha);
        },
        rgbaString: function() {
          return colorString.rgbaString(this.values.rgb, this.values.alpha);
        },
        percentString: function() {
          return colorString.percentString(this.values.rgb, this.values.alpha);
        },
        hslString: function() {
          return colorString.hslString(this.values.hsl, this.values.alpha);
        },
        hslaString: function() {
          return colorString.hslaString(this.values.hsl, this.values.alpha);
        },
        hwbString: function() {
          return colorString.hwbString(this.values.hwb, this.values.alpha);
        },
        keyword: function() {
          return colorString.keyword(this.values.rgb, this.values.alpha);
        },
        rgbNumber: function() {
          var rgb = this.values.rgb;
          return rgb[0] << 16 | rgb[1] << 8 | rgb[2];
        },
        luminosity: function() {
          var rgb = this.values.rgb;
          var lum = [];
          for (var i = 0; i < rgb.length; i++) {
            var chan = rgb[i] / 255;
            lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
          }
          return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
        },
        contrast: function(color2) {
          var lum1 = this.luminosity();
          var lum2 = color2.luminosity();
          if (lum1 > lum2) {
            return (lum1 + 0.05) / (lum2 + 0.05);
          }
          return (lum2 + 0.05) / (lum1 + 0.05);
        },
        level: function(color2) {
          var contrastRatio = this.contrast(color2);
          if (contrastRatio >= 7.1) {
            return "AAA";
          }
          return contrastRatio >= 4.5 ? "AA" : "";
        },
        dark: function() {
          var rgb = this.values.rgb;
          var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1e3;
          return yiq < 128;
        },
        light: function() {
          return !this.dark();
        },
        negate: function() {
          var rgb = [];
          for (var i = 0; i < 3; i++) {
            rgb[i] = 255 - this.values.rgb[i];
          }
          this.setValues("rgb", rgb);
          return this;
        },
        lighten: function(ratio) {
          var hsl = this.values.hsl;
          hsl[2] += hsl[2] * ratio;
          this.setValues("hsl", hsl);
          return this;
        },
        darken: function(ratio) {
          var hsl = this.values.hsl;
          hsl[2] -= hsl[2] * ratio;
          this.setValues("hsl", hsl);
          return this;
        },
        saturate: function(ratio) {
          var hsl = this.values.hsl;
          hsl[1] += hsl[1] * ratio;
          this.setValues("hsl", hsl);
          return this;
        },
        desaturate: function(ratio) {
          var hsl = this.values.hsl;
          hsl[1] -= hsl[1] * ratio;
          this.setValues("hsl", hsl);
          return this;
        },
        whiten: function(ratio) {
          var hwb = this.values.hwb;
          hwb[1] += hwb[1] * ratio;
          this.setValues("hwb", hwb);
          return this;
        },
        blacken: function(ratio) {
          var hwb = this.values.hwb;
          hwb[2] += hwb[2] * ratio;
          this.setValues("hwb", hwb);
          return this;
        },
        greyscale: function() {
          var rgb = this.values.rgb;
          var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
          this.setValues("rgb", [val, val, val]);
          return this;
        },
        clearer: function(ratio) {
          var alpha = this.values.alpha;
          this.setValues("alpha", alpha - alpha * ratio);
          return this;
        },
        opaquer: function(ratio) {
          var alpha = this.values.alpha;
          this.setValues("alpha", alpha + alpha * ratio);
          return this;
        },
        rotate: function(degrees) {
          var hsl = this.values.hsl;
          var hue = (hsl[0] + degrees) % 360;
          hsl[0] = hue < 0 ? 360 + hue : hue;
          this.setValues("hsl", hsl);
          return this;
        },
        /**
         * Ported from sass implementation in C
         * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
         */
        mix: function(mixinColor, weight) {
          var color1 = this;
          var color2 = mixinColor;
          var p = weight === void 0 ? 0.5 : weight;
          var w = 2 * p - 1;
          var a = color1.alpha() - color2.alpha();
          var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
          var w2 = 1 - w1;
          return this.rgb(
            w1 * color1.red() + w2 * color2.red(),
            w1 * color1.green() + w2 * color2.green(),
            w1 * color1.blue() + w2 * color2.blue()
          ).alpha(color1.alpha() * p + color2.alpha() * (1 - p));
        },
        toJSON: function() {
          return this.rgb();
        },
        clone: function() {
          var result = new Color();
          var source = this.values;
          var target = result.values;
          var value, type;
          for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
              value = source[prop];
              type = {}.toString.call(value);
              if (type === "[object Array]") {
                target[prop] = value.slice(0);
              } else if (type === "[object Number]") {
                target[prop] = value;
              } else {
                console.error("unexpected color value:", value);
              }
            }
          }
          return result;
        }
      };
      Color.prototype.spaces = {
        rgb: ["red", "green", "blue"],
        hsl: ["hue", "saturation", "lightness"],
        hsv: ["hue", "saturation", "value"],
        hwb: ["hue", "whiteness", "blackness"],
        cmyk: ["cyan", "magenta", "yellow", "black"]
      };
      Color.prototype.maxes = {
        rgb: [255, 255, 255],
        hsl: [360, 100, 100],
        hsv: [360, 100, 100],
        hwb: [360, 100, 100],
        cmyk: [100, 100, 100, 100]
      };
      Color.prototype.getValues = function(space) {
        var values = this.values;
        var vals = {};
        for (var i = 0; i < space.length; i++) {
          vals[space.charAt(i)] = values[space][i];
        }
        if (values.alpha !== 1) {
          vals.a = values.alpha;
        }
        return vals;
      };
      Color.prototype.setValues = function(space, vals) {
        var values = this.values;
        var spaces = this.spaces;
        var maxes = this.maxes;
        var alpha = 1;
        var i;
        this.valid = true;
        if (space === "alpha") {
          alpha = vals;
        } else if (vals.length) {
          values[space] = vals.slice(0, space.length);
          alpha = vals[space.length];
        } else if (vals[space.charAt(0)] !== void 0) {
          for (i = 0; i < space.length; i++) {
            values[space][i] = vals[space.charAt(i)];
          }
          alpha = vals.a;
        } else if (vals[spaces[space][0]] !== void 0) {
          var chans = spaces[space];
          for (i = 0; i < space.length; i++) {
            values[space][i] = vals[chans[i]];
          }
          alpha = vals.alpha;
        }
        values.alpha = Math.max(0, Math.min(1, alpha === void 0 ? values.alpha : alpha));
        if (space === "alpha") {
          return false;
        }
        var capped;
        for (i = 0; i < space.length; i++) {
          capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
          values[space][i] = Math.round(capped);
        }
        for (var sname in spaces) {
          if (sname !== space) {
            values[sname] = colorConvert[space][sname](values[space]);
          }
        }
        return true;
      };
      Color.prototype.setSpace = function(space, args) {
        var vals = args[0];
        if (vals === void 0) {
          return this.getValues(space);
        }
        if (typeof vals === "number") {
          vals = Array.prototype.slice.call(args);
        }
        this.setValues(space, vals);
        return this;
      };
      Color.prototype.setChannel = function(space, index, val) {
        var svalues = this.values[space];
        if (val === void 0) {
          return svalues[index];
        } else if (val === svalues[index]) {
          return this;
        }
        svalues[index] = val;
        this.setValues(space, svalues);
        return this;
      };
      if (typeof window !== "undefined") {
        window.Color = Color;
      }
      var chartjsColor = Color;
      function isValidKey(key) {
        return ["__proto__", "prototype", "constructor"].indexOf(key) === -1;
      }
      var helpers = {
        /**
         * An empty function that can be used, for example, for optional callback.
         */
        noop: function() {
        },
        /**
         * Returns a unique id, sequentially generated from a global variable.
         * @returns {number}
         * @function
         */
        uid: function() {
          var id = 0;
          return function() {
            return id++;
          };
        }(),
        /**
         * Returns true if `value` is neither null nor undefined, else returns false.
         * @param {*} value - The value to test.
         * @returns {boolean}
         * @since 2.7.0
         */
        isNullOrUndef: function(value) {
          return value === null || typeof value === "undefined";
        },
        /**
         * Returns true if `value` is an array (including typed arrays), else returns false.
         * @param {*} value - The value to test.
         * @returns {boolean}
         * @function
         */
        isArray: function(value) {
          if (Array.isArray && Array.isArray(value)) {
            return true;
          }
          var type = Object.prototype.toString.call(value);
          if (type.substr(0, 7) === "[object" && type.substr(-6) === "Array]") {
            return true;
          }
          return false;
        },
        /**
         * Returns true if `value` is an object (excluding null), else returns false.
         * @param {*} value - The value to test.
         * @returns {boolean}
         * @since 2.7.0
         */
        isObject: function(value) {
          return value !== null && Object.prototype.toString.call(value) === "[object Object]";
        },
        /**
         * Returns true if `value` is a finite number, else returns false
         * @param {*} value  - The value to test.
         * @returns {boolean}
         */
        isFinite: function(value) {
          return (typeof value === "number" || value instanceof Number) && isFinite(value);
        },
        /**
         * Returns `value` if defined, else returns `defaultValue`.
         * @param {*} value - The value to return if defined.
         * @param {*} defaultValue - The value to return if `value` is undefined.
         * @returns {*}
         */
        valueOrDefault: function(value, defaultValue) {
          return typeof value === "undefined" ? defaultValue : value;
        },
        /**
         * Returns value at the given `index` in array if defined, else returns `defaultValue`.
         * @param {Array} value - The array to lookup for value at `index`.
         * @param {number} index - The index in `value` to lookup for value.
         * @param {*} defaultValue - The value to return if `value[index]` is undefined.
         * @returns {*}
         */
        valueAtIndexOrDefault: function(value, index, defaultValue) {
          return helpers.valueOrDefault(helpers.isArray(value) ? value[index] : value, defaultValue);
        },
        /**
         * Calls `fn` with the given `args` in the scope defined by `thisArg` and returns the
         * value returned by `fn`. If `fn` is not a function, this method returns undefined.
         * @param {function} fn - The function to call.
         * @param {Array|undefined|null} args - The arguments with which `fn` should be called.
         * @param {object} [thisArg] - The value of `this` provided for the call to `fn`.
         * @returns {*}
         */
        callback: function(fn, args, thisArg) {
          if (fn && typeof fn.call === "function") {
            return fn.apply(thisArg, args);
          }
        },
        /**
         * Note(SB) for performance sake, this method should only be used when loopable type
         * is unknown or in none intensive code (not called often and small loopable). Else
         * it's preferable to use a regular for() loop and save extra function calls.
         * @param {object|Array} loopable - The object or array to be iterated.
         * @param {function} fn - The function to call for each item.
         * @param {object} [thisArg] - The value of `this` provided for the call to `fn`.
         * @param {boolean} [reverse] - If true, iterates backward on the loopable.
         */
        each: function(loopable, fn, thisArg, reverse) {
          var i, len, keys;
          if (helpers.isArray(loopable)) {
            len = loopable.length;
            if (reverse) {
              for (i = len - 1; i >= 0; i--) {
                fn.call(thisArg, loopable[i], i);
              }
            } else {
              for (i = 0; i < len; i++) {
                fn.call(thisArg, loopable[i], i);
              }
            }
          } else if (helpers.isObject(loopable)) {
            keys = Object.keys(loopable);
            len = keys.length;
            for (i = 0; i < len; i++) {
              fn.call(thisArg, loopable[keys[i]], keys[i]);
            }
          }
        },
        /**
         * Returns true if the `a0` and `a1` arrays have the same content, else returns false.
         * @see https://stackoverflow.com/a/14853974
         * @param {Array} a0 - The array to compare
         * @param {Array} a1 - The array to compare
         * @returns {boolean}
         */
        arrayEquals: function(a0, a1) {
          var i, ilen, v0, v1;
          if (!a0 || !a1 || a0.length !== a1.length) {
            return false;
          }
          for (i = 0, ilen = a0.length; i < ilen; ++i) {
            v0 = a0[i];
            v1 = a1[i];
            if (v0 instanceof Array && v1 instanceof Array) {
              if (!helpers.arrayEquals(v0, v1)) {
                return false;
              }
            } else if (v0 !== v1) {
              return false;
            }
          }
          return true;
        },
        /**
         * Returns a deep copy of `source` without keeping references on objects and arrays.
         * @param {*} source - The value to clone.
         * @returns {*}
         */
        clone: function(source) {
          if (helpers.isArray(source)) {
            return source.map(helpers.clone);
          }
          if (helpers.isObject(source)) {
            var target = Object.create(source);
            var keys = Object.keys(source);
            var klen = keys.length;
            var k2 = 0;
            for (; k2 < klen; ++k2) {
              target[keys[k2]] = helpers.clone(source[keys[k2]]);
            }
            return target;
          }
          return source;
        },
        /**
         * The default merger when Chart.helpers.merge is called without merger option.
         * Note(SB): also used by mergeConfig and mergeScaleConfig as fallback.
         * @private
         */
        _merger: function(key, target, source, options2) {
          if (!isValidKey(key)) {
            return;
          }
          var tval = target[key];
          var sval = source[key];
          if (helpers.isObject(tval) && helpers.isObject(sval)) {
            helpers.merge(tval, sval, options2);
          } else {
            target[key] = helpers.clone(sval);
          }
        },
        /**
         * Merges source[key] in target[key] only if target[key] is undefined.
         * @private
         */
        _mergerIf: function(key, target, source) {
          if (!isValidKey(key)) {
            return;
          }
          var tval = target[key];
          var sval = source[key];
          if (helpers.isObject(tval) && helpers.isObject(sval)) {
            helpers.mergeIf(tval, sval);
          } else if (!target.hasOwnProperty(key)) {
            target[key] = helpers.clone(sval);
          }
        },
        /**
         * Recursively deep copies `source` properties into `target` with the given `options`.
         * IMPORTANT: `target` is not cloned and will be updated with `source` properties.
         * @param {object} target - The target object in which all sources are merged into.
         * @param {object|object[]} source - Object(s) to merge into `target`.
         * @param {object} [options] - Merging options:
         * @param {function} [options.merger] - The merge method (key, target, source, options)
         * @returns {object} The `target` object.
         */
        merge: function(target, source, options2) {
          var sources = helpers.isArray(source) ? source : [source];
          var ilen = sources.length;
          var merge, i, keys, klen, k2;
          if (!helpers.isObject(target)) {
            return target;
          }
          options2 = options2 || {};
          merge = options2.merger || helpers._merger;
          for (i = 0; i < ilen; ++i) {
            source = sources[i];
            if (!helpers.isObject(source)) {
              continue;
            }
            keys = Object.keys(source);
            for (k2 = 0, klen = keys.length; k2 < klen; ++k2) {
              merge(keys[k2], target, source, options2);
            }
          }
          return target;
        },
        /**
         * Recursively deep copies `source` properties into `target` *only* if not defined in target.
         * IMPORTANT: `target` is not cloned and will be updated with `source` properties.
         * @param {object} target - The target object in which all sources are merged into.
         * @param {object|object[]} source - Object(s) to merge into `target`.
         * @returns {object} The `target` object.
         */
        mergeIf: function(target, source) {
          return helpers.merge(target, source, { merger: helpers._mergerIf });
        },
        /**
         * Applies the contents of two or more objects together into the first object.
         * @param {object} target - The target object in which all objects are merged into.
         * @param {object} arg1 - Object containing additional properties to merge in target.
         * @param {object} argN - Additional objects containing properties to merge in target.
         * @returns {object} The `target` object.
         */
        extend: Object.assign || function(target) {
          return helpers.merge(target, [].slice.call(arguments, 1), {
            merger: function(key, dst, src2) {
              dst[key] = src2[key];
            }
          });
        },
        /**
         * Basic javascript inheritance based on the model created in Backbone.js
         */
        inherits: function(extensions) {
          var me = this;
          var ChartElement = extensions && extensions.hasOwnProperty("constructor") ? extensions.constructor : function() {
            return me.apply(this, arguments);
          };
          var Surrogate = function() {
            this.constructor = ChartElement;
          };
          Surrogate.prototype = me.prototype;
          ChartElement.prototype = new Surrogate();
          ChartElement.extend = helpers.inherits;
          if (extensions) {
            helpers.extend(ChartElement.prototype, extensions);
          }
          ChartElement.__super__ = me.prototype;
          return ChartElement;
        },
        _deprecated: function(scope, value, previous, current) {
          if (value !== void 0) {
            console.warn(scope + ': "' + previous + '" is deprecated. Please use "' + current + '" instead');
          }
        }
      };
      var helpers_core = helpers;
      helpers.callCallback = helpers.callback;
      helpers.indexOf = function(array, item, fromIndex) {
        return Array.prototype.indexOf.call(array, item, fromIndex);
      };
      helpers.getValueOrDefault = helpers.valueOrDefault;
      helpers.getValueAtIndexOrDefault = helpers.valueAtIndexOrDefault;
      var effects = {
        linear: function(t) {
          return t;
        },
        easeInQuad: function(t) {
          return t * t;
        },
        easeOutQuad: function(t) {
          return -t * (t - 2);
        },
        easeInOutQuad: function(t) {
          if ((t /= 0.5) < 1) {
            return 0.5 * t * t;
          }
          return -0.5 * (--t * (t - 2) - 1);
        },
        easeInCubic: function(t) {
          return t * t * t;
        },
        easeOutCubic: function(t) {
          return (t = t - 1) * t * t + 1;
        },
        easeInOutCubic: function(t) {
          if ((t /= 0.5) < 1) {
            return 0.5 * t * t * t;
          }
          return 0.5 * ((t -= 2) * t * t + 2);
        },
        easeInQuart: function(t) {
          return t * t * t * t;
        },
        easeOutQuart: function(t) {
          return -((t = t - 1) * t * t * t - 1);
        },
        easeInOutQuart: function(t) {
          if ((t /= 0.5) < 1) {
            return 0.5 * t * t * t * t;
          }
          return -0.5 * ((t -= 2) * t * t * t - 2);
        },
        easeInQuint: function(t) {
          return t * t * t * t * t;
        },
        easeOutQuint: function(t) {
          return (t = t - 1) * t * t * t * t + 1;
        },
        easeInOutQuint: function(t) {
          if ((t /= 0.5) < 1) {
            return 0.5 * t * t * t * t * t;
          }
          return 0.5 * ((t -= 2) * t * t * t * t + 2);
        },
        easeInSine: function(t) {
          return -Math.cos(t * (Math.PI / 2)) + 1;
        },
        easeOutSine: function(t) {
          return Math.sin(t * (Math.PI / 2));
        },
        easeInOutSine: function(t) {
          return -0.5 * (Math.cos(Math.PI * t) - 1);
        },
        easeInExpo: function(t) {
          return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
        },
        easeOutExpo: function(t) {
          return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
        },
        easeInOutExpo: function(t) {
          if (t === 0) {
            return 0;
          }
          if (t === 1) {
            return 1;
          }
          if ((t /= 0.5) < 1) {
            return 0.5 * Math.pow(2, 10 * (t - 1));
          }
          return 0.5 * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc: function(t) {
          if (t >= 1) {
            return t;
          }
          return -(Math.sqrt(1 - t * t) - 1);
        },
        easeOutCirc: function(t) {
          return Math.sqrt(1 - (t = t - 1) * t);
        },
        easeInOutCirc: function(t) {
          if ((t /= 0.5) < 1) {
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
          }
          return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        easeInElastic: function(t) {
          var s = 1.70158;
          var p = 0;
          var a = 1;
          if (t === 0) {
            return 0;
          }
          if (t === 1) {
            return 1;
          }
          if (!p) {
            p = 0.3;
          }
          if (a < 1) {
            a = 1;
            s = p / 4;
          } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a);
          }
          return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
        },
        easeOutElastic: function(t) {
          var s = 1.70158;
          var p = 0;
          var a = 1;
          if (t === 0) {
            return 0;
          }
          if (t === 1) {
            return 1;
          }
          if (!p) {
            p = 0.3;
          }
          if (a < 1) {
            a = 1;
            s = p / 4;
          } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a);
          }
          return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
        },
        easeInOutElastic: function(t) {
          var s = 1.70158;
          var p = 0;
          var a = 1;
          if (t === 0) {
            return 0;
          }
          if ((t /= 0.5) === 2) {
            return 1;
          }
          if (!p) {
            p = 0.45;
          }
          if (a < 1) {
            a = 1;
            s = p / 4;
          } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a);
          }
          if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
          }
          return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
        },
        easeInBack: function(t) {
          var s = 1.70158;
          return t * t * ((s + 1) * t - s);
        },
        easeOutBack: function(t) {
          var s = 1.70158;
          return (t = t - 1) * t * ((s + 1) * t + s) + 1;
        },
        easeInOutBack: function(t) {
          var s = 1.70158;
          if ((t /= 0.5) < 1) {
            return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
          }
          return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
        },
        easeInBounce: function(t) {
          return 1 - effects.easeOutBounce(1 - t);
        },
        easeOutBounce: function(t) {
          if (t < 1 / 2.75) {
            return 7.5625 * t * t;
          }
          if (t < 2 / 2.75) {
            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
          }
          if (t < 2.5 / 2.75) {
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
          }
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        },
        easeInOutBounce: function(t) {
          if (t < 0.5) {
            return effects.easeInBounce(t * 2) * 0.5;
          }
          return effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
        }
      };
      var helpers_easing = {
        effects
      };
      helpers_core.easingEffects = effects;
      var PI = Math.PI;
      var RAD_PER_DEG = PI / 180;
      var DOUBLE_PI = PI * 2;
      var HALF_PI = PI / 2;
      var QUARTER_PI = PI / 4;
      var TWO_THIRDS_PI = PI * 2 / 3;
      var exports$1 = {
        /**
         * Clears the entire canvas associated to the given `chart`.
         * @param {Chart} chart - The chart for which to clear the canvas.
         */
        clear: function(chart) {
          chart.ctx.clearRect(0, 0, chart.width, chart.height);
        },
        /**
         * Creates a "path" for a rectangle with rounded corners at position (x, y) with a
         * given size (width, height) and the same `radius` for all corners.
         * @param {CanvasRenderingContext2D} ctx - The canvas 2D Context.
         * @param {number} x - The x axis of the coordinate for the rectangle starting point.
         * @param {number} y - The y axis of the coordinate for the rectangle starting point.
         * @param {number} width - The rectangle's width.
         * @param {number} height - The rectangle's height.
         * @param {number} radius - The rounded amount (in pixels) for the four corners.
         * @todo handle `radius` as top-left, top-right, bottom-right, bottom-left array/object?
         */
        roundedRect: function(ctx, x, y, width, height, radius) {
          if (radius) {
            var r = Math.min(radius, height / 2, width / 2);
            var left = x + r;
            var top = y + r;
            var right = x + width - r;
            var bottom = y + height - r;
            ctx.moveTo(x, top);
            if (left < right && top < bottom) {
              ctx.arc(left, top, r, -PI, -HALF_PI);
              ctx.arc(right, top, r, -HALF_PI, 0);
              ctx.arc(right, bottom, r, 0, HALF_PI);
              ctx.arc(left, bottom, r, HALF_PI, PI);
            } else if (left < right) {
              ctx.moveTo(left, y);
              ctx.arc(right, top, r, -HALF_PI, HALF_PI);
              ctx.arc(left, top, r, HALF_PI, PI + HALF_PI);
            } else if (top < bottom) {
              ctx.arc(left, top, r, -PI, 0);
              ctx.arc(left, bottom, r, 0, PI);
            } else {
              ctx.arc(left, top, r, -PI, PI);
            }
            ctx.closePath();
            ctx.moveTo(x, y);
          } else {
            ctx.rect(x, y, width, height);
          }
        },
        drawPoint: function(ctx, style, radius, x, y, rotation) {
          var type, xOffset, yOffset, size, cornerRadius;
          var rad = (rotation || 0) * RAD_PER_DEG;
          if (style && typeof style === "object") {
            type = style.toString();
            if (type === "[object HTMLImageElement]" || type === "[object HTMLCanvasElement]") {
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(rad);
              ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
              ctx.restore();
              return;
            }
          }
          if (isNaN(radius) || radius <= 0) {
            return;
          }
          ctx.beginPath();
          switch (style) {
            default:
              ctx.arc(x, y, radius, 0, DOUBLE_PI);
              ctx.closePath();
              break;
            case "triangle":
              ctx.moveTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
              rad += TWO_THIRDS_PI;
              ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
              rad += TWO_THIRDS_PI;
              ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
              ctx.closePath();
              break;
            case "rectRounded":
              cornerRadius = radius * 0.516;
              size = radius - cornerRadius;
              xOffset = Math.cos(rad + QUARTER_PI) * size;
              yOffset = Math.sin(rad + QUARTER_PI) * size;
              ctx.arc(x - xOffset, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
              ctx.arc(x + yOffset, y - xOffset, cornerRadius, rad - HALF_PI, rad);
              ctx.arc(x + xOffset, y + yOffset, cornerRadius, rad, rad + HALF_PI);
              ctx.arc(x - yOffset, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
              ctx.closePath();
              break;
            case "rect":
              if (!rotation) {
                size = Math.SQRT1_2 * radius;
                ctx.rect(x - size, y - size, 2 * size, 2 * size);
                break;
              }
              rad += QUARTER_PI;
            case "rectRot":
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + yOffset, y - xOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              ctx.closePath();
              break;
            case "crossRot":
              rad += QUARTER_PI;
            case "cross":
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.moveTo(x + yOffset, y - xOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              break;
            case "star":
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.moveTo(x + yOffset, y - xOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              rad += QUARTER_PI;
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              ctx.moveTo(x + yOffset, y - xOffset);
              ctx.lineTo(x - yOffset, y + xOffset);
              break;
            case "line":
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              break;
            case "dash":
              ctx.moveTo(x, y);
              ctx.lineTo(x + Math.cos(rad) * radius, y + Math.sin(rad) * radius);
              break;
          }
          ctx.fill();
          ctx.stroke();
        },
        /**
         * Returns true if the point is inside the rectangle
         * @param {object} point - The point to test
         * @param {object} area - The rectangle
         * @returns {boolean}
         * @private
         */
        _isPointInArea: function(point, area) {
          var epsilon = 1e-6;
          return point.x > area.left - epsilon && point.x < area.right + epsilon && point.y > area.top - epsilon && point.y < area.bottom + epsilon;
        },
        clipArea: function(ctx, area) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
          ctx.clip();
        },
        unclipArea: function(ctx) {
          ctx.restore();
        },
        lineTo: function(ctx, previous, target, flip) {
          var stepped = target.steppedLine;
          if (stepped) {
            if (stepped === "middle") {
              var midpoint = (previous.x + target.x) / 2;
              ctx.lineTo(midpoint, flip ? target.y : previous.y);
              ctx.lineTo(midpoint, flip ? previous.y : target.y);
            } else if (stepped === "after" && !flip || stepped !== "after" && flip) {
              ctx.lineTo(previous.x, target.y);
            } else {
              ctx.lineTo(target.x, previous.y);
            }
            ctx.lineTo(target.x, target.y);
            return;
          }
          if (!target.tension) {
            ctx.lineTo(target.x, target.y);
            return;
          }
          ctx.bezierCurveTo(
            flip ? previous.controlPointPreviousX : previous.controlPointNextX,
            flip ? previous.controlPointPreviousY : previous.controlPointNextY,
            flip ? target.controlPointNextX : target.controlPointPreviousX,
            flip ? target.controlPointNextY : target.controlPointPreviousY,
            target.x,
            target.y
          );
        }
      };
      var helpers_canvas = exports$1;
      helpers_core.clear = exports$1.clear;
      helpers_core.drawRoundedRectangle = function(ctx) {
        ctx.beginPath();
        exports$1.roundedRect.apply(exports$1, arguments);
      };
      var defaults = {
        /**
         * @private
         */
        _set: function(scope, values) {
          return helpers_core.merge(this[scope] || (this[scope] = {}), values);
        }
      };
      defaults._set("global", {
        defaultColor: "rgba(0,0,0,0.1)",
        defaultFontColor: "#666",
        defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        defaultFontSize: 12,
        defaultFontStyle: "normal",
        defaultLineHeight: 1.2,
        showLines: true
      });
      var core_defaults = defaults;
      var valueOrDefault = helpers_core.valueOrDefault;
      function toFontString(font) {
        if (!font || helpers_core.isNullOrUndef(font.size) || helpers_core.isNullOrUndef(font.family)) {
          return null;
        }
        return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
      }
      var helpers_options = {
        /**
         * Converts the given line height `value` in pixels for a specific font `size`.
         * @param {number|string} value - The lineHeight to parse (eg. 1.6, '14px', '75%', '1.6em').
         * @param {number} size - The font size (in pixels) used to resolve relative `value`.
         * @returns {number} The effective line height in pixels (size * 1.2 if value is invalid).
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
         * @since 2.7.0
         */
        toLineHeight: function(value, size) {
          var matches = ("" + value).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
          if (!matches || matches[1] === "normal") {
            return size * 1.2;
          }
          value = +matches[2];
          switch (matches[3]) {
            case "px":
              return value;
            case "%":
              value /= 100;
              break;
          }
          return size * value;
        },
        /**
         * Converts the given value into a padding object with pre-computed width/height.
         * @param {number|object} value - If a number, set the value to all TRBL component,
         *  else, if and object, use defined properties and sets undefined ones to 0.
         * @returns {object} The padding values (top, right, bottom, left, width, height)
         * @since 2.7.0
         */
        toPadding: function(value) {
          var t, r, b, l;
          if (helpers_core.isObject(value)) {
            t = +value.top || 0;
            r = +value.right || 0;
            b = +value.bottom || 0;
            l = +value.left || 0;
          } else {
            t = r = b = l = +value || 0;
          }
          return {
            top: t,
            right: r,
            bottom: b,
            left: l,
            height: t + b,
            width: l + r
          };
        },
        /**
         * Parses font options and returns the font object.
         * @param {object} options - A object that contains font options to be parsed.
         * @return {object} The font object.
         * @todo Support font.* options and renamed to toFont().
         * @private
         */
        _parseFont: function(options2) {
          var globalDefaults = core_defaults.global;
          var size = valueOrDefault(options2.fontSize, globalDefaults.defaultFontSize);
          var font = {
            family: valueOrDefault(options2.fontFamily, globalDefaults.defaultFontFamily),
            lineHeight: helpers_core.options.toLineHeight(valueOrDefault(options2.lineHeight, globalDefaults.defaultLineHeight), size),
            size,
            style: valueOrDefault(options2.fontStyle, globalDefaults.defaultFontStyle),
            weight: null,
            string: ""
          };
          font.string = toFontString(font);
          return font;
        },
        /**
         * Evaluates the given `inputs` sequentially and returns the first defined value.
         * @param {Array} inputs - An array of values, falling back to the last value.
         * @param {object} [context] - If defined and the current value is a function, the value
         * is called with `context` as first argument and the result becomes the new input.
         * @param {number} [index] - If defined and the current value is an array, the value
         * at `index` become the new input.
         * @param {object} [info] - object to return information about resolution in
         * @param {boolean} [info.cacheable] - Will be set to `false` if option is not cacheable.
         * @since 2.7.0
         */
        resolve: function(inputs, context, index, info) {
          var cacheable = true;
          var i, ilen, value;
          for (i = 0, ilen = inputs.length; i < ilen; ++i) {
            value = inputs[i];
            if (value === void 0) {
              continue;
            }
            if (context !== void 0 && typeof value === "function") {
              value = value(context);
              cacheable = false;
            }
            if (index !== void 0 && helpers_core.isArray(value)) {
              value = value[index];
              cacheable = false;
            }
            if (value !== void 0) {
              if (info && !cacheable) {
                info.cacheable = false;
              }
              return value;
            }
          }
        }
      };
      var exports$2 = {
        /**
         * Returns an array of factors sorted from 1 to sqrt(value)
         * @private
         */
        _factorize: function(value) {
          var result = [];
          var sqrt = Math.sqrt(value);
          var i;
          for (i = 1; i < sqrt; i++) {
            if (value % i === 0) {
              result.push(i);
              result.push(value / i);
            }
          }
          if (sqrt === (sqrt | 0)) {
            result.push(sqrt);
          }
          result.sort(function(a, b) {
            return a - b;
          }).pop();
          return result;
        },
        log10: Math.log10 || function(x) {
          var exponent = Math.log(x) * Math.LOG10E;
          var powerOf10 = Math.round(exponent);
          var isPowerOf10 = x === Math.pow(10, powerOf10);
          return isPowerOf10 ? powerOf10 : exponent;
        }
      };
      var helpers_math = exports$2;
      helpers_core.log10 = exports$2.log10;
      var getRtlAdapter = function(rectX, width) {
        return {
          x: function(x) {
            return rectX + rectX + width - x;
          },
          setWidth: function(w) {
            width = w;
          },
          textAlign: function(align) {
            if (align === "center") {
              return align;
            }
            return align === "right" ? "left" : "right";
          },
          xPlus: function(x, value) {
            return x - value;
          },
          leftForLtr: function(x, itemWidth) {
            return x - itemWidth;
          }
        };
      };
      var getLtrAdapter = function() {
        return {
          x: function(x) {
            return x;
          },
          setWidth: function(w) {
          },
          textAlign: function(align) {
            return align;
          },
          xPlus: function(x, value) {
            return x + value;
          },
          leftForLtr: function(x, _itemWidth) {
            return x;
          }
        };
      };
      var getAdapter = function(rtl2, rectX, width) {
        return rtl2 ? getRtlAdapter(rectX, width) : getLtrAdapter();
      };
      var overrideTextDirection = function(ctx, direction) {
        var style, original;
        if (direction === "ltr" || direction === "rtl") {
          style = ctx.canvas.style;
          original = [
            style.getPropertyValue("direction"),
            style.getPropertyPriority("direction")
          ];
          style.setProperty("direction", direction, "important");
          ctx.prevTextDirection = original;
        }
      };
      var restoreTextDirection = function(ctx) {
        var original = ctx.prevTextDirection;
        if (original !== void 0) {
          delete ctx.prevTextDirection;
          ctx.canvas.style.setProperty("direction", original[0], original[1]);
        }
      };
      var helpers_rtl = {
        getRtlAdapter: getAdapter,
        overrideTextDirection,
        restoreTextDirection
      };
      var helpers$1 = helpers_core;
      var easing = helpers_easing;
      var canvas = helpers_canvas;
      var options = helpers_options;
      var math = helpers_math;
      var rtl = helpers_rtl;
      helpers$1.easing = easing;
      helpers$1.canvas = canvas;
      helpers$1.options = options;
      helpers$1.math = math;
      helpers$1.rtl = rtl;
      function interpolate(start, view, model, ease) {
        var keys = Object.keys(model);
        var i, ilen, key, actual, origin, target, type, c0, c1;
        for (i = 0, ilen = keys.length; i < ilen; ++i) {
          key = keys[i];
          target = model[key];
          if (!view.hasOwnProperty(key)) {
            view[key] = target;
          }
          actual = view[key];
          if (actual === target || key[0] === "_") {
            continue;
          }
          if (!start.hasOwnProperty(key)) {
            start[key] = actual;
          }
          origin = start[key];
          type = typeof target;
          if (type === typeof origin) {
            if (type === "string") {
              c0 = chartjsColor(origin);
              if (c0.valid) {
                c1 = chartjsColor(target);
                if (c1.valid) {
                  view[key] = c1.mix(c0, ease).rgbString();
                  continue;
                }
              }
            } else if (helpers$1.isFinite(origin) && helpers$1.isFinite(target)) {
              view[key] = origin + (target - origin) * ease;
              continue;
            }
          }
          view[key] = target;
        }
      }
      var Element = function(configuration) {
        helpers$1.extend(this, configuration);
        this.initialize.apply(this, arguments);
      };
      helpers$1.extend(Element.prototype, {
        _type: void 0,
        initialize: function() {
          this.hidden = false;
        },
        pivot: function() {
          var me = this;
          if (!me._view) {
            me._view = helpers$1.extend({}, me._model);
          }
          me._start = {};
          return me;
        },
        transition: function(ease) {
          var me = this;
          var model = me._model;
          var start = me._start;
          var view = me._view;
          if (!model || ease === 1) {
            me._view = helpers$1.extend({}, model);
            me._start = null;
            return me;
          }
          if (!view) {
            view = me._view = {};
          }
          if (!start) {
            start = me._start = {};
          }
          interpolate(start, view, model, ease);
          return me;
        },
        tooltipPosition: function() {
          return {
            x: this._model.x,
            y: this._model.y
          };
        },
        hasValue: function() {
          return helpers$1.isNumber(this._model.x) && helpers$1.isNumber(this._model.y);
        }
      });
      Element.extend = helpers$1.inherits;
      var core_element = Element;
      var exports$3 = core_element.extend({
        chart: null,
        // the animation associated chart instance
        currentStep: 0,
        // the current animation step
        numSteps: 60,
        // default number of steps
        easing: "",
        // the easing to use for this animation
        render: null,
        // render function used by the animation service
        onAnimationProgress: null,
        // user specified callback to fire on each step of the animation
        onAnimationComplete: null
        // user specified callback to fire when the animation finishes
      });
      var core_animation = exports$3;
      Object.defineProperty(exports$3.prototype, "animationObject", {
        get: function() {
          return this;
        }
      });
      Object.defineProperty(exports$3.prototype, "chartInstance", {
        get: function() {
          return this.chart;
        },
        set: function(value) {
          this.chart = value;
        }
      });
      core_defaults._set("global", {
        animation: {
          duration: 1e3,
          easing: "easeOutQuart",
          onProgress: helpers$1.noop,
          onComplete: helpers$1.noop
        }
      });
      var core_animations = {
        animations: [],
        request: null,
        /**
         * @param {Chart} chart - The chart to animate.
         * @param {Chart.Animation} animation - The animation that we will animate.
         * @param {number} duration - The animation duration in ms.
         * @param {boolean} lazy - if true, the chart is not marked as animating to enable more responsive interactions
         */
        addAnimation: function(chart, animation, duration, lazy) {
          var animations = this.animations;
          var i, ilen;
          animation.chart = chart;
          animation.startTime = Date.now();
          animation.duration = duration;
          if (!lazy) {
            chart.animating = true;
          }
          for (i = 0, ilen = animations.length; i < ilen; ++i) {
            if (animations[i].chart === chart) {
              animations[i] = animation;
              return;
            }
          }
          animations.push(animation);
          if (animations.length === 1) {
            this.requestAnimationFrame();
          }
        },
        cancelAnimation: function(chart) {
          var index = helpers$1.findIndex(this.animations, function(animation) {
            return animation.chart === chart;
          });
          if (index !== -1) {
            this.animations.splice(index, 1);
            chart.animating = false;
          }
        },
        requestAnimationFrame: function() {
          var me = this;
          if (me.request === null) {
            me.request = helpers$1.requestAnimFrame.call(window, function() {
              me.request = null;
              me.startDigest();
            });
          }
        },
        /**
         * @private
         */
        startDigest: function() {
          var me = this;
          me.advance();
          if (me.animations.length > 0) {
            me.requestAnimationFrame();
          }
        },
        /**
         * @private
         */
        advance: function() {
          var animations = this.animations;
          var animation, chart, numSteps, nextStep;
          var i = 0;
          while (i < animations.length) {
            animation = animations[i];
            chart = animation.chart;
            numSteps = animation.numSteps;
            nextStep = Math.floor((Date.now() - animation.startTime) / animation.duration * numSteps) + 1;
            animation.currentStep = Math.min(nextStep, numSteps);
            helpers$1.callback(animation.render, [chart, animation], chart);
            helpers$1.callback(animation.onAnimationProgress, [animation], chart);
            if (animation.currentStep >= numSteps) {
              helpers$1.callback(animation.onAnimationComplete, [animation], chart);
              chart.animating = false;
              animations.splice(i, 1);
            } else {
              ++i;
            }
          }
        }
      };
      var resolve = helpers$1.options.resolve;
      var arrayEvents = ["push", "pop", "shift", "splice", "unshift"];
      function listenArrayEvents(array, listener) {
        if (array._chartjs) {
          array._chartjs.listeners.push(listener);
          return;
        }
        Object.defineProperty(array, "_chartjs", {
          configurable: true,
          enumerable: false,
          value: {
            listeners: [listener]
          }
        });
        arrayEvents.forEach(function(key) {
          var method = "onData" + key.charAt(0).toUpperCase() + key.slice(1);
          var base = array[key];
          Object.defineProperty(array, key, {
            configurable: true,
            enumerable: false,
            value: function() {
              var args = Array.prototype.slice.call(arguments);
              var res = base.apply(this, args);
              helpers$1.each(array._chartjs.listeners, function(object) {
                if (typeof object[method] === "function") {
                  object[method].apply(object, args);
                }
              });
              return res;
            }
          });
        });
      }
      function unlistenArrayEvents(array, listener) {
        var stub = array._chartjs;
        if (!stub) {
          return;
        }
        var listeners = stub.listeners;
        var index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
        if (listeners.length > 0) {
          return;
        }
        arrayEvents.forEach(function(key) {
          delete array[key];
        });
        delete array._chartjs;
      }
      var DatasetController = function(chart, datasetIndex) {
        this.initialize(chart, datasetIndex);
      };
      helpers$1.extend(DatasetController.prototype, {
        /**
         * Element type used to generate a meta dataset (e.g. Chart.element.Line).
         * @type {Chart.core.element}
         */
        datasetElementType: null,
        /**
         * Element type used to generate a meta data (e.g. Chart.element.Point).
         * @type {Chart.core.element}
         */
        dataElementType: null,
        /**
         * Dataset element option keys to be resolved in _resolveDatasetElementOptions.
         * A derived controller may override this to resolve controller-specific options.
         * The keys defined here are for backward compatibility for legend styles.
         * @private
         */
        _datasetElementOptions: [
          "backgroundColor",
          "borderCapStyle",
          "borderColor",
          "borderDash",
          "borderDashOffset",
          "borderJoinStyle",
          "borderWidth"
        ],
        /**
         * Data element option keys to be resolved in _resolveDataElementOptions.
         * A derived controller may override this to resolve controller-specific options.
         * The keys defined here are for backward compatibility for legend styles.
         * @private
         */
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderWidth",
          "pointStyle"
        ],
        initialize: function(chart, datasetIndex) {
          var me = this;
          me.chart = chart;
          me.index = datasetIndex;
          me.linkScales();
          me.addElements();
          me._type = me.getMeta().type;
        },
        updateIndex: function(datasetIndex) {
          this.index = datasetIndex;
        },
        linkScales: function() {
          var me = this;
          var meta = me.getMeta();
          var chart = me.chart;
          var scales2 = chart.scales;
          var dataset = me.getDataset();
          var scalesOpts = chart.options.scales;
          if (meta.xAxisID === null || !(meta.xAxisID in scales2) || dataset.xAxisID) {
            meta.xAxisID = dataset.xAxisID || scalesOpts.xAxes[0].id;
          }
          if (meta.yAxisID === null || !(meta.yAxisID in scales2) || dataset.yAxisID) {
            meta.yAxisID = dataset.yAxisID || scalesOpts.yAxes[0].id;
          }
        },
        getDataset: function() {
          return this.chart.data.datasets[this.index];
        },
        getMeta: function() {
          return this.chart.getDatasetMeta(this.index);
        },
        getScaleForId: function(scaleID) {
          return this.chart.scales[scaleID];
        },
        /**
         * @private
         */
        _getValueScaleId: function() {
          return this.getMeta().yAxisID;
        },
        /**
         * @private
         */
        _getIndexScaleId: function() {
          return this.getMeta().xAxisID;
        },
        /**
         * @private
         */
        _getValueScale: function() {
          return this.getScaleForId(this._getValueScaleId());
        },
        /**
         * @private
         */
        _getIndexScale: function() {
          return this.getScaleForId(this._getIndexScaleId());
        },
        reset: function() {
          this._update(true);
        },
        /**
         * @private
         */
        destroy: function() {
          if (this._data) {
            unlistenArrayEvents(this._data, this);
          }
        },
        createMetaDataset: function() {
          var me = this;
          var type = me.datasetElementType;
          return type && new type({
            _chart: me.chart,
            _datasetIndex: me.index
          });
        },
        createMetaData: function(index) {
          var me = this;
          var type = me.dataElementType;
          return type && new type({
            _chart: me.chart,
            _datasetIndex: me.index,
            _index: index
          });
        },
        addElements: function() {
          var me = this;
          var meta = me.getMeta();
          var data = me.getDataset().data || [];
          var metaData = meta.data;
          var i, ilen;
          for (i = 0, ilen = data.length; i < ilen; ++i) {
            metaData[i] = metaData[i] || me.createMetaData(i);
          }
          meta.dataset = meta.dataset || me.createMetaDataset();
        },
        addElementAndReset: function(index) {
          var element = this.createMetaData(index);
          this.getMeta().data.splice(index, 0, element);
          this.updateElement(element, index, true);
        },
        buildOrUpdateElements: function() {
          var me = this;
          var dataset = me.getDataset();
          var data = dataset.data || (dataset.data = []);
          if (me._data !== data) {
            if (me._data) {
              unlistenArrayEvents(me._data, me);
            }
            if (data && Object.isExtensible(data)) {
              listenArrayEvents(data, me);
            }
            me._data = data;
          }
          me.resyncElements();
        },
        /**
         * Returns the merged user-supplied and default dataset-level options
         * @private
         */
        _configure: function() {
          var me = this;
          me._config = helpers$1.merge(/* @__PURE__ */ Object.create(null), [
            me.chart.options.datasets[me._type],
            me.getDataset()
          ], {
            merger: function(key, target, source) {
              if (key !== "_meta" && key !== "data") {
                helpers$1._merger(key, target, source);
              }
            }
          });
        },
        _update: function(reset) {
          var me = this;
          me._configure();
          me._cachedDataOpts = null;
          me.update(reset);
        },
        update: helpers$1.noop,
        transition: function(easingValue) {
          var meta = this.getMeta();
          var elements2 = meta.data || [];
          var ilen = elements2.length;
          var i = 0;
          for (; i < ilen; ++i) {
            elements2[i].transition(easingValue);
          }
          if (meta.dataset) {
            meta.dataset.transition(easingValue);
          }
        },
        draw: function() {
          var meta = this.getMeta();
          var elements2 = meta.data || [];
          var ilen = elements2.length;
          var i = 0;
          if (meta.dataset) {
            meta.dataset.draw();
          }
          for (; i < ilen; ++i) {
            elements2[i].draw();
          }
        },
        /**
         * Returns a set of predefined style properties that should be used to represent the dataset
         * or the data if the index is specified
         * @param {number} index - data index
         * @return {IStyleInterface} style object
         */
        getStyle: function(index) {
          var me = this;
          var meta = me.getMeta();
          var dataset = meta.dataset;
          var style;
          me._configure();
          if (dataset && index === void 0) {
            style = me._resolveDatasetElementOptions(dataset || {});
          } else {
            index = index || 0;
            style = me._resolveDataElementOptions(meta.data[index] || {}, index);
          }
          if (style.fill === false || style.fill === null) {
            style.backgroundColor = style.borderColor;
          }
          return style;
        },
        /**
         * @private
         */
        _resolveDatasetElementOptions: function(element, hover) {
          var me = this;
          var chart = me.chart;
          var datasetOpts = me._config;
          var custom = element.custom || {};
          var options2 = chart.options.elements[me.datasetElementType.prototype._type] || {};
          var elementOptions = me._datasetElementOptions;
          var values = {};
          var i, ilen, key, readKey;
          var context = {
            chart,
            dataset: me.getDataset(),
            datasetIndex: me.index,
            hover
          };
          for (i = 0, ilen = elementOptions.length; i < ilen; ++i) {
            key = elementOptions[i];
            readKey = hover ? "hover" + key.charAt(0).toUpperCase() + key.slice(1) : key;
            values[key] = resolve([
              custom[readKey],
              datasetOpts[readKey],
              options2[readKey]
            ], context);
          }
          return values;
        },
        /**
         * @private
         */
        _resolveDataElementOptions: function(element, index) {
          var me = this;
          var custom = element && element.custom;
          var cached = me._cachedDataOpts;
          if (cached && !custom) {
            return cached;
          }
          var chart = me.chart;
          var datasetOpts = me._config;
          var options2 = chart.options.elements[me.dataElementType.prototype._type] || {};
          var elementOptions = me._dataElementOptions;
          var values = {};
          var context = {
            chart,
            dataIndex: index,
            dataset: me.getDataset(),
            datasetIndex: me.index
          };
          var info = { cacheable: !custom };
          var keys, i, ilen, key;
          custom = custom || {};
          if (helpers$1.isArray(elementOptions)) {
            for (i = 0, ilen = elementOptions.length; i < ilen; ++i) {
              key = elementOptions[i];
              values[key] = resolve([
                custom[key],
                datasetOpts[key],
                options2[key]
              ], context, index, info);
            }
          } else {
            keys = Object.keys(elementOptions);
            for (i = 0, ilen = keys.length; i < ilen; ++i) {
              key = keys[i];
              values[key] = resolve([
                custom[key],
                datasetOpts[elementOptions[key]],
                datasetOpts[key],
                options2[key]
              ], context, index, info);
            }
          }
          if (info.cacheable) {
            me._cachedDataOpts = Object.freeze(values);
          }
          return values;
        },
        removeHoverStyle: function(element) {
          helpers$1.merge(element._model, element.$previousStyle || {});
          delete element.$previousStyle;
        },
        setHoverStyle: function(element) {
          var dataset = this.chart.data.datasets[element._datasetIndex];
          var index = element._index;
          var custom = element.custom || {};
          var model = element._model;
          var getHoverColor = helpers$1.getHoverColor;
          element.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth
          };
          model.backgroundColor = resolve([custom.hoverBackgroundColor, dataset.hoverBackgroundColor, getHoverColor(model.backgroundColor)], void 0, index);
          model.borderColor = resolve([custom.hoverBorderColor, dataset.hoverBorderColor, getHoverColor(model.borderColor)], void 0, index);
          model.borderWidth = resolve([custom.hoverBorderWidth, dataset.hoverBorderWidth, model.borderWidth], void 0, index);
        },
        /**
         * @private
         */
        _removeDatasetHoverStyle: function() {
          var element = this.getMeta().dataset;
          if (element) {
            this.removeHoverStyle(element);
          }
        },
        /**
         * @private
         */
        _setDatasetHoverStyle: function() {
          var element = this.getMeta().dataset;
          var prev = {};
          var i, ilen, key, keys, hoverOptions, model;
          if (!element) {
            return;
          }
          model = element._model;
          hoverOptions = this._resolveDatasetElementOptions(element, true);
          keys = Object.keys(hoverOptions);
          for (i = 0, ilen = keys.length; i < ilen; ++i) {
            key = keys[i];
            prev[key] = model[key];
            model[key] = hoverOptions[key];
          }
          element.$previousStyle = prev;
        },
        /**
         * @private
         */
        resyncElements: function() {
          var me = this;
          var meta = me.getMeta();
          var data = me.getDataset().data;
          var numMeta = meta.data.length;
          var numData = data.length;
          if (numData < numMeta) {
            meta.data.splice(numData, numMeta - numData);
          } else if (numData > numMeta) {
            me.insertElements(numMeta, numData - numMeta);
          }
        },
        /**
         * @private
         */
        insertElements: function(start, count) {
          for (var i = 0; i < count; ++i) {
            this.addElementAndReset(start + i);
          }
        },
        /**
         * @private
         */
        onDataPush: function() {
          var count = arguments.length;
          this.insertElements(this.getDataset().data.length - count, count);
        },
        /**
         * @private
         */
        onDataPop: function() {
          this.getMeta().data.pop();
        },
        /**
         * @private
         */
        onDataShift: function() {
          this.getMeta().data.shift();
        },
        /**
         * @private
         */
        onDataSplice: function(start, count) {
          this.getMeta().data.splice(start, count);
          this.insertElements(start, arguments.length - 2);
        },
        /**
         * @private
         */
        onDataUnshift: function() {
          this.insertElements(0, arguments.length);
        }
      });
      DatasetController.extend = helpers$1.inherits;
      var core_datasetController = DatasetController;
      var TAU = Math.PI * 2;
      core_defaults._set("global", {
        elements: {
          arc: {
            backgroundColor: core_defaults.global.defaultColor,
            borderColor: "#fff",
            borderWidth: 2,
            borderAlign: "center"
          }
        }
      });
      function clipArc(ctx, arc) {
        var startAngle = arc.startAngle;
        var endAngle = arc.endAngle;
        var pixelMargin = arc.pixelMargin;
        var angleMargin = pixelMargin / arc.outerRadius;
        var x = arc.x;
        var y = arc.y;
        ctx.beginPath();
        ctx.arc(x, y, arc.outerRadius, startAngle - angleMargin, endAngle + angleMargin);
        if (arc.innerRadius > pixelMargin) {
          angleMargin = pixelMargin / arc.innerRadius;
          ctx.arc(x, y, arc.innerRadius - pixelMargin, endAngle + angleMargin, startAngle - angleMargin, true);
        } else {
          ctx.arc(x, y, pixelMargin, endAngle + Math.PI / 2, startAngle - Math.PI / 2);
        }
        ctx.closePath();
        ctx.clip();
      }
      function drawFullCircleBorders(ctx, vm, arc, inner) {
        var endAngle = arc.endAngle;
        var i;
        if (inner) {
          arc.endAngle = arc.startAngle + TAU;
          clipArc(ctx, arc);
          arc.endAngle = endAngle;
          if (arc.endAngle === arc.startAngle && arc.fullCircles) {
            arc.endAngle += TAU;
            arc.fullCircles--;
          }
        }
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, arc.innerRadius, arc.startAngle + TAU, arc.startAngle, true);
        for (i = 0; i < arc.fullCircles; ++i) {
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, vm.outerRadius, arc.startAngle, arc.startAngle + TAU);
        for (i = 0; i < arc.fullCircles; ++i) {
          ctx.stroke();
        }
      }
      function drawBorder(ctx, vm, arc) {
        var inner = vm.borderAlign === "inner";
        if (inner) {
          ctx.lineWidth = vm.borderWidth * 2;
          ctx.lineJoin = "round";
        } else {
          ctx.lineWidth = vm.borderWidth;
          ctx.lineJoin = "bevel";
        }
        if (arc.fullCircles) {
          drawFullCircleBorders(ctx, vm, arc, inner);
        }
        if (inner) {
          clipArc(ctx, arc);
        }
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, vm.outerRadius, arc.startAngle, arc.endAngle);
        ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
        ctx.closePath();
        ctx.stroke();
      }
      var element_arc = core_element.extend({
        _type: "arc",
        inLabelRange: function(mouseX) {
          var vm = this._view;
          if (vm) {
            return Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2);
          }
          return false;
        },
        inRange: function(chartX, chartY) {
          var vm = this._view;
          if (vm) {
            var pointRelativePosition = helpers$1.getAngleFromPoint(vm, { x: chartX, y: chartY });
            var angle = pointRelativePosition.angle;
            var distance = pointRelativePosition.distance;
            var startAngle = vm.startAngle;
            var endAngle = vm.endAngle;
            while (endAngle < startAngle) {
              endAngle += TAU;
            }
            while (angle > endAngle) {
              angle -= TAU;
            }
            while (angle < startAngle) {
              angle += TAU;
            }
            var betweenAngles = angle >= startAngle && angle <= endAngle;
            var withinRadius = distance >= vm.innerRadius && distance <= vm.outerRadius;
            return betweenAngles && withinRadius;
          }
          return false;
        },
        getCenterPoint: function() {
          var vm = this._view;
          var halfAngle = (vm.startAngle + vm.endAngle) / 2;
          var halfRadius = (vm.innerRadius + vm.outerRadius) / 2;
          return {
            x: vm.x + Math.cos(halfAngle) * halfRadius,
            y: vm.y + Math.sin(halfAngle) * halfRadius
          };
        },
        getArea: function() {
          var vm = this._view;
          return Math.PI * ((vm.endAngle - vm.startAngle) / (2 * Math.PI)) * (Math.pow(vm.outerRadius, 2) - Math.pow(vm.innerRadius, 2));
        },
        tooltipPosition: function() {
          var vm = this._view;
          var centreAngle = vm.startAngle + (vm.endAngle - vm.startAngle) / 2;
          var rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;
          return {
            x: vm.x + Math.cos(centreAngle) * rangeFromCentre,
            y: vm.y + Math.sin(centreAngle) * rangeFromCentre
          };
        },
        draw: function() {
          var ctx = this._chart.ctx;
          var vm = this._view;
          var pixelMargin = vm.borderAlign === "inner" ? 0.33 : 0;
          var arc = {
            x: vm.x,
            y: vm.y,
            innerRadius: vm.innerRadius,
            outerRadius: Math.max(vm.outerRadius - pixelMargin, 0),
            pixelMargin,
            startAngle: vm.startAngle,
            endAngle: vm.endAngle,
            fullCircles: Math.floor(vm.circumference / TAU)
          };
          var i;
          ctx.save();
          ctx.fillStyle = vm.backgroundColor;
          ctx.strokeStyle = vm.borderColor;
          if (arc.fullCircles) {
            arc.endAngle = arc.startAngle + TAU;
            ctx.beginPath();
            ctx.arc(arc.x, arc.y, arc.outerRadius, arc.startAngle, arc.endAngle);
            ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
            ctx.closePath();
            for (i = 0; i < arc.fullCircles; ++i) {
              ctx.fill();
            }
            arc.endAngle = arc.startAngle + vm.circumference % TAU;
          }
          ctx.beginPath();
          ctx.arc(arc.x, arc.y, arc.outerRadius, arc.startAngle, arc.endAngle);
          ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
          ctx.closePath();
          ctx.fill();
          if (vm.borderWidth) {
            drawBorder(ctx, vm, arc);
          }
          ctx.restore();
        }
      });
      var valueOrDefault$1 = helpers$1.valueOrDefault;
      var defaultColor = core_defaults.global.defaultColor;
      core_defaults._set("global", {
        elements: {
          line: {
            tension: 0.4,
            backgroundColor: defaultColor,
            borderWidth: 3,
            borderColor: defaultColor,
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            capBezierPoints: true,
            fill: true
            // do we fill in the area between the line and its base axis
          }
        }
      });
      var element_line = core_element.extend({
        _type: "line",
        draw: function() {
          var me = this;
          var vm = me._view;
          var ctx = me._chart.ctx;
          var spanGaps = vm.spanGaps;
          var points = me._children.slice();
          var globalDefaults = core_defaults.global;
          var globalOptionLineElements = globalDefaults.elements.line;
          var lastDrawnIndex = -1;
          var closePath = me._loop;
          var index, previous, currentVM;
          if (!points.length) {
            return;
          }
          if (me._loop) {
            for (index = 0; index < points.length; ++index) {
              previous = helpers$1.previousItem(points, index);
              if (!points[index]._view.skip && previous._view.skip) {
                points = points.slice(index).concat(points.slice(0, index));
                closePath = spanGaps;
                break;
              }
            }
            if (closePath) {
              points.push(points[0]);
            }
          }
          ctx.save();
          ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle;
          if (ctx.setLineDash) {
            ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
          }
          ctx.lineDashOffset = valueOrDefault$1(vm.borderDashOffset, globalOptionLineElements.borderDashOffset);
          ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
          ctx.lineWidth = valueOrDefault$1(vm.borderWidth, globalOptionLineElements.borderWidth);
          ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;
          ctx.beginPath();
          currentVM = points[0]._view;
          if (!currentVM.skip) {
            ctx.moveTo(currentVM.x, currentVM.y);
            lastDrawnIndex = 0;
          }
          for (index = 1; index < points.length; ++index) {
            currentVM = points[index]._view;
            previous = lastDrawnIndex === -1 ? helpers$1.previousItem(points, index) : points[lastDrawnIndex];
            if (!currentVM.skip) {
              if (lastDrawnIndex !== index - 1 && !spanGaps || lastDrawnIndex === -1) {
                ctx.moveTo(currentVM.x, currentVM.y);
              } else {
                helpers$1.canvas.lineTo(ctx, previous._view, currentVM);
              }
              lastDrawnIndex = index;
            }
          }
          if (closePath) {
            ctx.closePath();
          }
          ctx.stroke();
          ctx.restore();
        }
      });
      var valueOrDefault$2 = helpers$1.valueOrDefault;
      var defaultColor$1 = core_defaults.global.defaultColor;
      core_defaults._set("global", {
        elements: {
          point: {
            radius: 3,
            pointStyle: "circle",
            backgroundColor: defaultColor$1,
            borderColor: defaultColor$1,
            borderWidth: 1,
            // Hover
            hitRadius: 1,
            hoverRadius: 4,
            hoverBorderWidth: 1
          }
        }
      });
      function xRange(mouseX) {
        var vm = this._view;
        return vm ? Math.abs(mouseX - vm.x) < vm.radius + vm.hitRadius : false;
      }
      function yRange(mouseY) {
        var vm = this._view;
        return vm ? Math.abs(mouseY - vm.y) < vm.radius + vm.hitRadius : false;
      }
      var element_point = core_element.extend({
        _type: "point",
        inRange: function(mouseX, mouseY) {
          var vm = this._view;
          return vm ? Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2) < Math.pow(vm.hitRadius + vm.radius, 2) : false;
        },
        inLabelRange: xRange,
        inXRange: xRange,
        inYRange: yRange,
        getCenterPoint: function() {
          var vm = this._view;
          return {
            x: vm.x,
            y: vm.y
          };
        },
        getArea: function() {
          return Math.PI * Math.pow(this._view.radius, 2);
        },
        tooltipPosition: function() {
          var vm = this._view;
          return {
            x: vm.x,
            y: vm.y,
            padding: vm.radius + vm.borderWidth
          };
        },
        draw: function(chartArea) {
          var vm = this._view;
          var ctx = this._chart.ctx;
          var pointStyle = vm.pointStyle;
          var rotation = vm.rotation;
          var radius = vm.radius;
          var x = vm.x;
          var y = vm.y;
          var globalDefaults = core_defaults.global;
          var defaultColor2 = globalDefaults.defaultColor;
          if (vm.skip) {
            return;
          }
          if (chartArea === void 0 || helpers$1.canvas._isPointInArea(vm, chartArea)) {
            ctx.strokeStyle = vm.borderColor || defaultColor2;
            ctx.lineWidth = valueOrDefault$2(vm.borderWidth, globalDefaults.elements.point.borderWidth);
            ctx.fillStyle = vm.backgroundColor || defaultColor2;
            helpers$1.canvas.drawPoint(ctx, pointStyle, radius, x, y, rotation);
          }
        }
      });
      var defaultColor$2 = core_defaults.global.defaultColor;
      core_defaults._set("global", {
        elements: {
          rectangle: {
            backgroundColor: defaultColor$2,
            borderColor: defaultColor$2,
            borderSkipped: "bottom",
            borderWidth: 0
          }
        }
      });
      function isVertical(vm) {
        return vm && vm.width !== void 0;
      }
      function getBarBounds(vm) {
        var x1, x2, y1, y2, half;
        if (isVertical(vm)) {
          half = vm.width / 2;
          x1 = vm.x - half;
          x2 = vm.x + half;
          y1 = Math.min(vm.y, vm.base);
          y2 = Math.max(vm.y, vm.base);
        } else {
          half = vm.height / 2;
          x1 = Math.min(vm.x, vm.base);
          x2 = Math.max(vm.x, vm.base);
          y1 = vm.y - half;
          y2 = vm.y + half;
        }
        return {
          left: x1,
          top: y1,
          right: x2,
          bottom: y2
        };
      }
      function swap(orig, v1, v2) {
        return orig === v1 ? v2 : orig === v2 ? v1 : orig;
      }
      function parseBorderSkipped(vm) {
        var edge = vm.borderSkipped;
        var res = {};
        if (!edge) {
          return res;
        }
        if (vm.horizontal) {
          if (vm.base > vm.x) {
            edge = swap(edge, "left", "right");
          }
        } else if (vm.base < vm.y) {
          edge = swap(edge, "bottom", "top");
        }
        res[edge] = true;
        return res;
      }
      function parseBorderWidth(vm, maxW, maxH) {
        var value = vm.borderWidth;
        var skip2 = parseBorderSkipped(vm);
        var t, r, b, l;
        if (helpers$1.isObject(value)) {
          t = +value.top || 0;
          r = +value.right || 0;
          b = +value.bottom || 0;
          l = +value.left || 0;
        } else {
          t = r = b = l = +value || 0;
        }
        return {
          t: skip2.top || t < 0 ? 0 : t > maxH ? maxH : t,
          r: skip2.right || r < 0 ? 0 : r > maxW ? maxW : r,
          b: skip2.bottom || b < 0 ? 0 : b > maxH ? maxH : b,
          l: skip2.left || l < 0 ? 0 : l > maxW ? maxW : l
        };
      }
      function boundingRects(vm) {
        var bounds = getBarBounds(vm);
        var width = bounds.right - bounds.left;
        var height = bounds.bottom - bounds.top;
        var border = parseBorderWidth(vm, width / 2, height / 2);
        return {
          outer: {
            x: bounds.left,
            y: bounds.top,
            w: width,
            h: height
          },
          inner: {
            x: bounds.left + border.l,
            y: bounds.top + border.t,
            w: width - border.l - border.r,
            h: height - border.t - border.b
          }
        };
      }
      function inRange(vm, x, y) {
        var skipX = x === null;
        var skipY = y === null;
        var bounds = !vm || skipX && skipY ? false : getBarBounds(vm);
        return bounds && (skipX || x >= bounds.left && x <= bounds.right) && (skipY || y >= bounds.top && y <= bounds.bottom);
      }
      var element_rectangle = core_element.extend({
        _type: "rectangle",
        draw: function() {
          var ctx = this._chart.ctx;
          var vm = this._view;
          var rects = boundingRects(vm);
          var outer = rects.outer;
          var inner = rects.inner;
          ctx.fillStyle = vm.backgroundColor;
          ctx.fillRect(outer.x, outer.y, outer.w, outer.h);
          if (outer.w === inner.w && outer.h === inner.h) {
            return;
          }
          ctx.save();
          ctx.beginPath();
          ctx.rect(outer.x, outer.y, outer.w, outer.h);
          ctx.clip();
          ctx.fillStyle = vm.borderColor;
          ctx.rect(inner.x, inner.y, inner.w, inner.h);
          ctx.fill("evenodd");
          ctx.restore();
        },
        height: function() {
          var vm = this._view;
          return vm.base - vm.y;
        },
        inRange: function(mouseX, mouseY) {
          return inRange(this._view, mouseX, mouseY);
        },
        inLabelRange: function(mouseX, mouseY) {
          var vm = this._view;
          return isVertical(vm) ? inRange(vm, mouseX, null) : inRange(vm, null, mouseY);
        },
        inXRange: function(mouseX) {
          return inRange(this._view, mouseX, null);
        },
        inYRange: function(mouseY) {
          return inRange(this._view, null, mouseY);
        },
        getCenterPoint: function() {
          var vm = this._view;
          var x, y;
          if (isVertical(vm)) {
            x = vm.x;
            y = (vm.y + vm.base) / 2;
          } else {
            x = (vm.x + vm.base) / 2;
            y = vm.y;
          }
          return { x, y };
        },
        getArea: function() {
          var vm = this._view;
          return isVertical(vm) ? vm.width * Math.abs(vm.y - vm.base) : vm.height * Math.abs(vm.x - vm.base);
        },
        tooltipPosition: function() {
          var vm = this._view;
          return {
            x: vm.x,
            y: vm.y
          };
        }
      });
      var elements = {};
      var Arc = element_arc;
      var Line = element_line;
      var Point = element_point;
      var Rectangle = element_rectangle;
      elements.Arc = Arc;
      elements.Line = Line;
      elements.Point = Point;
      elements.Rectangle = Rectangle;
      var deprecated = helpers$1._deprecated;
      var valueOrDefault$3 = helpers$1.valueOrDefault;
      core_defaults._set("bar", {
        hover: {
          mode: "label"
        },
        scales: {
          xAxes: [{
            type: "category",
            offset: true,
            gridLines: {
              offsetGridLines: true
            }
          }],
          yAxes: [{
            type: "linear"
          }]
        }
      });
      core_defaults._set("global", {
        datasets: {
          bar: {
            categoryPercentage: 0.8,
            barPercentage: 0.9
          }
        }
      });
      function computeMinSampleSize(scale2, pixels) {
        var min = scale2._length;
        var prev, curr, i, ilen;
        for (i = 1, ilen = pixels.length; i < ilen; ++i) {
          min = Math.min(min, Math.abs(pixels[i] - pixels[i - 1]));
        }
        for (i = 0, ilen = scale2.getTicks().length; i < ilen; ++i) {
          curr = scale2.getPixelForTick(i);
          min = i > 0 ? Math.min(min, Math.abs(curr - prev)) : min;
          prev = curr;
        }
        return min;
      }
      function computeFitCategoryTraits(index, ruler, options2) {
        var thickness = options2.barThickness;
        var count = ruler.stackCount;
        var curr = ruler.pixels[index];
        var min = helpers$1.isNullOrUndef(thickness) ? computeMinSampleSize(ruler.scale, ruler.pixels) : -1;
        var size, ratio;
        if (helpers$1.isNullOrUndef(thickness)) {
          size = min * options2.categoryPercentage;
          ratio = options2.barPercentage;
        } else {
          size = thickness * count;
          ratio = 1;
        }
        return {
          chunk: size / count,
          ratio,
          start: curr - size / 2
        };
      }
      function computeFlexCategoryTraits(index, ruler, options2) {
        var pixels = ruler.pixels;
        var curr = pixels[index];
        var prev = index > 0 ? pixels[index - 1] : null;
        var next = index < pixels.length - 1 ? pixels[index + 1] : null;
        var percent = options2.categoryPercentage;
        var start, size;
        if (prev === null) {
          prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
        }
        if (next === null) {
          next = curr + curr - prev;
        }
        start = curr - (curr - Math.min(prev, next)) / 2 * percent;
        size = Math.abs(next - prev) / 2 * percent;
        return {
          chunk: size / ruler.stackCount,
          ratio: options2.barPercentage,
          start
        };
      }
      var controller_bar = core_datasetController.extend({
        dataElementType: elements.Rectangle,
        /**
         * @private
         */
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderSkipped",
          "borderWidth",
          "barPercentage",
          "barThickness",
          "categoryPercentage",
          "maxBarThickness",
          "minBarLength"
        ],
        initialize: function() {
          var me = this;
          var meta, scaleOpts;
          core_datasetController.prototype.initialize.apply(me, arguments);
          meta = me.getMeta();
          meta.stack = me.getDataset().stack;
          meta.bar = true;
          scaleOpts = me._getIndexScale().options;
          deprecated("bar chart", scaleOpts.barPercentage, "scales.[x/y]Axes.barPercentage", "dataset.barPercentage");
          deprecated("bar chart", scaleOpts.barThickness, "scales.[x/y]Axes.barThickness", "dataset.barThickness");
          deprecated("bar chart", scaleOpts.categoryPercentage, "scales.[x/y]Axes.categoryPercentage", "dataset.categoryPercentage");
          deprecated("bar chart", me._getValueScale().options.minBarLength, "scales.[x/y]Axes.minBarLength", "dataset.minBarLength");
          deprecated("bar chart", scaleOpts.maxBarThickness, "scales.[x/y]Axes.maxBarThickness", "dataset.maxBarThickness");
        },
        update: function(reset) {
          var me = this;
          var rects = me.getMeta().data;
          var i, ilen;
          me._ruler = me.getRuler();
          for (i = 0, ilen = rects.length; i < ilen; ++i) {
            me.updateElement(rects[i], i, reset);
          }
        },
        updateElement: function(rectangle, index, reset) {
          var me = this;
          var meta = me.getMeta();
          var dataset = me.getDataset();
          var options2 = me._resolveDataElementOptions(rectangle, index);
          rectangle._xScale = me.getScaleForId(meta.xAxisID);
          rectangle._yScale = me.getScaleForId(meta.yAxisID);
          rectangle._datasetIndex = me.index;
          rectangle._index = index;
          rectangle._model = {
            backgroundColor: options2.backgroundColor,
            borderColor: options2.borderColor,
            borderSkipped: options2.borderSkipped,
            borderWidth: options2.borderWidth,
            datasetLabel: dataset.label,
            label: me.chart.data.labels[index]
          };
          if (helpers$1.isArray(dataset.data[index])) {
            rectangle._model.borderSkipped = null;
          }
          me._updateElementGeometry(rectangle, index, reset, options2);
          rectangle.pivot();
        },
        /**
         * @private
         */
        _updateElementGeometry: function(rectangle, index, reset, options2) {
          var me = this;
          var model = rectangle._model;
          var vscale = me._getValueScale();
          var base = vscale.getBasePixel();
          var horizontal = vscale.isHorizontal();
          var ruler = me._ruler || me.getRuler();
          var vpixels = me.calculateBarValuePixels(me.index, index, options2);
          var ipixels = me.calculateBarIndexPixels(me.index, index, ruler, options2);
          model.horizontal = horizontal;
          model.base = reset ? base : vpixels.base;
          model.x = horizontal ? reset ? base : vpixels.head : ipixels.center;
          model.y = horizontal ? ipixels.center : reset ? base : vpixels.head;
          model.height = horizontal ? ipixels.size : void 0;
          model.width = horizontal ? void 0 : ipixels.size;
        },
        /**
         * Returns the stacks based on groups and bar visibility.
         * @param {number} [last] - The dataset index
         * @returns {string[]} The list of stack IDs
         * @private
         */
        _getStacks: function(last) {
          var me = this;
          var scale2 = me._getIndexScale();
          var metasets = scale2._getMatchingVisibleMetas(me._type);
          var stacked = scale2.options.stacked;
          var ilen = metasets.length;
          var stacks = [];
          var i, meta;
          for (i = 0; i < ilen; ++i) {
            meta = metasets[i];
            if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === void 0 && meta.stack === void 0) {
              stacks.push(meta.stack);
            }
            if (meta.index === last) {
              break;
            }
          }
          return stacks;
        },
        /**
         * Returns the effective number of stacks based on groups and bar visibility.
         * @private
         */
        getStackCount: function() {
          return this._getStacks().length;
        },
        /**
         * Returns the stack index for the given dataset based on groups and bar visibility.
         * @param {number} [datasetIndex] - The dataset index
         * @param {string} [name] - The stack name to find
         * @returns {number} The stack index
         * @private
         */
        getStackIndex: function(datasetIndex, name2) {
          var stacks = this._getStacks(datasetIndex);
          var index = name2 !== void 0 ? stacks.indexOf(name2) : -1;
          return index === -1 ? stacks.length - 1 : index;
        },
        /**
         * @private
         */
        getRuler: function() {
          var me = this;
          var scale2 = me._getIndexScale();
          var pixels = [];
          var i, ilen;
          for (i = 0, ilen = me.getMeta().data.length; i < ilen; ++i) {
            pixels.push(scale2.getPixelForValue(null, i, me.index));
          }
          return {
            pixels,
            start: scale2._startPixel,
            end: scale2._endPixel,
            stackCount: me.getStackCount(),
            scale: scale2
          };
        },
        /**
         * Note: pixel values are not clamped to the scale area.
         * @private
         */
        calculateBarValuePixels: function(datasetIndex, index, options2) {
          var me = this;
          var chart = me.chart;
          var scale2 = me._getValueScale();
          var isHorizontal = scale2.isHorizontal();
          var datasets = chart.data.datasets;
          var metasets = scale2._getMatchingVisibleMetas(me._type);
          var value = scale2._parseValue(datasets[datasetIndex].data[index]);
          var minBarLength = options2.minBarLength;
          var stacked = scale2.options.stacked;
          var stack = me.getMeta().stack;
          var start = value.start === void 0 ? 0 : value.max >= 0 && value.min >= 0 ? value.min : value.max;
          var length = value.start === void 0 ? value.end : value.max >= 0 && value.min >= 0 ? value.max - value.min : value.min - value.max;
          var ilen = metasets.length;
          var i, imeta, ivalue, base, head, size, stackLength;
          if (stacked || stacked === void 0 && stack !== void 0) {
            for (i = 0; i < ilen; ++i) {
              imeta = metasets[i];
              if (imeta.index === datasetIndex) {
                break;
              }
              if (imeta.stack === stack) {
                stackLength = scale2._parseValue(datasets[imeta.index].data[index]);
                ivalue = stackLength.start === void 0 ? stackLength.end : stackLength.min >= 0 && stackLength.max >= 0 ? stackLength.max : stackLength.min;
                if (value.min < 0 && ivalue < 0 || value.max >= 0 && ivalue > 0) {
                  start += ivalue;
                }
              }
            }
          }
          base = scale2.getPixelForValue(start);
          head = scale2.getPixelForValue(start + length);
          size = head - base;
          if (minBarLength !== void 0 && Math.abs(size) < minBarLength) {
            size = minBarLength;
            if (length >= 0 && !isHorizontal || length < 0 && isHorizontal) {
              head = base - minBarLength;
            } else {
              head = base + minBarLength;
            }
          }
          return {
            size,
            base,
            head,
            center: head + size / 2
          };
        },
        /**
         * @private
         */
        calculateBarIndexPixels: function(datasetIndex, index, ruler, options2) {
          var me = this;
          var range = options2.barThickness === "flex" ? computeFlexCategoryTraits(index, ruler, options2) : computeFitCategoryTraits(index, ruler, options2);
          var stackIndex = me.getStackIndex(datasetIndex, me.getMeta().stack);
          var center = range.start + range.chunk * stackIndex + range.chunk / 2;
          var size = Math.min(
            valueOrDefault$3(options2.maxBarThickness, Infinity),
            range.chunk * range.ratio
          );
          return {
            base: center - size / 2,
            head: center + size / 2,
            center,
            size
          };
        },
        draw: function() {
          var me = this;
          var chart = me.chart;
          var scale2 = me._getValueScale();
          var rects = me.getMeta().data;
          var dataset = me.getDataset();
          var ilen = rects.length;
          var i = 0;
          helpers$1.canvas.clipArea(chart.ctx, chart.chartArea);
          for (; i < ilen; ++i) {
            var val = scale2._parseValue(dataset.data[i]);
            if (!isNaN(val.min) && !isNaN(val.max)) {
              rects[i].draw();
            }
          }
          helpers$1.canvas.unclipArea(chart.ctx);
        },
        /**
         * @private
         */
        _resolveDataElementOptions: function() {
          var me = this;
          var values = helpers$1.extend({}, core_datasetController.prototype._resolveDataElementOptions.apply(me, arguments));
          var indexOpts = me._getIndexScale().options;
          var valueOpts = me._getValueScale().options;
          values.barPercentage = valueOrDefault$3(indexOpts.barPercentage, values.barPercentage);
          values.barThickness = valueOrDefault$3(indexOpts.barThickness, values.barThickness);
          values.categoryPercentage = valueOrDefault$3(indexOpts.categoryPercentage, values.categoryPercentage);
          values.maxBarThickness = valueOrDefault$3(indexOpts.maxBarThickness, values.maxBarThickness);
          values.minBarLength = valueOrDefault$3(valueOpts.minBarLength, values.minBarLength);
          return values;
        }
      });
      var valueOrDefault$4 = helpers$1.valueOrDefault;
      var resolve$1 = helpers$1.options.resolve;
      core_defaults._set("bubble", {
        hover: {
          mode: "single"
        },
        scales: {
          xAxes: [{
            type: "linear",
            // bubble should probably use a linear scale by default
            position: "bottom",
            id: "x-axis-0"
            // need an ID so datasets can reference the scale
          }],
          yAxes: [{
            type: "linear",
            position: "left",
            id: "y-axis-0"
          }]
        },
        tooltips: {
          callbacks: {
            title: function() {
              return "";
            },
            label: function(item, data) {
              var datasetLabel = data.datasets[item.datasetIndex].label || "";
              var dataPoint = data.datasets[item.datasetIndex].data[item.index];
              return datasetLabel + ": (" + item.xLabel + ", " + item.yLabel + ", " + dataPoint.r + ")";
            }
          }
        }
      });
      var controller_bubble = core_datasetController.extend({
        /**
         * @protected
         */
        dataElementType: elements.Point,
        /**
         * @private
         */
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderWidth",
          "hoverBackgroundColor",
          "hoverBorderColor",
          "hoverBorderWidth",
          "hoverRadius",
          "hitRadius",
          "pointStyle",
          "rotation"
        ],
        /**
         * @protected
         */
        update: function(reset) {
          var me = this;
          var meta = me.getMeta();
          var points = meta.data;
          helpers$1.each(points, function(point, index) {
            me.updateElement(point, index, reset);
          });
        },
        /**
         * @protected
         */
        updateElement: function(point, index, reset) {
          var me = this;
          var meta = me.getMeta();
          var custom = point.custom || {};
          var xScale = me.getScaleForId(meta.xAxisID);
          var yScale = me.getScaleForId(meta.yAxisID);
          var options2 = me._resolveDataElementOptions(point, index);
          var data = me.getDataset().data[index];
          var dsIndex = me.index;
          var x = reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(typeof data === "object" ? data : NaN, index, dsIndex);
          var y = reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, dsIndex);
          point._xScale = xScale;
          point._yScale = yScale;
          point._options = options2;
          point._datasetIndex = dsIndex;
          point._index = index;
          point._model = {
            backgroundColor: options2.backgroundColor,
            borderColor: options2.borderColor,
            borderWidth: options2.borderWidth,
            hitRadius: options2.hitRadius,
            pointStyle: options2.pointStyle,
            rotation: options2.rotation,
            radius: reset ? 0 : options2.radius,
            skip: custom.skip || isNaN(x) || isNaN(y),
            x,
            y
          };
          point.pivot();
        },
        /**
         * @protected
         */
        setHoverStyle: function(point) {
          var model = point._model;
          var options2 = point._options;
          var getHoverColor = helpers$1.getHoverColor;
          point.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth,
            radius: model.radius
          };
          model.backgroundColor = valueOrDefault$4(options2.hoverBackgroundColor, getHoverColor(options2.backgroundColor));
          model.borderColor = valueOrDefault$4(options2.hoverBorderColor, getHoverColor(options2.borderColor));
          model.borderWidth = valueOrDefault$4(options2.hoverBorderWidth, options2.borderWidth);
          model.radius = options2.radius + options2.hoverRadius;
        },
        /**
         * @private
         */
        _resolveDataElementOptions: function(point, index) {
          var me = this;
          var chart = me.chart;
          var dataset = me.getDataset();
          var custom = point.custom || {};
          var data = dataset.data[index] || {};
          var values = core_datasetController.prototype._resolveDataElementOptions.apply(me, arguments);
          var context = {
            chart,
            dataIndex: index,
            dataset,
            datasetIndex: me.index
          };
          if (me._cachedDataOpts === values) {
            values = helpers$1.extend({}, values);
          }
          values.radius = resolve$1([
            custom.radius,
            data.r,
            me._config.radius,
            chart.options.elements.point.radius
          ], context, index);
          return values;
        }
      });
      var valueOrDefault$5 = helpers$1.valueOrDefault;
      var PI$1 = Math.PI;
      var DOUBLE_PI$1 = PI$1 * 2;
      var HALF_PI$1 = PI$1 / 2;
      core_defaults._set("doughnut", {
        animation: {
          // Boolean - Whether we animate the rotation of the Doughnut
          animateRotate: true,
          // Boolean - Whether we animate scaling the Doughnut from the centre
          animateScale: false
        },
        hover: {
          mode: "single"
        },
        legendCallback: function(chart) {
          var list = document.createElement("ul");
          var data = chart.data;
          var datasets = data.datasets;
          var labels = data.labels;
          var i, ilen, listItem, listItemSpan;
          list.setAttribute("class", chart.id + "-legend");
          if (datasets.length) {
            for (i = 0, ilen = datasets[0].data.length; i < ilen; ++i) {
              listItem = list.appendChild(document.createElement("li"));
              listItemSpan = listItem.appendChild(document.createElement("span"));
              listItemSpan.style.backgroundColor = datasets[0].backgroundColor[i];
              if (labels[i]) {
                listItem.appendChild(document.createTextNode(labels[i]));
              }
            }
          }
          return list.outerHTML;
        },
        legend: {
          labels: {
            generateLabels: function(chart) {
              var data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map(function(label, i) {
                  var meta = chart.getDatasetMeta(0);
                  var style = meta.controller.getStyle(i);
                  return {
                    text: label,
                    fillStyle: style.backgroundColor,
                    strokeStyle: style.borderColor,
                    lineWidth: style.borderWidth,
                    hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                    // Extra data used for toggling the correct item
                    index: i
                  };
                });
              }
              return [];
            }
          },
          onClick: function(e, legendItem) {
            var index = legendItem.index;
            var chart = this.chart;
            var i, ilen, meta;
            for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
              meta = chart.getDatasetMeta(i);
              if (meta.data[index]) {
                meta.data[index].hidden = !meta.data[index].hidden;
              }
            }
            chart.update();
          }
        },
        // The percentage of the chart that we cut out of the middle.
        cutoutPercentage: 50,
        // The rotation of the chart, where the first data arc begins.
        rotation: -HALF_PI$1,
        // The total circumference of the chart.
        circumference: DOUBLE_PI$1,
        // Need to override these to give a nice default
        tooltips: {
          callbacks: {
            title: function() {
              return "";
            },
            label: function(tooltipItem, data) {
              var dataLabel = data.labels[tooltipItem.index];
              var value = ": " + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              if (helpers$1.isArray(dataLabel)) {
                dataLabel = dataLabel.slice();
                dataLabel[0] += value;
              } else {
                dataLabel += value;
              }
              return dataLabel;
            }
          }
        }
      });
      var controller_doughnut = core_datasetController.extend({
        dataElementType: elements.Arc,
        linkScales: helpers$1.noop,
        /**
         * @private
         */
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderWidth",
          "borderAlign",
          "hoverBackgroundColor",
          "hoverBorderColor",
          "hoverBorderWidth"
        ],
        // Get index of the dataset in relation to the visible datasets. This allows determining the inner and outer radius correctly
        getRingIndex: function(datasetIndex) {
          var ringIndex = 0;
          for (var j = 0; j < datasetIndex; ++j) {
            if (this.chart.isDatasetVisible(j)) {
              ++ringIndex;
            }
          }
          return ringIndex;
        },
        update: function(reset) {
          var me = this;
          var chart = me.chart;
          var chartArea = chart.chartArea;
          var opts = chart.options;
          var ratioX = 1;
          var ratioY = 1;
          var offsetX = 0;
          var offsetY = 0;
          var meta = me.getMeta();
          var arcs = meta.data;
          var cutout = opts.cutoutPercentage / 100 || 0;
          var circumference = opts.circumference;
          var chartWeight = me._getRingWeight(me.index);
          var maxWidth, maxHeight, i, ilen;
          if (circumference < DOUBLE_PI$1) {
            var startAngle = opts.rotation % DOUBLE_PI$1;
            startAngle += startAngle >= PI$1 ? -DOUBLE_PI$1 : startAngle < -PI$1 ? DOUBLE_PI$1 : 0;
            var endAngle = startAngle + circumference;
            var startX = Math.cos(startAngle);
            var startY = Math.sin(startAngle);
            var endX = Math.cos(endAngle);
            var endY = Math.sin(endAngle);
            var contains0 = startAngle <= 0 && endAngle >= 0 || endAngle >= DOUBLE_PI$1;
            var contains90 = startAngle <= HALF_PI$1 && endAngle >= HALF_PI$1 || endAngle >= DOUBLE_PI$1 + HALF_PI$1;
            var contains180 = startAngle === -PI$1 || endAngle >= PI$1;
            var contains270 = startAngle <= -HALF_PI$1 && endAngle >= -HALF_PI$1 || endAngle >= PI$1 + HALF_PI$1;
            var minX = contains180 ? -1 : Math.min(startX, startX * cutout, endX, endX * cutout);
            var minY = contains270 ? -1 : Math.min(startY, startY * cutout, endY, endY * cutout);
            var maxX = contains0 ? 1 : Math.max(startX, startX * cutout, endX, endX * cutout);
            var maxY = contains90 ? 1 : Math.max(startY, startY * cutout, endY, endY * cutout);
            ratioX = (maxX - minX) / 2;
            ratioY = (maxY - minY) / 2;
            offsetX = -(maxX + minX) / 2;
            offsetY = -(maxY + minY) / 2;
          }
          for (i = 0, ilen = arcs.length; i < ilen; ++i) {
            arcs[i]._options = me._resolveDataElementOptions(arcs[i], i);
          }
          chart.borderWidth = me.getMaxBorderWidth();
          maxWidth = (chartArea.right - chartArea.left - chart.borderWidth) / ratioX;
          maxHeight = (chartArea.bottom - chartArea.top - chart.borderWidth) / ratioY;
          chart.outerRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
          chart.innerRadius = Math.max(chart.outerRadius * cutout, 0);
          chart.radiusLength = (chart.outerRadius - chart.innerRadius) / (me._getVisibleDatasetWeightTotal() || 1);
          chart.offsetX = offsetX * chart.outerRadius;
          chart.offsetY = offsetY * chart.outerRadius;
          meta.total = me.calculateTotal();
          me.outerRadius = chart.outerRadius - chart.radiusLength * me._getRingWeightOffset(me.index);
          me.innerRadius = Math.max(me.outerRadius - chart.radiusLength * chartWeight, 0);
          for (i = 0, ilen = arcs.length; i < ilen; ++i) {
            me.updateElement(arcs[i], i, reset);
          }
        },
        updateElement: function(arc, index, reset) {
          var me = this;
          var chart = me.chart;
          var chartArea = chart.chartArea;
          var opts = chart.options;
          var animationOpts = opts.animation;
          var centerX = (chartArea.left + chartArea.right) / 2;
          var centerY = (chartArea.top + chartArea.bottom) / 2;
          var startAngle = opts.rotation;
          var endAngle = opts.rotation;
          var dataset = me.getDataset();
          var circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : me.calculateCircumference(dataset.data[index]) * (opts.circumference / DOUBLE_PI$1);
          var innerRadius = reset && animationOpts.animateScale ? 0 : me.innerRadius;
          var outerRadius = reset && animationOpts.animateScale ? 0 : me.outerRadius;
          var options2 = arc._options || {};
          helpers$1.extend(arc, {
            // Utility
            _datasetIndex: me.index,
            _index: index,
            // Desired view properties
            _model: {
              backgroundColor: options2.backgroundColor,
              borderColor: options2.borderColor,
              borderWidth: options2.borderWidth,
              borderAlign: options2.borderAlign,
              x: centerX + chart.offsetX,
              y: centerY + chart.offsetY,
              startAngle,
              endAngle,
              circumference,
              outerRadius,
              innerRadius,
              label: helpers$1.valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
            }
          });
          var model = arc._model;
          if (!reset || !animationOpts.animateRotate) {
            if (index === 0) {
              model.startAngle = opts.rotation;
            } else {
              model.startAngle = me.getMeta().data[index - 1]._model.endAngle;
            }
            model.endAngle = model.startAngle + model.circumference;
          }
          arc.pivot();
        },
        calculateTotal: function() {
          var dataset = this.getDataset();
          var meta = this.getMeta();
          var total = 0;
          var value;
          helpers$1.each(meta.data, function(element, index) {
            value = dataset.data[index];
            if (!isNaN(value) && !element.hidden) {
              total += Math.abs(value);
            }
          });
          return total;
        },
        calculateCircumference: function(value) {
          var total = this.getMeta().total;
          if (total > 0 && !isNaN(value)) {
            return DOUBLE_PI$1 * (Math.abs(value) / total);
          }
          return 0;
        },
        // gets the max border or hover width to properly scale pie charts
        getMaxBorderWidth: function(arcs) {
          var me = this;
          var max = 0;
          var chart = me.chart;
          var i, ilen, meta, arc, controller, options2, borderWidth, hoverWidth;
          if (!arcs) {
            for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
              if (chart.isDatasetVisible(i)) {
                meta = chart.getDatasetMeta(i);
                arcs = meta.data;
                if (i !== me.index) {
                  controller = meta.controller;
                }
                break;
              }
            }
          }
          if (!arcs) {
            return 0;
          }
          for (i = 0, ilen = arcs.length; i < ilen; ++i) {
            arc = arcs[i];
            if (controller) {
              controller._configure();
              options2 = controller._resolveDataElementOptions(arc, i);
            } else {
              options2 = arc._options;
            }
            if (options2.borderAlign !== "inner") {
              borderWidth = options2.borderWidth;
              hoverWidth = options2.hoverBorderWidth;
              max = borderWidth > max ? borderWidth : max;
              max = hoverWidth > max ? hoverWidth : max;
            }
          }
          return max;
        },
        /**
         * @protected
         */
        setHoverStyle: function(arc) {
          var model = arc._model;
          var options2 = arc._options;
          var getHoverColor = helpers$1.getHoverColor;
          arc.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth
          };
          model.backgroundColor = valueOrDefault$5(options2.hoverBackgroundColor, getHoverColor(options2.backgroundColor));
          model.borderColor = valueOrDefault$5(options2.hoverBorderColor, getHoverColor(options2.borderColor));
          model.borderWidth = valueOrDefault$5(options2.hoverBorderWidth, options2.borderWidth);
        },
        /**
         * Get radius length offset of the dataset in relation to the visible datasets weights. This allows determining the inner and outer radius correctly
         * @private
         */
        _getRingWeightOffset: function(datasetIndex) {
          var ringWeightOffset = 0;
          for (var i = 0; i < datasetIndex; ++i) {
            if (this.chart.isDatasetVisible(i)) {
              ringWeightOffset += this._getRingWeight(i);
            }
          }
          return ringWeightOffset;
        },
        /**
         * @private
         */
        _getRingWeight: function(dataSetIndex) {
          return Math.max(valueOrDefault$5(this.chart.data.datasets[dataSetIndex].weight, 1), 0);
        },
        /**
         * Returns the sum of all visibile data set weights.  This value can be 0.
         * @private
         */
        _getVisibleDatasetWeightTotal: function() {
          return this._getRingWeightOffset(this.chart.data.datasets.length);
        }
      });
      core_defaults._set("horizontalBar", {
        hover: {
          mode: "index",
          axis: "y"
        },
        scales: {
          xAxes: [{
            type: "linear",
            position: "bottom"
          }],
          yAxes: [{
            type: "category",
            position: "left",
            offset: true,
            gridLines: {
              offsetGridLines: true
            }
          }]
        },
        elements: {
          rectangle: {
            borderSkipped: "left"
          }
        },
        tooltips: {
          mode: "index",
          axis: "y"
        }
      });
      core_defaults._set("global", {
        datasets: {
          horizontalBar: {
            categoryPercentage: 0.8,
            barPercentage: 0.9
          }
        }
      });
      var controller_horizontalBar = controller_bar.extend({
        /**
         * @private
         */
        _getValueScaleId: function() {
          return this.getMeta().xAxisID;
        },
        /**
         * @private
         */
        _getIndexScaleId: function() {
          return this.getMeta().yAxisID;
        }
      });
      var valueOrDefault$6 = helpers$1.valueOrDefault;
      var resolve$2 = helpers$1.options.resolve;
      var isPointInArea = helpers$1.canvas._isPointInArea;
      core_defaults._set("line", {
        showLines: true,
        spanGaps: false,
        hover: {
          mode: "label"
        },
        scales: {
          xAxes: [{
            type: "category",
            id: "x-axis-0"
          }],
          yAxes: [{
            type: "linear",
            id: "y-axis-0"
          }]
        }
      });
      function scaleClip(scale2, halfBorderWidth) {
        var tickOpts = scale2 && scale2.options.ticks || {};
        var reverse = tickOpts.reverse;
        var min = tickOpts.min === void 0 ? halfBorderWidth : 0;
        var max = tickOpts.max === void 0 ? halfBorderWidth : 0;
        return {
          start: reverse ? max : min,
          end: reverse ? min : max
        };
      }
      function defaultClip(xScale, yScale, borderWidth) {
        var halfBorderWidth = borderWidth / 2;
        var x = scaleClip(xScale, halfBorderWidth);
        var y = scaleClip(yScale, halfBorderWidth);
        return {
          top: y.end,
          right: x.end,
          bottom: y.start,
          left: x.start
        };
      }
      function toClip(value) {
        var t, r, b, l;
        if (helpers$1.isObject(value)) {
          t = value.top;
          r = value.right;
          b = value.bottom;
          l = value.left;
        } else {
          t = r = b = l = value;
        }
        return {
          top: t,
          right: r,
          bottom: b,
          left: l
        };
      }
      var controller_line = core_datasetController.extend({
        datasetElementType: elements.Line,
        dataElementType: elements.Point,
        /**
         * @private
         */
        _datasetElementOptions: [
          "backgroundColor",
          "borderCapStyle",
          "borderColor",
          "borderDash",
          "borderDashOffset",
          "borderJoinStyle",
          "borderWidth",
          "cubicInterpolationMode",
          "fill"
        ],
        /**
         * @private
         */
        _dataElementOptions: {
          backgroundColor: "pointBackgroundColor",
          borderColor: "pointBorderColor",
          borderWidth: "pointBorderWidth",
          hitRadius: "pointHitRadius",
          hoverBackgroundColor: "pointHoverBackgroundColor",
          hoverBorderColor: "pointHoverBorderColor",
          hoverBorderWidth: "pointHoverBorderWidth",
          hoverRadius: "pointHoverRadius",
          pointStyle: "pointStyle",
          radius: "pointRadius",
          rotation: "pointRotation"
        },
        update: function(reset) {
          var me = this;
          var meta = me.getMeta();
          var line = meta.dataset;
          var points = meta.data || [];
          var options2 = me.chart.options;
          var config = me._config;
          var showLine = me._showLine = valueOrDefault$6(config.showLine, options2.showLines);
          var i, ilen;
          me._xScale = me.getScaleForId(meta.xAxisID);
          me._yScale = me.getScaleForId(meta.yAxisID);
          if (showLine) {
            if (config.tension !== void 0 && config.lineTension === void 0) {
              config.lineTension = config.tension;
            }
            line._scale = me._yScale;
            line._datasetIndex = me.index;
            line._children = points;
            line._model = me._resolveDatasetElementOptions(line);
            line.pivot();
          }
          for (i = 0, ilen = points.length; i < ilen; ++i) {
            me.updateElement(points[i], i, reset);
          }
          if (showLine && line._model.tension !== 0) {
            me.updateBezierControlPoints();
          }
          for (i = 0, ilen = points.length; i < ilen; ++i) {
            points[i].pivot();
          }
        },
        updateElement: function(point, index, reset) {
          var me = this;
          var meta = me.getMeta();
          var custom = point.custom || {};
          var dataset = me.getDataset();
          var datasetIndex = me.index;
          var value = dataset.data[index];
          var xScale = me._xScale;
          var yScale = me._yScale;
          var lineModel = meta.dataset._model;
          var x, y;
          var options2 = me._resolveDataElementOptions(point, index);
          x = xScale.getPixelForValue(typeof value === "object" ? value : NaN, index, datasetIndex);
          y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index, datasetIndex);
          point._xScale = xScale;
          point._yScale = yScale;
          point._options = options2;
          point._datasetIndex = datasetIndex;
          point._index = index;
          point._model = {
            x,
            y,
            skip: custom.skip || isNaN(x) || isNaN(y),
            // Appearance
            radius: options2.radius,
            pointStyle: options2.pointStyle,
            rotation: options2.rotation,
            backgroundColor: options2.backgroundColor,
            borderColor: options2.borderColor,
            borderWidth: options2.borderWidth,
            tension: valueOrDefault$6(custom.tension, lineModel ? lineModel.tension : 0),
            steppedLine: lineModel ? lineModel.steppedLine : false,
            // Tooltip
            hitRadius: options2.hitRadius
          };
        },
        /**
         * @private
         */
        _resolveDatasetElementOptions: function(element) {
          var me = this;
          var config = me._config;
          var custom = element.custom || {};
          var options2 = me.chart.options;
          var lineOptions = options2.elements.line;
          var values = core_datasetController.prototype._resolveDatasetElementOptions.apply(me, arguments);
          values.spanGaps = valueOrDefault$6(config.spanGaps, options2.spanGaps);
          values.tension = valueOrDefault$6(config.lineTension, lineOptions.tension);
          values.steppedLine = resolve$2([custom.steppedLine, config.steppedLine, lineOptions.stepped]);
          values.clip = toClip(valueOrDefault$6(config.clip, defaultClip(me._xScale, me._yScale, values.borderWidth)));
          return values;
        },
        calculatePointY: function(value, index, datasetIndex) {
          var me = this;
          var chart = me.chart;
          var yScale = me._yScale;
          var sumPos = 0;
          var sumNeg = 0;
          var i, ds, dsMeta, stackedRightValue, rightValue, metasets, ilen;
          if (yScale.options.stacked) {
            rightValue = +yScale.getRightValue(value);
            metasets = chart._getSortedVisibleDatasetMetas();
            ilen = metasets.length;
            for (i = 0; i < ilen; ++i) {
              dsMeta = metasets[i];
              if (dsMeta.index === datasetIndex) {
                break;
              }
              ds = chart.data.datasets[dsMeta.index];
              if (dsMeta.type === "line" && dsMeta.yAxisID === yScale.id) {
                stackedRightValue = +yScale.getRightValue(ds.data[index]);
                if (stackedRightValue < 0) {
                  sumNeg += stackedRightValue || 0;
                } else {
                  sumPos += stackedRightValue || 0;
                }
              }
            }
            if (rightValue < 0) {
              return yScale.getPixelForValue(sumNeg + rightValue);
            }
            return yScale.getPixelForValue(sumPos + rightValue);
          }
          return yScale.getPixelForValue(value);
        },
        updateBezierControlPoints: function() {
          var me = this;
          var chart = me.chart;
          var meta = me.getMeta();
          var lineModel = meta.dataset._model;
          var area = chart.chartArea;
          var points = meta.data || [];
          var i, ilen, model, controlPoints;
          if (lineModel.spanGaps) {
            points = points.filter(function(pt) {
              return !pt._model.skip;
            });
          }
          function capControlPoint(pt, min, max) {
            return Math.max(Math.min(pt, max), min);
          }
          if (lineModel.cubicInterpolationMode === "monotone") {
            helpers$1.splineCurveMonotone(points);
          } else {
            for (i = 0, ilen = points.length; i < ilen; ++i) {
              model = points[i]._model;
              controlPoints = helpers$1.splineCurve(
                helpers$1.previousItem(points, i)._model,
                model,
                helpers$1.nextItem(points, i)._model,
                lineModel.tension
              );
              model.controlPointPreviousX = controlPoints.previous.x;
              model.controlPointPreviousY = controlPoints.previous.y;
              model.controlPointNextX = controlPoints.next.x;
              model.controlPointNextY = controlPoints.next.y;
            }
          }
          if (chart.options.elements.line.capBezierPoints) {
            for (i = 0, ilen = points.length; i < ilen; ++i) {
              model = points[i]._model;
              if (isPointInArea(model, area)) {
                if (i > 0 && isPointInArea(points[i - 1]._model, area)) {
                  model.controlPointPreviousX = capControlPoint(model.controlPointPreviousX, area.left, area.right);
                  model.controlPointPreviousY = capControlPoint(model.controlPointPreviousY, area.top, area.bottom);
                }
                if (i < points.length - 1 && isPointInArea(points[i + 1]._model, area)) {
                  model.controlPointNextX = capControlPoint(model.controlPointNextX, area.left, area.right);
                  model.controlPointNextY = capControlPoint(model.controlPointNextY, area.top, area.bottom);
                }
              }
            }
          }
        },
        draw: function() {
          var me = this;
          var chart = me.chart;
          var meta = me.getMeta();
          var points = meta.data || [];
          var area = chart.chartArea;
          var canvas2 = chart.canvas;
          var i = 0;
          var ilen = points.length;
          var clip;
          if (me._showLine) {
            clip = meta.dataset._model.clip;
            helpers$1.canvas.clipArea(chart.ctx, {
              left: clip.left === false ? 0 : area.left - clip.left,
              right: clip.right === false ? canvas2.width : area.right + clip.right,
              top: clip.top === false ? 0 : area.top - clip.top,
              bottom: clip.bottom === false ? canvas2.height : area.bottom + clip.bottom
            });
            meta.dataset.draw();
            helpers$1.canvas.unclipArea(chart.ctx);
          }
          for (; i < ilen; ++i) {
            points[i].draw(area);
          }
        },
        /**
         * @protected
         */
        setHoverStyle: function(point) {
          var model = point._model;
          var options2 = point._options;
          var getHoverColor = helpers$1.getHoverColor;
          point.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth,
            radius: model.radius
          };
          model.backgroundColor = valueOrDefault$6(options2.hoverBackgroundColor, getHoverColor(options2.backgroundColor));
          model.borderColor = valueOrDefault$6(options2.hoverBorderColor, getHoverColor(options2.borderColor));
          model.borderWidth = valueOrDefault$6(options2.hoverBorderWidth, options2.borderWidth);
          model.radius = valueOrDefault$6(options2.hoverRadius, options2.radius);
        }
      });
      var resolve$3 = helpers$1.options.resolve;
      core_defaults._set("polarArea", {
        scale: {
          type: "radialLinear",
          angleLines: {
            display: false
          },
          gridLines: {
            circular: true
          },
          pointLabels: {
            display: false
          },
          ticks: {
            beginAtZero: true
          }
        },
        // Boolean - Whether to animate the rotation of the chart
        animation: {
          animateRotate: true,
          animateScale: true
        },
        startAngle: -0.5 * Math.PI,
        legendCallback: function(chart) {
          var list = document.createElement("ul");
          var data = chart.data;
          var datasets = data.datasets;
          var labels = data.labels;
          var i, ilen, listItem, listItemSpan;
          list.setAttribute("class", chart.id + "-legend");
          if (datasets.length) {
            for (i = 0, ilen = datasets[0].data.length; i < ilen; ++i) {
              listItem = list.appendChild(document.createElement("li"));
              listItemSpan = listItem.appendChild(document.createElement("span"));
              listItemSpan.style.backgroundColor = datasets[0].backgroundColor[i];
              if (labels[i]) {
                listItem.appendChild(document.createTextNode(labels[i]));
              }
            }
          }
          return list.outerHTML;
        },
        legend: {
          labels: {
            generateLabels: function(chart) {
              var data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map(function(label, i) {
                  var meta = chart.getDatasetMeta(0);
                  var style = meta.controller.getStyle(i);
                  return {
                    text: label,
                    fillStyle: style.backgroundColor,
                    strokeStyle: style.borderColor,
                    lineWidth: style.borderWidth,
                    hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                    // Extra data used for toggling the correct item
                    index: i
                  };
                });
              }
              return [];
            }
          },
          onClick: function(e, legendItem) {
            var index = legendItem.index;
            var chart = this.chart;
            var i, ilen, meta;
            for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
              meta = chart.getDatasetMeta(i);
              meta.data[index].hidden = !meta.data[index].hidden;
            }
            chart.update();
          }
        },
        // Need to override these to give a nice default
        tooltips: {
          callbacks: {
            title: function() {
              return "";
            },
            label: function(item, data) {
              return data.labels[item.index] + ": " + item.yLabel;
            }
          }
        }
      });
      var controller_polarArea = core_datasetController.extend({
        dataElementType: elements.Arc,
        linkScales: helpers$1.noop,
        /**
         * @private
         */
        _dataElementOptions: [
          "backgroundColor",
          "borderColor",
          "borderWidth",
          "borderAlign",
          "hoverBackgroundColor",
          "hoverBorderColor",
          "hoverBorderWidth"
        ],
        /**
         * @private
         */
        _getIndexScaleId: function() {
          return this.chart.scale.id;
        },
        /**
         * @private
         */
        _getValueScaleId: function() {
          return this.chart.scale.id;
        },
        update: function(reset) {
          var me = this;
          var dataset = me.getDataset();
          var meta = me.getMeta();
          var start = me.chart.options.startAngle || 0;
          var starts = me._starts = [];
          var angles = me._angles = [];
          var arcs = meta.data;
          var i, ilen, angle;
          me._updateRadius();
          meta.count = me.countVisibleElements();
          for (i = 0, ilen = dataset.data.length; i < ilen; i++) {
            starts[i] = start;
            angle = me._computeAngle(i);
            angles[i] = angle;
            start += angle;
          }
          for (i = 0, ilen = arcs.length; i < ilen; ++i) {
            arcs[i]._options = me._resolveDataElementOptions(arcs[i], i);
            me.updateElement(arcs[i], i, reset);
          }
        },
        /**
         * @private
         */
        _updateRadius: function() {
          var me = this;
          var chart = me.chart;
          var chartArea = chart.chartArea;
          var opts = chart.options;
          var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
          chart.outerRadius = Math.max(minSize / 2, 0);
          chart.innerRadius = Math.max(opts.cutoutPercentage ? chart.outerRadius / 100 * opts.cutoutPercentage : 1, 0);
          chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
          me.outerRadius = chart.outerRadius - chart.radiusLength * me.index;
          me.innerRadius = me.outerRadius - chart.radiusLength;
        },
        updateElement: function(arc, index, reset) {
          var me = this;
          var chart = me.chart;
          var dataset = me.getDataset();
          var opts = chart.options;
          var animationOpts = opts.animation;
          var scale2 = chart.scale;
          var labels = chart.data.labels;
          var centerX = scale2.xCenter;
          var centerY = scale2.yCenter;
          var datasetStartAngle = opts.startAngle;
          var distance = arc.hidden ? 0 : scale2.getDistanceFromCenterForValue(dataset.data[index]);
          var startAngle = me._starts[index];
          var endAngle = startAngle + (arc.hidden ? 0 : me._angles[index]);
          var resetRadius = animationOpts.animateScale ? 0 : scale2.getDistanceFromCenterForValue(dataset.data[index]);
          var options2 = arc._options || {};
          helpers$1.extend(arc, {
            // Utility
            _datasetIndex: me.index,
            _index: index,
            _scale: scale2,
            // Desired view properties
            _model: {
              backgroundColor: options2.backgroundColor,
              borderColor: options2.borderColor,
              borderWidth: options2.borderWidth,
              borderAlign: options2.borderAlign,
              x: centerX,
              y: centerY,
              innerRadius: 0,
              outerRadius: reset ? resetRadius : distance,
              startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
              endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
              label: helpers$1.valueAtIndexOrDefault(labels, index, labels[index])
            }
          });
          arc.pivot();
        },
        countVisibleElements: function() {
          var dataset = this.getDataset();
          var meta = this.getMeta();
          var count = 0;
          helpers$1.each(meta.data, function(element, index) {
            if (!isNaN(dataset.data[index]) && !element.hidden) {
              count++;
            }
          });
          return count;
        },
        /**
         * @protected
         */
        setHoverStyle: function(arc) {
          var model = arc._model;
          var options2 = arc._options;
          var getHoverColor = helpers$1.getHoverColor;
          var valueOrDefault2 = helpers$1.valueOrDefault;
          arc.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth
          };
          model.backgroundColor = valueOrDefault2(options2.hoverBackgroundColor, getHoverColor(options2.backgroundColor));
          model.borderColor = valueOrDefault2(options2.hoverBorderColor, getHoverColor(options2.borderColor));
          model.borderWidth = valueOrDefault2(options2.hoverBorderWidth, options2.borderWidth);
        },
        /**
         * @private
         */
        _computeAngle: function(index) {
          var me = this;
          var count = this.getMeta().count;
          var dataset = me.getDataset();
          var meta = me.getMeta();
          if (isNaN(dataset.data[index]) || meta.data[index].hidden) {
            return 0;
          }
          var context = {
            chart: me.chart,
            dataIndex: index,
            dataset,
            datasetIndex: me.index
          };
          return resolve$3([
            me.chart.options.elements.arc.angle,
            2 * Math.PI / count
          ], context, index);
        }
      });
      core_defaults._set("pie", helpers$1.clone(core_defaults.doughnut));
      core_defaults._set("pie", {
        cutoutPercentage: 0
      });
      var controller_pie = controller_doughnut;
      var valueOrDefault$7 = helpers$1.valueOrDefault;
      core_defaults._set("radar", {
        spanGaps: false,
        scale: {
          type: "radialLinear"
        },
        elements: {
          line: {
            fill: "start",
            tension: 0
            // no bezier in radar
          }
        }
      });
      var controller_radar = core_datasetController.extend({
        datasetElementType: elements.Line,
        dataElementType: elements.Point,
        linkScales: helpers$1.noop,
        /**
         * @private
         */
        _datasetElementOptions: [
          "backgroundColor",
          "borderWidth",
          "borderColor",
          "borderCapStyle",
          "borderDash",
          "borderDashOffset",
          "borderJoinStyle",
          "fill"
        ],
        /**
         * @private
         */
        _dataElementOptions: {
          backgroundColor: "pointBackgroundColor",
          borderColor: "pointBorderColor",
          borderWidth: "pointBorderWidth",
          hitRadius: "pointHitRadius",
          hoverBackgroundColor: "pointHoverBackgroundColor",
          hoverBorderColor: "pointHoverBorderColor",
          hoverBorderWidth: "pointHoverBorderWidth",
          hoverRadius: "pointHoverRadius",
          pointStyle: "pointStyle",
          radius: "pointRadius",
          rotation: "pointRotation"
        },
        /**
         * @private
         */
        _getIndexScaleId: function() {
          return this.chart.scale.id;
        },
        /**
         * @private
         */
        _getValueScaleId: function() {
          return this.chart.scale.id;
        },
        update: function(reset) {
          var me = this;
          var meta = me.getMeta();
          var line = meta.dataset;
          var points = meta.data || [];
          var scale2 = me.chart.scale;
          var config = me._config;
          var i, ilen;
          if (config.tension !== void 0 && config.lineTension === void 0) {
            config.lineTension = config.tension;
          }
          line._scale = scale2;
          line._datasetIndex = me.index;
          line._children = points;
          line._loop = true;
          line._model = me._resolveDatasetElementOptions(line);
          line.pivot();
          for (i = 0, ilen = points.length; i < ilen; ++i) {
            me.updateElement(points[i], i, reset);
          }
          me.updateBezierControlPoints();
          for (i = 0, ilen = points.length; i < ilen; ++i) {
            points[i].pivot();
          }
        },
        updateElement: function(point, index, reset) {
          var me = this;
          var custom = point.custom || {};
          var dataset = me.getDataset();
          var scale2 = me.chart.scale;
          var pointPosition = scale2.getPointPositionForValue(index, dataset.data[index]);
          var options2 = me._resolveDataElementOptions(point, index);
          var lineModel = me.getMeta().dataset._model;
          var x = reset ? scale2.xCenter : pointPosition.x;
          var y = reset ? scale2.yCenter : pointPosition.y;
          point._scale = scale2;
          point._options = options2;
          point._datasetIndex = me.index;
          point._index = index;
          point._model = {
            x,
            // value not used in dataset scale, but we want a consistent API between scales
            y,
            skip: custom.skip || isNaN(x) || isNaN(y),
            // Appearance
            radius: options2.radius,
            pointStyle: options2.pointStyle,
            rotation: options2.rotation,
            backgroundColor: options2.backgroundColor,
            borderColor: options2.borderColor,
            borderWidth: options2.borderWidth,
            tension: valueOrDefault$7(custom.tension, lineModel ? lineModel.tension : 0),
            // Tooltip
            hitRadius: options2.hitRadius
          };
        },
        /**
         * @private
         */
        _resolveDatasetElementOptions: function() {
          var me = this;
          var config = me._config;
          var options2 = me.chart.options;
          var values = core_datasetController.prototype._resolveDatasetElementOptions.apply(me, arguments);
          values.spanGaps = valueOrDefault$7(config.spanGaps, options2.spanGaps);
          values.tension = valueOrDefault$7(config.lineTension, options2.elements.line.tension);
          return values;
        },
        updateBezierControlPoints: function() {
          var me = this;
          var meta = me.getMeta();
          var area = me.chart.chartArea;
          var points = meta.data || [];
          var i, ilen, model, controlPoints;
          if (meta.dataset._model.spanGaps) {
            points = points.filter(function(pt) {
              return !pt._model.skip;
            });
          }
          function capControlPoint(pt, min, max) {
            return Math.max(Math.min(pt, max), min);
          }
          for (i = 0, ilen = points.length; i < ilen; ++i) {
            model = points[i]._model;
            controlPoints = helpers$1.splineCurve(
              helpers$1.previousItem(points, i, true)._model,
              model,
              helpers$1.nextItem(points, i, true)._model,
              model.tension
            );
            model.controlPointPreviousX = capControlPoint(controlPoints.previous.x, area.left, area.right);
            model.controlPointPreviousY = capControlPoint(controlPoints.previous.y, area.top, area.bottom);
            model.controlPointNextX = capControlPoint(controlPoints.next.x, area.left, area.right);
            model.controlPointNextY = capControlPoint(controlPoints.next.y, area.top, area.bottom);
          }
        },
        setHoverStyle: function(point) {
          var model = point._model;
          var options2 = point._options;
          var getHoverColor = helpers$1.getHoverColor;
          point.$previousStyle = {
            backgroundColor: model.backgroundColor,
            borderColor: model.borderColor,
            borderWidth: model.borderWidth,
            radius: model.radius
          };
          model.backgroundColor = valueOrDefault$7(options2.hoverBackgroundColor, getHoverColor(options2.backgroundColor));
          model.borderColor = valueOrDefault$7(options2.hoverBorderColor, getHoverColor(options2.borderColor));
          model.borderWidth = valueOrDefault$7(options2.hoverBorderWidth, options2.borderWidth);
          model.radius = valueOrDefault$7(options2.hoverRadius, options2.radius);
        }
      });
      core_defaults._set("scatter", {
        hover: {
          mode: "single"
        },
        scales: {
          xAxes: [{
            id: "x-axis-1",
            // need an ID so datasets can reference the scale
            type: "linear",
            // scatter should not use a category axis
            position: "bottom"
          }],
          yAxes: [{
            id: "y-axis-1",
            type: "linear",
            position: "left"
          }]
        },
        tooltips: {
          callbacks: {
            title: function() {
              return "";
            },
            label: function(item) {
              return "(" + item.xLabel + ", " + item.yLabel + ")";
            }
          }
        }
      });
      core_defaults._set("global", {
        datasets: {
          scatter: {
            showLine: false
          }
        }
      });
      var controller_scatter = controller_line;
      var controllers = {
        bar: controller_bar,
        bubble: controller_bubble,
        doughnut: controller_doughnut,
        horizontalBar: controller_horizontalBar,
        line: controller_line,
        polarArea: controller_polarArea,
        pie: controller_pie,
        radar: controller_radar,
        scatter: controller_scatter
      };
      function getRelativePosition(e, chart) {
        if (e.native) {
          return {
            x: e.x,
            y: e.y
          };
        }
        return helpers$1.getRelativePosition(e, chart);
      }
      function parseVisibleItems(chart, handler) {
        var metasets = chart._getSortedVisibleDatasetMetas();
        var metadata, i, j, ilen, jlen, element;
        for (i = 0, ilen = metasets.length; i < ilen; ++i) {
          metadata = metasets[i].data;
          for (j = 0, jlen = metadata.length; j < jlen; ++j) {
            element = metadata[j];
            if (!element._view.skip) {
              handler(element);
            }
          }
        }
      }
      function getIntersectItems(chart, position) {
        var elements2 = [];
        parseVisibleItems(chart, function(element) {
          if (element.inRange(position.x, position.y)) {
            elements2.push(element);
          }
        });
        return elements2;
      }
      function getNearestItems(chart, position, intersect, distanceMetric) {
        var minDistance = Number.POSITIVE_INFINITY;
        var nearestItems = [];
        parseVisibleItems(chart, function(element) {
          if (intersect && !element.inRange(position.x, position.y)) {
            return;
          }
          var center = element.getCenterPoint();
          var distance = distanceMetric(position, center);
          if (distance < minDistance) {
            nearestItems = [element];
            minDistance = distance;
          } else if (distance === minDistance) {
            nearestItems.push(element);
          }
        });
        return nearestItems;
      }
      function getDistanceMetricForAxis(axis) {
        var useX = axis.indexOf("x") !== -1;
        var useY = axis.indexOf("y") !== -1;
        return function(pt1, pt2) {
          var deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
          var deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
          return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        };
      }
      function indexMode(chart, e, options2) {
        var position = getRelativePosition(e, chart);
        options2.axis = options2.axis || "x";
        var distanceMetric = getDistanceMetricForAxis(options2.axis);
        var items = options2.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false, distanceMetric);
        var elements2 = [];
        if (!items.length) {
          return [];
        }
        chart._getSortedVisibleDatasetMetas().forEach(function(meta) {
          var element = meta.data[items[0]._index];
          if (element && !element._view.skip) {
            elements2.push(element);
          }
        });
        return elements2;
      }
      var core_interaction = {
        // Helper function for different modes
        modes: {
          single: function(chart, e) {
            var position = getRelativePosition(e, chart);
            var elements2 = [];
            parseVisibleItems(chart, function(element) {
              if (element.inRange(position.x, position.y)) {
                elements2.push(element);
                return elements2;
              }
            });
            return elements2.slice(0, 1);
          },
          /**
           * @function Chart.Interaction.modes.label
           * @deprecated since version 2.4.0
           * @todo remove at version 3
           * @private
           */
          label: indexMode,
          /**
           * Returns items at the same index. If the options.intersect parameter is true, we only return items if we intersect something
           * If the options.intersect mode is false, we find the nearest item and return the items at the same index as that item
           * @function Chart.Interaction.modes.index
           * @since v2.4.0
           * @param {Chart} chart - the chart we are returning items from
           * @param {Event} e - the event we are find things at
           * @param {IInteractionOptions} options - options to use during interaction
           * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
           */
          index: indexMode,
          /**
           * Returns items in the same dataset. If the options.intersect parameter is true, we only return items if we intersect something
           * If the options.intersect is false, we find the nearest item and return the items in that dataset
           * @function Chart.Interaction.modes.dataset
           * @param {Chart} chart - the chart we are returning items from
           * @param {Event} e - the event we are find things at
           * @param {IInteractionOptions} options - options to use during interaction
           * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
           */
          dataset: function(chart, e, options2) {
            var position = getRelativePosition(e, chart);
            options2.axis = options2.axis || "xy";
            var distanceMetric = getDistanceMetricForAxis(options2.axis);
            var items = options2.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false, distanceMetric);
            if (items.length > 0) {
              items = chart.getDatasetMeta(items[0]._datasetIndex).data;
            }
            return items;
          },
          /**
           * @function Chart.Interaction.modes.x-axis
           * @deprecated since version 2.4.0. Use index mode and intersect == true
           * @todo remove at version 3
           * @private
           */
          "x-axis": function(chart, e) {
            return indexMode(chart, e, { intersect: false });
          },
          /**
           * Point mode returns all elements that hit test based on the event position
           * of the event
           * @function Chart.Interaction.modes.intersect
           * @param {Chart} chart - the chart we are returning items from
           * @param {Event} e - the event we are find things at
           * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
           */
          point: function(chart, e) {
            var position = getRelativePosition(e, chart);
            return getIntersectItems(chart, position);
          },
          /**
           * nearest mode returns the element closest to the point
           * @function Chart.Interaction.modes.intersect
           * @param {Chart} chart - the chart we are returning items from
           * @param {Event} e - the event we are find things at
           * @param {IInteractionOptions} options - options to use
           * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
           */
          nearest: function(chart, e, options2) {
            var position = getRelativePosition(e, chart);
            options2.axis = options2.axis || "xy";
            var distanceMetric = getDistanceMetricForAxis(options2.axis);
            return getNearestItems(chart, position, options2.intersect, distanceMetric);
          },
          /**
           * x mode returns the elements that hit-test at the current x coordinate
           * @function Chart.Interaction.modes.x
           * @param {Chart} chart - the chart we are returning items from
           * @param {Event} e - the event we are find things at
           * @param {IInteractionOptions} options - options to use
           * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
           */
          x: function(chart, e, options2) {
            var position = getRelativePosition(e, chart);
            var items = [];
            var intersectsItem = false;
            parseVisibleItems(chart, function(element) {
              if (element.inXRange(position.x)) {
                items.push(element);
              }
              if (element.inRange(position.x, position.y)) {
                intersectsItem = true;
              }
            });
            if (options2.intersect && !intersectsItem) {
              items = [];
            }
            return items;
          },
          /**
           * y mode returns the elements that hit-test at the current y coordinate
           * @function Chart.Interaction.modes.y
           * @param {Chart} chart - the chart we are returning items from
           * @param {Event} e - the event we are find things at
           * @param {IInteractionOptions} options - options to use
           * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
           */
          y: function(chart, e, options2) {
            var position = getRelativePosition(e, chart);
            var items = [];
            var intersectsItem = false;
            parseVisibleItems(chart, function(element) {
              if (element.inYRange(position.y)) {
                items.push(element);
              }
              if (element.inRange(position.x, position.y)) {
                intersectsItem = true;
              }
            });
            if (options2.intersect && !intersectsItem) {
              items = [];
            }
            return items;
          }
        }
      };
      var extend = helpers$1.extend;
      function filterByPosition(array, position) {
        return helpers$1.where(array, function(v) {
          return v.pos === position;
        });
      }
      function sortByWeight(array, reverse) {
        return array.sort(function(a, b) {
          var v0 = reverse ? b : a;
          var v1 = reverse ? a : b;
          return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
        });
      }
      function wrapBoxes(boxes) {
        var layoutBoxes = [];
        var i, ilen, box;
        for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
          box = boxes[i];
          layoutBoxes.push({
            index: i,
            box,
            pos: box.position,
            horizontal: box.isHorizontal(),
            weight: box.weight
          });
        }
        return layoutBoxes;
      }
      function setLayoutDims(layouts, params) {
        var i, ilen, layout;
        for (i = 0, ilen = layouts.length; i < ilen; ++i) {
          layout = layouts[i];
          layout.width = layout.horizontal ? layout.box.fullWidth && params.availableWidth : params.vBoxMaxWidth;
          layout.height = layout.horizontal && params.hBoxMaxHeight;
        }
      }
      function buildLayoutBoxes(boxes) {
        var layoutBoxes = wrapBoxes(boxes);
        var left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
        var right = sortByWeight(filterByPosition(layoutBoxes, "right"));
        var top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
        var bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
        return {
          leftAndTop: left.concat(top),
          rightAndBottom: right.concat(bottom),
          chartArea: filterByPosition(layoutBoxes, "chartArea"),
          vertical: left.concat(right),
          horizontal: top.concat(bottom)
        };
      }
      function getCombinedMax(maxPadding, chartArea, a, b) {
        return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
      }
      function updateDims(chartArea, params, layout) {
        var box = layout.box;
        var maxPadding = chartArea.maxPadding;
        var newWidth, newHeight;
        if (layout.size) {
          chartArea[layout.pos] -= layout.size;
        }
        layout.size = layout.horizontal ? box.height : box.width;
        chartArea[layout.pos] += layout.size;
        if (box.getPadding) {
          var boxPadding = box.getPadding();
          maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
          maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
          maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
          maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
        }
        newWidth = params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right");
        newHeight = params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom");
        if (newWidth !== chartArea.w || newHeight !== chartArea.h) {
          chartArea.w = newWidth;
          chartArea.h = newHeight;
          var sizes = layout.horizontal ? [newWidth, chartArea.w] : [newHeight, chartArea.h];
          return sizes[0] !== sizes[1] && (!isNaN(sizes[0]) || !isNaN(sizes[1]));
        }
      }
      function handleMaxPadding(chartArea) {
        var maxPadding = chartArea.maxPadding;
        function updatePos(pos) {
          var change = Math.max(maxPadding[pos] - chartArea[pos], 0);
          chartArea[pos] += change;
          return change;
        }
        chartArea.y += updatePos("top");
        chartArea.x += updatePos("left");
        updatePos("right");
        updatePos("bottom");
      }
      function getMargins(horizontal, chartArea) {
        var maxPadding = chartArea.maxPadding;
        function marginForPositions(positions) {
          var margin = { left: 0, top: 0, right: 0, bottom: 0 };
          positions.forEach(function(pos) {
            margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
          });
          return margin;
        }
        return horizontal ? marginForPositions(["left", "right"]) : marginForPositions(["top", "bottom"]);
      }
      function fitBoxes(boxes, chartArea, params) {
        var refitBoxes = [];
        var i, ilen, layout, box, refit, changed;
        for (i = 0, ilen = boxes.length; i < ilen; ++i) {
          layout = boxes[i];
          box = layout.box;
          box.update(
            layout.width || chartArea.w,
            layout.height || chartArea.h,
            getMargins(layout.horizontal, chartArea)
          );
          if (updateDims(chartArea, params, layout)) {
            changed = true;
            if (refitBoxes.length) {
              refit = true;
            }
          }
          if (!box.fullWidth) {
            refitBoxes.push(layout);
          }
        }
        return refit ? fitBoxes(refitBoxes, chartArea, params) || changed : changed;
      }
      function placeBoxes(boxes, chartArea, params) {
        var userPadding = params.padding;
        var x = chartArea.x;
        var y = chartArea.y;
        var i, ilen, layout, box;
        for (i = 0, ilen = boxes.length; i < ilen; ++i) {
          layout = boxes[i];
          box = layout.box;
          if (layout.horizontal) {
            box.left = box.fullWidth ? userPadding.left : chartArea.left;
            box.right = box.fullWidth ? params.outerWidth - userPadding.right : chartArea.left + chartArea.w;
            box.top = y;
            box.bottom = y + box.height;
            box.width = box.right - box.left;
            y = box.bottom;
          } else {
            box.left = x;
            box.right = x + box.width;
            box.top = chartArea.top;
            box.bottom = chartArea.top + chartArea.h;
            box.height = box.bottom - box.top;
            x = box.right;
          }
        }
        chartArea.x = x;
        chartArea.y = y;
      }
      core_defaults._set("global", {
        layout: {
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      });
      var core_layouts = {
        defaults: {},
        /**
         * Register a box to a chart.
         * A box is simply a reference to an object that requires layout. eg. Scales, Legend, Title.
         * @param {Chart} chart - the chart to use
         * @param {ILayoutItem} item - the item to add to be layed out
         */
        addBox: function(chart, item) {
          if (!chart.boxes) {
            chart.boxes = [];
          }
          item.fullWidth = item.fullWidth || false;
          item.position = item.position || "top";
          item.weight = item.weight || 0;
          item._layers = item._layers || function() {
            return [{
              z: 0,
              draw: function() {
                item.draw.apply(item, arguments);
              }
            }];
          };
          chart.boxes.push(item);
        },
        /**
         * Remove a layoutItem from a chart
         * @param {Chart} chart - the chart to remove the box from
         * @param {ILayoutItem} layoutItem - the item to remove from the layout
         */
        removeBox: function(chart, layoutItem) {
          var index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
          if (index !== -1) {
            chart.boxes.splice(index, 1);
          }
        },
        /**
         * Sets (or updates) options on the given `item`.
         * @param {Chart} chart - the chart in which the item lives (or will be added to)
         * @param {ILayoutItem} item - the item to configure with the given options
         * @param {object} options - the new item options.
         */
        configure: function(chart, item, options2) {
          var props = ["fullWidth", "position", "weight"];
          var ilen = props.length;
          var i = 0;
          var prop;
          for (; i < ilen; ++i) {
            prop = props[i];
            if (options2.hasOwnProperty(prop)) {
              item[prop] = options2[prop];
            }
          }
        },
        /**
         * Fits boxes of the given chart into the given size by having each box measure itself
         * then running a fitting algorithm
         * @param {Chart} chart - the chart
         * @param {number} width - the width to fit into
         * @param {number} height - the height to fit into
         */
        update: function(chart, width, height) {
          if (!chart) {
            return;
          }
          var layoutOptions = chart.options.layout || {};
          var padding = helpers$1.options.toPadding(layoutOptions.padding);
          var availableWidth = width - padding.width;
          var availableHeight = height - padding.height;
          var boxes = buildLayoutBoxes(chart.boxes);
          var verticalBoxes = boxes.vertical;
          var horizontalBoxes = boxes.horizontal;
          var params = Object.freeze({
            outerWidth: width,
            outerHeight: height,
            padding,
            availableWidth,
            vBoxMaxWidth: availableWidth / 2 / verticalBoxes.length,
            hBoxMaxHeight: availableHeight / 2
          });
          var chartArea = extend({
            maxPadding: extend({}, padding),
            w: availableWidth,
            h: availableHeight,
            x: padding.left,
            y: padding.top
          }, padding);
          setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
          fitBoxes(verticalBoxes, chartArea, params);
          if (fitBoxes(horizontalBoxes, chartArea, params)) {
            fitBoxes(verticalBoxes, chartArea, params);
          }
          handleMaxPadding(chartArea);
          placeBoxes(boxes.leftAndTop, chartArea, params);
          chartArea.x += chartArea.w;
          chartArea.y += chartArea.h;
          placeBoxes(boxes.rightAndBottom, chartArea, params);
          chart.chartArea = {
            left: chartArea.left,
            top: chartArea.top,
            right: chartArea.left + chartArea.w,
            bottom: chartArea.top + chartArea.h
          };
          helpers$1.each(boxes.chartArea, function(layout) {
            var box = layout.box;
            extend(box, chart.chartArea);
            box.update(chartArea.w, chartArea.h);
          });
        }
      };
      var platform_basic = {
        acquireContext: function(item) {
          if (item && item.canvas) {
            item = item.canvas;
          }
          return item && item.getContext("2d") || null;
        }
      };
      var platform_dom = "/*\r\n * DOM element rendering detection\r\n * https://davidwalsh.name/detect-node-insertion\r\n */\r\n@keyframes chartjs-render-animation {\r\n	from { opacity: 0.99; }\r\n	to { opacity: 1; }\r\n}\r\n\r\n.chartjs-render-monitor {\r\n	animation: chartjs-render-animation 0.001s;\r\n}\r\n\r\n/*\r\n * DOM element resizing detection\r\n * https://github.com/marcj/css-element-queries\r\n */\r\n.chartjs-size-monitor,\r\n.chartjs-size-monitor-expand,\r\n.chartjs-size-monitor-shrink {\r\n	position: absolute;\r\n	direction: ltr;\r\n	left: 0;\r\n	top: 0;\r\n	right: 0;\r\n	bottom: 0;\r\n	overflow: hidden;\r\n	pointer-events: none;\r\n	visibility: hidden;\r\n	z-index: -1;\r\n}\r\n\r\n.chartjs-size-monitor-expand > div {\r\n	position: absolute;\r\n	width: 1000000px;\r\n	height: 1000000px;\r\n	left: 0;\r\n	top: 0;\r\n}\r\n\r\n.chartjs-size-monitor-shrink > div {\r\n	position: absolute;\r\n	width: 200%;\r\n	height: 200%;\r\n	left: 0;\r\n	top: 0;\r\n}\r\n";
      var platform_dom$1 = Object.freeze({
        __proto__: null,
        "default": platform_dom
      });
      var stylesheet = getCjsExportFromNamespace(platform_dom$1);
      var EXPANDO_KEY = "$chartjs";
      var CSS_PREFIX = "chartjs-";
      var CSS_SIZE_MONITOR = CSS_PREFIX + "size-monitor";
      var CSS_RENDER_MONITOR = CSS_PREFIX + "render-monitor";
      var CSS_RENDER_ANIMATION = CSS_PREFIX + "render-animation";
      var ANIMATION_START_EVENTS = ["animationstart", "webkitAnimationStart"];
      var EVENT_TYPES = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup",
        pointerenter: "mouseenter",
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointerleave: "mouseout",
        pointerout: "mouseout"
      };
      function readUsedSize(element, property) {
        var value = helpers$1.getStyle(element, property);
        var matches = value && value.match(/^(\d+)(\.\d+)?px$/);
        return matches ? Number(matches[1]) : void 0;
      }
      function initCanvas(canvas2, config) {
        var style = canvas2.style;
        var renderHeight = canvas2.getAttribute("height");
        var renderWidth = canvas2.getAttribute("width");
        canvas2[EXPANDO_KEY] = {
          initial: {
            height: renderHeight,
            width: renderWidth,
            style: {
              display: style.display,
              height: style.height,
              width: style.width
            }
          }
        };
        style.display = style.display || "block";
        if (renderWidth === null || renderWidth === "") {
          var displayWidth = readUsedSize(canvas2, "width");
          if (displayWidth !== void 0) {
            canvas2.width = displayWidth;
          }
        }
        if (renderHeight === null || renderHeight === "") {
          if (canvas2.style.height === "") {
            canvas2.height = canvas2.width / (config.options.aspectRatio || 2);
          } else {
            var displayHeight = readUsedSize(canvas2, "height");
            if (displayWidth !== void 0) {
              canvas2.height = displayHeight;
            }
          }
        }
        return canvas2;
      }
      var supportsEventListenerOptions = function() {
        var supports = false;
        try {
          var options2 = Object.defineProperty({}, "passive", {
            // eslint-disable-next-line getter-return
            get: function() {
              supports = true;
            }
          });
          window.addEventListener("e", null, options2);
        } catch (e) {
        }
        return supports;
      }();
      var eventListenerOptions = supportsEventListenerOptions ? { passive: true } : false;
      function addListener(node, type, listener) {
        node.addEventListener(type, listener, eventListenerOptions);
      }
      function removeListener(node, type, listener) {
        node.removeEventListener(type, listener, eventListenerOptions);
      }
      function createEvent(type, chart, x, y, nativeEvent) {
        return {
          type,
          chart,
          native: nativeEvent || null,
          x: x !== void 0 ? x : null,
          y: y !== void 0 ? y : null
        };
      }
      function fromNativeEvent(event, chart) {
        var type = EVENT_TYPES[event.type] || event.type;
        var pos = helpers$1.getRelativePosition(event, chart);
        return createEvent(type, chart, pos.x, pos.y, event);
      }
      function throttled(fn, thisArg) {
        var ticking = false;
        var args = [];
        return function() {
          args = Array.prototype.slice.call(arguments);
          thisArg = thisArg || this;
          if (!ticking) {
            ticking = true;
            helpers$1.requestAnimFrame.call(window, function() {
              ticking = false;
              fn.apply(thisArg, args);
            });
          }
        };
      }
      function createDiv(cls) {
        var el = document.createElement("div");
        el.className = cls || "";
        return el;
      }
      function createResizer(handler) {
        var maxSize = 1e6;
        var resizer = createDiv(CSS_SIZE_MONITOR);
        var expand = createDiv(CSS_SIZE_MONITOR + "-expand");
        var shrink = createDiv(CSS_SIZE_MONITOR + "-shrink");
        expand.appendChild(createDiv());
        shrink.appendChild(createDiv());
        resizer.appendChild(expand);
        resizer.appendChild(shrink);
        resizer._reset = function() {
          expand.scrollLeft = maxSize;
          expand.scrollTop = maxSize;
          shrink.scrollLeft = maxSize;
          shrink.scrollTop = maxSize;
        };
        var onScroll = function() {
          resizer._reset();
          handler();
        };
        addListener(expand, "scroll", onScroll.bind(expand, "expand"));
        addListener(shrink, "scroll", onScroll.bind(shrink, "shrink"));
        return resizer;
      }
      function watchForRender(node, handler) {
        var expando = node[EXPANDO_KEY] || (node[EXPANDO_KEY] = {});
        var proxy = expando.renderProxy = function(e) {
          if (e.animationName === CSS_RENDER_ANIMATION) {
            handler();
          }
        };
        helpers$1.each(ANIMATION_START_EVENTS, function(type) {
          addListener(node, type, proxy);
        });
        expando.reflow = !!node.offsetParent;
        node.classList.add(CSS_RENDER_MONITOR);
      }
      function unwatchForRender(node) {
        var expando = node[EXPANDO_KEY] || {};
        var proxy = expando.renderProxy;
        if (proxy) {
          helpers$1.each(ANIMATION_START_EVENTS, function(type) {
            removeListener(node, type, proxy);
          });
          delete expando.renderProxy;
        }
        node.classList.remove(CSS_RENDER_MONITOR);
      }
      function addResizeListener(node, listener, chart) {
        var expando = node[EXPANDO_KEY] || (node[EXPANDO_KEY] = {});
        var resizer = expando.resizer = createResizer(throttled(function() {
          if (expando.resizer) {
            var container = chart.options.maintainAspectRatio && node.parentNode;
            var w = container ? container.clientWidth : 0;
            listener(createEvent("resize", chart));
            if (container && container.clientWidth < w && chart.canvas) {
              listener(createEvent("resize", chart));
            }
          }
        }));
        watchForRender(node, function() {
          if (expando.resizer) {
            var container = node.parentNode;
            if (container && container !== resizer.parentNode) {
              container.insertBefore(resizer, container.firstChild);
            }
            resizer._reset();
          }
        });
      }
      function removeResizeListener(node) {
        var expando = node[EXPANDO_KEY] || {};
        var resizer = expando.resizer;
        delete expando.resizer;
        unwatchForRender(node);
        if (resizer && resizer.parentNode) {
          resizer.parentNode.removeChild(resizer);
        }
      }
      function injectCSS(rootNode, css) {
        var expando = rootNode[EXPANDO_KEY] || (rootNode[EXPANDO_KEY] = {});
        if (!expando.containsStyles) {
          expando.containsStyles = true;
          css = "/* Chart.js */\n" + css;
          var style = document.createElement("style");
          style.setAttribute("type", "text/css");
          style.appendChild(document.createTextNode(css));
          rootNode.appendChild(style);
        }
      }
      var platform_dom$2 = {
        /**
         * When `true`, prevents the automatic injection of the stylesheet required to
         * correctly detect when the chart is added to the DOM and then resized. This
         * switch has been added to allow external stylesheet (`dist/Chart(.min)?.js`)
         * to be manually imported to make this library compatible with any CSP.
         * See https://github.com/chartjs/Chart.js/issues/5208
         */
        disableCSSInjection: false,
        /**
         * This property holds whether this platform is enabled for the current environment.
         * Currently used by platform.js to select the proper implementation.
         * @private
         */
        _enabled: typeof window !== "undefined" && typeof document !== "undefined",
        /**
         * Initializes resources that depend on platform options.
         * @param {HTMLCanvasElement} canvas - The Canvas element.
         * @private
         */
        _ensureLoaded: function(canvas2) {
          if (!this.disableCSSInjection) {
            var root = canvas2.getRootNode ? canvas2.getRootNode() : document;
            var targetNode = root.host ? root : document.head;
            injectCSS(targetNode, stylesheet);
          }
        },
        acquireContext: function(item, config) {
          if (typeof item === "string") {
            item = document.getElementById(item);
          } else if (item.length) {
            item = item[0];
          }
          if (item && item.canvas) {
            item = item.canvas;
          }
          var context = item && item.getContext && item.getContext("2d");
          if (context && context.canvas === item) {
            this._ensureLoaded(item);
            initCanvas(item, config);
            return context;
          }
          return null;
        },
        releaseContext: function(context) {
          var canvas2 = context.canvas;
          if (!canvas2[EXPANDO_KEY]) {
            return;
          }
          var initial = canvas2[EXPANDO_KEY].initial;
          ["height", "width"].forEach(function(prop) {
            var value = initial[prop];
            if (helpers$1.isNullOrUndef(value)) {
              canvas2.removeAttribute(prop);
            } else {
              canvas2.setAttribute(prop, value);
            }
          });
          helpers$1.each(initial.style || {}, function(value, key) {
            canvas2.style[key] = value;
          });
          canvas2.width = canvas2.width;
          delete canvas2[EXPANDO_KEY];
        },
        addEventListener: function(chart, type, listener) {
          var canvas2 = chart.canvas;
          if (type === "resize") {
            addResizeListener(canvas2, listener, chart);
            return;
          }
          var expando = listener[EXPANDO_KEY] || (listener[EXPANDO_KEY] = {});
          var proxies = expando.proxies || (expando.proxies = {});
          var proxy = proxies[chart.id + "_" + type] = function(event) {
            listener(fromNativeEvent(event, chart));
          };
          addListener(canvas2, type, proxy);
        },
        removeEventListener: function(chart, type, listener) {
          var canvas2 = chart.canvas;
          if (type === "resize") {
            removeResizeListener(canvas2);
            return;
          }
          var expando = listener[EXPANDO_KEY] || {};
          var proxies = expando.proxies || {};
          var proxy = proxies[chart.id + "_" + type];
          if (!proxy) {
            return;
          }
          removeListener(canvas2, type, proxy);
        }
      };
      helpers$1.addEvent = addListener;
      helpers$1.removeEvent = removeListener;
      var implementation = platform_dom$2._enabled ? platform_dom$2 : platform_basic;
      var platform = helpers$1.extend({
        /**
         * @since 2.7.0
         */
        initialize: function() {
        },
        /**
         * Called at chart construction time, returns a context2d instance implementing
         * the [W3C Canvas 2D Context API standard]{@link https://www.w3.org/TR/2dcontext/}.
         * @param {*} item - The native item from which to acquire context (platform specific)
         * @param {object} options - The chart options
         * @returns {CanvasRenderingContext2D} context2d instance
         */
        acquireContext: function() {
        },
        /**
         * Called at chart destruction time, releases any resources associated to the context
         * previously returned by the acquireContext() method.
         * @param {CanvasRenderingContext2D} context - The context2d instance
         * @returns {boolean} true if the method succeeded, else false
         */
        releaseContext: function() {
        },
        /**
         * Registers the specified listener on the given chart.
         * @param {Chart} chart - Chart from which to listen for event
         * @param {string} type - The ({@link IEvent}) type to listen for
         * @param {function} listener - Receives a notification (an object that implements
         * the {@link IEvent} interface) when an event of the specified type occurs.
         */
        addEventListener: function() {
        },
        /**
         * Removes the specified listener previously registered with addEventListener.
         * @param {Chart} chart - Chart from which to remove the listener
         * @param {string} type - The ({@link IEvent}) type to remove
         * @param {function} listener - The listener function to remove from the event target.
         */
        removeEventListener: function() {
        }
      }, implementation);
      core_defaults._set("global", {
        plugins: {}
      });
      var core_plugins = {
        /**
         * Globally registered plugins.
         * @private
         */
        _plugins: [],
        /**
         * This identifier is used to invalidate the descriptors cache attached to each chart
         * when a global plugin is registered or unregistered. In this case, the cache ID is
         * incremented and descriptors are regenerated during following API calls.
         * @private
         */
        _cacheId: 0,
        /**
         * Registers the given plugin(s) if not already registered.
         * @param {IPlugin[]|IPlugin} plugins plugin instance(s).
         */
        register: function(plugins2) {
          var p = this._plugins;
          [].concat(plugins2).forEach(function(plugin) {
            if (p.indexOf(plugin) === -1) {
              p.push(plugin);
            }
          });
          this._cacheId++;
        },
        /**
         * Unregisters the given plugin(s) only if registered.
         * @param {IPlugin[]|IPlugin} plugins plugin instance(s).
         */
        unregister: function(plugins2) {
          var p = this._plugins;
          [].concat(plugins2).forEach(function(plugin) {
            var idx = p.indexOf(plugin);
            if (idx !== -1) {
              p.splice(idx, 1);
            }
          });
          this._cacheId++;
        },
        /**
         * Remove all registered plugins.
         * @since 2.1.5
         */
        clear: function() {
          this._plugins = [];
          this._cacheId++;
        },
        /**
         * Returns the number of registered plugins?
         * @returns {number}
         * @since 2.1.5
         */
        count: function() {
          return this._plugins.length;
        },
        /**
         * Returns all registered plugin instances.
         * @returns {IPlugin[]} array of plugin objects.
         * @since 2.1.5
         */
        getAll: function() {
          return this._plugins;
        },
        /**
         * Calls enabled plugins for `chart` on the specified hook and with the given args.
         * This method immediately returns as soon as a plugin explicitly returns false. The
         * returned value can be used, for instance, to interrupt the current action.
         * @param {Chart} chart - The chart instance for which plugins should be called.
         * @param {string} hook - The name of the plugin method to call (e.g. 'beforeUpdate').
         * @param {Array} [args] - Extra arguments to apply to the hook call.
         * @returns {boolean} false if any of the plugins return false, else returns true.
         */
        notify: function(chart, hook, args) {
          var descriptors = this.descriptors(chart);
          var ilen = descriptors.length;
          var i, descriptor, plugin, params, method;
          for (i = 0; i < ilen; ++i) {
            descriptor = descriptors[i];
            plugin = descriptor.plugin;
            method = plugin[hook];
            if (typeof method === "function") {
              params = [chart].concat(args || []);
              params.push(descriptor.options);
              if (method.apply(plugin, params) === false) {
                return false;
              }
            }
          }
          return true;
        },
        /**
         * Returns descriptors of enabled plugins for the given chart.
         * @returns {object[]} [{ plugin, options }]
         * @private
         */
        descriptors: function(chart) {
          var cache = chart.$plugins || (chart.$plugins = {});
          if (cache.id === this._cacheId) {
            return cache.descriptors;
          }
          var plugins2 = [];
          var descriptors = [];
          var config = chart && chart.config || {};
          var options2 = config.options && config.options.plugins || {};
          this._plugins.concat(config.plugins || []).forEach(function(plugin) {
            var idx = plugins2.indexOf(plugin);
            if (idx !== -1) {
              return;
            }
            var id = plugin.id;
            var opts = options2[id];
            if (opts === false) {
              return;
            }
            if (opts === true) {
              opts = helpers$1.clone(core_defaults.global.plugins[id]);
            }
            plugins2.push(plugin);
            descriptors.push({
              plugin,
              options: opts || {}
            });
          });
          cache.descriptors = descriptors;
          cache.id = this._cacheId;
          return descriptors;
        },
        /**
         * Invalidates cache for the given chart: descriptors hold a reference on plugin option,
         * but in some cases, this reference can be changed by the user when updating options.
         * https://github.com/chartjs/Chart.js/issues/5111#issuecomment-355934167
         * @private
         */
        _invalidate: function(chart) {
          delete chart.$plugins;
        }
      };
      var core_scaleService = {
        // Scale registration object. Extensions can register new scale types (such as log or DB scales) and then
        // use the new chart options to grab the correct scale
        constructors: {},
        // Use a registration function so that we can move to an ES6 map when we no longer need to support
        // old browsers
        // Scale config defaults
        defaults: {},
        registerScaleType: function(type, scaleConstructor, scaleDefaults) {
          this.constructors[type] = scaleConstructor;
          this.defaults[type] = helpers$1.clone(scaleDefaults);
        },
        getScaleConstructor: function(type) {
          return this.constructors.hasOwnProperty(type) ? this.constructors[type] : void 0;
        },
        getScaleDefaults: function(type) {
          return this.defaults.hasOwnProperty(type) ? helpers$1.merge(/* @__PURE__ */ Object.create(null), [core_defaults.scale, this.defaults[type]]) : {};
        },
        updateScaleDefaults: function(type, additions) {
          var me = this;
          if (me.defaults.hasOwnProperty(type)) {
            me.defaults[type] = helpers$1.extend(me.defaults[type], additions);
          }
        },
        addScalesToLayout: function(chart) {
          helpers$1.each(chart.scales, function(scale2) {
            scale2.fullWidth = scale2.options.fullWidth;
            scale2.position = scale2.options.position;
            scale2.weight = scale2.options.weight;
            core_layouts.addBox(chart, scale2);
          });
        }
      };
      var valueOrDefault$8 = helpers$1.valueOrDefault;
      var getRtlHelper = helpers$1.rtl.getRtlAdapter;
      core_defaults._set("global", {
        tooltips: {
          enabled: true,
          custom: null,
          mode: "nearest",
          position: "average",
          intersect: true,
          backgroundColor: "rgba(0,0,0,0.8)",
          titleFontStyle: "bold",
          titleSpacing: 2,
          titleMarginBottom: 6,
          titleFontColor: "#fff",
          titleAlign: "left",
          bodySpacing: 2,
          bodyFontColor: "#fff",
          bodyAlign: "left",
          footerFontStyle: "bold",
          footerSpacing: 2,
          footerMarginTop: 6,
          footerFontColor: "#fff",
          footerAlign: "left",
          yPadding: 6,
          xPadding: 6,
          caretPadding: 2,
          caretSize: 5,
          cornerRadius: 6,
          multiKeyBackground: "#fff",
          displayColors: true,
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          callbacks: {
            // Args are: (tooltipItems, data)
            beforeTitle: helpers$1.noop,
            title: function(tooltipItems, data) {
              var title2 = "";
              var labels = data.labels;
              var labelCount = labels ? labels.length : 0;
              if (tooltipItems.length > 0) {
                var item = tooltipItems[0];
                if (item.label) {
                  title2 = item.label;
                } else if (item.xLabel) {
                  title2 = item.xLabel;
                } else if (labelCount > 0 && item.index < labelCount) {
                  title2 = labels[item.index];
                }
              }
              return title2;
            },
            afterTitle: helpers$1.noop,
            // Args are: (tooltipItems, data)
            beforeBody: helpers$1.noop,
            // Args are: (tooltipItem, data)
            beforeLabel: helpers$1.noop,
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              if (!helpers$1.isNullOrUndef(tooltipItem.value)) {
                label += tooltipItem.value;
              } else {
                label += tooltipItem.yLabel;
              }
              return label;
            },
            labelColor: function(tooltipItem, chart) {
              var meta = chart.getDatasetMeta(tooltipItem.datasetIndex);
              var activeElement = meta.data[tooltipItem.index];
              var view = activeElement._view;
              return {
                borderColor: view.borderColor,
                backgroundColor: view.backgroundColor
              };
            },
            labelTextColor: function() {
              return this._options.bodyFontColor;
            },
            afterLabel: helpers$1.noop,
            // Args are: (tooltipItems, data)
            afterBody: helpers$1.noop,
            // Args are: (tooltipItems, data)
            beforeFooter: helpers$1.noop,
            footer: helpers$1.noop,
            afterFooter: helpers$1.noop
          }
        }
      });
      var positioners = {
        /**
         * Average mode places the tooltip at the average position of the elements shown
         * @function Chart.Tooltip.positioners.average
         * @param elements {ChartElement[]} the elements being displayed in the tooltip
         * @returns {object} tooltip position
         */
        average: function(elements2) {
          if (!elements2.length) {
            return false;
          }
          var i, len;
          var x = 0;
          var y = 0;
          var count = 0;
          for (i = 0, len = elements2.length; i < len; ++i) {
            var el = elements2[i];
            if (el && el.hasValue()) {
              var pos = el.tooltipPosition();
              x += pos.x;
              y += pos.y;
              ++count;
            }
          }
          return {
            x: x / count,
            y: y / count
          };
        },
        /**
         * Gets the tooltip position nearest of the item nearest to the event position
         * @function Chart.Tooltip.positioners.nearest
         * @param elements {Chart.Element[]} the tooltip elements
         * @param eventPosition {object} the position of the event in canvas coordinates
         * @returns {object} the tooltip position
         */
        nearest: function(elements2, eventPosition) {
          var x = eventPosition.x;
          var y = eventPosition.y;
          var minDistance = Number.POSITIVE_INFINITY;
          var i, len, nearestElement;
          for (i = 0, len = elements2.length; i < len; ++i) {
            var el = elements2[i];
            if (el && el.hasValue()) {
              var center = el.getCenterPoint();
              var d = helpers$1.distanceBetweenPoints(eventPosition, center);
              if (d < minDistance) {
                minDistance = d;
                nearestElement = el;
              }
            }
          }
          if (nearestElement) {
            var tp = nearestElement.tooltipPosition();
            x = tp.x;
            y = tp.y;
          }
          return {
            x,
            y
          };
        }
      };
      function pushOrConcat(base, toPush) {
        if (toPush) {
          if (helpers$1.isArray(toPush)) {
            Array.prototype.push.apply(base, toPush);
          } else {
            base.push(toPush);
          }
        }
        return base;
      }
      function splitNewlines(str) {
        if ((typeof str === "string" || str instanceof String) && str.indexOf("\n") > -1) {
          return str.split("\n");
        }
        return str;
      }
      function createTooltipItem(element) {
        var xScale = element._xScale;
        var yScale = element._yScale || element._scale;
        var index = element._index;
        var datasetIndex = element._datasetIndex;
        var controller = element._chart.getDatasetMeta(datasetIndex).controller;
        var indexScale = controller._getIndexScale();
        var valueScale = controller._getValueScale();
        return {
          xLabel: xScale ? xScale.getLabelForIndex(index, datasetIndex) : "",
          yLabel: yScale ? yScale.getLabelForIndex(index, datasetIndex) : "",
          label: indexScale ? "" + indexScale.getLabelForIndex(index, datasetIndex) : "",
          value: valueScale ? "" + valueScale.getLabelForIndex(index, datasetIndex) : "",
          index,
          datasetIndex,
          x: element._model.x,
          y: element._model.y
        };
      }
      function getBaseModel(tooltipOpts) {
        var globalDefaults = core_defaults.global;
        return {
          // Positioning
          xPadding: tooltipOpts.xPadding,
          yPadding: tooltipOpts.yPadding,
          xAlign: tooltipOpts.xAlign,
          yAlign: tooltipOpts.yAlign,
          // Drawing direction and text direction
          rtl: tooltipOpts.rtl,
          textDirection: tooltipOpts.textDirection,
          // Body
          bodyFontColor: tooltipOpts.bodyFontColor,
          _bodyFontFamily: valueOrDefault$8(tooltipOpts.bodyFontFamily, globalDefaults.defaultFontFamily),
          _bodyFontStyle: valueOrDefault$8(tooltipOpts.bodyFontStyle, globalDefaults.defaultFontStyle),
          _bodyAlign: tooltipOpts.bodyAlign,
          bodyFontSize: valueOrDefault$8(tooltipOpts.bodyFontSize, globalDefaults.defaultFontSize),
          bodySpacing: tooltipOpts.bodySpacing,
          // Title
          titleFontColor: tooltipOpts.titleFontColor,
          _titleFontFamily: valueOrDefault$8(tooltipOpts.titleFontFamily, globalDefaults.defaultFontFamily),
          _titleFontStyle: valueOrDefault$8(tooltipOpts.titleFontStyle, globalDefaults.defaultFontStyle),
          titleFontSize: valueOrDefault$8(tooltipOpts.titleFontSize, globalDefaults.defaultFontSize),
          _titleAlign: tooltipOpts.titleAlign,
          titleSpacing: tooltipOpts.titleSpacing,
          titleMarginBottom: tooltipOpts.titleMarginBottom,
          // Footer
          footerFontColor: tooltipOpts.footerFontColor,
          _footerFontFamily: valueOrDefault$8(tooltipOpts.footerFontFamily, globalDefaults.defaultFontFamily),
          _footerFontStyle: valueOrDefault$8(tooltipOpts.footerFontStyle, globalDefaults.defaultFontStyle),
          footerFontSize: valueOrDefault$8(tooltipOpts.footerFontSize, globalDefaults.defaultFontSize),
          _footerAlign: tooltipOpts.footerAlign,
          footerSpacing: tooltipOpts.footerSpacing,
          footerMarginTop: tooltipOpts.footerMarginTop,
          // Appearance
          caretSize: tooltipOpts.caretSize,
          cornerRadius: tooltipOpts.cornerRadius,
          backgroundColor: tooltipOpts.backgroundColor,
          opacity: 0,
          legendColorBackground: tooltipOpts.multiKeyBackground,
          displayColors: tooltipOpts.displayColors,
          borderColor: tooltipOpts.borderColor,
          borderWidth: tooltipOpts.borderWidth
        };
      }
      function getTooltipSize(tooltip, model) {
        var ctx = tooltip._chart.ctx;
        var height = model.yPadding * 2;
        var width = 0;
        var body = model.body;
        var combinedBodyLength = body.reduce(function(count, bodyItem) {
          return count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length;
        }, 0);
        combinedBodyLength += model.beforeBody.length + model.afterBody.length;
        var titleLineCount = model.title.length;
        var footerLineCount = model.footer.length;
        var titleFontSize = model.titleFontSize;
        var bodyFontSize = model.bodyFontSize;
        var footerFontSize = model.footerFontSize;
        height += titleLineCount * titleFontSize;
        height += titleLineCount ? (titleLineCount - 1) * model.titleSpacing : 0;
        height += titleLineCount ? model.titleMarginBottom : 0;
        height += combinedBodyLength * bodyFontSize;
        height += combinedBodyLength ? (combinedBodyLength - 1) * model.bodySpacing : 0;
        height += footerLineCount ? model.footerMarginTop : 0;
        height += footerLineCount * footerFontSize;
        height += footerLineCount ? (footerLineCount - 1) * model.footerSpacing : 0;
        var widthPadding = 0;
        var maxLineWidth = function(line) {
          width = Math.max(width, ctx.measureText(line).width + widthPadding);
        };
        ctx.font = helpers$1.fontString(titleFontSize, model._titleFontStyle, model._titleFontFamily);
        helpers$1.each(model.title, maxLineWidth);
        ctx.font = helpers$1.fontString(bodyFontSize, model._bodyFontStyle, model._bodyFontFamily);
        helpers$1.each(model.beforeBody.concat(model.afterBody), maxLineWidth);
        widthPadding = model.displayColors ? bodyFontSize + 2 : 0;
        helpers$1.each(body, function(bodyItem) {
          helpers$1.each(bodyItem.before, maxLineWidth);
          helpers$1.each(bodyItem.lines, maxLineWidth);
          helpers$1.each(bodyItem.after, maxLineWidth);
        });
        widthPadding = 0;
        ctx.font = helpers$1.fontString(footerFontSize, model._footerFontStyle, model._footerFontFamily);
        helpers$1.each(model.footer, maxLineWidth);
        width += 2 * model.xPadding;
        return {
          width,
          height
        };
      }
      function determineAlignment(tooltip, size) {
        var model = tooltip._model;
        var chart = tooltip._chart;
        var chartArea = tooltip._chart.chartArea;
        var xAlign = "center";
        var yAlign = "center";
        if (model.y < size.height) {
          yAlign = "top";
        } else if (model.y > chart.height - size.height) {
          yAlign = "bottom";
        }
        var lf, rf;
        var olf, orf;
        var yf;
        var midX = (chartArea.left + chartArea.right) / 2;
        var midY = (chartArea.top + chartArea.bottom) / 2;
        if (yAlign === "center") {
          lf = function(x) {
            return x <= midX;
          };
          rf = function(x) {
            return x > midX;
          };
        } else {
          lf = function(x) {
            return x <= size.width / 2;
          };
          rf = function(x) {
            return x >= chart.width - size.width / 2;
          };
        }
        olf = function(x) {
          return x + size.width + model.caretSize + model.caretPadding > chart.width;
        };
        orf = function(x) {
          return x - size.width - model.caretSize - model.caretPadding < 0;
        };
        yf = function(y) {
          return y <= midY ? "top" : "bottom";
        };
        if (lf(model.x)) {
          xAlign = "left";
          if (olf(model.x)) {
            xAlign = "center";
            yAlign = yf(model.y);
          }
        } else if (rf(model.x)) {
          xAlign = "right";
          if (orf(model.x)) {
            xAlign = "center";
            yAlign = yf(model.y);
          }
        }
        var opts = tooltip._options;
        return {
          xAlign: opts.xAlign ? opts.xAlign : xAlign,
          yAlign: opts.yAlign ? opts.yAlign : yAlign
        };
      }
      function getBackgroundPoint(vm, size, alignment, chart) {
        var x = vm.x;
        var y = vm.y;
        var caretSize = vm.caretSize;
        var caretPadding = vm.caretPadding;
        var cornerRadius = vm.cornerRadius;
        var xAlign = alignment.xAlign;
        var yAlign = alignment.yAlign;
        var paddingAndSize = caretSize + caretPadding;
        var radiusAndPadding = cornerRadius + caretPadding;
        if (xAlign === "right") {
          x -= size.width;
        } else if (xAlign === "center") {
          x -= size.width / 2;
          if (x + size.width > chart.width) {
            x = chart.width - size.width;
          }
          if (x < 0) {
            x = 0;
          }
        }
        if (yAlign === "top") {
          y += paddingAndSize;
        } else if (yAlign === "bottom") {
          y -= size.height + paddingAndSize;
        } else {
          y -= size.height / 2;
        }
        if (yAlign === "center") {
          if (xAlign === "left") {
            x += paddingAndSize;
          } else if (xAlign === "right") {
            x -= paddingAndSize;
          }
        } else if (xAlign === "left") {
          x -= radiusAndPadding;
        } else if (xAlign === "right") {
          x += radiusAndPadding;
        }
        return {
          x,
          y
        };
      }
      function getAlignedX(vm, align) {
        return align === "center" ? vm.x + vm.width / 2 : align === "right" ? vm.x + vm.width - vm.xPadding : vm.x + vm.xPadding;
      }
      function getBeforeAfterBodyLines(callback) {
        return pushOrConcat([], splitNewlines(callback));
      }
      var exports$4 = core_element.extend({
        initialize: function() {
          this._model = getBaseModel(this._options);
          this._lastActive = [];
        },
        // Get the title
        // Args are: (tooltipItem, data)
        getTitle: function() {
          var me = this;
          var opts = me._options;
          var callbacks = opts.callbacks;
          var beforeTitle = callbacks.beforeTitle.apply(me, arguments);
          var title2 = callbacks.title.apply(me, arguments);
          var afterTitle = callbacks.afterTitle.apply(me, arguments);
          var lines = [];
          lines = pushOrConcat(lines, splitNewlines(beforeTitle));
          lines = pushOrConcat(lines, splitNewlines(title2));
          lines = pushOrConcat(lines, splitNewlines(afterTitle));
          return lines;
        },
        // Args are: (tooltipItem, data)
        getBeforeBody: function() {
          return getBeforeAfterBodyLines(this._options.callbacks.beforeBody.apply(this, arguments));
        },
        // Args are: (tooltipItem, data)
        getBody: function(tooltipItems, data) {
          var me = this;
          var callbacks = me._options.callbacks;
          var bodyItems = [];
          helpers$1.each(tooltipItems, function(tooltipItem) {
            var bodyItem = {
              before: [],
              lines: [],
              after: []
            };
            pushOrConcat(bodyItem.before, splitNewlines(callbacks.beforeLabel.call(me, tooltipItem, data)));
            pushOrConcat(bodyItem.lines, callbacks.label.call(me, tooltipItem, data));
            pushOrConcat(bodyItem.after, splitNewlines(callbacks.afterLabel.call(me, tooltipItem, data)));
            bodyItems.push(bodyItem);
          });
          return bodyItems;
        },
        // Args are: (tooltipItem, data)
        getAfterBody: function() {
          return getBeforeAfterBodyLines(this._options.callbacks.afterBody.apply(this, arguments));
        },
        // Get the footer and beforeFooter and afterFooter lines
        // Args are: (tooltipItem, data)
        getFooter: function() {
          var me = this;
          var callbacks = me._options.callbacks;
          var beforeFooter = callbacks.beforeFooter.apply(me, arguments);
          var footer = callbacks.footer.apply(me, arguments);
          var afterFooter = callbacks.afterFooter.apply(me, arguments);
          var lines = [];
          lines = pushOrConcat(lines, splitNewlines(beforeFooter));
          lines = pushOrConcat(lines, splitNewlines(footer));
          lines = pushOrConcat(lines, splitNewlines(afterFooter));
          return lines;
        },
        update: function(changed) {
          var me = this;
          var opts = me._options;
          var existingModel = me._model;
          var model = me._model = getBaseModel(opts);
          var active = me._active;
          var data = me._data;
          var alignment = {
            xAlign: existingModel.xAlign,
            yAlign: existingModel.yAlign
          };
          var backgroundPoint = {
            x: existingModel.x,
            y: existingModel.y
          };
          var tooltipSize = {
            width: existingModel.width,
            height: existingModel.height
          };
          var tooltipPosition = {
            x: existingModel.caretX,
            y: existingModel.caretY
          };
          var i, len;
          if (active.length) {
            model.opacity = 1;
            var labelColors = [];
            var labelTextColors = [];
            tooltipPosition = positioners[opts.position].call(me, active, me._eventPosition);
            var tooltipItems = [];
            for (i = 0, len = active.length; i < len; ++i) {
              tooltipItems.push(createTooltipItem(active[i]));
            }
            if (opts.filter) {
              tooltipItems = tooltipItems.filter(function(a) {
                return opts.filter(a, data);
              });
            }
            if (opts.itemSort) {
              tooltipItems = tooltipItems.sort(function(a, b) {
                return opts.itemSort(a, b, data);
              });
            }
            helpers$1.each(tooltipItems, function(tooltipItem) {
              labelColors.push(opts.callbacks.labelColor.call(me, tooltipItem, me._chart));
              labelTextColors.push(opts.callbacks.labelTextColor.call(me, tooltipItem, me._chart));
            });
            model.title = me.getTitle(tooltipItems, data);
            model.beforeBody = me.getBeforeBody(tooltipItems, data);
            model.body = me.getBody(tooltipItems, data);
            model.afterBody = me.getAfterBody(tooltipItems, data);
            model.footer = me.getFooter(tooltipItems, data);
            model.x = tooltipPosition.x;
            model.y = tooltipPosition.y;
            model.caretPadding = opts.caretPadding;
            model.labelColors = labelColors;
            model.labelTextColors = labelTextColors;
            model.dataPoints = tooltipItems;
            tooltipSize = getTooltipSize(this, model);
            alignment = determineAlignment(this, tooltipSize);
            backgroundPoint = getBackgroundPoint(model, tooltipSize, alignment, me._chart);
          } else {
            model.opacity = 0;
          }
          model.xAlign = alignment.xAlign;
          model.yAlign = alignment.yAlign;
          model.x = backgroundPoint.x;
          model.y = backgroundPoint.y;
          model.width = tooltipSize.width;
          model.height = tooltipSize.height;
          model.caretX = tooltipPosition.x;
          model.caretY = tooltipPosition.y;
          me._model = model;
          if (changed && opts.custom) {
            opts.custom.call(me, model);
          }
          return me;
        },
        drawCaret: function(tooltipPoint, size) {
          var ctx = this._chart.ctx;
          var vm = this._view;
          var caretPosition = this.getCaretPosition(tooltipPoint, size, vm);
          ctx.lineTo(caretPosition.x1, caretPosition.y1);
          ctx.lineTo(caretPosition.x2, caretPosition.y2);
          ctx.lineTo(caretPosition.x3, caretPosition.y3);
        },
        getCaretPosition: function(tooltipPoint, size, vm) {
          var x1, x2, x3, y1, y2, y3;
          var caretSize = vm.caretSize;
          var cornerRadius = vm.cornerRadius;
          var xAlign = vm.xAlign;
          var yAlign = vm.yAlign;
          var ptX = tooltipPoint.x;
          var ptY = tooltipPoint.y;
          var width = size.width;
          var height = size.height;
          if (yAlign === "center") {
            y2 = ptY + height / 2;
            if (xAlign === "left") {
              x1 = ptX;
              x2 = x1 - caretSize;
              x3 = x1;
              y1 = y2 + caretSize;
              y3 = y2 - caretSize;
            } else {
              x1 = ptX + width;
              x2 = x1 + caretSize;
              x3 = x1;
              y1 = y2 - caretSize;
              y3 = y2 + caretSize;
            }
          } else {
            if (xAlign === "left") {
              x2 = ptX + cornerRadius + caretSize;
              x1 = x2 - caretSize;
              x3 = x2 + caretSize;
            } else if (xAlign === "right") {
              x2 = ptX + width - cornerRadius - caretSize;
              x1 = x2 - caretSize;
              x3 = x2 + caretSize;
            } else {
              x2 = vm.caretX;
              x1 = x2 - caretSize;
              x3 = x2 + caretSize;
            }
            if (yAlign === "top") {
              y1 = ptY;
              y2 = y1 - caretSize;
              y3 = y1;
            } else {
              y1 = ptY + height;
              y2 = y1 + caretSize;
              y3 = y1;
              var tmp = x3;
              x3 = x1;
              x1 = tmp;
            }
          }
          return { x1, x2, x3, y1, y2, y3 };
        },
        drawTitle: function(pt, vm, ctx) {
          var title2 = vm.title;
          var length = title2.length;
          var titleFontSize, titleSpacing, i;
          if (length) {
            var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);
            pt.x = getAlignedX(vm, vm._titleAlign);
            ctx.textAlign = rtlHelper.textAlign(vm._titleAlign);
            ctx.textBaseline = "middle";
            titleFontSize = vm.titleFontSize;
            titleSpacing = vm.titleSpacing;
            ctx.fillStyle = vm.titleFontColor;
            ctx.font = helpers$1.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
            for (i = 0; i < length; ++i) {
              ctx.fillText(title2[i], rtlHelper.x(pt.x), pt.y + titleFontSize / 2);
              pt.y += titleFontSize + titleSpacing;
              if (i + 1 === length) {
                pt.y += vm.titleMarginBottom - titleSpacing;
              }
            }
          }
        },
        drawBody: function(pt, vm, ctx) {
          var bodyFontSize = vm.bodyFontSize;
          var bodySpacing = vm.bodySpacing;
          var bodyAlign = vm._bodyAlign;
          var body = vm.body;
          var drawColorBoxes = vm.displayColors;
          var xLinePadding = 0;
          var colorX = drawColorBoxes ? getAlignedX(vm, "left") : 0;
          var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);
          var fillLineOfText = function(line) {
            ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyFontSize / 2);
            pt.y += bodyFontSize + bodySpacing;
          };
          var bodyItem, textColor, labelColors, lines, i, j, ilen, jlen;
          var bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
          ctx.textAlign = bodyAlign;
          ctx.textBaseline = "middle";
          ctx.font = helpers$1.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
          pt.x = getAlignedX(vm, bodyAlignForCalculation);
          ctx.fillStyle = vm.bodyFontColor;
          helpers$1.each(vm.beforeBody, fillLineOfText);
          xLinePadding = drawColorBoxes && bodyAlignForCalculation !== "right" ? bodyAlign === "center" ? bodyFontSize / 2 + 1 : bodyFontSize + 2 : 0;
          for (i = 0, ilen = body.length; i < ilen; ++i) {
            bodyItem = body[i];
            textColor = vm.labelTextColors[i];
            labelColors = vm.labelColors[i];
            ctx.fillStyle = textColor;
            helpers$1.each(bodyItem.before, fillLineOfText);
            lines = bodyItem.lines;
            for (j = 0, jlen = lines.length; j < jlen; ++j) {
              if (drawColorBoxes) {
                var rtlColorX = rtlHelper.x(colorX);
                ctx.fillStyle = vm.legendColorBackground;
                ctx.fillRect(rtlHelper.leftForLtr(rtlColorX, bodyFontSize), pt.y, bodyFontSize, bodyFontSize);
                ctx.lineWidth = 1;
                ctx.strokeStyle = labelColors.borderColor;
                ctx.strokeRect(rtlHelper.leftForLtr(rtlColorX, bodyFontSize), pt.y, bodyFontSize, bodyFontSize);
                ctx.fillStyle = labelColors.backgroundColor;
                ctx.fillRect(rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), bodyFontSize - 2), pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);
                ctx.fillStyle = textColor;
              }
              fillLineOfText(lines[j]);
            }
            helpers$1.each(bodyItem.after, fillLineOfText);
          }
          xLinePadding = 0;
          helpers$1.each(vm.afterBody, fillLineOfText);
          pt.y -= bodySpacing;
        },
        drawFooter: function(pt, vm, ctx) {
          var footer = vm.footer;
          var length = footer.length;
          var footerFontSize, i;
          if (length) {
            var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);
            pt.x = getAlignedX(vm, vm._footerAlign);
            pt.y += vm.footerMarginTop;
            ctx.textAlign = rtlHelper.textAlign(vm._footerAlign);
            ctx.textBaseline = "middle";
            footerFontSize = vm.footerFontSize;
            ctx.fillStyle = vm.footerFontColor;
            ctx.font = helpers$1.fontString(footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
            for (i = 0; i < length; ++i) {
              ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFontSize / 2);
              pt.y += footerFontSize + vm.footerSpacing;
            }
          }
        },
        drawBackground: function(pt, vm, ctx, tooltipSize) {
          ctx.fillStyle = vm.backgroundColor;
          ctx.strokeStyle = vm.borderColor;
          ctx.lineWidth = vm.borderWidth;
          var xAlign = vm.xAlign;
          var yAlign = vm.yAlign;
          var x = pt.x;
          var y = pt.y;
          var width = tooltipSize.width;
          var height = tooltipSize.height;
          var radius = vm.cornerRadius;
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          if (yAlign === "top") {
            this.drawCaret(pt, tooltipSize);
          }
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          if (yAlign === "center" && xAlign === "right") {
            this.drawCaret(pt, tooltipSize);
          }
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          if (yAlign === "bottom") {
            this.drawCaret(pt, tooltipSize);
          }
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          if (yAlign === "center" && xAlign === "left") {
            this.drawCaret(pt, tooltipSize);
          }
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.fill();
          if (vm.borderWidth > 0) {
            ctx.stroke();
          }
        },
        draw: function() {
          var ctx = this._chart.ctx;
          var vm = this._view;
          if (vm.opacity === 0) {
            return;
          }
          var tooltipSize = {
            width: vm.width,
            height: vm.height
          };
          var pt = {
            x: vm.x,
            y: vm.y
          };
          var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;
          var hasTooltipContent = vm.title.length || vm.beforeBody.length || vm.body.length || vm.afterBody.length || vm.footer.length;
          if (this._options.enabled && hasTooltipContent) {
            ctx.save();
            ctx.globalAlpha = opacity;
            this.drawBackground(pt, vm, ctx, tooltipSize);
            pt.y += vm.yPadding;
            helpers$1.rtl.overrideTextDirection(ctx, vm.textDirection);
            this.drawTitle(pt, vm, ctx);
            this.drawBody(pt, vm, ctx);
            this.drawFooter(pt, vm, ctx);
            helpers$1.rtl.restoreTextDirection(ctx, vm.textDirection);
            ctx.restore();
          }
        },
        /**
         * Handle an event
         * @private
         * @param {IEvent} event - The event to handle
         * @returns {boolean} true if the tooltip changed
         */
        handleEvent: function(e) {
          var me = this;
          var options2 = me._options;
          var changed = false;
          me._lastActive = me._lastActive || [];
          if (e.type === "mouseout") {
            me._active = [];
          } else {
            me._active = me._chart.getElementsAtEventForMode(e, options2.mode, options2);
            if (options2.reverse) {
              me._active.reverse();
            }
          }
          changed = !helpers$1.arrayEquals(me._active, me._lastActive);
          if (changed) {
            me._lastActive = me._active;
            if (options2.enabled || options2.custom) {
              me._eventPosition = {
                x: e.x,
                y: e.y
              };
              me.update(true);
              me.pivot();
            }
          }
          return changed;
        }
      });
      var positioners_1 = positioners;
      var core_tooltip = exports$4;
      core_tooltip.positioners = positioners_1;
      var valueOrDefault$9 = helpers$1.valueOrDefault;
      core_defaults._set("global", {
        elements: {},
        events: [
          "mousemove",
          "mouseout",
          "click",
          "touchstart",
          "touchmove"
        ],
        hover: {
          onHover: null,
          mode: "nearest",
          intersect: true,
          animationDuration: 400
        },
        onClick: null,
        maintainAspectRatio: true,
        responsive: true,
        responsiveAnimationDuration: 0
      });
      function mergeScaleConfig() {
        return helpers$1.merge(/* @__PURE__ */ Object.create(null), [].slice.call(arguments), {
          merger: function(key, target, source, options2) {
            if (key === "xAxes" || key === "yAxes") {
              var slen = source[key].length;
              var i, type, scale2;
              if (!target[key]) {
                target[key] = [];
              }
              for (i = 0; i < slen; ++i) {
                scale2 = source[key][i];
                type = valueOrDefault$9(scale2.type, key === "xAxes" ? "category" : "linear");
                if (i >= target[key].length) {
                  target[key].push({});
                }
                if (!target[key][i].type || scale2.type && scale2.type !== target[key][i].type) {
                  helpers$1.merge(target[key][i], [core_scaleService.getScaleDefaults(type), scale2]);
                } else {
                  helpers$1.merge(target[key][i], scale2);
                }
              }
            } else {
              helpers$1._merger(key, target, source, options2);
            }
          }
        });
      }
      function mergeConfig() {
        return helpers$1.merge(/* @__PURE__ */ Object.create(null), [].slice.call(arguments), {
          merger: function(key, target, source, options2) {
            var tval = target[key] || /* @__PURE__ */ Object.create(null);
            var sval = source[key];
            if (key === "scales") {
              target[key] = mergeScaleConfig(tval, sval);
            } else if (key === "scale") {
              target[key] = helpers$1.merge(tval, [core_scaleService.getScaleDefaults(sval.type), sval]);
            } else {
              helpers$1._merger(key, target, source, options2);
            }
          }
        });
      }
      function initConfig(config) {
        config = config || /* @__PURE__ */ Object.create(null);
        var data = config.data = config.data || {};
        data.datasets = data.datasets || [];
        data.labels = data.labels || [];
        config.options = mergeConfig(
          core_defaults.global,
          core_defaults[config.type],
          config.options || {}
        );
        return config;
      }
      function updateConfig(chart) {
        var newOptions = chart.options;
        helpers$1.each(chart.scales, function(scale2) {
          core_layouts.removeBox(chart, scale2);
        });
        newOptions = mergeConfig(
          core_defaults.global,
          core_defaults[chart.config.type],
          newOptions
        );
        chart.options = chart.config.options = newOptions;
        chart.ensureScalesHaveIDs();
        chart.buildOrUpdateScales();
        chart.tooltip._options = newOptions.tooltips;
        chart.tooltip.initialize();
      }
      function nextAvailableScaleId(axesOpts, prefix, index) {
        var id;
        var hasId = function(obj) {
          return obj.id === id;
        };
        do {
          id = prefix + index++;
        } while (helpers$1.findIndex(axesOpts, hasId) >= 0);
        return id;
      }
      function positionIsHorizontal(position) {
        return position === "top" || position === "bottom";
      }
      function compare2Level(l1, l2) {
        return function(a, b) {
          return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
        };
      }
      var Chart = function(item, config) {
        this.construct(item, config);
        return this;
      };
      helpers$1.extend(
        Chart.prototype,
        /** @lends Chart */
        {
          /**
           * @private
           */
          construct: function(item, config) {
            var me = this;
            config = initConfig(config);
            var context = platform.acquireContext(item, config);
            var canvas2 = context && context.canvas;
            var height = canvas2 && canvas2.height;
            var width = canvas2 && canvas2.width;
            me.id = helpers$1.uid();
            me.ctx = context;
            me.canvas = canvas2;
            me.config = config;
            me.width = width;
            me.height = height;
            me.aspectRatio = height ? width / height : null;
            me.options = config.options;
            me._bufferedRender = false;
            me._layers = [];
            me.chart = me;
            me.controller = me;
            Chart.instances[me.id] = me;
            Object.defineProperty(me, "data", {
              get: function() {
                return me.config.data;
              },
              set: function(value) {
                me.config.data = value;
              }
            });
            if (!context || !canvas2) {
              console.error("Failed to create chart: can't acquire context from the given item");
              return;
            }
            me.initialize();
            me.update();
          },
          /**
           * @private
           */
          initialize: function() {
            var me = this;
            core_plugins.notify(me, "beforeInit");
            helpers$1.retinaScale(me, me.options.devicePixelRatio);
            me.bindEvents();
            if (me.options.responsive) {
              me.resize(true);
            }
            me.initToolTip();
            core_plugins.notify(me, "afterInit");
            return me;
          },
          clear: function() {
            helpers$1.canvas.clear(this);
            return this;
          },
          stop: function() {
            core_animations.cancelAnimation(this);
            return this;
          },
          resize: function(silent) {
            var me = this;
            var options2 = me.options;
            var canvas2 = me.canvas;
            var aspectRatio = options2.maintainAspectRatio && me.aspectRatio || null;
            var newWidth = Math.max(0, Math.floor(helpers$1.getMaximumWidth(canvas2)));
            var newHeight = Math.max(0, Math.floor(aspectRatio ? newWidth / aspectRatio : helpers$1.getMaximumHeight(canvas2)));
            if (me.width === newWidth && me.height === newHeight) {
              return;
            }
            canvas2.width = me.width = newWidth;
            canvas2.height = me.height = newHeight;
            canvas2.style.width = newWidth + "px";
            canvas2.style.height = newHeight + "px";
            helpers$1.retinaScale(me, options2.devicePixelRatio);
            if (!silent) {
              var newSize = { width: newWidth, height: newHeight };
              core_plugins.notify(me, "resize", [newSize]);
              if (options2.onResize) {
                options2.onResize(me, newSize);
              }
              me.stop();
              me.update({
                duration: options2.responsiveAnimationDuration
              });
            }
          },
          ensureScalesHaveIDs: function() {
            var options2 = this.options;
            var scalesOptions = options2.scales || {};
            var scaleOptions = options2.scale;
            helpers$1.each(scalesOptions.xAxes, function(xAxisOptions, index) {
              if (!xAxisOptions.id) {
                xAxisOptions.id = nextAvailableScaleId(scalesOptions.xAxes, "x-axis-", index);
              }
            });
            helpers$1.each(scalesOptions.yAxes, function(yAxisOptions, index) {
              if (!yAxisOptions.id) {
                yAxisOptions.id = nextAvailableScaleId(scalesOptions.yAxes, "y-axis-", index);
              }
            });
            if (scaleOptions) {
              scaleOptions.id = scaleOptions.id || "scale";
            }
          },
          /**
           * Builds a map of scale ID to scale object for future lookup.
           */
          buildOrUpdateScales: function() {
            var me = this;
            var options2 = me.options;
            var scales2 = me.scales || {};
            var items = [];
            var updated = Object.keys(scales2).reduce(function(obj, id) {
              obj[id] = false;
              return obj;
            }, {});
            if (options2.scales) {
              items = items.concat(
                (options2.scales.xAxes || []).map(function(xAxisOptions) {
                  return { options: xAxisOptions, dtype: "category", dposition: "bottom" };
                }),
                (options2.scales.yAxes || []).map(function(yAxisOptions) {
                  return { options: yAxisOptions, dtype: "linear", dposition: "left" };
                })
              );
            }
            if (options2.scale) {
              items.push({
                options: options2.scale,
                dtype: "radialLinear",
                isDefault: true,
                dposition: "chartArea"
              });
            }
            helpers$1.each(items, function(item) {
              var scaleOptions = item.options;
              var id = scaleOptions.id;
              var scaleType = valueOrDefault$9(scaleOptions.type, item.dtype);
              if (positionIsHorizontal(scaleOptions.position) !== positionIsHorizontal(item.dposition)) {
                scaleOptions.position = item.dposition;
              }
              updated[id] = true;
              var scale2 = null;
              if (id in scales2 && scales2[id].type === scaleType) {
                scale2 = scales2[id];
                scale2.options = scaleOptions;
                scale2.ctx = me.ctx;
                scale2.chart = me;
              } else {
                var scaleClass = core_scaleService.getScaleConstructor(scaleType);
                if (!scaleClass) {
                  return;
                }
                scale2 = new scaleClass({
                  id,
                  type: scaleType,
                  options: scaleOptions,
                  ctx: me.ctx,
                  chart: me
                });
                scales2[scale2.id] = scale2;
              }
              scale2.mergeTicksOptions();
              if (item.isDefault) {
                me.scale = scale2;
              }
            });
            helpers$1.each(updated, function(hasUpdated, id) {
              if (!hasUpdated) {
                delete scales2[id];
              }
            });
            me.scales = scales2;
            core_scaleService.addScalesToLayout(this);
          },
          buildOrUpdateControllers: function() {
            var me = this;
            var newControllers = [];
            var datasets = me.data.datasets;
            var i, ilen;
            for (i = 0, ilen = datasets.length; i < ilen; i++) {
              var dataset = datasets[i];
              var meta = me.getDatasetMeta(i);
              var type = dataset.type || me.config.type;
              if (meta.type && meta.type !== type) {
                me.destroyDatasetMeta(i);
                meta = me.getDatasetMeta(i);
              }
              meta.type = type;
              meta.order = dataset.order || 0;
              meta.index = i;
              if (meta.controller) {
                meta.controller.updateIndex(i);
                meta.controller.linkScales();
              } else {
                var ControllerClass = controllers[meta.type];
                if (ControllerClass === void 0) {
                  throw new Error('"' + meta.type + '" is not a chart type.');
                }
                meta.controller = new ControllerClass(me, i);
                newControllers.push(meta.controller);
              }
            }
            return newControllers;
          },
          /**
           * Reset the elements of all datasets
           * @private
           */
          resetElements: function() {
            var me = this;
            helpers$1.each(me.data.datasets, function(dataset, datasetIndex) {
              me.getDatasetMeta(datasetIndex).controller.reset();
            }, me);
          },
          /**
          * Resets the chart back to it's state before the initial animation
          */
          reset: function() {
            this.resetElements();
            this.tooltip.initialize();
          },
          update: function(config) {
            var me = this;
            var i, ilen;
            if (!config || typeof config !== "object") {
              config = {
                duration: config,
                lazy: arguments[1]
              };
            }
            updateConfig(me);
            core_plugins._invalidate(me);
            if (core_plugins.notify(me, "beforeUpdate") === false) {
              return;
            }
            me.tooltip._data = me.data;
            var newControllers = me.buildOrUpdateControllers();
            for (i = 0, ilen = me.data.datasets.length; i < ilen; i++) {
              me.getDatasetMeta(i).controller.buildOrUpdateElements();
            }
            me.updateLayout();
            if (me.options.animation && me.options.animation.duration) {
              helpers$1.each(newControllers, function(controller) {
                controller.reset();
              });
            }
            me.updateDatasets();
            me.tooltip.initialize();
            me.lastActive = [];
            core_plugins.notify(me, "afterUpdate");
            me._layers.sort(compare2Level("z", "_idx"));
            if (me._bufferedRender) {
              me._bufferedRequest = {
                duration: config.duration,
                easing: config.easing,
                lazy: config.lazy
              };
            } else {
              me.render(config);
            }
          },
          /**
           * Updates the chart layout unless a plugin returns `false` to the `beforeLayout`
           * hook, in which case, plugins will not be called on `afterLayout`.
           * @private
           */
          updateLayout: function() {
            var me = this;
            if (core_plugins.notify(me, "beforeLayout") === false) {
              return;
            }
            core_layouts.update(this, this.width, this.height);
            me._layers = [];
            helpers$1.each(me.boxes, function(box) {
              if (box._configure) {
                box._configure();
              }
              me._layers.push.apply(me._layers, box._layers());
            }, me);
            me._layers.forEach(function(item, index) {
              item._idx = index;
            });
            core_plugins.notify(me, "afterScaleUpdate");
            core_plugins.notify(me, "afterLayout");
          },
          /**
           * Updates all datasets unless a plugin returns `false` to the `beforeDatasetsUpdate`
           * hook, in which case, plugins will not be called on `afterDatasetsUpdate`.
           * @private
           */
          updateDatasets: function() {
            var me = this;
            if (core_plugins.notify(me, "beforeDatasetsUpdate") === false) {
              return;
            }
            for (var i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
              me.updateDataset(i);
            }
            core_plugins.notify(me, "afterDatasetsUpdate");
          },
          /**
           * Updates dataset at index unless a plugin returns `false` to the `beforeDatasetUpdate`
           * hook, in which case, plugins will not be called on `afterDatasetUpdate`.
           * @private
           */
          updateDataset: function(index) {
            var me = this;
            var meta = me.getDatasetMeta(index);
            var args = {
              meta,
              index
            };
            if (core_plugins.notify(me, "beforeDatasetUpdate", [args]) === false) {
              return;
            }
            meta.controller._update();
            core_plugins.notify(me, "afterDatasetUpdate", [args]);
          },
          render: function(config) {
            var me = this;
            if (!config || typeof config !== "object") {
              config = {
                duration: config,
                lazy: arguments[1]
              };
            }
            var animationOptions = me.options.animation;
            var duration = valueOrDefault$9(config.duration, animationOptions && animationOptions.duration);
            var lazy = config.lazy;
            if (core_plugins.notify(me, "beforeRender") === false) {
              return;
            }
            var onComplete = function(animation2) {
              core_plugins.notify(me, "afterRender");
              helpers$1.callback(animationOptions && animationOptions.onComplete, [animation2], me);
            };
            if (animationOptions && duration) {
              var animation = new core_animation({
                numSteps: duration / 16.66,
                // 60 fps
                easing: config.easing || animationOptions.easing,
                render: function(chart, animationObject) {
                  var easingFunction = helpers$1.easing.effects[animationObject.easing];
                  var currentStep = animationObject.currentStep;
                  var stepDecimal = currentStep / animationObject.numSteps;
                  chart.draw(easingFunction(stepDecimal), stepDecimal, currentStep);
                },
                onAnimationProgress: animationOptions.onProgress,
                onAnimationComplete: onComplete
              });
              core_animations.addAnimation(me, animation, duration, lazy);
            } else {
              me.draw();
              onComplete(new core_animation({ numSteps: 0, chart: me }));
            }
            return me;
          },
          draw: function(easingValue) {
            var me = this;
            var i, layers;
            me.clear();
            if (helpers$1.isNullOrUndef(easingValue)) {
              easingValue = 1;
            }
            me.transition(easingValue);
            if (me.width <= 0 || me.height <= 0) {
              return;
            }
            if (core_plugins.notify(me, "beforeDraw", [easingValue]) === false) {
              return;
            }
            layers = me._layers;
            for (i = 0; i < layers.length && layers[i].z <= 0; ++i) {
              layers[i].draw(me.chartArea);
            }
            me.drawDatasets(easingValue);
            for (; i < layers.length; ++i) {
              layers[i].draw(me.chartArea);
            }
            me._drawTooltip(easingValue);
            core_plugins.notify(me, "afterDraw", [easingValue]);
          },
          /**
           * @private
           */
          transition: function(easingValue) {
            var me = this;
            for (var i = 0, ilen = (me.data.datasets || []).length; i < ilen; ++i) {
              if (me.isDatasetVisible(i)) {
                me.getDatasetMeta(i).controller.transition(easingValue);
              }
            }
            me.tooltip.transition(easingValue);
          },
          /**
           * @private
           */
          _getSortedDatasetMetas: function(filterVisible) {
            var me = this;
            var datasets = me.data.datasets || [];
            var result = [];
            var i, ilen;
            for (i = 0, ilen = datasets.length; i < ilen; ++i) {
              if (!filterVisible || me.isDatasetVisible(i)) {
                result.push(me.getDatasetMeta(i));
              }
            }
            result.sort(compare2Level("order", "index"));
            return result;
          },
          /**
           * @private
           */
          _getSortedVisibleDatasetMetas: function() {
            return this._getSortedDatasetMetas(true);
          },
          /**
           * Draws all datasets unless a plugin returns `false` to the `beforeDatasetsDraw`
           * hook, in which case, plugins will not be called on `afterDatasetsDraw`.
           * @private
           */
          drawDatasets: function(easingValue) {
            var me = this;
            var metasets, i;
            if (core_plugins.notify(me, "beforeDatasetsDraw", [easingValue]) === false) {
              return;
            }
            metasets = me._getSortedVisibleDatasetMetas();
            for (i = metasets.length - 1; i >= 0; --i) {
              me.drawDataset(metasets[i], easingValue);
            }
            core_plugins.notify(me, "afterDatasetsDraw", [easingValue]);
          },
          /**
           * Draws dataset at index unless a plugin returns `false` to the `beforeDatasetDraw`
           * hook, in which case, plugins will not be called on `afterDatasetDraw`.
           * @private
           */
          drawDataset: function(meta, easingValue) {
            var me = this;
            var args = {
              meta,
              index: meta.index,
              easingValue
            };
            if (core_plugins.notify(me, "beforeDatasetDraw", [args]) === false) {
              return;
            }
            meta.controller.draw(easingValue);
            core_plugins.notify(me, "afterDatasetDraw", [args]);
          },
          /**
           * Draws tooltip unless a plugin returns `false` to the `beforeTooltipDraw`
           * hook, in which case, plugins will not be called on `afterTooltipDraw`.
           * @private
           */
          _drawTooltip: function(easingValue) {
            var me = this;
            var tooltip = me.tooltip;
            var args = {
              tooltip,
              easingValue
            };
            if (core_plugins.notify(me, "beforeTooltipDraw", [args]) === false) {
              return;
            }
            tooltip.draw();
            core_plugins.notify(me, "afterTooltipDraw", [args]);
          },
          /**
           * Get the single element that was clicked on
           * @return An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
           */
          getElementAtEvent: function(e) {
            return core_interaction.modes.single(this, e);
          },
          getElementsAtEvent: function(e) {
            return core_interaction.modes.label(this, e, { intersect: true });
          },
          getElementsAtXAxis: function(e) {
            return core_interaction.modes["x-axis"](this, e, { intersect: true });
          },
          getElementsAtEventForMode: function(e, mode, options2) {
            var method = core_interaction.modes[mode];
            if (typeof method === "function") {
              return method(this, e, options2);
            }
            return [];
          },
          getDatasetAtEvent: function(e) {
            return core_interaction.modes.dataset(this, e, { intersect: true });
          },
          getDatasetMeta: function(datasetIndex) {
            var me = this;
            var dataset = me.data.datasets[datasetIndex];
            if (!dataset._meta) {
              dataset._meta = {};
            }
            var meta = dataset._meta[me.id];
            if (!meta) {
              meta = dataset._meta[me.id] = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                // See isDatasetVisible() comment
                xAxisID: null,
                yAxisID: null,
                order: dataset.order || 0,
                index: datasetIndex
              };
            }
            return meta;
          },
          getVisibleDatasetCount: function() {
            var count = 0;
            for (var i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
              if (this.isDatasetVisible(i)) {
                count++;
              }
            }
            return count;
          },
          isDatasetVisible: function(datasetIndex) {
            var meta = this.getDatasetMeta(datasetIndex);
            return typeof meta.hidden === "boolean" ? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
          },
          generateLegend: function() {
            return this.options.legendCallback(this);
          },
          /**
           * @private
           */
          destroyDatasetMeta: function(datasetIndex) {
            var id = this.id;
            var dataset = this.data.datasets[datasetIndex];
            var meta = dataset._meta && dataset._meta[id];
            if (meta) {
              meta.controller.destroy();
              delete dataset._meta[id];
            }
          },
          destroy: function() {
            var me = this;
            var canvas2 = me.canvas;
            var i, ilen;
            me.stop();
            for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
              me.destroyDatasetMeta(i);
            }
            if (canvas2) {
              me.unbindEvents();
              helpers$1.canvas.clear(me);
              platform.releaseContext(me.ctx);
              me.canvas = null;
              me.ctx = null;
            }
            core_plugins.notify(me, "destroy");
            delete Chart.instances[me.id];
          },
          toBase64Image: function() {
            return this.canvas.toDataURL.apply(this.canvas, arguments);
          },
          initToolTip: function() {
            var me = this;
            me.tooltip = new core_tooltip({
              _chart: me,
              _chartInstance: me,
              // deprecated, backward compatibility
              _data: me.data,
              _options: me.options.tooltips
            }, me);
          },
          /**
           * @private
           */
          bindEvents: function() {
            var me = this;
            var listeners = me._listeners = {};
            var listener = function() {
              me.eventHandler.apply(me, arguments);
            };
            helpers$1.each(me.options.events, function(type) {
              platform.addEventListener(me, type, listener);
              listeners[type] = listener;
            });
            if (me.options.responsive) {
              listener = function() {
                me.resize();
              };
              platform.addEventListener(me, "resize", listener);
              listeners.resize = listener;
            }
          },
          /**
           * @private
           */
          unbindEvents: function() {
            var me = this;
            var listeners = me._listeners;
            if (!listeners) {
              return;
            }
            delete me._listeners;
            helpers$1.each(listeners, function(listener, type) {
              platform.removeEventListener(me, type, listener);
            });
          },
          updateHoverStyle: function(elements2, mode, enabled) {
            var prefix = enabled ? "set" : "remove";
            var element, i, ilen;
            for (i = 0, ilen = elements2.length; i < ilen; ++i) {
              element = elements2[i];
              if (element) {
                this.getDatasetMeta(element._datasetIndex).controller[prefix + "HoverStyle"](element);
              }
            }
            if (mode === "dataset") {
              this.getDatasetMeta(elements2[0]._datasetIndex).controller["_" + prefix + "DatasetHoverStyle"]();
            }
          },
          /**
           * @private
           */
          eventHandler: function(e) {
            var me = this;
            var tooltip = me.tooltip;
            if (core_plugins.notify(me, "beforeEvent", [e]) === false) {
              return;
            }
            me._bufferedRender = true;
            me._bufferedRequest = null;
            var changed = me.handleEvent(e);
            if (tooltip) {
              changed = tooltip._start ? tooltip.handleEvent(e) : changed | tooltip.handleEvent(e);
            }
            core_plugins.notify(me, "afterEvent", [e]);
            var bufferedRequest = me._bufferedRequest;
            if (bufferedRequest) {
              me.render(bufferedRequest);
            } else if (changed && !me.animating) {
              me.stop();
              me.render({
                duration: me.options.hover.animationDuration,
                lazy: true
              });
            }
            me._bufferedRender = false;
            me._bufferedRequest = null;
            return me;
          },
          /**
           * Handle an event
           * @private
           * @param {IEvent} event the event to handle
           * @return {boolean} true if the chart needs to re-render
           */
          handleEvent: function(e) {
            var me = this;
            var options2 = me.options || {};
            var hoverOptions = options2.hover;
            var changed = false;
            me.lastActive = me.lastActive || [];
            if (e.type === "mouseout") {
              me.active = [];
            } else {
              me.active = me.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions);
            }
            helpers$1.callback(options2.onHover || options2.hover.onHover, [e.native, me.active], me);
            if (e.type === "mouseup" || e.type === "click") {
              if (options2.onClick) {
                options2.onClick.call(me, e.native, me.active);
              }
            }
            if (me.lastActive.length) {
              me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
            }
            if (me.active.length && hoverOptions.mode) {
              me.updateHoverStyle(me.active, hoverOptions.mode, true);
            }
            changed = !helpers$1.arrayEquals(me.active, me.lastActive);
            me.lastActive = me.active;
            return changed;
          }
        }
      );
      Chart.instances = {};
      var core_controller = Chart;
      Chart.Controller = Chart;
      Chart.types = {};
      helpers$1.configMerge = mergeConfig;
      helpers$1.scaleMerge = mergeScaleConfig;
      var core_helpers = function() {
        helpers$1.where = function(collection, filterCallback) {
          if (helpers$1.isArray(collection) && Array.prototype.filter) {
            return collection.filter(filterCallback);
          }
          var filtered = [];
          helpers$1.each(collection, function(item) {
            if (filterCallback(item)) {
              filtered.push(item);
            }
          });
          return filtered;
        };
        helpers$1.findIndex = Array.prototype.findIndex ? function(array, callback, scope) {
          return array.findIndex(callback, scope);
        } : function(array, callback, scope) {
          scope = scope === void 0 ? array : scope;
          for (var i = 0, ilen = array.length; i < ilen; ++i) {
            if (callback.call(scope, array[i], i, array)) {
              return i;
            }
          }
          return -1;
        };
        helpers$1.findNextWhere = function(arrayToSearch, filterCallback, startIndex) {
          if (helpers$1.isNullOrUndef(startIndex)) {
            startIndex = -1;
          }
          for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
            var currentItem = arrayToSearch[i];
            if (filterCallback(currentItem)) {
              return currentItem;
            }
          }
        };
        helpers$1.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex) {
          if (helpers$1.isNullOrUndef(startIndex)) {
            startIndex = arrayToSearch.length;
          }
          for (var i = startIndex - 1; i >= 0; i--) {
            var currentItem = arrayToSearch[i];
            if (filterCallback(currentItem)) {
              return currentItem;
            }
          }
        };
        helpers$1.isNumber = function(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        };
        helpers$1.almostEquals = function(x, y, epsilon) {
          return Math.abs(x - y) < epsilon;
        };
        helpers$1.almostWhole = function(x, epsilon) {
          var rounded = Math.round(x);
          return rounded - epsilon <= x && rounded + epsilon >= x;
        };
        helpers$1.max = function(array) {
          return array.reduce(function(max, value) {
            if (!isNaN(value)) {
              return Math.max(max, value);
            }
            return max;
          }, Number.NEGATIVE_INFINITY);
        };
        helpers$1.min = function(array) {
          return array.reduce(function(min, value) {
            if (!isNaN(value)) {
              return Math.min(min, value);
            }
            return min;
          }, Number.POSITIVE_INFINITY);
        };
        helpers$1.sign = Math.sign ? function(x) {
          return Math.sign(x);
        } : function(x) {
          x = +x;
          if (x === 0 || isNaN(x)) {
            return x;
          }
          return x > 0 ? 1 : -1;
        };
        helpers$1.toRadians = function(degrees) {
          return degrees * (Math.PI / 180);
        };
        helpers$1.toDegrees = function(radians) {
          return radians * (180 / Math.PI);
        };
        helpers$1._decimalPlaces = function(x) {
          if (!helpers$1.isFinite(x)) {
            return;
          }
          var e = 1;
          var p = 0;
          while (Math.round(x * e) / e !== x) {
            e *= 10;
            p++;
          }
          return p;
        };
        helpers$1.getAngleFromPoint = function(centrePoint, anglePoint) {
          var distanceFromXCenter = anglePoint.x - centrePoint.x;
          var distanceFromYCenter = anglePoint.y - centrePoint.y;
          var radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
          var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
          if (angle < -0.5 * Math.PI) {
            angle += 2 * Math.PI;
          }
          return {
            angle,
            distance: radialDistanceFromCenter
          };
        };
        helpers$1.distanceBetweenPoints = function(pt1, pt2) {
          return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
        };
        helpers$1.aliasPixel = function(pixelWidth) {
          return pixelWidth % 2 === 0 ? 0 : 0.5;
        };
        helpers$1._alignPixel = function(chart, pixel, width) {
          var devicePixelRatio = chart.currentDevicePixelRatio;
          var halfWidth = width / 2;
          return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
        };
        helpers$1.splineCurve = function(firstPoint, middlePoint, afterPoint, t) {
          var previous = firstPoint.skip ? middlePoint : firstPoint;
          var current = middlePoint;
          var next = afterPoint.skip ? middlePoint : afterPoint;
          var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
          var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));
          var s01 = d01 / (d01 + d12);
          var s12 = d12 / (d01 + d12);
          s01 = isNaN(s01) ? 0 : s01;
          s12 = isNaN(s12) ? 0 : s12;
          var fa = t * s01;
          var fb = t * s12;
          return {
            previous: {
              x: current.x - fa * (next.x - previous.x),
              y: current.y - fa * (next.y - previous.y)
            },
            next: {
              x: current.x + fb * (next.x - previous.x),
              y: current.y + fb * (next.y - previous.y)
            }
          };
        };
        helpers$1.EPSILON = Number.EPSILON || 1e-14;
        helpers$1.splineCurveMonotone = function(points) {
          var pointsWithTangents = (points || []).map(function(point) {
            return {
              model: point._model,
              deltaK: 0,
              mK: 0
            };
          });
          var pointsLen = pointsWithTangents.length;
          var i, pointBefore, pointCurrent, pointAfter;
          for (i = 0; i < pointsLen; ++i) {
            pointCurrent = pointsWithTangents[i];
            if (pointCurrent.model.skip) {
              continue;
            }
            pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
            pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
            if (pointAfter && !pointAfter.model.skip) {
              var slopeDeltaX = pointAfter.model.x - pointCurrent.model.x;
              pointCurrent.deltaK = slopeDeltaX !== 0 ? (pointAfter.model.y - pointCurrent.model.y) / slopeDeltaX : 0;
            }
            if (!pointBefore || pointBefore.model.skip) {
              pointCurrent.mK = pointCurrent.deltaK;
            } else if (!pointAfter || pointAfter.model.skip) {
              pointCurrent.mK = pointBefore.deltaK;
            } else if (this.sign(pointBefore.deltaK) !== this.sign(pointCurrent.deltaK)) {
              pointCurrent.mK = 0;
            } else {
              pointCurrent.mK = (pointBefore.deltaK + pointCurrent.deltaK) / 2;
            }
          }
          var alphaK, betaK, tauK, squaredMagnitude;
          for (i = 0; i < pointsLen - 1; ++i) {
            pointCurrent = pointsWithTangents[i];
            pointAfter = pointsWithTangents[i + 1];
            if (pointCurrent.model.skip || pointAfter.model.skip) {
              continue;
            }
            if (helpers$1.almostEquals(pointCurrent.deltaK, 0, this.EPSILON)) {
              pointCurrent.mK = pointAfter.mK = 0;
              continue;
            }
            alphaK = pointCurrent.mK / pointCurrent.deltaK;
            betaK = pointAfter.mK / pointCurrent.deltaK;
            squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
            if (squaredMagnitude <= 9) {
              continue;
            }
            tauK = 3 / Math.sqrt(squaredMagnitude);
            pointCurrent.mK = alphaK * tauK * pointCurrent.deltaK;
            pointAfter.mK = betaK * tauK * pointCurrent.deltaK;
          }
          var deltaX;
          for (i = 0; i < pointsLen; ++i) {
            pointCurrent = pointsWithTangents[i];
            if (pointCurrent.model.skip) {
              continue;
            }
            pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
            pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
            if (pointBefore && !pointBefore.model.skip) {
              deltaX = (pointCurrent.model.x - pointBefore.model.x) / 3;
              pointCurrent.model.controlPointPreviousX = pointCurrent.model.x - deltaX;
              pointCurrent.model.controlPointPreviousY = pointCurrent.model.y - deltaX * pointCurrent.mK;
            }
            if (pointAfter && !pointAfter.model.skip) {
              deltaX = (pointAfter.model.x - pointCurrent.model.x) / 3;
              pointCurrent.model.controlPointNextX = pointCurrent.model.x + deltaX;
              pointCurrent.model.controlPointNextY = pointCurrent.model.y + deltaX * pointCurrent.mK;
            }
          }
        };
        helpers$1.nextItem = function(collection, index, loop) {
          if (loop) {
            return index >= collection.length - 1 ? collection[0] : collection[index + 1];
          }
          return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
        };
        helpers$1.previousItem = function(collection, index, loop) {
          if (loop) {
            return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
          }
          return index <= 0 ? collection[0] : collection[index - 1];
        };
        helpers$1.niceNum = function(range, round) {
          var exponent = Math.floor(helpers$1.log10(range));
          var fraction = range / Math.pow(10, exponent);
          var niceFraction;
          if (round) {
            if (fraction < 1.5) {
              niceFraction = 1;
            } else if (fraction < 3) {
              niceFraction = 2;
            } else if (fraction < 7) {
              niceFraction = 5;
            } else {
              niceFraction = 10;
            }
          } else if (fraction <= 1) {
            niceFraction = 1;
          } else if (fraction <= 2) {
            niceFraction = 2;
          } else if (fraction <= 5) {
            niceFraction = 5;
          } else {
            niceFraction = 10;
          }
          return niceFraction * Math.pow(10, exponent);
        };
        helpers$1.requestAnimFrame = function() {
          if (typeof window === "undefined") {
            return function(callback) {
              callback();
            };
          }
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            return window.setTimeout(callback, 1e3 / 60);
          };
        }();
        helpers$1.getRelativePosition = function(evt, chart) {
          var mouseX, mouseY;
          var e = evt.originalEvent || evt;
          var canvas2 = evt.target || evt.srcElement;
          var boundingRect = canvas2.getBoundingClientRect();
          var touches = e.touches;
          if (touches && touches.length > 0) {
            mouseX = touches[0].clientX;
            mouseY = touches[0].clientY;
          } else {
            mouseX = e.clientX;
            mouseY = e.clientY;
          }
          var paddingLeft = parseFloat(helpers$1.getStyle(canvas2, "padding-left"));
          var paddingTop = parseFloat(helpers$1.getStyle(canvas2, "padding-top"));
          var paddingRight = parseFloat(helpers$1.getStyle(canvas2, "padding-right"));
          var paddingBottom = parseFloat(helpers$1.getStyle(canvas2, "padding-bottom"));
          var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
          var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;
          mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / width * canvas2.width / chart.currentDevicePixelRatio);
          mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / height * canvas2.height / chart.currentDevicePixelRatio);
          return {
            x: mouseX,
            y: mouseY
          };
        };
        function parseMaxStyle(styleValue, node, parentProperty) {
          var valueInPixels;
          if (typeof styleValue === "string") {
            valueInPixels = parseInt(styleValue, 10);
            if (styleValue.indexOf("%") !== -1) {
              valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
            }
          } else {
            valueInPixels = styleValue;
          }
          return valueInPixels;
        }
        function isConstrainedValue(value) {
          return value !== void 0 && value !== null && value !== "none";
        }
        function getConstraintDimension(domNode, maxStyle, percentageProperty) {
          var view = document.defaultView;
          var parentNode = helpers$1._getParentNode(domNode);
          var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
          var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
          var hasCNode = isConstrainedValue(constrainedNode);
          var hasCContainer = isConstrainedValue(constrainedContainer);
          var infinity = Number.POSITIVE_INFINITY;
          if (hasCNode || hasCContainer) {
            return Math.min(
              hasCNode ? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity,
              hasCContainer ? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity
            );
          }
          return "none";
        }
        helpers$1.getConstraintWidth = function(domNode) {
          return getConstraintDimension(domNode, "max-width", "clientWidth");
        };
        helpers$1.getConstraintHeight = function(domNode) {
          return getConstraintDimension(domNode, "max-height", "clientHeight");
        };
        helpers$1._calculatePadding = function(container, padding, parentDimension) {
          padding = helpers$1.getStyle(container, padding);
          return padding.indexOf("%") > -1 ? parentDimension * parseInt(padding, 10) / 100 : parseInt(padding, 10);
        };
        helpers$1._getParentNode = function(domNode) {
          var parent = domNode.parentNode;
          if (parent && parent.toString() === "[object ShadowRoot]") {
            parent = parent.host;
          }
          return parent;
        };
        helpers$1.getMaximumWidth = function(domNode) {
          var container = helpers$1._getParentNode(domNode);
          if (!container) {
            return domNode.clientWidth;
          }
          var clientWidth = container.clientWidth;
          var paddingLeft = helpers$1._calculatePadding(container, "padding-left", clientWidth);
          var paddingRight = helpers$1._calculatePadding(container, "padding-right", clientWidth);
          var w = clientWidth - paddingLeft - paddingRight;
          var cw = helpers$1.getConstraintWidth(domNode);
          return isNaN(cw) ? w : Math.min(w, cw);
        };
        helpers$1.getMaximumHeight = function(domNode) {
          var container = helpers$1._getParentNode(domNode);
          if (!container) {
            return domNode.clientHeight;
          }
          var clientHeight = container.clientHeight;
          var paddingTop = helpers$1._calculatePadding(container, "padding-top", clientHeight);
          var paddingBottom = helpers$1._calculatePadding(container, "padding-bottom", clientHeight);
          var h = clientHeight - paddingTop - paddingBottom;
          var ch = helpers$1.getConstraintHeight(domNode);
          return isNaN(ch) ? h : Math.min(h, ch);
        };
        helpers$1.getStyle = function(el, property) {
          return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
        };
        helpers$1.retinaScale = function(chart, forceRatio) {
          var pixelRatio = chart.currentDevicePixelRatio = forceRatio || typeof window !== "undefined" && window.devicePixelRatio || 1;
          if (pixelRatio === 1) {
            return;
          }
          var canvas2 = chart.canvas;
          var height = chart.height;
          var width = chart.width;
          canvas2.height = height * pixelRatio;
          canvas2.width = width * pixelRatio;
          chart.ctx.scale(pixelRatio, pixelRatio);
          if (!canvas2.style.height && !canvas2.style.width) {
            canvas2.style.height = height + "px";
            canvas2.style.width = width + "px";
          }
        };
        helpers$1.fontString = function(pixelSize, fontStyle, fontFamily) {
          return fontStyle + " " + pixelSize + "px " + fontFamily;
        };
        helpers$1.longestText = function(ctx, font, arrayOfThings, cache) {
          cache = cache || {};
          var data = cache.data = cache.data || {};
          var gc = cache.garbageCollect = cache.garbageCollect || [];
          if (cache.font !== font) {
            data = cache.data = {};
            gc = cache.garbageCollect = [];
            cache.font = font;
          }
          ctx.font = font;
          var longest = 0;
          var ilen = arrayOfThings.length;
          var i, j, jlen, thing, nestedThing;
          for (i = 0; i < ilen; i++) {
            thing = arrayOfThings[i];
            if (thing !== void 0 && thing !== null && helpers$1.isArray(thing) !== true) {
              longest = helpers$1.measureText(ctx, data, gc, longest, thing);
            } else if (helpers$1.isArray(thing)) {
              for (j = 0, jlen = thing.length; j < jlen; j++) {
                nestedThing = thing[j];
                if (nestedThing !== void 0 && nestedThing !== null && !helpers$1.isArray(nestedThing)) {
                  longest = helpers$1.measureText(ctx, data, gc, longest, nestedThing);
                }
              }
            }
          }
          var gcLen = gc.length / 2;
          if (gcLen > arrayOfThings.length) {
            for (i = 0; i < gcLen; i++) {
              delete data[gc[i]];
            }
            gc.splice(0, gcLen);
          }
          return longest;
        };
        helpers$1.measureText = function(ctx, data, gc, longest, string) {
          var textWidth = data[string];
          if (!textWidth) {
            textWidth = data[string] = ctx.measureText(string).width;
            gc.push(string);
          }
          if (textWidth > longest) {
            longest = textWidth;
          }
          return longest;
        };
        helpers$1.numberOfLabelLines = function(arrayOfThings) {
          var numberOfLines = 1;
          helpers$1.each(arrayOfThings, function(thing) {
            if (helpers$1.isArray(thing)) {
              if (thing.length > numberOfLines) {
                numberOfLines = thing.length;
              }
            }
          });
          return numberOfLines;
        };
        helpers$1.color = !chartjsColor ? function(value) {
          console.error("Color.js not found!");
          return value;
        } : function(value) {
          if (value instanceof CanvasGradient) {
            value = core_defaults.global.defaultColor;
          }
          return chartjsColor(value);
        };
        helpers$1.getHoverColor = function(colorValue) {
          return colorValue instanceof CanvasPattern || colorValue instanceof CanvasGradient ? colorValue : helpers$1.color(colorValue).saturate(0.5).darken(0.1).rgbString();
        };
      };
      function abstract() {
        throw new Error(
          "This method is not implemented: either no adapter can be found or an incomplete integration was provided."
        );
      }
      function DateAdapter(options2) {
        this.options = options2 || {};
      }
      helpers$1.extend(
        DateAdapter.prototype,
        /** @lends DateAdapter */
        {
          /**
           * Returns a map of time formats for the supported formatting units defined
           * in Unit as well as 'datetime' representing a detailed date/time string.
           * @returns {{string: string}}
           */
          formats: abstract,
          /**
           * Parses the given `value` and return the associated timestamp.
           * @param {any} value - the value to parse (usually comes from the data)
           * @param {string} [format] - the expected data format
           * @returns {(number|null)}
           * @function
           */
          parse: abstract,
          /**
           * Returns the formatted date in the specified `format` for a given `timestamp`.
           * @param {number} timestamp - the timestamp to format
           * @param {string} format - the date/time token
           * @return {string}
           * @function
           */
          format: abstract,
          /**
           * Adds the specified `amount` of `unit` to the given `timestamp`.
           * @param {number} timestamp - the input timestamp
           * @param {number} amount - the amount to add
           * @param {Unit} unit - the unit as string
           * @return {number}
           * @function
           */
          add: abstract,
          /**
           * Returns the number of `unit` between the given timestamps.
           * @param {number} max - the input timestamp (reference)
           * @param {number} min - the timestamp to substract
           * @param {Unit} unit - the unit as string
           * @return {number}
           * @function
           */
          diff: abstract,
          /**
           * Returns start of `unit` for the given `timestamp`.
           * @param {number} timestamp - the input timestamp
           * @param {Unit} unit - the unit as string
           * @param {number} [weekday] - the ISO day of the week with 1 being Monday
           * and 7 being Sunday (only needed if param *unit* is `isoWeek`).
           * @function
           */
          startOf: abstract,
          /**
           * Returns end of `unit` for the given `timestamp`.
           * @param {number} timestamp - the input timestamp
           * @param {Unit} unit - the unit as string
           * @function
           */
          endOf: abstract,
          // DEPRECATIONS
          /**
           * Provided for backward compatibility for scale.getValueForPixel(),
           * this method should be overridden only by the moment adapter.
           * @deprecated since version 2.8.0
           * @todo remove at version 3
           * @private
           */
          _create: function(value) {
            return value;
          }
        }
      );
      DateAdapter.override = function(members) {
        helpers$1.extend(DateAdapter.prototype, members);
      };
      var _date = DateAdapter;
      var core_adapters = {
        _date
      };
      var core_ticks = {
        /**
         * Namespace to hold formatters for different types of ticks
         * @namespace Chart.Ticks.formatters
         */
        formatters: {
          /**
           * Formatter for value labels
           * @method Chart.Ticks.formatters.values
           * @param value the value to display
           * @return {string|string[]} the label to display
           */
          values: function(value) {
            return helpers$1.isArray(value) ? value : "" + value;
          },
          /**
           * Formatter for linear numeric ticks
           * @method Chart.Ticks.formatters.linear
           * @param tickValue {number} the value to be formatted
           * @param index {number} the position of the tickValue parameter in the ticks array
           * @param ticks {number[]} the list of ticks being converted
           * @return {string} string representation of the tickValue parameter
           */
          linear: function(tickValue, index, ticks) {
            var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];
            if (Math.abs(delta) > 1) {
              if (tickValue !== Math.floor(tickValue)) {
                delta = tickValue - Math.floor(tickValue);
              }
            }
            var logDelta = helpers$1.log10(Math.abs(delta));
            var tickString = "";
            if (tickValue !== 0) {
              var maxTick = Math.max(Math.abs(ticks[0]), Math.abs(ticks[ticks.length - 1]));
              if (maxTick < 1e-4) {
                var logTick = helpers$1.log10(Math.abs(tickValue));
                var numExponential = Math.floor(logTick) - Math.floor(logDelta);
                numExponential = Math.max(Math.min(numExponential, 20), 0);
                tickString = tickValue.toExponential(numExponential);
              } else {
                var numDecimal = -1 * Math.floor(logDelta);
                numDecimal = Math.max(Math.min(numDecimal, 20), 0);
                tickString = tickValue.toFixed(numDecimal);
              }
            } else {
              tickString = "0";
            }
            return tickString;
          },
          logarithmic: function(tickValue, index, ticks) {
            var remain = tickValue / Math.pow(10, Math.floor(helpers$1.log10(tickValue)));
            if (tickValue === 0) {
              return "0";
            } else if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === ticks.length - 1) {
              return tickValue.toExponential();
            }
            return "";
          }
        }
      };
      var isArray = helpers$1.isArray;
      var isNullOrUndef = helpers$1.isNullOrUndef;
      var valueOrDefault$a = helpers$1.valueOrDefault;
      var valueAtIndexOrDefault = helpers$1.valueAtIndexOrDefault;
      core_defaults._set("scale", {
        display: true,
        position: "left",
        offset: false,
        // grid line settings
        gridLines: {
          display: true,
          color: "rgba(0,0,0,0.1)",
          lineWidth: 1,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
          tickMarkLength: 10,
          zeroLineWidth: 1,
          zeroLineColor: "rgba(0,0,0,0.25)",
          zeroLineBorderDash: [],
          zeroLineBorderDashOffset: 0,
          offsetGridLines: false,
          borderDash: [],
          borderDashOffset: 0
        },
        // scale label
        scaleLabel: {
          // display property
          display: false,
          // actual label
          labelString: "",
          // top/bottom padding
          padding: {
            top: 4,
            bottom: 4
          }
        },
        // label settings
        ticks: {
          beginAtZero: false,
          minRotation: 0,
          maxRotation: 50,
          mirror: false,
          padding: 0,
          reverse: false,
          display: true,
          autoSkip: true,
          autoSkipPadding: 0,
          labelOffset: 0,
          // We pass through arrays to be rendered as multiline labels, we convert Others to strings here.
          callback: core_ticks.formatters.values,
          minor: {},
          major: {}
        }
      });
      function sample(arr, numItems) {
        var result = [];
        var increment = arr.length / numItems;
        var i = 0;
        var len = arr.length;
        for (; i < len; i += increment) {
          result.push(arr[Math.floor(i)]);
        }
        return result;
      }
      function getPixelForGridLine(scale2, index, offsetGridLines) {
        var length = scale2.getTicks().length;
        var validIndex = Math.min(index, length - 1);
        var lineValue = scale2.getPixelForTick(validIndex);
        var start = scale2._startPixel;
        var end = scale2._endPixel;
        var epsilon = 1e-6;
        var offset;
        if (offsetGridLines) {
          if (length === 1) {
            offset = Math.max(lineValue - start, end - lineValue);
          } else if (index === 0) {
            offset = (scale2.getPixelForTick(1) - lineValue) / 2;
          } else {
            offset = (lineValue - scale2.getPixelForTick(validIndex - 1)) / 2;
          }
          lineValue += validIndex < index ? offset : -offset;
          if (lineValue < start - epsilon || lineValue > end + epsilon) {
            return;
          }
        }
        return lineValue;
      }
      function garbageCollect(caches, length) {
        helpers$1.each(caches, function(cache) {
          var gc = cache.gc;
          var gcLen = gc.length / 2;
          var i;
          if (gcLen > length) {
            for (i = 0; i < gcLen; ++i) {
              delete cache.data[gc[i]];
            }
            gc.splice(0, gcLen);
          }
        });
      }
      function computeLabelSizes(ctx, tickFonts, ticks, caches) {
        var length = ticks.length;
        var widths = [];
        var heights = [];
        var offsets = [];
        var widestLabelSize = 0;
        var highestLabelSize = 0;
        var i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel, widest, highest;
        for (i = 0; i < length; ++i) {
          label = ticks[i].label;
          tickFont = ticks[i].major ? tickFonts.major : tickFonts.minor;
          ctx.font = fontString = tickFont.string;
          cache = caches[fontString] = caches[fontString] || { data: {}, gc: [] };
          lineHeight = tickFont.lineHeight;
          width = height = 0;
          if (!isNullOrUndef(label) && !isArray(label)) {
            width = helpers$1.measureText(ctx, cache.data, cache.gc, width, label);
            height = lineHeight;
          } else if (isArray(label)) {
            for (j = 0, jlen = label.length; j < jlen; ++j) {
              nestedLabel = label[j];
              if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
                width = helpers$1.measureText(ctx, cache.data, cache.gc, width, nestedLabel);
                height += lineHeight;
              }
            }
          }
          widths.push(width);
          heights.push(height);
          offsets.push(lineHeight / 2);
          widestLabelSize = Math.max(width, widestLabelSize);
          highestLabelSize = Math.max(height, highestLabelSize);
        }
        garbageCollect(caches, length);
        widest = widths.indexOf(widestLabelSize);
        highest = heights.indexOf(highestLabelSize);
        function valueAt(idx) {
          return {
            width: widths[idx] || 0,
            height: heights[idx] || 0,
            offset: offsets[idx] || 0
          };
        }
        return {
          first: valueAt(0),
          last: valueAt(length - 1),
          widest: valueAt(widest),
          highest: valueAt(highest)
        };
      }
      function getTickMarkLength(options2) {
        return options2.drawTicks ? options2.tickMarkLength : 0;
      }
      function getScaleLabelHeight(options2) {
        var font, padding;
        if (!options2.display) {
          return 0;
        }
        font = helpers$1.options._parseFont(options2);
        padding = helpers$1.options.toPadding(options2.padding);
        return font.lineHeight + padding.height;
      }
      function parseFontOptions(options2, nestedOpts) {
        return helpers$1.extend(helpers$1.options._parseFont({
          fontFamily: valueOrDefault$a(nestedOpts.fontFamily, options2.fontFamily),
          fontSize: valueOrDefault$a(nestedOpts.fontSize, options2.fontSize),
          fontStyle: valueOrDefault$a(nestedOpts.fontStyle, options2.fontStyle),
          lineHeight: valueOrDefault$a(nestedOpts.lineHeight, options2.lineHeight)
        }), {
          color: helpers$1.options.resolve([nestedOpts.fontColor, options2.fontColor, core_defaults.global.defaultFontColor])
        });
      }
      function parseTickFontOptions(options2) {
        var minor = parseFontOptions(options2, options2.minor);
        var major = options2.major.enabled ? parseFontOptions(options2, options2.major) : minor;
        return { minor, major };
      }
      function nonSkipped(ticksToFilter) {
        var filtered = [];
        var item, index, len;
        for (index = 0, len = ticksToFilter.length; index < len; ++index) {
          item = ticksToFilter[index];
          if (typeof item._index !== "undefined") {
            filtered.push(item);
          }
        }
        return filtered;
      }
      function getEvenSpacing(arr) {
        var len = arr.length;
        var i, diff;
        if (len < 2) {
          return false;
        }
        for (diff = arr[0], i = 1; i < len; ++i) {
          if (arr[i] - arr[i - 1] !== diff) {
            return false;
          }
        }
        return diff;
      }
      function calculateSpacing(majorIndices, ticks, axisLength, ticksLimit) {
        var evenMajorSpacing = getEvenSpacing(majorIndices);
        var spacing = (ticks.length - 1) / ticksLimit;
        var factors, factor, i, ilen;
        if (!evenMajorSpacing) {
          return Math.max(spacing, 1);
        }
        factors = helpers$1.math._factorize(evenMajorSpacing);
        for (i = 0, ilen = factors.length - 1; i < ilen; i++) {
          factor = factors[i];
          if (factor > spacing) {
            return factor;
          }
        }
        return Math.max(spacing, 1);
      }
      function getMajorIndices(ticks) {
        var result = [];
        var i, ilen;
        for (i = 0, ilen = ticks.length; i < ilen; i++) {
          if (ticks[i].major) {
            result.push(i);
          }
        }
        return result;
      }
      function skipMajors(ticks, majorIndices, spacing) {
        var count = 0;
        var next = majorIndices[0];
        var i, tick;
        spacing = Math.ceil(spacing);
        for (i = 0; i < ticks.length; i++) {
          tick = ticks[i];
          if (i === next) {
            tick._index = i;
            count++;
            next = majorIndices[count * spacing];
          } else {
            delete tick.label;
          }
        }
      }
      function skip(ticks, spacing, majorStart, majorEnd) {
        var start = valueOrDefault$a(majorStart, 0);
        var end = Math.min(valueOrDefault$a(majorEnd, ticks.length), ticks.length);
        var count = 0;
        var length, i, tick, next;
        spacing = Math.ceil(spacing);
        if (majorEnd) {
          length = majorEnd - majorStart;
          spacing = length / Math.floor(length / spacing);
        }
        next = start;
        while (next < 0) {
          count++;
          next = Math.round(start + count * spacing);
        }
        for (i = Math.max(start, 0); i < end; i++) {
          tick = ticks[i];
          if (i === next) {
            tick._index = i;
            count++;
            next = Math.round(start + count * spacing);
          } else {
            delete tick.label;
          }
        }
      }
      var Scale = core_element.extend({
        zeroLineIndex: 0,
        /**
         * Get the padding needed for the scale
         * @method getPadding
         * @private
         * @returns {Padding} the necessary padding
         */
        getPadding: function() {
          var me = this;
          return {
            left: me.paddingLeft || 0,
            top: me.paddingTop || 0,
            right: me.paddingRight || 0,
            bottom: me.paddingBottom || 0
          };
        },
        /**
         * Returns the scale tick objects ({label, major})
         * @since 2.7
         */
        getTicks: function() {
          return this._ticks;
        },
        /**
        * @private
        */
        _getLabels: function() {
          var data = this.chart.data;
          return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
        },
        // These methods are ordered by lifecyle. Utilities then follow.
        // Any function defined here is inherited by all scale types.
        // Any function can be extended by the scale type
        /**
         * Provided for backward compatibility, not available anymore
         * @function Chart.Scale.mergeTicksOptions
         * @deprecated since version 2.8.0
         * @todo remove at version 3
         */
        mergeTicksOptions: function() {
        },
        beforeUpdate: function() {
          helpers$1.callback(this.options.beforeUpdate, [this]);
        },
        /**
         * @param {number} maxWidth - the max width in pixels
         * @param {number} maxHeight - the max height in pixels
         * @param {object} margins - the space between the edge of the other scales and edge of the chart
         *   This space comes from two sources:
         *     - padding - space that's required to show the labels at the edges of the scale
         *     - thickness of scales or legends in another orientation
         */
        update: function(maxWidth, maxHeight, margins) {
          var me = this;
          var tickOpts = me.options.ticks;
          var sampleSize = tickOpts.sampleSize;
          var i, ilen, labels, ticks, samplingEnabled;
          me.beforeUpdate();
          me.maxWidth = maxWidth;
          me.maxHeight = maxHeight;
          me.margins = helpers$1.extend({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }, margins);
          me._ticks = null;
          me.ticks = null;
          me._labelSizes = null;
          me._maxLabelLines = 0;
          me.longestLabelWidth = 0;
          me.longestTextCache = me.longestTextCache || {};
          me._gridLineItems = null;
          me._labelItems = null;
          me.beforeSetDimensions();
          me.setDimensions();
          me.afterSetDimensions();
          me.beforeDataLimits();
          me.determineDataLimits();
          me.afterDataLimits();
          me.beforeBuildTicks();
          ticks = me.buildTicks() || [];
          ticks = me.afterBuildTicks(ticks) || ticks;
          if ((!ticks || !ticks.length) && me.ticks) {
            ticks = [];
            for (i = 0, ilen = me.ticks.length; i < ilen; ++i) {
              ticks.push({
                value: me.ticks[i],
                major: false
              });
            }
          }
          me._ticks = ticks;
          samplingEnabled = sampleSize < ticks.length;
          labels = me._convertTicksToLabels(samplingEnabled ? sample(ticks, sampleSize) : ticks);
          me._configure();
          me.beforeCalculateTickRotation();
          me.calculateTickRotation();
          me.afterCalculateTickRotation();
          me.beforeFit();
          me.fit();
          me.afterFit();
          me._ticksToDraw = tickOpts.display && (tickOpts.autoSkip || tickOpts.source === "auto") ? me._autoSkip(ticks) : ticks;
          if (samplingEnabled) {
            labels = me._convertTicksToLabels(me._ticksToDraw);
          }
          me.ticks = labels;
          me.afterUpdate();
          return me.minSize;
        },
        /**
         * @private
         */
        _configure: function() {
          var me = this;
          var reversePixels = me.options.ticks.reverse;
          var startPixel, endPixel;
          if (me.isHorizontal()) {
            startPixel = me.left;
            endPixel = me.right;
          } else {
            startPixel = me.top;
            endPixel = me.bottom;
            reversePixels = !reversePixels;
          }
          me._startPixel = startPixel;
          me._endPixel = endPixel;
          me._reversePixels = reversePixels;
          me._length = endPixel - startPixel;
        },
        afterUpdate: function() {
          helpers$1.callback(this.options.afterUpdate, [this]);
        },
        //
        beforeSetDimensions: function() {
          helpers$1.callback(this.options.beforeSetDimensions, [this]);
        },
        setDimensions: function() {
          var me = this;
          if (me.isHorizontal()) {
            me.width = me.maxWidth;
            me.left = 0;
            me.right = me.width;
          } else {
            me.height = me.maxHeight;
            me.top = 0;
            me.bottom = me.height;
          }
          me.paddingLeft = 0;
          me.paddingTop = 0;
          me.paddingRight = 0;
          me.paddingBottom = 0;
        },
        afterSetDimensions: function() {
          helpers$1.callback(this.options.afterSetDimensions, [this]);
        },
        // Data limits
        beforeDataLimits: function() {
          helpers$1.callback(this.options.beforeDataLimits, [this]);
        },
        determineDataLimits: helpers$1.noop,
        afterDataLimits: function() {
          helpers$1.callback(this.options.afterDataLimits, [this]);
        },
        //
        beforeBuildTicks: function() {
          helpers$1.callback(this.options.beforeBuildTicks, [this]);
        },
        buildTicks: helpers$1.noop,
        afterBuildTicks: function(ticks) {
          var me = this;
          if (isArray(ticks) && ticks.length) {
            return helpers$1.callback(me.options.afterBuildTicks, [me, ticks]);
          }
          me.ticks = helpers$1.callback(me.options.afterBuildTicks, [me, me.ticks]) || me.ticks;
          return ticks;
        },
        beforeTickToLabelConversion: function() {
          helpers$1.callback(this.options.beforeTickToLabelConversion, [this]);
        },
        convertTicksToLabels: function() {
          var me = this;
          var tickOpts = me.options.ticks;
          me.ticks = me.ticks.map(tickOpts.userCallback || tickOpts.callback, this);
        },
        afterTickToLabelConversion: function() {
          helpers$1.callback(this.options.afterTickToLabelConversion, [this]);
        },
        //
        beforeCalculateTickRotation: function() {
          helpers$1.callback(this.options.beforeCalculateTickRotation, [this]);
        },
        calculateTickRotation: function() {
          var me = this;
          var options2 = me.options;
          var tickOpts = options2.ticks;
          var numTicks = me.getTicks().length;
          var minRotation = tickOpts.minRotation || 0;
          var maxRotation = tickOpts.maxRotation;
          var labelRotation = minRotation;
          var labelSizes, maxLabelWidth, maxLabelHeight, maxWidth, tickWidth, maxHeight, maxLabelDiagonal;
          if (!me._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !me.isHorizontal()) {
            me.labelRotation = minRotation;
            return;
          }
          labelSizes = me._getLabelSizes();
          maxLabelWidth = labelSizes.widest.width;
          maxLabelHeight = labelSizes.highest.height - labelSizes.highest.offset;
          maxWidth = Math.min(me.maxWidth, me.chart.width - maxLabelWidth);
          tickWidth = options2.offset ? me.maxWidth / numTicks : maxWidth / (numTicks - 1);
          if (maxLabelWidth + 6 > tickWidth) {
            tickWidth = maxWidth / (numTicks - (options2.offset ? 0.5 : 1));
            maxHeight = me.maxHeight - getTickMarkLength(options2.gridLines) - tickOpts.padding - getScaleLabelHeight(options2.scaleLabel);
            maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
            labelRotation = helpers$1.toDegrees(Math.min(
              Math.asin(Math.min((labelSizes.highest.height + 6) / tickWidth, 1)),
              Math.asin(Math.min(maxHeight / maxLabelDiagonal, 1)) - Math.asin(maxLabelHeight / maxLabelDiagonal)
            ));
            labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
          }
          me.labelRotation = labelRotation;
        },
        afterCalculateTickRotation: function() {
          helpers$1.callback(this.options.afterCalculateTickRotation, [this]);
        },
        //
        beforeFit: function() {
          helpers$1.callback(this.options.beforeFit, [this]);
        },
        fit: function() {
          var me = this;
          var minSize = me.minSize = {
            width: 0,
            height: 0
          };
          var chart = me.chart;
          var opts = me.options;
          var tickOpts = opts.ticks;
          var scaleLabelOpts = opts.scaleLabel;
          var gridLineOpts = opts.gridLines;
          var display = me._isVisible();
          var isBottom = opts.position === "bottom";
          var isHorizontal = me.isHorizontal();
          if (isHorizontal) {
            minSize.width = me.maxWidth;
          } else if (display) {
            minSize.width = getTickMarkLength(gridLineOpts) + getScaleLabelHeight(scaleLabelOpts);
          }
          if (!isHorizontal) {
            minSize.height = me.maxHeight;
          } else if (display) {
            minSize.height = getTickMarkLength(gridLineOpts) + getScaleLabelHeight(scaleLabelOpts);
          }
          if (tickOpts.display && display) {
            var tickFonts = parseTickFontOptions(tickOpts);
            var labelSizes = me._getLabelSizes();
            var firstLabelSize = labelSizes.first;
            var lastLabelSize = labelSizes.last;
            var widestLabelSize = labelSizes.widest;
            var highestLabelSize = labelSizes.highest;
            var lineSpace = tickFonts.minor.lineHeight * 0.4;
            var tickPadding = tickOpts.padding;
            if (isHorizontal) {
              var isRotated = me.labelRotation !== 0;
              var angleRadians = helpers$1.toRadians(me.labelRotation);
              var cosRotation = Math.cos(angleRadians);
              var sinRotation = Math.sin(angleRadians);
              var labelHeight = sinRotation * widestLabelSize.width + cosRotation * (highestLabelSize.height - (isRotated ? highestLabelSize.offset : 0)) + (isRotated ? 0 : lineSpace);
              minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight + tickPadding);
              var offsetLeft = me.getPixelForTick(0) - me.left;
              var offsetRight = me.right - me.getPixelForTick(me.getTicks().length - 1);
              var paddingLeft, paddingRight;
              if (isRotated) {
                paddingLeft = isBottom ? cosRotation * firstLabelSize.width + sinRotation * firstLabelSize.offset : sinRotation * (firstLabelSize.height - firstLabelSize.offset);
                paddingRight = isBottom ? sinRotation * (lastLabelSize.height - lastLabelSize.offset) : cosRotation * lastLabelSize.width + sinRotation * lastLabelSize.offset;
              } else {
                paddingLeft = firstLabelSize.width / 2;
                paddingRight = lastLabelSize.width / 2;
              }
              me.paddingLeft = Math.max((paddingLeft - offsetLeft) * me.width / (me.width - offsetLeft), 0) + 3;
              me.paddingRight = Math.max((paddingRight - offsetRight) * me.width / (me.width - offsetRight), 0) + 3;
            } else {
              var labelWidth = tickOpts.mirror ? 0 : (
                // use lineSpace for consistency with horizontal axis
                // tickPadding is not implemented for horizontal
                widestLabelSize.width + tickPadding + lineSpace
              );
              minSize.width = Math.min(me.maxWidth, minSize.width + labelWidth);
              me.paddingTop = firstLabelSize.height / 2;
              me.paddingBottom = lastLabelSize.height / 2;
            }
          }
          me.handleMargins();
          if (isHorizontal) {
            me.width = me._length = chart.width - me.margins.left - me.margins.right;
            me.height = minSize.height;
          } else {
            me.width = minSize.width;
            me.height = me._length = chart.height - me.margins.top - me.margins.bottom;
          }
        },
        /**
         * Handle margins and padding interactions
         * @private
         */
        handleMargins: function() {
          var me = this;
          if (me.margins) {
            me.margins.left = Math.max(me.paddingLeft, me.margins.left);
            me.margins.top = Math.max(me.paddingTop, me.margins.top);
            me.margins.right = Math.max(me.paddingRight, me.margins.right);
            me.margins.bottom = Math.max(me.paddingBottom, me.margins.bottom);
          }
        },
        afterFit: function() {
          helpers$1.callback(this.options.afterFit, [this]);
        },
        // Shared Methods
        isHorizontal: function() {
          var pos = this.options.position;
          return pos === "top" || pos === "bottom";
        },
        isFullWidth: function() {
          return this.options.fullWidth;
        },
        // Get the correct value. NaN bad inputs, If the value type is object get the x or y based on whether we are horizontal or not
        getRightValue: function(rawValue) {
          if (isNullOrUndef(rawValue)) {
            return NaN;
          }
          if ((typeof rawValue === "number" || rawValue instanceof Number) && !isFinite(rawValue)) {
            return NaN;
          }
          if (rawValue) {
            if (this.isHorizontal()) {
              if (rawValue.x !== void 0) {
                return this.getRightValue(rawValue.x);
              }
            } else if (rawValue.y !== void 0) {
              return this.getRightValue(rawValue.y);
            }
          }
          return rawValue;
        },
        _convertTicksToLabels: function(ticks) {
          var me = this;
          var labels, i, ilen;
          me.ticks = ticks.map(function(tick) {
            return tick.value;
          });
          me.beforeTickToLabelConversion();
          labels = me.convertTicksToLabels(ticks) || me.ticks;
          me.afterTickToLabelConversion();
          for (i = 0, ilen = ticks.length; i < ilen; ++i) {
            ticks[i].label = labels[i];
          }
          return labels;
        },
        /**
         * @private
         */
        _getLabelSizes: function() {
          var me = this;
          var labelSizes = me._labelSizes;
          if (!labelSizes) {
            me._labelSizes = labelSizes = computeLabelSizes(me.ctx, parseTickFontOptions(me.options.ticks), me.getTicks(), me.longestTextCache);
            me.longestLabelWidth = labelSizes.widest.width;
          }
          return labelSizes;
        },
        /**
         * @private
         */
        _parseValue: function(value) {
          var start, end, min, max;
          if (isArray(value)) {
            start = +this.getRightValue(value[0]);
            end = +this.getRightValue(value[1]);
            min = Math.min(start, end);
            max = Math.max(start, end);
          } else {
            value = +this.getRightValue(value);
            start = void 0;
            end = value;
            min = value;
            max = value;
          }
          return {
            min,
            max,
            start,
            end
          };
        },
        /**
        * @private
        */
        _getScaleLabel: function(rawValue) {
          var v = this._parseValue(rawValue);
          if (v.start !== void 0) {
            return "[" + v.start + ", " + v.end + "]";
          }
          return +this.getRightValue(rawValue);
        },
        /**
         * Used to get the value to display in the tooltip for the data at the given index
         * @param index
         * @param datasetIndex
         */
        getLabelForIndex: helpers$1.noop,
        /**
         * Returns the location of the given data point. Value can either be an index or a numerical value
         * The coordinate (0, 0) is at the upper-left corner of the canvas
         * @param value
         * @param index
         * @param datasetIndex
         */
        getPixelForValue: helpers$1.noop,
        /**
         * Used to get the data value from a given pixel. This is the inverse of getPixelForValue
         * The coordinate (0, 0) is at the upper-left corner of the canvas
         * @param pixel
         */
        getValueForPixel: helpers$1.noop,
        /**
         * Returns the location of the tick at the given index
         * The coordinate (0, 0) is at the upper-left corner of the canvas
         */
        getPixelForTick: function(index) {
          var me = this;
          var offset = me.options.offset;
          var numTicks = me._ticks.length;
          var tickWidth = 1 / Math.max(numTicks - (offset ? 0 : 1), 1);
          return index < 0 || index > numTicks - 1 ? null : me.getPixelForDecimal(index * tickWidth + (offset ? tickWidth / 2 : 0));
        },
        /**
         * Utility for getting the pixel location of a percentage of scale
         * The coordinate (0, 0) is at the upper-left corner of the canvas
         */
        getPixelForDecimal: function(decimal) {
          var me = this;
          if (me._reversePixels) {
            decimal = 1 - decimal;
          }
          return me._startPixel + decimal * me._length;
        },
        getDecimalForPixel: function(pixel) {
          var decimal = (pixel - this._startPixel) / this._length;
          return this._reversePixels ? 1 - decimal : decimal;
        },
        /**
         * Returns the pixel for the minimum chart value
         * The coordinate (0, 0) is at the upper-left corner of the canvas
         */
        getBasePixel: function() {
          return this.getPixelForValue(this.getBaseValue());
        },
        getBaseValue: function() {
          var me = this;
          var min = me.min;
          var max = me.max;
          return me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
        },
        /**
         * Returns a subset of ticks to be plotted to avoid overlapping labels.
         * @private
         */
        _autoSkip: function(ticks) {
          var me = this;
          var tickOpts = me.options.ticks;
          var axisLength = me._length;
          var ticksLimit = tickOpts.maxTicksLimit || axisLength / me._tickSize() + 1;
          var majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
          var numMajorIndices = majorIndices.length;
          var first = majorIndices[0];
          var last = majorIndices[numMajorIndices - 1];
          var i, ilen, spacing, avgMajorSpacing;
          if (numMajorIndices > ticksLimit) {
            skipMajors(ticks, majorIndices, numMajorIndices / ticksLimit);
            return nonSkipped(ticks);
          }
          spacing = calculateSpacing(majorIndices, ticks, axisLength, ticksLimit);
          if (numMajorIndices > 0) {
            for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) {
              skip(ticks, spacing, majorIndices[i], majorIndices[i + 1]);
            }
            avgMajorSpacing = numMajorIndices > 1 ? (last - first) / (numMajorIndices - 1) : null;
            skip(ticks, spacing, helpers$1.isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
            skip(ticks, spacing, last, helpers$1.isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
            return nonSkipped(ticks);
          }
          skip(ticks, spacing);
          return nonSkipped(ticks);
        },
        /**
         * @private
         */
        _tickSize: function() {
          var me = this;
          var optionTicks = me.options.ticks;
          var rot = helpers$1.toRadians(me.labelRotation);
          var cos = Math.abs(Math.cos(rot));
          var sin = Math.abs(Math.sin(rot));
          var labelSizes = me._getLabelSizes();
          var padding = optionTicks.autoSkipPadding || 0;
          var w = labelSizes ? labelSizes.widest.width + padding : 0;
          var h = labelSizes ? labelSizes.highest.height + padding : 0;
          return me.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
        },
        /**
         * @private
         */
        _isVisible: function() {
          var me = this;
          var chart = me.chart;
          var display = me.options.display;
          var i, ilen, meta;
          if (display !== "auto") {
            return !!display;
          }
          for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
            if (chart.isDatasetVisible(i)) {
              meta = chart.getDatasetMeta(i);
              if (meta.xAxisID === me.id || meta.yAxisID === me.id) {
                return true;
              }
            }
          }
          return false;
        },
        /**
         * @private
         */
        _computeGridLineItems: function(chartArea) {
          var me = this;
          var chart = me.chart;
          var options2 = me.options;
          var gridLines = options2.gridLines;
          var position = options2.position;
          var offsetGridLines = gridLines.offsetGridLines;
          var isHorizontal = me.isHorizontal();
          var ticks = me._ticksToDraw;
          var ticksLength = ticks.length + (offsetGridLines ? 1 : 0);
          var tl = getTickMarkLength(gridLines);
          var items = [];
          var axisWidth = gridLines.drawBorder ? valueAtIndexOrDefault(gridLines.lineWidth, 0, 0) : 0;
          var axisHalfWidth = axisWidth / 2;
          var alignPixel = helpers$1._alignPixel;
          var alignBorderValue = function(pixel) {
            return alignPixel(chart, pixel, axisWidth);
          };
          var borderValue, i, tick, lineValue, alignedLineValue;
          var tx1, ty1, tx2, ty2, x1, y1, x2, y2, lineWidth, lineColor, borderDash, borderDashOffset;
          if (position === "top") {
            borderValue = alignBorderValue(me.bottom);
            ty1 = me.bottom - tl;
            ty2 = borderValue - axisHalfWidth;
            y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
            y2 = chartArea.bottom;
          } else if (position === "bottom") {
            borderValue = alignBorderValue(me.top);
            y1 = chartArea.top;
            y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
            ty1 = borderValue + axisHalfWidth;
            ty2 = me.top + tl;
          } else if (position === "left") {
            borderValue = alignBorderValue(me.right);
            tx1 = me.right - tl;
            tx2 = borderValue - axisHalfWidth;
            x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
            x2 = chartArea.right;
          } else {
            borderValue = alignBorderValue(me.left);
            x1 = chartArea.left;
            x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
            tx1 = borderValue + axisHalfWidth;
            tx2 = me.left + tl;
          }
          for (i = 0; i < ticksLength; ++i) {
            tick = ticks[i] || {};
            if (isNullOrUndef(tick.label) && i < ticks.length) {
              continue;
            }
            if (i === me.zeroLineIndex && options2.offset === offsetGridLines) {
              lineWidth = gridLines.zeroLineWidth;
              lineColor = gridLines.zeroLineColor;
              borderDash = gridLines.zeroLineBorderDash || [];
              borderDashOffset = gridLines.zeroLineBorderDashOffset || 0;
            } else {
              lineWidth = valueAtIndexOrDefault(gridLines.lineWidth, i, 1);
              lineColor = valueAtIndexOrDefault(gridLines.color, i, "rgba(0,0,0,0.1)");
              borderDash = gridLines.borderDash || [];
              borderDashOffset = gridLines.borderDashOffset || 0;
            }
            lineValue = getPixelForGridLine(me, tick._index || i, offsetGridLines);
            if (lineValue === void 0) {
              continue;
            }
            alignedLineValue = alignPixel(chart, lineValue, lineWidth);
            if (isHorizontal) {
              tx1 = tx2 = x1 = x2 = alignedLineValue;
            } else {
              ty1 = ty2 = y1 = y2 = alignedLineValue;
            }
            items.push({
              tx1,
              ty1,
              tx2,
              ty2,
              x1,
              y1,
              x2,
              y2,
              width: lineWidth,
              color: lineColor,
              borderDash,
              borderDashOffset
            });
          }
          items.ticksLength = ticksLength;
          items.borderValue = borderValue;
          return items;
        },
        /**
         * @private
         */
        _computeLabelItems: function() {
          var me = this;
          var options2 = me.options;
          var optionTicks = options2.ticks;
          var position = options2.position;
          var isMirrored = optionTicks.mirror;
          var isHorizontal = me.isHorizontal();
          var ticks = me._ticksToDraw;
          var fonts = parseTickFontOptions(optionTicks);
          var tickPadding = optionTicks.padding;
          var tl = getTickMarkLength(options2.gridLines);
          var rotation = -helpers$1.toRadians(me.labelRotation);
          var items = [];
          var i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
          if (position === "top") {
            y = me.bottom - tl - tickPadding;
            textAlign = !rotation ? "center" : "left";
          } else if (position === "bottom") {
            y = me.top + tl + tickPadding;
            textAlign = !rotation ? "center" : "right";
          } else if (position === "left") {
            x = me.right - (isMirrored ? 0 : tl) - tickPadding;
            textAlign = isMirrored ? "left" : "right";
          } else {
            x = me.left + (isMirrored ? 0 : tl) + tickPadding;
            textAlign = isMirrored ? "right" : "left";
          }
          for (i = 0, ilen = ticks.length; i < ilen; ++i) {
            tick = ticks[i];
            label = tick.label;
            if (isNullOrUndef(label)) {
              continue;
            }
            pixel = me.getPixelForTick(tick._index || i) + optionTicks.labelOffset;
            font = tick.major ? fonts.major : fonts.minor;
            lineHeight = font.lineHeight;
            lineCount = isArray(label) ? label.length : 1;
            if (isHorizontal) {
              x = pixel;
              textOffset = position === "top" ? ((!rotation ? 0.5 : 1) - lineCount) * lineHeight : (!rotation ? 0.5 : 0) * lineHeight;
            } else {
              y = pixel;
              textOffset = (1 - lineCount) * lineHeight / 2;
            }
            items.push({
              x,
              y,
              rotation,
              label,
              font,
              textOffset,
              textAlign
            });
          }
          return items;
        },
        /**
         * @private
         */
        _drawGrid: function(chartArea) {
          var me = this;
          var gridLines = me.options.gridLines;
          if (!gridLines.display) {
            return;
          }
          var ctx = me.ctx;
          var chart = me.chart;
          var alignPixel = helpers$1._alignPixel;
          var axisWidth = gridLines.drawBorder ? valueAtIndexOrDefault(gridLines.lineWidth, 0, 0) : 0;
          var items = me._gridLineItems || (me._gridLineItems = me._computeGridLineItems(chartArea));
          var width, color, i, ilen, item;
          for (i = 0, ilen = items.length; i < ilen; ++i) {
            item = items[i];
            width = item.width;
            color = item.color;
            if (width && color) {
              ctx.save();
              ctx.lineWidth = width;
              ctx.strokeStyle = color;
              if (ctx.setLineDash) {
                ctx.setLineDash(item.borderDash);
                ctx.lineDashOffset = item.borderDashOffset;
              }
              ctx.beginPath();
              if (gridLines.drawTicks) {
                ctx.moveTo(item.tx1, item.ty1);
                ctx.lineTo(item.tx2, item.ty2);
              }
              if (gridLines.drawOnChartArea) {
                ctx.moveTo(item.x1, item.y1);
                ctx.lineTo(item.x2, item.y2);
              }
              ctx.stroke();
              ctx.restore();
            }
          }
          if (axisWidth) {
            var firstLineWidth = axisWidth;
            var lastLineWidth = valueAtIndexOrDefault(gridLines.lineWidth, items.ticksLength - 1, 1);
            var borderValue = items.borderValue;
            var x1, x2, y1, y2;
            if (me.isHorizontal()) {
              x1 = alignPixel(chart, me.left, firstLineWidth) - firstLineWidth / 2;
              x2 = alignPixel(chart, me.right, lastLineWidth) + lastLineWidth / 2;
              y1 = y2 = borderValue;
            } else {
              y1 = alignPixel(chart, me.top, firstLineWidth) - firstLineWidth / 2;
              y2 = alignPixel(chart, me.bottom, lastLineWidth) + lastLineWidth / 2;
              x1 = x2 = borderValue;
            }
            ctx.lineWidth = axisWidth;
            ctx.strokeStyle = valueAtIndexOrDefault(gridLines.color, 0);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        },
        /**
         * @private
         */
        _drawLabels: function() {
          var me = this;
          var optionTicks = me.options.ticks;
          if (!optionTicks.display) {
            return;
          }
          var ctx = me.ctx;
          var items = me._labelItems || (me._labelItems = me._computeLabelItems());
          var i, j, ilen, jlen, item, tickFont, label, y;
          for (i = 0, ilen = items.length; i < ilen; ++i) {
            item = items[i];
            tickFont = item.font;
            ctx.save();
            ctx.translate(item.x, item.y);
            ctx.rotate(item.rotation);
            ctx.font = tickFont.string;
            ctx.fillStyle = tickFont.color;
            ctx.textBaseline = "middle";
            ctx.textAlign = item.textAlign;
            label = item.label;
            y = item.textOffset;
            if (isArray(label)) {
              for (j = 0, jlen = label.length; j < jlen; ++j) {
                ctx.fillText("" + label[j], 0, y);
                y += tickFont.lineHeight;
              }
            } else {
              ctx.fillText(label, 0, y);
            }
            ctx.restore();
          }
        },
        /**
         * @private
         */
        _drawTitle: function() {
          var me = this;
          var ctx = me.ctx;
          var options2 = me.options;
          var scaleLabel = options2.scaleLabel;
          if (!scaleLabel.display) {
            return;
          }
          var scaleLabelFontColor = valueOrDefault$a(scaleLabel.fontColor, core_defaults.global.defaultFontColor);
          var scaleLabelFont = helpers$1.options._parseFont(scaleLabel);
          var scaleLabelPadding = helpers$1.options.toPadding(scaleLabel.padding);
          var halfLineHeight = scaleLabelFont.lineHeight / 2;
          var position = options2.position;
          var rotation = 0;
          var scaleLabelX, scaleLabelY;
          if (me.isHorizontal()) {
            scaleLabelX = me.left + me.width / 2;
            scaleLabelY = position === "bottom" ? me.bottom - halfLineHeight - scaleLabelPadding.bottom : me.top + halfLineHeight + scaleLabelPadding.top;
          } else {
            var isLeft = position === "left";
            scaleLabelX = isLeft ? me.left + halfLineHeight + scaleLabelPadding.top : me.right - halfLineHeight - scaleLabelPadding.top;
            scaleLabelY = me.top + me.height / 2;
            rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
          }
          ctx.save();
          ctx.translate(scaleLabelX, scaleLabelY);
          ctx.rotate(rotation);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = scaleLabelFontColor;
          ctx.font = scaleLabelFont.string;
          ctx.fillText(scaleLabel.labelString, 0, 0);
          ctx.restore();
        },
        draw: function(chartArea) {
          var me = this;
          if (!me._isVisible()) {
            return;
          }
          me._drawGrid(chartArea);
          me._drawTitle();
          me._drawLabels();
        },
        /**
         * @private
         */
        _layers: function() {
          var me = this;
          var opts = me.options;
          var tz = opts.ticks && opts.ticks.z || 0;
          var gz = opts.gridLines && opts.gridLines.z || 0;
          if (!me._isVisible() || tz === gz || me.draw !== me._draw) {
            return [{
              z: tz,
              draw: function() {
                me.draw.apply(me, arguments);
              }
            }];
          }
          return [{
            z: gz,
            draw: function() {
              me._drawGrid.apply(me, arguments);
              me._drawTitle.apply(me, arguments);
            }
          }, {
            z: tz,
            draw: function() {
              me._drawLabels.apply(me, arguments);
            }
          }];
        },
        /**
         * @private
         */
        _getMatchingVisibleMetas: function(type) {
          var me = this;
          var isHorizontal = me.isHorizontal();
          return me.chart._getSortedVisibleDatasetMetas().filter(function(meta) {
            return (!type || meta.type === type) && (isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id);
          });
        }
      });
      Scale.prototype._draw = Scale.prototype.draw;
      var core_scale = Scale;
      var isNullOrUndef$1 = helpers$1.isNullOrUndef;
      var defaultConfig = {
        position: "bottom"
      };
      var scale_category = core_scale.extend({
        determineDataLimits: function() {
          var me = this;
          var labels = me._getLabels();
          var ticksOpts = me.options.ticks;
          var min = ticksOpts.min;
          var max = ticksOpts.max;
          var minIndex = 0;
          var maxIndex = labels.length - 1;
          var findIndex;
          if (min !== void 0) {
            findIndex = labels.indexOf(min);
            if (findIndex >= 0) {
              minIndex = findIndex;
            }
          }
          if (max !== void 0) {
            findIndex = labels.indexOf(max);
            if (findIndex >= 0) {
              maxIndex = findIndex;
            }
          }
          me.minIndex = minIndex;
          me.maxIndex = maxIndex;
          me.min = labels[minIndex];
          me.max = labels[maxIndex];
        },
        buildTicks: function() {
          var me = this;
          var labels = me._getLabels();
          var minIndex = me.minIndex;
          var maxIndex = me.maxIndex;
          me.ticks = minIndex === 0 && maxIndex === labels.length - 1 ? labels : labels.slice(minIndex, maxIndex + 1);
        },
        getLabelForIndex: function(index, datasetIndex) {
          var me = this;
          var chart = me.chart;
          if (chart.getDatasetMeta(datasetIndex).controller._getValueScaleId() === me.id) {
            return me.getRightValue(chart.data.datasets[datasetIndex].data[index]);
          }
          return me._getLabels()[index];
        },
        _configure: function() {
          var me = this;
          var offset = me.options.offset;
          var ticks = me.ticks;
          core_scale.prototype._configure.call(me);
          if (!me.isHorizontal()) {
            me._reversePixels = !me._reversePixels;
          }
          if (!ticks) {
            return;
          }
          me._startValue = me.minIndex - (offset ? 0.5 : 0);
          me._valueRange = Math.max(ticks.length - (offset ? 0 : 1), 1);
        },
        // Used to get data value locations.  Value can either be an index or a numerical value
        getPixelForValue: function(value, index, datasetIndex) {
          var me = this;
          var valueCategory, labels, idx;
          if (!isNullOrUndef$1(index) && !isNullOrUndef$1(datasetIndex)) {
            value = me.chart.data.datasets[datasetIndex].data[index];
          }
          if (!isNullOrUndef$1(value)) {
            valueCategory = me.isHorizontal() ? value.x : value.y;
          }
          if (valueCategory !== void 0 || value !== void 0 && isNaN(index)) {
            labels = me._getLabels();
            value = helpers$1.valueOrDefault(valueCategory, value);
            idx = labels.indexOf(value);
            index = idx !== -1 ? idx : index;
            if (isNaN(index)) {
              index = value;
            }
          }
          return me.getPixelForDecimal((index - me._startValue) / me._valueRange);
        },
        getPixelForTick: function(index) {
          var ticks = this.ticks;
          return index < 0 || index > ticks.length - 1 ? null : this.getPixelForValue(ticks[index], index + this.minIndex);
        },
        getValueForPixel: function(pixel) {
          var me = this;
          var value = Math.round(me._startValue + me.getDecimalForPixel(pixel) * me._valueRange);
          return Math.min(Math.max(value, 0), me.ticks.length - 1);
        },
        getBasePixel: function() {
          return this.bottom;
        }
      });
      var _defaults = defaultConfig;
      scale_category._defaults = _defaults;
      var noop = helpers$1.noop;
      var isNullOrUndef$2 = helpers$1.isNullOrUndef;
      function generateTicks(generationOptions, dataRange) {
        var ticks = [];
        var MIN_SPACING = 1e-14;
        var stepSize = generationOptions.stepSize;
        var unit = stepSize || 1;
        var maxNumSpaces = generationOptions.maxTicks - 1;
        var min = generationOptions.min;
        var max = generationOptions.max;
        var precision = generationOptions.precision;
        var rmin = dataRange.min;
        var rmax = dataRange.max;
        var spacing = helpers$1.niceNum((rmax - rmin) / maxNumSpaces / unit) * unit;
        var factor, niceMin, niceMax, numSpaces;
        if (spacing < MIN_SPACING && isNullOrUndef$2(min) && isNullOrUndef$2(max)) {
          return [rmin, rmax];
        }
        numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
        if (numSpaces > maxNumSpaces) {
          spacing = helpers$1.niceNum(numSpaces * spacing / maxNumSpaces / unit) * unit;
        }
        if (stepSize || isNullOrUndef$2(precision)) {
          factor = Math.pow(10, helpers$1._decimalPlaces(spacing));
        } else {
          factor = Math.pow(10, precision);
          spacing = Math.ceil(spacing * factor) / factor;
        }
        niceMin = Math.floor(rmin / spacing) * spacing;
        niceMax = Math.ceil(rmax / spacing) * spacing;
        if (stepSize) {
          if (!isNullOrUndef$2(min) && helpers$1.almostWhole(min / spacing, spacing / 1e3)) {
            niceMin = min;
          }
          if (!isNullOrUndef$2(max) && helpers$1.almostWhole(max / spacing, spacing / 1e3)) {
            niceMax = max;
          }
        }
        numSpaces = (niceMax - niceMin) / spacing;
        if (helpers$1.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) {
          numSpaces = Math.round(numSpaces);
        } else {
          numSpaces = Math.ceil(numSpaces);
        }
        niceMin = Math.round(niceMin * factor) / factor;
        niceMax = Math.round(niceMax * factor) / factor;
        ticks.push(isNullOrUndef$2(min) ? niceMin : min);
        for (var j = 1; j < numSpaces; ++j) {
          ticks.push(Math.round((niceMin + j * spacing) * factor) / factor);
        }
        ticks.push(isNullOrUndef$2(max) ? niceMax : max);
        return ticks;
      }
      var scale_linearbase = core_scale.extend({
        getRightValue: function(value) {
          if (typeof value === "string") {
            return +value;
          }
          return core_scale.prototype.getRightValue.call(this, value);
        },
        handleTickRangeOptions: function() {
          var me = this;
          var opts = me.options;
          var tickOpts = opts.ticks;
          if (tickOpts.beginAtZero) {
            var minSign = helpers$1.sign(me.min);
            var maxSign = helpers$1.sign(me.max);
            if (minSign < 0 && maxSign < 0) {
              me.max = 0;
            } else if (minSign > 0 && maxSign > 0) {
              me.min = 0;
            }
          }
          var setMin = tickOpts.min !== void 0 || tickOpts.suggestedMin !== void 0;
          var setMax = tickOpts.max !== void 0 || tickOpts.suggestedMax !== void 0;
          if (tickOpts.min !== void 0) {
            me.min = tickOpts.min;
          } else if (tickOpts.suggestedMin !== void 0) {
            if (me.min === null) {
              me.min = tickOpts.suggestedMin;
            } else {
              me.min = Math.min(me.min, tickOpts.suggestedMin);
            }
          }
          if (tickOpts.max !== void 0) {
            me.max = tickOpts.max;
          } else if (tickOpts.suggestedMax !== void 0) {
            if (me.max === null) {
              me.max = tickOpts.suggestedMax;
            } else {
              me.max = Math.max(me.max, tickOpts.suggestedMax);
            }
          }
          if (setMin !== setMax) {
            if (me.min >= me.max) {
              if (setMin) {
                me.max = me.min + 1;
              } else {
                me.min = me.max - 1;
              }
            }
          }
          if (me.min === me.max) {
            me.max++;
            if (!tickOpts.beginAtZero) {
              me.min--;
            }
          }
        },
        getTickLimit: function() {
          var me = this;
          var tickOpts = me.options.ticks;
          var stepSize = tickOpts.stepSize;
          var maxTicksLimit = tickOpts.maxTicksLimit;
          var maxTicks;
          if (stepSize) {
            maxTicks = Math.ceil(me.max / stepSize) - Math.floor(me.min / stepSize) + 1;
          } else {
            maxTicks = me._computeTickLimit();
            maxTicksLimit = maxTicksLimit || 11;
          }
          if (maxTicksLimit) {
            maxTicks = Math.min(maxTicksLimit, maxTicks);
          }
          return maxTicks;
        },
        _computeTickLimit: function() {
          return Number.POSITIVE_INFINITY;
        },
        handleDirectionalChanges: noop,
        buildTicks: function() {
          var me = this;
          var opts = me.options;
          var tickOpts = opts.ticks;
          var maxTicks = me.getTickLimit();
          maxTicks = Math.max(2, maxTicks);
          var numericGeneratorOptions = {
            maxTicks,
            min: tickOpts.min,
            max: tickOpts.max,
            precision: tickOpts.precision,
            stepSize: helpers$1.valueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize)
          };
          var ticks = me.ticks = generateTicks(numericGeneratorOptions, me);
          me.handleDirectionalChanges();
          me.max = helpers$1.max(ticks);
          me.min = helpers$1.min(ticks);
          if (tickOpts.reverse) {
            ticks.reverse();
            me.start = me.max;
            me.end = me.min;
          } else {
            me.start = me.min;
            me.end = me.max;
          }
        },
        convertTicksToLabels: function() {
          var me = this;
          me.ticksAsNumbers = me.ticks.slice();
          me.zeroLineIndex = me.ticks.indexOf(0);
          core_scale.prototype.convertTicksToLabels.call(me);
        },
        _configure: function() {
          var me = this;
          var ticks = me.getTicks();
          var start = me.min;
          var end = me.max;
          var offset;
          core_scale.prototype._configure.call(me);
          if (me.options.offset && ticks.length) {
            offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
            start -= offset;
            end += offset;
          }
          me._startValue = start;
          me._endValue = end;
          me._valueRange = end - start;
        }
      });
      var defaultConfig$1 = {
        position: "left",
        ticks: {
          callback: core_ticks.formatters.linear
        }
      };
      var DEFAULT_MIN = 0;
      var DEFAULT_MAX = 1;
      function getOrCreateStack(stacks, stacked, meta) {
        var key = [
          meta.type,
          // we have a separate stack for stack=undefined datasets when the opts.stacked is undefined
          stacked === void 0 && meta.stack === void 0 ? meta.index : "",
          meta.stack
        ].join(".");
        if (stacks[key] === void 0) {
          stacks[key] = {
            pos: [],
            neg: []
          };
        }
        return stacks[key];
      }
      function stackData(scale2, stacks, meta, data) {
        var opts = scale2.options;
        var stacked = opts.stacked;
        var stack = getOrCreateStack(stacks, stacked, meta);
        var pos = stack.pos;
        var neg = stack.neg;
        var ilen = data.length;
        var i, value;
        for (i = 0; i < ilen; ++i) {
          value = scale2._parseValue(data[i]);
          if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden) {
            continue;
          }
          pos[i] = pos[i] || 0;
          neg[i] = neg[i] || 0;
          if (opts.relativePoints) {
            pos[i] = 100;
          } else if (value.min < 0 || value.max < 0) {
            neg[i] += value.min;
          } else {
            pos[i] += value.max;
          }
        }
      }
      function updateMinMax(scale2, meta, data) {
        var ilen = data.length;
        var i, value;
        for (i = 0; i < ilen; ++i) {
          value = scale2._parseValue(data[i]);
          if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden) {
            continue;
          }
          scale2.min = Math.min(scale2.min, value.min);
          scale2.max = Math.max(scale2.max, value.max);
        }
      }
      var scale_linear = scale_linearbase.extend({
        determineDataLimits: function() {
          var me = this;
          var opts = me.options;
          var chart = me.chart;
          var datasets = chart.data.datasets;
          var metasets = me._getMatchingVisibleMetas();
          var hasStacks = opts.stacked;
          var stacks = {};
          var ilen = metasets.length;
          var i, meta, data, values;
          me.min = Number.POSITIVE_INFINITY;
          me.max = Number.NEGATIVE_INFINITY;
          if (hasStacks === void 0) {
            for (i = 0; !hasStacks && i < ilen; ++i) {
              meta = metasets[i];
              hasStacks = meta.stack !== void 0;
            }
          }
          for (i = 0; i < ilen; ++i) {
            meta = metasets[i];
            data = datasets[meta.index].data;
            if (hasStacks) {
              stackData(me, stacks, meta, data);
            } else {
              updateMinMax(me, meta, data);
            }
          }
          helpers$1.each(stacks, function(stackValues) {
            values = stackValues.pos.concat(stackValues.neg);
            me.min = Math.min(me.min, helpers$1.min(values));
            me.max = Math.max(me.max, helpers$1.max(values));
          });
          me.min = helpers$1.isFinite(me.min) && !isNaN(me.min) ? me.min : DEFAULT_MIN;
          me.max = helpers$1.isFinite(me.max) && !isNaN(me.max) ? me.max : DEFAULT_MAX;
          me.handleTickRangeOptions();
        },
        // Returns the maximum number of ticks based on the scale dimension
        _computeTickLimit: function() {
          var me = this;
          var tickFont;
          if (me.isHorizontal()) {
            return Math.ceil(me.width / 40);
          }
          tickFont = helpers$1.options._parseFont(me.options.ticks);
          return Math.ceil(me.height / tickFont.lineHeight);
        },
        // Called after the ticks are built. We need
        handleDirectionalChanges: function() {
          if (!this.isHorizontal()) {
            this.ticks.reverse();
          }
        },
        getLabelForIndex: function(index, datasetIndex) {
          return this._getScaleLabel(this.chart.data.datasets[datasetIndex].data[index]);
        },
        // Utils
        getPixelForValue: function(value) {
          var me = this;
          return me.getPixelForDecimal((+me.getRightValue(value) - me._startValue) / me._valueRange);
        },
        getValueForPixel: function(pixel) {
          return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
        },
        getPixelForTick: function(index) {
          var ticks = this.ticksAsNumbers;
          if (index < 0 || index > ticks.length - 1) {
            return null;
          }
          return this.getPixelForValue(ticks[index]);
        }
      });
      var _defaults$1 = defaultConfig$1;
      scale_linear._defaults = _defaults$1;
      var valueOrDefault$b = helpers$1.valueOrDefault;
      var log10 = helpers$1.math.log10;
      function generateTicks$1(generationOptions, dataRange) {
        var ticks = [];
        var tickVal = valueOrDefault$b(generationOptions.min, Math.pow(10, Math.floor(log10(dataRange.min))));
        var endExp = Math.floor(log10(dataRange.max));
        var endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
        var exp, significand;
        if (tickVal === 0) {
          exp = Math.floor(log10(dataRange.minNotZero));
          significand = Math.floor(dataRange.minNotZero / Math.pow(10, exp));
          ticks.push(tickVal);
          tickVal = significand * Math.pow(10, exp);
        } else {
          exp = Math.floor(log10(tickVal));
          significand = Math.floor(tickVal / Math.pow(10, exp));
        }
        var precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
        do {
          ticks.push(tickVal);
          ++significand;
          if (significand === 10) {
            significand = 1;
            ++exp;
            precision = exp >= 0 ? 1 : precision;
          }
          tickVal = Math.round(significand * Math.pow(10, exp) * precision) / precision;
        } while (exp < endExp || exp === endExp && significand < endSignificand);
        var lastTick = valueOrDefault$b(generationOptions.max, tickVal);
        ticks.push(lastTick);
        return ticks;
      }
      var defaultConfig$2 = {
        position: "left",
        // label settings
        ticks: {
          callback: core_ticks.formatters.logarithmic
        }
      };
      function nonNegativeOrDefault(value, defaultValue) {
        return helpers$1.isFinite(value) && value >= 0 ? value : defaultValue;
      }
      var scale_logarithmic = core_scale.extend({
        determineDataLimits: function() {
          var me = this;
          var opts = me.options;
          var chart = me.chart;
          var datasets = chart.data.datasets;
          var isHorizontal = me.isHorizontal();
          function IDMatches(meta2) {
            return isHorizontal ? meta2.xAxisID === me.id : meta2.yAxisID === me.id;
          }
          var datasetIndex, meta, value, data, i, ilen;
          me.min = Number.POSITIVE_INFINITY;
          me.max = Number.NEGATIVE_INFINITY;
          me.minNotZero = Number.POSITIVE_INFINITY;
          var hasStacks = opts.stacked;
          if (hasStacks === void 0) {
            for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
              meta = chart.getDatasetMeta(datasetIndex);
              if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta) && meta.stack !== void 0) {
                hasStacks = true;
                break;
              }
            }
          }
          if (opts.stacked || hasStacks) {
            var valuesPerStack = {};
            for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
              meta = chart.getDatasetMeta(datasetIndex);
              var key = [
                meta.type,
                // we have a separate stack for stack=undefined datasets when the opts.stacked is undefined
                opts.stacked === void 0 && meta.stack === void 0 ? datasetIndex : "",
                meta.stack
              ].join(".");
              if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                if (valuesPerStack[key] === void 0) {
                  valuesPerStack[key] = [];
                }
                data = datasets[datasetIndex].data;
                for (i = 0, ilen = data.length; i < ilen; i++) {
                  var values = valuesPerStack[key];
                  value = me._parseValue(data[i]);
                  if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden || value.min < 0 || value.max < 0) {
                    continue;
                  }
                  values[i] = values[i] || 0;
                  values[i] += value.max;
                }
              }
            }
            helpers$1.each(valuesPerStack, function(valuesForType) {
              if (valuesForType.length > 0) {
                var minVal = helpers$1.min(valuesForType);
                var maxVal = helpers$1.max(valuesForType);
                me.min = Math.min(me.min, minVal);
                me.max = Math.max(me.max, maxVal);
              }
            });
          } else {
            for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
              meta = chart.getDatasetMeta(datasetIndex);
              if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
                data = datasets[datasetIndex].data;
                for (i = 0, ilen = data.length; i < ilen; i++) {
                  value = me._parseValue(data[i]);
                  if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden || value.min < 0 || value.max < 0) {
                    continue;
                  }
                  me.min = Math.min(value.min, me.min);
                  me.max = Math.max(value.max, me.max);
                  if (value.min !== 0) {
                    me.minNotZero = Math.min(value.min, me.minNotZero);
                  }
                }
              }
            }
          }
          me.min = helpers$1.isFinite(me.min) ? me.min : null;
          me.max = helpers$1.isFinite(me.max) ? me.max : null;
          me.minNotZero = helpers$1.isFinite(me.minNotZero) ? me.minNotZero : null;
          this.handleTickRangeOptions();
        },
        handleTickRangeOptions: function() {
          var me = this;
          var tickOpts = me.options.ticks;
          var DEFAULT_MIN2 = 1;
          var DEFAULT_MAX2 = 10;
          me.min = nonNegativeOrDefault(tickOpts.min, me.min);
          me.max = nonNegativeOrDefault(tickOpts.max, me.max);
          if (me.min === me.max) {
            if (me.min !== 0 && me.min !== null) {
              me.min = Math.pow(10, Math.floor(log10(me.min)) - 1);
              me.max = Math.pow(10, Math.floor(log10(me.max)) + 1);
            } else {
              me.min = DEFAULT_MIN2;
              me.max = DEFAULT_MAX2;
            }
          }
          if (me.min === null) {
            me.min = Math.pow(10, Math.floor(log10(me.max)) - 1);
          }
          if (me.max === null) {
            me.max = me.min !== 0 ? Math.pow(10, Math.floor(log10(me.min)) + 1) : DEFAULT_MAX2;
          }
          if (me.minNotZero === null) {
            if (me.min > 0) {
              me.minNotZero = me.min;
            } else if (me.max < 1) {
              me.minNotZero = Math.pow(10, Math.floor(log10(me.max)));
            } else {
              me.minNotZero = DEFAULT_MIN2;
            }
          }
        },
        buildTicks: function() {
          var me = this;
          var tickOpts = me.options.ticks;
          var reverse = !me.isHorizontal();
          var generationOptions = {
            min: nonNegativeOrDefault(tickOpts.min),
            max: nonNegativeOrDefault(tickOpts.max)
          };
          var ticks = me.ticks = generateTicks$1(generationOptions, me);
          me.max = helpers$1.max(ticks);
          me.min = helpers$1.min(ticks);
          if (tickOpts.reverse) {
            reverse = !reverse;
            me.start = me.max;
            me.end = me.min;
          } else {
            me.start = me.min;
            me.end = me.max;
          }
          if (reverse) {
            ticks.reverse();
          }
        },
        convertTicksToLabels: function() {
          this.tickValues = this.ticks.slice();
          core_scale.prototype.convertTicksToLabels.call(this);
        },
        // Get the correct tooltip label
        getLabelForIndex: function(index, datasetIndex) {
          return this._getScaleLabel(this.chart.data.datasets[datasetIndex].data[index]);
        },
        getPixelForTick: function(index) {
          var ticks = this.tickValues;
          if (index < 0 || index > ticks.length - 1) {
            return null;
          }
          return this.getPixelForValue(ticks[index]);
        },
        /**
         * Returns the value of the first tick.
         * @param {number} value - The minimum not zero value.
         * @return {number} The first tick value.
         * @private
         */
        _getFirstTickValue: function(value) {
          var exp = Math.floor(log10(value));
          var significand = Math.floor(value / Math.pow(10, exp));
          return significand * Math.pow(10, exp);
        },
        _configure: function() {
          var me = this;
          var start = me.min;
          var offset = 0;
          core_scale.prototype._configure.call(me);
          if (start === 0) {
            start = me._getFirstTickValue(me.minNotZero);
            offset = valueOrDefault$b(me.options.ticks.fontSize, core_defaults.global.defaultFontSize) / me._length;
          }
          me._startValue = log10(start);
          me._valueOffset = offset;
          me._valueRange = (log10(me.max) - log10(start)) / (1 - offset);
        },
        getPixelForValue: function(value) {
          var me = this;
          var decimal = 0;
          value = +me.getRightValue(value);
          if (value > me.min && value > 0) {
            decimal = (log10(value) - me._startValue) / me._valueRange + me._valueOffset;
          }
          return me.getPixelForDecimal(decimal);
        },
        getValueForPixel: function(pixel) {
          var me = this;
          var decimal = me.getDecimalForPixel(pixel);
          return decimal === 0 && me.min === 0 ? 0 : Math.pow(10, me._startValue + (decimal - me._valueOffset) * me._valueRange);
        }
      });
      var _defaults$2 = defaultConfig$2;
      scale_logarithmic._defaults = _defaults$2;
      var valueOrDefault$c = helpers$1.valueOrDefault;
      var valueAtIndexOrDefault$1 = helpers$1.valueAtIndexOrDefault;
      var resolve$4 = helpers$1.options.resolve;
      var defaultConfig$3 = {
        display: true,
        // Boolean - Whether to animate scaling the chart from the centre
        animate: true,
        position: "chartArea",
        angleLines: {
          display: true,
          color: "rgba(0,0,0,0.1)",
          lineWidth: 1,
          borderDash: [],
          borderDashOffset: 0
        },
        gridLines: {
          circular: false
        },
        // label settings
        ticks: {
          // Boolean - Show a backdrop to the scale label
          showLabelBackdrop: true,
          // String - The colour of the label backdrop
          backdropColor: "rgba(255,255,255,0.75)",
          // Number - The backdrop padding above & below the label in pixels
          backdropPaddingY: 2,
          // Number - The backdrop padding to the side of the label in pixels
          backdropPaddingX: 2,
          callback: core_ticks.formatters.linear
        },
        pointLabels: {
          // Boolean - if true, show point labels
          display: true,
          // Number - Point label font size in pixels
          fontSize: 10,
          // Function - Used to convert point labels
          callback: function(label) {
            return label;
          }
        }
      };
      function getTickBackdropHeight(opts) {
        var tickOpts = opts.ticks;
        if (tickOpts.display && opts.display) {
          return valueOrDefault$c(tickOpts.fontSize, core_defaults.global.defaultFontSize) + tickOpts.backdropPaddingY * 2;
        }
        return 0;
      }
      function measureLabelSize(ctx, lineHeight, label) {
        if (helpers$1.isArray(label)) {
          return {
            w: helpers$1.longestText(ctx, ctx.font, label),
            h: label.length * lineHeight
          };
        }
        return {
          w: ctx.measureText(label).width,
          h: lineHeight
        };
      }
      function determineLimits(angle, pos, size, min, max) {
        if (angle === min || angle === max) {
          return {
            start: pos - size / 2,
            end: pos + size / 2
          };
        } else if (angle < min || angle > max) {
          return {
            start: pos - size,
            end: pos
          };
        }
        return {
          start: pos,
          end: pos + size
        };
      }
      function fitWithPointLabels(scale2) {
        var plFont = helpers$1.options._parseFont(scale2.options.pointLabels);
        var furthestLimits = {
          l: 0,
          r: scale2.width,
          t: 0,
          b: scale2.height - scale2.paddingTop
        };
        var furthestAngles = {};
        var i, textSize, pointPosition;
        scale2.ctx.font = plFont.string;
        scale2._pointLabelSizes = [];
        var valueCount = scale2.chart.data.labels.length;
        for (i = 0; i < valueCount; i++) {
          pointPosition = scale2.getPointPosition(i, scale2.drawingArea + 5);
          textSize = measureLabelSize(scale2.ctx, plFont.lineHeight, scale2.pointLabels[i]);
          scale2._pointLabelSizes[i] = textSize;
          var angleRadians = scale2.getIndexAngle(i);
          var angle = helpers$1.toDegrees(angleRadians) % 360;
          var hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
          var vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
          if (hLimits.start < furthestLimits.l) {
            furthestLimits.l = hLimits.start;
            furthestAngles.l = angleRadians;
          }
          if (hLimits.end > furthestLimits.r) {
            furthestLimits.r = hLimits.end;
            furthestAngles.r = angleRadians;
          }
          if (vLimits.start < furthestLimits.t) {
            furthestLimits.t = vLimits.start;
            furthestAngles.t = angleRadians;
          }
          if (vLimits.end > furthestLimits.b) {
            furthestLimits.b = vLimits.end;
            furthestAngles.b = angleRadians;
          }
        }
        scale2.setReductions(scale2.drawingArea, furthestLimits, furthestAngles);
      }
      function getTextAlignForAngle(angle) {
        if (angle === 0 || angle === 180) {
          return "center";
        } else if (angle < 180) {
          return "left";
        }
        return "right";
      }
      function fillText(ctx, text, position, lineHeight) {
        var y = position.y + lineHeight / 2;
        var i, ilen;
        if (helpers$1.isArray(text)) {
          for (i = 0, ilen = text.length; i < ilen; ++i) {
            ctx.fillText(text[i], position.x, y);
            y += lineHeight;
          }
        } else {
          ctx.fillText(text, position.x, y);
        }
      }
      function adjustPointPositionForLabelHeight(angle, textSize, position) {
        if (angle === 90 || angle === 270) {
          position.y -= textSize.h / 2;
        } else if (angle > 270 || angle < 90) {
          position.y -= textSize.h;
        }
      }
      function drawPointLabels(scale2) {
        var ctx = scale2.ctx;
        var opts = scale2.options;
        var pointLabelOpts = opts.pointLabels;
        var tickBackdropHeight = getTickBackdropHeight(opts);
        var outerDistance = scale2.getDistanceFromCenterForValue(opts.ticks.reverse ? scale2.min : scale2.max);
        var plFont = helpers$1.options._parseFont(pointLabelOpts);
        ctx.save();
        ctx.font = plFont.string;
        ctx.textBaseline = "middle";
        for (var i = scale2.chart.data.labels.length - 1; i >= 0; i--) {
          var extra = i === 0 ? tickBackdropHeight / 2 : 0;
          var pointLabelPosition = scale2.getPointPosition(i, outerDistance + extra + 5);
          var pointLabelFontColor = valueAtIndexOrDefault$1(pointLabelOpts.fontColor, i, core_defaults.global.defaultFontColor);
          ctx.fillStyle = pointLabelFontColor;
          var angleRadians = scale2.getIndexAngle(i);
          var angle = helpers$1.toDegrees(angleRadians);
          ctx.textAlign = getTextAlignForAngle(angle);
          adjustPointPositionForLabelHeight(angle, scale2._pointLabelSizes[i], pointLabelPosition);
          fillText(ctx, scale2.pointLabels[i], pointLabelPosition, plFont.lineHeight);
        }
        ctx.restore();
      }
      function drawRadiusLine(scale2, gridLineOpts, radius, index) {
        var ctx = scale2.ctx;
        var circular = gridLineOpts.circular;
        var valueCount = scale2.chart.data.labels.length;
        var lineColor = valueAtIndexOrDefault$1(gridLineOpts.color, index - 1);
        var lineWidth = valueAtIndexOrDefault$1(gridLineOpts.lineWidth, index - 1);
        var pointPosition;
        if (!circular && !valueCount || !lineColor || !lineWidth) {
          return;
        }
        ctx.save();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        if (ctx.setLineDash) {
          ctx.setLineDash(gridLineOpts.borderDash || []);
          ctx.lineDashOffset = gridLineOpts.borderDashOffset || 0;
        }
        ctx.beginPath();
        if (circular) {
          ctx.arc(scale2.xCenter, scale2.yCenter, radius, 0, Math.PI * 2);
        } else {
          pointPosition = scale2.getPointPosition(0, radius);
          ctx.moveTo(pointPosition.x, pointPosition.y);
          for (var i = 1; i < valueCount; i++) {
            pointPosition = scale2.getPointPosition(i, radius);
            ctx.lineTo(pointPosition.x, pointPosition.y);
          }
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
      function numberOrZero(param) {
        return helpers$1.isNumber(param) ? param : 0;
      }
      var scale_radialLinear = scale_linearbase.extend({
        setDimensions: function() {
          var me = this;
          me.width = me.maxWidth;
          me.height = me.maxHeight;
          me.paddingTop = getTickBackdropHeight(me.options) / 2;
          me.xCenter = Math.floor(me.width / 2);
          me.yCenter = Math.floor((me.height - me.paddingTop) / 2);
          me.drawingArea = Math.min(me.height - me.paddingTop, me.width) / 2;
        },
        determineDataLimits: function() {
          var me = this;
          var chart = me.chart;
          var min = Number.POSITIVE_INFINITY;
          var max = Number.NEGATIVE_INFINITY;
          helpers$1.each(chart.data.datasets, function(dataset, datasetIndex) {
            if (chart.isDatasetVisible(datasetIndex)) {
              var meta = chart.getDatasetMeta(datasetIndex);
              helpers$1.each(dataset.data, function(rawValue, index) {
                var value = +me.getRightValue(rawValue);
                if (isNaN(value) || meta.data[index].hidden) {
                  return;
                }
                min = Math.min(value, min);
                max = Math.max(value, max);
              });
            }
          });
          me.min = min === Number.POSITIVE_INFINITY ? 0 : min;
          me.max = max === Number.NEGATIVE_INFINITY ? 0 : max;
          me.handleTickRangeOptions();
        },
        // Returns the maximum number of ticks based on the scale dimension
        _computeTickLimit: function() {
          return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
        },
        convertTicksToLabels: function() {
          var me = this;
          scale_linearbase.prototype.convertTicksToLabels.call(me);
          me.pointLabels = me.chart.data.labels.map(function() {
            var label = helpers$1.callback(me.options.pointLabels.callback, arguments, me);
            return label || label === 0 ? label : "";
          });
        },
        getLabelForIndex: function(index, datasetIndex) {
          return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
        },
        fit: function() {
          var me = this;
          var opts = me.options;
          if (opts.display && opts.pointLabels.display) {
            fitWithPointLabels(me);
          } else {
            me.setCenterPoint(0, 0, 0, 0);
          }
        },
        /**
         * Set radius reductions and determine new radius and center point
         * @private
         */
        setReductions: function(largestPossibleRadius, furthestLimits, furthestAngles) {
          var me = this;
          var radiusReductionLeft = furthestLimits.l / Math.sin(furthestAngles.l);
          var radiusReductionRight = Math.max(furthestLimits.r - me.width, 0) / Math.sin(furthestAngles.r);
          var radiusReductionTop = -furthestLimits.t / Math.cos(furthestAngles.t);
          var radiusReductionBottom = -Math.max(furthestLimits.b - (me.height - me.paddingTop), 0) / Math.cos(furthestAngles.b);
          radiusReductionLeft = numberOrZero(radiusReductionLeft);
          radiusReductionRight = numberOrZero(radiusReductionRight);
          radiusReductionTop = numberOrZero(radiusReductionTop);
          radiusReductionBottom = numberOrZero(radiusReductionBottom);
          me.drawingArea = Math.min(
            Math.floor(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2),
            Math.floor(largestPossibleRadius - (radiusReductionTop + radiusReductionBottom) / 2)
          );
          me.setCenterPoint(radiusReductionLeft, radiusReductionRight, radiusReductionTop, radiusReductionBottom);
        },
        setCenterPoint: function(leftMovement, rightMovement, topMovement, bottomMovement) {
          var me = this;
          var maxRight = me.width - rightMovement - me.drawingArea;
          var maxLeft = leftMovement + me.drawingArea;
          var maxTop = topMovement + me.drawingArea;
          var maxBottom = me.height - me.paddingTop - bottomMovement - me.drawingArea;
          me.xCenter = Math.floor((maxLeft + maxRight) / 2 + me.left);
          me.yCenter = Math.floor((maxTop + maxBottom) / 2 + me.top + me.paddingTop);
        },
        getIndexAngle: function(index) {
          var chart = this.chart;
          var angleMultiplier = 360 / chart.data.labels.length;
          var options2 = chart.options || {};
          var startAngle = options2.startAngle || 0;
          var angle = (index * angleMultiplier + startAngle) % 360;
          return (angle < 0 ? angle + 360 : angle) * Math.PI * 2 / 360;
        },
        getDistanceFromCenterForValue: function(value) {
          var me = this;
          if (helpers$1.isNullOrUndef(value)) {
            return NaN;
          }
          var scalingFactor = me.drawingArea / (me.max - me.min);
          if (me.options.ticks.reverse) {
            return (me.max - value) * scalingFactor;
          }
          return (value - me.min) * scalingFactor;
        },
        getPointPosition: function(index, distanceFromCenter) {
          var me = this;
          var thisAngle = me.getIndexAngle(index) - Math.PI / 2;
          return {
            x: Math.cos(thisAngle) * distanceFromCenter + me.xCenter,
            y: Math.sin(thisAngle) * distanceFromCenter + me.yCenter
          };
        },
        getPointPositionForValue: function(index, value) {
          return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
        },
        getBasePosition: function(index) {
          var me = this;
          var min = me.min;
          var max = me.max;
          return me.getPointPositionForValue(
            index || 0,
            me.beginAtZero ? 0 : min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0
          );
        },
        /**
         * @private
         */
        _drawGrid: function() {
          var me = this;
          var ctx = me.ctx;
          var opts = me.options;
          var gridLineOpts = opts.gridLines;
          var angleLineOpts = opts.angleLines;
          var lineWidth = valueOrDefault$c(angleLineOpts.lineWidth, gridLineOpts.lineWidth);
          var lineColor = valueOrDefault$c(angleLineOpts.color, gridLineOpts.color);
          var i, offset, position;
          if (opts.pointLabels.display) {
            drawPointLabels(me);
          }
          if (gridLineOpts.display) {
            helpers$1.each(me.ticks, function(label, index) {
              if (index !== 0) {
                offset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);
                drawRadiusLine(me, gridLineOpts, offset, index);
              }
            });
          }
          if (angleLineOpts.display && lineWidth && lineColor) {
            ctx.save();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = lineColor;
            if (ctx.setLineDash) {
              ctx.setLineDash(resolve$4([angleLineOpts.borderDash, gridLineOpts.borderDash, []]));
              ctx.lineDashOffset = resolve$4([angleLineOpts.borderDashOffset, gridLineOpts.borderDashOffset, 0]);
            }
            for (i = me.chart.data.labels.length - 1; i >= 0; i--) {
              offset = me.getDistanceFromCenterForValue(opts.ticks.reverse ? me.min : me.max);
              position = me.getPointPosition(i, offset);
              ctx.beginPath();
              ctx.moveTo(me.xCenter, me.yCenter);
              ctx.lineTo(position.x, position.y);
              ctx.stroke();
            }
            ctx.restore();
          }
        },
        /**
         * @private
         */
        _drawLabels: function() {
          var me = this;
          var ctx = me.ctx;
          var opts = me.options;
          var tickOpts = opts.ticks;
          if (!tickOpts.display) {
            return;
          }
          var startAngle = me.getIndexAngle(0);
          var tickFont = helpers$1.options._parseFont(tickOpts);
          var tickFontColor = valueOrDefault$c(tickOpts.fontColor, core_defaults.global.defaultFontColor);
          var offset, width;
          ctx.save();
          ctx.font = tickFont.string;
          ctx.translate(me.xCenter, me.yCenter);
          ctx.rotate(startAngle);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          helpers$1.each(me.ticks, function(label, index) {
            if (index === 0 && !tickOpts.reverse) {
              return;
            }
            offset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);
            if (tickOpts.showLabelBackdrop) {
              width = ctx.measureText(label).width;
              ctx.fillStyle = tickOpts.backdropColor;
              ctx.fillRect(
                -width / 2 - tickOpts.backdropPaddingX,
                -offset - tickFont.size / 2 - tickOpts.backdropPaddingY,
                width + tickOpts.backdropPaddingX * 2,
                tickFont.size + tickOpts.backdropPaddingY * 2
              );
            }
            ctx.fillStyle = tickFontColor;
            ctx.fillText(label, 0, -offset);
          });
          ctx.restore();
        },
        /**
         * @private
         */
        _drawTitle: helpers$1.noop
      });
      var _defaults$3 = defaultConfig$3;
      scale_radialLinear._defaults = _defaults$3;
      var deprecated$1 = helpers$1._deprecated;
      var resolve$5 = helpers$1.options.resolve;
      var valueOrDefault$d = helpers$1.valueOrDefault;
      var MIN_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;
      var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
      var INTERVALS = {
        millisecond: {
          common: true,
          size: 1,
          steps: 1e3
        },
        second: {
          common: true,
          size: 1e3,
          steps: 60
        },
        minute: {
          common: true,
          size: 6e4,
          steps: 60
        },
        hour: {
          common: true,
          size: 36e5,
          steps: 24
        },
        day: {
          common: true,
          size: 864e5,
          steps: 30
        },
        week: {
          common: false,
          size: 6048e5,
          steps: 4
        },
        month: {
          common: true,
          size: 2628e6,
          steps: 12
        },
        quarter: {
          common: false,
          size: 7884e6,
          steps: 4
        },
        year: {
          common: true,
          size: 3154e7
        }
      };
      var UNITS = Object.keys(INTERVALS);
      function sorter(a, b) {
        return a - b;
      }
      function arrayUnique(items) {
        var hash = {};
        var out = [];
        var i, ilen, item;
        for (i = 0, ilen = items.length; i < ilen; ++i) {
          item = items[i];
          if (!hash[item]) {
            hash[item] = true;
            out.push(item);
          }
        }
        return out;
      }
      function getMin(options2) {
        return helpers$1.valueOrDefault(options2.time.min, options2.ticks.min);
      }
      function getMax(options2) {
        return helpers$1.valueOrDefault(options2.time.max, options2.ticks.max);
      }
      function buildLookupTable(timestamps, min, max, distribution) {
        if (distribution === "linear" || !timestamps.length) {
          return [
            { time: min, pos: 0 },
            { time: max, pos: 1 }
          ];
        }
        var table = [];
        var items = [min];
        var i, ilen, prev, curr, next;
        for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
          curr = timestamps[i];
          if (curr > min && curr < max) {
            items.push(curr);
          }
        }
        items.push(max);
        for (i = 0, ilen = items.length; i < ilen; ++i) {
          next = items[i + 1];
          prev = items[i - 1];
          curr = items[i];
          if (prev === void 0 || next === void 0 || Math.round((next + prev) / 2) !== curr) {
            table.push({ time: curr, pos: i / (ilen - 1) });
          }
        }
        return table;
      }
      function lookup(table, key, value) {
        var lo = 0;
        var hi = table.length - 1;
        var mid, i0, i1;
        while (lo >= 0 && lo <= hi) {
          mid = lo + hi >> 1;
          i0 = table[mid - 1] || null;
          i1 = table[mid];
          if (!i0) {
            return { lo: null, hi: i1 };
          } else if (i1[key] < value) {
            lo = mid + 1;
          } else if (i0[key] > value) {
            hi = mid - 1;
          } else {
            return { lo: i0, hi: i1 };
          }
        }
        return { lo: i1, hi: null };
      }
      function interpolate$1(table, skey, sval, tkey) {
        var range = lookup(table, skey, sval);
        var prev = !range.lo ? table[0] : !range.hi ? table[table.length - 2] : range.lo;
        var next = !range.lo ? table[1] : !range.hi ? table[table.length - 1] : range.hi;
        var span = next[skey] - prev[skey];
        var ratio = span ? (sval - prev[skey]) / span : 0;
        var offset = (next[tkey] - prev[tkey]) * ratio;
        return prev[tkey] + offset;
      }
      function toTimestamp(scale2, input) {
        var adapter = scale2._adapter;
        var options2 = scale2.options.time;
        var parser = options2.parser;
        var format = parser || options2.format;
        var value = input;
        if (typeof parser === "function") {
          value = parser(value);
        }
        if (!helpers$1.isFinite(value)) {
          value = typeof format === "string" ? adapter.parse(value, format) : adapter.parse(value);
        }
        if (value !== null) {
          return +value;
        }
        if (!parser && typeof format === "function") {
          value = format(input);
          if (!helpers$1.isFinite(value)) {
            value = adapter.parse(value);
          }
        }
        return value;
      }
      function parse(scale2, input) {
        if (helpers$1.isNullOrUndef(input)) {
          return null;
        }
        var options2 = scale2.options.time;
        var value = toTimestamp(scale2, scale2.getRightValue(input));
        if (value === null) {
          return value;
        }
        if (options2.round) {
          value = +scale2._adapter.startOf(value, options2.round);
        }
        return value;
      }
      function determineUnitForAutoTicks(minUnit, min, max, capacity) {
        var ilen = UNITS.length;
        var i, interval, factor;
        for (i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
          interval = INTERVALS[UNITS[i]];
          factor = interval.steps ? interval.steps : MAX_INTEGER;
          if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
            return UNITS[i];
          }
        }
        return UNITS[ilen - 1];
      }
      function determineUnitForFormatting(scale2, numTicks, minUnit, min, max) {
        var i, unit;
        for (i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
          unit = UNITS[i];
          if (INTERVALS[unit].common && scale2._adapter.diff(max, min, unit) >= numTicks - 1) {
            return unit;
          }
        }
        return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
      }
      function determineMajorUnit(unit) {
        for (var i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
          if (INTERVALS[UNITS[i]].common) {
            return UNITS[i];
          }
        }
      }
      function generate(scale2, min, max, capacity) {
        var adapter = scale2._adapter;
        var options2 = scale2.options;
        var timeOpts = options2.time;
        var minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, capacity);
        var stepSize = resolve$5([timeOpts.stepSize, timeOpts.unitStepSize, 1]);
        var weekday = minor === "week" ? timeOpts.isoWeekday : false;
        var first = min;
        var ticks = [];
        var time;
        if (weekday) {
          first = +adapter.startOf(first, "isoWeek", weekday);
        }
        first = +adapter.startOf(first, weekday ? "day" : minor);
        if (adapter.diff(max, min, minor) > 1e5 * stepSize) {
          throw min + " and " + max + " are too far apart with stepSize of " + stepSize + " " + minor;
        }
        for (time = first; time < max; time = +adapter.add(time, stepSize, minor)) {
          ticks.push(time);
        }
        if (time === max || options2.bounds === "ticks") {
          ticks.push(time);
        }
        return ticks;
      }
      function computeOffsets(table, ticks, min, max, options2) {
        var start = 0;
        var end = 0;
        var first, last;
        if (options2.offset && ticks.length) {
          first = interpolate$1(table, "time", ticks[0], "pos");
          if (ticks.length === 1) {
            start = 1 - first;
          } else {
            start = (interpolate$1(table, "time", ticks[1], "pos") - first) / 2;
          }
          last = interpolate$1(table, "time", ticks[ticks.length - 1], "pos");
          if (ticks.length === 1) {
            end = last;
          } else {
            end = (last - interpolate$1(table, "time", ticks[ticks.length - 2], "pos")) / 2;
          }
        }
        return { start, end, factor: 1 / (start + 1 + end) };
      }
      function setMajorTicks(scale2, ticks, map, majorUnit) {
        var adapter = scale2._adapter;
        var first = +adapter.startOf(ticks[0].value, majorUnit);
        var last = ticks[ticks.length - 1].value;
        var major, index;
        for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
          index = map[major];
          if (index >= 0) {
            ticks[index].major = true;
          }
        }
        return ticks;
      }
      function ticksFromTimestamps(scale2, values, majorUnit) {
        var ticks = [];
        var map = {};
        var ilen = values.length;
        var i, value;
        for (i = 0; i < ilen; ++i) {
          value = values[i];
          map[value] = i;
          ticks.push({
            value,
            major: false
          });
        }
        return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale2, ticks, map, majorUnit);
      }
      var defaultConfig$4 = {
        position: "bottom",
        /**
         * Data distribution along the scale:
         * - 'linear': data are spread according to their time (distances can vary),
         * - 'series': data are spread at the same distance from each other.
         * @see https://github.com/chartjs/Chart.js/pull/4507
         * @since 2.7.0
         */
        distribution: "linear",
        /**
         * Scale boundary strategy (bypassed by min/max time options)
         * - `data`: make sure data are fully visible, ticks outside are removed
         * - `ticks`: make sure ticks are fully visible, data outside are truncated
         * @see https://github.com/chartjs/Chart.js/pull/4556
         * @since 2.7.0
         */
        bounds: "data",
        adapters: {},
        time: {
          parser: false,
          // false == a pattern string from https://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
          unit: false,
          // false == automatic or override with week, month, year, etc.
          round: false,
          // none, or override with week, month, year, etc.
          displayFormat: false,
          // DEPRECATED
          isoWeekday: false,
          // override week start day - see https://momentjs.com/docs/#/get-set/iso-weekday/
          minUnit: "millisecond",
          displayFormats: {}
        },
        ticks: {
          autoSkip: false,
          /**
           * Ticks generation input values:
           * - 'auto': generates "optimal" ticks based on scale size and time options.
           * - 'data': generates ticks from data (including labels from data {t|x|y} objects).
           * - 'labels': generates ticks from user given `data.labels` values ONLY.
           * @see https://github.com/chartjs/Chart.js/pull/4507
           * @since 2.7.0
           */
          source: "auto",
          major: {
            enabled: false
          }
        }
      };
      var scale_time = core_scale.extend({
        initialize: function() {
          this.mergeTicksOptions();
          core_scale.prototype.initialize.call(this);
        },
        update: function() {
          var me = this;
          var options2 = me.options;
          var time = options2.time || (options2.time = {});
          var adapter = me._adapter = new core_adapters._date(options2.adapters.date);
          deprecated$1("time scale", time.format, "time.format", "time.parser");
          deprecated$1("time scale", time.min, "time.min", "ticks.min");
          deprecated$1("time scale", time.max, "time.max", "ticks.max");
          helpers$1.mergeIf(time.displayFormats, adapter.formats());
          return core_scale.prototype.update.apply(me, arguments);
        },
        /**
         * Allows data to be referenced via 't' attribute
         */
        getRightValue: function(rawValue) {
          if (rawValue && rawValue.t !== void 0) {
            rawValue = rawValue.t;
          }
          return core_scale.prototype.getRightValue.call(this, rawValue);
        },
        determineDataLimits: function() {
          var me = this;
          var chart = me.chart;
          var adapter = me._adapter;
          var options2 = me.options;
          var unit = options2.time.unit || "day";
          var min = MAX_INTEGER;
          var max = MIN_INTEGER;
          var timestamps = [];
          var datasets = [];
          var labels = [];
          var i, j, ilen, jlen, data, timestamp, labelsAdded;
          var dataLabels = me._getLabels();
          for (i = 0, ilen = dataLabels.length; i < ilen; ++i) {
            labels.push(parse(me, dataLabels[i]));
          }
          for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
            if (chart.isDatasetVisible(i)) {
              data = chart.data.datasets[i].data;
              if (helpers$1.isObject(data[0])) {
                datasets[i] = [];
                for (j = 0, jlen = data.length; j < jlen; ++j) {
                  timestamp = parse(me, data[j]);
                  timestamps.push(timestamp);
                  datasets[i][j] = timestamp;
                }
              } else {
                datasets[i] = labels.slice(0);
                if (!labelsAdded) {
                  timestamps = timestamps.concat(labels);
                  labelsAdded = true;
                }
              }
            } else {
              datasets[i] = [];
            }
          }
          if (labels.length) {
            min = Math.min(min, labels[0]);
            max = Math.max(max, labels[labels.length - 1]);
          }
          if (timestamps.length) {
            timestamps = ilen > 1 ? arrayUnique(timestamps).sort(sorter) : timestamps.sort(sorter);
            min = Math.min(min, timestamps[0]);
            max = Math.max(max, timestamps[timestamps.length - 1]);
          }
          min = parse(me, getMin(options2)) || min;
          max = parse(me, getMax(options2)) || max;
          min = min === MAX_INTEGER ? +adapter.startOf(Date.now(), unit) : min;
          max = max === MIN_INTEGER ? +adapter.endOf(Date.now(), unit) + 1 : max;
          me.min = Math.min(min, max);
          me.max = Math.max(min + 1, max);
          me._table = [];
          me._timestamps = {
            data: timestamps,
            datasets,
            labels
          };
        },
        buildTicks: function() {
          var me = this;
          var min = me.min;
          var max = me.max;
          var options2 = me.options;
          var tickOpts = options2.ticks;
          var timeOpts = options2.time;
          var timestamps = me._timestamps;
          var ticks = [];
          var capacity = me.getLabelCapacity(min);
          var source = tickOpts.source;
          var distribution = options2.distribution;
          var i, ilen, timestamp;
          if (source === "data" || source === "auto" && distribution === "series") {
            timestamps = timestamps.data;
          } else if (source === "labels") {
            timestamps = timestamps.labels;
          } else {
            timestamps = generate(me, min, max, capacity);
          }
          if (options2.bounds === "ticks" && timestamps.length) {
            min = timestamps[0];
            max = timestamps[timestamps.length - 1];
          }
          min = parse(me, getMin(options2)) || min;
          max = parse(me, getMax(options2)) || max;
          for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
            timestamp = timestamps[i];
            if (timestamp >= min && timestamp <= max) {
              ticks.push(timestamp);
            }
          }
          me.min = min;
          me.max = max;
          me._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, me.min, me.max, capacity) : determineUnitForFormatting(me, ticks.length, timeOpts.minUnit, me.min, me.max));
          me._majorUnit = !tickOpts.major.enabled || me._unit === "year" ? void 0 : determineMajorUnit(me._unit);
          me._table = buildLookupTable(me._timestamps.data, min, max, distribution);
          me._offsets = computeOffsets(me._table, ticks, min, max, options2);
          if (tickOpts.reverse) {
            ticks.reverse();
          }
          return ticksFromTimestamps(me, ticks, me._majorUnit);
        },
        getLabelForIndex: function(index, datasetIndex) {
          var me = this;
          var adapter = me._adapter;
          var data = me.chart.data;
          var timeOpts = me.options.time;
          var label = data.labels && index < data.labels.length ? data.labels[index] : "";
          var value = data.datasets[datasetIndex].data[index];
          if (helpers$1.isObject(value)) {
            label = me.getRightValue(value);
          }
          if (timeOpts.tooltipFormat) {
            return adapter.format(toTimestamp(me, label), timeOpts.tooltipFormat);
          }
          if (typeof label === "string") {
            return label;
          }
          return adapter.format(toTimestamp(me, label), timeOpts.displayFormats.datetime);
        },
        /**
         * Function to format an individual tick mark
         * @private
         */
        tickFormatFunction: function(time, index, ticks, format) {
          var me = this;
          var adapter = me._adapter;
          var options2 = me.options;
          var formats = options2.time.displayFormats;
          var minorFormat = formats[me._unit];
          var majorUnit = me._majorUnit;
          var majorFormat = formats[majorUnit];
          var tick = ticks[index];
          var tickOpts = options2.ticks;
          var major = majorUnit && majorFormat && tick && tick.major;
          var label = adapter.format(time, format ? format : major ? majorFormat : minorFormat);
          var nestedTickOpts = major ? tickOpts.major : tickOpts.minor;
          var formatter = resolve$5([
            nestedTickOpts.callback,
            nestedTickOpts.userCallback,
            tickOpts.callback,
            tickOpts.userCallback
          ]);
          return formatter ? formatter(label, index, ticks) : label;
        },
        convertTicksToLabels: function(ticks) {
          var labels = [];
          var i, ilen;
          for (i = 0, ilen = ticks.length; i < ilen; ++i) {
            labels.push(this.tickFormatFunction(ticks[i].value, i, ticks));
          }
          return labels;
        },
        /**
         * @private
         */
        getPixelForOffset: function(time) {
          var me = this;
          var offsets = me._offsets;
          var pos = interpolate$1(me._table, "time", time, "pos");
          return me.getPixelForDecimal((offsets.start + pos) * offsets.factor);
        },
        getPixelForValue: function(value, index, datasetIndex) {
          var me = this;
          var time = null;
          if (index !== void 0 && datasetIndex !== void 0) {
            time = me._timestamps.datasets[datasetIndex][index];
          }
          if (time === null) {
            time = parse(me, value);
          }
          if (time !== null) {
            return me.getPixelForOffset(time);
          }
        },
        getPixelForTick: function(index) {
          var ticks = this.getTicks();
          return index >= 0 && index < ticks.length ? this.getPixelForOffset(ticks[index].value) : null;
        },
        getValueForPixel: function(pixel) {
          var me = this;
          var offsets = me._offsets;
          var pos = me.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
          var time = interpolate$1(me._table, "pos", pos, "time");
          return me._adapter._create(time);
        },
        /**
         * @private
         */
        _getLabelSize: function(label) {
          var me = this;
          var ticksOpts = me.options.ticks;
          var tickLabelWidth = me.ctx.measureText(label).width;
          var angle = helpers$1.toRadians(me.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
          var cosRotation = Math.cos(angle);
          var sinRotation = Math.sin(angle);
          var tickFontSize = valueOrDefault$d(ticksOpts.fontSize, core_defaults.global.defaultFontSize);
          return {
            w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
            h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
          };
        },
        /**
         * Crude approximation of what the label width might be
         * @private
         */
        getLabelWidth: function(label) {
          return this._getLabelSize(label).w;
        },
        /**
         * @private
         */
        getLabelCapacity: function(exampleTime) {
          var me = this;
          var timeOpts = me.options.time;
          var displayFormats = timeOpts.displayFormats;
          var format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
          var exampleLabel = me.tickFormatFunction(exampleTime, 0, ticksFromTimestamps(me, [exampleTime], me._majorUnit), format);
          var size = me._getLabelSize(exampleLabel);
          var capacity = Math.floor(me.isHorizontal() ? me.width / size.w : me.height / size.h);
          if (me.options.offset) {
            capacity--;
          }
          return capacity > 0 ? capacity : 1;
        }
      });
      var _defaults$4 = defaultConfig$4;
      scale_time._defaults = _defaults$4;
      var scales = {
        category: scale_category,
        linear: scale_linear,
        logarithmic: scale_logarithmic,
        radialLinear: scale_radialLinear,
        time: scale_time
      };
      var FORMATS = {
        datetime: "MMM D, YYYY, h:mm:ss a",
        millisecond: "h:mm:ss.SSS a",
        second: "h:mm:ss a",
        minute: "h:mm a",
        hour: "hA",
        day: "MMM D",
        week: "ll",
        month: "MMM YYYY",
        quarter: "[Q]Q - YYYY",
        year: "YYYY"
      };
      core_adapters._date.override(typeof moment === "function" ? {
        _id: "moment",
        // DEBUG ONLY
        formats: function() {
          return FORMATS;
        },
        parse: function(value, format) {
          if (typeof value === "string" && typeof format === "string") {
            value = moment(value, format);
          } else if (!(value instanceof moment)) {
            value = moment(value);
          }
          return value.isValid() ? value.valueOf() : null;
        },
        format: function(time, format) {
          return moment(time).format(format);
        },
        add: function(time, amount, unit) {
          return moment(time).add(amount, unit).valueOf();
        },
        diff: function(max, min, unit) {
          return moment(max).diff(moment(min), unit);
        },
        startOf: function(time, unit, weekday) {
          time = moment(time);
          if (unit === "isoWeek") {
            return time.isoWeekday(weekday).valueOf();
          }
          return time.startOf(unit).valueOf();
        },
        endOf: function(time, unit) {
          return moment(time).endOf(unit).valueOf();
        },
        // DEPRECATIONS
        /**
         * Provided for backward compatibility with scale.getValueForPixel().
         * @deprecated since version 2.8.0
         * @todo remove at version 3
         * @private
         */
        _create: function(time) {
          return moment(time);
        }
      } : {});
      core_defaults._set("global", {
        plugins: {
          filler: {
            propagate: true
          }
        }
      });
      var mappers = {
        dataset: function(source) {
          var index = source.fill;
          var chart = source.chart;
          var meta = chart.getDatasetMeta(index);
          var visible = meta && chart.isDatasetVisible(index);
          var points = visible && meta.dataset._children || [];
          var length = points.length || 0;
          return !length ? null : function(point, i) {
            return i < length && points[i]._view || null;
          };
        },
        boundary: function(source) {
          var boundary = source.boundary;
          var x = boundary ? boundary.x : null;
          var y = boundary ? boundary.y : null;
          if (helpers$1.isArray(boundary)) {
            return function(point, i) {
              return boundary[i];
            };
          }
          return function(point) {
            return {
              x: x === null ? point.x : x,
              y: y === null ? point.y : y
            };
          };
        }
      };
      function decodeFill(el, index, count) {
        var model = el._model || {};
        var fill = model.fill;
        var target;
        if (fill === void 0) {
          fill = !!model.backgroundColor;
        }
        if (fill === false || fill === null) {
          return false;
        }
        if (fill === true) {
          return "origin";
        }
        target = parseFloat(fill, 10);
        if (isFinite(target) && Math.floor(target) === target) {
          if (fill[0] === "-" || fill[0] === "+") {
            target = index + target;
          }
          if (target === index || target < 0 || target >= count) {
            return false;
          }
          return target;
        }
        switch (fill) {
          case "bottom":
            return "start";
          case "top":
            return "end";
          case "zero":
            return "origin";
          case "origin":
          case "start":
          case "end":
            return fill;
          default:
            return false;
        }
      }
      function computeLinearBoundary(source) {
        var model = source.el._model || {};
        var scale2 = source.el._scale || {};
        var fill = source.fill;
        var target = null;
        var horizontal;
        if (isFinite(fill)) {
          return null;
        }
        if (fill === "start") {
          target = model.scaleBottom === void 0 ? scale2.bottom : model.scaleBottom;
        } else if (fill === "end") {
          target = model.scaleTop === void 0 ? scale2.top : model.scaleTop;
        } else if (model.scaleZero !== void 0) {
          target = model.scaleZero;
        } else if (scale2.getBasePixel) {
          target = scale2.getBasePixel();
        }
        if (target !== void 0 && target !== null) {
          if (target.x !== void 0 && target.y !== void 0) {
            return target;
          }
          if (helpers$1.isFinite(target)) {
            horizontal = scale2.isHorizontal();
            return {
              x: horizontal ? target : null,
              y: horizontal ? null : target
            };
          }
        }
        return null;
      }
      function computeCircularBoundary(source) {
        var scale2 = source.el._scale;
        var options2 = scale2.options;
        var length = scale2.chart.data.labels.length;
        var fill = source.fill;
        var target = [];
        var start, end, center, i, point;
        if (!length) {
          return null;
        }
        start = options2.ticks.reverse ? scale2.max : scale2.min;
        end = options2.ticks.reverse ? scale2.min : scale2.max;
        center = scale2.getPointPositionForValue(0, start);
        for (i = 0; i < length; ++i) {
          point = fill === "start" || fill === "end" ? scale2.getPointPositionForValue(i, fill === "start" ? start : end) : scale2.getBasePosition(i);
          if (options2.gridLines.circular) {
            point.cx = center.x;
            point.cy = center.y;
            point.angle = scale2.getIndexAngle(i) - Math.PI / 2;
          }
          target.push(point);
        }
        return target;
      }
      function computeBoundary(source) {
        var scale2 = source.el._scale || {};
        if (scale2.getPointPositionForValue) {
          return computeCircularBoundary(source);
        }
        return computeLinearBoundary(source);
      }
      function resolveTarget(sources, index, propagate) {
        var source = sources[index];
        var fill = source.fill;
        var visited = [index];
        var target;
        if (!propagate) {
          return fill;
        }
        while (fill !== false && visited.indexOf(fill) === -1) {
          if (!isFinite(fill)) {
            return fill;
          }
          target = sources[fill];
          if (!target) {
            return false;
          }
          if (target.visible) {
            return fill;
          }
          visited.push(fill);
          fill = target.fill;
        }
        return false;
      }
      function createMapper(source) {
        var fill = source.fill;
        var type = "dataset";
        if (fill === false) {
          return null;
        }
        if (!isFinite(fill)) {
          type = "boundary";
        }
        return mappers[type](source);
      }
      function isDrawable(point) {
        return point && !point.skip;
      }
      function drawArea(ctx, curve0, curve1, len0, len1) {
        var i, cx, cy, r;
        if (!len0 || !len1) {
          return;
        }
        ctx.moveTo(curve0[0].x, curve0[0].y);
        for (i = 1; i < len0; ++i) {
          helpers$1.canvas.lineTo(ctx, curve0[i - 1], curve0[i]);
        }
        if (curve1[0].angle !== void 0) {
          cx = curve1[0].cx;
          cy = curve1[0].cy;
          r = Math.sqrt(Math.pow(curve1[0].x - cx, 2) + Math.pow(curve1[0].y - cy, 2));
          for (i = len1 - 1; i > 0; --i) {
            ctx.arc(cx, cy, r, curve1[i].angle, curve1[i - 1].angle, true);
          }
          return;
        }
        ctx.lineTo(curve1[len1 - 1].x, curve1[len1 - 1].y);
        for (i = len1 - 1; i > 0; --i) {
          helpers$1.canvas.lineTo(ctx, curve1[i], curve1[i - 1], true);
        }
      }
      function doFill(ctx, points, mapper, view, color, loop) {
        var count = points.length;
        var span = view.spanGaps;
        var curve0 = [];
        var curve1 = [];
        var len0 = 0;
        var len1 = 0;
        var i, ilen, index, p0, p1, d0, d1, loopOffset;
        ctx.beginPath();
        for (i = 0, ilen = count; i < ilen; ++i) {
          index = i % count;
          p0 = points[index]._view;
          p1 = mapper(p0, index, view);
          d0 = isDrawable(p0);
          d1 = isDrawable(p1);
          if (loop && loopOffset === void 0 && d0) {
            loopOffset = i + 1;
            ilen = count + loopOffset;
          }
          if (d0 && d1) {
            len0 = curve0.push(p0);
            len1 = curve1.push(p1);
          } else if (len0 && len1) {
            if (!span) {
              drawArea(ctx, curve0, curve1, len0, len1);
              len0 = len1 = 0;
              curve0 = [];
              curve1 = [];
            } else {
              if (d0) {
                curve0.push(p0);
              }
              if (d1) {
                curve1.push(p1);
              }
            }
          }
        }
        drawArea(ctx, curve0, curve1, len0, len1);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      }
      var plugin_filler = {
        id: "filler",
        afterDatasetsUpdate: function(chart, options2) {
          var count = (chart.data.datasets || []).length;
          var propagate = options2.propagate;
          var sources = [];
          var meta, i, el, source;
          for (i = 0; i < count; ++i) {
            meta = chart.getDatasetMeta(i);
            el = meta.dataset;
            source = null;
            if (el && el._model && el instanceof elements.Line) {
              source = {
                visible: chart.isDatasetVisible(i),
                fill: decodeFill(el, i, count),
                chart,
                el
              };
            }
            meta.$filler = source;
            sources.push(source);
          }
          for (i = 0; i < count; ++i) {
            source = sources[i];
            if (!source) {
              continue;
            }
            source.fill = resolveTarget(sources, i, propagate);
            source.boundary = computeBoundary(source);
            source.mapper = createMapper(source);
          }
        },
        beforeDatasetsDraw: function(chart) {
          var metasets = chart._getSortedVisibleDatasetMetas();
          var ctx = chart.ctx;
          var meta, i, el, view, points, mapper, color;
          for (i = metasets.length - 1; i >= 0; --i) {
            meta = metasets[i].$filler;
            if (!meta || !meta.visible) {
              continue;
            }
            el = meta.el;
            view = el._view;
            points = el._children || [];
            mapper = meta.mapper;
            color = view.backgroundColor || core_defaults.global.defaultColor;
            if (mapper && color && points.length) {
              helpers$1.canvas.clipArea(ctx, chart.chartArea);
              doFill(ctx, points, mapper, view, color, el._loop);
              helpers$1.canvas.unclipArea(ctx);
            }
          }
        }
      };
      var getRtlHelper$1 = helpers$1.rtl.getRtlAdapter;
      var noop$1 = helpers$1.noop;
      var valueOrDefault$e = helpers$1.valueOrDefault;
      core_defaults._set("global", {
        legend: {
          display: true,
          position: "top",
          align: "center",
          fullWidth: true,
          reverse: false,
          weight: 1e3,
          // a callback that will handle
          onClick: function(e, legendItem) {
            var index = legendItem.datasetIndex;
            var ci = this.chart;
            var meta = ci.getDatasetMeta(index);
            meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
            ci.update();
          },
          onHover: null,
          onLeave: null,
          labels: {
            boxWidth: 40,
            padding: 10,
            // Generates labels shown in the legend
            // Valid properties to return:
            // text : text to display
            // fillStyle : fill of coloured box
            // strokeStyle: stroke of coloured box
            // hidden : if this legend item refers to a hidden item
            // lineCap : cap style for line
            // lineDash
            // lineDashOffset :
            // lineJoin :
            // lineWidth :
            generateLabels: function(chart) {
              var datasets = chart.data.datasets;
              var options2 = chart.options.legend || {};
              var usePointStyle = options2.labels && options2.labels.usePointStyle;
              return chart._getSortedDatasetMetas().map(function(meta) {
                var style = meta.controller.getStyle(usePointStyle ? 0 : void 0);
                return {
                  text: datasets[meta.index].label,
                  fillStyle: style.backgroundColor,
                  hidden: !chart.isDatasetVisible(meta.index),
                  lineCap: style.borderCapStyle,
                  lineDash: style.borderDash,
                  lineDashOffset: style.borderDashOffset,
                  lineJoin: style.borderJoinStyle,
                  lineWidth: style.borderWidth,
                  strokeStyle: style.borderColor,
                  pointStyle: style.pointStyle,
                  rotation: style.rotation,
                  // Below is extra data used for toggling the datasets
                  datasetIndex: meta.index
                };
              }, this);
            }
          }
        },
        legendCallback: function(chart) {
          var list = document.createElement("ul");
          var datasets = chart.data.datasets;
          var i, ilen, listItem, listItemSpan;
          list.setAttribute("class", chart.id + "-legend");
          for (i = 0, ilen = datasets.length; i < ilen; i++) {
            listItem = list.appendChild(document.createElement("li"));
            listItemSpan = listItem.appendChild(document.createElement("span"));
            listItemSpan.style.backgroundColor = datasets[i].backgroundColor;
            if (datasets[i].label) {
              listItem.appendChild(document.createTextNode(datasets[i].label));
            }
          }
          return list.outerHTML;
        }
      });
      function getBoxWidth(labelOpts, fontSize) {
        return labelOpts.usePointStyle && labelOpts.boxWidth > fontSize ? fontSize : labelOpts.boxWidth;
      }
      var Legend = core_element.extend({
        initialize: function(config) {
          var me = this;
          helpers$1.extend(me, config);
          me.legendHitBoxes = [];
          me._hoveredItem = null;
          me.doughnutMode = false;
        },
        // These methods are ordered by lifecycle. Utilities then follow.
        // Any function defined here is inherited by all legend types.
        // Any function can be extended by the legend type
        beforeUpdate: noop$1,
        update: function(maxWidth, maxHeight, margins) {
          var me = this;
          me.beforeUpdate();
          me.maxWidth = maxWidth;
          me.maxHeight = maxHeight;
          me.margins = margins;
          me.beforeSetDimensions();
          me.setDimensions();
          me.afterSetDimensions();
          me.beforeBuildLabels();
          me.buildLabels();
          me.afterBuildLabels();
          me.beforeFit();
          me.fit();
          me.afterFit();
          me.afterUpdate();
          return me.minSize;
        },
        afterUpdate: noop$1,
        //
        beforeSetDimensions: noop$1,
        setDimensions: function() {
          var me = this;
          if (me.isHorizontal()) {
            me.width = me.maxWidth;
            me.left = 0;
            me.right = me.width;
          } else {
            me.height = me.maxHeight;
            me.top = 0;
            me.bottom = me.height;
          }
          me.paddingLeft = 0;
          me.paddingTop = 0;
          me.paddingRight = 0;
          me.paddingBottom = 0;
          me.minSize = {
            width: 0,
            height: 0
          };
        },
        afterSetDimensions: noop$1,
        //
        beforeBuildLabels: noop$1,
        buildLabels: function() {
          var me = this;
          var labelOpts = me.options.labels || {};
          var legendItems = helpers$1.callback(labelOpts.generateLabels, [me.chart], me) || [];
          if (labelOpts.filter) {
            legendItems = legendItems.filter(function(item) {
              return labelOpts.filter(item, me.chart.data);
            });
          }
          if (me.options.reverse) {
            legendItems.reverse();
          }
          me.legendItems = legendItems;
        },
        afterBuildLabels: noop$1,
        //
        beforeFit: noop$1,
        fit: function() {
          var me = this;
          var opts = me.options;
          var labelOpts = opts.labels;
          var display = opts.display;
          var ctx = me.ctx;
          var labelFont = helpers$1.options._parseFont(labelOpts);
          var fontSize = labelFont.size;
          var hitboxes = me.legendHitBoxes = [];
          var minSize = me.minSize;
          var isHorizontal = me.isHorizontal();
          if (isHorizontal) {
            minSize.width = me.maxWidth;
            minSize.height = display ? 10 : 0;
          } else {
            minSize.width = display ? 10 : 0;
            minSize.height = me.maxHeight;
          }
          if (!display) {
            me.width = minSize.width = me.height = minSize.height = 0;
            return;
          }
          ctx.font = labelFont.string;
          if (isHorizontal) {
            var lineWidths = me.lineWidths = [0];
            var totalHeight = 0;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            helpers$1.each(me.legendItems, function(legendItem, i) {
              var boxWidth = getBoxWidth(labelOpts, fontSize);
              var width = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
              if (i === 0 || lineWidths[lineWidths.length - 1] + width + 2 * labelOpts.padding > minSize.width) {
                totalHeight += fontSize + labelOpts.padding;
                lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
              }
              hitboxes[i] = {
                left: 0,
                top: 0,
                width,
                height: fontSize
              };
              lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
            });
            minSize.height += totalHeight;
          } else {
            var vPadding = labelOpts.padding;
            var columnWidths = me.columnWidths = [];
            var columnHeights = me.columnHeights = [];
            var totalWidth = labelOpts.padding;
            var currentColWidth = 0;
            var currentColHeight = 0;
            helpers$1.each(me.legendItems, function(legendItem, i) {
              var boxWidth = getBoxWidth(labelOpts, fontSize);
              var itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
              if (i > 0 && currentColHeight + fontSize + 2 * vPadding > minSize.height) {
                totalWidth += currentColWidth + labelOpts.padding;
                columnWidths.push(currentColWidth);
                columnHeights.push(currentColHeight);
                currentColWidth = 0;
                currentColHeight = 0;
              }
              currentColWidth = Math.max(currentColWidth, itemWidth);
              currentColHeight += fontSize + vPadding;
              hitboxes[i] = {
                left: 0,
                top: 0,
                width: itemWidth,
                height: fontSize
              };
            });
            totalWidth += currentColWidth;
            columnWidths.push(currentColWidth);
            columnHeights.push(currentColHeight);
            minSize.width += totalWidth;
          }
          me.width = minSize.width;
          me.height = minSize.height;
        },
        afterFit: noop$1,
        // Shared Methods
        isHorizontal: function() {
          return this.options.position === "top" || this.options.position === "bottom";
        },
        // Actually draw the legend on the canvas
        draw: function() {
          var me = this;
          var opts = me.options;
          var labelOpts = opts.labels;
          var globalDefaults = core_defaults.global;
          var defaultColor2 = globalDefaults.defaultColor;
          var lineDefault = globalDefaults.elements.line;
          var legendHeight = me.height;
          var columnHeights = me.columnHeights;
          var legendWidth = me.width;
          var lineWidths = me.lineWidths;
          if (!opts.display) {
            return;
          }
          var rtlHelper = getRtlHelper$1(opts.rtl, me.left, me.minSize.width);
          var ctx = me.ctx;
          var fontColor = valueOrDefault$e(labelOpts.fontColor, globalDefaults.defaultFontColor);
          var labelFont = helpers$1.options._parseFont(labelOpts);
          var fontSize = labelFont.size;
          var cursor;
          ctx.textAlign = rtlHelper.textAlign("left");
          ctx.textBaseline = "middle";
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = fontColor;
          ctx.fillStyle = fontColor;
          ctx.font = labelFont.string;
          var boxWidth = getBoxWidth(labelOpts, fontSize);
          var hitboxes = me.legendHitBoxes;
          var drawLegendBox = function(x, y, legendItem) {
            if (isNaN(boxWidth) || boxWidth <= 0) {
              return;
            }
            ctx.save();
            var lineWidth = valueOrDefault$e(legendItem.lineWidth, lineDefault.borderWidth);
            ctx.fillStyle = valueOrDefault$e(legendItem.fillStyle, defaultColor2);
            ctx.lineCap = valueOrDefault$e(legendItem.lineCap, lineDefault.borderCapStyle);
            ctx.lineDashOffset = valueOrDefault$e(legendItem.lineDashOffset, lineDefault.borderDashOffset);
            ctx.lineJoin = valueOrDefault$e(legendItem.lineJoin, lineDefault.borderJoinStyle);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = valueOrDefault$e(legendItem.strokeStyle, defaultColor2);
            if (ctx.setLineDash) {
              ctx.setLineDash(valueOrDefault$e(legendItem.lineDash, lineDefault.borderDash));
            }
            if (labelOpts && labelOpts.usePointStyle) {
              var radius = boxWidth * Math.SQRT2 / 2;
              var centerX = rtlHelper.xPlus(x, boxWidth / 2);
              var centerY = y + fontSize / 2;
              helpers$1.canvas.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY, legendItem.rotation);
            } else {
              ctx.fillRect(rtlHelper.leftForLtr(x, boxWidth), y, boxWidth, fontSize);
              if (lineWidth !== 0) {
                ctx.strokeRect(rtlHelper.leftForLtr(x, boxWidth), y, boxWidth, fontSize);
              }
            }
            ctx.restore();
          };
          var fillText2 = function(x, y, legendItem, textWidth) {
            var halfFontSize = fontSize / 2;
            var xLeft = rtlHelper.xPlus(x, boxWidth + halfFontSize);
            var yMiddle = y + halfFontSize;
            ctx.fillText(legendItem.text, xLeft, yMiddle);
            if (legendItem.hidden) {
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.moveTo(xLeft, yMiddle);
              ctx.lineTo(rtlHelper.xPlus(xLeft, textWidth), yMiddle);
              ctx.stroke();
            }
          };
          var alignmentOffset = function(dimension, blockSize) {
            switch (opts.align) {
              case "start":
                return labelOpts.padding;
              case "end":
                return dimension - blockSize;
              default:
                return (dimension - blockSize + labelOpts.padding) / 2;
            }
          };
          var isHorizontal = me.isHorizontal();
          if (isHorizontal) {
            cursor = {
              x: me.left + alignmentOffset(legendWidth, lineWidths[0]),
              y: me.top + labelOpts.padding,
              line: 0
            };
          } else {
            cursor = {
              x: me.left + labelOpts.padding,
              y: me.top + alignmentOffset(legendHeight, columnHeights[0]),
              line: 0
            };
          }
          helpers$1.rtl.overrideTextDirection(me.ctx, opts.textDirection);
          var itemHeight = fontSize + labelOpts.padding;
          helpers$1.each(me.legendItems, function(legendItem, i) {
            var textWidth = ctx.measureText(legendItem.text).width;
            var width = boxWidth + fontSize / 2 + textWidth;
            var x = cursor.x;
            var y = cursor.y;
            rtlHelper.setWidth(me.minSize.width);
            if (isHorizontal) {
              if (i > 0 && x + width + labelOpts.padding > me.left + me.minSize.width) {
                y = cursor.y += itemHeight;
                cursor.line++;
                x = cursor.x = me.left + alignmentOffset(legendWidth, lineWidths[cursor.line]);
              }
            } else if (i > 0 && y + itemHeight > me.top + me.minSize.height) {
              x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
              cursor.line++;
              y = cursor.y = me.top + alignmentOffset(legendHeight, columnHeights[cursor.line]);
            }
            var realX = rtlHelper.x(x);
            drawLegendBox(realX, y, legendItem);
            hitboxes[i].left = rtlHelper.leftForLtr(realX, hitboxes[i].width);
            hitboxes[i].top = y;
            fillText2(realX, y, legendItem, textWidth);
            if (isHorizontal) {
              cursor.x += width + labelOpts.padding;
            } else {
              cursor.y += itemHeight;
            }
          });
          helpers$1.rtl.restoreTextDirection(me.ctx, opts.textDirection);
        },
        /**
         * @private
         */
        _getLegendItemAt: function(x, y) {
          var me = this;
          var i, hitBox, lh;
          if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
            lh = me.legendHitBoxes;
            for (i = 0; i < lh.length; ++i) {
              hitBox = lh[i];
              if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
                return me.legendItems[i];
              }
            }
          }
          return null;
        },
        /**
         * Handle an event
         * @private
         * @param {IEvent} event - The event to handle
         */
        handleEvent: function(e) {
          var me = this;
          var opts = me.options;
          var type = e.type === "mouseup" ? "click" : e.type;
          var hoveredItem;
          if (type === "mousemove") {
            if (!opts.onHover && !opts.onLeave) {
              return;
            }
          } else if (type === "click") {
            if (!opts.onClick) {
              return;
            }
          } else {
            return;
          }
          hoveredItem = me._getLegendItemAt(e.x, e.y);
          if (type === "click") {
            if (hoveredItem && opts.onClick) {
              opts.onClick.call(me, e.native, hoveredItem);
            }
          } else {
            if (opts.onLeave && hoveredItem !== me._hoveredItem) {
              if (me._hoveredItem) {
                opts.onLeave.call(me, e.native, me._hoveredItem);
              }
              me._hoveredItem = hoveredItem;
            }
            if (opts.onHover && hoveredItem) {
              opts.onHover.call(me, e.native, hoveredItem);
            }
          }
        }
      });
      function createNewLegendAndAttach(chart, legendOpts) {
        var legend2 = new Legend({
          ctx: chart.ctx,
          options: legendOpts,
          chart
        });
        core_layouts.configure(chart, legend2, legendOpts);
        core_layouts.addBox(chart, legend2);
        chart.legend = legend2;
      }
      var plugin_legend = {
        id: "legend",
        /**
         * Backward compatibility: since 2.1.5, the legend is registered as a plugin, making
         * Chart.Legend obsolete. To avoid a breaking change, we export the Legend as part of
         * the plugin, which one will be re-exposed in the chart.js file.
         * https://github.com/chartjs/Chart.js/pull/2640
         * @private
         */
        _element: Legend,
        beforeInit: function(chart) {
          var legendOpts = chart.options.legend;
          if (legendOpts) {
            createNewLegendAndAttach(chart, legendOpts);
          }
        },
        beforeUpdate: function(chart) {
          var legendOpts = chart.options.legend;
          var legend2 = chart.legend;
          if (legendOpts) {
            helpers$1.mergeIf(legendOpts, core_defaults.global.legend);
            if (legend2) {
              core_layouts.configure(chart, legend2, legendOpts);
              legend2.options = legendOpts;
            } else {
              createNewLegendAndAttach(chart, legendOpts);
            }
          } else if (legend2) {
            core_layouts.removeBox(chart, legend2);
            delete chart.legend;
          }
        },
        afterEvent: function(chart, e) {
          var legend2 = chart.legend;
          if (legend2) {
            legend2.handleEvent(e);
          }
        }
      };
      var noop$2 = helpers$1.noop;
      core_defaults._set("global", {
        title: {
          display: false,
          fontStyle: "bold",
          fullWidth: true,
          padding: 10,
          position: "top",
          text: "",
          weight: 2e3
          // by default greater than legend (1000) to be above
        }
      });
      var Title = core_element.extend({
        initialize: function(config) {
          var me = this;
          helpers$1.extend(me, config);
          me.legendHitBoxes = [];
        },
        // These methods are ordered by lifecycle. Utilities then follow.
        beforeUpdate: noop$2,
        update: function(maxWidth, maxHeight, margins) {
          var me = this;
          me.beforeUpdate();
          me.maxWidth = maxWidth;
          me.maxHeight = maxHeight;
          me.margins = margins;
          me.beforeSetDimensions();
          me.setDimensions();
          me.afterSetDimensions();
          me.beforeBuildLabels();
          me.buildLabels();
          me.afterBuildLabels();
          me.beforeFit();
          me.fit();
          me.afterFit();
          me.afterUpdate();
          return me.minSize;
        },
        afterUpdate: noop$2,
        //
        beforeSetDimensions: noop$2,
        setDimensions: function() {
          var me = this;
          if (me.isHorizontal()) {
            me.width = me.maxWidth;
            me.left = 0;
            me.right = me.width;
          } else {
            me.height = me.maxHeight;
            me.top = 0;
            me.bottom = me.height;
          }
          me.paddingLeft = 0;
          me.paddingTop = 0;
          me.paddingRight = 0;
          me.paddingBottom = 0;
          me.minSize = {
            width: 0,
            height: 0
          };
        },
        afterSetDimensions: noop$2,
        //
        beforeBuildLabels: noop$2,
        buildLabels: noop$2,
        afterBuildLabels: noop$2,
        //
        beforeFit: noop$2,
        fit: function() {
          var me = this;
          var opts = me.options;
          var minSize = me.minSize = {};
          var isHorizontal = me.isHorizontal();
          var lineCount, textSize;
          if (!opts.display) {
            me.width = minSize.width = me.height = minSize.height = 0;
            return;
          }
          lineCount = helpers$1.isArray(opts.text) ? opts.text.length : 1;
          textSize = lineCount * helpers$1.options._parseFont(opts).lineHeight + opts.padding * 2;
          me.width = minSize.width = isHorizontal ? me.maxWidth : textSize;
          me.height = minSize.height = isHorizontal ? textSize : me.maxHeight;
        },
        afterFit: noop$2,
        // Shared Methods
        isHorizontal: function() {
          var pos = this.options.position;
          return pos === "top" || pos === "bottom";
        },
        // Actually draw the title block on the canvas
        draw: function() {
          var me = this;
          var ctx = me.ctx;
          var opts = me.options;
          if (!opts.display) {
            return;
          }
          var fontOpts = helpers$1.options._parseFont(opts);
          var lineHeight = fontOpts.lineHeight;
          var offset = lineHeight / 2 + opts.padding;
          var rotation = 0;
          var top = me.top;
          var left = me.left;
          var bottom = me.bottom;
          var right = me.right;
          var maxWidth, titleX, titleY;
          ctx.fillStyle = helpers$1.valueOrDefault(opts.fontColor, core_defaults.global.defaultFontColor);
          ctx.font = fontOpts.string;
          if (me.isHorizontal()) {
            titleX = left + (right - left) / 2;
            titleY = top + offset;
            maxWidth = right - left;
          } else {
            titleX = opts.position === "left" ? left + offset : right - offset;
            titleY = top + (bottom - top) / 2;
            maxWidth = bottom - top;
            rotation = Math.PI * (opts.position === "left" ? -0.5 : 0.5);
          }
          ctx.save();
          ctx.translate(titleX, titleY);
          ctx.rotate(rotation);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          var text = opts.text;
          if (helpers$1.isArray(text)) {
            var y = 0;
            for (var i = 0; i < text.length; ++i) {
              ctx.fillText(text[i], 0, y, maxWidth);
              y += lineHeight;
            }
          } else {
            ctx.fillText(text, 0, 0, maxWidth);
          }
          ctx.restore();
        }
      });
      function createNewTitleBlockAndAttach(chart, titleOpts) {
        var title2 = new Title({
          ctx: chart.ctx,
          options: titleOpts,
          chart
        });
        core_layouts.configure(chart, title2, titleOpts);
        core_layouts.addBox(chart, title2);
        chart.titleBlock = title2;
      }
      var plugin_title = {
        id: "title",
        /**
         * Backward compatibility: since 2.1.5, the title is registered as a plugin, making
         * Chart.Title obsolete. To avoid a breaking change, we export the Title as part of
         * the plugin, which one will be re-exposed in the chart.js file.
         * https://github.com/chartjs/Chart.js/pull/2640
         * @private
         */
        _element: Title,
        beforeInit: function(chart) {
          var titleOpts = chart.options.title;
          if (titleOpts) {
            createNewTitleBlockAndAttach(chart, titleOpts);
          }
        },
        beforeUpdate: function(chart) {
          var titleOpts = chart.options.title;
          var titleBlock = chart.titleBlock;
          if (titleOpts) {
            helpers$1.mergeIf(titleOpts, core_defaults.global.title);
            if (titleBlock) {
              core_layouts.configure(chart, titleBlock, titleOpts);
              titleBlock.options = titleOpts;
            } else {
              createNewTitleBlockAndAttach(chart, titleOpts);
            }
          } else if (titleBlock) {
            core_layouts.removeBox(chart, titleBlock);
            delete chart.titleBlock;
          }
        }
      };
      var plugins = {};
      var filler = plugin_filler;
      var legend = plugin_legend;
      var title = plugin_title;
      plugins.filler = filler;
      plugins.legend = legend;
      plugins.title = title;
      core_controller.helpers = helpers$1;
      core_helpers();
      core_controller._adapters = core_adapters;
      core_controller.Animation = core_animation;
      core_controller.animationService = core_animations;
      core_controller.controllers = controllers;
      core_controller.DatasetController = core_datasetController;
      core_controller.defaults = core_defaults;
      core_controller.Element = core_element;
      core_controller.elements = elements;
      core_controller.Interaction = core_interaction;
      core_controller.layouts = core_layouts;
      core_controller.platform = platform;
      core_controller.plugins = core_plugins;
      core_controller.Scale = core_scale;
      core_controller.scaleService = core_scaleService;
      core_controller.Ticks = core_ticks;
      core_controller.Tooltip = core_tooltip;
      core_controller.helpers.each(scales, function(scale2, type) {
        core_controller.scaleService.registerScaleType(type, scale2, scale2._defaults);
      });
      for (var k in plugins) {
        if (plugins.hasOwnProperty(k)) {
          core_controller.plugins.register(plugins[k]);
        }
      }
      core_controller.platform.initialize();
      var src = core_controller;
      if (typeof window !== "undefined") {
        window.Chart = core_controller;
      }
      core_controller.Chart = core_controller;
      core_controller.Legend = plugins.legend._element;
      core_controller.Title = plugins.title._element;
      core_controller.pluginService = core_controller.plugins;
      core_controller.PluginBase = core_controller.Element.extend({});
      core_controller.canvasHelpers = core_controller.helpers.canvas;
      core_controller.layoutService = core_controller.layouts;
      core_controller.LinearScaleBase = scale_linearbase;
      core_controller.helpers.each(
        [
          "Bar",
          "Bubble",
          "Doughnut",
          "Line",
          "PolarArea",
          "Radar",
          "Scatter"
        ],
        function(klass) {
          core_controller[klass] = function(ctx, cfg) {
            return new core_controller(ctx, core_controller.helpers.merge(cfg || {}, {
              type: klass.charAt(0).toLowerCase() + klass.slice(1)
            }));
          };
        }
      );
      return src;
    });
  }
});

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
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
    module.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    module.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "node_modules/lodash/_stackClear.js"(exports, module) {
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  }
});

// node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "node_modules/lodash/_stackDelete.js"(exports, module) {
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  }
});

// node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "node_modules/lodash/_stackGet.js"(exports, module) {
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  }
});

// node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "node_modules/lodash/_stackHas.js"(exports, module) {
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
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
    module.exports = getRawTag;
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports, module) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports, module) {
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
    module.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Map = getNative(root, "Map");
    module.exports = Map;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "node_modules/lodash/_stackSet.js"(exports, module) {
    var ListCache = require_ListCache();
    var Map = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    module.exports = stackSet;
  }
});

// node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "node_modules/lodash/_Stack.js"(exports, module) {
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }
});

// node_modules/lodash/_setCacheAdd.js
var require_setCacheAdd = __commonJS({
  "node_modules/lodash/_setCacheAdd.js"(exports, module) {
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    module.exports = setCacheAdd;
  }
});

// node_modules/lodash/_setCacheHas.js
var require_setCacheHas = __commonJS({
  "node_modules/lodash/_setCacheHas.js"(exports, module) {
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    module.exports = setCacheHas;
  }
});

// node_modules/lodash/_SetCache.js
var require_SetCache = __commonJS({
  "node_modules/lodash/_SetCache.js"(exports, module) {
    var MapCache = require_MapCache();
    var setCacheAdd = require_setCacheAdd();
    var setCacheHas = require_setCacheHas();
    function SetCache(values) {
      var index = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    module.exports = SetCache;
  }
});

// node_modules/lodash/_arraySome.js
var require_arraySome = __commonJS({
  "node_modules/lodash/_arraySome.js"(exports, module) {
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    module.exports = arraySome;
  }
});

// node_modules/lodash/_cacheHas.js
var require_cacheHas = __commonJS({
  "node_modules/lodash/_cacheHas.js"(exports, module) {
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    module.exports = cacheHas;
  }
});

// node_modules/lodash/_equalArrays.js
var require_equalArrays = __commonJS({
  "node_modules/lodash/_equalArrays.js"(exports, module) {
    var SetCache = require_SetCache();
    var arraySome = require_arraySome();
    var cacheHas = require_cacheHas();
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
      var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
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
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
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
    module.exports = equalArrays;
  }
});

// node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "node_modules/lodash/_Uint8Array.js"(exports, module) {
    var root = require_root();
    var Uint8Array = root.Uint8Array;
    module.exports = Uint8Array;
  }
});

// node_modules/lodash/_mapToArray.js
var require_mapToArray = __commonJS({
  "node_modules/lodash/_mapToArray.js"(exports, module) {
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    module.exports = mapToArray;
  }
});

// node_modules/lodash/_setToArray.js
var require_setToArray = __commonJS({
  "node_modules/lodash/_setToArray.js"(exports, module) {
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    module.exports = setToArray;
  }
});

// node_modules/lodash/_equalByTag.js
var require_equalByTag = __commonJS({
  "node_modules/lodash/_equalByTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var Uint8Array = require_Uint8Array();
    var eq = require_eq();
    var equalArrays = require_equalArrays();
    var mapToArray = require_mapToArray();
    var setToArray = require_setToArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
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
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    module.exports = equalByTag;
  }
});

// node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "node_modules/lodash/_arrayPush.js"(exports, module) {
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    module.exports = arrayPush;
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports, module) {
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isArray = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module.exports = baseGetAllKeys;
  }
});

// node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "node_modules/lodash/_arrayFilter.js"(exports, module) {
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
    module.exports = arrayFilter;
  }
});

// node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "node_modules/lodash/stubArray.js"(exports, module) {
    function stubArray() {
      return [];
    }
    module.exports = stubArray;
  }
});

// node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "node_modules/lodash/_getSymbols.js"(exports, module) {
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module.exports = getSymbols;
  }
});

// node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "node_modules/lodash/_baseTimes.js"(exports, module) {
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "node_modules/lodash/_baseIsArguments.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/lodash/isArguments.js"(exports, module) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "node_modules/lodash/stubFalse.js"(exports, module) {
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});

// node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "node_modules/lodash/isBuffer.js"(exports, module) {
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }
});

// node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "node_modules/lodash/isLength.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
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
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});

// node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "node_modules/lodash/_baseUnary.js"(exports, module) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "node_modules/lodash/_nodeUtil.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    module.exports = nodeUtil;
  }
});

// node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "node_modules/lodash/isTypedArray.js"(exports, module) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }
});

// node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "node_modules/lodash/_isPrototype.js"(exports, module) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});

// node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "node_modules/lodash/_overArg.js"(exports, module) {
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module.exports = overArg;
  }
});

// node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "node_modules/lodash/_nativeKeys.js"(exports, module) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});

// node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "node_modules/lodash/_baseKeys.js"(exports, module) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});

// node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/lodash/isArrayLike.js"(exports, module) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// node_modules/lodash/keys.js
var require_keys = __commonJS({
  "node_modules/lodash/keys.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});

// node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "node_modules/lodash/_getAllKeys.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module.exports = getAllKeys;
  }
});

// node_modules/lodash/_equalObjects.js
var require_equalObjects = __commonJS({
  "node_modules/lodash/_equalObjects.js"(exports, module) {
    var getAllKeys = require_getAllKeys();
    var COMPARE_PARTIAL_FLAG = 1;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
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
    module.exports = equalObjects;
  }
});

// node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "node_modules/lodash/_DataView.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var DataView = getNative(root, "DataView");
    module.exports = DataView;
  }
});

// node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "node_modules/lodash/_Promise.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module.exports = Promise2;
  }
});

// node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "node_modules/lodash/_Set.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Set = getNative(root, "Set");
    module.exports = Set;
  }
});

// node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "node_modules/lodash/_WeakMap.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap = getNative(root, "WeakMap");
    module.exports = WeakMap;
  }
});

// node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "node_modules/lodash/_getTag.js"(exports, module) {
    var DataView = require_DataView();
    var Map = require_Map();
    var Promise2 = require_Promise();
    var Set = require_Set();
    var WeakMap = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set);
    var weakMapCtorString = toSource(WeakMap);
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module.exports = getTag;
  }
});

// node_modules/lodash/_baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
    var Stack = require_Stack();
    var equalArrays = require_equalArrays();
    var equalByTag = require_equalByTag();
    var equalObjects = require_equalObjects();
    var getTag = require_getTag();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isTypedArray = require_isTypedArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    module.exports = baseIsEqualDeep;
  }
});

// node_modules/lodash/_baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "node_modules/lodash/_baseIsEqual.js"(exports, module) {
    var baseIsEqualDeep = require_baseIsEqualDeep();
    var isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    module.exports = baseIsEqual;
  }
});

// node_modules/lodash/isEqual.js
var require_isEqual = __commonJS({
  "node_modules/lodash/isEqual.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }
    module.exports = isEqual;
  }
});

// node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "node_modules/lodash/_defineProperty.js"(exports, module) {
    var getNative = require_getNative();
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    }();
    module.exports = defineProperty;
  }
});

// node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// node_modules/lodash/_arrayAggregator.js
var require_arrayAggregator = __commonJS({
  "node_modules/lodash/_arrayAggregator.js"(exports, module) {
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }
    module.exports = arrayAggregator;
  }
});

// node_modules/lodash/_createBaseFor.js
var require_createBaseFor = __commonJS({
  "node_modules/lodash/_createBaseFor.js"(exports, module) {
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
    module.exports = createBaseFor;
  }
});

// node_modules/lodash/_baseFor.js
var require_baseFor = __commonJS({
  "node_modules/lodash/_baseFor.js"(exports, module) {
    var createBaseFor = require_createBaseFor();
    var baseFor = createBaseFor();
    module.exports = baseFor;
  }
});

// node_modules/lodash/_baseForOwn.js
var require_baseForOwn = __commonJS({
  "node_modules/lodash/_baseForOwn.js"(exports, module) {
    var baseFor = require_baseFor();
    var keys = require_keys();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    module.exports = baseForOwn;
  }
});

// node_modules/lodash/_createBaseEach.js
var require_createBaseEach = __commonJS({
  "node_modules/lodash/_createBaseEach.js"(exports, module) {
    var isArrayLike = require_isArrayLike();
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
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
    module.exports = createBaseEach;
  }
});

// node_modules/lodash/_baseEach.js
var require_baseEach = __commonJS({
  "node_modules/lodash/_baseEach.js"(exports, module) {
    var baseForOwn = require_baseForOwn();
    var createBaseEach = require_createBaseEach();
    var baseEach = createBaseEach(baseForOwn);
    module.exports = baseEach;
  }
});

// node_modules/lodash/_baseAggregator.js
var require_baseAggregator = __commonJS({
  "node_modules/lodash/_baseAggregator.js"(exports, module) {
    var baseEach = require_baseEach();
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection2) {
        setter(accumulator, value, iteratee(value), collection2);
      });
      return accumulator;
    }
    module.exports = baseAggregator;
  }
});

// node_modules/lodash/_baseIsMatch.js
var require_baseIsMatch = __commonJS({
  "node_modules/lodash/_baseIsMatch.js"(exports, module) {
    var Stack = require_Stack();
    var baseIsEqual = require_baseIsEqual();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
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
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    module.exports = baseIsMatch;
  }
});

// node_modules/lodash/_isStrictComparable.js
var require_isStrictComparable = __commonJS({
  "node_modules/lodash/_isStrictComparable.js"(exports, module) {
    var isObject = require_isObject();
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    module.exports = isStrictComparable;
  }
});

// node_modules/lodash/_getMatchData.js
var require_getMatchData = __commonJS({
  "node_modules/lodash/_getMatchData.js"(exports, module) {
    var isStrictComparable = require_isStrictComparable();
    var keys = require_keys();
    function getMatchData(object) {
      var result = keys(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    module.exports = getMatchData;
  }
});

// node_modules/lodash/_matchesStrictComparable.js
var require_matchesStrictComparable = __commonJS({
  "node_modules/lodash/_matchesStrictComparable.js"(exports, module) {
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    module.exports = matchesStrictComparable;
  }
});

// node_modules/lodash/_baseMatches.js
var require_baseMatches = __commonJS({
  "node_modules/lodash/_baseMatches.js"(exports, module) {
    var baseIsMatch = require_baseIsMatch();
    var getMatchData = require_getMatchData();
    var matchesStrictComparable = require_matchesStrictComparable();
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    module.exports = baseMatches;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "node_modules/lodash/_isKey.js"(exports, module) {
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey;
  }
});

// node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "node_modules/lodash/memoize.js"(exports, module) {
    var MapCache = require_MapCache();
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
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    module.exports = memoize;
  }
});

// node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "node_modules/lodash/_memoizeCapped.js"(exports, module) {
    var memoize = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });
      var cache = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "node_modules/lodash/_stringToPath.js"(exports, module) {
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    module.exports = stringToPath;
  }
});

// node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// node_modules/lodash/toString.js
var require_toString = __commonJS({
  "node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "node_modules/lodash/_castPath.js"(exports, module) {
    var isArray = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module.exports = castPath;
  }
});

// node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "node_modules/lodash/_toKey.js"(exports, module) {
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "node_modules/lodash/_baseGet.js"(exports, module) {
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path) {
      path = castPath(path, object);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    module.exports = baseGet;
  }
});

// node_modules/lodash/get.js
var require_get = __commonJS({
  "node_modules/lodash/get.js"(exports, module) {
    var baseGet = require_baseGet();
    function get(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module.exports = get;
  }
});

// node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "node_modules/lodash/_baseHasIn.js"(exports, module) {
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module.exports = baseHasIn;
  }
});

// node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "node_modules/lodash/_hasPath.js"(exports, module) {
    var castPath = require_castPath();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var toKey = require_toKey();
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);
      var index = -1, length = path.length, result = false;
      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    }
    module.exports = hasPath;
  }
});

// node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "node_modules/lodash/hasIn.js"(exports, module) {
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    module.exports = hasIn;
  }
});

// node_modules/lodash/_baseMatchesProperty.js
var require_baseMatchesProperty = __commonJS({
  "node_modules/lodash/_baseMatchesProperty.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    var get = require_get();
    var hasIn = require_hasIn();
    var isKey = require_isKey();
    var isStrictComparable = require_isStrictComparable();
    var matchesStrictComparable = require_matchesStrictComparable();
    var toKey = require_toKey();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }
    module.exports = baseMatchesProperty;
  }
});

// node_modules/lodash/identity.js
var require_identity = __commonJS({
  "node_modules/lodash/identity.js"(exports, module) {
    function identity(value) {
      return value;
    }
    module.exports = identity;
  }
});

// node_modules/lodash/_baseProperty.js
var require_baseProperty = __commonJS({
  "node_modules/lodash/_baseProperty.js"(exports, module) {
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    module.exports = baseProperty;
  }
});

// node_modules/lodash/_basePropertyDeep.js
var require_basePropertyDeep = __commonJS({
  "node_modules/lodash/_basePropertyDeep.js"(exports, module) {
    var baseGet = require_baseGet();
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }
    module.exports = basePropertyDeep;
  }
});

// node_modules/lodash/property.js
var require_property = __commonJS({
  "node_modules/lodash/property.js"(exports, module) {
    var baseProperty = require_baseProperty();
    var basePropertyDeep = require_basePropertyDeep();
    var isKey = require_isKey();
    var toKey = require_toKey();
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    module.exports = property;
  }
});

// node_modules/lodash/_baseIteratee.js
var require_baseIteratee = __commonJS({
  "node_modules/lodash/_baseIteratee.js"(exports, module) {
    var baseMatches = require_baseMatches();
    var baseMatchesProperty = require_baseMatchesProperty();
    var identity = require_identity();
    var isArray = require_isArray();
    var property = require_property();
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == "object") {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    module.exports = baseIteratee;
  }
});

// node_modules/lodash/_createAggregator.js
var require_createAggregator = __commonJS({
  "node_modules/lodash/_createAggregator.js"(exports, module) {
    var arrayAggregator = require_arrayAggregator();
    var baseAggregator = require_baseAggregator();
    var baseIteratee = require_baseIteratee();
    var isArray = require_isArray();
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
        return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
      };
    }
    module.exports = createAggregator;
  }
});

// node_modules/lodash/keyBy.js
var require_keyBy = __commonJS({
  "node_modules/lodash/keyBy.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var createAggregator = require_createAggregator();
    var keyBy = createAggregator(function(result, value, key) {
      baseAssignValue(result, key, value);
    });
    module.exports = keyBy;
  }
});

// node_modules/react-chartjs-2/es/index.js
var require_es = __commonJS({
  "node_modules/react-chartjs-2/es/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "Chart", {
      enumerable: true,
      get: function get() {
        return _chart["default"];
      }
    });
    exports.defaults = exports.Scatter = exports.Bubble = exports.Polar = exports.Radar = exports.HorizontalBar = exports.Bar = exports.Line = exports.Pie = exports.Doughnut = exports["default"] = void 0;
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _chart = _interopRequireDefault(require_Chart());
    var _isEqual = _interopRequireDefault(require_isEqual());
    var _keyBy = _interopRequireDefault(require_keyBy());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _extends() {
      _extends = Object.assign || function(target) {
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
      return _extends.apply(this, arguments);
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
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
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null)
        return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        target[key] = source[key];
      }
      return target;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self2);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var NODE_ENV = typeof process !== "undefined" && process.env && "development";
    var ChartComponent = function(_React$Component) {
      _inherits(ChartComponent2, _React$Component);
      var _super = _createSuper(ChartComponent2);
      function ChartComponent2() {
        var _this;
        _classCallCheck(this, ChartComponent2);
        _this = _super.call(this);
        _defineProperty(_assertThisInitialized(_this), "handleOnClick", function(event) {
          var instance = _this.chartInstance;
          var _this$props = _this.props, getDatasetAtEvent = _this$props.getDatasetAtEvent, getElementAtEvent = _this$props.getElementAtEvent, getElementsAtEvent = _this$props.getElementsAtEvent, onElementsClick = _this$props.onElementsClick;
          getDatasetAtEvent && getDatasetAtEvent(instance.getDatasetAtEvent(event), event);
          getElementAtEvent && getElementAtEvent(instance.getElementAtEvent(event), event);
          getElementsAtEvent && getElementsAtEvent(instance.getElementsAtEvent(event), event);
          onElementsClick && onElementsClick(instance.getElementsAtEvent(event), event);
        });
        _defineProperty(_assertThisInitialized(_this), "ref", function(element) {
          _this.element = element;
        });
        _this.chartInstance = void 0;
        return _this;
      }
      _createClass(ChartComponent2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.renderChart();
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          if (this.props.redraw) {
            this.destroyChart();
            this.renderChart();
            return;
          }
          this.updateChart();
        }
      }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
          var _this$props2 = this.props, redraw = _this$props2.redraw, type = _this$props2.type, options = _this$props2.options, plugins = _this$props2.plugins, legend = _this$props2.legend, height = _this$props2.height, width = _this$props2.width;
          if (nextProps.redraw === true) {
            return true;
          }
          if (height !== nextProps.height || width !== nextProps.width) {
            return true;
          }
          if (type !== nextProps.type) {
            return true;
          }
          if (!(0, _isEqual["default"])(legend, nextProps.legend)) {
            return true;
          }
          if (!(0, _isEqual["default"])(options, nextProps.options)) {
            return true;
          }
          var nextData = this.transformDataProp(nextProps);
          if (!(0, _isEqual["default"])(this.shadowDataProp, nextData)) {
            return true;
          }
          return !(0, _isEqual["default"])(plugins, nextProps.plugins);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.destroyChart();
        }
      }, {
        key: "transformDataProp",
        value: function transformDataProp(props) {
          var data = props.data;
          if (typeof data == "function") {
            var node = this.element;
            return data(node);
          } else {
            return data;
          }
        }
        // Chart.js directly mutates the data.dataset objects by adding _meta proprerty
        // this makes impossible to compare the current and next data changes
        // therefore we memoize the data prop while sending a fake to Chart.js for mutation.
        // see https://github.com/chartjs/Chart.js/blob/master/src/core/core.controller.js#L615-L617
      }, {
        key: "memoizeDataProps",
        value: function memoizeDataProps() {
          if (!this.props.data) {
            return;
          }
          var data = this.transformDataProp(this.props);
          this.shadowDataProp = _objectSpread(_objectSpread({}, data), {}, {
            datasets: data.datasets && data.datasets.map(function(set) {
              return _objectSpread({}, set);
            })
          });
          this.saveCurrentDatasets();
          return data;
        }
      }, {
        key: "checkDatasets",
        value: function checkDatasets(datasets) {
          var isDev = NODE_ENV !== "production" && NODE_ENV !== "prod";
          var usingCustomKeyProvider = this.props.datasetKeyProvider !== ChartComponent2.getLabelAsKey;
          var multipleDatasets = datasets.length > 1;
          if (isDev && multipleDatasets && !usingCustomKeyProvider) {
            var shouldWarn = false;
            datasets.forEach(function(dataset) {
              if (!dataset.label) {
                shouldWarn = true;
              }
            });
            if (shouldWarn) {
              console.error('[react-chartjs-2] Warning: Each dataset needs a unique key. By default, the "label" property on each dataset is used. Alternatively, you may provide a "datasetKeyProvider" as a prop that returns a unique key.');
            }
          }
        }
      }, {
        key: "getCurrentDatasets",
        value: function getCurrentDatasets() {
          return this.chartInstance && this.chartInstance.config.data && this.chartInstance.config.data.datasets || [];
        }
      }, {
        key: "saveCurrentDatasets",
        value: function saveCurrentDatasets() {
          var _this2 = this;
          this.datasets = this.datasets || {};
          var currentDatasets = this.getCurrentDatasets();
          currentDatasets.forEach(function(d) {
            _this2.datasets[_this2.props.datasetKeyProvider(d)] = d;
          });
        }
      }, {
        key: "updateChart",
        value: function updateChart() {
          var _this3 = this;
          var options = this.props.options;
          var data = this.memoizeDataProps(this.props);
          if (!this.chartInstance)
            return;
          if (options) {
            this.chartInstance.options = _chart["default"].helpers.configMerge(this.chartInstance.options, options);
          }
          var currentDatasets = this.getCurrentDatasets();
          var nextDatasets = data.datasets || [];
          this.checkDatasets(currentDatasets);
          var currentDatasetsIndexed = (0, _keyBy["default"])(currentDatasets, this.props.datasetKeyProvider);
          this.chartInstance.config.data.datasets = nextDatasets.map(function(next) {
            var current = currentDatasetsIndexed[_this3.props.datasetKeyProvider(next)];
            if (current && current.type === next.type && next.data) {
              current.data.splice(next.data.length);
              next.data.forEach(function(point, pid) {
                current.data[pid] = next.data[pid];
              });
              var _data = next.data, otherProps = _objectWithoutProperties(next, ["data"]);
              return _objectSpread(_objectSpread({}, current), otherProps);
            } else {
              return next;
            }
          });
          var datasets = data.datasets, rest = _objectWithoutProperties(data, ["datasets"]);
          this.chartInstance.config.data = _objectSpread(_objectSpread({}, this.chartInstance.config.data), rest);
          this.chartInstance.update();
        }
      }, {
        key: "renderChart",
        value: function renderChart() {
          var _this$props3 = this.props, options = _this$props3.options, legend = _this$props3.legend, type = _this$props3.type, plugins = _this$props3.plugins;
          var node = this.element;
          var data = this.memoizeDataProps();
          if (typeof legend !== "undefined" && !(0, _isEqual["default"])(ChartComponent2.defaultProps.legend, legend)) {
            options.legend = legend;
          }
          this.chartInstance = new _chart["default"](node, {
            type,
            data,
            options,
            plugins
          });
        }
      }, {
        key: "destroyChart",
        value: function destroyChart() {
          if (!this.chartInstance) {
            return;
          }
          this.saveCurrentDatasets();
          var datasets = Object.values(this.datasets);
          this.chartInstance.config.data.datasets = datasets;
          this.chartInstance.destroy();
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props4 = this.props, height = _this$props4.height, width = _this$props4.width, id = _this$props4.id;
          return _react["default"].createElement("canvas", {
            ref: this.ref,
            height,
            width,
            id,
            onClick: this.handleOnClick
          });
        }
      }]);
      return ChartComponent2;
    }(_react["default"].Component);
    _defineProperty(ChartComponent, "getLabelAsKey", function(d) {
      return d.label;
    });
    _defineProperty(ChartComponent, "propTypes", {
      data: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]).isRequired,
      getDatasetAtEvent: _propTypes["default"].func,
      getElementAtEvent: _propTypes["default"].func,
      getElementsAtEvent: _propTypes["default"].func,
      height: _propTypes["default"].number,
      legend: _propTypes["default"].object,
      onElementsClick: _propTypes["default"].func,
      options: _propTypes["default"].object,
      plugins: _propTypes["default"].arrayOf(_propTypes["default"].object),
      redraw: _propTypes["default"].bool,
      type: function type(props, propName, componentName) {
        if (!_chart["default"].controllers[props[propName]]) {
          return new Error("Invalid chart type `" + props[propName] + "` supplied to `" + componentName + "`.");
        }
      },
      width: _propTypes["default"].number,
      datasetKeyProvider: _propTypes["default"].func
    });
    _defineProperty(ChartComponent, "defaultProps", {
      legend: {
        display: true,
        position: "bottom"
      },
      type: "doughnut",
      height: 150,
      width: 300,
      redraw: false,
      options: {},
      datasetKeyProvider: ChartComponent.getLabelAsKey
    });
    var _default = ChartComponent;
    exports["default"] = _default;
    var Doughnut = function(_React$Component2) {
      _inherits(Doughnut2, _React$Component2);
      var _super2 = _createSuper(Doughnut2);
      function Doughnut2() {
        _classCallCheck(this, Doughnut2);
        return _super2.apply(this, arguments);
      }
      _createClass(Doughnut2, [{
        key: "render",
        value: function render() {
          var _this4 = this;
          return _react["default"].createElement(ChartComponent, _extends({}, this.props, {
            ref: function ref(_ref) {
              return _this4.chartInstance = _ref && _ref.chartInstance;
            },
            type: "doughnut"
          }));
        }
      }]);
      return Doughnut2;
    }(_react["default"].Component);
    exports.Doughnut = Doughnut;
    var Pie = function(_React$Component3) {
      _inherits(Pie2, _React$Component3);
      var _super3 = _createSuper(Pie2);
      function Pie2() {
        _classCallCheck(this, Pie2);
        return _super3.apply(this, arguments);
      }
      _createClass(Pie2, [{
        key: "render",
        value: function render() {
          var _this5 = this;
          return _react["default"].createElement(ChartComponent, _extends({}, this.props, {
            ref: function ref(_ref2) {
              return _this5.chartInstance = _ref2 && _ref2.chartInstance;
            },
            type: "pie"
          }));
        }
      }]);
      return Pie2;
    }(_react["default"].Component);
    exports.Pie = Pie;
    var Line = function(_React$Component4) {
      _inherits(Line2, _React$Component4);
      var _super4 = _createSuper(Line2);
      function Line2() {
        _classCallCheck(this, Line2);
        return _super4.apply(this, arguments);
      }
      _createClass(Line2, [{
        key: "render",
        value: function render() {
          var _this6 = this;
          return _react["default"].createElement(ChartComponent, _extends({}, this.props, {
            ref: function ref(_ref3) {
              return _this6.chartInstance = _ref3 && _ref3.chartInstance;
            },
            type: "line"
          }));
        }
      }]);
      return Line2;
    }(_react["default"].Component);
    exports.Line = Line;
    var Bar = function(_React$Component5) {
      _inherits(Bar2, _React$Component5);
      var _super5 = _createSuper(Bar2);
      function Bar2() {
        _classCallCheck(this, Bar2);
        return _super5.apply(this, arguments);
      }
      _createClass(Bar2, [{
        key: "render",
        value: function render() {
          var _this7 = this;
          return _react["default"].createElement(ChartComponent, _extends({}, this.props, {
            ref: function ref(_ref4) {
              return _this7.chartInstance = _ref4 && _ref4.chartInstance;
            },
            type: "bar"
          }));
        }
      }]);
      return Bar2;
    }(_react["default"].Component);
    exports.Bar = Bar;
    var HorizontalBar = function(_React$Component6) {
      _inherits(HorizontalBar2, _React$Component6);
      var _super6 = _createSuper(HorizontalBar2);
      function HorizontalBar2() {
        _classCallCheck(this, HorizontalBar2);
        return _super6.apply(this, arguments);
      }
      _createClass(HorizontalBar2, [{
        key: "render",
        value: function render() {
          var _this8 = this;
          return _react["default"].createElement(ChartComponent, _extends({}, this.props, {
            ref: function ref(_ref5) {
              return _this8.chartInstance = _ref5 && _ref5.chartInstance;
            },
            type: "horizontalBar"
          }));
        }
      }]);
      return HorizontalBar2;
    }(_react["default"].Component);
    exports.HorizontalBar = HorizontalBar;
    var Radar = function(_React$Component7) {
      _inherits(Radar2, _React$Component7);
      var _super7 = _createSuper(Radar2);
      function Radar2() {
        _classCallCheck(this, Radar2);
        return _super7.apply(this, arguments);
      }
      _createClass(Radar2, [{
        key: "render",
        value: function render() {
          var _this9 = this;
          return _react["default"].createElement(ChartComponent, _extends({}, this.props, {
            ref: function ref(_ref6) {
              return _this9.chartInstance = _ref6 && _ref6.chartInstance;
            },
            type: "radar"
          }));
        }
      }]);
      return Radar2;
    }(_react["default"].Component);
    exports.Radar = Radar;
    var Polar = function(_React$Component8) {
      _inherits(Polar2, _React$Component8);
      var _super8 = _createSuper(Polar2);
      function Polar2() {
        _classCallCheck(this, Polar2);
        return _super8.apply(this, arguments);
      }
      _createClass(Polar2, [{
        key: "render",
        value: function render() {
          var _this10 = this;
          return _react["default"].createElement(ChartComponent, _extends({}, this.props, {
            ref: function ref(_ref7) {
              return _this10.chartInstance = _ref7 && _ref7.chartInstance;
            },
            type: "polarArea"
          }));
        }
      }]);
      return Polar2;
    }(_react["default"].Component);
    exports.Polar = Polar;
    var Bubble = function(_React$Component9) {
      _inherits(Bubble2, _React$Component9);
      var _super9 = _createSuper(Bubble2);
      function Bubble2() {
        _classCallCheck(this, Bubble2);
        return _super9.apply(this, arguments);
      }
      _createClass(Bubble2, [{
        key: "render",
        value: function render() {
          var _this11 = this;
          return _react["default"].createElement(ChartComponent, _extends({}, this.props, {
            ref: function ref(_ref8) {
              return _this11.chartInstance = _ref8 && _ref8.chartInstance;
            },
            type: "bubble"
          }));
        }
      }]);
      return Bubble2;
    }(_react["default"].Component);
    exports.Bubble = Bubble;
    var Scatter = function(_React$Component10) {
      _inherits(Scatter2, _React$Component10);
      var _super10 = _createSuper(Scatter2);
      function Scatter2() {
        _classCallCheck(this, Scatter2);
        return _super10.apply(this, arguments);
      }
      _createClass(Scatter2, [{
        key: "render",
        value: function render() {
          var _this12 = this;
          return _react["default"].createElement(ChartComponent, _extends({}, this.props, {
            ref: function ref(_ref9) {
              return _this12.chartInstance = _ref9 && _ref9.chartInstance;
            },
            type: "scatter"
          }));
        }
      }]);
      return Scatter2;
    }(_react["default"].Component);
    exports.Scatter = Scatter;
    var defaults = _chart["default"].defaults;
    exports.defaults = defaults;
  }
});
export default require_es();
/*! Bundled license information:

chart.js/dist/Chart.js:
  (*!
   * Chart.js v2.9.4
   * https://www.chartjs.org
   * (c) 2020 Chart.js Contributors
   * Released under the MIT License
   *)
*/
//# sourceMappingURL=react-chartjs-2.js.map
