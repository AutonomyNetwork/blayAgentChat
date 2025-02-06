import { useRef } from "react";

const HorizontalSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 200; // Scroll distance when Next/Prev button is clicked

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="slider-container">
      {/* Left Scroll Button */}
      <button onClick={scrollLeft} className="scroll-btn prev-btn">
        &#8249;
      </button>

      {/* Scrollable List */}
      <div ref={sliderRef} className="slider">
        <ul>
          <li className="slider-item">Buy money</li>
          <li className="slider-item">Sell money</li>
          <li className="slider-item">Account balance</li>
          <li className="slider-item">Label for money</li>
          <li className="slider-item">Update</li>
        </ul>
      </div>

      {/* Right Scroll Button */}
      <button onClick={scrollRight} className="scroll-btn next-btn">
        &#8250;
      </button>
    </div>
  );
};

export default HorizontalSlider;
