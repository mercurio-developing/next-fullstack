"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isClient = typeof window !== "undefined";

var enhancers = (0, _redux.compose)(typeof window !== "undefined" && process.env.NODE_ENV !== "production" ? window.devToolsExtension && window.devToolsExtension() : function (f) {
  return f;
});

var createStoreWithMiddleware = (0, _redux.applyMiddleware)()(_redux.createStore);

exports.default = function (initialState) {
  return createStoreWithMiddleware(_reducers2.default, initialState, enhancers);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9zdG9yZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVTdG9yZSIsImNvbXBvc2UiLCJhcHBseU1pZGRsZXdhcmUiLCJyb290UmVkdWNlciIsImlzQ2xpZW50Iiwid2luZG93IiwiZW5oYW5jZXJzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiZGV2VG9vbHNFeHRlbnNpb24iLCJmIiwiY3JlYXRlU3RvcmVXaXRoTWlkZGxld2FyZSIsImluaXRpYWxTdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBUyxBQUFhLEFBQVM7O0FBRS9CLEFBQU8sQUFBaUI7Ozs7OztBQUV4QixJQUFNLFdBQVcsT0FBQSxBQUFPLFdBQXhCLEFBQW1DOztBQUVuQyxJQUFNLGdDQUNKLE9BQUEsQUFBTyxXQUFQLEFBQWtCLGVBQWUsUUFBQSxBQUFRLElBQVIsQUFBWSxhQUE3QyxBQUEwRCxlQUN0RCxPQUFBLEFBQU8scUJBQXFCLE9BRGhDLEFBQ2dDLEFBQU8sc0JBQ25DLGFBQUE7U0FBQSxBQUFLO0FBSFgsQUFBa0IsQ0FBQTs7QUFNbEIsSUFBTSw0QkFBTixBQUFrQyxBQUFrQixBQUVwRDs7a0JBQWUsd0JBQUE7U0FDYixBQUEwQiw4Q0FBMUIsQUFBdUMsY0FEMUIsQUFDYixBQUFxRDtBQUR2RCIsImZpbGUiOiJzdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS90dXNoaXRhL21lcmN1cmlvZGV2L25leHQtcmVkdXgifQ==