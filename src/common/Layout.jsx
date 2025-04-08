// src/Layout.jsx
import { AlignJustify, AlignLeft, LayoutGrid, UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const [activeMenu, setActiveMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("selectedItem");
    if (stored) setSelectedItem(stored);

    const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
    setCollapsed(isCollapsed);
  }, []);

  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState.toString());
  };

  const handleSelect = (key, path) => {
    setSelectedItem(key);
    localStorage.setItem("selectedItem", key);
    navigate("/workspace", { state: { widget: key } });
    setShowSidebar(false); // close on mobile
  };

  const ArrowIcon = ({ isOpen }) => (
    <svg
      className={`w-4 h-4 transition-transform transform ${
        isOpen ? "rotate-90" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const menuItemClass = (key) =>
    `block px-2 py-1 rounded hover:bg-gray-100 whitespace-nowrap overflow-hidden ${
      selectedItem === key ? "bg-blue-100 text-blue-700 font-semibold" : ""
    }`;

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Backdrop for mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white shadow-lg fixed md:static z-50 h-full overflow-y-auto transition-all duration-300 ${
          showSidebar ? "left-0" : "-left-full"
        } md:left-0 top-0 md:block`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className={`font-bold text-xl ${collapsed ? "hidden" : "block"}`}>MyApp</span>
          <div
            onClick={toggleCollapse}
            className="text-gray-500 md:block hidden cursor-pointer"
          >
            {collapsed ? <AlignLeft size={22} className="ml-3"/>  : <AlignJustify size={22}/>}
          </div>
        </div>

        <nav className="p-4 space-y-2 text-sm">
          {/* Dashboard */}
          <div
            onClick={() => handleSelect("dashboard", "/workspace")}
            className={`cursor-pointer w-full text-left p-2 rounded hover:bg-gray-200 font-medium flex items-center ${
              selectedItem === "dashboard" ? "bg-blue-100 text-blue-700 font-semibold" : ""
            }`}
          >
            <span className="w-6 flex justify-center"><LayoutGrid size={19}/></span>
            {!collapsed && <span className="ml-2">Dashboard</span>}
          </div>

          {/* Users */}
          <div>
            <div
              onClick={() =>
                setActiveMenu((prev) => (prev === "Users" ? "" : "Users"))
              }
              className="cursor-pointer w-full flex items-center justify-between p-2 rounded hover:bg-gray-200 font-medium"
            >
              <span className="flex items-center">
              <span className="w-6 flex justify-center "><UserRound size={19}/></span>
                {!collapsed && <span className="ml-2">Users</span>}
              </span>
              {!collapsed && <ArrowIcon isOpen={activeMenu === "Users"} />}
            </div>

            {activeMenu === "Users" && !collapsed && (
              <div className="pl-6 mt-1 space-y-1 text-sm">
                <div
                  onClick={() => handleSelect("users", "/workspace")}
                  className={menuItemClass("users")}
                  href="#"
                >
                  User List
                </div>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-0">
        {/* Header */}
        <header className="bg-white shadow px-4 py-4 flex items-center justify-between md:justify-end">
          {/* Mobile: Logo + Hamburger */}
          <div className="flex items-center justify-between w-full md:hidden">
            <span className="text-lg font-bold">MyApp</span>
            <div
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-gray-700 focus:outline-none"
            >
              ☰
            </div>
          </div>

          {/* Desktop: Page Title + Welcome */}
          <div className="hidden md:flex justify-between w-full items-center">
            <h1 className="text-2xl font-semibold capitalize">
              {selectedItem?.replace("_", " ") || "Dashboard"}
            </h1>
            <span className="text-sm text-gray-500">Welcome, User</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
