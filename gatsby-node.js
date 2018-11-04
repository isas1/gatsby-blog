path = require('path')

const createTagPages = (createPage, posts) => {
  const allTagsIndexTemplate = path.resolve('src/templates/allTagsIndex.js')
  const singleTagIndexTemplate = path.resolve('src/templates/singleTagIndex.js')

  const postsByTag = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = []
        }

        postsByTag[tag].push(node)
      })
    }
  })

  const tags = Object.keys(postsByTag)

  createPage({
    path: '/tags',
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort()
    }
  })
}

// main create pages export
exports.createPages = (({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.js')

    // querying all .md files with src/pages
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
                    title
                    tags
                  }
                }
              }
            }
          }
          
        `
      ).then(result => {

        //additional data for next and previous links added to context
        const allPosts = result.data.allMarkdownRemark.edges
        
        createTagPages(createPage, allPosts)

        allPosts.forEach(({ node }, index) => {
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
