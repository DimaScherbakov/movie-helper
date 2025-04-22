import {Request, Response} from "express";
import {db} from "../../firebase-admin";

export async function getMyMovies(req: Request<any>, res: Response) {
    try {
        const { userId } = req.body;
        const movieIds = await getMovieRefsByUserId(userId);
        if (!movieIds) {
            return res.status(404).json({ message: 'Нет данных для указанного userId' });
        }
        const movies = await getMoviesByIds(movieIds);
        // Фильтруем null значения, если какие-то фильмы не найдены
        const filteredMovies = movies.filter(movie => !!movie);
        res.json(filteredMovies);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', details: error.message });
    }
}

async function getMovieRefsByUserId(userId: string) {
    const usersAndMoviesRef = db.collection('users-and-movies');
    const snapshot = await usersAndMoviesRef.where('userId', '==', userId).get();

    if (snapshot.empty) {
        return null;
    }

    return snapshot.docs.map(doc => doc.data().movieId);
}

async function getMoviesByIds(movieIds: string[]) {
    const moviesRef = db.collection('movies');
    return await Promise.all(
        movieIds.map(async (movieId: string) => {
            const movieDoc = await moviesRef.doc(movieId).get();
            if (!movieDoc.exists) {
                return null; // Если фильм не найден, возвращаем null
            }
            return { id: movieDoc.id, ...movieDoc.data() };
        })
    );
}
