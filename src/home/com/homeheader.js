import React,{Component} from "react"
import imgHost from  "jsLib/common/config"
import {Link} from "react-router-dom"

export default class My extends Component{
	constructor(){
		super()
	}
	render(){
		let wrappWidth = 0;
		const lis = this.props.hotwordsData.map((item, index)=>{
			wrappWidth += item.word.length * 12 + 20;
			return <li key={index}>{item.word}</li>
		});	
		return (
			<div class="home-head">
				<div class="info">
					<Link to="/home/address" >
						<em class="iconfont"></em>
						<span class="geo">{this.props.locationData.address}</span>
						<span class="arrow"></span>
					</Link>
					
					<div class="weather">
						<div>
							<p>{this.props.weatherData.temperature}°</p>
							<span>{this.props.weatherData.description}</span>
						</div>
						<img src={`${imgHost}/${this.props.weatherData.image_hash}.png`}/>
					</div>
				</div>
				<Link to="/home/search" >
					<input class="search" type="text" placeholder="搜索商家、商品"/>
				</Link>
				<div class="hotwords">
					<ul class="wrap" style={{
						width: wrappWidth+'px'
					}}>
							{
								this.props.hotwordsData.map((item,index)=>{
									return (
										<Link key={index} to={{
											pathname : "/home/hotsearch",
											state : {
												word : item.word		
											}
										}}>
											<li>{item.word}</li>
										</Link>
									)
								})
							}
					</ul>
				</div>
			</div>
		)
	}
	hotclick(word){
		
	}
}

