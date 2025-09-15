import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import style from "../styling/mainlayoutStyling.module.css";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
