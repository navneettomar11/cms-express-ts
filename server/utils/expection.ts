export class Exception{
    
    constructor(public message?:string){
    }


}


export class ValidationException extends Exception{

    constructor(private propertyName:string, message: string){
        super(message);
        this.propertyName = propertyName;
    }

}

export class ValidationListException extends Exception{
    constructor(private validationExceptionList: Array<ValidationException>){
        super()
    }

    
}

export class SQLException extends Exception {

    constructor( message:string){
        super(message);
    }
}

export class UserNotFoundException extends Exception{

    constructor(message:string){
        super(message);
    }

}

