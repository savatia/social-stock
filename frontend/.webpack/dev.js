var merge = require('webpack-merge');
var common = require('./common.js');
var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = merge(common, {
    // devtool: 'inline-source-map',
    // devtool: "#eval-source-map",
    devServer: {
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        // new DashboardPlugin(),
    ]
});