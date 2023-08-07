import React from 'react';
import ReactDOM from 'react-dom/client';
import './custom.scss';
import github from './db';
import { useEffect, useState, useCallback } from 'react';
import githubQuery from './query';
import RepoInfo from './RepoInfo';
import SearchBox from './SearchBox';



const App = () => {
    let [username, setUsername] = useState('');
    let [repoList, setRepoList] = useState(null);
    let [pageCount, setPageCount] = useState(10);
    let [queryString, setQueryString] = useState("");
    let [totalCount, setTotalCount] = useState(null);

    const fetchData = useCallback(() => {

        const queryText = JSON.stringify(githubQuery(pageCount, queryString))

        fetch(github.baseURL, {
            method: "POST",
            headers: github.headers,
            body: queryText,
            //body: JSON.stringify(githubQuery),
          }).then(
            response => response.json()
          ).then((data) => {
              const viewer = data.data.viewer;
              const repos = data.data.search.nodes;
              const total = data.data.search.repositoryCount;
              setUsername(viewer.name);
              setRepoList(repos);
              setTotalCount(total);
              console.log(data); 
          }).catch(error => {
            console.log(error)
          })
      }, [pageCount, queryString])
    

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return (
      <div className='App container mt-5'>
        <h1 className='text-primary'>
            <i className='bi bi-diagram-2-fill'>Repos</i>
        </h1>
        <p>Hey there {username}</p>
        {/* <p><b>Search for:</b> {queryString} | <b>Items per page:</b> {pageCount} | <b>Total Count:</b>{totalCount} </p> */}
        <SearchBox queryString={queryString} pageCount={pageCount} totalCount={totalCount} />
        {   repoList && (
            <ul className='list-group list-group-flush'>
                { repoList.map((repo) => ( 
                    <RepoInfo key={repo.id.toString()} repo={repo} />
                ))}
            </ul>
            )
        }

      </div>
    )
}
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);