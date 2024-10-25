import { connect, disconnect } from "mongoose";
const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGODB_URL || undefined);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
const disconnectDB = async () => {
    try {
        await disconnect();
        console.log(`MongoDB disconnected`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
export { connectDB, disconnectDB };
//# sourceMappingURL=connection.js.map