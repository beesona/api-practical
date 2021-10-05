import * as log4js from 'log4js';
// tslint:disable: no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
const local = require('./api.json');
// tslint:enable: no-var-requires

function getConfig() {
    const parseJSON = (str): any => {
        try {
            return {
                payload: JSON.parse(str),
                message: undefined
            };
        } catch (e) {
            return {
                payload: undefined,
                message: str ? str : undefined
            };
        }
    };

    log4js.addLayout('json', config => logEvent => {
        const level = logEvent.level;
        const data = parseJSON(logEvent.data[0]);
        const message = data.message;
        const payload = data.payload;
        const context = logEvent.data.length > 1 ? parseJSON(logEvent.data[1]) : undefined;
        const newEvent = {
            dateTime: logEvent.startTime,
            logCategory: logEvent.categoryName,
            logLevel: level.levelStr,
            message,
            payload,
            context
        };

        return `${JSON.stringify(newEvent)} \n`;
    });

    const config = local;
    log4js.configure(config.log4js);
    return config;
}

module.exports = getConfig();
