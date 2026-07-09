import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../../services/employeeService";
import { getApiErrorMessage } from "../../utils/apiError";
import Button from "../../components/ui/Button";
import Navbar from "../../layouts/Navbar";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    address: "",
    status: "Active",
  });
  const [editingId, setEditingId] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getEmployees();
      setEmployees(response.data.data || []);
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to load employees."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    getEmployees()
      .then((response) => {
        if (isMounted) {
          setEmployees(response.data.data || []);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(getApiErrorMessage(error, "Unable to load employees."));
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      employeeId: "",
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      salary: "",
      joiningDate: "",
      address: "",
      status: "Active",
    });
    setEditingId("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (submitting) {
      return;
    }

    if (Number(form.salary) <= 0) {
      setError("Salary must be greater than zero.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...form, salary: Number(form.salary) };

      if (editingId) {
        await updateEmployee(editingId, payload);
        toast.success("Employee updated.");
      } else {
        await createEmployee(payload);
        toast.success("Employee added.");
      }

      resetForm();
      await fetchEmployees();
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to save employee."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee._id);
    setForm({
      employeeId: employee.employeeId || "",
      name: employee.name || "",
      email: employee.email || "",
      phone: employee.phone || "",
      department: employee.department || "",
      designation: employee.designation || "",
      salary: employee.salary || "",
      joiningDate: employee.joiningDate ? employee.joiningDate.split("T")[0] : "",
      address: employee.address || "",
      status: employee.status || "Active",
    });
  };

  const handleDelete = async (employeeId) => {
    const shouldDelete = window.confirm("Delete this employee?");

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteEmployee(employeeId);
      toast.success("Employee deleted.");
      await fetchEmployees();
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to delete employee."));
    }
  };

  const filteredEmployees = useMemo(() => {
    const term = searchValue.toLowerCase();
    return employees.filter((employee) => {
      return [employee.name, employee.department, employee.email, employee.employeeId]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [employees, searchValue]);

  return (
    <div className="space-y-8">
      <Navbar searchValue={searchValue} onSearchChange={setSearchValue} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Employees</h1>
          <p className="text-gray-500">Manage your team and employee records.</p>
        </div>
        <Link to="/dashboard">
          <Button className="flex items-center gap-2">
            <FiPlus />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm space-y-4 dark:bg-slate-800 dark:text-slate-100">
        {error ? (
          <div className="flex items-center justify-between gap-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">
            <span>{error}</span>
            <button type="button" onClick={fetchEmployees} className="font-semibold text-rose-800">
              Retry
            </button>
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-2">
          <input name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="Employee ID" className="rounded-xl border p-3" required />
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="rounded-xl border p-3" required />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="rounded-xl border p-3" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="rounded-xl border p-3" required />
          <input name="department" value={form.department} onChange={handleChange} placeholder="Department" className="rounded-xl border p-3" required />
          <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" className="rounded-xl border p-3" required />
          <input name="salary" type="number" value={form.salary} onChange={handleChange} placeholder="Salary" className="rounded-xl border p-3" required />
          <input name="joiningDate" type="date" value={form.joiningDate} onChange={handleChange} className="rounded-xl border p-3" required />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="rounded-xl border p-3 md:col-span-2" required />
          <select name="status" value={form.status} onChange={handleChange} className="rounded-xl border p-3 md:col-span-2">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : editingId ? "Update Employee" : "Add Employee"}
          </Button>
          {editingId ? <Button onClick={resetForm} disabled={submitting} className="bg-slate-500 hover:bg-slate-600">Cancel</Button> : null}
        </div>
      </form>

      <div className="rounded-2xl bg-white p-6 shadow-sm overflow-x-auto dark:bg-slate-800 dark:text-slate-100">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-12 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-700" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
            <p>{error}</p>
            <button onClick={fetchEmployees} className="mt-3 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white">
              Retry
            </button>
          </div>
        ) : (
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="py-3">ID</th>
                <th className="py-3">Name</th>
                <th className="py-3">Department</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee._id} className="border-b">
                    <td className="py-3">{employee.employeeId}</td>
                    <td className="py-3">{employee.name}</td>
                    <td className="py-3">{employee.department}</td>
                    <td className="py-3">{employee.status}</td>
                    <td className="py-3 flex gap-3">
                      <button onClick={() => handleEdit(employee)} className="text-indigo-600" aria-label={`Edit ${employee.name}`}><FiEdit2 /></button>
                      <button onClick={() => handleDelete(employee._id)} className="text-rose-600" aria-label={`Delete ${employee.name}`}><FiTrash2 /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-6 text-center text-gray-500" colSpan="5">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Employees;
