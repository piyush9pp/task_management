const fs = require('fs');

module.exports = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile('request.log', log, (err) => {
        if (err) console.error(err);
    });
    next();
};
