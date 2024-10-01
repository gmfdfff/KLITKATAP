const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Получите токен из переменной окружения
const token = process.env.TELEGRAM_BOT_TOKEN;

// Создайте экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Добро пожаловать в игру! Нажмите на монетку, чтобы заработать баллы!', {
        reply_markup: {
            keyboard: [[{ text: '💰 Кликните на монетку' }]],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    });
});

// Обработка клика на монетку
bot.onText(/💰 Кликните на монетку/, (msg) => {
    const chatId = msg.chat.id;
    // Здесь вы можете добавить логику для начисления баллов
    // Например, просто отправим сообщение о начислении баллов
    bot.sendMessage(chatId, 'Вы заработали 1 балл!');
});

// Обработка команды /leaderboard для отображения турнира
bot.onText(/\/leaderboard/, (msg) => {
    const chatId = msg.chat.id;
    // Здесь вы можете добавить логику для отображения текущего турнира
    bot.sendMessage(chatId, 'Текущий лидерборд: еще не реализовано.');
});

// Обработка команды /upgrade для улучшения клика
bot.onText(/\/upgrade/, (msg) => {
    const chatId = msg.chat.id;
    // Здесь вы можете добавить логику для улучшения клика
    bot.sendMessage(chatId, 'Вы улучшили свой клик! Теперь вы зарабатываете 2 балла за клик!');
});

// Настройка маршрута для Express
app.get('/', (req, res) => {
    res.send('Игра кликер запущена!');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
