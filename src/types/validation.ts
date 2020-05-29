import {
    validate, validateOrReject, ValidationError, Validator, ValidatorConstraint,
    ValidatorConstraintInterface, ValidatorOptions
} from 'class-validator';
import * as log4js from 'log4js';
import * as path from 'path';
import * as uuidValidate from 'uuid-validate';
import { CustomValidationError } from './CustomValidationHelper';
import { BadRequestError } from './error';

const logger = log4js.getLogger(path.basename(__filename));
const validator = new Validator();

export enum ValidationGroup {
    Post = 'post',
    Put = 'put'
}

const defaultValidationOptions: ValidatorOptions = {
    validationError: {
        target: false
    }
};

export abstract class Validatable {
    public validate(options?: ValidatorOptions): Promise<ValidationError[]> {
        return validate(this, { ...defaultValidationOptions, ...options });
    }

    public validateOrReject(options?: ValidatorOptions): Promise<void> {
        return validateOrReject(this, { ...defaultValidationOptions, ...options });
    }
}


// ----------------------------------------------------------------------------------------------
// Custom Validation Classes
// See https://github.com/typestack/class-validator#custom-validation-classes for documentation
// ----------------------------------------------------------------------------------------------

@ValidatorConstraint()
export class AmountIsCurrency implements ValidatorConstraintInterface {
    validate(amountToCheck: number) {
        const amountStr = `${amountToCheck}`;
        const parts = amountStr.split('.');
        if (parts.length > 2) {
            return false;
        }
        if (parts[1] !== undefined && parts[1].length < 2) {
            parts[1] = `${parts[1]}00`.substr(0, 2);
        }
        return validator.isCurrency(parts.join('.'));
    }
}

export class UuidValidation {
    public validateUuid(uuid, uuidPropertyName: string, constraintError?: string) {
        if (uuid && !uuidValidate(uuid, 4)) {
            const returnErrors = Array<CustomValidationError>();
            const newError = new CustomValidationError();

            newError.property = uuidPropertyName;
            newError.value = uuid;
            newError.constraints = {
                error: constraintError ? constraintError : 'wrong uuid type'
            };

            returnErrors.push(newError);

            throw new BadRequestError({
                description: 'Validation Errors',
                body: returnErrors
            });
        }
        return true;
    }
}

@ValidatorConstraint()
export class IsUUIDs implements ValidatorConstraintInterface {
    validate(text: string[]) {
        text.forEach(id => {
            if (!uuidValidate(id, 4)) {
                throw new BadRequestError({
                    description: 'Validation Errors: A valid UUID(4) format is expected',
                    body: id
                });
            }
        });
        return true;
    }
}
