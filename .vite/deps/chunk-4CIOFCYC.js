import {
  arrow_default,
  computeStyles_default,
  eventListeners_default,
  flip_default,
  getNodeName,
  hide_default,
  init_arrow,
  init_computeStyles,
  init_createPopper,
  init_enums,
  init_eventListeners,
  init_flip,
  init_getNodeName,
  init_hide,
  init_instanceOf,
  init_offset,
  init_popperOffsets,
  init_preventOverflow,
  isHTMLElement,
  offset_default,
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
  HTMLElementType,
  chainPropTypes,
  composeClasses,
  createChainedFunction,
  debounce,
  elementAcceptingRef_default,
  exactProp,
  generateUtilityClass,
  generateUtilityClasses,
  getScrollbarSize,
  init_esm,
  integerPropType_default,
  ownerDocument,
  ownerWindow,
  refType_default,
  require_jsx_runtime,
  setRef,
  useControlled,
  useEnhancedEffect_default,
  useEventCallback,
  useForkRef,
  useId,
  useIsFocusVisible,
  usePreviousProps_default,
  visuallyHidden_default
} from "./chunk-CLQTRJQI.js";
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
import {
  __esm,
  __toESM
} from "./chunk-LFBQMW2U.js";

// node_modules/@mui/base/composeClasses/index.js
var init_composeClasses = __esm({
  "node_modules/@mui/base/composeClasses/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js
function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}
function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
function ClickAwayListener(props) {
  const {
    children,
    disableReactTree = false,
    mouseEvent = "onClick",
    onClickAway,
    touchEvent = "onTouchEnd"
  } = props;
  const movedRef = React.useRef(false);
  const nodeRef = React.useRef(null);
  const activatedRef = React.useRef(false);
  const syntheticEventRef = React.useRef(false);
  React.useEffect(() => {
    setTimeout(() => {
      activatedRef.current = true;
    }, 0);
    return () => {
      activatedRef.current = false;
    };
  }, []);
  const handleRef = useForkRef(
    // @ts-expect-error TODO upstream fix
    children.ref,
    nodeRef
  );
  const handleClickAway = useEventCallback((event) => {
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = ownerDocument(nodeRef.current);
    if (!activatedRef.current || !nodeRef.current || "clientX" in event && clickedRootScrollbar(event, doc)) {
      return;
    }
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    let insideDOM;
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(
        // @ts-expect-error returns `false` as intended when not dispatched from a Node
        event.target
      ) || nodeRef.current.contains(
        // @ts-expect-error returns `false` as intended when not dispatched from a Node
        event.target
      );
    }
    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  });
  const createHandleSynthetic = (handlerName) => (event) => {
    syntheticEventRef.current = true;
    const childrenPropsHandler = children.props[handlerName];
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const childrenProps = {
    ref: handleRef
  };
  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }
  React.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = ownerDocument(nodeRef.current);
      const handleTouchMove = () => {
        movedRef.current = true;
      };
      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener("touchmove", handleTouchMove);
      return () => {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener("touchmove", handleTouchMove);
      };
    }
    return void 0;
  }, [handleClickAway, touchEvent]);
  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }
  React.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }
    return void 0;
  }, [handleClickAway, mouseEvent]);
  return (0, import_jsx_runtime.jsx)(React.Fragment, {
    children: React.cloneElement(children, childrenProps)
  });
}
var React, import_prop_types, import_jsx_runtime, ClickAwayListener_default;
var init_ClickAwayListener = __esm({
  "node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js"() {
    React = __toESM(require_react());
    import_prop_types = __toESM(require_prop_types());
    init_esm();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    true ? ClickAwayListener.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * The wrapped element.
       */
      children: elementAcceptingRef_default.isRequired,
      /**
       * If `true`, the React tree is ignored and only the DOM tree is considered.
       * This prop changes how portaled elements are handled.
       * @default false
       */
      disableReactTree: import_prop_types.default.bool,
      /**
       * The mouse event to listen to. You can disable the listener by providing `false`.
       * @default 'onClick'
       */
      mouseEvent: import_prop_types.default.oneOf(["onClick", "onMouseDown", "onMouseUp", "onPointerDown", "onPointerUp", false]),
      /**
       * Callback fired when a "click away" event is detected.
       */
      onClickAway: import_prop_types.default.func.isRequired,
      /**
       * The touch event to listen to. You can disable the listener by providing `false`.
       * @default 'onTouchEnd'
       */
      touchEvent: import_prop_types.default.oneOf(["onTouchEnd", "onTouchStart", false])
    } : void 0;
    if (true) {
      ClickAwayListener["propTypes"] = exactProp(ClickAwayListener.propTypes);
    }
    ClickAwayListener_default = ClickAwayListener;
  }
});

// node_modules/@mui/base/ClickAwayListener/index.js
var init_ClickAwayListener2 = __esm({
  "node_modules/@mui/base/ClickAwayListener/index.js"() {
    init_ClickAwayListener();
    init_ClickAwayListener();
  }
});

// node_modules/@mui/base/FocusTrap/FocusTrap.js
function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute("tabindex") || "", 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
    return 0;
  }
  return node.tabIndex;
}
function isNonTabbableRadio(node) {
  if (node.tagName !== "INPUT" || node.type !== "radio") {
    return false;
  }
  if (!node.name) {
    return false;
  }
  const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }
  return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function FocusTrap(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = React2.useRef(false);
  const sentinelStart = React2.useRef(null);
  const sentinelEnd = React2.useRef(null);
  const nodeToRestore = React2.useRef(null);
  const reactFocusEventTarget = React2.useRef(null);
  const activated = React2.useRef(false);
  const rootRef = React2.useRef(null);
  const handleRef = useForkRef(children.ref, rootRef);
  const lastKeydown = React2.useRef(null);
  React2.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  React2.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute("tabIndex")) {
        if (true) {
          console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join("\n"));
        }
        rootRef.current.setAttribute("tabIndex", "-1");
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus) {
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  React2.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const contain = (nativeEvent) => {
      const {
        current: rootElement
      } = rootRef;
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (!rootElement.contains(doc.activeElement)) {
        if (nativeEvent && reactFocusEventTarget.current !== nativeEvent.target || doc.activeElement !== reactFocusEventTarget.current) {
          reactFocusEventTarget.current = null;
        } else if (reactFocusEventTarget.current !== null) {
          return;
        }
        if (!activated.current) {
          return;
        }
        let tabbable = [];
        if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
          tabbable = getTabbable(rootRef.current);
        }
        if (tabbable.length > 0) {
          var _lastKeydown$current, _lastKeydown$current2;
          const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === "Tab");
          const focusNext = tabbable[0];
          const focusPrevious = tabbable[tabbable.length - 1];
          if (typeof focusNext !== "string" && typeof focusPrevious !== "string") {
            if (isShiftTab) {
              focusPrevious.focus();
            } else {
              focusNext.focus();
            }
          }
        } else {
          rootElement.focus();
        }
      }
    };
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        ignoreNextEnforceFocus.current = true;
        if (sentinelEnd.current) {
          sentinelEnd.current.focus();
        }
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      if (doc.activeElement && doc.activeElement.tagName === "BODY") {
        contain(null);
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return (0, import_jsx_runtime3.jsxs)(React2.Fragment, {
    children: [(0, import_jsx_runtime2.jsx)("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-testid": "sentinelStart"
    }), React2.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), (0, import_jsx_runtime2.jsx)("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-testid": "sentinelEnd"
    })]
  });
}
var React2, import_prop_types2, import_jsx_runtime2, import_jsx_runtime3, candidatesSelector, FocusTrap_default;
var init_FocusTrap = __esm({
  "node_modules/@mui/base/FocusTrap/FocusTrap.js"() {
    React2 = __toESM(require_react());
    import_prop_types2 = __toESM(require_prop_types());
    init_esm();
    import_jsx_runtime2 = __toESM(require_jsx_runtime());
    import_jsx_runtime3 = __toESM(require_jsx_runtime());
    candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
    true ? FocusTrap.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * A single child content element.
       */
      children: elementAcceptingRef_default,
      /**
       * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
       * replace it to the last focused element when it closes.
       * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
       *
       * Generally this should never be set to `true` as it makes the focus trap less
       * accessible to assistive technologies, like screen readers.
       * @default false
       */
      disableAutoFocus: import_prop_types2.default.bool,
      /**
       * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
       *
       * Generally this should never be set to `true` as it makes the focus trap less
       * accessible to assistive technologies, like screen readers.
       * @default false
       */
      disableEnforceFocus: import_prop_types2.default.bool,
      /**
       * If `true`, the focus trap will not restore focus to previously focused element once
       * focus trap is hidden or unmounted.
       * @default false
       */
      disableRestoreFocus: import_prop_types2.default.bool,
      /**
       * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
       * For instance, you can provide the "tabbable" npm dependency.
       * @param {HTMLElement} root
       */
      getTabbable: import_prop_types2.default.func,
      /**
       * This prop extends the `open` prop.
       * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
       * This prop should be memoized.
       * It can be used to support multiple focus trap mounted at the same time.
       * @default function defaultIsEnabled(): boolean {
       *   return true;
       * }
       */
      isEnabled: import_prop_types2.default.func,
      /**
       * If `true`, focus is locked.
       */
      open: import_prop_types2.default.bool.isRequired
    } : void 0;
    if (true) {
      FocusTrap["propTypes"] = exactProp(FocusTrap.propTypes);
    }
    FocusTrap_default = FocusTrap;
  }
});

// node_modules/@mui/base/FocusTrap/FocusTrap.types.js
var init_FocusTrap_types = __esm({
  "node_modules/@mui/base/FocusTrap/FocusTrap.types.js"() {
  }
});

// node_modules/@mui/base/FocusTrap/index.js
var init_FocusTrap2 = __esm({
  "node_modules/@mui/base/FocusTrap/index.js"() {
    init_FocusTrap();
    init_FocusTrap_types();
  }
});

// node_modules/@mui/base/Portal/Portal.js
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
var React3, ReactDOM, import_prop_types3, import_jsx_runtime4, Portal, Portal_default;
var init_Portal = __esm({
  "node_modules/@mui/base/Portal/Portal.js"() {
    React3 = __toESM(require_react());
    ReactDOM = __toESM(require_react_dom());
    import_prop_types3 = __toESM(require_prop_types());
    init_esm();
    import_jsx_runtime4 = __toESM(require_jsx_runtime());
    Portal = React3.forwardRef(function Portal2(props, forwardedRef) {
      const {
        children,
        container,
        disablePortal = false
      } = props;
      const [mountNode, setMountNode] = React3.useState(null);
      const handleRef = useForkRef(React3.isValidElement(children) ? children.ref : null, forwardedRef);
      useEnhancedEffect_default(() => {
        if (!disablePortal) {
          setMountNode(getContainer(container) || document.body);
        }
      }, [container, disablePortal]);
      useEnhancedEffect_default(() => {
        if (mountNode && !disablePortal) {
          setRef(forwardedRef, mountNode);
          return () => {
            setRef(forwardedRef, null);
          };
        }
        return void 0;
      }, [forwardedRef, mountNode, disablePortal]);
      if (disablePortal) {
        if (React3.isValidElement(children)) {
          const newProps = {
            ref: handleRef
          };
          return React3.cloneElement(children, newProps);
        }
        return (0, import_jsx_runtime4.jsx)(React3.Fragment, {
          children
        });
      }
      return (0, import_jsx_runtime4.jsx)(React3.Fragment, {
        children: mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode
      });
    });
    true ? Portal.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * The children to render into the `container`.
       */
      children: import_prop_types3.default.node,
      /**
       * An HTML element or function that returns one.
       * The `container` will have the portal children appended to it.
       *
       * By default, it uses the body of the top-level document object,
       * so it's simply `document.body` most of the time.
       */
      container: import_prop_types3.default.oneOfType([HTMLElementType, import_prop_types3.default.func]),
      /**
       * The `children` will be under the DOM hierarchy of the parent component.
       * @default false
       */
      disablePortal: import_prop_types3.default.bool
    } : void 0;
    if (true) {
      Portal["propTypes"] = exactProp(Portal.propTypes);
    }
    Portal_default = Portal;
  }
});

// node_modules/@mui/base/Portal/Portal.types.js
var init_Portal_types = __esm({
  "node_modules/@mui/base/Portal/Portal.types.js"() {
  }
});

// node_modules/@mui/base/Portal/index.js
var init_Portal2 = __esm({
  "node_modules/@mui/base/Portal/index.js"() {
    init_Portal();
    init_Portal_types();
  }
});

// node_modules/@mui/base/Modal/ModalManager.js
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, show) {
  if (show) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
  const forbiddenTagNames = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"];
  const isForbiddenTagName = forbiddenTagNames.indexOf(element.tagName) !== -1;
  const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
  return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  [].forEach.call(container.children, (element) => {
    const isNotExcludedElement = blacklist.indexOf(element) === -1;
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
    if (isNotExcludedElement && isNotForbiddenElement) {
      ariaHidden(element, show);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    let scrollContainer;
    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer = (parent == null ? void 0 : parent.nodeName) === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    }
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
var ModalManager;
var init_ModalManager = __esm({
  "node_modules/@mui/base/Modal/ModalManager.js"() {
    init_esm();
    ModalManager = class {
      constructor() {
        this.containers = void 0;
        this.modals = void 0;
        this.modals = [];
        this.containers = [];
      }
      add(modal, container) {
        let modalIndex = this.modals.indexOf(modal);
        if (modalIndex !== -1) {
          return modalIndex;
        }
        modalIndex = this.modals.length;
        this.modals.push(modal);
        if (modal.modalRef) {
          ariaHidden(modal.modalRef, false);
        }
        const hiddenSiblings = getHiddenSiblings(container);
        ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
        const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
        if (containerIndex !== -1) {
          this.containers[containerIndex].modals.push(modal);
          return modalIndex;
        }
        this.containers.push({
          modals: [modal],
          container,
          restore: null,
          hiddenSiblings
        });
        return modalIndex;
      }
      mount(modal, props) {
        const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
        const containerInfo = this.containers[containerIndex];
        if (!containerInfo.restore) {
          containerInfo.restore = handleContainer(containerInfo, props);
        }
      }
      remove(modal, ariaHiddenState = true) {
        const modalIndex = this.modals.indexOf(modal);
        if (modalIndex === -1) {
          return modalIndex;
        }
        const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
        const containerInfo = this.containers[containerIndex];
        containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
        this.modals.splice(modalIndex, 1);
        if (containerInfo.modals.length === 0) {
          if (containerInfo.restore) {
            containerInfo.restore();
          }
          if (modal.modalRef) {
            ariaHidden(modal.modalRef, ariaHiddenState);
          }
          ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
          this.containers.splice(containerIndex, 1);
        } else {
          const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
          if (nextTop.modalRef) {
            ariaHidden(nextTop.modalRef, false);
          }
        }
        return modalIndex;
      }
      isTopModal(modal) {
        return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
      }
    };
  }
});

// node_modules/@mui/base/generateUtilityClasses/index.js
var init_generateUtilityClasses = __esm({
  "node_modules/@mui/base/generateUtilityClasses/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/generateUtilityClass/index.js
var init_generateUtilityClass = __esm({
  "node_modules/@mui/base/generateUtilityClass/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/Modal/modalClasses.js
function getModalUtilityClass(slot) {
  return generateUtilityClass("MuiModal", slot);
}
var modalClasses, modalClasses_default;
var init_modalClasses = __esm({
  "node_modules/@mui/base/Modal/modalClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    modalClasses = generateUtilityClasses("MuiModal", ["root", "hidden", "backdrop"]);
    modalClasses_default = modalClasses;
  }
});

// node_modules/@mui/base/utils/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}
var init_isHostComponent = __esm({
  "node_modules/@mui/base/utils/isHostComponent.js"() {
  }
});

// node_modules/@mui/base/utils/appendOwnerState.js
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === void 0 || isHostComponent(elementType)) {
    return otherProps;
  }
  return _extends({}, otherProps, {
    ownerState: _extends({}, otherProps.ownerState, ownerState)
  });
}
var init_appendOwnerState = __esm({
  "node_modules/@mui/base/utils/appendOwnerState.js"() {
    init_extends();
    init_isHostComponent();
  }
});

// node_modules/@mui/base/utils/areArraysEqual.js
function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}
var init_areArraysEqual = __esm({
  "node_modules/@mui/base/utils/areArraysEqual.js"() {
  }
});

// node_modules/@mui/base/utils/ClassNameConfigurator.js
function useClassNamesOverride(generateUtilityClass2) {
  const {
    disableDefaultClasses
  } = React4.useContext(ClassNameConfiguratorContext);
  return (slot) => {
    if (disableDefaultClasses) {
      return "";
    }
    return generateUtilityClass2(slot);
  };
}
var React4, import_jsx_runtime5, defaultContextValue, ClassNameConfiguratorContext;
var init_ClassNameConfigurator = __esm({
  "node_modules/@mui/base/utils/ClassNameConfigurator.js"() {
    React4 = __toESM(require_react());
    import_jsx_runtime5 = __toESM(require_jsx_runtime());
    defaultContextValue = {
      disableDefaultClasses: false
    };
    ClassNameConfiguratorContext = React4.createContext(defaultContextValue);
  }
});

// node_modules/@mui/base/utils/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var init_extractEventHandlers = __esm({
  "node_modules/@mui/base/utils/extractEventHandlers.js"() {
  }
});

// node_modules/@mui/base/utils/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState);
  }
  return componentProps;
}
var init_resolveComponentProps = __esm({
  "node_modules/@mui/base/utils/resolveComponentProps.js"() {
  }
});

// node_modules/@mui/base/utils/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var init_omitEventHandlers = __esm({
  "node_modules/@mui/base/utils/omitEventHandlers.js"() {
  }
});

// node_modules/@mui/base/utils/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_m_default(externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className, className, additionalProps == null ? void 0 : additionalProps.className);
    const mergedStyle2 = _extends({}, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
    const props2 = _extends({}, additionalProps, externalForwardedProps, externalSlotProps);
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers(_extends({}, externalForwardedProps, externalSlotProps));
  const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_m_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = _extends({}, internalSlotProps == null ? void 0 : internalSlotProps.style, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
  const props = _extends({}, internalSlotProps, additionalProps, otherPropsWithoutEventHandlers, componentsPropsWithoutEventHandlers);
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}
var init_mergeSlotProps = __esm({
  "node_modules/@mui/base/utils/mergeSlotProps.js"() {
    init_extends();
    init_clsx_m();
    init_extractEventHandlers();
    init_omitEventHandlers();
  }
});

// node_modules/@mui/base/utils/useSlotProps.js
function useSlotProps(parameters) {
  var _parameters$additiona;
  const {
    elementType,
    externalSlotProps,
    ownerState
  } = parameters, rest = _objectWithoutPropertiesLoose(parameters, _excluded);
  const resolvedComponentsProps = resolveComponentProps(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps(_extends({}, rest, {
    externalSlotProps: resolvedComponentsProps
  }));
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_parameters$additiona = parameters.additionalProps) == null ? void 0 : _parameters$additiona.ref);
  const props = appendOwnerState(elementType, _extends({}, mergedProps, {
    ref
  }), ownerState);
  return props;
}
var _excluded;
var init_useSlotProps = __esm({
  "node_modules/@mui/base/utils/useSlotProps.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_esm();
    init_appendOwnerState();
    init_mergeSlotProps();
    init_resolveComponentProps();
    _excluded = ["elementType", "externalSlotProps", "ownerState"];
  }
});

// node_modules/@mui/base/utils/PolymorphicComponent.js
var init_PolymorphicComponent = __esm({
  "node_modules/@mui/base/utils/PolymorphicComponent.js"() {
  }
});

// node_modules/@mui/base/utils/types.js
var init_types = __esm({
  "node_modules/@mui/base/utils/types.js"() {
  }
});

// node_modules/@mui/base/utils/index.js
var init_utils = __esm({
  "node_modules/@mui/base/utils/index.js"() {
    init_appendOwnerState();
    init_areArraysEqual();
    init_ClassNameConfigurator();
    init_extractEventHandlers();
    init_isHostComponent();
    init_resolveComponentProps();
    init_useSlotProps();
    init_mergeSlotProps();
    init_PolymorphicComponent();
    init_types();
  }
});

// node_modules/@mui/base/Modal/Modal.js
function getContainer2(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(children) {
  return children ? children.props.hasOwnProperty("in") : false;
}
var React5, import_prop_types4, import_jsx_runtime6, import_jsx_runtime7, _excluded2, useUtilityClasses, defaultManager, Modal, Modal_default;
var init_Modal = __esm({
  "node_modules/@mui/base/Modal/Modal.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React5 = __toESM(require_react());
    import_prop_types4 = __toESM(require_prop_types());
    init_esm();
    init_composeClasses();
    init_Portal2();
    init_ModalManager();
    init_FocusTrap2();
    init_modalClasses();
    init_utils();
    init_ClassNameConfigurator();
    import_jsx_runtime6 = __toESM(require_jsx_runtime());
    import_jsx_runtime7 = __toESM(require_jsx_runtime());
    _excluded2 = ["children", "closeAfterTransition", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onKeyDown", "open", "onTransitionEnter", "onTransitionExited", "slotProps", "slots"];
    useUtilityClasses = (ownerState) => {
      const {
        open,
        exited
      } = ownerState;
      const slots = {
        root: ["root", !open && exited && "hidden"],
        backdrop: ["backdrop"]
      };
      return composeClasses(slots, useClassNamesOverride(getModalUtilityClass));
    };
    defaultManager = new ModalManager();
    Modal = React5.forwardRef(function Modal2(props, forwardedRef) {
      var _props$ariaHidden, _slots$root;
      const {
        children,
        closeAfterTransition = false,
        container,
        disableAutoFocus = false,
        disableEnforceFocus = false,
        disableEscapeKeyDown = false,
        disablePortal = false,
        disableRestoreFocus = false,
        disableScrollLock = false,
        hideBackdrop = false,
        keepMounted = false,
        // private
        manager: managerProp = defaultManager,
        onBackdropClick,
        onClose,
        onKeyDown,
        open,
        onTransitionEnter,
        onTransitionExited,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
      const manager = managerProp;
      const [exited, setExited] = React5.useState(!open);
      const modal = React5.useRef({});
      const mountNodeRef = React5.useRef(null);
      const modalRef = React5.useRef(null);
      const handleRef = useForkRef(modalRef, forwardedRef);
      const hasTransition = getHasTransition(children);
      const ariaHiddenProp = (_props$ariaHidden = props["aria-hidden"]) != null ? _props$ariaHidden : true;
      const getDoc = () => ownerDocument(mountNodeRef.current);
      const getModal = () => {
        modal.current.modalRef = modalRef.current;
        modal.current.mountNode = mountNodeRef.current;
        return modal.current;
      };
      const handleMounted = () => {
        manager.mount(getModal(), {
          disableScrollLock
        });
        if (modalRef.current) {
          modalRef.current.scrollTop = 0;
        }
      };
      const handleOpen = useEventCallback(() => {
        const resolvedContainer = getContainer2(container) || getDoc().body;
        manager.add(getModal(), resolvedContainer);
        if (modalRef.current) {
          handleMounted();
        }
      });
      const isTopModal = React5.useCallback(() => manager.isTopModal(getModal()), [manager]);
      const handlePortalRef = useEventCallback((node) => {
        mountNodeRef.current = node;
        if (!node || !modalRef.current) {
          return;
        }
        if (open && isTopModal()) {
          handleMounted();
        } else {
          ariaHidden(modalRef.current, ariaHiddenProp);
        }
      });
      const handleClose = React5.useCallback(() => {
        manager.remove(getModal(), ariaHiddenProp);
      }, [manager, ariaHiddenProp]);
      React5.useEffect(() => {
        return () => {
          handleClose();
        };
      }, [handleClose]);
      React5.useEffect(() => {
        if (open) {
          handleOpen();
        } else if (!hasTransition || !closeAfterTransition) {
          handleClose();
        }
      }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
      const ownerState = _extends({}, props, {
        closeAfterTransition,
        disableAutoFocus,
        disableEnforceFocus,
        disableEscapeKeyDown,
        disablePortal,
        disableRestoreFocus,
        disableScrollLock,
        exited,
        hideBackdrop,
        keepMounted
      });
      const classes = useUtilityClasses(ownerState);
      const handleEnter = () => {
        setExited(false);
        if (onTransitionEnter) {
          onTransitionEnter();
        }
      };
      const handleExited = () => {
        setExited(true);
        if (onTransitionExited) {
          onTransitionExited();
        }
        if (closeAfterTransition) {
          handleClose();
        }
      };
      const handleBackdropClick = (event) => {
        if (event.target !== event.currentTarget) {
          return;
        }
        if (onBackdropClick) {
          onBackdropClick(event);
        }
        if (onClose) {
          onClose(event, "backdropClick");
        }
      };
      const handleKeyDown2 = (event) => {
        if (onKeyDown) {
          onKeyDown(event);
        }
        if (event.key !== "Escape" || !isTopModal()) {
          return;
        }
        if (!disableEscapeKeyDown) {
          event.stopPropagation();
          if (onClose) {
            onClose(event, "escapeKeyDown");
          }
        }
      };
      const childProps = {};
      if (children.props.tabIndex === void 0) {
        childProps.tabIndex = "-1";
      }
      if (hasTransition) {
        childProps.onEnter = createChainedFunction(handleEnter, children.props.onEnter);
        childProps.onExited = createChainedFunction(handleExited, children.props.onExited);
      }
      const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: handleRef,
          role: "presentation",
          onKeyDown: handleKeyDown2
        },
        className: classes.root,
        ownerState
      });
      const BackdropComponent = slots.backdrop;
      const backdropProps = useSlotProps({
        elementType: BackdropComponent,
        externalSlotProps: slotProps.backdrop,
        additionalProps: {
          "aria-hidden": true,
          onClick: handleBackdropClick,
          open
        },
        className: classes.backdrop,
        ownerState
      });
      if (!keepMounted && !open && (!hasTransition || exited)) {
        return null;
      }
      return (0, import_jsx_runtime6.jsx)(
        Portal_default,
        {
          ref: handlePortalRef,
          container,
          disablePortal,
          children: (0, import_jsx_runtime7.jsxs)(Root, _extends({}, rootProps, {
            children: [!hideBackdrop && BackdropComponent ? (0, import_jsx_runtime6.jsx)(BackdropComponent, _extends({}, backdropProps)) : null, (0, import_jsx_runtime6.jsx)(FocusTrap_default, {
              disableEnforceFocus,
              disableAutoFocus,
              disableRestoreFocus,
              isEnabled: isTopModal,
              open,
              children: React5.cloneElement(children, childProps)
            })]
          }))
        }
      );
    });
    true ? Modal.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * A single child content element.
       */
      children: elementAcceptingRef_default.isRequired,
      /**
       * When set to true the Modal waits until a nested Transition is completed before closing.
       * @default false
       */
      closeAfterTransition: import_prop_types4.default.bool,
      /**
       * An HTML element or function that returns one.
       * The `container` will have the portal children appended to it.
       *
       * By default, it uses the body of the top-level document object,
       * so it's simply `document.body` most of the time.
       */
      container: import_prop_types4.default.oneOfType([HTMLElementType, import_prop_types4.default.func]),
      /**
       * If `true`, the modal will not automatically shift focus to itself when it opens, and
       * replace it to the last focused element when it closes.
       * This also works correctly with any modal children that have the `disableAutoFocus` prop.
       *
       * Generally this should never be set to `true` as it makes the modal less
       * accessible to assistive technologies, like screen readers.
       * @default false
       */
      disableAutoFocus: import_prop_types4.default.bool,
      /**
       * If `true`, the modal will not prevent focus from leaving the modal while open.
       *
       * Generally this should never be set to `true` as it makes the modal less
       * accessible to assistive technologies, like screen readers.
       * @default false
       */
      disableEnforceFocus: import_prop_types4.default.bool,
      /**
       * If `true`, hitting escape will not fire the `onClose` callback.
       * @default false
       */
      disableEscapeKeyDown: import_prop_types4.default.bool,
      /**
       * The `children` will be under the DOM hierarchy of the parent component.
       * @default false
       */
      disablePortal: import_prop_types4.default.bool,
      /**
       * If `true`, the modal will not restore focus to previously focused element once
       * modal is hidden or unmounted.
       * @default false
       */
      disableRestoreFocus: import_prop_types4.default.bool,
      /**
       * Disable the scroll lock behavior.
       * @default false
       */
      disableScrollLock: import_prop_types4.default.bool,
      /**
       * If `true`, the backdrop is not rendered.
       * @default false
       */
      hideBackdrop: import_prop_types4.default.bool,
      /**
       * Always keep the children in the DOM.
       * This prop can be useful in SEO situation or
       * when you want to maximize the responsiveness of the Modal.
       * @default false
       */
      keepMounted: import_prop_types4.default.bool,
      /**
       * Callback fired when the backdrop is clicked.
       * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
       */
      onBackdropClick: import_prop_types4.default.func,
      /**
       * Callback fired when the component requests to be closed.
       * The `reason` parameter can optionally be used to control the response to `onClose`.
       *
       * @param {object} event The event source of the callback.
       * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
       */
      onClose: import_prop_types4.default.func,
      /**
       * A function called when a transition enters.
       */
      onTransitionEnter: import_prop_types4.default.func,
      /**
       * A function called when a transition has exited.
       */
      onTransitionExited: import_prop_types4.default.func,
      /**
       * If `true`, the component is shown.
       */
      open: import_prop_types4.default.bool.isRequired,
      /**
       * The props used for each slot inside the Modal.
       * @default {}
       */
      slotProps: import_prop_types4.default.shape({
        backdrop: import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object]),
        root: import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object])
      }),
      /**
       * The components used for each slot inside the Modal.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types4.default.shape({
        backdrop: import_prop_types4.default.elementType,
        root: import_prop_types4.default.elementType
      })
    } : void 0;
    Modal_default = Modal;
  }
});

// node_modules/@mui/base/Modal/Modal.types.js
var init_Modal_types = __esm({
  "node_modules/@mui/base/Modal/Modal.types.js"() {
  }
});

// node_modules/@mui/base/Modal/index.js
var init_Modal2 = __esm({
  "node_modules/@mui/base/Modal/index.js"() {
    init_Modal();
    init_Modal_types();
    init_ModalManager();
    init_ModalManager();
    init_modalClasses();
    init_modalClasses();
  }
});

// node_modules/@mui/base/NoSsr/NoSsr.js
function NoSsr(props) {
  const {
    children,
    defer = false,
    fallback = null
  } = props;
  const [mountedState, setMountedState] = React6.useState(false);
  useEnhancedEffect_default(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  React6.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);
  return (0, import_jsx_runtime8.jsx)(React6.Fragment, {
    children: mountedState ? children : fallback
  });
}
var React6, import_prop_types5, import_jsx_runtime8, NoSsr_default;
var init_NoSsr = __esm({
  "node_modules/@mui/base/NoSsr/NoSsr.js"() {
    React6 = __toESM(require_react());
    import_prop_types5 = __toESM(require_prop_types());
    init_esm();
    import_jsx_runtime8 = __toESM(require_jsx_runtime());
    true ? NoSsr.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * You can wrap a node.
       */
      children: import_prop_types5.default.node,
      /**
       * If `true`, the component will not only prevent server-side rendering.
       * It will also defer the rendering of the children into a different screen frame.
       * @default false
       */
      defer: import_prop_types5.default.bool,
      /**
       * The fallback content to display.
       * @default null
       */
      fallback: import_prop_types5.default.node
    } : void 0;
    if (true) {
      NoSsr["propTypes"] = exactProp(NoSsr.propTypes);
    }
    NoSsr_default = NoSsr;
  }
});

// node_modules/@mui/base/NoSsr/NoSsr.types.js
var init_NoSsr_types = __esm({
  "node_modules/@mui/base/NoSsr/NoSsr.types.js"() {
  }
});

// node_modules/@mui/base/NoSsr/index.js
var init_NoSsr2 = __esm({
  "node_modules/@mui/base/NoSsr/index.js"() {
    init_NoSsr();
    init_NoSsr_types();
  }
});

