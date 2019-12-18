/**
* @file: 生产环境webpack配置文件
* @Author: liyunjiao
* @Date:   2018-05-14 15:45:20
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2019-11-20 14:28:07
*/

// 当我们配置组件异步加载的时候，webpack会自动将异步加载的组件单独打包成js文件
// 使用chunkhash 可以有效的将文件内容变动改名

var path = require('path');
var os = require('os');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var manifest = require('./dll/vendor-manifest.json');
module.exports = {
    devtool: false,
    mode:'production',
    entry: {
        main: path.join(__dirname, '../src/entry.js')
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
            chunks:['main', 'vendor', 'manifest']
        }),
       new ExtractTextPlugin({
            filename: 'css/less.[chunkhash:8].css', 
            disable: false, 
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'CLIENT_ENV':JSON.stringify('prod')
        }),
        new webpack.DllReferencePlugin({
            manifest,
        }),
        new BundleAnalyzerPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.react'],
        alias: {
            Components: path.resolve(__dirname, '../src/components/')
        }
    },
    externals:{
        'BMap':'BMap' // 使用百度地图api
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
        },
        // namedModules: true,
        // namedChunks: true,
        minimize: true
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