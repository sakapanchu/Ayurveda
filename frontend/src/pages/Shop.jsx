import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import Footer from "./Footer";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: { x: -300, opacity: 0, transition: { duration: 0.3 } }
};

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-b from-green-50 to-green-100 min-h-screen transition-all duration-300 ease-in-out ${isMobile ? '' : 'ml-[4%]'}`}
    >
      <div className="container mx-auto px-2 sm:px-4">
        {/* Mobile Filter Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed bottom-4 right-4 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          )}
        </motion.button>

        <div className="flex flex-col md:flex-row pt-4">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(isMobileMenuOpen || !isMobile) && (
              <motion.div 
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`md:block fixed md:static inset-0 md:inset-auto z-40 md:z-0 bg-[#151515]  md:bg-transparent overflow-y-auto md:overflow-visible`}
              >
                <div className="md:hidden flex justify-end p-4">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                
                <motion.div 
                  className="bg-[#151515] bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 backdrop-blur-sm p-3 mt-2 mb-2 md:w-[16rem]"
                  layout
                >
                  <motion.h2 
                    whileHover={{ scale: 1.02 }}
                    className="h4 text-center py-2 bg-black rounded-full mb-2 text-white"
                  >
                    Filter by Categories
                  </motion.h2>

                  <div className="p-3 md:p-5">
                    {categories?.map((c) => (
                      <motion.div 
                        key={c._id} 
                        className="mb-2"
                        variants={itemVariants}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`cat-${c._id}`}
                            onChange={(e) => handleCheck(e.target.checked, c._id)}
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                          />
                          <label
                            htmlFor={`cat-${c._id}`}
                            className="ml-2 text-sm font-medium text-white"
                          >
                            {c.name}
                          </label>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.h2 
                    whileHover={{ scale: 1.02 }}
                    className="h4 text-center py-2 bg-black rounded-full mb-2 text-white"
                  >
                    Filter by Brands
                  </motion.h2>

                  <div className="p-3 md:p-5">
                    {uniqueBrands?.map((brand) => (
                      <motion.div 
                        key={brand} 
                        className="flex items-center mb-3"
                        variants={itemVariants}
                      >
                        <input
                          type="radio"
                          id={`brand-${brand}`}
                          name="brand"
                          onChange={() => handleBrandClick(brand)}
                          className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500"
                        />
                        <label
                          htmlFor={`brand-${brand}`}
                          className="ml-2 text-sm font-medium text-white"
                        >
                          {brand}
                        </label>
                      </motion.div>
                    ))}
                  </div>

                  <motion.h2 
                    whileHover={{ scale: 1.02 }}
                    className="h4 text-center py-2 bg-black rounded-full mb-2 text-white"
                  >
                    Filter by Price
                  </motion.h2>

                  <motion.div 
                    className="p-3 md:p-5"
                    variants={itemVariants}
                  >
                    <input
                      type="text"
                      placeholder="Enter Price"
                      value={priceFilter}
                      onChange={handlePriceChange}
                      className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
                    />
                  </motion.div>

                  <div className="p-3 md:p-5 pt-0">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600 backdrop-blur-sm  text-white py-2 my-2 rounded hover:bg-gray-700 transition-colors"
                      onClick={() => window.location.reload()}
                    >
                      Reset Filters
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <motion.div 
            className="flex-1 p-2 md:p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-xl font-bold text-green-900 text-center mb-4 md:mb-6 mt-10"
              variants={itemVariants}
            >
              Products({products?.length}) 
            </motion.h1>
            {products.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <Loader />
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                layout
              >
                <AnimatePresence>
                  {products?.map((p) => (
                    <motion.div 
                      key={p._id} 
                      className="w-full p-2"
                      variants={itemVariants}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard p={p} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Shop;