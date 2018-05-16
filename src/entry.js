/**
* @file: 入口文件
* @Author: liyunjiao
* @Date:   2018-05-14 15:12:49
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-14 15:13:58
*/

import React from 'react';
import ReactDom from 'react-dom';
import Router from './App';
import { AppContainer } from 'react-hot-loader';

const render = (Param = Router) =>{
    ReactDom.render(
        <AppContainer>
            <Param/>
        </AppContainer>,
        document.getElementById('root')
    );
};
render();

if (module.hot) {
    module.hot.accept('./App', ()=>{
        const cpt = require('./App');
        render(cpt);
    });
}