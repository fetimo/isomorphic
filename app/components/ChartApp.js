var React = require('react/addons');
var _ = require('underscore');
var d3 = require('d3');

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
            yScale = props.yScale,
            xScale = props.xScale;

        var path = d3.svg.line()
            .x(function(d) { return xScale(d.x); })
            .y(function(d) { return yScale(d.y); })
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

        var zippedArray = _.zip.apply(_, data.data);

        var years = zippedArray[0];
        var winterTemp = zippedArray[1];
        // var winterPrecip = zippedArray[2];
        var summerTemp = zippedArray[3];
        // var summerPrecip = zippedArray[4];

        var max = _.chain(x[0], x[1], x[2], x[3], x[4])
            .zip()
            .map(function(values) {
                return _.reduce(values, function(memo, value) {
                    return Math.max(memo, value.y);
                }, 0);
            })
            .max()
            .value();

        var xScale = d3.scale.linear()
            .domain([0, 6])
            .range([0, this.props.width]);

        var yScale = d3.scale.linear()
            .domain([0, max])
            .range([this.props.height, 0]);

        return (
            <div>
                <Chart width={this.props.width} height={this.props.height}>
                    <DataSeries data={data.series1} size={size} xScale={xScale} yScale={yScale} ref="series1" color="cornflowerblue" />
                    <DataSeries data={data.series2} size={size} xScale={xScale} yScale={yScale} ref="series2" color="red" />
                    <DataSeries data={data.series3} size={size} xScale={xScale} yScale={yScale} ref="series3" color="green" />
                    <DataSeries data={data.series3} size={size} xScale={xScale} yScale={yScale} ref="series4" color="goldenrod" />
                </Chart>
                <RangeInput />
            </div>
        );
    }
});

var RangeInput = React.createClass({
    getDefaultProps: function() {
        return {
            min: 1,
            max: 10,
            step: 1
        };
    },
    handleChange: function (event) {
        var modifier = parseInt(event.target.value, 10);

        this._owner.props.data.series1.forEach(function (item) {

            var x = (modifier / item.y) * 100;
            var y = (x / 100) * item.y;

            if (modifier > 5) {
                item.y += y;
            } else {
                item.y -= y;
            }

            console.log(item.y);
            // item.y = Math.random() * 100;
        });

        this._owner.forceUpdate();
    },
    render: function() {
        return (
            <input
                type="range"
                onChange={this.handleChange}
                min={this.props.min}
                max={this.props.max}
                value={this.props.value}
                step={this.props.step} />
        );
    }
});

/* Module.exports instead of normal dom mounting */
module.exports.ChartApp = LineChart;
