import {
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiDollarSign,
} from "react-icons/fi";

export const stats = [
  {
    id: 1,
    title: "Employees",
    value: 248,
    growth: "+12%",
    color: "bg-indigo-500",
    icon: FiUsers,
  },
  {
    id: 2,
    title: "Active",
    value: 221,
    growth: "+5%",
    color: "bg-green-500",
    icon: FiUserCheck,
  },
  {
    id: 3,
    title: "Departments",
    value: 12,
    growth: "+2",
    color: "bg-orange-500",
    icon: FiBriefcase,
  },
  {
    id: 4,
    title: "Payroll",
    value: 1200000,
    growth: "+8%",
    color: "bg-pink-500",
    icon: FiDollarSign,
  },
];

export const recentEmployees = [
  {
    id: "EMP001",
    name: "John Carter",
    department: "Engineering",
    status: "Active",
  },
  {
    id: "EMP002",
    name: "Emma Watson",
    department: "HR",
    status: "Active",
  },
  {
    id: "EMP003",
    name: "Michael Lee",
    department: "Finance",
    status: "Inactive",
  },
];