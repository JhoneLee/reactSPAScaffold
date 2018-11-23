import React,{Component} from 'react';
import { Layout,Input,Icon,Button,message,Spin } from 'antd';
import {connect} from 'react-redux';
import Action from '../action';
import mkFetchJsonp from '../common/fetchJsonp';
import HomeDataItem from '../components/HomeDataItem';
import '../less/home.less';
import img from '../image/loading.gif';
const {homeReceive} = Action;
const { Header, Content} = Layout;
const fetchApis = mkFetchJsonp(homeReceive);
class Home extends Component{
    constructor(props){
        super(props);
    }
    
    componentWillMount(){
        let _this = this;
        this.props.getData({
            api:'movie/in_theaters',
            params:{},
            success(res){
                message.success('首页数据请求成功');
            },
            error(e){
                console.error(e);
            },
            disconnect(err){
                console.log('断网',err);
            }
        })
    }
    
    render(){
        let {getData,stateData} = this.props;
        let {requestPosts} = stateData;
        let flag = requestPosts === 'hide'?false:true;
        let {subjects,total} = stateData.homeList;
        let list = [];
        list.push(subjects.map((e,i)=>{
            return (<HomeDataItem key={`idx-${i}`} data={e}/>)
        }));
        return (
            <Layout className="home-page">
                <Spin tip="数据正在加载中..." spinning={flag}>
                    <Content className="main">
                        <Layout>
                            <Content className="home-center">
                                <h1>正在热映{total}个电影</h1>
                                <ul className="data-list">
                                    {list}
                                </ul>
                            </Content>
                        </Layout>
                    </Content>
                </Spin>
            </Layout>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        stateData:state.reducer
    };
};

let mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        // 获取数据
        getData(opt){
            dispatch(fetchApis(opt));
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Home);