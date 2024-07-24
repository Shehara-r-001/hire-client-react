import { useState } from 'react'

import { Search } from './search'

export const SubHeader = () => {
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword)
    console.log(keyword)
  }

  // const handleSearch = useCallback((keyword: string) => {
  //   setSearchKeyword(keyword)
  // }, [])

  return (
    <>
      <Search onSearch={handleSearch} />
    </>
  )
}
