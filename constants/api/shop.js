import _products from './products.json'
const TIMEOUT = 100
export default {
    getProducts: (cb,timeout) => setTimeout(() => cb(_products),timeout || TIMEOUT),
    buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}

// 箭头函数还原
// function (cb,timeout){
//     setTimeout(function(){
//         cb(_products)
//     },timeout||TIMEOUT);
// };
