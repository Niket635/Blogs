import React from 'react'

function Modal({ isVisible, onClose, children }) {

    if (!isVisible) return null;
    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose();
    }
    return (
        <div onClick={handleClose} id="wrapper" className='fixed inset-0  bg-black bg-opacity-25 backdrop-blur[100px] flex justify-center items-center bg'>
            <div className='w-[1000px] flex rounded-lg flex-col '>
                <div className='bg-white p-2 rounded flex  flex-col'>
                    <button className='text-white text-xl rounded-t-2 text-end px-3 py-2'onClick={() => onClose()}><i class="fa fa-times" style={{ fontSize: "30px", color: "black"}}></i>
                    </button>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Modal