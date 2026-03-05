import { useState,useEffect } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { PieChart,Pie,Cell,ResponsiveContainer } from "recharts"
import { useNavigate } from "react-router-dom"

type AttendanceStatus="Present"|"Absent"|"Holiday"

const COLORS=["#22c55e","#ef4444"]

const Dashboard=()=>{

const navigate=useNavigate()

const [date,setDate]=useState<Date>(new Date())
const [subjects,setSubjects]=useState<string[]>([])
const [newSubject,setNewSubject]=useState("")
const [selectedSubject,setSelectedSubject]=useState<string|null>(null)

const [attendance,setAttendance]=useState<Record<string,AttendanceStatus>>({})

const isSunday=(d:Date)=>d.getDay()===0

/* LOAD SAVED DATA */
useEffect(()=>{
const savedSubjects=localStorage.getItem("subjects")
const savedAttendance=localStorage.getItem("attendance")

if(savedSubjects) setSubjects(JSON.parse(savedSubjects))
if(savedAttendance) setAttendance(JSON.parse(savedAttendance))
},[])

/* SAVE DATA */
useEffect(()=>{
localStorage.setItem("subjects",JSON.stringify(subjects))
localStorage.setItem("attendance",JSON.stringify(attendance))
},[subjects,attendance])

const addSubject=()=>{
if(!newSubject.trim()) return
setSubjects(prev=>[...prev,newSubject])
setNewSubject("")
}

const removeSubject=(sub:string)=>{
setSubjects(prev=>prev.filter(s=>s!==sub))
if(selectedSubject===sub) setSelectedSubject(null)
}

const markAttendance=(status:AttendanceStatus)=>{
if(!selectedSubject) return
const key=`${selectedSubject}-${date.toDateString()}`
setAttendance(prev=>({...prev,[key]:status}))
}

const tileClassName=({date:tileDate,view}:{date:Date,view:string})=>{
if(view!=="month") return ""

if(!selectedSubject){
if(isSunday(tileDate)) return "holiday-tile"
return ""
}

const key=`${selectedSubject}-${tileDate.toDateString()}`
const status=attendance[key]

if(status==="Present") return "present-tile"
if(status==="Absent") return "absent-tile"
if(status==="Holiday") return "holiday-tile"

if(isSunday(tileDate)) return "holiday-tile"

return ""
}

/* ATTENDANCE STATS */
const getStats=(subject:string)=>{

const records=Object.entries(attendance).filter(([key])=>key.startsWith(subject))

let present=0
let absent=0

records.forEach(([_,status])=>{
if(status==="Present") present++
if(status==="Absent") absent++
})

const total=present+absent

const percentage=total===0?0:(present/total)*100

/* CLASSES NEEDED FOR 75 */

let needed=0
if(percentage<75){

let p=present
let t=total

while((p/t)*100<75){
p++
t++
needed++
}

}

/* BUNK CALCULATOR */

let bunk=0
if(percentage>=75){

let p=present
let t=total

while(((p)/(t+1))*100>=75){
t++
bunk++
}

}

return{
present,
absent,
total,
percentage:percentage.toFixed(1),
needed,
bunk
}

}

const logout=()=>{
localStorage.clear()
navigate("/login")
}

return(

<div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 p-4 sm:p-6">

{/* TOP BAR */}

<div className="flex justify-between items-center mb-6">

<h1 className="text-2xl sm:text-3xl font-bold text-purple-700">
Presence Dashboard
</h1>

<button
onClick={logout}
className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
>
Logout
</button>

</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

{/* SUBJECT PANEL */}

<div className="bg-white shadow-lg rounded-xl p-4">

<h2 className="font-semibold mb-3">Subjects</h2>

<div className="flex gap-2 mb-4">

<input
value={newSubject}
onChange={(e)=>setNewSubject(e.target.value)}
placeholder="Add subject"
className="flex-1 border rounded-lg px-3 py-2 text-sm"
/>

<button
onClick={addSubject}
className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm"
>
Add
</button>

</div>

<ul className="space-y-2">

{subjects.map((sub,index)=>(

<li
key={index}
className={`flex justify-between items-center text-sm p-2 rounded-lg ${
selectedSubject===sub
?"bg-purple-200"
:"hover:bg-purple-100"
}`}
>

<span
onClick={()=>setSelectedSubject(sub)}
className="cursor-pointer flex-1"
>
{sub}
</span>

<button
onClick={()=>removeSubject(sub)}
className="text-red-500 text-xs"
>
Remove
</button>

</li>

))}

</ul>

</div>

{/* MAIN SECTION */}

<div className="lg:col-span-2 space-y-6">

<div className="bg-white shadow-lg rounded-xl p-4">

{selectedSubject &&(

<p className="mb-3 font-medium text-purple-600">
Selected: {selectedSubject}
</p>

)}

<Calendar
onChange={(value)=>setDate(value as Date)}
value={date}
tileClassName={tileClassName}
/>

<p className="mt-4">
Selected Date: {date.toDateString()}
</p>

<div className="mt-4 flex flex-wrap gap-3">

<button
onClick={()=>markAttendance("Present")}
className="bg-green-500 text-white px-4 py-2 rounded"
>
Present
</button>

<button
onClick={()=>markAttendance("Absent")}
className="bg-red-500 text-white px-4 py-2 rounded"
>
Absent
</button>

<button
onClick={()=>markAttendance("Holiday")}
className="bg-yellow-500 text-white px-4 py-2 rounded"
>
Holiday
</button>

</div>

</div>

{/* STATS */}

{selectedSubject &&(

<div className="bg-white shadow-lg rounded-xl p-4">

{(()=>{
const stats=getStats(selectedSubject)

return(

<div className="space-y-3">

<p>Classes Attended: {stats.present}</p>

<p>Classes Missed: {stats.absent}</p>

<p>Total Classes: {stats.total}</p>

<p className="font-semibold">
Attendance: {stats.percentage}%
</p>

{Number(stats.percentage)<75
?
<p className="text-red-600">
Attend {stats.needed} more classes to reach 75%
</p>
:
<p className="text-green-600">
You can miss {stats.bunk} more classes
</p>
}

{/* CHART */}

<div className="h-40">

<ResponsiveContainer width="100%" height="100%">

<PieChart>

<Pie
data={[
{name:"Present",value:stats.present},
{name:"Absent",value:stats.absent}
]}
dataKey="value"
outerRadius={60}
label
>

{COLORS.map((color,index)=>(
<Cell key={index} fill={color}/>
))}

</Pie>

</PieChart>

</ResponsiveContainer>

</div>

</div>

)

})()}

</div>

)}

</div>

</div>

</div>

)

}

export default Dashboard