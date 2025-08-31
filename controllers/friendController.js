// controllers/friendController.js
const User = require('../models/User');

// @desc    Send a friend request
// @route   PUT /api/friends/request/:id
// @access  Private
exports.sendFriendRequest = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const receiver = await User.findById(req.params.id);

        // Check if the user is trying to friend themselves
        if (user.id === receiver.id) {
            return res.status(400).json({ msg: 'Cannot send a friend request to yourself' });
        }

        // Check if request has already been sent
        if (receiver.friendRequests.includes(user.id) || user.friends.includes(receiver.id)) {
            return res.status(400).json({ msg: 'Friend request already sent or user is already a friend' });
        }

        // Add the sender to the receiver's friendRequests array
        receiver.friendRequests.unshift(user.id);
        await receiver.save();

        res.json({ msg: 'Friend request sent successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Accept a friend request
// @route   PUT /api/friends/accept/:id
// @access  Private
exports.acceptFriendRequest = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const sender = await User.findById(req.params.id);

        // Check if the friend request exists
        if (!user.friendRequests.includes(sender.id)) {
            return res.status(404).json({ msg: 'Friend request not found' });
        }

        // Add each other to their friends list
        user.friends.unshift(sender.id);
        sender.friends.unshift(user.id);

        // Remove the request from the receiver's list
        user.friendRequests = user.friendRequests.filter(
            (request) => request.toString() !== sender.id.toString()
        );

        await user.save();
        await sender.save();

        res.json({ msg: 'Friend request accepted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};