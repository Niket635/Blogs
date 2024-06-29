import React from "react";
import { Routes, Route } from "react-router-dom";
import Route1 from "./Index";
import Navbar from "../Navbar/Navbar";
import Login from "../peges/Login";
import Alert from "../component/Alert";
import NewBlog from "../FrontDesingn/NewWeb";
import ShowBlog from "../FrontDesingn/ShowBlog";
import ShowCategori from "../FrontDesingn/ShowCategori";
import Contect from "../FrontDesingn/Contect";

function RoutePage() {
  return (
    <Routes>
      <Route path="admin/Login" element={<Login />} />
      <Route path="/" element={<NewBlog />} />
      
      <Route path="blogshow/:id" element={<ShowBlog />} />
      <Route path="Categorishow/:id" element={<ShowCategori/>} />
      <Route path="/contect" element={<Contect />} />
    
      <Route path="/admin" element={<Navbar />}>
        <Route path="*" element={<Alert />} />
        {Route1.map((route, index) => (
          <Route path={route.path} element={route.componet} key={index} />
        ))}
      </Route>
    </Routes>
  );
}

export default RoutePage;
