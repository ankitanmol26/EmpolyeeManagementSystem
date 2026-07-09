import { useEffect, useMemo, useState } from "react";
import { FiBriefcase, FiClock, FiDollarSign, FiUserCheck, FiUsers } from "react-icons/fi";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsSection from "../../components/dashboard/StatsSection";
import { getEmployees } from "../../services/employeeService";
import { getApiErrorMessage } from "../../utils/apiError";

const recentActivity = [
  { title: "New hire onboarded", detail: "Sarah Kim joined Engineering", time: "10 min ago" },
  { title: "Payroll approved", detail: "Monthly payroll submitted", time: "1 hour ago" },
  { title: "Department update", detail: "Sales team capacity reviewed", time: "3 hours ago" },
];

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getEmployees();
      setEmployees(response.data.data || []);
    } catch (error) {
      setError(getApiErrorMessage(error, "Unable to load dashboard data."));
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
          setError(getApiErrorMessage(error, "Unable to load dashboard data."));
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

  const stats = useMemo(() => {
    const activeEmployees = employees.filter((employee) => employee.status === "Active").length;
    const departments = new Set(employees.map((employee) => employee.department).filter(Boolean)).size;
    const payroll = employees.reduce((total, employee) => total + Number(employee.salary || 0), 0);

    return [
      { id: 1, title: "Employees", value: employees.length, growth: "Live", color: "bg-indigo-500", icon: FiUsers },
      { id: 2, title: "Active", value: activeEmployees, growth: "Live", color: "bg-green-500", icon: FiUserCheck },
      { id: 3, title: "Departments", value: departments, growth: "Live", color: "bg-orange-500", icon: FiBriefcase },
      { id: 4, title: "Payroll", value: payroll, growth: "Live", color: "bg-pink-500", icon: FiDollarSign },
    ];
  }, [employees]);

  return (
    <div className="space-y-8">
      <WelcomeBanner />

      {loading ? (
        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-36 animate-pulse rounded-3xl bg-white shadow-sm dark:bg-slate-800" />
          ))}
        </section>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700">
          <p>{error}</p>
          <button onClick={fetchDashboardData} className="mt-3 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white">
            Retry
          </button>
        </div>
      ) : (
        <StatsSection items={stats} />
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <span className="text-sm text-gray-500">Live updates</span>
          </div>
          <div className="mt-6 space-y-4">
            {recentActivity.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                <div className="rounded-full bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-900/40">
                  <FiClock size={16} />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.detail}</p>
                  <p className="mt-1 text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-900/40">
              <FiUsers size={18} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Team snapshot</h2>
              <p className="text-sm text-gray-500">Healthy and growing team</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
              <p className="text-sm text-gray-500">Open positions</p>
              <p className="mt-1 text-2xl font-semibold">4</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
              <p className="text-sm text-gray-500">Pending approvals</p>
              <p className="mt-1 text-2xl font-semibold">7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
