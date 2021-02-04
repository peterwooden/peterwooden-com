import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Projects = ({
  location,
}) => (
  <Layout title="Projects" location={location}>
    <SEO title="Projects" />
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-lg font-bold">Modern Logo Designer (2021)</p>
        <p>A satirical app to design modern logos... which all look the same.</p>
        <Link to="/projects/modern-logo-designer" className="text-blue-600 hover:underline">Link</Link>
      </div>
      <div>
        <p className="text-lg font-bold">Polymer Documents (2020)</p>
        <p>A full stack SAAS app for creating dynamic JSONSchema forms and automating complex legal documents</p>
        <ul className="list-disc list-inside">
          <li className="m-0">React/Redux/React Router SPA</li>
          <li className="m-0">Rust GraphQL backend plus Nodejs services</li>
          <li className="m-0">Postgres database</li>
          <li className="m-0">CI/CD pipeline using AWS and Github Actions</li>
        </ul>
        <a href="https://polymerlaw.com" className="text-blue-600 hover:underline">Link</a>
      </div>
      <div>
        <p className="text-lg font-bold">OCR Template Tool (2020)</p>
        <p>A tool to assist OCR template generation. Drop in an image, and use your cursor to draw bounding boxes around text areas. The corresponding coordinates will be provided.</p>
        <Link to="/projects/ocr-template-tool" className="text-blue-600 hover:underline">Link</Link>
      </div>
      <div>
        <p className="text-lg font-bold">Legal advice chatbot (2017)</p>
        <p>Expert system to advice on Tort law matters. Made as a way to revise (procrastinate) for my studies.</p>
      </div>
      <p>
        See my <a href="https://github.com/peterwooden">GitHub</a>.
      </p>

    </div>
  </Layout>
)

export default Projects