// node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js
function getStyleValue(value) {
  return parseInt(value, 10) || 0;
}
function isEmpty(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0 || obj.outerHeightStyle === 0 && !obj.overflow;
}
var React7, import_prop_types6, ReactDOM2, import_jsx_runtime9, import_jsx_runtime10, _excluded3, styles, TextareaAutosize, TextareaAutosize_default;
var init_TextareaAutosize = __esm({
  "node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React7 = __toESM(require_react());
    import_prop_types6 = __toESM(require_prop_types());
    ReactDOM2 = __toESM(require_react_dom());
    init_esm();
    import_jsx_runtime9 = __toESM(require_jsx_runtime());
    import_jsx_runtime10 = __toESM(require_jsx_runtime());
    _excluded3 = ["onChange", "maxRows", "minRows", "style", "value"];
    styles = {
      shadow: {
        // Visibility needed to hide the extra text area on iPads
        visibility: "hidden",
        // Remove from the content flow
        position: "absolute",
        // Ignore the scrollbar width
        overflow: "hidden",
        height: 0,
        top: 0,
        left: 0,
        // Create a new layer, increase the isolation of the computed values
        transform: "translateZ(0)"
      }
    };
    TextareaAutosize = React7.forwardRef(function TextareaAutosize2(props, forwardedRef) {
      const {
        onChange,
        maxRows,
        minRows = 1,
        style,
        value
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
      const {
        current: isControlled
      } = React7.useRef(value != null);
      const inputRef = React7.useRef(null);
      const handleRef = useForkRef(forwardedRef, inputRef);
      const shadowRef = React7.useRef(null);
      const renders = React7.useRef(0);
      const [state, setState] = React7.useState({
        outerHeightStyle: 0
      });
      const getUpdatedState = React7.useCallback(() => {
        const input = inputRef.current;
        const containerWindow = ownerWindow(input);
        const computedStyle = containerWindow.getComputedStyle(input);
        if (computedStyle.width === "0px") {
          return {
            outerHeightStyle: 0
          };
        }
        const inputShallow = shadowRef.current;
        inputShallow.style.width = computedStyle.width;
        inputShallow.value = input.value || props.placeholder || "x";
        if (inputShallow.value.slice(-1) === "\n") {
          inputShallow.value += " ";
        }
        const boxSizing = computedStyle.boxSizing;
        const padding = getStyleValue(computedStyle.paddingBottom) + getStyleValue(computedStyle.paddingTop);
        const border = getStyleValue(computedStyle.borderBottomWidth) + getStyleValue(computedStyle.borderTopWidth);
        const innerHeight = inputShallow.scrollHeight;
        inputShallow.value = "x";
        const singleRowHeight = inputShallow.scrollHeight;
        let outerHeight = innerHeight;
        if (minRows) {
          outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
        }
        if (maxRows) {
          outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
        }
        outerHeight = Math.max(outerHeight, singleRowHeight);
        const outerHeightStyle = outerHeight + (boxSizing === "border-box" ? padding + border : 0);
        const overflow = Math.abs(outerHeight - innerHeight) <= 1;
        return {
          outerHeightStyle,
          overflow
        };
      }, [maxRows, minRows, props.placeholder]);
      const updateState = (prevState, newState) => {
        const {
          outerHeightStyle,
          overflow
        } = newState;
        if (renders.current < 20 && (outerHeightStyle > 0 && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1 || prevState.overflow !== overflow)) {
          renders.current += 1;
          return {
            overflow,
            outerHeightStyle
          };
        }
        if (true) {
          if (renders.current === 20) {
            console.error(["MUI: Too many re-renders. The layout is unstable.", "TextareaAutosize limits the number of renders to prevent an infinite loop."].join("\n"));
          }
        }
        return prevState;
      };
      const syncHeight = React7.useCallback(() => {
        const newState = getUpdatedState();
        if (isEmpty(newState)) {
          return;
        }
        setState((prevState) => {
          return updateState(prevState, newState);
        });
      }, [getUpdatedState]);
      const syncHeightWithFlushSync = () => {
        const newState = getUpdatedState();
        if (isEmpty(newState)) {
          return;
        }
        ReactDOM2.flushSync(() => {
          setState((prevState) => {
            return updateState(prevState, newState);
          });
        });
      };
      React7.useEffect(() => {
        const handleResize = debounce(() => {
          renders.current = 0;
          if (inputRef.current) {
            syncHeightWithFlushSync();
          }
        });
        let resizeObserver;
        const input = inputRef.current;
        const containerWindow = ownerWindow(input);
        containerWindow.addEventListener("resize", handleResize);
        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(handleResize);
          resizeObserver.observe(input);
        }
        return () => {
          handleResize.clear();
          containerWindow.removeEventListener("resize", handleResize);
          if (resizeObserver) {
            resizeObserver.disconnect();
          }
        };
      });
      useEnhancedEffect_default(() => {
        syncHeight();
      });
      React7.useEffect(() => {
        renders.current = 0;
      }, [value]);
      const handleChange = (event) => {
        renders.current = 0;
        if (!isControlled) {
          syncHeight();
        }
        if (onChange) {
          onChange(event);
        }
      };
      return (0, import_jsx_runtime10.jsxs)(React7.Fragment, {
        children: [(0, import_jsx_runtime9.jsx)("textarea", _extends({
          value,
          onChange: handleChange,
          ref: handleRef,
          rows: minRows,
          style: _extends({
            height: state.outerHeightStyle,
            // Need a large enough difference to allow scrolling.
            // This prevents infinite rendering loop.
            overflow: state.overflow ? "hidden" : void 0
          }, style)
        }, other)), (0, import_jsx_runtime9.jsx)("textarea", {
          "aria-hidden": true,
          className: props.className,
          readOnly: true,
          ref: shadowRef,
          tabIndex: -1,
          style: _extends({}, styles.shadow, style, {
            padding: 0
          })
        })]
      });
    });
    true ? TextareaAutosize.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * @ignore
       */
      className: import_prop_types6.default.string,
      /**
       * Maximum number of rows to display.
       */
      maxRows: import_prop_types6.default.oneOfType([import_prop_types6.default.number, import_prop_types6.default.string]),
      /**
       * Minimum number of rows to display.
       * @default 1
       */
      minRows: import_prop_types6.default.oneOfType([import_prop_types6.default.number, import_prop_types6.default.string]),
      /**
       * @ignore
       */
      onChange: import_prop_types6.default.func,
      /**
       * @ignore
       */
      placeholder: import_prop_types6.default.string,
      /**
       * @ignore
       */
      style: import_prop_types6.default.object,
      /**
       * @ignore
       */
      value: import_prop_types6.default.oneOfType([import_prop_types6.default.arrayOf(import_prop_types6.default.string), import_prop_types6.default.number, import_prop_types6.default.string])
    } : void 0;
    TextareaAutosize_default = TextareaAutosize;
  }
});

// node_modules/@mui/base/TextareaAutosize/TextareaAutosize.types.js
var init_TextareaAutosize_types = __esm({
  "node_modules/@mui/base/TextareaAutosize/TextareaAutosize.types.js"() {
  }
});

// node_modules/@mui/base/TextareaAutosize/index.js
var init_TextareaAutosize2 = __esm({
  "node_modules/@mui/base/TextareaAutosize/index.js"() {
    init_TextareaAutosize();
    init_TextareaAutosize_types();
  }
});

// node_modules/@mui/base/useAutocomplete/useAutocomplete.js
function stripDiacritics(string) {
  return typeof string.normalize !== "undefined" ? string.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : string;
}
function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = "any",
    stringify,
    trim = false
  } = config;
  return (options, {
    inputValue,
    getOptionLabel
  }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }
    const filteredOptions = !input ? options : options.filter((option) => {
      let candidate = (stringify || getOptionLabel)(option);
      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }
      return matchFrom === "start" ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === "number" ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }
  return -1;
}
function useAutocomplete(props) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_isActiveElementInListbox = defaultIsActiveElementInListbox,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_classNamePrefix = "Mui",
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    componentName = "useAutocomplete",
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled: disabledProp,
    disabledItemsFocusable = false,
    disableListWrap = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionLabel: getOptionLabelProp = (option) => {
      var _option$label;
      return (_option$label = option.label) != null ? _option$label : option;
    },
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    isOptionEqualToValue = (option, value2) => option === value2,
    multiple = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    options,
    readOnly = false,
    selectOnFocus = !props.freeSolo,
    value: valueProp
  } = props;
  const id = useId(idProp);
  let getOptionLabel = getOptionLabelProp;
  getOptionLabel = (option) => {
    const optionLabel = getOptionLabelProp(option);
    if (typeof optionLabel !== "string") {
      if (true) {
        const erroneousReturn = optionLabel === void 0 ? "undefined" : `${typeof optionLabel} (${optionLabel})`;
        console.error(`MUI: The \`getOptionLabel\` method of ${componentName} returned ${erroneousReturn} instead of a string for ${JSON.stringify(option)}.`);
      }
      return String(optionLabel);
    }
    return optionLabel;
  };
  const ignoreFocus = React8.useRef(false);
  const firstFocus = React8.useRef(true);
  const inputRef = React8.useRef(null);
  const listboxRef = React8.useRef(null);
  const [anchorEl, setAnchorEl] = React8.useState(null);
  const [focusedTag, setFocusedTag] = React8.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = React8.useRef(defaultHighlighted);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName
  });
  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: "",
    name: componentName,
    state: "inputValue"
  });
  const [focused, setFocused] = React8.useState(false);
  const resetInputValue = React8.useCallback((event, newValue) => {
    const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;
    if (!isOptionSelected && !clearOnBlur) {
      return;
    }
    let newInputValue;
    if (multiple) {
      newInputValue = "";
    } else if (newValue == null) {
      newInputValue = "";
    } else {
      const optionLabel = getOptionLabel(newValue);
      newInputValue = typeof optionLabel === "string" ? optionLabel : "";
    }
    if (inputValue === newInputValue) {
      return;
    }
    setInputValueState(newInputValue);
    if (onInputChange) {
      onInputChange(event, newInputValue, "reset");
    }
  }, [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState, clearOnBlur, value]);
  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: "open"
  });
  const [inputPristine, setInputPristine] = React8.useState(true);
  const inputValueIsSelectedValue = !multiple && value != null && inputValue === getOptionLabel(value);
  const popupOpen = open && !readOnly;
  const filteredOptions = popupOpen ? filterOptions(
    options.filter((option) => {
      if (filterSelectedOptions && (multiple ? value : [value]).some((value2) => value2 !== null && isOptionEqualToValue(option, value2))) {
        return false;
      }
      return true;
    }),
    // we use the empty string to manipulate `filterOptions` to not filter any options
    // i.e. the filter predicate always returns true
    {
      inputValue: inputValueIsSelectedValue && inputPristine ? "" : inputValue,
      getOptionLabel
    }
  ) : [];
  const previousProps = usePreviousProps_default({
    filteredOptions,
    value,
    inputValue
  });
  React8.useEffect(() => {
    const valueChange = value !== previousProps.value;
    if (focused && !valueChange) {
      return;
    }
    if (freeSolo && !valueChange) {
      return;
    }
    resetInputValue(null, value);
  }, [value, resetInputValue, focused, previousProps.value, freeSolo]);
  const listboxAvailable = open && filteredOptions.length > 0 && !readOnly;
  if (true) {
    if (value !== null && !freeSolo && options.length > 0) {
      const missingValue = (multiple ? value : [value]).filter((value2) => !options.some((option) => isOptionEqualToValue(option, value2)));
      if (missingValue.length > 0) {
        console.warn([`MUI: The value provided to ${componentName} is invalid.`, `None of the options match with \`${missingValue.length > 1 ? JSON.stringify(missingValue) : JSON.stringify(missingValue[0])}\`.`, "You can use the `isOptionEqualToValue` prop to customize the equality test."].join("\n"));
      }
    }
  }
  const focusTag = useEventCallback((tagToFocus) => {
    if (tagToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-tag-index="${tagToFocus}"]`).focus();
    }
  });
  React8.useEffect(() => {
    if (multiple && focusedTag > value.length - 1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
  }, [value, multiple, focusedTag, focusTag]);
  function validOptionIndex(index, direction) {
    if (!listboxRef.current || index === -1) {
      return -1;
    }
    let nextFocus = index;
    while (true) {
      if (direction === "next" && nextFocus === filteredOptions.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`);
      const nextFocusDisabled = disabledItemsFocusable ? false : !option || option.disabled || option.getAttribute("aria-disabled") === "true";
      if (option && !option.hasAttribute("tabindex") || nextFocusDisabled) {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const setHighlightedIndex = useEventCallback(({
    event,
    index,
    reason = "auto"
  }) => {
    highlightedIndexRef.current = index;
    if (index === -1) {
      inputRef.current.removeAttribute("aria-activedescendant");
    } else {
      inputRef.current.setAttribute("aria-activedescendant", `${id}-option-${index}`);
    }
    if (onHighlightChange) {
      onHighlightChange(event, index === -1 ? null : filteredOptions[index], reason);
    }
    if (!listboxRef.current) {
      return;
    }
    const prev = listboxRef.current.querySelector(`[role="option"].${unstable_classNamePrefix}-focused`);
    if (prev) {
      prev.classList.remove(`${unstable_classNamePrefix}-focused`);
      prev.classList.remove(`${unstable_classNamePrefix}-focusVisible`);
    }
    let listboxNode = listboxRef.current;
    if (listboxRef.current.getAttribute("role") !== "listbox") {
      listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]');
    }
    if (!listboxNode) {
      return;
    }
    if (index === -1) {
      listboxNode.scrollTop = 0;
      return;
    }
    const option = listboxRef.current.querySelector(`[data-option-index="${index}"]`);
    if (!option) {
      return;
    }
    option.classList.add(`${unstable_classNamePrefix}-focused`);
    if (reason === "keyboard") {
      option.classList.add(`${unstable_classNamePrefix}-focusVisible`);
    }
    if (listboxNode.scrollHeight > listboxNode.clientHeight && reason !== "mouse") {
      const element = option;
      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
      }
    }
  });
  const changeHighlightedIndex = useEventCallback(({
    event,
    diff,
    direction = "next",
    reason = "auto"
  }) => {
    if (!popupOpen) {
      return;
    }
    const getNextIndex = () => {
      const maxIndex = filteredOptions.length - 1;
      if (diff === "reset") {
        return defaultHighlighted;
      }
      if (diff === "start") {
        return 0;
      }
      if (diff === "end") {
        return maxIndex;
      }
      const newIndex = highlightedIndexRef.current + diff;
      if (newIndex < 0) {
        if (newIndex === -1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap && highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
          return 0;
        }
        return maxIndex;
      }
      if (newIndex > maxIndex) {
        if (newIndex === maxIndex + 1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap || Math.abs(diff) > 1) {
          return maxIndex;
        }
        return 0;
      }
      return newIndex;
    };
    const nextIndex = validOptionIndex(getNextIndex(), direction);
    setHighlightedIndex({
      index: nextIndex,
      reason,
      event
    });
    if (autoComplete && diff !== "reset") {
      if (nextIndex === -1) {
        inputRef.current.value = inputValue;
      } else {
        const option = getOptionLabel(filteredOptions[nextIndex]);
        inputRef.current.value = option;
        const index = option.toLowerCase().indexOf(inputValue.toLowerCase());
        if (index === 0 && inputValue.length > 0) {
          inputRef.current.setSelectionRange(inputValue.length, option.length);
        }
      }
    }
  });
  const checkHighlightedOptionExists = () => {
    const isSameValue = (value1, value2) => {
      const label1 = value1 ? getOptionLabel(value1) : "";
      const label2 = value2 ? getOptionLabel(value2) : "";
      return label1 === label2;
    };
    if (highlightedIndexRef.current !== -1 && previousProps.filteredOptions && previousProps.filteredOptions.length !== filteredOptions.length && previousProps.inputValue === inputValue && (multiple ? value.length === previousProps.value.length && previousProps.value.every((val, i) => getOptionLabel(value[i]) === getOptionLabel(val)) : isSameValue(previousProps.value, value))) {
      const previousHighlightedOption = previousProps.filteredOptions[highlightedIndexRef.current];
      if (previousHighlightedOption) {
        const previousHighlightedOptionExists = filteredOptions.some((option) => {
          return getOptionLabel(option) === getOptionLabel(previousHighlightedOption);
        });
        if (previousHighlightedOptionExists) {
          return true;
        }
      }
    }
    return false;
  };
  const syncHighlightedIndex = React8.useCallback(() => {
    if (!popupOpen) {
      return;
    }
    if (checkHighlightedOptionExists()) {
      return;
    }
    const valueItem = multiple ? value[0] : value;
    if (filteredOptions.length === 0 || valueItem == null) {
      changeHighlightedIndex({
        diff: "reset"
      });
      return;
    }
    if (!listboxRef.current) {
      return;
    }
    if (valueItem != null) {
      const currentOption = filteredOptions[highlightedIndexRef.current];
      if (multiple && currentOption && findIndex(value, (val) => isOptionEqualToValue(currentOption, val)) !== -1) {
        return;
      }
      const itemIndex = findIndex(filteredOptions, (optionItem) => isOptionEqualToValue(optionItem, valueItem));
      if (itemIndex === -1) {
        changeHighlightedIndex({
          diff: "reset"
        });
      } else {
        setHighlightedIndex({
          index: itemIndex
        });
      }
      return;
    }
    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({
        index: filteredOptions.length - 1
      });
      return;
    }
    setHighlightedIndex({
      index: highlightedIndexRef.current
    });
  }, [
    // Only sync the highlighted index when the option switch between empty and not
    filteredOptions.length,
    // Don't sync the highlighted index with the value when multiple
    // eslint-disable-next-line react-hooks/exhaustive-deps
    multiple ? false : value,
    filterSelectedOptions,
    changeHighlightedIndex,
    setHighlightedIndex,
    popupOpen,
    inputValue,
    multiple
  ]);
  const handleListboxRef = useEventCallback((node) => {
    setRef(listboxRef, node);
    if (!node) {
      return;
    }
    syncHighlightedIndex();
  });
  if (true) {
    React8.useEffect(() => {
      if (!inputRef.current || inputRef.current.nodeName !== "INPUT") {
        if (inputRef.current && inputRef.current.nodeName === "TEXTAREA") {
          console.warn([`A textarea element was provided to ${componentName} where input was expected.`, `This is not a supported scenario but it may work under certain conditions.`, `A textarea keyboard navigation may conflict with Autocomplete controls (e.g. enter and arrow keys).`, `Make sure to test keyboard navigation and add custom event handlers if necessary.`].join("\n"));
        } else {
          console.error([`MUI: Unable to find the input element. It was resolved to ${inputRef.current} while an HTMLInputElement was expected.`, `Instead, ${componentName} expects an input element.`, "", componentName === "useAutocomplete" ? "Make sure you have bound getInputProps correctly and that the normal ref/effect resolutions order is guaranteed." : "Make sure you have customized the input component correctly."].join("\n"));
        }
      }
    }, [componentName]);
  }
  React8.useEffect(() => {
    syncHighlightedIndex();
  }, [syncHighlightedIndex]);
  const handleOpen = (event) => {
    if (open) {
      return;
    }
    setOpenState(true);
    setInputPristine(true);
    if (onOpen) {
      onOpen(event);
    }
  };
  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }
    setOpenState(false);
    if (onClose) {
      onClose(event, reason);
    }
  };
  const handleValue = (event, newValue, reason, details) => {
    if (multiple) {
      if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) {
        return;
      }
    } else if (value === newValue) {
      return;
    }
    if (onChange) {
      onChange(event, newValue, reason, details);
    }
    setValueState(newValue);
  };
  const isTouch = React8.useRef(false);
  const selectNewValue = (event, option, reasonProp = "selectOption", origin = "options") => {
    let reason = reasonProp;
    let newValue = option;
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      if (true) {
        const matches = newValue.filter((val) => isOptionEqualToValue(option, val));
        if (matches.length > 1) {
          console.error([`MUI: The \`isOptionEqualToValue\` method of ${componentName} does not handle the arguments correctly.`, `The component expects a single value to match a given option but found ${matches.length} matches.`].join("\n"));
        }
      }
      const itemIndex = findIndex(newValue, (valueItem) => isOptionEqualToValue(option, valueItem));
      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== "freeSolo") {
        newValue.splice(itemIndex, 1);
        reason = "removeOption";
      }
    }
    resetInputValue(event, newValue);
    handleValue(event, newValue, reason, {
      option
    });
    if (!disableCloseOnSelect && (!event || !event.ctrlKey && !event.metaKey)) {
      handleClose(event, reason);
    }
    if (blurOnSelect === true || blurOnSelect === "touch" && isTouch.current || blurOnSelect === "mouse" && !isTouch.current) {
      inputRef.current.blur();
    }
  };
  function validTagIndex(index, direction) {
    if (index === -1) {
      return -1;
    }
    let nextFocus = index;
    while (true) {
      if (direction === "next" && nextFocus === value.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = anchorEl.querySelector(`[data-tag-index="${nextFocus}"]`);
      if (!option || !option.hasAttribute("tabindex") || option.disabled || option.getAttribute("aria-disabled") === "true") {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const handleFocusTag = (event, direction) => {
    if (!multiple) {
      return;
    }
    if (inputValue === "") {
      handleClose(event, "toggleInput");
    }
    let nextTag = focusedTag;
    if (focusedTag === -1) {
      if (inputValue === "" && direction === "previous") {
        nextTag = value.length - 1;
      }
    } else {
      nextTag += direction === "next" ? 1 : -1;
      if (nextTag < 0) {
        nextTag = 0;
      }
      if (nextTag === value.length) {
        nextTag = -1;
      }
    }
    nextTag = validTagIndex(nextTag, direction);
    setFocusedTag(nextTag);
    focusTag(nextTag);
  };
  const handleClear = (event) => {
    ignoreFocus.current = true;
    setInputValueState("");
    if (onInputChange) {
      onInputChange(event, "", "clear");
    }
    handleValue(event, multiple ? [] : null, "clear");
  };
  const handleKeyDown2 = (other) => (event) => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }
    if (event.defaultMuiPrevented) {
      return;
    }
    if (focusedTag !== -1 && ["ArrowLeft", "ArrowRight"].indexOf(event.key) === -1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
    if (event.which !== 229) {
      switch (event.key) {
        case "Home":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "start",
              direction: "next",
              reason: "keyboard",
              event
            });
          }
          break;
        case "End":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "end",
              direction: "previous",
              reason: "keyboard",
              event
            });
          }
          break;
        case "PageUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -pageSize,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "PageDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: pageSize,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: 1,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -1,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowLeft":
          handleFocusTag(event, "previous");
          break;
        case "ArrowRight":
          handleFocusTag(event, "next");
          break;
        case "Enter":
          if (highlightedIndexRef.current !== -1 && popupOpen) {
            const option = filteredOptions[highlightedIndexRef.current];
            const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
            event.preventDefault();
            if (disabled) {
              return;
            }
            selectNewValue(event, option, "selectOption");
            if (autoComplete) {
              inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
            }
          } else if (freeSolo && inputValue !== "" && inputValueIsSelectedValue === false) {
            if (multiple) {
              event.preventDefault();
            }
            selectNewValue(event, inputValue, "createOption", "freeSolo");
          }
          break;
        case "Escape":
          if (popupOpen) {
            event.preventDefault();
            event.stopPropagation();
            handleClose(event, "escape");
          } else if (clearOnEscape && (inputValue !== "" || multiple && value.length > 0)) {
            event.preventDefault();
            event.stopPropagation();
            handleClear(event);
          }
          break;
        case "Backspace":
          if (multiple && !readOnly && inputValue === "" && value.length > 0) {
            const index = focusedTag === -1 ? value.length - 1 : focusedTag;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, "removeOption", {
              option: value[index]
            });
          }
          break;
        case "Delete":
          if (multiple && !readOnly && inputValue === "" && value.length > 0 && focusedTag !== -1) {
            const index = focusedTag;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, "removeOption", {
              option: value[index]
            });
          }
          break;
        default:
      }
    }
  };
  const handleFocus = (event) => {
    setFocused(true);
    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };
  const handleBlur2 = (event) => {
    if (unstable_isActiveElementInListbox(listboxRef)) {
      inputRef.current.focus();
      return;
    }
    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;
    if (autoSelect && highlightedIndexRef.current !== -1 && popupOpen) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], "blur");
    } else if (autoSelect && freeSolo && inputValue !== "") {
      selectNewValue(event, inputValue, "blur", "freeSolo");
    } else if (clearOnBlur) {
      resetInputValue(event, value);
    }
    handleClose(event, "blur");
  };
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (inputValue !== newValue) {
      setInputValueState(newValue);
      setInputPristine(false);
      if (onInputChange) {
        onInputChange(event, newValue, "input");
      }
    }
    if (newValue === "") {
      if (!disableClearable && !multiple) {
        handleValue(event, null, "clear");
      }
    } else {
      handleOpen(event);
    }
  };
  const handleOptionMouseMove = (event) => {
    const index = Number(event.currentTarget.getAttribute("data-option-index"));
    if (highlightedIndexRef.current !== index) {
      setHighlightedIndex({
        event,
        index,
        reason: "mouse"
      });
    }
  };
  const handleOptionTouchStart = (event) => {
    setHighlightedIndex({
      event,
      index: Number(event.currentTarget.getAttribute("data-option-index")),
      reason: "touch"
    });
    isTouch.current = true;
  };
  const handleOptionClick = (event) => {
    const index = Number(event.currentTarget.getAttribute("data-option-index"));
    selectNewValue(event, filteredOptions[index], "selectOption");
    isTouch.current = false;
  };
  const handleTagDelete = (index) => (event) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(event, newValue, "removeOption", {
      option: value[index]
    });
  };
  const handlePopupIndicator = (event) => {
    if (open) {
      handleClose(event, "toggleInput");
    } else {
      handleOpen(event);
    }
  };
  const handleMouseDown = (event) => {
    if (!event.currentTarget.contains(event.target)) {
      return;
    }
    if (event.target.getAttribute("id") !== id) {
      event.preventDefault();
    }
  };
  const handleClick = (event) => {
    if (!event.currentTarget.contains(event.target)) {
      return;
    }
    inputRef.current.focus();
    if (selectOnFocus && firstFocus.current && inputRef.current.selectionEnd - inputRef.current.selectionStart === 0) {
      inputRef.current.select();
    }
    firstFocus.current = false;
  };
  const handleInputMouseDown = (event) => {
    if (inputValue === "" || !open) {
      handlePopupIndicator(event);
    }
  };
  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);
  let groupedOptions = filteredOptions;
  if (groupBy) {
    const indexBy = /* @__PURE__ */ new Map();
    let warn = false;
    groupedOptions = filteredOptions.reduce((acc, option, index) => {
      const group = groupBy(option);
      if (acc.length > 0 && acc[acc.length - 1].group === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        if (true) {
          if (indexBy.get(group) && !warn) {
            console.warn(`MUI: The options provided combined with the \`groupBy\` method of ${componentName} returns duplicated headers.`, "You can solve the issue by sorting the options with the output of `groupBy`.");
            warn = true;
          }
          indexBy.set(group, true);
        }
        acc.push({
          key: index,
          index,
          group,
          options: [option]
        });
      }
      return acc;
    }, []);
  }
  if (disabledProp && focused) {
    handleBlur2();
  }
  return {
    getRootProps: (other = {}) => _extends({
      "aria-owns": listboxAvailable ? `${id}-listbox` : null
    }, other, {
      onKeyDown: handleKeyDown2(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick
    }),
    getInputLabelProps: () => ({
      id: `${id}-label`,
      htmlFor: id
    }),
    getInputProps: () => ({
      id,
      value: inputValue,
      onBlur: handleBlur2,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      // if open then this is handled imperatively so don't let react override
      // only have an opinion about this when closed
      "aria-activedescendant": popupOpen ? "" : null,
      "aria-autocomplete": autoComplete ? "both" : "list",
      "aria-controls": listboxAvailable ? `${id}-listbox` : void 0,
      "aria-expanded": listboxAvailable,
      // Disable browser's suggestion that might overlap with the popup.
      // Handle autocomplete but not autofill.
      autoComplete: "off",
      ref: inputRef,
      autoCapitalize: "none",
      spellCheck: "false",
      role: "combobox",
      disabled: disabledProp
    }),
    getClearProps: () => ({
      tabIndex: -1,
      onClick: handleClear
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      onClick: handlePopupIndicator
    }),
    getTagProps: ({
      index
    }) => _extends({
      key: index,
      "data-tag-index": index,
      tabIndex: -1
    }, !readOnly && {
      onDelete: handleTagDelete(index)
    }),
    getListboxProps: () => ({
      role: "listbox",
      id: `${id}-listbox`,
      "aria-labelledby": `${id}-label`,
      ref: handleListboxRef,
      onMouseDown: (event) => {
        event.preventDefault();
      }
    }),
    getOptionProps: ({
      index,
      option
    }) => {
      const selected = (multiple ? value : [value]).some((value2) => value2 != null && isOptionEqualToValue(option, value2));
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
      return {
        key: getOptionLabel(option),
        tabIndex: -1,
        role: "option",
        id: `${id}-option-${index}`,
        onMouseMove: handleOptionMouseMove,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        "data-option-index": index,
        "aria-disabled": disabled,
        "aria-selected": selected
      };
    },
    id,
    inputValue,
    value,
    dirty,
    expanded: popupOpen && anchorEl,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    groupedOptions
  };
}
var React8, defaultFilterOptions, pageSize, defaultIsActiveElementInListbox;
var init_useAutocomplete = __esm({
  "node_modules/@mui/base/useAutocomplete/useAutocomplete.js"() {
    init_extends();
    React8 = __toESM(require_react());
    init_esm();
    defaultFilterOptions = createFilterOptions();
    pageSize = 5;
    defaultIsActiveElementInListbox = (listboxRef) => {
      var _listboxRef$current$p;
      return listboxRef.current !== null && ((_listboxRef$current$p = listboxRef.current.parentElement) == null ? void 0 : _listboxRef$current$p.contains(document.activeElement));
    };
  }
});

// node_modules/@mui/base/useAutocomplete/index.js
var init_useAutocomplete2 = __esm({
  "node_modules/@mui/base/useAutocomplete/index.js"() {
    init_useAutocomplete();
    init_useAutocomplete();
  }
});

// node_modules/@mui/base/useBadge/useBadge.js
function useBadge(parameters) {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false
  } = parameters;
  const prevProps = usePreviousProps_default({
    badgeContent: badgeContentProp,
    max: maxProp
  });
  let invisible = invisibleProp;
  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }
  const {
    badgeContent,
    max = maxProp
  } = invisible ? prevProps : parameters;
  const displayValue = badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;
  return {
    badgeContent,
    invisible,
    max,
    displayValue
  };
}
var init_useBadge = __esm({
  "node_modules/@mui/base/useBadge/useBadge.js"() {
    init_esm();
  }
});

// node_modules/@mui/base/useBadge/useBadge.types.js
var init_useBadge_types = __esm({
  "node_modules/@mui/base/useBadge/useBadge.types.js"() {
  }
});

// node_modules/@mui/base/useBadge/index.js
var init_useBadge2 = __esm({
  "node_modules/@mui/base/useBadge/index.js"() {
    init_useBadge();
    init_useBadge_types();
  }
});

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default;
var init_applyStyles = __esm({
  "node_modules/@popperjs/core/lib/modifiers/applyStyles.js"() {
    init_getNodeName();
    init_instanceOf();
    applyStyles_default = {
      name: "applyStyles",
      enabled: true,
      phase: "write",
      fn: applyStyles,
      effect,
      requires: ["computeStyles"]
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/index.js
var init_modifiers = __esm({
  "node_modules/@popperjs/core/lib/modifiers/index.js"() {
    init_applyStyles();
    init_arrow();
    init_computeStyles();
    init_eventListeners();
    init_flip();
    init_hide();
    init_offset();
    init_popperOffsets();
    init_preventOverflow();
  }
});

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers, createPopper;
var init_popper_lite = __esm({
  "node_modules/@popperjs/core/lib/popper-lite.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
    createPopper = popperGenerator({
      defaultModifiers
    });
  }
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2, createPopper2;
var init_popper = __esm({
  "node_modules/@popperjs/core/lib/popper.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    init_offset();
    init_flip();
    init_preventOverflow();
    init_arrow();
    init_hide();
    init_popper_lite();
    init_modifiers();
    defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
    createPopper2 = popperGenerator({
      defaultModifiers: defaultModifiers2
    });
  }
});

// node_modules/@popperjs/core/lib/index.js
var init_lib = __esm({
  "node_modules/@popperjs/core/lib/index.js"() {
    init_enums();
    init_modifiers();
    init_createPopper();
    init_popper();
    init_popper_lite();
  }
});

// node_modules/@mui/base/Popper/popperClasses.js
function getPopperUtilityClass(slot) {
  return generateUtilityClass("MuiPopper", slot);
}
var popperClasses;
var init_popperClasses = __esm({
  "node_modules/@mui/base/Popper/popperClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    popperClasses = generateUtilityClasses("MuiPopper", ["root"]);
  }
});

// node_modules/@mui/base/Popper/Popper.js
function flipPlacement(placement, direction) {
  if (direction === "ltr") {
    return placement;
  }
  switch (placement) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return placement;
  }
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
function isHTMLElement2(element) {
  return element.nodeType !== void 0;
}
function isVirtualElement(element) {
  return !isHTMLElement2(element);
}
var React9, import_prop_types7, import_jsx_runtime11, _excluded4, _excluded22, useUtilityClasses2, defaultPopperOptions, PopperTooltip, Popper, Popper_default;
var init_Popper = __esm({
  "node_modules/@mui/base/Popper/Popper.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React9 = __toESM(require_react());
    init_esm();
    init_lib();
    import_prop_types7 = __toESM(require_prop_types());
    init_composeClasses();
    init_Portal2();
    init_popperClasses();
    init_utils();
    init_ClassNameConfigurator();
    import_jsx_runtime11 = __toESM(require_jsx_runtime());
    _excluded4 = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"];
    _excluded22 = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
    useUtilityClasses2 = () => {
      const slots = {
        root: ["root"]
      };
      return composeClasses(slots, useClassNamesOverride(getPopperUtilityClass));
    };
    defaultPopperOptions = {};
    PopperTooltip = React9.forwardRef(function PopperTooltip2(props, forwardedRef) {
      var _slots$root;
      const {
        anchorEl,
        children,
        direction,
        disablePortal,
        modifiers,
        open,
        placement: initialPlacement,
        popperOptions,
        popperRef: popperRefProp,
        slotProps = {},
        slots = {},
        TransitionProps
        // @ts-ignore internal logic
        // prevent from spreading to DOM, it can come from the parent component e.g. Select.
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
      const tooltipRef = React9.useRef(null);
      const ownRef = useForkRef(tooltipRef, forwardedRef);
      const popperRef = React9.useRef(null);
      const handlePopperRef = useForkRef(popperRef, popperRefProp);
      const handlePopperRefRef = React9.useRef(handlePopperRef);
      useEnhancedEffect_default(() => {
        handlePopperRefRef.current = handlePopperRef;
      }, [handlePopperRef]);
      React9.useImperativeHandle(popperRefProp, () => popperRef.current, []);
      const rtlPlacement = flipPlacement(initialPlacement, direction);
      const [placement, setPlacement] = React9.useState(rtlPlacement);
      const [resolvedAnchorElement, setResolvedAnchorElement] = React9.useState(resolveAnchorEl(anchorEl));
      React9.useEffect(() => {
        if (popperRef.current) {
          popperRef.current.forceUpdate();
        }
      });
      React9.useEffect(() => {
        if (anchorEl) {
          setResolvedAnchorElement(resolveAnchorEl(anchorEl));
        }
      }, [anchorEl]);
      useEnhancedEffect_default(() => {
        if (!resolvedAnchorElement || !open) {
          return void 0;
        }
        const handlePopperUpdate = (data) => {
          setPlacement(data.placement);
        };
        if (true) {
          if (resolvedAnchorElement && isHTMLElement2(resolvedAnchorElement) && resolvedAnchorElement.nodeType === 1) {
            const box = resolvedAnchorElement.getBoundingClientRect();
            if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
              console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
            }
          }
        }
        let popperModifiers = [{
          name: "preventOverflow",
          options: {
            altBoundary: disablePortal
          }
        }, {
          name: "flip",
          options: {
            altBoundary: disablePortal
          }
        }, {
          name: "onUpdate",
          enabled: true,
          phase: "afterWrite",
          fn: ({
            state
          }) => {
            handlePopperUpdate(state);
          }
        }];
        if (modifiers != null) {
          popperModifiers = popperModifiers.concat(modifiers);
        }
        if (popperOptions && popperOptions.modifiers != null) {
          popperModifiers = popperModifiers.concat(popperOptions.modifiers);
        }
        const popper = createPopper2(resolvedAnchorElement, tooltipRef.current, _extends({
          placement: rtlPlacement
        }, popperOptions, {
          modifiers: popperModifiers
        }));
        handlePopperRefRef.current(popper);
        return () => {
          popper.destroy();
          handlePopperRefRef.current(null);
        };
      }, [resolvedAnchorElement, disablePortal, modifiers, open, popperOptions, rtlPlacement]);
      const childProps = {
        placement
      };
      if (TransitionProps !== null) {
        childProps.TransitionProps = TransitionProps;
      }
      const classes = useUtilityClasses2();
      const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          role: "tooltip",
          ref: ownRef
        },
        ownerState: props,
        className: classes.root
      });
      return (0, import_jsx_runtime11.jsx)(Root, _extends({}, rootProps, {
        children: typeof children === "function" ? children(childProps) : children
      }));
    });
    Popper = React9.forwardRef(function Popper2(props, forwardedRef) {
      const {
        anchorEl,
        children,
        container: containerProp,
        direction = "ltr",
        disablePortal = false,
        keepMounted = false,
        modifiers,
        open,
        placement = "bottom",
        popperOptions = defaultPopperOptions,
        popperRef,
        style,
        transition = false,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded22);
      const [exited, setExited] = React9.useState(true);
      const handleEnter = () => {
        setExited(false);
      };
      const handleExited = () => {
        setExited(true);
      };
      if (!keepMounted && !open && (!transition || exited)) {
        return null;
      }
      let container;
      if (containerProp) {
        container = containerProp;
      } else if (anchorEl) {
        const resolvedAnchorEl = resolveAnchorEl(anchorEl);
        container = resolvedAnchorEl && isHTMLElement2(resolvedAnchorEl) ? ownerDocument(resolvedAnchorEl).body : ownerDocument(null).body;
      }
      const display = !open && keepMounted && (!transition || exited) ? "none" : void 0;
      const transitionProps = transition ? {
        in: open,
        onEnter: handleEnter,
        onExited: handleExited
      } : void 0;
      return (0, import_jsx_runtime11.jsx)(Portal_default, {
        disablePortal,
        container,
        children: (0, import_jsx_runtime11.jsx)(PopperTooltip, _extends({
          anchorEl,
          direction,
          disablePortal,
          modifiers,
          ref: forwardedRef,
          open: transition ? !exited : open,
          placement,
          popperOptions,
          popperRef,
          slotProps,
          slots
        }, other, {
          style: _extends({
            // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
            position: "fixed",
            // Fix Popper.js display issue
            top: 0,
            left: 0,
            display
          }, style),
          TransitionProps: transitionProps,
          children
        }))
      });
    });
    true ? Popper.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
       * or a function that returns either.
       * It's used to set the position of the popper.
       * The return value will passed as the reference object of the Popper instance.
       */
      anchorEl: chainPropTypes(import_prop_types7.default.oneOfType([HTMLElementType, import_prop_types7.default.object, import_prop_types7.default.func]), (props) => {
        if (props.open) {
          const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
          if (resolvedAnchorEl && isHTMLElement2(resolvedAnchorEl) && resolvedAnchorEl.nodeType === 1) {
            const box = resolvedAnchorEl.getBoundingClientRect();
            if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
              return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
            }
          } else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== "function" || isVirtualElement(resolvedAnchorEl) && resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) {
            return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join("\n"));
          }
        }
        return null;
      }),
      /**
       * Popper render function or node.
       */
      children: import_prop_types7.default.oneOfType([import_prop_types7.default.node, import_prop_types7.default.func]),
      /**
       * An HTML element or function that returns one.
       * The `container` will have the portal children appended to it.
       *
       * By default, it uses the body of the top-level document object,
       * so it's simply `document.body` most of the time.
       */
      container: import_prop_types7.default.oneOfType([HTMLElementType, import_prop_types7.default.func]),
      /**
       * Direction of the text.
       * @default 'ltr'
       */
      direction: import_prop_types7.default.oneOf(["ltr", "rtl"]),
      /**
       * The `children` will be under the DOM hierarchy of the parent component.
       * @default false
       */
      disablePortal: import_prop_types7.default.bool,
      /**
       * Always keep the children in the DOM.
       * This prop can be useful in SEO situation or
       * when you want to maximize the responsiveness of the Popper.
       * @default false
       */
      keepMounted: import_prop_types7.default.bool,
      /**
       * Popper.js is based on a "plugin-like" architecture,
       * most of its features are fully encapsulated "modifiers".
       *
       * A modifier is a function that is called each time Popper.js needs to
       * compute the position of the popper.
       * For this reason, modifiers should be very performant to avoid bottlenecks.
       * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
       */
      modifiers: import_prop_types7.default.arrayOf(import_prop_types7.default.shape({
        data: import_prop_types7.default.object,
        effect: import_prop_types7.default.func,
        enabled: import_prop_types7.default.bool,
        fn: import_prop_types7.default.func,
        name: import_prop_types7.default.any,
        options: import_prop_types7.default.object,
        phase: import_prop_types7.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
        requires: import_prop_types7.default.arrayOf(import_prop_types7.default.string),
        requiresIfExists: import_prop_types7.default.arrayOf(import_prop_types7.default.string)
      })),
      /**
       * If `true`, the component is shown.
       */
      open: import_prop_types7.default.bool.isRequired,
      /**
       * Popper placement.
       * @default 'bottom'
       */
      placement: import_prop_types7.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
      /**
       * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
       * @default {}
       */
      popperOptions: import_prop_types7.default.shape({
        modifiers: import_prop_types7.default.array,
        onFirstUpdate: import_prop_types7.default.func,
        placement: import_prop_types7.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
        strategy: import_prop_types7.default.oneOf(["absolute", "fixed"])
      }),
      /**
       * A ref that points to the used popper instance.
       */
      popperRef: refType_default,
      /**
       * The props used for each slot inside the Popper.
       * @default {}
       */
      slotProps: import_prop_types7.default.shape({
        root: import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object])
      }),
      /**
       * The components used for each slot inside the Popper.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types7.default.shape({
        root: import_prop_types7.default.elementType
      }),
      /**
       * Help supporting a react-transition-group/Transition component.
       * @default false
       */
      transition: import_prop_types7.default.bool
    } : void 0;
    Popper_default = Popper;
  }
});

