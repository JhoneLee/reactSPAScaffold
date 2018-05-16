/**
* @file: fetch reducer
* @Author: liyunjiao
* @Date:   2018-05-15 14:32:58
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-15 14:36:27
*/

import {REQUEST_POSTS} from '../action';

export const requestPosts = (state = 'hide', action)=>{
    const {type, payload} = action;
    let payloads = type === REQUEST_POSTS ? payload : null;
    return payloads || state;
};