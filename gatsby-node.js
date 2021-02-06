const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  /// Blog posts
  // Define a template for blog post
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const blogPostsResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "/content/blog/"  }}
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (blogPostsResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      blogPostsResult.errors
    )
    return
  }

  const posts = blogPostsResult.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // `context` is available in the template as a prop and as a variable in GraphQL

  posts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

    createPage({
      path: post.fields.slug,
      component: blogPostTemplate,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
      },
    })
  })

  /// Other markdown pages
  // Define a template
  const mdPostTemplate = path.resolve(`./src/templates/markdown-page.js`)

  // Get all markdown pages
  const mdPagesResult = await graphql(
    `
      {
        allMarkdownRemark {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (mdPagesResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your markdown pages`,
      mdPagesResult.errors
    )
    return
  }

  const mdPages = mdPagesResult.data.allMarkdownRemark.nodes

  // Create md pages
  mdPages.forEach((page) => {
    createPage({
      path: page.fields.slug,
      component: mdPostTemplate,
      context: {
        id: page.id
      },
    })
  })
  
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
