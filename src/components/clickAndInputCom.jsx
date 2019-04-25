import React from 'react';
import fetch from '../util/fetch';
import {Button,Input} from 'antd'
class ClickAndInputCom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value:'',
            homelist:[]
        }
    }
    handleClick(){
        let _this = this;
        if(this.state.value){
            fetch({
                url:'http://127.0.0.1:8686/api/regtech/homelist',
                method:'post',
                param:{
                    value:_this.state.value
                }
            })
            .then(res=>res.json())
            .then((res)=>{
                // console.log(res);
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
    }
    handleInputChange(e){
        this.setState({
            value:e.target.value
        });
    }
    render(){
        return (
            <div>
                <Input className="my-input" onChange={this.handleInputChange.bind(this)}/>
                <Button className="my-button" onClick={this.handleClick.bind(this)}>点击</Button>
            </div>
        )
    }
}

export default ClickAndInputCom;