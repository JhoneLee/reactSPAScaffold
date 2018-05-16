/**
* @file: 详情页reducer
* @Author: liyunjiao
* @Date:   2018-05-16 11:37:56
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-16 11:38:50
*/

import {MOVIE_DETAIL} from '../action';

export const movieDetail = (state = {}, action)=>{
    const {type, payload} = action;
    let payloads = type === MOVIE_DETAIL ? payload : null;
    return payloads || state;
};