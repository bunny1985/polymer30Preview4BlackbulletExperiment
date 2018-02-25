const path = require('path');
module.exports = [
    {
      from: path.resolve(__dirname, '../static'),
      to: 'static',
      ignore: ['.*']
    },
    {
      from: path.resolve(__dirname, '../node_modules/@webcomponents/webcomponentsjs/webcomponents*.js'),
      to: '',
      flatten: true
    },
    {
      from: path.resolve(__dirname, '../index.html'),
      to: '',
      ignore: ['.*']
    }
  ];