import { connect } from "mongoose";

export const connectToMongo = async () => {
    try {
        const MONGO_CONNECTION = process.env.MONGO_CONNECTION || '';
        await connect(MONGO_CONNECTION);
        console.log('Connected to MongoDB');
    } catch (error) {
        throw error;
    }
}