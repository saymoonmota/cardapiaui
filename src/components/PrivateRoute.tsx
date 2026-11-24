import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import type { ReactNode } from 'react'

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { adminToken } = useAppContext()
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />
  }
  return <>{children}</>
}
