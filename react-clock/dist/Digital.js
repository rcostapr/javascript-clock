"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Digital = props => {
  const [str, setStr] = (0, _react.useState)("");
  (0, _react.useEffect)(() => {
    var dataini = new Date();
    var showDigital = false;

    if (props.params) {
      if (props.params.date) {
        dataini = new Date(props.params.date);
      }

      if (props.params.showDigital && props.params.showDigital === true) {
        showDigital = true;
      }
    }

    if (showDigital === false) {
      return;
    } // Build Digital


    const interval = setInterval(() => {
      setStr(clockDigital(dataini)); // Set current time

      dataini.setTime(dataini.getTime() + 1000); //
    }, 1000); // Implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.

    return () => clearInterval(interval);
  }, [props]); // lifecycle

  return str;
};
/**
 * Digital Clock
 * @param {array} props 
 * @returns 
 */


var clockDigital = function clockDigital(dataini) {
  if (!dataini) {
    return '';
  }

  let sec = leadingZeros(dataini.getSeconds());
  let min = leadingZeros(dataini.getMinutes());
  let hour = leadingZeros(dataini.getHours());
  let str = "".concat(hour, ":").concat(min, ":").concat(sec);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "text-center"
  }, str);
};
/**
 * Leading Zeros
 * -------------
 * @param {int} val Value to return
 * @returns string representing a number with 2 or more digits
 */


var leadingZeros = function leadingZeros(val) {
  if (val < 10) {
    val = "0" + val;
  }

  return val;
};

var _default = Digital;
exports.default = _default;