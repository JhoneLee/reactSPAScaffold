/**
* @file: fetch-jsonp 获取数据
* @Author: liyunjiao
* @Date:   2018-05-15 15:53:40
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-11-23 14:05:11
*/

import fetchJsonp from 'fetch-jsonp';
import {judgeType,serialize} from '../util/tools';
import { message,Modal } from 'antd';
import {root} from '../util/domain';
import Action from '../action';
const BASE = root;
let {requestPosts} = Action;
/**
 * ------------------------------------------------------------------
 * fetchApis opt参数 (string/object)
 * string : api名称
 * object: 属性：
 *     api : 请求的api名称
 *     params: 请求参数
 *     success: 请求成功回调
 *     error: 请求接口错误回调
 *     pathParams: url中附加的参数
 *     disconnect: 断网错误回调
 * ------------------------------------------------------------------
 */
export default function mkFetchJsonp(receive){
    console.log(receive);
    return function fetchJsonpApis(opt) {
        let type = judgeType(opt);
        let {api,params,pathParams,success,error,disconnect,loading,timeout} = opt;
        let func = () =>{};
        disconnect = disconnect || func;
        error = error || func;
        params = params || {};
        pathParams = pathParams || [];
        success = success || func;
        if(type === 'string'){
            api = opt;
        }
        let nload = loading?'show':'hide';
        timeout = timeout || 15000;
        return function (dispatch) {
            // 显示loading
            dispatch(requestPosts(nload));
            let pathP = pathParams.join('/');
            pathP = pathP == '' ? '':`/${pathP}`;
            let dataUrl = `${BASE}${api}${pathP}?${serialize(params)}`;
            console.log(dataUrl);
            return fetchJsonp(dataUrl,{
                timeout
            }).then((response)=>{
                return response.json();
            },(error)=>{
                // 隐藏loding
                dispatch(requestPosts('hide'));
                // 网络中断处理
                let text = '网络不给力，请检查网络后重试';
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