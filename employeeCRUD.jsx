import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "@/api/api";

const EmployeeCRUD = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    salary: "",
    joinDate: "",
    phone: "",
    address: "",
  });
  const [editing, setEditing] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await getAllEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateEmployee(editing, form);
        setEditing(null);
      } else {
        await addEmployee(form);
      }
      setForm({
        name: "",
        email: "",
        department: "",
        position: "",
        salary: "",
        joinDate: "",
        phone: "",
        address: "",
      });
      fetchEmployees();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (emp) => {
    setForm({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      position: emp.position,
      salary: emp.salary,
      joinDate: emp.joinDate?.split("T")[0],
      phone: emp.phone || "",
      address: emp.address || "",
    });
    setEditing(emp._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Card className="bg-slate-800/60 border border-slate-700 p-6 shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold text-white mb-4">
        Employee Management
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-3 py-2 rounded bg-slate-700 text-white"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="px-3 py-2 rounded bg-slate-700 text-white"
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          className="px-3 py-2 rounded bg-slate-700 text-white"
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          className="px-3 py-2 rounded bg-slate-700 text-white"
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          className="px-3 py-2 rounded bg-slate-700 text-white"
          required
        />
        <input
          type="date"
          placeholder="Join Date"
          value={form.joinDate}
          onChange={(e) => setForm({ ...form, joinDate: e.target.value })}
          className="px-3 py-2 rounded bg-slate-700 text-white"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="px-3 py-2 rounded bg-slate-700 text-white"
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="px-3 py-2 rounded bg-slate-700 text-white"
        />

        <Button
          type="submit"
          className="bg-rose-600 hover:bg-rose-700 col-span-full"
        >
          {editing ? "Update Employee" : "Add Employee"}
        </Button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-slate-300">
          <thead className="bg-slate-700 text-slate-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Department</th>
              <th className="p-3">Position</th>
              <th className="p-3">Salary</th>
              <th className="p-3">Join Date</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-b border-slate-700">
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3">{emp.position}</td>
                <td className="p-3">₹{emp.salary}</td>
                <td className="p-3">
                  {new Date(emp.joinDate).toLocaleDateString()}
                </td>
                <td className="p-3">{emp.phone}</td>
                <td className="p-3">{emp.address}</td>
                <td className="p-3 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-400 text-blue-400 hover:bg-blue-400/20"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-400 text-red-400 hover:bg-red-400/20"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default EmployeeCRUD;
