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
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen transition-all duration-300 ease-in-out md:ml-[4%]">

      <div className="bg-green-700 text-white px-4 py-2 flex flex-col md:flex-row items-center justify-between text-xs md:text-base font-medium">
        <p className="text-center mb-2 md:mb-0">
          FREE delivery &amp; 40% Discount for next 3 orders! Place your 1st
          order in.
        </p>
        <div className="flex items-center gap-1 md:gap-2 text-white font-semibold">
          <span>Until the end of the sale:</span>
          <span className="ml-2">
            47 <span className="font-normal text-xs md:text-sm">days</span>
          </span>
          <span>
            06 <span className="font-normal text-xs md:text-sm">hours</span>
          </span>
          <span>
            57 <span className="font-normal text-xs md:text-sm">minutes</span>
          </span>
          <span>
            08 <span className="font-normal text-xs md:text-sm">sec.</span>
          </span>
        </div>
      </div>

      {/* Hero Section */}
      {!keyword && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[662px] mx-auto mb-4 sm:mb-6 md:mb-12 overflow-hidden"
        >
          <div className="absolute inset-0"></div>
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="/image/ayurveda-banner.png"
            alt="Ayurvedic Products"
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}

      {/* Post Section */}
      <div className=" rounded-lg p-4 mx-4 md:mx-auto mb-6">
        <img
          src="/image/home-post.png"
          alt="Home Post"
          className="w-full h-auto rounded-md mb-4"
        />
        
      </div>

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
                {keyword ? `Results for "${keyword}"` : "Special Products"}
              </h1>
              {!keyword && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
