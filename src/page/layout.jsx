import React,{Component} from 'react';
import {Layout,Button,Icon,Modal} from 'antd';
import {connect} from 'react-redux';
import '../less/layout.less';
import RouteWithSubRoutes from '../components/RouteWithSubRoutes';
const {Content,Sider,Header} = Layout;

class Struct extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    componentWillMount(){
        
    }
    componentDidMount(){
    }
    componentWillUnmount(){
        window.onhashchange = null;
    }
    
    onClickReload(){
        let opt = this.getUpdateMsg();
        this.props.getData(opt);
    }
    render(){
        let {} = this.state;
        let routes = this.props.routes || [];
        let Routes = routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
        ));
        let titleBar = (
            <div>我是layout</div>
        );
        
        return (
            <Layout className="struct-layout">
                <Header className="struct-header">
                    {titleBar}
                </Header>
                <Layout>
                    <Content className="struct-content">
                        {Routes}
                    </Content>
                </Layout>
            </Layout>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        //stateData:state.reducer
    };
};

let mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        // getData(opt){
        //     dispatch(fetchApis(opt));
        // }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Struct);