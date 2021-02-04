import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Projects = ({
  location,
}) => (
  <Layout title="Projects" location={location}>
    <SEO title="Projects" />
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-lg font-bold">Modern Logo Designer</p>
        <p>A satirical app to design modern logos... which all look the same.</p>
        <Link to="/projects/modern-logo-designer" className="text-blue-600 hover:underline">Link</Link>
      </div>
      <p>
        See my <a href="https://github.com/peterwooden">GitHub</a>.
      </p>

    </div>
  </Layout>
)

export default Projects
