const jwt = require('jsonwebtoken');
const user = require('../model/user.model');

module.exports = async function(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new Error("You haven't login yet");
    }
    let role;
    let status;
    try {
        // Kiểm tra có phải vai trò là enterprise hay không
        const verify = jwt.verify(token, process.env.secret_key);
        const checkUser = await user.findOne({ email: verify.email }, function(err, result) {
            if (result) {
                role = result['role'];
                status = result['status'];
            }
        });

        if (role != 'enterprise' || status != 'active') throw new Error('You are not allowed to access');
        req.user = checkUser;
        next();
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}