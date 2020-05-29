import * as log4js from 'log4js';
import * as path from 'path';
import { PublishEvent } from '../lib/PublishEvent';
import { IEvent } from '../types/event';

const logger = log4js.getLogger(path.basename(__filename));
const eventPublisher: PublishEvent = new PublishEvent();

export class NotifyManager {

    public publish(eventData: IEvent) {
        return eventPublisher.addEvent(eventData)
            .then(() => {
                logger.debug(`${eventData.namespace} event done publishing`);
            });
    }

}
