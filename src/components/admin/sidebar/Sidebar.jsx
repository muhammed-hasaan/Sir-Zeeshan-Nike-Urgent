import "./sidebar.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  MessageOutlined,
  BarChartOutlined,
  FileTextOutlined,
  TeamOutlined,
  CreditCardOutlined,
  HistoryOutlined,
  PercentageOutlined,
  GiftOutlined,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [activeOpt, setActiveOpt] = useState("");
  const [offsetY, setOffsetY] = useState(0);

  const handleClick = (opt) => {
    setActiveOpt(opt);
    navigate(`/${opt}`)
  };

  const navigationPages = [
    {
      name: "Dashboard",
      icon: <HomeOutlined className="optIcon" />,
      path: "",
    },
    {
      name: "Add Product",
      icon: <PlusOutlined className="optIcon" />,
      path: "add-product",
    },
    {
      name: "Products",
      icon: <AppstoreOutlined className="optIcon" />,
      path: "products",
    },
    {
      name: "Users",
      icon: <UserOutlined className="optIcon" />,
      path: "users",
    },
    {
      name: "Orders",
      icon: <ShoppingCartOutlined className="optIcon" />,
      path: "orders",
    },
    {
      name: "Feedback",
      icon: <MessageOutlined className="optIcon" />,
      path: "customer-feedback",
    },
    {
      name: "Sales Reports",
      icon: <BarChartOutlined className="optIcon" />,
      path: "sales-reports",
    },
    {
      name: "Order Report",
      icon: <FileTextOutlined className="optIcon" />,
      path: "order-status-report",
    },
    {
      name: "Customer Activity",
      icon: <TeamOutlined className="optIcon" />,
      path: "customer-activity-report",
    },
    {
      name: "Payment Methods",
      icon: <CreditCardOutlined className="optIcon" />,
      path: "manage-payment-methods",
    },
    {
      name: "Payment History",
      icon: <HistoryOutlined className="optIcon" />,
      path: "payment-history-refunds",
    },
    {
      name: "Discount Codes",
      icon: <PercentageOutlined className="optIcon" />,
      path: "discount-codes",
    },
    {
      name: "Promotions Offers",
      icon: <GiftOutlined className="optIcon" />,
      path: "promotions-offers",
    },
  ];

  useEffect(() => {
    const currentPath = window.location.pathname;

    let matchedPath = "";
    navigationPages.forEach((e) => {
      if (currentPath === `/${e.path}`) {
        matchedPath = e.path;
      }
    });

    setActiveOpt(matchedPath);
  }, []);

  useEffect(() => {
    const updateOffset = () => {
      const activeElement = document.querySelector(".opt.active");
      if (activeElement) {
        setOffsetY(activeElement.offsetTop);
      } else {
        setOffsetY(null);
      }
    };

    const timeout = setTimeout(updateOffset, 0);
    return () => clearTimeout(timeout);
  }, [activeOpt]);

  useEffect(() => {
    setOpen(false);
  }, [offsetY]);

  const logout = () => {
    localStorage.setItem('isActive','false')
    navigate('/login')
  }
  
  return (
    <div className="SidebarLayout">
      <div className={open ? "sidebar open" : "sidebar"}>
        <div className="dashboardNavigation">
          <div className="animatedOpt" style={{ top: offsetY + "px" }}>
            <div className="animatedOptText">Animate</div>
          </div>

          {navigationPages?.map((element, index) => {
            return (
              <div
                key={index}
                className={activeOpt === element.path ? "opt active" : "opt"}
                onClick={() => handleClick(element.path)}
              >
                {element.icon}
                <p className={open ? "optText" : "optText none"}>
                  {element.name}
                </p>
              </div>
            );
          })}
        </div>

        <div
          className="opt logout"
          onClick={logout
          }
        >
          <LogoutOutlined className="optIcon" />
          <p className={open ? "optText" : "optText none"}>Logout</p>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminSidebar;
