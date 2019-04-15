/*
* @Author: liyunjiao2048@163.com
* @Date:   2019-04-15 13:46:54
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2019-04-15 14:17:42
*/
var path = require('path');

module.exports = {
    // 单元测试环境根目录
    rootDir:path.resolve(__dirname,'../'),
    // 匹配需要进行单元测试的文件
    testMatch:[
        '<rootDir>/test/**/*.js'
    ],
    // 需要忽略的文件
    testPathIgnorePatterns:[
        '/node_modules'
    ],
    testURL:'http://localhost:3434/',
    collectCoverage:true,
    coverageDirectory:path.resolve(__dirname,'../coverage')
}