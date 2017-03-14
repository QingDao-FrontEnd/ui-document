var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpackBaseConfig = require('./webpack.base.config.js')

process.env.NODE_ENV = 'production'

module.exports = merge(webpackBaseConfig, {
    entry: {
        main: './src/main.js',
        vendors: ['vue','vue-router']
    },
    output: {
        path: path.resolve(__dirname, '../prod'),
        // publicPath: '/prod/',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: true
            }
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendor.bundle.js'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../prod/index.html'),
            template: path.join(__dirname, '../index.html')
        }),
        // http://vue-loader.vuejs.org/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
})
