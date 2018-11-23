/**
* @file: 首页action
* @Author: liyunjiao
* @Date:   2018-05-15 14:41:38
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-11-23 12:43:50
*/

const HOME_LIST = 'HOME_LIST';
export function homeList(json){
    return {
        type:HOME_LIST,
        payload:json
    };
}


const dic = {
    'movie/in_theaters':homeList
};

export {HOME_LIST};

export function homeReceive(subreddit, json) {
    return dic[subreddit](json);
}