var mongoose = require('mongoose');
const { v1 } = require('uuid');
const crypto = require('crypto');
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: Date
    }
);

userSchema.virtual("password").set(function (password) {
    this._password = password;
    this.salt = v1()
    this.hashed_password = this.encrypted_password(password);
})
    .get(
        function () {
            return this._password;

        }
    )

userSchema.methods = {
    authenticate: function (plaintext) {
        return this.encrypted_password(plaintext) == this.hashed_password;
    },
    encrypted_password: function (password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (error) {
            return '';
        }
    }
}
module.exports = mongoose.model('User', userSchema)