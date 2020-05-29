import { DatasourceConfig } from '@nelnet/pg-helpers';

export type ApiConfig = {
    apiSettings: ApiSettingsConfig;
    endPoints: EndpointsConfig;
    credentials: CredentialsConfig;
    awsArns: ArnsConfig;
    dataSources: DatasourceConfig;
    log4js: any;
}

export type ApiSettingsConfig = {
    localPort: number;
}

export type EndpointsConfig = {
    [name: string]: {
        host: string;
        resource: string;
    }
}

export type CredentialsConfig = {
    aws: {
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
    },
    cognito: {
        authEndpoint: string;
        appClientId: string;
        userPoolId: string;
        userName: string;
        password: string;
    }
}

export type ArnsConfig = {
    [name: string]: {
        arn: string;
    }
}
