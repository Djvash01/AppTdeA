const mongoose = require('mongoose');
const {Schema} = mongoose;

const CourseSchema = new Schema({
    id:{type: String, required:true, index:true, unique:true},
    nameCourse:{type: String, required:true},
    description:{type: String, required:true},
    cost:{type: Number, required:true},
    mode:{type:String},
    hours:{type: Number},
    status:{type: String, default:'disponible'},
    enrollees:[{
        dni:{type: String, required:true},
        nameCourse:{type: String, required:true},
        email:{type: String, required:true},
        phone:{type:String, required:true}
    }],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course',CourseSchema);