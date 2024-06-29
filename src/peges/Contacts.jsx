import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const baseURL = "https://blog-api-dev.octalinfotech.com/api/contact-us/index";

const Contacts = () => {
  const [user, setUser] = useState();


  function Getuser() {
    const token = localStorage.getItem("token");
    axios
      .get(baseURL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let users = res.data.data.data;
        setUser(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    Getuser();
  }, []);

  return (
    <div>
      <table className="table shadow">
        <thead className="table-main">
          <tr className="" style={{ borderBottom: "2px solid black" }}>
            <th scope="col " className="gap-x p-3 px-5">
              Name
            </th>
            <th scope="col" className="p-3 px-5">
              Email
            </th>
            <th scope="col" className="p-3 px-5">
              Message
            </th>
          </tr>
        </thead>
        <tbody>
          {user?.map((data, index) => (
            <tr className="border-b dark:border-neutral-500 ">
              <td className="px-5">{data.name}</td>
              <td className="px-5">{data.email}</td>
              <td className="px-5">{data.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
