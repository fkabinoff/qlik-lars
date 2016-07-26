# Less Angular Require Sense Template

This is a Qlik Sense mashup template that uses Less, Angular.js, Require.js.

Live demo - http://webapps.qlik.com/qlik-lars-demo/index.html

## Features
* UI Bootstrap
* A few useful directives, including a search and a filter dropdown, with more planned to be added.
* Gruntfile for build and watch processes, which generates Angular.js template-cache file, runs RequireJS optimizer, and compiles Less.

## Prerequisities

Won't be too useful without Qlik Sense 3.0. You'll need npm and Grunt. Also, I like to use the LiveReload Chrome plugin, but not a requirement.

## Installing

It comes configured to run in Qlik Sense Desktop with the "Helpdesk Management.qvf" example app that comes with Qlik Sense Desktop install, but is easily modified to work with any Qlik Sense app.
Once you have a local copy, just run `npm install` and `grunt build`. You can then use `grunt build` to rebuild, or `grunt watch` to watch for changes.

## Notes

* Remember, the demo code is intended to run with the 'Helpdesk Management.qvf' Qlik Sense demo app, which I've included in the repo jic.
* In main.js, you can find the config and appId variables

## Author

**Francis Kabinoff**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
