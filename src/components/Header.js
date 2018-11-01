import React from "react"
import { StaticQuery, graphql } from 'gatsby'


const TitleAndDescription = ({data}) => {
  const title = data.site.siteMetadata.title
  const description = data.site.siteMetadata.description

  return ( 
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'avenir'
    }}>
      <h2>{title}</h2>
      <div>{description}</div>
    </div>
   );
}

const Header = () => {
  return ( 
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => <TitleAndDescription data={data} />}
      />
   );
}

export default Header;