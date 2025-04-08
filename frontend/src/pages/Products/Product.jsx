import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
      }}
      className="w-full px-2 mb-6" // Added padding for better spacing
    >
      <div className="w-full bg-[#1A1A1A] rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 backdrop-blur-sm transition-all duration-300 h-full flex flex-col">
        {/* Image Container with Improved Aspect Ratio */}
        <div className="relative pb-[75%] overflow-hidden"> 
          <Link to={`/product/${product._id}`}>
            <motion.img
              src={product.image}
              alt={product.name}
              className="absolute top-0 left-0 w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <div className="absolute top-3 right-3">
            <HeartIcon product={product} />
          </div>
          {/* Brand Tag */}
          <span className="absolute bottom-3 left-3 bg-pink-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.brand}
          </span>
        </div>

        {/* Product Info */}
        <div className="p-4 flex-grow flex flex-col">
          <Link to={`/product/${product._id}`} className="flex-grow">
            <motion.div 
              whileHover={{ color: "#4ade80" }}
              className="flex justify-between items-start mb-3"
            >
              <h2 className="text-lg font-semibold text-white line-clamp-2">
                {product.name}
              </h2>
              <motion.span 
                whileHover={{ scale: 1.1 }}
                className="bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap ml-2"
              >
                LKR{product.price.toFixed(2)}
              </motion.span>
            </motion.div>
           
          </Link>

          {/* Centered Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-center mt-auto"
          >
            <Link 
              to={`/product/${product._id}`}
              
            >
              
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;