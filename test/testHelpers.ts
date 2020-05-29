import axios from 'axios';
const apiConfig = require('../src/config/api-config');

export async function getAdminToken() {
    const response = await axios.request({
        method: 'POST',
        baseURL: apiConfig.endPoints.securityTokenV1Authenticate.host,
        url: apiConfig.endPoints.securityTokenV1Authenticate.resource,
        headers: {
            'userpoolid': process.env.COGNITO_USERPOOLID,
            'appclientid': process.env.COGNITO_APPCLIENTID,
            'content-type': 'application/json'
        },
        data: {
            userName: process.env.COGNITO_USERNAME,
            password: process.env.COGNITO_PASSWORD
        }
    });
    return response.data.data.accessToken;
}
