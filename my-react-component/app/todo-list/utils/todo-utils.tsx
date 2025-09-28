/**
 * Local Storage Utility Functions for Todo List
 * Provides get and set operations with localStorage using a key parameter
 */

/**
 * Retrieves data from localStorage by key
 * @param key - The localStorage key to retrieve data from
 * @returns The parsed data from localStorage or null if not found/invalid
 */
export function getFromLocalStorage<T = any>(key: string): T | null {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return null;
    }

    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error retrieving data from localStorage with key "${key}":`, error);
    return null;
  }
};

/**
 * Stores data in localStorage by key
 * @param key - The localStorage key to store data under
 * @param value - The data to store (will be JSON stringified)
 * @returns boolean indicating success/failure
 */
export function setToLocalStorage<T = any>(key: string, value: T): boolean {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return false;
    }

    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error storing data to localStorage with key "${key}":`, error);
    return false;
  }
};

/**
 * Removes data from localStorage by key
 * @param key - The localStorage key to remove
 * @returns boolean indicating success/failure
 */
export function removeFromLocalStorage (key: string): boolean {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return false;
    }

    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing data from localStorage with key "${key}":`, error);
    return false;
  }
};

/**
 * Checks if a key exists in localStorage
 * @param key - The localStorage key to check
 * @returns boolean indicating if the key exists
 */
export function hasInLocalStorage (key: string): boolean {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return false;
    }

    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Error checking localStorage for key "${key}":`, error);
    return false;
  }
};

/**
 * Clears all data from localStorage
 * @returns boolean indicating success/failure
 */
export function clearLocalStorage (): boolean {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return false;
    }

    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};