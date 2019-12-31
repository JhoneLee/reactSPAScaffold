/*
* @Author: liyunjiao2048@163.com
* @Date:   2019-12-31 13:18:35
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2019-12-31 13:18:41
*/

var path = require('path');
var os = require('os');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
var antdTheme = require('./theme');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: path.join(__dirname, '../src/entry.js'),
        vendorReact: ['react','react-dom','echarts-for-react'],
        vendorRedux:['redux','react-router-redux','react-redux','redux-thunk','redux-promise'],
        vendorRouter:['react-router','react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: 'js/[name].[chunkhash:8].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendorReact','vendorRedux','vendorRouter','bundle'],
            filename:'js/[name].[chunkhash:8].js'
        }),
        new htmlWebpackPlugin({
            title: 'hehe',
            favicon: path.join(__dirname, '../src/image/favicon.ico'),
            template: path.join(__dirname, '../index.html'),
            filename: './index.html',
            xhtml:true
        }),
        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            workers:os.cpus().length,
            uglifyJS:{
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("css/less.[chunkhash:8].css")
    ],
    resolve:{
        alias: {
            Components: path.resolve(__dirname, '../src/components/'),
            Action: path.resolve(__dirname, '../src/action/'),
            Reducer:path.resolve(__dirname,'../src/reducer'),
            Common:path.resolve(__dirname,'../src/common'),
            Util:path.resolve(__dirname,'../src/util')
        },
        extensions: ['.js', '.jsx', '.react','.less']
    },
    module: {
        rules: [
            {
                test:/\.(png|jpg|gif|eot|svg|ttf|woff)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name:'assets/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },{
                test:/\.worker\.js$/,
                use:{
                    loader:'worker-loader',
                    options: {
                        name: 'js/[name].[hash:8].js',
                    }
                }
            },{
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
                test: /\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader'
                        },{
                            loader:'less-loader',
                            options:{
                                modifyVars:antdTheme
                            }
                        }
                    ]
                })
            }
        ]
    }
};