/**
* @file: fetch数据通用action
* @Author: liyunjiao
* @Date:   2018-05-15 14:24:55
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-15 14:36:37
*/

// 请求开始
export const REQUEST_POSTS = 'REQUEST_POSTS';
/* eslint-disable no-unused-vars*/
export function requestPosts(status) {
    return {
        type: REQUEST_POSTS,
        payload: status
    };
}