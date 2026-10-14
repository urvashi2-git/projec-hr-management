import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// Employee Routes ::
export const applyLeave = (data) => api.post("/leaves/apply", data);
export const getMyLeaves = () => api.get("/leaves/my");

export const markAttendance = (type) => api.post("/attendance", { type });
export const getMyAttendance = () => api.get("/attendance/my");

export const getAllAnnouncements = () => api.get("/announcements");


// HR Routes::
// Leave Applications
export const getAllLeaves = () => api.get("/leaves");
export const updateLeaveStatus = (id, status) =>
  api.put(`/leaves/${id}/status`, { status });


// Employee CRUD
export const getAllEmployees = () => api.get("/employees");
export const addEmployee = (data) => api.post("/employees", data);
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

// Announcements
export const createAnnouncement = (data) => api.post("/announcements", data);
export const updateAnnouncement = (id, data) =>
  api.put(`/announcements/${id}`, data);
export const deleteAnnouncement = (id) => api.delete(`/announcements/${id}`)
// export const getAllAnnouncements = () => api.get("/announcements");

// Attendance (optional for HR view)
export const getAllAttendance = () => api.get("/attendance");

//Manager
export const getAllTrainings = () => api.get("/trainings");
export const addTraining = (data) => api.post("/trainings", data);
export const updateTraining = (id, data) => api.put(`/trainings/${id}`, data);
export const deleteTraining = (id) => api.delete(`/trainings/${id}`);
