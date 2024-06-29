// import axios from 'axios';
// import Axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import ReactSimplyCarousel from 'react-simply-carousel';
// const baseURL = "https://blog-api-dev.octalinfotech.com/api/categories";

// function ReactSimplyCarouselExample() {
//   const [activeSlideIndex, setActiveSlideIndex] = useState(0);
//   const [user, setUser] = useState([])

//   // const [filteredUsers , setfilteredUsers]= useState([])

//   function Getuser(search = "") {
//     const token = "7ELX2CnkfqWpipzXNB5QV9sxSf4dPk";
//     Axios.get(baseURL + `?search=${search}`, { headers: { "Authorization": `Bearer ${token}` } })
//       .then((res) => {
//         let users = res.data.data.data;
//         setUser(users)

//       }).catch((error) => {
//         console.log(error);
//       })
//   }

//   useEffect(() => {
//     Getuser();
//   }, [])

//   return (
//     <div>
//       <ReactSimplyCarousel
//         activeSlideIndex={activeSlideIndex}
//         onRequestChange={setActiveSlideIndex}
//         itemsToShow={1}
//         itemsToScroll={1}
//         forwardBtnProps={{
//           //here you can also pass className, or any other button element attributes
//           style: {
//             alignSelf: 'center',
//             border: 'none',
//             borderRadius: '50%',
//             color: 'black',
//             cursor: 'pointer',
//             fontSize: '30px',
//             height: 30,
//             lineHeight: 1,
//             textAlign: 'center',
//             width: 30,
//           },
//           children: <span>{`>`}</span>,
//         }}
//         backwardBtnProps={{
//           //here you can also pass className, or any other button element attributes
//           style: {
//             alignSelf: 'center',
//             border: 'none',
//             borderRadius: '50%',
//             color: 'black',
//             cursor: 'pointer',
//             fontSize: '30px',
//             height: 30,
//             lineHeight: 1,
//             textAlign: 'center',
//             width: 30,
//           },
//           children: <span>{`<`}</span>,
//         }}
//         responsiveProps={[
//           {
//             itemsToShow:8,
//             itemsToScroll:1,
//             minWidth: 768,
//           },
//         ]}
//         speed={400}
//         easing="linear"
//       >

//         {
//           user?.map((data, index) => (

//               <Link to={`/Categorishow/${data.id}`}>
//             <div style={{ width: 200, height: 100, }}>

//               <div key={index} className=''>

//                 <div className=' justify-center flex'>
//                   <img src={data.image} className='border-2 rounded-full w-[50px] h-[40px] md:w-[145px] xl:w-[40px] g:w-[145px] md:h-[145px] lg:h-[145px] xl:h-[40px] ' alt="alert" />
//                 </div>

//                 <div className='mt-3 text-base text-center cursor-pointer'>
//                   <h1 className='text-xl dark:text-gray-400 text-black'>
//                     {data.name}
//                   </h1>
//                 </div>

//               </div>

//             </div>
//             </Link>

//           ))
//         }

//       </ReactSimplyCarousel>

//     </div>
//   );
// }

// export default ReactSimplyCarouselExample;

import { useEffect, useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CategoriesSlideShow() {
  let { id } = useParams();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [Catagories, setCatagories] = useState([]);

  useEffect(() => {
    const token = "7ELX2CnkfqWpipzXNB5QV9sxSf4dPk";
    axios
      .get(`https://blog-api-dev.octalinfotech.com/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((response) => {
        const user = response.data.data.data;
        setCatagories(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        <ReactSimplyCarousel
          activeSlideIndex={activeSlideIndex}
          onRequestChange={setActiveSlideIndex}
          itemsToShow={1}
          itemsToScroll={1}
          forwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: {
              alignSelf: "center",
              border: "none",
              borderRadius: "50%",
              color: "black",
              cursor: "pointer",
              fontSize: "30px",
              height: 30,
              lineHeight: 1,
              textAlign: "center",
              width: 30,
              marginBottom: 50,
            },
            children: (
              <span>
                <i class="fa fa-angle-right"></i>
              </span>
            ),
          }}
          backwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: {
              alignSelf: "center",
              border: "none",
              borderRadius: "50%",
              color: "black",
              cursor: "pointer",
              fontSize: "30px",
              height: 30,
              lineHeight: 1,
              textAlign: "center",
              width: 30,
              marginBottom: 50,
            },
            children: (
              <span>
                <i class="fa fa-angle-left "></i>
              </span>
            ),
          }}
          responsiveProps={[
            {
              itemsToShow: 4,
              itemsToScroll: 4,
              minWidth: 768,
            },
          ]}
          speed={400}
          easing="linear"
        >
          {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
          {/* <div style={{ width: 300, height: 300, background: '#ff80ed' }}>
                      slide 0
                  </div> */}

          {Catagories.map((data) => (
            <div style={{ width: 200, height: 200 }}>
              <Link to={`/Categorishow/${data.id}`}>
                <div className="flex flex-col items-center ">
                  <div>
                    <img
                      src={data.image}
                      alt="s"
                      className="h-20 w-20 rounded-full border-2 object-cover border-black   "
                    />
                  </div>
                  <div className=" pt-4 font-bold  ">
                    <h1 className={data.id == id ? "active" : "false"}>
                      {data.name}
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </ReactSimplyCarousel>
      </div>
    </div>
  );
}

export default CategoriesSlideShow;
