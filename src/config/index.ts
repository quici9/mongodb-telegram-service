import dotenv from 'dotenv';
import {Index} from "../models";

dotenv.config();

const config: Index = {
    telegram: {
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        chatId: process.env.TELEGRAM_CHAT_ID,
    },
    mongodb: {
        uri: process.env.MONGODB_URI,
        dbName: process.env.MONGODB_DB,
        collectionName: process.env.MONGODB_COLLECTION,
    },
};

export default config;