import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = ({ setIsLogin }) => {
      const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Employee" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", form);
      alert("Registration Successful!");
      navigate('/login')
      setIsLogin(true);
    } catch (err) {
      alert(err.res?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-slate-900 flex flex-col">

    <header className="flex justify-between items-center px-8 py-5 border-b border-slate-800 bg-slate-800/40 backdrop-blur-md">
      <h1 className="text-2xl font-bold tracking-tight text-blue-400">
        HRM Portal
      </h1>
      <Button
        onClick={() => navigate("/login")}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        Login / Register
      </Button>
    </header>

    <div className="flex justify-center items-center grow">
      <Card className="w-full max-w-md bg-slate-800/70 border border-slate-700 shadow-2xl backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white text-center">
            HRM Portal Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-slate-300">Name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="bg-slate-700/40 text-white border-slate-600"
                required
              />
            </div>
            <div>
              <Label className="text-slate-300">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="bg-slate-700/40 text-white border-slate-600"
                required
              />
            </div>
            <div>
              <Label className="text-slate-300">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="bg-slate-700/40 text-white border-slate-600"
                required
              />
            </div>
            <div>
              <Label className="text-slate-300">Role</Label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 bg-slate-700/40 text-white border border-slate-600 rounded-md"
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            <p className="text-slate-400 text-center mt-3">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
);
};

export default Register;
