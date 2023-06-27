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
            <a href="#" className="logo" aria-label="Paperpal">
              <span>Paperpal</span>
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
        <section className="container hero">
          <h1>Where creativity meets quality</h1>
          <p>
            Introducing PaperPal, your one-stop-shop for wholesale office
            papers, supplies, and everything in between.
          </p>
          <p>
            We pride ourselves on our top-quality products and exceptional
            customer service, striving to provide our clients with the best
            office supply solutions available. From printer paper to office
            organization tools, PaperPal is your go-to for all your office
            needs.
          </p>
        </section>
        <section className="stats">
          <div className="container stats-wrapper">
            <div className="card">
              <span>10+</span>
              <p>Years of experience</p>
            </div>
            <div className="card">
              <span>50+</span>
              <p>Product varieties</p>
            </div>
            <div className="card">
              <span>500+</span>
              <p>Happy customers</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
export default Public
