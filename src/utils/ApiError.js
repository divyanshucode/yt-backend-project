//creating a class to override the default error class

class ApiError extends Error {
    constructor(
        statusCode, //give statuscode
        message="Something went wrong",
        errors=[], //give multiple error
        stack=""
    ){
        //overriding with super method
        super(message)
        this.statusCode = statusCode,
        this.data = null,
        this.message = message,
        this.success = false;
        this.errors = errors

       //stack is used to get the error stack
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.construtor)
        }
    }
}

export {ApiError}