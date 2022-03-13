import { useEffect, useState } from 'react'
import axios from "axios";

export function useFetch(url) {

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true)

      try {
        const res = await axios(url, {
          signal: controller.signal
        })
        console.log(res);

        setIsPending(false)
        setData(res.data)

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
