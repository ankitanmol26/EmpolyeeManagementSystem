import { FiClock, FiUsers } from "react-icons/fi";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatsSection from "../../components/dashboard/StatsSection";

const recentActivity = [
  { title: "New hire onboarded", detail: "Sarah Kim joined Engineering", time: "10 min ago" },
  { title: "Payroll approved", detail: "Monthly payroll submitted", time: "1 hour ago" },
  { title: "Department update", detail: "Sales team capacity reviewed", time: "3 hours ago" },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />
      <StatsSection />

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