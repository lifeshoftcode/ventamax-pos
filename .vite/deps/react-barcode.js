import {
  require_prop_types
} from "./chunk-QS4HXI27.js";
import "./chunk-YRQRZKBP.js";
import {
  require_react
} from "./chunk-YW5IJWHK.js";
import {
  __commonJS
} from "./chunk-OL46QLBJ.js";

// node_modules/jsbarcode/bin/barcodes/Barcode.js
var require_Barcode = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/Barcode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Barcode = function Barcode2(data, options) {
      _classCallCheck(this, Barcode2);
      this.data = data;
      this.text = options.text || data;
      this.options = options;
    };
    exports.default = Barcode;
  }
});

// node_modules/jsbarcode/bin/barcodes/CODE39/index.js
var require_CODE39 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/CODE39/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CODE39 = void 0;
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var CODE39 = function(_Barcode) {
      _inherits(CODE392, _Barcode);
      function CODE392(data, options) {
        _classCallCheck(this, CODE392);
        data = data.toUpperCase();
        if (options.mod43) {
          data += getCharacter(mod43checksum(data));
        }
        return _possibleConstructorReturn(this, (CODE392.__proto__ || Object.getPrototypeOf(CODE392)).call(this, data, options));
      }
      _createClass(CODE392, [{
        key: "encode",
        value: function encode() {
          var result = getEncoding("*");
          for (var i = 0; i < this.data.length; i++) {
            result += getEncoding(this.data[i]) + "0";
          }
          result += getEncoding("*");
          return {
            data: result,
            text: this.text
          };
        }
      }, {
        key: "valid",
        value: function valid() {
          return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
        }
      }]);
      return CODE392;
    }(_Barcode3.default);
    var characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"];
    var encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];
    function getEncoding(character) {
      return getBinary(characterValue(character));
    }
    function getBinary(characterValue2) {
      return encodings[characterValue2].toString(2);
    }
    function getCharacter(characterValue2) {
      return characters[characterValue2];
    }
    function characterValue(character) {
      return characters.indexOf(character);
    }
    function mod43checksum(data) {
      var checksum = 0;
      for (var i = 0; i < data.length; i++) {
        checksum += characterValue(data[i]);
      }
      checksum = checksum % 43;
      return checksum;
    }
    exports.CODE39 = CODE39;
  }
});

// node_modules/jsbarcode/bin/barcodes/CODE128/constants.js
var require_constants = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/CODE128/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _SET_BY_CODE;
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SET_A = exports.SET_A = 0;
    var SET_B = exports.SET_B = 1;
    var SET_C = exports.SET_C = 2;
    var SHIFT = exports.SHIFT = 98;
    var START_A = exports.START_A = 103;
    var START_B = exports.START_B = 104;
    var START_C = exports.START_C = 105;
    var MODULO = exports.MODULO = 103;
    var STOP = exports.STOP = 106;
    var FNC1 = exports.FNC1 = 207;
    var SET_BY_CODE = exports.SET_BY_CODE = (_SET_BY_CODE = {}, _defineProperty(_SET_BY_CODE, START_A, SET_A), _defineProperty(_SET_BY_CODE, START_B, SET_B), _defineProperty(_SET_BY_CODE, START_C, SET_C), _SET_BY_CODE);
    var SWAP = exports.SWAP = {
      101: SET_A,
      100: SET_B,
      99: SET_C
    };
    var A_START_CHAR = exports.A_START_CHAR = String.fromCharCode(208);
    var B_START_CHAR = exports.B_START_CHAR = String.fromCharCode(209);
    var C_START_CHAR = exports.C_START_CHAR = String.fromCharCode(210);
    var A_CHARS = exports.A_CHARS = "[\0-_È-Ï]";
    var B_CHARS = exports.B_CHARS = "[ -È-Ï]";
    var C_CHARS = exports.C_CHARS = "(Ï*[0-9]{2}Ï*)";
    var BARS = exports.BARS = [11011001100, 11001101100, 11001100110, 10010011e3, 10010001100, 10001001100, 10011001e3, 10011000100, 10001100100, 11001001e3, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011e3, 11011000110, 11000110110, 10100011e3, 10001011e3, 10001000110, 10110001e3, 10001101e3, 10001100010, 11010001e3, 11000101e3, 11000100010, 10110111e3, 10110001110, 10001101110, 10111011e3, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101e3, 11011100010, 11011101110, 11101011e3, 11101000110, 11100010110, 11101101e3, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 1010011e4, 10100001100, 1001011e4, 10010000110, 10000101100, 10000100110, 1011001e4, 10110000100, 1001101e4, 10011000010, 10000110100, 10000110010, 11000010010, 1100101e4, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111e3, 10100011110, 10001011110, 10111101e3, 10111100010, 11110101e3, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 1101001e4, 11010011100, 1100011101011];
  }
});

// node_modules/jsbarcode/bin/barcodes/CODE128/CODE128.js
var require_CODE128 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/CODE128/CODE128.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var CODE128 = function(_Barcode) {
      _inherits(CODE1282, _Barcode);
      function CODE1282(data, options) {
        _classCallCheck(this, CODE1282);
        var _this = _possibleConstructorReturn(this, (CODE1282.__proto__ || Object.getPrototypeOf(CODE1282)).call(this, data.substring(1), options));
        _this.bytes = data.split("").map(function(char) {
          return char.charCodeAt(0);
        });
        return _this;
      }
      _createClass(CODE1282, [{
        key: "valid",
        value: function valid() {
          return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data);
        }
        // The public encoding function
      }, {
        key: "encode",
        value: function encode() {
          var bytes = this.bytes;
          var startIndex = bytes.shift() - 105;
          var startSet = _constants.SET_BY_CODE[startIndex];
          if (startSet === void 0) {
            throw new RangeError("The encoding does not start with a start character.");
          }
          if (this.shouldEncodeAsEan128() === true) {
            bytes.unshift(_constants.FNC1);
          }
          var encodingResult = CODE1282.next(bytes, 1, startSet);
          return {
            text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
            data: (
              // Add the start bits
              CODE1282.getBar(startIndex) + // Add the encoded bits
              encodingResult.result + // Add the checksum
              CODE1282.getBar((encodingResult.checksum + startIndex) % _constants.MODULO) + // Add the end bits
              CODE1282.getBar(_constants.STOP)
            )
          };
        }
        // GS1-128/EAN-128
      }, {
        key: "shouldEncodeAsEan128",
        value: function shouldEncodeAsEan128() {
          var isEAN128 = this.options.ean128 || false;
          if (typeof isEAN128 === "string") {
            isEAN128 = isEAN128.toLowerCase() === "true";
          }
          return isEAN128;
        }
        // Get a bar symbol by index
      }], [{
        key: "getBar",
        value: function getBar(index) {
          return _constants.BARS[index] ? _constants.BARS[index].toString() : "";
        }
        // Correct an index by a set and shift it from the bytes array
      }, {
        key: "correctIndex",
        value: function correctIndex(bytes, set) {
          if (set === _constants.SET_A) {
            var charCode = bytes.shift();
            return charCode < 32 ? charCode + 64 : charCode - 32;
          } else if (set === _constants.SET_B) {
            return bytes.shift() - 32;
          } else {
            return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
          }
        }
      }, {
        key: "next",
        value: function next(bytes, pos, set) {
          if (!bytes.length) {
            return { result: "", checksum: 0 };
          }
          var nextCode = void 0, index = void 0;
          if (bytes[0] >= 200) {
            index = bytes.shift() - 105;
            var nextSet = _constants.SWAP[index];
            if (nextSet !== void 0) {
              nextCode = CODE1282.next(bytes, pos + 1, nextSet);
            } else {
              if ((set === _constants.SET_A || set === _constants.SET_B) && index === _constants.SHIFT) {
                bytes[0] = set === _constants.SET_A ? bytes[0] > 95 ? bytes[0] - 96 : bytes[0] : bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
              }
              nextCode = CODE1282.next(bytes, pos + 1, set);
            }
          } else {
            index = CODE1282.correctIndex(bytes, set);
            nextCode = CODE1282.next(bytes, pos + 1, set);
          }
          var enc = CODE1282.getBar(index);
          var weight = index * pos;
          return {
            result: enc + nextCode.result,
            checksum: weight + nextCode.checksum
          };
        }
      }]);
      return CODE1282;
    }(_Barcode3.default);
    exports.default = CODE128;
  }
});

// node_modules/jsbarcode/bin/barcodes/CODE128/auto.js
var require_auto = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/CODE128/auto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _constants = require_constants();
    var matchSetALength = function matchSetALength2(string) {
      return string.match(new RegExp("^" + _constants.A_CHARS + "*"))[0].length;
    };
    var matchSetBLength = function matchSetBLength2(string) {
      return string.match(new RegExp("^" + _constants.B_CHARS + "*"))[0].length;
    };
    var matchSetC = function matchSetC2(string) {
      return string.match(new RegExp("^" + _constants.C_CHARS + "*"))[0];
    };
    function autoSelectFromAB(string, isA) {
      var ranges = isA ? _constants.A_CHARS : _constants.B_CHARS;
      var untilC = string.match(new RegExp("^(" + ranges + "+?)(([0-9]{2}){2,})([^0-9]|$)"));
      if (untilC) {
        return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
      }
      var chars = string.match(new RegExp("^" + ranges + "+"))[0];
      if (chars.length === string.length) {
        return string;
      }
      return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA);
    }
    function autoSelectFromC(string) {
      var cMatch = matchSetC(string);
      var length = cMatch.length;
      if (length === string.length) {
        return string;
      }
      string = string.substring(length);
      var isA = matchSetALength(string) >= matchSetBLength(string);
      return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(string, isA);
    }
    exports.default = function(string) {
      var newString = void 0;
      var cLength = matchSetC(string).length;
      if (cLength >= 2) {
        newString = _constants.C_START_CHAR + autoSelectFromC(string);
      } else {
        var isA = matchSetALength(string) > matchSetBLength(string);
        newString = (isA ? _constants.A_START_CHAR : _constants.B_START_CHAR) + autoSelectFromAB(string, isA);
      }
      return newString.replace(
        /[\xCD\xCE]([^])[\xCD\xCE]/,
        // Any sequence between 205 and 206 characters
        function(match, char) {
          return String.fromCharCode(203) + char;
        }
      );
    };
  }
});

// node_modules/jsbarcode/bin/barcodes/CODE128/CODE128_AUTO.js
var require_CODE128_AUTO = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/CODE128/CODE128_AUTO.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _CODE2 = require_CODE128();
    var _CODE3 = _interopRequireDefault(_CODE2);
    var _auto = require_auto();
    var _auto2 = _interopRequireDefault(_auto);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var CODE128AUTO = function(_CODE) {
      _inherits(CODE128AUTO2, _CODE);
      function CODE128AUTO2(data, options) {
        _classCallCheck(this, CODE128AUTO2);
        if (/^[\x00-\x7F\xC8-\xD3]+$/.test(data)) {
          var _this = _possibleConstructorReturn(this, (CODE128AUTO2.__proto__ || Object.getPrototypeOf(CODE128AUTO2)).call(this, (0, _auto2.default)(data), options));
        } else {
          var _this = _possibleConstructorReturn(this, (CODE128AUTO2.__proto__ || Object.getPrototypeOf(CODE128AUTO2)).call(this, data, options));
        }
        return _possibleConstructorReturn(_this);
      }
      return CODE128AUTO2;
    }(_CODE3.default);
    exports.default = CODE128AUTO;
  }
});

// node_modules/jsbarcode/bin/barcodes/CODE128/CODE128A.js
var require_CODE128A = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/CODE128/CODE128A.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _CODE2 = require_CODE128();
    var _CODE3 = _interopRequireDefault(_CODE2);
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var CODE128A = function(_CODE) {
      _inherits(CODE128A2, _CODE);
      function CODE128A2(string, options) {
        _classCallCheck(this, CODE128A2);
        return _possibleConstructorReturn(this, (CODE128A2.__proto__ || Object.getPrototypeOf(CODE128A2)).call(this, _constants.A_START_CHAR + string, options));
      }
      _createClass(CODE128A2, [{
        key: "valid",
        value: function valid() {
          return new RegExp("^" + _constants.A_CHARS + "+$").test(this.data);
        }
      }]);
      return CODE128A2;
    }(_CODE3.default);
    exports.default = CODE128A;
  }
});

// node_modules/jsbarcode/bin/barcodes/CODE128/CODE128B.js
var require_CODE128B = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/CODE128/CODE128B.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _CODE2 = require_CODE128();
    var _CODE3 = _interopRequireDefault(_CODE2);
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var CODE128B = function(_CODE) {
      _inherits(CODE128B2, _CODE);
      function CODE128B2(string, options) {
        _classCallCheck(this, CODE128B2);
        return _possibleConstructorReturn(this, (CODE128B2.__proto__ || Object.getPrototypeOf(CODE128B2)).call(this, _constants.B_START_CHAR + string, options));
      }
      _createClass(CODE128B2, [{
        key: "valid",
        value: function valid() {
          return new RegExp("^" + _constants.B_CHARS + "+$").test(this.data);
        }
      }]);
      return CODE128B2;
    }(_CODE3.default);
    exports.default = CODE128B;
  }
});

// node_modules/jsbarcode/bin/barcodes/CODE128/CODE128C.js
var require_CODE128C = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/CODE128/CODE128C.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _CODE2 = require_CODE128();
    var _CODE3 = _interopRequireDefault(_CODE2);
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var CODE128C = function(_CODE) {
      _inherits(CODE128C2, _CODE);
      function CODE128C2(string, options) {
        _classCallCheck(this, CODE128C2);
        return _possibleConstructorReturn(this, (CODE128C2.__proto__ || Object.getPrototypeOf(CODE128C2)).call(this, _constants.C_START_CHAR + string, options));
      }
      _createClass(CODE128C2, [{
        key: "valid",
        value: function valid() {
          return new RegExp("^" + _constants.C_CHARS + "+$").test(this.data);
        }
      }]);
      return CODE128C2;
    }(_CODE3.default);
    exports.default = CODE128C;
  }
});

// node_modules/jsbarcode/bin/barcodes/CODE128/index.js
var require_CODE1282 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/CODE128/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CODE128C = exports.CODE128B = exports.CODE128A = exports.CODE128 = void 0;
    var _CODE128_AUTO = require_CODE128_AUTO();
    var _CODE128_AUTO2 = _interopRequireDefault(_CODE128_AUTO);
    var _CODE128A = require_CODE128A();
    var _CODE128A2 = _interopRequireDefault(_CODE128A);
    var _CODE128B = require_CODE128B();
    var _CODE128B2 = _interopRequireDefault(_CODE128B);
    var _CODE128C = require_CODE128C();
    var _CODE128C2 = _interopRequireDefault(_CODE128C);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.CODE128 = _CODE128_AUTO2.default;
    exports.CODE128A = _CODE128A2.default;
    exports.CODE128B = _CODE128B2.default;
    exports.CODE128C = _CODE128C2.default;
  }
});

// node_modules/jsbarcode/bin/barcodes/EAN_UPC/constants.js
var require_constants2 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/EAN_UPC/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SIDE_BIN = exports.SIDE_BIN = "101";
    var MIDDLE_BIN = exports.MIDDLE_BIN = "01010";
    var BINARIES = exports.BINARIES = {
      "L": [
        // The L (left) type of encoding
        "0001101",
        "0011001",
        "0010011",
        "0111101",
        "0100011",
        "0110001",
        "0101111",
        "0111011",
        "0110111",
        "0001011"
      ],
      "G": [
        // The G type of encoding
        "0100111",
        "0110011",
        "0011011",
        "0100001",
        "0011101",
        "0111001",
        "0000101",
        "0010001",
        "0001001",
        "0010111"
      ],
      "R": [
        // The R (right) type of encoding
        "1110010",
        "1100110",
        "1101100",
        "1000010",
        "1011100",
        "1001110",
        "1010000",
        "1000100",
        "1001000",
        "1110100"
      ],
      "O": [
        // The O (odd) encoding for UPC-E
        "0001101",
        "0011001",
        "0010011",
        "0111101",
        "0100011",
        "0110001",
        "0101111",
        "0111011",
        "0110111",
        "0001011"
      ],
      "E": [
        // The E (even) encoding for UPC-E
        "0100111",
        "0110011",
        "0011011",
        "0100001",
        "0011101",
        "0111001",
        "0000101",
        "0010001",
        "0001001",
        "0010111"
      ]
    };
    var EAN2_STRUCTURE = exports.EAN2_STRUCTURE = ["LL", "LG", "GL", "GG"];
    var EAN5_STRUCTURE = exports.EAN5_STRUCTURE = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
    var EAN13_STRUCTURE = exports.EAN13_STRUCTURE = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
  }
});

// node_modules/jsbarcode/bin/barcodes/EAN_UPC/encoder.js
var require_encoder = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/EAN_UPC/encoder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _constants = require_constants2();
    var encode = function encode2(data, structure, separator) {
      var encoded = data.split("").map(function(val, idx) {
        return _constants.BINARIES[structure[idx]];
      }).map(function(val, idx) {
        return val ? val[data[idx]] : "";
      });
      if (separator) {
        var last = data.length - 1;
        encoded = encoded.map(function(val, idx) {
          return idx < last ? val + separator : val;
        });
      }
      return encoded.join("");
    };
    exports.default = encode;
  }
});

// node_modules/jsbarcode/bin/barcodes/EAN_UPC/EAN.js
var require_EAN = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/EAN_UPC/EAN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _constants = require_constants2();
    var _encoder = require_encoder();
    var _encoder2 = _interopRequireDefault(_encoder);
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var EAN = function(_Barcode) {
      _inherits(EAN2, _Barcode);
      function EAN2(data, options) {
        _classCallCheck(this, EAN2);
        var _this = _possibleConstructorReturn(this, (EAN2.__proto__ || Object.getPrototypeOf(EAN2)).call(this, data, options));
        _this.fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;
        _this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
        return _this;
      }
      _createClass(EAN2, [{
        key: "encode",
        value: function encode() {
          return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
        }
      }, {
        key: "leftText",
        value: function leftText(from, to) {
          return this.text.substr(from, to);
        }
      }, {
        key: "leftEncode",
        value: function leftEncode(data, structure) {
          return (0, _encoder2.default)(data, structure);
        }
      }, {
        key: "rightText",
        value: function rightText(from, to) {
          return this.text.substr(from, to);
        }
      }, {
        key: "rightEncode",
        value: function rightEncode(data, structure) {
          return (0, _encoder2.default)(data, structure);
        }
      }, {
        key: "encodeGuarded",
        value: function encodeGuarded() {
          var textOptions = { fontSize: this.fontSize };
          var guardOptions = { height: this.guardHeight };
          return [{ data: _constants.SIDE_BIN, options: guardOptions }, { data: this.leftEncode(), text: this.leftText(), options: textOptions }, { data: _constants.MIDDLE_BIN, options: guardOptions }, { data: this.rightEncode(), text: this.rightText(), options: textOptions }, { data: _constants.SIDE_BIN, options: guardOptions }];
        }
      }, {
        key: "encodeFlat",
        value: function encodeFlat() {
          var data = [_constants.SIDE_BIN, this.leftEncode(), _constants.MIDDLE_BIN, this.rightEncode(), _constants.SIDE_BIN];
          return {
            data: data.join(""),
            text: this.text
          };
        }
      }]);
      return EAN2;
    }(_Barcode3.default);
    exports.default = EAN;
  }
});

// node_modules/jsbarcode/bin/barcodes/EAN_UPC/EAN13.js
var require_EAN13 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/EAN_UPC/EAN13.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);
      if (desc === void 0) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return void 0;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === void 0) {
          return void 0;
        }
        return getter.call(receiver);
      }
    };
    var _constants = require_constants2();
    var _EAN2 = require_EAN();
    var _EAN3 = _interopRequireDefault(_EAN2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var checksum = function checksum2(number) {
      var res = number.substr(0, 12).split("").map(function(n) {
        return +n;
      }).reduce(function(sum, a, idx) {
        return idx % 2 ? sum + a * 3 : sum + a;
      }, 0);
      return (10 - res % 10) % 10;
    };
    var EAN13 = function(_EAN) {
      _inherits(EAN132, _EAN);
      function EAN132(data, options) {
        _classCallCheck(this, EAN132);
        if (data.search(/^[0-9]{12}$/) !== -1) {
          data += checksum(data);
        }
        var _this = _possibleConstructorReturn(this, (EAN132.__proto__ || Object.getPrototypeOf(EAN132)).call(this, data, options));
        _this.lastChar = options.lastChar;
        return _this;
      }
      _createClass(EAN132, [{
        key: "valid",
        value: function valid() {
          return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === checksum(this.data);
        }
      }, {
        key: "leftText",
        value: function leftText() {
          return _get(EAN132.prototype.__proto__ || Object.getPrototypeOf(EAN132.prototype), "leftText", this).call(this, 1, 6);
        }
      }, {
        key: "leftEncode",
        value: function leftEncode() {
          var data = this.data.substr(1, 6);
          var structure = _constants.EAN13_STRUCTURE[this.data[0]];
          return _get(EAN132.prototype.__proto__ || Object.getPrototypeOf(EAN132.prototype), "leftEncode", this).call(this, data, structure);
        }
      }, {
        key: "rightText",
        value: function rightText() {
          return _get(EAN132.prototype.__proto__ || Object.getPrototypeOf(EAN132.prototype), "rightText", this).call(this, 7, 6);
        }
      }, {
        key: "rightEncode",
        value: function rightEncode() {
          var data = this.data.substr(7, 6);
          return _get(EAN132.prototype.__proto__ || Object.getPrototypeOf(EAN132.prototype), "rightEncode", this).call(this, data, "RRRRRR");
        }
        // The "standard" way of printing EAN13 barcodes with guard bars
      }, {
        key: "encodeGuarded",
        value: function encodeGuarded() {
          var data = _get(EAN132.prototype.__proto__ || Object.getPrototypeOf(EAN132.prototype), "encodeGuarded", this).call(this);
          if (this.options.displayValue) {
            data.unshift({
              data: "000000000000",
              text: this.text.substr(0, 1),
              options: { textAlign: "left", fontSize: this.fontSize }
            });
            if (this.options.lastChar) {
              data.push({
                data: "00"
              });
              data.push({
                data: "00000",
                text: this.options.lastChar,
                options: { fontSize: this.fontSize }
              });
            }
          }
          return data;
        }
      }]);
      return EAN132;
    }(_EAN3.default);
    exports.default = EAN13;
  }
});

// node_modules/jsbarcode/bin/barcodes/EAN_UPC/EAN8.js
var require_EAN8 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/EAN_UPC/EAN8.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);
      if (desc === void 0) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return void 0;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === void 0) {
          return void 0;
        }
        return getter.call(receiver);
      }
    };
    var _EAN2 = require_EAN();
    var _EAN3 = _interopRequireDefault(_EAN2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var checksum = function checksum2(number) {
      var res = number.substr(0, 7).split("").map(function(n) {
        return +n;
      }).reduce(function(sum, a, idx) {
        return idx % 2 ? sum + a : sum + a * 3;
      }, 0);
      return (10 - res % 10) % 10;
    };
    var EAN8 = function(_EAN) {
      _inherits(EAN82, _EAN);
      function EAN82(data, options) {
        _classCallCheck(this, EAN82);
        if (data.search(/^[0-9]{7}$/) !== -1) {
          data += checksum(data);
        }
        return _possibleConstructorReturn(this, (EAN82.__proto__ || Object.getPrototypeOf(EAN82)).call(this, data, options));
      }
      _createClass(EAN82, [{
        key: "valid",
        value: function valid() {
          return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === checksum(this.data);
        }
      }, {
        key: "leftText",
        value: function leftText() {
          return _get(EAN82.prototype.__proto__ || Object.getPrototypeOf(EAN82.prototype), "leftText", this).call(this, 0, 4);
        }
      }, {
        key: "leftEncode",
        value: function leftEncode() {
          var data = this.data.substr(0, 4);
          return _get(EAN82.prototype.__proto__ || Object.getPrototypeOf(EAN82.prototype), "leftEncode", this).call(this, data, "LLLL");
        }
      }, {
        key: "rightText",
        value: function rightText() {
          return _get(EAN82.prototype.__proto__ || Object.getPrototypeOf(EAN82.prototype), "rightText", this).call(this, 4, 4);
        }
      }, {
        key: "rightEncode",
        value: function rightEncode() {
          var data = this.data.substr(4, 4);
          return _get(EAN82.prototype.__proto__ || Object.getPrototypeOf(EAN82.prototype), "rightEncode", this).call(this, data, "RRRR");
        }
      }]);
      return EAN82;
    }(_EAN3.default);
    exports.default = EAN8;
  }
});

// node_modules/jsbarcode/bin/barcodes/EAN_UPC/EAN5.js
var require_EAN5 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/EAN_UPC/EAN5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _constants = require_constants2();
    var _encoder = require_encoder();
    var _encoder2 = _interopRequireDefault(_encoder);
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var checksum = function checksum2(data) {
      var result = data.split("").map(function(n) {
        return +n;
      }).reduce(function(sum, a, idx) {
        return idx % 2 ? sum + a * 9 : sum + a * 3;
      }, 0);
      return result % 10;
    };
    var EAN5 = function(_Barcode) {
      _inherits(EAN52, _Barcode);
      function EAN52(data, options) {
        _classCallCheck(this, EAN52);
        return _possibleConstructorReturn(this, (EAN52.__proto__ || Object.getPrototypeOf(EAN52)).call(this, data, options));
      }
      _createClass(EAN52, [{
        key: "valid",
        value: function valid() {
          return this.data.search(/^[0-9]{5}$/) !== -1;
        }
      }, {
        key: "encode",
        value: function encode() {
          var structure = _constants.EAN5_STRUCTURE[checksum(this.data)];
          return {
            data: "1011" + (0, _encoder2.default)(this.data, structure, "01"),
            text: this.text
          };
        }
      }]);
      return EAN52;
    }(_Barcode3.default);
    exports.default = EAN5;
  }
});

// node_modules/jsbarcode/bin/barcodes/EAN_UPC/EAN2.js
var require_EAN2 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/EAN_UPC/EAN2.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _constants = require_constants2();
    var _encoder = require_encoder();
    var _encoder2 = _interopRequireDefault(_encoder);
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var EAN2 = function(_Barcode) {
      _inherits(EAN22, _Barcode);
      function EAN22(data, options) {
        _classCallCheck(this, EAN22);
        return _possibleConstructorReturn(this, (EAN22.__proto__ || Object.getPrototypeOf(EAN22)).call(this, data, options));
      }
      _createClass(EAN22, [{
        key: "valid",
        value: function valid() {
          return this.data.search(/^[0-9]{2}$/) !== -1;
        }
      }, {
        key: "encode",
        value: function encode() {
          var structure = _constants.EAN2_STRUCTURE[parseInt(this.data) % 4];
          return {
            // Start bits + Encode the two digits with 01 in between
            data: "1011" + (0, _encoder2.default)(this.data, structure, "01"),
            text: this.text
          };
        }
      }]);
      return EAN22;
    }(_Barcode3.default);
    exports.default = EAN2;
  }
});

// node_modules/jsbarcode/bin/barcodes/EAN_UPC/UPC.js
var require_UPC = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/EAN_UPC/UPC.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    exports.checksum = checksum;
    var _encoder = require_encoder();
    var _encoder2 = _interopRequireDefault(_encoder);
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var UPC = function(_Barcode) {
      _inherits(UPC2, _Barcode);
      function UPC2(data, options) {
        _classCallCheck(this, UPC2);
        if (data.search(/^[0-9]{11}$/) !== -1) {
          data += checksum(data);
        }
        var _this = _possibleConstructorReturn(this, (UPC2.__proto__ || Object.getPrototypeOf(UPC2)).call(this, data, options));
        _this.displayValue = options.displayValue;
        if (options.fontSize > options.width * 10) {
          _this.fontSize = options.width * 10;
        } else {
          _this.fontSize = options.fontSize;
        }
        _this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
        return _this;
      }
      _createClass(UPC2, [{
        key: "valid",
        value: function valid() {
          return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum(this.data);
        }
      }, {
        key: "encode",
        value: function encode() {
          if (this.options.flat) {
            return this.flatEncoding();
          } else {
            return this.guardedEncoding();
          }
        }
      }, {
        key: "flatEncoding",
        value: function flatEncoding() {
          var result = "";
          result += "101";
          result += (0, _encoder2.default)(this.data.substr(0, 6), "LLLLLL");
          result += "01010";
          result += (0, _encoder2.default)(this.data.substr(6, 6), "RRRRRR");
          result += "101";
          return {
            data: result,
            text: this.text
          };
        }
      }, {
        key: "guardedEncoding",
        value: function guardedEncoding() {
          var result = [];
          if (this.displayValue) {
            result.push({
              data: "00000000",
              text: this.text.substr(0, 1),
              options: { textAlign: "left", fontSize: this.fontSize }
            });
          }
          result.push({
            data: "101" + (0, _encoder2.default)(this.data[0], "L"),
            options: { height: this.guardHeight }
          });
          result.push({
            data: (0, _encoder2.default)(this.data.substr(1, 5), "LLLLL"),
            text: this.text.substr(1, 5),
            options: { fontSize: this.fontSize }
          });
          result.push({
            data: "01010",
            options: { height: this.guardHeight }
          });
          result.push({
            data: (0, _encoder2.default)(this.data.substr(6, 5), "RRRRR"),
            text: this.text.substr(6, 5),
            options: { fontSize: this.fontSize }
          });
          result.push({
            data: (0, _encoder2.default)(this.data[11], "R") + "101",
            options: { height: this.guardHeight }
          });
          if (this.displayValue) {
            result.push({
              data: "00000000",
              text: this.text.substr(11, 1),
              options: { textAlign: "right", fontSize: this.fontSize }
            });
          }
          return result;
        }
      }]);
      return UPC2;
    }(_Barcode3.default);
    function checksum(number) {
      var result = 0;
      var i;
      for (i = 1; i < 11; i += 2) {
        result += parseInt(number[i]);
      }
      for (i = 0; i < 11; i += 2) {
        result += parseInt(number[i]) * 3;
      }
      return (10 - result % 10) % 10;
    }
    exports.default = UPC;
  }
});

// node_modules/jsbarcode/bin/barcodes/EAN_UPC/UPCE.js
var require_UPCE = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/EAN_UPC/UPCE.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _encoder = require_encoder();
    var _encoder2 = _interopRequireDefault(_encoder);
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    var _UPC = require_UPC();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var EXPANSIONS = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"];
    var PARITIES = [["EEEOOO", "OOOEEE"], ["EEOEOO", "OOEOEE"], ["EEOOEO", "OOEEOE"], ["EEOOOE", "OOEEEO"], ["EOEEOO", "OEOOEE"], ["EOOEEO", "OEEOOE"], ["EOOOEE", "OEEEOO"], ["EOEOEO", "OEOEOE"], ["EOEOOE", "OEOEEO"], ["EOOEOE", "OEEOEO"]];
    var UPCE = function(_Barcode) {
      _inherits(UPCE2, _Barcode);
      function UPCE2(data, options) {
        _classCallCheck(this, UPCE2);
        var _this = _possibleConstructorReturn(this, (UPCE2.__proto__ || Object.getPrototypeOf(UPCE2)).call(this, data, options));
        _this.isValid = false;
        if (data.search(/^[0-9]{6}$/) !== -1) {
          _this.middleDigits = data;
          _this.upcA = expandToUPCA(data, "0");
          _this.text = options.text || "" + _this.upcA[0] + data + _this.upcA[_this.upcA.length - 1];
          _this.isValid = true;
        } else if (data.search(/^[01][0-9]{7}$/) !== -1) {
          _this.middleDigits = data.substring(1, data.length - 1);
          _this.upcA = expandToUPCA(_this.middleDigits, data[0]);
          if (_this.upcA[_this.upcA.length - 1] === data[data.length - 1]) {
            _this.isValid = true;
          } else {
            return _possibleConstructorReturn(_this);
          }
        } else {
          return _possibleConstructorReturn(_this);
        }
        _this.displayValue = options.displayValue;
        if (options.fontSize > options.width * 10) {
          _this.fontSize = options.width * 10;
        } else {
          _this.fontSize = options.fontSize;
        }
        _this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
        return _this;
      }
      _createClass(UPCE2, [{
        key: "valid",
        value: function valid() {
          return this.isValid;
        }
      }, {
        key: "encode",
        value: function encode() {
          if (this.options.flat) {
            return this.flatEncoding();
          } else {
            return this.guardedEncoding();
          }
        }
      }, {
        key: "flatEncoding",
        value: function flatEncoding() {
          var result = "";
          result += "101";
          result += this.encodeMiddleDigits();
          result += "010101";
          return {
            data: result,
            text: this.text
          };
        }
      }, {
        key: "guardedEncoding",
        value: function guardedEncoding() {
          var result = [];
          if (this.displayValue) {
            result.push({
              data: "00000000",
              text: this.text[0],
              options: { textAlign: "left", fontSize: this.fontSize }
            });
          }
          result.push({
            data: "101",
            options: { height: this.guardHeight }
          });
          result.push({
            data: this.encodeMiddleDigits(),
            text: this.text.substring(1, 7),
            options: { fontSize: this.fontSize }
          });
          result.push({
            data: "010101",
            options: { height: this.guardHeight }
          });
          if (this.displayValue) {
            result.push({
              data: "00000000",
              text: this.text[7],
              options: { textAlign: "right", fontSize: this.fontSize }
            });
          }
          return result;
        }
      }, {
        key: "encodeMiddleDigits",
        value: function encodeMiddleDigits() {
          var numberSystem = this.upcA[0];
          var checkDigit = this.upcA[this.upcA.length - 1];
          var parity = PARITIES[parseInt(checkDigit)][parseInt(numberSystem)];
          return (0, _encoder2.default)(this.middleDigits, parity);
        }
      }]);
      return UPCE2;
    }(_Barcode3.default);
    function expandToUPCA(middleDigits, numberSystem) {
      var lastUpcE = parseInt(middleDigits[middleDigits.length - 1]);
      var expansion = EXPANSIONS[lastUpcE];
      var result = "";
      var digitIndex = 0;
      for (var i = 0; i < expansion.length; i++) {
        var c = expansion[i];
        if (c === "X") {
          result += middleDigits[digitIndex++];
        } else {
          result += c;
        }
      }
      result = "" + numberSystem + result;
      return "" + result + (0, _UPC.checksum)(result);
    }
    exports.default = UPCE;
  }
});

// node_modules/jsbarcode/bin/barcodes/EAN_UPC/index.js
var require_EAN_UPC = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/EAN_UPC/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UPCE = exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = void 0;
    var _EAN = require_EAN13();
    var _EAN2 = _interopRequireDefault(_EAN);
    var _EAN3 = require_EAN8();
    var _EAN4 = _interopRequireDefault(_EAN3);
    var _EAN5 = require_EAN5();
    var _EAN6 = _interopRequireDefault(_EAN5);
    var _EAN7 = require_EAN2();
    var _EAN8 = _interopRequireDefault(_EAN7);
    var _UPC = require_UPC();
    var _UPC2 = _interopRequireDefault(_UPC);
    var _UPCE = require_UPCE();
    var _UPCE2 = _interopRequireDefault(_UPCE);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.EAN13 = _EAN2.default;
    exports.EAN8 = _EAN4.default;
    exports.EAN5 = _EAN6.default;
    exports.EAN2 = _EAN8.default;
    exports.UPC = _UPC2.default;
    exports.UPCE = _UPCE2.default;
  }
});

// node_modules/jsbarcode/bin/barcodes/ITF/constants.js
var require_constants3 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/ITF/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var START_BIN = exports.START_BIN = "1010";
    var END_BIN = exports.END_BIN = "11101";
    var BINARIES = exports.BINARIES = ["00110", "10001", "01001", "11000", "00101", "10100", "01100", "00011", "10010", "01010"];
  }
});

// node_modules/jsbarcode/bin/barcodes/ITF/ITF.js
var require_ITF = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/ITF/ITF.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _constants = require_constants3();
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var ITF = function(_Barcode) {
      _inherits(ITF2, _Barcode);
      function ITF2() {
        _classCallCheck(this, ITF2);
        return _possibleConstructorReturn(this, (ITF2.__proto__ || Object.getPrototypeOf(ITF2)).apply(this, arguments));
      }
      _createClass(ITF2, [{
        key: "valid",
        value: function valid() {
          return this.data.search(/^([0-9]{2})+$/) !== -1;
        }
      }, {
        key: "encode",
        value: function encode() {
          var _this2 = this;
          var encoded = this.data.match(/.{2}/g).map(function(pair) {
            return _this2.encodePair(pair);
          }).join("");
          return {
            data: _constants.START_BIN + encoded + _constants.END_BIN,
            text: this.text
          };
        }
        // Calculate the data of a number pair
      }, {
        key: "encodePair",
        value: function encodePair(pair) {
          var second = _constants.BINARIES[pair[1]];
          return _constants.BINARIES[pair[0]].split("").map(function(first, idx) {
            return (first === "1" ? "111" : "1") + (second[idx] === "1" ? "000" : "0");
          }).join("");
        }
      }]);
      return ITF2;
    }(_Barcode3.default);
    exports.default = ITF;
  }
});

// node_modules/jsbarcode/bin/barcodes/ITF/ITF14.js
var require_ITF14 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/ITF/ITF14.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _ITF2 = require_ITF();
    var _ITF3 = _interopRequireDefault(_ITF2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var checksum = function checksum2(data) {
      var res = data.substr(0, 13).split("").map(function(num) {
        return parseInt(num, 10);
      }).reduce(function(sum, n, idx) {
        return sum + n * (3 - idx % 2 * 2);
      }, 0);
      return Math.ceil(res / 10) * 10 - res;
    };
    var ITF14 = function(_ITF) {
      _inherits(ITF142, _ITF);
      function ITF142(data, options) {
        _classCallCheck(this, ITF142);
        if (data.search(/^[0-9]{13}$/) !== -1) {
          data += checksum(data);
        }
        return _possibleConstructorReturn(this, (ITF142.__proto__ || Object.getPrototypeOf(ITF142)).call(this, data, options));
      }
      _createClass(ITF142, [{
        key: "valid",
        value: function valid() {
          return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === checksum(this.data);
        }
      }]);
      return ITF142;
    }(_ITF3.default);
    exports.default = ITF14;
  }
});

// node_modules/jsbarcode/bin/barcodes/ITF/index.js
var require_ITF2 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/ITF/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ITF14 = exports.ITF = void 0;
    var _ITF = require_ITF();
    var _ITF2 = _interopRequireDefault(_ITF);
    var _ITF3 = require_ITF14();
    var _ITF4 = _interopRequireDefault(_ITF3);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.ITF = _ITF2.default;
    exports.ITF14 = _ITF4.default;
  }
});

// node_modules/jsbarcode/bin/barcodes/MSI/MSI.js
var require_MSI = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/MSI/MSI.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var MSI = function(_Barcode) {
      _inherits(MSI2, _Barcode);
      function MSI2(data, options) {
        _classCallCheck(this, MSI2);
        return _possibleConstructorReturn(this, (MSI2.__proto__ || Object.getPrototypeOf(MSI2)).call(this, data, options));
      }
      _createClass(MSI2, [{
        key: "encode",
        value: function encode() {
          var ret = "110";
          for (var i = 0; i < this.data.length; i++) {
            var digit = parseInt(this.data[i]);
            var bin = digit.toString(2);
            bin = addZeroes(bin, 4 - bin.length);
            for (var b = 0; b < bin.length; b++) {
              ret += bin[b] == "0" ? "100" : "110";
            }
          }
          ret += "1001";
          return {
            data: ret,
            text: this.text
          };
        }
      }, {
        key: "valid",
        value: function valid() {
          return this.data.search(/^[0-9]+$/) !== -1;
        }
      }]);
      return MSI2;
    }(_Barcode3.default);
    function addZeroes(number, n) {
      for (var i = 0; i < n; i++) {
        number = "0" + number;
      }
      return number;
    }
    exports.default = MSI;
  }
});

