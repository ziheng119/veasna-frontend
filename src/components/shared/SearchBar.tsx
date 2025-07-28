"use client"

import { useState } from "react"
import { SearchIcon } from "@/assets/icons/SearchIcon"
import { CrossIcon } from "@/assets/icons/CrossIcon"

interface SearchBarProps {
  label?: string 
  options?: string[]
}

export default function SearchBar({
  label = "Search ...",
  options = []
} : SearchBarProps) {
  const [query, setQuery] = useState<string>("")
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)


  const filteredOptions = options.filter(
    (name) => name.toLowerCase().includes(query.toLowerCase())
  )

  const handleClearQuery = () => {
    setQuery("")
    setHighlightedIndex(-1)
  }

  const handleSelectOption = (selectedOption: string) => {
    setQuery(selectedOption)
    setShowSuggestions(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredOptions.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex(prev =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex(prev =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      )
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        setQuery(filteredOptions[highlightedIndex])
        setShowSuggestions(false)
        setHighlightedIndex(-1)
      }
    }
  }

  return (
    <div className="relative w-full text-gray-700">
      <div className="flex flex-wrap items-center bg-white-default rounded-full w-full p-2 border-[1px] gap-1">
        <SearchIcon className="ml-1" />

        <input
          type="text"
          placeholder={label}
          value={query}
          className="flex-1 min-w-[100px] outline-none ml-1"
          onChange={e => {
            setQuery(e.target.value)
            setShowSuggestions(true)
            setHighlightedIndex(-1)
          }}
          onClick={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
        />

        <CrossIcon 
          width={20} 
          height={20} 
          color="black" 
          onClick={handleClearQuery}
          className="hover:cursor-pointer"  
        />
      </div>

      {showSuggestions && query.trim() !== "" && filteredOptions.length !== 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-48 overflow-y-auto">
          {filteredOptions.map((name, idx) => (
            <li
              key={idx}
              className={`px-4 py-2 cursor-pointer ${
                idx === highlightedIndex ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
              }`}
              onMouseEnter={() => setHighlightedIndex(idx)}
              onMouseDown={() => {
                setQuery(name)
                setShowSuggestions(false)
                setHighlightedIndex(-1)
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
