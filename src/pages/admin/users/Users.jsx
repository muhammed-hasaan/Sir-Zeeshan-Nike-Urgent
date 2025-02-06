import React, { useState } from "react";
import { Table, Modal, Button, Space, Popconfirm, notification } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      purchases: [
        { id: 101, name: "Laptop", date: "2024-12-01", amount: "$1200" },
        { id: 102, name: "Smartphone", date: "2024-12-10", amount: "$800" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      purchases: [
        { id: 103, name: "Headphones", date: "2024-11-15", amount: "$200" },
      ],
    },
    {
      id: 3,
      name: "Mike Brown",
      email: "mike@example.com",
      role: "User",
      purchases: [],
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isPurchaseModalVisible, setIsPurchaseModalVisible] = useState(false);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsUserModalVisible(true);
  };

  const handleViewPurchases = (user) => {
    setSelectedUser(user);
    setIsPurchaseModalVisible(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    notification.success({
      message: "User Deleted",
      description: `User with ID ${id} has been successfully deleted.`,
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewUser(record)}
          >
            View
          </Button>
          <Button
            type="default"
            icon={<ShoppingCartOutlined />}
            onClick={() => handleViewPurchases(record)}
            disabled={record.purchases.length === 0}
          >
            Purchases
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const purchaseColumns = [
    {
      title: "Purchase ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        User Management
      </h1>

      {/* User Table */}
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 768 }} // Enables horizontal scroll for mobile
      />

      {/* Modal for Viewing User Details */}
      <Modal
        title="User Details"
        open={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsUserModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedUser ? (
          <div>
            <p>
              <strong>ID:</strong> {selectedUser.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
          </div>
        ) : (
          <p>No user selected.</p>
        )}
      </Modal>

      {/* Modal for Viewing Purchase History */}
      <Modal
        title="Purchase History"
        open={isPurchaseModalVisible}
        onCancel={() => setIsPurchaseModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsPurchaseModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedUser && selectedUser.purchases.length > 0 ? (
          <Table
            columns={purchaseColumns}
            dataSource={selectedUser.purchases}
            rowKey="id"
            pagination={false}
            scroll={{ x: 768 }}
          />
        ) : (
          <p>No purchases found for this user.</p>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
