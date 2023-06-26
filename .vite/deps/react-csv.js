import {
  require_prop_types
} from "./chunk-OGQOAQW5.js";
import {
  require_react
} from "./chunk-LFTCFPAG.js";
import "./chunk-2W4G54A4.js";
import {
  __publicField,
  __toESM
} from "./chunk-LFBQMW2U.js";

// node_modules/react-csv/src/components/Download.js
var import_react2 = __toESM(require_react());

// node_modules/react-csv/src/core.js
var isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isJsons = (array2) => Array.isArray(array2) && array2.every(
  (row) => typeof row === "object" && !(row instanceof Array)
);
var isArrays = (array2) => Array.isArray(array2) && array2.every(
  (row) => Array.isArray(row)
);
var jsonsHeaders = (array2) => Array.from(
  array2.map((json) => Object.keys(json)).reduce((a, b) => /* @__PURE__ */ new Set([...a, ...b]), [])
);
var jsons2arrays = (jsons, headers) => {
  headers = headers || jsonsHeaders(jsons);
  let headerLabels = headers;
  let headerKeys = headers;
  if (isJsons(headers)) {
    headerLabels = headers.map((header) => header.label);
    headerKeys = headers.map((header) => header.key);
  }
  const data = jsons.map((object) => headerKeys.map((header) => getHeaderValue(header, object)));
  return [headerLabels, ...data];
};
var getHeaderValue = (property, obj) => {
  const foundValue = property.replace(/\[([^\]]+)]/g, ".$1").split(".").reduce(function(o, p, i, arr) {
    const value = o[p];
    if (value === void 0 || value === null) {
      arr.splice(1);
    } else {
      return value;
    }
  }, obj);
  return foundValue === void 0 ? property in obj ? obj[property] : "" : foundValue;
};
var elementOrEmpty = (element) => typeof element === "undefined" || element === null ? "" : element;
var joiner = (data, separator = ",", enclosingCharacter = '"') => {
  return data.filter((e) => e).map(
    (row) => row.map((element) => elementOrEmpty(element)).map((column) => `${enclosingCharacter}${column}${enclosingCharacter}`).join(separator)
  ).join(`
`);
};
var arrays2csv = (data, headers, separator, enclosingCharacter) => joiner(headers ? [headers, ...data] : data, separator, enclosingCharacter);
var jsons2csv = (data, headers, separator, enclosingCharacter) => joiner(jsons2arrays(data, headers), separator, enclosingCharacter);
var string2csv = (data, headers, separator, enclosingCharacter) => headers ? `${headers.join(separator)}
${data}` : data.replace(/"/g, '""');
var toCSV = (data, headers, separator, enclosingCharacter) => {
  if (isJsons(data))
    return jsons2csv(data, headers, separator, enclosingCharacter);
  if (isArrays(data))
    return arrays2csv(data, headers, separator, enclosingCharacter);
  if (typeof data === "string")
    return string2csv(data, headers, separator);
  throw new TypeError(`Data should be a "String", "Array of arrays" OR "Array of objects" `);
};
var buildURI = (data, uFEFF, headers, separator, enclosingCharacter) => {
  const csv = toCSV(data, headers, separator, enclosingCharacter);
  const type = isSafari() ? "application/csv" : "text/csv";
  const blob = new Blob([uFEFF ? "\uFEFF" : "", csv], { type });
  const dataURI = `data:${type};charset=utf-8,${uFEFF ? "\uFEFF" : ""}${csv}`;
  const URL = window.URL || window.webkitURL;
  return typeof URL.createObjectURL === "undefined" ? dataURI : URL.createObjectURL(blob);
};

// node_modules/react-csv/src/metaProps.js
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var propTypes = {
  data: (0, import_prop_types.oneOfType)([import_prop_types.string, import_prop_types.array, import_prop_types.func]).isRequired,
  headers: import_prop_types.array,
  target: import_prop_types.string,
  separator: import_prop_types.string,
  filename: import_prop_types.string,
  uFEFF: import_prop_types.bool,
  onClick: import_prop_types.func,
  asyncOnClick: import_prop_types.bool,
  enclosingCharacter: import_prop_types.string
};
var defaultProps = {
  separator: ",",
  filename: "generatedBy_react-csv.csv",
  uFEFF: true,
  asyncOnClick: false,
  enclosingCharacter: '"'
};

// node_modules/react-csv/src/components/Download.js
var defaultProps2 = {
  target: "_blank"
};
var CSVDownload = class extends import_react2.default.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  buildURI() {
    return buildURI(...arguments);
  }
  componentDidMount() {
    const { data, headers, separator, enclosingCharacter, uFEFF, target, specs, replace } = this.props;
    this.state.page = window.open(
      this.buildURI(data, uFEFF, headers, separator, enclosingCharacter),
      target,
      specs,
      replace
    );
  }
  getWindow() {
    return this.state.page;
  }
  render() {
    return null;
  }
};
__publicField(CSVDownload, "defaultProps", Object.assign(
  defaultProps,
  defaultProps2
));
__publicField(CSVDownload, "propTypes", propTypes);
var Download_default = CSVDownload;

