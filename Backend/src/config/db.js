const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.warn("MONGODB_URI not set. Running in local fallback mode.");
            return;
        }

        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected");
        console.log(`Database Host: ${connection.connection.host}`);
    } catch (error) {
        console.warn("MongoDB Connection Failed. Running in local fallback mode.");
        console.warn(error.message);
    }
};

module.exports = connectDB;