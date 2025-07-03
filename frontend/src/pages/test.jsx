import { useState, useEffect } from 'react';
import { ArrowLeftIcon, PencilIcon, LoaderIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EditSubject = () => {
  const [subject, setSubject] = useState({
    subject: '',
    classDays: [],
    alreadyPresent: 0,
    alreadyAbsent: 0
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await api.get(`/attendance/${id}`);
        setSubject({
          subject: res.data.subject || '',
          classDays: res.data.classDays || [],
          alreadyPresent: res.data.alreadyPresent || 0,
          alreadyAbsent: res.data.alreadyAbsent || 0
        });
      } catch (error) {
        toast.error("Failed to fetch the subject details");
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  const toggleDay = (day) => {
    setSubject(prev => ({
      ...prev,
      classDays: prev.classDays.includes(day)
        ? prev.classDays.filter(d => d !== day)
        : [...prev.classDays, day]
    }));
  };

  const handleSave = async () => {
    if (!subject.subject.trim() || subject.classDays.length === 0) {
      toast.error("Please add a subject name and select at least one class day");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/attendance/${id}/update`, subject);
      toast.success("Subject updated successfully");
      navigate("/manageSubject");
    } catch (error) {
      console.error("Error saving the subject:", error);
      toast.error("Failed to update subject");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div>
            <Link to="/manageSubject" className="btn btn-primary mb-4">
              <ArrowLeftIcon className="size-5" />
              <span>Back</span>
            </Link>
          </div>
          <div>
            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Edit Subject</h2>

                {/* Subject Name */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Subject Name"
                    className="input input-bordered"
                    value={subject.subject}
                    onChange={(e) => setSubject(prev => ({...prev, subject: e.target.value}))}
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
                          subject.classDays.includes(day)
                            ? "btn-primary"
                            : "btn-outline"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Already Present */}
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Already Present</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="text-green-500 size-5" />
                    <input
                      type="number"
                      min="0"
                      className="input input-bordered w-24"
                      value={subject.alreadyPresent}
                      onChange={(e) => setSubject(prev => ({
                        ...prev,
                        alreadyPresent: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                </div>

                {/* Already Absent */}
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Already Absent</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <XCircleIcon className="text-red-500 size-5" />
                    <input
                      type="number"
                      min="0"
                      className="input input-bordered w-24"
                      value={subject.alreadyAbsent}
                      onChange={(e) => setSubject(prev => ({
                        ...prev,
                        alreadyAbsent: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn btn-primary w-full"
                  >
                    {saving ? (
                      <>
                        <LoaderIcon className="animate-spin size-5" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <PencilIcon className="size-5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubject;