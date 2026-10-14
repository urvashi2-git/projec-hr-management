import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { applyLeave } from "@/api/api";


const LeaveApply = ({ onApplied }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.startDate || !formData.endDate || !formData.reason) {
      return setError("All fields are required");
    }
    try {
      setLoading(true);
      await applyLeave(formData);
      setFormData({ startDate: "", endDate: "", reason: "" });
      if (onApplied) onApplied();
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-3">Apply for Leave</h2>

      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-slate-300 text-sm mb-1 block">Start Date</label>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="bg-slate-900 border border-slate-600 text-white placeholder-slate-400 
                   focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex-1">
            <label className="text-slate-300 text-sm mb-1 block">End Date</label>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="bg-slate-900 border border-slate-600 text-white placeholder-slate-400 
                   focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-300 text-sm mb-1 block">Reason</label>
          <Textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason for leave"
            rows="4"
            className="bg-slate-900 border border-slate-600 text-white placeholder-slate-400 
                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className={`w-full rounded-xl py-2 font-semibold transition-all duration-200
      ${loading
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-blue-500/30"
            }`}
        >
          {loading ? "Submitting..." : "Apply Leave"}
        </Button>
      </form>

    </div>
  );
};

export default LeaveApply;
