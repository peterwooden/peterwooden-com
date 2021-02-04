import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="text-5xl text-gray-900 font-bold">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="font-bold text-gray-600 text-xl" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <nav className="border-b flex justify-between pb-2.5">
        {[['Blog', '/'], ['Projects', '/projects'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => (
          <Link to={href} className="duration-200 font-medium hover:text-gray-700 transition-colors" key={href}>{label}</Link>
        ))}
      </nav>
      <header className="global-header mt-10">
        {header}
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
