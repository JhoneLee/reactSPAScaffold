import React from 'react';
import ContextTest from '../components/ContextTest';
import MyContext from '../common/context';
class HomeTest extends React.Component {
    static contextType = MyContext;
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.context);
    }
    render(){
        return (
            <div>
                <ContextTest />
                <MyContext.Consumer>
                    {value=><ContextTest fdata={value} />}
                </MyContext.Consumer>
            </div>
        )
    }
}

export default HomeTest;