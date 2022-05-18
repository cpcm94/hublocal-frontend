import React from 'react'
import { HeaderWrapper, Title } from './Header.styles.js'

export const Header = ({ title }) => {
  return (
    <HeaderWrapper>
      {title && <Title>{title}</Title>}
      {/* logout button */}
    </HeaderWrapper>
  )
}
