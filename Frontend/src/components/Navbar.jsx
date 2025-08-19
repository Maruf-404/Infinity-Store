import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    getCartCount,
    setCartItems,
    navigate,
    setToken,
    token,
    profileData,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("accessToken");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between sm:py-3 sm:px-0 px-4 py-2  font-medium">
      <Link to="/">
        {" "}
        <img src={assets.logo} className="w-40" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6 z-10">
        <div className="group relative">
          <img
            onClick={() => (token ? navigate("/profile") : navigate("/login"))}
            src={
              profileData?.avatar?.url.length > 0
                ? profileData.avatar.url
                : assets.profile_icon
            }
            className="w-6 h-6 cursor-pointer rounded-full"
            alt=""
          />

          {/* Dropdown menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
              <div className="flex flex-col gap-2 px-3 oy-5 w-36 rounded bg-slate-100 text-gray-500">
                <p
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  {" "}
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 cursor-pointer min-w-5"
            alt="CartIcon"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 leading-4 text-center bg-black text-white rounded-full aspect-square text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menuIcon"
        />
        <div
          className={`absolute right-0 top-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt=""
              />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 border pl-6"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 border pl-6"
              to="/collection"
            >
              Collection
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 border pl-6"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 border pl-6"
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
