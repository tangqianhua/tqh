import React from "react";
import ReactDOM from "react-dom";
import {Row,Col} from "antd";
export default class PCFooter extends React.Component{
  render(){
    return(
      <footer>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class="footer">
            &copy;&nbps;2017 TQH. All Rights Reserved.
          </Col>
          <Col span={2}></Col>
        </Row>
      </footer>
    )
  }
}
