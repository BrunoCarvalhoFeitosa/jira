"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"

interface FilterContextType {
  isFilterVisible: boolean
  toggleFilter: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)

  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev)
  }

  return (
    <FilterContext.Provider value={{ isFilterVisible, toggleFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider")
  }

  return context
}
