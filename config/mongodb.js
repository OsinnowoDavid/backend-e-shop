import mongoose from "mongoose";

const connectdb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DB connected successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.error("DB connection error:", err);
            console.log(err);
        });

        const uri = `${process.env.MONGODB_URI}/e-commerceProject`;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connection established");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the application on connection error
    }
};

export default connectdb;
