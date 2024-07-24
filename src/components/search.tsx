import { FormEvent, useEffect, useRef, useState } from 'react'
import { SearchIcon } from 'lucide-react'

import { Input } from './ui/input'
import { useDebounce } from 'src/hooks/useDebounce'

interface SearchProps {
  onSearch: (keyword: string) => void
}

export const Search = ({ onSearch }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 500)

  useEffect(() => {
    if (debouncedKeyword) {
      onSearch(debouncedKeyword)
    }
  }, [debouncedKeyword, onSearch])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputRef.current) {
      setKeyword(inputRef.current.value)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex w-[460px] items-center rounded-sm bg-[#FFF] px-2 outline-none ring-0">
        <SearchIcon />
        <Input
          id="keyword"
          ref={inputRef}
          type="text"
          placeholder="search for a company"
          className="w-[400px] border-none text-black focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </form>
  )
}
