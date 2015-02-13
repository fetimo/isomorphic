var React = require('react/addons');
var ChartApp = React.createFactory(require('./app/components/ChartApp.js').ChartApp);
var data = require('./app/data/data.json');

module.exports = function(app) {
    app.get('/', function(req, res){
        // React.renderToString takes your component
        // and generates the markup

        var reactHtml = React.renderToString(ChartApp({data: data}));
        // Output html rendered by react
        res.render('index.ejs', { reactOutput: reactHtml });
    });
};
