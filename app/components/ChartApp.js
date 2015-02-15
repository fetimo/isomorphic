var React = require('react/addons');
var d3 = require('d3');

var color = d3.scale.category10();

var Chart = React.createClass({
    render: function() {
        return (
            <svg width={this.props.width} height={this.props.height}>
                <g transform="translate(50, 20)">
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
    getDefaultProps: function() {
        return {
            path: '',
            color: 'blue',
            width: 2
        };
    },
    render: function() {
        return (
            <g class="" />
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
            y = this.props.y,
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
            width: 600,
            height: 300
        };
    },
    componentDidMount: function () {
        var svg = d3.select(this.getDOMNode().children[0]);

        svg.insert('g', ':first-child')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '1em')
            .style('text-anchor', 'end')
            .text('Temperature (ºC)');

        svg.insert('g', ':first-child')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (this.props.height - 40) + ')')
            .call(xAxis);
    },
    render: function() {
        var data = this.props.data,
            size = {
                width: this.props.width,
                height: this.props.height
            };

        var parseDate = d3.time.format('%Y').parse;

        xAxis = d3.svg.axis().orient('bottom');
        yAxis = d3.svg.axis().orient('left');

        var summer = [];
        var winter = [];

        color.domain(d3.keys(data[0]).filter(function (key) {
            return key !== 'year';
        }));

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

        var series = color.domain().map(function (name) {
            return {
                name: name,
                values: data.map(function (d) {
                    return {
                        year: d.year,
                        temperature: d[name]
                    };
                })
            };
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

        xAxis.scale(x);
        yAxis.scale(y);

        return (
            <Chart width={this.props.width} height={this.props.height}>
                <DataSeries data={winter} size={size} x={x} y={y} ref="Winter" color="cornflowerblue" />
                <DataSeries data={summer} size={size} x={x} y={y} ref="Summer" color="orange" />
            </Chart>
        );
    }
});

/* Module.exports instead of normal dom mounting */
module.exports.ChartApp = LineChart;
