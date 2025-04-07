import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <motion.div 
      className="w-64 bg-[#1A1A1A] rounded-lg shadow-md overflow-hidden bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 backdrop-blur-sm"
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.section 
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Link to={`/product/${p._id}`}>
          <motion.span 
            className="absolute bottom-2 right-2 bg-pink-100 text-pink-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300"
            whileHover={{ scale: 1.1 }}
          >
            {p?.brand}
          </motion.span>
          <motion.img
            className="w-full h-40 object-cover"
            src={p.image}
            alt={p.name}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        <div className="absolute top-2 right-2">
          <HeartIcon product={p} />
        </div>
      </motion.section>

      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-start mb-2">
          <motion.h5 
            className="text-sm font-semibold text-white dark:text-white line-clamp-1"
            whileHover={{ color: "#f472b6" }}
          >
            {p?.name}
          </motion.h5>
          <motion.p 
            className="text-sm font-semibold text-pink-500"
            whileHover={{ scale: 1.1 }}
          >
            ${p?.price?.toFixed(2)}
          </motion.p>
        </div>

        <motion.p 
          className="text-xs text-[#CFCFCF] mb-3 line-clamp-2"
          whileHover={{ color: "#ffffff" }}
        >
          {p?.description}
        </motion.p>

        <motion.section 
          className="flex justify-between items-center"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/product/${p._id}`}
              className="text-xs px-3 py-1.5 bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600 text-white rounded hover:bg-pink-800 transition-colors"
            >
              Read More
              <svg
                className="w-3 h-3 inline ml-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </motion.div>

          <motion.button
            className="p-1.5 rounded-full hover:bg-gray-700 transition-colors"
            onClick={() => addToCartHandler(p, 1)}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <AiOutlineShoppingCart size={18} />
          </motion.button>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;