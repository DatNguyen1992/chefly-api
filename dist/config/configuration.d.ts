declare const _default: () => {
    port: number;
    redis: {
        host: string;
        port: number;
        password: string;
        tls: {
            rejectUnauthorized: boolean;
        };
        maxRetriesPerRequest: number;
        retryStrategy: (times: number) => number;
        reconnectOnError: (err: Error) => boolean;
    };
    jwt: {
        accessToken: {
            secret: string;
            expiresIn: string;
        };
        refreshToken: {
            secret: string;
            expiresIn: string;
            expiresInSeconds: number;
        };
    };
    oauth: {
        google: {
            clientID: string;
            clientSecret: string;
            callbackURL: string;
        };
    };
    firebase: {
        serviceAccount: string;
    };
};
export default _default;
