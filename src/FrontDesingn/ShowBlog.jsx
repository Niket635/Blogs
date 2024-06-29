import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

function ShowBlog() {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const token = "7ELX2CnkfqWpipzXNB5QV9sxSf4dPk";
    Axios.get(`https://blog-api-dev.octalinfotech.com/api/blogs/${id}/show`, {
      headers: { Authorization: `Bearer ${token}` },
    })

      .then((res) => {
        let users = res.data.data;
        setUser(users);
        console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container  mx-w-6x1 p-6 mx-auto  md:space-y-6 space-y-16 text-black bg-gray-400">
      {/* <div className="flex justify-end items-center">
        <Link to={"/"}>
          <div className="inline-flex text-sm bg-[#271f1f]   items-center font-semibold w-16 *:p-2">
            <span>Back</span>
          </div>
        </Link>
      </div>
      */}
      <div className="container">
        <h2 className=" h2 text-4x1 font-bold">{user.category_name}</h2>

        <p className="flex items-center gap-3">
          By
          <img
            src={user.image}
            alt=""
            className="h-8  w-8 flex-shrink-0 rounded-full object-cover"
          />
          admin on
          <span className="text-sm text-gray-400 cursor-pointer">
            {user.date}
          </span>
        </p>

        <div className="flex gap-2 border-b-[1px] py-5 flex-wrap">
          <div className="gap-2 flex items-center px-8 text-white btn text-sm py-1 bg-black">
            <FaFacebookF /> SHERE
          </div>
          <div className="gap-2 flex items-center px-8 text-white btn text-sm py-1 bg-black">
            <FaTwitter /> SHERE
          </div>
        </div>

        <div className="row ">

          <div className="col-7">
            <p >{user.description}</p>
          </div>

          <div className="col-6" style={{width:"30%"}}>
            <img
              src={user.image}
              alt=""
              className=" rounded  dark:bg-gray-500"
              width={"100%"}
              height={"40%"}
            />
          </div>
        </div>

        <div className="flex items-center  gap-4 border-b py-4">
          <img
            src={user.user_image}
            alt=""
            className=" rounded-full object-cover mt-1 "
            width={"74px"}
            height={"74px"}
          />

          <div className="flex flex-col gap-1">
            <span className="text-lg font-medium cursor-pointer">
              {user.user_name}
            </span>
            <span className="text-sm dark:text-gray-400">{user.title} </span>
          </div>
        </div>
        <h2 className="font-bold text-2x1 pb-2"> RELATED POSTS</h2>

        <div className="flex gap-2 pb-4">
          <div className="mt-5 justify-center flex">
            <div className=" grid grid-cols-1 lg:grid-clos-3 gap-12 md:grid-cols-2  ">
              <div className="main mt-5 hover:text-white font-medium text-base ">
                <div>
                  <div>
                    <img
                      src={user.image}
                      alt=""
                      className=" items-center flex justify-center "
                      width={"330px"}
                      height={"230px"}
                    />
                  </div>
                </div>

                <div className="text-base text-center cursor-pointer mt-2 justify-center">
                  <h1 className="flex justify-content-around"></h1>

                  <div className="text-md text-gray-900  font-bold px-3 py-2 break-words w-full">
                    {user.category_name}
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <div>
                      <img
                        src={user.user_image}
                        alt=""
                        className="h-8  w-8  rounded-full "
                      />
                    </div>

                    <div className="flex gap-3">
                      <span className="text-xs text-gray-900 flex">
                        {user.user_name}
                      </span>
                      <span className="text-xs text-gray-900 date">
                        {user.date}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs dark:text-gray-400">
                    {user.title}
                  </span>
                </div>
              </div>
            </div>

            {/* <div className=" grid grid-cols-1 lg:grid-clos-3 gap-12 md:grid-cols-2  ">
              <div className="main mt-5 hover:text-white font-medium text-base ">
                <div>
                  <div>
     
                    <img
                      src={user.image}
                      alt=""
                      className="object-contain items-center flex justify-center "
                      width={"330px"}
                      height={"230px"}
                    />
                  </div>
                </div>

                <div className="text-base text-center cursor-pointer mt-2 justify-center">
                  <h1 className="flex justify-content-around"></h1>

                  <div className="text-md text-gray-900  font-bold px-3 py-2 break-words w-full">
                    {user.category_name}
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <div>
                      <img
                        src={user.user_image}
                        alt=""
                        className="h-8  w-8  rounded-full "
                      />
                    </div>

                    <div className="flex gap-3">
                      <span className="text-xs text-gray-900 flex">
                      
                        {user.user_name}
                      </span>
                      <span className="text-xs text-gray-900 date">
                     
                        {user.date}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs dark:text-gray-400">
                    {user.title}
                  </span>
                </div>


              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBlog;
