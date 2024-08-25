import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Form,
  Layout,
  message,
  Typography,
  Select,
} from "antd";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { increment } from "./slice/vechicleSlice";
import "./index.css";
import AddVehicleImages from "../../components/AddVehicleImages";
import AddNewVechicleQuestionnaire from "../../components/AddNewVechicleQuestionnaire";

const { Header } = Layout;

export default function AddNewVechicle({ collapsed, setCollapsed }) {
  const dispatch = useDispatch();

  const [faqForm] = Form.useForm();
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 6 },
  };

  const onFinish = (values) => {};

  const vehicleData = useSelector((state) => state.vehicleSlice);

  return (
    <div style={{ paddingBottom: 50, height: "100%" }}>
      <Header
        style={{
          height: 100,
          background: "white",
          borderBottom: "1px solid #c6cacd",
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      >
        {vehicleData.count === 0 ? (
          <Form
            form={faqForm}
            layout="vertical"
            {...layout}
            onFinish={onFinish}
          >
            <Form.Item
              style={{ marginLeft: 25 }}
              name="city"
              label="City"
              required
            >
              <Select
                showSearch
                placeholder="Select"
                optionFilterProp="label"
                onChange={onChange}
                title="City"
                onSearch={onSearch}
                options={[
                  {
                    value: "lahore",
                    label: "Lahore",
                  },
                  {
                    value: "karachi",
                    label: "Karachi",
                  },
                  {
                    value: "islamabad",
                    label: "Islamabad",
                  },
                  {
                    value: "faisalabad",
                    label: "Faisalabad",
                  },
                  {
                    value: "kasur",
                    label: "Kasur",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        ) : (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        )}
      </Header>
      <BreadcrumbComp />
      {vehicleData?.count === 0 ? (
        <AddVehicleImages />
      ) : (
        <AddNewVechicleQuestionnaire />
      )}
      {vehicleData?.count === 0 && (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#26266b",
              fontSize: 20,
            },
          }}
        >
          <Button
            className="btn-style"
            type="primary"
            onClick={() => {
              if (vehicleData.vehicleImages.length === 6) {
                dispatch(increment());
              } else {
                message.error("Please add 6 vehicle images!");
              }
            }}
          >
            Save and Continue
          </Button>
        </ConfigProvider>
      )}
    </div>
  );
}

const BreadcrumbComp = () => {
  const vehicleData = useSelector((state) => state.vehicleSlice);

  return (
    <div style={{ marginTop: 20 }}>
      {vehicleData.count >= 1 ? (
        <Typography.Title style={{ marginTop: 0, marginBottom: 0 }} level={4}>
          Add New Vehicle
        </Typography.Title>
      ) : (
        <></>
      )}
      {vehicleData.count >= 1 ? (
        <Breadcrumb
          style={{
            margin: "0px 0 20px",
          }}
        >
          <Breadcrumb.Item>Vehicle</Breadcrumb.Item>
          <Breadcrumb.Item>Add New Vehicle</Breadcrumb.Item>
        </Breadcrumb>
      ) : (
        <></>
      )}
    </div>
  );
};
