module.exports = function(err, req, res, next){
    let statuscode = 500
    let errors = []
    console.log(err);
    
    switch(err.name){
        case 'SequelizeValidationError':
        statuscode = 400,

        err.errors.forEach(element => {
            errors.push(element.message)           
        });
        break

        case 'JsonWebTokenError':
            statusCode = 401,
            errors.push('Token Invalid')
            break

        default:
            errors.push(err.msg)
            statusCode = err.status

    }
    res.status(statuscode).json({ errors })
} 