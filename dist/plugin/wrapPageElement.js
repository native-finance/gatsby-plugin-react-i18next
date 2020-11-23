'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.wrapPageElement = void 0;

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _react = _interopRequireDefault(require('react'));

var _gatsby = require('gatsby');

var _browserLang = _interopRequireDefault(require('browser-lang'));

var _types = require('../types');

var _i18next = _interopRequireDefault(require('i18next'));

var _reactI18next = require('react-i18next');

var _i18nextContext = require('../i18nextContext');

// @ts-ignore
var i18n = _i18next.default.createInstance();

var withI18next = function withI18next(i18n, context) {
  return function (children) {
    return /*#__PURE__*/ _react.default.createElement(
      _reactI18next.I18nextProvider,
      {
        i18n: i18n
      },
      /*#__PURE__*/ _react.default.createElement(
        _i18nextContext.I18nextContext.Provider,
        {
          value: context
        },
        children
      )
    );
  };
};

var wrapPageElement = function wrapPageElement(_ref, _ref2) {
  var element = _ref.element,
    props = _ref.props;
  var _ref2$i18nextOptions = _ref2.i18nextOptions,
    i18nextOptions = _ref2$i18nextOptions === void 0 ? {} : _ref2$i18nextOptions,
    _ref2$redirect = _ref2.redirect,
    redirect = _ref2$redirect === void 0 ? true : _ref2$redirect,
    siteUrl = _ref2.siteUrl;
  if (!props) return;
  var pageContext = props.pageContext,
    location = props.location;
  var _pageContext$i18n = pageContext.i18n,
    routed = _pageContext$i18n.routed,
    language = _pageContext$i18n.language,
    languages = _pageContext$i18n.languages,
    originalPath = _pageContext$i18n.originalPath,
    defaultLanguage = _pageContext$i18n.defaultLanguage,
    resources = _pageContext$i18n.resources,
    path = _pageContext$i18n.path;
  var isRedirect = redirect && !routed;

  if (isRedirect) {
    var search = location.search; // Skip build, Browsers only

    if (typeof window !== 'undefined') {
      var detected =
        window.localStorage.getItem(_types.LANGUAGE_KEY) ||
        (0, _browserLang.default)({
          languages: languages,
          fallback: language
        });

      if (!languages.includes(detected)) {
        detected = language;
      }

      window.localStorage.setItem(_types.LANGUAGE_KEY, detected);

      if (detected !== defaultLanguage) {
        var queryParams = search || '';
        var newUrl = (0, _gatsby.withPrefix)(
          '/' + detected + location.pathname + queryParams + location.hash
        );
        window.location.replace(newUrl);
        return null;
      }
    }
  }

  if (!i18n.isInitialized) {
    i18n.init(
      (0, _extends2.default)({}, i18nextOptions, {
        lng: language,
        fallbackLng: defaultLanguage,
        resources: resources,
        react: {
          useSuspense: false
        }
      })
    );
  }

  Object.keys(resources[language]).map(function (ns) {
    if (!i18n.hasResourceBundle(language, ns)) {
      i18n.addResourceBundle(language, ns, resources[language][ns]);
    }
  });

  if (i18n.language !== language) {
    i18n.changeLanguage(language);
  }

  var context = {
    routed: routed,
    language: language,
    languages: languages,
    originalPath: originalPath,
    defaultLanguage: defaultLanguage,
    siteUrl: siteUrl,
    path: path
  };
  return withI18next(i18n, context)(element);
};

exports.wrapPageElement = wrapPageElement;
