const mongoose = require('mongoose');
const User = require('../models/User');
const Group = require('../models/Group');
require('dotenv').config();

const groups = [
    { name: 'Admin', groupId: 'GRP000001' },
    { name: 'User', groupId: 'GRP000002' },
    { name: 'Developer', groupId: 'GRP000003' },
    { name: 'Manager', groupId: 'GRP000004' },
    { name: 'HR', groupId: 'GRP000005' }
];

const users = [
    {
        userId: 'USER000001',
        salary_id: 'EMP001',
        firstname: 'John',
        lastname: 'Doe',
        username: 'john.doe',
        fullname: 'John Doe',
        active: true
    },
    {
        userId: 'USER000002',
        salary_id: 'EMP002',
        firstname: 'Jane',
        lastname: 'Smith',
        username: 'jane.smith',
        fullname: 'Jane Smith',
        active: true
    },
    {
        userId: 'USER000003',
        salary_id: 'EMP003',
        firstname: 'Mike',
        lastname: 'Johnson',
        username: 'mike.johnson',
        fullname: 'Mike Johnson',
        active: true
    }
];

const seedDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Clear existing data
        await User.deleteMany({});
        await Group.deleteMany({});

        // Seed groups
        const createdGroups = await Group.insertMany(groups);
        console.log('Groups seeded successfully');

        // Assign random groups to users and seed users
        const usersWithGroups = users.map(user => ({
            ...user,
            group: createdGroups[Math.floor(Math.random() * createdGroups.length)].groupId
        }));
        await User.insertMany(usersWithGroups);
        console.log('Users seeded successfully');

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
