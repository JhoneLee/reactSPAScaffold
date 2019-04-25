/*
* @Author: liyunjiao2048@163.com
* @Date:   2019-04-15 13:46:54
* @Last Modified by:   liyunjiao
* @Last Modified time: 2019-04-25 17:05:29
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
        '<rootDir>/node_modules'
    ],
    testURL:'http://localhost:3434/',
    collectCoverage:true,
    coverageDirectory:path.resolve(__dirname,'../coverage'),
    setupFilesAfterEnv:[path.resolve(__dirname,'./jest.setup.js')],
    moduleFileExtensions: ["js", "jsx"],
    // 对css less等非js文件进行忽略
    moduleNameMapper: {
      "^.+\\.(css|less)$": "<rootDir>/config/cssSetup.js"
    }
}