import {
  createSvgIcon,
  init_createSvgIcon,
  init_unsupportedProp,
  init_useEnhancedEffect,
  unsupportedProp_default,
  useEnhancedEffect_default
} from "./chunk-AOWBZG3C.js";
import {
  init_useEventCallback,
  init_useIsFocusVisible,
  useEventCallback_default,
  useIsFocusVisible_default
} from "./chunk-FOKXVRRN.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-TC3ZRZVT.js";
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
  ClassNameGenerator_default,
  createChainedFunction,
  deprecatedPropType,
  init_esm,
  isMuiElement,
  requirePropFactory,
  setRef,
  useControlled,
  useId
} from "./chunk-CLQTRJQI.js";
import {
  __esm,
  __export
} from "./chunk-LFBQMW2U.js";

// node_modules/@mui/material/utils/createChainedFunction.js
var createChainedFunction_default;
var init_createChainedFunction = __esm({
  "node_modules/@mui/material/utils/createChainedFunction.js"() {
    init_esm();
    createChainedFunction_default = createChainedFunction;
  }
});

// node_modules/@mui/material/utils/deprecatedPropType.js
var deprecatedPropType_default;
var init_deprecatedPropType = __esm({
  "node_modules/@mui/material/utils/deprecatedPropType.js"() {
    init_esm();
    deprecatedPropType_default = deprecatedPropType;
  }
});

// node_modules/@mui/material/utils/isMuiElement.js
var isMuiElement_default;
var init_isMuiElement = __esm({
  "node_modules/@mui/material/utils/isMuiElement.js"() {
    init_esm();
    isMuiElement_default = isMuiElement;
  }
});

// node_modules/@mui/material/utils/requirePropFactory.js
var requirePropFactory_default;
var init_requirePropFactory = __esm({
  "node_modules/@mui/material/utils/requirePropFactory.js"() {
    init_esm();
    requirePropFactory_default = requirePropFactory;
  }
});

// node_modules/@mui/material/utils/setRef.js
var setRef_default;
var init_setRef = __esm({
  "node_modules/@mui/material/utils/setRef.js"() {
    init_esm();
    setRef_default = setRef;
  }
});

// node_modules/@mui/material/utils/useId.js
var useId_default;
var init_useId = __esm({
  "node_modules/@mui/material/utils/useId.js"() {
    init_esm();
    useId_default = useId;
  }
});

// node_modules/@mui/material/utils/useControlled.js
var useControlled_default;
var init_useControlled = __esm({
  "node_modules/@mui/material/utils/useControlled.js"() {
    init_esm();
    useControlled_default = useControlled;
  }
});

// node_modules/@mui/base/className/index.js
var init_className = __esm({
  "node_modules/@mui/base/className/index.js"() {
    init_esm();
  }
});

// node_modules/@mui/material/utils/index.js
var utils_exports = {};
__export(utils_exports, {
  capitalize: () => capitalize_default,
  createChainedFunction: () => createChainedFunction_default,
  createSvgIcon: () => createSvgIcon,
  debounce: () => debounce_default,
  deprecatedPropType: () => deprecatedPropType_default,
  isMuiElement: () => isMuiElement_default,
  ownerDocument: () => ownerDocument_default,
  ownerWindow: () => ownerWindow_default,
  requirePropFactory: () => requirePropFactory_default,
  setRef: () => setRef_default,
  unstable_ClassNameGenerator: () => unstable_ClassNameGenerator,
  unstable_useEnhancedEffect: () => useEnhancedEffect_default,
  unstable_useId: () => useId_default,
  unsupportedProp: () => unsupportedProp_default,
  useControlled: () => useControlled_default,
  useEventCallback: () => useEventCallback_default,
  useForkRef: () => useForkRef_default,
  useIsFocusVisible: () => useIsFocusVisible_default
});
var unstable_ClassNameGenerator;
var init_utils = __esm({
  "node_modules/@mui/material/utils/index.js"() {
    init_className();
    init_capitalize();
    init_createChainedFunction();
    init_createSvgIcon();
    init_debounce();
    init_deprecatedPropType();
    init_isMuiElement();
    init_ownerDocument();
    init_ownerWindow();
    init_requirePropFactory();
    init_setRef();
    init_useEnhancedEffect();
    init_useId();
    init_unsupportedProp();
    init_useControlled();
    init_useEventCallback();
    init_useForkRef();
    init_useIsFocusVisible();
    unstable_ClassNameGenerator = {
      configure: (generator) => {
        if (true) {
          console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join("\n"));
        }
        ClassNameGenerator_default.configure(generator);
      }
    };
  }
});

export {
  createChainedFunction_default,
  init_createChainedFunction,
  deprecatedPropType_default,
  isMuiElement_default,
  init_isMuiElement,
  requirePropFactory_default,
  init_requirePropFactory,
  setRef_default,
  useId_default,
  init_useId,
  useControlled_default,
  init_useControlled,
  unstable_ClassNameGenerator,
  utils_exports,
  init_utils
};
//# sourceMappingURL=chunk-PIEIWGVK.js.map
