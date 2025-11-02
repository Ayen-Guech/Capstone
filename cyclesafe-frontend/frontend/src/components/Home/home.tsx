// src/components/Home/home.tsx
import React from 'react';
import './home.css';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.png';
import kakumaimage7 from '../../assets/images/kakumaimage7.jpg';
import images9 from '../../assets/images/images9.png';



const Home = () => {
  return (
    <div id='home' className='home-container'>
      <Carousel fade interval={2000} pause={false}>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={image1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>Welcome to CycleSafe</h5>
            <p>
              A safe digital space empowering women and girls in{' '}
              <span className="highlight-kakuma">Kakuma</span> with knowledge, health, and dignity
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={kakumaimage7}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>Empowering  <span className="highlight-kakuma">Kakuma</span> Through Education</h5>
            <p>
              Learn about menstrual health, contraception, and reproductive rights because knowledge is power
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={images9}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5>Together for a Healthier Future</h5>
            <p>
              Advancing women’s empowerment, healthcare, and education for every girl, every cycle
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
