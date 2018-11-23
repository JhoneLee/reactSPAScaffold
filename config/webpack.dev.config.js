/**
* @file: dev环境webpack配置文件
* @Author: liyunjiao
* @Date:   2018-05-14 15:43:21
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-11-23 11:42:28
*/

var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: '#eval-source-map',
    mode:'development',
    entry: {
        main: [
            'react-hot-loader/patch',
            // path.join(__dirname, '../mock/index.js'), 需要mock数据则添加此项，使用mockjs制作假数据
            path.join(__dirname, '../src/entry.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: './src/js/[name].js',
        publicPath: ''
    },
    devServer: {
        inline: true,
        port: 3434,
        host: '0.0.0.0'
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'hehe',
            template: path.join(__dirname, '../index.html'),
            filename: './index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test:/\.(png|jpg|gif|eot|svg|ttf|woff)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            }, {
                test: /\.html?$/,
                exclude: /node_modules/,
                use: ['html-loader']
            },{
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            }, {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            }
        ]
    }
};