// node_modules/@mui/base/Popper/index.js
var init_Popper2 = __esm({
  "node_modules/@mui/base/Popper/index.js"() {
    init_Popper();
    init_popperClasses();
  }
});

// node_modules/@mui/base/useSlider/useSlider.js
function asc(a, b) {
  return a - b;
}
function clamp(value, min, max) {
  if (value == null) {
    return min;
  }
  return Math.min(Math.max(min, value), max);
}
function findClosest(values, currentValue) {
  var _values$reduce;
  const {
    index: closestIndex
  } = (_values$reduce = values.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);
    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index
      };
    }
    return acc;
  }, null)) != null ? _values$reduce : {};
  return closestIndex;
}
function trackFinger(event, touchId) {
  if (touchId.current !== void 0 && event.changedTouches) {
    const touchEvent = event;
    for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
      const touch = touchEvent.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return false;
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}
function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}
function getDecimalPrecision(num) {
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split("e-");
    const matissaDecimalPart = parts[0].split(".")[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }
  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}
function setValueIndex({
  values,
  newValue,
  index
}) {
  const output = values.slice();
  output[index] = newValue;
  return output.sort(asc);
}
function focusThumb({
  sliderRef,
  activeIndex,
  setActive
}) {
  var _sliderRef$current, _doc$activeElement;
  const doc = ownerDocument(sliderRef.current);
  if (!((_sliderRef$current = sliderRef.current) != null && _sliderRef$current.contains(doc.activeElement)) || Number(doc == null ? void 0 : (_doc$activeElement = doc.activeElement) == null ? void 0 : _doc$activeElement.getAttribute("data-index")) !== activeIndex) {
    var _sliderRef$current2;
    (_sliderRef$current2 = sliderRef.current) == null ? void 0 : _sliderRef$current2.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }
  if (setActive) {
    setActive(activeIndex);
  }
}
function areValuesEqual(newValue, oldValue) {
  if (typeof newValue === "number" && typeof oldValue === "number") {
    return newValue === oldValue;
  }
  if (typeof newValue === "object" && typeof oldValue === "object") {
    return areArraysEqual(newValue, oldValue);
  }
  return false;
}
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === void 0) {
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      cachedSupportsTouchActionNone = CSS.supports("touch-action", "none");
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}
function useSlider(parameters) {
  const {
    "aria-labelledby": ariaLabelledby,
    defaultValue,
    disabled = false,
    disableSwap = false,
    isRtl = false,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = "horizontal",
    rootRef: ref,
    scale = Identity,
    step = 1,
    tabIndex,
    value: valueProp
  } = parameters;
  const touchId = React10.useRef();
  const [active, setActive] = React10.useState(-1);
  const [open, setOpen] = React10.useState(-1);
  const [dragging, setDragging] = React10.useState(false);
  const moveCount = React10.useRef(0);
  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue != null ? defaultValue : min,
    name: "Slider"
  });
  const handleChange = onChange && ((event, value, thumbIndex) => {
    const nativeEvent = event.nativeEvent || event;
    const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, "target", {
      writable: true,
      value: {
        value,
        name
      }
    });
    onChange(clonedEvent, value, thumbIndex);
  });
  const range = Array.isArray(valueDerived);
  let values = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values = values.map((value) => clamp(value, min, max));
  const marks = marksProp === true && step !== null ? [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
    value: min + step * index
  })) : marksProp || [];
  const marksValues = marks.map((mark) => mark.value);
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusedThumbIndex, setFocusedThumbIndex] = React10.useState(-1);
  const sliderRef = React10.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);
  const createHandleHiddenInputFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    const index = Number(event.currentTarget.getAttribute("data-index"));
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusedThumbIndex(index);
    }
    setOpen(index);
    otherHandlers == null ? void 0 : (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
  };
  const createHandleHiddenInputBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusedThumbIndex(-1);
    }
    setOpen(-1);
    otherHandlers == null ? void 0 : (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
  };
  useEnhancedEffect_default(() => {
    if (disabled && sliderRef.current.contains(document.activeElement)) {
      var _document$activeEleme;
      (_document$activeEleme = document.activeElement) == null ? void 0 : _document$activeEleme.blur();
    }
  }, [disabled]);
  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusedThumbIndex !== -1) {
    setFocusedThumbIndex(-1);
  }
  const createHandleHiddenInputChange = (otherHandlers) => (event) => {
    var _otherHandlers$onChan;
    (_otherHandlers$onChan = otherHandlers.onChange) == null ? void 0 : _otherHandlers$onChan.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const value = values[index];
    const marksIndex = marksValues.indexOf(value);
    let newValue = event.target.valueAsNumber;
    if (marks && step == null) {
      const maxMarksValue = marksValues[marksValues.length - 1];
      if (newValue > maxMarksValue) {
        newValue = maxMarksValue;
      } else if (newValue < marksValues[0]) {
        newValue = marksValues[0];
      } else {
        newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
      }
    }
    newValue = clamp(newValue, min, max);
    if (range) {
      if (disableSwap) {
        newValue = clamp(newValue, values[index - 1] || -Infinity, values[index + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index
      });
      let activeIndex = index;
      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }
      focusThumb({
        sliderRef,
        activeIndex
      });
    }
    setValueState(newValue);
    setFocusedThumbIndex(index);
    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(event, newValue, index);
    }
    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  };
  const previousIndex = React10.useRef();
  let axis = orientation;
  if (isRtl && orientation === "horizontal") {
    axis += "-reverse";
  }
  const getFingerNewValue = ({
    finger,
    move = false
  }) => {
    const {
      current: slider
    } = sliderRef;
    const {
      width,
      height,
      bottom,
      left
    } = slider.getBoundingClientRect();
    let percent;
    if (axis.indexOf("vertical") === 0) {
      percent = (bottom - finger.y) / height;
    } else {
      percent = (finger.x - left) / width;
    }
    if (axis.indexOf("-reverse") !== -1) {
      percent = 1 - percent;
    }
    let newValue;
    newValue = percentToValue(percent, min, max);
    if (step) {
      newValue = roundValueToStep(newValue, step, min);
    } else {
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }
    newValue = clamp(newValue, min, max);
    let activeIndex = 0;
    if (range) {
      if (!move) {
        activeIndex = findClosest(values, newValue);
      } else {
        activeIndex = previousIndex.current;
      }
      if (disableSwap) {
        newValue = clamp(newValue, values[activeIndex - 1] || -Infinity, values[activeIndex + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index: activeIndex
      });
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }
    return {
      newValue,
      activeIndex
    };
  };
  const handleTouchMove = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    if (!finger) {
      return;
    }
    moveCount.current += 1;
    if (nativeEvent.type === "mousemove" && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      move: true
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }
    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });
  const handleTouchEnd = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);
    if (!finger) {
      return;
    }
    const {
      newValue
    } = getFingerNewValue({
      finger,
      move: true
    });
    setActive(-1);
    if (nativeEvent.type === "touchend") {
      setOpen(-1);
    }
    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }
    touchId.current = void 0;
    stopListening();
  });
  const handleTouchStart = useEventCallback((nativeEvent) => {
    if (disabled) {
      return;
    }
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }
    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(nativeEvent, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange && !areValuesEqual(newValue, valueDerived)) {
        handleChange(nativeEvent, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("touchmove", handleTouchMove);
    doc.addEventListener("touchend", handleTouchEnd);
  });
  const stopListening = React10.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener("mousemove", handleTouchMove);
    doc.removeEventListener("mouseup", handleTouchEnd);
    doc.removeEventListener("touchmove", handleTouchMove);
    doc.removeEventListener("touchend", handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  React10.useEffect(() => {
    const {
      current: slider
    } = sliderRef;
    slider.addEventListener("touchstart", handleTouchStart, {
      passive: doesSupportTouchActionNone()
    });
    return () => {
      slider.removeEventListener("touchstart", handleTouchStart, {
        passive: doesSupportTouchActionNone()
      });
      stopListening();
    };
  }, [stopListening, handleTouchStart]);
  React10.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    (_otherHandlers$onMous = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
    if (disabled) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    const finger = trackFinger(event, touchId);
    if (finger !== false) {
      const {
        newValue,
        activeIndex
      } = getFingerNewValue({
        finger
      });
      focusThumb({
        sliderRef,
        activeIndex,
        setActive
      });
      setValueState(newValue);
      if (handleChange && !areValuesEqual(newValue, valueDerived)) {
        handleChange(event, newValue, activeIndex);
      }
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("mousemove", handleTouchMove);
    doc.addEventListener("mouseup", handleTouchEnd);
  };
  const trackOffset = valueToPercent(range ? values[0] : min, min, max);
  const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;
  const getRootProps = (otherHandlers = {}) => {
    const ownEventHandlers = {
      onMouseDown: createHandleMouseDown(otherHandlers || {})
    };
    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);
    return _extends({
      ref: handleRef
    }, mergedEventHandlers);
  };
  const createHandleMouseOver = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    (_otherHandlers$onMous2 = otherHandlers.onMouseOver) == null ? void 0 : _otherHandlers$onMous2.call(otherHandlers, event);
    const index = Number(event.currentTarget.getAttribute("data-index"));
    setOpen(index);
  };
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous3;
    (_otherHandlers$onMous3 = otherHandlers.onMouseLeave) == null ? void 0 : _otherHandlers$onMous3.call(otherHandlers, event);
    setOpen(-1);
  };
  const getThumbProps = (otherHandlers = {}) => {
    const ownEventHandlers = {
      onMouseOver: createHandleMouseOver(otherHandlers || {}),
      onMouseLeave: createHandleMouseLeave(otherHandlers || {})
    };
    return _extends({}, otherHandlers, ownEventHandlers);
  };
  const getHiddenInputProps = (otherHandlers = {}) => {
    var _parameters$step;
    const ownEventHandlers = {
      onChange: createHandleHiddenInputChange(otherHandlers || {}),
      onFocus: createHandleHiddenInputFocus(otherHandlers || {}),
      onBlur: createHandleHiddenInputBlur(otherHandlers || {})
    };
    const mergedEventHandlers = _extends({}, otherHandlers, ownEventHandlers);
    return _extends({
      tabIndex,
      "aria-labelledby": ariaLabelledby,
      "aria-orientation": orientation,
      "aria-valuemax": scale(max),
      "aria-valuemin": scale(min),
      name,
      type: "range",
      min: parameters.min,
      max: parameters.max,
      step: parameters.step === null && parameters.marks ? "any" : (_parameters$step = parameters.step) != null ? _parameters$step : void 0,
      disabled
    }, mergedEventHandlers, {
      style: _extends({}, visuallyHidden_default, {
        direction: isRtl ? "rtl" : "ltr",
        // So that VoiceOver's focus indicator matches the thumb's dimensions
        width: "100%",
        height: "100%"
      })
    });
  };
  return {
    active,
    axis,
    axisProps,
    dragging,
    focusedThumbIndex,
    getHiddenInputProps,
    getRootProps,
    getThumbProps,
    marks,
    open,
    range,
    rootRef: handleRef,
    trackLeap,
    trackOffset,
    values
  };
}
var React10, INTENTIONAL_DRAG_COUNT_THRESHOLD, axisProps, Identity, cachedSupportsTouchActionNone;
var init_useSlider = __esm({
  "node_modules/@mui/base/useSlider/useSlider.js"() {
    init_extends();
    React10 = __toESM(require_react());
    init_esm();
    init_utils();
    INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
    axisProps = {
      horizontal: {
        offset: (percent) => ({
          left: `${percent}%`
        }),
        leap: (percent) => ({
          width: `${percent}%`
        })
      },
      "horizontal-reverse": {
        offset: (percent) => ({
          right: `${percent}%`
        }),
        leap: (percent) => ({
          width: `${percent}%`
        })
      },
      vertical: {
        offset: (percent) => ({
          bottom: `${percent}%`
        }),
        leap: (percent) => ({
          height: `${percent}%`
        })
      }
    };
    Identity = (x) => x;
  }
});

// node_modules/@mui/base/useSlider/useSlider.types.js
var init_useSlider_types = __esm({
  "node_modules/@mui/base/useSlider/useSlider.types.js"() {
  }
});

// node_modules/@mui/base/useSlider/index.js
var init_useSlider2 = __esm({
  "node_modules/@mui/base/useSlider/index.js"() {
    init_useSlider();
    init_useSlider();
    init_useSlider_types();
  }
});

// node_modules/@mui/base/useSnackbar/useSnackbar.js
function useSnackbar(parameters) {
  const {
    autoHideDuration = null,
    disableWindowBlurListener = false,
    onClose,
    open,
    resumeHideDuration
  } = parameters;
  const timerAutoHide = React11.useRef();
  React11.useEffect(() => {
    if (!open) {
      return void 0;
    }
    function handleKeyDown2(nativeEvent) {
      if (!nativeEvent.defaultPrevented) {
        if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
          onClose == null ? void 0 : onClose(nativeEvent, "escapeKeyDown");
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown2);
    return () => {
      document.removeEventListener("keydown", handleKeyDown2);
    };
  }, [open, onClose]);
  const handleClose = useEventCallback((event, reason) => {
    onClose == null ? void 0 : onClose(event, reason);
  });
  const setAutoHideTimer = useEventCallback((autoHideDurationParam) => {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }
    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(() => {
      handleClose(null, "timeout");
    }, autoHideDurationParam);
  });
  React11.useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }
    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, autoHideDuration, setAutoHideTimer]);
  const handleClickAway = (event) => {
    onClose == null ? void 0 : onClose(event, "clickaway");
  };
  const handlePause = () => {
    clearTimeout(timerAutoHide.current);
  };
  const handleResume = React11.useCallback(() => {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);
  const createHandleBlur = (otherHandlers) => (event) => {
    const onBlurCallback = otherHandlers.onBlur;
    onBlurCallback == null ? void 0 : onBlurCallback(event);
    handleResume();
  };
  const createHandleFocus = (otherHandlers) => (event) => {
    const onFocusCallback = otherHandlers.onFocus;
    onFocusCallback == null ? void 0 : onFocusCallback(event);
    handlePause();
  };
  const createMouseEnter = (otherHandlers) => (event) => {
    const onMouseEnterCallback = otherHandlers.onMouseEnter;
    onMouseEnterCallback == null ? void 0 : onMouseEnterCallback(event);
    handlePause();
  };
  const createMouseLeave = (otherHandlers) => (event) => {
    const onMouseLeaveCallback = otherHandlers.onMouseLeave;
    onMouseLeaveCallback == null ? void 0 : onMouseLeaveCallback(event);
    handleResume();
  };
  React11.useEffect(() => {
    if (!disableWindowBlurListener && open) {
      window.addEventListener("focus", handleResume);
      window.addEventListener("blur", handlePause);
      return () => {
        window.removeEventListener("focus", handleResume);
        window.removeEventListener("blur", handlePause);
      };
    }
    return void 0;
  }, [disableWindowBlurListener, handleResume, open]);
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters);
    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    return _extends({
      // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
      // See https://github.com/mui/material-ui/issues/29080
      role: "presentation"
    }, externalEventHandlers, {
      onBlur: createHandleBlur(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onMouseEnter: createMouseEnter(externalEventHandlers),
      onMouseLeave: createMouseLeave(externalEventHandlers)
    });
  };
  return {
    getRootProps,
    onClickAway: handleClickAway
  };
}
var React11;
var init_useSnackbar = __esm({
  "node_modules/@mui/base/useSnackbar/useSnackbar.js"() {
    init_extends();
    React11 = __toESM(require_react());
    init_esm();
    init_extractEventHandlers();
  }
});

// node_modules/@mui/base/useSnackbar/useSnackbar.types.js
var init_useSnackbar_types = __esm({
  "node_modules/@mui/base/useSnackbar/useSnackbar.types.js"() {
  }
});

// node_modules/@mui/base/useSnackbar/index.js
var init_useSnackbar2 = __esm({
  "node_modules/@mui/base/useSnackbar/index.js"() {
    init_useSnackbar();
    init_useSnackbar_types();
  }
});

// node_modules/@mui/base/Badge/badgeClasses.js
function getBadgeUtilityClass(slot) {
  return generateUtilityClass("MuiBadge", slot);
}
var badgeClasses;
var init_badgeClasses = __esm({
  "node_modules/@mui/base/Badge/badgeClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    badgeClasses = generateUtilityClasses("MuiBadge", ["root", "badge", "invisible"]);
  }
});

// node_modules/@mui/base/Badge/Badge.js
var React12, import_prop_types8, import_jsx_runtime12, import_jsx_runtime13, _excluded5, useUtilityClasses3, Badge;
var init_Badge = __esm({
  "node_modules/@mui/base/Badge/Badge.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React12 = __toESM(require_react());
    import_prop_types8 = __toESM(require_prop_types());
    init_composeClasses();
    init_useBadge2();
    init_badgeClasses();
    init_utils();
    init_ClassNameConfigurator();
    import_jsx_runtime12 = __toESM(require_jsx_runtime());
    import_jsx_runtime13 = __toESM(require_jsx_runtime());
    _excluded5 = ["badgeContent", "children", "invisible", "max", "slotProps", "slots", "showZero"];
    useUtilityClasses3 = (ownerState) => {
      const {
        invisible
      } = ownerState;
      const slots = {
        root: ["root"],
        badge: ["badge", invisible && "invisible"]
      };
      return composeClasses(slots, useClassNamesOverride(getBadgeUtilityClass));
    };
    Badge = React12.forwardRef(function Badge2(props, forwardedRef) {
      var _slots$root, _slots$badge;
      const {
        children,
        max: maxProp = 99,
        slotProps = {},
        slots = {},
        showZero = false
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
      const {
        badgeContent,
        max,
        displayValue,
        invisible
      } = useBadge(_extends({}, props, {
        max: maxProp
      }));
      const ownerState = _extends({}, props, {
        badgeContent,
        invisible,
        max,
        showZero
      });
      const classes = useUtilityClasses3(ownerState);
      const Root = (_slots$root = slots.root) != null ? _slots$root : "span";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState,
        className: classes.root
      });
      const BadgeComponent = (_slots$badge = slots.badge) != null ? _slots$badge : "span";
      const badgeProps = useSlotProps({
        elementType: BadgeComponent,
        externalSlotProps: slotProps.badge,
        ownerState,
        className: classes.badge
      });
      return (0, import_jsx_runtime13.jsxs)(Root, _extends({}, rootProps, {
        children: [children, (0, import_jsx_runtime12.jsx)(BadgeComponent, _extends({}, badgeProps, {
          children: displayValue
        }))]
      }));
    });
    true ? Badge.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * The content rendered within the badge.
       */
      badgeContent: import_prop_types8.default.node,
      /**
       * The badge will be added relative to this node.
       */
      children: import_prop_types8.default.node,
      /**
       * If `true`, the badge is invisible.
       * @default false
       */
      invisible: import_prop_types8.default.bool,
      /**
       * Max count to show.
       * @default 99
       */
      max: import_prop_types8.default.number,
      /**
       * Controls whether the badge is hidden when `badgeContent` is zero.
       * @default false
       */
      showZero: import_prop_types8.default.bool,
      /**
       * The props used for each slot inside the Badge.
       * @default {}
       */
      slotProps: import_prop_types8.default.shape({
        badge: import_prop_types8.default.oneOfType([import_prop_types8.default.func, import_prop_types8.default.object]),
        root: import_prop_types8.default.oneOfType([import_prop_types8.default.func, import_prop_types8.default.object])
      }),
      /**
       * The components used for each slot inside the Badge.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types8.default.shape({
        badge: import_prop_types8.default.elementType,
        root: import_prop_types8.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/Badge/Badge.types.js
var init_Badge_types = __esm({
  "node_modules/@mui/base/Badge/Badge.types.js"() {
  }
});

// node_modules/@mui/base/Badge/index.js
var init_Badge2 = __esm({
  "node_modules/@mui/base/Badge/index.js"() {
    init_Badge();
    init_Badge_types();
    init_badgeClasses();
    init_badgeClasses();
  }
});

// node_modules/@mui/base/Button/buttonClasses.js
function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
var buttonClasses;
var init_buttonClasses = __esm({
  "node_modules/@mui/base/Button/buttonClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    buttonClasses = generateUtilityClasses("MuiButton", ["root", "active", "disabled", "focusVisible"]);
  }
});

// node_modules/@mui/base/useButton/useButton.js
function useButton(parameters = {}) {
  const {
    disabled = false,
    focusableWhenDisabled,
    href,
    rootRef: externalRef,
    tabIndex,
    to,
    type
  } = parameters;
  const buttonRef = React13.useRef();
  const [active, setActive] = React13.useState(false);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React13.useState(false);
  if (disabled && !focusableWhenDisabled && focusVisible) {
    setFocusVisible(false);
  }
  React13.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const [hostElementName, setHostElementName] = React13.useState("");
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    if (focusVisible) {
      event.preventDefault();
    }
    (_otherHandlers$onMous = otherHandlers.onMouseLeave) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
  };
  const createHandleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
  };
  const createHandleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu2;
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      var _otherHandlers$onFocu;
      setFocusVisible(true);
      (_otherHandlers$onFocu = otherHandlers.onFocusVisible) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
    }
    (_otherHandlers$onFocu2 = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu2.call(otherHandlers, event);
  };
  const isNativeButton = () => {
    const button = buttonRef.current;
    return hostElementName === "BUTTON" || hostElementName === "INPUT" && ["button", "submit", "reset"].includes(button == null ? void 0 : button.type) || hostElementName === "A" && (button == null ? void 0 : button.href);
  };
  const createHandleClick = (otherHandlers) => (event) => {
    if (!disabled) {
      var _otherHandlers$onClic;
      (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
    }
  };
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    if (!disabled) {
      setActive(true);
      document.addEventListener("mouseup", () => {
        setActive(false);
      }, {
        once: true
      });
    }
    (_otherHandlers$onMous2 = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous2.call(otherHandlers, event);
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (event.target === event.currentTarget && event.key === " " && !disabled) {
      setActive(true);
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === "Enter" && !disabled) {
      var _otherHandlers$onClic2;
      (_otherHandlers$onClic2 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic2.call(otherHandlers, event);
      event.preventDefault();
    }
  };
  const createHandleKeyUp = (otherHandlers) => (event) => {
    var _otherHandlers$onKeyU;
    if (event.target === event.currentTarget) {
      setActive(false);
    }
    (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null ? void 0 : _otherHandlers$onKeyU.call(otherHandlers, event);
    if (event.target === event.currentTarget && !isNativeButton() && !disabled && event.key === " " && !event.defaultMuiPrevented) {
      var _otherHandlers$onClic3;
      (_otherHandlers$onClic3 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic3.call(otherHandlers, event);
    }
  };
  const updateHostElementName = React13.useCallback((instance) => {
    var _instance$tagName;
    setHostElementName((_instance$tagName = instance == null ? void 0 : instance.tagName) != null ? _instance$tagName : "");
  }, []);
  const handleRef = useForkRef(updateHostElementName, externalRef, focusVisibleRef, buttonRef);
  const buttonProps = {};
  if (hostElementName === "BUTTON") {
    buttonProps.type = type != null ? type : "button";
    if (focusableWhenDisabled) {
      buttonProps["aria-disabled"] = disabled;
    } else {
      buttonProps.disabled = disabled;
    }
  } else if (hostElementName !== "") {
    if (!href && !to) {
      buttonProps.role = "button";
      buttonProps.tabIndex = tabIndex != null ? tabIndex : 0;
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
      buttonProps.tabIndex = focusableWhenDisabled ? tabIndex != null ? tabIndex : 0 : -1;
    }
  }
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters);
    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    delete externalEventHandlers.onFocusVisible;
    return _extends({
      type
    }, externalEventHandlers, buttonProps, {
      onBlur: createHandleBlur(externalEventHandlers),
      onClick: createHandleClick(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      ref: handleRef
    });
  };
  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    active,
    rootRef: handleRef
  };
}
var React13;
var init_useButton = __esm({
  "node_modules/@mui/base/useButton/useButton.js"() {
    init_extends();
    React13 = __toESM(require_react());
    init_esm();
    init_extractEventHandlers();
  }
});

// node_modules/@mui/base/useButton/useButton.types.js
var init_useButton_types = __esm({
  "node_modules/@mui/base/useButton/useButton.types.js"() {
  }
});

// node_modules/@mui/base/useButton/index.js
var init_useButton2 = __esm({
  "node_modules/@mui/base/useButton/index.js"() {
    init_useButton();
    init_useButton_types();
  }
});

// node_modules/@mui/base/Button/Button.js
var React14, import_prop_types9, import_jsx_runtime14, _excluded6, useUtilityClasses4, Button;
var init_Button = __esm({
  "node_modules/@mui/base/Button/Button.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React14 = __toESM(require_react());
    import_prop_types9 = __toESM(require_prop_types());
    init_composeClasses();
    init_buttonClasses();
    init_useButton2();
    init_utils();
    init_ClassNameConfigurator();
    import_jsx_runtime14 = __toESM(require_jsx_runtime());
    _excluded6 = ["action", "children", "disabled", "focusableWhenDisabled", "onFocusVisible", "slotProps", "slots"];
    useUtilityClasses4 = (ownerState) => {
      const {
        active,
        disabled,
        focusVisible
      } = ownerState;
      const slots = {
        root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active"]
      };
      return composeClasses(slots, useClassNamesOverride(getButtonUtilityClass));
    };
    Button = React14.forwardRef(function Button2(props, forwardedRef) {
      var _slots$root;
      const {
        action,
        children,
        focusableWhenDisabled = false,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded6);
      const buttonRef = React14.useRef();
      const {
        active,
        focusVisible,
        setFocusVisible,
        getRootProps
      } = useButton(_extends({}, props, {
        focusableWhenDisabled
      }));
      React14.useImperativeHandle(action, () => ({
        focusVisible: () => {
          setFocusVisible(true);
          buttonRef.current.focus();
        }
      }), [setFocusVisible]);
      const ownerState = _extends({}, props, {
        active,
        focusableWhenDisabled,
        focusVisible
      });
      const classes = useUtilityClasses4(ownerState);
      const defaultElement = other.href || other.to ? "a" : "button";
      const Root = (_slots$root = slots.root) != null ? _slots$root : defaultElement;
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalForwardedProps: other,
        externalSlotProps: slotProps.root,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime14.jsx)(Root, _extends({}, rootProps, {
        children
      }));
    });
    true ? Button.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * A ref for imperative actions. It currently only supports `focusVisible()` action.
       */
      action: import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.shape({
        current: import_prop_types9.default.shape({
          focusVisible: import_prop_types9.default.func.isRequired
        })
      })]),
      /**
       * @ignore
       */
      children: import_prop_types9.default.node,
      /**
       * If `true`, the component is disabled.
       * @default false
       */
      disabled: import_prop_types9.default.bool,
      /**
       * If `true`, allows a disabled button to receive focus.
       * @default false
       */
      focusableWhenDisabled: import_prop_types9.default.bool,
      /**
       * @ignore
       */
      href: import_prop_types9.default.string,
      /**
       * @ignore
       */
      onFocusVisible: import_prop_types9.default.func,
      /**
       * The props used for each slot inside the Button.
       * @default {}
       */
      slotProps: import_prop_types9.default.shape({
        root: import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object])
      }),
      /**
       * The components used for each slot inside the Button.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types9.default.shape({
        root: import_prop_types9.default.elementType
      }),
      /**
       * @ignore
       */
      to: import_prop_types9.default.string
    } : void 0;
  }
});

// node_modules/@mui/base/Button/Button.types.js
var init_Button_types = __esm({
  "node_modules/@mui/base/Button/Button.types.js"() {
  }
});

// node_modules/@mui/base/Button/index.js
var init_Button2 = __esm({
  "node_modules/@mui/base/Button/index.js"() {
    init_Button();
    init_buttonClasses();
    init_buttonClasses();
    init_Button_types();
  }
});

// node_modules/@mui/base/FormControl/FormControlContext.js
var React15, FormControlContext, FormControlContext_default;
var init_FormControlContext = __esm({
  "node_modules/@mui/base/FormControl/FormControlContext.js"() {
    React15 = __toESM(require_react());
    FormControlContext = React15.createContext(void 0);
    if (true) {
      FormControlContext.displayName = "FormControlContext";
    }
    FormControlContext_default = FormControlContext;
  }
});

// node_modules/@mui/base/FormControl/formControlClasses.js
function getFormControlUtilityClass(slot) {
  return generateUtilityClass("MuiFormControl", slot);
}
var formControlClasses;
var init_formControlClasses = __esm({
  "node_modules/@mui/base/FormControl/formControlClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    formControlClasses = generateUtilityClasses("MuiFormControl", ["root", "disabled", "error", "filled", "focused", "required"]);
  }
});

