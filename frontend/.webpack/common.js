const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(path.dirname(__dirname), '/dist'),
        filename: "main.js",
        publicPath: 'static/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new ExtractTextPlugin('[name].css'),
    ],
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
}