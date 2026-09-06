// This is for Syncronse Error Handling

const GenError = (err,req,res,next)=>{

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message:err.message,
        errName:err.name,
        // stack:err.stack
    })
}

export { GenError}

// we use try catch for asynchronous error handling in node js