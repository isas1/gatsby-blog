path = require('path')

exports.createPages = (({graphql, actions}) => {
  const { createPage } = actions
  
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.js')

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark (
              sort: { order: ASC, fields: frontmatter___date }
            ) {
              edges {
                node {
                  frontmatter {
                    path
                  }
                }
              }
            }
          }
          
        `
      ).then(result => {

        //additional data for next and previous links added to context
        const allPosts = result.data.allMarkdownRemark.edges

        allPosts.forEach(({node}, index) => {
          const path = node.frontmatter.path
          createPage({
            path,
            component: blogPostTemplate,
            context: {
              pathSlug: path,
              prev: index === 0 ? null : allPosts[index - 1].node,
              next: index === (allPosts.length - 1) ? null : allPosts[index + 1].node
            }
          })

          resolve()
        })
      })
    )

  })
})
