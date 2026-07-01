import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <p className="mt-2 text-gray-500">Your account details and access overview.</p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-xl font-semibold text-white">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{user?.name || "Admin User"}</h2>
            <p className="text-gray-500">{user?.role || "Admin"}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="mt-1 font-medium">{user?.email || "admin@example.com"}</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Account Type</p>
            <p className="mt-1 font-medium">{user?.role || "Administrator"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
