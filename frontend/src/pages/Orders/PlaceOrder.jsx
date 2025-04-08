import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { FaHome, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import Footer from "../Footer";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: {
          ...cart.shippingAddress,
          phone: cart.shippingAddress.phone 
        },
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());

      if (cart.paymentMethod === "CashOnDelivery") {
        const orderSummary = `Order Summary:\nItems: LKR${cart.itemsPrice}\nShipping: LKR${cart.shippingPrice}\nTax: LKR${cart.taxPrice}\nTotal: LKR${cart.totalPrice}\n\nDelivering To:\nAddress: ${cart.shippingAddress.address}\nCity: ${cart.shippingAddress.city}\nPostal Code: ${cart.shippingAddress.postalCode}\nCountry: ${cart.shippingAddress.country}\nPhone: ${cart.shippingAddress.phone}\n\nPayment Method: ${cart.paymentMethod}`;

        const whatsappUrl = `https://wa.me/+94765599810?text=${encodeURIComponent(orderSummary)}`;
        window.open(whatsappUrl, "_blank");

        setOrderId(res._id);
        setOrderSuccess(true);
      } else {
        navigate(`/order/${res._id}`);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  if (orderSuccess) {
    return (
      <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen transition-all duration-300 ease-in-out  md:ml-[4%]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-green-200 to-yellow-100 flex flex-col items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-full max-w-md text-center"
        >
          {/* Animated Confetti Background */}
          <motion.div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400 text-xl"
                initial={{ 
                  y: -50,
                  x: Math.random() * window.innerWidth - 100,
                  rotate: Math.random() * 360,
                  opacity: 0
                }}
                animate={{ 
                  y: window.innerHeight,
                  rotate: Math.random() * 360,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
    
          {/* Main Content */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 bg-green-600 rounded-full blur-xl opacity-20"></div>
            <FaCheckCircle className="relative text-7xl text-green-700 mx-auto" />
          </motion.div>
    
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-green-900 mb-3"
          >
            Congratulations!
          </motion.h2>
    
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-yellow-700 mb-2"
          >
            Order #{orderId} confirmed!
          </motion.p>
    
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 mb-8"
          >
            {cart.paymentMethod === "CashOnDelivery" ? (
              <>
                Your items will be shipped soon. <br />
                Please have <span className="font-semibold">LKR{cart.totalPrice}</span> ready for delivery.
              </>
            ) : (
              "Thank you for your purchase!"
            )}
          </motion.p>
    
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-yellow-600 text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate("/")}
            >
              <FaHome className="text-lg" />
              Home
            </motion.button>
    
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all border border-purple-200"
              onClick={() => navigate("/shop")}
            >
              <FaShoppingCart className="text-lg" />
              Shop More
            </motion.button>
          </motion.div>
    
          {/* Order Summary Floating Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 bg-opacity-70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-purple-100"
          >
            <h3 className="font-medium text-yellow-800 mb-2">Order Summary</h3>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Items:</span>
              <span>LKR{cart.itemsPrice}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping:</span>
              <span>LKR{cart.shippingPrice}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax:</span>
              <span>LKR{cart.taxPrice}</span>
            </div>
            <div className="flex justify-between font-medium text-yellow-800 mt-2 pt-2 border-t border-purple-100">
              <span>Total:</span>
              <span>LKR{cart.totalPrice}</span>
            </div>
          </motion.div>
        </motion.div>
    
        {/* Floating Happy Customer Icon */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="mt-12 text-5xl"
        >
          😊
        </motion.div>
      </motion.div>
      </div>
    );
  }

  return (
    <div className="ml=[4%]">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 "
    >
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8 max-w-6xl">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="overflow-x-auto bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 rounded-xl shadow-md mb-8">
              <table className="w-full">
                <thead className="bg-gray-200 ">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Image</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Qty</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {cart.cartItems.map((item, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="px-4 py-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Link 
                          to={`/product/${item._id}`} 
                          className="text-green-600 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{item.qty}</td>
                      <td className="px-4 py-3">LKR{item.price.toFixed(2)}</td>
                      <td className="px-4 py-3">LKR{(item.qty * item.price).toFixed(2)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-bold text-green-800 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium">LKR{cart.itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">LKR{cart.shippingPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium">LKR{cart.taxPrice}</span>
              </div>
              <div className="flex justify-between border-t pt-3 mt-3">
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <span className="text-lg font-bold text-green-600">LKR{cart.totalPrice}</span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 p-6 rounded-xl shadow-md"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-4">Delivering</h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>Address:</strong> {cart.shippingAddress.address}</p>
                <p><strong>City:</strong> {cart.shippingAddress.city}</p>
                <p><strong>Postal Code:</strong> {cart.shippingAddress.postalCode}</p>
                <p><strong>Country:</strong> {cart.shippingAddress.country}</p>
                <p><strong>Phone:</strong> {cart.shippingAddress.phone}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 p-6 rounded-xl shadow-md"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-4">Payment Method</h2>
              <p className="text-gray-700">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </motion.div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <Message variant="danger">{error.data?.message || "An error occurred"}</Message>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            type="button"
            className={`py-3 px-8 rounded-lg text-lg font-medium transition-all duration-300 ${
              cart.cartItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "w-1/2 mx-auto block bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600 hover:bg-pink-800 text-white shadow-lg hover:shadow-xl"
            }`}
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            {isLoading ? "Processing..." : "Place Order"}
          </button>
        </motion.div>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex justify-center"
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </motion.div>
    <Footer />
    </div>
  );
};

export default PlaceOrder;