
const requests=new Map();
const rateLimiter=(req, res, next) => {
    const ip=req.ip;
    const now=Date.now();
    const windowMs=15*60*1000;
    const max=15;
    const data=requests.get(ip);
    if (!data || now-data.startTime>=windowMs) {
        requests.set(ip, {count:1, startTime:now });
        return next();
    }
    if (data.count>=max) {
        return res.status(429).send("You have exceeded hit limits of API");
    }
    data.count++;
    next();
};

module.exports = rateLimiter;