import React,{Component} from "react"
import imgHost from  "./config"

export default class My extends Component{
	constructor(){
		super()
	}
	render(){
		return (
				<ul class="goods commonsearch" >
					{
						
							this.props.data.map((item,index)=>{
								item = item.restaurant;
								const hz = item.image_path.endsWith('png')? 'png': 'jpeg';
								const distance = item.distance>1000? (item.distance/1000).toFixed(2)+"km" : item.distance+"m";
								return (
								
									<li class="gooditem" key={index}>
										<img class="thisicon" src={`${imgHost}/${item.image_path}.${hz}`}/>
		           						<div class="message">
		           							<p class="name">{item.name} </p>
		           							<span class="rate">{item.rating}折</span>
		           							<span class="monthsell">月售{item.recent_order_num}单</span>
		           							<div>
		     	    							<span class="cost">配送费￥{parseInt(item.float_delivery_fee)}/</span>
		           								<span class="everyone">{item.average_cost}</span>
		           							</div>									
		           						</div>
										<div class ="description">
											<div class="baozhun">
												<span class="bao">保</span>
												<span class="zhun">准</span>
											</div>
											<span class="ontime">准时达</span>
											<span class="fengniao">蜂鸟专送</span>
											<div class="distance">
												<span>{distance}/</span>
												<span class="costtime">{item.order_lead_time}分钟</span>
											</div>
										</div>          
									</li>
								)
							})
						
					}
				</ul>
		)
	}
}
