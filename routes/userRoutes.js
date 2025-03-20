const express = require('express');
const router = express.Router();
const User = require('../models/User');
const logger = require('../utils/logger');

// Create user
router.post('/', async (req, res) => {
    try {
        logger.info('Creating new user', { payload: req.body });
        const user = new User(req.body);
        await user.save();
        logger.info('User created successfully', { userId: user.userId });
        res.status(201).json(user);
    } catch (error) {
        logger.error('Error creating user', error, { payload: req.body });
        res.status(400).json({ message: error.message });
    }
});

// Get users with group
router.get('/', async (req, res) => {
    try {
        logger.info('Fetching all users');
        const users = await User.find().populate('groupDetails');
        logger.info('Users fetched successfully', { count: users.length });
        res.json(users);
    } catch (error) {
        logger.error('Error fetching users', error);
        res.status(500).json({ message: error.message });
    }
});

// Update user
router.put('/:userId', async (req, res) => {
    try {
        logger.info('Updating user', { userId: req.params.userId, payload: req.body });
        const user = await User.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true }
        ).populate('groupDetails');
        if (!user) {
            logger.info('User not found', { userId: req.params.userId });
            return res.status(404).json({ message: 'User not found' });
        }
        logger.info('User updated successfully', { userId: user.userId });
        res.json(user);
    } catch (error) {
        logger.error('Error updating user', error, { userId: req.params.userId, payload: req.body });
        res.status(400).json({ message: error.message });
    }
});

// Get user by userId
router.get('/:userId', async (req, res) => {
    try {
        logger.info('Fetching user by ID', { userId: req.params.userId });
        const user = await User.findOne({ userId: req.params.userId }).populate('groupDetails');
        if (!user) {
            logger.info('User not found', { userId: req.params.userId });
            return res.status(404).json({ message: 'User not found' });
        }
        logger.info('User fetched successfully', { userId: user.userId });
        res.json(user);
    } catch (error) {
        logger.error('Error fetching user', error, { userId: req.params.userId });
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
