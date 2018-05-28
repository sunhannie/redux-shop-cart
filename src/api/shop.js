import _products from './products.json'
const TIMEOUT = 100
export default {
    getProducts: (cb,timeout) => setTimeout(() => {
        // console.log('timeout'+timeout);
        return cb(_products),timeout || TIMEOUT
    }),
    buyProducts: (payload, cb, timeout) => setTimeout(() => {
        // console.log('payload'+payload);
        //  console.log('cb:'+cb);
        return (cb(), timeout || TIMEOUT)
    })
}

/**
 * getProducts中的cb:
   function (products) {
       dispatch(receiveProducts(products));
   }
   timeout:undefined
 */


//   buyProducts中的cb:function () {
//         dispatch({
//             type: __WEBPACK_IMPORTED_MODULE_1__constants_ActionTypes__["d" /* CHECKOUT_SUCCESS */],
//             cart: cart
//         });
//     }


//payload输出为：[{id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 9, quantity: 1}] 
// 点击checkout会触发buyProducts


// 箭头函数还原
// function (cb,timeout){
//    return setTimeout(function(){
//         cb(_products)
//     },timeout||TIMEOUT);
// };
