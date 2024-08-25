import {} from "@ant-design/icons";
import {
  Card,
  Col,
  ConfigProvider,
  Form,
  Row,
  theme,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";

import "./index.css";
import { setVehicleImages } from "../../pages/addNewVechicle/slice/vechicleSlice";
import { useDispatch } from "react-redux";

const { Title } = Typography;

export default function AddVehicleImages() {
  const [productForm] = Form.useForm();
  const dispatch = useDispatch();

  const [fileList, setFileList] = useState([]);

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const handleChange = ({ fileList: newFileList }) => {
    // Limit to 6 images
    if (newFileList.length <= 6) {
      setFileList(newFileList);

      // Extract URLs of the images
      const urls = newFileList.map((file) => {
        // If file is not yet uploaded, get the preview URL
        return file.url || URL.createObjectURL(file.originFileObj);
      });
      dispatch(setVehicleImages(urls));
    }
  };

  const beforeUpload = (file) => {
    // You can perform file validation here if necessary
    return false; // Prevent automatic upload
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <div
        style={{
          marginTop: 8,
        }}
      >
        Drag & Drop or choose file to upload
      </div>
      <div
        style={{
          marginTop: 8,
        }}
      >
        Select JPG or PNG
      </div>
    </button>
  );

  const handleRemove = (file) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
  };

  return (
    <Card
      style={{
        marginTop:30,
        minHeight: 350,
        background: "white",
        borderRadius: borderRadiusLG,
      }}
    >
      <Title style={{marginTop:0}} level={5}>Add Vechicle Images</Title>
      <Row>
        <Col span={24}>
          <ConfigProvider
            theme={{
              hashed: true,
              token: {
                controlHeight: 50,
              },
              components: {
                Upload: {
                  style: { width: 200 },
                },
              },
            }}
          >
            <Form form={productForm}>
              <Form.Item>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  fileList={fileList}
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                >
                  {uploadButton}
                </Upload>
              </Form.Item>
            </Form>
          </ConfigProvider>
          <Row gutter={[36, 36]} style={{ marginTop: 16 }}>
            {fileList.map((file, index) => (
              <Col
                key={index}
                style={{
                  position: "relative",
                  width: 70,
                  height: 70,
                  marginRight: 20,
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 10,
                    padding: 10,
                    border: "1px solid #d9d9d9", // Outer border with 1px width
                    overflow: "hidden", // Ensures the image respects the border radius
                  }}
                >
                  <img
                    src={file.url || URL.createObjectURL(file.originFileObj)}
                    alt={`image-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -25,
                    color: "#fff",
                    borderRadius: "10%",
                    cursor: "pointer",
                  }}
                >
                  <img
                    height={15}
                    width={15}
                    src="/cancel.png"
                    alt="cross"
                    onClick={() => handleRemove(file)}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
