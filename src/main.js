//手写轮播提和选项卡逻辑
//按需引入  名字要一样
import { marquee } from './marquee.js'
//默认引入
import tabs from './tabs.js'
//函数调用
marquee()
tabs()

import '../style/index.css'
import '../style/index.less'
//添加图片
//引入src属性
import gifSrc from '../src/assets/1.gif'
const img = document.createElement('img')
img.src = gifSrc
document.body.appendChild(img)

import pngSrc from '../src/assets/logo_small.png'
const img2 = document.createElement('img')
img2.src = pngSrc
document.body.appendChild(img2)

//引入fonts
import './assets/fonts/iconfont.css'

class App {
  static a = 123
}

console.log(App.a)
