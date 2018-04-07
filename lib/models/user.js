const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// saved passwords are automatically hashed
userSchema.pre('save', function(next) {
    const user = this;
    if(user.isModified('password') || user.isNew){
        bcrypt.hash(user.password, 10, (err, hash) => {
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    } else {
        return next();
    }
});

// compares a plaintext password against a hash
userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);