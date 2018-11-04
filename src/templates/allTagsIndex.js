import React from "react"
import { graphql, Link } from 'gatsby'

const allTagsIndexTemplate = ({ data, pageContext }) => {

  console.log(pageContext)
  return (
    <div>
      <div>
        tags here
      </div>
    </div>
  );
}

export default allTagsIndexTemplate;