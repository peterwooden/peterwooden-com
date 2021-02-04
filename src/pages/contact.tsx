// If you don't want to use TypeScript you can delete this file!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

type DataProps = {
  site: {
    buildTime: string
  }
}

const Contact: React.FC<PageProps<DataProps>> = ({
  data,
  path,
  location,
}) => (
  <Layout title="Contact" location={location}>
    <SEO title="Contact" />
    <p>
      Please contact me on LinkedIn.
    </p>
  </Layout>
);

export default Contact;