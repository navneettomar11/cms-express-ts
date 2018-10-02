import { Exception } from "./expection";

export class SQLException extends Exception {

    constructor( message: string) {
        super(message);
    }
}
