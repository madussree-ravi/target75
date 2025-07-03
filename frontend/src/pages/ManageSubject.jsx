import React, { useEffect, useState, useLocation} from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon, PencilIcon, CalendarDaysIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import Swal from "sweetalert2";

const ManageSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/attendance/view");
      setSubjects(res.data);
    } catch (err) {
      toast.error("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e,id) => {
    e.preventDefault();
    const result = await Swal.fire({
    title: "Delete subject?",
    text: "This can't be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    width: "300px", // 👈 smaller width
    });
    if (result.isConfirmed){
    try {
      await api.delete(`/attendance/${id}/delete`);
      setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject._id !== id));
    toast.success("Subject deleted");
    } catch (err) {
      toast.error("Failed to delete subject");
    }
  };
  }

    useEffect(() => {
    if (location.state?.refreshed) {
      fetchSubjects();
      // Clear the state to prevent infinite refreshes
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);
  
  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto p-4 mt-6 space-y-6">
        <Link to={"/"} className="btn btn-primary mb-4">
          <ArrowLeftIcon className="size-5" />
          <span>Back</span>
        </Link>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : subjects.length === 0 ? (
          <p className="text-center text-gray-400">No subjects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject._id}
                className="card bg-base-100 p-6 hover:shadow-lg transition-all duration-200 
    border-t-4 border-solid border-[#00FF9D]"
              >

                <div className="flex justify-between items-center">
                  <div>
                      <h2 className="card-title text-base-content">{subject.subject}</h2>
                      <p className="text-sm text-gray-100">
                      Present: {subject.presentCount} | Total: {subject.totalClasses}
                      </p>
                  </div>
  
                  <div className="flex gap-3">
                      <Link to={`/editSubject/${subject._id}`} className="text-primary hover:scale-110 transition mr-4">
                        <PencilIcon className="size-5" />
                      </Link>
                      <Link to={`/calendarView/${subject._id}`} className="text-primary hover:scale-110 transition mr-4">
                        <CalendarDaysIcon className="size-5"/>
                      </Link>
                      <button
                      className="text-red-500 hover:scale-110 transition"
                      onClick={(e) => handleDelete(e,subject._id)}
                      >
                      <Trash2Icon className="size-5" />
                      </button>
                  </div>
              </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSubject;
