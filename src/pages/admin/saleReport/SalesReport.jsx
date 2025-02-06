import React, { useState } from "react";
import { Table, DatePicker, Space, Button } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const SalesReports = () => {
  const [sales, setSales] = useState([
    { id: 1, date: "2024-12-01", product: "Product A", amount: 500 },
    { id: 2, date: "2024-12-05", product: "Product B", amount: 300 },
    { id: 3, date: "2024-12-10", product: "Product C", amount: 450 },
    { id: 4, date: "2024-12-15", product: "Product D", amount: 700 },
    { id: 5, date: "2024-12-20", product: "Product E", amount: 600 },
  ]);

  const [filteredSales, setFilteredSales] = useState(sales);

  const handleFilter = (dates) => {
    if (!dates || dates.length === 0) {
      setFilteredSales(sales);
      return;
    }

    const [start, end] = dates;
    const filtered = sales.filter((sale) =>
      moment(sale.date).isBetween(moment(start), moment(end), "day", "[]")
    );
    setFilteredSales(filtered);
  };

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Product", dataIndex: "product", key: "product" },
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
        Sales Reports
      </h2>

      <Space
        direction="vertical"
        size="large"
        style={{ display: "flex", marginBottom: "20px" }}
      >
        <RangePicker onChange={(dates) => handleFilter(dates)} />
        <Button type="primary" onClick={() => setFilteredSales(sales)}>
          Reset Filters
        </Button>
      </Space>

      <Table
        dataSource={filteredSales}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 768 }}
      />
    </div>
  );
};

export default SalesReports;
