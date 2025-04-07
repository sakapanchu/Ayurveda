import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full p-4 mb-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow relative"> {/* Added relative positioning */}
      {/* Image container with relative positioning */}
      <div className="w-full mb-4 relative"> {/* Added relative here */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg object-cover h-48 mx-auto"
        />
        {/* HeartIcon absolutely positioned in top-right corner */}
        <div className="absolute top-1 right-1">
          <HeartIcon product={product} />
        </div>
      </div>

      {/* Details below */}
      <div className="p-2">
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="text-md font-medium text-gray-800 hover:text-green-600 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              ${product.price}
            </span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              {product.countInStock} in stock
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;