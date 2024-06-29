import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Condishan from "../component/If";
import axios from "axios";
import { motion } from "framer-motion";

const baseURL = "https://blog-api-dev.octalinfotech.com/api/";

const Dashboard = () => {

  const { id } = useParams();

  const [mydata, setMydata] = useState([]);
  let token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(baseURL + "dashboard", {
      'headers': {
        'Authorization': 'Bearer ' + token
      }
    }).then((res) => {
      // console.log(res.data.data);
      setMydata(res.data.data)

    }).catch((error) => {
      console.log(error);
    })

  }, []);

  return (
    <>
      <div className="" filter={{ id }} >
        <Condishan />
        <div className=" flex mt-5 flex-wrap gap-5">

      
            <motion.div initial={{ opacity: 0.6 }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.1 }}
              whileInView={{ opacity: 1 }} className="flex mt-2 rounded d-cetegori">
              <h1 className="fs-4 " >Categories <span className=" text-dark ">{mydata.category} </span></h1>
            </motion.div>

            <motion.div initial={{ opacity: 0.6 }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }} div className="fs-4 mt-2 rounded d-cetegori" style={{ borderBottom: " 8px solid #3b3ba7", backgroundColor: "#d0e6f7", color: "blue" }}>
              <h1>Blogs <span className=" text-dark m-3">{mydata.blog} </span></h1>
            </motion.div>
       
            <motion.div initial={{ opacity: 0.6 }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }} className="fs-4 mt-2 rounded d-cetegori" style={{ borderBottom: " 8px solid green", backgroundColor: "rgb(208, 247, 210)", color: "green" }} >
              <h1>Users <span className=" text-dark m-3">{mydata.user} </span></h1>
            </motion.div>

            <motion.div initial={{ opacity: 0.6 }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }} className="fs-4 mt-2 rounded d-cetegori" style={{ borderBottom: " 8px solid #a73b3b", backgroundColor: "#f7d0d0", color: "red" }}>
              <h1>Tags <span className=" text-dark m-3">{mydata.tag} </span></h1>
            </motion.div>
       
        </div>

      </div>
      {/* <motion.div 
          className="box bg-black"
          initial={{ opacity: 0.6 }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 1 },
          }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1 }}
          
      /> */}


    </>
  );
};

export default Dashboard;
