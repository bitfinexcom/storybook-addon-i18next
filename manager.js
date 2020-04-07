'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var addons = require('@storybook/addons');
var addons__default = _interopDefault(addons);
var PropTypes = _interopDefault(require('prop-types'));
var components = require('@storybook/components');
var coreEvents = require('@storybook/core-events');

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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var ADDON_ID = 'i18next';
var LANGUAGE_CHANGED_EVENT_ID = 'addon:i18next:languageChanged';
var CONFIGURE_EVENT_ID = 'addon:i18next:configure';

var I18NextTool = /*#__PURE__*/function (_React$Component) {
  _inherits(I18NextTool, _React$Component);

  function I18NextTool(props) {
    var _this;

    _classCallCheck(this, I18NextTool);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(I18NextTool).call(this, props));
    _this.state = {
      isTooltipExpanded: false,
      language: null,
      languages: null
    };
    _this.configure = _this.configure.bind(_assertThisInitialized(_this));
    _this.emitLanguageChanged = _this.emitLanguageChanged.bind(_assertThisInitialized(_this));
    _this.handleLanguageClick = _this.handleLanguageClick.bind(_assertThisInitialized(_this));

    _this.listener = function () {
      var api = _this.props.api;
      api.on(CONFIGURE_EVENT_ID, _this.configure);
    };

    return _this;
  }

  _createClass(I18NextTool, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var api = this.props.api;
      api.on(coreEvents.SET_STORIES, this.listener);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var api = this.props.api;
      api.off(coreEvents.SET_STORIES, this.listener);
    }
  }, {
    key: "configure",
    value: function configure(options) {
      var i18n = options.i18n,
          languages = options.languages;
      var language = i18n.language;
      this.setState({
        language: language,
        languages: languages
      });
    }
  }, {
    key: "emitLanguageChanged",
    value: function emitLanguageChanged() {
      var api = this.props.api;
      var language = this.state.language;
      api.emit(LANGUAGE_CHANGED_EVENT_ID, language);
    }
  }, {
    key: "handleLanguageClick",
    value: function handleLanguageClick(event) {
      var _this2 = this;

      var _event$currentTarget$ = event.currentTarget.dataset;
      _event$currentTarget$ = _event$currentTarget$ === void 0 ? {} : _event$currentTarget$;
      var value = _event$currentTarget$.value;
      this.setState({
        isTooltipExpanded: false,
        language: value
      }, function () {
        _this2.emitLanguageChanged();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          isTooltipExpanded = _this$state.isTooltipExpanded,
          languages = _this$state.languages;
      var items = Object.entries(languages || {}).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            name = _ref2[1];

        return {
          id: key,
          title: name,
          onClick: _this3.handleLanguageClick,
          'data-value': key
        };
      });
      return React.createElement(components.WithTooltipPure, {
        placement: "top",
        trigger: "click",
        tooltipShown: isTooltipExpanded,
        onVisibilityChange: function onVisibilityChange(t) {
          return _this3.setState({
            isTooltipExpanded: t
          });
        },
        tooltip: React.createElement(components.TooltipLinkList, {
          links: items
        }),
        closeOnClick: true
      }, React.createElement(components.IconButton, {
        key: "i18next",
        title: "Change the language"
      }, React.createElement(components.Icons, {
        icon: "globe"
      })));
    }
  }]);

  return I18NextTool;
}(React.Component);

I18NextTool.propTypes = {
  api: PropTypes.shape({
    on: PropTypes.func,
    off: PropTypes.func,
    emit: PropTypes.func
  }).isRequired
};

/* eslint react/jsx-filename-extension:off */

var register = function register() {
  addons__default.register(ADDON_ID, function (api) {
    addons__default.add(ADDON_ID, {
      title: 'i18next / languages',
      type: addons.types.TOOL,
      match: function match(_ref) {
        var viewMode = _ref.viewMode;
        return viewMode === 'story';
      },
      render: function render() {
        return React.createElement(I18NextTool, {
          api: api
        });
      }
    });
  });
};

exports.register = register;
