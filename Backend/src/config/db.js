const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            // Do not silently run in fallback mode for auth correctness.
            // This forces developers to configure MongoDB, otherwise login will fail.
            console.error("MONGODB_URI not set. Auth/login requires MongoDB.");
            process.exitCode = 1;
            return;
        }

        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected");
        console.log(`Database Host: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Failed.");
        console.error(error.message);
        process.exitCode = 1;
    }
};

module.exports = connectDB;