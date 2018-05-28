import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

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

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})



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