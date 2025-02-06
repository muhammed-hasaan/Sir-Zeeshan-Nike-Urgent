import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Space } from "antd";

const { Option } = Select;

const ManagePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Credit Card",
      details: "**** **** **** 1234",
      name: "John Doe",
    },
    { id: 2, type: "PayPal", details: "john.doe@gmail.com", name: "John Doe" },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [form] = Form.useForm();

  const handleAddEdit = (values) => {
    if (editingMethod) {
      // Edit existing payment method
      setPaymentMethods((prev) =>
        prev.map((method) =>
          method.id === editingMethod.id ? { ...method, ...values } : method
        )
      );
    } else {
      // Add new payment method
      const newMethod = { ...values, id: paymentMethods.length + 1 };
      setPaymentMethods((prev) => [...prev, newMethod]);
    }
    setIsModalVisible(false);
    setEditingMethod(null);
    form.resetFields();
  };

  const handleDelete = (id) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
    form.setFieldsValue(method);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Details", dataIndex: "details", key: "details" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Manage Payment Methods
      </h2>

      <Button
        type="primary"
        onClick={() => {
          setIsModalVisible(true);
          setEditingMethod(null);
          form.resetFields();
        }}
        style={{ marginBottom: "20px" }}
      >
        Add Payment Method
      </Button>

      <Table
        dataSource={paymentMethods}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 768 }}
      />

      <Modal
        title={editingMethod ? "Edit Payment Method" : "Add Payment Method"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddEdit}
          initialValues={editingMethod || {}}
        >
          <Form.Item
            name="type"
            label="Payment Type"
            rules={[
              { required: true, message: "Please select a payment type!" },
            ]}
          >
            <Select placeholder="Select Payment Type">
              <Option value="Credit Card">Credit Card</Option>
              <Option value="PayPal">PayPal</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="details"
            label="Payment Details"
            rules={[
              { required: true, message: "Please enter payment details!" },
            ]}
          >
            <Input placeholder="e.g., **** **** **** 1234 or john.doe@gmail.com" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name on Account"
            rules={[{ required: true, message: "Please enter the name!" }]}
          >
            <Input placeholder="e.g., John Doe" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {editingMethod ? "Save Changes" : "Add Method"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagePaymentMethods;
