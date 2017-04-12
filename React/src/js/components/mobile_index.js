import React from "react";
import MobileHeader from "./mobile_header.js";
import MoblieFooter from "./mobile_footer.js"
import { Tabs ,Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import MobileList from "./mobile_list.js"
export default class MobileIndex extends React.Component{
  render(){
    // 轮播图的参数
    const settings={
      dots:true,//是否显示面板指示点
      autoplay:true,//是否自动播放
      infinite:true,//是否无线播放
      speed:500//轮播速度
    }
    return (
      <div>
        <MobileHeader/>
        {/*主体*/}
        <Tabs>
          <TabPane tab="头条" key="1">
            <div class="carousel">
              <Carousel {...settings}>
                <div><img src="./src/images/carousel_1.jpg"/></div>
                <div><img src="./src/images/carousel_2.jpg"/></div>
                <div><img src="./src/images/carousel_3.jpg"/></div>
                <div><img src="./src/images/carousel_4.jpg"/></div>
              </Carousel>
            </div>
            <MobileList count={20} type="top"/>
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileList count={20} type="shehui"/>
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileList count={20} type="guonei"/>
          </TabPane>
          <TabPane tab="国际" key="4">
            <MobileList count={20} type="guoji"/>
          </TabPane>
          <TabPane tab="娱乐" key="5">
            <MobileList count={20} type="yule"/>
          </TabPane>
        </Tabs>
        <MoblieFooter/>
      </div>
    )
  }
}
