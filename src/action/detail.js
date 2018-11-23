/**
* @file:详情页action
* @Author: liyunjiao
* @Date:   2018-05-16 11:25:54
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-11-23 12:43:21
*/

const MOVIE_DETAIL = 'MOVIE_DETAIL';
export function movieDetail(json){
    return {
        type:MOVIE_DETAIL,
        payload:json
    };
}

export {MOVIE_DETAIL};

const dic = {
    'movie/subject':movieDetail
};

export function detailReceive(subreddit, json) {
    console.log(subreddit);
    return dic[subreddit](json);
}