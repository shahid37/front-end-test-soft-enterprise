import "./App.css";
import React, { useState } from "react";
import { Form, Layout, Select, theme } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddNewVechicle from "./pages/addNewVechicle";
import SiderMenu from "./components/siderMenu";

const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{backgroundColor:'',height:"100vh"}}>
        <SiderMenu collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout
          style={{
            marginLeft: "40px",
            marginRight: 30,
          }}
        >
          <Content>
            <Routes>
              <Route
                path="/"
                element={
                  <AddNewVechicle
                    setCollapsed={setCollapsed}
                    collapsed={collapsed}
                  />
                }
              />
              <Route path="/dashboard" element={<>Dashboard</>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
export default App;
