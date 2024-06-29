import React from "react";
// import "./style.css";


function Card(props) {
  return (
    <>
      <div className="Card-mein">
        <div>
          <img src={props.img} alt="myPic" />
          <div>
            <span>{props.titel}</span>
            <h3>{props.hname}</h3>
            <a href={props.link} target="_niket">
              <button> Watch Now</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Card;