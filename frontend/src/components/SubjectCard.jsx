import {UndoIcon} from "lucide-react"

const SubjectCard = ({ subject, presentCount, totalClasses, onMark }) => {
  const percentage = totalClasses === 0 ? 0 : ((presentCount / totalClasses) * 100).toFixed(0);

  return (
    <div className="card bg-base-100 p-6 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]">
        <div className="flex justify-between items-center">
        <div>
            <h2 className="card-title text-base-content">{subject}</h2>
            <p className="text-gray-100">Attendance: {presentCount}/{totalClasses}</p>
        </div>

        <div
            className={`radial-progress ${percentage < 75 ? 'text-red-500' : 'text-green-500'}`}
            style={{ "--value": percentage, "--size": "60px" }}
        >
            {percentage}%
        </div>
        </div>


      <div className="mt-4 flex justify-between">
        <button onClick={() => onMark("present")} className="text-white bg-green-400 px-3 py-1 rounded-md">Present</button>
        <button onClick={() => onMark("absent")} className="text-white bg-red-400 px-3 py-1 rounded-md">Absent</button>
        <button onClick={() => onMark("noclass")} className="text-white bg-yellow-300 px-3 py-1 rounded-md">No Class</button>
        <div className="flex items-center gap-1 text-white cursor-pointer"
        onClick={() => onMark("undo")}>
        <UndoIcon className="size-5" />
        <span>Undo</span>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
