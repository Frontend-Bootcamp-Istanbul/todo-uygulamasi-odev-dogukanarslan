import React from "react";

class PredefinedDays extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="buttons">
        <button className="button" onClick={()=>this.props.verimliGun()}>Verimli Gün</button>
        <button className="button" onClick={()=>this.props.tembelGun()}>Tembel Gün</button>
      </div>
    )
  }
}

export default PredefinedDays
