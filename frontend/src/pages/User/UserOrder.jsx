import { motion } from "framer-motion";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { FaBox, FaMoneyBillWave, FaCalendarAlt, FaInfoCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useEffect } from "react";

const UserOrder = () => {
  const { data: orders = [], isLoading, error, isError } = useGetMyOrdersQuery();

  // Enhanced error handling
  const getErrorMessage = () => {
    if (!isError) return "An unknown error occurred";
    
    // Handle different error formats
    if (typeof error === 'string') return error;
    if (error?.status === 'FETCH_ERROR') return "Network error - Failed to connect to server";
    if (error?.status === 'TIMEOUT_ERROR') return "Request timeout - Server took too long to respond";
    if (error?.data) {
      return error.data.message || 
             error.data.error || 
             `Server error (${error.status})`;
    }
    
    return error?.message || "Failed to load orders";
  };

  // Log errors for debugging
  useEffect(() => {
    if (isError) {
      console.error("Order loading error:", {
        error,
        status: error?.status,
        data: error?.data,
        message: error?.message
      });
    }
  }, [isError, error]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 transition-all duration-300 ease-in-out px-4 py-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center"
        >
          My Orders
        </motion.h2>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <Loader />
          </motion.div>
        ) : isError ? (
          <Message variant="danger">
            <div className="flex flex-col items-center">
              <p className="mb-2">{getErrorMessage()}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-sm bg-white/20 px-3 py-1 rounded hover:bg-white/30"
              >
                Try Again
              </button>
            </div>
          </Message>
        ) : orders.length === 0 ? (
          <Message variant="info">
            <div className="text-center">
              <p>You haven't placed any orders yet</p>
              <Link 
                to="/shop" 
                className="inline-block mt-2 bg-gradient-to-r from-green-500 to-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Browse Products
              </Link>
            </div>
          </Message>
        ) : (
          <>
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto bg-gradient-to-br from-yellow-900/70 via-green-800/60 to-yellow-700/40 bg-opacity-50 bg-white/10 backdrop-blur-md rounded-xl shadow-xl">
              <OrderTable orders={orders} />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

// Extracted Order Card Component for Mobile
const OrderCard = ({ order }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-gradient-to-br from-yellow-900/70 via-green-800/60 to-yellow-700/40 bg-opacity-50 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4"
  >
    <div className="grid grid-cols-2 gap-3 mb-3">
      <div>
        <p className="text-xs text-white/70">Order ID</p>
        <p className="text-sm text-white font-medium">#{order._id.substring(0, 8)}...</p>
      </div>
      <div>
        <p className="text-xs text-white/70">Date</p>
        <p className="text-sm text-white flex items-center">
          <FaCalendarAlt className="mr-1" size={12} />
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div>
        <p className="text-xs text-white/70">Total</p>
        <p className="text-sm text-white font-medium">
          ${order.totalPrice.toFixed(2)}
        </p>
      </div>
      <div>
        <p className="text-xs text-white/70">Status</p>
        <div className="flex gap-2">
          <StatusBadge condition={order.isPaid} text="Payment" />
          <StatusBadge condition={order.isDelivered} text="Delivery" />
        </div>
      </div>
    </div>

    <div className="mt-3">
      <p className="text-xs text-white/70 mb-2">Products</p>
      <div className="space-y-2">
        {order.orderItems.map((item) => (
          <ProductItem key={item._id} item={item} />
        ))}
      </div>
    </div>

    <div className="mt-4">
      <DetailsButton orderId={order._id} />
    </div>
  </motion.div>
);

// Extracted Order Table Component for Desktop
const OrderTable = ({ orders }) => (
  <table className="min-w-full divide-y divide-white/20">
    <thead className="bg-white/10">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Products</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Order ID</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-white/10">
      {orders.map((order, index) => (
        <motion.tr
          key={order._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="hover:bg-white/5 transition-colors"
        >
          <td className="px-6 py-4">
            <div className="flex flex-wrap gap-2">
              {order.orderItems.map((item) => (
                <ProductItem key={item._id} item={item} isTable />
              ))}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
            {order._id.substring(0, 8)}...
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
            {new Date(order.createdAt).toLocaleDateString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
            ${order.totalPrice.toFixed(2)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex flex-col space-y-2">
              <StatusBadge condition={order.isPaid} text="Payment" isTable />
              <StatusBadge condition={order.isDelivered} text="Delivery" isTable />
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <DetailsButton orderId={order._id} isTable />
          </td>
        </motion.tr>
      ))}
    </tbody>
  </table>
);

// Reusable Components
const ProductItem = ({ item, isTable = false }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`flex items-center ${isTable ? 'space-x-2 bg-white/5 rounded-lg p-2' : 'gap-3 bg-white/5 rounded-lg p-2'}`}
  >
    <img
      src={item.image}
      alt={item.name}
      className="w-12 h-12 object-cover rounded"
    />
    <div className={isTable ? "text-sm text-white" : "flex-1 min-w-0"}>
      <p className={isTable ? "" : "text-sm text-white truncate"}>{item.name}</p>
      <p className={isTable ? "text-white/70" : "flex justify-between text-xs text-white/70"}>
        Qty: {item.qty} × ${item.price.toFixed(2)}
      </p>
    </div>
  </motion.div>
);

const StatusBadge = ({ condition, text, isTable = false }) => (
  <span
    className={`${isTable ? 'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full' : 'text-xs'} ${
      condition
        ? isTable
          ? "bg-green-800/50 text-green-200"
          : "text-green-300"
        : isTable
          ? "bg-red-800/40 text-red-200"
          : "text-yellow-300"
    }`}
  >
    {isTable ? `${text}: ${condition ? "Paid" : "Pending"}` : condition ? "Paid" : "Pending"}
  </span>
);

const DetailsButton = ({ orderId, isTable = false }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Link
      to={`/order/${orderId}`}
      className={`${isTable ? 'inline-block' : 'w-full flex items-center justify-center gap-2'} bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium`}
    >
      <FaInfoCircle /> {isTable ? "Details" : "View Details"}
    </Link>
  </motion.div>
);

export default UserOrder;