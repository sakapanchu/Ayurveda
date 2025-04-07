import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animation variants for mobile (upward) and desktop (downward)
  const menuVariants = {
    open: (isMobile) => ({ 
      opacity: 1,
      y: isMobile ? -20 : 10,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }),
    closed: { 
      opacity: 0,
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Menu Button - Different position for mobile */}
      <button
        className={`fixed z-50 ${isMobile ? 'bottom-5 right-5' : 'top-5 right-7'} bg-[#151515] p-3 rounded-full shadow-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" size={20} />
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </div>
        )}
      </button>

      {/* Menu Content */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.section
            className={`fixed ${isMobile ? 'bottom-16 right-5' : 'top-20 right-7'} bg-[#151515] p-4 rounded-lg shadow-xl z-40 w-56`}
            custom={isMobile}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <ul className="list-none">
              <li>
                <NavLink
                  className="block py-2 px-3 mb-2 hover:bg-[#2E2D2D] rounded-sm text-white"
                  to="/admin/dashboard"
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block py-2 px-3 mb-2 hover:bg-[#2E2D2D] rounded-sm text-white"
                  to="/admin/categorylist"
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block py-2 px-3 mb-2 hover:bg-[#2E2D2D] rounded-sm text-white"
                  to="/admin/productlist"
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block py-2 px-3 mb-2 hover:bg-[#2E2D2D] rounded-sm text-white"
                  to="/admin/allproductslist"
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block py-2 px-3 mb-2 hover:bg-[#2E2D2D] rounded-sm text-white"
                  to="/admin/userlist"
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block py-2 px-3 hover:bg-[#2E2D2D] rounded-sm text-white"
                  to="/admin/orderlist"
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Orders
                </NavLink>
              </li>
            </ul>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminMenu;