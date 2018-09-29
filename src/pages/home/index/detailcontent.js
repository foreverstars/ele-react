import React,{Component} from "react"
import imgHost from  "jsLib/common/config"

export default class Con extends Component{
	constructor(){
		super()	
	}
	render(){
		if(this.props.data){
			console.log(this.props.data)
			return (
				<div class="detailcontent">
					<ul class="de-con-list">
						<li>商品</li>
						<li>评价</li>
					</ul>
					<div class="detail-good">
						<ul class="detail-good-left">
							{
								this.props.data.map((item,index)=>{
									return <li key={index}><span>{item.name}</span></li>
								})
							}
						</ul>
						<div class="detail-good-right">
							{
								this.props.data.map((item,index)=>{
									return (
										<ul key={index}>
											<p>{item.name} {item.description}</p>
											{
												item.foods.map((item,index)=>{
													const img = item.image_path;
													const En = img.endsWith("jpeg")? ".jpeg" : ".png" ; 
													return (
														<li key={index}>
															<img src={`${imgHost}${img}${En}`}/>
															<div>
																<h3>{item.name}</h3>
																<p>{item.description}</p>
																<span>{item.tips}</span>
																<span>好评率{item.satisfy_rate}%</span>
																<label>￥{item.specfoods[0].price}</label>
															</div>
														
														</li>
													)
												})
											}
										</ul>
									)
								})
							}
						</div>
					</div>
				</div>
			)
		}
		else{
			return false
		}
	}
}
