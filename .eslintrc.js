/* eslint-env node */
'use strict';

var path = require('path');

var CLIEngine = require('eslint').CLIEngine;

var baseConfigPath = './node_modules/sanctuary-style/eslint-es3.json';

var baseConfig = new CLIEngine({
  useEslintrc: false,
  configFile: path.basename(baseConfigPath),
  cwd: path.dirname(baseConfigPath)
}).getConfigForFile(path.basename(baseConfigPath));

function extendIndentRuleOptions() {
  var indent = baseConfig.rules.indent;
  var level = indent[0];
  var size = indent[1];
  var options = indent[2];
  return [
    level,
    size,
    Object.assign({}, options, {
      ignoredNodes: options.ignoredNodes.concat([
        'FunctionDeclaration[id.name=createSanctuary] > BlockStatement.body'
      ])
    })
  ];
}

module.exports = {
  root: true,
  'extends': [baseConfigPath],
  rules: {
    indent: extendIndentRuleOptions()
  }
};
