import Attendance from "../models/Attendance.js"
export async function getAllSubjects(_,res){
    try{
        const attendance = await Attendance.find();
        res.status(200).json(attendance);
    }
    catch(error){
        console.error("Error in get all subjects controller");
        res.status(500).json({message:"Internal server error"});
    }
}

export async function getSpecificSubject(req,res){
    try{
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance)
            return res.status(404).json({message:"Subject not found"});
        res.status(200).json(attendance)
    }
    catch(error){
        console.error("Error in get specific subject controller");
        res.status(500).json({message:"Internal server error"});
    }
}

export async function addSubject(req,res){
    try{
        const {subject,classDays,alreadyPresent,alreadyAbsent}=req.body
        const Subject =new Attendance(
            {subject,classDays,presentCount:alreadyPresent,absentCount:alreadyAbsent,totalClasses:alreadyPresent+alreadyAbsent})
        const savedSubject = await Subject.save()
        res.status(201).json(savedSubject);
    }catch(error){
        console.error("Error in add subject controller");
        res.status(500).json({message:"Internal server error"});
    }
}

export async function markAttendance(req,res){
    try{
        const {status} = req.body;
        const {id}=req.params;
        const fieldMap={
            Present:"presentCount",
            Absent:"absentCount",
            "No Class":"noClassCount"
        };
        const field=fieldMap[status];
        if(!field){
            return res.status(400).json({message:"Invalid Status value"});
        }
        const subject = await Attendance.findById(id);
        if (!subject){
            return res.status(404).json({message:"Subject not found"});
        }
        subject.attendanceRecords.push({ date: new Date(), status });

        
        if (status === "Present") {
            subject.presentCount += 1;
            subject.totalClasses += 1;
        }
        else if (status === "Absent") {
            subject.absentCount += 1;
            subject.totalClasses += 1;
        }
        else if (status === "No Class") subject.noClassCount += 1;

        const markedS= await subject.save();

        res.status(201).json(markedS);
    }
    catch(error){
        console.error("Error in mark attendance controller");
        res.status(500).json({message:"Internal server error"});
    }
}

export async function updateSubject(req, res) {
    try {
        const { subject, classDays, alreadyPresent, alreadyAbsent } = req.body;
        const { id } = req.params;
        
        const totalClasses = Number(alreadyPresent) + Number(alreadyAbsent);
        
        const updatedSubject = await Attendance.findByIdAndUpdate(
            id,
            {
                subject,
                classDays,
                presentCount: alreadyPresent,
                absentCount: alreadyAbsent,
                totalClasses
            },
            { new: true }
        );

        if (!updatedSubject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        res.status(200).json(updatedSubject);
    } catch (error) {
        console.error("Error updating subject:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
   

export async function deleteSubject(req,res){
    try{
        const deletedSubject = await Attendance.findByIdAndDelete(req.params.id)
        if (!deletedSubject){
            return res.status(404).json({message:"Subject not found"});
        }
        res.status(200).json({message:"Subject deleted successfully"})

    }catch(error){
        console.error("Error in mark attendance controller");
        res.status(500).json({message:"Internal server error"});
    }
}

export async function undoAttendance(req,res){
    try{
        const subject = await Attendance.findById(req.params.id)
        if (!subject|| subject.attendanceRecords.length===0){
            return res.status(404).json({message:"No attendance record found to undo"});
        }
        const lastRecord=subject.attendanceRecords.pop();
        if (lastRecord.status==="Present") {
            subject.presentCount-=1
            subject.totalClasses-=1
        }
        else if (lastRecord.status==="Absent") {
            subject.presentCount-=1
            subject.totalClasses-=1
        }
        else if (lastRecord.status==="No Class") {
            subject.noClassCount-=1
        }
        await subject.save();
        res.status(200).json({message:"Last attendance record undone successfully"});

    }catch(error){
        console.error("Error in undo attendance controller");
        res.status(500).json({message:"Internal server error"});
    }
}