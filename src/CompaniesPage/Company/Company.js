import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { CompanyName, EditButton, Wrapper } from './Company.styles'

export const Company = ({ company }) => {
  return (
    <Wrapper>
      <CompanyName>{company.name}</CompanyName>
      <EditButton>
        <EditIcon />
      </EditButton>
    </Wrapper>
  )
}
