import {db} from "../firebase-admin";
import {Request, Response} from "express";

export async function getUsers(req: Request<any>, res: Response) {
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
}

export async function postUsers(req: Request<any>, res: Response) {
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
}
