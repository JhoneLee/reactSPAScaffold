/**
* @file: action汇总
* @Author: liyunjiao
* @Date:   2018-05-15 14:33:30
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-11-23 12:46:22
*/

import * as fetch from './fetch';
import * as home from './home';
import * as detail from './detail';
console.log('action',detail);
console.log(...detail);
export default {
    ...fetch,
    ...home,
    ...detail
};