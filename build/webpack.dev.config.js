/**
 * 本地预览
 */

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge')
var webpackBaseConfig = require('./webpack.base.config.js')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


module.exports = merge(webpackBaseConfig, {
    // 入口
    entry: {
        main: './src/main.js',
        vendors: ['vue', 'vue-router', './src/iview']
    },
    // 输出
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: false
            }
        }]
    },
    devServer: {
        stats: {
            colors: true
        },
        proxy: {
            '/json': {
                target: 'http://10.101.64.45:8080',
                pathRewrite: {
                    '^/json': '/ui-document/json'
                },
                changeOrigin: true
            }
        }
    },
    // resolve: {
    //     alias: {
    //         iview: '../../src/index',
    //         vue: 'vue/dist/vue.js'
    //     }
    // },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendor.bundle.js'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../dist/index.html'),
            template: path.join(__dirname, '../index.html')
        }),
        new FriendlyErrorsPlugin()
    ]
});
