import { Link } from "react-router-dom"

const Homepage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-white to-purple-50 text-gray-800">

      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-300 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute top-10 right-70 w-72 h-72 bg-blue-300 rounded-full blur-[150px] opacity-60"></div>
      <div className="absolute bottom-10 left-80 w-72 h-72 bg-red-300 rounded-full blur-[150px] opacity-60"></div>


      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent pointer-events-none">
          Presence
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-6 max-w-lg mx-auto text-gray-600 font-fira-sans pointer-events-none">
          Welcome to Presence — a simple and smart way to manage attendance efficiently.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <Link
            to={"/login"}
            className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition font-semibold shadow-md"
          >
            Login
          </Link>

          <Link
            to={"/register"}
            className="px-6 py-3 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-100 transition font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage