import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const HeroCarousel = () => {
  return (
    <div className="w-full rounded-xl shadow-lg overflow-hidden select-none">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        swipeable={true}
        emulateTouch={true}
        showArrows={false}
        showStatus={false}
        interval={3000}
        showIndicators={false}
        stopOnHover={false}
      >
        <div>
          <img 
            src="/assets/1.jpg" 
            alt="Movie Banner 1" 
            className="h-100 object-cover"
            />
        </div>

        <div>
          <img 
            src="/assets/2.jpg" 
            alt="Movie Banner 2" 
            className="h-100 object-cover"
            />
        </div>

        <div>
          <img 
            src="/assets/3.jpg" 
            alt="Movie Banner 3" 
            className="h-100 object-cover"
            />
        </div>

        <div>
          <img 
            src="/assets/4.jpg" 
            alt="Movie Banner 4" 
            className="h-100 object-cover"
            />
        </div>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
