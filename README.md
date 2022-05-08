# data-fetching-techniq

### using useEffect

```js
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function PostList() {
  const [posts, setPosts] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get("http://localhost:4000/posts")
      .then(res => {
        setIsLoading(false)
        setPosts(res.data)
      })
      .catch(err => {
        setIsLoading(false)
        setError(err.message)
      }
      )
  }, [])

  return (
    <div>
      {error && (<div>{error}</div>)}
      {isLoading && (<div>Loading Posts</div>)}

      <hr />
      {posts?.map(item => (
        <h4 key={item.id}>{item.title}</h4>
      ))}

      {posts?.length == 0 && (<div>No Posts</div>)}
    </div>
  )
}

export default PostList

```

### using Reat Query
```js
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

function PostListRQ() {
  const fetcher = () => axios.get("https://jsonplaceholder.typicode.com/posts")
  const { data, isError, error, isLoading } = useQuery('Post-list', fetcher)

  return (

    <div>
      {isLoading && (<div>Loading Posts</div>)}
      {isError && (<div>{error.message}</div>)}
      <hr />
      {data?.data.map(item => (
        <h4 key={item.id}>{item.title}</h4>
      ))}

      {data?.data.length == 0 && (<div>No Posts</div>)}
    </div>
  )
}

export default PostListRQ
```
