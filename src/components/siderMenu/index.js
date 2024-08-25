import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function SiderMenu({collapsed, setCollapsed}) {
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const { Sider } = Layout;

  return (
    <div>
      <Sider
        style={{
          backgroundColor: "white",
          borderRight: "1px solid #c6cacd",
          height: "80%",
        }}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="app-icon-style">
          <img height={collapsed ?  40 : 80} width={collapsed ?  40 : 120} alt="car-image" src="./carImage.png" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultValue={3}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            style={{
              backgroundColor: selectedKey === "1" ? "#001529" : "transparent",
              color: selectedKey === "1" ? "#fff" : "#000",
            }}
          >
            <Link to="/">Add New Vehicle</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
