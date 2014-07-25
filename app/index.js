'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var EveGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Eve generator!'));

    var prompts = [        {
      type: 'input',
      name: 'moduleName',
      message: 'module name : ',
      default: this.env.options.appPath
    }, {
      type: 'input',
      name: 'description',
      message: 'module description : '
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.description = props.description;

      done();
    }.bind(this));
  },

  app: function () {
    this.template('_setup.py', 'setup.py');

    this.mkdir('require');
    this.mkdir('tests');

    this.mkdir(this.moduleName);
    this.mkdir(path.join(this.moduleName, 'models'));
    this.template('_main.py', path.join(this.moduleName, '__main__.py'));
    this.template('_settings.py', path.join(this.moduleName, 'settings.py'));
  },

  projectfiles: function () {
    this.copy('require/common.txt', 'require/common.txt');
  }
});

module.exports = EveGenerator;
