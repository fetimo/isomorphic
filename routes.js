var React = require('react/addons');
var ChartApp = React.createFactory(require('./app/components/ChartApp').ChartApp);
var temperature = require('./app/data/temp.json');

module.exports = function(app) {
    app.get('/', function(req, res){
        // React.renderToString takes your component
        // and generates the markup

        var reactHtml = React.renderToString(
            ChartApp({
                data: temperature
            })
        );

        // Output html rendered by react
        res.render('index.ejs', { reactOutput: reactHtml });
    });
};
