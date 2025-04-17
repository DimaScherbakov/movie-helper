// "use server";

import express from 'express';
import { Request, Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors'; // for CORS setup, usage: app.use(cors());
import dotenv from 'dotenv';
import OpenAI from "openai";
import * as process from "process";
import {db} from "./firebase-admin";
import {AuthenticationMiddleware} from "./middleware/authentication.middleware";


// Инициализация Firebase
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // parse json payload
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(AuthenticationMiddleware.authenticate); // Middleware для проверки аутентификации

// Эндпоинт для получения данных о пользователях
app.get('/api/users', async (req, res) => {
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();

        if (snapshot.empty) {
            return res.status(404).json({ message: 'Нет данных о пользователях' });
        }

        let users: any[] = [];
        snapshot.forEach((doc: any) => {
            users.push({ id: doc.id, ...doc.data() });
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

// Эндпоинт для добавления нового пользователя
app.post('/api/users', async (req, res) => {
    try {
        const { name, score, timestamp } = req.body;
        if (!name || !score || !timestamp) {
            return res.status(400).json({ error: 'Отсутствуют необходимые поля' });
        }

        const newUser = { name, score, timestamp };
        const docRef = await db.collection('users').add(newUser);
        res.status(201).json({ id: docRef.id, ...newUser });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

