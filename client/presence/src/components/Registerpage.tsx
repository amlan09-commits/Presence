import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { IoEye, IoEyeOff } from "react-icons/io5"

type FormData = {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Registerpage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<Boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    //Empty check
    if (
      !formData.firstname.trim() ||
      !formData.lastname.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setError("All fields are required")
      return
    }

    //Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format")
      return
    }

    //Password length check
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    //Confirm password check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        "http://localhost:8000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: formData.firstname.trim(),
            lastname: formData.lastname.trim(),
            username: formData.username.trim(),
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Registration failed")
        setLoading(false)
        return
      }

      //Success and navigate to login page
      navigate("/login")

    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-white to-purple-50 text-gray-800 overflow-hidden px-4">

      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-300 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute top-10 right-70 w-72 h-72 bg-blue-300 rounded-full blur-[150px] opacity-60"></div>
      <div className="absolute bottom-10 left-80 w-72 h-72 bg-red-300 rounded-full blur-[150px] opacity-60"></div>

      <div className="relative z-10 w-full max-w-md bg-gray-100 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20">

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 uppercase font-fira-sans">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-fira-sans"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-fira-sans"
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-fira-sans"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-fira-sans"
          />

          <input
            type={showPassword? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-fira-sans"
          />

          <input
            type={showPassword? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-fira-sans"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="cursor-pointer text-gray-800 flex flex-row gap-0.5 justify-center items-center mx-auto font-medium font-fira-sans
              "
            >
              Show password{showPassword ? <IoEye /> : <IoEyeOff />}
           </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold text-white disabled:opacity-50 font-fira-sans"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm font-fira-sans">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline font-fira-sans">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Registerpage