'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var addons = require('@storybook/addons');
var addons__default = _interopDefault(addons);
var reactI18next = require('react-i18next');

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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var LANGUAGE_CHANGED_EVENT_ID = 'addon:i18next:languageChanged';
var CONFIGURE_EVENT_ID = 'addon:i18next:configure';

var Wrapper = /*#__PURE__*/function (_React$Component) {
  _inherits(Wrapper, _React$Component);

  function Wrapper(props, context) {
    var _this;

    _classCallCheck(this, Wrapper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Wrapper).call(this, props, context));
    _this.changeLanguage = _this.changeLanguage.bind(_assertThisInitialized(_this));
    _this.state = {
      loading: false
    };
    return _this;
  }

  _createClass(Wrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var channel = this.props.channel;
      channel.on(LANGUAGE_CHANGED_EVENT_ID, this.changeLanguage);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var channel = this.props.channel;
      channel.removeListener(LANGUAGE_CHANGED_EVENT_ID, this.changeLanguage);
    }
  }, {
    key: "changeLanguage",
    value: function changeLanguage(language) {
      var _this2 = this;

      var i18n = this.props.i18n;
      i18n.changeLanguage(language); // quick hack to full reload child

      this.setState({
        loading: true
      }, function () {
        setTimeout(function () {
          _this2.setState({
            loading: false
          });
        }, 300);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          story = _this$props.story,
          i18n = _this$props.i18n;
      var loading = this.state.loading; // quick hack to full reload child

      if (loading) return null;
      return React.createElement(reactI18next.I18nextProvider, {
        i18n: i18n
      }, story);
    }
  }]);

  return Wrapper;
}(React.Component);

Wrapper.propTypes = {
  story: PropTypes.node.isRequired,
  channel: PropTypes.shape({
    on: PropTypes.func,
    removeListener: PropTypes.func
  }).isRequired,
  i18n: PropTypes.shape({
    changeLanguage: PropTypes.func
  }).isRequired
}; // eslint-disable-next-line import/prefer-default-export

var withI18next = addons.makeDecorator({
  name: 'withI18next',
  wrapper: function wrapper(getStory, context, _ref) {
    var options = _ref.options;
    var channel = addons__default.getChannel();
    var i18n = options.i18n;
    channel.emit(CONFIGURE_EVENT_ID, options);
    return React.createElement(Wrapper, {
      channel: channel,
      story: getStory(context),
      i18n: i18n
    });
  }
});

exports.withI18next = withI18next;
