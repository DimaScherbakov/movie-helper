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
import {getMyMovies} from "./api/movies/my-movies";
import {getUsers, postUsers} from "./api/users";


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
app.get('/api/users', getUsers);

// Эндпоинт для добавления нового пользователя
app.post('/api/users', postUsers);

// Эндпоинт для получения данных о фильмах пользователя
app.get('/api/movies/my-movies', getMyMovies);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

