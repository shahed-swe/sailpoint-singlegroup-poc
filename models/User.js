const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    salary_id: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add virtual population for group
userSchema.virtual('groupDetails', {
    ref: 'Group',
    localField: 'group',
    foreignField: 'groupId',
    justOne: true
});

// Add pre-save middleware to generate userId if not provided
userSchema.pre('save', async function(next) {
    if (!this.userId) {
        const lastUser = await this.constructor.findOne({}, {}, { sort: { userId: -1 } });
        const lastNumber = lastUser ? parseInt(lastUser.userId.slice(4)) : 0;
        this.userId = `USER${(lastNumber + 1).toString().padStart(6, '0')}`;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
