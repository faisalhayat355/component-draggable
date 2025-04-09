import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./common/Layout";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Layout>
        <Routes>
          <Route path="/workspace" element={<MainPage />} />
        </Routes>
      </Layout>
    </div>
  );
}