// node_modules/@mui/base/FormControl/FormControl.js
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== "";
}
function useUtilityClasses5(ownerState) {
  const {
    disabled,
    error,
    filled,
    focused,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focused && "focused", error && "error", filled && "filled", required && "required"]
  };
  return composeClasses(slots, useClassNamesOverride(getFormControlUtilityClass));
}
var React16, import_prop_types10, import_jsx_runtime15, _excluded7, FormControl;
var init_FormControl = __esm({
  "node_modules/@mui/base/FormControl/FormControl.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React16 = __toESM(require_react());
    import_prop_types10 = __toESM(require_prop_types());
    init_esm();
    init_FormControlContext();
    init_formControlClasses();
    init_utils();
    init_composeClasses();
    init_ClassNameConfigurator();
    import_jsx_runtime15 = __toESM(require_jsx_runtime());
    _excluded7 = ["defaultValue", "children", "disabled", "error", "onChange", "required", "slotProps", "slots", "value"];
    FormControl = React16.forwardRef(function FormControl2(props, forwardedRef) {
      var _slots$root;
      const {
        defaultValue,
        children,
        disabled = false,
        error = false,
        onChange,
        required = false,
        slotProps = {},
        slots = {},
        value: incomingValue
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
      const [value, setValue] = useControlled({
        controlled: incomingValue,
        default: defaultValue,
        name: "FormControl",
        state: "value"
      });
      const filled = hasValue(value);
      const [focusedState, setFocused] = React16.useState(false);
      const focused = focusedState && !disabled;
      React16.useEffect(() => setFocused((isFocused) => disabled ? false : isFocused), [disabled]);
      const ownerState = _extends({}, props, {
        disabled,
        error,
        filled,
        focused,
        required
      });
      const childContext = React16.useMemo(() => {
        return {
          disabled,
          error,
          filled,
          focused,
          onBlur: () => {
            setFocused(false);
          },
          onChange: (event) => {
            setValue(event.target.value);
            onChange == null ? void 0 : onChange(event);
          },
          onFocus: () => {
            setFocused(true);
          },
          required,
          value: value != null ? value : ""
        };
      }, [disabled, error, filled, focused, onChange, required, setValue, value]);
      const classes = useUtilityClasses5(ownerState);
      const renderChildren = () => {
        if (typeof children === "function") {
          return children(childContext);
        }
        return children;
      };
      const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: forwardedRef,
          children: renderChildren()
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime15.jsx)(FormControlContext_default.Provider, {
        value: childContext,
        children: (0, import_jsx_runtime15.jsx)(Root, _extends({}, rootProps))
      });
    });
    true ? FormControl.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * The content of the component.
       */
      children: import_prop_types10.default.oneOfType([import_prop_types10.default.node, import_prop_types10.default.func]),
      /**
       * @ignore
       */
      defaultValue: import_prop_types10.default.any,
      /**
       * If `true`, the label, input and helper text should be displayed in a disabled state.
       * @default false
       */
      disabled: import_prop_types10.default.bool,
      /**
       * If `true`, the label is displayed in an error state.
       * @default false
       */
      error: import_prop_types10.default.bool,
      /**
       * Callback fired when the form element's value is modified.
       */
      onChange: import_prop_types10.default.func,
      /**
       * If `true`, the label will indicate that the `input` is required.
       * @default false
       */
      required: import_prop_types10.default.bool,
      /**
       * The props used for each slot inside the FormControl.
       * @default {}
       */
      slotProps: import_prop_types10.default.shape({
        root: import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object])
      }),
      /**
       * The components used for each slot inside the FormControl.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types10.default.shape({
        root: import_prop_types10.default.elementType
      }),
      /**
       * The value of the form element.
       */
      value: import_prop_types10.default.any
    } : void 0;
  }
});

// node_modules/@mui/base/FormControl/useFormControlContext.js
function useFormControlContext() {
  return React17.useContext(FormControlContext_default);
}
var React17;
var init_useFormControlContext = __esm({
  "node_modules/@mui/base/FormControl/useFormControlContext.js"() {
    React17 = __toESM(require_react());
    init_FormControlContext();
  }
});

// node_modules/@mui/base/FormControl/index.js
var init_FormControl2 = __esm({
  "node_modules/@mui/base/FormControl/index.js"() {
    init_FormControl();
    init_FormControlContext();
    init_formControlClasses();
    init_formControlClasses();
    init_useFormControlContext();
  }
});

// node_modules/@mui/base/Input/inputClasses.js
function getInputUtilityClass(slot) {
  return generateUtilityClass("MuiInput", slot);
}
var inputClasses;
var init_inputClasses = __esm({
  "node_modules/@mui/base/Input/inputClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    inputClasses = generateUtilityClasses("MuiInput", ["root", "formControl", "focused", "disabled", "error", "multiline", "input", "inputMultiline", "inputTypeSearch", "adornedStart", "adornedEnd"]);
  }
});

// node_modules/@mui/base/useInput/useInput.js
function useInput(parameters) {
  const {
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
    required: requiredProp = false,
    value: valueProp,
    inputRef: inputRefProp
  } = parameters;
  const formControlContext = useFormControlContext();
  let defaultValue;
  let disabled;
  let error;
  let required;
  let value;
  if (formControlContext) {
    var _formControlContext$d, _formControlContext$e, _formControlContext$r;
    defaultValue = void 0;
    disabled = (_formControlContext$d = formControlContext.disabled) != null ? _formControlContext$d : false;
    error = (_formControlContext$e = formControlContext.error) != null ? _formControlContext$e : false;
    required = (_formControlContext$r = formControlContext.required) != null ? _formControlContext$r : false;
    value = formControlContext.value;
    if (true) {
      const definedLocalProps = ["defaultValue", "disabled", "error", "required", "value"].filter((prop) => parameters[prop] !== void 0);
      if (definedLocalProps.length > 0) {
        console.warn(["MUI: You have set props on an input that is inside a FormControl.", "Set these props on a FormControl instead. Otherwise they will be ignored.", `Ignored props: ${definedLocalProps.join(", ")}`].join("\n"));
      }
    }
  } else {
    defaultValue = defaultValueProp;
    disabled = disabledProp;
    error = errorProp;
    required = requiredProp;
    value = valueProp;
  }
  const {
    current: isControlled
  } = React18.useRef(value != null);
  const handleInputRefWarning = React18.useCallback((instance) => {
    if (true) {
      if (instance && instance.nodeName !== "INPUT" && !instance.focus) {
        console.error(["MUI: You have provided a `slots.input` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join("\n"));
      }
    }
  }, []);
  const inputRef = React18.useRef(null);
  const handleInputRef = useForkRef(inputRef, inputRefProp, handleInputRefWarning);
  const [focused, setFocused] = React18.useState(false);
  React18.useEffect(() => {
    if (!formControlContext && disabled && focused) {
      setFocused(false);
      onBlur == null ? void 0 : onBlur();
    }
  }, [formControlContext, disabled, focused, onBlur]);
  const handleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    if (formControlContext != null && formControlContext.disabled) {
      event.stopPropagation();
      return;
    }
    (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
    if (formControlContext && formControlContext.onFocus) {
      var _formControlContext$o;
      formControlContext == null ? void 0 : (_formControlContext$o = formControlContext.onFocus) == null ? void 0 : _formControlContext$o.call(formControlContext);
    } else {
      setFocused(true);
    }
  };
  const handleBlur2 = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    } else {
      setFocused(false);
    }
  };
  const handleChange = (otherHandlers) => (event, ...args) => {
    var _formControlContext$o2, _otherHandlers$onChan;
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(true ? `MUI: Expected valid input target. Did you use a custom \`slots.input\` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.` : formatMuiErrorMessage(17));
      }
    }
    formControlContext == null ? void 0 : (_formControlContext$o2 = formControlContext.onChange) == null ? void 0 : _formControlContext$o2.call(formControlContext, event);
    (_otherHandlers$onChan = otherHandlers.onChange) == null ? void 0 : _otherHandlers$onChan.call(otherHandlers, event, ...args);
  };
  const handleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
  };
  const getRootProps = (externalProps = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters, ["onBlur", "onChange", "onFocus"]);
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    return _extends({}, externalProps, externalEventHandlers, {
      onClick: handleClick(externalEventHandlers)
    });
  };
  const getInputProps = (externalProps = {}) => {
    const propsEventHandlers = {
      onBlur,
      onChange,
      onFocus
    };
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    const mergedEventHandlers = _extends({}, externalProps, externalEventHandlers, {
      onBlur: handleBlur2(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers)
    });
    return _extends({}, mergedEventHandlers, {
      "aria-invalid": error || void 0,
      defaultValue,
      ref: handleInputRef,
      value,
      required,
      disabled
    });
  };
  return {
    disabled,
    error,
    focused,
    formControlContext,
    getInputProps,
    getRootProps,
    inputRef: handleInputRef,
    required,
    value
  };
}
var React18;
var init_useInput = __esm({
  "node_modules/@mui/base/useInput/useInput.js"() {
    init_extends();
    init_esm();
    React18 = __toESM(require_react());
    init_esm();
    init_FormControl2();
    init_extractEventHandlers();
  }
});

// node_modules/@mui/base/useInput/useInput.types.js
var init_useInput_types = __esm({
  "node_modules/@mui/base/useInput/useInput.types.js"() {
  }
});

// node_modules/@mui/base/useInput/index.js
var init_useInput2 = __esm({
  "node_modules/@mui/base/useInput/index.js"() {
    init_useInput();
    init_useInput_types();
  }
});

// node_modules/@mui/base/Input/Input.js
var React19, import_prop_types11, import_jsx_runtime16, import_jsx_runtime17, _excluded8, useUtilityClasses6, Input;
var init_Input = __esm({
  "node_modules/@mui/base/Input/Input.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React19 = __toESM(require_react());
    import_prop_types11 = __toESM(require_prop_types());
    init_isHostComponent();
    init_inputClasses();
    init_useInput2();
    init_utils();
    init_composeClasses();
    init_ClassNameConfigurator();
    import_jsx_runtime16 = __toESM(require_jsx_runtime());
    import_jsx_runtime17 = __toESM(require_jsx_runtime());
    _excluded8 = ["aria-describedby", "aria-label", "aria-labelledby", "autoComplete", "autoFocus", "className", "defaultValue", "disabled", "endAdornment", "error", "id", "multiline", "name", "onClick", "onChange", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "placeholder", "readOnly", "required", "startAdornment", "value", "type", "rows", "slotProps", "slots", "minRows", "maxRows"];
    useUtilityClasses6 = (ownerState) => {
      const {
        disabled,
        error,
        focused,
        formControlContext,
        multiline,
        startAdornment,
        endAdornment
      } = ownerState;
      const slots = {
        root: ["root", disabled && "disabled", error && "error", focused && "focused", Boolean(formControlContext) && "formControl", multiline && "multiline", Boolean(startAdornment) && "adornedStart", Boolean(endAdornment) && "adornedEnd"],
        input: ["input", disabled && "disabled", multiline && "multiline"]
      };
      return composeClasses(slots, useClassNamesOverride(getInputUtilityClass));
    };
    Input = React19.forwardRef(function Input2(props, forwardedRef) {
      var _slots$root, _slots$textarea, _slots$input;
      const {
        "aria-describedby": ariaDescribedby,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        autoComplete,
        autoFocus,
        className,
        defaultValue,
        disabled,
        endAdornment,
        error,
        id,
        multiline = false,
        name,
        onClick,
        onChange,
        onKeyDown,
        onKeyUp,
        onFocus,
        onBlur,
        placeholder,
        readOnly,
        required,
        startAdornment,
        value,
        type: typeProp,
        rows,
        slotProps = {},
        slots = {},
        minRows,
        maxRows
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
      const {
        getRootProps,
        getInputProps,
        focused,
        formControlContext,
        error: errorState,
        disabled: disabledState
      } = useInput({
        disabled,
        defaultValue,
        error,
        onBlur,
        onClick,
        onChange,
        onFocus,
        required,
        value
      });
      const type = !multiline ? typeProp != null ? typeProp : "text" : void 0;
      const ownerState = _extends({}, props, {
        disabled: disabledState,
        error: errorState,
        focused,
        formControlContext,
        multiline,
        type
      });
      const classes = useUtilityClasses6(ownerState);
      const propsToForward = {
        "aria-describedby": ariaDescribedby,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        autoComplete,
        autoFocus,
        id,
        onKeyDown,
        onKeyUp,
        name,
        placeholder,
        readOnly,
        type
      };
      const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState,
        className: [classes.root, className]
      });
      const InputComponent = multiline ? (_slots$textarea = slots.textarea) != null ? _slots$textarea : "textarea" : (_slots$input = slots.input) != null ? _slots$input : "input";
      const inputProps = useSlotProps({
        elementType: InputComponent,
        getSlotProps: (otherHandlers) => {
          return getInputProps(_extends({}, propsToForward, otherHandlers));
        },
        externalSlotProps: slotProps.input,
        additionalProps: _extends({
          rows: multiline ? rows : void 0
        }, multiline && !isHostComponent(InputComponent) && {
          minRows: rows || minRows,
          maxRows: rows || maxRows
        }),
        ownerState,
        className: classes.input
      });
      if (true) {
        if (multiline) {
          if (rows) {
            if (minRows || maxRows) {
              console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.");
            }
          }
        }
      }
      return (0, import_jsx_runtime17.jsxs)(Root, _extends({}, rootProps, {
        children: [startAdornment, (0, import_jsx_runtime16.jsx)(InputComponent, _extends({}, inputProps)), endAdornment]
      }));
    });
    true ? Input.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * @ignore
       */
      "aria-describedby": import_prop_types11.default.string,
      /**
       * @ignore
       */
      "aria-label": import_prop_types11.default.string,
      /**
       * @ignore
       */
      "aria-labelledby": import_prop_types11.default.string,
      /**
       * This prop helps users to fill forms faster, especially on mobile devices.
       * The name can be confusing, as it's more like an autofill.
       * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
       */
      autoComplete: import_prop_types11.default.string,
      /**
       * If `true`, the `input` element is focused during the first mount.
       */
      autoFocus: import_prop_types11.default.bool,
      /**
       * Class name applied to the root element.
       */
      className: import_prop_types11.default.string,
      /**
       * The default value. Use when the component is not controlled.
       */
      defaultValue: import_prop_types11.default.any,
      /**
       * If `true`, the component is disabled.
       * The prop defaults to the value (`false`) inherited from the parent FormControl component.
       */
      disabled: import_prop_types11.default.bool,
      /**
       * Trailing adornment for this input.
       */
      endAdornment: import_prop_types11.default.node,
      /**
       * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `Mui-error` class on the root element.
       * The prop defaults to the value (`false`) inherited from the parent FormControl component.
       */
      error: import_prop_types11.default.bool,
      /**
       * The id of the `input` element.
       */
      id: import_prop_types11.default.string,
      /**
       * @ignore
       */
      inputRef: import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.shape({
        current: import_prop_types11.default.object
      })]),
      /**
       * Maximum number of rows to display when multiline option is set to true.
       */
      maxRows: import_prop_types11.default.number,
      /**
       * Minimum number of rows to display when multiline option is set to true.
       */
      minRows: import_prop_types11.default.number,
      /**
       * If `true`, a `textarea` element is rendered.
       * @default false
       */
      multiline: import_prop_types11.default.bool,
      /**
       * Name attribute of the `input` element.
       */
      name: import_prop_types11.default.string,
      /**
       * @ignore
       */
      onBlur: import_prop_types11.default.func,
      /**
       * @ignore
       */
      onChange: import_prop_types11.default.func,
      /**
       * @ignore
       */
      onClick: import_prop_types11.default.func,
      /**
       * @ignore
       */
      onFocus: import_prop_types11.default.func,
      /**
       * @ignore
       */
      onKeyDown: import_prop_types11.default.func,
      /**
       * @ignore
       */
      onKeyUp: import_prop_types11.default.func,
      /**
       * The short hint displayed in the `input` before the user enters a value.
       */
      placeholder: import_prop_types11.default.string,
      /**
       * It prevents the user from changing the value of the field
       * (not from interacting with the field).
       */
      readOnly: import_prop_types11.default.bool,
      /**
       * If `true`, the `input` element is required.
       * The prop defaults to the value (`false`) inherited from the parent FormControl component.
       */
      required: import_prop_types11.default.bool,
      /**
       * Number of rows to display when multiline option is set to true.
       */
      rows: import_prop_types11.default.number,
      /**
       * The props used for each slot inside the Input.
       * @default {}
       */
      slotProps: import_prop_types11.default.shape({
        input: import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object]),
        root: import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object])
      }),
      /**
       * The components used for each slot inside the InputBase.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types11.default.shape({
        input: import_prop_types11.default.elementType,
        root: import_prop_types11.default.elementType,
        textarea: import_prop_types11.default.elementType
      }),
      /**
       * Leading adornment for this input.
       */
      startAdornment: import_prop_types11.default.node,
      /**
       * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
       * @default 'text'
       */
      type: import_prop_types11.default.oneOf(["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"]),
      /**
       * The value of the `input` element, required for a controlled component.
       */
      value: import_prop_types11.default.any
    } : void 0;
  }
});

// node_modules/@mui/base/Input/Input.types.js
var init_Input_types = __esm({
  "node_modules/@mui/base/Input/Input.types.js"() {
  }
});

// node_modules/@mui/base/Input/index.js
var init_Input2 = __esm({
  "node_modules/@mui/base/Input/index.js"() {
    init_Input();
    init_Input_types();
    init_inputClasses();
    init_inputClasses();
  }
});

// node_modules/@mui/base/Menu/menuClasses.js
function getMenuUtilityClass(slot) {
  return generateUtilityClass("MuiMenu", slot);
}
var menuClasses;
var init_menuClasses = __esm({
  "node_modules/@mui/base/Menu/menuClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    menuClasses = generateUtilityClasses("MuiMenu", ["root", "listbox", "expanded"]);
  }
});

// node_modules/@mui/base/useList/listActions.types.js
var ListActionTypes;
var init_listActions_types = __esm({
  "node_modules/@mui/base/useList/listActions.types.js"() {
    ListActionTypes = {
      blur: "list:blur",
      focus: "list:focus",
      itemClick: "list:itemClick",
      itemHover: "list:itemHover",
      itemsChange: "list:itemsChange",
      keyDown: "list:keyDown",
      resetHighlight: "list:resetHighlight",
      textNavigation: "list:textNavigation"
    };
  }
});

// node_modules/@mui/base/useList/listReducer.js
function findValidItemToHighlight(currentIndex, lookupDirection, items, includeDisabledItems, isItemDisabled, wrapAround) {
  if (items.length === 0 || !includeDisabledItems && items.every((item, itemIndex) => isItemDisabled(item, itemIndex))) {
    return -1;
  }
  let nextFocus = currentIndex;
  for (; ; ) {
    if (!wrapAround && lookupDirection === "next" && nextFocus === items.length || !wrapAround && lookupDirection === "previous" && nextFocus === -1) {
      return -1;
    }
    const nextFocusDisabled = includeDisabledItems ? false : isItemDisabled(items[nextFocus], nextFocus);
    if (nextFocusDisabled) {
      nextFocus += lookupDirection === "next" ? 1 : -1;
      if (wrapAround) {
        nextFocus = (nextFocus + items.length) % items.length;
      }
    } else {
      return nextFocus;
    }
  }
}
function moveHighlight(previouslyHighlightedValue, offset, context) {
  var _items$nextIndex;
  const {
    items,
    isItemDisabled,
    disableListWrap,
    disabledItemsFocusable,
    itemComparer,
    focusManagement
  } = context;
  const defaultHighlightedIndex = focusManagement === "DOM" ? 0 : -1;
  const maxIndex = items.length - 1;
  const previouslyHighlightedIndex = previouslyHighlightedValue == null ? -1 : items.findIndex((item) => itemComparer(item, previouslyHighlightedValue));
  let nextIndexCandidate;
  let lookupDirection;
  let wrapAround = !disableListWrap;
  switch (offset) {
    case "reset":
      if (defaultHighlightedIndex === -1) {
        return null;
      }
      nextIndexCandidate = 0;
      lookupDirection = "next";
      wrapAround = false;
      break;
    case "start":
      nextIndexCandidate = 0;
      lookupDirection = "next";
      wrapAround = false;
      break;
    case "end":
      nextIndexCandidate = maxIndex;
      lookupDirection = "previous";
      wrapAround = false;
      break;
    default: {
      const newIndex = previouslyHighlightedIndex + offset;
      if (newIndex < 0) {
        if (!wrapAround && previouslyHighlightedIndex !== -1 || Math.abs(offset) > 1) {
          nextIndexCandidate = 0;
          lookupDirection = "next";
        } else {
          nextIndexCandidate = maxIndex;
          lookupDirection = "previous";
        }
      } else if (newIndex > maxIndex) {
        if (!wrapAround || Math.abs(offset) > 1) {
          nextIndexCandidate = maxIndex;
          lookupDirection = "previous";
        } else {
          nextIndexCandidate = 0;
          lookupDirection = "next";
        }
      } else {
        nextIndexCandidate = newIndex;
        lookupDirection = offset >= 0 ? "next" : "previous";
      }
    }
  }
  const nextIndex = findValidItemToHighlight(nextIndexCandidate, lookupDirection, items, disabledItemsFocusable, isItemDisabled, wrapAround);
  if (nextIndex === -1 && previouslyHighlightedValue !== null && !isItemDisabled(previouslyHighlightedValue, previouslyHighlightedIndex)) {
    return previouslyHighlightedValue;
  }
  return (_items$nextIndex = items[nextIndex]) != null ? _items$nextIndex : null;
}
function toggleSelection(item, selectedValues, selectionMode, itemComparer) {
  if (selectionMode === "none") {
    return [];
  }
  if (selectionMode === "single") {
    if (itemComparer(selectedValues[0], item)) {
      return selectedValues;
    }
    return [item];
  }
  if (selectedValues.some((sv) => itemComparer(sv, item))) {
    return selectedValues.filter((sv) => !itemComparer(sv, item));
  }
  return [...selectedValues, item];
}
function handleItemSelection(item, state, context) {
  const {
    itemComparer,
    isItemDisabled,
    selectionMode,
    items
  } = context;
  const {
    selectedValues
  } = state;
  const itemIndex = items.findIndex((i) => itemComparer(item, i));
  if (isItemDisabled(item, itemIndex)) {
    return state;
  }
  const newSelectedValues = toggleSelection(item, selectedValues, selectionMode, itemComparer);
  return _extends({}, state, {
    selectedValues: newSelectedValues,
    highlightedValue: item
  });
}
function handleKeyDown(key, state, context) {
  const previouslySelectedValue = state.highlightedValue;
  const {
    orientation,
    pageSize: pageSize2
  } = context;
  switch (key) {
    case "Home":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, "start", context)
      });
    case "End":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, "end", context)
      });
    case "PageUp":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, -pageSize2, context)
      });
    case "PageDown":
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, pageSize2, context)
      });
    case "ArrowUp":
      if (orientation !== "vertical") {
        break;
      }
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, -1, context)
      });
    case "ArrowDown":
      if (orientation !== "vertical") {
        break;
      }
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, 1, context)
      });
    case "ArrowLeft": {
      if (orientation === "vertical") {
        break;
      }
      const offset = orientation === "horizontal-ltr" ? -1 : 1;
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, offset, context)
      });
    }
    case "ArrowRight": {
      if (orientation === "vertical") {
        break;
      }
      const offset = orientation === "horizontal-ltr" ? 1 : -1;
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, offset, context)
      });
    }
    case "Enter":
    case " ":
      if (state.highlightedValue === null) {
        return state;
      }
      return handleItemSelection(state.highlightedValue, state, context);
    default:
      break;
  }
  return state;
}
function handleBlur(state, context) {
  if (context.focusManagement === "DOM") {
    return state;
  }
  return _extends({}, state, {
    highlightedValue: null
  });
}
function textCriteriaMatches(nextFocus, searchString, stringifyItem) {
  var _stringifyItem;
  const text = (_stringifyItem = stringifyItem(nextFocus)) == null ? void 0 : _stringifyItem.trim().toLowerCase();
  if (!text || text.length === 0) {
    return false;
  }
  return text.indexOf(searchString) === 0;
}
function handleTextNavigation(state, searchString, context) {
  const {
    items,
    isItemDisabled,
    disabledItemsFocusable,
    getItemAsString
  } = context;
  const startWithCurrentItem = searchString.length > 1;
  let nextItem = startWithCurrentItem ? state.highlightedValue : moveHighlight(state.highlightedValue, 1, context);
  for (let index = 0; index < items.length; index += 1) {
    if (!nextItem || !startWithCurrentItem && state.highlightedValue === nextItem) {
      return state;
    }
    if (textCriteriaMatches(nextItem, searchString, getItemAsString) && (!isItemDisabled(nextItem, items.indexOf(nextItem)) || disabledItemsFocusable)) {
      return _extends({}, state, {
        highlightedValue: nextItem
      });
    }
    nextItem = moveHighlight(nextItem, 1, context);
  }
  return state;
}
function handleItemsChange(items, previousItems, state, context) {
  var _state$selectedValues;
  const {
    itemComparer,
    focusManagement
  } = context;
  let newHighlightedValue = null;
  if (state.highlightedValue != null) {
    var _items$find;
    newHighlightedValue = (_items$find = items.find((item) => itemComparer(item, state.highlightedValue))) != null ? _items$find : null;
  } else if (focusManagement === "DOM" && previousItems.length === 0) {
    newHighlightedValue = moveHighlight(null, "reset", context);
  }
  const selectedValues = (_state$selectedValues = state.selectedValues) != null ? _state$selectedValues : [];
  const newSelectedValues = selectedValues.filter((selectedValue) => items.some((item) => itemComparer(item, selectedValue)));
  return _extends({}, state, {
    highlightedValue: newHighlightedValue,
    selectedValues: newSelectedValues
  });
}
function handleResetHighlight(state, context) {
  return _extends({}, state, {
    highlightedValue: moveHighlight(null, "reset", context)
  });
}
function listReducer(state, action) {
  const {
    type,
    context
  } = action;
  switch (type) {
    case ListActionTypes.keyDown:
      return handleKeyDown(action.key, state, context);
    case ListActionTypes.itemClick:
      return handleItemSelection(action.item, state, context);
    case ListActionTypes.blur:
      return handleBlur(state, context);
    case ListActionTypes.textNavigation:
      return handleTextNavigation(state, action.searchString, context);
    case ListActionTypes.itemsChange:
      return handleItemsChange(action.items, action.previousItems, state, context);
    case ListActionTypes.resetHighlight:
      return handleResetHighlight(state, context);
    default:
      return state;
  }
}
var init_listReducer = __esm({
  "node_modules/@mui/base/useList/listReducer.js"() {
    init_extends();
    init_listActions_types();
  }
});

// node_modules/@mui/base/utils/useMessageBus.js
function createMessageBus() {
  const listeners = /* @__PURE__ */ new Map();
  function subscribe(topic, callback) {
    let topicListeners = listeners.get(topic);
    if (!topicListeners) {
      topicListeners = /* @__PURE__ */ new Set([callback]);
      listeners.set(topic, topicListeners);
    } else {
      topicListeners.add(callback);
    }
    return () => {
      topicListeners.delete(callback);
      if (topicListeners.size === 0) {
        listeners.delete(topic);
      }
    };
  }
  function publish(topic, ...args) {
    const topicListeners = listeners.get(topic);
    if (topicListeners) {
      topicListeners.forEach((callback) => callback(...args));
    }
  }
  return {
    subscribe,
    publish
  };
}
function useMessageBus() {
  const bus = React20.useRef();
  if (!bus.current) {
    bus.current = createMessageBus();
  }
  return bus.current;
}
var React20;
var init_useMessageBus = __esm({
  "node_modules/@mui/base/utils/useMessageBus.js"() {
    React20 = __toESM(require_react());
  }
});

// node_modules/@mui/base/useList/useListChangeNotifiers.js
function useSelectChangeNotifiers() {
  const messageBus = useMessageBus();
  const notifySelectionChanged = React21.useCallback((newSelectedItems) => {
    messageBus.publish(SELECTION_CHANGE_TOPIC, newSelectedItems);
  }, [messageBus]);
  const notifyHighlightChanged = React21.useCallback((newHighlightedItem) => {
    messageBus.publish(HIGHLIGHT_CHANGE_TOPIC, newHighlightedItem);
  }, [messageBus]);
  const registerSelectionChangeHandler = React21.useCallback((handler) => {
    return messageBus.subscribe(SELECTION_CHANGE_TOPIC, handler);
  }, [messageBus]);
  const registerHighlightChangeHandler = React21.useCallback((handler) => {
    return messageBus.subscribe(HIGHLIGHT_CHANGE_TOPIC, handler);
  }, [messageBus]);
  return {
    notifySelectionChanged,
    notifyHighlightChanged,
    registerSelectionChangeHandler,
    registerHighlightChangeHandler
  };
}
var React21, SELECTION_CHANGE_TOPIC, HIGHLIGHT_CHANGE_TOPIC;
var init_useListChangeNotifiers = __esm({
  "node_modules/@mui/base/useList/useListChangeNotifiers.js"() {
    React21 = __toESM(require_react());
    init_useMessageBus();
    SELECTION_CHANGE_TOPIC = "select:change-selection";
    HIGHLIGHT_CHANGE_TOPIC = "select:change-highlight";
  }
});

// node_modules/@mui/base/utils/useControllableReducer.js
function areEqual(a, b) {
  return a === b;
}
function getControlledState(internalState, controlledProps) {
  const augmentedState = _extends({}, internalState);
  Object.keys(controlledProps).forEach((key) => {
    if (controlledProps[key] !== void 0) {
      augmentedState[key] = controlledProps[key];
    }
  });
  return augmentedState;
}
function useStateChangeDetection(parameters) {
  const {
    nextState,
    initialState,
    stateComparers,
    onStateChange,
    controlledProps,
    lastActionRef
  } = parameters;
  const internalPreviousStateRef = React22.useRef(initialState);
  React22.useEffect(() => {
    if (lastActionRef.current === null) {
      return;
    }
    const previousState = getControlledState(internalPreviousStateRef.current, controlledProps);
    Object.keys(nextState).forEach((key) => {
      var _stateComparers$key;
      const stateComparer = (_stateComparers$key = stateComparers[key]) != null ? _stateComparers$key : areEqual;
      const nextStateItem = nextState[key];
      const previousStateItem = previousState[key];
      if (previousStateItem == null && nextStateItem != null || previousStateItem != null && nextStateItem == null || previousStateItem != null && nextStateItem != null && !stateComparer(nextStateItem, previousStateItem)) {
        var _event, _type;
        onStateChange == null ? void 0 : onStateChange((_event = lastActionRef.current.event) != null ? _event : null, key, nextStateItem, (_type = lastActionRef.current.type) != null ? _type : "", nextState);
      }
    });
    internalPreviousStateRef.current = nextState;
    lastActionRef.current = null;
  }, [internalPreviousStateRef, nextState, lastActionRef, onStateChange, stateComparers, controlledProps]);
}
function useControllableReducer(parameters) {
  const lastActionRef = React22.useRef(null);
  const {
    reducer,
    initialState,
    controlledProps = EMPTY_OBJECT,
    stateComparers = EMPTY_OBJECT,
    onStateChange = NOOP,
    actionContext
  } = parameters;
  const reducerWithControlledState = React22.useCallback((state, action) => {
    lastActionRef.current = action;
    const controlledState = getControlledState(state, controlledProps);
    const newState = reducer(controlledState, action);
    return newState;
  }, [controlledProps, reducer]);
  const [nextState, dispatch] = React22.useReducer(reducerWithControlledState, initialState);
  const dispatchWithContext = React22.useCallback((action) => {
    dispatch(_extends({}, action, {
      context: actionContext
    }));
  }, [actionContext]);
  useStateChangeDetection({
    nextState,
    initialState,
    stateComparers: stateComparers != null ? stateComparers : EMPTY_OBJECT,
    onStateChange: onStateChange != null ? onStateChange : NOOP,
    controlledProps,
    lastActionRef
  });
  return [getControlledState(nextState, controlledProps), dispatchWithContext];
}
var React22, EMPTY_OBJECT, NOOP;
var init_useControllableReducer = __esm({
  "node_modules/@mui/base/utils/useControllableReducer.js"() {
    init_extends();
    React22 = __toESM(require_react());
    EMPTY_OBJECT = {};
    NOOP = () => {
    };
  }
});

// node_modules/@mui/base/utils/useLatest.js
function useLatest(value, deps) {
  const ref = React23.useRef(value);
  React23.useEffect(() => {
    ref.current = value;
  }, deps != null ? deps : [value]);
  return ref;
}
var React23;
var init_useLatest = __esm({
  "node_modules/@mui/base/utils/useLatest.js"() {
    React23 = __toESM(require_react());
  }
});

// node_modules/@mui/base/utils/useTextNavigation.js
function useTextNavigation(callback) {
  const textCriteriaRef = React24.useRef({
    searchString: "",
    lastTime: null
  });
  return React24.useCallback((event) => {
    if (event.key.length === 1 && event.key !== " ") {
      const textCriteria = textCriteriaRef.current;
      const lowerKey = event.key.toLowerCase();
      const currentTime = performance.now();
      if (textCriteria.searchString.length > 0 && textCriteria.lastTime && currentTime - textCriteria.lastTime > TEXT_NAVIGATION_RESET_TIMEOUT) {
        textCriteria.searchString = lowerKey;
      } else if (textCriteria.searchString.length !== 1 || lowerKey !== textCriteria.searchString) {
        textCriteria.searchString += lowerKey;
      }
      textCriteria.lastTime = currentTime;
      callback(textCriteria.searchString, event);
    }
  }, [callback]);
}
var React24, TEXT_NAVIGATION_RESET_TIMEOUT;
var init_useTextNavigation = __esm({
  "node_modules/@mui/base/utils/useTextNavigation.js"() {
    React24 = __toESM(require_react());
    TEXT_NAVIGATION_RESET_TIMEOUT = 500;
  }
});

