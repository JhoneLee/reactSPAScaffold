/**
* @file: action汇总
* @Author: liyunjiao
* @Date:   2018-05-15 14:33:30
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-16 11:41:49
*/

import * as fetch from './fetch';
import * as home from './home';
import * as detail from './detail';
export default {
    ...fetch,
    ...home,
    ...detail
};