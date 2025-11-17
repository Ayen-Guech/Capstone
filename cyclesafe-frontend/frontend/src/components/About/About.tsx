// src/components/About/About.tsx
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // assuming you already have global theme context
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./About.css";
import images100 from "../../assets/images/images100.jpeg";

interface AboutItem {
  name: string;
  review: string[];
}

const data: AboutItem[] = [
  {
    name: "Mission",
    review: [
      "• Expand Access: Ensure women and girls in Kakuma Refugee Camp have access to vital sexual and reproductive health education.",
      "• Empower Refugees: Equip refugee communities with knowledge about their bodies and rights to foster dignity and self-confidence.",
      "• Bridge Gaps: Overcome barriers of displacement by providing safe digital spaces and resources tailored to refugee realities."
    ]
  },
  {
    name: "Vision",
    review: [
      "A future where refugee women and girls are empowered with education, health, and opportunities to shape their own destinies."
    ]
  },
  {
    name: "Values",
    review: [
      "• Refugee-Centered Empowerment: Every refugee deserves access to knowledge that protects health and strengthens futures.",
      "• Equity & Inclusion: No woman or girl should be excluded because of displacement, culture, or circumstance.",
      "• Resilience & Hope: Building sustainable pathways that honor the strength and potential of refugee communities."
    ]
  },
  {
    name: "Our Story",
    review: [
      "CycleSafe began with a vision to close the knowledge gap for women and girls living in Kakuma Refugee Camp.",
      "Displacement often strips people of resources, dignity, and opportunities, especially in reproductive health.",
      "Through a safe digital platform and community-led initiatives, CycleSafe delivers education, support, and empowerment.",
      "Our story is one of resilience, amplifying voices too often unheard and proving that even in displacement, women and girls can thrive with the right tools and knowledge."
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
    <div
      className={`about-section ${theme}`}
      style={{
        
      }}
    >
      <div className="about-container">
        <div className="about-heading">
          <h2>About Us</h2>
          <p><span>Health</span> is at the heart of our work.</p>
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
                    {d.review.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
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
