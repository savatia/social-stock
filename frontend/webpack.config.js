var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var webpack = require('webpack');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + '/build',
        filename: "main.js"
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
    ],
    devtool: "#eval-source-map",
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [
                    "react",
                    ["es2015", {modules: false}],
                    "stage-1",
                ],
            },
        },
            {
                test: /\.(jpe?g|png|gif|svg|eot|svg|ttf|woff|woff2)$/,
                loader: "file-loader"
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!less-loader"})
            }
        ]
    }
};