import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return; // Already connected
        }
        
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        throw error;
    }
};

export default connectDB;