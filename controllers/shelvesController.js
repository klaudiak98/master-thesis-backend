const Shelf = require('../model/Shelf');
const User = require('../model/User');

const getAllShelves = async (req, res) => {
    try {
        const response = await Shelf.find();
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({'message': err.message});;
    }
}

const updateShelf = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email}).exec();
        const shelf = await Shelf.updateOne(
            {'user': user._id}, 
            {$push:
                {
                    'wantToRead': req.body.wantToRead, 
                    'currentlyReading': req.body.currentlyReading, 
                    'read': req.body.read
                }
            }
        );
        res.status(201).json({'success':`Shelf has been updated!`});
    } catch (err) {
        res.status(400).json({'message': err.message});;
    }
}

const getShelf = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email}).exec();
        const shelf = await Shelf.findOne({user: user._id}).exec();
        res.status(200).json(shelf);
    } catch (err) {
        res.status(400).json({'message': err.message});;
    }
}

const checkBookForUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email}).exec();
        const shelf = await Shelf.findOne({user: user._id}).exec();

        const bookId = req.body.bookId;
        const states = ['wantToRead', 'currentlyReading', 'read'];
        const response = states.find(state => shelf[state].includes(bookId));
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({'message': err.message});;
    }

}

const updateBookForUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email}).exec();
        const shelf = await Shelf.findOne({user: user._id}).exec();
        
        const bookId = req.body.bookId;
        const states = ['wantToRead', 'currentlyReading', 'read'];
        const oldState = states.filter(state => shelf[state].includes(bookId));
        const newState = req.body.newState;

        if (oldState.includes('wantToRead')) 
        {
            await Shelf.updateOne(
                {'user': user._id}, 
                {
                    $pull: { 'wantToRead' : bookId }
                }
            );
        } else if (oldState.includes('currentlyReading')) {
            await Shelf.updateOne(
                {'user': user._id}, 
                {
                    $pull: { 'currentlyReading' : bookId }
                }
            );
        } else if (oldState.includes('read')) {
            await Shelf.updateOne(
                {'user': user._id}, 
                {
                    $pull: { 'read' : bookId }
                }
            );
        }

        if (newState) 
        {
            if (newState.includes('wantToRead')) 
            {
                await Shelf.updateOne(
                    {'user': user._id}, 
                    {
                        $push: { 'wantToRead' : bookId }
                    }
                );
            } else if (newState.includes('currentlyReading')) {
                await Shelf.updateOne(
                    {'user': user._id}, 
                    {
                        $push: { 'currentlyReading' : bookId }
                    }
                );
            } else if (newState.includes('read')) {
                await Shelf.updateOne(
                    {'user': user._id}, 
                    {
                        $push: { 'read' : bookId }
                    }
                );
            }
        }
        
        res.status(200)
    } catch (err) {
        res.status(400).json({'message': err.message});;
    }
    
}

module.exports = {
    getAllShelves,
    updateShelf,
    getShelf,
    checkBookForUser,
    updateBookForUser,
}