import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="loading">
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
              color: "#000",
            }}
            spin
          />
        }
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "var(--main-color1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
        fullscreen
      />
    </div>
  );
};

export default Loading;
