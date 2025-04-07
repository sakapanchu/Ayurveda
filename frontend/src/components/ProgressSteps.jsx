import { motion } from "framer-motion";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center px-4 py-6 overflow-x-auto">
      <div className="flex items-center">
        {/* Step 1 - Login */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex flex-col items-center ${step1 ? "text-green-500" : "text-gray-400"}`}
        >
          <div className="relative">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step1 ? "bg-green-500" : "bg-gray-200"}`}
              whileHover={{ scale: 1.1 }}
            >
              {step1 ? (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              ) : (
                <span className="text-gray-600">1</span>
              )}
            </motion.div>
          </div>
          <motion.span 
            className="mt-2 text-sm font-medium whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Login
          </motion.span>
        </motion.div>

        {/* Connector Line 1 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: step1 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={`h-1 mx-2 ${step1 ? "bg-green-500" : "bg-gray-200"} w-16 sm:w-24`}
        />

        {/* Step 2 - Shipping */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`flex flex-col items-center ${step2 ? "text-green-500" : "text-gray-400"}`}
        >
          <div className="relative">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step2 ? "bg-green-500" : "bg-gray-200"}`}
              whileHover={{ scale: 1.1 }}
            >
              {step2 ? (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              ) : (
                <span className="text-gray-600">2</span>
              )}
            </motion.div>
          </div>
          <motion.span 
            className="mt-2 text-sm font-medium whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Shipping
          </motion.span>
        </motion.div>

        {/* Connector Line 2 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: step2 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`h-1 mx-2 ${step2 ? "bg-green-500" : "bg-gray-200"} w-16 sm:w-24`}
        />

        {/* Step 3 - Summary */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`flex flex-col items-center ${step3 ? "text-green-500" : "text-gray-400"}`}
        >
          <div className="relative">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step3 ? "bg-green-500" : "bg-gray-200"}`}
              whileHover={{ scale: 1.1 }}
            >
              {step3 ? (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              ) : (
                <span className="text-gray-600">3</span>
              )}
            </motion.div>
          </div>
          <motion.span 
            className="mt-2 text-sm font-medium whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Summary
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressSteps;