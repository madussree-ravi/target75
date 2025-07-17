import express from "express"
import { getAllSubjects, getSpecificSubject, addSubject, markAttendance, updateSubject, deleteSubject, undoAttendance } from "../controllers/attendanceController.js"
import verifyFirebaseToken from "../middleware/firebaseAuth.js";

const router = express.Router()
router.use(verifyFirebaseToken);

router.get("/view",getAllSubjects); //used

router.post("/addSubject",addSubject); //used

router.patch("/:id/markAttendance",markAttendance); //used

router.delete("/:id/delete",deleteSubject); //used

router.get("/:id",getSpecificSubject); //used

router.put("/:id/update",updateSubject); //used

router.delete("/:id/undo",undoAttendance); //used

export default router;
