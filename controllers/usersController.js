const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    const response = await User.find();
    res.json(response);
}

const getUserByEmail = async (req, res) => {
    try {
        let email = '';
        const authHeader = req.headers.authorization || req.headers.Authorization;

        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403); //invalid token
                email = decoded.UserInfo.email;
            }
        )

        const users = await User.find();
        const user = users.filter(u => u.email === email)[0];
        if (!user) {
            return res.status(400).json({"message": `User ${email} not found`});
        }
        const response = {
            'email': user.email,
            'name': user.name
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({'message': err.message});;
    }
    
}

const updateUser = async (req, res) => {
    const newPassword = req.body?.password;

    if (req.body.name && req.body.password && req.body.name.length && req.body.password.length) {
        try {
            const hashedPass = await bcrypt.hash(newPassword, 10);
            await User.updateOne({'email': req.body.email}, {$set:{'name': req.body.name, 'password': hashedPass}});
            res.status(200).json({'message':`The user ${req.body.email} has been changed!`});
        } catch (err) {
            res.status(500).json({'message': err.message});
        }
    } else if (req.body.name && req.body.name.length) {
        try {
            await User.updateOne({'email': req.body.email}, {$set:{'name': req.body.name}});
            res.status(200).json({'message':`The user ${req.body.email} has been changed!`});
        } catch (err) {
            res.status(500).json({'message': err.message});
        }
    } else {
        try {
            const hashedPass = await bcrypt.hash(newPassword, 10);
            await User.updateOne({'email': req.body.email}, {$set:{'password': hashedPass}});
            res.status(200).json({'message':`The user ${req.body.email} has been changed!`});
        } catch (err) {
            res.status(500).json({'message': err.message});
        }
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.deleteOne({email: req.body.email});
        res.status(200).json({'message':`The user ${req.body.email} has been removed!`});
    } catch (err){
        res.status(500).json({'message': err.message});
    }
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    updateUser,
    deleteUser,
}