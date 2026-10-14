import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAllTrainings, updateTraining, deleteTraining, addTraining } from "@/api/api";


const TrainingManagement = () => {
  const [trainings, setTrainings] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    trainer: "",
    assignedTo: "",
  });
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const res = await getAllTrainings();
      setTrainings(res.data);
    } catch (err) {
      console.error("Error fetching trainings:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTraining(editingId, form);
      } else {
        await addTraining(form)
      }
      setForm({
        title: "",
        description: "",
        date: "",
        trainer: "",
        assignedTo: "",
      });
      setEditingId(null);
      fetchTrainings();
    } catch (err) {
      console.error("Error submitting training:", err);
    }
  };

  const handleEdit = (training) => {
    setEditingId(training._id);
    setForm({
      title: training.title,
      description: training.description,
      date: training.date.split("T")[0],
      trainer: training.trainer,
      assignedTo: training.assignedTo?._id || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTraining(id);
      fetchTrainings();
    } catch (err) {
      console.error("Error deleting training:", err);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Training & Development
      </h2>

      {/* Create/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/70 border border-slate-700 p-6 rounded-2xl shadow-lg space-y-4 backdrop-blur-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Training Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="bg-slate-700 text-white placeholder:text-slate-400 border-slate-600 focus:border-blue-500 focus:ring-0"
          />
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="bg-slate-700 text-white placeholder:text-slate-400 border-slate-600 focus:border-blue-500 focus:ring-0"
          />
        </div>

        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="bg-slate-700 text-white placeholder:text-slate-400 border-slate-600 focus:border-blue-500 focus:ring-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Trainer Name"
            value={form.trainer}
            onChange={(e) => setForm({ ...form, trainer: e.target.value })}
            required
            className="bg-slate-700 text-white placeholder:text-slate-400 border-slate-600 focus:border-blue-500 focus:ring-0"
          />
          <Input
            placeholder="Assign To (Employee ID)"
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            className="bg-slate-700 text-white placeholder:text-slate-400 border-slate-600 focus:border-blue-500 focus:ring-0"
          />
        </div>

        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 w-full text-white py-2 rounded-lg"
        >
          {editingId ? "Update Training" : "Create Training"}
        </Button>
      </form>

      {/* List of Trainings */}
      {trainings.length === 0 ? (
        <p className="text-gray-400 text-center">No training sessions found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trainings.map((t) => (
            <Card
              key={t._id}
              className="bg-slate-800/70 border border-slate-700 shadow-lg rounded-xl hover:border-blue-500 transition-all duration-200"
            >
              <CardContent className="p-4 text-gray-200 space-y-2">
                <h3 className="font-semibold text-lg text-white">
                  {t.title}
                </h3>
                <p className="text-sm text-slate-400">{t.description}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  <span className="text-slate-200">
                    {new Date(t.date).toLocaleDateString("en-IN")}
                  </span>
                </p>
                <p>
                  <strong>Trainer:</strong>{" "}
                  <span className="text-slate-200">{t.trainer}</span>
                </p>
                <p>
                  <strong>Assigned To:</strong>{" "}
                  <span className="text-slate-200">
                    {t.assignedTo?.name || "N/A"}
                  </span>
                </p>
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => handleEdit(t)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingManagement;
