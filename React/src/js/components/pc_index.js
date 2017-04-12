import React from "react";
import PCHeader from "./pc_header.js";
import PCFooter from "./pc_footer.js";
import PCNewsContainer from "./pc_newscontainer.js"
export default class PCIndex extends React.Component{
  render(){
    return (
      <div>
      {/*头部*/}
        <PCHeader/>
        {/*主体*/}
        <PCNewsContainer/>
        {/*尾部*/}
        <PCFooter/>
      </div>
    )
  }
}
