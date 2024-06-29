import { FaMoneyBill, FaNewspaper, FaPhoneAlt, FaSpider } from "react-icons/fa";
import Footer from "./Footer";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

export default function Contect() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const [Input, setInput] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const HandleSubmit = (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("name", Input.name);
    formdata.append("email", Input.Email);
    formdata.append("message", Input.message);

    const token = "7ELX2CnkfqWpipzXNB5QV9sxSf4dPk";
    axios
      .post("https://blog-api-dev.octalinfotech.com/api/contact-us", formdata, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res) => {
        Toast.fire({
          icon: "success",
          title: res.data.message,
        });
      })
      .catch((error) => {
        console.log(error);

        Toast.fire({
          icon: "error",
          title: error.data.data.message,
        });
      });
    setInput();
  };

  return (
    <>
      <div className="container my-24 mx-auto md:px-6 p-10">
        <section className="mb-32">
          <div>
            <img
              src="Contact-Us-page-banner-1024x282-1.jpg"
              className="relative h-[300px] w-full bg-cover object-cover bg-[100%] bg-no-repeat"
              style={{ zIndex: "-1" }}
              alt=""
            />
          </div>

          <div className=" container px-6 md:px-12 z-2">
            <div className="block rounded-sm bg-[hsla(0,0%,100%,0.8)] px-6 py-12 h-auto shadow-lg dark:[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:py16 md:px-12 -mt-[100px] backdrop:-blur-[30px]">
              <div className="flex flex-wrap">
                <div className=" md-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                  <form action="" className="">
                    <div className=" sm:col-span-3">
                      <span className="font-medium text-sm mb-1 text-gray-900">
                        Name
                      </span>
                      <input
                        type="text"
                        name="name"
                        className="border-1 border-gray-400 py-1.5 px-3 rounded-md w-full mb-1 mt-1 focus:outline-none focus:bg-gray-100 text-gray-900 shadow-sm sm:text-sm"
                        placeholder="Enter your Name"
                        onChange={handleChange}
                        value={Input?.name || ""}
                      />
                    </div>

                    <div className=" sm:col-span-3">
                      <span className="font-medium text-sm mb-1 text-gray-900">
                        Email
                      </span>
                      <input
                        type="text"
                        name="Email"
                        className="border-1 border-gray-400 py-1.5 px-3 rounded-md w-full mb-1 mt-1 focus:outline-none focus:bg-gray-100 text-gray-900 shadow-sm sm:text-sm"
                        onChange={handleChange}
                        value={Input?.Email || ""}
                        placeholder="Enter your Email"
                      />
                    </div>

                    <div className=" sm:col-span-6">
                      <span className="font-medium text-sm mb-1 text-gray-900">
                        Messenger
                      </span>

                      <div className="mt-2 cursor-pointer">
                        <textarea
                          name="message"
                          onChange={handleChange}
                          value={Input?.message || ""}
                          className="border-1 border-gray-400 px-3 py-1.5 mt-1 w-full block rounded-md  focus:outline-none focus:bg-gray-100"
                          placeholder="Enter your Messenger"
                        ></textarea>
                      </div>
                    </div>

                    <button
                      onClick={HandleSubmit}
                      type="submit"
                      className=" px-3 py-2 items-center inline-flex bg-gray-900 rounded-sm font-medium text-xs text-white
                  hover:gray-700 w-full active:bg-gray-700 mt-3"
                    >
                      Submit
                    </button>
                  </form>
                </div>

                <div className=" w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                  <div className="row">
                    <div className="flex col-6">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-indigo-200 p-3 text-indigo-600">
                            <FaPhoneAlt className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 grow">
                        <p className="mb-2 font-bold dark:text-white">
                          Technical support
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-200">
                          support@example.com
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-200">
                          +1 234-567-89
                        </p>
                      </div>
                    </div>

                    <div className="flex col-6">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-indigo-200 p-3 text-indigo-600">
                            <FaMoneyBill className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 grow">
                        <p className="mb-2 font-bold dark:text-white">
                          Sales questions
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-200">
                          sales@example.com
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-200">
                          +1 234-567-89
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="flex col-6">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-indigo-200 p-3 text-indigo-600">
                            <FaNewspaper className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 grow">
                        <p className="mb-2 font-bold dark:text-white">Press</p>
                        <p className="text-neutral-500 dark:text-neutral-200">
                          Press@example.com
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-200">
                          +1 234-567-89
                        </p>
                      </div>
                    </div>

                    <div className="flex col-6">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-indigo-200 p-3 text-indigo-600">
                            <FaSpider className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 grow">
                        <p className="mb-2 font-bold dark:text-white">
                          Technical support
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-200">
                          support@example.com
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-200">
                          +1 234-567-89
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
}
