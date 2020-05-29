
import * as log4js from 'log4js';
const local = require('./api.json');
const dev = require('./dev.json');
const qa = require('./qa.json');
const train = require('./train.json');
const prod = require('./prod.json');

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
      const level: any = logEvent.level;
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

  let config;
  switch (process.env.NODE_ENV) {
    case 'dev': config = dev; break;
    case 'qa': config = qa; break;
    case 'train': config = train; break;
    case 'prod': config = prod; break;
    default: config = local;
  }
  log4js.configure(config.log4js);
  return config;
}

module.exports = getConfig();
