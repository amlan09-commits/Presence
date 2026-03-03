import "react-calendar/dist/Calendar.css"
import { useState } from "react"
import Calendar from "react-calendar"

type AttendanceStatus = "Present" | "Absent" | "Holiday"

const Dashboard = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [subjects, setSubjects] = useState<string[]>([])
  const [newSubject, setNewSubject] = useState<string>("")
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({})
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const isSunday = (d: Date): boolean => d.getDay() === 0

  const addSubject = () => {
    if (!newSubject.trim()) return
    setSubjects((prev) => [...prev, newSubject])
    setNewSubject("")
  }

  const markAttendance = (status: AttendanceStatus) => {
    if (!selectedSubject) return

    const key = `${selectedSubject}-${date.toDateString()}`

    setAttendance((prev) => ({
      ...prev,
      [key]: status,
    }))
  }

  //  THIS CONTROLS DATE COLORING
  const tileClassName = ({
    date: tileDate,
    view,
  }: {
    date: Date
    view: string
  }) => {
    if (view !== "month") return ""

    // If no subject selected, still highlight Sundays
    if (!selectedSubject) {
      if (isSunday(tileDate)) return "holiday-tile"
      return ""
    }

    const key = `${selectedSubject}-${tileDate.toDateString()}`
    const status = attendance[key]

    if (status === "Present") return "present-tile"
    if (status === "Absent") return "absent-tile"
    if (status === "Holiday") return "holiday-tile"

    // Sunday default holiday
    if (isSunday(tileDate)) return "holiday-tile"

    return ""
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-pink-100 p-4 sm:p-6 font-fira-sans">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-purple-700 uppercase">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow-lg rounded-xl p-4">

          <h2 className="text-lg font-semibold mb-3">Subjects</h2>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Add subject"
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              onClick={addSubject}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition cursor-pointer"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {subjects.map((sub, index) => (
              <li
                key={index}
                onClick={() => setSelectedSubject(sub)}
                className={`cursor-pointer text-sm p-2 rounded-lg transition ${
                  selectedSubject === sub
                    ? "bg-purple-200 font-semibold"
                    : "hover:bg-purple-100"
                }`}
              >
                {sub}
              </li>
            ))}
          </ul>

        </div>

        <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-4">

          {selectedSubject && (
            <p className="mb-3 font-medium text-purple-600">
              Selected Subject: {selectedSubject}
            </p>
          )}

          <Calendar
            onChange={(value) => setDate(value as Date)}
            value={date}
            tileClassName={tileClassName}
          />

          <p className="mt-4 text-gray-700">
            Selected Date: {date.toDateString()}
          </p>

          {isSunday(date) && (
            <p className="text-yellow-600 font-semibold mt-2">
              Sunday is automatically marked as Holiday
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={() => markAttendance("Present")}
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition"
            >
              Present
            </button>

            <button
              onClick={() => markAttendance("Absent")}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition"
            >
              Absent
            </button>

            <button
              onClick={() => markAttendance("Holiday")}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md text-sm hover:bg-yellow-600 transition"
            >
              Holiday
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard