"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/home/tushita/mercuriodev/next-redux/client/components/auth/Login.js";


var Login = function (_React$Component) {
  (0, _inherits3.default)(Login, _React$Component);

  function Login() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).call.apply(_ref, [this].concat(args))), _this), _this.getInitialProps = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
        var req = _ref2.req,
            query = _ref2.query;
        var res;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(req.headers);
                _context.next = 3;
                return _axios2.default.post("http://localhost:3000/login");

              case 3:
                res = _context.sent;
                return _context.abrupt("return", { data: res.data });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Login, [{
    key: "render",
    value: function render() {
      console.log(this.props.data);
      return _react2.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, _react2.default.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, "LOGIN"));
    }
  }]);

  return Login;
}(_react2.default.Component);

exports.default = Login;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL2F1dGgvTG9naW4uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJjb25uZWN0IiwiYXhpb3MiLCJMb2dpbiIsImdldEluaXRpYWxQcm9wcyIsInJlcSIsInF1ZXJ5IiwiY29uc29sZSIsImxvZyIsImhlYWRlcnMiLCJwb3N0IiwicmVzIiwiZGF0YSIsInByb3BzIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVM7O0FBQ1QsQUFBTzs7Ozs7Ozs7O0ksQUFFRDs7Ozs7Ozs7Ozs7Ozs7OzBNQUNKLEE7MkZBQWtCLHdCQUFBO1lBQUEsQUFBUyxZQUFULEFBQVM7WUFBVCxBQUFjLGNBQWQsQUFBYztZQUFkO3NFQUFBO29CQUFBOzZDQUFBO21CQUNoQjt3QkFBQSxBQUFRLElBQUksSUFESSxBQUNoQixBQUFnQjtnQ0FEQTt1QkFFRSxnQkFBQSxBQUFNLEtBRlIsQUFFRSxBQUFXOzttQkFBdkI7QUFGVSwrQkFBQTtpREFHVCxFQUFFLE1BQU0sSUFIQyxBQUdULEFBQVk7O21CQUhIO21CQUFBO2dDQUFBOztBQUFBO29CQUFBO0E7Ozs7Ozs7Ozs7NkJBTVQsQUFDUDtjQUFBLEFBQVEsSUFBSSxLQUFBLEFBQUssTUFBakIsQUFBdUIsQUFDdkI7NkJBQ0UsY0FBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FGSixBQUNFLEFBQ0UsQUFHTDs7Ozs7RUFkaUIsZ0JBQU0sQSxBQWlCMUI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiTG9naW4uanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdHVzaGl0YS9tZXJjdXJpb2Rldi9uZXh0LXJlZHV4In0=