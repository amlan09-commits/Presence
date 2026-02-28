import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Homepage = () => {
  const year = new Date().getFullYear()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden 
    bg-linear-to-br from-purple-100 via-white to-pink-100 animate-gradient text-gray-800">

      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full blur-[120px] opacity-50"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-72 h-72 bg-pink-300 rounded-full blur-[120px] opacity-50"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 flex-1 flex flex-col justify-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-extrabold 
          bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          Presence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl mt-6 max-w-lg mx-auto text-gray-600 font-fira-sans"
        >
          Welcome to Presence — a simple and smart way to manage attendance efficiently.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Link
            to={"/login"}
            className="px-6 py-3 rounded-lg bg-purple-600 text-white 
            hover:bg-purple-700 hover:scale-105 transition-all duration-300 
            font-semibold shadow-md"
          >
            Login
          </Link>

          <Link
            to={"/register"}
            className="px-6 py-3 rounded-lg border border-purple-600 text-purple-600 
            hover:bg-purple-600 hover:text-white hover:scale-105 transition-all duration-300 
            font-semibold"
          >
            Register
          </Link>
        </motion.div>
      </motion.div>

      <footer className="relative z-10 pb-6 text-center text-sm text-gray-500">
        © {year} Presence. All Rights Reserved.
      </footer>
    </div>
  )
}

export default Homepage