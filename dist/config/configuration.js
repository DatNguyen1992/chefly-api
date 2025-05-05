"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        password: process.env.REDIS_PASSWORD,
        tls: process.env.REDIS_TLS === 'true'
            ? {
                rejectUnauthorized: process.env.REDIS_REJECT_UNAUTHORIZED !== 'false',
            }
            : undefined,
        maxRetriesPerRequest: 3,
        retryStrategy: (times) => {
            if (times > 3) {
                return null;
            }
            return Math.min(times * 200, 2000);
        },
        reconnectOnError: (err) => {
            const targetError = 'READONLY';
            if (err.message.includes(targetError)) {
                return true;
            }
            return false;
        },
    },
    jwt: {
        accessToken: {
            secret: process.env.JWT_ACCESS_SECRET || 'your-access-secret',
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
        },
        refreshToken: {
            secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
            expiresInSeconds: parseInt(process.env.JWT_REFRESH_EXPIRES_IN_SECONDS, 10) ||
                7 * 24 * 60 * 60,
        },
    },
    oauth: {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL ||
                'http://localhost:3000/auth/google/callback',
        },
    },
    firebase: {
        serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
    },
    cloudinary: {
        cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    },
});
//# sourceMappingURL=configuration.js.map