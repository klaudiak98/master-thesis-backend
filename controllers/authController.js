const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({'message':'Email and password are required.'});
   
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.sendStatus(401); // unauthorized 

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);

        const accessToken = jwt.sign(
            { 
                'UserInfo': {
                    'email': foundUser.email,
                    'roles': roles
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        const refreshToken = jwt.sign(
            { 'email': foundUser.email }, 
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken, roles});
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };