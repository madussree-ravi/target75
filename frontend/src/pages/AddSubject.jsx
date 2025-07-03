import {useState} from "react"
import {Link,useNavigate} from "react-router"
import {ArrowLeftIcon,CheckCircleIcon,XCircleIcon} from "lucide-react"
import toast from "react-hot-toast"
import api from "../lib/axios"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AddSubject = () => {
  const [subject,setSubject]=useState("")
  const [classDays, setClassDays] = useState([]);
  const [alreadyPresent, setAlreadyPresent] = useState(0);
  const [alreadyAbsent, setAlreadyAbsent] = useState(0);
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()

  const toggleDay = (day) => {
    setClassDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleAdd=async(e)=>{
    e.preventDefault();
    if (!subject.trim() || !classDays ){
      toast.error("All fields are required")
      return
    }
    setLoading(true)
    try{
      await api.post("/attendance/addSubject",{
        subject,
        classDays,
        alreadyPresent: Number(alreadyPresent),
        alreadyAbsent: Number(alreadyAbsent),
      });
      toast.success("Subject Added!")
      navigate("/")
    }catch(error){
      console.log("Error adding subject",error)
      if (error.response.status===429){
        toast.error("Slow Down! you are adding too many subjects too fast",
          {duration:4000,
          icon:"💀",
        
      })
    }else{
        toast.error("Failed to Add subject")
      }
    }finally{

    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-primary mb-4">
            <ArrowLeftIcon className="size-5" />
            <span>Back</span>
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Add Subject</h2>
              <form onSubmit={handleAdd}>
                {/* Subject Name */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Subject Name"
                    className="input input-bordered"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
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
                          classDays.includes(day)
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
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="input input-bordered w-24"
                    value={alreadyPresent}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/^0+(?!$)/, ""); // remove leading zeros
                      if (/^\d*$/.test(raw)) setAlreadyPresent(raw); // accept only digits
                    }}
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
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="input input-bordered w-24"
                    value={alreadyAbsent}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/^0+(?!$)/, ""); // remove leading zeros
                      if (/^\d*$/.test(raw)) setAlreadyAbsent(raw); // accept only digits
                    }}
                  />
                  </div>
                </div>

                {/* Submit */}
                <div className="card-actions justify-end mt-6">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Adding..." : "Add Subject"}
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

export default AddSubject;