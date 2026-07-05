const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());

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

module.exports = app;