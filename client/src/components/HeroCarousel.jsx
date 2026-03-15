import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import axios from "axios";

const HeroCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/banner/getBanners`,
        );
        setBanners(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="w-full overflow-hidden animate-pulse p-2 select-none">
        <div className="w-full h-40 sm:h-64 md:h-80 lg:h-96 bg-zinc-800 rounded-xl"></div>
      </div>
    );
  }

  if (!banners.length) return null;

  return (
    <div className="w-full px-2 md:px-4 lg:px-4 py-2 rounded-xl shadow-lg overflow-hidden select-none">
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
        {banners.map((banner, idx) => (
          <div key={banner._id}>
            <img
              src={banner.imageUrl}
              alt={`Banner ${idx + 1}`}
              className="w-full h-40 sm:h-64 md:h-100 lg:h-110 object-cover rounded-xl"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel; 