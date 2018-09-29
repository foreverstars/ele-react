// 入口文件
//引入所需的模块    
import React, {Component}  from "react"
import ReactDOM from "react-dom"
import App from "./src/app.js"
import "./src/style/main.css"
//文本结构渲染，整个app分模块将组件分开，集合与App组件上，再进行页面渲染
ReactDOM.render(
	<App />,
	document.getElementById("app")
)
