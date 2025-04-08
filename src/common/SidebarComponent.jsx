import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "lucide-react"; // Icon for Electronics

const SidebarComponent = ({ isOpen }) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <nav className="p-4">
      <ul className="space-y-4">
        {isOpen ? (
          // Show full category list when sidebar is open
          data.categories.map((category) => (
            <li className="cursor-pointer flex items-center space-x-3 hover:text-gray-700 transition" key={category.id}
              onClick={() => navigate(`/category/${category.id}`)}>
              {/* <List size={24} /> */}
              <span>{category.name}</span>
            </li>
          ))
        ) : (
          // Always show only the Electronics icon when sidebar is collapsed
          <li className="cursor-pointer flex items-center justify-center hover:text-gray-300 transition"
            onClick={() => navigate("/category/electronics")}>
            <List size={24} />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SidebarComponent;
