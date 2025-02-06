import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
  Switch,
  Typography,
  message,
} from "antd";
import moment from "moment";

const { Text } = Typography;
const { RangePicker } = DatePicker;

const PromotionsOffers = () => {
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      title: "Summer Sale",
      description: "Get 20% off on all items!",
      validity: ["2024-07-01", "2024-07-31"],
      status: "Active",
    },
    {
      id: 2,
      title: "Winter Discounts",
      description: "Exclusive 15% discount on jackets.",
      validity: ["2024-12-01", "2024-12-15"],
      status: "Inactive",
    },
  ]);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCreatePromotion = (values) => {
    const newPromotion = {
      id: promotions.length + 1,
      ...values,
      validity: values.validity.map((date) => date.format("YYYY-MM-DD")),
      status: "Active",
    };
    setPromotions([...promotions, newPromotion]);
    setCreateModalVisible(false);
    form.resetFields();
    message.success("Promotion created successfully!");
  };

  const toggleStatus = (id) => {
    setPromotions((prev) =>
      prev.map((promo) =>
        promo.id === id
          ? {
              ...promo,
              status: promo.status === "Active" ? "Inactive" : "Active",
            }
          : promo
      )
    );
  };

  const deletePromotion = (id) => {
    setPromotions((prev) => prev.filter((promo) => promo.id !== id));
    message.success("Promotion deleted successfully!");
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Validity",
      dataIndex: "validity",
      key: "validity",
      render: (validity) => `${validity[0]} to ${validity[1]}`,
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
          <Button type="link" danger onClick={() => deletePromotion(record.id)}>
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
        Promotions and Offers
      </h2>

      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => setCreateModalVisible(true)}
      >
        Create New Promotion
      </Button>

      <Table
        dataSource={promotions}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 768 }}
      />

      <Modal
        title="Create Promotion"
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={() => form.submit()}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" onFinish={handleCreatePromotion}>
          <Form.Item
            name="title"
            label="Promotion Title"
            rules={[
              { required: true, message: "Please enter a promotion title!" },
            ]}
          >
            <Input placeholder="Enter promotion title (e.g., Summer Sale)" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <Input.TextArea placeholder="Enter promotion description" />
          </Form.Item>
          <Form.Item
            name="validity"
            label="Validity Period"
            rules={[
              { required: true, message: "Please select the validity period!" },
            ]}
          >
            <RangePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PromotionsOffers;
