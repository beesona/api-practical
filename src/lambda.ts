'use strict';

import App from './App';
const awsServerlessExpress = require('aws-serverless-express');
const apiConfig = require('./config/api-config');

const server = awsServerlessExpress.createServer(App);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
