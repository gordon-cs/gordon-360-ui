import {
  require_react
} from "./chunk-LFTCFPAG.js";
import "./chunk-2W4G54A4.js";
import {
  __commonJS,
  __toESM
} from "./chunk-LFBQMW2U.js";

// node_modules/escape-html/index.js
var require_escape_html = __commonJS({
  "node_modules/escape-html/index.js"(exports, module) {
    "use strict";
    var matchHtmlRegExp = /["'&<>]/;
    module.exports = escapeHtml2;
    function escapeHtml2(string) {
      var str = "" + string;
      var match2 = matchHtmlRegExp.exec(str);
      if (!match2) {
        return str;
      }
      var escape;
      var html = "";
      var index = 0;
      var lastIndex = 0;
      for (index = match2.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
          case 34:
            escape = "&quot;";
            break;
          case 38:
            escape = "&amp;";
            break;
          case 39:
            escape = "&#39;";
            break;
          case 60:
            escape = "&lt;";
            break;
          case 62:
            escape = "&gt;";
            break;
          default:
            continue;
        }
        if (lastIndex !== index) {
          html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escape;
      }
      return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
    }
  }
});

// node_modules/interweave/esm/bundle-7aab7250.js
var import_react = __toESM(require_react());
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var TYPE_FLOW = 1;
var TYPE_SECTION = 1 << 1;
var TYPE_HEADING = 1 << 2;
var TYPE_PHRASING = 1 << 3;
var TYPE_EMBEDDED = 1 << 4;
var TYPE_INTERACTIVE = 1 << 5;
var TYPE_PALPABLE = 1 << 6;
var tagConfigs = {
  a: {
    content: TYPE_FLOW | TYPE_PHRASING,
    self: false,
    type: TYPE_FLOW | TYPE_PHRASING | TYPE_INTERACTIVE | TYPE_PALPABLE
  },
  address: {
    invalid: ["h1", "h2", "h3", "h4", "h5", "h6", "address", "article", "aside", "section", "div", "header", "footer"],
    self: false
  },
  audio: {
    children: ["track", "source"]
  },
  br: {
    type: TYPE_FLOW | TYPE_PHRASING,
    void: true
  },
  body: {
    content: TYPE_FLOW | TYPE_SECTION | TYPE_HEADING | TYPE_PHRASING | TYPE_EMBEDDED | TYPE_INTERACTIVE | TYPE_PALPABLE
  },
  button: {
    content: TYPE_PHRASING,
    type: TYPE_FLOW | TYPE_PHRASING | TYPE_INTERACTIVE | TYPE_PALPABLE
  },
  caption: {
    content: TYPE_FLOW,
    parent: ["table"]
  },
  col: {
    parent: ["colgroup"],
    void: true
  },
  colgroup: {
    children: ["col"],
    parent: ["table"]
  },
  details: {
    children: ["summary"],
    type: TYPE_FLOW | TYPE_INTERACTIVE | TYPE_PALPABLE
  },
  dd: {
    content: TYPE_FLOW,
    parent: ["dl"]
  },
  dl: {
    children: ["dt", "dd"],
    type: TYPE_FLOW
  },
  dt: {
    content: TYPE_FLOW,
    invalid: ["footer", "header"],
    parent: ["dl"]
  },
  figcaption: {
    content: TYPE_FLOW,
    parent: ["figure"]
  },
  footer: {
    invalid: ["footer", "header"]
  },
  header: {
    invalid: ["footer", "header"]
  },
  hr: {
    type: TYPE_FLOW,
    void: true
  },
  img: {
    void: true
  },
  li: {
    content: TYPE_FLOW,
    parent: ["ul", "ol", "menu"]
  },
  main: {
    self: false
  },
  ol: {
    children: ["li"],
    type: TYPE_FLOW
  },
  picture: {
    children: ["source", "img"],
    type: TYPE_FLOW | TYPE_PHRASING | TYPE_EMBEDDED
  },
  rb: {
    parent: ["ruby", "rtc"]
  },
  rp: {
    parent: ["ruby", "rtc"]
  },
  rt: {
    content: TYPE_PHRASING,
    parent: ["ruby", "rtc"]
  },
  rtc: {
    content: TYPE_PHRASING,
    parent: ["ruby"]
  },
  ruby: {
    children: ["rb", "rp", "rt", "rtc"]
  },
  source: {
    parent: ["audio", "video", "picture"],
    void: true
  },
  summary: {
    content: TYPE_PHRASING,
    parent: ["details"]
  },
  table: {
    children: ["caption", "colgroup", "thead", "tbody", "tfoot", "tr"],
    type: TYPE_FLOW
  },
  tbody: {
    parent: ["table"],
    children: ["tr"]
  },
  td: {
    content: TYPE_FLOW,
    parent: ["tr"]
  },
  tfoot: {
    parent: ["table"],
    children: ["tr"]
  },
  th: {
    content: TYPE_FLOW,
    parent: ["tr"]
  },
  thead: {
    parent: ["table"],
    children: ["tr"]
  },
  tr: {
    parent: ["table", "tbody", "thead", "tfoot"],
    children: ["th", "td"]
  },
  track: {
    parent: ["audio", "video"],
    void: true
  },
  ul: {
    children: ["li"],
    type: TYPE_FLOW
  },
  video: {
    children: ["track", "source"]
  },
  wbr: {
    type: TYPE_FLOW | TYPE_PHRASING,
    void: true
  }
};
function createConfigBuilder(config) {
  return (tagName) => {
    tagConfigs[tagName] = {
      ...config,
      ...tagConfigs[tagName]
    };
  };
}
["address", "main", "div", "figure", "p", "pre"].forEach(createConfigBuilder({
  content: TYPE_FLOW,
  type: TYPE_FLOW | TYPE_PALPABLE
}));
["abbr", "b", "bdi", "bdo", "cite", "code", "data", "dfn", "em", "i", "kbd", "mark", "q", "ruby", "samp", "strong", "sub", "sup", "time", "u", "var"].forEach(createConfigBuilder({
  content: TYPE_PHRASING,
  type: TYPE_FLOW | TYPE_PHRASING | TYPE_PALPABLE
}));
["p", "pre"].forEach(createConfigBuilder({
  content: TYPE_PHRASING,
  type: TYPE_FLOW | TYPE_PALPABLE
}));
["s", "small", "span", "del", "ins"].forEach(createConfigBuilder({
  content: TYPE_PHRASING,
  type: TYPE_FLOW | TYPE_PHRASING
}));
["article", "aside", "footer", "header", "nav", "section", "blockquote"].forEach(createConfigBuilder({
  content: TYPE_FLOW,
  type: TYPE_FLOW | TYPE_SECTION | TYPE_PALPABLE
}));
["h1", "h2", "h3", "h4", "h5", "h6"].forEach(createConfigBuilder({
  content: TYPE_PHRASING,
  type: TYPE_FLOW | TYPE_HEADING | TYPE_PALPABLE
}));
["audio", "canvas", "iframe", "img", "video"].forEach(createConfigBuilder({
  type: TYPE_FLOW | TYPE_PHRASING | TYPE_EMBEDDED | TYPE_PALPABLE
}));
var TAGS = Object.freeze(tagConfigs);
var BANNED_TAG_LIST = ["applet", "base", "body", "command", "embed", "frame", "frameset", "head", "html", "link", "meta", "noscript", "object", "script", "style", "title"];
var ALLOWED_TAG_LIST = Object.keys(TAGS).filter((tag) => tag !== "canvas" && tag !== "iframe");
var FILTER_ALLOW = 1;
var FILTER_DENY = 2;
var FILTER_CAST_NUMBER = 3;
var FILTER_CAST_BOOL = 4;
var FILTER_NO_CAST = 5;
var ATTRIBUTES = Object.freeze({
  alt: FILTER_ALLOW,
  cite: FILTER_ALLOW,
  class: FILTER_ALLOW,
  colspan: FILTER_CAST_NUMBER,
  controls: FILTER_CAST_BOOL,
  datetime: FILTER_ALLOW,
  default: FILTER_CAST_BOOL,
  disabled: FILTER_CAST_BOOL,
  dir: FILTER_ALLOW,
  height: FILTER_ALLOW,
  href: FILTER_ALLOW,
  id: FILTER_ALLOW,
  kind: FILTER_ALLOW,
  label: FILTER_ALLOW,
  lang: FILTER_ALLOW,
  loading: FILTER_ALLOW,
  loop: FILTER_CAST_BOOL,
  media: FILTER_ALLOW,
  muted: FILTER_CAST_BOOL,
  poster: FILTER_ALLOW,
  rel: FILTER_ALLOW,
  role: FILTER_ALLOW,
  rowspan: FILTER_CAST_NUMBER,
  scope: FILTER_ALLOW,
  sizes: FILTER_ALLOW,
  span: FILTER_CAST_NUMBER,
  start: FILTER_CAST_NUMBER,
  style: FILTER_NO_CAST,
  src: FILTER_ALLOW,
  srclang: FILTER_ALLOW,
  srcset: FILTER_ALLOW,
  tabindex: FILTER_ALLOW,
  target: FILTER_ALLOW,
  title: FILTER_ALLOW,
  type: FILTER_ALLOW,
  width: FILTER_ALLOW
});
var ATTRIBUTES_TO_PROPS = Object.freeze({
  class: "className",
  colspan: "colSpan",
  datetime: "dateTime",
  rowspan: "rowSpan",
  srclang: "srcLang",
  srcset: "srcSet",
  tabindex: "tabIndex"
});
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
function Element({
  attributes = {},
  className,
  children = null,
  selfClose = false,
  tagName
}) {
  const Tag = tagName;
  return selfClose ? import_react.default.createElement(Tag, _extends({
    className
  }, attributes)) : import_react.default.createElement(Tag, _extends({
    className
  }, attributes), children);
}
var Filter = class {
  /**
   * Filter and clean an HTML attribute value.
   */
  attribute(name, value) {
    return value;
  }
  /**
   * Filter and clean an HTML node.
   */
  node(name, node) {
    return node;
  }
};
function match(string, pattern, process2, isVoid = false) {
  const matches = string.match(pattern instanceof RegExp ? pattern : new RegExp(pattern, "i"));
  if (!matches) {
    return null;
  }
  return {
    match: matches[0],
    void: isVoid,
    ...process2(matches),
    index: matches.index,
    length: matches[0].length,
    valid: true
  };
}
var Matcher = class {
  constructor(name, options, factory) {
    _defineProperty(this, "greedy", false);
    _defineProperty(this, "options", void 0);
    _defineProperty(this, "propName", void 0);
    _defineProperty(this, "inverseName", void 0);
    _defineProperty(this, "factory", void 0);
    if (!name || name.toLowerCase() === "html") {
      throw new Error(`The matcher name "${name}" is not allowed.`);
    }
    this.options = {
      ...options
    };
    this.propName = name;
    this.inverseName = `no${name.charAt(0).toUpperCase() + name.slice(1)}`;
    this.factory = factory !== null && factory !== void 0 ? factory : null;
  }
  /**
   * Attempts to create a React element using a custom user provided factory,
   * or the default matcher factory.
   */
  createElement(children, props) {
    const element = this.factory ? import_react.default.createElement(this.factory, props, children) : this.replaceWith(children, props);
    if (typeof element !== "string" && !import_react.default.isValidElement(element)) {
      throw new Error(`Invalid React element created from ${this.constructor.name}.`);
    }
    return element;
  }
  /**
   * Trigger the actual pattern match and package the matched
   * response through a callback.
   */
  doMatch(string, pattern, callback, isVoid = false) {
    return match(string, pattern, callback, isVoid);
  }
  /**
   * Callback triggered before parsing.
   */
  onBeforeParse(content, props) {
    return content;
  }
  /**
   * Callback triggered after parsing.
   */
  onAfterParse(content, props) {
    return content;
  }
  /**
   * Replace the match with a React element based on the matched token and optional props.
   */
};

// node_modules/interweave/esm/index.js
var import_react2 = __toESM(require_react());
var import_escape_html = __toESM(require_escape_html());
function _defineProperty2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var INVALID_STYLES = /(url|image|image-set)\(/i;
var StyleFilter = class extends Filter {
  attribute(name, value) {
    if (name === "style") {
      Object.keys(value).forEach((key) => {
        if (String(value[key]).match(INVALID_STYLES)) {
          delete value[key];
        }
      });
    }
    return value;
  }
};
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var INVALID_ROOTS = /^<(!doctype|(html|head|body)(\s|>))/i;
var ALLOWED_ATTRS = /^(aria-|data-|\w+:)/iu;
var OPEN_TOKEN = /{{{(\w+)\/?}}}/;
function createDocument() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return void 0;
  }
  return document.implementation.createHTMLDocument("Interweave");
}
var Parser = class {
  constructor(markup, props = {}, matchers = [], filters = []) {
    var _props$allowList;
    _defineProperty2(this, "allowed", void 0);
    _defineProperty2(this, "banned", void 0);
    _defineProperty2(this, "blocked", void 0);
    _defineProperty2(this, "container", void 0);
    _defineProperty2(this, "content", []);
    _defineProperty2(this, "props", void 0);
    _defineProperty2(this, "matchers", void 0);
    _defineProperty2(this, "filters", void 0);
    _defineProperty2(this, "keyIndex", void 0);
    if (markup && typeof markup !== "string") {
      throw new TypeError("Interweave parser requires a valid string.");
    }
    this.props = props;
    this.matchers = matchers;
    this.filters = [...filters, new StyleFilter()];
    this.keyIndex = -1;
    this.container = this.createContainer(markup || "");
    this.allowed = new Set((_props$allowList = props.allowList) !== null && _props$allowList !== void 0 ? _props$allowList : ALLOWED_TAG_LIST);
    this.banned = new Set(BANNED_TAG_LIST);
    this.blocked = new Set(props.blockList);
  }
  /**
   * Loop through and apply all registered attribute filters.
   */
  applyAttributeFilters(name, value) {
    return this.filters.reduce((nextValue, filter) => nextValue !== null && typeof filter.attribute === "function" ? filter.attribute(name, nextValue) : nextValue, value);
  }
  /**
   * Loop through and apply all registered node filters.
   */
  applyNodeFilters(name, node) {
    return this.filters.reduce((nextNode, filter) => nextNode !== null && typeof filter.node === "function" ? filter.node(name, nextNode) : nextNode, node);
  }
  /**
   * Loop through and apply all registered matchers to the string.
   * If a match is found, create a React element, and build a new array.
   * This array allows React to interpolate and render accordingly.
   */
  applyMatchers(string, parentConfig) {
    const elements = {};
    const {
      props
    } = this;
    let matchedString = string;
    let elementIndex = 0;
    let parts = null;
    this.matchers.forEach((matcher) => {
      const tagName = matcher.asTag().toLowerCase();
      const config = this.getTagConfig(tagName);
      if (props[matcher.inverseName] || !this.isTagAllowed(tagName)) {
        return;
      }
      if (!this.canRenderChild(parentConfig, config)) {
        return;
      }
      let tokenizedString = "";
      while (matchedString && (parts = matcher.match(matchedString))) {
        const {
          index,
          length,
          match: match2,
          valid,
          void: isVoid,
          ...partProps
        } = parts;
        const tokenName = matcher.propName + String(elementIndex);
        if (index > 0) {
          tokenizedString += matchedString.slice(0, index);
        }
        if (valid) {
          tokenizedString += isVoid ? `{{{${tokenName}/}}}` : `{{{${tokenName}}}}${match2}{{{/${tokenName}}}}`;
          this.keyIndex += 1;
          elementIndex += 1;
          elements[tokenName] = {
            children: match2,
            matcher,
            props: {
              ...props,
              ...partProps,
              key: this.keyIndex
            }
          };
        } else {
          tokenizedString += match2;
        }
        if (matcher.greedy) {
          matchedString = tokenizedString + matchedString.slice(index + length);
          tokenizedString = "";
        } else {
          matchedString = matchedString.slice(index + (length || match2.length));
        }
      }
      if (!matcher.greedy) {
        matchedString = tokenizedString + matchedString;
      }
    });
    if (elementIndex === 0) {
      return string;
    }
    return this.replaceTokens(matchedString, elements);
  }
  /**
   * Determine whether the child can be rendered within the parent.
   */
  canRenderChild(parentConfig, childConfig) {
    if (!parentConfig.tagName || !childConfig.tagName) {
      return false;
    }
    if (parentConfig.void) {
      return false;
    }
    if (parentConfig.children.length > 0) {
      return parentConfig.children.includes(childConfig.tagName);
    }
    if (parentConfig.invalid.length > 0 && parentConfig.invalid.includes(childConfig.tagName)) {
      return false;
    }
    if (childConfig.parent.length > 0) {
      return childConfig.parent.includes(parentConfig.tagName);
    }
    if (!parentConfig.self && parentConfig.tagName === childConfig.tagName) {
      return false;
    }
    return Boolean(parentConfig && parentConfig.content & childConfig.type);
  }
  /**
   * Convert line breaks in a string to HTML `<br/>` tags.
   * If the string contains HTML, we should not convert anything,
   * as line breaks should be handled by `<br/>`s in the markup itself.
   */
  convertLineBreaks(markup) {
    const {
      noHtml,
      disableLineBreaks
    } = this.props;
    if (noHtml || disableLineBreaks || markup.match(/<((?:\/[ a-z]+)|(?:[ a-z]+\/))>/gi)) {
      return markup;
    }
    let nextMarkup = markup.replace(/\r\n/g, "\n");
    nextMarkup = nextMarkup.replace(/\n{3,}/g, "\n\n\n");
    nextMarkup = nextMarkup.replace(/\n/g, "<br/>");
    return nextMarkup;
  }
  /**
   * Create a detached HTML document that allows for easy HTML
   * parsing while not triggering scripts or loading external
   * resources.
   */
  createContainer(markup) {
    var _this$props$container;
    const factory = typeof global !== "undefined" && global.INTERWEAVE_SSR_POLYFILL || createDocument;
    const doc = factory();
    if (!doc) {
      return void 0;
    }
    const tag = (_this$props$container = this.props.containerTagName) !== null && _this$props$container !== void 0 ? _this$props$container : "body";
    const el = tag === "body" || tag === "fragment" ? doc.body : doc.createElement(tag);
    if (markup.match(INVALID_ROOTS)) {
      if (true) {
        throw new Error("HTML documents as Interweave content are not supported.");
      }
    } else {
      el.innerHTML = this.convertLineBreaks(this.props.escapeHtml ? (0, import_escape_html.default)(markup) : markup);
    }
    return el;
  }
  /**
   * Convert an elements attribute map to an object map.
   * Returns null if no attributes are defined.
   */
  extractAttributes(node) {
    const {
      allowAttributes
    } = this.props;
    const attributes = {};
    let count = 0;
    if (node.nodeType !== ELEMENT_NODE || !node.attributes) {
      return null;
    }
    [...node.attributes].forEach((attr) => {
      const {
        name,
        value
      } = attr;
      const newName = name.toLowerCase();
      const filter = ATTRIBUTES[newName] || ATTRIBUTES[name];
      if (!this.isSafe(node)) {
        return;
      }
      if (!newName.match(ALLOWED_ATTRS) && (!allowAttributes && (!filter || filter === FILTER_DENY) || newName.startsWith("on") || value.replace(/(\s|\0|&#x0([9AD]);)/, "").match(/(javascript|vbscript|livescript|xss):/i))) {
        return;
      }
      let newValue = newName === "style" ? this.extractStyleAttribute(node) : value;
      if (filter === FILTER_CAST_BOOL) {
        newValue = true;
      } else if (filter === FILTER_CAST_NUMBER) {
        newValue = Number.parseFloat(String(newValue));
      } else if (filter !== FILTER_NO_CAST) {
        newValue = String(newValue);
      }
      attributes[ATTRIBUTES_TO_PROPS[newName] || newName] = this.applyAttributeFilters(newName, newValue);
      count += 1;
    });
    if (count === 0) {
      return null;
    }
    return attributes;
  }
  /**
   * Extract the style attribute as an object and remove values that allow for attack vectors.
   */
  extractStyleAttribute(node) {
    const styles = {};
    Array.from(node.style).forEach((key) => {
      const value = node.style[key];
      if (typeof value === "string" || typeof value === "number") {
        styles[key.replace(/-([a-z])/g, (match2, letter) => String(letter).toUpperCase())] = value;
      }
    });
    return styles;
  }
  /**
   * Return configuration for a specific tag.
   */
  getTagConfig(tagName) {
    const common = {
      children: [],
      content: 0,
      invalid: [],
      parent: [],
      self: true,
      tagName: "",
      type: 0,
      void: false
    };
    if (TAGS[tagName]) {
      return {
        ...common,
        ...TAGS[tagName],
        tagName
      };
    }
    return common;
  }
  /**
   * Verify that a node is safe from XSS and injection attacks.
   */
  isSafe(node) {
    if (typeof HTMLAnchorElement !== "undefined" && node instanceof HTMLAnchorElement) {
      const href = node.getAttribute("href");
      if (href !== null && href !== void 0 && href.startsWith("#")) {
        return true;
      }
      const protocol = node.protocol.toLowerCase();
      return protocol === ":" || protocol === "http:" || protocol === "https:" || protocol === "mailto:" || protocol === "tel:";
    }
    return true;
  }
  /**
   * Verify that an HTML tag is allowed to render.
   */
  isTagAllowed(tagName) {
    if (this.banned.has(tagName) || this.blocked.has(tagName)) {
      return false;
    }
    return this.props.allowElements || this.allowed.has(tagName);
  }
  /**
   * Parse the markup by injecting it into a detached document,
   * while looping over all child nodes and generating an
   * array to interpolate into JSX.
   */
  parse() {
    if (!this.container) {
      return [];
    }
    return this.parseNode(this.container, this.getTagConfig(this.container.nodeName.toLowerCase()));
  }
  /**
   * Loop over the nodes children and generate a
   * list of text nodes and React elements.
   */
  parseNode(parentNode, parentConfig) {
    const {
      noHtml,
      noHtmlExceptMatchers,
      allowElements,
      transform,
      transformOnlyAllowList
    } = this.props;
    let content = [];
    let mergedText = "";
    [...parentNode.childNodes].forEach((node) => {
      if (node.nodeType === ELEMENT_NODE) {
        const tagName = node.nodeName.toLowerCase();
        const config = this.getTagConfig(tagName);
        if (mergedText) {
          content.push(mergedText);
          mergedText = "";
        }
        const nextNode = this.applyNodeFilters(tagName, node);
        if (!nextNode) {
          return;
        }
        let children;
        if (transform && !(transformOnlyAllowList && !this.isTagAllowed(tagName))) {
          this.keyIndex += 1;
          const key = this.keyIndex;
          children = this.parseNode(nextNode, config);
          const transformed = transform(nextNode, children, config);
          if (transformed === null) {
            return;
          }
          if (typeof transformed !== "undefined") {
            content.push(import_react2.default.cloneElement(transformed, {
              key
            }));
            return;
          }
          this.keyIndex = key - 1;
        }
        if (this.banned.has(tagName)) {
          return;
        }
        if (!(noHtml || noHtmlExceptMatchers && tagName !== "br") && this.isTagAllowed(tagName) && (allowElements || this.canRenderChild(parentConfig, config))) {
          var _children;
          this.keyIndex += 1;
          const attributes = this.extractAttributes(nextNode);
          const elementProps = {
            tagName
          };
          if (attributes) {
            elementProps.attributes = attributes;
          }
          if (config.void) {
            elementProps.selfClose = config.void;
          }
          content.push(import_react2.default.createElement(Element, {
            ...elementProps,
            key: this.keyIndex
          }, (_children = children) !== null && _children !== void 0 ? _children : this.parseNode(nextNode, config)));
        } else {
          content = [...content, ...this.parseNode(nextNode, config.tagName ? config : parentConfig)];
        }
      } else if (node.nodeType === TEXT_NODE) {
        const text = noHtml && !noHtmlExceptMatchers ? node.textContent : (
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          this.applyMatchers(node.textContent || "", parentConfig)
        );
        if (Array.isArray(text)) {
          content = [...content, ...text];
        } else {
          mergedText += text;
        }
      }
    });
    if (mergedText) {
      content.push(mergedText);
    }
    return content;
  }
  /**
   * Deconstruct the string into an array, by replacing custom tokens with React elements,
   * so that React can render it correctly.
   */
  replaceTokens(tokenizedString, elements) {
    if (!tokenizedString.includes("{{{")) {
      return tokenizedString;
    }
    const nodes = [];
    let text = tokenizedString;
    let open = null;
    while (open = text.match(OPEN_TOKEN)) {
      const [match2, tokenName] = open;
      const startIndex = open.index;
      const isVoid = match2.includes("/");
      if (!elements[tokenName]) {
        throw new Error(`Token "${tokenName}" found but no matching element to replace with.`);
      }
      if (startIndex > 0) {
        nodes.push(text.slice(0, startIndex));
        text = text.slice(startIndex);
      }
      const {
        children,
        matcher,
        props: elementProps
      } = elements[tokenName];
      let endIndex;
      if (isVoid) {
        endIndex = match2.length;
        nodes.push(matcher.createElement(children, elementProps));
      } else {
        const close = text.match(new RegExp(`{{{/${tokenName}}}}`));
        if (!close) {
          throw new Error(`Closing token missing for interpolated element "${tokenName}".`);
        }
        endIndex = close.index + close[0].length;
        nodes.push(matcher.createElement(this.replaceTokens(text.slice(match2.length, close.index), elements), elementProps));
      }
      text = text.slice(endIndex);
    }
    if (text.length > 0) {
      nodes.push(text);
    }
    if (nodes.length === 0) {
      return "";
    }
    if (nodes.length === 1 && typeof nodes[0] === "string") {
      return nodes[0];
    }
    return nodes;
  }
};
function Markup(props) {
  var _ref;
  const {
    attributes,
    className,
    containerTagName,
    content,
    emptyContent,
    parsedContent,
    tagName,
    noWrap: baseNoWrap
  } = props;
  const tag = (_ref = containerTagName !== null && containerTagName !== void 0 ? containerTagName : tagName) !== null && _ref !== void 0 ? _ref : "span";
  const noWrap = tag === "fragment" ? true : baseNoWrap;
  let mainContent;
  if (parsedContent) {
    mainContent = parsedContent;
  } else {
    const markup = new Parser(content !== null && content !== void 0 ? content : "", props).parse();
    if (markup.length > 0) {
      mainContent = markup;
    }
  }
  if (!mainContent) {
    mainContent = emptyContent;
  }
  if (noWrap) {
    return import_react2.default.createElement(import_react2.default.Fragment, null, mainContent);
  }
  return import_react2.default.createElement(Element, {
    attributes,
    className,
    tagName: tag
  }, mainContent);
}
function Interweave(props) {
  const {
    attributes,
    className,
    content = "",
    disableFilters = false,
    disableMatchers = false,
    emptyContent = null,
    filters = [],
    matchers = [],
    onAfterParse = null,
    onBeforeParse = null,
    tagName = "span",
    noWrap = false,
    ...parserProps
  } = props;
  const allMatchers = disableMatchers ? [] : matchers;
  const allFilters = disableFilters ? [] : filters;
  const beforeCallbacks = onBeforeParse ? [onBeforeParse] : [];
  const afterCallbacks = onAfterParse ? [onAfterParse] : [];
  allMatchers.forEach((matcher) => {
    if (matcher.onBeforeParse) {
      beforeCallbacks.push(matcher.onBeforeParse.bind(matcher));
    }
    if (matcher.onAfterParse) {
      afterCallbacks.push(matcher.onAfterParse.bind(matcher));
    }
  });
  const markup = beforeCallbacks.reduce((string, callback) => {
    const nextString = callback(string, props);
    if (typeof nextString !== "string") {
      throw new TypeError("Interweave `onBeforeParse` must return a valid HTML string.");
    }
    return nextString;
  }, content !== null && content !== void 0 ? content : "");
  const parser = new Parser(markup, parserProps, allMatchers, allFilters);
  const nodes = afterCallbacks.reduce((parserNodes, callback) => {
    const nextNodes = callback(parserNodes, props);
    if (!Array.isArray(nextNodes)) {
      throw new TypeError("Interweave `onAfterParse` must return an array of strings and React elements.");
    }
    return nextNodes;
  }, parser.parse());
  return import_react2.default.createElement(Markup, {
    attributes,
    className,
    containerTagName: props.containerTagName,
    emptyContent,
    noWrap,
    parsedContent: nodes.length === 0 ? void 0 : nodes,
    tagName
  });
}
export {
  ALLOWED_TAG_LIST,
  ATTRIBUTES,
  ATTRIBUTES_TO_PROPS,
  BANNED_TAG_LIST,
  Element,
  FILTER_ALLOW,
  FILTER_CAST_BOOL,
  FILTER_CAST_NUMBER,
  FILTER_DENY,
  FILTER_NO_CAST,
  Filter,
  Interweave,
  Markup,
  Matcher,
  Parser,
  TAGS,
  TYPE_EMBEDDED,
  TYPE_FLOW,
  TYPE_HEADING,
  TYPE_INTERACTIVE,
  TYPE_PALPABLE,
  TYPE_PHRASING,
  TYPE_SECTION,
  match
};
/*! Bundled license information:

escape-html/index.js:
  (*!
   * escape-html
   * Copyright(c) 2012-2013 TJ Holowaychuk
   * Copyright(c) 2015 Andreas Lubbe
   * Copyright(c) 2015 Tiancheng "Timothy" Gu
   * MIT Licensed
   *)
*/
//# sourceMappingURL=interweave.js.map
