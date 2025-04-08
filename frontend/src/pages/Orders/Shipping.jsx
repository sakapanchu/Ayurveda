import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import Footer from "../Footer";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("CashOnDelivery");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [phone, setphone] = useState(shippingAddress.phone || "");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!address || !city || !postalCode || !phone || !country) {
      alert("All fields are required.");
      return false;
    }
    if (!/^[0-9]+$/.test(phone)) {
      alert("Phone number must contain only digits.");
      return false;
    }
    if (!/^[0-9]{5,6}$/.test(postalCode)) {
      alert("Postal code must be 5 or 6 digits long.");
      return false;
    }
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(saveShippingAddress({ address, city, postalCode, phone, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen transition-all duration-300 ease-in-out md:ml-[4%]"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProgressSteps step1 step2 />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-4xl mx-auto mt-8 md:mt-12"
        >
          <div className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 bg-opacity-90 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm">
            <motion.div 
              className="p-6 md:p-8"
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1 
                className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Delivery Details
              </motion.h1>
              
              <form onSubmit={submitHandler}>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, staggerChildren: 0.1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                      placeholder="Enter your address"
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                      placeholder="Enter your city"
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                      placeholder="Enter your phone number"
                      value={phone}
                      required
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                      placeholder="Enter postal code"
                      value={postalCode}
                      required
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                      placeholder="Enter your country"
                      value={country}
                      required
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    <motion.label 
                      className="flex items-center space-x-3 p-4 bg-white rounded-lg cursor-pointer hover:bg-green-50 transition border border-gray-200"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-green-500"
                        name="paymentMethod"
                        value="CashOnDelivery"
                        checked={paymentMethod === "CashOnDelivery"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div>
                        <span className="block text-gray-800">Cash on Delivery</span>
                        <span className="block text-gray-500 text-sm">Pay cash when you receive your order</span>
                      </div>
                    </motion.label>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    className="w-1/2 mx-auto block bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600 hover:bg-pink-800 text-white py-3 px-6 rounded-lg font-medium text-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue to Checkout
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12"
      >
        <Footer />
      </motion.footer>
    </motion.div>
  );
};

export default Shipping;