import React from 'react';
import fetch from '../util/fetch';
class PostHomeListData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            homelist:[]
        }
    }
    componentWillMount(){
        fetch({
            url:'http://127.0.0.1:8686/api/regtech/homelist',
            method:'post',
        })
        .then(res=>res.json())
        .then((res)=>{
            console.log(res);
            let data = res;
            if(data.status==0){
                let homelist = data.subjects;
                this.setState({
                    homelist
                });
            } else {
                // return null;
            }
        })
        .catch(e=>{
            console.log(e);
            // return null;
        });
    }
    // 这种新类型的生命周期函数jest v24.7.1 还不支持，导致无法测试
    // static getDerivedStateFromProps(nextProps, prevState){
    //     if(prevState.homelist.length){
    //         return null;
    //     } else {
    //         fetch({
    //             url:'http://127.0.0.1:8686/api/regtech/homelist',
    //             method:'post',
    //         })
    //         .then(res=>res.json())
    //         .then((json)=>{
               
    //             let data = json;
    //             if(data.status==0){
    //                 prevState.homelist = data.subjects;
    //                 return prevState;
    //             } else {
    //                 return null;
    //             }
    //         })
    //         .catch(e=>{
    //             console.log(e);
    //             return null;
    //         });
    //     }
    // }
    render(){
        let {homelist} = this.state;
        let arr = homelist.map(e=>{
            return (
                <li className="data-item">
                    <a href="javascript:;">{e.title}</a>
                </li>
            );
        });
         console.log(arr);
        return (
            <div>
                <ul>{arr}</ul>
            </div>
        )
    }
}

export default PostHomeListData;