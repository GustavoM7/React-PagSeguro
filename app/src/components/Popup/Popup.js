import React from "react";
import "./Popup.css"

const Popup = (props) =>{
  return(
  <div
    className={props.warning ? "Popup Popup-warning" : "Popup"}
    style={props.visible ? {display: "block"} : {display: "none"}}>
      {props.children}
      {!props.permanent ?
        <span>
          <button onClick={() => props.onClose()}>X</button>
        </span>
        : null
      }
  </div>)
}

export default Popup;