"use client"

import { useState, useEffect } from "react"
import { saveToStorage, loadFromStorage } from "@/lib/storage-utils"

/**
 * A custom hook that works like useState but persists the state to localStorage
 *
 * @param key The localStorage key to use
 * @param initialValue The initial value (used if nothing is in localStorage)
 * @returns A stateful value and a function to update it, just like useState
 */
export function usePersistentState<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Initialize state with value from localStorage or initial value
  const [state, setState] = useState<T>(() => {
    return loadFromStorage<T>(key, initialValue)
  })

  // Update localStorage when state changes
  useEffect(() => {
    saveToStorage(key, state)
  }, [key, state])

  return [state, setState]
}

export default usePersistentState
