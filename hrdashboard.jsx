import AnnouncementsManager from "@/components/hr/AnnouncementsManager";
import AttendanceSummary from "@/components/hr/AttendanceSummary";
import EmployeeCRUD from "@/components/hr/EmployeeCRUD";
import LeaveApplications from "@/components/hr/LeaveApplications";
import React, { useState } from "react";


const HrDashboard = () => {
  const [activeTab, setActiveTab] = useState("leaves");

  const renderContent = () => {
    switch (activeTab) {
      case "leaves":
        return <LeaveApplications />;
      case "employees":
        return <EmployeeCRUD />;
      case "announcements":
        return <AnnouncementsManager />;
      case "attendance":
        return <AttendanceSummary />;
      default:
        return null;
    }
  };

   const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.href = "/login"; 
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold text-white tracking-wide">HR Portal</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="bg-rose-600 hover:bg-rose-700 transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      
      <div className=" px-6 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">HR Dashboard</h1>

        <div className="flex space-x-3 border-b border-slate-700 mb-6 overflow-x-auto">
          {[
            { id: "leaves", label: "Leave Applications" },
            { id: "employees", label: "Employee Management" },
            { id: "announcements", label: "Announcements" },
            { id: "attendance", label: "Attendance" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-slate-800 text-white border-b-2 border-rose-500"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default HrDashboard;
