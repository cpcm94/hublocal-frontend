import React from 'react'
import { ReturnButton } from './ReturnButton.js'
import { HeaderWrapper, Title } from './Header.styles.js'
import { LogoutButton } from './LogoutButton.js'

export const Header = ({ title, returnButton }) => {
  return (
    <HeaderWrapper>
      {returnButton && <ReturnButton onClick={returnButton} />}
      {title && <Title returnButton={!!returnButton}>{title}</Title>}
      <LogoutButton />
    </HeaderWrapper>
  )
}
