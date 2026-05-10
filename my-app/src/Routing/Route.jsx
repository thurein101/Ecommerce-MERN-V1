import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Category from "../components/Category";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Cart from "../components/Cart";
import NotFound from "../pages/ErrorPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/Policy";
import { useAuth } from "../context/AuthContext";
import ForgotPassword from "../Auth/ForgotPassword";
import Dashboard from "../user/dashboard";
import Private from "../private/UserRoute";
import AdminRoute from "../private/AdminRoute";
import AdminDashboard from "../Admin/AdminDashboard";
import Create_Category from "../Admin/Create_Category";
import Create_Products from "../Admin/Create_Products";
import Users from "../Admin/Users";
import Profile from "../user/Profile";
import Orders from "../user/Orders";
import Product from "../Admin/Products";
import Update_Product from "../Admin/UpdateProduct";
import SearchResult from "../components/SearchResult";
import ProductDetail from "../components/ProductDetail";
import CategoryList from "../components/CategoryList";

const AppRouter = () => {
  const [auth, setAuth] = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/Register",
          element: auth.user ? <Navigate to={"/"} /> : <Register />,
        },
        {
          path: "/login",
          element: auth.user ? <Navigate to={"/"} /> : <Login />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/privacy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/forgot-password",
          element: auth.user ? <Navigate to={"/"} /> : <ForgotPassword />,
        },
        {
          path: "/search",
          element: <SearchResult />,
        },
         {
          path: "/detail/:slug",
          element: <ProductDetail/>,
        },
         {
          path: "/category-list/:slug",
          element: <CategoryList/>,
        },
        {
          path: "/dashboard",
          element: <Private />,
          children: [
            {
              index: true, // 👈 DEFAULT route
              element: <Dashboard />,
            },
            {
              path: "user",
              element: <Dashboard />,
            },
            { path: "profile", element: <Profile /> },
            { path: "orders", element: <Orders /> },
          ],
        },
        {
          path: "/dashboard",
          element: <AdminRoute />,
          children: [
            {
              index: true, // 👈 DEFAULT route
              element: <AdminDashboard />,
            },
            {
              path: "admin",
              element: <AdminDashboard />,
            },
            {
              path: "create-category",
              element: <Create_Category />,
            },
            {
              path: "create-products",
              element: <Create_Products />,
            },
            {
              path: "Users",
              element: <Users />,
            },
            {
              path: "products",
              element: <Product />,
            },
            {
              path: "update-product/:slug",
              element: <Update_Product />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRouter;
