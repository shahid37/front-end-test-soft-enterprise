import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";

import "./index.css";
import App from "./App";
import store from "./store";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#26266b",
          controlHeight: 45, // For example, setting the height to 48px
          colorBgContainer: '#f0f0f0', // Default background color for default buttons
        },
        components:{
          Button:{token:{
          }}
        }
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
