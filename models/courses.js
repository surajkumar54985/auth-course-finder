const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseSchema = new mongoose.Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "admin",
        required: true,
    },
    courseName : {
        type: String,
        required: true
    },
    pSubject : {
        type : String
    },
    cSubject : {
        type: String
    },
    Provider : {
        type: String
    },
    College : {
        type : String
    }
},{
    timestamps:true
});


const Course = mongoose.model('Course',courseSchema);

module.exports = Course;