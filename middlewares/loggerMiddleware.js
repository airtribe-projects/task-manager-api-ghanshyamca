const logger = (req, res, next) =>  {
    console.log(`${req.method}: Reqest received on ${req.url}. Logger via Middleware`);
    next();
}

module.exports = { 
    logger
}