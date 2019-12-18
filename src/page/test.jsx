import React from 'react';
import HooksTest from '../components/HooksTest';
class Test extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <h1>Test 页面</h1>
                <HooksTest/>
            </div>
        );
    }
}

export default Test;