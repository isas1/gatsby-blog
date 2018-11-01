module.exports = {
  siteMetadata: {
    title: 'My Blog',
    description: 'This is my new blog.'
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    }
  ]
}
