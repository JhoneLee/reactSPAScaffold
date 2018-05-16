/**
* @file: 首页reducer
* @Author: liyunjiao
* @Date:   2018-05-15 16:31:56
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-16 11:59:53
*/

import {HOME_LIST} from '../action';

export const homeList = (state = {
    total:0,
    subjects:[]
}, action)=>{
    const {type, payload} = action;
    let payloads = type === HOME_LIST ? payload : null;
    return payloads || state;
};