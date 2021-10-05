import { ILoggingManager } from "./ILoggingManager";

/* eslint-disable no-console */
export class ConsoleLoggingManager implements ILoggingManager { 

    private className: string;

    constructor(className: string) { 
        this.className = className;
    }


    info(message: string): void {
        console.info(`INFO: ${Date.now} - ${this.className}: ${message}`);
    }

    debug(message: string): void {
        console.debug(`DEBUG: ${Date.now} - ${this.className}: ${message}`);
    }

    error(message: string): void {
        console.error(`ERROR: ${Date.now} - ${this.className}: ${message}`);
    }
}