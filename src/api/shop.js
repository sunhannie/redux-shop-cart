import _products from './products.json'
const TIMEOUT = 100
export default {
    getProducts: (cb,timeout) => setTimeout(() => cb(_products),timeout || TIMEOUT),
    buyProducts: (payload, cb, timeout) => setTimeout(() => {
        console.log(payload);
        return (cb(), timeout || TIMEOUT)
    })
}

//payload输出为：[{id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 9, quantity: 1}] 


// 箭头函数还原
// function (cb,timeout){
//     setTimeout(function(){
//         cb(_products)
//     },timeout||TIMEOUT);
// };
