const maintenanceMiddleware = (req, res, next) => {
    if (process.env.MAINTENANCE === 'true') {
        return res.status(503).json({ message: 'The service are on maintenance. Try later.' });
    } else {
        next();
    }
};


module.exports = maintenanceMiddleware;