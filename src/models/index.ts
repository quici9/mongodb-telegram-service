export interface MongoDBConfig {
    uri: string | undefined;
    dbName: string | undefined;
    collectionName: string | undefined;
}

interface TelegramConfig {
    botToken: string | undefined;
    chatId: string | undefined;
}

export interface Index {
    telegram: TelegramConfig;
    mongodb: MongoDBConfig;
}