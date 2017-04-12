import React from "react";
import ReactDOM from "react-dom";
import {Row,Col} from "antd";
import {Router, Route, Link, browserHistory} from 'react-router';
import { Menu, Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class PCHeader extends React.Component{
  constructor(...args){
    super(...args)
    this.state={
      current:"top",//导航条的选中
      modalVisible:false,//是否显示模态框
      action:"login",//按钮用用来登入还是注册
      hasLogined:false,//如果为true就显示登录页面，如果为false，就显示登录跟注册页面
      userNickName:"",//用户名
      userId:0,//用户ID
    }
  };
  //页面刚要加载的时候，判断用户是否已经登录
  componentWillMount(){
    console.log(localStorage["userId"],localStorage["userNickName"])
    if(localStorage["userId"]!=""){//如果用户id不为空(说明用户已经登录)
      this.setState({hasLogined:true})//就显示个人中心的按钮
      this.setState({userNickName:localStorage["userNickName"]})//显示登录的用户名
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
      //将用户的id跟名字存储在localStorage里面
      localStorage["userId"]=json.UserId;
      localStorage["userNickName"]=json.NickUserName;

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
  //退出登录的函数
  logout(){
    //将用户id跟名字设置为 空
    localStorage["userId"]="";
    localStorage["userNickName"]="";
    //改变hasLogined为false ，这样就回显示登录跟注册的按钮
    this.setState({hasLogined:false})
  }
  render(){
    let {getFieldProps} = this.props.form;
    const userShow =this.state.hasLogined
			? <Menu.Item key="logout" class="register">
					<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
					&nbsp;&nbsp;
					<Link target="_blank" to={`/usercenter`} class="myCenter">
						<Button type="dashed" htmlType="button">个人中心</Button>
					</Link>
					&nbsp;&nbsp;
					<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
				</Menu.Item>
			: <Menu.Item key="register" class="register">
				<Icon type="appstore"/>注册/登录
			</Menu.Item>;
    return(
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" class="logo">
              <img src='./src/images/logo.png' alt="logo"/>
              <span>News</span>
            </a>
          </Col>
          <Col span={16}>
            {/*导航条*/}
            <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
              <Menu.Item key="top">
                <Icon type="appstore" />头条
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore" />社会
              </Menu.Item>
              <Menu.Item key="guonei">
                <Icon type="appstore" />国内
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore" />国际
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="appstore" />娱乐
              </Menu.Item>
              <Menu.Item key="tiyu">
                <Icon type="appstore" />体育
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore" />科技
              </Menu.Item>
              <Menu.Item key="shishang">
                <Icon type="appstore" />时尚
              </Menu.Item>
              {userShow}
            </Menu>
            {/*模态框       标题                是否显示                               模态框的位置(居中)*/}
            <Modal title="用户中心" visible={this.state.modalVisible} wrapClassName="vertical-center-modal" onOk={()=>{this.setModalVisible(false)}} onCancel={()=>{this.setModalVisible(false)}} okText="关闭">
              <Tabs type="card" onChange={this.callback.bind(this)}>

                <TabPane tab="登录" key="1">
                  <Form horizontal onSubmit={this.handleSunmit.bind(this)}>
                    <FormItem label="账户">
                      <Input placeholder="用户名为:汤乾华" {...getFieldProps ("userName")} />
                    </FormItem>
                    <FormItem label="密码">
                      <Input type="password" placeholder="密码为:11" {...getFieldProps ("password")} />
                    </FormItem>
                    <Button type="primary" htmlType="submit">登入</Button>
                  </Form>
                </TabPane>

                <TabPane tab="注册" key="2">
                  <Form horizontal onSubmit={this.handleSunmit.bind(this)}>
                    <FormItem label="账户">
                      <Input placeholder="请输入你的账号" {...getFieldProps ("r_userName")} />
                    </FormItem>
                    <FormItem label="密码">
                      <Input type="password" placeholder="请输入你的密码" {...getFieldProps ("r_password")} />
                    </FormItem>
                    <FormItem label="确定密码">
                      <Input type="password" placeholder="请再次输入你的确认密码" {...getFieldProps("r_confirmPassword")} />
                    </FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal >
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    )
  };
}
//将PCHeader导出      ant design的写法
export default PCHeader=Form.create()(PCHeader);
