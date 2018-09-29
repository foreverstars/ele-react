import React,{Component} from "react"
import "whatwg-fetch"
import Commonlist from "jsLib/common/commonlist.js"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Api from "jsLib/common/api.js"
import imgHost from  "jsLib/common/config"

export default class My extends Component{
	constructor(){
		super()
		this.state={
			listData : [],
			keyword : "" ,
			categoryData : [],
			categoryItem : [],
			item_name : "分类",
			item_name2:"排序",
			rankData : [
					{name :  "智能排序",order_id: 4, icon : "ico1"},
					{name :  "距离最近",order_id: 5, icon : "ico2"},
					{name :  "销量最高",order_id: 6, icon : "ico3"},
					{name :  "起送价最低",order_id: 1, icon : "ico4"},
					{name :  "配送速度最快",order_id: 2, icon : "ico5"},
					{name :  "评分最高",order_id: 3, icon : "ico6"}	
			],
			order_id : 0,
			selectData : [
					{Isselect : false,firstword: "品",name :  "品牌商家",supid: 8, style : "color1"},
					{Isselect : false,firstword: "新",name :  "新店",supid: 5, style : "color2"},
					{Isselect : false,firstword: "开",name :  "开发票",supid: 4, style : "color3"},
					{Isselect : false,firstword: "在",name :  "在线支付",supid: 3, style : "color4"}
			],
			confirm : "确定"
		}
	}
	componentWillMount(){
		this.setState({keyword : this.props.keyword})
		//请求商品搜索信息
		fetch(`https://mainsite-restapi.ele.me/shopping/v1/restaurants/search?offset=0&limit=20&keyword=${this.props.keyword}&latitude=${localStorage.latitude}&longitude=${localStorage.longitude}&search_item_type=2&extra[]=activities`)
		.then((response)=>{
			return response.json()
		}).then((jsondata)=>{
			this.setState({ listData　:　jsondata[0].restaurant_with_foods})
		})
		
		fetch(`https://mainsite-restapi.ele.me/shopping/v2/restaurant/category?latitude=${localStorage.latitude}&longitude=${localStorage.longitude}`)
		.then((response)=>{
			return response.json()
		}).then((jsondata)=>{
			this.setState({ categoryData　:　jsondata})
		})
	}
	componentDidMount(){
		addEventListener("keypress",(event)=>{
			if(event.keyCode == "13"){
				fetch(`https://mainsite-restapi.ele.me/shopping/v1/restaurants/search?offset=0&limit=20&keyword=${this.state.keyword}&latitude=${localStorage.latitude}&longitude=${localStorage.longitude}&search_item_type=2&extra[]=activities`)
				.then((response)=>{
					return response.json()
				}).then((jsondata)=>{
					this.setState({ listData　:　jsondata[0].restaurant_with_foods})
				})
			
				let Is = false;
				let data = localStorage.historyword;
				let arr = JSON.parse(data);
				arr.map((item)=>{
					if(item == value){
						Is = true;
					}
				})
				if(!Is){
					arr.push(value);
				}
				localStorage.historyword = JSON.stringify(arr);
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
				<div id="search-good">
					<div class="search-head">
						<span onClick={this.goBack.bind(this)}>&lt;</span>
						<input id="seacrh-for" value={this.state.keyword} type="text" ref="in" placeholder="请输入商品名称" onChange={this.handle.bind(this)}/>
					</div>
					<div class="search-list">
						<a class="search-list-item" onClick={this.Click1.bind(this)}>
							<span>{this.state.item_name}</span><em></em>
						</a>
						
						<a class="search-list-item" onClick={this.Click2.bind(this)}>
							<span>{this.state.item_name2}</span><em></em>
						</a>
						<a class="search-list-item" onClick={this.Click3.bind(this)}>
							<span>筛选</span><em></em>
						</a>
					</div>
					<div class="category myanimate">
						<ul class="category-list">
							{
								this.state.categoryData.map((item,index)=>{
									return (
										<li key={index} onClick={this.Click1_first.bind(this,index,item.name)}>
											<span>{item.name}</span>
											<a>{item.count}</a>
										</li>
									)
								})
							}
						</ul>
						
						<ul class="category-item">
							{
								this.state.categoryItem.map((item,index)=>{
									const Imgend = item.image_url.endsWith('png')? 'png': 'jpeg';
									return (
										<li key={index} onClick={this.Click1_last.bind(this,item.id)}>
											<img src={`${imgHost}/${item.image_url}.${Imgend}`}/>
											<span>{item.name}</span>
											<a>{item.count}</a>
										</li>
									)
								})
							}
						</ul>
					</div>
					
					<ul class="rank myanimate1">
						{
							this.state.rankData.map((item,index)=>{
							
								return (
									<li key={index} onClick={this.Clickonly.bind(this,item.order_id,item.name)}>
										<em class={"iconfont "+item.icon}></em>
										<span>{item.name}</span>
									</li>
								)
							})
						}
					</ul>
					
					<div class="filtrate myanimate2">
						<p>配送方式</p>
						<p>商家属性(可多选)</p>
						<ul class="goselect">
							{
								this.state.selectData.map((item,index)=>{
								  return (
								  		<li key={index} onClick={this.confirm.bind(this,index,item.Isselect)}>
								  			<i class={item.style}>{item.firstword}</i>
								  			<span>{item.name}</span>
								  		</li>
								  )
								})
							}
						</ul>
						<a id="empty" onClick={this.doempty.bind(this)}>清空</a>
						<a id="confirm" onClick={this.doconfirm.bind(this)}>{this.state.confirm}</a>
					</div>
					
					
					<div class="filter fadeIn"></div>
					
					
					<Commonlist data={this.state.listData} />
				</div>
				
				
				
			</ReactCSSTransitionGroup>
		)
	}
	handle(){
		let val = this.refs.in.value;
		this.setState({ keyword : val })
	}
	goBack(){
		const addressEle = document.querySelector('#search-good');
		addressEle.className = 'slideOutRight';
		setTimeout(()=>{
			if(this.props.history){
				this.props.history.goBack();
			}
			else{	
				window.history.back();
			}
			if(this.props.reload){
				this.props.reload();
			}
		}, 500);
	}
	Click1(){
		if(document.querySelector(".category").style.display == "block"){
			document.querySelector(".category").style.display = "none";
			document.querySelector(".filter").style.display = "none";
			return false;
		}
		document.querySelector(".category").style.display = "block";
		document.querySelector(".filter").style.display = "block";
		document.querySelector(".rank").style.display = "none";
		document.querySelector(".filtrate").style.display = "none";
	}
	Click1_first(index,name){
		this.setState({item_name : name });
		if(index == 0){
			document.querySelector(".category").style.display = "none";
			document.querySelector(".filter").style.display = "none";
			fetch(`https://mainsite-restapi.ele.me/shopping/v1/restaurants/search?offset=0&limit=20&keyword=${this.props.keyword}&latitude=${localStorage.latitude}&longitude=${localStorage.longitude}&search_item_type=2&extra[]=activities`)
			.then((response)=>{
				return response.json()
			}).then((jsondata)=>{
				this.setState({ listData　:　jsondata[0].restaurant_with_foods})
			})
			return false
		}
		let arr = this.state.categoryData[index].sub_categories;
		this.setState({ categoryItem : arr});
	}
	Click1_last(id){
		this.setState({order_id : id});
		document.querySelector(".category").style.display = "none";
		document.querySelector(".filter").style.display = "none";
		fetch(`https://mainsite-restapi.ele.me/shopping/v1/restaurants/search?offset=0&limit=20&keyword=${this.state.keyword}&latitude=${localStorage.latitude}&longitude=${localStorage.longitude}&search_item_type=2&extra[]=activities&restaurant_category_ids[]=${id}`)
		.then((response)=>{
			return response.json()
		}).then((jsondata)=>{
			if(jsondata[0]){
				this.setState({ listData　:　jsondata[0].restaurant_with_foods})
			}
			else{
				this.setState({ listData : []})
			}
		})
		
	}
	Click2(){
		if(document.querySelector(".rank").style.display == "block"){
			document.querySelector(".rank").style.display = "none";
			document.querySelector(".filter").style.display = "none";
			return false;
		}
		document.querySelector(".filtrate").style.display = "none";
		document.querySelector(".category").style.display = "none";
		document.querySelector(".rank").style.display = "block";
		document.querySelector(".filter").style.display = "block";
		
	}
	Clickonly(id,name){
		document.querySelector(".rank").style.display = "none";
		document.querySelector(".filter").style.display = "none";
		this.setState({item_name2 : name })
		fetch(`https://mainsite-restapi.ele.me/shopping/v1/restaurants/search?offset=0&limit=20&keyword=${this.props.keyword}&latitude=${localStorage.latitude}&longitude=${localStorage.longitude}&search_item_type=2&extra[]=activities&order_by=${id}`)
			.then((response)=>{
				return response.json()
			}).then((jsondata)=>{
				this.setState({ listData　:　jsondata[0].restaurant_with_foods})
			})
	}
	confirm(index,Isselect){
		const oLi = document.querySelectorAll(".goselect li");
		if(!Isselect){
			oLi[index].className = "selectli";
			let arr = this.state.selectData;
			arr[index].Isselect = true;
			this.setState({selectData : arr},this.update);
		}
		else{
			oLi[index].className =  "";
			let arr = this.state.selectData;
			arr[index].Isselect = false;
			this.setState({selectData : arr},this.update);
		}
	}
	update(){
		let arr = this.state.selectData;
		let num = 0;
		arr.map((item)=>{
			if(item.Isselect){
				num++
			}
		})
		if(num==0){
			this.setState({confirm : "确认"})
		}
		else{
			let str = "确认(" + num  + ")";
			console.log(str)
			this.setState({confirm : str})
		}
		return true;
	}
	doempty(){
		let arr = this.state.selectData;
		const oLi = document.querySelectorAll(".goselect li");
		arr.map((item,index)=>{
			if(item.Isselect){
				oLi[index].className = "";
				arr[index].Isselect = false;
			}
		})
		this.setState({selectData : arr},this.update);
	}
	doconfirm(){
		document.querySelector(".filtrate").style.display = "none";
		document.querySelector(".filter").style.display = "none";
		let arr = this.state.selectData;
		let id = "";
		arr.map((item)=>{
			if(item.Isselect){
				id += "&support_ids[]="+item.supid;
			}
		})
		
		if(id != ""){
			let url;
			if(this.state.order_id ==0 ){
				url = id;
			}
			else{
				url = `&order_by=${this.state.order_id}${id}`
			}
			fetch(`https://mainsite-restapi.ele.me/shopping/v1/restaurants/search?offset=0&limit=20&keyword=${this.props.keyword}&latitude=${localStorage.latitude}&longitude=${localStorage.longitude}&search_item_type=2&extra[]=activities${url}`)
				.then((response)=>{
					return response.json()
				}).then((jsondata)=>{
					if(jsondata[0]){
						this.setState({ listData　:　jsondata[0].restaurant_with_foods})
					}
					else{
						this.setState({ listData : []})
					}
			})
		}
	}
	Click3(){
		if(document.querySelector(".filtrate").style.display == "block"){
			document.querySelector(".filtrate").style.display = "none";
			document.querySelector(".filter").style.display = "none";
			return false;
		}
		document.querySelector(".category").style.display = "none";
		document.querySelector(".rank").style.display = "none";
		document.querySelector(".filtrate").style.display = "block";
		document.querySelector(".filter").style.display = "block";
		
	}
}
