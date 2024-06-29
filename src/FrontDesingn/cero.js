import Carousel from 'react-bootstrap/Carousel';
 
function CarouselFadeExample() {
  return (
          <div className='container w-2/3 h-[500px] overflow-hidden shadow'>
                    <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-[100%] h-[100%] "
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/336072064/original/6428f500c92850befd71d58abf50780bff0bc89f/develop-html-css-javascript-web-pages-for-front-end.jpg"
              alt="First slide"
            />
           
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-[100%]  h-[100%]"
              src="https://t3.ftcdn.net/jpg/02/16/03/28/360_F_216032849_rE3hjVYDhZMeO5OxE9bWsH7jYSucG3Ky.jpg  "
              alt="Second slide"
            />
            
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-[100%]  h-[100%]"
              src="https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_640.png"
              alt="Third slide"
            />
             
          </Carousel.Item>
          
          <Carousel.Item>
            <img
              className="d-block w-100  h-[100%]"
              src="https://marketplace-cdn.atlassian.com/files/422562e8-0358-462a-8dca-301eeb611c93?fileType=image&mode=full-fit"
              alt="Third slide"
            />
             
          </Carousel.Item>
        </Carousel>
          </div>
  );
}

export default CarouselFadeExample;