// node_modules/@mui/base/useList/useList.js
function useList(params) {
  const {
    controlledProps = EMPTY_OBJECT2,
    disabledItemsFocusable = false,
    disableListWrap = false,
    focusManagement = "activeDescendant",
    getInitialState = defaultGetInitialState,
    getItemDomElement,
    getItemId,
    isItemDisabled = defaultIsItemDisabled,
    rootRef: externalListRef,
    onStateChange = NOOP2,
    items,
    itemComparer = defaultItemComparer,
    getItemAsString = defaultItemStringifier,
    onChange,
    onHighlightChange,
    onItemsChange,
    orientation = "vertical",
    pageSize: pageSize2 = 5,
    reducerActionContext = EMPTY_OBJECT2,
    selectionMode = "single",
    stateReducer: externalReducer
  } = params;
  if (true) {
    if (focusManagement === "DOM" && getItemDomElement == null) {
      throw new Error("useList: The `getItemDomElement` prop is required when using the `DOM` focus management.");
    }
    if (focusManagement === "activeDescendant" && getItemId == null) {
      throw new Error("useList: The `getItemId` prop is required when using the `activeDescendant` focus management.");
    }
  }
  const listRef = React25.useRef(null);
  const handleRef = useForkRef(externalListRef, listRef);
  const handleHighlightChange = React25.useCallback((event, value, reason) => {
    onHighlightChange == null ? void 0 : onHighlightChange(event, value, reason);
    if (focusManagement === "DOM" && value != null && (reason === ListActionTypes.itemClick || reason === ListActionTypes.keyDown || reason === ListActionTypes.textNavigation)) {
      var _getItemDomElement;
      getItemDomElement == null ? void 0 : (_getItemDomElement = getItemDomElement(value)) == null ? void 0 : _getItemDomElement.focus();
    }
  }, [getItemDomElement, onHighlightChange, focusManagement]);
  const stateComparers = React25.useMemo(() => ({
    highlightedValue: itemComparer,
    selectedValues: (valuesArray1, valuesArray2) => areArraysEqual(valuesArray1, valuesArray2, itemComparer)
  }), [itemComparer]);
  const handleStateChange = React25.useCallback((event, field, value, reason, state2) => {
    onStateChange == null ? void 0 : onStateChange(event, field, value, reason, state2);
    switch (field) {
      case "highlightedValue":
        handleHighlightChange(event, value, reason);
        break;
      case "selectedValues":
        onChange == null ? void 0 : onChange(event, value, reason);
        break;
      default:
        break;
    }
  }, [handleHighlightChange, onChange, onStateChange]);
  const listActionContext = React25.useMemo(() => {
    return {
      disabledItemsFocusable,
      disableListWrap,
      focusManagement,
      isItemDisabled,
      itemComparer,
      items,
      getItemAsString,
      onHighlightChange: handleHighlightChange,
      orientation,
      pageSize: pageSize2,
      selectionMode,
      stateComparers
    };
  }, [disabledItemsFocusable, disableListWrap, focusManagement, isItemDisabled, itemComparer, items, getItemAsString, handleHighlightChange, orientation, pageSize2, selectionMode, stateComparers]);
  const initialState = getInitialState();
  const reducer = externalReducer != null ? externalReducer : listReducer;
  const actionContext = React25.useMemo(() => _extends({}, reducerActionContext, listActionContext), [reducerActionContext, listActionContext]);
  const [state, dispatch] = useControllableReducer({
    reducer,
    actionContext,
    initialState,
    controlledProps,
    stateComparers,
    onStateChange: handleStateChange
  });
  const {
    highlightedValue,
    selectedValues
  } = state;
  const handleTextNavigation2 = useTextNavigation((searchString, event) => dispatch({
    type: ListActionTypes.textNavigation,
    event,
    searchString
  }));
  const latestSelectedValues = useLatest(selectedValues);
  const latestHighlightedValue = useLatest(highlightedValue);
  const previousItems = React25.useRef([]);
  React25.useEffect(() => {
    if (areArraysEqual(previousItems.current, items, itemComparer)) {
      return;
    }
    dispatch({
      type: ListActionTypes.itemsChange,
      event: null,
      items,
      previousItems: previousItems.current
    });
    previousItems.current = items;
    onItemsChange == null ? void 0 : onItemsChange(items);
  }, [items, itemComparer, dispatch, onItemsChange]);
  const {
    notifySelectionChanged,
    notifyHighlightChanged,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  } = useSelectChangeNotifiers();
  React25.useEffect(() => {
    notifySelectionChanged(selectedValues);
  }, [selectedValues, notifySelectionChanged]);
  React25.useEffect(() => {
    notifyHighlightChanged(highlightedValue);
  }, [highlightedValue, notifyHighlightChanged]);
  const createHandleKeyDown = (other) => (event) => {
    var _other$onKeyDown;
    (_other$onKeyDown = other.onKeyDown) == null ? void 0 : _other$onKeyDown.call(other, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    const keysToPreventDefault = ["Home", "End", "PageUp", "PageDown"];
    if (orientation === "vertical") {
      keysToPreventDefault.push("ArrowUp", "ArrowDown");
    } else {
      keysToPreventDefault.push("ArrowLeft", "ArrowRight");
    }
    if (focusManagement === "activeDescendant") {
      keysToPreventDefault.push(" ", "Enter");
    }
    if (keysToPreventDefault.includes(event.key)) {
      event.preventDefault();
    }
    dispatch({
      type: ListActionTypes.keyDown,
      key: event.key,
      event
    });
    handleTextNavigation2(event);
  };
  const createHandleBlur = (other) => (event) => {
    var _other$onBlur, _listRef$current;
    (_other$onBlur = other.onBlur) == null ? void 0 : _other$onBlur.call(other, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if ((_listRef$current = listRef.current) != null && _listRef$current.contains(event.relatedTarget)) {
      return;
    }
    dispatch({
      type: ListActionTypes.blur,
      event
    });
  };
  const getRootProps = (otherHandlers = {}) => {
    return _extends({}, otherHandlers, {
      "aria-activedescendant": focusManagement === "activeDescendant" && highlightedValue != null ? getItemId(highlightedValue) : void 0,
      onBlur: createHandleBlur(otherHandlers),
      onKeyDown: createHandleKeyDown(otherHandlers),
      tabIndex: focusManagement === "DOM" ? -1 : 0,
      ref: handleRef
    });
  };
  const getItemState = React25.useCallback((item) => {
    var _latestSelectedValues;
    const index = items.findIndex((i) => itemComparer(i, item));
    const selected = ((_latestSelectedValues = latestSelectedValues.current) != null ? _latestSelectedValues : []).some((value) => value != null && itemComparer(item, value));
    const disabled = isItemDisabled(item, index);
    const highlighted = latestHighlightedValue.current != null && itemComparer(item, latestHighlightedValue.current);
    const focusable = focusManagement === "DOM";
    return {
      disabled,
      focusable,
      highlighted,
      index,
      selected
    };
  }, [items, isItemDisabled, itemComparer, latestSelectedValues, latestHighlightedValue, focusManagement]);
  const contextValue = React25.useMemo(() => ({
    dispatch,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  }), [dispatch, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler]);
  React25.useDebugValue({
    state
  });
  return {
    contextValue,
    dispatch,
    getRootProps,
    rootRef: handleRef,
    state
  };
}
var React25, EMPTY_OBJECT2, NOOP2, defaultItemComparer, defaultIsItemDisabled, defaultItemStringifier, defaultGetInitialState, useList_default;
var init_useList = __esm({
  "node_modules/@mui/base/useList/useList.js"() {
    init_extends();
    React25 = __toESM(require_react());
    init_esm();
    init_listActions_types();
    init_listReducer();
    init_useListChangeNotifiers();
    init_useControllableReducer();
    init_areArraysEqual();
    init_useLatest();
    init_useTextNavigation();
    EMPTY_OBJECT2 = {};
    NOOP2 = () => {
    };
    defaultItemComparer = (optionA, optionB) => optionA === optionB;
    defaultIsItemDisabled = () => false;
    defaultItemStringifier = (item) => typeof item === "string" ? item : String(item);
    defaultGetInitialState = () => ({
      highlightedValue: null,
      selectedValues: []
    });
    useList_default = useList;
  }
});

// node_modules/@mui/base/useList/useList.types.js
var init_useList_types = __esm({
  "node_modules/@mui/base/useList/useList.types.js"() {
  }
});

// node_modules/@mui/base/utils/useForcedRerendering.js
function useForcedRerendering() {
  const [, setState] = React26.useState({});
  return React26.useCallback(() => {
    setState({});
  }, []);
}
var React26;
var init_useForcedRerendering = __esm({
  "node_modules/@mui/base/utils/useForcedRerendering.js"() {
    React26 = __toESM(require_react());
  }
});

// node_modules/@mui/base/useList/ListContext.js
var React27, ListContext;
var init_ListContext = __esm({
  "node_modules/@mui/base/useList/ListContext.js"() {
    React27 = __toESM(require_react());
    ListContext = React27.createContext(null);
    if (true) {
      ListContext.displayName = "ListContext";
    }
  }
});

// node_modules/@mui/base/useList/useListItem.js
function useListItem(parameters) {
  const {
    handlePointerOverEvents = false,
    item,
    rootRef: externalRef
  } = parameters;
  const itemRef = React28.useRef(null);
  const handleRef = useForkRef(itemRef, externalRef);
  const listContext = React28.useContext(ListContext);
  if (!listContext) {
    throw new Error("useListItem must be used within a ListProvider");
  }
  const {
    dispatch,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  } = listContext;
  const {
    highlighted,
    selected,
    focusable
  } = getItemState(item);
  const rerender = useForcedRerendering();
  useEnhancedEffect_default(() => {
    function updateHighlightedState(highlightedItem) {
      if (highlightedItem === item && !highlighted) {
        rerender();
      } else if (highlightedItem !== item && highlighted) {
        rerender();
      }
    }
    return registerHighlightChangeHandler(updateHighlightedState);
  });
  useEnhancedEffect_default(() => {
    function updateSelectedState(selectedItems) {
      if (!selected) {
        if (selectedItems.includes(item)) {
          rerender();
        }
      } else if (!selectedItems.includes(item)) {
        rerender();
      }
    }
    return registerSelectionChangeHandler(updateSelectedState);
  }, [registerSelectionChangeHandler, rerender, selected, item]);
  const createHandleClick = React28.useCallback((other) => (event) => {
    var _other$onClick;
    (_other$onClick = other.onClick) == null ? void 0 : _other$onClick.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    dispatch({
      type: ListActionTypes.itemClick,
      item,
      event
    });
  }, [dispatch, item]);
  const createHandlePointerOver = React28.useCallback((other) => (event) => {
    var _other$onMouseOver;
    (_other$onMouseOver = other.onMouseOver) == null ? void 0 : _other$onMouseOver.call(other, event);
    if (event.defaultPrevented) {
      return;
    }
    dispatch({
      type: ListActionTypes.itemHover,
      item,
      event
    });
  }, [dispatch, item]);
  let tabIndex;
  if (focusable) {
    tabIndex = highlighted ? 0 : -1;
  }
  const getRootProps = (otherHandlers = {}) => _extends({}, otherHandlers, {
    onClick: createHandleClick(otherHandlers),
    onPointerOver: handlePointerOverEvents ? createHandlePointerOver(otherHandlers) : void 0,
    ref: handleRef,
    tabIndex
  });
  return {
    getRootProps,
    highlighted,
    rootRef: handleRef,
    selected
  };
}
var React28;
var init_useListItem = __esm({
  "node_modules/@mui/base/useList/useListItem.js"() {
    init_extends();
    React28 = __toESM(require_react());
    init_esm();
    init_useForcedRerendering();
    init_listActions_types();
    init_ListContext();
  }
});

// node_modules/@mui/base/useList/useListItem.types.js
var init_useListItem_types = __esm({
  "node_modules/@mui/base/useList/useListItem.types.js"() {
  }
});

// node_modules/@mui/base/useList/index.js
var init_useList2 = __esm({
  "node_modules/@mui/base/useList/index.js"() {
    init_useList();
    init_useList_types();
    init_useListItem();
    init_useListItem_types();
    init_listReducer();
    init_listReducer();
    init_listActions_types();
    init_ListContext();
  }
});

// node_modules/@mui/base/utils/useCompound.js
function sortSubitems(subitems) {
  const subitemsArray = Array.from(subitems.keys()).map((key) => {
    const subitem = subitems.get(key);
    return {
      key,
      subitem
    };
  });
  subitemsArray.sort((a, b) => {
    const aNode = a.subitem.ref.current;
    const bNode = b.subitem.ref.current;
    if (aNode === null || bNode === null || aNode === bNode) {
      return 0;
    }
    return aNode.compareDocumentPosition(bNode) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
  });
  return new Map(subitemsArray.map((item) => [item.key, item.subitem]));
}
function useCompoundParent() {
  const [subitems, setSubitems] = React29.useState(/* @__PURE__ */ new Map());
  const subitemKeys = React29.useRef(/* @__PURE__ */ new Set());
  const deregisterItem = React29.useCallback(function deregisterItem2(id) {
    subitemKeys.current.delete(id);
    setSubitems((previousState) => {
      const newState = new Map(previousState);
      newState.delete(id);
      return newState;
    });
  }, []);
  const registerItem = React29.useCallback(function registerItem2(id, item) {
    let providedOrGeneratedId;
    if (typeof id === "function") {
      providedOrGeneratedId = id(subitemKeys.current);
    } else {
      providedOrGeneratedId = id;
    }
    subitemKeys.current.add(providedOrGeneratedId);
    setSubitems((previousState) => {
      const newState = new Map(previousState);
      newState.set(providedOrGeneratedId, item);
      return newState;
    });
    return {
      id: providedOrGeneratedId,
      deregister: () => deregisterItem(providedOrGeneratedId)
    };
  }, [deregisterItem]);
  const sortedSubitems = React29.useMemo(() => sortSubitems(subitems), [subitems]);
  const getItemIndex = React29.useCallback(function getItemIndex2(id) {
    return Array.from(sortedSubitems.keys()).indexOf(id);
  }, [sortedSubitems]);
  return {
    contextValue: {
      getItemIndex,
      registerItem,
      totalSubitemCount: subitems.size
    },
    subitems: sortedSubitems
  };
}
var React29, CompoundComponentContext;
var init_useCompound = __esm({
  "node_modules/@mui/base/utils/useCompound.js"() {
    React29 = __toESM(require_react());
    CompoundComponentContext = React29.createContext(null);
    CompoundComponentContext.displayName = "CompoundComponentContext";
  }
});

// node_modules/@mui/base/useMenu/menuReducer.js
function menuReducer(state, action) {
  if (action.type === ListActionTypes.itemHover) {
    return state;
  }
  const newState = listReducer(state, action);
  if (newState.highlightedValue === null && action.context.items.length > 0) {
    return _extends({}, newState, {
      highlightedValue: action.context.items[0]
    });
  }
  if (action.type === ListActionTypes.keyDown) {
    if (action.event.key === "Escape") {
      return _extends({}, newState, {
        open: false
      });
    }
  }
  if (action.type === ListActionTypes.blur) {
    var _action$context$listb;
    if (!((_action$context$listb = action.context.listboxRef.current) != null && _action$context$listb.contains(action.event.relatedTarget))) {
      var _action$context$listb2, _action$event$related;
      const listboxId = (_action$context$listb2 = action.context.listboxRef.current) == null ? void 0 : _action$context$listb2.getAttribute("id");
      const controlledBy = (_action$event$related = action.event.relatedTarget) == null ? void 0 : _action$event$related.getAttribute("aria-controls");
      if (listboxId && controlledBy && listboxId === controlledBy) {
        return newState;
      }
      return _extends({}, newState, {
        open: false,
        highlightedValue: action.context.items[0]
      });
    }
  }
  return newState;
}
var init_menuReducer = __esm({
  "node_modules/@mui/base/useMenu/menuReducer.js"() {
    init_extends();
    init_useList2();
  }
});

// node_modules/@mui/base/useMenu/useMenu.js
function useMenu(parameters = {}) {
  const {
    defaultOpen,
    listboxRef: listboxRefProp,
    open: openProp,
    onItemsChange,
    onOpenChange
  } = parameters;
  const listboxRef = React30.useRef(null);
  const handleRef = useForkRef(listboxRef, listboxRefProp);
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const subitemKeys = React30.useMemo(() => Array.from(subitems.keys()), [subitems]);
  const getItemDomElement = React30.useCallback((itemId) => {
    var _subitems$get$ref$cur, _subitems$get;
    if (itemId == null) {
      return null;
    }
    return (_subitems$get$ref$cur = (_subitems$get = subitems.get(itemId)) == null ? void 0 : _subitems$get.ref.current) != null ? _subitems$get$ref$cur : null;
  }, [subitems]);
  const controlledProps = React30.useMemo(() => ({
    open: openProp
  }), [openProp]);
  const stateChangeHandler = React30.useCallback((event, field, fieldValue, reason, state) => {
    if (field === "open") {
      onOpenChange == null ? void 0 : onOpenChange(fieldValue);
      if (fieldValue === true && state.highlightedValue !== null) {
        var _subitems$get2, _subitems$get2$ref$cu;
        (_subitems$get2 = subitems.get(state.highlightedValue)) == null ? void 0 : (_subitems$get2$ref$cu = _subitems$get2.ref.current) == null ? void 0 : _subitems$get2$ref$cu.focus();
      }
    }
  }, [onOpenChange, subitems]);
  const {
    dispatch,
    getRootProps,
    contextValue: listContextValue,
    state: {
      open,
      highlightedValue
    },
    rootRef: mergedListRef
  } = useList_default({
    controlledProps,
    disabledItemsFocusable: true,
    focusManagement: "DOM",
    getItemDomElement,
    getInitialState: () => ({
      selectedValues: [],
      highlightedValue: null,
      open: defaultOpen != null ? defaultOpen : false
    }),
    isItemDisabled: (id) => {
      var _subitems$get3;
      return (subitems == null ? void 0 : (_subitems$get3 = subitems.get(id)) == null ? void 0 : _subitems$get3.disabled) || false;
    },
    items: subitemKeys,
    getItemAsString: (id) => {
      var _subitems$get4, _subitems$get5, _subitems$get5$ref$cu;
      return ((_subitems$get4 = subitems.get(id)) == null ? void 0 : _subitems$get4.label) || ((_subitems$get5 = subitems.get(id)) == null ? void 0 : (_subitems$get5$ref$cu = _subitems$get5.ref.current) == null ? void 0 : _subitems$get5$ref$cu.innerText);
    },
    rootRef: handleRef,
    onItemsChange,
    onStateChange: stateChangeHandler,
    reducerActionContext: {
      listboxRef
    },
    selectionMode: "none",
    stateReducer: menuReducer
  });
  React30.useEffect(() => {
    if (open && highlightedValue === subitemKeys[0]) {
      var _subitems$get6, _subitems$get6$ref, _subitems$get6$ref$cu;
      (_subitems$get6 = subitems.get(subitemKeys[0])) == null ? void 0 : (_subitems$get6$ref = _subitems$get6.ref) == null ? void 0 : (_subitems$get6$ref$cu = _subitems$get6$ref.current) == null ? void 0 : _subitems$get6$ref$cu.focus();
    }
  }, [open, highlightedValue, subitems, subitemKeys]);
  React30.useEffect(() => {
    var _listboxRef$current;
    if ((_listboxRef$current = listboxRef.current) != null && _listboxRef$current.contains(document.activeElement) && highlightedValue !== null) {
      var _subitems$get7, _subitems$get7$ref$cu;
      subitems == null ? void 0 : (_subitems$get7 = subitems.get(highlightedValue)) == null ? void 0 : (_subitems$get7$ref$cu = _subitems$get7.ref.current) == null ? void 0 : _subitems$get7$ref$cu.focus();
    }
  }, [highlightedValue, subitems]);
  const getListboxProps = (otherHandlers = {}) => {
    const rootProps = getRootProps(otherHandlers);
    return _extends({}, otherHandlers, rootProps, {
      role: "menu"
    });
  };
  React30.useDebugValue({
    subitems,
    highlightedValue
  });
  return {
    contextValue: _extends({}, compoundComponentContextValue, listContextValue),
    dispatch,
    getListboxProps,
    highlightedValue,
    listboxRef: mergedListRef,
    menuItems: subitems,
    open
  };
}
var React30;
var init_useMenu = __esm({
  "node_modules/@mui/base/useMenu/useMenu.js"() {
    init_extends();
    React30 = __toESM(require_react());
    init_esm();
    init_useList2();
    init_useCompound();
    init_menuReducer();
  }
});

// node_modules/@mui/base/useMenu/useMenu.types.js
var init_useMenu_types = __esm({
  "node_modules/@mui/base/useMenu/useMenu.types.js"() {
  }
});

// node_modules/@mui/base/useMenu/MenuProvider.js
function MenuProvider(props) {
  const {
    value,
    children
  } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
    registerItem,
    totalSubitemCount
  } = value;
  const listContextValue = React31.useMemo(() => ({
    dispatch,
    getItemState,
    getItemIndex,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  }), [dispatch, getItemIndex, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler]);
  const compoundComponentContextValue = React31.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  return (0, import_jsx_runtime18.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime18.jsx)(ListContext.Provider, {
      value: listContextValue,
      children
    })
  });
}
var React31, import_jsx_runtime18;
var init_MenuProvider = __esm({
  "node_modules/@mui/base/useMenu/MenuProvider.js"() {
    React31 = __toESM(require_react());
    init_ListContext();
    init_useCompound();
    import_jsx_runtime18 = __toESM(require_jsx_runtime());
  }
});

// node_modules/@mui/base/useMenu/index.js
var init_useMenu2 = __esm({
  "node_modules/@mui/base/useMenu/index.js"() {
    init_useMenu();
    init_useMenu_types();
    init_MenuProvider();
    init_MenuProvider();
  }
});

// node_modules/@mui/base/Menu/Menu.js
function useUtilityClasses7(ownerState) {
  const {
    open
  } = ownerState;
  const slots = {
    root: ["root", open && "expanded"],
    listbox: ["listbox", open && "expanded"]
  };
  return composeClasses(slots, useClassNamesOverride(getMenuUtilityClass));
}
var React32, import_prop_types12, import_jsx_runtime19, _excluded9, Menu;
var init_Menu = __esm({
  "node_modules/@mui/base/Menu/Menu.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React32 = __toESM(require_react());
    import_prop_types12 = __toESM(require_prop_types());
    init_esm();
    init_menuClasses();
    init_useMenu2();
    init_composeClasses();
    init_Popper2();
    init_useSlotProps();
    init_ClassNameConfigurator();
    init_MenuProvider();
    init_useList2();
    import_jsx_runtime19 = __toESM(require_jsx_runtime());
    _excluded9 = ["actions", "anchorEl", "children", "defaultOpen", "listboxId", "onItemsChange", "onOpenChange", "open", "slotProps", "slots"];
    Menu = React32.forwardRef(function Menu2(props, forwardedRef) {
      var _slots$root, _slots$listbox;
      const {
        actions,
        anchorEl,
        children,
        defaultOpen,
        listboxId,
        onItemsChange,
        onOpenChange,
        open: openProp,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded9);
      const {
        contextValue,
        getListboxProps,
        dispatch,
        open
      } = useMenu({
        defaultOpen,
        open: openProp,
        onItemsChange,
        onOpenChange,
        listboxId
      });
      React32.useImperativeHandle(actions, () => ({
        dispatch,
        resetHighlight: () => dispatch({
          type: ListActionTypes.resetHighlight,
          event: null
        })
      }), [dispatch]);
      const ownerState = _extends({}, props, {
        open
      });
      const classes = useUtilityClasses7(ownerState);
      const Root = (_slots$root = slots.root) != null ? _slots$root : Popper_default;
      const rootProps = useSlotProps({
        elementType: Root,
        externalForwardedProps: other,
        externalSlotProps: slotProps.root,
        additionalProps: {
          anchorEl,
          open,
          keepMounted: true,
          role: void 0,
          ref: forwardedRef
        },
        className: classes.root,
        ownerState
      });
      const Listbox = (_slots$listbox = slots.listbox) != null ? _slots$listbox : "ul";
      const listboxProps = useSlotProps({
        elementType: Listbox,
        getSlotProps: getListboxProps,
        externalSlotProps: slotProps.listbox,
        ownerState,
        className: classes.listbox
      });
      return (0, import_jsx_runtime19.jsx)(Root, _extends({}, rootProps, {
        children: (0, import_jsx_runtime19.jsx)(Listbox, _extends({}, listboxProps, {
          children: (0, import_jsx_runtime19.jsx)(MenuProvider, {
            value: contextValue,
            children
          })
        }))
      }));
    });
    true ? Menu.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * A ref with imperative actions that can be performed on the menu.
       */
      actions: refType_default,
      /**
       * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
       * or a function that returns either.
       * It's used to set the position of the popper.
       */
      anchorEl: import_prop_types12.default.oneOfType([HTMLElementType, import_prop_types12.default.object, import_prop_types12.default.func]),
      /**
       * @ignore
       */
      children: import_prop_types12.default.node,
      /**
       * @ignore
       */
      defaultOpen: import_prop_types12.default.bool,
      /**
       * @ignore
       */
      listboxId: import_prop_types12.default.string,
      /**
       * Function called when the items displayed in the menu change.
       */
      onItemsChange: import_prop_types12.default.func,
      /**
       * Triggered when focus leaves the menu and the menu should close.
       */
      onOpenChange: import_prop_types12.default.func,
      /**
       * Controls whether the menu is displayed.
       * @default false
       */
      open: import_prop_types12.default.bool,
      /**
       * The props used for each slot inside the Menu.
       * @default {}
       */
      slotProps: import_prop_types12.default.shape({
        listbox: import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object]),
        root: import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object])
      }),
      /**
       * The components used for each slot inside the Menu.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types12.default.shape({
        listbox: import_prop_types12.default.elementType,
        root: import_prop_types12.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/Menu/Menu.types.js
var init_Menu_types = __esm({
  "node_modules/@mui/base/Menu/Menu.types.js"() {
  }
});

// node_modules/@mui/base/Menu/index.js
var init_Menu2 = __esm({
  "node_modules/@mui/base/Menu/index.js"() {
    init_Menu();
    init_menuClasses();
    init_menuClasses();
    init_Menu_types();
  }
});

// node_modules/@mui/base/MenuItem/menuItemClasses.js
function getMenuItemUtilityClass(slot) {
  return generateUtilityClass("MuiMenuItem", slot);
}
var menuItemClasses;
var init_menuItemClasses = __esm({
  "node_modules/@mui/base/MenuItem/menuItemClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    menuItemClasses = generateUtilityClasses("MuiMenuItem", ["root", "disabled", "focusVisible"]);
  }
});

// node_modules/@mui/base/utils/useCompoundItem.js
function useCompoundItem(id, itemMetadata) {
  const context = React33.useContext(CompoundComponentContext);
  if (context === null) {
    throw new Error("useCompoundItem must be used within a useCompoundParent");
  }
  const {
    registerItem
  } = context;
  const [registeredId, setRegisteredId] = React33.useState(typeof id === "function" ? void 0 : id);
  useEnhancedEffect_default(() => {
    const {
      id: returnedId,
      deregister
    } = registerItem(id, itemMetadata);
    setRegisteredId(returnedId);
    return deregister;
  }, [registerItem, itemMetadata, id]);
  return {
    id: registeredId,
    index: registeredId !== void 0 ? context.getItemIndex(registeredId) : -1,
    totalItemCount: context.totalSubitemCount
  };
}
var React33;
var init_useCompoundItem = __esm({
  "node_modules/@mui/base/utils/useCompoundItem.js"() {
    React33 = __toESM(require_react());
    init_esm();
    init_useCompound();
  }
});

// node_modules/@mui/base/useMenuItem/useMenuItem.js
function idGenerator(existingKeys) {
  return `menu-item-${existingKeys.size}`;
}
function useMenuItem(params) {
  const {
    disabled = false,
    id: idParam,
    rootRef: externalRef,
    label
  } = params;
  const id = useId(idParam);
  const itemRef = React34.useRef(null);
  const itemMetadata = React34.useMemo(() => ({
    disabled,
    id: id != null ? id : "",
    label,
    ref: itemRef
  }), [disabled, id, label]);
  const {
    getRootProps: getListRootProps,
    highlighted,
    rootRef: listItemRefHandler
  } = useListItem({
    item: id
  });
  const {
    index,
    totalItemCount
  } = useCompoundItem(id != null ? id : idGenerator, itemMetadata);
  const {
    getRootProps: getButtonProps,
    focusVisible,
    rootRef: buttonRefHandler
  } = useButton({
    disabled,
    focusableWhenDisabled: true
  });
  const handleRef = useForkRef(listItemRefHandler, buttonRefHandler, externalRef, itemRef);
  React34.useDebugValue({
    id,
    highlighted,
    disabled,
    label
  });
  if (id === void 0) {
    return {
      getRootProps: (otherHandlers = {}) => _extends({}, otherHandlers, getButtonProps(otherHandlers), {
        role: "menuitem"
      }),
      disabled: false,
      focusVisible,
      highlighted: false,
      index: -1,
      totalItemCount: 0,
      rootRef: handleRef
    };
  }
  const getRootProps = (otherHandlers = {}) => {
    const resolvedButtonProps = _extends({}, otherHandlers, getButtonProps(otherHandlers));
    const resolvedMenuItemProps = _extends({}, resolvedButtonProps, getListRootProps(resolvedButtonProps));
    return _extends({}, otherHandlers, resolvedButtonProps, resolvedMenuItemProps, {
      role: "menuitem",
      ref: handleRef
    });
  };
  return {
    getRootProps,
    disabled,
    focusVisible,
    highlighted,
    index,
    totalItemCount,
    rootRef: handleRef
  };
}
var React34;
var init_useMenuItem = __esm({
  "node_modules/@mui/base/useMenuItem/useMenuItem.js"() {
    init_extends();
    React34 = __toESM(require_react());
    init_esm();
    init_useButton2();
    init_useList2();
    init_useCompoundItem();
  }
});

// node_modules/@mui/base/useMenuItem/useMenuItem.types.js
var init_useMenuItem_types = __esm({
  "node_modules/@mui/base/useMenuItem/useMenuItem.types.js"() {
  }
});

// node_modules/@mui/base/useMenuItem/index.js
var init_useMenuItem2 = __esm({
  "node_modules/@mui/base/useMenuItem/index.js"() {
    init_useMenuItem();
    init_useMenuItem_types();
  }
});

// node_modules/@mui/base/MenuItem/MenuItem.js
function useUtilityClasses8(ownerState) {
  const {
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  return composeClasses(slots, useClassNamesOverride(getMenuItemUtilityClass));
}
var React35, import_prop_types13, import_jsx_runtime20, _excluded10, MenuItem;
var init_MenuItem = __esm({
  "node_modules/@mui/base/MenuItem/MenuItem.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React35 = __toESM(require_react());
    import_prop_types13 = __toESM(require_prop_types());
    init_menuItemClasses();
    init_useMenuItem2();
    init_composeClasses();
    init_useSlotProps();
    init_ClassNameConfigurator();
    import_jsx_runtime20 = __toESM(require_jsx_runtime());
    _excluded10 = ["children", "disabled", "label", "slotProps", "slots"];
    MenuItem = React35.forwardRef(function MenuItem2(props, forwardedRef) {
      var _slots$root;
      const {
        children,
        disabled: disabledProp = false,
        label,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
      const {
        getRootProps,
        disabled,
        focusVisible,
        highlighted
      } = useMenuItem({
        disabled: disabledProp,
        rootRef: forwardedRef,
        label
      });
      const ownerState = _extends({}, props, {
        disabled,
        focusVisible,
        highlighted
      });
      const classes = useUtilityClasses8(ownerState);
      const Root = (_slots$root = slots.root) != null ? _slots$root : "li";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        className: classes.root,
        ownerState
      });
      return (0, import_jsx_runtime20.jsx)(Root, _extends({}, rootProps, {
        children
      }));
    });
    true ? MenuItem.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * @ignore
       */
      children: import_prop_types13.default.node,
      /**
       * @ignore
       */
      disabled: import_prop_types13.default.bool,
      /**
       * A text representation of the menu item's content.
       * Used for keyboard text navigation matching.
       */
      label: import_prop_types13.default.string,
      /**
       * The props used for each slot inside the MenuItem.
       * @default {}
       */
      slotProps: import_prop_types13.default.shape({
        root: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object])
      }),
      /**
       * The components used for each slot inside the MenuItem.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types13.default.shape({
        root: import_prop_types13.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/MenuItem/MenuItem.types.js
var init_MenuItem_types = __esm({
  "node_modules/@mui/base/MenuItem/MenuItem.types.js"() {
  }
});

// node_modules/@mui/base/MenuItem/index.js
var init_MenuItem2 = __esm({
  "node_modules/@mui/base/MenuItem/index.js"() {
    init_MenuItem();
    init_MenuItem_types();
    init_menuItemClasses();
    init_menuItemClasses();
  }
});

// node_modules/@mui/base/OptionGroup/optionGroupClasses.js
function getOptionGroupUtilityClass(slot) {
  return generateUtilityClass("MuiOptionGroup", slot);
}
var optionGroupClasses;
var init_optionGroupClasses = __esm({
  "node_modules/@mui/base/OptionGroup/optionGroupClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    optionGroupClasses = generateUtilityClasses("MuiOptionGroup", ["root", "disabled", "label", "list"]);
  }
});

// node_modules/@mui/base/OptionGroup/OptionGroup.js
function useUtilityClasses9(disabled) {
  const slots = {
    root: ["root", disabled && "disabled"],
    label: ["label"],
    list: ["list"]
  };
  return composeClasses(slots, useClassNamesOverride(getOptionGroupUtilityClass));
}
var React36, import_prop_types14, import_jsx_runtime21, import_jsx_runtime22, _excluded11, OptionGroup;
var init_OptionGroup = __esm({
  "node_modules/@mui/base/OptionGroup/OptionGroup.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React36 = __toESM(require_react());
    import_prop_types14 = __toESM(require_prop_types());
    init_composeClasses();
    init_optionGroupClasses();
    init_utils();
    init_ClassNameConfigurator();
    import_jsx_runtime21 = __toESM(require_jsx_runtime());
    import_jsx_runtime22 = __toESM(require_jsx_runtime());
    _excluded11 = ["disabled", "slotProps", "slots"];
    OptionGroup = React36.forwardRef(function OptionGroup2(props, forwardedRef) {
      const {
        disabled = false,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded11);
      const Root = (slots == null ? void 0 : slots.root) || "li";
      const Label = (slots == null ? void 0 : slots.label) || "span";
      const List = (slots == null ? void 0 : slots.list) || "ul";
      const classes = useUtilityClasses9(disabled);
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState: props,
        className: classes.root
      });
      const labelProps = useSlotProps({
        elementType: Label,
        externalSlotProps: slotProps.label,
        ownerState: props,
        className: classes.label
      });
      const listProps = useSlotProps({
        elementType: List,
        externalSlotProps: slotProps.list,
        ownerState: props,
        className: classes.list
      });
      return (0, import_jsx_runtime22.jsxs)(Root, _extends({}, rootProps, {
        children: [(0, import_jsx_runtime21.jsx)(Label, _extends({}, labelProps, {
          children: props.label
        })), (0, import_jsx_runtime21.jsx)(List, _extends({}, listProps, {
          children: props.children
        }))]
      }));
    });
    true ? OptionGroup.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * @ignore
       */
      children: import_prop_types14.default.node,
      /**
       * If `true` all the options in the group will be disabled.
       * @default false
       */
      disabled: import_prop_types14.default.bool,
      /**
       * The human-readable description of the group.
       */
      label: import_prop_types14.default.node,
      /**
       * The props used for each slot inside the Input.
       * @default {}
       */
      slotProps: import_prop_types14.default.shape({
        label: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object]),
        list: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object]),
        root: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.object])
      }),
      /**
       * The components used for each slot inside the OptionGroup.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types14.default.shape({
        label: import_prop_types14.default.elementType,
        list: import_prop_types14.default.elementType,
        root: import_prop_types14.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/OptionGroup/OptionGroup.types.js
var init_OptionGroup_types = __esm({
  "node_modules/@mui/base/OptionGroup/OptionGroup.types.js"() {
  }
});

// node_modules/@mui/base/OptionGroup/index.js
var init_OptionGroup2 = __esm({
  "node_modules/@mui/base/OptionGroup/index.js"() {
    init_OptionGroup();
    init_OptionGroup_types();
    init_optionGroupClasses();
    init_optionGroupClasses();
  }
});

// node_modules/@mui/base/Option/optionClasses.js
function getOptionUtilityClass(slot) {
  return generateUtilityClass("MuiOption", slot);
}
var optionClasses;
var init_optionClasses = __esm({
  "node_modules/@mui/base/Option/optionClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    optionClasses = generateUtilityClasses("MuiOption", ["root", "disabled", "selected", "highlighted"]);
  }
});

// node_modules/@mui/base/useOption/useOption.js
function useOption(params) {
  const {
    value,
    label,
    disabled,
    rootRef: optionRefParam,
    id: idParam
  } = params;
  const {
    getRootProps: getListItemProps,
    rootRef: listItemRefHandler,
    highlighted,
    selected
  } = useListItem({
    item: value
  });
  const id = useId(idParam);
  const optionRef = React37.useRef(null);
  const selectOption = React37.useMemo(() => ({
    disabled,
    label,
    value,
    ref: optionRef,
    id
  }), [disabled, label, value, id]);
  const {
    index
  } = useCompoundItem(value, selectOption);
  const handleRef = useForkRef(optionRefParam, optionRef, listItemRefHandler);
  return {
    getRootProps: (otherHandlers = {}) => _extends({}, otherHandlers, getListItemProps(otherHandlers), {
      id,
      ref: handleRef,
      role: "option",
      "aria-selected": selected
    }),
    highlighted,
    index,
    selected,
    rootRef: handleRef
  };
}
var React37;
var init_useOption = __esm({
  "node_modules/@mui/base/useOption/useOption.js"() {
    init_extends();
    React37 = __toESM(require_react());
    init_esm();
    init_useList2();
    init_useCompoundItem();
  }
});

// node_modules/@mui/base/useOption/useOption.types.js
var init_useOption_types = __esm({
  "node_modules/@mui/base/useOption/useOption.types.js"() {
  }
});

// node_modules/@mui/base/useOption/index.js
var init_useOption2 = __esm({
  "node_modules/@mui/base/useOption/index.js"() {
    init_useOption();
    init_useOption_types();
  }
});

// node_modules/@mui/base/Option/Option.js
function useUtilityClasses10(ownerState) {
  const {
    disabled,
    highlighted,
    selected
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", highlighted && "highlighted", selected && "selected"]
  };
  return composeClasses(slots, useClassNamesOverride(getOptionUtilityClass));
}
var React38, import_prop_types15, import_jsx_runtime23, _excluded12, Option, Option_default;
var init_Option = __esm({
  "node_modules/@mui/base/Option/Option.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React38 = __toESM(require_react());
    import_prop_types15 = __toESM(require_prop_types());
    init_esm();
    init_composeClasses();
    init_optionClasses();
    init_utils();
    init_useOption2();
    init_ClassNameConfigurator();
    import_jsx_runtime23 = __toESM(require_jsx_runtime());
    _excluded12 = ["children", "disabled", "label", "slotProps", "slots", "value"];
    Option = React38.forwardRef(function Option2(props, forwardedRef) {
      var _slots$root, _optionRef$current;
      const {
        children,
        disabled = false,
        label,
        slotProps = {},
        slots = {},
        value
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded12);
      const Root = (_slots$root = slots.root) != null ? _slots$root : "li";
      const optionRef = React38.useRef(null);
      const combinedRef = useForkRef(optionRef, forwardedRef);
      const computedLabel = label != null ? label : typeof children === "string" ? children : (_optionRef$current = optionRef.current) == null ? void 0 : _optionRef$current.innerText;
      const {
        getRootProps,
        selected,
        highlighted,
        index
      } = useOption({
        disabled,
        label: computedLabel,
        rootRef: combinedRef,
        value
      });
      const ownerState = _extends({}, props, {
        disabled,
        highlighted,
        index,
        selected
      });
      const classes = useUtilityClasses10(ownerState);
      const rootProps = useSlotProps({
        getSlotProps: getRootProps,
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        className: classes.root,
        ownerState
      });
      return (0, import_jsx_runtime23.jsx)(Root, _extends({}, rootProps, {
        children
      }));
    });
    true ? Option.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * @ignore
       */
      children: import_prop_types15.default.node,
      /**
       * If `true`, the option will be disabled.
       * @default false
       */
      disabled: import_prop_types15.default.bool,
      /**
       * A text representation of the option's content.
       * Used for keyboard text navigation matching.
       */
      label: import_prop_types15.default.string,
      /**
       * The props used for each slot inside the Option.
       * @default {}
       */
      slotProps: import_prop_types15.default.shape({
        root: import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object])
      }),
      /**
       * The components used for each slot inside the Option.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types15.default.shape({
        root: import_prop_types15.default.elementType
      }),
      /**
       * The value of the option.
       */
      value: import_prop_types15.default.any.isRequired
    } : void 0;
    Option_default = React38.memo(Option);
  }
});

