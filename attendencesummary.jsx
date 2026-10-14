import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getAllAttendance } from "@/api/api";

const AttendanceSummary = () => {
  const [records, setRecords] = useState([]);

  const fetchAttendance = async () => {
    const res = await getAllAttendance();
    setRecords(res.data);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <Card className="bg-slate-800/60 border border-slate-700 p-6 shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold text-white mb-4">Attendance Records</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-slate-300">
          <thead className="bg-slate-700 text-slate-200">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Date</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id} className="border-b border-slate-700">
                <td className="p-3">{r.user?.name}</td>
                <td className="p-3">{new Date(r.date).toLocaleDateString()}</td>
                <td className="p-3">{r.checkInTime || "—"}</td>
                <td className="p-3">{r.checkOutTime || "—"}</td>
                <td className="p-3">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AttendanceSummary;
