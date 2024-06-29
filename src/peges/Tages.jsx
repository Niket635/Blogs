import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Modal from "../component/Modal";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import Pagination from "react-js-pagination";
import Users from "./Users";

const baseURL = "https://blog-api-dev.octalinfotech.com/api/tages";
const Tages = () => {
  const [user, setUser] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [Input, setInput] = useState({});
  const [Toggle, setToggel] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const token = localStorage.getItem("token");
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

  function Getuser(search = "", per_page = "", page = "") {
    axios
      .get(baseURL + `?search=${search}&page=${page}&per_page=${per_page}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let users = res.data.data.data;
        setUser(users);
        setCurrentPage(Users.nbPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    Getuser(filteredUsers);
  }, [filteredUsers]);

  const openModal = () => {
    setshowModal(true);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  // tages Add
  const HandleSubmit = (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("name", Input.name );

    setInput({});

    const token = localStorage.getItem("token");
    axios
      .post(
        "https://blog-api-dev.octalinfotech.com/api/tages/store",
        formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      .then((res) => {
        setshowModal(false);
        Toast.fire({
          icon: "success",
          title:res.data.message,
        });
        Getuser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  tages   DeleteBtn
  const DeleteBtn = (id) => {
    setInput("");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        axios
          .delete(
            `https://blog-api-dev.octalinfotech.com/api/tages/${id}/delete`,
            { headers: { Authorization: `Bearer ${token}` } }
          )

          .then((res) => {
            Toast.fire({
              icon: "success",
              title: res.data.message,
            });
            Getuser();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleShowTages = (id) => {
    setInput("");
    const token = localStorage.getItem("token");
    axios
      .get(`https://blog-api-dev.octalinfotech.com/api/tages/${id}/show`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res) => {
        let users = res.data.data;
        setshowModal(true);
        setInput(users);
        Getuser();
      })
      .catch((error) => {
        console.log(error);
      });

    setToggel(false);
  };

  const handleEditTages = (event,id) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("name", Input.name);

    setInput({});
    const token = localStorage.getItem("token");
    axios.post(
        `https://blog-api-dev.octalinfotech.com/api/tages/${Input.id}/update`,formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      .then((res) => {
        let users = res.data.data.data;
        // console.log(users);
        setshowModal(false);
        setUser(users);
        Getuser();
      })
      .catch((error) => {
        console.log(error);
      });
    setToggel(true);
  };

  const handleInputChange = (e) => {
    // setFilteredUsers(user.filter(f => f.name.toLowerCase().includes(e.target.value)))
      setFilteredUsers(e.target.value);
  
  };

  const handlePageChange = (currentPage) => {
    console.log(`active page is ${currentPage}`);
    setCurrentPage(currentPage);
  };

  // console.log(user);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = user?.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="logoText container-fluid">
        <h1 className="fs-5">&#128512; Tages</h1>

        <div>
          <Fragment>
            <button
              className=" px-4 p-2 rounded-lg rounded-pil float-end mt-5 mb-5 btn  bg-black text-white"
              id="main"
              onClick={openModal}
            >
       
              &#128194; New Tages
            </button>

            <div
              className=" flex items-center  mt-5 h-12 rounded-lg overflow-hidden  p-3 border"
              style={{ width: 193 }}
            >
              <div style={{ color: "gray" }}>
                <FaSearch className=" h-5" />
              </div>
              <input
                type="text"
                className="px-1 peer h-full outline-none text-sm pr-2 "
                onChange={handleInputChange}
                placeholder="Type to search..."
              />
            </div>

            <Modal
              isVisible={showModal}
              onClose={() => setshowModal(false)}
              id="text"
            >
              <div className="p-4 m-1 text-black shadow rounded">
                <div className="mb-3 border-b">
                  <h4 className="mb-2"> &#128194; New Tages </h4>
                </div>
                <form onSubmit={HandleSubmit}>
                  <div>
                    <label htmlFor="Name">Name:</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter a your name"
                      value={Input?.name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <br />

                  <div className="flex gap-x-9  pt-8 justify-end float-end">
                    <button
                      className=" px-3 py-2 rounded-lg font-bold btn borde me-2 "
                      onClick={() => setshowModal(false)}
                    >
                      Cancle
                    </button>

                    {Toggle ? (
                      <button
                        className=" px-3 py-2 rounded-lg font-bold btn bg-black text-white"
                        type="submit"
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        className=" px-3 py-2 rounded-lg font-bold btn  bg-black text-white"
                        onClick={handleEditTages}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </Modal>
          </Fragment>
        </div>

        <table className="table shadow ">
          <thead className="table-main ">
            <tr className="" style={{ borderBottom: "3px solid black" }}>
              <th className="gap-x p-3 px-5">Teg Name</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((data, index) => (
              <tr key={index}>
                <td className=" px-5">{data.name}</td>
                <div>
                  <div>
                    <td className="">
                      <i
                        className="fa fa-edit pr-4 text-green-600 font-bold btn fs-5"
                        onClick={() => handleShowTages(data.id)}
                        style={{ color: "green" }}
                      ></i>
                    </td>
                    <td className="">
                      <i
                        className="fa fa-trash-o font-bold text-red-600 btn fs-5"
                        onClick={() => DeleteBtn(data.id)}
                        style={{ color: "red" }}
                      ></i>
                    </td>
                  </div>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-background">
          <Pagination
            activePage={user}
            itemsCountPerPage={postsPerPage}
            totalItemsCount={user?.length}
            pageRangeDisplayed={user?.length / postsPerPage}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    </>
  );
};

export default Tages;
