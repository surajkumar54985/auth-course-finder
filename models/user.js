const mongoose = require('mongoose');

// var bcrypt = require('bcrypt');

// const multer = require('multer');
// const path = require('path');

// const AVATAR_PATH = path.join('/uploads/users/avatars');

// var hash_password = function( password ) {
//     let salt = bcrypt.genSaltSync(); // enter number of rounds, default: 10
//     let hash = bcrypt.hashSync( password, salt );
//     return hash;
// };

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,

    },
    name : {
        type: String,
        required: true
    },
    avatar : {
        type : String
    },
    verified : {
        type : Boolean,
        default : false
    }
},{
    timestamps:true
});

// userSchema.methods.comparePassword = function(password) {
//     if ( ! this.password ) { return false; }
//     return bcrypt.compareSync( password, this.password );
// };

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,'..',AVATAR_PATH));
//       /*cb(null,'/uploads/users/avtars');*/
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now());
//     }
// });

// userSchema.pre('save', function(next) {
//     // check if password is present and is modified.
//     if ( this.password && this.isModified('password') ) {
//         this.password = hash_password(this.password);
//     }
//     next();
// });

//static methods
// userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
// userSchema.statics.avatarPath = AVATAR_PATH;


const User = mongoose.model('User',userSchema);

module.exports = User;