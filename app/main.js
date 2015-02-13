var React = require('react/addons');
var ChartApp = require('./components/ChartApp').ChartApp;
var RangeInput = require('./components/RangeInput');
var ReactApp = React.createFactory(ChartApp);
var mountNode = document.getElementById('react-main-mount');
var data = require('./data/data.json');
var temperature = require('./data/temperature.json');

React.render(new ReactApp({ data: temperature }), mountNode);
