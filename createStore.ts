type reducerType = (state:any,action:object) => void

// 判断传入的参数是否是平面对象
function isPlanObject(obj: any) {

    if (typeof obj !== 'object') {
        return false;
    }

    return Object.getPrototypeOf(obj) === Object.prototype;
}

// 获取指定长度的随机字符串
function getRandomString(targetNumber:number):string{
    return Math.random().toString(36).substring(2,targetNumber);
}





export default function store (reducer: reducerType, defaultState: any) {
 
    const currentReducer = reducer;
    let currentState = defaultState;

    // store里的dispatch函数
    function dispatch(action:object):any{
        //验证action是否是平面对象
        if (!isPlanObject(action)) {
            throw new TypeError("action must be a plain object")
        }
    
        //验证action的type属性是否存在
        if (action.type === undefined) {
            throw new TypeError("action must has a property of type")
        }
    
        // 调用reducer
       currentState =  currentReducer(currentState,action)
    
    }

    // store里的getState函数
    function getState():any{
        return currentState;
    }

    // 创建仓库时调用一次dispatch函数
    dispatch({
        type:`@@redux/init${getRandomString(7)}`,
    })


    return {
        dispatch,
        getState,
    }
}