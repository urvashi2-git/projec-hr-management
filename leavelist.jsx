import React from "react";
import { formatDate } from "@/utils/formatDate";

const LeaveList = ({ leaves = [] }) => {
  const getStatusColor = (status) => {
    if (status === "Approved") return "bg-green-200 text-green-900";
    if (status === "Rejected") return "bg-red-200 text-red-900";
    return "bg-yellow-200 text-yellow-900";
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-3">My Leaves</h2>

      {leaves.length === 0 ? (
        <p className="text-slate-400 text-sm">No leave applications yet.</p>
      ) : (
        <ul className="space-y-3">
          {leaves.map((leave) => (
            <li
              key={leave._id}
              className="flex justify-between items-start bg-slate-900 p-3 rounded-lg border border-slate-700"
            >
              <div>
                <p className="font-medium text-white">
                  {formatDate(leave.startDate)} → {formatDate(leave.endDate)}
                </p>
                <p className="text-slate-400 text-sm mt-1">{leave.reason}</p>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-md ${getStatusColor(
                  leave.status
                )}`}
              >
                {leave.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeaveList;
