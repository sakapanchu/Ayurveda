import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaArrowLeft,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import Footer from "../Footer";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      setRating(0);
      setComment("");
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty: Number(qty) }));
      navigate("/cart");
    }
  };

  if (isLoading) {
    return (
      <div >
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Message variant="danger">
          {error?.data?.message || error.message || "Failed to load product"}
        </Message>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Message variant="info">Product not found</Message>
      </div>
    );
  }

  return (
    <div className=" flex flex-col bg-gradient-to-br  from-green-50 to-green-100 min-h-screen transition-all duration-300 ease-in-out  md:ml-[4%]">
      {/* Header with back button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-6 px-4 sm:px-6 lg:px-8"
      >
        <Link
          to="/"
          className="flex items-center text-green-400 hover:text-green-600 transition-colors duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Products
        </Link>
      </motion.div>

      {/* Main Product Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Product Info - Image and Details */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Product Image */}
            <div className="lg:w-1/2">
              <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <HeartIcon product={product} />
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 text-green-800">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {product.name}
              </motion.h1>

              <motion.div 
                className="flex items-center mb-6"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color="yellow-400"
                />
              </motion.div>

              <motion.p 
                className="text-lg text-gray-600 mb-8"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {product.description}
              </motion.p>

              <motion.div 
                className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 bg-opacity-50 rounded-xl p-6 mb-8"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <FaStore className="text-green-500 mr-3 text-xl" />
                    <div>
                      <p className="text-gray-600">Brand</p>
                      <p className="font-medium">{product.brand}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-green-500 mr-3 text-xl" />
                    <div>
                      <p className="text-gray-600">Added</p>
                      <p className="font-medium">{moment(product.createAt).fromNow()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaShoppingCart className="text-green-500 mr-3 text-xl" />
                    <div>
                      <p className="text-gray-600">Quantity</p>
                      <p className="font-medium">{product.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaBox className="text-green-500 mr-3 text-xl" />
                    <div>
                      <p className="text-gray-600">In Stock</p>
                      <p className="font-medium">{product.countInStock}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-4xl font-extrabold text-pink-400">
                  ${product.price}
                </div>

                {product.countInStock > 0 ? (
                  <div className="flex items-center gap-4">
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-400 focus:ring-green-400"
                    >
                      {product.countInStock > 0 &&
                        [...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={addToCartHandler}
                      className="bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600  text-white py-3 px-6 rounded-lg hover:bg-pink-800  font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Add To Cart
                    </button>
                  </div>
                ) : (
                  <div className="text-red-400 font-medium">
                    Out of Stock
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Tabs Section */}
          <ProductTabs
            loadingProductReview={loadingProductReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            product={product}
          />
        </div>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetails;