const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var outputPath = path.join(path.dirname(__dirname), '/dist')
var publicPath = '/static'

module.exports = {
    entry: "./src/index.js",
    output: {
        path: outputPath,
        filename: "bundle.js",
        publicPath: publicPath,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            // (the commons chunk name)

            filename: "vendor.js",
            // (the filename of the commons chunk)
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.includes('node_modules');
            }

            // minChunks: 3,
            // (Modules must be shared between 3 entries)

            // chunks: ["pageA", "pageB"],
            // (Only use these entries)
        })
    ],
    module: {
        loaders: [
            {
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
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            publicPath: publicPath,
                            outputPath: 'assets/'
                        }
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!less-loader"})
            }
        ]
    },
    resolve: {
        modules: [
            path.join(path.dirname(__dirname)),
            path.join(path.dirname(__dirname), 'node_modules')
        ]
    }
}