import { Routes, Route } from "react-router-dom"
import Homepage from "./components/Homepage"
import Loginpage from "./components/Loginpage"
import Registerpage from "./components/Registerpage"
import Dashboard from "./components/Dashboard"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/register' element={<Registerpage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default App