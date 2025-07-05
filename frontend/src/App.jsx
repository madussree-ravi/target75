import {Route,Routes} from "react-router"
import toast from "react-hot-toast"
import HomePage from "./pages/HomePage.jsx"
import AddSubject from "./pages/AddSubject.jsx"
import DeleteSubject from "./pages/DeleteSubject.jsx"
import EditSubject from "./pages/EditSubject.jsx"
import ManageSubject from "./pages/ManageSubject.jsx"
import CalendarView from "./pages/CalendarView.jsx"

const App = () => {
  return (
    <div className="relative h-full w-full">
       <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/addSubject" element={<AddSubject/>}/>
        <Route path="/deleteSubject/:id" element={<DeleteSubject/>}/>
        <Route path="/manageSubject" element={<ManageSubject/>}/>
        <Route path="/editSubject/:id" element={<EditSubject/>}/>
        <Route path="/calendarView/:id" element={<CalendarView/>}/>
    </Routes>
  </div>
  );
}

export default App;