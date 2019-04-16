/*
* @Author: liyunjiao2048@163.com
* @Date:   2019-04-15 14:49:24
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2019-04-16 22:42:13
*/
/*
    render 是纯dom树的渲染结果
    shallow 是 react 组件树渲染结果
    mount 可以渲染react子组件
    shallow mount 生成的reactWrapper，可以进行find parnets children 元素查找  
                                            state props 数据查找 
                                            setState setProps数据设置
*/

import Enzyme,{ shallow, render, mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import nock from 'nock';
import awu from 'async-wait-until';
import 'babel-polyfill';
import Text from '../../src/components/unitTestComponent';
import PostHomelistData from '../../src/components/postHomelistData';
import mockData from '../../mock/homelist';
Enzyme.configure({
    adapter:new Adapter()
});
describe('reactSPAScaffold components unit test',()=>{
    // 简单的组件测试用例
    describe('test suite: Text component',()=>{
        it('case: expect Text render a div with className: test-container',()=>{
            const wrapper = shallow(<Text/>);
            expect(wrapper.find('.test-container').length).toEqual(1);
        });
    }); 

    // test('test suit:expect Text render a div with className: test-container',()=>{
    //     const wrapper = shallow(<Text/>);
    //     expect(wrapper.find('.test-container').length).toEqual(1);
    // });

    // 异步请求测试用例
    describe('test suite: fetchData test & render data item',()=>{
        beforeAll(()=>{
            nock('http://127.0.0.1:8686/api/regtech').post('/homelist').reply(200,mockData);
        });
        afterAll(()=>{
            nock.cleanAll();
        });
        it('case: contain 20 items',async ()=>{
            const wrapper = shallow(<PostHomelistData/>);
            await awu(()=>{
                return wrapper.state('homelist').length == mockData.subjects.length;
            });
            console.log(wrapper.find('.data-item').length);
            expect(wrapper.find('.data-item').length).toEqual(20);
        });
    });
});