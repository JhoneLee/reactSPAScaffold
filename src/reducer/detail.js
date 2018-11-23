/**
* @file: 详情页reducer
* @Author: liyunjiao
* @Date:   2018-05-16 11:37:56
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-11-23 14:06:40
*/

import Action from '../action';
const {MOVIE_DETAIL} = Action;
export const movieDetail = (state = {}, action)=>{
    const {type, payload} = action;
    let payloads = type === MOVIE_DETAIL ? payload : null;
    return payloads || state;
};