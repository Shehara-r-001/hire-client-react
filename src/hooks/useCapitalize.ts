/**
 * capitalize the first letter of each word of given string
 * @param str
 * @returns
 */
const useCapitalizeWords = (str: string) => {
  // * will useMemo improve this?

  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export default useCapitalizeWords