// node_modules/jsbarcode/bin/barcodes/MSI/checksums.js
var require_checksums = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/MSI/checksums.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.mod10 = mod10;
    exports.mod11 = mod11;
    function mod10(number) {
      var sum = 0;
      for (var i = 0; i < number.length; i++) {
        var n = parseInt(number[i]);
        if ((i + number.length) % 2 === 0) {
          sum += n;
        } else {
          sum += n * 2 % 10 + Math.floor(n * 2 / 10);
        }
      }
      return (10 - sum % 10) % 10;
    }
    function mod11(number) {
      var sum = 0;
      var weights = [2, 3, 4, 5, 6, 7];
      for (var i = 0; i < number.length; i++) {
        var n = parseInt(number[number.length - 1 - i]);
        sum += weights[i % weights.length] * n;
      }
      return (11 - sum % 11) % 11;
    }
  }
});

// node_modules/jsbarcode/bin/barcodes/MSI/MSI10.js
var require_MSI10 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/MSI/MSI10.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _MSI2 = require_MSI();
    var _MSI3 = _interopRequireDefault(_MSI2);
    var _checksums = require_checksums();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var MSI10 = function(_MSI) {
      _inherits(MSI102, _MSI);
      function MSI102(data, options) {
        _classCallCheck(this, MSI102);
        return _possibleConstructorReturn(this, (MSI102.__proto__ || Object.getPrototypeOf(MSI102)).call(this, data + (0, _checksums.mod10)(data), options));
      }
      return MSI102;
    }(_MSI3.default);
    exports.default = MSI10;
  }
});

// node_modules/jsbarcode/bin/barcodes/MSI/MSI11.js
var require_MSI11 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/MSI/MSI11.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _MSI2 = require_MSI();
    var _MSI3 = _interopRequireDefault(_MSI2);
    var _checksums = require_checksums();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var MSI11 = function(_MSI) {
      _inherits(MSI112, _MSI);
      function MSI112(data, options) {
        _classCallCheck(this, MSI112);
        return _possibleConstructorReturn(this, (MSI112.__proto__ || Object.getPrototypeOf(MSI112)).call(this, data + (0, _checksums.mod11)(data), options));
      }
      return MSI112;
    }(_MSI3.default);
    exports.default = MSI11;
  }
});

// node_modules/jsbarcode/bin/barcodes/MSI/MSI1010.js
var require_MSI1010 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/MSI/MSI1010.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _MSI2 = require_MSI();
    var _MSI3 = _interopRequireDefault(_MSI2);
    var _checksums = require_checksums();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var MSI1010 = function(_MSI) {
      _inherits(MSI10102, _MSI);
      function MSI10102(data, options) {
        _classCallCheck(this, MSI10102);
        data += (0, _checksums.mod10)(data);
        data += (0, _checksums.mod10)(data);
        return _possibleConstructorReturn(this, (MSI10102.__proto__ || Object.getPrototypeOf(MSI10102)).call(this, data, options));
      }
      return MSI10102;
    }(_MSI3.default);
    exports.default = MSI1010;
  }
});

// node_modules/jsbarcode/bin/barcodes/MSI/MSI1110.js
var require_MSI1110 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/MSI/MSI1110.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _MSI2 = require_MSI();
    var _MSI3 = _interopRequireDefault(_MSI2);
    var _checksums = require_checksums();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var MSI1110 = function(_MSI) {
      _inherits(MSI11102, _MSI);
      function MSI11102(data, options) {
        _classCallCheck(this, MSI11102);
        data += (0, _checksums.mod11)(data);
        data += (0, _checksums.mod10)(data);
        return _possibleConstructorReturn(this, (MSI11102.__proto__ || Object.getPrototypeOf(MSI11102)).call(this, data, options));
      }
      return MSI11102;
    }(_MSI3.default);
    exports.default = MSI1110;
  }
});

// node_modules/jsbarcode/bin/barcodes/MSI/index.js
var require_MSI2 = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/MSI/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI10 = exports.MSI = void 0;
    var _MSI = require_MSI();
    var _MSI2 = _interopRequireDefault(_MSI);
    var _MSI3 = require_MSI10();
    var _MSI4 = _interopRequireDefault(_MSI3);
    var _MSI5 = require_MSI11();
    var _MSI6 = _interopRequireDefault(_MSI5);
    var _MSI7 = require_MSI1010();
    var _MSI8 = _interopRequireDefault(_MSI7);
    var _MSI9 = require_MSI1110();
    var _MSI10 = _interopRequireDefault(_MSI9);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.MSI = _MSI2.default;
    exports.MSI10 = _MSI4.default;
    exports.MSI11 = _MSI6.default;
    exports.MSI1010 = _MSI8.default;
    exports.MSI1110 = _MSI10.default;
  }
});

// node_modules/jsbarcode/bin/barcodes/pharmacode/index.js
var require_pharmacode = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/pharmacode/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.pharmacode = void 0;
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var pharmacode = function(_Barcode) {
      _inherits(pharmacode2, _Barcode);
      function pharmacode2(data, options) {
        _classCallCheck(this, pharmacode2);
        var _this = _possibleConstructorReturn(this, (pharmacode2.__proto__ || Object.getPrototypeOf(pharmacode2)).call(this, data, options));
        _this.number = parseInt(data, 10);
        return _this;
      }
      _createClass(pharmacode2, [{
        key: "encode",
        value: function encode() {
          var z = this.number;
          var result = "";
          while (!isNaN(z) && z != 0) {
            if (z % 2 === 0) {
              result = "11100" + result;
              z = (z - 2) / 2;
            } else {
              result = "100" + result;
              z = (z - 1) / 2;
            }
          }
          result = result.slice(0, -2);
          return {
            data: result,
            text: this.text
          };
        }
      }, {
        key: "valid",
        value: function valid() {
          return this.number >= 3 && this.number <= 131070;
        }
      }]);
      return pharmacode2;
    }(_Barcode3.default);
    exports.pharmacode = pharmacode;
  }
});

// node_modules/jsbarcode/bin/barcodes/codabar/index.js
var require_codabar = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/codabar/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.codabar = void 0;
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var codabar = function(_Barcode) {
      _inherits(codabar2, _Barcode);
      function codabar2(data, options) {
        _classCallCheck(this, codabar2);
        if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
          data = "A" + data + "A";
        }
        var _this = _possibleConstructorReturn(this, (codabar2.__proto__ || Object.getPrototypeOf(codabar2)).call(this, data.toUpperCase(), options));
        _this.text = _this.options.text || _this.text.replace(/[A-D]/g, "");
        return _this;
      }
      _createClass(codabar2, [{
        key: "valid",
        value: function valid() {
          return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
        }
      }, {
        key: "encode",
        value: function encode() {
          var result = [];
          var encodings = this.getEncodings();
          for (var i = 0; i < this.data.length; i++) {
            result.push(encodings[this.data.charAt(i)]);
            if (i !== this.data.length - 1) {
              result.push("0");
            }
          }
          return {
            text: this.text,
            data: result.join("")
          };
        }
      }, {
        key: "getEncodings",
        value: function getEncodings() {
          return {
            "0": "101010011",
            "1": "101011001",
            "2": "101001011",
            "3": "110010101",
            "4": "101101001",
            "5": "110101001",
            "6": "100101011",
            "7": "100101101",
            "8": "100110101",
            "9": "110100101",
            "-": "101001101",
            "$": "101100101",
            ":": "1101011011",
            "/": "1101101011",
            ".": "1101101101",
            "+": "1011011011",
            "A": "1011001001",
            "B": "1001001011",
            "C": "1010010011",
            "D": "1010011001"
          };
        }
      }]);
      return codabar2;
    }(_Barcode3.default);
    exports.codabar = codabar;
  }
});

// node_modules/jsbarcode/bin/barcodes/GenericBarcode/index.js
var require_GenericBarcode = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/GenericBarcode/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GenericBarcode = void 0;
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _Barcode2 = require_Barcode();
    var _Barcode3 = _interopRequireDefault(_Barcode2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var GenericBarcode = function(_Barcode) {
      _inherits(GenericBarcode2, _Barcode);
      function GenericBarcode2(data, options) {
        _classCallCheck(this, GenericBarcode2);
        return _possibleConstructorReturn(this, (GenericBarcode2.__proto__ || Object.getPrototypeOf(GenericBarcode2)).call(this, data, options));
      }
      _createClass(GenericBarcode2, [{
        key: "encode",
        value: function encode() {
          return {
            data: "10101010101010101010101010101010101010101",
            text: this.text
          };
        }
        // Resturn true/false if the string provided is valid for this encoder
      }, {
        key: "valid",
        value: function valid() {
          return true;
        }
      }]);
      return GenericBarcode2;
    }(_Barcode3.default);
    exports.GenericBarcode = GenericBarcode;
  }
});

// node_modules/jsbarcode/bin/barcodes/index.js
var require_barcodes = __commonJS({
  "node_modules/jsbarcode/bin/barcodes/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _CODE = require_CODE39();
    var _CODE2 = require_CODE1282();
    var _EAN_UPC = require_EAN_UPC();
    var _ITF = require_ITF2();
    var _MSI = require_MSI2();
    var _pharmacode = require_pharmacode();
    var _codabar = require_codabar();
    var _GenericBarcode = require_GenericBarcode();
    exports.default = {
      CODE39: _CODE.CODE39,
      CODE128: _CODE2.CODE128,
      CODE128A: _CODE2.CODE128A,
      CODE128B: _CODE2.CODE128B,
      CODE128C: _CODE2.CODE128C,
      EAN13: _EAN_UPC.EAN13,
      EAN8: _EAN_UPC.EAN8,
      EAN5: _EAN_UPC.EAN5,
      EAN2: _EAN_UPC.EAN2,
      UPC: _EAN_UPC.UPC,
      UPCE: _EAN_UPC.UPCE,
      ITF14: _ITF.ITF14,
      ITF: _ITF.ITF,
      MSI: _MSI.MSI,
      MSI10: _MSI.MSI10,
      MSI11: _MSI.MSI11,
      MSI1010: _MSI.MSI1010,
      MSI1110: _MSI.MSI1110,
      pharmacode: _pharmacode.pharmacode,
      codabar: _codabar.codabar,
      GenericBarcode: _GenericBarcode.GenericBarcode
    };
  }
});

