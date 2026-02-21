import { Link } from "react-router-dom"

const Homepage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f172a] text-white">

      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-fuchsia-500 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Presence
        </h1>

        <p className="xs:text-lg sm:text-xl md:text-2xl lg:text-3xl mt-6 max-w-lg mx-auto text-gray-300
        font-fira-sans">
          Welcome to Presence — a simple and smart way to manage attendance efficiently.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <Link to={'/login'} 
                className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition cursor-pointer
                font-fira-sans">
                Login
          </Link>
          <Link to={'/register'} 
                className="px-6 py-3 rounded-lg border border-purple-400 hover:bg-purple-500/20 transition cursor-pointer font-fira-sans">
                Register
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Homepage
