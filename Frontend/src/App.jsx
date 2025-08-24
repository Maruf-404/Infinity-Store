import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";


const Home = lazy(() => import("./pages/Home"))
const Collection = lazy(() => import("./pages/Collection"))
const Contact = lazy(() => import("./pages/Contact"))
const About = lazy(() => import("./pages/About"))
const Product = lazy(() => import("./pages/Product"))
const Cart = lazy(() => import("./pages/Cart"))
const Login = lazy(() => import("./pages/Login"))
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"))
const Orders = lazy(() => import("./pages/Orders"))
const Navbar = lazy(() => import("./components/Navbar"))
const Footer = lazy(() => import("./components/Footer"))
const SearchBar = lazy(() => import("./components/SearchBar"))                                
const Verify = lazy(() => import("./pages/Verify"))
const Profile = lazy(() => import("./pages/Profile"))
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))
const Loader = lazy(() => import("./components/Loader"))



const App = () => {
  return (
     <div className="px=4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Suspense fallback={<div className="h-screen"><Loader/></div> }>
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
      </Suspense>
      <Footer/>
    </div>
  )
 }

export default App
