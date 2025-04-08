import { ChevronDown, ChevronRight, MapPin, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HeaderComponent = ({sidebarOpen,setSidebarOpen}) => {
    const [subcategories, setSubcategories] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    fetch("/data.json") // Assuming your JSON file is in the public folder
      .then((response) => response.json())
      .then((data) => {
        // Extract unique subcategories
        const uniqueSubcategories = Array.from(
          new Map(
            data.categories[0].subcategories.map((sub) => [sub.id, sub])
          ).values()
        );
        setSubcategories(uniqueSubcategories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
  <header className="bg-white shadow-md p-4">
    <div className="flex justify-between items-center">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <button className="md:hidden">
          {/* {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />} */}
        </button>
        {/* <img src="/logo.png" alt="Logo" className="h-8" /> */}
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <input type="text" placeholder="Search for Products..." className="w-full p-2 border rounded-lg" />
      </div>
      
      {/* Right Side Buttons */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 bg-gray-200 p-2 rounded-lg">
          <MapPin className="w-5 h-5" />
          <span>Select Location</span>
        </button>
        <button className="bg-black text-white px-4 py-2 rounded-lg">Login / Sign Up</button>
        <button className="bg-red-500 text-white p-2 rounded-lg">
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>

    {/* Secondary Navigation Bar */}
    <div className="flex items-center space-x-2 mt-2 border-t pt-2">
    {subcategories.map((subcategory) => (
        <div key={subcategory.id} className="bg-white shadow rounded-full pl-2 pr-2 py-1 border border-gray-200 hover:shadow-md transition">
      <a className="text-gray-700 hover:text-green-600 cursor-pointer" onClick={() => navigate(`/mobile/${subcategory.id}`)}>{subcategory.labelName}</a>
          {/* <h2 className="text-xl font-semibold text-gray-800">{subcategory.name}</h2> */}
        </div>
      ))}
     
    </div>
  </header>
  )
}

export default HeaderComponent
