import { Route, Routes } from "react-router-dom";
import Menu from "./components/nav/Menu";
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register';
import Dashboard from './pages/user/Dashboard'
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/routes/PrivateRoute";
import PageNotFound from "./components/routes/PageNotFound";
import Admindashboard from "./pages/admin/Admindashboard";
import AdminRoute from "./components/routes/AdminRoute";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminProduct from "./pages/admin/AdminProduct";
import UserOrders from "./pages/user/UserOrders";
import UserProfile from "./pages/user/UserProfile";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductUpdate from "./pages/admin/AdminUpdate";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";
import CategoryList from "./pages/CategoryList";
import CategoryView from "./pages/CategoryView";
import Cards from "./pages/Cards";
import AdminOrders from "./pages/admin/AdminOrders";


function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cards />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/product/:slug" element={<ProductView />} />
        <Route path="/category/:slug" element={<CategoryView />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/product/update/:slug" element={<AdminProductUpdate />} />
        </Route>
        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
    </>
  );
}

export default App;
