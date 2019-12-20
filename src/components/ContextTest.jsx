import React,{Component} from 'react';
import MyContext from '../common/context';
class ContextTest extends Component {
    static contextType = MyContext;
    constructor(props){
        super(props);
    }
    render(){
        console.log('ContextTest context:',this.context);
        console.log('ContextTest props data context:',this.props.fdata)
        return (
            <div>
                I'am ContextTest
            </div>
        )
    }
}

export default ContextTest;