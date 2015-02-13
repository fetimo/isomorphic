var React = require('react/addons');

var RangeInput = React.createClass({
    handleChange: function (event) {
        console.log(event);
    },
    render: function() {
        return (
            <input type="range" onChange={this.handleChange} />
        );
    }
});

/* Module.exports instead of normal dom mounting */
module.exports = RangeInput;
