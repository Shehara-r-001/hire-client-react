import { useMemo } from 'react'

/**
 * create a title using pathname
 * @param pathname
 * @returns {string}
 * @description A simple hook that can use to remove leading parts of a pathname string and returns the capitalized last segment
 *
 * @example
 * const title = usePathAsTitle('this/is/path/to/home')
 * console.log(title) // 'Home'
 */
const usePathAsTitle = (pathname: string): string => {
  const capitalizedPath = useMemo(() => {
    const splittedArray = pathname.split('/')
    const lastSegment = splittedArray[splittedArray.length - 1]

    if (!lastSegment) return ''

    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
  }, [pathname])

  return capitalizedPath
}

export default usePathAsTitle
