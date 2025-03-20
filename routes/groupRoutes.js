const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const logger = require('../utils/logger');

// Get all groups
router.get('/', async (req, res) => {
    try {
        logger.info('Fetching all groups');
        const groups = await Group.find();
        logger.info('Groups fetched successfully', { count: groups.length });
        res.json(groups);
    } catch (error) {
        logger.error('Error fetching groups', error);
        res.status(500).json({ message: error.message });
    }
});

// Create group
router.post('/', async (req, res) => {
    try {
        logger.info('Creating new group', { payload: req.body });
        const group = new Group(req.body);
        await group.save();
        logger.info('Group created successfully', { groupId: group.groupId });
        res.status(201).json(group);
    } catch (error) {
        logger.error('Error creating group', error, { payload: req.body });
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
