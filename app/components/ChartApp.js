var React = require('react/addons');
var d3 = require('d3');

var Chart = React.createClass({
    render: function() {
        var height = this.props.height + 20 + 30;
        var width = this.props.width + 50 + 80;

        return (
            <svg width={width} height={height}>
                <g transform="translate(20, 0)">
                    {this.props.children}
                </g>
            </svg>
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

var XAxis = React.createClass({
    componentDidMount: function () {
        var xAxis = d3.svg.axis().orient('bottom').scale(this.props.x);
        d3.select(this.getDOMNode()).call(xAxis);
    },
    render: function() {
        var transform = 'translate(0,' + (this.props.height - 30) + ')';
        return (
            <g className="x axis" transform={transform} />
        );
    }
});

var YAxis = React.createClass({
    componentDidMount: function () {
        var yAxis = d3.svg.axis().orient('left').scale(this.props.y);
        d3.select(this.getDOMNode()).call(yAxis);
    },
    render: function() {
        var textAnchor = {
            textAnchor: 'end'
        };

        return (
            <g className="y axis">
                <text transform="rotate(-90)" y="6" dy="1em" style={textAnchor}>Temperature (ºC)</text>
            </g>
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
        var y = this.props.y,
            x = this.props.x;

        var path = d3.svg.line()
            .interpolate(this.props.interpolate)
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.temperature); });

        return (
            <Line path={path(this.props.data)} color={this.props.color} />
        );
    }
});

var LineChart = React.createClass({
    getDefaultProps: function() {
        return {
            width: 700,
            height: 500
        };
    },
    render: function() {
        var data = this.props.data,
            size = {
                width: this.props.width,
                height: this.props.height
            };

        var scale = d3.scale.ordinal();
        var parseDate = d3.time.format('%Y').parse;

        var summer = [];
        var winter = [];

        data.forEach(function (d) {
            if (typeof d.year === 'string') {
                d.year = parseDate(d.year);
            }

            summer.push({
                year: d.year,
                temperature: 15.2 + parseFloat(d.Summer)
            });

            winter.push({
                year: d.year,
                temperature: 4 + parseFloat(d.Winter)
            });
        });

        var x = d3.time.scale()
            .domain(d3.extent(data, function (d) {
                return d.year;
            }))
            .range([0, this.props.width]);

        var y = d3.scale.linear()
            .domain([
                d3.min(winter, function (c) {
                    return c.temperature;
                }),
                d3.max(summer, function (c) {
                    return c.temperature;
                })
            ])
            .range([this.props.height, 0]);

        return (
            <Chart width={this.props.width} height={this.props.height}>
                <XAxis x={x} height={this.props.height} />
                <YAxis y={y} />
                <DataSeries data={summer} size={size} x={x} y={y} ref="Summer" color="orange" />
                <DataSeries data={winter} size={size} x={x} y={y} ref="Winter" color="cornflowerblue" />
            </Chart>
        );
    }
});

/* Module.exports instead of normal dom mounting */
module.exports.ChartApp = LineChart;