// node_modules/@mui/base/Option/Option.types.js
var init_Option_types = __esm({
  "node_modules/@mui/base/Option/Option.types.js"() {
  }
});

// node_modules/@mui/base/Option/index.js
var init_Option2 = __esm({
  "node_modules/@mui/base/Option/index.js"() {
    init_Option();
    init_Option_types();
    init_optionClasses();
    init_optionClasses();
  }
});

// node_modules/@mui/base/useSelect/useSelect.types.js
var SelectActionTypes;
var init_useSelect_types = __esm({
  "node_modules/@mui/base/useSelect/useSelect.types.js"() {
    SelectActionTypes = {
      buttonClick: "buttonClick"
    };
  }
});

// node_modules/@mui/base/useSelect/defaultOptionStringifier.js
var defaultOptionStringifier, defaultOptionStringifier_default;
var init_defaultOptionStringifier = __esm({
  "node_modules/@mui/base/useSelect/defaultOptionStringifier.js"() {
    defaultOptionStringifier = (option) => {
      const {
        label,
        value
      } = option;
      if (typeof label === "string") {
        return label;
      }
      if (typeof value === "string") {
        return value;
      }
      return String(option);
    };
    defaultOptionStringifier_default = defaultOptionStringifier;
  }
});

// node_modules/@mui/base/useSelect/selectReducer.js
function selectReducer(state, action) {
  const {
    open
  } = state;
  const {
    context: {
      selectionMode
    }
  } = action;
  if (action.type === SelectActionTypes.buttonClick) {
    var _state$selectedValues;
    const itemToHighlight = (_state$selectedValues = state.selectedValues[0]) != null ? _state$selectedValues : moveHighlight(null, "start", action.context);
    return _extends({}, state, {
      open: !open,
      highlightedValue: !open ? itemToHighlight : null
    });
  }
  const newState = listReducer(state, action);
  switch (action.type) {
    case ListActionTypes.keyDown:
      if (state.open) {
        if (action.event.key === "Escape") {
          return _extends({}, newState, {
            open: false
          });
        }
        if (selectionMode === "single" && (action.event.key === "Enter" || action.event.key === " ")) {
          return _extends({}, newState, {
            open: false
          });
        }
      } else {
        if (action.event.key === "Enter" || action.event.key === " " || action.event.key === "ArrowDown") {
          var _state$selectedValues2;
          return _extends({}, state, {
            open: true,
            highlightedValue: (_state$selectedValues2 = state.selectedValues[0]) != null ? _state$selectedValues2 : moveHighlight(null, "start", action.context)
          });
        }
        if (action.event.key === "ArrowUp") {
          var _state$selectedValues3;
          return _extends({}, state, {
            open: true,
            highlightedValue: (_state$selectedValues3 = state.selectedValues[0]) != null ? _state$selectedValues3 : moveHighlight(null, "end", action.context)
          });
        }
      }
      break;
    case ListActionTypes.itemClick:
      if (selectionMode === "single") {
        return _extends({}, newState, {
          open: false
        });
      }
      break;
    case ListActionTypes.blur:
      return _extends({}, newState, {
        open: false
      });
    default:
      return newState;
  }
  return newState;
}
var init_selectReducer = __esm({
  "node_modules/@mui/base/useSelect/selectReducer.js"() {
    init_extends();
    init_useList2();
    init_useSelect_types();
  }
});

// node_modules/@mui/base/utils/combineHooksSlotProps.js
function combineHooksSlotProps(getFirstProps, getSecondProps) {
  return (external) => {
    const firstResult = _extends({}, external, getFirstProps(external));
    const result = _extends({}, firstResult, getSecondProps(firstResult));
    return result;
  };
}
var init_combineHooksSlotProps = __esm({
  "node_modules/@mui/base/utils/combineHooksSlotProps.js"() {
    init_extends();
  }
});

// node_modules/@mui/base/useSelect/useSelect.js
function preventDefault(event) {
  event.preventDefault();
}
function useSelect(props) {
  const {
    areOptionsEqual,
    buttonRef: buttonRefProp,
    defaultOpen = false,
    defaultValue: defaultValueProp,
    disabled = false,
    listboxId: listboxIdProp,
    listboxRef: listboxRefProp,
    multiple = false,
    onChange,
    onHighlightChange,
    onOpenChange,
    open: openProp,
    options: optionsParam,
    getOptionAsString = defaultOptionStringifier_default,
    value: valueProp
  } = props;
  const buttonRef = React39.useRef(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);
  const listboxRef = React39.useRef(null);
  const listboxId = useId(listboxIdProp);
  let defaultValue;
  if (valueProp === void 0 && defaultValueProp === void 0) {
    defaultValue = [];
  } else if (defaultValueProp !== void 0) {
    if (multiple) {
      defaultValue = defaultValueProp;
    } else {
      defaultValue = defaultValueProp == null ? [] : [defaultValueProp];
    }
  }
  const value = React39.useMemo(() => {
    if (valueProp !== void 0) {
      if (multiple) {
        return valueProp;
      }
      return valueProp == null ? [] : [valueProp];
    }
    return void 0;
  }, [valueProp, multiple]);
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const options = React39.useMemo(() => {
    if (optionsParam != null) {
      return new Map(optionsParam.map((option, index) => [option.value, {
        value: option.value,
        label: option.label,
        disabled: option.disabled,
        ref: React39.createRef(),
        id: `${listboxId}_${index}`
      }]));
    }
    return subitems;
  }, [optionsParam, subitems, listboxId]);
  const handleListboxRef = useForkRef(listboxRefProp, listboxRef);
  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible,
    rootRef: mergedButtonRef
  } = useButton({
    disabled,
    rootRef: handleButtonRef
  });
  const optionValues = React39.useMemo(() => Array.from(options.keys()), [options]);
  const getOptionByValue = React39.useCallback((valueToGet) => {
    if (areOptionsEqual !== void 0) {
      const similarValue = optionValues.find((optionValue) => areOptionsEqual(optionValue, valueToGet));
      return options.get(similarValue);
    }
    return options.get(valueToGet);
  }, [options, areOptionsEqual, optionValues]);
  const isItemDisabled = React39.useCallback((valueToCheck) => {
    var _option$disabled;
    const option = getOptionByValue(valueToCheck);
    return (_option$disabled = option == null ? void 0 : option.disabled) != null ? _option$disabled : false;
  }, [getOptionByValue]);
  const stringifyOption = React39.useCallback((valueToCheck) => {
    const option = getOptionByValue(valueToCheck);
    if (!option) {
      return "";
    }
    return getOptionAsString(option);
  }, [getOptionByValue, getOptionAsString]);
  const controlledState = React39.useMemo(() => ({
    selectedValues: value,
    open: openProp
  }), [value, openProp]);
  const getItemId = React39.useCallback((itemValue) => {
    var _options$get;
    return (_options$get = options.get(itemValue)) == null ? void 0 : _options$get.id;
  }, [options]);
  const handleSelectionChange = React39.useCallback((event, newValues) => {
    if (multiple) {
      onChange == null ? void 0 : onChange(event, newValues);
    } else {
      var _newValues$;
      onChange == null ? void 0 : onChange(event, (_newValues$ = newValues[0]) != null ? _newValues$ : null);
    }
  }, [multiple, onChange]);
  const handleHighlightChange = React39.useCallback((event, newValue) => {
    onHighlightChange == null ? void 0 : onHighlightChange(event, newValue != null ? newValue : null);
  }, [onHighlightChange]);
  const handleStateChange = React39.useCallback((event, field, fieldValue) => {
    if (field === "open") {
      onOpenChange == null ? void 0 : onOpenChange(fieldValue);
      if (fieldValue === false && (event == null ? void 0 : event.type) !== "blur") {
        var _buttonRef$current;
        (_buttonRef$current = buttonRef.current) == null ? void 0 : _buttonRef$current.focus();
      }
    }
  }, [onOpenChange]);
  const useListParameters = {
    getInitialState: () => {
      var _defaultValue;
      return {
        highlightedValue: null,
        selectedValues: (_defaultValue = defaultValue) != null ? _defaultValue : [],
        open: defaultOpen
      };
    },
    getItemId,
    controlledProps: controlledState,
    itemComparer: areOptionsEqual,
    isItemDisabled,
    rootRef: mergedButtonRef,
    onChange: handleSelectionChange,
    onHighlightChange: handleHighlightChange,
    onStateChange: handleStateChange,
    reducerActionContext: React39.useMemo(() => ({
      multiple
    }), [multiple]),
    items: optionValues,
    getItemAsString: stringifyOption,
    selectionMode: multiple ? "multiple" : "single",
    stateReducer: selectReducer
  };
  const {
    dispatch,
    getRootProps: getListboxRootProps,
    contextValue: listContextValue,
    state: {
      open,
      highlightedValue: highlightedOption,
      selectedValues: selectedOptions
    },
    rootRef: mergedListRootRef
  } = useList_default(useListParameters);
  const createHandleButtonClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    otherHandlers == null ? void 0 : (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
    if (!event.defaultMuiPrevented) {
      const action = {
        type: SelectActionTypes.buttonClick,
        event
      };
      dispatch(action);
    }
  };
  useEnhancedEffect_default(() => {
    if (highlightedOption != null) {
      var _getOptionByValue;
      const optionRef = (_getOptionByValue = getOptionByValue(highlightedOption)) == null ? void 0 : _getOptionByValue.ref;
      if (!listboxRef.current || !(optionRef != null && optionRef.current)) {
        return;
      }
      const listboxClientRect = listboxRef.current.getBoundingClientRect();
      const optionClientRect = optionRef.current.getBoundingClientRect();
      if (optionClientRect.top < listboxClientRect.top) {
        listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
      } else if (optionClientRect.bottom > listboxClientRect.bottom) {
        listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
      }
    }
  }, [highlightedOption, getOptionByValue]);
  const getOptionMetadata = React39.useCallback((optionValue) => getOptionByValue(optionValue), [getOptionByValue]);
  const getSelectTriggerProps = (otherHandlers = {}) => {
    return _extends({}, otherHandlers, {
      onClick: createHandleButtonClick(otherHandlers),
      ref: mergedListRootRef,
      role: "combobox",
      "aria-expanded": open,
      "aria-controls": listboxId
    });
  };
  const getButtonProps = (otherHandlers = {}) => {
    const listboxAndButtonProps = combineHooksSlotProps(getButtonRootProps, getListboxRootProps);
    const combinedProps = combineHooksSlotProps(listboxAndButtonProps, getSelectTriggerProps);
    return combinedProps(otherHandlers);
  };
  const getListboxProps = (otherHandlers = {}) => {
    return _extends({}, otherHandlers, {
      id: listboxId,
      role: "listbox",
      "aria-multiselectable": multiple ? "true" : void 0,
      ref: handleListboxRef,
      onMouseDown: preventDefault
      // to prevent the button from losing focus when interacting with the listbox
    });
  };
  React39.useDebugValue({
    selectedOptions,
    highlightedOption,
    open
  });
  const contextValue = React39.useMemo(() => _extends({}, listContextValue, compoundComponentContextValue), [listContextValue, compoundComponentContextValue]);
  let selectValue;
  if (props.multiple) {
    selectValue = selectedOptions;
  } else {
    selectValue = selectedOptions.length > 0 ? selectedOptions[0] : null;
  }
  return {
    buttonActive,
    buttonFocusVisible,
    buttonRef: mergedButtonRef,
    contextValue,
    disabled,
    dispatch,
    getButtonProps,
    getListboxProps,
    getOptionMetadata,
    listboxRef: mergedListRootRef,
    open,
    options: optionValues,
    value: selectValue,
    highlightedOption
  };
}
var React39, useSelect_default;
var init_useSelect = __esm({
  "node_modules/@mui/base/useSelect/useSelect.js"() {
    init_extends();
    React39 = __toESM(require_react());
    init_esm();
    init_useButton2();
    init_useSelect_types();
    init_useList2();
    init_defaultOptionStringifier();
    init_useCompound();
    init_selectReducer();
    init_combineHooksSlotProps();
    useSelect_default = useSelect;
  }
});

// node_modules/@mui/base/useSelect/SelectProvider.js
function SelectProvider(props) {
  const {
    value,
    children
  } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
    registerItem,
    totalSubitemCount
  } = value;
  const listContextValue = React40.useMemo(() => ({
    dispatch,
    getItemState,
    getItemIndex,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  }), [dispatch, getItemIndex, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler]);
  const compoundComponentContextValue = React40.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  return (0, import_jsx_runtime24.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime24.jsx)(ListContext.Provider, {
      value: listContextValue,
      children
    })
  });
}
var React40, import_jsx_runtime24;
var init_SelectProvider = __esm({
  "node_modules/@mui/base/useSelect/SelectProvider.js"() {
    React40 = __toESM(require_react());
    init_ListContext();
    init_useCompound();
    import_jsx_runtime24 = __toESM(require_jsx_runtime());
  }
});

// node_modules/@mui/base/useSelect/index.js
var init_useSelect2 = __esm({
  "node_modules/@mui/base/useSelect/index.js"() {
    init_useSelect();
    init_useSelect_types();
    init_SelectProvider();
    init_SelectProvider();
  }
});

// node_modules/@mui/base/Select/selectClasses.js
function getSelectUtilityClass(slot) {
  return generateUtilityClass("MuiSelect", slot);
}
var selectClasses;
var init_selectClasses = __esm({
  "node_modules/@mui/base/Select/selectClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    selectClasses = generateUtilityClasses("MuiSelect", ["root", "button", "listbox", "popper", "active", "expanded", "disabled", "focusVisible"]);
  }
});

// node_modules/@mui/base/Select/Select.js
function defaultRenderValue(selectedOptions) {
  var _selectedOptions$labe;
  if (Array.isArray(selectedOptions)) {
    return (0, import_jsx_runtime25.jsx)(React41.Fragment, {
      children: selectedOptions.map((o) => o.label).join(", ")
    });
  }
  return (_selectedOptions$labe = selectedOptions == null ? void 0 : selectedOptions.label) != null ? _selectedOptions$labe : "";
}
function defaultFormValueProvider(selectedOption) {
  if (Array.isArray(selectedOption)) {
    if (selectedOption.length === 0) {
      return "";
    }
    if (selectedOption.every((o) => typeof o.value === "string" || typeof o.value === "number" || typeof o.value === "boolean")) {
      return selectedOption.map((o) => String(o.value));
    }
    return JSON.stringify(selectedOption.map((o) => o.value));
  }
  if ((selectedOption == null ? void 0 : selectedOption.value) == null) {
    return "";
  }
  if (typeof selectedOption.value === "string" || typeof selectedOption.value === "number") {
    return selectedOption.value;
  }
  return JSON.stringify(selectedOption.value);
}
function useUtilityClasses11(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active", open && "expanded"],
    listbox: ["listbox", disabled && "disabled"],
    popper: ["popper"]
  };
  return composeClasses(slots, useClassNamesOverride(getSelectUtilityClass));
}
var React41, import_prop_types16, import_jsx_runtime25, import_jsx_runtime26, _excluded13, Select;
var init_Select = __esm({
  "node_modules/@mui/base/Select/Select.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React41 = __toESM(require_react());
    import_prop_types16 = __toESM(require_prop_types());
    init_esm();
    init_useSelect2();
    init_utils();
    init_Popper2();
    init_composeClasses();
    init_selectClasses();
    init_defaultOptionStringifier();
    init_ClassNameConfigurator();
    init_SelectProvider();
    import_jsx_runtime25 = __toESM(require_jsx_runtime());
    import_jsx_runtime26 = __toESM(require_jsx_runtime());
    _excluded13 = ["areOptionsEqual", "autoFocus", "children", "defaultValue", "defaultListboxOpen", "disabled", "getSerializedValue", "listboxId", "listboxOpen", "multiple", "name", "onChange", "onListboxOpenChange", "getOptionAsString", "renderValue", "slotProps", "slots", "value"];
    Select = React41.forwardRef(function Select2(props, forwardedRef) {
      var _slots$root, _slots$listbox, _slots$popper;
      const {
        areOptionsEqual,
        autoFocus,
        children,
        defaultValue,
        defaultListboxOpen = false,
        disabled: disabledProp,
        getSerializedValue = defaultFormValueProvider,
        listboxId,
        listboxOpen: listboxOpenProp,
        multiple = false,
        name,
        onChange,
        onListboxOpenChange,
        getOptionAsString = defaultOptionStringifier_default,
        renderValue: renderValueProp,
        slotProps = {},
        slots = {},
        value: valueProp
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded13);
      const renderValue = renderValueProp != null ? renderValueProp : defaultRenderValue;
      const [buttonDefined, setButtonDefined] = React41.useState(false);
      const buttonRef = React41.useRef(null);
      const listboxRef = React41.useRef(null);
      const Button3 = (_slots$root = slots.root) != null ? _slots$root : "button";
      const ListboxRoot = (_slots$listbox = slots.listbox) != null ? _slots$listbox : "ul";
      const PopperComponent = (_slots$popper = slots.popper) != null ? _slots$popper : Popper_default;
      const handleButtonRefChange = React41.useCallback((element) => {
        setButtonDefined(element != null);
      }, []);
      const handleButtonRef = useForkRef(forwardedRef, buttonRef, handleButtonRefChange);
      React41.useEffect(() => {
        if (autoFocus) {
          buttonRef.current.focus();
        }
      }, [autoFocus]);
      const {
        buttonActive,
        buttonFocusVisible,
        contextValue,
        disabled,
        getButtonProps,
        getListboxProps,
        getOptionMetadata,
        value,
        open
      } = useSelect_default({
        areOptionsEqual,
        buttonRef: handleButtonRef,
        defaultOpen: defaultListboxOpen,
        defaultValue,
        disabled: disabledProp,
        listboxId,
        multiple,
        open: listboxOpenProp,
        onChange,
        onOpenChange: onListboxOpenChange,
        getOptionAsString,
        value: valueProp
      });
      const ownerState = _extends({}, props, {
        active: buttonActive,
        defaultListboxOpen,
        disabled,
        focusVisible: buttonFocusVisible,
        open,
        multiple,
        renderValue,
        value
      });
      const classes = useUtilityClasses11(ownerState);
      const buttonProps = useSlotProps({
        elementType: Button3,
        getSlotProps: getButtonProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        ownerState,
        className: classes.root
      });
      const listboxProps = useSlotProps({
        elementType: ListboxRoot,
        getSlotProps: getListboxProps,
        externalSlotProps: slotProps.listbox,
        additionalProps: {
          ref: listboxRef
        },
        ownerState,
        className: classes.listbox
      });
      const popperProps = useSlotProps({
        elementType: PopperComponent,
        externalSlotProps: slotProps.popper,
        additionalProps: {
          anchorEl: buttonRef.current,
          keepMounted: true,
          open,
          placement: "bottom-start",
          role: void 0
        },
        ownerState,
        className: classes.popper
      });
      let selectedOptionsMetadata;
      if (multiple) {
        selectedOptionsMetadata = value.map((v) => getOptionMetadata(v)).filter((o) => o !== void 0);
      } else {
        var _getOptionMetadata;
        selectedOptionsMetadata = (_getOptionMetadata = getOptionMetadata(value)) != null ? _getOptionMetadata : null;
      }
      return (0, import_jsx_runtime26.jsxs)(React41.Fragment, {
        children: [(0, import_jsx_runtime25.jsx)(Button3, _extends({}, buttonProps, {
          children: renderValue(selectedOptionsMetadata)
        })), buttonDefined && (0, import_jsx_runtime25.jsx)(PopperComponent, _extends({}, popperProps, {
          children: (0, import_jsx_runtime25.jsx)(ListboxRoot, _extends({}, listboxProps, {
            children: (0, import_jsx_runtime25.jsx)(SelectProvider, {
              value: contextValue,
              children
            })
          }))
        })), name && (0, import_jsx_runtime25.jsx)("input", {
          type: "hidden",
          name,
          value: getSerializedValue(selectedOptionsMetadata)
        })]
      });
    });
    true ? Select.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * A function used to determine if two options' values are equal.
       * By default, reference equality is used.
       *
       * There is a performance impact when using the `areOptionsEqual` prop (proportional to the number of options).
       * Therefore, it's recommented to use the default reference equality comparison whenever possible.
       */
      areOptionsEqual: import_prop_types16.default.func,
      /**
       * If `true`, the select element is focused during the first mount
       * @default false
       */
      autoFocus: import_prop_types16.default.bool,
      /**
       * @ignore
       */
      children: import_prop_types16.default.node,
      /**
       * If `true`, the select will be initially open.
       * @default false
       */
      defaultListboxOpen: import_prop_types16.default.bool,
      /**
       * The default selected value. Use when the component is not controlled.
       */
      defaultValue: import_prop_types16.default.any,
      /**
       * If `true`, the select is disabled.
       * @default false
       */
      disabled: import_prop_types16.default.bool,
      /**
       * A function used to convert the option label to a string.
       * It's useful when labels are elements and need to be converted to plain text
       * to enable navigation using character keys on a keyboard.
       *
       * @default defaultOptionStringifier
       */
      getOptionAsString: import_prop_types16.default.func,
      /**
       * A function to convert the currently selected value to a string.
       * Used to set a value of a hidden input associated with the select,
       * so that the selected value can be posted with a form.
       */
      getSerializedValue: import_prop_types16.default.func,
      /**
       * `id` attribute of the listbox element.
       */
      listboxId: import_prop_types16.default.string,
      /**
       * Controls the open state of the select's listbox.
       * @default undefined
       */
      listboxOpen: import_prop_types16.default.bool,
      /**
       * If `true`, selecting multiple values is allowed.
       * This affects the type of the `value`, `defaultValue`, and `onChange` props.
       *
       * @default false
       */
      multiple: import_prop_types16.default.bool,
      /**
       * Name of the element. For example used by the server to identify the fields in form submits.
       * If the name is provided, the component will render a hidden input element that can be submitted to a server.
       */
      name: import_prop_types16.default.string,
      /**
       * Callback fired when an option is selected.
       */
      onChange: import_prop_types16.default.func,
      /**
       * Callback fired when the component requests to be opened.
       * Use in controlled mode (see listboxOpen).
       */
      onListboxOpenChange: import_prop_types16.default.func,
      /**
       * Function that customizes the rendering of the selected value.
       */
      renderValue: import_prop_types16.default.func,
      /**
       * The props used for each slot inside the Input.
       * @default {}
       */
      slotProps: import_prop_types16.default.shape({
        listbox: import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object]),
        popper: import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object]),
        root: import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object])
      }),
      /**
       * The components used for each slot inside the Select.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types16.default.shape({
        listbox: import_prop_types16.default.elementType,
        popper: import_prop_types16.default.elementType,
        root: import_prop_types16.default.elementType
      }),
      /**
       * The selected value.
       * Set to `null` to deselect all options.
       */
      value: import_prop_types16.default.any
    } : void 0;
  }
});

// node_modules/@mui/base/Select/Select.types.js
var init_Select_types = __esm({
  "node_modules/@mui/base/Select/Select.types.js"() {
  }
});

// node_modules/@mui/base/Select/index.js
var init_Select2 = __esm({
  "node_modules/@mui/base/Select/index.js"() {
    init_Select();
    init_selectClasses();
    init_selectClasses();
    init_Select_types();
  }
});

// node_modules/@mui/base/Slider/sliderClasses.js
function getSliderUtilityClass(slot) {
  return generateUtilityClass("MuiSlider", slot);
}
var sliderClasses;
var init_sliderClasses = __esm({
  "node_modules/@mui/base/Slider/sliderClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    sliderClasses = generateUtilityClasses("MuiSlider", ["root", "active", "focusVisible", "disabled", "dragging", "marked", "vertical", "trackInverted", "trackFalse", "rail", "track", "mark", "markActive", "markLabel", "markLabelActive", "thumb"]);
  }
});

// node_modules/@mui/base/Slider/Slider.js
function Identity2(x) {
  return x;
}
var React42, import_prop_types17, import_jsx_runtime27, import_jsx_runtime28, _excluded14, useUtilityClasses12, Slider;
var init_Slider = __esm({
  "node_modules/@mui/base/Slider/Slider.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React42 = __toESM(require_react());
    import_prop_types17 = __toESM(require_prop_types());
    init_clsx_m();
    init_esm();
    init_isHostComponent();
    init_composeClasses();
    init_sliderClasses();
    init_useSlider2();
    init_useSlotProps();
    init_ClassNameConfigurator();
    import_jsx_runtime27 = __toESM(require_jsx_runtime());
    import_jsx_runtime28 = __toESM(require_jsx_runtime());
    _excluded14 = ["aria-label", "aria-valuetext", "aria-labelledby", "className", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "orientation", "scale", "step", "tabIndex", "track", "value", "valueLabelFormat", "isRtl", "defaultValue", "slotProps", "slots"];
    useUtilityClasses12 = (ownerState) => {
      const {
        disabled,
        dragging,
        marked,
        orientation,
        track
      } = ownerState;
      const slots = {
        root: ["root", disabled && "disabled", dragging && "dragging", marked && "marked", orientation === "vertical" && "vertical", track === "inverted" && "trackInverted", track === false && "trackFalse"],
        rail: ["rail"],
        track: ["track"],
        mark: ["mark"],
        markActive: ["markActive"],
        markLabel: ["markLabel"],
        markLabelActive: ["markLabelActive"],
        valueLabel: ["valueLabel"],
        thumb: ["thumb", disabled && "disabled"],
        active: ["active"],
        disabled: ["disabled"],
        focusVisible: ["focusVisible"]
      };
      return composeClasses(slots, useClassNamesOverride(getSliderUtilityClass));
    };
    Slider = React42.forwardRef(function Slider2(props, forwardedRef) {
      var _slots$root, _slots$rail, _slots$track, _slots$thumb, _slots$mark, _slots$markLabel;
      const {
        "aria-label": ariaLabel,
        "aria-valuetext": ariaValuetext,
        "aria-labelledby": ariaLabelledby,
        className,
        disableSwap = false,
        disabled = false,
        getAriaLabel,
        getAriaValueText,
        marks: marksProp = false,
        max = 100,
        min = 0,
        orientation = "horizontal",
        scale = Identity2,
        step = 1,
        track = "normal",
        valueLabelFormat = Identity2,
        isRtl = false,
        defaultValue,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded14);
      const partialOwnerState = _extends({}, props, {
        marks: marksProp,
        disabled,
        isRtl,
        defaultValue,
        max,
        min,
        orientation,
        scale,
        step,
        track,
        valueLabelFormat
      });
      const {
        axisProps: axisProps2,
        getRootProps,
        getHiddenInputProps,
        getThumbProps,
        active,
        axis,
        range,
        focusedThumbIndex,
        dragging,
        marks,
        values,
        trackOffset,
        trackLeap
      } = useSlider(_extends({}, partialOwnerState, {
        rootRef: forwardedRef
      }));
      const ownerState = _extends({}, partialOwnerState, {
        marked: marks.length > 0 && marks.some((mark) => mark.label),
        dragging,
        focusedThumbIndex
      });
      const classes = useUtilityClasses12(ownerState);
      const Root = (_slots$root = slots.root) != null ? _slots$root : "span";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        ownerState,
        className: [classes.root, className]
      });
      const Rail = (_slots$rail = slots.rail) != null ? _slots$rail : "span";
      const railProps = useSlotProps({
        elementType: Rail,
        externalSlotProps: slotProps.rail,
        ownerState,
        className: classes.rail
      });
      const Track = (_slots$track = slots.track) != null ? _slots$track : "span";
      const trackProps = useSlotProps({
        elementType: Track,
        externalSlotProps: slotProps.track,
        additionalProps: {
          style: _extends({}, axisProps2[axis].offset(trackOffset), axisProps2[axis].leap(trackLeap))
        },
        ownerState,
        className: classes.track
      });
      const Thumb = (_slots$thumb = slots.thumb) != null ? _slots$thumb : "span";
      const thumbProps = useSlotProps({
        elementType: Thumb,
        getSlotProps: getThumbProps,
        externalSlotProps: slotProps.thumb,
        ownerState
      });
      const ValueLabel = slots.valueLabel;
      const valueLabelProps = useSlotProps({
        elementType: ValueLabel,
        externalSlotProps: slotProps.valueLabel,
        ownerState
      });
      const Mark = (_slots$mark = slots.mark) != null ? _slots$mark : "span";
      const markProps = useSlotProps({
        elementType: Mark,
        externalSlotProps: slotProps.mark,
        ownerState,
        className: classes.mark
      });
      const MarkLabel = (_slots$markLabel = slots.markLabel) != null ? _slots$markLabel : "span";
      const markLabelProps = useSlotProps({
        elementType: MarkLabel,
        externalSlotProps: slotProps.markLabel,
        ownerState
      });
      const Input3 = slots.input || "input";
      const inputProps = useSlotProps({
        elementType: Input3,
        getSlotProps: getHiddenInputProps,
        externalSlotProps: slotProps.input,
        ownerState
      });
      return (0, import_jsx_runtime28.jsxs)(Root, _extends({}, rootProps, {
        children: [(0, import_jsx_runtime27.jsx)(Rail, _extends({}, railProps)), (0, import_jsx_runtime27.jsx)(Track, _extends({}, trackProps)), marks.filter((mark) => mark.value >= min && mark.value <= max).map((mark, index) => {
          const percent = valueToPercent(mark.value, min, max);
          const style = axisProps2[axis].offset(percent);
          let markActive;
          if (track === false) {
            markActive = values.indexOf(mark.value) !== -1;
          } else {
            markActive = track === "normal" && (range ? mark.value >= values[0] && mark.value <= values[values.length - 1] : mark.value <= values[0]) || track === "inverted" && (range ? mark.value <= values[0] || mark.value >= values[values.length - 1] : mark.value >= values[0]);
          }
          return (0, import_jsx_runtime28.jsxs)(React42.Fragment, {
            children: [(0, import_jsx_runtime27.jsx)(Mark, _extends({
              "data-index": index
            }, markProps, !isHostComponent(Mark) && {
              markActive
            }, {
              style: _extends({}, style, markProps.style),
              className: clsx_m_default(markProps.className, markActive && classes.markActive)
            })), mark.label != null ? (0, import_jsx_runtime27.jsx)(MarkLabel, _extends({
              "aria-hidden": true,
              "data-index": index
            }, markLabelProps, !isHostComponent(MarkLabel) && {
              markLabelActive: markActive
            }, {
              style: _extends({}, style, markLabelProps.style),
              className: clsx_m_default(classes.markLabel, markLabelProps.className, markActive && classes.markLabelActive),
              children: mark.label
            })) : null]
          }, index);
        }), values.map((value, index) => {
          const percent = valueToPercent(value, min, max);
          const style = axisProps2[axis].offset(percent);
          return (0, import_jsx_runtime28.jsxs)(Thumb, _extends({
            "data-index": index
          }, thumbProps, {
            className: clsx_m_default(classes.thumb, thumbProps.className, active === index && classes.active, focusedThumbIndex === index && classes.focusVisible),
            style: _extends({}, style, {
              pointerEvents: disableSwap && active !== index ? "none" : void 0
            }, thumbProps.style),
            children: [(0, import_jsx_runtime27.jsx)(Input3, _extends({
              "data-index": index,
              "aria-label": getAriaLabel ? getAriaLabel(index) : ariaLabel,
              "aria-valuenow": scale(value),
              "aria-labelledby": ariaLabelledby,
              "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext,
              value: values[index]
            }, inputProps)), ValueLabel ? (0, import_jsx_runtime27.jsx)(ValueLabel, _extends({}, !isHostComponent(ValueLabel) && {
              valueLabelFormat,
              index,
              disabled
            }, valueLabelProps, {
              children: typeof valueLabelFormat === "function" ? valueLabelFormat(scale(value), index) : valueLabelFormat
            })) : null]
          }), index);
        })]
      }));
    });
    true ? Slider.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * The label of the slider.
       */
      "aria-label": chainPropTypes(import_prop_types17.default.string, (props) => {
        const range = Array.isArray(props.value || props.defaultValue);
        if (range && props["aria-label"] != null) {
          return new Error("MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.");
        }
        return null;
      }),
      /**
       * The id of the element containing a label for the slider.
       */
      "aria-labelledby": import_prop_types17.default.string,
      /**
       * A string value that provides a user-friendly name for the current value of the slider.
       */
      "aria-valuetext": chainPropTypes(import_prop_types17.default.string, (props) => {
        const range = Array.isArray(props.value || props.defaultValue);
        if (range && props["aria-valuetext"] != null) {
          return new Error("MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.");
        }
        return null;
      }),
      /**
       * The default value. Use when the component is not controlled.
       */
      defaultValue: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.number), import_prop_types17.default.number]),
      /**
       * If `true`, the component is disabled.
       * @default false
       */
      disabled: import_prop_types17.default.bool,
      /**
       * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
       * @default false
       */
      disableSwap: import_prop_types17.default.bool,
      /**
       * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
       * This is important for screen reader users.
       * @param {number} index The thumb label's index to format.
       * @returns {string}
       */
      getAriaLabel: import_prop_types17.default.func,
      /**
       * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
       * This is important for screen reader users.
       * @param {number} value The thumb label's value to format.
       * @param {number} index The thumb label's index to format.
       * @returns {string}
       */
      getAriaValueText: import_prop_types17.default.func,
      /**
       * If `true` the Slider will be rendered right-to-left (with the lowest value on the right-hand side).
       * @default false
       */
      isRtl: import_prop_types17.default.bool,
      /**
       * Marks indicate predetermined values to which the user can move the slider.
       * If `true` the marks are spaced according the value of the `step` prop.
       * If an array, it should contain objects with `value` and an optional `label` keys.
       * @default false
       */
      marks: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.shape({
        label: import_prop_types17.default.node,
        value: import_prop_types17.default.number.isRequired
      })), import_prop_types17.default.bool]),
      /**
       * The maximum allowed value of the slider.
       * Should not be equal to min.
       * @default 100
       */
      max: import_prop_types17.default.number,
      /**
       * The minimum allowed value of the slider.
       * Should not be equal to max.
       * @default 0
       */
      min: import_prop_types17.default.number,
      /**
       * Name attribute of the hidden `input` element.
       */
      name: import_prop_types17.default.string,
      /**
       * Callback function that is fired when the slider's value changed.
       *
       * @param {Event} event The event source of the callback.
       * You can pull out the new value by accessing `event.target.value` (any).
       * **Warning**: This is a generic event not a change event.
       * @param {number | number[]} value The new value.
       * @param {number} activeThumb Index of the currently moved thumb.
       */
      onChange: import_prop_types17.default.func,
      /**
       * Callback function that is fired when the `mouseup` is triggered.
       *
       * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
       * @param {number | number[]} value The new value.
       */
      onChangeCommitted: import_prop_types17.default.func,
      /**
       * The component orientation.
       * @default 'horizontal'
       */
      orientation: import_prop_types17.default.oneOf(["horizontal", "vertical"]),
      /**
       * A transformation function, to change the scale of the slider.
       * @param {any} x
       * @returns {any}
       * @default function Identity(x) {
       *   return x;
       * }
       */
      scale: import_prop_types17.default.func,
      /**
       * The props used for each slot inside the Slider.
       * @default {}
       */
      slotProps: import_prop_types17.default.shape({
        input: import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object]),
        mark: import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object]),
        markLabel: import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object]),
        rail: import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object]),
        root: import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object]),
        thumb: import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object]),
        track: import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object]),
        valueLabel: import_prop_types17.default.oneOfType([import_prop_types17.default.any, import_prop_types17.default.func])
      }),
      /**
       * The components used for each slot inside the Slider.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types17.default.shape({
        input: import_prop_types17.default.elementType,
        mark: import_prop_types17.default.elementType,
        markLabel: import_prop_types17.default.elementType,
        rail: import_prop_types17.default.elementType,
        root: import_prop_types17.default.elementType,
        thumb: import_prop_types17.default.elementType,
        track: import_prop_types17.default.elementType,
        valueLabel: import_prop_types17.default.elementType
      }),
      /**
       * The granularity with which the slider can step through values. (A "discrete" slider.)
       * The `min` prop serves as the origin for the valid values.
       * We recommend (max - min) to be evenly divisible by the step.
       *
       * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
       * @default 1
       */
      step: import_prop_types17.default.number,
      /**
       * Tab index attribute of the hidden `input` element.
       */
      tabIndex: import_prop_types17.default.number,
      /**
       * The track presentation:
       *
       * - `normal` the track will render a bar representing the slider value.
       * - `inverted` the track will render a bar representing the remaining slider value.
       * - `false` the track will render without a bar.
       * @default 'normal'
       */
      track: import_prop_types17.default.oneOf(["inverted", "normal", false]),
      /**
       * The value of the slider.
       * For ranged sliders, provide an array with two values.
       */
      value: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.number), import_prop_types17.default.number]),
      /**
       * The format function the value label's value.
       *
       * When a function is provided, it should have the following signature:
       *
       * - {number} value The value label's value to format
       * - {number} index The value label's index to format
       * @param {any} x
       * @returns {any}
       * @default function Identity(x) {
       *   return x;
       * }
       */
      valueLabelFormat: import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.string])
    } : void 0;
  }
});

