var React = require('react/addons');

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
module.exports = RangeInput;
