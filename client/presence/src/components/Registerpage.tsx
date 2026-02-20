import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"

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

    // ✅ Empty check (trim prevents only spaces)
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

    // ✅ Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format")
      return
    }

    // ✅ Password length check
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // ✅ Confirm password check
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

      // ✅ Success
      navigate("/login")

    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden px-4">

      <div className="absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-fuchsia-500 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10">

        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* First + Last */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Registerpage