import React,{Component} from "react"
import imgHost from  "jsLib/common/config"
import ReactSwipe from "react-swipe"

export default class My extends Component{
	constructor(){
		super()
	}
	render(){
		let arr =this.props.data.map((item)=>{
			return item 
		})
		let newarr = [];
		while(arr.length>0){
			newarr.push(arr.splice(0,8))
		}

		return (
		<ReactSwipe key={newarr.length} className="banner" swipeOptions={{continuous: true}}>
			{
				newarr.map((item,index)=>{
					return (
						<ul class="banner_list" key={index}>
					{
						item.map((item,index)=>{
							return (
								<li class="banner_item" key={index}>
								  	<img src={`${imgHost}/${item.image_hash}.jpeg`}/>
										  	<span>{item.name}</span>
										</li>
									)
								})
							}
						</ul>
					)
				})
			}
		</ReactSwipe>
			
		)
	}
}
