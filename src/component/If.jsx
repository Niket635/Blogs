import React from "react";
import "./style.css";

let curDate = new Date().getHours();
let text = "";
const cssStayle = {};

if (curDate >= 1 && curDate < 12) {
  text = "Good Mornig ";

  cssStayle.color = "green";
} else if (curDate >= 12 && curDate < 17) {
  text = "Afternoon";
  
  cssStayle.color = "Orange";
} else {
  text = " Good Night";

  cssStayle.color = "Black";
}
function Condishan() {
  return (
    <div className="mt-2  mx-2 shadow rounded p-2">
      <span className="fs-5 d-flex span10">
        <img
          src="/img/149071.png"
          className="me-3"
          alt=""
          style={{ height: "50px", borderRadius: "20px" }}
        />
          <h2><span style={cssStayle}> {text}</span>, Niket Dabhi</h2>
      </span>
    
    </div>
  );
}

export default Condishan;
