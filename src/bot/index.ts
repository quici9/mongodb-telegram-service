import { Bot, GrammyError, HttpError } from 'grammy';
import startHandler from './handlers/startHandler';
import config from "../config";

const telegramConfig = config.telegram;

// Check if botToken is defined
if (!telegramConfig.botToken) {
    console.error('Error: Telegram bot token is undefined. Please set the TELEGRAM_BOT_TOKEN in your environment variables.');
    process.exit(1);
}

// Check if chatId is defined
if (!telegramConfig.chatId) {
    console.error('Error: Telegram chat ID is undefined. Please set the TELEGRAM_CHAT_ID in your environment variables.');
    process.exit(1);
}

const bot = new Bot(telegramConfig.botToken);

// Register handlers
bot.command('start', startHandler);

// Send a test message
// bot.api.sendMessage(telegramConfig.chatId, 'Hello, this is a test message!').then();

// Start the bot
bot.start();

// Global error handling
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

export default bot;
