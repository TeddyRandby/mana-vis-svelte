import { writable } from "svelte/store"

const cache = new Map<string, any>()

export function gqlClient(url: string) {
  return {
    query: (query: string, variables: Object) => {
      const store = writable(
        new Promise<any>(() => {})
      )

      const setData = (data: any) => {
        data.errors
          ? store.set(Promise.reject(data.errors))
          : store.set(Promise.resolve(data.data))
      }

      const key = JSON.stringify({ query, variables })

      if (cache.has(key)) {
        const data = cache.get(key)
        setData(data)
      }

      const load = async () => {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: key,
        })

        const data = await response.json()
        cache.set(key, data)
        setData(data)
      }

      load()
      return store
    },
  }
}
