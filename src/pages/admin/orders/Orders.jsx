
import  { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Select,
  Tabs,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { useLoaderData } from "react-router-dom";

const Order = () => {
  const Orders = useLoaderData()?.data; // Data fetched from loader
  const [orders, setOrders] = useState(Orders); // Set the orders from the loader data
  const [selectedTab, setSelectedTab] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Filter orders based on status// Filter orders based on status
  const completedOrders = orders?.filter(
    (order) => order.status && order.status?.trim()?.toLowerCase() === "completed"
  );
  const pendingOrders = orders?.filter(
    (order) => order.status && order.status?.trim()?.toLowerCase() === "pending"
  );

  const totalOrders = 11;


  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Customer",
      dataIndex: "customerDetails",
      key: "customerDetails",
      render: (customerDetails) => customerDetails?.name,
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt)?.toLocaleDateString(),
    },
    {
      title: "Product",
      dataIndex: "products",
      key: "products",
      render: (products) => products[0]?.name, // Assuming only one product per order
    },
    {
      title: "Amount",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (subtotal) => `$${subtotal?.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Button icon={<EditOutlined />}  />
      ),
    },
  ];

  const filteredOrders =
    selectedTab === "all"
      ? orders
      : selectedTab === "completed"
      ? completedOrders
      : pendingOrders;

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <h1
        style={{ textAlign: "center", fontSize: "24px", marginBottom: "24px" }}
      >
        Order Management
      </h1>

      {/* Progress Summary */}
      <Row
        gutter={16}
        style={{
          marginBottom: "24px",
          background: "#fff",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Col xs={24} sm={8} style={{ textAlign: "center" }}>
          <Tag color="blue">{totalOrders} Total Orders</Tag>
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: "center" }}>
          <Tag color="green">{completedOrders?.length} Completed</Tag>
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: "center" }}>
          <Tag color="orange">{pendingOrders?.length} Pending</Tag>
        </Col>
      </Row>

      {/* Tabs */}
      <Tabs
        defaultActiveKey="all"
        onChange={(key) => setSelectedTab(key)}
        style={{ marginBottom: "24px" }}
      >
        <Tabs.TabPane tab="Total Orders" key="all" />
        <Tabs.TabPane tab="Completed" key="completed" />
        <Tabs.TabPane tab="Pending" key="pending" />
      </Tabs>

      {/* Orders Table */}
      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 768 }}
      />

      {/* Modal for Editing Order */}
      <Modal
        title="Edit Order Status"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={{ status: editingOrder?.status }}
          // onFinish={handleStatusUpdate}
        >
          <Form.Item name="status" label="Order Status">
            <Select>
              <Select.Option value="Completed">Completed</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Status
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Order;
