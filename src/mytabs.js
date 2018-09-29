import React,{Component} from "react"
import {BroswerRouter as Router,
		Route,
		NavLink
}   from "react-router-dom"

export default class Tabs extends Component{
	constructor(){
		super()
	}
	render(){
		return (
			<nav className="tabs">			
				{
					this.props.listdata.map((item,index)=>{
						const Class = "iconfont " + item.icon
						return (
							<NavLink key={index} to={{
								pathname :  item.path,
								state : {
									geoLocation : this.props.geoData		
								}
							}}
							isActive={this.getActive.bind(this,index)}>
									<em className={Class}></em>
									<span>{item.title}</span>
									
							</NavLink>
						)
					})
				}
			</nav>
		)
	}
	getActive(index,match,location){
		if(location.pathname=="/" && index == 0){
			return true
		}
		else if(match){
			return true
		}
		return false
	}
}

