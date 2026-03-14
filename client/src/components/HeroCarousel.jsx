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
        <div className="w-full h-96 bg-zinc-800 rounded-xl"></div>
      </div>
    );
  }

  if (!banners.length) return null;

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
        {banners.map((banner, idx) => (
          <div key={banner._id}>
            <img
              src={banner.imageUrl}
              alt={`Banner ${idx + 1}`}
              className="h-100 object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
