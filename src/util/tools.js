/**
* @file: 工具函数集锦
* @Author: liyunjiao
* @Date:   2018-05-15 14:10:21
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2019-04-15 14:07:05
*/

/**
 * 判断数据类型
 * @param {Object} param 文本
 * @return {text} 替换后的文本
 */
export function judgeType(param) {
    if(param === null){
        return 'null';
    }
    let str = Object.prototype.toString.call(param);
    let reg = /^\[\w+\s(\w+)\]$/;
    let type = str.match(reg)[1];
    return type.toLowerCase();
}

/**
 * 判断数据类型
 * @param {Object} obj 请求参数对象
 * @return {string} 替换后的字符串
 */
export function serialize(obj) {
    const result = [];
    for (const k in obj) {
        result.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]));
    }
    return result.join('&');
}

export function sum(a,b){
    return a+b;
}