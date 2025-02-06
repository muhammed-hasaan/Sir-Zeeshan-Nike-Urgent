import React, { useState } from "react";
import { Form, Input, Select, Button, Typography, Card, message } from "antd";

const { Title } = Typography;

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    storeName: "My E-Commerce Store",
    currency: "USD",
    timezone: "UTC",
  });

  const [form] = Form.useForm();

  const handleSave = (values) => {
    setSettings(values);
    message.success("Settings updated successfully!");
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <Card style={{ maxWidth: 600, margin: "0 auto" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          General Settings
        </Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={settings}
          onFinish={handleSave}
        >
          <Form.Item
            name="storeName"
            label="Store Name"
            rules={[
              { required: true, message: "Please enter the store name!" },
            ]}
          >
            <Input placeholder="Enter store name" />
          </Form.Item>

          <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true, message: "Please select a currency!" }]}
          >
            <Select>
              <Select.Option value="USD">USD - US Dollar</Select.Option>
              <Select.Option value="EUR">EUR - Euro</Select.Option>
              <Select.Option value="PKR">PKR - Pakistani Rupee</Select.Option>
              <Select.Option value="INR">INR - Indian Rupee</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="timezone"
            label="Timezone"
            rules={[{ required: true, message: "Please select a timezone!" }]}
          >
            <Select>
              <Select.Option value="UTC">UTC</Select.Option>
              <Select.Option value="PST">
                PST - Pacific Standard Time
              </Select.Option>
              <Select.Option value="EST">
                EST - Eastern Standard Time
              </Select.Option>
              <Select.Option value="PKT">
                PKT - Pakistan Standard Time
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default GeneralSettings;
