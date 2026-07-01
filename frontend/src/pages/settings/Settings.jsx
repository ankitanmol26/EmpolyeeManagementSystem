import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [security, setSecurity] = useState(true);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-800">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-gray-500">Manage your workspace preferences and controls.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <p className="mt-2 text-gray-500">Send updates about employee changes and reminders.</p>
          <button
            onClick={() => setNotifications((value) => !value)}
            className={`mt-4 rounded-xl px-4 py-2 text-white ${notifications ? "bg-indigo-600" : "bg-slate-500"}`}
          >
            {notifications ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <h2 className="text-xl font-semibold">Security</h2>
          <p className="mt-2 text-gray-500">Keep account access protected with strong authentication.</p>
          <button
            onClick={() => setSecurity((value) => !value)}
            className={`mt-4 rounded-xl border px-4 py-2 ${security ? "border-emerald-500 text-emerald-600" : "border-slate-300 text-slate-600"}`}
          >
            {security ? "Protected" : "Review Policies"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
