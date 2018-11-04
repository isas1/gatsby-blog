import React from 'react'
import { graphql, Link } from 'gatsby'

const Template = ({ data, pageContext }) => {


  console.log(pageContext)
  const { next, prev } = pageContext


  const { markdownRemark } = data
  const title = markdownRemark.frontmatter.title
  const content = markdownRemark.html

  return (
    <div>
      <h1 style={{ fontFamily: 'avenir' }}>{title}</h1>

      <div
        className="blogpost"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {prev &&
        <Link to={prev.frontmatter.path}>
          Prev post
            </Link>
      }
      
      {next &&
        <Link to={next.frontmatter.path}>
          Next post
        </Link>
      }

    </div>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: {eq: $pathSlug} }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template;
