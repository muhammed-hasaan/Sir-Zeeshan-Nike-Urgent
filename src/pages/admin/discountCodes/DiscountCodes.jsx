import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Switch,
  Typography,
  message,
} from "antd";

const { Text } = Typography;

const DiscountCodes = () => {
  const [discountCodes, setDiscountCodes] = useState([
    { id: 1, code: "SAVE10", discount: 10, status: "Active" },
    { id: 2, code: "WELCOME20", discount: 20, status: "Disabled" },
  ]);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCreateDiscountCode = (values) => {
    const newCode = {
      id: discountCodes.length + 1,
      ...values,
      status: "Active",
    };
    setDiscountCodes([...discountCodes, newCode]);
    setCreateModalVisible(false);
    form.resetFields();
    message.success("Discount code created successfully!");
  };

  const toggleStatus = (id) => {
    setDiscountCodes((prev) =>
      prev.map((code) =>
        code.id === id
          ? {
              ...code,
              status: code.status === "Active" ? "Disabled" : "Active",
            }
          : code
      )
    );
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Code", dataIndex: "code", key: "code" },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
      render: (value) => `${value}%`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Text type={status === "Active" ? "success" : "danger"}>{status}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Switch
            checked={record.status === "Active"}
            onChange={() => toggleStatus(record.id)}
          />
          <Button
            type="link"
            danger
            onClick={() => deleteDiscountCode(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const deleteDiscountCode = (id) => {
    setDiscountCodes((prev) => prev.filter((code) => code.id !== id));
    message.success("Discount code deleted successfully!");
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create and Manage Discount Codes
      </h2>

      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => setCreateModalVisible(true)}
      >
        Create New Discount Code
      </Button>

      <Table
        dataSource={discountCodes}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 768 }}
      />

      <Modal
        title="Create Discount Code"
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={() => form.submit()}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" onFinish={handleCreateDiscountCode}>
          <Form.Item
            name="code"
            label="Discount Code"
            rules={[
              { required: true, message: "Please enter a discount code!" },
            ]}
          >
            <Input placeholder="Enter discount code (e.g., SAVE10)" />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount Percentage"
            rules={[
              {
                required: true,
                message: "Please enter a discount percentage!",
              },
              {
                type: "number",
                min: 1,
                max: 100,
                message: "Enter a value between 1 and 100!",
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter discount percentage (e.g., 20)"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DiscountCodes;
