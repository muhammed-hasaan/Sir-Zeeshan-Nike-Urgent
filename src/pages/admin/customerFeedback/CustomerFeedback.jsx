import React, { useState } from "react";
import { Table, Button, Modal, Input, Space, message, Rate } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const CustomerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      customerName: "John Doe",
      rating: 4,
      comment: "Great product! Highly recommended.",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      rating: 5,
      comment: "Excellent quality and fast delivery.",
    },
    {
      id: 3,
      customerName: "Michael Brown",
      rating: 3,
      comment: "Good product but packaging could be better.",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    customerName: "",
    rating: 0,
    comment: "",
  });

  // Open Add Feedback Modal
  const openModal = () => {
    setNewFeedback({ customerName: "", rating: 0, comment: "" });
    setIsModalVisible(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Handle Add Feedback
  const handleAddFeedback = () => {
    if (
      !newFeedback.customerName ||
      !newFeedback.comment ||
      newFeedback.rating === 0
    ) {
      message.error("All fields are required!");
      return;
    }

    const updatedFeedbacks = [
      ...feedbacks,
      { ...newFeedback, id: feedbacks.length + 1 },
    ];
    setFeedbacks(updatedFeedbacks);
    closeModal();
    message.success("Feedback added successfully!");
  };

  // Handle Delete Feedback
  const handleDelete = (id) => {
    const filteredFeedbacks = feedbacks.filter(
      (feedback) => feedback.id !== id
    );
    setFeedbacks(filteredFeedbacks);
    message.success("Feedback deleted successfully!");
  };

  // Columns for Table
  const columns = [
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    { title: "Comment", dataIndex: "comment", key: "comment" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
          danger
        />
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
        Customer Feedback and Reviews
      </h2>
      <Space style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={openModal}>
          Add Feedback
        </Button>
      </Space>
      <Table
        dataSource={feedbacks}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ x: 768 }}
      />
      <Modal
        title="Add Feedback"
        visible={isModalVisible}
        onCancel={closeModal}
        onOk={handleAddFeedback}
      >
        <div style={{ marginBottom: "10px" }}>
          <Input
            placeholder="Customer Name"
            value={newFeedback.customerName}
            onChange={(e) =>
              setNewFeedback({ ...newFeedback, customerName: e.target.value })
            }
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Rate
            value={newFeedback.rating}
            onChange={(value) =>
              setNewFeedback({ ...newFeedback, rating: value })
            }
          />
        </div>
        <div>
          <TextArea
            rows={4}
            placeholder="Comment"
            value={newFeedback.comment}
            onChange={(e) =>
              setNewFeedback({ ...newFeedback, comment: e.target.value })
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default CustomerFeedback;