// node_modules/@mui/base/Slider/Slider.types.js
var init_Slider_types = __esm({
  "node_modules/@mui/base/Slider/Slider.types.js"() {
  }
});

// node_modules/@mui/base/Slider/index.js
var init_Slider2 = __esm({
  "node_modules/@mui/base/Slider/index.js"() {
    init_Slider();
    init_Slider_types();
    init_sliderClasses();
    init_sliderClasses();
  }
});

// node_modules/@mui/base/Snackbar/snackbarClasses.js
function getSnackbarUtilityClass(slot) {
  return generateUtilityClass("MuiSnackbar", slot);
}
var snackbarClasses;
var init_snackbarClasses = __esm({
  "node_modules/@mui/base/Snackbar/snackbarClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    snackbarClasses = generateUtilityClasses("MuiSnackbar", ["root"]);
  }
});

// node_modules/@mui/base/Snackbar/Snackbar.js
var React43, import_prop_types18, import_jsx_runtime29, _excluded15, useUtilityClasses13, Snackbar;
var init_Snackbar = __esm({
  "node_modules/@mui/base/Snackbar/Snackbar.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React43 = __toESM(require_react());
    import_prop_types18 = __toESM(require_prop_types());
    init_ClickAwayListener2();
    init_composeClasses();
    init_snackbarClasses();
    init_useSnackbar2();
    init_utils();
    init_ClassNameConfigurator();
    import_jsx_runtime29 = __toESM(require_jsx_runtime());
    _excluded15 = ["autoHideDuration", "children", "disableWindowBlurListener", "exited", "onBlur", "onClose", "onFocus", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration", "slotProps", "slots"];
    useUtilityClasses13 = () => {
      const slots = {
        root: ["root"]
      };
      return composeClasses(slots, useClassNamesOverride(getSnackbarUtilityClass));
    };
    Snackbar = React43.forwardRef(function Snackbar2(props, forwardedRef) {
      const {
        autoHideDuration = null,
        children,
        disableWindowBlurListener = false,
        exited = true,
        onClose,
        open,
        resumeHideDuration,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded15);
      const classes = useUtilityClasses13();
      const {
        getRootProps,
        onClickAway
      } = useSnackbar(_extends({}, props, {
        autoHideDuration,
        disableWindowBlurListener,
        onClose,
        open,
        resumeHideDuration
      }));
      const ownerState = props;
      const Root = slots.root || "div";
      const rootProps = useSlotProps({
        elementType: Root,
        getSlotProps: getRootProps,
        externalForwardedProps: other,
        externalSlotProps: slotProps.root,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState,
        className: classes.root
      });
      const clickAwayListenerProps = useSlotProps({
        elementType: ClickAwayListener_default,
        externalSlotProps: slotProps.clickAwayListener,
        additionalProps: {
          onClickAway
        },
        ownerState
      });
      delete clickAwayListenerProps.ownerState;
      if (!open && exited) {
        return null;
      }
      return (0, import_jsx_runtime29.jsx)(ClickAwayListener_default, _extends({}, clickAwayListenerProps, {
        children: (0, import_jsx_runtime29.jsx)(Root, _extends({}, rootProps, {
          children
        }))
      }));
    });
    true ? Snackbar.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * The number of milliseconds to wait before automatically calling the
       * `onClose` function. `onClose` should then set the state of the `open`
       * prop to hide the Snackbar. This behavior is disabled by default with
       * the `null` value.
       * @default null
       */
      autoHideDuration: import_prop_types18.default.number,
      /**
       * @ignore
       */
      children: import_prop_types18.default.node,
      /**
       * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
       * @default false
       */
      disableWindowBlurListener: import_prop_types18.default.bool,
      /**
       * The prop used to handle exited transition and unmount the component.
       * @default true
       */
      exited: import_prop_types18.default.bool,
      /**
       * Callback fired when the component requests to be closed.
       * Typically `onClose` is used to set state in the parent component,
       * which is used to control the `Snackbar` `open` prop.
       * The `reason` parameter can optionally be used to control the response to `onClose`,
       * for example ignoring `clickaway`.
       *
       * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
       * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
       */
      onClose: import_prop_types18.default.func,
      /**
       * If `true`, the component is shown.
       */
      open: import_prop_types18.default.bool,
      /**
       * The number of milliseconds to wait before dismissing after user interaction.
       * If `autoHideDuration` prop isn't specified, it does nothing.
       * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
       * we default to `autoHideDuration / 2` ms.
       */
      resumeHideDuration: import_prop_types18.default.number,
      /**
       * The props used for each slot inside the Snackbar.
       * @default {}
       */
      slotProps: import_prop_types18.default.shape({
        clickAwayListener: import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.shape({
          children: import_prop_types18.default.element.isRequired,
          disableReactTree: import_prop_types18.default.bool,
          mouseEvent: import_prop_types18.default.oneOf(["onClick", "onMouseDown", "onMouseUp", "onPointerDown", "onPointerUp", false]),
          onClickAway: import_prop_types18.default.func,
          touchEvent: import_prop_types18.default.oneOf(["onTouchEnd", "onTouchStart", false])
        })]),
        root: import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object])
      }),
      /**
       * The components used for each slot inside the Snackbar.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types18.default.shape({
        root: import_prop_types18.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/Snackbar/Snackbar.types.js
var init_Snackbar_types = __esm({
  "node_modules/@mui/base/Snackbar/Snackbar.types.js"() {
  }
});

// node_modules/@mui/base/Snackbar/index.js
var init_Snackbar2 = __esm({
  "node_modules/@mui/base/Snackbar/index.js"() {
    init_Snackbar();
    init_Snackbar_types();
    init_snackbarClasses();
    init_snackbarClasses();
  }
});

// node_modules/@mui/base/useSwitch/useSwitch.js
function useSwitch(props) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly,
    required
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "Switch",
    state: "checked"
  });
  const createHandleInputChange = (otherProps) => (event) => {
    var _otherProps$onChange;
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    setCheckedState(event.target.checked);
    onChange == null ? void 0 : onChange(event);
    (_otherProps$onChange = otherProps.onChange) == null ? void 0 : _otherProps$onChange.call(otherProps, event);
  };
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React44.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  React44.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const inputRef = React44.useRef(null);
  const createHandleFocus = (otherProps) => (event) => {
    var _otherProps$onFocus;
    if (!inputRef.current) {
      inputRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      onFocusVisible == null ? void 0 : onFocusVisible(event);
    }
    onFocus == null ? void 0 : onFocus(event);
    (_otherProps$onFocus = otherProps.onFocus) == null ? void 0 : _otherProps$onFocus.call(otherProps, event);
  };
  const createHandleBlur = (otherProps) => (event) => {
    var _otherProps$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    onBlur == null ? void 0 : onBlur(event);
    (_otherProps$onBlur = otherProps.onBlur) == null ? void 0 : _otherProps$onBlur.call(otherProps, event);
  };
  const handleInputRef = useForkRef(focusVisibleRef, inputRef);
  const getInputProps = (otherProps = {}) => _extends({
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    ref: handleInputRef,
    required,
    type: "checkbox"
  }, otherProps, {
    onChange: createHandleInputChange(otherProps),
    onFocus: createHandleFocus(otherProps),
    onBlur: createHandleBlur(otherProps)
  });
  return {
    checked,
    disabled: Boolean(disabled),
    focusVisible,
    getInputProps,
    inputRef: handleInputRef,
    readOnly: Boolean(readOnly)
  };
}
var React44;
var init_useSwitch = __esm({
  "node_modules/@mui/base/useSwitch/useSwitch.js"() {
    init_extends();
    React44 = __toESM(require_react());
    init_esm();
  }
});

// node_modules/@mui/base/useSwitch/useSwitch.types.js
var init_useSwitch_types = __esm({
  "node_modules/@mui/base/useSwitch/useSwitch.types.js"() {
  }
});

// node_modules/@mui/base/useSwitch/index.js
var init_useSwitch2 = __esm({
  "node_modules/@mui/base/useSwitch/index.js"() {
    init_useSwitch();
    init_useSwitch_types();
  }
});

// node_modules/@mui/base/Switch/switchClasses.js
function getSwitchUtilityClass(slot) {
  return generateUtilityClass("MuiSwitch", slot);
}
var switchClasses;
var init_switchClasses = __esm({
  "node_modules/@mui/base/Switch/switchClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    switchClasses = generateUtilityClasses("MuiSwitch", ["root", "input", "track", "thumb", "checked", "disabled", "focusVisible", "readOnly"]);
  }
});

// node_modules/@mui/base/Switch/Switch.js
var React45, import_prop_types19, import_jsx_runtime30, import_jsx_runtime31, _excluded16, useUtilityClasses14, Switch;
var init_Switch = __esm({
  "node_modules/@mui/base/Switch/Switch.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React45 = __toESM(require_react());
    import_prop_types19 = __toESM(require_prop_types());
    init_composeClasses();
    init_useSwitch2();
    init_utils();
    init_ClassNameConfigurator();
    init_switchClasses();
    import_jsx_runtime30 = __toESM(require_jsx_runtime());
    import_jsx_runtime31 = __toESM(require_jsx_runtime());
    _excluded16 = ["checked", "defaultChecked", "disabled", "onBlur", "onChange", "onFocus", "onFocusVisible", "readOnly", "required", "slotProps", "slots"];
    useUtilityClasses14 = (ownerState) => {
      const {
        checked,
        disabled,
        focusVisible,
        readOnly
      } = ownerState;
      const slots = {
        root: ["root", checked && "checked", disabled && "disabled", focusVisible && "focusVisible", readOnly && "readOnly"],
        thumb: ["thumb"],
        input: ["input"],
        track: ["track"]
      };
      return composeClasses(slots, useClassNamesOverride(getSwitchUtilityClass));
    };
    Switch = React45.forwardRef(function Switch2(props, forwardedRef) {
      var _slots$root, _slots$thumb, _slots$input, _slots$track;
      const {
        checked: checkedProp,
        defaultChecked,
        disabled: disabledProp,
        onBlur,
        onChange,
        onFocus,
        onFocusVisible,
        readOnly: readOnlyProp,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded16);
      const useSwitchProps = {
        checked: checkedProp,
        defaultChecked,
        disabled: disabledProp,
        onBlur,
        onChange,
        onFocus,
        onFocusVisible,
        readOnly: readOnlyProp
      };
      const {
        getInputProps,
        checked,
        disabled,
        focusVisible,
        readOnly
      } = useSwitch(useSwitchProps);
      const ownerState = _extends({}, props, {
        checked,
        disabled,
        focusVisible,
        readOnly
      });
      const classes = useUtilityClasses14(ownerState);
      const Root = (_slots$root = slots.root) != null ? _slots$root : "span";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState,
        className: classes.root
      });
      const Thumb = (_slots$thumb = slots.thumb) != null ? _slots$thumb : "span";
      const thumbProps = useSlotProps({
        elementType: Thumb,
        externalSlotProps: slotProps.thumb,
        ownerState,
        className: classes.thumb
      });
      const Input3 = (_slots$input = slots.input) != null ? _slots$input : "input";
      const inputProps = useSlotProps({
        elementType: Input3,
        getSlotProps: getInputProps,
        externalSlotProps: slotProps.input,
        ownerState,
        className: classes.input
      });
      const Track = slots.track === null ? () => null : (_slots$track = slots.track) != null ? _slots$track : "span";
      const trackProps = useSlotProps({
        elementType: Track,
        externalSlotProps: slotProps.track,
        ownerState,
        className: classes.track
      });
      return (0, import_jsx_runtime31.jsxs)(Root, _extends({}, rootProps, {
        children: [(0, import_jsx_runtime30.jsx)(Track, _extends({}, trackProps)), (0, import_jsx_runtime30.jsx)(Thumb, _extends({}, thumbProps)), (0, import_jsx_runtime30.jsx)(Input3, _extends({}, inputProps))]
      }));
    });
    true ? Switch.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * If `true`, the component is checked.
       */
      checked: import_prop_types19.default.bool,
      /**
       * The default checked state. Use when the component is not controlled.
       */
      defaultChecked: import_prop_types19.default.bool,
      /**
       * If `true`, the component is disabled.
       */
      disabled: import_prop_types19.default.bool,
      /**
       * @ignore
       */
      onBlur: import_prop_types19.default.func,
      /**
       * Callback fired when the state is changed.
       *
       * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
       * You can pull out the new value by accessing `event.target.value` (string).
       * You can pull out the new checked state by accessing `event.target.checked` (boolean).
       */
      onChange: import_prop_types19.default.func,
      /**
       * @ignore
       */
      onFocus: import_prop_types19.default.func,
      /**
       * @ignore
       */
      onFocusVisible: import_prop_types19.default.func,
      /**
       * If `true`, the component is read only.
       */
      readOnly: import_prop_types19.default.bool,
      /**
       * If `true`, the `input` element is required.
       */
      required: import_prop_types19.default.bool,
      /**
       * The props used for each slot inside the Switch.
       * @default {}
       */
      slotProps: import_prop_types19.default.shape({
        input: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object]),
        root: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object]),
        thumb: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object]),
        track: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object])
      }),
      /**
       * The components used for each slot inside the Switch.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types19.default.shape({
        input: import_prop_types19.default.elementType,
        root: import_prop_types19.default.elementType,
        thumb: import_prop_types19.default.elementType,
        track: import_prop_types19.default.oneOfType([import_prop_types19.default.elementType, import_prop_types19.default.oneOf([null])])
      })
    } : void 0;
  }
});

// node_modules/@mui/base/Switch/Switch.types.js
var init_Switch_types = __esm({
  "node_modules/@mui/base/Switch/Switch.types.js"() {
  }
});

// node_modules/@mui/base/Switch/index.js
var init_Switch2 = __esm({
  "node_modules/@mui/base/Switch/index.js"() {
    init_Switch();
    init_Switch_types();
    init_switchClasses();
    init_switchClasses();
  }
});

// node_modules/@mui/base/TablePagination/TablePaginationActions.js
function LastPageIconDefault() {
  return _span || (_span = (0, import_jsx_runtime32.jsx)("span", {
    children: "⇾|"
  }));
}
function FirstPageIconDefault() {
  return _span2 || (_span2 = (0, import_jsx_runtime32.jsx)("span", {
    children: "|⇽"
  }));
}
function NextPageIconDefault() {
  return _span3 || (_span3 = (0, import_jsx_runtime32.jsx)("span", {
    children: "⇾"
  }));
}
function BackPageIconDefault() {
  return _span4 || (_span4 = (0, import_jsx_runtime32.jsx)("span", {
    children: "⇽"
  }));
}
function defaultGetAriaLabel(type) {
  return `Go to ${type} page`;
}
var React46, import_jsx_runtime32, import_jsx_runtime33, _excluded17, _span, _span2, _span3, _span4, TablePaginationActions, TablePaginationActions_default;
var init_TablePaginationActions = __esm({
  "node_modules/@mui/base/TablePagination/TablePaginationActions.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React46 = __toESM(require_react());
    init_utils();
    import_jsx_runtime32 = __toESM(require_jsx_runtime());
    import_jsx_runtime33 = __toESM(require_jsx_runtime());
    _excluded17 = ["count", "getItemAriaLabel", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton", "direction", "ownerState", "slotProps", "slots"];
    TablePaginationActions = React46.forwardRef(function TablePaginationActions2(props, forwardedRef) {
      var _slots$root, _slots$firstButton, _slots$lastButton, _slots$nextButton, _slots$backButton, _slots$lastPageIcon, _slots$firstPageIcon, _slots$nextPageIcon, _slots$backPageIcon;
      const {
        count,
        getItemAriaLabel = defaultGetAriaLabel,
        onPageChange,
        page,
        rowsPerPage,
        showFirstButton = false,
        showLastButton = false,
        direction,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded17);
      const ownerState = props;
      const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
      };
      const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
      };
      const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
      };
      const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      };
      const Root = (_slots$root = slots.root) != null ? _slots$root : "div";
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState
      });
      const FirstButton = (_slots$firstButton = slots.firstButton) != null ? _slots$firstButton : "button";
      const firstButtonProps = useSlotProps({
        elementType: FirstButton,
        externalSlotProps: slotProps.firstButton,
        additionalProps: {
          onClick: handleFirstPageButtonClick,
          disabled: page === 0,
          "aria-label": getItemAriaLabel("first", page),
          title: getItemAriaLabel("first", page)
        },
        ownerState
      });
      const LastButton = (_slots$lastButton = slots.lastButton) != null ? _slots$lastButton : "button";
      const lastButtonProps = useSlotProps({
        elementType: LastButton,
        externalSlotProps: slotProps.lastButton,
        additionalProps: {
          onClick: handleLastPageButtonClick,
          disabled: page >= Math.ceil(count / rowsPerPage) - 1,
          "aria-label": getItemAriaLabel("last", page),
          title: getItemAriaLabel("last", page)
        },
        ownerState
      });
      const NextButton = (_slots$nextButton = slots.nextButton) != null ? _slots$nextButton : "button";
      const nextButtonProps = useSlotProps({
        elementType: NextButton,
        externalSlotProps: slotProps.nextButton,
        additionalProps: {
          onClick: handleNextButtonClick,
          disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
          "aria-label": getItemAriaLabel("next", page),
          title: getItemAriaLabel("next", page)
        },
        ownerState
      });
      const BackButton = (_slots$backButton = slots.backButton) != null ? _slots$backButton : "button";
      const backButtonProps = useSlotProps({
        elementType: BackButton,
        externalSlotProps: slotProps.backButton,
        additionalProps: {
          onClick: handleBackButtonClick,
          disabled: page === 0,
          "aria-label": getItemAriaLabel("previous", page),
          title: getItemAriaLabel("previous", page)
        },
        ownerState
      });
      const LastPageIcon = (_slots$lastPageIcon = slots.lastPageIcon) != null ? _slots$lastPageIcon : LastPageIconDefault;
      const FirstPageIcon = (_slots$firstPageIcon = slots.firstPageIcon) != null ? _slots$firstPageIcon : FirstPageIconDefault;
      const NextPageIcon = (_slots$nextPageIcon = slots.nextPageIcon) != null ? _slots$nextPageIcon : NextPageIconDefault;
      const BackPageIcon = (_slots$backPageIcon = slots.backPageIcon) != null ? _slots$backPageIcon : BackPageIconDefault;
      return (0, import_jsx_runtime33.jsxs)(Root, _extends({}, rootProps, {
        children: [showFirstButton && (0, import_jsx_runtime32.jsx)(FirstButton, _extends({}, firstButtonProps, {
          children: direction === "rtl" ? (0, import_jsx_runtime32.jsx)(LastPageIcon, {}) : (0, import_jsx_runtime32.jsx)(FirstPageIcon, {})
        })), (0, import_jsx_runtime32.jsx)(BackButton, _extends({}, backButtonProps, {
          children: direction === "rtl" ? (0, import_jsx_runtime32.jsx)(NextPageIcon, {}) : (0, import_jsx_runtime32.jsx)(BackPageIcon, {})
        })), (0, import_jsx_runtime32.jsx)(NextButton, _extends({}, nextButtonProps, {
          children: direction === "rtl" ? (0, import_jsx_runtime32.jsx)(BackPageIcon, {}) : (0, import_jsx_runtime32.jsx)(NextPageIcon, {})
        })), showLastButton && (0, import_jsx_runtime32.jsx)(LastButton, _extends({}, lastButtonProps, {
          children: direction === "rtl" ? (0, import_jsx_runtime32.jsx)(FirstPageIcon, {}) : (0, import_jsx_runtime32.jsx)(LastPageIcon, {})
        }))]
      }));
    });
    TablePaginationActions_default = TablePaginationActions;
  }
});

// node_modules/@mui/base/TablePagination/tablePaginationClasses.js
function getTablePaginationUtilityClass(slot) {
  return generateUtilityClass("MuiTablePagination", slot);
}
var tablePaginationClasses;
var init_tablePaginationClasses = __esm({
  "node_modules/@mui/base/TablePagination/tablePaginationClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tablePaginationClasses = generateUtilityClasses("MuiTablePagination", ["root", "toolbar", "spacer", "selectLabel", "selectRoot", "select", "selectIcon", "input", "menuItem", "displayedRows", "actions"]);
  }
});

// node_modules/@mui/base/TablePagination/TablePagination.js
function defaultLabelDisplayedRows({
  from,
  to,
  count
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}
function defaultGetAriaLabel2(type) {
  return `Go to ${type} page`;
}
var React47, import_prop_types20, import_jsx_runtime34, import_react, import_jsx_runtime35, _excluded18, useUtilityClasses15, TablePagination;
var init_TablePagination = __esm({
  "node_modules/@mui/base/TablePagination/TablePagination.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React47 = __toESM(require_react());
    import_prop_types20 = __toESM(require_prop_types());
    init_esm();
    init_utils();
    init_composeClasses();
    init_isHostComponent();
    init_TablePaginationActions();
    init_tablePaginationClasses();
    init_ClassNameConfigurator();
    import_jsx_runtime34 = __toESM(require_jsx_runtime());
    import_react = __toESM(require_react());
    import_jsx_runtime35 = __toESM(require_jsx_runtime());
    _excluded18 = ["colSpan", "count", "getItemAriaLabel", "labelDisplayedRows", "labelId", "labelRowsPerPage", "onPageChange", "onRowsPerPageChange", "page", "rowsPerPage", "rowsPerPageOptions", "selectId", "slotProps", "slots"];
    useUtilityClasses15 = () => {
      const slots = {
        root: ["root"],
        toolbar: ["toolbar"],
        spacer: ["spacer"],
        selectLabel: ["selectLabel"],
        select: ["select"],
        input: ["input"],
        selectIcon: ["selectIcon"],
        menuItem: ["menuItem"],
        displayedRows: ["displayedRows"],
        actions: ["actions"]
      };
      return composeClasses(slots, useClassNamesOverride(getTablePaginationUtilityClass));
    };
    TablePagination = React47.forwardRef(function TablePagination2(props, forwardedRef) {
      var _slots$root, _slots$select, _slots$actions, _slots$menuItem, _slots$selectLabel, _slots$displayedRows, _slots$toolbar, _slots$spacer;
      const {
        colSpan: colSpanProp,
        count,
        getItemAriaLabel = defaultGetAriaLabel2,
        labelDisplayedRows = defaultLabelDisplayedRows,
        labelId: labelIdProp,
        labelRowsPerPage = "Rows per page:",
        onPageChange,
        onRowsPerPageChange,
        page,
        rowsPerPage,
        rowsPerPageOptions = [10, 25, 50, 100],
        selectId: selectIdProp,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded18);
      const ownerState = props;
      const classes = useUtilityClasses15();
      let colSpan;
      const Root = (_slots$root = slots.root) != null ? _slots$root : "td";
      if (Root === "td" || !isHostComponent(Root)) {
        colSpan = colSpanProp || 1e3;
      }
      const getLabelDisplayedRowsTo = () => {
        if (count === -1) {
          return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage);
      };
      const selectId = useId(selectIdProp);
      const labelId = useId(labelIdProp);
      const rootProps = useSlotProps({
        elementType: Root,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          colSpan,
          ref: forwardedRef
        },
        ownerState,
        className: classes.root
      });
      const Select3 = (_slots$select = slots.select) != null ? _slots$select : "select";
      const selectProps = useSlotProps({
        elementType: Select3,
        externalSlotProps: slotProps.select,
        additionalProps: {
          value: rowsPerPage,
          id: selectId,
          onChange: (event) => onRowsPerPageChange && onRowsPerPageChange(event),
          "aria-label": rowsPerPage.toString(),
          "aria-labelledby": [labelId, selectId].filter(Boolean).join(" ") || void 0
        },
        ownerState,
        className: classes.select
      });
      const Actions = (_slots$actions = slots.actions) != null ? _slots$actions : TablePaginationActions_default;
      const actionsProps = useSlotProps({
        elementType: Actions,
        externalSlotProps: slotProps.actions,
        additionalProps: {
          page,
          rowsPerPage,
          count,
          onPageChange,
          getItemAriaLabel
        },
        ownerState,
        className: classes.actions
      });
      const MenuItem3 = (_slots$menuItem = slots.menuItem) != null ? _slots$menuItem : "option";
      const menuItemProps = useSlotProps({
        elementType: MenuItem3,
        externalSlotProps: slotProps.menuItem,
        additionalProps: {
          value: void 0
        },
        ownerState,
        className: classes.menuItem
      });
      const SelectLabel = (_slots$selectLabel = slots.selectLabel) != null ? _slots$selectLabel : "p";
      const selectLabelProps = useSlotProps({
        elementType: SelectLabel,
        externalSlotProps: slotProps.selectLabel,
        additionalProps: {
          id: labelId
        },
        ownerState,
        className: classes.selectLabel
      });
      const DisplayedRows = (_slots$displayedRows = slots.displayedRows) != null ? _slots$displayedRows : "p";
      const displayedRowsProps = useSlotProps({
        elementType: DisplayedRows,
        externalSlotProps: slotProps.displayedRows,
        ownerState,
        className: classes.displayedRows
      });
      const Toolbar = (_slots$toolbar = slots.toolbar) != null ? _slots$toolbar : "div";
      const toolbarProps = useSlotProps({
        elementType: Toolbar,
        externalSlotProps: slotProps.toolbar,
        ownerState,
        className: classes.toolbar
      });
      const Spacer = (_slots$spacer = slots.spacer) != null ? _slots$spacer : "div";
      const spacerProps = useSlotProps({
        elementType: Spacer,
        externalSlotProps: slotProps.spacer,
        ownerState,
        className: classes.spacer
      });
      return (0, import_jsx_runtime34.jsx)(Root, _extends({}, rootProps, {
        children: (0, import_jsx_runtime35.jsxs)(Toolbar, _extends({}, toolbarProps, {
          children: [(0, import_jsx_runtime34.jsx)(Spacer, _extends({}, spacerProps)), rowsPerPageOptions.length > 1 && (0, import_jsx_runtime34.jsx)(SelectLabel, _extends({}, selectLabelProps, {
            children: labelRowsPerPage
          })), rowsPerPageOptions.length > 1 && (0, import_jsx_runtime34.jsx)(Select3, _extends({}, selectProps, {
            children: rowsPerPageOptions.map((rowsPerPageOption) => (0, import_react.createElement)(MenuItem3, _extends({}, menuItemProps, {
              key: typeof rowsPerPageOption !== "number" && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption,
              value: typeof rowsPerPageOption !== "number" && rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
            }), typeof rowsPerPageOption !== "number" && rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption))
          })), (0, import_jsx_runtime34.jsx)(DisplayedRows, _extends({}, displayedRowsProps, {
            children: labelDisplayedRows({
              from: count === 0 ? 0 : page * rowsPerPage + 1,
              to: getLabelDisplayedRowsTo(),
              count: count === -1 ? -1 : count,
              page
            })
          })), (0, import_jsx_runtime34.jsx)(Actions, _extends({}, actionsProps))]
        }))
      }));
    });
    true ? TablePagination.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * @ignore
       */
      colSpan: import_prop_types20.default.number,
      /**
       * The total number of rows.
       *
       * To enable server side pagination for an unknown number of items, provide -1.
       */
      count: import_prop_types20.default.number.isRequired,
      /**
       * Accepts a function which returns a string value that provides a user-friendly name for the current page.
       * This is important for screen reader users.
       *
       * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
       * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
       * @returns {string}
       * @default function defaultGetAriaLabel(type: ItemAriaLabelType) {
       *   return `Go to ${type} page`;
       * }
       */
      getItemAriaLabel: import_prop_types20.default.func,
      /**
       * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
       * object.
       *
       * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
       * @default function defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs) {
       *   return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
       * }
       */
      labelDisplayedRows: import_prop_types20.default.func,
      /**
       * Id of the label element within the pagination.
       */
      labelId: import_prop_types20.default.string,
      /**
       * Customize the rows per page label.
       *
       * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
       * @default 'Rows per page:'
       */
      labelRowsPerPage: import_prop_types20.default.node,
      /**
       * Callback fired when the page is changed.
       *
       * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
       * @param {number} page The page selected.
       */
      onPageChange: import_prop_types20.default.func.isRequired,
      /**
       * Callback fired when the number of rows per page is changed.
       *
       * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
       */
      onRowsPerPageChange: import_prop_types20.default.func,
      /**
       * The zero-based index of the current page.
       */
      page: chainPropTypes(integerPropType_default.isRequired, (props) => {
        const {
          count,
          page,
          rowsPerPage
        } = props;
        if (count === -1) {
          return null;
        }
        const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
        if (page < 0 || page > newLastPage) {
          return new Error(`MUI: The page prop of a TablePagination is out of range (0 to ${newLastPage}, but page is ${page}).`);
        }
        return null;
      }),
      /**
       * The number of rows per page.
       *
       * Set -1 to display all the rows.
       */
      rowsPerPage: integerPropType_default.isRequired,
      /**
       * Customizes the options of the rows per page select field. If less than two options are
       * available, no select field will be displayed.
       * Use -1 for the value with a custom label to show all the rows.
       * @default [10, 25, 50, 100]
       */
      rowsPerPageOptions: import_prop_types20.default.arrayOf(import_prop_types20.default.oneOfType([import_prop_types20.default.number, import_prop_types20.default.shape({
        label: import_prop_types20.default.string.isRequired,
        value: import_prop_types20.default.number.isRequired
      })]).isRequired),
      /**
       * Id of the select element within the pagination.
       */
      selectId: import_prop_types20.default.string,
      /**
       * The props used for each slot inside the TablePagination.
       * @default {}
       */
      slotProps: import_prop_types20.default.shape({
        actions: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
        displayedRows: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
        menuItem: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
        root: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
        select: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
        selectLabel: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
        spacer: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object]),
        toolbar: import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object])
      }),
      /**
       * The components used for each slot inside the TablePagination.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types20.default.shape({
        actions: import_prop_types20.default.elementType,
        displayedRows: import_prop_types20.default.elementType,
        menuItem: import_prop_types20.default.elementType,
        root: import_prop_types20.default.elementType,
        select: import_prop_types20.default.elementType,
        selectLabel: import_prop_types20.default.elementType,
        spacer: import_prop_types20.default.elementType,
        toolbar: import_prop_types20.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/TablePagination/TablePagination.types.js
var init_TablePagination_types = __esm({
  "node_modules/@mui/base/TablePagination/TablePagination.types.js"() {
  }
});

// node_modules/@mui/base/TablePagination/TablePaginationActions.types.js
var init_TablePaginationActions_types = __esm({
  "node_modules/@mui/base/TablePagination/TablePaginationActions.types.js"() {
  }
});

// node_modules/@mui/base/TablePagination/common.types.js
var init_common_types = __esm({
  "node_modules/@mui/base/TablePagination/common.types.js"() {
  }
});

// node_modules/@mui/base/TablePagination/index.js
var init_TablePagination2 = __esm({
  "node_modules/@mui/base/TablePagination/index.js"() {
    init_TablePagination();
    init_TablePagination_types();
    init_TablePaginationActions();
    init_TablePaginationActions_types();
    init_tablePaginationClasses();
    init_tablePaginationClasses();
    init_common_types();
  }
});

// node_modules/@mui/base/TabPanel/tabPanelClasses.js
function getTabPanelUtilityClass(slot) {
  return generateUtilityClass("MuiTabPanel", slot);
}
var tabPanelClasses;
var init_tabPanelClasses = __esm({
  "node_modules/@mui/base/TabPanel/tabPanelClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabPanelClasses = generateUtilityClasses("MuiTabPanel", ["root", "hidden"]);
  }
});

// node_modules/@mui/base/Tabs/tabsClasses.js
function getTabsUtilityClass(slot) {
  return generateUtilityClass("MuiTabs", slot);
}
var tabsClasses;
var init_tabsClasses = __esm({
  "node_modules/@mui/base/Tabs/tabsClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabsClasses = generateUtilityClasses("MuiTabs", ["root", "horizontal", "vertical"]);
  }
});

// node_modules/@mui/base/useTabs/useTabs.js
function useTabs(parameters) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    orientation,
    direction,
    selectionFollowsFocus
  } = parameters;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Tabs",
    state: "value"
  });
  const onSelected = React48.useCallback((event, newValue) => {
    setValue(newValue);
    onChange == null ? void 0 : onChange(event, newValue);
  }, [onChange, setValue]);
  const {
    subitems: tabPanels,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const tabIdLookup = React48.useRef(() => void 0);
  const getTabPanelId = React48.useCallback((tabValue) => {
    var _tabPanels$get;
    return (_tabPanels$get = tabPanels.get(tabValue)) == null ? void 0 : _tabPanels$get.id;
  }, [tabPanels]);
  const getTabId = React48.useCallback((tabPanelId) => {
    return tabIdLookup.current(tabPanelId);
  }, []);
  const registerTabIdLookup = React48.useCallback((lookupFunction) => {
    tabIdLookup.current = lookupFunction;
  }, []);
  return {
    contextValue: _extends({
      direction,
      getTabId,
      getTabPanelId,
      onSelected,
      orientation,
      registerTabIdLookup,
      selectionFollowsFocus,
      value
    }, compoundComponentContextValue)
  };
}
var React48, useTabs_default;
var init_useTabs = __esm({
  "node_modules/@mui/base/useTabs/useTabs.js"() {
    init_extends();
    React48 = __toESM(require_react());
    init_esm();
    init_useCompound();
    useTabs_default = useTabs;
  }
});

// node_modules/@mui/base/useTabs/useTabs.types.js
var init_useTabs_types = __esm({
  "node_modules/@mui/base/useTabs/useTabs.types.js"() {
  }
});

// node_modules/@mui/base/Tabs/TabsContext.js
function useTabsContext() {
  const context = React49.useContext(Context);
  if (context == null) {
    throw new Error("No TabsContext provided");
  }
  return context;
}
var React49, Context, TabsContext_default;
var init_TabsContext = __esm({
  "node_modules/@mui/base/Tabs/TabsContext.js"() {
    React49 = __toESM(require_react());
    Context = React49.createContext(null);
    if (true) {
      Context.displayName = "TabsContext";
    }
    TabsContext_default = Context;
  }
});

// node_modules/@mui/base/useTabs/TabsProvider.js
function TabsProvider(props) {
  const {
    value: valueProp,
    children
  } = props;
  const {
    direction,
    getItemIndex,
    onSelected,
    orientation,
    registerItem,
    registerTabIdLookup,
    selectionFollowsFocus,
    totalSubitemCount,
    value,
    getTabId,
    getTabPanelId
  } = valueProp;
  const compoundComponentContextValue = React50.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  const tabsContextValue = React50.useMemo(() => ({
    direction,
    getTabId,
    getTabPanelId,
    onSelected,
    orientation,
    registerTabIdLookup,
    selectionFollowsFocus,
    value
  }), [direction, getTabId, getTabPanelId, onSelected, orientation, registerTabIdLookup, selectionFollowsFocus, value]);
  return (0, import_jsx_runtime36.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime36.jsx)(TabsContext_default.Provider, {
      value: tabsContextValue,
      children
    })
  });
}
var React50, import_jsx_runtime36;
var init_TabsProvider = __esm({
  "node_modules/@mui/base/useTabs/TabsProvider.js"() {
    React50 = __toESM(require_react());
    init_TabsContext();
    init_useCompound();
    import_jsx_runtime36 = __toESM(require_jsx_runtime());
  }
});

// node_modules/@mui/base/useTabs/index.js
var init_useTabs2 = __esm({
  "node_modules/@mui/base/useTabs/index.js"() {
    init_useTabs();
    init_useTabs();
    init_useTabs_types();
    init_TabsProvider();
    init_TabsProvider();
  }
});

// node_modules/@mui/base/Tabs/Tabs.js
var React51, import_prop_types21, import_jsx_runtime37, _excluded19, useUtilityClasses16, Tabs;
var init_Tabs = __esm({
  "node_modules/@mui/base/Tabs/Tabs.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React51 = __toESM(require_react());
    import_prop_types21 = __toESM(require_prop_types());
    init_utils();
    init_composeClasses();
    init_tabsClasses();
    init_useTabs2();
    init_TabsProvider();
    init_ClassNameConfigurator();
    import_jsx_runtime37 = __toESM(require_jsx_runtime());
    _excluded19 = ["children", "value", "defaultValue", "orientation", "direction", "onChange", "selectionFollowsFocus", "slotProps", "slots"];
    useUtilityClasses16 = (ownerState) => {
      const {
        orientation
      } = ownerState;
      const slots = {
        root: ["root", orientation]
      };
      return composeClasses(slots, useClassNamesOverride(getTabsUtilityClass));
    };
    Tabs = React51.forwardRef(function Tabs2(props, forwardedRef) {
      var _slots$root;
      const {
        children,
        orientation = "horizontal",
        direction = "ltr",
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded19);
      const {
        contextValue
      } = useTabs_default(props);
      const ownerState = _extends({}, props, {
        orientation,
        direction
      });
      const classes = useUtilityClasses16(ownerState);
      const TabsRoot = (_slots$root = slots.root) != null ? _slots$root : "div";
      const tabsRootProps = useSlotProps({
        elementType: TabsRoot,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime37.jsx)(TabsRoot, _extends({}, tabsRootProps, {
        children: (0, import_jsx_runtime37.jsx)(TabsProvider, {
          value: contextValue,
          children
        })
      }));
    });
    true ? Tabs.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * The content of the component.
       */
      children: import_prop_types21.default.node,
      /**
       * The default value. Use when the component is not controlled.
       */
      defaultValue: import_prop_types21.default.oneOfType([import_prop_types21.default.number, import_prop_types21.default.string]),
      /**
       * The direction of the text.
       * @default 'ltr'
       */
      direction: import_prop_types21.default.oneOf(["ltr", "rtl"]),
      /**
       * Callback invoked when new value is being set.
       */
      onChange: import_prop_types21.default.func,
      /**
       * The component orientation (layout flow direction).
       * @default 'horizontal'
       */
      orientation: import_prop_types21.default.oneOf(["horizontal", "vertical"]),
      /**
       * If `true` the selected tab changes on focus. Otherwise it only
       * changes on activation.
       */
      selectionFollowsFocus: import_prop_types21.default.bool,
      /**
       * The props used for each slot inside the Tabs.
       * @default {}
       */
      slotProps: import_prop_types21.default.shape({
        root: import_prop_types21.default.oneOfType([import_prop_types21.default.func, import_prop_types21.default.object])
      }),
      /**
       * The components used for each slot inside the Tabs.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types21.default.shape({
        root: import_prop_types21.default.elementType
      }),
      /**
       * The value of the currently selected `Tab`.
       * If you don't want any selected `Tab`, you can set this prop to `null`.
       */
      value: import_prop_types21.default.oneOfType([import_prop_types21.default.number, import_prop_types21.default.string])
    } : void 0;
  }
});

