import Validator, { ValidationErrors } from 'validatorjs';
import DOMPurify from 'dompurify';
interface ValidationResponse {
    isValid: boolean;
    errors?: ValidationErrors;
}

export const allFieldsValidation = (data: object, rules: Validator.Rules, options?: Validator.ErrorMessages): ValidationResponse => {
    const validation = new Validator(data, rules, options);
    const passes = validation.passes();
    const validationResponse: ValidationResponse = { isValid: passes !== undefined ? passes : false };
    if (!validationResponse.isValid) {
        validationResponse.errors = validation.errors.all();
    }

    return validationResponse;
};

export const santizeFields = (data: object): object => {
    const fields: { [key: string]: any } = { ...data };

    for (const field in fields) {
        if (typeof fields[field] === 'string') {
            fields[field] = DOMPurify.sanitize(fields[field], {
                USE_PROFILES: { html: false }
            });
        }
    }
    return fields;
};