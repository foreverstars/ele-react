import React,{Component} from "react"

import "whatwg-fetch"
import {Route} from "react-router-dom"

import Homeheader from "../com/homeheader.js"
import Homebanner from "../com/homebanner.js"
import Homelist from "../com/homelist.js"

import Api from "jsLib/common/api.js"
import "jsLib/style/home.css"

import Homeaddress from "./homeaddress.js"
import Homesearch from "./homesearch.js"
import Hotsearch from "./hotsearch.js"
import Detail from "./detail.js"
export default class This extends Component{
	constructor(){
		super()
		this.state = {
			locationData : {},
			weatherData :  {},
			hotwordsData :  [],
			bannerData : [],
			listData : [],
			offset : 0,
			limit : 20,
			l : 0,
			t: 0
		}
	}
	componentWillMount(){
		// 获取地理位置的经纬度
		let geo;
			geo = this.props.geoLocation;
			if( geo == undefined){
				geo = this.props.location.state.geoLocation;
			}
			let {latitude :t ,longitude: l } = geo ;
			this.setState({l : l ,t :t });
			localStorage.latitude =t ;
			localStorage.longitude =l ;
			//ajax请求地址信息
			fetch(`${Api.geoApi}?latitude=${t}&longitude=${l}`)
			.then((response)=>{
				return response.json()
			}).then((jsondata)=>{
				this.setState({ locationData : jsondata })
			})
			//ajax请求获取天气数据
	 		fetch(`${Api.weatherApi}?longitude=${l}&latitude=${t}`)
			.then((response)=>{
				return response.json()
			}).then((jsondata)=>{
				this.setState({ weatherData　:　jsondata})
			})
			
			fetch(`${Api.hotwordsApi}?longitude=${l}&latitude=${t}`)
			.then((response)=>{
				return response.json()
			}).then((jsondata)=>{
				this.setState({ hotwordsData　:　jsondata})
			})
			
			fetch(`${Api.bannerApi}?longitude=${l}&latitude=${t}&templates[]=main_template`)
			.then((response)=>{
				return response.json()
			}).then((jsondata)=>{
				this.setState({ bannerData　:　jsondata[0].entries})
			})
			
			fetch(`${Api.listApi}?longitude=${l}&latitude=${t}&offset=${this.state.offset}&limit=${this.state.limit}`)
			.then((response)=>{
				return response.json()
			}).then((jsondata)=>{
				this.setState({ listData　:　jsondata})
			})
	}
	componentDidMount(){
		const homeEle = this.refs.home;
		const homeScroll = new IScroll(homeEle, {
			probeType: 3
		});
		this.setState({homeScroll: homeScroll});
		let that = this;
		homeScroll.on('scrollEnd', function(){
			let y = this.y;
			let maxY = homeScroll.maxScrollY;
			let disY = maxY - y;
			
			if(disY>=0){
				setTimeout(function(){
					that.setState({offset : (that.state.offset+that.state.limit)})
					fetch(`${Api.listApi}?longitude=${that.state.l}&latitude=${that.state.t}&offset=${that.state.offset}&limit=${that.state.limit}`)
					.then((response)=>{
						return response.json()
					}).then((jsondata)=>{
						let data = (that.state.listData).concat(jsondata);
						that.setState({ listData　:　data });
					})
					colseLoadMore();				
				},2000)
			}
			else if(disY<0 && disY>-50){
				myScroll.scrollTo(0, maxY+50, 300);
			}
	})
	function colseLoadMore(){
		homeScroll.scrollTo(0, homeScroll.maxScrollY+50, 300);
	}
	
	
	
	}
	render(){
		return (
			<div>
				<div className="content" ref="home">
					<div class="home-scroll">
						<Homeheader {...{
							locationData : this.state.locationData,
							weatherData : this.state.weatherData,
							hotwordsData : this.state.hotwordsData
						}}/>
						<Homebanner data={this.state.bannerData}/>
						<Homelist data={this.state.listData} refresh={this.refresh.bind(this)}/>
						<div class="foot">
							<img src="static/ajax-loader.gif" />
							<span>加载更多...</span>
						</div>
					</div>
				</div>
				
				<Route path="/home/address" component={Homeaddress}/>
				
				<Route path="/home/search" component={Homesearch} />
				
				<Route path="/home/hotsearch" component={Hotsearch}/>
				
				<Route path="/home/detail/:id" component={Detail}/>
			</div>
		)
	}
	refresh(){
		let that = this;
		if(this.state.homeScroll){
			this.state.homeScroll.refresh();
		}
	}
}
		