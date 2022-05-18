import React from 'react'
import { SigninPage } from './SigninPage'

import { Navigate } from 'react-router-dom'
import { getTokens } from '../AuthTokens/getTokens'

export const SigninPageLoader = () => {
  const user = getTokens()
  return <>{user ? <Navigate to='/companies' /> : <SigninPage />}</>
}
