import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LeaveApplications from "@/components/manager/LeaveApplications";
import TrainingManagement from "@/components/manager/TrainingManagement";

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("leave");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <nav className="w-full bg-slate-800/70 border-b border-slate-700 backdrop-blur-md flex items-center justify-between px-6 py-4 shadow-md">
        <h1 className="text-2xl font-semibold text-white tracking-wide">
          Manager Dashboard
        </h1>
        <Button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </Button>
      </nav>

      <div className="flex justify-center items-start flex-1 p-6">
        <Card className="w-full max-w-6xl bg-slate-800/60 border border-slate-700 shadow-2xl backdrop-blur-md mt-4">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white text-center">
              Welcome Back, Manager
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full mt-4"
            >
              <TabsList className="grid grid-cols-2 bg-slate-700/50 rounded-lg">
                <TabsTrigger
                  value="leave"
                  className="text-white data-[state=active]:bg-blue-600"
                >
                  Leave Applications
                </TabsTrigger>
                <TabsTrigger
                  value="training"
                  className="text-white data-[state=active]:bg-green-600"
                >
                  Training & Development
                </TabsTrigger>
              </TabsList>

              <TabsContent value="leave" className="mt-6">
                <LeaveApplications />
              </TabsContent>

              <TabsContent value="training" className="mt-6">
                <TrainingManagement />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;
