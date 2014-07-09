define([
    'underscore',
    'app',
    'backbone.marionette',
    'localforage',
    '../collections/TimetableModuleCollection',
    '../collections/LessonCollection',
    'common/config'
  ],
  function (_, App, Marionette, localforage, TimetableModuleCollection,
            LessonCollection, config) {
    'use strict';

    return Marionette.Controller.extend({
      initialize: function () {
        this.timetable = new LessonCollection();
        this.selectedModules = new TimetableModuleCollection([], {
          timetable: this.timetable
        });
        this.listenTo(this.selectedModules, 'add remove', this.modulesChanged);
        this.listenTo(this.timetable, 'change', this.modulesChanged);
      },

      modulesChanged: function () {
        if (!this.selectedModules.shared) {
          localforage.setItem(config.semTimetableFragment +
            ':queryString', this.selectedModules.toQueryString());
        }
      }
    });
  });
