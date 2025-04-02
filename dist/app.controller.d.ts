import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
export declare class AppController {
    private readonly connection;
    private readonly configService;
    constructor(connection: Connection, configService: ConfigService);
    testConnection(): {
        status: string;
        message: string;
        connectionState: import("mongoose").ConnectionStates.connected;
        error?: undefined;
    } | {
        status: string;
        message: string;
        connectionState: import("mongoose").ConnectionStates.disconnected | import("mongoose").ConnectionStates.connecting | import("mongoose").ConnectionStates.disconnecting | import("mongoose").ConnectionStates.uninitialized;
        error?: undefined;
    } | {
        status: string;
        message: string;
        error: any;
        connectionState?: undefined;
    };
    getHome(): {
        message: string;
    };
    getEnvCheck(): {
        database_username: any;
    };
}
