import React, { useState } from "react";
import { Table, Select, DatePicker, Space, Button } from "antd";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const OrderStatusReports = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2024-12-01",
      customer: "John Doe",
      status: "Pending",
      amount: 150,
    },
    {
      id: 2,
      date: "2024-12-03",
      customer: "Jane Smith",
      status: "Shipped",
      amount: 250,
    },
    {
      id: 3,
      date: "2024-12-05",
      customer: "Alice Brown",
      status: "Delivered",
      amount: 300,
    },
    {
      id: 4,
      date: "2024-12-07",
      customer: "Bob Johnson",
      status: "Pending",
      amount: 400,
    },
    {
      id: 5,
      date: "2024-12-10",
      customer: "Eve Black",
      status: "Delivered",
      amount: 500,
    },
  ]);

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [statusFilter, setStatusFilter] = useState(null);

  const handleFilter = (dates, status) => {
    let filtered = [...orders];
    if (dates && dates.length > 0) {
      const [start, end] = dates;
      filtered = filtered.filter((order) =>
        moment(order.date).isBetween(moment(start), moment(end), "day", "[]")
      );
    }
    if (status) {
      filtered = filtered.filter((order) => order.status === status);
    }
    setFilteredOrders(filtered);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    handleFilter(null, value);
  };

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (value) => `$${value}`,
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
        Order Status Reports
      </h2>

      <Space
        direction="vertical"
        size="large"
        style={{ display: "flex", marginBottom: "20px" }}
      >
        <Space>
          <RangePicker
            onChange={(dates) => handleFilter(dates, statusFilter)}
            style={{ marginRight: "10px" }}
          />
          <Select
            placeholder="Filter by Status"
            onChange={handleStatusChange}
            allowClear
            style={{ width: 200 }}
          >
            <Option value="Pending">Pending</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Delivered">Delivered</Option>
          </Select>
        </Space>
        <Button
          type="primary"
          onClick={() => {
            setFilteredOrders(orders);
            setStatusFilter(null);
          }}
        >
          Reset Filters
        </Button>
      </Space>

      <Table
        dataSource={filteredOrders}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 768 }}
      />
    </div>
  );
};

export default OrderStatusReports;
