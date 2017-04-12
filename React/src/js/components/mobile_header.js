import React from "react";
import ReactDOM from "react-dom";
import {Row,Col} from "antd";
import {Router, Route, Link, browserHistory} from 'react-router';
import { Menu, Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class MobileHeader extends React.Component{
  constructor(...args){
    super(...args)
    this.state={
      current:"top",//导航条的选中
      modalVisible:false,//是否显示模态框
      action:"login",//按钮用用来登入还是注册
      hasLogined:false,//是否登录
      userNickName:"",//用户名
      userId:0,//用户ID
    }
  }
  handleClick(e){//导航条点击函数
    //如果点击的目标的key为register
    if(e.key=="register"){
      this.setState({current:"register"})//让导航被选中
      this.setState({modalVisible:true})//模态框显示出来
    }else{
      this.setState({current:e.key})
    }
  }
  setModalVisible(value){//模态框是否显示(隐藏)
    this.setState({modalVisible:value});
  }
  handleSunmit(e){//提交数据
    e.preventDefault()//阻止时间的冒泡
    var myFetchOptions={method:"GET"};
    var formData=this.props.form.getFieldsValue();//获得表单的value
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions).then(response => response.json())
		.then((json,data) => {
      this.setState({userNickName: json.NickUserName, userid: json.UserId});
		});
    if (this.state.action=="login") {//如果发送的是登录请求
			this.setState({hasLogined:true});//让页面变成个人中心页面
		}
    message.success("请求成功");
    this.setModalVisible(false)//关闭模态框
  };
  //登录注册的Tabs切换
  callback(key){
    if(key==1){
      this.setState({action:"login"})
    }else if(key==2){
      this.setState({action:"register"})
    }
  }
  login(){
    this.setState({modalVisible:true})
  };
  //登录注册的Tabs切换
  callback(key){
    if(key==1){
      this.setState({action:"login"})
    }else{
      this.setState({action:"register"})
    }
  }
  render(){
    let {getFieldProps} = this.props.form
    //判断用户有没有登入
    const userShow=this.state.hasLogined?<Link><Icon type="inbox"/></Link>:<Icon type="setting" onClick={this.login.bind(this)}/>
    return (
      <div id="mobileHeader">
        <header>
          <img src="./src/images/logo.png" alt="logo"/>
          <span>News</span>
          {userShow}
        </header>
        {/*模态框       标题                是否显示                               模态框的位置(居中)*/}
        <Modal title="用户中心" visible={this.state.modalVisible} wrapClassName="vertical-center-modal" onOk={()=>{this.setModalVisible(false)}} onCancel={()=>{this.setModalVisible(false)}} okText="关闭">
          <Tabs type="card" onChange={this.callback.bind(this)}>

            <TabPane tab="登录" key="1">
              <Form horizontal onSubmit={this.handleSunmit.bind(this)}>
                <FormItem label="账户">
                  <Input placeholder="请输入你的账号" {...getFieldProps ("userName")} />
                </FormItem>
                <FormItem label="密码">
                  <Input type="password" placeholder="请输入你的密码" {...getFieldProps ("password")} />
                </FormItem>
                <Button type="primary" htmlType="submit">登入</Button>
              </Form>
            </TabPane>

            <TabPane tab="注册" key="2">
              <Form horizontal onSubmit={this.handleSunmit.bind(this)}>
                <FormItem label="账户">
                  <Input placeholder="请输入你的账号" {...getFieldProps("r_userName")} />
                </FormItem>
                <FormItem label="密码">
                  <Input type="password" placeholder="请输入你的密码" {...getFieldProps("r_password")} />
                </FormItem>
                <FormItem label="确定密码">
                  <Input type="password" placeholder="请再次输入你的确认密码" {...getFieldProps("r_confirmPassword")} />
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal >
      </div>
    )
  }
}
//将PCHeader导出      ant design的写法
export default MobileHeader=Form.create()(MobileHeader);
