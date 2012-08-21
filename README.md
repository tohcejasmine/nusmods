# [NUSMods](http://nusmods.com) - [NUS CORS](http://www.nus.edu.sg/cors/) Module Finder & Timetable Builder (Unofficial)

NUSMods helps you find modules which fit your schedule, plan your ideal
timetable, then share it with your friends or export it to various formats.

## Initial Setup

You will need [Node.js](http://nodejs.org) and [npm](http://npmjs.org), which
comes with Node.js.

```bash
$ npm install -g grunt
$ npm install
$ grunt coffee:tasks
$ grunt
```

On Windows, type `grunt.cmd` instead of `grunt`.

## Watching for Changes

Start grunt to auto-build NUSMods as you work:

```bash
$ grunt watch
```

Grunt has been configured to watch files under `src/` and `tasks/` and compile /
concatenate them whenever they change - you should not edit `/css/*.css` and
`/js/*.js` directly.

## Compiling Changes

If you made some changes but `grunt watch` was not running, compile them using:

```bash
$ grunt dev
```

This will invoke the `coffee`, `less` and `concat` tasks, which is equivalent to
what `grunt watch` does.

## Serving Static Files During Development

If you are not already using some other web server, you can use Grunt's built-in
static web server at `http://localhost:8000/`:

```bash
$ grunt server watch
```

Note: Grunt exits automatically when there are no more tasks to run, so the
`server` task needs to prepended to a long-running task like `watch`.

## Building for Production

To get a complete, minified, production build under `dist/`:

```bash
$ grunt
```

This invokes grunt's `default` task, which is equivalent to:

```bash
$ grunt download jsify dev clean mkdirs css min denull rev usemin html compress time
```

## Updating Module Information

The `download` task automatically downloads the latest module information JSON
file from `http://nusmods.com/json/mod_info.json` if it has been updated. It is
executed by default when you run grunt's `default` task.

The file downloaded is identical to that generated by the `crawl` task. Crawling
takes a considerable amount of time, so this lets you jump straight into
development.

For development purposes, you should not need to do the crawling yourself unless
you are working on the crawler itself.

## Crawling Module Information

To do a complete crawl:

```bash
$ grunt crawl
```

The `crawl` task caches every page retrieved, and compares the *Correct as at*
timestamp to determine if it should retrieve a fresh set of pages.

It also forces a refresh for pages retrieved more than 2 days ago by default,
which can be set by the `crawl.maxCacheAge` property in `grunt.js`:

```js
crawl: {
  cachePath: 'cache',
  dest: 'json/mod_info.json',
  maxCacheAge: 2 * 86400 // in seconds
}
```

To manually force a refresh:

```bash
$ grunt crawl:refresh
```

Crawling NUS Bulletin information is disabled by default as it is not used in
NUSMods currently, but to crawl with it enabled:

```bash
$ grunt crawl:nusBulletin
```

Note: This will take a *long* time.

## Optional Dependencies

- [PHP](http://www.php.net) for export and URL shortening scripts.
- [YOURLS](http://yourls.org/) for URL shortening.
- [wkhtmltopdf and wkhtmltoimage](http://code.google.com/p/wkhtmltopdf/) for pdf
  and image export. Using the static binaries is suggested, as compiling with
  all the features of the static build needs a custom patched version of QT,
  which takes a *long* time to build.

## License

Copyright (c) 2012 Eu Beng Hee. Licensed under the MIT license.