import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

/**
 * prev state:{cart: {…}, products: {…}}
 * action:{type: "RECEIVE_PRODUCTS", products: Array(3)}
   next state:
{
    cart: {
        addedIds:[],
        quantityById:{}
    }
    products:{
        byId:{
            1: {id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2}, 
            2: {id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10}, 
            3: {id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5}
        },
        visibleIds:[1, 2, 3]
    }
}
 */

// 这个应该是action，action中包含type属性
const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

//dispatch后面跟action，这样提供 dispatch(action) 方法更新 state
// 第二步：getAllProducts调用shop.getProducts，获取products.json中数据，触发receiveProducts action，然后调用reducers函数，查询是调用reducers/products.js的byId
/**
  shop.getProducts输出为：
  getProducts(cb, timeout) {
        return setTimeout(function () {
            return cb(__WEBPACK_IMPORTED_MODULE_0__products_json___default.a), timeout || TIMEOUT;
        });
    }
shop.getProduct(这个括号中就是cb，没有timeout属性)
 */
export const getAllProducts = () => dispatch => {
    shop.getProducts(products => {
        dispatch(receiveProducts(products));
    })
}

/**
 * 
 * @param 当点击产品2，productId为2
 */
const addToCartUnsafe = productId => {
    return ({
        type: types.ADD_TO_CART,
        productId
    })
}
/*
 * action 创建函数
 * 1. Redux 中只需把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程。
 * dispatch(addTodo(text))
 * 2. 或者创建一个 被绑定的 action 创建函数 来自动 dispatch：
 * const boundAddTodo = text => dispatch(addTodo(text))
 */

//getState().products.byId[productId].inventory怎么来的？ 此处创建的action创建函数会自动dispatch
/**
 * 当点击add to cart，触发此函数，getState是从byId中types为RECEIVE_PRODUCTS获取到的
 * 
 * getState()输出为：{cart: {…}, products: {…}}
 */
export const addToCart = productId => (dispatch,getState) => {
    // console.log(getState());
    if (getState().products.byId[productId].inventory>0){
        dispatch(addToCartUnsafe(productId))
    }
}

// 此action创建函数dispatch两次，以下定义是被绑定的 action 创建函数并自动 dispatch，比如const boundAddTodo = text => dispatch(addTodo(text))，dispatch括号中是一个对象，下面函数直接填写对象，没有用函数返回对象或者变量代替，所以能理解这种写法
/**
 * 点击购物车的checkout会执行此函数
 * {cart}输出一个对象：{cart:{addedIds: [2,3], quantityById: {2: 2, 3: 1}}}
 * products输出Add to cart的产品数组：
 * [{id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 4, quantity: 1},
{id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 9, quantity: 1}]

通过action的type后面值，执行对应的reducer函数。

dispatch输出为：
dispatch(action) {
    return _dispatch(action);
}

getState是从点击add to cart中传来的
点击checkout，hasProducts为false；点击add to cart，hasProducts为true，由此hasProducts是一直变化的
 */
export const checkout = products => (dispatch,getState) =>{
    const {cart} = getState()
    // console.log(products);
    dispatch({
        type: types.CHECKOUT_REQUEST
    })
    shop.buyProducts(products,() => {
        
        dispatch({
            type: types.CHECKOUT_SUCCESS, //如果失败可以写CHECKOUT_FAILURE
            cart
        })
    })
}


// 有dispatch,state 参数的函数属于reducer 函数，接受旧的的state和action，返回新的state