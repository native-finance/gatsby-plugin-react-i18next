'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

exports.__esModule = true;
exports.onCreatePage = void 0;

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _glob2 = _interopRequireDefault(require('glob'));

var _bluebird = _interopRequireDefault(require('bluebird'));

var _fs = _interopRequireDefault(require('fs'));

var _util = _interopRequireDefault(require('util'));

var _pathToRegexp = require('path-to-regexp');

var readFile = _util.default.promisify(_fs.default.readFile);

var glob = _util.default.promisify(_glob2.default);

var getResources = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/ _regenerator.default.mark(function _callee2(path, language) {
      var _BP$reduce;

      var files;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              _context2.next = 2;
              return glob(path + '/' + language + '/*.json');

            case 2:
              files = _context2.sent;
              return _context2.abrupt(
                'return',
                _bluebird.default.reduce(
                  files,
                  /*#__PURE__*/ (function () {
                    var _ref2 = (0, _asyncToGenerator2.default)(
                      /*#__PURE__*/ _regenerator.default.mark(function _callee(result, file) {
                        var _ref3, ns, content;

                        return _regenerator.default.wrap(function _callee$(_context) {
                          while (1) {
                            switch ((_context.prev = _context.next)) {
                              case 0:
                                (_ref3 = /[\/(\w+|\-)]+\/([\w|\-]+)\.json/.exec(file)),
                                  (ns = _ref3[1]);
                                _context.next = 3;
                                return readFile(file, 'utf8');

                              case 3:
                                content = _context.sent;
                                result[language][ns] = JSON.parse(content);
                                return _context.abrupt('return', result);

                              case 6:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      })
                    );

                    return function (_x3, _x4) {
                      return _ref2.apply(this, arguments);
                    };
                  })(),
                  ((_BP$reduce = {}), (_BP$reduce[language] = {}), _BP$reduce)
                )
              );

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    })
  );

  return function getResources(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var onCreatePage = /*#__PURE__*/ (function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/ _regenerator.default.mark(function _callee5(_ref4, pluginOptions) {
      var page,
        actions,
        createPage,
        deletePage,
        _pluginOptions$defaul,
        defaultLanguage,
        _pluginOptions$langua,
        languages,
        _pluginOptions$pages,
        pages,
        generatePage,
        pageOptions,
        newPage,
        alternativeLanguages,
        result,
        language,
        originalPath,
        routed;

      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch ((_context5.prev = _context5.next)) {
            case 0:
              (page = _ref4.page), (actions = _ref4.actions);

              if (!(typeof page.context.i18n === 'object')) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt('return');

            case 3:
              (createPage = actions.createPage), (deletePage = actions.deletePage);
              (_pluginOptions$defaul = pluginOptions.defaultLanguage),
                (defaultLanguage = _pluginOptions$defaul === void 0 ? 'en' : _pluginOptions$defaul),
                (_pluginOptions$langua = pluginOptions.languages),
                (languages = _pluginOptions$langua === void 0 ? ['en'] : _pluginOptions$langua),
                (_pluginOptions$pages = pluginOptions.pages),
                (pages = _pluginOptions$pages === void 0 ? [] : _pluginOptions$pages);

              generatePage = /*#__PURE__*/ (function () {
                var _ref7 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/ _regenerator.default.mark(function _callee3(_ref6) {
                    var language,
                      _ref6$path,
                      path,
                      _ref6$originalPath,
                      originalPath,
                      _ref6$routed,
                      routed,
                      pageOptions,
                      resources;

                    return _regenerator.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch ((_context3.prev = _context3.next)) {
                          case 0:
                            (language = _ref6.language),
                              (_ref6$path = _ref6.path),
                              (path = _ref6$path === void 0 ? page.path : _ref6$path),
                              (_ref6$originalPath = _ref6.originalPath),
                              (originalPath =
                                _ref6$originalPath === void 0 ? page.path : _ref6$originalPath),
                              (_ref6$routed = _ref6.routed),
                              (routed = _ref6$routed === void 0 ? false : _ref6$routed),
                              (pageOptions = _ref6.pageOptions);
                            _context3.next = 3;
                            return getResources(pluginOptions.path, language);

                          case 3:
                            resources = _context3.sent;
                            return _context3.abrupt(
                              'return',
                              (0, _extends2.default)({}, page, {
                                path: path,
                                context: (0, _extends2.default)({}, page.context, {
                                  language: language,
                                  i18n: {
                                    language: language,
                                    languages:
                                      (pageOptions === null || pageOptions === void 0
                                        ? void 0
                                        : pageOptions.languages) || languages,
                                    defaultLanguage: defaultLanguage,
                                    routed: routed,
                                    resources: resources,
                                    originalPath: originalPath,
                                    path: path
                                  }
                                })
                              })
                            );

                          case 5:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  })
                );

                return function generatePage(_x7) {
                  return _ref7.apply(this, arguments);
                };
              })();

              pageOptions = pages.find(function (opt) {
                return (0, _pathToRegexp.match)(opt.matchPath)(page.path);
              });
              alternativeLanguages = languages.filter(function (lng) {
                return lng !== defaultLanguage;
              });

              if (
                pageOptions === null || pageOptions === void 0
                  ? void 0
                  : pageOptions.excludeLanguages
              ) {
                alternativeLanguages = alternativeLanguages.filter(function (lng) {
                  var _pageOptions$excludeL;

                  return !(pageOptions === null || pageOptions === void 0
                    ? void 0
                    : (_pageOptions$excludeL = pageOptions.excludeLanguages) === null ||
                      _pageOptions$excludeL === void 0
                    ? void 0
                    : _pageOptions$excludeL.includes(lng));
                });
              }

              if (pageOptions === null || pageOptions === void 0 ? void 0 : pageOptions.languages) {
                alternativeLanguages = pageOptions.languages.filter(function (lng) {
                  return lng !== defaultLanguage;
                });
              }

              if (
                !(pageOptions === null || pageOptions === void 0
                  ? void 0
                  : pageOptions.getLanguageFromPath)
              ) {
                _context5.next = 23;
                break;
              }

              result = (0, _pathToRegexp.match)(pageOptions.matchPath)(page.path);

              if (result) {
                _context5.next = 14;
                break;
              }

              return _context5.abrupt('return');

            case 14:
              language =
                languages.find(function (lng) {
                  return lng === result.params.lang;
                }) || defaultLanguage;
              originalPath = page.path.replace('/' + language, '');
              routed = Boolean(result.params.lang);
              _context5.next = 19;
              return generatePage({
                language: language,
                originalPath: originalPath,
                routed: routed,
                pageOptions: pageOptions
              });

            case 19:
              newPage = _context5.sent;

              if (routed || !pageOptions.excludeLanguages) {
                alternativeLanguages = [];
              }

              _context5.next = 26;
              break;

            case 23:
              _context5.next = 25;
              return generatePage({
                language: defaultLanguage,
                pageOptions: pageOptions
              });

            case 25:
              newPage = _context5.sent;

            case 26:
              try {
                deletePage(page);
              } catch (_unused) {}

              createPage(newPage);
              _context5.next = 30;
              return _bluebird.default.map(
                alternativeLanguages,
                /*#__PURE__*/ (function () {
                  var _ref8 = (0, _asyncToGenerator2.default)(
                    /*#__PURE__*/ _regenerator.default.mark(function _callee4(lng) {
                      var localePage, regexp;
                      return _regenerator.default.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch ((_context4.prev = _context4.next)) {
                            case 0:
                              _context4.next = 2;
                              return generatePage({
                                language: lng,
                                path: '' + lng + page.path,
                                routed: true
                              });

                            case 2:
                              localePage = _context4.sent;
                              regexp = new RegExp('/404/?$');

                              if (regexp.test(localePage.path)) {
                                localePage.matchPath = '/' + lng + '/*';
                              }

                              createPage(localePage);

                            case 6:
                            case 'end':
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    })
                  );

                  return function (_x8) {
                    return _ref8.apply(this, arguments);
                  };
                })()
              );

            case 30:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5);
    })
  );

  return function onCreatePage(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
})();

exports.onCreatePage = onCreatePage;
