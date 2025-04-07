import { motion, AnimatePresence } from "framer-motion";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { FaSearch, FaBoxOpen } from "react-icons/fa";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 transition-all duration-300 ease-in-out px-2 sm:px-4 md:ml-[4%] md:p-8"
    >
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <AdminMenu />

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
        >
          <motion.h2
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="text-xl sm:text-2xl font-bold text-green-800 p-4 sm:p-6 border-b border-green-100 mt-10"
          >
            Order Management
          </motion.h2>

          {isLoading ? (
            <div className="flex justify-center p-8 sm:p-12">
              <Loader />
            </div>
          ) : error ? (
            <Message variant="danger" className="m-4 sm:m-6">
              {error?.data?.message || error.error}
            </Message>
          ) : orders?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center p-8 sm:p-12 text-gray-500"
            >
              <FaBoxOpen className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-green-400" />
              <p className="text-base sm:text-lg">No orders found</p>
            </motion.div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-green-100">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider hidden sm:table-cell">
                      Order ID
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">
                      Info
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider hidden sm:table-cell">
                      Total
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-green-50">
                  <AnimatePresence>
                    {orders?.map((order, index) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-green-50/50"
                      >
                        <td className="px-2 sm:px-4 py-4">
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {order.orderItems.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative group"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded-lg shadow border border-gray-200"
                                />
                                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                                  {item.qty}
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-[10px] sm:text-xs p-0.5 sm:p-1 text-center truncate rounded-b-lg">
                                  {item.name}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-mono text-gray-700 hidden sm:table-cell">
                          {order._id.substring(0, 8)}...
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap">
                          <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                            <div className="font-medium sm:hidden">
                              {order.user?.username || "Guest"}
                              <span className="block text-xs text-gray-500">
                                {order.createdAt.substring(0, 10)}
                              </span>
                              <span className="block text-green-700 font-medium">
                                ${order.totalPrice.toFixed(2)}
                              </span>
                            </div>
                            <div className="hidden sm:block">
                              {order.user?.username || "Guest"}
                            </div>
                            <div className="hidden sm:block text-gray-700">
                              {order.createdAt.substring(0, 10)}
                            </div>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-green-700 hidden sm:table-cell">
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span
                              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs text-center rounded-full ${
                                order.isPaid
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.isPaid ? "Paid" : "Pending"}
                            </span>
                            <span
                              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs text-center rounded-full ${
                                order.isDelivered
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.isDelivered ? "Delivered" : "Shipping"}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-right">
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Link
                              to={`/order/${order._id}`}
                              className="inline-flex items-center px-2 sm:px-3 py-1 border border-transparent text-[10px] sm:text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                            >
                              <FaSearch className="mr-0.5 sm:mr-1" />
                              <span className="hidden sm:inline">Details</span>
                            </Link>
                          </motion.div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderList;