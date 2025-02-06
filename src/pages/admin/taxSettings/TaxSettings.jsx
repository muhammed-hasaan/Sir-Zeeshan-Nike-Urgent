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
  message,
} from "antd";

const { Title } = Typography;

const TaxSettings = () => {
  const [taxRates, setTaxRates] = useState([
    {
      id: 1,
      region: "North America",
      taxType: "VAT",
      rate: 10,
    },
    {
      id: 2,
      region: "Europe",
      taxType: "GST",
      rate: 15,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddTaxRate = (values) => {
    const newRate = {
      id: taxRates.length + 1,
      ...values,
    };
    setTaxRates([...taxRates, newRate]);
    setIsModalVisible(false);
    form.resetFields();
    message.success("Tax rate added successfully!");
  };

  const deleteTaxRate = (id) => {
    setTaxRates((prev) => prev.filter((rate) => rate.id !== id));
    message.success("Tax rate deleted successfully!");
  };

  const columns = [
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Tax Type",
      dataIndex: "taxType",
      key: "taxType",
    },
    {
      title: "Rate (%)",
      dataIndex: "rate",
      key: "rate",
      render: (rate) => `${rate}%`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" danger onClick={() => deleteTaxRate(record.id)}>
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
          Tax Settings
        </Title>
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => setIsModalVisible(true)}
        >
          Add Tax Rate
        </Button>
        <Table
          dataSource={taxRates}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 768 }}
        />
        <Modal
          title="Add Tax Rate"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => form.submit()}
          okText="Add"
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical" onFinish={handleAddTaxRate}>
            <Form.Item
              name="region"
              label="Region"
              rules={[{ required: true, message: "Please enter the region!" }]}
            >
              <Input placeholder="Enter region" />
            </Form.Item>
            <Form.Item
              name="taxType"
              label="Tax Type"
              rules={[{ required: true, message: "Please select a tax type!" }]}
            >
              <Select placeholder="Select a tax type">
                <Select.Option value="VAT">VAT</Select.Option>
                <Select.Option value="GST">GST</Select.Option>
                <Select.Option value="Sales Tax">Sales Tax</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="rate"
              label="Tax Rate (%)"
              rules={[
                { required: true, message: "Please enter the tax rate!" },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                style={{ width: "100%" }}
                placeholder="Enter tax rate"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default TaxSettings;
