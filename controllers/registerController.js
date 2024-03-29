const Shelf = require('../model/Shelf');
const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) return res.status(400).json({'message':'Email and password are required.'});
   
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            'email': email,
            'name': name,
            'password': hashedPass
        });

        const shelf = await Shelf.create({
            'user': user._id,
            'wantToRead': [],
            'currentlyReading': [],
            'read': []
        });

        res.status(201).json({'success':`New user ${email} created!`});
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
    
}

module.exports = { handleNewUser };