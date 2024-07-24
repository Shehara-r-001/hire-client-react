import { useState, useEffect } from 'react'

/**
 * use to add the debouncing effect
 * @param value key to add the debounce
 * @param delay delay in ms
 * @returns
 */
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
