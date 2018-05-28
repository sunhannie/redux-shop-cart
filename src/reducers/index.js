import { combineReducers } from 'redux'
import cart, * as fromCart from './cart'
import products, * as fromProducts from './products'

export default combineReducers({
  cart,
  products
})
// getAddedIds -- id    getQuantity -- inventory数量  getProduct -- 得到的是对象
const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

// 购物车中价格总和    //getAddedIds(state)得到数组
export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)  

// 获取被添加到购物车中的产品   //getAddedIds(state)得到数组
// export const getCartProducts = state => {
//     // console.log(getAddedIds(state));
//     getAddedIds(state).map(id => ({
//         ...getProduct(state, id),   //产品对象
//         quantity: getQuantity(state, id)   //数量
//     }))
// }

// 不能加大括号是为什么？
export const getCartProducts = state =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }))


/**
 * export const getProduct = (state, id) => state.byId[id]
 * byId返回如下对象 
 * return {
                ...state,
                ...action.products.reduce((obj, product) => {
                    obj[product.id] = product
                    return obj
                }, {})
            }
 */