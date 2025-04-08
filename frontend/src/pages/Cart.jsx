import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import Footer from "./Footer";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="flex flex-col min-h-screen ml-[4%]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow bg-gradient-to-br from-green-50 to-green-100 py-8 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          {cartItems.length > 0 && (
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center text-green-700 mb-6"
            >
              <FaArrowLeft className="mr-2" />
              Continue Shopping
            </motion.button>
          )}

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="text-2xl font-medium text-gray-700 mb-6">
                Your cart is empty
              </div>
              <Link
                to="/shop"
                className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full shadow-md transition-all duration-300"
              >
                Browse Products
              </Link>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Cart Items */}
              <motion.div className="lg:col-span-2 bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 backdrop-blur-sm rounded-xl shadow-md p-4 sm:p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>
                
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      variants={item}
                      layout
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-gray-100"
                    >
                      {/* Product Image */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-full sm:w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <Link 
                          to={`/product/${item._id}`}
                          className="text-lg font-medium text-green-700 hover:text-green-800"
                        >
                          {item.name}
                        </Link>
                        <div className="text-gray-600">{item.brand}</div>
                        <div className="text-lg font-bold text-gray-800 mt-1">
                          LKR{item.price.toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="w-full sm:w-24">
                        <motion.select
                          whileHover={{ scale: 1.03 }}
                          className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
                          value={item.qty}
                          onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </motion.select>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCartHandler(item._id)}
                        className="text-red-500 p-2"
                      >
                        <FaTrash />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Order Summary */}
              <motion.div 
                layout
                className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 rounded-xl shadow-md p-6 h-fit sticky top-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-green-700">
                      ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="text-xl font-bold text-green-700">
                      LKR{cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-md transition-all ${
                    cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Proceed to Checkout
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Cart;