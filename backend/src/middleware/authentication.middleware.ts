import * as admin from 'firebase-admin';

export class AuthenticationMiddleware {
    // Middleware to check if the user is authenticated
    static async authenticate(req: any, res: any, next: any) {
        try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify the token (this is a placeholder, implement your own verification logic)
        const user = await admin.auth().verifyIdToken(token);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user; // Attach user information to the request object
        next();
        } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
