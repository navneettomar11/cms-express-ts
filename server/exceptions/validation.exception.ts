import { Exception } from "./expection";

export class ValidationException extends Exception {

    constructor(private propertyName: string, message: string) {
        super(message);
        this.propertyName = propertyName;
    }
}
