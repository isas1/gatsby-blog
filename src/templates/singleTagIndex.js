import React from "react"
import { graphql, Link } from 'gatsby'

const singleTagIndexTemplate = ({ data, pageContext }) => {
  console.log(pageContext)

  const { posts, tag } = pageContext

  return (
    <div>
      <div>
        Posts about {`${tag}`}
      </div>

      <ul>
        {posts.map((post, index) => {
          return (
            <li key={index}>
              <Link to={post.frontmatter.path}>
                {post.frontmatter.title}
              </Link>
            
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default singleTagIndexTemplate;