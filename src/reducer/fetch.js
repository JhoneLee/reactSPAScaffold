/**
* @file: fetch reducer
* @Author: liyunjiao
* @Date:   2018-05-15 14:32:58
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-11-23 14:07:02
*/

import Action from '../action';
const {REQUEST_POSTS} = Action;
export const requestPosts = (state = 'hide', action)=>{
    const {type, payload} = action;
    let payloads = type === REQUEST_POSTS ? payload : null;
    return payloads || state;
};