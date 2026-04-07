import { createContext, useContext, useState } from 'react'

export const WorldContext = createContext(null)

export function WorldProvider({ children }) {
  const [selected, setSelected] = useState(null)
  const [phase, setPhase] = useState('loading') // loading | intro | transitioning | scroll
  const [keys, setKeys] = useState({})

  return (
    <WorldContext.Provider value={{ selected, setSelected, phase, setPhase, keys, setKeys }}>
      {children}
    </WorldContext.Provider>
  )
}

export const useWorld = () => useContext(WorldContext)
