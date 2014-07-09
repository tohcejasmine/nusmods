/*global define*/
(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else {
    // Browser globals
    root.NUSMods = factory();
  }
}(this, function () {
  'use strict';

  var semBaseUrl;
  var moduleInformationPromise, moduleListPromise;
  var moduleCodes;

  return {
    getAllModules: function () {
      return moduleCodes;
    },
    generateModuleCodes: function () {
      moduleListPromise = moduleListPromise || $.getJSON(semBaseUrl + 'moduleList.json');
      moduleListPromise.then(function () {
        moduleCodes = moduleListPromise.responseJSON;
      });
    },
    getCorrectAsAt: function (callback) {
      moduleListPromise = moduleListPromise || $.getJSON(semBaseUrl + 'moduleList.json');
      return moduleListPromise.then(function () {
        var lastModified = moduleListPromise.getResponseHeader('Last-Modified');
        if (callback) {
          callback(lastModified);
        }
        return moduleListPromise.getResponseHeader('Last-Modified');
      });
    },
    getMod: function (code, callback) {
      return $.getJSON(semBaseUrl + 'modules/' + code + '.json', callback);
    },
    getMods: function (callback) {
      moduleInformationPromise = moduleInformationPromise || $.getJSON(semBaseUrl + 'moduleInformation.json');
      return moduleInformationPromise.then(callback);
    },
    getCodesAndTitles: function (callback) {
      moduleListPromise = moduleListPromise || $.getJSON(semBaseUrl + 'moduleList.json');
      return moduleListPromise.then(callback);
    },
    setConfig: function (config) {
      semBaseUrl = config.baseUrl + config.academicYear.replace('/', '-') + '/' + config.semester + '/';
    }
  };
}));
