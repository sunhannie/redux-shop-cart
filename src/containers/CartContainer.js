import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

//时刻需要区分store(保存数据的地方) action(如果是函数返回对象) reducer(函数) dispatch（传入action或reducer）

/**
 * 
 * export default Cart ，所以import Cart from '../components/Cart'，不用{}
 * Cart函数有{ products, total, onCheckoutClicked }参数，此参数可以作为prop吗？
 * CartContainer传值到Cart，Cart传值到Product
 */

const CartContainer = ({ products, total, checkout }) => (
  <Cart
    products={products}
    total={total}
    onCheckoutClicked={() => checkout(products)} />
)

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired
}

/**
 * mapStateToProps `负责输入逻辑`，即将state映射到 UI 组件的参数（props）；
 * products和total对应props的属性名
 * 调用getCartProducts和getTotal函数获取值，这函数从reducers中来
 * mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
 */
const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

/**
 *  如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。
  如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出。
   dispatch传入对象
 * { checkout }好像不是mapDispatchToProps，见笔记connect.md写相关属性
 * 结合https://github.com/sunhannie/react-redux-test/blob/master/index.js  { checkout }是mapDispatchToProps，应该是写法不一样，onCheckoutClicked={() => checkout(products)}写在组件中
 */

export default connect(
  mapStateToProps,
  { checkout }
)(CartContainer)

/**
 * 练习箭头函数区域：
 * 如果不是返回值，箭头后面是{};
 * 如果是返回值，1.如果返回值是对象需要用()包含返回值 2. 如果返回值不是对象，可以不用()
 */
/**
 * 

function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });

 */