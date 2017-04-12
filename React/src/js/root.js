import React from "react";
import ReactDOM from "react-dom";
import { Button } from 'antd';
import PCIndex from "./components/pc_index.js";//导入PC端页面
import MobileIndex from "./components/mobile_index.js"//导入移动端页面
import PCNewsDetails from "./components/pc_news_details.js"//导入PC详情页面
import MobileNewsDetails from "./components/mobile_news_details.js"//导入Mobile详情页面
import PCUserCenter from "./components/pc_usercenter.js"//导入pc端用户中心
import MobileUserCenter from "./components/mobile_usercenter.js";//导入移动端的个人中心
import 'antd/dist/antd.css';
import { Router, Route, hashHistory  } from 'react-router';
import MediaQuery  from "react-responsive";
export default class Root extends React.Component{
  render(){
    return (
      <div>
      {/*当页面大于1224px 显示pc端页面*/}
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            {/*默认载入pc主页面*/}
            <Route path="/" component={PCIndex}></Route>
            {/*载入详情主页面*/}
            <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
            {/*载入个人页面*/}
            <Route path="/usercenter" component={PCUserCenter}></Route>
          </Router>
        </MediaQuery>
        {/*当页面小于1224px 显示Mobile端页面*/}
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={hashHistory}>
            {/*默认载入pc主页面*/}
            <Route path="/" component={MobileIndex}></Route>
            {/*载入详情主页面*/}
            <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
            {/*载入详情主页面*/}
            <Route path="/usercenter" component={MobileUserCenter}></Route>
          </Router>
        </MediaQuery>
      </div>
    )
  }
}
ReactDOM.render(
  <Root/>,//将内容渲染到指定的元素中
  document.getElementById("mainContainer")
)
