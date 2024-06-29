import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import CategoriesSlideShow from "./Carousel";


function ShowCategori() {
  const [user, setUser] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const token = "7ELX2CnkfqWpipzXNB5QV9sxSf4dPk";
    Axios.get(
      `https://blog-api-dev.octalinfotech.com/api/categories/${id}/blogs`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

      .then((res) => {
        let users = res.data.data.data;
        setUser(users);
        console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <div>
        <CategoriesSlideShow></CategoriesSlideShow>
      </div>

      <div>
        <div className="dark:text-gray-100">
          <div className="justify-center flex">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:grid-cols-2 ">
              {user?.map((data, index) => (

                    <Link  to={`/blogshow/${data.id}`}>
                <div className="main mt-5 hover:text-white-500 font-semibold text-base grid-container">
                  <div className="">
                    <img
                      src={data.image}
                      className="w-[330px] h-[230px] object-contain items-center flex justify-center"
                      alt="alert"
                    />
                  </div>
                  <div className="text-base text-center cursor-pointer mt-2 justify-content">
                    <div
                      style={{ maxWidth: "300px" }}
                      className="text-xs text-gray-900 font-semibold px-3 py-2 break-words w-full truncate "
                    >
                 
                    </div>
                    <div className="flex justify-center gap-2 items-center">
                      <div>
                        <img
                          src={data.user_image}
                          alt=""
                          className="w-8 h-8  rounded-full"
                        />
                      </div>
                      <div className="flex gap-3">
                        <span className="text-xs dark:text-gray-400 flex">
                          {data.user_name}
                        </span>
                        <span className="text-xs dark:text-gray-400 flex">
                          {data.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs ">{data.title}</div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{position:'fixed',bottom:'0px',width:'100%'}}>
        <Footer></Footer>
      </div>
    </>
  );
}

export default ShowCategori;
