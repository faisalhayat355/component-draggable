import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./common/Layout";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/workspace" element={<MainPage />} />
        </Routes>
      </Layout>
    </>
  );
}
