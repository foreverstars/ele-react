//引入所需要的模块
import React,{Component} from "react"
import {BrowserRouter as Router,
		Route,
		NavLink
} from  "react-router-dom"

//引入content和tabs模块
import Home from "./pages/home/index/home.js"
import Discovery from "./pages/discovery/index/discovery.js"
import Order from "./pages/order/index/order.js"
import Mine from "./pages/mine/index/mine.js"

import Tabs from "./mytabs.js"

//因为app中数据请求都会用到地理位置中的经纬度，为避免多次请求
//在父组件上进行定位。

//app主结构分为上面content组件和下面tabs组件，
//content分为4个组件由路游管理

export default class App extends Component{
	constructor(){
	  super();
	  this.state = {
	  	listdata :  [
	  		{title : "外卖", path: "/home", com : Home, icon : "icon-eleme"},
	  		{title : "发现", path:"/discovery", com : Discovery, icon : "icon-discover"},
	  		{title : "订单", path:"/order", com : Order, icon : "icon-order"},
	  		{title : "我的", path:"/mine", com : Mine, icon : "icon-me"}
	  	],
	  	geoLocation: {}
	  }
	}
	componentWillMount(){
		navigator.geolocation.getCurrentPosition((location)=>{
			const geo = {latitude: location.coords.latitude,
						longitude: location.coords.longitude}
			this.setState({ geoLocation : geo})
		},()=>{
			const rgeo = {latitude: 22.63,
						longitude: 113.83}
			this.setState({ geoLocation : rgeo})
		})
		// const rgeo = {latitude: 22.63,
		// 				longitude: 113.83}
		// this.setState({ geoLocation : rgeo})
	}
	render(){
		return (
			<Router>
				<div>
					 <Route exact path = "/" render= {()=>{
					 		return <Home geoLocation={this.state.geoLocation}/> 
					 }} />
					 {
					 	this.state.listdata.map((item,index)=>{
					 		return <Route key={index} path={item.path} component={item.com} />
					 	})
					 }
					 <Tabs  geoData={this.state.geoLocation} listdata={this.state.listdata}/>
				</div>
			</Router>
		)
	}
}