// node_modules/react-csv/src/components/Link.jsx
var import_react3 = __toESM(require_react());
var CSVLink = class extends import_react3.default.Component {
  constructor(props) {
    super(props);
    this.buildURI = this.buildURI.bind(this);
  }
  buildURI() {
    return buildURI(...arguments);
  }
  /**
   * In IE11 this method will trigger the file download
   */
  handleLegacy(event, isAsync = false) {
    if (window.navigator.msSaveOrOpenBlob) {
      event.preventDefault();
      const {
        data,
        headers,
        separator,
        filename,
        enclosingCharacter,
        uFEFF
      } = this.props;
      const csvData = isAsync && typeof data === "function" ? data() : data;
      let blob = new Blob([uFEFF ? "\uFEFF" : "", toCSV(csvData, headers, separator, enclosingCharacter)]);
      window.navigator.msSaveBlob(blob, filename);
      return false;
    }
  }
  handleAsyncClick(event) {
    const done = (proceed) => {
      if (proceed === false) {
        event.preventDefault();
        return;
      }
      this.handleLegacy(event, true);
    };
    this.props.onClick(event, done);
  }
  handleSyncClick(event) {
    const stopEvent = this.props.onClick(event) === false;
    if (stopEvent) {
      event.preventDefault();
      return;
    }
    this.handleLegacy(event);
  }
  handleClick() {
    return (event) => {
      if (typeof this.props.onClick === "function") {
        return this.props.asyncOnClick ? this.handleAsyncClick(event) : this.handleSyncClick(event);
      }
      this.handleLegacy(event);
    };
  }
  render() {
    const {
      data,
      headers,
      separator,
      filename,
      uFEFF,
      children,
      onClick,
      asyncOnClick,
      enclosingCharacter,
      ...rest
    } = this.props;
    const isNodeEnvironment = typeof window === "undefined";
    const href = isNodeEnvironment ? "" : this.buildURI(data, uFEFF, headers, separator, enclosingCharacter);
    return import_react3.default.createElement(
      "a",
      {
        download: filename,
        ...rest,
        ref: (link) => this.link = link,
        target: "_self",
        href,
        onClick: this.handleClick()
      },
      children
    );
  }
};
__publicField(CSVLink, "defaultProps", defaultProps);
__publicField(CSVLink, "propTypes", propTypes);
var Link_default = CSVLink;

// node_modules/react-csv/src/index.js
var CSVDownload2 = Download_default;
var CSVLink2 = Link_default;
export {
  CSVDownload2 as CSVDownload,
  CSVLink2 as CSVLink
};
//# sourceMappingURL=react-csv.js.map
