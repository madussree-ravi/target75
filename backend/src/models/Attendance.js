import mongoose from "mongoose"

//1 create a schema
//2 model based off that schema

const attendanceRecordSchema=new mongoose.Schema({
    date:{type:Date, required:true},
    status:{
        type:String,
        required:true,
        enum:["Present","Absent","No Class"]
    }
});
const subjectSchema = new mongoose.Schema({
    subject:{type:String,required:true},
    classDays:[{type:String,enum:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]}],
    presentCount:{type:Number,default:0},
    absentCount:{type:Number,default:0},
    noClassCount:{type:Number,default:0},
    totalClasses:{type:Number,default:0},
    attendanceRecords:[attendanceRecordSchema]
},{timestamps:true});

const Attendance =mongoose.model("Attendance",subjectSchema) //model creation based off subjectschema

export default Attendance;