"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between flex-wrap gap-4">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-900">
        CareerMate
      </div>

      {/* Mobile menu toggle */}
      <button
        className="lg:hidden text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        {/* Simple hamburger icon */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-4 6h4"></path>
        </svg>
      </button>

      {/* Nav Links */}
      <nav className={`w-full lg:w-auto lg:flex flex-grow items-center justify-center ${menuOpen ? "block" : "hidden"} lg:block`} aria-label="Primary">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
          <Link to="#jobs" className="text-gray-600 hover:text-indigo-600 text-lg font-medium transition">Jobs</Link>
          <Link to="#internships" className="text-gray-600 hover:text-indigo-600 text-lg font-medium transition">Internships</Link>
          <Link to='/app' className="text-gray-600 hover:text-indigo-600 text-lg font-medium transition">Resume Builder</Link>
        </div>
      </nav>

      {/* search */}
      {/* <div className={`w-full lg:w-auto ${menuOpen ? "block" : "hidden"} lg:block flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition`} role="search">
        <input type="text" placeholder="Job title, keyword, or company" aria-label="Search jobs" className="flex-grow border-none outline-none text-gray-800 placeholder-gray-400" />
        <button className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">Search</button>
      </div> */}

      {/* Auth */}
      <div className={`w-full lg:w-auto ${menuOpen ? "block" : "hidden"} lg:block flex flex-col lg:flex-row items-center gap-4 lg:gap-4 mt-4 lg:mt-0`}>
        <Link to="/login" className="px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Login</Link>
        <Link to="/signup" className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Register</Link>
      </div>
    </header>
  )
}

export default Header
