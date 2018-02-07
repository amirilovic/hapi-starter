
export class BaseError extends Error {
    public data;
    constructor(message, data?) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.data = data;
    }
}

export class UnknownError extends BaseError {

}

export class ApplicationError extends BaseError {

}

export class ValidationError extends ApplicationError {

}

export class RecordNotFoundError extends ApplicationError {

}

export class ForbiddenError extends ApplicationError {

}

export class UnauthorizedError extends ApplicationError {

}
