import React,{Component} from "react"
import imgHost from  "jsLib/common/config"

export default class Head extends Component{
	constructor(){
		super()
	}
	componentWillMount(){
		console.log(this.props.data)
	}
	render(){
		if(this.props.data){
			const img = this.props.data.image_path;
			const En = img.endsWith("jpeg")? ".jpeg" : ".png" ; 
			const color = "#" + this.props.data.activities[0].icon_color;
			return(
				<div class="detailhead">
					<div class="de-back">
						<i>&lt;</i>
					</div>
					<div class="de-des">
						<img src={`${imgHost}/${img}${En}`}/>
						<div class="de-des-mid">
							<h2>{this.props.data.name}</h2>
							<p>
								<span>商家配送 /</span>
								<span>{this.props.data.float_minimum_order_amount}分钟送达 /</span>
								<span>{this.props.data.piecewise_agent_fee.tips}</span>
								<em>&lt;</em>
							</p>
							<p id="promotion_info">公告:{this.props.data.promotion_info}</p>
						</div>
					</div>						
						<div class="de-des-right">
							<i style={{color : color }}>{this.props.data.activities[0].icon_name}</i>
							<span>{this.props.data.activities[0].tips}</span>
							<em>{this.props.data.activities.length}个活动</em>
						</div>
					
				</div>
			)
		}
		else{
			return false
		}
	}
}
