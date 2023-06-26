import {
  Paper_default
} from "./chunk-R4PJJIR7.js";
import {
  Transition_default
} from "./chunk-34NB6AQF.js";
import {
  useTheme
} from "./chunk-ZZCSORRT.js";
import {
  debounce_default,
  init_debounce,
  init_ownerDocument,
  init_ownerWindow,
  ownerDocument_default,
  ownerWindow_default
} from "./chunk-46G7BM2F.js";
import {
  init_useForkRef,
  useForkRef_default
} from "./chunk-R77QINRK.js";
import {
  Modal_default,
  init_Modal,
  init_base,
  init_utils,
  isHostComponent,
  modalClasses_default,
  resolveComponentProps,
  useSlotProps
} from "./chunk-4CIOFCYC.js";
import {
  init_generateUtilityClass,
  init_styled,
  init_useThemeProps,
  styled_default,
  useThemeProps
} from "./chunk-WZWG6CUY.js";
import {
  clsx_m_default,
  init_clsx_m
} from "./chunk-XWRMNTVH.js";
import {
  HTMLElementType,
  chainPropTypes,
  composeClasses,
  elementAcceptingRef_default,
  elementTypeAcceptingRef_default,
  generateUtilityClass,
  generateUtilityClasses,
  init_esm,
  integerPropType_default,
  refType_default,
  require_jsx_runtime
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
  __toESM
} from "./chunk-LFBQMW2U.js";

// node_modules/@mui/material/Popover/Popover.js
init_extends();
init_objectWithoutPropertiesLoose();
var React5 = __toESM(require_react());
var import_prop_types5 = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_esm();
init_styled();
init_useThemeProps();
init_debounce();
init_ownerDocument();
init_ownerWindow();
init_useForkRef();

// node_modules/@mui/material/Grow/Grow.js
init_extends();
init_objectWithoutPropertiesLoose();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_esm();

// node_modules/@mui/material/transitions/utils.js
var reflow = (node) => node.scrollTop;
function getTransitionProps(props, options) {
  var _style$transitionDura, _style$transitionTimi;
  const {
    timeout,
    easing,
    style = {}
  } = props;
  return {
    duration: (_style$transitionDura = style.transitionDuration) != null ? _style$transitionDura : typeof timeout === "number" ? timeout : timeout[options.mode] || 0,
    easing: (_style$transitionTimi = style.transitionTimingFunction) != null ? _style$transitionTimi : typeof easing === "object" ? easing[options.mode] : easing,
    delay: style.transitionDelay
  };
}

