import React from 'react'
import styled from 'styled-components'
import LogoutIcon from '@mui/icons-material/Logout'
import { deleteTokens } from '../../AuthTokens/deleteTokens'
import { getTokens } from '../../AuthTokens/getTokens'

const Wrapper = styled.div`
  cursor: pointer;
  align-self: center;
  display: ${({ hasUser }) => !hasUser && 'none'};
  margin-right: 1rem;
`

export const LogoutButton = () => {
  const user = getTokens()
  const handleLogout = () => {
    deleteTokens()
    window.location.reload()
  }

  return (
    <Wrapper onClick={handleLogout} hasUser={!!user}>
      <LogoutIcon />
    </Wrapper>
  )
}
