var path = require('path')
var webpack = require('webpack')

module.exports = {
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this necessary.
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                }
                // other vue-loader options go here
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                // 'autoprefixer-loader'
            ]
        }, {
            test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        // 使用了全局组件，主要在浏览器中编译，设置别名加载完整版vue，否则可不设置别名，仅加载run-time版vue
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}
