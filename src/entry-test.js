/*
* @Author: liyunjiao2048@163.com
* @Date:   2019-12-20 14:12:05
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2019-12-20 14:51:29
*/

import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Home from './testPage/home';
import MyContext from './common/context';
const state = {
    appName:'test app aaa',
    appVersion:'1.1.2',
    appDesc:'就是做着玩'
}
const render = () =>{
    ReactDom.render(
        (
            <AppContainer>
                <MyContext.Provider value={state}>
                    <Home />
                </MyContext.Provider>
            </AppContainer>
        ),
        document.getElementById('root')
    );
};
render();