export class CustomValidationError {
    property: string;
    value: string;
    constraints: {
        [type: string]: string;
    };
}
