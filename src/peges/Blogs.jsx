
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import Modal from '../component/Modal';
import Swal from 'sweetalert2'
import { Editor } from "@tinymce/tinymce-react";
import { FaAngellist, FaAngleDown, FaEye, FaSearch } from "react-icons/fa";


const baseURL = "https://blog-api-dev.octalinfotech.com/api/blogs";

const Blogs = ({ searchParam }) => {

  const [user, setUser] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [showModaldata, setshowModaldata] = useState(false);
  const [Input, setInput] = useState({});
  const [Toggle, setToggel] = useState(true);
  const [imageFile, setimageFile] = useState(null);
  const [categories, setCategories] = useState([])
  const [usersData, setUsersData] = useState([])
  const [tagData, setTagData] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [Records, setRecords] = useState('');
  const [categoriesfi, setcategoriesfi] = useState('');
  const [statusfi, setstatusfi] = useState('');

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,      
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get("https://blog-api-dev.octalinfotech.com/api/categories", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        let users = res.data.data.data;
        setCategories(users)

      }).catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get("https://blog-api-dev.octalinfotech.com/api/users", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        let users = res.data.data.data;
        setUsersData(users)

      }).catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get("https://blog-api-dev.octalinfotech.com/api/tages", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        let users = res.data.data.data;
        setTagData(users)

      }).catch((error) => {
        console.log(error);
      })
  }, [])


  function Getuser(search = "", Records = '', categoriesfi = '', statusfi = '') {
    const token = localStorage.getItem('token')
    axios.get(baseURL + `?search=${search}` + `&user_id=${Records}` + `&category_id=${categoriesfi}` + `&status=${statusfi}`, { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        let users = res.data.data.data;
        setUser(users)

      }).catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    Getuser(filteredUsers, Records, categoriesfi, statusfi);
  }, [filteredUsers, Records, categoriesfi, statusfi])

  const openModal = () => {
    setshowModal(true);
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInput(values => ({ ...values, [name]: value }))
  }

  const handleFileUpload = (event) => {
    setimageFile(event.target.files[0])
  }

  // categories Add
  const HandleSubmit = (event) => {

    const formdata = new FormData();
    formdata.append("image", imageFile)
    formdata.append("user_id", Input.user_id)
    formdata.append("title", Input.title)
    formdata.append("category_id", Input.category_id)
    formdata.append("date", Input.date)
    formdata.append("status", Input.status)
    formdata.append("description", Input.description)
    formdata.append("slug", Input.slug)
    formdata.append("tag", Input.tag)
    formdata.append("user_name", Input.user_name)

    event.preventDefault();
    setInput("");

    const token = localStorage.getItem('token')
    axios.post("https://blog-api-dev.octalinfotech.com/api/blogs/store", formdata, { headers: { "Authorization": `Bearer ${token}` } })

      .then((res) => {
        setshowModal(false);
        Toast.fire({
          icon: "success",
          title: res.data.message
        });
        Getuser();
      }).catch((error) => {
        console.log(error);
      })

  }

  //  categories   DeleteBtn
  const DeleteBtn = (id) => {
    setInput("");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        const token = localStorage.getItem('token')
        axios.delete(`https://blog-api-dev.octalinfotech.com/api/blogs/${id}/delete`, { headers: { "Authorization": `Bearer ${token}` } })

          .then((res) => {
            Toast.fire({
              icon: "success",
              title: res.data.message
            });
            Getuser();
          }).catch((error) => {
            console.log(error);
          })
      }
    });
  }

  const handleShowdata = (id) => {
    setInput("");
    const token = localStorage.getItem('token')
    axios.get(`https://blog-api-dev.octalinfotech.com/api/blogs/${id}/show`, { headers: { "Authorization": `Bearer ${token}` } })

      .then((res) => {
        let users = res.data.data;
        setshowModaldata(true);

        setInput(users)
        Getuser();
      }).catch((error) => {
        console.log(error);
      })

    setToggel(false)

  }

  const handleShowBlogs = (id) => {
    setInput("");
    const token = localStorage.getItem('token')
    axios.get(`https://blog-api-dev.octalinfotech.com/api/blogs/${id}/show`, { headers: { "Authorization": `Bearer ${token}` } })

      .then((res) => {
        let users = res.data.data;
        setshowModal(true);
        setInput(users)
        Getuser();
      }).catch((error) => {
        console.log(error);
      })

    setToggel(false)
  }

  const handleEditBlogs = (event, id) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("image", imageFile)
    formdata.append("user_id", Input.user_id)
    formdata.append("title", Input.title)
    formdata.append("category_id", Input.category_id)
    formdata.append("date", Input.date)
    formdata.append("status", Input.status)
    formdata.append("description", Input.description)
    formdata.append("slug", Input.slug)
    formdata.append("tag", Input.tag)
    formdata.append("user_name", Input.user_name)

    setInput("");
    const token = localStorage.getItem('token')
    axios.post(`https://blog-api-dev.octalinfotech.com/api/blogs/${Input.id}/update`, formdata,
      { headers: { "Authorization": `Bearer ${token}` } })

      .then((res) => {
        let users = res.data.data.data;
        console.log(users);
        setshowModal(false);

        setUser(users)
        Getuser();
      }).catch((error) => {
        console.log(error);
      })
    setToggel(true)
  }

  const handleInputChange = (e) => {
    setFilteredUsers(e.target.value)

  }

  const UsernameFilter = (event) => {
    setRecords(event.target.value)
  }

  const Categoriesfilter = (event) => {
    setcategoriesfi(event.target.value)
  }

  const statusfilter = (event) => {
    setstatusfi(event.target.value)
  }

  return (
    <>
      <div className='logoText container-fluid'>
        <h1 className='fs-3'>&#128512; Blogs</h1>
``

        <Modal isVisible={showModaldata} onClose={() => setshowModaldata(false)} id="text" >

          <div className='container row'>

            <div className='col-3'>
              <td className='px-5'><img src={Input?.image || ""} width={'100%'} height={'100%'} className='border rounded' alt="alert" /></td>
            </div>

            <div className='col-8'>
              <table class="table">
                <tbody>

                  <tr>
                    <th scope="row">User Name :</th>
                    <td>{Input?.user_name || ""}</td>
                  </tr>

                  <tr>
                    <th scope="row">Title : </th>
                    <td>{Input?.title || ""}</td>
                  </tr>

                  <tr>
                    <th scope="row">Category : </th>
                    <td colspan="2" className=''>{Input?.category_name || ""}</td>
                  </tr>

                  <tr>
                    <th scope="row">Date : </th>
                    <td colspan="2" className=''>{Input?.date || ""}</td>
                  </tr>

                  <tr>
                    <th>Status : </th>
                    <td colspan="2" className=''>{Input?.status === 1 ? 'Publish' : 'Unpulish'}</td>
                  </tr>

                  <tr>
                    <th>Description : </th>
                    <td colspan="2" className=''>{Input?.description || ""}</td>
                  </tr>

                    {/* <tr>
                      <th>Tag : </th>
                      <td colspan="2" className=''>{Input?.tag || ""}</td>
                    </tr> */}

                </tbody>
              </table>
            </div>

          </div>
        </Modal>

        <div>
          <Fragment>

            <div className=' mt-5 gap-2 flex justify-between' >


              <div className='col-5 flex items-center rounded-lg overflow-hidden border p-2' style={{ width: 193, height: 50 }}>
                <div style={{ color: "gray" }} >
                  <FaSearch/>
                </div>
                <input
                  type="text"
                  className='px-1 peer h-full outline-none text-sm'
                  onChange={handleInputChange}
                  placeholder='Type to search...'
                />
              </div>

              <div className='flex gap-2 items-center'>
                <div className='rounded-lg p-2' style={{ width: 193 }}>

                  <select name="user_id" id="" onChange={UsernameFilter}>
                    <option value="">All Users</option>
                    {usersData.map((item) => (
                      <option value={item.id}>{item.name}</option>

                    ))}
                  </select>
                </div>

                <div className='rounded-lg ' style={{ width: 193 }}>
                  <select name="category_id" id="" onChange={Categoriesfilter}>
                    <option value="">All categories</option>
                    {categories.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className=' rounded-lg ' style={{ width: 193 }}>
                  <select name="category_id" id="" onChange={statusfilter} >
                    <option value={''}>All status   <FaAngleDown className="fs-5" />  </option>
                    <option value={1}>publish</option>
                    <option value={2}>unpublish</option>
                  </select>
                </div>

                <button className=' px-4 p-2 btn bg-black text-white ' id=" " onClick={openModal} > &#128194; New Blogs</button>
              </div>
            </div>

            <Modal isVisible={showModal} onClose={() => setshowModal(false)} id="text"  >

              <div className='text-black shadow rounded-lg bg-white border-slate-400 divide-gray-200 divide-y'>
                <div className='px-4 py-4 sm:p-6'>
                  <h4 className='h3 p-3 '> &#128194; New Blogs</h4>
                  <form onSubmit={HandleSubmit} >
                    <div className='row g-3'>

                      <div className='flex gap-3'>
                        <div class="col-6">
                          <label class="form-label">Title</label>
                          <input type="text" name='title' class="form-control" value={Input?.title || ""} onChange={handleChange} />
                        </div>

                        <div class="col-6">
                          <label class="form-label">Slug</label>
                          <input type="text" name='slug' class="form-control" value={Input?.slug || ""} onChange={handleChange} />
                        </div>
                      </div>


                      <div className='flex gap-3'>
                        <div className="col-6">
                          <label class="form-label">User</label>
                          <select name="user_id" id="" class="form-control m-0" value={Input?.user_id || ""} onChange={handleChange}  >
                            {usersData.map((item) => (
                              <option value={item.id}>{item.name}</option>

                            ))}
                          </select>
                        </div>

                        <div class="col-6">
                          <label   >Tag</label>
                          <select name="tag" id="" class="form-control m-0  form-multi-select" multiple data-coreui-selection-type="tags" data-coreui-search="true" value={Input?.tag || ""} onChange={handleChange}  >
                            {tagData.map((item) => (
                              <option value={item.id}>{item.name}</option>

                            ))}
                          </select>
                        </div>
                      </div>

                      <div className='flex gap-3'>
                        <div class="col-6">
                          <label class="form-label">Category</label>
                          <select name="category_id" id="" class="form-control m-0" value={Input?.category_id || ""} onChange={handleChange}  >
                            {categories.map((item) => (
                              <option value={item.id}>{item.name}</option>
                            ))}
                          </select>
                        </div>

                        <div class="col-6">
                          <label class="form-label">Date</label>
                          <input type="date" name='date' class="form-control" value={Input?.date || ""} onChange={handleChange} />
                        </div>
                      </div>

                      <div className='flex gap-3'>
                        <div className="col-6">
                          <label className="form-label">Status</label>
                          <select name='status' className="form-select m-0" id="validationDefault04" value={Input?.status || ""} onChange={handleChange}>
                            <option value={0}></option>
                            <option value={1}>publish</option>
                            <option value={2}>unpublish</option>
                          </select>
                        </div>

                        <div class="col-6">
                          <input type="text" name='description' class="form-control" value={Input?.description || ""} onChange={handleChange} />
                        </div>
                      </div>

                      <div className='col-6 '>
                        <label htmlFor='Image' className='block text-sm font-medium leading-6 text-gray-900 mb-1 after:content-["*"] '>Image:</label>
                        <div className='p-1 border-2 rounded ' style={{ border: "3px dashed black" }}>

                          <div className='w-full p-1.5 border-2 rounded shadow-md  border-dashed bg-black text-white' tabIndex={0}>
                            <div className='flex items-center justify-center p-2 translate-all ease-in-out duration-300 bg-gray-900 text-gray-900'>
                              <input value={setInput.img} multiple type="file" name='file' autoComplete='off' tabIndex={-1}
                                onChange={handleFileUpload}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <label class="form-label">description</label>
                      <Editor
                        class="form-control"
                        name='description'
                        apiKey="your-api-key"
                        value={Input?.description || ""}
                        onChange={handleChange}

                        initialValue={Input?.description || ""}
                        init={{
                          height: 200,
                          menubar: false,
                          plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                          ],
                          toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                      />


                    </div>

                    <div className=' gap-x-9  pt-8 float-end mt-3 mb-2'>

                      <button className=' px-3 py-2 rounded-lg font-bold btn btn-outline-danger me-2 ' onClick={() => setshowModal(false)} >Cancle</button>
                      {
                        Toggle ?
                          <button className=' px-3 py-2 rounded-lg font-bold btn  bg-black text-white' type='submit' >Add</button>
                          : <button className=' px-3 py-2 rounded-lg font-bold btn bg-black text-white' onClick={handleEditBlogs} >Update</button>
                      }
                    </div>
                  </form>

                </div>
              </div>

            </Modal>
          </Fragment>
        </div>

        <table className="table shadow ">
          <thead className='table-main '>
            <tr className='' style={{ borderBottom: "3px solid black" }}>
              {/* <th scope="col" className='px-5 '>#</th> */}
              <th scope="col" className=' p-3 px-5'>img</th>
              <th scope="col" className=' p-3'> User</th>
              <th scope="col" className=' p-3'>Title</th>
              <th scope="col" className=' p-3'>Catagoriss</th>
              <th scope="col" className=' p-3'>Date</th>
              <th scope="col" className=' text-center p-3'>Status</th>
              <th></th>
              <th scope="col" className=' p-3 px-5'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              user?.map((data, index) => (
                <tr key={index}>
                  {/* <th className='px-5 py-4'>{index + 1}</th> */}
                  <td className='px-5'><img src={data.image} width={50} height={50} className='border rounded-full' alt="alert" /></td>
                  <td className='pt-2'>{data.user_name}</td>
                  <td className='pt-2'>{data.title}</td>
                  <td className='pt-2'>{data.category_name}</td>
                  <td className='pt-2'>{data.date}</td>
                  <td className='pt-2'> <div className={data.status == 1 ? "bg-success rounded-full pills text-center font-bold text-white p-1" : "p-1 bg-danger rounded-full nav-pill text-center font-bold text-white"}>{data.status === 1 ? "publish" : "unpublish"}</div> </td>

                  <td className=''>   </td>

                  <td >
                    {/* <div> */}

                    {/* <FaEye className=" fs-4 " onClick={() => handleShowdata(data.id)} /> */}
                    {/* </div> */}
                    <i class="fa fa-eye  text-green-600 font-bold btn fs-4" onClick={() => handleShowdata(data.id)}></i>
                    <i className="fa fa-edit  text-green-600 font-bold btn fs-4 " onClick={() => handleShowBlogs(data.id)} style={{ color: "green" }}></i>
                    <i className="fa fa-trash-o font-bold text-red-600 btn fs-4" onClick={() => DeleteBtn(data.id)} style={{ color: "red" }}></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Blogs
