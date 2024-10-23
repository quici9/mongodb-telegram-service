import { MongoClient, ChangeStream, Document } from 'mongodb';
import config from '../config';
import bot from "../bot";

const mongodbConfig = config.mongodb;

// Function to connect to MongoDB and listen for changes
export const listenToChangeStream = async (): Promise<void> => {
    // Kiểm tra nếu uri hoặc collectionName không được định nghĩa
    if (!mongodbConfig.uri) {
        console.error('Error: MongoDB URI is undefined');
        return; // Dừng hàm nếu uri không hợp lệ
    }
    
    if (!mongodbConfig.collectionName) {
        console.error('Error: MongoDB collectionName is undefined');
        return; // Dừng hàm nếu collectionName không hợp lệ
    }
    
    const client = new MongoClient(mongodbConfig.uri);
    
    try {
        // Kết nối tới MongoDB
        await client.connect();
        console.log('Connected to MongoDB');
        
        const db = client.db(mongodbConfig.dbName);
        const collection = db.collection<Document>(mongodbConfig.collectionName);
        
        // Bắt đầu lắng nghe Change Streams trên collection
        const changeStream: ChangeStream<Document> = collection.watch();
        
        // Xử lý các thay đổi
        changeStream.on('change', async (change) => {
            if (change.operationType === 'insert') {
                const newDocument: Document = change.fullDocument;
                console.log('New document inserted:', newDocument);
                
                // Tạo nội dung thông báo
                const alertMessage = `
📢 New Record Inserted!
➡️ _id: ${newDocument._id}
➡️ Data: ${JSON.stringify(newDocument, null, 2)}
`;
                if (!config.telegram.chatId) {
                    console.error('Error: Telegram chat ID is undefined. Please set the TELEGRAM_CHAT_ID in your environment variables.');
                    process.exit(1);
                }
                
                // Gửi thông báo lên Telegram
                await bot.api.sendMessage(config.telegram.chatId, alertMessage);
            }
        });
        
        // Đảm bảo service vẫn chạy để lắng nghe các sự kiện MongoDB
        console.log('Listening for changes...');
    } catch (error) {
        console.error('Error connecting to MongoDB or handling change stream:', error);
        // Nếu có lỗi, đóng kết nối
        await client.close();
    }
};