// node_modules/jsbarcode/bin/help/merge.js
var require_merge = __commonJS({
  "node_modules/jsbarcode/bin/help/merge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
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
    exports.default = function(old, replaceObj) {
      return _extends({}, old, replaceObj);
    };
  }
});

// node_modules/jsbarcode/bin/help/linearizeEncodings.js
var require_linearizeEncodings = __commonJS({
  "node_modules/jsbarcode/bin/help/linearizeEncodings.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = linearizeEncodings;
    function linearizeEncodings(encodings) {
      var linearEncodings = [];
      function nextLevel(encoded) {
        if (Array.isArray(encoded)) {
          for (var i = 0; i < encoded.length; i++) {
            nextLevel(encoded[i]);
          }
        } else {
          encoded.text = encoded.text || "";
          encoded.data = encoded.data || "";
          linearEncodings.push(encoded);
        }
      }
      nextLevel(encodings);
      return linearEncodings;
    }
  }
});

// node_modules/jsbarcode/bin/help/fixOptions.js
var require_fixOptions = __commonJS({
  "node_modules/jsbarcode/bin/help/fixOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = fixOptions;
    function fixOptions(options) {
      options.marginTop = options.marginTop || options.margin;
      options.marginBottom = options.marginBottom || options.margin;
      options.marginRight = options.marginRight || options.margin;
      options.marginLeft = options.marginLeft || options.margin;
      return options;
    }
  }
});

// node_modules/jsbarcode/bin/help/optionsFromStrings.js
var require_optionsFromStrings = __commonJS({
  "node_modules/jsbarcode/bin/help/optionsFromStrings.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = optionsFromStrings;
    function optionsFromStrings(options) {
      var intOptions = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];
      for (var intOption in intOptions) {
        if (intOptions.hasOwnProperty(intOption)) {
          intOption = intOptions[intOption];
          if (typeof options[intOption] === "string") {
            options[intOption] = parseInt(options[intOption], 10);
          }
        }
      }
      if (typeof options["displayValue"] === "string") {
        options["displayValue"] = options["displayValue"] != "false";
      }
      return options;
    }
  }
});

// node_modules/jsbarcode/bin/options/defaults.js
var require_defaults = __commonJS({
  "node_modules/jsbarcode/bin/options/defaults.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var defaults = {
      width: 2,
      height: 100,
      format: "auto",
      displayValue: true,
      fontOptions: "",
      font: "monospace",
      text: void 0,
      textAlign: "center",
      textPosition: "bottom",
      textMargin: 2,
      fontSize: 20,
      background: "#ffffff",
      lineColor: "#000000",
      margin: 10,
      marginTop: void 0,
      marginBottom: void 0,
      marginLeft: void 0,
      marginRight: void 0,
      valid: function valid() {
      }
    };
    exports.default = defaults;
  }
});

// node_modules/jsbarcode/bin/help/getOptionsFromElement.js
var require_getOptionsFromElement = __commonJS({
  "node_modules/jsbarcode/bin/help/getOptionsFromElement.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _optionsFromStrings = require_optionsFromStrings();
    var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);
    var _defaults = require_defaults();
    var _defaults2 = _interopRequireDefault(_defaults);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getOptionsFromElement(element) {
      var options = {};
      for (var property in _defaults2.default) {
        if (_defaults2.default.hasOwnProperty(property)) {
          if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) {
            options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
          }
          if (element.hasAttribute("data-" + property.toLowerCase())) {
            options[property] = element.getAttribute("data-" + property.toLowerCase());
          }
        }
      }
      options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");
      options = (0, _optionsFromStrings2.default)(options);
      return options;
    }
    exports.default = getOptionsFromElement;
  }
});

// node_modules/jsbarcode/bin/renderers/shared.js
var require_shared = __commonJS({
  "node_modules/jsbarcode/bin/renderers/shared.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getTotalWidthOfEncodings = exports.calculateEncodingAttributes = exports.getBarcodePadding = exports.getEncodingHeight = exports.getMaximumHeightOfEncodings = void 0;
    var _merge = require_merge();
    var _merge2 = _interopRequireDefault(_merge);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getEncodingHeight(encoding, options) {
      return options.height + (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
    }
    function getBarcodePadding(textWidth, barcodeWidth, options) {
      if (options.displayValue && barcodeWidth < textWidth) {
        if (options.textAlign == "center") {
          return Math.floor((textWidth - barcodeWidth) / 2);
        } else if (options.textAlign == "left") {
          return 0;
        } else if (options.textAlign == "right") {
          return Math.floor(textWidth - barcodeWidth);
        }
      }
      return 0;
    }
    function calculateEncodingAttributes(encodings, barcodeOptions, context) {
      for (var i = 0; i < encodings.length; i++) {
        var encoding = encodings[i];
        var options = (0, _merge2.default)(barcodeOptions, encoding.options);
        var textWidth;
        if (options.displayValue) {
          textWidth = messureText(encoding.text, options, context);
        } else {
          textWidth = 0;
        }
        var barcodeWidth = encoding.data.length * options.width;
        encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));
        encoding.height = getEncodingHeight(encoding, options);
        encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
      }
    }
    function getTotalWidthOfEncodings(encodings) {
      var totalWidth = 0;
      for (var i = 0; i < encodings.length; i++) {
        totalWidth += encodings[i].width;
      }
      return totalWidth;
    }
    function getMaximumHeightOfEncodings(encodings) {
      var maxHeight = 0;
      for (var i = 0; i < encodings.length; i++) {
        if (encodings[i].height > maxHeight) {
          maxHeight = encodings[i].height;
        }
      }
      return maxHeight;
    }
    function messureText(string, options, context) {
      var ctx;
      if (context) {
        ctx = context;
      } else if (typeof document !== "undefined") {
        ctx = document.createElement("canvas").getContext("2d");
      } else {
        return 0;
      }
      ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;
      var measureTextResult = ctx.measureText(string);
      if (!measureTextResult) {
        return 0;
      }
      var size = measureTextResult.width;
      return size;
    }
    exports.getMaximumHeightOfEncodings = getMaximumHeightOfEncodings;
    exports.getEncodingHeight = getEncodingHeight;
    exports.getBarcodePadding = getBarcodePadding;
    exports.calculateEncodingAttributes = calculateEncodingAttributes;
    exports.getTotalWidthOfEncodings = getTotalWidthOfEncodings;
  }
});

// node_modules/jsbarcode/bin/renderers/canvas.js
var require_canvas = __commonJS({
  "node_modules/jsbarcode/bin/renderers/canvas.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _merge = require_merge();
    var _merge2 = _interopRequireDefault(_merge);
    var _shared = require_shared();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var CanvasRenderer = function() {
      function CanvasRenderer2(canvas, encodings, options) {
        _classCallCheck(this, CanvasRenderer2);
        this.canvas = canvas;
        this.encodings = encodings;
        this.options = options;
      }
      _createClass(CanvasRenderer2, [{
        key: "render",
        value: function render() {
          if (!this.canvas.getContext) {
            throw new Error("The browser does not support canvas.");
          }
          this.prepareCanvas();
          for (var i = 0; i < this.encodings.length; i++) {
            var encodingOptions = (0, _merge2.default)(this.options, this.encodings[i].options);
            this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
            this.drawCanvasText(encodingOptions, this.encodings[i]);
            this.moveCanvasDrawing(this.encodings[i]);
          }
          this.restoreCanvas();
        }
      }, {
        key: "prepareCanvas",
        value: function prepareCanvas() {
          var ctx = this.canvas.getContext("2d");
          ctx.save();
          (0, _shared.calculateEncodingAttributes)(this.encodings, this.options, ctx);
          var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
          var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);
          this.canvas.width = totalWidth + this.options.marginLeft + this.options.marginRight;
          this.canvas.height = maxHeight;
          ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          if (this.options.background) {
            ctx.fillStyle = this.options.background;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          }
          ctx.translate(this.options.marginLeft, 0);
        }
      }, {
        key: "drawCanvasBarcode",
        value: function drawCanvasBarcode(options, encoding) {
          var ctx = this.canvas.getContext("2d");
          var binary = encoding.data;
          var yFrom;
          if (options.textPosition == "top") {
            yFrom = options.marginTop + options.fontSize + options.textMargin;
          } else {
            yFrom = options.marginTop;
          }
          ctx.fillStyle = options.lineColor;
          for (var b = 0; b < binary.length; b++) {
            var x = b * options.width + encoding.barcodePadding;
            if (binary[b] === "1") {
              ctx.fillRect(x, yFrom, options.width, options.height);
            } else if (binary[b]) {
              ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
            }
          }
        }
      }, {
        key: "drawCanvasText",
        value: function drawCanvasText(options, encoding) {
          var ctx = this.canvas.getContext("2d");
          var font = options.fontOptions + " " + options.fontSize + "px " + options.font;
          if (options.displayValue) {
            var x, y;
            if (options.textPosition == "top") {
              y = options.marginTop + options.fontSize - options.textMargin;
            } else {
              y = options.height + options.textMargin + options.marginTop + options.fontSize;
            }
            ctx.font = font;
            if (options.textAlign == "left" || encoding.barcodePadding > 0) {
              x = 0;
              ctx.textAlign = "left";
            } else if (options.textAlign == "right") {
              x = encoding.width - 1;
              ctx.textAlign = "right";
            } else {
              x = encoding.width / 2;
              ctx.textAlign = "center";
            }
            ctx.fillText(encoding.text, x, y);
          }
        }
      }, {
        key: "moveCanvasDrawing",
        value: function moveCanvasDrawing(encoding) {
          var ctx = this.canvas.getContext("2d");
          ctx.translate(encoding.width, 0);
        }
      }, {
        key: "restoreCanvas",
        value: function restoreCanvas() {
          var ctx = this.canvas.getContext("2d");
          ctx.restore();
        }
      }]);
      return CanvasRenderer2;
    }();
    exports.default = CanvasRenderer;
  }
});

