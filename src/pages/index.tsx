import React from "react"
import { graphql } from "gatsby"
import { PageProps } from "gatsby"
import { Header } from "../components/Header/Header"
import { Card } from "../components/Card/Card"
import Layout from "../components/layout.js";

const IndexRoute = ({ path }: PageProps) => {
  return (
    <Layout>
      <main>
        <Header />
        <Card />
      </main>
    </Layout>
  )
}

export default IndexRoute

// export const pageQuery = graphql`
//   query {
//     blogPost(id: { eq: $Id }) {
//       title
//       body
//       author
//       avatar {
//         childImageSharp {
//           gatsbyImageData(
//             width: 200
//             placeholder: BLURRED
//             formats: [AUTO, WEBP, AVIF]
//           )
//         }
//       }
//     }
//   }
// `