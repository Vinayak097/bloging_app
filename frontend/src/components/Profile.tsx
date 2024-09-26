import React, { useState } from 'react';

const ProfileDropdown = (dp:any) => {
    console.log("dp ",dp)
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicked outside
  const handleClickOutside = (event:any) => {
    if (!event.target.closest(".profile-dropdown")) {
      setIsOpen(false);
    }
  };

  // Add event listener for outside click
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative profile-dropdown">
      {/* Avatar/Profile Icon */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        <img 
          src={dp? dp:"https://via.placeholder.com/40"} 
          alt="Profile" 
          className="rounded-full w-10 h-10" 
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <ul className="py-1 text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
