import React,{useState,useEffect,memo,useCallback,useMemo,useContext} from 'react';
import MyContext from '../common/context';

const HooksTestSon = ({...props})=>{
    console.log('子组件HooksTestSon被渲染');
    const context = useContext(MyContext);
    console.log('xxxxxxxxxxxxxxx',MyContext);
    let {count} = props;
    console.log('子组件通过useContext获取全局数据:',context);
    return (<h1>HooksTest子组件,渲染只进行一次，除非count发生改变:{count}</h1>);
}
// 使用memo封装的子组件只会在props未改变时渲染一次
const MemoHooksTestSon = memo(HooksTestSon);

const HooksTestChild = ({...props})=>{
    console.log('子组件HooksTestChild被渲染');
    let {name,setName} = props
    return (
        <div>
            <h1>HooksTestChild子组件,渲染只进行一次，除非自己更改name：{name}</h1>
            <button onClick={setName}>更改name</button>
        </div>
    );
}
const MemoHooksTestChild = memo(HooksTestChild);

const HooksTestChild2 = ({...props})=>{
    console.log('子组件HooksTestChild2被渲染');
    let {obj,setName} = props;
    return (
        <div>
            <h1>HooksTestChild2子组件,渲染只进行一次，除非自己更改obj.name：{obj.name}</h1>
            <button onClick={setName}>更改obj.name</button>
        </div>
    );
}
const MemoHooksTestChild2 = memo(HooksTestChild2);

export default ()=>{
    const [count,setCount] = useState(100);
    const [obj,setObj] = useState({a:1,b:{c:2}});
    // count是只读的,所以不能count++或--，只能用新值去覆盖
    useEffect((newState,oldState)=>{
        // 每次在useState上注册的数据发生改变的时候都会执行此函数
        // 没有参数会被传入，newState oldState无效
        console.log(count,obj);
        // useEffect第二个参数限定监测范围，只有在count发生改变时才会触发useEffect函数
        // 不传第二个参数,默认都会监测
    },[count]);

    // 自定义钩子函数
    const useDate = (initDate)=>{
        let [date,setDate] = useState(initDate || Date.now());
        useEffect(()=>{
            let timer = setInterval(()=>{
                setDate(Date.now());
            },1000);
            // 返回的函数会在每次执行完useEffect函数的时候被执行
            return ()=>{
                // console.log('作为useEffect函数返回值的函数每次date改变时都会被执行');
                clearInterval(timer);
            }
        },[date])
        return date;
    }
    let date = useDate();
    // console.log('函数组件的函数体每次在state数据改变时都会执行');
   
    const [name,setName] = useState('Jack');
    const [name2,setName2] = useState('Mary');
    const newobj = {name:name2};
    return (
        <div>
            <h1>每次date变化HooksTest组件都会执行渲染：{date}</h1>
            <h2>{count}</h2>
            <button onClick={()=>{setCount(count+1)}}>++</button><br/>
            <button onClick={()=>{setCount(count-1)}}>--</button>
            <h2>{JSON.stringify(obj)}</h2>
            <button onClick={()=>{setObj({a:Math.random()})}}>改变obj</button><br/>
            <MemoHooksTestSon count={count}/>
            {/*这里使用useCallback防止：因主函数体每次执行都会生成新的setName函数，导致MemoHooksTestChild被重复渲染*/}
            {/*这里使用useCallback一定要加第二个参数， 否则不起作用  第二参数为[]无论如何改变都不会重新赋值setName属性*/}
            {/*比如第二参数为[count]，则在count改变时更新setName属性*/}
            <MemoHooksTestChild name={name} setName={useCallback(()=>{setName('Jack'+Math.random())},[count])}/>
            {/*当obj属性为对象时上面MemoHooksTestChild2还是会被渲染*/}
            {/*此时使用useMemo就可以避免这种现象*/}
            {/*useMemo的第二个参数也是限定检测范围，只有在name2发生改变时才会生效*/}
            <MemoHooksTestChild2 obj={useMemo(()=>newobj,[name2])} setName={useCallback(()=>{setName2('Mary'+Math.random())},[count])}/>
        </div>
    )
}