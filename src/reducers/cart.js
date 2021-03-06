import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
     //此处state为[]
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      
      return [ ...state, action.productId ]  //当点击产品1时为[1]
    default:
      return state
  }
}
// action是对象，productId应该是一个键值对，但是state中这么引用可以吗？
/**
 * 当点击第一个产品action为：{type: "ADD_TO_CART", productId: 1}
 * { productId }为{productId: 1}   //这是es6对象扩展的写法,直接写变量,这时，属性名为变量名, 属性值为变量的值。
 * productId为1
  return值为：{2: 1, 3: 2}
 */
const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds
// action.cart从哪里来？
const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart