import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTruck,
  FaBox,
  FaShoppingCart,
  FaTag,
  FaReceipt,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaTruckLoading,
  FaIdBadge,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import Footer from "../Footer";

const Order = () => {
  const { id: orderId } = useParams();
  const [showPayOptions, setShowPayOptions] = useState(false);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{ amount: { value: order.totalPrice } }],
    });
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order marked as delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error.data.message}</Message>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen transition-all duration-300 ease-in-out md:ml-[4%]"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Order Items Section (Full Width) */}
        {/* Order Items Section - Modified for Mobile Responsiveness */}
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="mb-8">
          <div className="rounded-xl p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4 md:mb-6 flex items-center gap-2">
              <FaShoppingCart className="text-green-600" /> Order Items
            </h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <div className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 rounded-xl shadow-md">
                {/* Mobile View - Stacked Cards */}
                <div className="md:hidden space-y-4 p-4">
                  {order.orderItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/90 rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          {" "}
                          {/* Added min-w-0 to prevent overflow */}
                          <Link
                            to={`/product/${item._id}`}
                            className="text-green-600 hover:underline font-medium line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              {" "}
                              {/* Changed text color */}
                              <FaTag className="text-gray-400 mr-2" size={12} />
                              <span className="truncate">
                                ${item.price.toFixed(2)} each
                              </span>{" "}
                              {/* Added truncate */}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              {" "}
                              {/* Changed text color */}
                              <FaBox className="text-gray-400 mr-2" size={12} />
                              <span>Qty: {item.qty}</span>
                            </div>
                          </div>
                        </div>
                        <div className="font-medium text-green-700 text-right min-w-[60px]">
                          {" "}
                          {/* Added min-width */}$
                          {(item.qty * item.price).toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Item
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Details
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.orderItems.map((item, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg mr-4"
                              />
                              <div>
                                <Link
                                  to={`/product/${item._id}`}
                                  className="text-green-600 hover:underline font-medium"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-sm text-gray-500 mt-1">
                                  SKU: {item._id.slice(0, 8)}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col">
                              <div className="flex items-center mb-1">
                                <FaTag
                                  className="text-gray-400 mr-2"
                                  size={12}
                                />
                                <span className="text-gray-600">
                                  ${item.price.toFixed(2)} each
                                </span>
                              </div>
                              <div className="flex items-center">
                                <FaBox
                                  className="text-gray-400 mr-2"
                                  size={12}
                                />
                                <span className="text-gray-600">
                                  Qty: {item.qty}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 font-medium text-green-700">
                            ${(item.qty * item.price).toFixed(2)}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Delivery Info and Order Summary Side by Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Delivery Information (Left Side) */}
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="lg:w-1/2"
          >
            <div className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <FaTruck className="text-green-500" /> Delivery Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaIdBadge className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Order ID
                    </p>
                    <p className="text-gray-700 font-medium">{order._id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaUser className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Customer
                    </p>
                    <p className="text-gray-700 font-medium">
                      {order.user.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaEnvelope className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-700 font-medium">
                      {order.user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaMapMarkerAlt className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Shipping Address
                    </p>
                    <p className="text-gray-700">
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}
                      <br />
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaPhone className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Contact</p>
                    <p className="text-gray-700">
                      {order?.shippingAddress?.phone ? (
                        <a
                          href={`tel:${order.shippingAddress.phone}`}
                          className="hover:text-green-600 hover:underline"
                        >
                          {order.shippingAddress.phone}
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">
                          Not provided
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaCreditCard className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Payment Method
                    </p>
                    <p className="text-gray-700 capitalize">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <FaCheckCircle className="text-green-600" />
                    </div>
                    <p className="font-medium text-gray-700">Order Status</p>
                  </div>
                  <div className="ml-11">
                    {order.isPaid ? (
                      <Message variant="success">
                        <div className="flex items-center gap-2">
                          <FaCheckCircle /> Paid on{" "}
                          {new Date(order.paidAt).toLocaleString()}
                        </div>
                      </Message>
                    ) : (
                      <Message variant="danger">
                        <div className="flex items-center gap-2">
                          <FaTimesCircle /> Not paid
                        </div>
                      </Message>
                    )}
                  </div>
                  {order.isDelivered ? (
                    <div className="ml-11 mt-2">
                      <Message variant="success">
                        <div className="flex items-center gap-2">
                          <FaTruckLoading /> Delivered on{" "}
                          {new Date(order.deliveredAt).toLocaleString()}
                        </div>
                      </Message>
                    </div>
                  ) : (
                    <div className="ml-11 mt-2">
                      <Message variant="info">
                        <div className="flex items-center gap-2">
                          <FaTruck /> Processing delivery
                        </div>
                      </Message>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary (Right Side) */}
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="lg:w-1/2"
          >
            <div className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 rounded-xl shadow-lg p-6 min-h-fit">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <FaReceipt /> Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center text-gray-700">
                    <FaShoppingCart className="mr-2 text-gray-400" size={14} />
                    <span>Items:</span>
                  </div>
                  <span className="font-medium">${order.itemsPrice}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center text-gray-700">
                    <FaTruck className="mr-2 text-gray-400" size={14} />
                    <span>Shipping:</span>
                  </div>
                  <span className="font-medium">${order.shippingPrice}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center text-gray-700">
                    <FaMoneyBillWave className="mr-2 text-gray-400" size={14} />
                    <span>Tax:</span>
                  </div>
                  <span className="font-medium">${order.taxPrice}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-2">
                  <div className="flex items-center text-gray-800">
                    <FaReceipt className="mr-2 text-green-600" size={16} />
                    <span className="text-lg font-bold">Total:</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    ${order.totalPrice}
                  </span>
                </div>
              </div>

              {/* Payment Button */}
              {!order.isPaid && (
                <div className="mt-6">
                  {order.paymentMethod.toLowerCase() === "paypal" ? (
                    <>
                      {loadingPay && <Loader />}
                      {isPending ? (
                        <Loader />
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {!showPayOptions ? (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-1/2 mx-auto bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600 hover:bg-pink-800 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                              onClick={() => setShowPayOptions(true)}
                            >
                              <FaCreditCard /> Pay Now
                            </motion.button>
                          ) : (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <PayPalButtons
                                  createOrder={createOrder}
                                  onApprove={onApprove}
                                  style={{ layout: "vertical" }}
                                />
                              </div>
                              <button
                                className="mt-2 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                onClick={() => setShowPayOptions(false)}
                              >
                                <FaTimesCircle size={12} /> Hide payment options
                              </button>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <Message variant="info">
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave /> This is a {order.paymentMethod}{" "}
                        order.{" "}
                        {order.paymentMethod.toLowerCase() ===
                        "cash on delivery"
                          ? "Payment will be collected upon delivery."
                          : "Please proceed with your selected payment method."}
                      </div>
                    </Message>
                  )}
                </div>
              )}

              {/* Deliver Button */}
              {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                  <button
                    onClick={deliverHandler}
                    disabled={loadingDeliver}
                    className="w-1/2 mx-auto bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600 hover:bg-pink-800 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loadingDeliver ? (
                      "Processing..."
                    ) : (
                      <>
                        <FaTruckLoading /> Mark As Delivered
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Order;
