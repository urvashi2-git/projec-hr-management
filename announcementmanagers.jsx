import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createAnnouncement, deleteAnnouncement, getAllAnnouncements, updateAnnouncement } from "@/api/api";

const AnnouncementsManager = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", message: "", targetAudience: "All" });
  const [editing, setEditing] = useState(null);

  const fetchAnnouncements = async () => {
    const res = await getAllAnnouncements();
    setAnnouncements(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateAnnouncement(editing, form);
      setEditing(null);
    } else {
      await createAnnouncement(form);
    }
    setForm({ title: "", message: "", targetAudience: "All" });
    fetchAnnouncements();
  };

  const handleEdit = (a) => {
    setForm({
      title: a.title,
      message: a.message,
      targetAudience: a.targetAudience,
    });
    setEditing(a._id);
  };

  const handleDelete = async (id) => {
    await deleteAnnouncement(id);
    fetchAnnouncements();
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <Card className="bg-slate-800/60 border border-slate-700 p-6 shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold text-white mb-4">Announcements</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-3 py-2 rounded bg-slate-700 text-white"
          required
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-3 py-2 rounded bg-slate-700 text-white"
          required
        ></textarea>
        <select
          value={form.targetAudience}
          onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
          className="px-3 py-2 rounded bg-slate-700 text-white"
        >
          <option value="All">All</option>
          <option value="Employees">Employees</option>
          <option value="Managers">Managers</option>
        </select>
        <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
          {editing ? "Update" : "Create"}
        </Button>
      </form>

      <div className="space-y-3">
        {announcements.map((a) => (
          <Card
            key={a._id}
            className="bg-slate-700/50 border border-slate-600 p-4 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg text-white font-semibold">{a.title}</h3>
                <p className="text-slate-300 text-sm">{a.message}</p>
                <p className="text-slate-400 text-xs mt-1">
                  Target: {a.targetAudience}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400/20"
                  onClick={() => handleEdit(a)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-400 text-red-400 hover:bg-red-400/20"
                  onClick={() => handleDelete(a._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default AnnouncementsManager;
