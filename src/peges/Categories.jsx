
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import Modal from '../component/Modal';
import Swal from 'sweetalert2'
import { FaSearch } from 'react-icons/fa';

const baseURL = "https://blog-api-dev.octalinfotech.com/api/categories";


const Categories = ({ searchParam }) => {

  const [user, setUser] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [Input, setInput] = useState({});
  const [Toggle, setToggel] = useState(true);
  const [imageFile, setimageFile] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);


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

  function Getuser(search="") {
    const token = localStorage.getItem('token')
    axios.get(baseURL + `?search=${search}` , { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        let users = res.data.data.data;
        setUser(users)
      }).catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    Getuser(filteredUsers);
  }, [filteredUsers])

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
    formdata.append("name", Input.name)

    event.preventDefault();
    setInput("");

    const token = localStorage.getItem('token')
    axios.post("https://blog-api-dev.octalinfotech.com/api/categories/store", formdata, { headers: { "Authorization": `Bearer ${token}` } })

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
        axios.delete(`https://blog-api-dev.octalinfotech.com/api/categories/${id}/delete`, { headers: { "Authorization": `Bearer ${token}` } })

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

  const handleShowCategory = (id) => {
    setInput("");
    const token = localStorage.getItem('token')
    axios.get(`https://blog-api-dev.octalinfotech.com/api/categories/${id}/show`, { headers: { "Authorization": `Bearer ${token}` } })

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

  const handleEditCategory = (event, id) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("image", imageFile)
    formdata.append("name", Input.name)

    setInput("");
    const token = localStorage.getItem('token')
    axios.post(`https://blog-api-dev.octalinfotech.com/api/categories/${Input.id}/update`, formdata,
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


  const handleInputChange =(e)=>{
    setFilteredUsers(e.target.value)

  }
  return (
    <>
      <div className='logoText container-fluid'>
          <h1 className='fs-3'>&#128512; Categories</h1>
            <div className=' flex items-center  mt-5 h-12 rounded-lg overflow-hidden  p-3 border' style={{width:193}}>
              <div  style={{color:"gray"}} >
              <FaSearch className=" h-5"/>
              </div>
              <input
                type="text"
                className='px-1 peer h-full outline-none text-sm pr-2 '
                onChange={handleInputChange}
                placeholder='Type to search...'
              />
            </div>

        <div>
          <Fragment>
            <button className=' px-4 p-2 rounded-lg rounded-pil float-end  mb-3 btn bg-black text-white' id="main" onClick={openModal} > &#128194; New Catogories</button>
           
            <Modal isVisible={showModal} onClose={() => setshowModal(false)} id="text">
              <div className='p-4  text-black shadow rounded'>
                <div className='mb-3 border-b'>

                  <h4 className='mb-3'> &#128194; New Catagories </h4>
                </div>
                <form onSubmit={HandleSubmit}>

                  <div>
                    <label htmlFor='Name' >Name:</label>
                    <input type="text" name='name' className='form-control' placeholder='Enter a your name' value={Input?.name || ""}
                      onChange={handleChange} />
                  </div>
                  <br />


                  <div className='col-12 '>
                    <label htmlFor='Image' className='block text-sm font-medium leading-6 text-gray-900 mb-1 after:content-["*"]  '>Image:</label>
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

                  <br />
                  <div className='flex gap-x-9  pt-8 justify-end float-end'>

                    <button className=' px-3 py-2 rounded-lg font-bold btn border me-2 ' onClick={() => setshowModal(false)} >Cancle</button>

                    {
                      Toggle ?
                        <button className=' px-3 py-2 rounded-lg font-bold btn  bg-black text-white' type='submit' >Add</button>
                        : <button className=' px-3 py-2 rounded-lg font-bold btn  bg-black text-white' onClick={handleEditCategory} >Update</button>
                    }
                  </div>
                </form>
              </div>
            </Modal>
          </Fragment>
        </div>

        <table className="table shadow ">
          <thead className='table-main' style={{height:"60px"}}>
            <tr style={{ borderBottom: "3px solid black" }}>
              {/* <th scope="col" className='h1 px-5'>#</th> */}
              <th scope="col" className='px-5'>img</th>
              <th scope="col " className='gap-x'> Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              user?.map((data, index) => (
                <tr key={index}>
                  {/* <th className=''>{index + 1}</th> */}
                  <td className='px-5'><img src={data.image} width={50}  height={50} className='border rounded-full' alt="alert" /></td>
                  <td className=''>{data.name}</td>
       
              
                  
                      <td className=''>
                        <i className="fa fa-edit pr-4 text-green-600 font-bold btn fs-5" onClick={() => handleShowCategory(data.id)} style={{ color: "green" }}></i>
                        <i className="fa fa-trash-o font-bold text-red-600 btn fs-5" onClick={() => DeleteBtn(data.id)} style={{ color: "red" }}></i>
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

export default Categories
