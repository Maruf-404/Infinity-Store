import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";

const ProtectedRoute = ({ children }) => {
  const { navigate, token } = useContext(ShopContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
