/*
* @Author: liyunjiao2048@163.com
* @Date:   2019-04-15 14:49:24
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2019-04-15 15:37:16
*/

import Enzyme,{ shallow, render, mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import Text from '../../src/components/unitTestComponent';
Enzyme.configure({
    adapter:new Adapter()
});

// describe('test suite: Text component',()=>{
//     it('case: expect Text render a div with className: test-container',()=>{
//         const wrapper = shallow(<Text/>);
//         expect(wrapper.find('.test-container').length).toEqual(1);
//     });
// }); 


test('test suit:expect Text render a div with className: test-container',()=>{
    const wrapper = shallow(<Text/>);
    expect(wrapper.find('.test-container').length).toEqual(1);
});