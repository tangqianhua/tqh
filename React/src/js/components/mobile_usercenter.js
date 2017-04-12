import React from 'react';
import {Row, Col} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal,
	Card,
	notification
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router';
import MobileHeader from "./mobile_header.js";
import MoblieFooter from "./mobile_footer.js";
export default class MobileUserCenter extends React.Component{
  render(){
    return (
      <div>
        <MobileHeader></MobileHeader>
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="我的收藏" key="1">

              </TabPane>
              <TabPane tab="我的评论" key="2">

              </TabPane>
              <TabPane tab="我的头像" key="3">

              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <MoblieFooter></MoblieFooter>
      </div>
    )
  }
}
