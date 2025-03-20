const logger = {
    info: (message, meta = {}) => {
        console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            level: 'info',
            message,
            ...meta
        }));
    },
    error: (message, error, meta = {}) => {
        console.error(JSON.stringify({
            timestamp: new Date().toISOString(),
            level: 'error',
            message,
            error: error.message,
            stack: error.stack,
            ...meta
        }));
    }
};

module.exports = logger;
