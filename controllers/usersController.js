const User = require('../model/User');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    const response = await User.find();
    res.json(response);
}

const getUserByEmail = async (req, res) => {
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
    res.json(response);
}
/*
const createNewUser = (req, res) => {
    const newUser = {
        id: data.users[data.users.length - 1].id + 1 || 1,
        email: req.body.email,
        password: req.body.password
    }

    if (!newUser.email || !newUser.password) {
        return res.status(400).json({"message": "Email and password are required."});
    }

    console.log(newUser);
    data.setUsers([...data.users, newUser]);
    console.log(data.users);
    res.status(201).json(data.users);
}
*/

const updateUser = async (req, res) => {
    try {
        await User.updateOne({'email': req.body.email}, {$set:{'name': req.body.name, 'password': req.body.password}});
        res.status(200).json({'success':`The user ${req.body.email} has been changed!`});
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.deleteOne({email: req.body.email});
        res.status(200).json({'success':`The user ${req.body.email} has been removed!`});
    } catch (err){
        res.status(500).json({'message': err.message});
    }
}

/*
const getUser = (req, res) => {
    const user = data.users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(400).json({"message": `User ID ${id} not found`});
    }
    res.json(user);
}
*/

module.exports = {
    getAllUsers,
    getUserByEmail,
    // createNewUser,
    updateUser,
    deleteUser,
    // getUser
}