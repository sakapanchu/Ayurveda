import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="container mx-auto px-4">
      {/* Stack on mobile, side by side on desktop */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Small Products - Full width on mobile, half on desktop */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.slice(0, 4).map((product) => (
              <SmallProduct key={product._id} product={product} />
            ))}
          </div>
        </div>

        {/* Carousel - Full width on mobile, half on desktop */}
        <div className="w-full lg:w-1/2">
          <ProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Header;