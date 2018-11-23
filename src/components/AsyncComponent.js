/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-11-22 14:31:03
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-11-23 14:12:41
*/

import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    componentDidMount() {
        // const { default: component } = await importComponent();
        let _this=this;
        importComponent().then(res=>{
            _this.setState({
                component: res.default
            });
        })
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}