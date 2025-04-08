import { useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
} from "react-icons/ai";
import { FaHeart, FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setDropdownOpen(false); // Close dropdown when toggling sidebar
  };

  const closeSidebar = () => {
    setShowSidebar(false);
    setDropdownOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      closeSidebar();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-800 to-green-600 shadow-md p-4 flex justify-between items-center">
          <Link to="/" className="flex items-center" onClick={closeSidebar}>
            <FaLeaf className="text-2xl mr-2 text-white" />
            <span className="font-bold text-white">TMH Ayurvedic</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative" onClick={closeSidebar}>
              <AiOutlineShoppingCart className="text-2xl text-white" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
            <button onClick={toggleSidebar} className="text-2xl text-white">
              {showSidebar ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      )}

      {/* Sidebar/Navigation */}
      <div
        style={{ zIndex: 9999 }}
        className={`${isMobile ? (showSidebar ? "flex" : "hidden") : "flex"} 
        flex-col justify-between p-4 text-white bg-gradient-to-b from-green-900/90 to-green-700/90 
        ${isMobile ? "w-[40%] h-[100vh]" : "w-[4%] hover:w-[15%] h-[100vh]"} 
        fixed transition-all duration-300 ${isMobile ? "left-0 top-0" : ""}`}
        id="navigation-container"
      >
        <div className="flex flex-col space-y-4 ">
          {/* Ayurveda Brand */}
          <div className="flex items-center mb-8">
            <FaLeaf className="text-2xl" />
            <span className={`${isMobile ? "block" : "hidden nav-item-name"} ml-2 font-bold`}>
              TMH Ayurvedic
            </span>
          </div>

          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
            onClick={closeSidebar}
          >
            <AiOutlineHome className="mr-2 mt-[5rem] " size={26} />
            <span className={`${isMobile ? "block" : "hidden nav-item-name"} mt-[5rem]`}>
              HOME
            </span>
          </Link>

          <Link
            to="/shop"
            className="flex items-center transition-transform transform hover:translate-x-2"
            onClick={closeSidebar}
          >
            <AiOutlineShopping className="mr-2 mt-[2rem]" size={26} />
            <span className={`${isMobile ? "block" : "hidden nav-item-name"} mt-[2rem]`}>
              SHOP
            </span>
          </Link>

          {!isMobile && (
            <Link to="/cart" className="flex relative">
              <div className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Cart</span>
              </div>
              <div className="absolute top-9
              ">
                {cartItems.length > 0 && (
                  <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </div>
            </Link>
          )}

          <Link 
            to="/favorite" 
            className="flex relative"
            onClick={closeSidebar}
          >
            <div className="flex items-center transition-transform transform hover:translate-x-2">
              <FaHeart className="mt-[3rem] mr-2" size={20} />
              <span className={`${isMobile ? "block" : "hidden nav-item-name"} mt-[3rem]`}>
                Favorites
              </span>
              {!isMobile && <FavoritesCount />}
            </div>
          </Link>
        </div>

        <div className="relative">
          {userInfo ? (
            <div className="group">
              <button
                onClick={toggleDropdown}
                className="flex items-center w-full p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                    {userInfo.username ? (
                      <span className="text-white font-medium">
                        {userInfo.username.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <AiOutlineUser className="text-white" />
                    )}
                  </div>
                  <span className={`${isMobile ? "block" : "hidden nav-item-name"} text-white`}>
                    {userInfo.username}
                  </span>
                </div>
                {!isMobile && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-auto transition-transform ${
                      dropdownOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>

              {(dropdownOpen || isMobile) && (
                <div className={`${isMobile ? "static" : "absolute right-0 bottom-full mb-2 w-48"}`}>
                  <div className={`${isMobile ? "bg-transparent" : "bg-white rounded-lg shadow-lg"} overflow-hidden mt-2`}>
                    {userInfo.isAdmin && (
                      <>
                        <Link
                          to="/admin/dashboard"
                          className={`block px-4 py-2 ${isMobile ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-green-50"}`}
                          onClick={closeSidebar}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/admin/productlist"
                          className={`block px-4 py-2 ${isMobile ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-green-50"}`}
                          onClick={closeSidebar}
                        >
                          Products
                        </Link>
                        <Link
                          to="/admin/categorylist"
                          className={`block px-4 py-2 ${isMobile ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-green-50"}`}
                          onClick={closeSidebar}
                        >
                          Category
                        </Link>
                        <Link
                          to="/admin/orderlist"
                          className={`block px-4 py-2 ${isMobile ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-green-50"}`}
                          onClick={closeSidebar}
                        >
                          Orders
                        </Link>
                        <Link
                          to="/admin/userlist"
                          className={`block px-4 py-2 ${isMobile ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-green-50"}`}
                          onClick={closeSidebar}
                        >
                          Users
                        </Link>
                      </>
                    )}
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 ${isMobile ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-green-50"}`}
                      onClick={closeSidebar}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className={`block w-full text-left px-4 py-2 ${isMobile ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-green-50"}`}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login"
                  className="flex items-center p-2 rounded-lg hover:bg-white/20 transition-colors"
                  onClick={closeSidebar}
                >
                  <AiOutlineLogin className="text-xl" />
                  <span className={`${isMobile ? "block" : "hidden nav-item-name"} ml-2`}>
                    LOGIN
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center p-2 rounded-lg hover:bg-white/20 transition-colors"
                  onClick={closeSidebar}
                >
                  <AiOutlineUserAdd className="text-xl" />
                  <span className={`${isMobile ? "block" : "hidden nav-item-name"} ml-2`}>
                    REGISTER
                  </span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && showSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9998]" 
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Navigation;