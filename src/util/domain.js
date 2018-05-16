/**
* @file: 接口配置
* @Author: liyunjiao
* @Date:   2018-05-15 14:25:37
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-15 16:40:08
*/


// 本例使用豆瓣api演示（特此鸣谢）


// dev环境下的接口地址
let base = 'https://api.douban.com/v2/';
if(window.__PRO__){
    // 生产环境下的接口地址
    base = 'https://api.douban.com/v2/';
}
export const root = base;