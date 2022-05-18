import React from 'react'
import { GlobalStyle } from './GlobalStyle'
import { MainWrapper } from './MainWrapper'

export const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <MainWrapper>
        <main>{children}</main>
      </MainWrapper>
    </>
  )
}
