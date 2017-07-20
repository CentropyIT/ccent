var path = require('path');
var webpack = require('webpack');
var debug = process.env.NODE_ENV !=="production";

module.exports = {
    devServer: {
        inline: true,
        contentBase: './src',
        port: 3000
    },
    devtool: 'cheap-module-eval-source-map',
    entry: './dev/js/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    watch: true,
    output: {
        path: 'src',
        filename: 'js/bundle.min.js'
    },
    plugins: debug ? [] : [
        new wepback.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new wepback.optimize.UglifyJsPlugin
                                    ({ mangle: false, sourcemap: false}),
    ]
};
