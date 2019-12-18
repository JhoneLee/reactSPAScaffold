/*
* @Author: liyunjiao2048@163.com
* @Date:   2019-11-20 14:16:22
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2019-11-20 14:20:37
*/

const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode:'production',
    entry:{
        vendor:[path.join(__dirname,'../src/common/vendor.js')]
    },
    output:{
        path:path.join(__dirname,'vendor'),
        filename:'[name].dll.js',
        library:'[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dll', '[name]-manifest.json'),
            name: '[name]'
        })
    ]
}