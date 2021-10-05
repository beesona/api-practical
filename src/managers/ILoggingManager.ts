export interface ILoggingManager { 

    info(message: string): void;

    debug(message: string): void;

    error(message: string): void;
}