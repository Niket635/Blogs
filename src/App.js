import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutePage from "./routers/RoutePage.js";

// import FormData from "./component/FormDemo.jsx"



function App() {
  return (
    <>
     <BrowserRouter>
         <RoutePage/>
     </BrowserRouter>
      {/* <FormData /> */}


  </>
  );
}

export default App;

//   {CardData.map((value)=>(
// < Card 
// img={value.img}
// titel={value.titel}
// hname={value.hname}
// link={value.link}
// />)
// )};