import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: window.innerWidth > 768,
    autoplay: true,
    autoplaySpeed: 3000,
    touchMove: false, // Disable touch move to prevent passive event listener issues
  };

  return (
    <div className="mb-8 w-full bg-[#E5E7EB]">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="product-carousel">
          {products.map((product) => (
            <div key={product._id} className="px-2">
              {/* Image container with fixed aspect ratio */}
              <div className="w-full h-64 md:h-80 lg:h-96 mb-4 overflow-hidden rounded-lg  flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>

              {/* Product details */}
              <div className="text-black px-2">
                <h2 className="text-green-500 text-xl mb-2">{product.name}</h2>
                <p className="text-lg font-semibold mb-3">LKR {product.price}</p>
                <p className="text-gray-600 mb-4">
                  {product.description.substring(0, window.innerWidth > 768 ? 170 : 100)}...
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="flex items-center mb-2 text-sm">
                      <FaStore className="mr-2 text-green-500" /> {product.brand}
                    </p>
                    <p className="flex items-center mb-2 text-sm">
                      <FaClock className="mr-2 text-green-500" /> {moment(product.createdAt).fromNow()}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center mb-2 text-sm">
                      <FaStar className="mr-2 text-green-500" /> {product.numReviews} reviews
                    </p>
                    <p className="flex items-center mb-2 text-sm">
                      <FaBox className="mr-2 text-green-500" /> {product.countInStock} in stock
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;