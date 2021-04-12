const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userController = {
    
    register: async (req, res) => {

        const selectUser = await User.findOne({ email: req.body.email });
        if (selectUser) return res.status(400).send('Email already exists')

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })

        try {
            const savedUser = await user.save();
            res.send(savedUser);
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    },    

    login: async (req, res) => {
        const selectUser = await User.findOne({ email: req.body.email });
        if (!selectUser) return res.status(400).send('Email or password cant be found');

        const match = bcrypt.compareSync(req.body.password, selectUser.password);
        if (!match) return res.status(400).send('login fail')

        const token = jwt.sign({id: selectUser._id, admin: selectUser.admin}, `${process.env.MY_SECRET_TOKEN}`)


        res.header('auth',token)
        res.redirect('/admin/account');
    }

}

module.exports = userController;