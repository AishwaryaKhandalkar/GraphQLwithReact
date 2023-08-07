const githubQuery = (pageCount, queryString) => {
    return {
        query: `
        {
            viewer {
              name
            }
            search(
              query: "${queryString} user:AishwaryaKhandalkar sort:updated-desc"
              type: REPOSITORY
              first: ${pageCount}
            ) {
              repositoryCount
              nodes {
                ... on Repository {
                  name
                  id
                  description
                  url
                  viewerSubscription
                  licenseInfo {
                    spdxId
                  }
                }
              }
            }
          }
        `
    }
  }

  export default githubQuery;