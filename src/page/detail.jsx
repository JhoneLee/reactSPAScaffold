import React,{Component} from 'react';
import { Layout,Input,Icon,Button,message,Spin } from 'antd';
import {connect} from 'react-redux';
import Action from '../action';
import mkFetchJsonp from '../common/fetchJsonp';
// import '../less/home.less';
import img from '../image/loading.gif';
const {detailReceive} = Action;
const { Header, Content} = Layout;
const fetchApis = mkFetchJsonp(detailReceive);
class Detail extends Component{
    constructor(props){
        super(props);
    }
    
    componentWillMount(){
        let _this = this;
        let {id} = this.props.match.params;
        console.log(this.props);
        this.props.getData({
            api:`movie/subject`,
            params:{},
            pathParams:[id],
            success(res){
                message.success('详情请求成功!!');
                console.log(res);
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
        let {requestPosts,movieDetail} = stateData;
        console.log(stateData);
        let flag = requestPosts === 'hide'?false:true;
        return (
            <Layout className="detail-page">
                <Spin tip="数据加载中..." spinning={flag}>
                    <Content className="main">
                        <Layout>
                            <Content>
                                <h2>电影《{movieDetail.title}》详情</h2>
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
export default connect(mapStateToProps,mapDispatchToProps)(Detail);