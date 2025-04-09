import {
  AlignJustify,
  AlignLeft,
  LayoutGrid,
  Plus,
  UserRound,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../assets/BBplusLogo-BzP5im7S.svg";
import MobileLogo from "../assets/bbplus_logo_collapse.svg";
import FeaturedCollectionConfig from "./FeaturedCollectionConfig";
import HeaderComponent from "./HeaderComponent";

const sectionList = [
  "Featured collection",
  "Featured product",
  "Collection list",
  "Rich text",
  "Image with text",
  "Image banner",
  "Slideshow",
  "Collage",
  "Multicolumn",
  "Collapsible content",
  "Email signup",
  "Contact form",
  "Video",
];

export default function Layout({ children }) {
  const [activeMenu, setActiveMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Collage");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("selectedItem");
    if (stored) setSelectedItem(stored);

    const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
    setCollapsed(isCollapsed);

    const storedSection = localStorage.getItem("selectedSection");
    if (storedSection) setSelectedSection(storedSection);
  }, []);

  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState.toString());
  };

  const handleSelect = (key) => {
    setSelectedItem(key);
    localStorage.setItem("selectedItem", key);
    navigate("/workspace", { state: { widget: key } });
    setShowSidebar(false);
  };

  const ArrowIcon = ({ isOpen }) => (
    <svg
      className={`w-4 h-4 transition-transform transform ${isOpen ? "rotate-90" : "rotate-0"}`}
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
    <div className="flex flex-col h-screen">
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <HeaderComponent />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${collapsed ? "w-20" : "w-64"} bg-white text-black dark:bg-gray-900 dark:text-white shadow-lg fixed md:static z-50 h-full overflow-y-auto transition-all duration-300 ${
            showSidebar ? "left-0" : "-left-full"
          } md:left-0 top-0 md:block`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/">
              <span className={`font-bold text-xl ${collapsed ? "hidden" : "block"}`}>
                <img src={Logo} alt="Logo" className="h-9" />
              </span>
            </Link>
            <div
              onClick={toggleCollapse}
              className="text-gray-600 md:block hidden cursor-pointer transition-all duration-200 hover:text-black"
            >
              {collapsed ? (
                <div className="flex items-center gap-3">
                <Link to="/">
                  <img src={MobileLogo} alt="Logo" className="h-10 w-auto ml-2" />
                </Link>
                  {/* <AlignLeft size={22} /> */}
                </div>
              ) : (
                <AlignJustify size={22} />
              )}
            </div>
          </div>

          <nav className="p-4 space-y-2 text-sm">
            <div
              onClick={() => handleSelect("dashboard")}
              className={`cursor-pointer w-full text-left p-2 rounded hover:bg-gray-200 font-medium flex items-center ${
                selectedItem === "dashboard"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : ""
              }`}
            >
              <span className="w-6 flex justify-center">
                <LayoutGrid size={19} />
              </span>
              {!collapsed && <span className="ml-2">Dashboard</span>}
            </div>

            <div>
              <div
                onClick={() => setActiveMenu((prev) => (prev === "Users" ? "" : "Users"))}
                className="cursor-pointer w-full flex items-center justify-between p-2 rounded hover:bg-gray-200 font-medium"
              >
                <span className="flex items-center">
                  <span className="w-6 flex justify-center">
                    <UserRound size={19} />
                  </span>
                  {!collapsed && <span className="ml-2">Users</span>}
                </span>
                {!collapsed && <ArrowIcon isOpen={activeMenu === "Users"} />}
              </div>

              {activeMenu === "Users" && !collapsed && (
                <div className="cursor-pointer pl-6 mt-1 space-y-1 text-sm">
                  <div onClick={() => handleSelect("users")} className={menuItemClass("users")}>
                    User List
                  </div>
                </div>
              )}
            </div>

            <div onClick={() => setShowModal(true)}>
              <div className={`cursor-pointer w-full text-left p-2 rounded hover:bg-gray-200 font-medium flex items-center`}>
                <span className="w-6 flex justify-center">
                  <Plus size={19} />
                </span>
                {!collapsed && <span className="ml-2">Add New Section</span>}
              </div>
            </div>
          </nav>
        </aside>

        {/* Hover-triggered hamburger icon when collapsed */}
        {collapsed && (
          <div className="group fixed top-5 left-0 z-50 hidden md:block">
            <div className="w-4 h-16 bg-transparent group-hover:w-10 transition-all duration-300" />

            <div
              onClick={toggleCollapse}
              className="ml-11 absolute top-12 left-full transform -translate-x-1/2 p-2 bg-white shadow-md rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <AlignLeft size={18} className="text-gray-700 hover:text-black" />
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-5xl h-[80vh] flex overflow-hidden relative">
              <div
                onClick={() => setShowModal(false)}
                className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
              >
                <X size={20} />
              </div>
              <div className="w-1/3 border-r overflow-y-auto p-4 bg-gray-50">
                <h3 className="text-base font-semibold mb-4">Sections</h3>
                <ul className="space-y-2 text-sm">
                  {sectionList.map((section, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setSelectedSection(section);
                        localStorage.setItem("selectedSection", section);
                        setShowModal(false);
                        handleSelect(section);
                      }}
                      className={`cursor-pointer px-3 py-2 rounded transition ${
                        selectedSection === section
                          ? "bg-blue-100 font-medium text-blue-700"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {section}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">{selectedSection}</h2>
                <div className="bg-white border rounded-lg shadow-sm p-4 flex gap-4">
                  <div className="w-2/3 bg-gray-100 h-56 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10l4.553 4.553a1.5 1.5 0 01-1.06 2.56H5.507a1.5 1.5 0 01-1.06-2.56L9 10m3-6v12"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-sm">
                    <div>
                      <p className="font-medium">Example product title</p>
                      <p className="text-gray-500 mt-1">Rs. 1,199</p>
                    </div>
                    <div className="text-blue-600 font-medium mt-2 cursor-pointer">
                      Your collection's name →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <aside className="overflow-y-auto">
          <FeaturedCollectionConfig />
        </aside>
      </div>
    </div>
  );
}
