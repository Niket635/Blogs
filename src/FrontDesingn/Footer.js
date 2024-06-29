
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, } from "react-icons/fa";

const baseURL = "https://blog-api-dev.octalinfotech.com/api/categories/count";

export default function Footer() {

  const [user, setUser] = useState([])

  function Getuser() {
    const token = localStorage.getItem('token')
    axios.get(baseURL , { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        let users = res.data.data.data;
        setUser(users)
      }).catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    Getuser();
  }, [])

  return (

    <>
      <div className="bg-gray-800 mt-10 row justify-center">

        <div className="text-white flex gap-16 justify-center col-3">

          <div className="">
            <div className="text-center mt-10 flex gap-3">
              <div>
                <img src="https://blog-dev.octalinfotech.com/img/octal_infotech-logo_480.f7cd037c.png" alt="" className="w-[7rem] h-[4rem] rounded-xl object-cover" />
              </div>
              <div>
                <h3 className="text-3xl">Octal Infotech</h3>
              </div>
            </div>


          </div>
        </div>


        <div className="grid  gap-8 sm:grid-cols-2  lg:grid-cols-4  mt-10 col-4">

        <div className="">
              <ul className=" space-y-4 text-sm">
                <li>
                  <a to="#" className=" font-medium text-white text-xl" > Company  </a>
                </li>
                <li>
                  <a to="#" className="  text-white  transition hover:opacity-75" > About  </a>
                </li>
                <li>
                  <a to="#" className="  text-white  transition hover:opacity-75" > Meet the  Team </a>
                </li>
                <li>
                  <a to="#" className="  text-white  transition hover:opacity-75" > Acoounts Reviee  </a>
                </li>
              </ul>
            </div>



          <div>
            <p className="font-medium text-xl text-white">Connect</p>
            <ul className="mt-6 space-y-4 text-sm">

              <li>
                <a href="https://www.facebook.com/octalinfotech8" target="_blank" className=" text-white  transition hover:opacity-75 flex" >
                  <FaFacebook className="text-white fs-6 mt-0.5" />
                  <span className="px-2"> Facebook</span>
                </a>
              </li>

              <li>
                <a href="https://www.instagram.com/octal_infotech/" target="_blank" className=" text-white  transition hover:opacity-75 flex" >
                  <FaInstagram className="text-white fs-6 mt-0.5" />
                  <span className="px-2"> Instagram</span>
                </a>
              </li>


              <li>
                <a href="https://twitter.com/octal_infotech" target="_blank" className=" text-white  transition hover:opacity-75 flex" >
                  <FaTwitter className="text-white fs-6 mt-0.5" />
                  <span className="px-2"> Twitter</span>
                </a>

              </li>


              <li>
                <a href="https://github.com/infoanil/octal" target="_blank" className=" text-white  transition hover:opacity-75 flex" >
                  <FaGithub className="text-white fs-6 mt-0.5" />
                  <span className="px-2"> GitHub</span>
                </a>
              </li>

              <li>
                <a href="https://www.linkedin.com/company/octal-infotech/" target="_blank" className=" text-white  transition hover:opacity-75 flex" >
                  <FaLinkedin className="text-white fs-6 mt-0.5" />
                  <span className="px-2"> LinkedIn</span>
                </a>

              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-xl text-white">Categories</p>
            <ul className="mt-6 space-y-4 text-sm">


              {
              user?.map((item, index) => (
                           <li className="flex gap-4" key={index} >
                           <div className="text-white">{item.name}</div>
                           <div className="text-white">({item.blog_count})</div>
                         </li>
              ))
              }
            </ul>
          </div>
        </div>


        <div className="flex mt-2 md:justify-center gap-10 items-center text-sm text-gray-400">

          <p className="order-2 md:order-1 mt-8 md:mt-0 ">© Beautiful Footer, 2021.</p>
          <div className="order-1 md:order-2">
            <span className="px-2"> About us</span>
            <span className="px-2 border-l"> Contact us</span>
            <span className="px-2 border-l">Privacy Policy </span>

          </div>
        </div>
      </div>
    </>
  );
}

