const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const response = await User.find();
    console.log(response);
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

const updateUser = (req, res) => {
    const user = data.users.find(u => u.id === parseInt(req.body.id));

    if (!user) {
        return res.status(400).json({"message": `User ID ${id} not found`});
    }

    if (req.body.email) {user.email = req.body.email}
    // poprawic -> sprawdzenie czy hasla sa poprane
    if (req.body.password) {user.password = req.body.password}

    const filteredArray = data.users.filter(u => u.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, user];

    data.setUsers(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.users);
}

const deleteUser = (req, res) => {
    const user = data.users.find(u => u.id === parseInt(req.body.id));

    if (!user) {
        return res.status(400).json({"message": `User ID ${id} not found`});
    }

    const filteredArray = data.users.filter(u => u.id !== parseInt(req.body.id));
    data.setUsers([...filteredArray]);
    res.json(data.users);
}

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
    // createNewUser,
    // updateUser,
    // deleteUser,
    // getUser
}