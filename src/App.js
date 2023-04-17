import React from "react";
import { Switch, Route, Link, Routes } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  Cryptodetails,
  Send,Balance
} from "./components";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage></Homepage>}></Route>
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              ></Route>
              <Route
                exact
                path="/crypto/:coinId"
                element={<Cryptodetails />}
              ></Route>
              <Route exact path="/news" element={<News />}></Route>
              <Route exact path="/send" element={<Send/>}></Route>
              <Route exact path="/balance" element={<Balance/>}></Route>
            </Routes>
          </div>
        </Layout>

        
      </div>
    </div>
  );
};

export default App;
