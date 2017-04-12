//主体页面内容        用来接收所有的新闻信息
import React from "react";//导入react
import {Row,Col } from "antd";//导入antd
import {Tabs,Carousel} from "antd";
import PCNewsBlock from "./pc_news_block.js"//导入新闻内容
import PCNewsImageBlock from "./pc_news_image_block.js";//导入图片
import PCProduct from "./pc_product.js"//导入产品
const TabPane = Tabs.TabPane;//固定写法
//定义一个类  PCNewsContainer
export default class PCNewsContainer extends React.Component{
  render(){
    // 轮播图的参数
    const settings={
      dots:true,//是否显示面板指示点
      autoplay:true,//是否自动播放
      infinite:true,//是否无线播放
      speed:500//轮播速度
    }
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class="container">
          {/*左侧轮播图内容*/}
            <div class="leftContainer">
              <div class="carousel">
                <Carousel {...settings}>
                  <div><img src="./src/images/carousel_1.jpg"/></div>
                  <div><img src="./src/images/carousel_2.jpg"/></div>
                  <div><img src="./src/images/carousel_3.jpg"/></div>
                  <div><img src="./src/images/carousel_4.jpg"/></div>
                </Carousel>
              </div>
              {/*左侧图片展示区域*/}
              <PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"/>
            </div>
            {/*新闻内容内容*/}
            <Tabs class="tabs_news">
              <TabPane tab="头条新闻" key="1">
                <PCNewsBlock count={21} type="top" bordered="false" width="100%"/>
              </TabPane>
              <TabPane tab="国际新闻" key="2">
                <PCNewsBlock count={21} type="guoji" bordered="false" width="100%"/>
              </TabPane>
              <TabPane tab="娱乐新闻" key="3">
                <PCNewsBlock count={21} type="yule" bordered="false" width="100%"/>
              </TabPane>
            </Tabs>
            {/*产品内容*/}
            <Tabs class="tabs_product">
              <TabPane tab="产品介绍" key="1">
                <PCProduct/>
              </TabPane>
            </Tabs>
            <div>
              <PCNewsImageBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
              <PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}
