import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EditSubject = () => {
  const [subjectData, setSubjectData] = useState({
    subject: "",
    classDays: [],
    alreadyPresent: 0,
    alreadyAbsent: 0
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Calculate total
  const total = Number(subjectData.alreadyPresent) + Number(subjectData.alreadyAbsent);

  useEffect(() => {
    const fetchSubject = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/attendance/${id}`);
        setSubjectData({
          subject: res.data.subject || "",
          classDays: res.data.classDays || [],
          alreadyPresent: res.data.alreadyPresent || 0,
          alreadyAbsent: res.data.alreadyAbsent || 0
        });
      } catch (error) {
        console.error("Error fetching subject:", error);
        toast.error("Failed to load subject data");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id, navigate]);

  const toggleDay = (day) => {
    setSubjectData(prev => ({
      ...prev,
      classDays: prev.classDays.includes(day)
        ? prev.classDays.filter(d => d !== day)
        : [...prev.classDays, day]
    }));
  };

  const handleNumberChange = (field, value) => {
    const numValue = value === "" ? "" : Number(value.replace(/\D/g, ""));
    if (numValue === "" || (!isNaN(numValue) && numValue >= 0)) {
      setSubjectData(prev => ({
        ...prev,
        [field]: numValue === "" ? "" : numValue
      }));
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!subjectData.subject.trim() || subjectData.classDays.length === 0) {
          toast.error("Subject name and at least one class day are required");
          return;
      }

      setSaving(true);
      try {
          const response = await api.put(`/attendance/${id}/update`, {
              subject: subjectData.subject,
              classDays: subjectData.classDays,
              alreadyPresent: Number(subjectData.alreadyPresent) || 0,
              alreadyAbsent: Number(subjectData.alreadyAbsent) || 0
          });
          
          toast.success("Subject updated successfully");
          navigate("/manageSubject", { state: { refreshed: true } });
      } catch (error) {
          console.error("Error updating subject:", error);
          toast.error(error.response?.data?.message || "Failed to update subject");
      } finally {
          setSaving(false);
      }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/manageSubject" className="btn btn-primary mb-4">
            <ArrowLeftIcon className="size-5" />
            <span>Back</span>
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Subject</h2>
              <form onSubmit={handleSubmit}>
                {/* Subject Name */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Subject Name"
                    className="input input-bordered"
                    value={subjectData.subject}
                    onChange={(e) => 
                      setSubjectData(prev => ({...prev, subject: e.target.value}))
                    }
                  />
                </div>

                {/* Class Days */}
                <div className="form-control mt-4 mb-4">
                  <label className="label">
                    <span className="label-text">Class Days</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {daysOfWeek.map((day) => (
                      <button
                        type="button"
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`btn btn-sm ${
                          subjectData.classDays.includes(day)
                            ? "btn-primary"
                            : "btn-outline"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attendance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Already Present */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Already Present</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="text-green-500 size-5" />
                      <input
                        type="text"
                        inputMode="numeric"
                        className="input input-bordered w-full"
                        value={subjectData.alreadyPresent}
                        onChange={(e) => 
                          handleNumberChange("alreadyPresent", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Already Absent */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Already Absent</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <XCircleIcon className="text-red-500 size-5" />
                      <input
                        type="text"
                        inputMode="numeric"
                        className="input input-bordered w-full"
                        value={subjectData.alreadyAbsent}
                        onChange={(e) => 
                          handleNumberChange("alreadyAbsent", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Total Classes */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Total Classes</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={total}
                      disabled
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={saving}
                  >
                    {saving ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubject;