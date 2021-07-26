import React from "react"
import './Footer.css'

const Footer = () => {
  return (
    <footer>
    <h3>Authors</h3>
      <ul className="gh-links">
        <li><a href="https://github.com/hoomberto"><button>Bobby Vasquez</button></a></li>
        <li><a href="https://github.com/novaraptur"><button>Dean Cook</button></a></li>
        <li><a href="https://github.com/shawnmcmahon"><button>Shawn McMahon</button></a></li>
      </ul>
    </footer>
  )
}

export default Footer
