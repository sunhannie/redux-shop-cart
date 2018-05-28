import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, ADD_TO_CART } from '../constants/ActionTypes'

/**
 * 
{...state}输出为：{id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2}
 ADD_TO_CART return输出为：{id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 9}
 */
const products = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      }
    default:
      return state
  }
}
//合并对象，state和获得产品的product赋值给obj
/**
 * RECEIVE_PRODUCTS得出：
 {
   1: {id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2},
   2: {id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10},
   3: {id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5}
 }

 没有最后面 {}会变成：{2: {…}, 3: {…}, id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2}，这是为什么？
 */
const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,  //...state初始化为{}
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product    
          return obj  //action.products是从receiveProducts中获得，也就是从jso中读取到的
        }, {})  //最后面添加一个{}是为了什么？
      }
    default:
      const { productId } = action
      if (productId) {
        return {
          ...state,
          [productId]: products(state[productId], action)
        }
      }
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id)
    default:
      return state
  }
}
// combineReducers 辅助函数的`作用`是，把一个由`多个不同 reducer 函数作为 value 的 object`，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。
// byId和visibleIds返回的都是对象
export default combineReducers({
    byId,
    visibleIds
})
// 一个普通函数
export const getProduct = (state, id) =>
    state.byId[id]

export const getVisibleProducts = state =>
    state.visibleIds.map(id => getProduct(state, id))