// node_modules/@mui/base/Tabs/Tabs.types.js
var init_Tabs_types = __esm({
  "node_modules/@mui/base/Tabs/Tabs.types.js"() {
  }
});

// node_modules/@mui/base/Tabs/index.js
var init_Tabs2 = __esm({
  "node_modules/@mui/base/Tabs/index.js"() {
    init_Tabs();
    init_TabsContext();
    init_TabsContext();
    init_tabsClasses();
    init_tabsClasses();
    init_Tabs_types();
  }
});

// node_modules/@mui/base/useTabPanel/useTabPanel.js
function tabPanelValueGenerator(otherTabPanelValues) {
  return otherTabPanelValues.size;
}
function useTabPanel(parameters) {
  const {
    value: valueParam,
    id: idParam,
    rootRef: externalRef
  } = parameters;
  const context = useTabsContext();
  if (context === null) {
    throw new Error("No TabContext provided");
  }
  const {
    value: selectedTabValue,
    getTabId
  } = context;
  const id = useId(idParam);
  const ref = React52.useRef(null);
  const handleRef = useForkRef(ref, externalRef);
  const metadata = React52.useMemo(() => ({
    id,
    ref
  }), [id]);
  const {
    id: value
  } = useCompoundItem(valueParam != null ? valueParam : tabPanelValueGenerator, metadata);
  const hidden = value !== selectedTabValue;
  const correspondingTabId = value !== void 0 ? getTabId(value) : void 0;
  const getRootProps = () => {
    return {
      "aria-labelledby": correspondingTabId != null ? correspondingTabId : void 0,
      hidden,
      id: id != null ? id : void 0,
      ref: handleRef
    };
  };
  return {
    hidden,
    getRootProps,
    rootRef: handleRef
  };
}
var React52, useTabPanel_default;
var init_useTabPanel = __esm({
  "node_modules/@mui/base/useTabPanel/useTabPanel.js"() {
    React52 = __toESM(require_react());
    init_esm();
    init_Tabs2();
    init_useCompoundItem();
    useTabPanel_default = useTabPanel;
  }
});

// node_modules/@mui/base/TabPanel/TabPanel.js
var React53, import_prop_types22, import_jsx_runtime38, _excluded20, useUtilityClasses17, TabPanel;
var init_TabPanel = __esm({
  "node_modules/@mui/base/TabPanel/TabPanel.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React53 = __toESM(require_react());
    import_prop_types22 = __toESM(require_prop_types());
    init_utils();
    init_composeClasses();
    init_tabPanelClasses();
    init_useTabPanel();
    init_ClassNameConfigurator();
    import_jsx_runtime38 = __toESM(require_jsx_runtime());
    _excluded20 = ["children", "value", "slotProps", "slots"];
    useUtilityClasses17 = (ownerState) => {
      const {
        hidden
      } = ownerState;
      const slots = {
        root: ["root", hidden && "hidden"]
      };
      return composeClasses(slots, useClassNamesOverride(getTabPanelUtilityClass));
    };
    TabPanel = React53.forwardRef(function TabPanel2(props, forwardedRef) {
      var _slots$root;
      const {
        children,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded20);
      const {
        hidden,
        getRootProps
      } = useTabPanel_default(props);
      const ownerState = _extends({}, props, {
        hidden
      });
      const classes = useUtilityClasses17(ownerState);
      const TabPanelRoot = (_slots$root = slots.root) != null ? _slots$root : "div";
      const tabPanelRootProps = useSlotProps({
        elementType: TabPanelRoot,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          role: "tabpanel",
          ref: forwardedRef
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime38.jsx)(TabPanelRoot, _extends({}, tabPanelRootProps, {
        children: !hidden && children
      }));
    });
    true ? TabPanel.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * The content of the component.
       */
      children: import_prop_types22.default.node,
      /**
       * The props used for each slot inside the TabPanel.
       * @default {}
       */
      slotProps: import_prop_types22.default.shape({
        root: import_prop_types22.default.oneOfType([import_prop_types22.default.func, import_prop_types22.default.object])
      }),
      /**
       * The components used for each slot inside the TabPanel.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types22.default.shape({
        root: import_prop_types22.default.elementType
      }),
      /**
       * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
       * If not provided, it will fall back to the index of the panel.
       * It is recommended to explicitly provide it, as it's required for the tab panel to be rendered on the server.
       */
      value: import_prop_types22.default.oneOfType([import_prop_types22.default.number, import_prop_types22.default.string])
    } : void 0;
  }
});

// node_modules/@mui/base/TabPanel/TabPanel.types.js
var init_TabPanel_types = __esm({
  "node_modules/@mui/base/TabPanel/TabPanel.types.js"() {
  }
});

// node_modules/@mui/base/TabPanel/index.js
var init_TabPanel2 = __esm({
  "node_modules/@mui/base/TabPanel/index.js"() {
    init_TabPanel();
    init_TabPanel_types();
    init_tabPanelClasses();
    init_tabPanelClasses();
  }
});

// node_modules/@mui/base/TabsList/tabsListClasses.js
function getTabsListUtilityClass(slot) {
  return generateUtilityClass("MuiTabsList", slot);
}
var tabsListClasses;
var init_tabsListClasses = __esm({
  "node_modules/@mui/base/TabsList/tabsListClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabsListClasses = generateUtilityClasses("MuiTabsList", ["root", "horizontal", "vertical"]);
  }
});

// node_modules/@mui/base/useTabsList/useTabsList.types.js
var TabsListActionTypes;
var init_useTabsList_types = __esm({
  "node_modules/@mui/base/useTabsList/useTabsList.types.js"() {
    TabsListActionTypes = {
      valueChange: "valueChange"
    };
  }
});

// node_modules/@mui/base/useTabsList/tabsListReducer.js
function tabsListReducer(state, action) {
  if (action.type === TabsListActionTypes.valueChange) {
    return _extends({}, state, {
      highlightedValue: action.value
    });
  }
  const newState = listReducer(state, action);
  const {
    context: {
      selectionFollowsFocus
    }
  } = action;
  if (action.type === ListActionTypes.itemsChange) {
    if (newState.selectedValues.length > 0) {
      return _extends({}, newState, {
        highlightedValue: newState.selectedValues[0]
      });
    }
    moveHighlight(null, "reset", action.context);
  }
  if (selectionFollowsFocus && newState.highlightedValue != null) {
    return _extends({}, newState, {
      selectedValues: [newState.highlightedValue]
    });
  }
  return newState;
}
var init_tabsListReducer = __esm({
  "node_modules/@mui/base/useTabsList/tabsListReducer.js"() {
    init_extends();
    init_useList2();
    init_useTabsList_types();
  }
});

// node_modules/@mui/base/useTabsList/useTabsList.js
function useTabsList(parameters) {
  var _selectedValues$;
  const {
    rootRef: externalRef
  } = parameters;
  const {
    direction = "ltr",
    onSelected,
    orientation = "horizontal",
    value,
    registerTabIdLookup,
    selectionFollowsFocus
  } = useTabsContext();
  const {
    subitems,
    contextValue: compoundComponentContextValue
  } = useCompoundParent();
  const tabIdLookup = React54.useCallback((tabValue) => {
    var _subitems$get;
    return (_subitems$get = subitems.get(tabValue)) == null ? void 0 : _subitems$get.id;
  }, [subitems]);
  registerTabIdLookup(tabIdLookup);
  const subitemKeys = React54.useMemo(() => Array.from(subitems.keys()), [subitems]);
  const getTabElement = React54.useCallback((tabValue) => {
    var _subitems$get$ref$cur, _subitems$get2;
    if (tabValue == null) {
      return null;
    }
    return (_subitems$get$ref$cur = (_subitems$get2 = subitems.get(tabValue)) == null ? void 0 : _subitems$get2.ref.current) != null ? _subitems$get$ref$cur : null;
  }, [subitems]);
  const isRtl = direction === "rtl";
  let listOrientation;
  if (orientation === "vertical") {
    listOrientation = "vertical";
  } else {
    listOrientation = isRtl ? "horizontal-rtl" : "horizontal-ltr";
  }
  const handleChange = React54.useCallback((event, newValue) => {
    var _newValue$;
    onSelected(event, (_newValue$ = newValue[0]) != null ? _newValue$ : null);
  }, [onSelected]);
  const controlledProps = React54.useMemo(() => {
    if (value === void 0) {
      return {};
    }
    return value != null ? {
      selectedValues: [value]
    } : {
      selectedValues: []
    };
  }, [value]);
  const isItemDisabled = React54.useCallback((item) => {
    var _subitems$get$disable, _subitems$get3;
    return (_subitems$get$disable = (_subitems$get3 = subitems.get(item)) == null ? void 0 : _subitems$get3.disabled) != null ? _subitems$get$disable : false;
  }, [subitems]);
  const {
    contextValue: listContextValue,
    dispatch,
    getRootProps: getListboxRootProps,
    state: {
      highlightedValue,
      selectedValues
    },
    rootRef: mergedRootRef
  } = useList_default({
    controlledProps,
    disabledItemsFocusable: !selectionFollowsFocus,
    focusManagement: "DOM",
    getItemDomElement: getTabElement,
    isItemDisabled,
    items: subitemKeys,
    rootRef: externalRef,
    onChange: handleChange,
    orientation: listOrientation,
    reducerActionContext: React54.useMemo(() => ({
      selectionFollowsFocus: selectionFollowsFocus || false
    }), [selectionFollowsFocus]),
    selectionMode: "single",
    stateReducer: tabsListReducer
  });
  React54.useEffect(() => {
    if (value === void 0) {
      return;
    }
    if (value != null) {
      dispatch({
        type: TabsListActionTypes.valueChange,
        value
      });
    }
  }, [dispatch, value]);
  const getRootProps = (otherHandlers = {}) => {
    return _extends({}, otherHandlers, getListboxRootProps(otherHandlers), {
      "aria-orientation": orientation === "vertical" ? "vertical" : void 0,
      role: "tablist"
    });
  };
  return {
    contextValue: _extends({}, compoundComponentContextValue, listContextValue),
    dispatch,
    getRootProps,
    highlightedValue,
    isRtl,
    orientation,
    rootRef: mergedRootRef,
    selectedValue: (_selectedValues$ = selectedValues[0]) != null ? _selectedValues$ : null
  };
}
var React54, useTabsList_default;
var init_useTabsList = __esm({
  "node_modules/@mui/base/useTabsList/useTabsList.js"() {
    init_extends();
    React54 = __toESM(require_react());
    init_Tabs2();
    init_useTabsList_types();
    init_useCompound();
    init_useList2();
    init_tabsListReducer();
    useTabsList_default = useTabsList;
  }
});

// node_modules/@mui/base/useTabsList/TabsListProvider.js
function TabsListProvider(props) {
  const {
    value,
    children
  } = props;
  const {
    dispatch,
    getItemIndex,
    getItemState,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
    registerItem,
    totalSubitemCount
  } = value;
  const listContextValue = React55.useMemo(() => ({
    dispatch,
    getItemState,
    getItemIndex,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler
  }), [dispatch, getItemIndex, getItemState, registerHighlightChangeHandler, registerSelectionChangeHandler]);
  const compoundComponentContextValue = React55.useMemo(() => ({
    getItemIndex,
    registerItem,
    totalSubitemCount
  }), [registerItem, getItemIndex, totalSubitemCount]);
  return (0, import_jsx_runtime39.jsx)(CompoundComponentContext.Provider, {
    value: compoundComponentContextValue,
    children: (0, import_jsx_runtime39.jsx)(ListContext.Provider, {
      value: listContextValue,
      children
    })
  });
}
var React55, import_jsx_runtime39;
var init_TabsListProvider = __esm({
  "node_modules/@mui/base/useTabsList/TabsListProvider.js"() {
    React55 = __toESM(require_react());
    init_ListContext();
    init_useCompound();
    import_jsx_runtime39 = __toESM(require_jsx_runtime());
  }
});

// node_modules/@mui/base/useTabsList/index.js
var init_useTabsList2 = __esm({
  "node_modules/@mui/base/useTabsList/index.js"() {
    init_useTabsList();
    init_useTabsList_types();
    init_TabsListProvider();
    init_TabsListProvider();
  }
});

// node_modules/@mui/base/TabsList/TabsList.js
var React56, import_prop_types23, import_jsx_runtime40, _excluded21, useUtilityClasses18, TabsList;
var init_TabsList = __esm({
  "node_modules/@mui/base/TabsList/TabsList.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React56 = __toESM(require_react());
    import_prop_types23 = __toESM(require_prop_types());
    init_composeClasses();
    init_utils();
    init_tabsListClasses();
    init_useTabsList2();
    init_ClassNameConfigurator();
    init_TabsListProvider();
    import_jsx_runtime40 = __toESM(require_jsx_runtime());
    _excluded21 = ["children", "slotProps", "slots"];
    useUtilityClasses18 = (ownerState) => {
      const {
        orientation
      } = ownerState;
      const slots = {
        root: ["root", orientation]
      };
      return composeClasses(slots, useClassNamesOverride(getTabsListUtilityClass));
    };
    TabsList = React56.forwardRef(function TabsList2(props, forwardedRef) {
      var _slots$root;
      const {
        children,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded21);
      const {
        isRtl,
        orientation,
        getRootProps,
        contextValue
      } = useTabsList_default({
        rootRef: forwardedRef
      });
      const ownerState = _extends({}, props, {
        isRtl,
        orientation
      });
      const classes = useUtilityClasses18(ownerState);
      const TabsListRoot = (_slots$root = slots.root) != null ? _slots$root : "div";
      const tabsListRootProps = useSlotProps({
        elementType: TabsListRoot,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime40.jsx)(TabsListProvider, {
        value: contextValue,
        children: (0, import_jsx_runtime40.jsx)(TabsListRoot, _extends({}, tabsListRootProps, {
          children
        }))
      });
    });
    true ? TabsList.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * The content of the component.
       */
      children: import_prop_types23.default.node,
      /**
       * The props used for each slot inside the TabsList.
       * @default {}
       */
      slotProps: import_prop_types23.default.shape({
        root: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object])
      }),
      /**
       * The components used for each slot inside the TabsList.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types23.default.shape({
        root: import_prop_types23.default.elementType
      })
    } : void 0;
  }
});

// node_modules/@mui/base/TabsList/TabsList.types.js
var init_TabsList_types = __esm({
  "node_modules/@mui/base/TabsList/TabsList.types.js"() {
  }
});

// node_modules/@mui/base/TabsList/index.js
var init_TabsList2 = __esm({
  "node_modules/@mui/base/TabsList/index.js"() {
    init_TabsList();
    init_TabsList_types();
    init_tabsListClasses();
    init_tabsListClasses();
  }
});

// node_modules/@mui/base/Tab/tabClasses.js
function getTabUtilityClass(slot) {
  return generateUtilityClass("MuiTab", slot);
}
var tabClasses;
var init_tabClasses = __esm({
  "node_modules/@mui/base/Tab/tabClasses.js"() {
    init_generateUtilityClass();
    init_generateUtilityClasses();
    tabClasses = generateUtilityClasses("MuiTab", ["root", "selected", "disabled"]);
  }
});

// node_modules/@mui/base/useTab/useTab.js
function tabValueGenerator(otherTabValues) {
  return otherTabValues.size;
}
function useTab(parameters) {
  const {
    value: valueParam,
    rootRef: externalRef,
    disabled = false,
    id: idParam
  } = parameters;
  const tabRef = React57.useRef(null);
  const id = useId(idParam);
  const {
    value: selectedValue,
    selectionFollowsFocus,
    getTabPanelId
  } = useTabsContext();
  const tabMetadata = React57.useMemo(() => ({
    disabled,
    ref: tabRef,
    id
  }), [disabled, tabRef, id]);
  const {
    id: value,
    index,
    totalItemCount: totalTabsCount
  } = useCompoundItem(valueParam != null ? valueParam : tabValueGenerator, tabMetadata);
  const {
    getRootProps: getTabProps,
    rootRef: listItemRefHandler,
    highlighted,
    selected
  } = useListItem({
    item: value
  });
  const {
    getRootProps: getButtonProps,
    rootRef: buttonRefHandler,
    active,
    focusVisible,
    setFocusVisible
  } = useButton({
    disabled,
    focusableWhenDisabled: !selectionFollowsFocus,
    type: "button"
  });
  const handleRef = useForkRef(tabRef, externalRef, listItemRefHandler, buttonRefHandler);
  const tabPanelId = value !== void 0 ? getTabPanelId(value) : void 0;
  const getRootProps = (otherHandlers = {}) => {
    const resolvedTabProps = _extends({}, otherHandlers, getTabProps(otherHandlers));
    const resolvedButtonProps = _extends({}, resolvedTabProps, getButtonProps(resolvedTabProps));
    return _extends({}, resolvedButtonProps, {
      role: "tab",
      "aria-controls": tabPanelId,
      "aria-selected": selected,
      id,
      ref: handleRef
    });
  };
  return {
    getRootProps,
    active,
    focusVisible,
    highlighted,
    index,
    rootRef: handleRef,
    // the `selected` state isn't set on the server (it relies on effects to be calculated),
    // so we fall back to checking the `value` prop with the selectedValue from the TabsContext
    selected: selected || value === selectedValue,
    setFocusVisible,
    totalTabsCount
  };
}
var React57, useTab_default;
var init_useTab = __esm({
  "node_modules/@mui/base/useTab/useTab.js"() {
    init_extends();
    React57 = __toESM(require_react());
    init_esm();
    init_Tabs2();
    init_useCompoundItem();
    init_useList2();
    init_useButton2();
    useTab_default = useTab;
  }
});

// node_modules/@mui/base/useTab/useTab.types.js
var init_useTab_types = __esm({
  "node_modules/@mui/base/useTab/useTab.types.js"() {
  }
});

// node_modules/@mui/base/useTab/index.js
var init_useTab2 = __esm({
  "node_modules/@mui/base/useTab/index.js"() {
    init_useTab();
    init_useTab_types();
  }
});

// node_modules/@mui/base/Tab/Tab.js
var React58, import_prop_types24, import_jsx_runtime41, _excluded23, useUtilityClasses19, Tab;
var init_Tab = __esm({
  "node_modules/@mui/base/Tab/Tab.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    React58 = __toESM(require_react());
    import_prop_types24 = __toESM(require_prop_types());
    init_esm();
    init_composeClasses();
    init_tabClasses();
    init_useTab2();
    init_utils();
    init_ClassNameConfigurator();
    import_jsx_runtime41 = __toESM(require_jsx_runtime());
    _excluded23 = ["action", "children", "value", "disabled", "onChange", "onClick", "onFocus", "slotProps", "slots"];
    useUtilityClasses19 = (ownerState) => {
      const {
        selected,
        disabled
      } = ownerState;
      const slots = {
        root: ["root", selected && "selected", disabled && "disabled"]
      };
      return composeClasses(slots, useClassNamesOverride(getTabUtilityClass));
    };
    Tab = React58.forwardRef(function Tab2(props, forwardedRef) {
      var _slots$root;
      const {
        children,
        disabled = false,
        slotProps = {},
        slots = {}
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded23);
      const tabRef = React58.useRef();
      const handleRef = useForkRef(tabRef, forwardedRef);
      const {
        active,
        highlighted,
        selected,
        getRootProps
      } = useTab_default(_extends({}, props, {
        rootRef: handleRef
      }));
      const ownerState = _extends({}, props, {
        active,
        disabled,
        highlighted,
        selected
      });
      const classes = useUtilityClasses19(ownerState);
      const TabRoot = (_slots$root = slots.root) != null ? _slots$root : "button";
      const tabRootProps = useSlotProps({
        elementType: TabRoot,
        getSlotProps: getRootProps,
        externalSlotProps: slotProps.root,
        externalForwardedProps: other,
        additionalProps: {
          ref: forwardedRef
        },
        ownerState,
        className: classes.root
      });
      return (0, import_jsx_runtime41.jsx)(TabRoot, _extends({}, tabRootProps, {
        children
      }));
    });
    true ? Tab.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit TypeScript types and run "yarn proptypes"  |
      // ----------------------------------------------------------------------
      /**
       * A ref for imperative actions. It currently only supports `focusVisible()` action.
       */
      action: import_prop_types24.default.oneOfType([import_prop_types24.default.func, import_prop_types24.default.shape({
        current: import_prop_types24.default.shape({
          focusVisible: import_prop_types24.default.func.isRequired
        })
      })]),
      /**
       * @ignore
       */
      children: import_prop_types24.default.node,
      /**
       * If `true`, the component is disabled.
       * @default false
       */
      disabled: import_prop_types24.default.bool,
      /**
       * Callback invoked when new value is being set.
       */
      onChange: import_prop_types24.default.func,
      /**
       * The props used for each slot inside the Tab.
       * @default {}
       */
      slotProps: import_prop_types24.default.shape({
        root: import_prop_types24.default.oneOfType([import_prop_types24.default.func, import_prop_types24.default.object])
      }),
      /**
       * The components used for each slot inside the Tab.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      slots: import_prop_types24.default.shape({
        root: import_prop_types24.default.elementType
      }),
      /**
       * You can provide your own value. Otherwise, it falls back to the child position index.
       */
      value: import_prop_types24.default.oneOfType([import_prop_types24.default.number, import_prop_types24.default.string])
    } : void 0;
  }
});

// node_modules/@mui/base/Tab/Tab.types.js
var init_Tab_types = __esm({
  "node_modules/@mui/base/Tab/Tab.types.js"() {
  }
});

// node_modules/@mui/base/Tab/index.js
var init_Tab2 = __esm({
  "node_modules/@mui/base/Tab/index.js"() {
    init_Tab();
    init_Tab_types();
    init_tabClasses();
    init_tabClasses();
  }
});

// node_modules/@mui/base/useTabPanel/useTabPanel.types.js
var init_useTabPanel_types = __esm({
  "node_modules/@mui/base/useTabPanel/useTabPanel.types.js"() {
  }
});

// node_modules/@mui/base/useTabPanel/index.js
var init_useTabPanel2 = __esm({
  "node_modules/@mui/base/useTabPanel/index.js"() {
    init_useTabPanel();
    init_useTabPanel_types();
  }
});

// node_modules/@mui/base/index.js
var init_base = __esm({
  "node_modules/@mui/base/index.js"() {
    init_utils();
    init_Badge2();
    init_Badge2();
    init_Button2();
    init_Button2();
    init_ClickAwayListener2();
    init_composeClasses();
    init_FocusTrap2();
    init_FormControl2();
    init_FormControl2();
    init_Input2();
    init_Input2();
    init_Menu2();
    init_Menu2();
    init_MenuItem2();
    init_MenuItem2();
    init_Modal2();
    init_Modal2();
    init_NoSsr2();
    init_OptionGroup2();
    init_OptionGroup2();
    init_Option2();
    init_Option2();
    init_Popper2();
    init_Portal2();
    init_Select2();
    init_Select2();
    init_Slider2();
    init_Slider2();
    init_Snackbar2();
    init_Snackbar2();
    init_Switch2();
    init_Switch2();
    init_TablePagination2();
    init_TablePagination2();
    init_TabPanel2();
    init_TabPanel2();
    init_TabsList2();
    init_TabsList2();
    init_Tabs2();
    init_Tabs2();
    init_Tab2();
    init_Tab2();
    init_TextareaAutosize2();
    init_useAutocomplete2();
    init_useAutocomplete2();
    init_useBadge2();
    init_useBadge2();
    init_useButton2();
    init_useButton2();
    init_useInput2();
    init_useInput2();
    init_useMenu2();
    init_useMenu2();
    init_useMenuItem2();
    init_useMenuItem2();
    init_useOption2();
    init_useOption2();
    init_useSelect2();
    init_useSelect2();
    init_useSlider2();
    init_useSlider2();
    init_useSnackbar2();
    init_useSnackbar2();
    init_useSwitch2();
    init_useSwitch2();
    init_useTab2();
    init_useTab2();
    init_useTabPanel2();
    init_useTabPanel2();
    init_useTabs2();
    init_useTabs2();
    init_useTabsList2();
    init_useTabsList2();
  }
});

export {
  isHostComponent,
  appendOwnerState,
  resolveComponentProps,
  useSlotProps,
  init_utils,
  init_composeClasses,
  useBadge,
  init_useBadge2 as init_useBadge,
  ClickAwayListener_default,
  init_ClickAwayListener2 as init_ClickAwayListener,
  FocusTrap_default,
  init_FocusTrap2 as init_FocusTrap,
  Portal_default,
  init_Portal2 as init_Portal,
  Popper_default,
  init_Popper2 as init_Popper,
  ModalManager,
  modalClasses_default,
  Modal_default,
  init_Modal2 as init_Modal,
  NoSsr_default,
  init_NoSsr2 as init_NoSsr,
  valueToPercent,
  useSlider,
  init_useSlider2 as init_useSlider,
  useSnackbar,
  init_useSnackbar2 as init_useSnackbar,
  TextareaAutosize_default,
  init_TextareaAutosize2 as init_TextareaAutosize,
  createFilterOptions,
  useAutocomplete,
  init_useAutocomplete2 as init_useAutocomplete,
  init_base
};
/*! Bundled license information:

@mui/base/index.js:
  (**
   * @mui/base v5.0.0-beta.5
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-4CIOFCYC.js.map
