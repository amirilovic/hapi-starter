
export class ApplicationError extends Error {
    private data;
    constructor(message, data) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.data = data;
    }
}

export class ValidationError extends ApplicationError {

}
