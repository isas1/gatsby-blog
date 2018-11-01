import React from "react"
import { graphql, Link } from 'gatsby'
import Header from '../components/Header'

const Layout = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  // console.log(edges)
  return (
    <div>
      <Header />
      {edges.map(edge => {
        const { frontmatter } = edge.node
        // console.log(frontmatter.path)
        return (
          <Link to={frontmatter.path}>
            {frontmatter.title}
          </Link>
        )
      })} {/* Mapping */}
    </div>
  )
}

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(
      sort: {order: ASC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date
          }
        }
      }
    }
  }
`

export default Layout;
