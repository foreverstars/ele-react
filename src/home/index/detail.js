import React,{Component} from "react"

import "../../style/detail.css"
import Detailheader from "./detailheader.js"
import Detailcontent from "./detailcontent.js"

export default class Detail extends Component{
	constructor(){
		super()
		this.state = {
			id : 0,
			headerData : null,
			contentData:null
		}
	}
	componentWillMount(){
		let id =  this.props.match.params.id;
		this.setState({ id : id });
		
		//请求头部信息
		fetch(`https://mainsite-restapi.ele.me/shopping/restaurant/${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&latitude=${localStorage.latitude}&longitude=${localStorage.longitude}`)
			.then((response)=>{
				return response.json()
			}).then((jsondata)=>{
			this.setState({ headerData　:　jsondata})
		})
			
		fetch(`https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id=${id}`)
			.then((response)=>{
				return response.json()
			}).then((jsondata)=>{
			this.setState({ contentData　:　jsondata})
		})
	}
	render(){
		return (
			<div id="detail">
				<Detailheader data={this.state.headerData}/>
				<Detailcontent data={this.state.contentData} />
			</div>
		)
	}
}
