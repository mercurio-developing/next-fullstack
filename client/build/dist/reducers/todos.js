'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];
	var type = action.type,
	    text = action.text,
	    todo = action.todo;

	switch (type) {
		case _actions.ADD_TODO:
			return [].concat((0, _toConsumableArray3.default)(state), [{
				id: Math.random().toString(36).substring(2),
				text: text
			}]);
		case _actions.REMOVE_TODO:
			return state.filter(function (i) {
				return i !== todo;
			});
		default:
			return state;
	}
};

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9yZWR1Y2Vycy90b2Rvcy5qcyJdLCJuYW1lcyI6WyJBRERfVE9ETyIsIlJFTU9WRV9UT0RPIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwidGV4dCIsInRvZG8iLCJpZCIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyIsImZpbHRlciIsImkiXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFFZSxZQUE2QjtLQUFwQixBQUFvQiw0RUFBWixBQUFZO0tBQVIsQUFBUSxtQkFBQTtLQUFBLEFBQ25DLE9BRG1DLEFBQ2QsT0FEYyxBQUNuQztLQURtQyxBQUM3QixPQUQ2QixBQUNkLE9BRGMsQUFDN0I7S0FENkIsQUFDdkIsT0FEdUIsQUFDZCxPQURjLEFBQ3ZCLEFBRXBCOztTQUFBLEFBQVEsQUFDUDtBQUFBLEFBQUssQUFDSjtxREFBQSxBQUNJO1FBRUUsS0FBQSxBQUFLLFNBQUwsQUFDRixTQURFLEFBQ08sSUFEUCxBQUVGLFVBSEgsQUFDSyxBQUVRLEFBQ1o7VUFORixBQUVDLEFBT0Y7QUFQRSxBQUNDO0FBTUgsQUFBSyxBQUNKO2dCQUFPLEFBQU0sT0FBTyxhQUFBO1dBQUssTUFBTCxBQUFXO0FBQS9CLEFBQU8sQUFDUixJQURRO0FBRVA7VUFkRixBQWNFLEFBQU8sQUFFVDs7Ozs7Ozs7QUFyQkQsQUFBUyxBQUFVLEFBQW1CLEFBRXRDIiwiZmlsZSI6InRvZG9zLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3R1c2hpdGEvbWVyY3VyaW9kZXYvbmV4dC1yZWR1eCJ9