import React from 'react'
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit'

const EditButtonWrapper = styled.div`
  min-width: 1.25rem;
  min-height: 1.25rem;
  max-width: 1.25rem 
  max-height: 1.25rem;
  font-size: 0.5rem;
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.75rem 1rem;
  :hover {
    background-color: #F6CBB7;
  }
`

export const EditButton = ({ onClick }) => {
  return (
    <EditButtonWrapper onClick={onClick}>
      <EditIcon />
    </EditButtonWrapper>
  )
}
