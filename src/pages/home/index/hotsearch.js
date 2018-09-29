import React,{Component} from "react"
import Search from "./searchgood.js"
export default class Hot extends Component{
	constructor(){
		super()
		this.state = {
			keyword : ""
		}
	}
	componentWillMount(){
		this.setState({ keyword : this.props.location.state.word})
	}
	render(){
		return (
			<Search keyword={this.state.keyword}/>
		)
	}
}
