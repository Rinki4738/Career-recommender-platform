"use client"

import React from "react"
import { Link } from "react-router-dom"
import "./Header.css"

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="header" role="banner" aria-label="Site header">
      {/* Logo */}
      <div className="logo" aria-label="CareerCo home">
        CareerCo
      </div>

      {/* Mobile menu toggle */}
      <button
        className="menu-toggle"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        {/* Simple hamburger icon */}
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* Nav Links */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary">
        <a href="#jobs">Jobs</a>
        <a href="#internships">Internships</a>
        <a href="#resume">Resume Builder</a>
      </nav>

      {/* search */}
      <div className="search-bar" role="search">
        <input type="text" placeholder="Job title, keyword, or company" aria-label="Search jobs" />
        <button>Search</button>
      </div>

      {/* Auth */}
      <div className="auth">
        <Link to="/login" className="btn btn-ghost login">Login</Link>
        <Link to="/signup" className="btn btn-primary register">Register</Link>
      </div>
    </header>
  )
}

export default Header