// node_modules/jsbarcode/bin/renderers/svg.js
var require_svg = __commonJS({
  "node_modules/jsbarcode/bin/renderers/svg.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _merge = require_merge();
    var _merge2 = _interopRequireDefault(_merge);
    var _shared = require_shared();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var svgns = "http://www.w3.org/2000/svg";
    var SVGRenderer = function() {
      function SVGRenderer2(svg, encodings, options) {
        _classCallCheck(this, SVGRenderer2);
        this.svg = svg;
        this.encodings = encodings;
        this.options = options;
        this.document = options.xmlDocument || document;
      }
      _createClass(SVGRenderer2, [{
        key: "render",
        value: function render() {
          var currentX = this.options.marginLeft;
          this.prepareSVG();
          for (var i = 0; i < this.encodings.length; i++) {
            var encoding = this.encodings[i];
            var encodingOptions = (0, _merge2.default)(this.options, encoding.options);
            var group = this.createGroup(currentX, encodingOptions.marginTop, this.svg);
            this.setGroupOptions(group, encodingOptions);
            this.drawSvgBarcode(group, encodingOptions, encoding);
            this.drawSVGText(group, encodingOptions, encoding);
            currentX += encoding.width;
          }
        }
      }, {
        key: "prepareSVG",
        value: function prepareSVG() {
          while (this.svg.firstChild) {
            this.svg.removeChild(this.svg.firstChild);
          }
          (0, _shared.calculateEncodingAttributes)(this.encodings, this.options);
          var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
          var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);
          var width = totalWidth + this.options.marginLeft + this.options.marginRight;
          this.setSvgAttributes(width, maxHeight);
          if (this.options.background) {
            this.drawRect(0, 0, width, maxHeight, this.svg).setAttribute("style", "fill:" + this.options.background + ";");
          }
        }
      }, {
        key: "drawSvgBarcode",
        value: function drawSvgBarcode(parent, options, encoding) {
          var binary = encoding.data;
          var yFrom;
          if (options.textPosition == "top") {
            yFrom = options.fontSize + options.textMargin;
          } else {
            yFrom = 0;
          }
          var barWidth = 0;
          var x = 0;
          for (var b = 0; b < binary.length; b++) {
            x = b * options.width + encoding.barcodePadding;
            if (binary[b] === "1") {
              barWidth++;
            } else if (barWidth > 0) {
              this.drawRect(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
              barWidth = 0;
            }
          }
          if (barWidth > 0) {
            this.drawRect(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
          }
        }
      }, {
        key: "drawSVGText",
        value: function drawSVGText(parent, options, encoding) {
          var textElem = this.document.createElementNS(svgns, "text");
          if (options.displayValue) {
            var x, y;
            textElem.setAttribute("style", "font:" + options.fontOptions + " " + options.fontSize + "px " + options.font);
            if (options.textPosition == "top") {
              y = options.fontSize - options.textMargin;
            } else {
              y = options.height + options.textMargin + options.fontSize;
            }
            if (options.textAlign == "left" || encoding.barcodePadding > 0) {
              x = 0;
              textElem.setAttribute("text-anchor", "start");
            } else if (options.textAlign == "right") {
              x = encoding.width - 1;
              textElem.setAttribute("text-anchor", "end");
            } else {
              x = encoding.width / 2;
              textElem.setAttribute("text-anchor", "middle");
            }
            textElem.setAttribute("x", x);
            textElem.setAttribute("y", y);
            textElem.appendChild(this.document.createTextNode(encoding.text));
            parent.appendChild(textElem);
          }
        }
      }, {
        key: "setSvgAttributes",
        value: function setSvgAttributes(width, height) {
          var svg = this.svg;
          svg.setAttribute("width", width + "px");
          svg.setAttribute("height", height + "px");
          svg.setAttribute("x", "0px");
          svg.setAttribute("y", "0px");
          svg.setAttribute("viewBox", "0 0 " + width + " " + height);
          svg.setAttribute("xmlns", svgns);
          svg.setAttribute("version", "1.1");
          svg.setAttribute("style", "transform: translate(0,0)");
        }
      }, {
        key: "createGroup",
        value: function createGroup(x, y, parent) {
          var group = this.document.createElementNS(svgns, "g");
          group.setAttribute("transform", "translate(" + x + ", " + y + ")");
          parent.appendChild(group);
          return group;
        }
      }, {
        key: "setGroupOptions",
        value: function setGroupOptions(group, options) {
          group.setAttribute("style", "fill:" + options.lineColor + ";");
        }
      }, {
        key: "drawRect",
        value: function drawRect(x, y, width, height, parent) {
          var rect = this.document.createElementNS(svgns, "rect");
          rect.setAttribute("x", x);
          rect.setAttribute("y", y);
          rect.setAttribute("width", width);
          rect.setAttribute("height", height);
          parent.appendChild(rect);
          return rect;
        }
      }]);
      return SVGRenderer2;
    }();
    exports.default = SVGRenderer;
  }
});

// node_modules/jsbarcode/bin/renderers/object.js
var require_object = __commonJS({
  "node_modules/jsbarcode/bin/renderers/object.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var ObjectRenderer = function() {
      function ObjectRenderer2(object, encodings, options) {
        _classCallCheck(this, ObjectRenderer2);
        this.object = object;
        this.encodings = encodings;
        this.options = options;
      }
      _createClass(ObjectRenderer2, [{
        key: "render",
        value: function render() {
          this.object.encodings = this.encodings;
        }
      }]);
      return ObjectRenderer2;
    }();
    exports.default = ObjectRenderer;
  }
});

// node_modules/jsbarcode/bin/renderers/index.js
var require_renderers = __commonJS({
  "node_modules/jsbarcode/bin/renderers/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _canvas = require_canvas();
    var _canvas2 = _interopRequireDefault(_canvas);
    var _svg = require_svg();
    var _svg2 = _interopRequireDefault(_svg);
    var _object = require_object();
    var _object2 = _interopRequireDefault(_object);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.default = { CanvasRenderer: _canvas2.default, SVGRenderer: _svg2.default, ObjectRenderer: _object2.default };
  }
});

// node_modules/jsbarcode/bin/exceptions/exceptions.js
var require_exceptions = __commonJS({
  "node_modules/jsbarcode/bin/exceptions/exceptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var InvalidInputException = function(_Error) {
      _inherits(InvalidInputException2, _Error);
      function InvalidInputException2(symbology, input) {
        _classCallCheck(this, InvalidInputException2);
        var _this = _possibleConstructorReturn(this, (InvalidInputException2.__proto__ || Object.getPrototypeOf(InvalidInputException2)).call(this));
        _this.name = "InvalidInputException";
        _this.symbology = symbology;
        _this.input = input;
        _this.message = '"' + _this.input + '" is not a valid input for ' + _this.symbology;
        return _this;
      }
      return InvalidInputException2;
    }(Error);
    var InvalidElementException = function(_Error2) {
      _inherits(InvalidElementException2, _Error2);
      function InvalidElementException2() {
        _classCallCheck(this, InvalidElementException2);
        var _this2 = _possibleConstructorReturn(this, (InvalidElementException2.__proto__ || Object.getPrototypeOf(InvalidElementException2)).call(this));
        _this2.name = "InvalidElementException";
        _this2.message = "Not supported type to render on";
        return _this2;
      }
      return InvalidElementException2;
    }(Error);
    var NoElementException = function(_Error3) {
      _inherits(NoElementException2, _Error3);
      function NoElementException2() {
        _classCallCheck(this, NoElementException2);
        var _this3 = _possibleConstructorReturn(this, (NoElementException2.__proto__ || Object.getPrototypeOf(NoElementException2)).call(this));
        _this3.name = "NoElementException";
        _this3.message = "No element to render on.";
        return _this3;
      }
      return NoElementException2;
    }(Error);
    exports.InvalidInputException = InvalidInputException;
    exports.InvalidElementException = InvalidElementException;
    exports.NoElementException = NoElementException;
  }
});

// node_modules/jsbarcode/bin/help/getRenderProperties.js
var require_getRenderProperties = __commonJS({
  "node_modules/jsbarcode/bin/help/getRenderProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var _getOptionsFromElement = require_getOptionsFromElement();
    var _getOptionsFromElement2 = _interopRequireDefault(_getOptionsFromElement);
    var _renderers = require_renderers();
    var _renderers2 = _interopRequireDefault(_renderers);
    var _exceptions = require_exceptions();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getRenderProperties(element) {
      if (typeof element === "string") {
        return querySelectedRenderProperties(element);
      } else if (Array.isArray(element)) {
        var returnArray = [];
        for (var i = 0; i < element.length; i++) {
          returnArray.push(getRenderProperties(element[i]));
        }
        return returnArray;
      } else if (typeof HTMLCanvasElement !== "undefined" && element instanceof HTMLImageElement) {
        return newCanvasRenderProperties(element);
      } else if (element && element.nodeName && element.nodeName.toLowerCase() === "svg" || typeof SVGElement !== "undefined" && element instanceof SVGElement) {
        return {
          element,
          options: (0, _getOptionsFromElement2.default)(element),
          renderer: _renderers2.default.SVGRenderer
        };
      } else if (typeof HTMLCanvasElement !== "undefined" && element instanceof HTMLCanvasElement) {
        return {
          element,
          options: (0, _getOptionsFromElement2.default)(element),
          renderer: _renderers2.default.CanvasRenderer
        };
      } else if (element && element.getContext) {
        return {
          element,
          renderer: _renderers2.default.CanvasRenderer
        };
      } else if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && !element.nodeName) {
        return {
          element,
          renderer: _renderers2.default.ObjectRenderer
        };
      } else {
        throw new _exceptions.InvalidElementException();
      }
    }
    function querySelectedRenderProperties(string) {
      var selector = document.querySelectorAll(string);
      if (selector.length === 0) {
        return void 0;
      } else {
        var returnArray = [];
        for (var i = 0; i < selector.length; i++) {
          returnArray.push(getRenderProperties(selector[i]));
        }
        return returnArray;
      }
    }
    function newCanvasRenderProperties(imgElement) {
      var canvas = document.createElement("canvas");
      return {
        element: canvas,
        options: (0, _getOptionsFromElement2.default)(imgElement),
        renderer: _renderers2.default.CanvasRenderer,
        afterRender: function afterRender() {
          imgElement.setAttribute("src", canvas.toDataURL());
        }
      };
    }
    exports.default = getRenderProperties;
  }
});

