import { useEffect, useMemo, useState } from "react";
import { getEmployees } from "../../services/employeeService";
import { getApiErrorMessage } from "../../utils/apiError";

function Departments() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDepartments = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getEmployees();
      setEmployees(response.data.data || []);
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to load departments."));
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
          setError(getApiErrorMessage(error, "Unable to load departments."));
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

  const departments = useMemo(() => {
    const grouped = employees.reduce((items, employee) => {
      const name = employee.department || "Unassigned";
      const department = items.get(name) || {
        name,
        staff: 0,
        active: 0,
        designations: new Set(),
      };

      department.staff += 1;

      if (employee.status === "Active") {
        department.active += 1;
      }

      if (employee.designation) {
        department.designations.add(employee.designation);
      }

      items.set(name, department);
      return items;
    }, new Map());

    return Array.from(grouped.values()).map((department) => ({
      ...department,
      focus: Array.from(department.designations).slice(0, 2).join(", ") || "General operations",
    }));
  }, [employees]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Departments</h1>
        <p className="mt-2 text-gray-500">Overview of the departments and their current priorities.</p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-36 animate-pulse rounded-2xl bg-white shadow-sm" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700">
          <p>{error}</p>
          <button onClick={fetchDepartments} className="mt-3 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white">
            Retry
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
        {departments.length ? departments.map((department) => (
          <div key={department.name} className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{department.name}</h2>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                {department.staff} staff
              </span>
            </div>
            <p className="mt-3 text-gray-500">Active employees: {department.active}</p>
            <p className="mt-2 text-sm text-gray-600">Current focus: {department.focus}</p>
          </div>
        )) : (
          <div className="rounded-2xl bg-white p-6 text-gray-500 shadow-sm md:col-span-2">
            No departments found.
          </div>
        )}
        </div>
      )}
    </div>
  );
}

export default Departments;
