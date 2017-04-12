//新闻内容
import React from "react";
import {Card} from "antd";
import {Router,Route,Link,browserHistory} from "react-router";
export default class PCNewsBlock extends React.Component{
  constructor(...args){
    super(...args)
    //初始化状态
    this.state={
      news:""
    }
  };
  componentWillMount(){//页面刚要加载的时候
    var myFetchOptions={method:"GET"};
    //传递数据
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
    .then(response=>response.json()).then((json,data)=>this.setState({news:json}))
  }
  render(){
    const {news}=this.state;//获得返回的json
    const newsList = news.length
			? news.map((newsItem, index) => (
				<li key={index}>
					<Link to={`details/${newsItem.uniquekey}`} target="_blank">
						{newsItem.title}
					</Link>
				</li>
			)):"没有任何新闻"

    return(
      <div class="topNewsList">
        <Card>
        {/*加载新闻*/}
          <ul>{newsList}</ul>
        </Card>
      </div>
    )
  };
}