// node_modules/jsbarcode/bin/exceptions/ErrorHandler.js
var require_ErrorHandler = __commonJS({
  "node_modules/jsbarcode/bin/exceptions/ErrorHandler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var ErrorHandler = function() {
      function ErrorHandler2(api) {
        _classCallCheck(this, ErrorHandler2);
        this.api = api;
      }
      _createClass(ErrorHandler2, [{
        key: "handleCatch",
        value: function handleCatch(e) {
          if (e.name === "InvalidInputException") {
            if (this.api._options.valid !== this.api._defaults.valid) {
              this.api._options.valid(false);
            } else {
              throw e.message;
            }
          } else {
            throw e;
          }
          this.api.render = function() {
          };
        }
      }, {
        key: "wrapBarcodeCall",
        value: function wrapBarcodeCall(func) {
          try {
            var result = func.apply(void 0, arguments);
            this.api._options.valid(true);
            return result;
          } catch (e) {
            this.handleCatch(e);
            return this.api;
          }
        }
      }]);
      return ErrorHandler2;
    }();
    exports.default = ErrorHandler;
  }
});

// node_modules/jsbarcode/bin/JsBarcode.js
var require_JsBarcode = __commonJS({
  "node_modules/jsbarcode/bin/JsBarcode.js"(exports, module) {
    "use strict";
    var _barcodes = require_barcodes();
    var _barcodes2 = _interopRequireDefault(_barcodes);
    var _merge = require_merge();
    var _merge2 = _interopRequireDefault(_merge);
    var _linearizeEncodings = require_linearizeEncodings();
    var _linearizeEncodings2 = _interopRequireDefault(_linearizeEncodings);
    var _fixOptions = require_fixOptions();
    var _fixOptions2 = _interopRequireDefault(_fixOptions);
    var _getRenderProperties = require_getRenderProperties();
    var _getRenderProperties2 = _interopRequireDefault(_getRenderProperties);
    var _optionsFromStrings = require_optionsFromStrings();
    var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);
    var _ErrorHandler = require_ErrorHandler();
    var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);
    var _exceptions = require_exceptions();
    var _defaults = require_defaults();
    var _defaults2 = _interopRequireDefault(_defaults);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var API = function API2() {
    };
    var JsBarcode = function JsBarcode2(element, text, options) {
      var api = new API();
      if (typeof element === "undefined") {
        throw Error("No element to render on was provided.");
      }
      api._renderProperties = (0, _getRenderProperties2.default)(element);
      api._encodings = [];
      api._options = _defaults2.default;
      api._errorHandler = new _ErrorHandler2.default(api);
      if (typeof text !== "undefined") {
        options = options || {};
        if (!options.format) {
          options.format = autoSelectBarcode();
        }
        api.options(options)[options.format](text, options).render();
      }
      return api;
    };
    JsBarcode.getModule = function(name2) {
      return _barcodes2.default[name2];
    };
    for (name in _barcodes2.default) {
      if (_barcodes2.default.hasOwnProperty(name)) {
        registerBarcode(_barcodes2.default, name);
      }
    }
    var name;
    function registerBarcode(barcodes, name2) {
      API.prototype[name2] = API.prototype[name2.toUpperCase()] = API.prototype[name2.toLowerCase()] = function(text, options) {
        var api = this;
        return api._errorHandler.wrapBarcodeCall(function() {
          options.text = typeof options.text === "undefined" ? void 0 : "" + options.text;
          var newOptions = (0, _merge2.default)(api._options, options);
          newOptions = (0, _optionsFromStrings2.default)(newOptions);
          var Encoder = barcodes[name2];
          var encoded = encode(text, Encoder, newOptions);
          api._encodings.push(encoded);
          return api;
        });
      };
    }
    function encode(text, Encoder, options) {
      text = "" + text;
      var encoder = new Encoder(text, options);
      if (!encoder.valid()) {
        throw new _exceptions.InvalidInputException(encoder.constructor.name, text);
      }
      var encoded = encoder.encode();
      encoded = (0, _linearizeEncodings2.default)(encoded);
      for (var i = 0; i < encoded.length; i++) {
        encoded[i].options = (0, _merge2.default)(options, encoded[i].options);
      }
      return encoded;
    }
    function autoSelectBarcode() {
      if (_barcodes2.default["CODE128"]) {
        return "CODE128";
      }
      return Object.keys(_barcodes2.default)[0];
    }
    API.prototype.options = function(options) {
      this._options = (0, _merge2.default)(this._options, options);
      return this;
    };
    API.prototype.blank = function(size) {
      var zeroes = new Array(size + 1).join("0");
      this._encodings.push({ data: zeroes });
      return this;
    };
    API.prototype.init = function() {
      if (!this._renderProperties) {
        return;
      }
      if (!Array.isArray(this._renderProperties)) {
        this._renderProperties = [this._renderProperties];
      }
      var renderProperty;
      for (var i in this._renderProperties) {
        renderProperty = this._renderProperties[i];
        var options = (0, _merge2.default)(this._options, renderProperty.options);
        if (options.format == "auto") {
          options.format = autoSelectBarcode();
        }
        this._errorHandler.wrapBarcodeCall(function() {
          var text = options.value;
          var Encoder = _barcodes2.default[options.format.toUpperCase()];
          var encoded = encode(text, Encoder, options);
          render(renderProperty, encoded, options);
        });
      }
    };
    API.prototype.render = function() {
      if (!this._renderProperties) {
        throw new _exceptions.NoElementException();
      }
      if (Array.isArray(this._renderProperties)) {
        for (var i = 0; i < this._renderProperties.length; i++) {
          render(this._renderProperties[i], this._encodings, this._options);
        }
      } else {
        render(this._renderProperties, this._encodings, this._options);
      }
      return this;
    };
    API.prototype._defaults = _defaults2.default;
    function render(renderProperties, encodings, options) {
      encodings = (0, _linearizeEncodings2.default)(encodings);
      for (var i = 0; i < encodings.length; i++) {
        encodings[i].options = (0, _merge2.default)(options, encodings[i].options);
        (0, _fixOptions2.default)(encodings[i].options);
      }
      (0, _fixOptions2.default)(options);
      var Renderer = renderProperties.renderer;
      var renderer = new Renderer(renderProperties.element, encodings, options);
      renderer.render();
      if (renderProperties.afterRender) {
        renderProperties.afterRender();
      }
    }
    if (typeof window !== "undefined") {
      window.JsBarcode = JsBarcode;
    }
    if (typeof jQuery !== "undefined") {
      jQuery.fn.JsBarcode = function(content, options) {
        var elementArray = [];
        jQuery(this).each(function() {
          elementArray.push(this);
        });
        return JsBarcode(elementArray, content, options);
      };
    }
    module.exports = JsBarcode;
  }
});

// node_modules/react-barcode/lib/react-barcode.js
var require_react_barcode = __commonJS({
  "node_modules/react-barcode/lib/react-barcode.js"(exports, module) {
    var _react = _interopRequireDefault(require_react());
    var _jsbarcode = _interopRequireDefault(require_JsBarcode());
    var _propTypes = _interopRequireDefault(require_prop_types());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _typeof(obj) {
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
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var getDOMNode;
    var version = _react["default"].version.split(/[.-]/);
    if (version[0] === "0" && (version[1] === "13" || version[1] === "12")) {
      getDOMNode = function getDOMNode2(ref) {
        return ref.getDOMNode();
      };
    } else {
      getDOMNode = function getDOMNode2(ref) {
        return ref;
      };
    }
    var Barcode = function(_React$Component) {
      _inherits(Barcode2, _React$Component);
      function Barcode2(props) {
        var _this;
        _classCallCheck(this, Barcode2);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(Barcode2).call(this, props));
        _this.renderElementRef = _react["default"].createRef();
        _this.update = _this.update.bind(_assertThisInitialized(_this));
        return _this;
      }
      _createClass(Barcode2, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
          var _this2 = this;
          return Object.keys(Barcode2.propTypes).some(function(k) {
            return _this2.props[k] !== nextProps[k];
          });
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.update();
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          this.update();
        }
      }, {
        key: "update",
        value: function update() {
          var renderElement = getDOMNode(this.renderElementRef.current);
          try {
            new _jsbarcode["default"](renderElement, this.props.value, Object.assign({}, this.props));
          } catch (e) {
            window.console.error(e);
          }
        }
      }, {
        key: "render",
        value: function render() {
          if (this.props.renderer === "svg") {
            return _react["default"].createElement("svg", {
              ref: this.renderElementRef
            });
          } else if (this.props.renderer === "canvas") {
            return _react["default"].createElement("canvas", {
              ref: this.renderElementRef
            });
          } else if (this.props.renderer === "img") {
            return _react["default"].createElement("img", {
              ref: this.renderElementRef
            });
          }
        }
      }]);
      return Barcode2;
    }(_react["default"].Component);
    Barcode.propTypes = {
      value: _propTypes["default"].string.isRequired,
      renderer: _propTypes["default"].string,
      format: _propTypes["default"].string,
      width: _propTypes["default"].number,
      height: _propTypes["default"].number,
      displayValue: _propTypes["default"].bool,
      fontOptions: _propTypes["default"].string,
      font: _propTypes["default"].string,
      textAlign: _propTypes["default"].string,
      textPosition: _propTypes["default"].string,
      textMargin: _propTypes["default"].number,
      fontSize: _propTypes["default"].number,
      background: _propTypes["default"].string,
      lineColor: _propTypes["default"].string,
      margin: _propTypes["default"].number,
      marginTop: _propTypes["default"].number,
      marginBottom: _propTypes["default"].number,
      marginLeft: _propTypes["default"].number,
      marginRight: _propTypes["default"].number
    };
    Barcode.defaultProps = {
      format: "CODE128",
      renderer: "svg",
      width: 2,
      height: 100,
      displayValue: true,
      fontOptions: "",
      font: "monospace",
      textAlign: "center",
      textPosition: "bottom",
      textMargin: 2,
      fontSize: 20,
      background: "#ffffff",
      lineColor: "#000000",
      margin: 10
    };
    module.exports = Barcode;
  }
});
export default require_react_barcode();
//# sourceMappingURL=react-barcode.js.map
