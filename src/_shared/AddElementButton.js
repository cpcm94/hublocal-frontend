import React from 'react'
import styled from 'styled-components'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  background-color: #f6cbb7;
  cursor: pointer;
  :hover {
    background-color: var(--primary-color);
  }
`

export const AddElementButton = ({ onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <AddCircleOutlineIcon sx={{ color: 'white' }} />
    </ButtonWrapper>
  )
}
