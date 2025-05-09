/**
 * Utility functions for working with localStorage
 */

// Check if we're in a browser environment
export const isBrowser = typeof window !== "undefined"

/**
 * Save data to localStorage
 * @param key Storage key
 * @param value Data to store
 * @returns boolean indicating success
 */
export function saveToStorage<T>(key: string, value: T): boolean {
  if (!isBrowser) return false

  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error)
    return false
  }
}

/**
 * Load data from localStorage
 * @param key Storage key
 * @param defaultValue Default value if nothing is stored
 * @returns The stored data or defaultValue
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (!isBrowser) return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error)
    return defaultValue
  }
}

/**
 * Remove data from localStorage
 * @param key Storage key
 * @returns boolean indicating success
 */
export function removeFromStorage(key: string): boolean {
  if (!isBrowser) return false

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error)
    return false
  }
}

/**
 * Clear all data from localStorage
 * @returns boolean indicating success
 */
export function clearStorage(): boolean {
  if (!isBrowser) return false

  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error("Error clearing localStorage:", error)
    return false
  }
}

/**
 * Show a notification that progress has been saved
 */
export function showSaveNotification(): void {
  if (!isBrowser) return

  const notification = document.getElementById("save-notification")
  if (notification) {
    notification.style.opacity = "1"

    setTimeout(() => {
      notification.style.opacity = "0"
    }, 2000)
  }
}
