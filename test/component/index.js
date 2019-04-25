/*
* @Author: liyunjiao2048@163.com
* @Date:   2019-04-15 14:49:24
* @Last Modified by:   liyunjiao
* @Last Modified time: 2019-04-25 17:04:37
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
import ClickAndInputCom from '../../src/components/clickAndInputCom';

if (typeof window !== 'undefined') {
  global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
  };
  global.window.scrollTo = () => {};
}

// The built-in requestAnimationFrame and cancelAnimationFrame not working with jest.runFakeTimes()
// https://github.com/facebook/jest/issues/5147
global.requestAnimationFrame = cb => setTimeout(cb, 0);
global.cancelAnimationFrame = cb => clearTimeout(cb, 0);


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
            nock('http://127.0.0.1:8686/api/regtech').post('/homelist').reply(200,JSON.stringify(mockData));
        });
        afterAll(()=>{
            nock.cleanAll();
        });
        it('case: contain 20 items',async ()=>{
            const wrapper = shallow(<PostHomelistData/>);
            await awu(()=>{
                return wrapper.state('homelist').length == mockData.subjects.length;
            });
            // console.log('kkkkkk',wrapper.find('.data-item').length);
            expect(wrapper.find('.data-item').length).toEqual(20);
        });
    });

    // 测试异步请求失败用例
    describe('test suit: fetch data fail & render empty container',()=>{
        let response = null;
        beforeAll(()=>{
            nock('http://127.0.0.1:8686/api/regtech').post('/homelist').reply(500,()=>{
                response = true;
            });
        });
        afterAll(()=>{
            nock.cleanAll();
        });
        it('case: fetch data return fail',async ()=>{
            const wrapper = shallow(<PostHomelistData/>);
            await awu(()=>response);
            expect(wrapper.find('.data-item').length).toEqual(0);
        })
    });

    // 测试交互
    describe('test suit: click & change event',()=>{
        let resolve = false;
        beforeAll(()=>{
            nock('http://127.0.0.1:8686/api/regtech').post('/homelist').reply(200,JSON.stringify(mockData));
        });
        afterAll(()=>{
            nock.cleanAll();
        });
        it('case: event', async (done)=>{
            const wrapper = mount(<ClickAndInputCom/>);
            const input = wrapper.find('Input').at(0);
            const button = wrapper.find('Button').at(0);
            // 页面是否渲染完整
            expect(input.exists());
            expect(button.exists());

            input.simulate('change', {
                target: {
                    value: 'something'
                }
            });

            button.simulate('click');

            await awu(() => {
                return wrapper.state('homelist').length == mockData.subjects.length;
            });

            expect(wrapper.state('value')).toBe('something');

            done();
        }, 9999);
    });
});