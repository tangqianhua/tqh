//详情页面
import React from "react";
import {Row,Col,BackTop} from "antd";
import PCHeader from "./pc_header.js";
import PCFooter from "./pc_footer.js";
import PCNewsImageBlock from "./pc_news_image_block.js";//导入图片
import CommonComments from "./common_component.js";
export default class PCNewsDetails extends React.Component{
  constructor(...args){
    super(...args);
    this.state={
      newsItem:""
    }
  };
  componentDidMount(){
    var myFetchOptions={method:"GET"};
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({newsItem: json});
			document.title = this.state.newsItem.title + " - React News";
		});
  }
  createMarkup(){//加载HTML的函数
    return {__html:this.state.newsItem.pagecontent}
  }
  render(){
    return (
      <div>
        <PCHeader/>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="container">
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <hr/>
            <CommonComments uniquekey={this.props.params.uniquekey}/>
          </Col>
          <Col span={6}>
          <PCNewsImageBlock count={20} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
            <PCNewsImageBlock count={20} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter/>
        <BackTop/>
      </div>
    )
  }
}
