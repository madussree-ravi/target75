import {useState,useEffect} from 'react'
import toast from "react-hot-toast"

import NavBar from "../components/NavBar.jsx"
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import SubjectCard from "../components/SubjectCard.jsx"
import api from "../lib/axios"
import { getAuth } from "firebase/auth";

const HomePage = () => {
    const [isRateLimited,setIsRateLimited]=useState(false)
    const [attendance,setAttendance]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=> {
        fetchAttendance();
    },[]);

    const fetchAttendance = async()=>{
        try{
            const res=await api.get("/attendance/view")
            console.log(res.data); 
            setAttendance(res.data)
            setIsRateLimited(false)
        }catch(error){
            console.log("Error in fetching attendance");
            if (error.response.status===429){
                setIsRateLimited(true)
            }else{
                toast.error("Failed to load attendance");
            }
        }finally{
            setLoading(false);
        }
    }

    const handleMarkAttendance = async (subjectId, status) => {
        if (status === "undo") {
            try {
                await api.delete(`/attendance/${subjectId}/undo`);
                toast.success("Undo successful");
                fetchAttendance();
            } catch (err) {
                toast.error("Failed to undo");
                console.error(err);
            }
            return; 
        }

        try {
        await api.patch(`/attendance/${subjectId}/markAttendance`, {
            status:
            status === "present"
                ? "Present"
                : status === "absent"
                ? "Absent"
                : "No Class",
        });
        toast.success("Attendance marked");
        fetchAttendance(); // refresh UI after marking
        } catch (err) {
        toast.error("Failed to mark attendance");
        console.error(err);
        }
    };

    return <div className="min-h-screen">
        <NavBar/>
        {isRateLimited && <RateLimitedUI/>}
        <div className="max-w-7xl mx-auto p-4 mt-6 space-y-6">
            {loading && <div className="text-center text-primary py-10">Loading attendance...</div>}
            {attendance.length>0 && !isRateLimited && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {attendance.map(subject =>(
                        <SubjectCard
                            key={subject._id}
                            subject={subject.subject}
                            presentCount={subject.presentCount}
                            totalClasses={subject.totalClasses}
                            onMark={(status)=> handleMarkAttendance(subject._id,status)}
                        />
                    ))}
                    </div>
            )}
            {!isRateLimited && !loading && attendance.length===0 && <div className="text-center text-primary py-10">No Subjects Added yet!</div> }
        </div>
    </div>;
}

export default HomePage;

