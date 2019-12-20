/*
* @Author: liyunjiao2048@163.com
* @Date:   2019-12-20 14:03:42
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2019-12-20 15:00:01
*/

import React from 'react';

const state = {
    appName:'test app',
    appVersion:'1.1.0',
    appDesc:'就是做着玩'
}

/*
    设置的初始值在class模式下通过jsx语法传入的Provider没什么用
    只有在函数组件中直接被useContext引用的时候，初始值就起作用了
*/

export default React.createContext(state);