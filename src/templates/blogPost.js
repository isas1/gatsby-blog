import React from 'react'
// import { graphql } from 'gatsby'

const Template = ({data}) => {

  // console.log(props)
  const { markdownRemark } = data
  const title = markdownRemark.frontmatter.title
  const content = markdownRemark.html

  return ( 
    <div>
      <h1 style={{fontFamily: 'avenir'}}>{title}</h1>

      <div 
        className="blogpost"
        dangerouslySetInnerHTML ={{__html: content}}
      />
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
