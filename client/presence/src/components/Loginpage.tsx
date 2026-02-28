import { Link } from "react-router-dom"
import { useState } from "react"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { motion } from "framer-motion"

const Loginpage = () => {

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading ] = useState<Boolean>(false)
    const [showPassword, setShowPassword] = useState<Boolean>(false)



  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-white to-purple-50 text-gray-800 overflow-hidden px-4">

      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-300 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute top-10 right-70 w-72 h-72 bg-blue-300 rounded-full blur-[150px] opacity-60"></div>
      <div className="absolute bottom-10 left-80 w-72 h-72 bg-red-300 rounded-full blur-[150px] opacity-60"></div>

      <motion.div 
      initial={{ opacity: 0, y: 40}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 w-full max-w-md bg-gray-100 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20"
      >

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 uppercase font-fira-sans">
          Login
        </h2>

        <form className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-fira-sans"
          />

          <input
            type={showPassword? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-fira-sans"
          />

          <input
            type={showPassword? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-fira-sans"
          />

          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="cursor-pointer text-gray-800 flex flex-row gap-0.5 justify-center items-center mx-auto font-medium font-fira-sans"
          >
            Show password{showPassword ? <IoEye /> : <IoEyeOff />}
          </button>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold text-white disabled:opacity-50 cursor-pointer font-fira-sans"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm font-fira-sans">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:underline font-fira-sans">
            Register
          </Link>
        </p>

      </motion.div>
    </div>
  )
}

export default Loginpage