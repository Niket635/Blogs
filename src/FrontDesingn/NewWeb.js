import React from "react";
import Footer from "./Footer";
import { NavLink, Outlet } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ReactSimplyCarouselExample from "./Carousel";
import BlogAll from "./BlogAll";

import CarouselFadeExample from "./cero";

export default function NewBlog() {
  return (
    <>
      <div className="bg-white text-black">
        <nav class=" bg-light  py-3 shadow-xl  shadow-blue-200 ">
          <div className="flex justify-between container">
            <div className="items-center flex">
              <h1 className="font-bold text-blue-600 h4 ">Octal Infotech</h1>
            </div>

            <div>
              <div className="flex gap-x-5">
                <div className="gap-5 flex items-center ">
                  <NavLink className="font-bold  text-gray-500">Home</NavLink>

                  <NavLink className="font-bold  text-gray-500">Blogs</NavLink>

                  <NavLink to="/contect" className="font-bold  text-gray-500">
                    Contact Us
                  </NavLink>
                </div>

                <div
                  className=" flex items-center  h-12 rounded-lg overflow-hidden  p-3 border"
                  style={{ width: 193, color: "gray" }}
                >
                  <div>
                    <FaSearch className=" h-5" />
                  </div>
                  <input
                    type="text"
                    className="px-1 h-full outline-none  pr-2 "
                    placeholder="Type to search..."
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="mt-2  h-full w-full">
        <Outlet />
      </div>

      <div className="mt-5">
        <ReactSimplyCarouselExample></ReactSimplyCarouselExample>
      </div>

      <div>
        <BlogAll></BlogAll>
      </div>
      <div className="mt-5">
        <CarouselFadeExample></CarouselFadeExample>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
}
