var React = require('react/addons');
var d3 = require('d3');
var color = d3.scale.category10();

var Chart = React.createClass({
    render: function() {
        return (
            <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
        );
    }
});

var Line = React.createClass({
    getDefaultProps: function() {
        return {
            path: '',
            color: 'blue',
            width: 2
        };
    },
    render: function() {
        return (
            <path d={this.props.path} stroke={this.props.color} strokeWidth={this.props.width} fill="none" />
        );
    }
});

var DataSeries = React.createClass({
    getDefaultProps: function() {
        return {
            title: '',
            data: [],
            interpolate: 'basis'
        };
    },
    render: function() {
        var self = this,
            props = this.props,
            y = props.y,
            x = props.x;

        var path = d3.svg.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.Winter); })
            .interpolate(this.props.interpolate);

        return (
            <Line path={path(this.props.data)} color={this.props.color} />
        );
    }
});

var LineChart = React.createClass({
    getDefaultProps: function() {
        return {
            width: 600,
            height: 300
        };
    },
    render: function() {
        var data = this.props.data,
            size = {
                width: this.props.width,
                height: this.props.height
            };

        var parseDate = d3.time.format('%Y').parse;

        color.domain(d3.keys(data[0]).filter(function(key) {
            return key !== 'year';
        }));

        data.forEach(function(d) {
            if (typeof d.year === 'string') {
                d.year = parseDate(d.year);
            }
        });

        var series = color.domain().map(function(name) {
            return {
                name: name,
                values: data.map(function(d) {
                    var temp;
                    if (name === 'Winter') {
                        temp = 4 + parseFloat(d[name]);
                    } else {
                        temp = 15.2 + parseFloat(d[name]);
                    }
                    return {year: d.year, temperature: temp};
                })
            };
        });

        var x = d3.time.scale()
            .domain(d3.extent(data, function(d) {
                return d.year;
            }))
            .range([0, this.props.width]);

        var y = d3.scale.linear()
            .domain([
                d3.min(series, function(c) {
                    return d3.min(c.values, function(v) {
                        return v.temperature;
                    });
                }),
                d3.max(series, function(c) {
                    return d3.max(c.values, function(v) {
                        return v.temperature;
                    });
                })
            ])
            .range([this.props.height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

        return (
            <Chart width={this.props.width} height={this.props.height}>
                <DataSeries data={data} size={size} x={x} y={y} ref="Winter" color="cornflowerblue" />
            </Chart>
        );
    }
});

/* Module.exports instead of normal dom mounting */
module.exports.ChartApp = LineChart;
