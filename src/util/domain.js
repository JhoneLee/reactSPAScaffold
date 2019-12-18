/**
* @file: 接口配置
* @Author: liyunjiao
* @Date:   2018-05-15 14:25:37
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2019-11-20 14:27:02
*/


// 本例使用豆瓣api演示（特此鸣谢）


// dev环境下的接口地址
let base = 'https://api.douban.com/v2/';
if(CLIENT_ENV === 'dev'){
    /*开发环境*/
    // base = 'http://192.168.13.241:8585';
    // base = 'http://127.0.0.1:8585'
} else {
    /*线上环境*/
    base = 'https://api.douban.com/v2/';
}
export const root = base;