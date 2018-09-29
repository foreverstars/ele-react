import React,{Component} from "react"
import "whatwg-fetch"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Route} from "react-router-dom"
import Searchgood from "./searchgood.js"

export default class My extends Component{
	constructor(){
		super()	
		this.state = {
			keyword : "",
			hotword :[],
			historyword:[]
		}
	}
	componentWillMount(){
		if(localStorage.historyword){
			let data = localStorage.historyword;
			let arr = JSON.parse(data);
			this.setState({historyword :arr});
		}
		fetch(`https://mainsite-restapi.ele.me/shopping/v3/hot_search_words?geohash=ws0bwqypes71&latitude=${localStorage.latitude}&longitude=${localStorage.longitude}&search_item_type=2&extra[]=activities`)
		.then((response)=>{
			return response.json()
		}).then((jsondata)=>{
			this.setState({ hotword　:　jsondata})
		})
		
		
	}
	componentDidMount(){
		addEventListener("keypress",(event)=>{
			if(event.keyCode == "13"){
				let value = this.refs.int.value;
				if(value != ""){
					let arr = [];
					let Is = false;
					if(localStorage.historyword){
						let data = localStorage.historyword;
						arr = JSON.parse(data);
						arr.map((item)=>{
							if(item == value){
								Is = true;
							}
						})
						if(!Is){
							arr.push(value);
						}
					}
					else{
						arr.push(value);
					}
					localStorage.historyword = JSON.stringify(arr);
					this.setState({keyword : value },()=>{
						this.props.history.push("/home/search/good")
					})
				}
			}
		})
	}
	render(){
		return (
			<ReactCSSTransitionGroup transitionName={{
				appear: 'slideInRight',
				appearActive: 'slideInRight'
			}} transitionAppear={true} transitionAppearTimeout={500}
			transitionEnter={false} transitionLeave={false}>
				<div id="homesearch">
					<div class="search-head">
						<span onClick={this.goBack.bind(this)}>&lt;</span>
						<input id="focusinput" type="text" ref="int" placeholder="请输入商品名称" />
					</div>
					{
						function(){
							if(this.state.historyword.length != 0){
								return (
									<div>
										<p class="titlesearch">历史记录</p>
										<ul class="hot-search">
											{
												this.state.historyword.map((item,index)=>{
													return <li onClick={this.hotwordclick.bind(this,item)} key={index}>{item}</li>
												})
											}
										</ul>
									</div>
								)
							}
						}.bind(this)()
					}
					
					<p class="titlesearch">热门搜索</p>
					<ul class="hot-search">
						{
							this.state.hotword.map((item,index)=>{
								return <li onClick={this.hotwordclick.bind(this,item.search_word)} key={index}>{item.search_word}</li>
							})
						}
					</ul>
					
					<Route path="/home/search/good" render={()=>{
			 			return <Searchgood keyword={this.state.keyword} reload={this.reload.bind(this)}/> 
					}}/>
				</div>
			</ReactCSSTransitionGroup>
		)
	}
	goBack(){
		const addressEle = document.querySelector('#homesearch');
		addressEle.className = 'slideOutRight';
		setTimeout(()=>{
			this.props.history.goBack();
		}, 500);		
	}
	hotwordclick(word){
		let arr = [];
		if(localStorage.historyword){
			let data = localStorage.historyword;
			let Is = false;
			arr = JSON.parse(data);
			arr.map((item)=>{
				if(item == word){
					Is = true;
				}
			})
			if(!Is){
				arr.push(word);
			}
		}
		else{
			arr.push(word);
		}
		localStorage.historyword = JSON.stringify(arr);
		this.setState({keyword : word })
		this.props.history.push("/home/search/good")
	}
	reload(){
		let data = localStorage.historyword ; 
		this.setState({historyword : JSON.parse(data)})
	}
}

