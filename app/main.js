var React = require('react/addons');
var ChartApp = require('./components/ChartApp').ChartApp;

var ReactApp = React.createFactory(ChartApp);
var mountNode = document.getElementById('react-main-mount');

var temperature = require('./data/temp.json');

var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

React.render(new ReactApp({
    data: temperature,
    height: height,
    width: width
}), mountNode);
