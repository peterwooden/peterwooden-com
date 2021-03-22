import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Projects = ({
  location,
}) => (
  <Layout title="Projects" location={location}>
    <SEO title="Projects"/>
    <div className="flex flex-col gap-4">
      <div>
        <h3>Modern Logo Designer (2021)</h3>
        <p>A satirical app to design modern logos... which all look the same.</p>
        <Link to="/projects/modern-logo-designer">Link</Link>
      </div>
      <div>
        <h3>Polymer Documents (2020)</h3>
        <p>A full stack SAAS app for creating dynamic JSONSchema forms and automating complex legal documents</p>
        <ul>
          <li>React/Redux/React Router SPA</li>
          <li>Rust GraphQL backend plus Nodejs services</li>
          <li>Postgres database</li>
          <li>CI/CD pipeline using AWS and Github Actions</li>
        </ul>
        <a href="https://polymerlaw.com">Link</a>
      </div>
      <div>
        <h3>OCR Template Tool (2020)</h3>
        <p>A tool to assist OCR template generation. Drop in an image, and use your cursor to draw bounding boxes around text areas. The corresponding coordinates will be provided.</p>
        <ul>
          <li>React/useReducer</li>
        </ul>
        <Link to="/projects/ocr-template-tool">Link</Link>
      </div>
      <div>
        <h3>Legal advice chatbot (2017)</h3>
        <p>Expert system to advice on Tort law matters. Made as a way to revise (procrastinate) for my studies.</p>
      </div>
      <p>
        See my <a href="https://github.com/peterwooden">GitHub</a>.
      </p>

    </div>
  </Layout>
)

export default Projects
