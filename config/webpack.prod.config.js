/**
* @file: 生产环境webpack配置文件
* @Author: liyunjiao
* @Date:   2018-05-14 15:45:20
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-11-23 15:00:14
*/

// 当我们配置组件异步加载的时候，webpack会自动将异步加载的组件单独打包成js文件
// 使用chunkhash 可以有效的将文件内容变动改名

var path = require('path');
var os = require('os');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    devtool: false,
    mode:'production',
    entry: {
        main: path.join(__dirname, '../src/entry.js'),
        // vendorReact: ['react','react-dom'],
        // vendorRedux:['redux','react-router-redux','react-redux','redux-thunk','redux-promise'],
        // vendorRouter:['react-router','react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: './js/[name].[chunkhash:8].js',
        publicPath: ''
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'hehe',
            template: path.join(__dirname, '../index.html'),
            filename: './index.html',
            chunks:['main','vendorReact','vendorRedux','vendorRouter']
        }),
        new ExtractTextPlugin("css/less.[chunkhash:8].css"),
        new BundleAnalyzerPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.react']
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
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
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            }, {
                test: /\.html?$/,
                exclude: /node_modules/,
                use: ['html-loader']
            },
            {
                test: /\.react$/,
                exclude: /node_modules/,
                use: ['single-react-loader']
            }, {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            }, {
                test: /\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader'
                        },{
                            loader:'less-loader'
                        }
                    ]
                })
            }
        ]
    }
};