// // 异步代码
//   import('./b').then(function(b) {
//     console.log(b)
//   })

// import('../css/base.css') // 打包成3.css
// import('../css/www.scss')// 打包成4.css
// import { a } from '../utils/func'
// console.log(a())
  // import('lodash').then(function(_) {
  //   console.log(_.join(['1', '2'])) // 业务代码打包成use-lodash
  // })

  // main-bundle.js
// document.addEventListener('click', function() {
//   const element = document.createElement('div')
//   element.innerHTML = 'Hello World'
//   document.body.appendChild(element)
// })


// import { chunk } from 'lodash-es'
// console.log(chunk([1, 2, 3], 2))
import('../css/base.css')

// 给 app 标签再加一个 div 并且类名为 box
var app = document.getElementById('app')
var div = document.createElement('div')
div.className = 'box'
app.appendChild(div)





