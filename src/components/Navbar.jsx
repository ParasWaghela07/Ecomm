import { useState } from 'react';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogIn, FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { FirebaseContext } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, cart } = useContext(FirebaseContext);
  const navigate=useNavigate();

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-2">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav items (left side) */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={()=>navigate('/')
            }>
              <span className="text-xl font-bold text-gray-800">HomePage</span>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a
                href="#"
                className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Shop Now
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About Us
              </a>
            </div>
          </div>

          {/* Right side items (cart and auth) */}
          <div className="hidden md:ml-6 md:flex md:items-center gap-x-3">
            {/* Cart button */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer">
              <div className="flex items-center relative" onClick={()=>navigate('/mycart')}>
                <span className="ml-1 text-sm">My Cart</span>
                <div className="relative ml-1">
                  <FiShoppingCart className="h-6 w-6" />
                  {user && cart?.length > 0 && (
                    <>
                      <span className="absolute -top-2 -right-3 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300">
                        {cart.length > 99 ? '99+' : cart.length}
                      </span>
                      <span className="sr-only">{cart.length} items in cart</span>
                    </>
                  )}
                </div>
              </div>
            </button>

            {/* Auth section */}
            {user ? (
              <>
                <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer">
                  <div className="flex items-center">
                    <FiUser className="h-6 w-6" />
                    <span className="ml-1 text-sm">Profile</span>
                  </div>
                </button>
                <button
                  onClick={logout}
                  className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center">
                    <FiLogOut className="h-6 w-6" />
                    <span className="ml-1 text-sm">Logout</span>
                  </div>
                </button>
              </>
            ) : (
              <a
                href="/auth"
                className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <div className="flex items-center">
                  <FiLogIn className="h-6 w-6" />
                  <span className="ml-1 text-sm">Login/Signin</span>
                </div>
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-gray-50 border-transparent text-gray-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Shop Now
            </a>
            <a
              href="#"
              className="bg-gray-50 border-transparent text-gray-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              About Us
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-4 justify-between">
              <button className="flex items-center text-gray-500 hover:text-gray-700 relative">
                <div className="relative">
                  <FiShoppingCart className="h-6 w-6" />
                  {user && cart?.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length > 99 ? '99+' : cart.length}
                    </span>
                  )}
                </div>
              </button>

              {user ? (
                <>
                  <button className="flex items-center text-gray-500 hover:text-gray-700">
                    <FiUser className="h-6 w-6" />
                    <span className="ml-2">Profile</span>
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center text-gray-500 hover:text-gray-700"
                  >
                    <FiLogOut className="h-6 w-6" />
                    <span className="ml-2">Logout</span>
                  </button>
                </>
              ) : (
                <a href="/auth" className="flex items-center text-gray-500 hover:text-gray-700">
                  <FiLogIn className="h-6 w-6" />
                  <span className="ml-2">Login/Signin</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;