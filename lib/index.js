'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactChartTooltip = require('react-chart-tooltip');

var _reactChartTooltip2 = _interopRequireDefault(_reactChartTooltip);

var _elementResizeEvent = require('element-resize-event');

var _elementResizeEvent2 = _interopRequireDefault(_elementResizeEvent);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var unbind = _elementResizeEvent2.default.unbind;

var RadialBarChart = function (_React$Component) {
  _inherits(RadialBarChart, _React$Component);

  function RadialBarChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RadialBarChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadialBarChart.__proto__ || Object.getPrototypeOf(RadialBarChart)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      info: null,
      eventPosition: null,
      width: null,
      height: null
    }, _this.onClick = function (e) {
      var onClick = _this.props.onClick;

      var info = _this.chart.update({ event: 'onClick', eventPosition: (0, _config.getEventPosition)(e) }, _this.ctx);
      if (onClick && info) onClick(e, info);
    }, _this.onMove = function (e) {
      var onHover = _this.props.onHover;

      var eventPosition = (0, _config.getEventPosition)(e);
      var info = _this.chart.update({ event: 'onMove', eventPosition: eventPosition }, _this.ctx);
      if (onHover && info) onHover(e, info);
      _this.setState({ info: info, eventPosition: eventPosition });
    }, _this.dispatchResize = function () {
      var ratio = (0, _config.getPixelRatio)(_this.ctx);
      var $parentNode = _this.canvasBox.parentNode;
      var clientWidth = $parentNode.clientWidth;
      var clientHeight = $parentNode.clientHeight;
      var ratioWidth = clientWidth * ratio;
      var ratioHeight = clientHeight * ratio;
      if (_this.width && _this.height) {
        var doneValue = [clientWidth, clientHeight, ratioWidth, ratioHeight];
        if (_this.drewTimer) clearTimeout(_this.drewTimer);

        var startDrew = function startDrew() {
          var currentValue = [_this.width, _this.height, _this.canvas.width, _this.canvas.height];
          if (!_.isEqual(doneValue, currentValue)) {
            var values = currentValue.map(function (val, ind) {
              var dis = (doneValue[ind] - val) / 3;
              return val + (dis > 0 ? Math.ceil(dis) : Math.floor(dis));
            });

            var _values = _slicedToArray(values, 4),
                w = _values[0],
                h = _values[1],
                rw = _values[2],
                rh = _values[3];

            _this.resize({ ratio: ratio, clientWidth: w, clientHeight: h, ratioWidth: rw, ratioHeight: rh });
            _this.drewTimer = setTimeout(startDrew, 25);
          }
        };
        startDrew();
      } else {
        _this.resize({ ratio: ratio, clientWidth: clientWidth, clientHeight: clientHeight, ratioWidth: ratioWidth, ratioHeight: ratioHeight });
      }
    }, _this.resize = function (_ref2) {
      var ratio = _ref2.ratio,
          clientWidth = _ref2.clientWidth,
          clientHeight = _ref2.clientHeight,
          ratioWidth = _ref2.ratioWidth,
          ratioHeight = _ref2.ratioHeight;
      var onResize = _this.props.onResize;
      var _this$state = _this.state,
          width = _this$state.width,
          height = _this$state.height;

      _this.canvas.width = ratioWidth;
      _this.canvas.height = ratioHeight;
      // setState异步，用this存储上次的值
      _this.width = clientWidth;
      _this.height = clientHeight;
      if (onResize) onResize({ ratio: ratio, clientWidth: clientWidth, clientHeight: clientHeight, ratioWidth: ratioWidth, ratioHeight: ratioHeight });
      if (_this.chart) _this.chart.update(Object.assign(_extends({}, _this.props), { width: ratioWidth, height: ratioHeight, ratio: ratio }), _this.ctx);
      if (width !== clientWidth || height !== clientHeight) {
        _this.setState({ width: clientWidth, height: clientHeight, info: null, eventPosition: null });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadialBarChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.ctx = this.canvas.getContext('2d');
      this.canvas.addEventListener('mousemove', this.onMove);
      this.canvas.addEventListener('click', this.onClick);
      (0, _elementResizeEvent2.default)(this.canvasBox, function () {
        if (_this2.timer) clearTimeout(_this2.timer);
        _this2.timer = setTimeout(_this2.dispatchResize, 100);
      });
      var Chart = this.props.Chart;

      this.chart = new Chart(this.props);
      this.dispatchResize();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.chart.update(nextProps, this.ctx);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.canvas.removeEventListener('mousemove', this.onMove, false);
      this.canvas.removeEventListener('click', this.onClick, false);
      unbind(this.canvasBox);
      if (this.timer) clearTimeout(this.timer);
      if (this.drewTimer) clearTimeout(this.drewTimer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          info = _state.info,
          eventPosition = _state.eventPosition,
          width = _state.width,
          height = _state.height;
      var _props = this.props,
          tooltip = _props.tooltip,
          title = _props.title,
          tooltipStyle = _props.tooltipStyle;

      return React.createElement(
        'div',
        {
          ref: function ref(canvasBox) {
            _this3.canvasBox = canvasBox;
          },
          style: { position: 'relative', width: '100%', height: '100%' }
        },
        React.createElement(_reactChartTooltip2.default, _extends({
          width: width,
          height: height,
          tooltip: tooltip,
          title: title,
          info: info,
          tooltipStyle: tooltipStyle
        }, eventPosition)),
        React.createElement('canvas', { style: { position: 'absolute', width: width, height: height }, ref: function ref(canvas) {
            _this3.canvas = canvas;
          } })
      );
    }
  }]);

  return RadialBarChart;
}(React.Component);

exports.default = RadialBarChart;