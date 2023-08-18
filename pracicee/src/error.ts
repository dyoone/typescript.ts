export type ErrorName = 'UNDEFINED IMAGE'

export class ImageError extends Error{
    name: ErrorName;
    message: string;

    constructor({
        name,
        message,
    }:{
        name:ErrorName;
        message: string;
    }){
        super()
        this.name=name;
        this.message=message;
    }
}

