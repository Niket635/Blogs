import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect } from "react";
import {
  FaBlog,
  FaFileContract,
  FaGraduationCap,
  FaHome,
  FaTags,
  FaUsers,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("admin/login");
    }
  }, []);

  const Logout = (item) => {
    navigate("admin/Login");
    localStorage.removeItem("token");
  };
  return (
    <>
      <div className="flex fixed h-screen w-full z-1 shadow">
        <div className="md:flex flex-col w-64 rounded border ">
          <div className="flex items-center gap-x-2 justify-center h-16   ">
            <img
              src="http://octalinfotech.com/img/octal-logo.png"
              className="h-8 rounded-full"
              alt=""
            />
            <span className="font-bold ">Octal Infotech</span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto bg-white">
            <nav className="flex-1 px-2 py-4 ">
              <NavLink
                to="dashboard"
                className="flex items-center  py-2 text-black m-2 border-b hover:bg-gray-200"
              >
                <FaHome className="fs-4" />
                <span className="px-2"> Dashboard </span>
              </NavLink>      

              <NavLink
                to="categories"
                className="flex items-center px-1 py-2 mt-2 text-black m-2 border-b  hover:bg-gray-200"
              >
                <FaGraduationCap className="fs-4" />
                <span className="px-2">Categories </span>
              </NavLink>

              <NavLink
                to="blogs"
                className="flex items-center px-1 py-2 mt-2 text-black m-2 border-b  hover:bg-gray-200"
              >
                <FaBlog className="fs-4" />
                <span className="px-2">Blogs</span>
              </NavLink>

              <NavLink
                to="users"
                className="flex items-center px-1 py-2 mt-2 text-black m-2 border-b  hover:bg-gray-200"
              >
                <FaUsers className="fs-4" />
                <span className="px-2"> Users</span>
              </NavLink>

              <NavLink
                to="tages"
                className="flex items-center px-1 py-2 mt-2 text-black m-2 border-b  hover:bg-gray-200"
              >
                <FaTags className="fs-4" />
                <span className="px-2"> Tags </span>
              </NavLink>

              <NavLink
                to="Contacts"
                className="flex items-center px-1 py-2 mt-2 text-black m-2 border-b  hover:bg-gray-200"
              >
                <FaFileContract className="fs-4" />
                <span className="px-2"> Contacts </span>
              </NavLink>
            </nav>
          </div>
        </div>

        <div className="flex  flex-col flex-1 overflow-y-auto ">
          <div className="flex items-center justify-between h-16 shadow-xl  bg-white border-b border-gray-200">
            <p></p>
            <div className="flex  pr-4 mt-3">
              <Dropdown>
                <Dropdown.Toggle
                  style={{ border: "none" }}
                  className="bg-transparent  z-50  rounded-full"
                >
                  <button className="flex items-center">
                    <img
                      src="http://octalinfotech.com/img/octal-logo.png"
                      className="h-8 rounded-full border-none"
                      alt="yh"
                    />
                  </button>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#" className="btn" onClick={Logout}>
                    Logout
                  </Dropdown.Item>
                  <Dropdown.Item href="# ">Profile </Dropdown.Item>
                  <Dropdown.Item href="#">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="mt-2 px-4 py-10 sm:px-6 lg:px-8 bg-gray-100 h-full w-full">
            <Outlet />
          </div>
        </div>

        <footer className="fixed w-full bottom-0 flex h[7%] flex-shrink-0 shadow-md bg-slate-50 p-3">
          <div className="flex justify-between w-full items-center flex-wrap px-10">
            <h2 className="">All Rights Reserved © 2023 BLOG</h2>
            <h2>v10.0.0</h2>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Navbar;
