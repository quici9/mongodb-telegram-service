# MongoDB Change Stream to Telegram Notification Service

This service listens to changes in a specific MongoDB collection using MongoDB Change Streams and sends notifications to a Telegram group or chat whenever new records are inserted.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Requirements

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- A MongoDB instance (Local or MongoDB Atlas)
- A Telegram bot (You can create one using [@BotFather](https://telegram.me/BotFather) on Telegram)
- A Telegram group or chat ID where you want to receive notifications

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ````

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

You need to set up environment variables by creating a .env file in the root directory of the project. The following variables are required:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
MONGODB_COLLECTION=your_collection_name

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

- **MONGODB_URI**: Your MongoDB connection string.
- **MONGODB_DB**: The database name.
- **MONGODB_COLLECTION**: The collection to monitor for changes.
- **TELEGRAM_BOT_TOKEN**: The token of the bot you created using [@BotFather](https://telegram.me/BotFather).
- **TELEGRAM_CHAT_ID**: The ID of the Telegram group or chat where notifications should be sent.

## Usage

Once the setup is complete, you can start the service by running:

```bash
npm start
```

This will:
- Connect to MongoDB and start listening for insert events.
- When a new document is inserted into the specified collection, the service will send a notification to the specified Telegram chat with the details of the new document.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **MongoDB**: NoSQL database.
- **MongoDB Change Streams**: To monitor real-time changes in the MongoDB collection.
- **Telegram Bot API**: To send messages to a Telegram group or chat.

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/your-feature\`)
3. Commit your changes (\`git commit -am 'Add some feature'\`)
4. Push to the branch (\`git push origin feature/your-feature\`)
5. Create a new Pull Request
