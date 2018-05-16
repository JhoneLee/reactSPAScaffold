/**
* @file: 首页action
* @Author: liyunjiao
* @Date:   2018-05-15 14:41:38
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-15 16:41:48
*/

export const HOME_LIST = 'HOME_LIST';
export function homeList(json){
    return {
        type:HOME_LIST,
        payload:json
    };
}


const dic = {
    'movie/in_theaters':homeList
};

export function homeReceive(subreddit, json) {
    return dic[subreddit](json);
}