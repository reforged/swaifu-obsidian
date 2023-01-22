import React, { useContext } from 'react'
import { AuthenticationContext} from '../contexts/AuthenticationContext'
import { useNavigate } from 'react-router'
import useMe from '../hooks/useMe'

export default function Manager ({ children }: any) {
  const { user } = useContext(AuthenticationContext)
  const data = useMe()
  const router = useNavigate()

  if (!user) {
    return router('/login')
  }

  return children
}