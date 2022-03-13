import { useEffect, useState } from 'react'

export function useFetch(url) {

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true)

      try {
        const res = await fetch(url, { signal: controller.signal })
        console.log(res);
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const json = await res.json()
        console.log(json)
        setIsPending(false)
        setData(json)

      } catch (e) {
        if (e.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false)
          setError("Data fetching failed")
          console.log("fetch is failed");
          console.log(e)
        }

      }
    }
    fetchData()

    return () => {
      controller.abort()
    }
  }, [url])

  return { data, isPending, error }
}

export default useFetch
