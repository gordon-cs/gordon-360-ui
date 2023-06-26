import {
  require_react
} from "./chunk-LFTCFPAG.js";
import "./chunk-2W4G54A4.js";
import {
  __commonJS
} from "./chunk-LFBQMW2U.js";

// node_modules/ua-parser-js/dist/ua-parser.min.js
var require_ua_parser_min = __commonJS({
  "node_modules/ua-parser-js/dist/ua-parser.min.js"(exports, module) {
    (function(window2, undefined2) {
      "use strict";
      var LIBVERSION = "1.0.35", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 350;
      var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", VIERA = "Viera", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook", CHROMIUM_OS = "Chromium OS", MAC_OS = "Mac OS";
      var extend = function(regexes2, extensions) {
        var mergedRegexes = {};
        for (var i in regexes2) {
          if (extensions[i] && extensions[i].length % 2 === 0) {
            mergedRegexes[i] = extensions[i].concat(regexes2[i]);
          } else {
            mergedRegexes[i] = regexes2[i];
          }
        }
        return mergedRegexes;
      }, enumerize = function(arr) {
        var enums = {};
        for (var i = 0; i < arr.length; i++) {
          enums[arr[i].toUpperCase()] = arr[i];
        }
        return enums;
      }, has = function(str1, str2) {
        return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
      }, lowerize = function(str) {
        return str.toLowerCase();
      }, majorize = function(version) {
        return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined2;
      }, trim = function(str, len) {
        if (typeof str === STR_TYPE) {
          str = str.replace(/^\s\s*/, EMPTY);
          return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
        }
      };
      var rgxMapper = function(ua, arrays) {
        var i = 0, j, k, p, q, matches, match;
        while (i < arrays.length && !matches) {
          var regex = arrays[i], props = arrays[i + 1];
          j = k = 0;
          while (j < regex.length && !matches) {
            if (!regex[j]) {
              break;
            }
            matches = regex[j++].exec(ua);
            if (!!matches) {
              for (p = 0; p < props.length; p++) {
                match = matches[++k];
                q = props[p];
                if (typeof q === OBJ_TYPE && q.length > 0) {
                  if (q.length === 2) {
                    if (typeof q[1] == FUNC_TYPE) {
                      this[q[0]] = q[1].call(this, match);
                    } else {
                      this[q[0]] = q[1];
                    }
                  } else if (q.length === 3) {
                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                      this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined2;
                    } else {
                      this[q[0]] = match ? match.replace(q[1], q[2]) : undefined2;
                    }
                  } else if (q.length === 4) {
                    this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined2;
                  }
                } else {
                  this[q] = match ? match : undefined2;
                }
              }
            }
          }
          i += 2;
        }
      }, strMapper = function(str, map) {
        for (var i in map) {
          if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
            for (var j = 0; j < map[i].length; j++) {
              if (has(map[i][j], str)) {
                return i === UNKNOWN ? undefined2 : i;
              }
            }
          } else if (has(map[i], str)) {
            return i === UNKNOWN ? undefined2 : i;
          }
        }
        return str;
      };
      var oldSafariMap = { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }, windowsVersionMap = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" };
      var regexes = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [VERSION, [NAME, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [VERSION, [NAME, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [NAME, VERSION], [/opios[\/ ]+([\w\.]+)/i], [VERSION, [NAME, OPERA + " Mini"]], [/\bopr\/([\w\.]+)/i], [VERSION, [NAME, OPERA]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [NAME, VERSION], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [VERSION, [NAME, "UC" + BROWSER]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [VERSION, [NAME, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [VERSION, [NAME, "WeChat"]], [/konqueror\/([\w\.]+)/i], [VERSION, [NAME, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [VERSION, [NAME, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [VERSION, [NAME, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[NAME, /(.+)/, "$1 Secure " + BROWSER], VERSION], [/\bfocus\/([\w\.]+)/i], [VERSION, [NAME, FIREFOX + " Focus"]], [/\bopt\/([\w\.]+)/i], [VERSION, [NAME, OPERA + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [VERSION, [NAME, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [VERSION, [NAME, "Dolphin"]], [/coast\/([\w\.]+)/i], [VERSION, [NAME, OPERA + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [VERSION, [NAME, "MIUI " + BROWSER]], [/fxios\/([-\w\.]+)/i], [VERSION, [NAME, FIREFOX]], [/\bqihu|(qi?ho?o?|360)browser/i], [[NAME, "360 " + BROWSER]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[NAME, /(.+)/, "$1 " + BROWSER], VERSION], [/(comodo_dragon)\/([\w\.]+)/i], [[NAME, /_/g, " "], VERSION], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [NAME, VERSION], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [NAME], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[NAME, FACEBOOK], VERSION], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [NAME, VERSION], [/\bgsa\/([\w\.]+) .*safari\//i], [VERSION, [NAME, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [VERSION, [NAME, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [VERSION, [NAME, CHROME + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[NAME, CHROME + " WebView"], VERSION], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [VERSION, [NAME, "Android " + BROWSER]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [NAME, VERSION], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [VERSION, [NAME, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [VERSION, NAME], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [NAME, [VERSION, strMapper, oldSafariMap]], [/(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[NAME, "Netscape"], VERSION], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [VERSION, [NAME, FIREFOX + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [NAME, VERSION], [/(cobalt)\/([\w\.]+)/i], [NAME, [VERSION, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[ARCHITECTURE, "amd64"]], [/(ia32(?=;))/i], [[ARCHITECTURE, lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[ARCHITECTURE, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[ARCHITECTURE, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[ARCHITECTURE, "armhf"]], [/windows (ce|mobile); ppc;/i], [[ARCHITECTURE, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[ARCHITECTURE, /ower/, EMPTY, lowerize]], [/(sun4\w)[;\)]/i], [[ARCHITECTURE, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[ARCHITECTURE, lowerize]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [MODEL, [VENDOR, APPLE], [TYPE, TABLET]], [/(macintosh);/i], [MODEL, [VENDOR, APPLE]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [MODEL, [VENDOR, "OPPO"], [TYPE, MOBILE]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [MODEL, [VENDOR, LG], [TYPE, TABLET]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [MODEL, [VENDOR, LG], [TYPE, MOBILE]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[MODEL, /_/g, " "], [VENDOR, "Nokia"], [TYPE, MOBILE]], [/(pixel c)\b/i], [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [MODEL, [VENDOR, SONY], [TYPE, MOBILE]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]], [/(playbook);[-\w\),; ]+(rim)/i], [MODEL, VENDOR, [TYPE, TABLET]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [MODEL, [VENDOR, ASUS], [TYPE, TABLET]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]], [/(nexus 9)/i], [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [VENDOR, MODEL, [TYPE, TABLET]], [/(surface duo)/i], [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]], [/(u304aa)/i], [MODEL, [VENDOR, "AT&T"], [TYPE, MOBILE]], [/\bsie-(\w*)/i], [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]], [/\b(rct\w+) b/i], [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]], [/\b(venue[\d ]{2,7}) b/i], [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]], [/\b(q(?:mv|ta)\w+) b/i], [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [MODEL, [VENDOR, "Barnes & Noble"], [TYPE, TABLET]], [/\b(tm\d{3}\w+) b/i], [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]], [/\b(k88) b/i], [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]], [/\b(nx\d{3}j) b/i], [MODEL, [VENDOR, "ZTE"], [TYPE, MOBILE]], [/\b(gen\d{3}) b.+49h/i], [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]], [/\b(zur\d{3}) b/i], [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]], [/\b((zeki)?tb.*\b) b/i], [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]], [/\b(ns-?\w{0,9}) b/i], [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]], [/\b((nxa|next)-?\w{0,9}) b/i], [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]], [/\b(lvtel\-)?(v1[12]) b/i], [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]], [/\b(ph-1) /i], [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]], [/\b(trio[-\w\. ]+) b/i], [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]], [/\btu_(1491) b/i], [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]], [/(shield[\w ]+) b/i], [MODEL, [VENDOR, "Nvidia"], [TYPE, TABLET]], [/(sprint) (\w+)/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/(kin\.[onetw]{3})/i], [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]], [/smart-tv.+(samsung)/i], [VENDOR, [TYPE, SMARTTV]], [/hbbtv.+maple;(\d+)/i], [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[VENDOR, LG], [TYPE, SMARTTV]], [/(apple) ?tv/i], [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]], [/crkey/i], [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]], [/droid.+aft(\w)( bui|\))/i], [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]], [/(bravia[\w ]+)( bui|\))/i], [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]], [/(mitv-\w{5}) bui/i], [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]], [/Hbbtv.*(technisat) (.*);/i], [VENDOR, MODEL, [TYPE, SMARTTV]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[TYPE, SMARTTV]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [VENDOR, MODEL, [TYPE, CONSOLE]], [/droid.+; (shield) bui/i], [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]], [/(playstation [345portablevi]+)/i], [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]], [/((pebble))app/i], [VENDOR, MODEL, [TYPE, WEARABLE]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]], [/droid.+; (glass) \d/i], [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]], [/droid.+; (wt63?0{2,3})\)/i], [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]], [/(quest( 2| pro)?)/i], [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [VENDOR, [TYPE, EMBEDDED]], [/(aeobc)\b/i], [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [MODEL, [TYPE, MOBILE]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [MODEL, [TYPE, TABLET]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[TYPE, TABLET]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[TYPE, MOBILE]], [/(android[-\w\. ]{0,9});.+buil/i], [MODEL, [VENDOR, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [VERSION, [NAME, EDGE + "HTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [VERSION, [NAME, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [NAME, VERSION], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [VERSION, NAME]], os: [[/microsoft (windows) (vista|xp)/i], [NAME, VERSION], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [NAME, [VERSION, strMapper, windowsVersionMap]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[NAME, "Windows"], [VERSION, strMapper, windowsVersionMap]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[VERSION, /_/g, "."], [NAME, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[NAME, MAC_OS], [VERSION, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [VERSION, NAME], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [NAME, VERSION], [/\(bb(10);/i], [VERSION, [NAME, BLACKBERRY]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [VERSION, [NAME, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [VERSION, [NAME, FIREFOX + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [VERSION, [NAME, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [VERSION, [NAME, "watchOS"]], [/crkey\/([\d\.]+)/i], [VERSION, [NAME, CHROME + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[NAME, CHROMIUM_OS], VERSION], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [NAME, VERSION], [/(sunos) ?([\w\.\d]*)/i], [[NAME, "Solaris"], VERSION], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [NAME, VERSION]] };
      var UAParser = function(ua, extensions) {
        if (typeof ua === OBJ_TYPE) {
          extensions = ua;
          ua = undefined2;
        }
        if (!(this instanceof UAParser)) {
          return new UAParser(ua, extensions).getResult();
        }
        var _navigator = typeof window2 !== UNDEF_TYPE && window2.navigator ? window2.navigator : undefined2;
        var _ua = ua || (_navigator && _navigator.userAgent ? _navigator.userAgent : EMPTY);
        var _uach = _navigator && _navigator.userAgentData ? _navigator.userAgentData : undefined2;
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        var _isSelfNav = _navigator && _navigator.userAgent == _ua;
        this.getBrowser = function() {
          var _browser = {};
          _browser[NAME] = undefined2;
          _browser[VERSION] = undefined2;
          rgxMapper.call(_browser, _ua, _rgxmap.browser);
          _browser[MAJOR] = majorize(_browser[VERSION]);
          if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) {
            _browser[NAME] = "Brave";
          }
          return _browser;
        };
        this.getCPU = function() {
          var _cpu = {};
          _cpu[ARCHITECTURE] = undefined2;
          rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
          return _cpu;
        };
        this.getDevice = function() {
          var _device = {};
          _device[VENDOR] = undefined2;
          _device[MODEL] = undefined2;
          _device[TYPE] = undefined2;
          rgxMapper.call(_device, _ua, _rgxmap.device);
          if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) {
            _device[TYPE] = MOBILE;
          }
          if (_isSelfNav && _device[MODEL] == "Macintosh" && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
            _device[MODEL] = "iPad";
            _device[TYPE] = TABLET;
          }
          return _device;
        };
        this.getEngine = function() {
          var _engine = {};
          _engine[NAME] = undefined2;
          _engine[VERSION] = undefined2;
          rgxMapper.call(_engine, _ua, _rgxmap.engine);
          return _engine;
        };
        this.getOS = function() {
          var _os = {};
          _os[NAME] = undefined2;
          _os[VERSION] = undefined2;
          rgxMapper.call(_os, _ua, _rgxmap.os);
          if (_isSelfNav && !_os[NAME] && _uach && _uach.platform != "Unknown") {
            _os[NAME] = _uach.platform.replace(/chrome os/i, CHROMIUM_OS).replace(/macos/i, MAC_OS);
          }
          return _os;
        };
        this.getResult = function() {
          return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
        };
        this.getUA = function() {
          return _ua;
        };
        this.setUA = function(ua2) {
          _ua = typeof ua2 === STR_TYPE && ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
          return this;
        };
        this.setUA(_ua);
        return this;
      };
      UAParser.VERSION = LIBVERSION;
      UAParser.BROWSER = enumerize([NAME, VERSION, MAJOR]);
      UAParser.CPU = enumerize([ARCHITECTURE]);
      UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
      UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);
      if (typeof exports !== UNDEF_TYPE) {
        if (typeof module !== UNDEF_TYPE && module.exports) {
          exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
      } else {
        if (typeof define === FUNC_TYPE && define.amd) {
          define(function() {
            return UAParser;
          });
        } else if (typeof window2 !== UNDEF_TYPE) {
          window2.UAParser = UAParser;
        }
      }
      var $ = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
      if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function() {
          return parser.getUA();
        };
        $.ua.set = function(ua) {
          parser.setUA(ua);
          var result = parser.getResult();
          for (var prop in result) {
            $.ua[prop] = result[prop];
          }
        };
      }
    })(typeof window === "object" ? window : exports);
  }
});

// node_modules/react-device-detect/dist/lib.js
var require_lib = __commonJS({
  "node_modules/react-device-detect/dist/lib.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var React = require_react();
    var React__default = _interopDefault(React);
    var UAParser = require_ua_parser_min();
    var ClientUAInstance = new UAParser();
    var browser = ClientUAInstance.getBrowser();
    var cpu = ClientUAInstance.getCPU();
    var device = ClientUAInstance.getDevice();
    var engine = ClientUAInstance.getEngine();
    var os = ClientUAInstance.getOS();
    var ua = ClientUAInstance.getUA();
    var setUa = function setUa2(userAgentString) {
      return ClientUAInstance.setUA(userAgentString);
    };
    var parseUserAgent = function parseUserAgent2(userAgent) {
      if (!userAgent) {
        console.error("No userAgent string was provided");
        return;
      }
      var UserAgentInstance = new UAParser(userAgent);
      return {
        UA: UserAgentInstance,
        browser: UserAgentInstance.getBrowser(),
        cpu: UserAgentInstance.getCPU(),
        device: UserAgentInstance.getDevice(),
        engine: UserAgentInstance.getEngine(),
        os: UserAgentInstance.getOS(),
        ua: UserAgentInstance.getUA(),
        setUserAgent: function setUserAgent2(userAgentString) {
          return UserAgentInstance.setUA(userAgentString);
        }
      };
    };
    var UAHelper = Object.freeze({
      ClientUAInstance,
      browser,
      cpu,
      device,
      engine,
      os,
      ua,
      setUa,
      parseUserAgent
    });
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
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
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
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
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
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
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
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
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return _assertThisInitialized(self);
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null)
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var DeviceTypes = {
      Mobile: "mobile",
      Tablet: "tablet",
      SmartTv: "smarttv",
      Console: "console",
      Wearable: "wearable",
      Embedded: "embedded",
      Browser: void 0
    };
    var BrowserTypes = {
      Chrome: "Chrome",
      Firefox: "Firefox",
      Opera: "Opera",
      Yandex: "Yandex",
      Safari: "Safari",
      InternetExplorer: "Internet Explorer",
      Edge: "Edge",
      Chromium: "Chromium",
      Ie: "IE",
      MobileSafari: "Mobile Safari",
      EdgeChromium: "Edge Chromium",
      MIUI: "MIUI Browser",
      SamsungBrowser: "Samsung Browser"
    };
    var OsTypes = {
      IOS: "iOS",
      Android: "Android",
      WindowsPhone: "Windows Phone",
      Windows: "Windows",
      MAC_OS: "Mac OS"
    };
    var InitialDeviceTypes = {
      isMobile: false,
      isTablet: false,
      isBrowser: false,
      isSmartTV: false,
      isConsole: false,
      isWearable: false
    };
    var checkDeviceType = function checkDeviceType2(type) {
      switch (type) {
        case DeviceTypes.Mobile:
          return {
            isMobile: true
          };
        case DeviceTypes.Tablet:
          return {
            isTablet: true
          };
        case DeviceTypes.SmartTv:
          return {
            isSmartTV: true
          };
        case DeviceTypes.Console:
          return {
            isConsole: true
          };
        case DeviceTypes.Wearable:
          return {
            isWearable: true
          };
        case DeviceTypes.Browser:
          return {
            isBrowser: true
          };
        case DeviceTypes.Embedded:
          return {
            isEmbedded: true
          };
        default:
          return InitialDeviceTypes;
      }
    };
    var setUserAgent = function setUserAgent2(userAgent) {
      return setUa(userAgent);
    };
    var setDefaults = function setDefaults2(p) {
      var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "none";
      return p ? p : d;
    };
    var getNavigatorInstance = function getNavigatorInstance2() {
      if (typeof window !== "undefined") {
        if (window.navigator || navigator) {
          return window.navigator || navigator;
        }
      }
      return false;
    };
    var isIOS13Check = function isIOS13Check2(type) {
      var nav = getNavigatorInstance();
      return nav && nav.platform && (nav.platform.indexOf(type) !== -1 || nav.platform === "MacIntel" && nav.maxTouchPoints > 1 && !window.MSStream);
    };
    var browserPayload = function browserPayload2(isBrowser2, browser2, engine2, os2, ua2) {
      return {
        isBrowser: isBrowser2,
        browserMajorVersion: setDefaults(browser2.major),
        browserFullVersion: setDefaults(browser2.version),
        browserName: setDefaults(browser2.name),
        engineName: setDefaults(engine2.name),
        engineVersion: setDefaults(engine2.version),
        osName: setDefaults(os2.name),
        osVersion: setDefaults(os2.version),
        userAgent: setDefaults(ua2)
      };
    };
    var mobilePayload = function mobilePayload2(type, device2, os2, ua2) {
      return _objectSpread2({}, type, {
        vendor: setDefaults(device2.vendor),
        model: setDefaults(device2.model),
        os: setDefaults(os2.name),
        osVersion: setDefaults(os2.version),
        ua: setDefaults(ua2)
      });
    };
    var smartTvPayload = function smartTvPayload2(isSmartTV2, engine2, os2, ua2) {
      return {
        isSmartTV: isSmartTV2,
        engineName: setDefaults(engine2.name),
        engineVersion: setDefaults(engine2.version),
        osName: setDefaults(os2.name),
        osVersion: setDefaults(os2.version),
        userAgent: setDefaults(ua2)
      };
    };
    var consolePayload = function consolePayload2(isConsole2, engine2, os2, ua2) {
      return {
        isConsole: isConsole2,
        engineName: setDefaults(engine2.name),
        engineVersion: setDefaults(engine2.version),
        osName: setDefaults(os2.name),
        osVersion: setDefaults(os2.version),
        userAgent: setDefaults(ua2)
      };
    };
    var wearablePayload = function wearablePayload2(isWearable2, engine2, os2, ua2) {
      return {
        isWearable: isWearable2,
        engineName: setDefaults(engine2.name),
        engineVersion: setDefaults(engine2.version),
        osName: setDefaults(os2.name),
        osVersion: setDefaults(os2.version),
        userAgent: setDefaults(ua2)
      };
    };
    var embeddedPayload = function embeddedPayload2(isEmbedded2, device2, engine2, os2, ua2) {
      return {
        isEmbedded: isEmbedded2,
        vendor: setDefaults(device2.vendor),
        model: setDefaults(device2.model),
        engineName: setDefaults(engine2.name),
        engineVersion: setDefaults(engine2.version),
        osName: setDefaults(os2.name),
        osVersion: setDefaults(os2.version),
        userAgent: setDefaults(ua2)
      };
    };
    function deviceDetect(userAgent) {
      var _ref = userAgent ? parseUserAgent(userAgent) : UAHelper, device2 = _ref.device, browser2 = _ref.browser, engine2 = _ref.engine, os2 = _ref.os, ua2 = _ref.ua;
      var type = checkDeviceType(device2.type);
      var isBrowser2 = type.isBrowser, isMobile2 = type.isMobile, isTablet2 = type.isTablet, isSmartTV2 = type.isSmartTV, isConsole2 = type.isConsole, isWearable2 = type.isWearable, isEmbedded2 = type.isEmbedded;
      if (isBrowser2) {
        return browserPayload(isBrowser2, browser2, engine2, os2, ua2);
      }
      if (isSmartTV2) {
        return smartTvPayload(isSmartTV2, engine2, os2, ua2);
      }
      if (isConsole2) {
        return consolePayload(isConsole2, engine2, os2, ua2);
      }
      if (isMobile2) {
        return mobilePayload(type, device2, os2, ua2);
      }
      if (isTablet2) {
        return mobilePayload(type, device2, os2, ua2);
      }
      if (isWearable2) {
        return wearablePayload(isWearable2, engine2, os2, ua2);
      }
      if (isEmbedded2) {
        return embeddedPayload(isEmbedded2, device2, engine2, os2, ua2);
      }
    }
    var isMobileType = function isMobileType2(_ref) {
      var type = _ref.type;
      return type === DeviceTypes.Mobile;
    };
    var isTabletType = function isTabletType2(_ref2) {
      var type = _ref2.type;
      return type === DeviceTypes.Tablet;
    };
    var isMobileAndTabletType = function isMobileAndTabletType2(_ref3) {
      var type = _ref3.type;
      return type === DeviceTypes.Mobile || type === DeviceTypes.Tablet;
    };
    var isSmartTVType = function isSmartTVType2(_ref4) {
      var type = _ref4.type;
      return type === DeviceTypes.SmartTv;
    };
    var isBrowserType = function isBrowserType2(_ref5) {
      var type = _ref5.type;
      return type === DeviceTypes.Browser;
    };
    var isWearableType = function isWearableType2(_ref6) {
      var type = _ref6.type;
      return type === DeviceTypes.Wearable;
    };
    var isConsoleType = function isConsoleType2(_ref7) {
      var type = _ref7.type;
      return type === DeviceTypes.Console;
    };
    var isEmbeddedType = function isEmbeddedType2(_ref8) {
      var type = _ref8.type;
      return type === DeviceTypes.Embedded;
    };
    var getMobileVendor = function getMobileVendor2(_ref9) {
      var vendor = _ref9.vendor;
      return setDefaults(vendor);
    };
    var getMobileModel = function getMobileModel2(_ref10) {
      var model = _ref10.model;
      return setDefaults(model);
    };
    var getDeviceType = function getDeviceType2(_ref11) {
      var type = _ref11.type;
      return setDefaults(type, "browser");
    };
    var isAndroidType = function isAndroidType2(_ref12) {
      var name = _ref12.name;
      return name === OsTypes.Android;
    };
    var isWindowsType = function isWindowsType2(_ref13) {
      var name = _ref13.name;
      return name === OsTypes.Windows;
    };
    var isMacOsType = function isMacOsType2(_ref14) {
      var name = _ref14.name;
      return name === OsTypes.MAC_OS;
    };
    var isWinPhoneType = function isWinPhoneType2(_ref15) {
      var name = _ref15.name;
      return name === OsTypes.WindowsPhone;
    };
    var isIOSType = function isIOSType2(_ref16) {
      var name = _ref16.name;
      return name === OsTypes.IOS;
    };
    var getOsVersion = function getOsVersion2(_ref17) {
      var version = _ref17.version;
      return setDefaults(version);
    };
    var getOsName = function getOsName2(_ref18) {
      var name = _ref18.name;
      return setDefaults(name);
    };
    var isChromeType = function isChromeType2(_ref19) {
      var name = _ref19.name;
      return name === BrowserTypes.Chrome;
    };
    var isFirefoxType = function isFirefoxType2(_ref20) {
      var name = _ref20.name;
      return name === BrowserTypes.Firefox;
    };
    var isChromiumType = function isChromiumType2(_ref21) {
      var name = _ref21.name;
      return name === BrowserTypes.Chromium;
    };
    var isEdgeType = function isEdgeType2(_ref22) {
      var name = _ref22.name;
      return name === BrowserTypes.Edge;
    };
    var isYandexType = function isYandexType2(_ref23) {
      var name = _ref23.name;
      return name === BrowserTypes.Yandex;
    };
    var isSafariType = function isSafariType2(_ref24) {
      var name = _ref24.name;
      return name === BrowserTypes.Safari || name === BrowserTypes.MobileSafari;
    };
    var isMobileSafariType = function isMobileSafariType2(_ref25) {
      var name = _ref25.name;
      return name === BrowserTypes.MobileSafari;
    };
    var isOperaType = function isOperaType2(_ref26) {
      var name = _ref26.name;
      return name === BrowserTypes.Opera;
    };
    var isIEType = function isIEType2(_ref27) {
      var name = _ref27.name;
      return name === BrowserTypes.InternetExplorer || name === BrowserTypes.Ie;
    };
    var isMIUIType = function isMIUIType2(_ref28) {
      var name = _ref28.name;
      return name === BrowserTypes.MIUI;
    };
    var isSamsungBrowserType = function isSamsungBrowserType2(_ref29) {
      var name = _ref29.name;
      return name === BrowserTypes.SamsungBrowser;
    };
    var getBrowserFullVersion = function getBrowserFullVersion2(_ref30) {
      var version = _ref30.version;
      return setDefaults(version);
    };
    var getBrowserVersion = function getBrowserVersion2(_ref31) {
      var major = _ref31.major;
      return setDefaults(major);
    };
    var getBrowserName = function getBrowserName2(_ref32) {
      var name = _ref32.name;
      return setDefaults(name);
    };
    var getEngineName = function getEngineName2(_ref33) {
      var name = _ref33.name;
      return setDefaults(name);
    };
    var getEngineVersion = function getEngineVersion2(_ref34) {
      var version = _ref34.version;
      return setDefaults(version);
    };
    var isElectronType = function isElectronType2() {
      var nav = getNavigatorInstance();
      var ua2 = nav && nav.userAgent && nav.userAgent.toLowerCase();
      return typeof ua2 === "string" ? /electron/.test(ua2) : false;
    };
    var isEdgeChromiumType = function isEdgeChromiumType2(ua2) {
      return typeof ua2 === "string" && ua2.indexOf("Edg/") !== -1;
    };
    var getIOS13 = function getIOS132() {
      var nav = getNavigatorInstance();
      return nav && (/iPad|iPhone|iPod/.test(nav.platform) || nav.platform === "MacIntel" && nav.maxTouchPoints > 1) && !window.MSStream;
    };
    var getIPad13 = function getIPad132() {
      return isIOS13Check("iPad");
    };
    var getIphone13 = function getIphone132() {
      return isIOS13Check("iPhone");
    };
    var getIPod13 = function getIPod132() {
      return isIOS13Check("iPod");
    };
    var getUseragent = function getUseragent2(userAg) {
      return setDefaults(userAg);
    };
    function buildSelectorsObject(options) {
      var _ref = options ? options : UAHelper, device2 = _ref.device, browser2 = _ref.browser, os2 = _ref.os, engine2 = _ref.engine, ua2 = _ref.ua;
      return {
        isSmartTV: isSmartTVType(device2),
        isConsole: isConsoleType(device2),
        isWearable: isWearableType(device2),
        isEmbedded: isEmbeddedType(device2),
        isMobileSafari: isMobileSafariType(browser2) || getIPad13(),
        isChromium: isChromiumType(browser2),
        isMobile: isMobileAndTabletType(device2) || getIPad13(),
        isMobileOnly: isMobileType(device2),
        isTablet: isTabletType(device2) || getIPad13(),
        isBrowser: isBrowserType(device2),
        isDesktop: isBrowserType(device2),
        isAndroid: isAndroidType(os2),
        isWinPhone: isWinPhoneType(os2),
        isIOS: isIOSType(os2) || getIPad13(),
        isChrome: isChromeType(browser2),
        isFirefox: isFirefoxType(browser2),
        isSafari: isSafariType(browser2),
        isOpera: isOperaType(browser2),
        isIE: isIEType(browser2),
        osVersion: getOsVersion(os2),
        osName: getOsName(os2),
        fullBrowserVersion: getBrowserFullVersion(browser2),
        browserVersion: getBrowserVersion(browser2),
        browserName: getBrowserName(browser2),
        mobileVendor: getMobileVendor(device2),
        mobileModel: getMobileModel(device2),
        engineName: getEngineName(engine2),
        engineVersion: getEngineVersion(engine2),
        getUA: getUseragent(ua2),
        isEdge: isEdgeType(browser2) || isEdgeChromiumType(ua2),
        isYandex: isYandexType(browser2),
        deviceType: getDeviceType(device2),
        isIOS13: getIOS13(),
        isIPad13: getIPad13(),
        isIPhone13: getIphone13(),
        isIPod13: getIPod13(),
        isElectron: isElectronType(),
        isEdgeChromium: isEdgeChromiumType(ua2),
        isLegacyEdge: isEdgeType(browser2) && !isEdgeChromiumType(ua2),
        isWindows: isWindowsType(os2),
        isMacOs: isMacOsType(os2),
        isMIUI: isMIUIType(browser2),
        isSamsungBrowser: isSamsungBrowserType(browser2)
      };
    }
    var isSmartTV = isSmartTVType(device);
    var isConsole = isConsoleType(device);
    var isWearable = isWearableType(device);
    var isEmbedded = isEmbeddedType(device);
    var isMobileSafari = isMobileSafariType(browser) || getIPad13();
    var isChromium = isChromiumType(browser);
    var isMobile = isMobileAndTabletType(device) || getIPad13();
    var isMobileOnly = isMobileType(device);
    var isTablet = isTabletType(device) || getIPad13();
    var isBrowser = isBrowserType(device);
    var isDesktop = isBrowserType(device);
    var isAndroid = isAndroidType(os);
    var isWinPhone = isWinPhoneType(os);
    var isIOS = isIOSType(os) || getIPad13();
    var isChrome = isChromeType(browser);
    var isFirefox = isFirefoxType(browser);
    var isSafari = isSafariType(browser);
    var isOpera = isOperaType(browser);
    var isIE = isIEType(browser);
    var osVersion = getOsVersion(os);
    var osName = getOsName(os);
    var fullBrowserVersion = getBrowserFullVersion(browser);
    var browserVersion = getBrowserVersion(browser);
    var browserName = getBrowserName(browser);
    var mobileVendor = getMobileVendor(device);
    var mobileModel = getMobileModel(device);
    var engineName = getEngineName(engine);
    var engineVersion = getEngineVersion(engine);
    var getUA = getUseragent(ua);
    var isEdge = isEdgeType(browser) || isEdgeChromiumType(ua);
    var isYandex = isYandexType(browser);
    var deviceType = getDeviceType(device);
    var isIOS13 = getIOS13();
    var isIPad13 = getIPad13();
    var isIPhone13 = getIphone13();
    var isIPod13 = getIPod13();
    var isElectron = isElectronType();
    var isEdgeChromium = isEdgeChromiumType(ua);
    var isLegacyEdge = isEdgeType(browser) && !isEdgeChromiumType(ua);
    var isWindows = isWindowsType(os);
    var isMacOs = isMacOsType(os);
    var isMIUI = isMIUIType(browser);
    var isSamsungBrowser = isSamsungBrowserType(browser);
    var getSelectorsByUserAgent = function getSelectorsByUserAgent2(userAgent) {
      if (!userAgent || typeof userAgent !== "string") {
        console.error("No valid user agent string was provided");
        return;
      }
      var _UAHelper$parseUserAg = parseUserAgent(userAgent), device2 = _UAHelper$parseUserAg.device, browser2 = _UAHelper$parseUserAg.browser, os2 = _UAHelper$parseUserAg.os, engine2 = _UAHelper$parseUserAg.engine, ua2 = _UAHelper$parseUserAg.ua;
      return buildSelectorsObject({
        device: device2,
        browser: browser2,
        os: os2,
        engine: engine2,
        ua: ua2
      });
    };
    var AndroidView = function AndroidView2(_ref) {
      var renderWithFragment = _ref.renderWithFragment, children = _ref.children, props = _objectWithoutProperties(_ref, ["renderWithFragment", "children"]);
      return isAndroid ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    var BrowserView = function BrowserView2(_ref2) {
      var renderWithFragment = _ref2.renderWithFragment, children = _ref2.children, props = _objectWithoutProperties(_ref2, ["renderWithFragment", "children"]);
      return isBrowser ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    var IEView = function IEView2(_ref3) {
      var renderWithFragment = _ref3.renderWithFragment, children = _ref3.children, props = _objectWithoutProperties(_ref3, ["renderWithFragment", "children"]);
      return isIE ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    var IOSView = function IOSView2(_ref4) {
      var renderWithFragment = _ref4.renderWithFragment, children = _ref4.children, props = _objectWithoutProperties(_ref4, ["renderWithFragment", "children"]);
      return isIOS ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    var MobileView = function MobileView2(_ref5) {
      var renderWithFragment = _ref5.renderWithFragment, children = _ref5.children, props = _objectWithoutProperties(_ref5, ["renderWithFragment", "children"]);
      return isMobile ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    var TabletView = function TabletView2(_ref6) {
      var renderWithFragment = _ref6.renderWithFragment, children = _ref6.children, props = _objectWithoutProperties(_ref6, ["renderWithFragment", "children"]);
      return isTablet ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    var WinPhoneView = function WinPhoneView2(_ref7) {
      var renderWithFragment = _ref7.renderWithFragment, children = _ref7.children, props = _objectWithoutProperties(_ref7, ["renderWithFragment", "children"]);
      return isWinPhone ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    var MobileOnlyView = function MobileOnlyView2(_ref8) {
      var renderWithFragment = _ref8.renderWithFragment, children = _ref8.children, viewClassName = _ref8.viewClassName, style = _ref8.style, props = _objectWithoutProperties(_ref8, ["renderWithFragment", "children", "viewClassName", "style"]);
      return isMobileOnly ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    var SmartTVView = function SmartTVView2(_ref9) {
      var renderWithFragment = _ref9.renderWithFragment, children = _ref9.children, props = _objectWithoutProperties(_ref9, ["renderWithFragment", "children"]);
      return isSmartTV ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    var ConsoleView = function ConsoleView2(_ref10) {
      var renderWithFragment = _ref10.renderWithFragment, children = _ref10.children, props = _objectWithoutProperties(_ref10, ["renderWithFragment", "children"]);
      return isConsole ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    var WearableView = function WearableView2(_ref11) {
      var renderWithFragment = _ref11.renderWithFragment, children = _ref11.children, props = _objectWithoutProperties(_ref11, ["renderWithFragment", "children"]);
      return isWearable ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    var CustomView = function CustomView2(_ref12) {
      var renderWithFragment = _ref12.renderWithFragment, children = _ref12.children, viewClassName = _ref12.viewClassName, style = _ref12.style, condition = _ref12.condition, props = _objectWithoutProperties(_ref12, ["renderWithFragment", "children", "viewClassName", "style", "condition"]);
      return condition ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", props, children) : null;
    };
    function withOrientationChange(WrappedComponent) {
      return function(_React$Component) {
        _inherits(_class, _React$Component);
        function _class(props) {
          var _this;
          _classCallCheck(this, _class);
          _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
          _this.isEventListenerAdded = false;
          _this.handleOrientationChange = _this.handleOrientationChange.bind(_assertThisInitialized(_this));
          _this.onOrientationChange = _this.onOrientationChange.bind(_assertThisInitialized(_this));
          _this.onPageLoad = _this.onPageLoad.bind(_assertThisInitialized(_this));
          _this.state = {
            isLandscape: false,
            isPortrait: false
          };
          return _this;
        }
        _createClass(_class, [{
          key: "handleOrientationChange",
          value: function handleOrientationChange() {
            if (!this.isEventListenerAdded) {
              this.isEventListenerAdded = true;
            }
            var orientation = window.innerWidth > window.innerHeight ? 90 : 0;
            this.setState({
              isPortrait: orientation === 0,
              isLandscape: orientation === 90
            });
          }
        }, {
          key: "onOrientationChange",
          value: function onOrientationChange() {
            this.handleOrientationChange();
          }
        }, {
          key: "onPageLoad",
          value: function onPageLoad() {
            this.handleOrientationChange();
          }
        }, {
          key: "componentDidMount",
          value: function componentDidMount() {
            if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== void 0 && isMobile) {
              if (!this.isEventListenerAdded) {
                this.handleOrientationChange();
                window.addEventListener("load", this.onPageLoad, false);
              } else {
                window.removeEventListener("load", this.onPageLoad, false);
              }
              window.addEventListener("resize", this.onOrientationChange, false);
            }
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            window.removeEventListener("resize", this.onOrientationChange, false);
          }
        }, {
          key: "render",
          value: function render() {
            return React__default.createElement(WrappedComponent, _extends({}, this.props, {
              isLandscape: this.state.isLandscape,
              isPortrait: this.state.isPortrait
            }));
          }
        }]);
        return _class;
      }(React__default.Component);
    }
    function useMobileOrientation() {
      var _useState = React.useState(function() {
        var orientation = window.innerWidth > window.innerHeight ? 90 : 0;
        return {
          isPortrait: orientation === 0,
          isLandscape: orientation === 90,
          orientation: orientation === 0 ? "portrait" : "landscape"
        };
      }), _useState2 = _slicedToArray(_useState, 2), state = _useState2[0], setState = _useState2[1];
      var handleOrientationChange = React.useCallback(function() {
        var orientation = window.innerWidth > window.innerHeight ? 90 : 0;
        var next = {
          isPortrait: orientation === 0,
          isLandscape: orientation === 90,
          orientation: orientation === 0 ? "portrait" : "landscape"
        };
        state.orientation !== next.orientation && setState(next);
      }, [state.orientation]);
      React.useEffect(function() {
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== void 0 && isMobile) {
          handleOrientationChange();
          window.addEventListener("load", handleOrientationChange, false);
          window.addEventListener("resize", handleOrientationChange, false);
        }
        return function() {
          window.removeEventListener("resize", handleOrientationChange, false);
          window.removeEventListener("load", handleOrientationChange, false);
        };
      }, [handleOrientationChange]);
      return state;
    }
    function useDeviceData(userAgent) {
      var hookUserAgent = userAgent ? userAgent : window.navigator.userAgent;
      return parseUserAgent(hookUserAgent);
    }
    function useDeviceSelectors(userAgent) {
      var hookUserAgent = userAgent ? userAgent : window.navigator.userAgent;
      var deviceData = useDeviceData(hookUserAgent);
      var selectors = buildSelectorsObject(deviceData);
      return [selectors, deviceData];
    }
    exports.AndroidView = AndroidView;
    exports.BrowserTypes = BrowserTypes;
    exports.BrowserView = BrowserView;
    exports.ConsoleView = ConsoleView;
    exports.CustomView = CustomView;
    exports.IEView = IEView;
    exports.IOSView = IOSView;
    exports.MobileOnlyView = MobileOnlyView;
    exports.MobileView = MobileView;
    exports.OsTypes = OsTypes;
    exports.SmartTVView = SmartTVView;
    exports.TabletView = TabletView;
    exports.WearableView = WearableView;
    exports.WinPhoneView = WinPhoneView;
    exports.browserName = browserName;
    exports.browserVersion = browserVersion;
    exports.deviceDetect = deviceDetect;
    exports.deviceType = deviceType;
    exports.engineName = engineName;
    exports.engineVersion = engineVersion;
    exports.fullBrowserVersion = fullBrowserVersion;
    exports.getSelectorsByUserAgent = getSelectorsByUserAgent;
    exports.getUA = getUA;
    exports.isAndroid = isAndroid;
    exports.isBrowser = isBrowser;
    exports.isChrome = isChrome;
    exports.isChromium = isChromium;
    exports.isConsole = isConsole;
    exports.isDesktop = isDesktop;
    exports.isEdge = isEdge;
    exports.isEdgeChromium = isEdgeChromium;
    exports.isElectron = isElectron;
    exports.isEmbedded = isEmbedded;
    exports.isFirefox = isFirefox;
    exports.isIE = isIE;
    exports.isIOS = isIOS;
    exports.isIOS13 = isIOS13;
    exports.isIPad13 = isIPad13;
    exports.isIPhone13 = isIPhone13;
    exports.isIPod13 = isIPod13;
    exports.isLegacyEdge = isLegacyEdge;
    exports.isMIUI = isMIUI;
    exports.isMacOs = isMacOs;
    exports.isMobile = isMobile;
    exports.isMobileOnly = isMobileOnly;
    exports.isMobileSafari = isMobileSafari;
    exports.isOpera = isOpera;
    exports.isSafari = isSafari;
    exports.isSamsungBrowser = isSamsungBrowser;
    exports.isSmartTV = isSmartTV;
    exports.isTablet = isTablet;
    exports.isWearable = isWearable;
    exports.isWinPhone = isWinPhone;
    exports.isWindows = isWindows;
    exports.isYandex = isYandex;
    exports.mobileModel = mobileModel;
    exports.mobileVendor = mobileVendor;
    exports.osName = osName;
    exports.osVersion = osVersion;
    exports.parseUserAgent = parseUserAgent;
    exports.setUserAgent = setUserAgent;
    exports.useDeviceData = useDeviceData;
    exports.useDeviceSelectors = useDeviceSelectors;
    exports.useMobileOrientation = useMobileOrientation;
    exports.withOrientationChange = withOrientationChange;
  }
});
export default require_lib();
//# sourceMappingURL=react-device-detect.js.map