// node_modules/@mui/material/Grow/Grow.js
init_useForkRef();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function getScale(value) {
  return `scale(${value}, ${value ** 2})`;
}
var styles = {
  entering: {
    opacity: 1,
    transform: getScale(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
};
var isWebKit154 = typeof navigator !== "undefined" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent);
var Grow = React.forwardRef(function Grow2(props, ref) {
  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition_default
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const timer = React.useRef();
  const autoTimeout = React.useRef();
  const theme = useTheme();
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef_default(nodeRef, children.ref, ref);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node);
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "enter"
    });
    let duration;
    if (timeout === "auto") {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }
    node.style.transition = [theme.transitions.create("opacity", {
      duration,
      delay
    }), theme.transitions.create("transform", {
      duration: isWebKit154 ? duration : duration * 0.666,
      delay,
      easing: transitionTimingFunction
    })].join(",");
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node) => {
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "exit"
    });
    let duration;
    if (timeout === "auto") {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }
    node.style.transition = [theme.transitions.create("opacity", {
      duration,
      delay
    }), theme.transitions.create("transform", {
      duration: isWebKit154 ? duration : duration * 0.666,
      delay: isWebKit154 ? delay : delay || duration * 0.333,
      easing: transitionTimingFunction
    })].join(",");
    node.style.opacity = 0;
    node.style.transform = getScale(0.75);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next) => {
    if (timeout === "auto") {
      timer.current = setTimeout(next, autoTimeout.current || 0);
    }
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  return (0, import_jsx_runtime.jsx)(TransitionComponent, _extends({
    appear,
    in: inProp,
    nodeRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout: timeout === "auto" ? null : timeout
  }, other, {
    children: (state, childProps) => {
      return React.cloneElement(children, _extends({
        style: _extends({
          opacity: 0,
          transform: getScale(0.75),
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, styles[state], style, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
true ? Grow.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: import_prop_types.default.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: import_prop_types.default.bool,
  /**
   * A single child content element.
   */
  children: elementAcceptingRef_default.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: import_prop_types.default.oneOfType([import_prop_types.default.shape({
    enter: import_prop_types.default.string,
    exit: import_prop_types.default.string
  }), import_prop_types.default.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: import_prop_types.default.bool,
  /**
   * @ignore
   */
  onEnter: import_prop_types.default.func,
  /**
   * @ignore
   */
  onEntered: import_prop_types.default.func,
  /**
   * @ignore
   */
  onEntering: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExit: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExited: import_prop_types.default.func,
  /**
   * @ignore
   */
  onExiting: import_prop_types.default.func,
  /**
   * @ignore
   */
  style: import_prop_types.default.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["auto"]), import_prop_types.default.number, import_prop_types.default.shape({
    appear: import_prop_types.default.number,
    enter: import_prop_types.default.number,
    exit: import_prop_types.default.number
  })])
} : void 0;
Grow.muiSupportAuto = true;
var Grow_default = Grow;

// node_modules/@mui/material/Modal/index.js
init_Modal();

// node_modules/@mui/material/Modal/Modal.js
init_objectWithoutPropertiesLoose();
init_extends();
var React4 = __toESM(require_react());
var import_prop_types4 = __toESM(require_prop_types());
init_clsx_m();
init_Modal();
init_utils();
init_esm();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/Backdrop/Backdrop.js
init_objectWithoutPropertiesLoose();
init_extends();
var React3 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());
init_clsx_m();
init_base();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/Fade/Fade.js
init_extends();
init_objectWithoutPropertiesLoose();
var React2 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
init_esm();
init_useForkRef();
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded2 = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
var styles2 = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};
var Fade = React2.forwardRef(function Fade2(props, ref) {
  const theme = useTheme();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition_default
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const enableStrictModeCompat = true;
  const nodeRef = React2.useRef(null);
  const handleRef = useForkRef_default(nodeRef, children.ref, ref);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node);
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "enter"
    });
    node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node) => {
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "exit"
    });
    node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next) => {
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  return (0, import_jsx_runtime2.jsx)(TransitionComponent, _extends({
    appear,
    in: inProp,
    nodeRef: enableStrictModeCompat ? nodeRef : void 0,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout
  }, other, {
    children: (state, childProps) => {
      return React2.cloneElement(children, _extends({
        style: _extends({
          opacity: 0,
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, styles2[state], style, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
true ? Fade.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: import_prop_types2.default.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: import_prop_types2.default.bool,
  /**
   * A single child content element.
   */
  children: elementAcceptingRef_default.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: import_prop_types2.default.oneOfType([import_prop_types2.default.shape({
    enter: import_prop_types2.default.string,
    exit: import_prop_types2.default.string
  }), import_prop_types2.default.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: import_prop_types2.default.bool,
  /**
   * @ignore
   */
  onEnter: import_prop_types2.default.func,
  /**
   * @ignore
   */
  onEntered: import_prop_types2.default.func,
  /**
   * @ignore
   */
  onEntering: import_prop_types2.default.func,
  /**
   * @ignore
   */
  onExit: import_prop_types2.default.func,
  /**
   * @ignore
   */
  onExited: import_prop_types2.default.func,
  /**
   * @ignore
   */
  onExiting: import_prop_types2.default.func,
  /**
   * @ignore
   */
  style: import_prop_types2.default.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: import_prop_types2.default.oneOfType([import_prop_types2.default.number, import_prop_types2.default.shape({
    appear: import_prop_types2.default.number,
    enter: import_prop_types2.default.number,
    exit: import_prop_types2.default.number
  })])
} : void 0;
var Fade_default = Fade;

// node_modules/@mui/material/Backdrop/backdropClasses.js
init_esm();
init_generateUtilityClass();
function getBackdropUtilityClass(slot) {
  return generateUtilityClass("MuiBackdrop", slot);
}
var backdropClasses = generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
var backdropClasses_default = backdropClasses;

// node_modules/@mui/material/Backdrop/Backdrop.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var _excluded3 = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ["root", invisible && "invisible"]
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};
var BackdropRoot = styled_default("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.root, ownerState.invisible && styles3.invisible];
  }
})(({
  ownerState
}) => _extends({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent"
}, ownerState.invisible && {
  backgroundColor: "transparent"
}));
var Backdrop = React3.forwardRef(function Backdrop2(inProps, ref) {
  var _slotProps$root, _ref, _slots$root;
  const props = useThemeProps({
    props: inProps,
    name: "MuiBackdrop"
  });
  const {
    children,
    className,
    component = "div",
    components = {},
    componentsProps = {},
    invisible = false,
    open,
    slotProps = {},
    slots = {},
    TransitionComponent = Fade_default,
    transitionDuration
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  const ownerState = _extends({}, props, {
    component,
    invisible
  });
  const classes = useUtilityClasses(ownerState);
  const rootSlotProps = (_slotProps$root = slotProps.root) != null ? _slotProps$root : componentsProps.root;
  return (0, import_jsx_runtime3.jsx)(TransitionComponent, _extends({
    in: open,
    timeout: transitionDuration
  }, other, {
    children: (0, import_jsx_runtime3.jsx)(BackdropRoot, _extends({
      "aria-hidden": true
    }, rootSlotProps, {
      as: (_ref = (_slots$root = slots.root) != null ? _slots$root : components.Root) != null ? _ref : component,
      className: clsx_m_default(classes.root, className, rootSlotProps == null ? void 0 : rootSlotProps.className),
      ownerState: _extends({}, ownerState, rootSlotProps == null ? void 0 : rootSlotProps.ownerState),
      classes,
      ref,
      children
    }))
  }));
});
true ? Backdrop.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: import_prop_types3.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types3.default.object,
  /**
   * @ignore
   */
  className: import_prop_types3.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types3.default.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: import_prop_types3.default.shape({
    Root: import_prop_types3.default.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: import_prop_types3.default.shape({
    root: import_prop_types3.default.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: import_prop_types3.default.bool,
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types3.default.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: import_prop_types3.default.shape({
    root: import_prop_types3.default.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: import_prop_types3.default.shape({
    root: import_prop_types3.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: import_prop_types3.default.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.shape({
    appear: import_prop_types3.default.number,
    enter: import_prop_types3.default.number,
    exit: import_prop_types3.default.number
  })])
} : void 0;
var Backdrop_default = Backdrop;

// node_modules/@mui/material/Modal/Modal.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var _excluded4 = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "open", "slotProps", "slots", "theme"];
var modalClasses = modalClasses_default;
var ModalRoot = styled_default("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (props, styles3) => {
    const {
      ownerState
    } = props;
    return [styles3.root, !ownerState.open && ownerState.exited && styles3.hidden];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: "fixed",
  zIndex: (theme.vars || theme).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !ownerState.open && ownerState.exited && {
  visibility: "hidden"
}));
var ModalBackdrop = styled_default(Backdrop_default, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (props, styles3) => {
    return styles3.backdrop;
  }
})({
  zIndex: -1
});
var Modal = React4.forwardRef(function Modal2(inProps, ref) {
  var _ref, _slots$root, _ref2, _slots$backdrop, _slotProps$root, _slotProps$backdrop;
  const props = useThemeProps({
    name: "MuiModal",
    props: inProps
  });
  const {
    BackdropComponent = ModalBackdrop,
    BackdropProps,
    classes,
    className,
    closeAfterTransition = false,
    children,
    container,
    component,
    components = {},
    componentsProps = {},
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onBackdropClick,
    onClose,
    open,
    slotProps,
    slots,
    // eslint-disable-next-line react/prop-types
    theme
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
  const [exited, setExited] = React4.useState(true);
  const commonProps = {
    container,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted,
    onBackdropClick,
    onClose,
    open
  };
  const ownerState = _extends({}, props, commonProps, {
    exited
  });
  const RootSlot = (_ref = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : components.Root) != null ? _ref : ModalRoot;
  const BackdropSlot = (_ref2 = (_slots$backdrop = slots == null ? void 0 : slots.backdrop) != null ? _slots$backdrop : components.Backdrop) != null ? _ref2 : BackdropComponent;
  const rootSlotProps = (_slotProps$root = slotProps == null ? void 0 : slotProps.root) != null ? _slotProps$root : componentsProps.root;
  const backdropSlotProps = (_slotProps$backdrop = slotProps == null ? void 0 : slotProps.backdrop) != null ? _slotProps$backdrop : componentsProps.backdrop;
  return (0, import_jsx_runtime4.jsx)(Modal_default, _extends({
    slots: {
      root: RootSlot,
      backdrop: BackdropSlot
    },
    slotProps: {
      root: () => _extends({}, resolveComponentProps(rootSlotProps, ownerState), !isHostComponent(RootSlot) && {
        as: component,
        theme
      }, {
        className: clsx_m_default(className, rootSlotProps == null ? void 0 : rootSlotProps.className, classes == null ? void 0 : classes.root, !ownerState.open && ownerState.exited && (classes == null ? void 0 : classes.hidden))
      }),
      backdrop: () => _extends({}, BackdropProps, resolveComponentProps(backdropSlotProps, ownerState), {
        className: clsx_m_default(backdropSlotProps == null ? void 0 : backdropSlotProps.className, BackdropProps == null ? void 0 : BackdropProps.className, classes == null ? void 0 : classes.backdrop)
      })
    },
    onTransitionEnter: () => setExited(false),
    onTransitionExited: () => setExited(true),
    ref
  }, other, commonProps, {
    children
  }));
});
true ? Modal.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: import_prop_types4.default.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: import_prop_types4.default.object,
  /**
   * A single child content element.
   */
  children: elementAcceptingRef_default.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types4.default.object,
  /**
   * @ignore
   */
  className: import_prop_types4.default.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: import_prop_types4.default.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types4.default.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: import_prop_types4.default.shape({
    Backdrop: import_prop_types4.default.elementType,
    Root: import_prop_types4.default.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: import_prop_types4.default.shape({
    backdrop: import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object]),
    root: import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object])
  }),
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
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types4.default.oneOfType([import_prop_types4.default.arrayOf(import_prop_types4.default.oneOfType([import_prop_types4.default.func, import_prop_types4.default.object, import_prop_types4.default.bool])), import_prop_types4.default.func, import_prop_types4.default.object])
} : void 0;
var Modal_default2 = Modal;

// node_modules/@mui/material/Popover/popoverClasses.js
init_esm();
init_generateUtilityClass();
function getPopoverUtilityClass(slot) {
  return generateUtilityClass("MuiPopover", slot);
}
var popoverClasses = generateUtilityClasses("MuiPopover", ["root", "paper"]);
var popoverClasses_default = popoverClasses;

// node_modules/@mui/material/Popover/Popover.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var _excluded5 = ["onEntering"];
var _excluded22 = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps"];
var _excluded32 = ["slotProps"];
function getOffsetTop(rect, vertical) {
  let offset = 0;
  if (typeof vertical === "number") {
    offset = vertical;
  } else if (vertical === "center") {
    offset = rect.height / 2;
  } else if (vertical === "bottom") {
    offset = rect.height;
  }
  return offset;
}
function getOffsetLeft(rect, horizontal) {
  let offset = 0;
  if (typeof horizontal === "number") {
    offset = horizontal;
  } else if (horizontal === "center") {
    offset = rect.width / 2;
  } else if (horizontal === "right") {
    offset = rect.width;
  }
  return offset;
}
function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map((n) => typeof n === "number" ? `${n}px` : n).join(" ");
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
var useUtilityClasses2 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"]
  };
  return composeClasses(slots, getPopoverUtilityClass, classes);
};
var PopoverRoot = styled_default(Modal_default2, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (props, styles3) => styles3.root
})({});
var PopoverPaper = styled_default(Paper_default, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (props, styles3) => styles3.paper
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
});
var Popover = React5.forwardRef(function Popover2(inProps, ref) {
  var _slotProps$paper, _slots$root, _slots$paper;
  const props = useThemeProps({
    props: inProps,
    name: "MuiPopover"
  });
  const {
    action,
    anchorEl,
    anchorOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition,
    anchorReference = "anchorEl",
    children,
    className,
    container: containerProp,
    elevation = 8,
    marginThreshold = 16,
    open,
    PaperProps: PaperPropsProp = {},
    slots,
    slotProps,
    transformOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent = Grow_default,
    transitionDuration: transitionDurationProp = "auto",
    TransitionProps: {
      onEntering
    } = {}
  } = props, TransitionProps = _objectWithoutPropertiesLoose(props.TransitionProps, _excluded5), other = _objectWithoutPropertiesLoose(props, _excluded22);
  const externalPaperSlotProps = (_slotProps$paper = slotProps == null ? void 0 : slotProps.paper) != null ? _slotProps$paper : PaperPropsProp;
  const paperRef = React5.useRef();
  const handlePaperRef = useForkRef_default(paperRef, externalPaperSlotProps.ref);
  const ownerState = _extends({}, props, {
    anchorOrigin,
    anchorReference,
    elevation,
    marginThreshold,
    externalPaperSlotProps,
    transformOrigin,
    TransitionComponent,
    transitionDuration: transitionDurationProp,
    TransitionProps
  });
  const classes = useUtilityClasses2(ownerState);
  const getAnchorOffset = React5.useCallback(() => {
    if (anchorReference === "anchorPosition") {
      if (true) {
        if (!anchorPosition) {
          console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.');
        }
      }
      return anchorPosition;
    }
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    const anchorElement = resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument_default(paperRef.current).body;
    const anchorRect = anchorElement.getBoundingClientRect();
    if (true) {
      const box = anchorElement.getBoundingClientRect();
      if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
        console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
      }
    }
    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference]);
  const getTransformOrigin = React5.useCallback((elemRect) => {
    return {
      vertical: getOffsetTop(elemRect, transformOrigin.vertical),
      horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
    };
  }, [transformOrigin.horizontal, transformOrigin.vertical]);
  const getPositioningStyle = React5.useCallback((element) => {
    const elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
    const elemTransformOrigin = getTransformOrigin(elemRect);
    if (anchorReference === "none") {
      return {
        top: null,
        left: null,
        transformOrigin: getTransformOriginValue(elemTransformOrigin)
      };
    }
    const anchorOffset = getAnchorOffset();
    let top = anchorOffset.top - elemTransformOrigin.vertical;
    let left = anchorOffset.left - elemTransformOrigin.horizontal;
    const bottom = top + elemRect.height;
    const right = left + elemRect.width;
    const containerWindow = ownerWindow_default(resolveAnchorEl(anchorEl));
    const heightThreshold = containerWindow.innerHeight - marginThreshold;
    const widthThreshold = containerWindow.innerWidth - marginThreshold;
    if (top < marginThreshold) {
      const diff = top - marginThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    } else if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    }
    if (true) {
      if (elemRect.height > heightThreshold && elemRect.height && heightThreshold) {
        console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${elemRect.height - heightThreshold}px).`, "Please consider adding a `max-height` to improve the user-experience."].join("\n"));
      }
    }
    if (left < marginThreshold) {
      const diff = left - marginThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    }
    return {
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      transformOrigin: getTransformOriginValue(elemTransformOrigin)
    };
  }, [anchorEl, anchorReference, getAnchorOffset, getTransformOrigin, marginThreshold]);
  const [isPositioned, setIsPositioned] = React5.useState(open);
  const setPositioningStyles = React5.useCallback(() => {
    const element = paperRef.current;
    if (!element) {
      return;
    }
    const positioning = getPositioningStyle(element);
    if (positioning.top !== null) {
      element.style.top = positioning.top;
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
    setIsPositioned(true);
  }, [getPositioningStyle]);
  const handleEntering = (element, isAppearing) => {
    if (onEntering) {
      onEntering(element, isAppearing);
    }
    setPositioningStyles();
  };
  const handleExited = () => {
    setIsPositioned(false);
  };
  React5.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });
  React5.useImperativeHandle(action, () => open ? {
    updatePosition: () => {
      setPositioningStyles();
    }
  } : null, [open, setPositioningStyles]);
  React5.useEffect(() => {
    if (!open) {
      return void 0;
    }
    const handleResize = debounce_default(() => {
      setPositioningStyles();
    });
    const containerWindow = ownerWindow_default(anchorEl);
    containerWindow.addEventListener("resize", handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
    };
  }, [anchorEl, open, setPositioningStyles]);
  let transitionDuration = transitionDurationProp;
  if (transitionDurationProp === "auto" && !TransitionComponent.muiSupportAuto) {
    transitionDuration = void 0;
  }
  const container = containerProp || (anchorEl ? ownerDocument_default(resolveAnchorEl(anchorEl)).body : void 0);
  const RootSlot = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : PopoverRoot;
  const PaperSlot = (_slots$paper = slots == null ? void 0 : slots.paper) != null ? _slots$paper : PopoverPaper;
  const paperProps = useSlotProps({
    elementType: PaperSlot,
    externalSlotProps: _extends({}, externalPaperSlotProps, {
      style: isPositioned ? externalPaperSlotProps.style : _extends({}, externalPaperSlotProps.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation,
      ref: handlePaperRef
    },
    ownerState,
    className: clsx_m_default(classes.paper, externalPaperSlotProps == null ? void 0 : externalPaperSlotProps.className)
  });
  const _useSlotProps = useSlotProps({
    elementType: RootSlot,
    externalSlotProps: (slotProps == null ? void 0 : slotProps.root) || {},
    externalForwardedProps: other,
    additionalProps: {
      ref,
      slotProps: {
        backdrop: {
          invisible: true
        }
      },
      container,
      open
    },
    ownerState,
    className: clsx_m_default(classes.root, className)
  }), {
    slotProps: rootSlotPropsProp
  } = _useSlotProps, rootProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded32);
  return (0, import_jsx_runtime5.jsx)(RootSlot, _extends({}, rootProps, !isHostComponent(RootSlot) && {
    slotProps: rootSlotPropsProp
  }, {
    children: (0, import_jsx_runtime5.jsx)(TransitionComponent, _extends({
      appear: true,
      in: open,
      onEntering: handleEntering,
      onExited: handleExited,
      timeout: transitionDuration
    }, TransitionProps, {
      children: (0, import_jsx_runtime5.jsx)(PaperSlot, _extends({}, paperProps, {
        children
      }))
    }))
  }));
});
true ? Popover.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: refType_default,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: chainPropTypes(import_prop_types5.default.oneOfType([HTMLElementType, import_prop_types5.default.func]), (props) => {
    if (props.open && (!props.anchorReference || props.anchorReference === "anchorEl")) {
      const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();
        if (box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
        }
      } else {
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", `It should be an Element or PopoverVirtualElement instance but it's \`${resolvedAnchorEl}\` instead.`].join("\n"));
      }
    }
    return null;
  }),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin: import_prop_types5.default.shape({
    horizontal: import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["center", "left", "right"]), import_prop_types5.default.number]).isRequired,
    vertical: import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["bottom", "center", "top"]), import_prop_types5.default.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: import_prop_types5.default.shape({
    left: import_prop_types5.default.number.isRequired,
    top: import_prop_types5.default.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: import_prop_types5.default.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: import_prop_types5.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types5.default.object,
  /**
   * @ignore
   */
  className: import_prop_types5.default.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types5.default.oneOfType([HTMLElementType, import_prop_types5.default.func]),
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: integerPropType_default,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * @default 16
   */
  marginThreshold: import_prop_types5.default.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: import_prop_types5.default.func,
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types5.default.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: import_prop_types5.default.shape({
    component: elementTypeAcceptingRef_default
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: import_prop_types5.default.shape({
    paper: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object]),
    root: import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: import_prop_types5.default.shape({
    paper: import_prop_types5.default.elementType,
    root: import_prop_types5.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types5.default.oneOfType([import_prop_types5.default.arrayOf(import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object, import_prop_types5.default.bool])), import_prop_types5.default.func, import_prop_types5.default.object]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin: import_prop_types5.default.shape({
    horizontal: import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["center", "left", "right"]), import_prop_types5.default.number]).isRequired,
    vertical: import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["bottom", "center", "top"]), import_prop_types5.default.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: import_prop_types5.default.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: import_prop_types5.default.oneOfType([import_prop_types5.default.oneOf(["auto"]), import_prop_types5.default.number, import_prop_types5.default.shape({
    appear: import_prop_types5.default.number,
    enter: import_prop_types5.default.number,
    exit: import_prop_types5.default.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: import_prop_types5.default.object
} : void 0;
var Popover_default = Popover;

export {
  reflow,
  getTransitionProps,
  Fade_default,
  getBackdropUtilityClass,
  backdropClasses_default,
  Backdrop_default,
  modalClasses,
  Modal_default2 as Modal_default,
  Grow_default,
  getPopoverUtilityClass,
  popoverClasses_default,
  getOffsetTop,
  getOffsetLeft,
  PopoverRoot,
  PopoverPaper,
  Popover_default
};
//# sourceMappingURL=chunk-U3R35LCR.js.map
