const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

let fallbackUsers = [];
let fallbackEmployees = [];

const isMongoReady = () => mongoose.connection.readyState === 1;

const seedFallbackData = async () => {
  if (fallbackUsers.length === 0) {
    const hashedPassword = await bcrypt.hash("admin1234", 10);
    fallbackUsers.push({
      _id: "demo-admin",
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  if (fallbackEmployees.length === 0) {
    fallbackEmployees.push(
      {
        _id: "demo-employee-1",
        employeeId: "EMP001",
        name: "John Carter",
        email: "john.carter@example.com",
        phone: "+1-555-0101",
        department: "Engineering",
        designation: "Senior Developer",
        salary: 95000,
        joiningDate: "2023-01-15",
        address: "New York, USA",
        status: "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: "demo-employee-2",
        employeeId: "EMP002",
        name: "Emma Watson",
        email: "emma.watson@example.com",
        phone: "+1-555-0102",
        department: "HR",
        designation: "HR Manager",
        salary: 78000,
        joiningDate: "2022-09-10",
        address: "London, UK",
        status: "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );
  }
};

const ensureDefaultAdminUser = async () => {
  const User = require("../models/User");
  const existingAdmin = await User.findOne({ email: "admin@example.com" });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin1234", 10);
    return User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "Admin",
    });
  }

  return existingAdmin;
};

const findUserByEmail = async (email) => {
  if (!isMongoReady()) {
    await seedFallbackData();
    return fallbackUsers.find((user) => user.email === email) || null;
  }

  const User = require("../models/User");
  const user = await User.findOne({ email });

  if (!user && email === "admin@example.com") {
    return ensureDefaultAdminUser();
  }

  return user;
};

const createUserRecord = async (userData) => {
  if (!isMongoReady()) {
    await seedFallbackData();
    const newUser = {
      _id: `user-${Date.now()}`,
      ...userData,
      password: await bcrypt.hash(userData.password, 10),
      role: userData.role || "Employee",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fallbackUsers.push(newUser);
    return newUser;
  }

  const User = require("../models/User");
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return User.create({ ...userData, password: hashedPassword });
};

const getAllEmployees = async () => {
  if (!isMongoReady()) {
    await seedFallbackData();
    return fallbackEmployees;
  }

  const Employee = require("../models/Employee");
  return Employee.find();
};

const getEmployeeByIdRecord = async (employeeId) => {
  if (!isMongoReady()) {
    await seedFallbackData();
    return fallbackEmployees.find((employee) => employee._id.toString() === employeeId.toString()) || null;
  }

  const Employee = require("../models/Employee");
  return Employee.findById(employeeId);
};

const createEmployeeRecord = async (employeeData) => {
  if (!isMongoReady()) {
    await seedFallbackData();
    const newEmployee = {
      _id: `employee-${Date.now()}`,
      ...employeeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fallbackEmployees.unshift(newEmployee);
    return newEmployee;
  }

  const Employee = require("../models/Employee");
  return Employee.create(employeeData);
};

const updateEmployeeRecord = async (employeeId, updates) => {
  if (!isMongoReady()) {
    await seedFallbackData();
    const index = fallbackEmployees.findIndex((employee) => employee._id.toString() === employeeId.toString());

    if (index === -1) {
      return null;
    }

    fallbackEmployees[index] = {
      ...fallbackEmployees[index],
      ...updates,
      updatedAt: new Date(),
    };

    return fallbackEmployees[index];
  }

  const Employee = require("../models/Employee");
  return Employee.findByIdAndUpdate(employeeId, updates, { new: true, runValidators: true });
};

const deleteEmployeeRecord = async (employeeId) => {
  if (!isMongoReady()) {
    await seedFallbackData();
    const index = fallbackEmployees.findIndex((employee) => employee._id.toString() === employeeId.toString());

    if (index === -1) {
      return null;
    }

    const [deletedEmployee] = fallbackEmployees.splice(index, 1);
    return deletedEmployee;
  }

  const Employee = require("../models/Employee");
  return Employee.findByIdAndDelete(employeeId);
};

module.exports = {
  createEmployeeRecord,
  createUserRecord,
  deleteEmployeeRecord,
  findUserByEmail,
  getAllEmployees,
  getEmployeeByIdRecord,
  updateEmployeeRecord,
};
