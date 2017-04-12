//用到存放图片
import React from "react";
import {Card} from "antd";
import {Router,Route,Link,browserHistory} from "react-router";
export default class PCNewsImageBlock extends React.Component{
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
    const styleImage = {//设置图片的css
			display: "block",
			width: this.props.imageWidth,
			height: "90px"
		};
		const styeH3 = {//设置H3的样式
			width: this.props.imageWidth,
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis"
		};
    const {news}=this.state;//获得返回的json
    const newsList = news.length
			? news.map((newsItem, index) => (
        <div key={index} class="imageblock">
					<Link to={`details/${newsItem.uniquekey}`} target="_blank">
						<div class="custom-image">
							<img alt="" style={styleImage} src={newsItem.thumbnail_pic_s}/>
						</div>
						<div class="custom-card">
							<h3 style={styeH3}>{newsItem.title}</h3>
							<p>{newsItem.author_name}</p>
						</div>
					</Link>
				</div>
			)):"没有任何信息"

    return(
      <div class="topNewsList">
        <Card title={this.props.cartTitle} style={{width:this.props.width}}>
        {/*加载图片*/}
          {newsList}
        </Card>
      </div>
    )
  };
}
