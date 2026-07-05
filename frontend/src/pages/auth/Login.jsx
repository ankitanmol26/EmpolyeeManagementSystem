import { useState } from "react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "admin@example.com",
    password: "admin1234",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      if (!err?.response) {
        setError("Cannot connect to backend. Start the backend on port 5000 and try again.");
        return;
      }

      setError(err.response.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid lg:grid-cols-2 w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl"
      >

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center p-12 text-white">

          <h1 className="text-5xl font-bold leading-tight">
            Employee
            <br />
            Management
            <br />
            System
          </h1>

          <p className="mt-8 text-lg opacity-90">
            Manage employees faster,
            smarter and securely.
          </p>

        </div>

        {/* Right Side */}

        <div className="bg-white p-10">

          <h2 className="text-3xl font-bold mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mb-8">
            Login to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error ? <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600">{error}</p> : null}

            <div>
              <label className="font-medium">
                Email
              </label>

              <div className="relative mt-2">

                <FiMail
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"

                  className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-4 focus:ring-indigo-200"

                />

              </div>

            </div>

            <div>

              <label className="font-medium">
                Password
              </label>

              <div className="relative mt-2">

                <FiLock
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input

                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  name="password"

                  value={formData.password}

                  onChange={handleChange}

                  placeholder="Password"

                  className="w-full pl-12 pr-12 py-3 border rounded-xl outline-none focus:ring-4 focus:ring-indigo-200"

                />

                <button

                  type="button"

                  className="absolute right-4 top-4"

                  onClick={() =>
                    setShowPassword(!showPassword)
                  }

                >

                  {showPassword
                    ? <FiEyeOff />
                    : <FiEye />}

                </button>

              </div>

            </div>

            <Button type="submit" className="w-full">

              {loading ? "Signing in..." : "Login"}

            </Button>

          </form>

        </div>

      </motion.div>

    </div>
  );
}

export default Login;
