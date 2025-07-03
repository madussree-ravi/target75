import express from "express"
import { getAllSubjects, getSpecificSubject,getAttendancePercentage,getAllPercentages, addSubject, markAttendance, updateSubject, deleteSubject, undoAttendance } from "../controllers/attendanceController.js"

const router = express.Router()

router.get("/view",getAllSubjects); //used

router.post("/addSubject",addSubject); //used

router.get("/percentage",getAllPercentages);

router.patch("/:id/markAttendance",markAttendance); //used

router.delete("/:id/delete",deleteSubject); //used

router.get("/:id",getSpecificSubject); //used

router.get("/:id/percentage",getAttendancePercentage);

router.put("/:id/update",updateSubject);

router.delete("/:id/undo",undoAttendance); //used

export default router;
