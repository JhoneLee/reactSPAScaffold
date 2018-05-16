import React,{h} from 'react';
import {Link} from 'react-router-dom';
const HomeDataItem = ({data,...props}) => {
    let {images,genres,title,id} = data;
    let gens = [];
    gens.push(genres.map((e)=>{
        return (
            <li>{e}</li>
        );
    }));
    return (<li className="data-item">
        <Link to={`/page/detail/${id}`}>
            <div>
                <img src={images.medium} alt="封面"/>
            </div>
            <h2>{data.title}</h2>
            <ul className="genres-name">{gens}</ul>
        </Link>
    </li>);
};
export default HomeDataItem;