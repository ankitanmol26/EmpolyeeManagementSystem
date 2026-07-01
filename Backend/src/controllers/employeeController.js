const {
    createEmployeeRecord,
    deleteEmployeeRecord,
    getAllEmployees,
    getEmployeeByIdRecord,
    updateEmployeeRecord,
} = require("../utils/store");

const createEmployee = async (req, res) => {
    try {
        const employee = await createEmployeeRecord(req.body);

        res.status(201).json({
            success: true,
            message: "Employee Created Successfully",
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await getAllEmployees();

        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await getEmployeeByIdRecord(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const employee = await updateEmployeeRecord(req.params.id, req.body);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee Updated Successfully",
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await deleteEmployeeRecord(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};