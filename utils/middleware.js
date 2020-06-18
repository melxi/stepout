const unknownEndpoint = (req, res, next) => {
    const error = new Error('Unknown endpoint');
    error.status = 404;
    next(error);
};

const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: err.message
    });

    next(err);
};

module.exports = {
    unknownEndpoint,
    errorHandler
};