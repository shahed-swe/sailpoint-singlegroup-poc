const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

// Add pre-save middleware to generate groupId if not provided
groupSchema.pre('save', async function(next) {
    if (!this.groupId) {
        const lastGroup = await this.constructor.findOne({}, {}, { sort: { groupId: -1 } });
        const lastNumber = lastGroup ? parseInt(lastGroup.groupId.slice(3)) : 0;
        this.groupId = `GRP${(lastNumber + 1).toString().padStart(6, '0')}`;
    }
    next();
});

module.exports = mongoose.model('Group', groupSchema);
