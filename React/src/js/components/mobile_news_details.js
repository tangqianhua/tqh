//详情页面
import React from "react";
import {Row,Col,BackTop} from "antd";
import MobileHeader from "./mobile_header.js";
import MoblieFooter from "./mobile_footer.js";
import CommonComments from "./common_component.js"
export default class MobileNewsDetails extends React.Component{
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
      <div className="mobileDetailsContainer">
        <div>
        <MobileHeader/>
          <Row>
            <Col span={24} className="container">
              <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
              <hr/>
              <CommonComments uniquekey={this.props.params.uniquekey}/>
              <hr/>
              <CommonComments uniquekey={this.props.params.uniquekey}/>
            </Col>
          </Row>
          <MoblieFooter/>
          <BackTop/>
        </div>
      </div>
    )
  }
}
