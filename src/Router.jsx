import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminHome from "./pages/admin/home/adminHome";
import AddProduct from "./pages/admin/addProduct/AddProduct";
import AdminLayout from "./layout/adminLayout";
import UserManagement from "./pages/admin/users/Users";
import Order from "./pages/admin/orders/Orders";
import Products from "./pages/admin/products/Products";
import CustomerFeedback from "./pages/admin/customerFeedback/CustomerFeedback";
import SalesReports from "./pages/admin/saleReport/SalesReport";
import OrderStatusReports from "./pages/admin/orderStatusReport/OrderStatusReport";
import CustomerActivityReports from "./pages/admin/customerActivityReport/CustomerActivityReport";
import ManagePaymentMethods from "./pages/admin/managePaymentMethod/ManagePaymentMethods";
import PaymentHistoryAndRefunds from "./pages/admin/paymentHistoryAndRefunds/PaymentHistoryAndRefunds";
import DiscountCodes from "./pages/admin/discountCodes/DiscountCodes";
import PromotionsOffers from "./pages/admin/promotionsOffers/PromotionsOffers";
import GeneralSettings from "./pages/admin/generalSettings/GeneralSettings";
import ShippingSettings from "./pages/admin/shippingSettings/ShippingSettings";
import TaxSettings from "./pages/admin/taxSettings/TaxSettings";
import Login from "./pages/auth/login/Login";


const isActive = localStorage.getItem('isActive')

const router = createBrowserRouter([
 isActive === 'true' ?  {
    path: "/admin",
    // element: <PrivateRoute element={<AdminLayout/>} allowIsActive={['true']}/>,
    element:<AdminLayout/>,
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "orders",
        element: <Order />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "customer-feedback",
        element: <CustomerFeedback />,
      },
      {
        path: "sales-reports",
        element: <SalesReports />,
      },
      {
        path: "order-status-report",
        element: <OrderStatusReports />,
      },
      {
        path: "customer-activity-report",
        element: <CustomerActivityReports />,
      },
      {
        path: "manage-payment-methods",
        element: <ManagePaymentMethods />,
      },
      {
        path: "payment-history-refunds",
        element: <PaymentHistoryAndRefunds />,
      },
      {
        path: "discount-codes",
        element: <DiscountCodes />,
      },
      {
        path: "promotions-offers",
        element: <PromotionsOffers />,
      },
      {
        path: "settings",
        children: [
          {
            path: "general",
            element: <GeneralSettings />,
          },
          {
            path: "shipping",
            element: <ShippingSettings />,
          },
          {
            path: "tax",
            element: <TaxSettings />,
          },
        ],
      },
    ],
  }:
  {
    path: "/",
    element: <Login />,
  },
]);

const Router = () => {

  return (
    <RouterProvider router={router}/>
  );
};

export default Router;
