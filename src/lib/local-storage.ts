type KEYS = 'token' | 'theme'

export const setLocalStorage = (key: KEYS, value: string) => localStorage.setItem(key, value)

export const getLocalSorage = (key: KEYS) => localStorage.getItem(key)

export const removeFromLocalStorage = (key: KEYS) => localStorage.removeItem(key)
