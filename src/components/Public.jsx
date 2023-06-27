import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import useTitle from "../hooks/useTitle"

const Public = () => {
  useTitle("Paperpal - Welcome")
  const [isOpen, setIsOpen] = useState(false)

  const navToggleRef = useRef(null)
  const navRef = useRef(null)
  const iconRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        e.target !== iconRef.current &&
        e.target !== navToggleRef.current &&
        e.target !== navRef.current
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <a className="skip-to-content" href="#main">
        Skip to content
      </a>
      <header className="primary-header">
        <div className="container">
          <nav>
            <a href="#" className="logo" aria-label="Paperpal" title="Paperpal">
              <img src="assets/logo.svg" alt="Paperpal logo" />
            </a>
            <button
              className="mobile-nav-toggle"
              aria-controls="primary-navigation"
              aria-expanded={isOpen}
              onClick={handleClick}
              ref={navToggleRef}
            >
              <span className="visually-hidden">Menu</span>
              <img
                src={isOpen ? "assets/x.svg" : "assets/menu.svg"}
                alt=""
                ref={iconRef}
              />
            </button>
            <ul
              id="primary-navigation"
              data-visible={isOpen}
              ref={navRef}
              className="primary-nav"
            >
              <li>
                <a className="" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="" href="#">
                  Services
                </a>
              </li>

              <li>
                <a className="" href="#">
                  About
                </a>
              </li>
              <li>
                <Link className="" to="/login">
                  Employee Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="container">
          <h1>Welcome</h1>
        </section>
      </main>
    </>
  )
}
export default Public
