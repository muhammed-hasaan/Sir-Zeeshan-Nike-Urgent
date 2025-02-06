import React, { useState } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Typography,
  Space,
  message,
} from "antd";

const { Title } = Typography;

const ShippingSettings = () => {
  const [shippingZones, setShippingZones] = useState([
    {
      id: 1,
      zoneName: "North America",
      shippingMethod: "Flat Rate",
      cost: 20,
    },
    {
      id: 2,
      zoneName: "Europe",
      shippingMethod: "Free Shipping",
      cost: 0,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddZone = (values) => {
    const newZone = {
      id: shippingZones.length + 1,
      ...values,
    };
    setShippingZones([...shippingZones, newZone]);
    setIsModalVisible(false);
    form.resetFields();
    message.success("Shipping zone added successfully!");
  };

  const deleteZone = (id) => {
    setShippingZones((prev) => prev.filter((zone) => zone.id !== id));
    message.success("Shipping zone deleted successfully!");
  };

  const columns = [
    {
      title: "Zone Name",
      dataIndex: "zoneName",
      key: "zoneName",
    },
    {
      title: "Shipping Method",
      dataIndex: "shippingMethod",
      key: "shippingMethod",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      render: (cost) => `$${cost}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" danger onClick={() => deleteZone(record.id)}>
          Delete
        </Button>
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
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Shipping Settings
        </Title>
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => setIsModalVisible(true)}
        >
          Add Shipping Zone
        </Button>
        <Table
          dataSource={shippingZones}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 768 }}
        />
        <Modal
          title="Add Shipping Zone"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => form.submit()}
          okText="Add"
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical" onFinish={handleAddZone}>
            <Form.Item
              name="zoneName"
              label="Zone Name"
              rules={[{ required: true, message: "Please enter a zone name!" }]}
            >
              <Input placeholder="Enter shipping zone name" />
            </Form.Item>
            <Form.Item
              name="shippingMethod"
              label="Shipping Method"
              rules={[
                { required: true, message: "Please select a shipping method!" },
              ]}
            >
              <Select placeholder="Select a method">
                <Select.Option value="Flat Rate">Flat Rate</Select.Option>
                <Select.Option value="Free Shipping">
                  Free Shipping
                </Select.Option>
                <Select.Option value="Local Pickup">Local Pickup</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="cost"
              label="Shipping Cost"
              rules={[
                { required: true, message: "Please enter the shipping cost!" },
              ]}
            >
              <InputNumber
                min={0}
                prefix="$"
                style={{ width: "100%" }}
                placeholder="Enter shipping cost"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ShippingSettings;
