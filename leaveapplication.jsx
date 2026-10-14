import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllLeaves, updateLeaveStatus } from "@/api/api";

const LeaveApplications = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await getAllLeaves();
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      fetchLeaves();
    } catch (err) {
      console.error("Error updating leave:", err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Leave Applications
      </h2>

      {leaves.length === 0 ? (
        <p className="text-gray-400 text-center">No leave requests found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {leaves.map((leave) => (
            <Card
              key={leave._id}
              className="bg-slate-700/40 border border-slate-600 shadow-lg"
            >
              <CardContent className="p-4 text-gray-200">
                <p>
                  <strong>Employee:</strong>{" "}
                  {leave.user ? (
                    <>
                      {leave.user.name} ({leave.user.email})
                    </>
                  ) : (
                    "Unknown User"
                  )}
                </p>
                <p>
                  <strong>From:</strong>{" "}
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>To:</strong>{" "}
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Reason:</strong> {leave.reason}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      leave.status === "Approved"
                        ? "text-green-400"
                        : leave.status === "Rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    } font-medium`}
                  >
                    {leave.status}
                  </span>
                </p>
                {leave.approverRole && (
                  <p>
                    <strong>Approved/Rejected By:</strong>{" "}
                    <span className="text-blue-400">{leave.approverRole}</span>
                  </p>
                )}

                {leave.status === "Pending" && (
                  <div className="flex gap-2 mt-3">
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleUpdateStatus(leave._id, "Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleUpdateStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveApplications;
