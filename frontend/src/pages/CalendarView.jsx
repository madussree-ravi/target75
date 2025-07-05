import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { DotIcon, CalendarCheck2Icon, CalendarX2Icon, ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const CalendarView = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const fetchSubject = async () => {
    try {
      const res = await api.get(`/attendance/${id}`);
      setSubject(res.data);
      setLoading(false);

    } catch (err) {
      toast.error("Failed to load subject");
      console.log(err)
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubject();
  }, [id]);

  // Generate calendar days with attendance status
  const generateCalendarDays = () => {
    if (!subject) return [];
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Previous month's days
    for (let i = 0; i < startDay; i++) {
      days.push({
        day: new Date(year, month, -i).getDate(),
        isCurrentMonth: false,
        date: new Date(year, month, -i),
        status: null
      });
    }
    days.reverse();
    
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const attendanceRecordsForDay = subject.attendanceRecords.filter(record => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getDate() === currentDate.getDate() &&
          recordDate.getMonth() === currentDate.getMonth() &&
          recordDate.getFullYear() === currentDate.getFullYear()
        );
      });
      
      days.push({
        day: i,
        isCurrentMonth: true,
        date: currentDate,
        status: attendanceRecordsForDay.length > 0 ? attendanceRecordsForDay.map(r => r.status) : null
      });
    }
    
    // Next month's days to fill the grid
    const totalCells = Math.ceil(days.length / 7) * 7;
    let nextMonthDay = 1;
    while (days.length < totalCells) {
      days.push({
        day: nextMonthDay,
        isCurrentMonth: false,
        date: new Date(year, month + 1, nextMonthDay),
        status: null
      });
      nextMonthDay++;
    }
    
    return days;
  };

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + offset,
      1
    ));
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const today = new Date();

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!subject) {
    return <div className="text-center py-8">Subject not found</div>;
  }

  return (
    <div className="min-h-10 bg-base-200 p-4 md:p-8">
      <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        <Link to={"/manageSubject"} className="btn btn-primary mb-4">
          <ArrowLeftIcon className="size-5"/>
          <span>Back</span>
        </Link>

        <div className="card bg-base-100 p-6 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
          {/* Attendance Summary */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-base-content mb-2">{subject.subject}</h1>
            <div className="flex flex-wrap gap-6 text-gray-200">
              <div className="flex items-center">
                <CalendarCheck2Icon className="h-4 w-4 mr-1 text-green-600" />
                <span>Present: {subject.presentCount}</span>
              </div>
              <div className="flex items-center">
                <CalendarX2Icon className="h-4 w-4 mr-1 text-red-600" />
                <span>Absent: {subject.absentCount}</span>
              </div>
              <div>
                <span>Total: {subject.totalClasses}</span>
                
              </div>
              {subject.noClassCount > 0 && (
                <div>
                  <span>No Class: {subject.noClassCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-200">{monthName}</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => changeMonth(-1)}
                  className="p-2 rounded hover:bg-[#00FF9D]"
                >
                  &lt;
                </button>
                <button 
                  onClick={() => changeMonth(1)}
                  className="p-2 rounded hover:bg-[#00FF9D]"
                >
                  &gt;
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-[#00FF9D] py-2">
                  {day}
                </div>
              ))}

              {generateCalendarDays().map((dayObj, index) => {
                const isToday = 
                  dayObj.date.getDate() === today.getDate() &&
                  dayObj.date.getMonth() === today.getMonth() &&
                  dayObj.date.getFullYear() === today.getFullYear();
                
                return (
                  <div 
                    key={index}
                    className={`p-2 h-16 text-center border rounded
                    ${isToday ? 'border-2 border-[#00FF9D]' : ''}`}>
                    <div className="font-medium">{dayObj.day}</div>
                    {Array.isArray(dayObj.status) && dayObj.status.length > 0 && (
                      <div className="flex justify-center mt-1">
                        {dayObj.status.map((s, i) => (
                          <DotIcon
                            key={i}
                            className={`w-6 h-6 ${
                              s === 'Present' ? 'text-green-600' : 'text-red-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Class Days Information */}
          {subject.classDays && subject.classDays.length > 0 && (
            <div className="w-100 h-28 mt-6 p-4 bg-base-500 border-2 border-[#00FF9D] rounded-xl">
              <h3 className="font-medium text-base-content 0 mb-2">Class Days:</h3>
              <div className="flex flex-wrap gap-2">
                {subject.classDays.map((day, index) => (
                  <span key={index} className="px-3 py-1 bg-primary text-black rounded-full text-sm">
                    {day}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default CalendarView;