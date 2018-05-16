/**
* @file: reducer汇总
* @Author: liyunjiao
* @Date:   2018-05-15 14:34:43
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-16 12:03:30
*/

import * as fetch from './fetch';
import * as home from './home';
import * as detail from './detail';
import { combineReducers } from 'redux';
export default combineReducers({
    ...fetch,
    ...home,
    ...detail
});