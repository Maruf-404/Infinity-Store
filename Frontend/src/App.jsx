import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
     <div className="px=4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="place-order" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute> } />
        <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute> } />
        <Route path="verify" element={<ProtectedRoute><Verify/></ProtectedRoute> } />  
         <Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute> } />  
            <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </div>
  )
 }

export default App
