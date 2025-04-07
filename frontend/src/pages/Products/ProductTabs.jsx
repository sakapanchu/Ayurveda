import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-700 mb-8">
        <button
          onClick={() => handleTabClick(1)}
          className={`py-3 px-6 font-medium ${activeTab === 1 ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-yellow-400'}`}
        >
          Write Review
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`py-3 px-6 font-medium ${activeTab === 2 ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-yellow-400'}`}
        >
          All Reviews ({product?.reviews?.length || 0})
        </button>
        <button
          onClick={() => handleTabClick(3)}
          className={`py-3 px-6 font-medium ${activeTab === 3 ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-yellow-400'}`}
        >
          Related Products
        </button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 bg-opacity-50 rounded-xl p-6"
        >
          {activeTab === 1 && (
            <div>
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div className="mb-6">
                    <label htmlFor="rating" className="block text-lg font-medium text-white mb-2">
                      Rating
                    </label>
                    <select
                      id="rating"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-green-400 focus:ring-yellow-400"
                    >
                      <option value="">Select Rating</option>
                      <option value="1">⭐ (1 - Poor)</option>
                      <option value="2">⭐⭐ (2 - Fair)</option>
                      <option value="3">⭐⭐⭐ (3 - Good)</option>
                      <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
                      <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="comment" className="block text-lg font-medium text-white mb-2">
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      rows="4"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-700 border border-green-600 text-white focus:border-green-400 focus:ring-yellow-400"
                      placeholder="Share your thoughts about this product..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loadingProductReview}
                    className="bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-600 hover:to-pink-600  text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                  >
                    {loadingProductReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-700 mb-4">
                    Please sign in to write a review
                  </p>
                  <Link
                    to="/login"
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 2 && (
            <div>
              {product?.reviews?.length === 0 ? (
                <div className="text-center py-8 text-gray-700">
                  No reviews yet. Be the first to review!
                </div>
              ) : (
                <div className="space-y-6">
                  {product?.reviews?.map((review) => (
                    <motion.div
                      key={review._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-700 rounded-lg p-6 shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-white">{review.name}</h3>
                          <Ratings value={review.rating} />
                        </div>
                        <span className="text-gray-400 text-sm">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {!data ? (
                <Loader />
              ) : (
                data.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SmallProduct product={product} />
                  </motion.div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductTabs;