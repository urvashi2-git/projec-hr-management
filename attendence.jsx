import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { getMyAttendance, markAttendance } from "@/api/api";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todayRecord, setTodayRecord] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getMyAttendance();
      const data =
        Array.isArray(res.data) ? res.data :
        Array.isArray(res.data?.data) ? res.data.data : [];

      console.log("Normalized Attendance Data:", data);
      setRecords(data);

      const today = new Date().toISOString().split("T")[0];
      const record = data.find(
        (rec) => rec.date.split("T")[0] === today
      );
      setTodayRecord(record || null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAttendance = async (type) => {
    try {
      setLoading(true);
      await markAttendance(type);
      await fetchAttendance();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderButton = () => {
    if (loading) {
      return (
        <Button disabled className="rounded-xl">
          Processing...
        </Button>
      );
    }

    if (!todayRecord) {
      return (
        <Button onClick={() => handleMarkAttendance("checkin")} className="rounded-xl">
          Mark Attendance
        </Button>
      );
    }

    if (todayRecord && !todayRecord.checkOutTime) {
      return (
        <Button onClick={() => handleMarkAttendance("checkout")} className="rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black">
          Check Out
        </Button>
      );
    }

    return (
      <Button disabled className="rounded-xl bg-green-700">
        Checked Out
      </Button>
    );
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Attendance</h2>
        {renderButton()}
      </div>

      {records.length === 0 ? (
        <p className="text-slate-400 text-sm">No attendance records yet.</p>
      ) : (
        <ul className="divide-y divide-slate-700">
          {records.map((rec) => (
            <li key={rec._id} className="flex justify-between py-2">
              <div className="flex flex-col">
                <span className="text-white">{formatDate(rec.date)}</span>
                <span className="text-xs text-slate-400">
                  {rec.checkInTime && `In: ${rec.checkInTime}`}{" "}
                  {rec.checkOutTime && `| Out: ${rec.checkOutTime}`}
                </span>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-md ${
                  rec.status === "Present"
                    ? "bg-green-200 text-green-900"
                    : "bg-red-200 text-red-900"
                }`}
              >
                {rec.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Attendance;

