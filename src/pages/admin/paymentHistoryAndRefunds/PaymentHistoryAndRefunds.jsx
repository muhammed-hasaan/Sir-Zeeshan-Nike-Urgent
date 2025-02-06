import React, { useState } from "react";
import { Table, Button, Modal, Typography, Space } from "antd";

const { Text } = Typography;

const PaymentHistoryAndRefunds = () => {
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      date: "2024-12-01",
      amount: 150.0,
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-12-05",
      amount: 300.0,
      method: "PayPal",
      status: "Refunded",
    },
    {
      id: 3,
      date: "2024-12-10",
      amount: 120.0,
      method: "Bank Transfer",
      status: "Completed",
    },
  ]);

  const [refundModalVisible, setRefundModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleRefund = (payment) => {
    setSelectedPayment(payment);
    setRefundModalVisible(true);
  };

  const confirmRefund = () => {
    setPaymentHistory((prev) =>
      prev.map((payment) =>
        payment.id === selectedPayment.id
          ? { ...payment, status: "Refunded" }
          : payment
      )
    );
    setRefundModalVisible(false);
    setSelectedPayment(null);
  };

  const columns = [
    { title: "Payment ID", dataIndex: "id", key: "id" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (value) => `$${value.toFixed(2)}`,
    },
    { title: "Payment Method", dataIndex: "method", key: "method" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Text type={status === "Refunded" ? "danger" : "success"}>
          {status}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          disabled={record.status === "Refunded"}
          onClick={() => handleRefund(record)}
        >
          Refund
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Payment History and Refunds
      </h2>

      <Table
        dataSource={paymentHistory}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 768 }}
      />

      <Modal
        title="Confirm Refund"
        visible={refundModalVisible}
        onCancel={() => setRefundModalVisible(false)}
        onOk={confirmRefund}
        okText="Confirm"
        cancelText="Cancel"
      >
        {selectedPayment && (
          <div>
            <p>
              Are you sure you want to refund the payment of{" "}
              <Text strong>${selectedPayment.amount.toFixed(2)}</Text> made on{" "}
              <Text strong>{selectedPayment.date}</Text>?
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentHistoryAndRefunds;
