import { Context } from 'grammy';

// Handler cho lệnh /start
const startHandler = async (ctx: Context) => {
    await ctx.reply('👋 Welcome to the bot! Here are some commands you can use:\n\n/start - Start the bot\n/help - Get help');
};

export default startHandler;
