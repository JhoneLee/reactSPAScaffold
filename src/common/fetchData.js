/**
* @file: 获取接口数据
* @Author: liyunjiao
* @Date:   2018-05-15 14:15:02
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-15 15:36:35
*/

import fetch from '../util/fetch';
import {judgeType} from '../util/tools';
import { message,Modal } from 'antd';
import {root} from '../util/domain';
import {requestPosts} from '../action';
const BASE = root;
// 带abort功能的fetch
function wrapFetch(fetchPromise, timeout) {
    let abortFn = null;
    let time = timeout*1000;
    //这是一个可以被reject的promise
    let abortPromise = new Promise((resolve, reject)=>{
        abortFn = ()=>{
            reject({
                type:'600',
                text:'请求超时,请稍后再试'
            });
         };
    });

    //使用Promise.race 组装两个promise
    let abortablePromise = Promise.race([
         fetchPromise,
         abortPromise
    ]);
    setTimeout(()=>{
         abortFn();
    }, time);

   return abortablePromise;
}

/**
 * ------------------------------------------------------------------
 * fetchApis opt参数 (string/object)
 * string : api名称
 * object: 属性：
 *     api : 请求的api名称
 *     params: 请求参数
 *     success: 请求成功回调
 *     error: 请求接口错误回调
 *     disconnect: 断网错误回调
 * ------------------------------------------------------------------
 */
export default function mkFetchPost(receive){
    return function fetchApis(opt) {
        let type = judgeType(opt);
        let {api,params,success,error,disconnect,nsign,loading,timeout,notmsg} = opt;
        let func = () =>{};
        disconnect = disconnect || func;
        error = error || func;
        params = params || {};
        success = success || func;
        if(type === 'string'){
            api = opt;
        }
        let nload = loading?'show':'hide';
        timeout = timeout || 10;
        return function (dispatch) {
            // 显示loading
            dispatch(requestPosts(nload));
            console.log(BASE+api);
            return wrapFetch(fetch({
                url:BASE + api,
                params:params,
                method:'get'
            }),timeout).then((response)=>{
                return response.json();
            },(error)=>{
                console.log(error);
                // 隐藏loding
                dispatch(requestPosts('hide'));
                // 网络中断处理
                let text = '网络不给力，请检查网络后重试';
                if(error.type == 600){
                    text = error.text;
                } 
                Modal.error({
                    title:'请求失败',
                    content:text
                });
                disconnect(error);
            }).then((json)=>{
                // 隐藏loading
                dispatch(requestPosts('hide'));
                if(json){
                    if(judgeType(json) == 'object'){
                        // 请求成功
                        success(json);
                    } else {
                        // 请求成功，但是接口返回错误
                        message.error('数据错误');
                        error(json);
                    }
                    return dispatch(receive(api, json));
                }
            }).catch(err => {
                // 捕捉其他一切未知错误
                error(err);
            });
        };
    }
}