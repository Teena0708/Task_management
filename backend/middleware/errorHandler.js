const errorHandler = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.StatusCode()||500
    res.status(StatusCode).json({
        success : false,
        message : StatusCode===500?"Internal server error":err.message
    })
}

//pagenation => prev page ,  next page kaise nikalte hai?