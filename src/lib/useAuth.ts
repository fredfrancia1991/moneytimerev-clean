import { useEffect, useState } from 'react'
import { onAuthStateChanged, LocalUser } from './localAuth'

export function useAuth() {
  const [user, setUser] = useState<LocalUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged((u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  return { user, loading }
}
