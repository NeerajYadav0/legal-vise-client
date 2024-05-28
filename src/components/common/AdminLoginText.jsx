import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginText = () => {
  const navigate = useNavigate();
  const [showTest, setShowTest] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "q") {
        setShowTest((prevShowTest) => !prevShowTest);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`cursor-pointer hover:text-richblack-50 transition-all duration-200 
        ${
          showTest
            ? "border-l border-r border-richblack-700 pr-3 pl-3"
            : "border-r border-richblack-700"
        }`}
    >
      {showTest && (
        <div
          className="test"
          onClick={() => {
            navigate("/admin_login");
          }}
        >
          Admin Login
        </div>
      )}
    </div>
  );
};

export default AdminLoginText;
