import React, { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { getAllAnnouncements, getAllTrainings } from "@/api/api";

const DashboardUpdates = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [annRes, trainRes] = await Promise.all([
        getAllAnnouncements(),
        getAllTrainings(),
      ]);

      setAnnouncements(Array.isArray(annRes.data) ? annRes.data : []);
      setTrainings(Array.isArray(trainRes.data) ? trainRes.data : []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setAnnouncements([]);
      setTrainings([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-center text-slate-400 py-5">Loading data...</div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-3">Announcements</h2>

        {announcements.length === 0 ? (
          <p className="text-slate-400 text-sm">No announcements available.</p>
        ) : (
          <ul className="space-y-3">
            {announcements.map((a) => (
              <li
                key={a._id}
                className="bg-slate-900 p-3 rounded-lg border border-slate-700"
              >
                <p className="text-white font-medium">{a.title}</p>
                <p className="text-slate-400 text-sm mt-1">{a.message}</p>
                <p className="text-slate-500 text-xs mt-2">
                  {formatDate(a.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-3">Trainings</h2>

        {trainings.length === 0 ? (
          <p className="text-slate-400 text-sm">No trainings available.</p>
        ) : (
          <ul className="space-y-3">
            {trainings.map((t) => (
              <li
                key={t._id}
                className="bg-slate-900 p-3 rounded-lg border border-slate-700"
              >
                <p className="text-white font-medium">{t.title}</p>
                <p className="text-slate-400 text-sm mt-1">{t.description}</p>
                <p className="text-slate-500 text-xs mt-2">
                  Trainer: {t.trainer || "N/A"}
                </p>
                <p className="text-slate-500 text-xs">
                  Date: {formatDate(t.date)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardUpdates;
