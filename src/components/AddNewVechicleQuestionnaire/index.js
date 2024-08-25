import {
  Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  theme,
  Typography,
} from "antd";

import React, { useEffect, useState } from "react";

import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  setVehicleAdditionalInfo,
  setVehicleFeature,
  setVehicleInsuranceInfo,
  setVehicleRentalInformation,
} from "../../pages/addNewVechicle/slice/vechicleSlice";
import { verifyObject } from "../../utills/helpers";
import moment from "moment";

const steps = [
  {
    title: "Vehicle Information",
  },
  {
    title: "Features",
  },
  {
    title: "Rental Information",
  },
  {
    title: "Insurance Info",
  },
  {
    title: "Damages",
  },
  {
    title: "Others",
  },
];

export default function AddNewVechicleQuestionnaire() {
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const vehicleData = useSelector((state) => state.vehicleSlice);

  const contentStyle = {
    lineHeight: "160px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: "white",
    borderRadius: token.borderRadiusLG,
    border:
      vehicleData.count === 4
        ? "1px solid rgba(0, 0, 0, 0.05)"
        : `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Recursive function to render keys and values
  const renderObject = (obj, indent = 0) => {
    return Object.entries(obj).map(([key, value]) => {
      if (key === "count") {
        return null; // Skip rendering the 'count' key
      }

      const isNestedObject = typeof value === "object" && value !== null;
      const isDate = value instanceof Date || !isNaN(Date.parse(value));

      return (
        <div key={key} style={{ marginLeft: indent * 20 }}>
          <strong>{key}:</strong>{" "}
          {isNestedObject && !isDate
            ? renderObject(value, indent + 1)
            : isDate
            ? new Date(value).toISOString().split("T")[0] // Format date as YYYY-MM-DD
            : value}
        </div>
      );
    });
  };

  return (
    <Card
      style={{
        minHeight: 400,
        background: "#f9f9f9",
      }}
    >
      <Stepper steps={steps} currentStep={vehicleData.count} />
      <div style={contentStyle}>
        {vehicleData.count === 1 ? (
          <div className="feature-div-style">
            <FeatureComponent dispatch={dispatch} />
          </div>
        ) : vehicleData.count === 2 ? (
          <div className="feature-div-style">
            <Row gutter={40}>
              <RentalPrice dispatch={dispatch} />
            </Row>
          </div>
        ) : vehicleData.count === 3 ? (
          <Row gutter={40}>
            <InsuranceInfo dispatch={dispatch} />
          </Row>
        ) : vehicleData.count === 4 ? (
          <VehicleDamage dispatch={dispatch} />
        ) : (
          <AdditionalInfo dispatch={dispatch} />
        )}
      </div>
      <Row
        style={{
          marginTop: 24,
        }}
      >
        <Col span={8}>
          <Button className="back-btn" onClick={() => dispatch(decrement())}>
            Back
          </Button>
        </Col>
        <Col span={8} offset={8}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#26266b",
                fontSize: 20,
              },
            }}
          >
            <Button
              style={{ float: "right" }}
              type="primary"
              onClick={() => {
                if (vehicleData.count === 1) {
                  if (vehicleData.vehicleFeature.length > 0) {
                    dispatch(increment());
                  } else {
                    message.error("Please select atleast one feature");
                  }
                }
                if (vehicleData.count === 2) {
                  if (vehicleData.rentalInfo !== null) {
                    dispatch(increment());
                  } else {
                    message.error("Please select atleast one option");
                  }
                }
                if (vehicleData.count === 3) {
                  if (
                    vehicleData.insuranceInfo !== null &&
                    verifyObject(vehicleData.insuranceInfo)
                  ) {
                    dispatch(increment());
                  } else {
                    message.error("Please fill all fields!");
                  }
                }
                if (vehicleData.count === 4) {
                  dispatch(increment());
                }
                if (vehicleData.count === 5) {
                  if (vehicleData.vehicleAdditionalInfo !== null) {
                    showModal();
                  } else {
                    message.error("Please add additional notes");
                  }
                }
              }}
            >
              Save and Continue
            </Button>
          </ConfigProvider>
        </Col>
      </Row>
      <Modal
        title="Final Object Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>{renderObject(vehicleData)}</div>
      </Modal>
    </Card>
  );
}

const FeatureComponent = ({ dispatch }) => {
  const [selected, setSelected] = useState([]);

  const handleButtonClick = (value) => {
    setSelected((prevSelected) => {
      const result = prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value];
      dispatch(setVehicleFeature(result));
      return result;
    });
  };

  return (
    <Row gutter={40}>
      <>
        {["GPS", "Air Conditioning", "Bluetooth", "Child Seat"].map((item) => {
          return (
            <Col className="gutter-row" span={6}>
              <ConfigProvider theme={{ token: { controlHeight: 45 } }}>
                <Button
                  style={{ width: "100%" }}
                  type={selected.includes(item) ? "primary" : "default"}
                  onClick={() => handleButtonClick(item)}
                >
                  <Typography.Text
                    level={4}
                    style={{
                      color: selected.includes(item) ? "white" : "black",
                      fontWeight: selected.includes(item) ? "bold" : 500,
                    }}
                  >
                    {item}
                  </Typography.Text>
                </Button>
              </ConfigProvider>
            </Col>
          );
        })}
      </>
    </Row>
  );
};

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="stepper-container">
      <ol className="stepper">
        {steps.map((item, index) => (
          <li
            key={index}
            className={`step ${index <= currentStep ? "completed" : ""} ${
              currentStep === index ? "active" : ""
            }`}
          >
            <div className="circle">{index + 1}</div>
            <div
              className={
                currentStep >= index ? "step-title-completed" : "step-title"
              }
            >
              {item.title}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

const RentalPrice = ({ dispatch }) => {
  const [selected, setSelected] = useState([]);

  const handleButtonClick = (value) => {
    setSelected((prevSelected) => {
      const result = prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value];
      dispatch(setVehicleRentalInformation(result));
      return result;
    });
  };

  return (
    <Row gutter={[16, 16]} justify="center" align="middle" style={{ width:"100%"}}>
      {["$46", "$156", "$284", "$834"].map((item) => {
        return (
          <Col
            key={item}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            className="gutter-row"
          >
            <ConfigProvider theme={{ token: { controlHeight: 45 } }}>
              <Button
                className="left-align-button"
                type={selected.includes(item) ? "primary" : "default"}
                onClick={() => handleButtonClick(item)}
                block
              >
                <Typography.Text
                  level={4}
                  className="left-align-button-text"
                  style={{
                    color: selected.includes(item) ? "white" : "black",
                    fontWeight: selected.includes(item) ? "bold" : 500,
                  }}
                >
                  {item}
                </Typography.Text>
              </Button>
            </ConfigProvider>
          </Col>
        );
      })}
    </Row>
  );
};

const InsuranceInfo = ({ dispatch }) => {
  const [insuranceform] = Form.useForm();

  const disablePastDates = (current) => {
    return current && current < moment().endOf("day");
  };

  return (
    <Form form={insuranceform} layout="vertical">
      <Row gutter={80} style={{ height: 160, alignItems: "center" }}>
        <Col className="gutter-row" span={6}>
          <Form.Item
            layout="vertical"
            label="Insurance Policy No"
            name="insurancePolicyNo"
            className="input-style"
          >
            <Input
              onChange={() => {
                const values = insuranceform.getFieldsValue();
                dispatch(setVehicleInsuranceInfo(values));
              }}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            layout="vertical"
            label="Insurance Provider"
            name="insuranceProvider"
            className="input-style"
          >
            <Input
              onChange={() => {
                const values = insuranceform.getFieldsValue();
                dispatch(setVehicleInsuranceInfo(values));
              }}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            layout="vertical"
            label="Insurance Expiry Date"
            name="insuranceExpiryDate"
            className="input-style"
          >
            <DatePicker
              disabledDate={disablePastDates}
              onChange={() => {
                const values = insuranceform.getFieldsValue();
                dispatch(setVehicleInsuranceInfo(values));
              }}
              placeholder="dd-mm-yyyy"
              style={{ width: 200 }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const AdditionalInfo = ({ dispatch }) => {
  const [insuranceform] = Form.useForm();

  return (
    <div className="additinal-notes-style">
      <Form form={insuranceform} layout="vertical">
        <Form.Item
          layout="vertical"
          label="Any Additional Notes"
          name="additinalNotes"
          className="text-area-input-style"
          placeholder="Any Additional Notes"
        >
          <Input.TextArea
            onChange={() => {
              const values = insuranceform.getFieldsValue();
              dispatch(setVehicleAdditionalInfo(values.additinalNotes));
            }}
            rows={4}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

const VehicleDamage = () => {
  const [viewMode, setViewMode] = useState("exterior");

  const handleButtonClick = (value) => {
    setViewMode(value);
  };

  return (
    <Row>
      <Col span={12}>
        <Card className="vehicle-card">
          <Row className="btn-wrapper">
            <Col span={8}>
              <Button
                onClick={() => {
                  handleButtonClick("exterior");
                }}
              >
                <Radio
                  style={{
                    color: viewMode === "exterior" ? "#26266b" : "black",
                    fontWeight: viewMode === "exterior" ? 700 : 500,
                  }}
                  checked={viewMode === "exterior" ? true : false}
                >
                  Exterior
                </Radio>
              </Button>
            </Col>
            <Col span={8}>
              <Button
                onClick={() => {
                  handleButtonClick("interior");
                }}
              >
                <Radio
                  style={{
                    color: viewMode === "interior" ? "#26266b" : "black",
                    fontWeight: viewMode === "interior" ? 700 : 500,
                  }}
                  checked={viewMode === "interior" ? true : false}
                >
                  Interior
                </Radio>
              </Button>
            </Col>
          </Row>

          <img src={"/car.png"} alt="Car" className="car-image" />
        </Card>
      </Col>
      <Col span={12}>
        <div
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography.Title level={4}>No</Typography.Title>
          <Typography.Title level={4}>Damage Type</Typography.Title>
          <Typography.Title level={4}>Degree</Typography.Title>
        </div>
        <div style={{ marginTop: 150 }}>
          <Typography.Text style={{ fontSize: 20, lineHeight: 0 }}>
            {`Tap on the vehicle's part to add damage`}
          </Typography.Text>
        </div>
      </Col>
    </Row>
  );
};
