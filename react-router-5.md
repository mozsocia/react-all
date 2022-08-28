### app js
```js
import './App.css'
import { BrowserRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom'

// page components
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Article from './pages/Article'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>My Articles</h1>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />  
          </Route>
          <Route path="/about">
            <About />  
          </Route>
          <Route path="/contact">
            <Contact />  
          </Route>
          <Route path="/articles/:id">
            <Article />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App

```
### home js

```js
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

// styles
import './Home.css'

export default function Home() {
  const { data: articles, isPending, error } = useFetch('http://localhost:3000/articles')

  return (
    <div className="home">
      <h2>Articles</h2>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
        </div>
      ))}
    </div>
  )
}
```


### About js
```js
export default function About() {
  return (
    <div>
      <h2>About</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, quisquam. Tempora quod dolores a, at quis accusantium praesentium vitae beatae aliquam harum autem fugit! Unde repellendus est pariatur quia odit!</p>
    </div>
  )
}
```


### articles js

```js   
import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

export default function Article() {
  const { id } = useParams()
  const url = 'http://localhost:3000/articles/' + id
  const { data: article, isPending, error } = useFetch(url)
  const history = useHistory()

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        // history.goBack()
        history.push('/')
      }, 2000)
    }
  }, [error, history])

  return (
    <div>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {article && (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.body}</p>
        </div>
      )}
    </div>
  )
}
```

### contact js (queryParams)
```js
import { useLocation } from "react-router-dom"

export default function Contact() {
  const queryString = useLocation().search
  // console.log(queryString)
  
  const queryParams = new URLSearchParams(queryString)
  const name = queryParams.get("name")
  
  return (
    <div>
      <h2>Hey {name}, Contact Us</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam explicabo laudantium nemo voluptas cum omnis error voluptate. Nihil numquam ipsum necessitatibus hic odit neque consequuntur dolor. Magni quos ratione iste.</p>
    </div>
  )
}
```