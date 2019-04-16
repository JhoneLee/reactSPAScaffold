/**
* @file: fetch封装
* @Author: liyunjiao
* @Date:   2018-05-15 14:13:21
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2019-04-16 16:42:23
*/

import {serialize} from './tools';
import URLSearchParams from 'url-search-params';
import fetch from 'isomorphic-fetch';
/**
 * ------------------------------------------------------------------
 * fetchUtil opt参数
 * 属性：
 *     url : 请求的url
 *     method: get/post
 *     params: fetch请求参数
 *     headers: fetch请求头
 * ------------------------------------------------------------------
 */
export default function fetchUtil(opt) {
    const {url, method, params, headers} = opt;
    let fullUrl = url;
    let data = {};
    let defaultHeaders = {
        'Accept': 'application/json', // 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/json; charset=utf-8'
    };

    if ((method === 'GET' || method == 'get') && params) {
        fullUrl = fullUrl + '?' + serialize(params);
        console.log(fullUrl);
    } else if (headers && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        let urlSear = new URLSearchParams();
        for(let i in params){
            urlSear.append(i, params[i]);
        }
        data.body = urlSear.toString();
        data.method = method;
    } else {
        data.body = JSON.stringify(params);
        data.method = method;
    }

    let newHeaders;
    if (window.customHeaders && typeof window.customHeaders === 'function') {
        newHeaders = Object.assign({}, defaultHeaders, window.customHeaders());
    } else {
        newHeaders = Object.assign({}, defaultHeaders, headers);
    }
    Object.assign(data, {headers: newHeaders, credentials: 'include'});
    return fetch(fullUrl, data);
}