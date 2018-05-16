/**
* @file: 路由文件
* @Author: liyunjiao
* @Date:   2018-05-14 15:15:42
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-16 11:18:11
*/

import Home from './page/home';
import Detail from './page/detail';
import Layout from './page/layout';
const routes = [{
    path: '/home',
    component: Home,
    exact: true
},{
    path: '/page',
    component: Layout,
    exact: true,
    routes:[
        {
            path: '/page/detail/:id',
            component: Detail,
            exact: false
        }
    ]
}];
export default routes;