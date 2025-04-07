import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import { motion } from "framer-motion";
import Footer from "./Footer";


const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen transition-all duration-300 ease-in-out md:ml-[4%]">
      {/* Hero Section */}
      
      {!keyword && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[60vh] md:h-[70vh] mb-8 md:mb-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-green-700/20 z-10"></div>
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="/image/ayurveda-hero.png"
            alt="Ayurvedic Products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20 text-center px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-50 md:mb-6">
                Pure Ayurvedic Wellness
              </h1>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/shop"
                  className="bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600 text-white py-2 px-6 md:py-3 md:px-8 rounded-full text-lg font-medium transition-all duration-300"
                >
                  Discover Our Products
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {!keyword ? <Header /> : null}
      
      {/* Products Section */}
      <div className="px-2 md:px-4 py-6">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {isError?.data.message || isError.error}
          </Message>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center mb-6"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
                {keyword ? `Results for "${keyword}"` : 'Special Products'}
              </h1>
              {!keyword && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/shop"
                    className="bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300"
                  >
                    View All Products
                  </Link>
                </motion.div>
              )}
            </motion.div>

            {/* Modified Product Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4"
            >
              {data.products.map((product) => (
                <motion.div 
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="w-full"
                >
                  <div className="p-2">
                    <Product product={product} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;