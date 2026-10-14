import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Briefcase, Users, CalendarCheck, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Employee Management",
      desc: "Manage employee records, roles, and information efficiently.",
    },
    {
      icon: <CalendarCheck className="h-8 w-8 text-green-500" />,
      title: "Attendance & Leave",
      desc: "Track attendance and handle leave approvals easily.",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-yellow-500" />,
      title: "HR & Manager Tools",
      desc: "Handle team announcements, performance, and training modules.",
    },
    {
      icon: <Award className="h-8 w-8 text-pink-500" />,
      title: "Employee Growth",
      desc: "Monitor performance and assign development trainings.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">

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

      <section className="flex flex-col items-center text-center mt-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
        >
          Empower Your Workforce with <span className="text-blue-500">HRM Portal</span>
        </motion.h1>
        <p className="text-slate-400 max-w-2xl mb-8">
          A smart Human Resource Management platform designed to simplify attendance tracking,
          leave management, employee records, and communication across teams.
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/register")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Get Started
        </Button>
      </section>

      {/* Feature Section */}
      <section className="mt-20 px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="bg-slate-800/60 border border-slate-700 hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-700/20 rounded-2xl">
              <CardHeader className="flex flex-col items-center justify-center space-y-3">
                {item.icon}
                <CardTitle className="text-lg font-semibold text-center text-white">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-center text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-20 py-6 border-t border-slate-800 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} HRM Portal — Empowering Teams, Simplifying Workflows.
      </footer>
    </div>
  );
};

export default Home;
