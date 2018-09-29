import React,{Component} from "react"
import "whatwg-fetch"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

let timer = null;

export default class My extends Component{
	constructor(){
		super()
		this.state={
			listdata : []
		}
	}
	render(){
		return (
			<ReactCSSTransitionGroup transitionName={{
				appear: 'slideInRight',
				appearActive: 'slideInRight'
			}} transitionAppear={true} transitionAppearTimeout={500}
			transitionEnter={false} transitionLeave={false}>
				
				<div id="homeaddress">
					<div class="homeaddress-head">
						<div>
							<span onClick={this.goBack.bind(this)}>&lt;</span>
							<p>选择地址</p>
						</div>
						<input ref="address" type="text" placeholder="请输入地址" onKeyUp={this.sendAddress.bind(this)}/>
					</div>
					<div class="searchinfo">
						<ul>
							{
								this.state.listdata.map((item,index)=>{
									return (
										<li key={index} onClick={this.select.bind(this)}>
											<p>{item.name}</p>
											<p>{item.address}</p>
										</li>
									)
								})
							}
						</ul>
					</div>
				</div>
			
			</ReactCSSTransitionGroup>
		)
	}
	sendAddress(){
		let value = this.refs.address.value;
		clearTimeout(timer);
		timer = setTimeout(()=>{
			fetch(`https://mainsite-restapi.ele.me/bgs/poi/search_poi_nearby?keyword=${value}&offset=0&limit=20`)
			.then((response)=>{
				return response.json()
			}).then((jsondata)=>{

				this.setState({listdata : jsondata })
			})
		},2000)
	}
	goBack(){
		const addressEle = document.querySelector('#homeaddress');
		addressEle.className = 'slideOutRight';
	
		setTimeout(()=>{
			this.props.history.goBack();
		}, 500);		
	}
	select(){
		this.goBack()
	}
}

