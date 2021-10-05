import * as log4js from 'log4js';
import * as path from 'path';
import { IEvent } from '../types/event';

import AWS = require('aws-sdk');
const config = require('../config/api-config');
AWS.config = config.credentials.aws;
const sns = new AWS.SNS();
const logger = log4js.getLogger(path.basename(__filename));

export class PublishEvent {

    // tslint:disable-next-line:no-empty
    constructor() { }

    public addEvent(eventData: IEvent) {
        return sns.publish({
            Message: JSON.stringify(eventData),
            MessageStructure: 'raw',
            TargetArn: config.awsArns.eventGlobalTopic.arn,
            MessageAttributes: {
                namespace: {
                    DataType: 'String',
                    StringValue: eventData.namespace
                }
            }
        })
            .promise()
            .catch(err => {
                logger.error(`Error publishing SNS event: ${err}`);
            });
    }
}
