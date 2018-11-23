/**
* @file: 首页reducer
* @Author: liyunjiao
* @Date:   2018-05-15 16:31:56
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-11-23 14:07:25
*/

import Action from '../action';
const {HOME_LIST} = Action;
export const homeList = (state = {
    total:0,
    subjects:[]
}, action)=>{
    const {type, payload} = action;
    let payloads = type === HOME_LIST ? payload : null;
    return payloads || state;
};