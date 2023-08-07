import React from 'react'

const RepoInfo = ({repo}) => {

  let license;

  switch (repo?.licenseInfo?.spdxId) {
    case undefined:
      license = (
        <span className='px-1 py-0 ms-1 d-inline-clock btn btn-sm btn-danger ' style={{fontSize: ".8em"}}>
          No License
        </span>
      )
      break;
    case "MIT":
      license = (
        <span className='px-1 py-0 ms-1 d-inline-clock btn btn-sm btn-warning ' style={{fontSize: ".8em"}}>
          {repo.licenseInfo.spdxId}
        </span>
      )
      break;
    default:
      license = (
        <span className='px-1 py-0 ms-1 d-inline-clock btn btn-sm btn-outline-success ' style={{fontSize: ".8em"}}>
          {repo.licenseInfo.spdxId}
        </span>
      )
  }

  return (
    <li className='list-group-item px-0' key={repo.id.toString()}>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex flex-column'>
            <a className='h5 mb-0 text-decoration-none text-primary' href={repo.url}>{repo.name}</a>
            <p className='small mb-0'>{repo.description}</p>
          </div>
          <div className='text-nowrap ms-3'>
            {license}
            <span className= {
              'px-1 py-1 ms-1 d-inline-block btn-sm btn ' + (repo.viewerSubscription === "SUBSCRIBED" ? "btn-success" : "btn-outline-secondary")
            } style={{fontSize: ".8em"}}>
              {repo.viewerSubscription}
            </span>
          </div>

          {/* <span>
            {repo.licenseInfo.spdxId}
          </span> */}
        </div>
    </li>
  )
}

export default RepoInfo