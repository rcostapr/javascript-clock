"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _Digital = _interopRequireDefault(require("./Digital"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AnalogClock extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "setDataini", newdate => {
      this.setState({
        dataini: newdate
      });
    });

    _defineProperty(this, "getDataini", () => {
      return this.state.dataini;
    });

    this.listRef = /*#__PURE__*/_react.default.createRef();
    this.state = {
      dataini: new Date()
    };

    if (props.params && props.params.date) {
      this.state.dataini = new Date(props.params.date);
    }

    this.setDataini = this.setDataini.bind(this);
    this.getDataini = this.getDataini.bind(this);
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(ClockTitle, this.props), /*#__PURE__*/_react.default.createElement(_Canvas.default, this.props), /*#__PURE__*/_react.default.createElement(_Digital.default, this.props));
  }

}

function ClockTitle(props) {
  if (props.params && props.params.title) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "text-center"
    }, props.params.title);
  }

  return '';
}

var _default = AnalogClock;
exports.default = _default;