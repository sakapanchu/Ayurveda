import { FaLeaf, FaHeart, FaUsers, FaAward, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Footer from "./Footer";

// Animation variants (same as before)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const AboutUs = () => {
  return (
    <div className="ml-[4%]">
      <Helmet>
        <title>About Us | AyurVeda Sri Lanka - Authentic Ayurvedic Wellness</title>
        <meta
          name="description"
          content="Discover our journey in bringing authentic Ayurvedic wellness to Sri Lanka since 2010. Learn about our mission, community, and certifications."
        />
      </Helmet>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mx-auto px-4 py-12 bg-gradient-to-b from-green-50 to-green-100 min-h-screen w-full"
      >
        {/* Hero Section with Sri Lanka Focus */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center mb-4"
          >
            <FaLeaf className="text-4xl sm:text-5xl text-green-600 mr-3" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800">
              AyurVeda Sri Lanka
            </h1>
          </motion.div>
          <motion.p
            variants={fadeIn}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Bringing 5,000 years of Ayurvedic wisdom to Sri Lanka since 2015
          </motion.p>
        </motion.div>

        {/* Sri Lanka Story Section */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8 mb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <motion.h2
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-semibold text-green-700 mb-4"
            >
              Our Journey
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-700 mb-4 text-base md:text-lg"
            >
              Established in 2015, AyurVeda Sri Lanka was founded to bring authentic 
              Ayurvedic treatments to the island. We partner with local herb growers 
              in Kandy and Galle to source the freshest ingredients while preserving 
              traditional Sri Lankan Ayurvedic practices.
            </motion.p>
            <motion.p
              variants={fadeIn}
              className="text-gray-700 text-base md:text-lg"
            >
              Our Colombo research center combines Sri Lanka's rich Ayurvedic heritage 
              with modern quality standards to create products specially formulated for 
              the Sri Lankan climate and lifestyle.
            </motion.p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-green-50 rounded-lg p-6 shadow-lg overflow-hidden"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src="/image/ayurveda-herbs.png"
              alt="Sri Lankan Ayurvedic herbs"
              className="rounded-lg shadow-md w-full h-auto object-cover transition-all duration-500 hover:scale-105"
            />
          </motion.div>
        </motion.div>

        {/* Sri Lanka Specific Features */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center hover:shadow-lg transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <FaHeart className="text-4xl text-green-600 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-green-800">
              Local Sourcing
            </h3>
            <p className="text-gray-600">
              85% of our herbs are sourced from Sri Lankan farms in Kandy, Matale, 
              and Ratnapura districts.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center hover:shadow-lg transition-all duration-300"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaUsers className="text-4xl text-green-600 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-green-800">
              Sri Lankan Community
            </h3>
            <p className="text-gray-600">
              Over 50,000 Sri Lankan customers and 25+ local Ayurvedic physicians 
              trust our products.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 backdrop-blur-sm p-6 rounded-lg shadow-sm text-center hover:shadow-lg transition-all duration-300"
          >
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <FaAward className="text-4xl text-green-600 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-green-800">
              Local Certifications
            </h3>
            <p className="text-gray-600">
              Approved by Sri Lanka Ayurvedic Medical Council and Ministry of 
              Indigenous Medicine.
            </p>
          </motion.div>
        </motion.div>

        {/* Sri Lanka Contact Information */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col items-center justify-center w-full px-4 py-12"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-green-900/20 via-green-800/30 to-green-700/40 backdrop-blur-sm rounded-xl p-6 sm:p-8 text-center w-full max-w-5xl shadow-inner"
          >
            <motion.h2
              variants={fadeIn}
              className="text-2xl sm:text-3xl font-bold text-green-800 mb-6"
            >
              Our Sri Lanka Centers
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <motion.div 
                variants={itemVariants}
                className="bg-white/50 p-4 rounded-lg"
              >
                <h3 className="font-semibold text-lg mb-3 text-green-700">Colombo Headquarters</h3>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-start">
                    <FaMapMarkerAlt className="text-green-600 mt-1 mr-2" />
                    <span>No. 123, Ayurveda Mawatha, Colombo 05, Sri Lanka</span>
                  </p>
                  <p className="flex items-center">
                    <FaPhone className="text-green-600 mr-2" />
                    <span>+94 112 345 678</span>
                  </p>
                  <p className="flex items-center">
                    <FaEnvelope className="text-green-600 mr-2" />
                    <span>colombo@ayurveda.lk</span>
                  </p>
                  <p className="flex items-center">
                    <FaClock className="text-green-600 mr-2" />
                    <span>Mon-Sat: 8:30 AM - 5:30 PM</span>
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-white/50 p-4 rounded-lg"
              >
                <h3 className="font-semibold text-lg mb-3 text-green-700">Kandy Herbal Center</h3>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-start ">
                    <FaMapMarkerAlt className="text-green-600 mt-1 mr-2" />
                    <span>456 Ayurvedic Gardens, Peradeniya Road, Kandy</span>
                  </p>
                  <p className="flex items-center">
                    <FaPhone className="text-green-600 mr-2" />
                    <span>+94 812 345 678</span>
                  </p>
                  <p className="flex items-center">
                    <FaEnvelope className="text-green-600 mr-2" />
                    <span>kandy@ayurveda.lk</span>
                  </p>
                  <p className="flex items-center">
                    <FaClock className="text-green-600 mr-2" />
                    <span>Mon-Fri: 9:00 AM - 4:30 PM</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Sri Lanka Specific Call-to-Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="inline-block"
          >
            <FaLeaf className="text-4xl text-green-600 mb-4" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-4">
            Experience Sri Lankan Ayurveda
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-base md:text-lg mb-6">
            Join thousands of Sri Lankans who have embraced our authentic 
            Ayurvedic solutions tailored for tropical living.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300"
            >
              <Link to="/shop">Shop Products</Link>
            </motion.button>
           
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default AboutUs;