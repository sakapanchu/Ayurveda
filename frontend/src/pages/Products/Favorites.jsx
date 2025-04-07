import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import Footer from "../Footer";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen transition-all duration-300 ease-in-out md:ml-[4%]">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-green-800 mb-8 text-center"
        >
          Your Favorite Products
        </motion.h1>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="text-green-600 text-xl mb-6">Your favorites list is empty</div>
            <Link 
              to="/shop" 
              className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {favorites.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;