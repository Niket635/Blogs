import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Alert() {


          useEffect(() => { notify() }, [])
          const notify = () => {
                    toast.error(' There nothing here!', {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                    });
          }

          return (
                    <>
                    {/* <img src="https://toppng.com/uploads/preview/404-error-error-404-transparent-11563210406bsmsusbbzi.png"
                     alt="" width={'100%'} height={"50%"} className='bg-black '/> */}
                              <ToastContainer
                                        position="top-center"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        theme="colored"
                              />

                    </>
          );
}

export default Alert