import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./About.css";

interface AboutItem {
  name: string;
  review: string[];
}

const data: AboutItem[] = [
  {
    name: "Mission",
    review: [
      "CycleSafe’s mission is to ensure that women and girls in Kakuma Refugee Camp can access essential sexual and reproductive health education. We empower refugee communities with knowledge about their bodies and rights, building confidence, dignity, and informed decision-making. Our mission bridges barriers caused by displacement by providing safe digital spaces and tailored resources that reflect the realities of refugee life."
    ]
  },
  {
    name: "Vision",
    review: [
      "We envision a world where every refugee woman and girl has equal access to education, health, and opportunities, and is empowered to lead, make choices, and shape her own future with dignity and confidence."
    ]
  },
  {
    name: "Values",
    review: [
      "Refugee-Centered Empowerment: Every refugee deserves access to knowledge that protects health and strengthens futures.",
      "Equity & Inclusion: No woman or girl should be excluded because of displacement, culture, or circumstance.",
      "Resilience & Hope: Building sustainable pathways that honor the strength and potential of refugee communities."
    ]
  },
  {
    name: "Our Story",
    review: [
      "CycleSafe was founded with a clear purpose: to close the knowledge gap faced by women and girls in Kakuma Refugee Camp. Displacement often limits access to resources and reproductive health information, leaving many without the support they need to stay healthy and safe. Through our digital platform and community-led initiatives, CycleSafe provides knowledge, encouragement, and empowerment. Our journey reflects resilience and hope, amplifying voices that are too often unheard and showing that with the right tools, women and girls can thrive even in displacement."
    ]
  }
];

const About: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className={`about-section ${theme}`} lang="en">
      <div className="about-container">
        <div className="about-heading">
          <h2>About Us</h2>
          <p>
            <span>Health</span> is at the heart of our work.
          </p>
          <p>
            We are committed to empowering refugee women and girls with essential
            <span> health education</span>, resources, and opportunities to thrive.
          </p>
          <p>
            Our mission, vision, and values guide us in building a future where
            <span> health</span>, dignity, and equality are within reach for everyone.
          </p>
        </div>

        <div className="about-slider">
          <Slider {...settings}>
            {data.map((d) => (
              <div key={d.name}>
                <div className="about-card">
                  <div className="about-card-top">
                    <p>{d.name}</p>
                  </div>
                  <div className="about-card-body">
                    {d.name === "Mission" ||
                    d.name === "Our Story" ||
                    d.name === "Vision" ? (
                      <p className="about-text">{d.review[0]}</p>
                    ) : (
                      <ul className="about-list">
                        {d.review.map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default About;
