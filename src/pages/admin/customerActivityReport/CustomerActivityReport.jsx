import React, { useState } from "react";
import { Table, DatePicker, Space, Button } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const CustomerActivityReports = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      totalOrders: 5,
      totalSpent: 1500,
      lastActivity: "2024-12-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      totalOrders: 3,
      totalSpent: 900,
      lastActivity: "2024-12-03",
    },
    {
      id: 3,
      name: "Alice Brown",
      totalOrders: 7,
      totalSpent: 2300,
      lastActivity: "2024-12-05",
    },
    {
      id: 4,
      name: "Bob Johnson",
      totalOrders: 2,
      totalSpent: 500,
      lastActivity: "2024-12-07",
    },
    {
      id: 5,
      name: "Eve Black",
      totalOrders: 6,
      totalSpent: 1800,
      lastActivity: "2024-12-10",
    },
  ]);

  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  const handleFilter = (dates) => {
    if (!dates || dates.length === 0) {
      setFilteredCustomers(customers);
      return;
    }

    const [start, end] = dates;
    const filtered = customers.filter((customer) =>
      moment(customer.lastActivity).isBetween(
        moment(start),
        moment(end),
        "day",
        "[]"
      )
    );
    setFilteredCustomers(filtered);
  };

  const columns = [
    { title: "Customer ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Total Orders", dataIndex: "totalOrders", key: "totalOrders" },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (value) => `$${value}`,
    },
    { title: "Last Activity", dataIndex: "lastActivity", key: "lastActivity" },
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
        Customer Activity Reports
      </h2>

      <Space
        direction="vertical"
        size="large"
        style={{ display: "flex", marginBottom: "20px" }}
      >
        <RangePicker onChange={(dates) => handleFilter(dates)} />
        <Button type="primary" onClick={() => setFilteredCustomers(customers)}>
          Reset Filters
        </Button>
      </Space>

      <Table
        dataSource={filteredCustomers}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 768 }}
      />
    </div>
  );
};

export default CustomerActivityReports;
