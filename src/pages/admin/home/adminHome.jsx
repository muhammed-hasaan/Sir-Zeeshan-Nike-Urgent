// import React from "react";
// import { Card, Col, Row, Statistic } from "antd";
// import { Line } from "@ant-design/charts";
// import {
//   UserOutlined,
//   ShoppingCartOutlined,
//   DollarOutlined,
// } from "@ant-design/icons";

// const AdminHome = () => {
//   // Sample data for the graph
//   const data = [
//     { month: "Jan", sales: 30 },
//     { month: "Feb", sales: 50 },
//     { month: "Mar", sales: 80 },
//     { month: "Apr", sales: 70 },
//     { month: "May", sales: 100 },
//     { month: "Jun", sales: 90 },
//   ];

//   // Configuration for the graph
//   const config = {
//     data,
//     xField: "month",
//     yField: "sales",
//     smooth: true,
//     color: "#1890ff",
//     point: {
//       size: 5,
//       shape: "circle",
//     },
//     tooltip: {
//       showMarkers: true,
//     },
//   };

//   return (
//     <div style={{ padding: "20px", background: "#f4f4f4", minHeight: "100vh" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//         Admin Dashboard
//       </h2>

//       {/* Summary Section */}
//       <Row gutter={[16, 16]} justify="center">
//         <Col xs={24} sm={12} md={8} lg={6}>
//           <Card>
//             <Statistic
//               title="Total Users"
//               value={1200}
//               prefix={<UserOutlined />}
//               valueStyle={{ color: "#3f8600" }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={8} lg={6}>
//           <Card>
//             <Statistic
//               title="Orders"
//               value={350}
//               prefix={<ShoppingCartOutlined />}
//               valueStyle={{ color: "#1890ff" }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={8} lg={6}>
//           <Card>
//             <Statistic
//               title="Revenue"
//               value="$25,000"
//               prefix={<DollarOutlined />}
//               valueStyle={{ color: "#cf1322" }}
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* Graph Section */}
//       <Row justify="center" style={{ marginTop: "40px" }}>
//         <Col xs={24} sm={22} md={20} lg={16}>
//           <Card title="Monthly Sales Performance" bordered={false}>
//             <Line {...config} />
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default AdminHome;

import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminHome = () => {
  // Sample data for the chart
  const data = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 5000, revenue: 4300 },
    { month: "Apr", sales: 4780, revenue: 2900 },
    { month: "May", sales: 5890, revenue: 3800 },
    { month: "Jun", sales: 4390, revenue: 2400 },
    { month: "Jul", sales: 5490, revenue: 3100 },
  ];

  return (
    <div
      style={{
        padding: "24px",
        background: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "24px",
          marginBottom: "24px",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Admin Dashboard
      </h1>

      {/* Cards Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              background: "#007bff",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Statistic
              title="Total Users"
              value={1200}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              background: "#28a745",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Statistic
              title="Total Orders"
              value={300}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              background: "#ffc107",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Statistic
              title="Revenue"
              value={45000}
              prefix={<DollarCircleOutlined />}
              precision={2}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              background: "#dc3545",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Statistic
              title="Pending Tickets"
              value={5}
              prefix={<BellOutlined />}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Graph Section */}
      <div style={{ marginTop: "24px" }}>
        <h3
          style={{
            fontSize: "20px",
            marginBottom: "16px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Sales and Revenue Overview
        </h3>
        <Card
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#007bff"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#28a745" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
