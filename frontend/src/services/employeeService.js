import api from "../api/axios";

export const getEmployees = () => api.get("/employees");

export const createEmployee = (employee) => api.post("/employees", employee);

export const updateEmployee = (employeeId, employee) => api.put(`/employees/${employeeId}`, employee);

export const deleteEmployee = (employeeId) => api.delete(`/employees/${employeeId}`);
