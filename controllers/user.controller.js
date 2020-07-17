const user = require('../model/user.model');
const product = require('../model/product.model');


module.exports.findUser = async function(req, res) {
    try {
        const page = req.query.page || 1;
        const perPage = 8;
        let skip = (page - 1) * perPage;
        const foundUser = await user.find({ email: new RegExp(req.query.userEmail) }).limit(perPage).skip(skip);
        res.json({
            code: 0,
            message: "Find user successful",
            data: foundUser
        })
    } catch (error) {
        res.json(error);
    }
}
module.exports.getUsers = async function(req, res) {
    try {
        const page = req.query.page || 1;
        const perPage = 8;
        let skip = (page - 1) * perPage;
        const result = await user.find().limit(perPage).skip(skip);
        res.json({
            code: 0,
            data: result,
            message: "Get all user successful"
        })
    } catch (error) {
        res.json(error)
    }
}

module.exports.changeUserStatus = async function(req, res) {
    try {
        const needUpdateUser = await user.findOne({ _id: req.params.id });
        let productStatus;
        if (req.body.status === 'active') productStatus = 'active';
        else productStatus = 'hide';
        const result = await user.findOneAndUpdate({ _id: req.params.id }, { $set: { status: req.body.status } });
        await product.updateMany({ owner: needUpdateUser.email }, { $set: { status: productStatus } });
        res.json({
            code: 0,
            message: "Change status successful",
            data: result
        })
    } catch (err) {
        res.json(err)
    }
}