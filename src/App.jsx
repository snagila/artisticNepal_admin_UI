import "react-toastify/dist/ReactToastify.css";
import { Route, Router, Routes } from "react-router-dom";
import AuthLayout from "./pages/auth/authLayout/AuthLayout";
import Signup_Page from "./pages/auth/signupPage/Signup_Page";
import { ToastContainer } from "react-toastify";
import VerifyUser from "./pages/auth/verifyuserPage/VerifyUser";
import LoginPage from "./pages/auth/loginPage/LoginPage";
import ResetPassword from "./pages/auth/resetPassword_Page/ResetPassword";
import NewPasswordPage from "./pages/auth/newPasswordPage/NewPasswordPage";
import Admin_private_Route from "./components/adminPrivateRoute&Layout/Admin_private_Route";
import AdminLayout from "./components/adminPrivateRoute&Layout/AdminLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import ProductPage from "./pages/productPage/ProductPage";

import ViewProduct from "./pages/productPage/ViewProduct";
import NewProductPage from "./pages/productPage/newProductPage";
import EditProductPage from "./pages/productPage/EditProductPage";
import UserPage from "./pages/userPage/UserPage";
import OrderPage from "./pages/orderPage/OrderPage";

function App() {
  return (
    <>
      <Routes>
        {/* public route */}

        {/* auth route */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup_Page />} />
          <Route path="/verify-email" element={<VerifyUser />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reset-password/newpassword"
            element={<NewPasswordPage />}
          />
        </Route>

        {/* ====== ADMIN PRIVATE ROUTES */}

        <Route
          path="/admin"
          element={
            <Admin_private_Route>
              <AdminLayout />
            </Admin_private_Route>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/categories" element={<CategoryPage />} />
          <Route path="/admin/products" element={<ProductPage />} />
          <Route path="/admin/new-product" element={<NewProductPage />} />
          <Route path="/admin/view-product/:id" element={<ViewProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProductPage />} />
          <Route path="/admin/orders" element={<OrderPage />} />
          <Route path="/admin/users" element={<UserPage />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
