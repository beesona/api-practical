export type ApiConfig = {
    apiSettings: ApiSettingsConfig;
    endPoints: EndpointsConfig;
    credentials: CredentialsConfig;
    awsArns: ArnsConfig;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
