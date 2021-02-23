const User = require('../models/user');
const bcrypt = require('bcryptjs');

class UserController {

    constructor() {}

    async getPage(query) {
        let page = 1;
        if (query.page != undefined) page = query.page;
        return await User.find()
        .limit(20)
        .skip(20 * (page-1))
        .sort('-createdAt');
    }

    async getByEmail(email) {
        return await User.find({email:email});
    }

    async getById(id) {
        return await User.findById(id);
    }

    async add(user) {
        user.password = await bcrypt.hash(user.password, 10);
        return User.create(user);
    }

    async update(id, user) {
        if (user.password != undefined) user.password = await bcrypt.hash(user.password, 10);
        return User.findByIdAndUpdate(id,user);
    }

    async delete(id) {
        return User.findByIdAndDelete(id);
    }

}


let userController = new UserController();
module.exports = userController;