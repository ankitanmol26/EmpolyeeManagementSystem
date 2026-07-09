const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const developmentOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const trustedOrigins = process.env.NODE_ENV === "production"
      ? allowedOrigins
      : [...developmentOrigins, ...allowedOrigins];

    if (trustedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Log CORS rejections in development
    if (process.env.NODE_ENV !== "production") {
      console.warn(`CORS: Origin ${origin} not in allowed list`);
      return callback(null, true); // Allow in development
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

// Basic health/route sanity check
app.get("/api/auth/login", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Method Not Allowed. Use POST /api/auth/login"
  });
});


app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Employee Management Backend Running Successfully"
    });

});

// Error Handling Middleware (must be last)
app.use(errorMiddleware);

module.exports = app;
