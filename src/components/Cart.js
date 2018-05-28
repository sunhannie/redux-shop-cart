import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

// 无状态函数式组件，用纯函数的形式来表达，它做的事情只是根据输入来展示组件，没有其他副作用。没有内部state，不需要组件生命周期函数。 比如// 用一个纯函数表示 const Hobby = (props) => <li>{props.hobby}</li>;
/**
 * 
 * key是新添加的prop
 * 变量用{}，JSX中必须用花括号{}把值包裹
 */
const Cart  = ({ products, total, onCheckoutClicked }) => {
  const hasProducts = (products.length > 0);
  console.log('hasProducts:'+hasProducts);
  const nodes = hasProducts ? (
    products.map(product =>
      <Product
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
      />
    )
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}

export default Cart
