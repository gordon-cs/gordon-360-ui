import {
  makeStyles,
  useTheme
} from "./chunk-OMRGFARM.js";
import "./chunk-T4XRSJVY.js";
import "./chunk-CLTD24QJ.js";
import "./chunk-7JSK233G.js";
import "./chunk-ORMIY5SP.js";
import "./chunk-LQHJAPLN.js";
import {
  getDisplayName,
  init_esm,
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
  require_hoist_non_react_statics_cjs
} from "./chunk-D4AJL7IN.js";
import {
  _extends,
  init_extends
} from "./chunk-BP2LF4M5.js";
import {
  require_react
} from "./chunk-LFTCFPAG.js";
import "./chunk-2W4G54A4.js";
import {
  __toESM
} from "./chunk-LFBQMW2U.js";

// node_modules/@mui/styles/withStyles/withStyles.js
init_extends();
init_objectWithoutPropertiesLoose();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
init_esm();

// node_modules/@mui/styles/getThemeProps/getThemeProps.js
init_extends();
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  const output = _extends({}, props);
  const defaultProps = theme.components[name].defaultProps;
  let propName;
  for (propName in defaultProps) {
    if (output[propName] === void 0) {
      output[propName] = defaultProps[propName];
    }
  }
  return output;
}

// node_modules/@mui/styles/withStyles/withStyles.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["defaultTheme", "withTheme", "name"];
var _excluded2 = ["classes"];
var withStyles = (stylesOrCreator, options = {}) => (Component) => {
  const {
    defaultTheme,
    withTheme = false,
    name
  } = options, stylesOptions = _objectWithoutPropertiesLoose(options, _excluded);
  if (true) {
    if (Component === void 0) {
      throw new Error(["You are calling withStyles(styles)(Component) with an undefined component.", "You may have forgotten to import it."].join("\n"));
    }
  }
  let classNamePrefix = name;
  if (true) {
    if (!name) {
      const displayName = getDisplayName(Component);
      if (displayName !== void 0) {
        classNamePrefix = displayName;
      }
    }
  }
  const useStyles = makeStyles(stylesOrCreator, _extends({
    defaultTheme,
    Component,
    name: name || Component.displayName,
    classNamePrefix
  }, stylesOptions));
  const WithStyles = React.forwardRef(function WithStyles2(props, ref) {
    const other = _objectWithoutPropertiesLoose(props, _excluded2);
    const classes = useStyles(_extends({}, Component.defaultProps, props));
    let theme;
    let more = other;
    if (typeof name === "string" || withTheme) {
      theme = useTheme() || defaultTheme;
      if (name) {
        more = getThemeProps({
          theme,
          name,
          props: other
        });
      }
      if (withTheme && !more.theme) {
        more.theme = theme;
      }
    }
    return (0, import_jsx_runtime.jsx)(Component, _extends({
      ref,
      classes
    }, more));
  });
  true ? WithStyles.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: import_prop_types.default.object
  } : void 0;
  if (true) {
    WithStyles.displayName = `WithStyles(${getDisplayName(Component)})`;
  }
  (0, import_hoist_non_react_statics.default)(WithStyles, Component);
  if (true) {
    WithStyles.Naked = Component;
    WithStyles.options = options;
    WithStyles.useStyles = useStyles;
  }
  return WithStyles;
};
var withStyles_default = withStyles;
export {
  withStyles_default as default
};
//# sourceMappingURL=@mui_styles_withStyles.js.map
