const TelegramBot = require('node-telegram-bot-api');

// Укажите ваш токен бота
const token = '7572082955:AAHBY1VgVh1adY3jQgdPQWBbKiEmwD4-qa0';
const bot = new TelegramBot(token, { polling: true });

// Инициализация данных для игры
let playerScores = {}; // Счета игроков
let tournaments = [];  // Турниры
let auctions = [];     // Аукционы
let clans = {};        // Кланы
let items = {};        // Вещи и скины
let pets = {};         // Питомцы

// Команда /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    if (!playerScores[chatId]) {
        playerScores[chatId] = { score: 0, clicks: 0, items: [], pets: [], clan: null };
    }
    bot.sendMessage(chatId, 'Добро пожаловать в KLETKATAP! Используйте команду /help, чтобы узнать доступные команды.');
});

// Команда /help для помощи
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `
Доступные команды:
/start - Начать игру
/play - Кликать по монетке и зарабатывать очки
/invest - Вложить монеты в банк и получить проценты
/pet - Купить и ухаживать за питомцем
/auction - Купить или продать скины на аукционе
/clan - Создать или вступить в клан
/tournament - Участвовать в турнире
/score - Показать ваш текущий счёт
/rank - Посмотреть рейтинги игроков и кланов
/daily - Получить ежедневный бонус
`);
});

// Команда /play - клик по монетке
bot.onText(/\/play/, (msg) => {
    const chatId = msg.chat.id;
    
    if (!playerScores[chatId]) {
        playerScores[chatId] = { score: 0, clicks: 0 };
    }

    playerScores[chatId].score += 1;
    playerScores[chatId].clicks += 1;

    bot.sendMessage(chatId, `Вы заработали 1 монету! Текущий счёт: ${playerScores[chatId].score}`);
});

// Команда /score - показать счёт
bot.onText(/\/score/, (msg) => {
    const chatId = msg.chat.id;
    const score = playerScores[chatId] ? playerScores[chatId].score : 0;
    bot.sendMessage(chatId, `Ваш текущий счёт: ${score}`);
});

// Команда /daily - ежедневный бонус
bot.onText(/\/daily/, (msg) => {
    const chatId = msg.chat.id;
    if (!playerScores[chatId]) {
        playerScores[chatId] = { score: 0, clicks: 0 };
    }
    playerScores[chatId].score += 10;  // Ежедневный бонус
    bot.sendMessage(chatId, 'Вы получили 10 монет в качестве ежедневного бонуса!');
});

// Команда /invest - вложение монет в банк
bot.onText(/\/invest/, (msg) => {
    const chatId = msg.chat.id;
    if (playerScores[chatId].score >= 10) {
        playerScores[chatId].score -= 10;  // Снимаем 10 монет
        setTimeout(() => {
            playerScores[chatId].score += 15;  // Возвращаем с процентами
            bot.sendMessage(chatId, 'Ваши инвестиции принесли прибыль: +15 монет!');
        }, 60000); // Через 1 минуту
        bot.sendMessage(chatId, 'Вы вложили 10 монет. Ждите 1 минуту для получения прибыли.');
    } else {
        bot.sendMessage(chatId, 'Недостаточно монет для инвестиций. Нужно как минимум 10.');
    }
});

// Команда /pet - покупка питомца
bot.onText(/\/pet/, (msg) => {
    const chatId = msg.chat.id;
    if (!pets[chatId]) {
        pets[chatId] = { name: 'Котик', level: 1, hunger: 100 };
        playerScores[chatId].score -= 50;  // Покупка стоит 50 монет
        bot.sendMessage(chatId, 'Вы купили питомца! Не забывайте кормить его.');
    } else {
        bot.sendMessage(chatId, 'У вас уже есть питомец.');
    }
});

// Команда /auction - аукцион
bot.onText(/\/auction/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Добро пожаловать на аукцион! Здесь вы можете покупать и продавать скины.');
    // Пример функционала аукциона
    // Добавить покупку и продажу скинов
});

// Команда /clan - кланы
bot.onText(/\/clan/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Создайте клан или вступите в существующий, чтобы соревноваться с другими игроками!');
    // Добавить функционал для создания и вступления в кланы
});

// Команда /rank - рейтинг игроков
bot.onText(/\/rank/, (msg) => {
    const chatId = msg.chat.id;
    let rankingMessage = 'Текущий рейтинг игроков:\n';
    // Сортировка игроков по количеству очков
    const sortedPlayers = Object.keys(playerScores).sort((a, b) => playerScores[b].score - playerScores[a].score);
    sortedPlayers.forEach((playerId, index) => {
        rankingMessage += `${index + 1}. Игрок ${playerId}: ${playerScores[playerId].score} монет\n`;
    });
    bot.sendMessage(chatId, rankingMessage);
});
