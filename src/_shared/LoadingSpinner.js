import React from 'react'
import { PulseLoader } from 'react-spinners'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
`

export const LoadingSpinner = ({ isLoading }) => {
  return (
    <Wrapper>
      <PulseLoader color='#CB857C' loading={isLoading} />
    </Wrapper>
  )
}
